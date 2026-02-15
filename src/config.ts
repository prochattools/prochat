import { ConfigProps } from '@/types'

const STRIPE_PRODUCT_PROKIT = process.env.STRIPE_PRODUCT_PROKIT ?? ''
const STRIPE_PRICE_PROKIT = process.env.STRIPE_PRICE_PROKIT ?? ''
const STRIPE_PRODUCT_SAASKIT = process.env.STRIPE_PRODUCT_SAASKIT ?? ''
const STRIPE_PRICE_SAASKIT = process.env.STRIPE_PRICE_SAASKIT ?? ''

const config: ConfigProps = {
	// REQUIRED
	appName: 'ProChat',
	// REQUIRED: a short description of your app for SEO tags (can be overwritten)
	appDescription:
		'ProChat is built on ProKit—our internal Next.js starter for shipping SaaS, AI tools, or any other web app fast.',
	// REQUIRED (no https://, not trialing slash at the end, just the naked domain)
	domainName: 'prokit.prochat.tools',
	stripe: {
		// Create multiple products in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
		products: [
			{
				type: 'one-time', // one-time, subscription
				title: 'ProChat ProKit',
				productId: STRIPE_PRODUCT_PROKIT,
				subtitle: 'Lifetime access',
				price: 97,
				isBest: true,
				linkTitle: 'Get ProChat ProKit',
				featuresTitle: 'Features',
				priceId: STRIPE_PRICE_PROKIT,
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
				productId: STRIPE_PRODUCT_SAASKIT,
				subtitle: 'Lifetime access',
				price: 197,
				isBest: false,
				linkTitle: 'Get SaaSkit',
				featuresTitle: 'Features',
				priceId: STRIPE_PRICE_SAASKIT,
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
		theme: 'light',
		main: '#006FEE',
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
