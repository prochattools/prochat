import Stripe from 'stripe'

import { EntitlementStatus, ProductConfig, ProductSlug } from './types'

const PRODUCT_MAP: Record<
	ProductSlug,
	Omit<ProductConfig, 'priceId' | 'githubRepo' | 'productSlug'>
> = {
	prokit: {
		priceEnv: 'STRIPE_PRICE_PROKIT',
		githubRepoEnv: 'GITHUB_PROKIT_REPO',
		paidKey: 'prochat_prokit_paid',
		provisionedKey: 'prochat_prokit_github_provisioned',
		usernameKey: 'prochat_prokit_github_username',
		lastSessionKey: 'prochat_prokit_last_session',
	},
	saaskit: {
		priceEnv: 'STRIPE_PRICE_SAASKIT',
		githubRepoEnv: 'GITHUB_SAASKIT_REPO',
		paidKey: 'prochat_saaskit_paid',
		provisionedKey: 'prochat_saaskit_github_provisioned',
		usernameKey: 'prochat_saaskit_github_username',
		lastSessionKey: 'prochat_saaskit_last_session',
	},
}

const DEFAULT_REPOS: Record<ProductSlug, string> = {
	prokit: 'prochattools/prokit-core',
	saaskit: 'prochattools/saaskit',
}

let cachedStripe: Stripe | null = null

function getRequiredEnv(name: string): string {
	const value = process.env[name]?.trim()
	if (!value) {
		throw new Error(`[store] Missing required environment variable: ${name}`)
	}
	return value
}

function toCustomer(
	customer: Stripe.Checkout.Session['customer']
): Stripe.Customer | null {
	if (!customer || typeof customer === 'string') {
		return null
	}
	if ('deleted' in customer && customer.deleted) {
		return null
	}
	return customer as Stripe.Customer
}

function getSessionEmail(session: Stripe.Checkout.Session): string | null {
	return (
		session.customer_details?.email || toCustomer(session.customer)?.email || null
	)
}

function getMetadataValue(
	session: Stripe.Checkout.Session,
	key: string
): string | undefined {
	const fromSession = session.metadata?.[key]
	if (fromSession) {
		return fromSession
	}
	const customer = toCustomer(session.customer)
	if (!customer) {
		return undefined
	}
	return customer.metadata?.[key]
}

function isProvisioned(
	session: Stripe.Checkout.Session,
	provisionedKey: string
): boolean {
	return getMetadataValue(session, provisionedKey) === 'true'
}

export function getStripeClient(): Stripe {
	if (cachedStripe) {
		return cachedStripe
	}
	const secret = getRequiredEnv('STRIPE_SECRET_KEY')
	cachedStripe = new Stripe(secret, { apiVersion: '2024-06-20' })
	return cachedStripe
}

export function getProductConfig(productSlug: ProductSlug): ProductConfig {
	const baseConfig = PRODUCT_MAP[productSlug]
	if (!baseConfig) {
		throw new Error(`[store] Unsupported product slug: ${productSlug}`)
	}
	const priceId = getRequiredEnv(baseConfig.priceEnv)
	const githubRepo =
		process.env[baseConfig.githubRepoEnv]?.trim() || DEFAULT_REPOS[productSlug]

	return {
		productSlug,
		...baseConfig,
		priceId,
		githubRepo,
	}
}

export async function retrieveSessionById(
	sessionId: string
): Promise<Stripe.Checkout.Session | null> {
	try {
		const stripe = getStripeClient()
		return await stripe.checkout.sessions.retrieve(sessionId, {
			expand: ['customer'],
		})
	} catch (error) {
		console.error('[store] Failed to retrieve checkout session', error)
		return null
	}
}

export async function getSessionStatusById(
	sessionId: string,
	expectedProduct: ProductSlug
): Promise<EntitlementStatus> {
	try {
		const productConfig = getProductConfig(expectedProduct)
		const session = await retrieveSessionById(sessionId)

		if (!session) {
			return {
				state: 'invalid_session',
				message: 'Session not found.',
			}
		}

		if (session.metadata?.product_slug !== expectedProduct) {
			return {
				state: 'invalid_session',
				message: 'This session does not match the selected product.',
			}
		}

		if (session.payment_status !== 'paid') {
			return {
				state: 'unpaid',
				message: 'Payment not completed yet.',
				productSlug: expectedProduct,
				email: getSessionEmail(session),
			}
		}

		const email = getSessionEmail(session)
		const githubUsername =
			getMetadataValue(session, productConfig.usernameKey) || null

		if (isProvisioned(session, productConfig.provisionedKey)) {
			return {
				state: 'provisioned',
				productSlug: expectedProduct,
				email,
				githubUsername,
			}
		}

		return {
			state: 'paid_unclaimed',
			productSlug: expectedProduct,
			email,
			githubUsername,
		}
	} catch (error) {
		console.error('[store] Failed to inspect checkout session status', error)
		return {
			state: 'error',
			message: 'Unable to verify payment status right now.',
		}
	}
}

