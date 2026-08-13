import { ConfigProps } from '@/types'

const config: ConfigProps = {
	// REQUIRED
	appName: 'ProChat',
	// REQUIRED: a short description of your app for SEO tags (can be overwritten)
	appDescription:
		'ProChat helps businesses turn repeated emails, notes, examples, reports, and follow-ups into drafts, summaries, tasks, and replies their team can review and use.',
	// REQUIRED (no https://, no trailing slash; just the naked canonical domain)
	domainName: 'prochat.tools',
	colors: {
		theme: 'dark',
		main: 'rgb(76, 111, 255)',
	},
	resend: {
		// REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
		fromAdmin: `ProChat <info@prochat.tools>`,
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
