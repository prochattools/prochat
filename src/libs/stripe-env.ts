type StripeMode = 'test' | 'live'

const normalize = (value?: string | null): string => (value || '').trim()

const resolveModeAlias = (mode: string): StripeMode | null => {
	if (['live', 'life', 'prod', 'production'].includes(mode)) return 'live'
	if (['test', 'sandbox', 'dev', 'development'].includes(mode)) return 'test'
	return null
}

function getCaseHint(envName: 'STRIPE_MODE' | 'NEXT_PUBLIC_STRIPE_MODE'): string {
	if (envName === 'STRIPE_MODE' && normalize(process.env.STRIPE_mode)) {
		return ' Found STRIPE_mode in env, but environment variable names are case-sensitive.'
	}
	if (
		envName === 'NEXT_PUBLIC_STRIPE_MODE' &&
		normalize(process.env.NEXT_PUBLIC_STRIPE_mode)
	) {
		return ' Found NEXT_PUBLIC_STRIPE_mode in env, but environment variable names are case-sensitive.'
	}
	return ''
}

function parseMode(
	rawValue: string | undefined,
	envName: 'STRIPE_MODE' | 'NEXT_PUBLIC_STRIPE_MODE'
): StripeMode {
	const mode = normalize(rawValue).toLowerCase()
	if (!mode) {
		throw new Error(
			`[stripe-env] Missing ${envName}. Set ${envName}=test or ${envName}=live.${getCaseHint(
				envName
			)}`
		)
	}
	const resolved = resolveModeAlias(mode)
	if (!resolved) {
		throw new Error(
			`[stripe-env] Invalid ${envName}="${mode}". Use one of: test, live.`
		)
	}
	return resolved
}

function requiredByMode(
	mode: StripeMode,
	testEnvName: string,
	liveEnvName: string,
	testValue?: string | null,
	liveValue?: string | null
): string {
	const modeValue = mode === 'live' ? normalize(liveValue) : normalize(testValue)
	if (!modeValue) {
		throw new Error(
			`[stripe-env] Missing ${
				mode === 'live' ? liveEnvName : testEnvName
			} for STRIPE_MODE=${mode}.`
		)
	}
	return modeValue
}

export const getStripeMode = (): StripeMode =>
	parseMode(process.env.STRIPE_MODE, 'STRIPE_MODE')

export const getClientStripeMode = (): StripeMode => {
	return parseMode(process.env.NEXT_PUBLIC_STRIPE_MODE, 'NEXT_PUBLIC_STRIPE_MODE')
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
		const key = requiredByMode(
			mode,
			'STRIPE_SECRET_KEY_TEST',
			'STRIPE_SECRET_KEY_LIVE',
			process.env.STRIPE_SECRET_KEY_TEST,
			process.env.STRIPE_SECRET_KEY_LIVE
		)
		assertModeMatchesKeyType(mode, key, 'secret')
		return key
	})()

export const getStripeWebhookSecret = (): string => {
	const mode = getStripeMode()
	return requiredByMode(
		mode,
		'STRIPE_WEBHOOK_SECRET_TEST',
		'STRIPE_WEBHOOK_SECRET_LIVE',
		process.env.STRIPE_WEBHOOK_SECRET_TEST,
		process.env.STRIPE_WEBHOOK_SECRET_LIVE
	)
}

export const getStripePublishableKey = (): string =>
	(() => {
		const mode = getClientStripeMode()
		const key = requiredByMode(
			mode,
			'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST',
			'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE',
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST,
			process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE
		)
		assertModeMatchesKeyType(mode, key, 'publishable')
		return key
	})()

export const getStripePriceProkit = (): string =>
	(() => {
		const mode = getStripeMode()
		return requiredByMode(
			mode,
			'STRIPE_PRICE_PROKIT_TEST',
			'STRIPE_PRICE_PROKIT_LIVE',
			process.env.STRIPE_PRICE_PROKIT_TEST,
			process.env.STRIPE_PRICE_PROKIT_LIVE
		)
	})()

export const getStripeProductProkit = (): string =>
	(() => {
		const mode = getStripeMode()
		return requiredByMode(
			mode,
			'STRIPE_PRODUCT_PROKIT_TEST',
			'STRIPE_PRODUCT_PROKIT_LIVE',
			process.env.STRIPE_PRODUCT_PROKIT_TEST,
			process.env.STRIPE_PRODUCT_PROKIT_LIVE
		)
	})()

export const getStripePriceSaaskit = (): string =>
	(() => {
		const mode = getStripeMode()
		return requiredByMode(
			mode,
			'STRIPE_PRICE_SAASKIT_TEST',
			'STRIPE_PRICE_SAASKIT_LIVE',
			process.env.STRIPE_PRICE_SAASKIT_TEST,
			process.env.STRIPE_PRICE_SAASKIT_LIVE
		)
	})()

export const getStripeProductSaaskit = (): string =>
	(() => {
		const mode = getStripeMode()
		return requiredByMode(
			mode,
			'STRIPE_PRODUCT_SAASKIT_TEST',
			'STRIPE_PRODUCT_SAASKIT_LIVE',
			process.env.STRIPE_PRODUCT_SAASKIT_TEST,
			process.env.STRIPE_PRODUCT_SAASKIT_LIVE
		)
	})()
