import { ConfigProps } from '@/types'

const config: ConfigProps = {
	// REQUIRED
	appName: 'SaaSKit',
	// REQUIRED: a short description of your app for SEO tags (can be overwritten)
	appDescription:
		'SaaSKit is ProChat’s commercial SaaS boilerplate built on the ProKit engine for shipping SaaS, AI tools, and web apps fast.',
	// REQUIRED (no https://, not trialing slash at the end, just the naked domain)
	domainName: 'prochat.tools',
	stripe: {
		// Create multiple products in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
		products: [
			{
				type: 'one-time', // one-time, subscription
				title: 'One Time Deal',
				productId: 'prod_T3pFkpyoE0SNMD',
				subtitle: 'Once',
				price: 25,
				isBest: true,
				linkTitle: 'PAY ONE TIME',
				featuresTitle: 'Features',
				priceId: 'price_1S7hauQ6GY0txCDNErDhgmjn',
				features: [
					{
						title: 'Feature 1',
						disabled: false,
					},
					{
						title: 'Feature 2',
						disabled: true,
					},
				],
			},
			{
				type: 'subscription',
				period: 'year',
				productId: 'prod_T3pFJYo1qjQhxD',
				title: 'Year',
				subtitle: 'yearly',
				price: 25,
				linkTitle: 'PAY PER YEAR',
				featuresTitle: 'Features VIP',
				priceId: 'price_1S7hb8Q6GY0txCDNIYng1ClO',
				features: [
					{
						title: 'Feature 1',
						disabled: false,
					},
					{
						title: 'Feature 2',
						disabled: false,
					},
				],
			},
		],
	},
	colors: {
		// REQUIRED — Theme name used by the UI (light/dark). Leave blank to defer to system.
		theme: 'light',
		// REQUIRED — This color is used for browser UI (tabs, PWA theme, loading bar, etc.).
		// Use a HEX value that matches your primary brand color.
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
			thankYou: 'Welcome to SaaSKit',
		},
	},
}

export default config
