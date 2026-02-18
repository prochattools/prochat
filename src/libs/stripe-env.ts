type StripeMode = 'test' | 'live'

const DEFAULT_MODE: StripeMode = 'test'

const normalize = (value?: string | null): string => (value || '').trim()

const resolveModeAlias = (mode: string): StripeMode => {
	if (['live', 'life', 'prod', 'production'].includes(mode)) return 'live'
	if (['test', 'sandbox', 'dev', 'development'].includes(mode)) return 'test'
	return DEFAULT_MODE
}

const resolveMode = (): StripeMode => {
	const mode = normalize(process.env.STRIPE_MODE).toLowerCase()
	return resolveModeAlias(mode)
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

export const getClientStripeMode = (): StripeMode => {
	const clientMode = normalize(process.env.NEXT_PUBLIC_STRIPE_MODE).toLowerCase()
	if (clientMode) return resolveModeAlias(clientMode)
	return resolveMode()
}

const getSecretKeyMode = (key: string): StripeMode | 'unknown' => {
	if (key.startsWith('sk_live_')) return 'live'
	if (key.startsWith('sk_test_')) return 'test'
	return 'unknown'
}

const getPublishableKeyMode = (key: string): StripeMode | 'unknown' => {
	if (key.startsWith('pk_live_')) return 'live'
	if (key.startsWith('pk_test_')) return 'test'
	return 'unknown'
}

function assertModeMatchesKeyType(
	mode: StripeMode,
	key: string,
	keyType: 'secret' | 'publishable'
): void {
	const resolved = normalize(key)
	if (!resolved) return

	const inferred =
		keyType === 'secret' ? getSecretKeyMode(resolved) : getPublishableKeyMode(resolved)
	if (inferred === 'unknown') return

	if (inferred !== mode) {
		throw new Error(
			`[stripe-env] STRIPE_MODE=${mode} but resolved ${keyType} key is ${inferred}.`
		)
	}
}

export const getStripeSecretKey = (): string =>
	(() => {
		const mode = getStripeMode()
		const key = byMode(
		process.env.STRIPE_SECRET_KEY_TEST,
		process.env.STRIPE_SECRET_KEY_LIVE,
		process.env.STRIPE_SECRET_KEY
		)
		assertModeMatchesKeyType(mode, key, 'secret')
		return key
	})()

export const getStripeWebhookSecret = (): string =>
	byMode(
		process.env.STRIPE_WEBHOOK_SECRET_TEST,
		process.env.STRIPE_WEBHOOK_SECRET_LIVE,
		process.env.STRIPE_WEBHOOK_SECRET
	)

export const getStripePublishableKey = (): string =>
	(() => {
		const mode = getClientStripeMode()
		const key = byMode(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST,
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE,
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
		)
		assertModeMatchesKeyType(mode, key, 'publishable')
		return key
	})()

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
