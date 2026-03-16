import Stripe from 'stripe'
import type { Prisma } from '@prisma/client'
import { getStripePriceProkit, getStripePriceSaaskit, getStripeSecretKey } from '@/libs/stripe-env'
import type { AccessStatus, LicenseEventType, PaymentStatus, ProvisioningStatus } from '@prisma/client'
import prisma from '@/libs/prisma'

import { getGithubConfig } from './github'
import { EntitlementStatus, ProductConfig, ProductSlug } from './types'

const PRODUCT_MAP: Record<
	ProductSlug,
	Omit<ProductConfig, 'priceId' | 'githubRepo' | 'productSlug'>
> = {
	prokit: {
		priceEnv: 'STRIPE_PRICE_PROKIT_TEST/STRIPE_PRICE_PROKIT_LIVE',
		paidKey: 'prochat_prokit_paid',
		provisionedKey: 'prochat_prokit_github_provisioned',
		usernameKey: 'prochat_prokit_github_username',
		lastSessionKey: 'prochat_prokit_last_session',
	},
	saaskit: {
		priceEnv: 'STRIPE_PRICE_SAASKIT_TEST/STRIPE_PRICE_SAASKIT_LIVE',
		paidKey: 'prochat_saaskit_paid',
		provisionedKey: 'prochat_saaskit_github_provisioned',
		usernameKey: 'prochat_saaskit_github_username',
		lastSessionKey: 'prochat_saaskit_last_session',
	},
}

let cachedStripe: Stripe | null = null