export async function findLatestPaidUnprovisionedSessionByEmail(
	email: string,
	productSlug: ProductSlug
): Promise<{
	session: Stripe.Checkout.Session | null
	status: EntitlementStatus
}> {
	try {
		const stripe = getStripeClient()
		getProductConfig(productSlug)

		const normalizedEmail = email.trim().toLowerCase()
		const sessionList = await stripe.checkout.sessions.list({ limit: 20 })

		for (const listedSession of sessionList.data) {
			if (listedSession.metadata?.product_slug !== productSlug) {
				continue
			}
			if (listedSession.payment_status !== 'paid') {
				continue
			}

			const session = await retrieveSessionById(listedSession.id)
			if (!session) {
				continue
			}

			const status = await getSessionStatusById(session.id, productSlug)
			if (status.state !== 'paid_unclaimed') {
				continue
			}

			if ((status.email || '').trim().toLowerCase() !== normalizedEmail) {
				continue
			}

			return { session, status }
		}

		return {
			session: null,
			status: {
				state: 'invalid_session',
				message: 'No paid purchase found for this email.',
			},
		}
	} catch (error) {
		console.error('[store] Failed to lookup session by email', error)
		return {
			session: null,
			status: {
				state: 'error',
				message: 'Unable to verify purchases for that email right now.',
			},
		}
	}
}

export async function markSessionProvisioned(
	session: Stripe.Checkout.Session,
	productSlug: ProductSlug,
	githubUsername: string
): Promise<void> {
	const stripe = getStripeClient()
	const config = getProductConfig(productSlug)

	const updatedSessionMetadata: Stripe.MetadataParam = {
		...(session.metadata || {}),
		[config.paidKey]: 'true',
		[config.provisionedKey]: 'true',
		[config.usernameKey]: githubUsername,
		[config.lastSessionKey]: session.id,
	}

	await stripe.checkout.sessions.update(session.id, {
		metadata: updatedSessionMetadata,
	})

	const customer = toCustomer(session.customer)
	if (customer) {
		await stripe.customers.update(customer.id, {
			metadata: {
				...(customer.metadata || {}),
				[config.paidKey]: 'true',
				[config.provisionedKey]: 'true',
				[config.usernameKey]: githubUsername,
				[config.lastSessionKey]: session.id,
			},
		})
	} else if (typeof session.customer === 'string' && session.customer) {
		const customerRecord = await stripe.customers.retrieve(session.customer)
		if (!('deleted' in customerRecord && customerRecord.deleted)) {
			const liveCustomer = customerRecord as Stripe.Customer
			await stripe.customers.update(liveCustomer.id, {
				metadata: {
					...(liveCustomer.metadata || {}),
					[config.paidKey]: 'true',
					[config.provisionedKey]: 'true',
					[config.usernameKey]: githubUsername,
					[config.lastSessionKey]: session.id,
				},
			})
		}
	}
}

export async function markSessionPaid(
	session: Stripe.Checkout.Session
): Promise<void> {
	const slug = session.metadata?.product_slug
	if (slug !== 'prokit' && slug !== 'saaskit') {
		return
	}

	const stripe = getStripeClient()
	const config = getProductConfig(slug)
	const customer = toCustomer(session.customer)

	await stripe.checkout.sessions.update(session.id, {
		metadata: {
			...(session.metadata || {}),
			[config.paidKey]: 'true',
			[config.lastSessionKey]: session.id,
		},
	})

	if (customer) {
		await stripe.customers.update(customer.id, {
			metadata: {
				...(customer.metadata || {}),
				[config.paidKey]: 'true',
				[config.lastSessionKey]: session.id,
			},
		})
	} else if (typeof session.customer === 'string' && session.customer) {
		const customerRecord = await stripe.customers.retrieve(session.customer)
		if (!('deleted' in customerRecord && customerRecord.deleted)) {
			const liveCustomer = customerRecord as Stripe.Customer
			await stripe.customers.update(liveCustomer.id, {
				metadata: {
					...(liveCustomer.metadata || {}),
					[config.paidKey]: 'true',
					[config.lastSessionKey]: session.id,
				},
			})
		}
	}
}
