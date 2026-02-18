export type ProductSlug = 'prokit' | 'saaskit'

export interface EntitlementStatus {
	state:
		| 'invalid_session'
		| 'unpaid'
		| 'paid_unclaimed'
		| 'provisioned'
		| 'error'
	message?: string
	productSlug?: ProductSlug
	email?: string | null
	githubUsername?: string | null
}

export type ProductConfig = {
	productSlug: ProductSlug
	priceEnv: string
	paidKey: string
	provisionedKey: string
	usernameKey: string
	lastSessionKey: string
	priceId: string
	githubRepo: string
}