function getRequiredValue(label: string, value: string): string {
	const normalized = value.trim()
	if (!normalized) {
		throw new Error(`[store] Missing required configuration value: ${label}`)
	}
	return normalized
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

function mapProvisionedAccessStatus(
	accessState?: 'invited' | 'pending_invitation' | 'already_has_access'
): AccessStatus {
	if (accessState === 'already_has_access') {
		return 'active'
	}
	if (accessState === 'invited' || accessState === 'pending_invitation') {
		return 'invited'
	}
	return 'pending'
}

async function createLicenseEventOnce(
	licenseId: string,
	type: LicenseEventType,
	metadata?: Record<string, unknown>
) {
	const existingEvent = await prisma.licenseEvent.findFirst({
		where: { license_id: licenseId, type },
		select: { id: true },
	})

	if (existingEvent) {
		return
	}

	await prisma.licenseEvent.create({
		data: {
			license_id: licenseId,
			type,
			metadata: metadata as Prisma.InputJsonValue | undefined,
		},
	})
}

async function syncLicenseRecord(
	session: Stripe.Checkout.Session,
	productSlug: ProductSlug,
	options?: {
		githubUsername?: string | null
		provisioningStatus?: ProvisioningStatus
		accessStatus?: AccessStatus
	}
) {
	const purchaserEmail = getSessionEmail(session)?.trim().toLowerCase()
	if (!purchaserEmail) {
		return
	}

	const config = getProductConfig(productSlug)
	const githubUsername =
		options?.githubUsername ??
		getMetadataValue(session, config.usernameKey) ??
		null
	const provisioned = isProvisioned(session, config.provisionedKey)
	const paymentStatus: PaymentStatus =
		session.payment_status === 'paid' || getMetadataValue(session, config.paidKey) === 'true'
			? 'completed'
			: 'pending'
	const provisioningStatus: ProvisioningStatus =
		options?.provisioningStatus ?? (provisioned ? 'completed' : 'pending')
	const accessStatus: AccessStatus =
		options?.accessStatus ??
		(provisioned ? (githubUsername ? 'invited' : 'pending') : 'pending')

	const license = await prisma.license.upsert({
		where: { payment_reference: session.id },
		create: {
			purchaser_email: purchaserEmail,
			product: productSlug,
			payment_reference: session.id,
			payment_status: paymentStatus,
			provisioning_status: provisioningStatus,
			access_status: accessStatus,
			github_username: githubUsername,
		},
		update: {
			purchaser_email: purchaserEmail,
			product: productSlug,
			payment_status: paymentStatus,
			provisioning_status: provisioningStatus,
			access_status: accessStatus,
			github_username: githubUsername,
			revoked_at: null,
			revoked_reason: null,
		},
		select: { id: true },
	})

	if (paymentStatus === 'completed') {
		await createLicenseEventOnce(license.id, 'purchase_completed', {
			sessionId: session.id,
			email: purchaserEmail,
			productSlug,
		})
	}

	if (githubUsername) {
		await createLicenseEventOnce(license.id, 'github_username_linked', {
			sessionId: session.id,
			githubUsername,
		})
	}

	if (provisioningStatus === 'completed' && githubUsername) {
		await createLicenseEventOnce(license.id, 'collaborator_invited', {
			sessionId: session.id,
			githubUsername,
			accessStatus,
		})
	}
}

export async function backfillLicenseRecordsFromStripe(limit = 25): Promise<void> {
	try {
		const stripe = getStripeClient()
		const sessionList = await stripe.checkout.sessions.list({ limit })

		for (const listedSession of sessionList.data) {
			const productSlug = listedSession.metadata?.product_slug
			if (productSlug !== 'prokit' && productSlug !== 'saaskit') {
				continue
			}
			if (listedSession.payment_status !== 'paid') {
				continue
			}

			const session = await retrieveSessionById(listedSession.id)
			if (!session) {
				continue
			}

			await syncLicenseRecord(session, productSlug)
		}
	} catch (error) {
		console.error('[store] Failed to backfill license records from Stripe', error)
	}
}

export function getStripeClient(): Stripe {
	if (cachedStripe) {
		return cachedStripe
	}
	const secret = getRequiredValue('STRIPE secret key', getStripeSecretKey())
	cachedStripe = new Stripe(secret, { apiVersion: '2024-06-20' })
	return cachedStripe
}

export function getProductConfig(productSlug: ProductSlug): ProductConfig {
	const baseConfig = PRODUCT_MAP[productSlug]
	if (!baseConfig) {
		throw new Error(`[store] Unsupported product slug: ${productSlug}`)
	}
	const priceId =
		productSlug === 'prokit'
			? getRequiredValue(baseConfig.priceEnv, getStripePriceProkit())
			: getRequiredValue(baseConfig.priceEnv, getStripePriceSaaskit())
	const { repoOwner, repoName } = getGithubConfig(productSlug)
	const githubRepo = `${repoOwner}/${repoName}`

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
		let effectiveSession = session

		if (!effectiveSession) {
			return {
				state: 'invalid_session',
				message: 'Session not found.',
			}
		}

		if (effectiveSession.metadata?.product_slug !== expectedProduct) {
			return {
				state: 'invalid_session',
				message: 'This session does not match the selected product.',
			}
		}

		if (effectiveSession.payment_status !== 'paid') {
			return {
				state: 'unpaid',
				message: 'Payment not completed yet.',
				productSlug: expectedProduct,
				email: getSessionEmail(effectiveSession),
			}
		}

		// Self-heal paid sessions when webhook delivery is delayed or unavailable.
		if (getMetadataValue(effectiveSession, productConfig.paidKey) !== 'true') {
			try {
				await markSessionPaid(effectiveSession)
				const refreshedSession = await retrieveSessionById(effectiveSession.id)
				if (refreshedSession) {
					effectiveSession = refreshedSession
				}
			} catch (error) {
				console.error('[store] Failed to auto-mark paid session', error)
			}
		}

		if (getMetadataValue(effectiveSession, productConfig.paidKey) !== 'true') {
			return {
				state: 'unpaid',
				message:
					'Payment is still being verified by Stripe webhook. If you just paid, wait a minute and refresh this page.',
				productSlug: expectedProduct,
				email: getSessionEmail(effectiveSession),
			}
		}

		const email = getSessionEmail(effectiveSession)
		const githubUsername =
			getMetadataValue(effectiveSession, productConfig.usernameKey) || null

		await syncLicenseRecord(effectiveSession, expectedProduct)

		if (isProvisioned(effectiveSession, productConfig.provisionedKey)) {
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
		let pendingVerificationStatus: EntitlementStatus | null = null

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
				if (
					status.state === 'unpaid' &&
					(status.email || '').trim().toLowerCase() === normalizedEmail
				) {
					pendingVerificationStatus = status
				}
				continue
			}

			if ((status.email || '').trim().toLowerCase() !== normalizedEmail) {
				continue
			}

			return { session, status }
		}

		if (pendingVerificationStatus) {
			return {
				session: null,
				status: pendingVerificationStatus,
			}
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
	githubUsername: string,
	accessState?: 'invited' | 'pending_invitation' | 'already_has_access'
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

	await syncLicenseRecord(session, productSlug, {
		githubUsername,
		provisioningStatus: 'completed',
		accessStatus: mapProvisionedAccessStatus(accessState),
	})
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

	await syncLicenseRecord(session, slug, {
		provisioningStatus: isProvisioned(session, config.provisionedKey) ? 'completed' : 'pending',
	})
}
