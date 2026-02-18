type StripeMode = 'test' | 'live'

const DEFAULT_MODE: StripeMode = 'test'

const normalize = (value?: string | null): string => (value || '').trim()

const resolveMode = (): StripeMode => {
	const mode = normalize(process.env.STRIPE_MODE).toLowerCase()
	if (mode === 'live') return 'live'
	return DEFAULT_MODE
}

const byMode = (
	testValue?: string | null,
	liveValue?: string | null,
	legacyValue?: string | null,
	legacyPublicValue?: string | null
): string => {
	const mode = resolveMode()
	const modeValue = mode === 'live' ? normalize(liveValue) : normalize(testValue)
	return (
		modeValue ||
		normalize(legacyValue) ||
		normalize(legacyPublicValue) ||
		''
	)
}

export const getStripeMode = (): StripeMode => resolveMode()

export const getStripeSecretKey = (): string =>
	byMode(
		process.env.STRIPE_SECRET_KEY_TEST,
		process.env.STRIPE_SECRET_KEY_LIVE,
		process.env.STRIPE_SECRET_KEY
	)

export const getStripeWebhookSecret = (): string =>
	byMode(
		process.env.STRIPE_WEBHOOK_SECRET_TEST,
		process.env.STRIPE_WEBHOOK_SECRET_LIVE,
		process.env.STRIPE_WEBHOOK_SECRET
	)

export const getStripePublishableKey = (): string =>
	byMode(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST,
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE,
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
	)

export const getStripePriceProkit = (): string =>
	byMode(
		process.env.STRIPE_PRICE_PROKIT_TEST,
		process.env.STRIPE_PRICE_PROKIT_LIVE,
		process.env.STRIPE_PRICE_PROKIT,
		process.env.NEXT_PUBLIC_STRIPE_PRICE_PROKIT
	)

export const getStripeProductProkit = (): string =>
	byMode(
		process.env.STRIPE_PRODUCT_PROKIT_TEST,
		process.env.STRIPE_PRODUCT_PROKIT_LIVE,
		process.env.STRIPE_PRODUCT_PROKIT,
		process.env.NEXT_PUBLIC_STRIPE_PRODUCT_PROKIT
	)

export const getStripePriceSaaskit = (): string =>
	byMode(
		process.env.STRIPE_PRICE_SAASKIT_TEST,
		process.env.STRIPE_PRICE_SAASKIT_LIVE,
		process.env.STRIPE_PRICE_SAASKIT,
		process.env.NEXT_PUBLIC_STRIPE_PRICE_SAASKIT
	)

export const getStripeProductSaaskit = (): string =>
	byMode(
		process.env.STRIPE_PRODUCT_SAASKIT_TEST,
		process.env.STRIPE_PRODUCT_SAASKIT_LIVE,
		process.env.STRIPE_PRODUCT_SAASKIT,
		process.env.NEXT_PUBLIC_STRIPE_PRODUCT_SAASKIT
	)
