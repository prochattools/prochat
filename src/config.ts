import { ConfigProps } from '@/types'
import {
	getStripePriceProkit,
	getStripePriceSaaskit,
	getStripeProductProkit,
	getStripeProductSaaskit,
} from '@/libs/stripe-env'

const STRIPE_PRODUCT_ID_PROKIT = getStripeProductProkit()
const STRIPE_PRICE_ID_PROKIT = getStripePriceProkit()
const STRIPE_PRODUCT_ID_SAASKIT = getStripeProductSaaskit()
const STRIPE_PRICE_ID_SAASKIT = getStripePriceSaaskit()

const config: ConfigProps = {
	// REQUIRED
	appName: 'ProChat',
	// REQUIRED: a short description of your app for SEO tags (can be overwritten)
	appDescription:
		'ProChat helps founders build SaaS with structure, not guesswork. Structured systems, production-safe foundations, and AI-driven execution for non-technical founders.',
	// REQUIRED (no https://, no trailing slash; just the naked canonical domain)
	domainName: 'prochat.tools',
	stripe: {
		// Create multiple products in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
		products: [
			{
				type: 'one-time', // one-time, subscription
				title: 'ProChat ProKit',
					productId: STRIPE_PRODUCT_ID_PROKIT,
				subtitle: 'Lifetime access',
				price: 97,
				isBest: true,
				linkTitle: 'Get ProChat ProKit',
				featuresTitle: 'Features',
					priceId: STRIPE_PRICE_ID_PROKIT,
				features: [
					{ title: 'Unlimited Projects' },
					{ title: 'Full Source Code' },
					{ title: 'Lifetime Updates' },
					{ title: 'Discord Community' },
					{ title: 'Documentation' },
					{ title: 'Commercial License' },
				],
			},
			{
				type: 'one-time',
				title: 'ProChat SaaSkit',
					productId: STRIPE_PRODUCT_ID_SAASKIT,
				subtitle: 'Lifetime access',
				price: 247,
				isBest: false,
				linkTitle: 'Get SaaSkit',
				featuresTitle: 'Features',
					priceId: STRIPE_PRICE_ID_SAASKIT,
				features: [
					{ title: 'Client service funnel + delivery' },
					{ title: 'Ready-to-sell SaaS kit templates' },
					{ title: 'Stripe + billing flows included' },
					{ title: 'Docs and commercial license' },
				],
			},
		],
	},
	colors: {
		theme: 'dark',
		main: 'rgb(76, 111, 255)',
	},
	resend: {
		// REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
		fromAdmin: `ProChat Studio <info@prochat.tools>`,
		// Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
		supportEmail: 'info@prochat.tools',
		// When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
		forwardRepliesTo: 'info@prochat.tools',
		subjects: {
			thankYou: 'Welcome to ProChat',
		},
	},
}

export default config
