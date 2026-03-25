import { getSEOTags } from '@/libs/seo'

export const metadata = getSEOTags({
	title: 'Privacy Policy | ProChat',
	description: 'Privacy Policy for ProChat and the use of https://prochat.tools.',
	openGraph: {
		title: 'Privacy Policy | ProChat',
		description:
			'Privacy Policy for ProChat and the use of https://prochat.tools.',
	},
	canonicalUrlRelative: '/privacy',
})

export default function PrivacyPage() {
	return (
		<section className="relative bg-transparent py-24">
			<main className="mx-auto w-full max-w-3xl px-page">
				<article className="space-y-10 leading-relaxed text-slate-600 dark:text-slate-300">
					<header className="mb-12">
						<h1 className="mb-4 text-3xl font-bold tracking-[-0.05em] text-slate-900 dark:text-white md:text-4xl">
							PRIVACY POLICY
						</h1>
						<p className="text-sm font-medium text-slate-500 dark:text-slate-400">
							Last updated: 20 February 2026
						</p>
					</header>

					<div className="space-y-4">
						<p>
							This Privacy Policy explains how personal data is collected and
							processed by:
						</p>
						<p className="font-medium text-slate-900 dark:text-white">
							Steve Westhoek, trading as ProChat (ENI)
							<br />
							Porto, Portugal
							<br />
							Email: support@prochat.tools
						</p>
						<p>
							By using this website or purchasing any Product, you agree to this
							Policy.
						</p>
					</div>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							1. DATA CONTROLLER
						</h2>
						<p>The data controller is:</p>
						<div className="mt-4">
							<p className="font-medium text-slate-900 dark:text-white">Steve Westhoek (ENI)</p>
							<p>Trading as ProChat</p>
							<p>Porto, Portugal</p>
							<p>support@prochat.tools</p>
						</div>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							2. DATA WE COLLECT
						</h2>
						<p>
							We collect only data necessary to operate our business and deliver
							our digital products.
						</p>

						<h3 className="mb-2 mt-6 text-base font-bold text-slate-900 dark:text-white">
							A. Purchase &amp; Account Data
						</h3>
						<p>When you purchase a Product:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Name</li>
							<li>Email address</li>
							<li>Billing information</li>
							<li>Company name (if provided)</li>
							<li>Transaction details</li>
						</ul>
						<p>
							Payments are processed securely by Stripe. We do not store full
							credit card details.
						</p>
						<p className="mt-4">
							Stripe may store transaction metadata necessary for licensing and
							fraud prevention.
						</p>

						<h3 className="mb-2 mt-6 text-base font-bold text-slate-900 dark:text-white">
							B. GitHub Access
						</h3>
						<p>If Product access includes a private repository:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Your GitHub username</li>
							<li>Associated email (via GitHub OAuth)</li>
						</ul>
						<p>
							This is used solely to grant and manage repository access.
						</p>
						<p className="mt-4">
							GitHub processes your data under its own Privacy Policy.
						</p>

						<h3 className="mb-2 mt-6 text-base font-bold text-slate-900 dark:text-white">
							C. Email Communications
						</h3>
						<p>We use:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>
								Resend for transactional emails (receipts, product access,
								system notifications)
							</li>
							<li>
								MailerLite for newsletters and marketing communications (if you
								opt in)
							</li>
						</ul>
						<p>You may unsubscribe from marketing emails at any time.</p>

						<h3 className="mb-2 mt-6 text-base font-bold text-slate-900 dark:text-white">
							D. Technical &amp; Usage Data
						</h3>
						<p>We collect limited technical data:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>IP address</li>
							<li>Browser type</li>
							<li>Device information</li>
							<li>Pages visited</li>
							<li>Timestamps</li>
						</ul>
						<p>Used for security, fraud prevention, and analytics.</p>

						<h3 className="mb-2 mt-6 text-base font-bold text-slate-900 dark:text-white">
							E. Analytics
						</h3>
						<p>
							We use Google Analytics to understand website performance and usage
							trends.
						</p>
						<p className="mt-4">Analytics data may include:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Page interactions</li>
							<li>Session duration</li>
							<li>Approximate geographic location</li>
							<li>Device type</li>
						</ul>
						<p>
							Google may process data outside the EU in accordance with its own
							safeguards.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							3. PURPOSE OF PROCESSING
						</h2>
						<p>We process personal data to:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Deliver digital products</li>
							<li>Grant GitHub repository access</li>
							<li>Process payments</li>
							<li>Provide transactional communications</li>
							<li>Send marketing communications (if consented)</li>
							<li>Prevent fraud and abuse</li>
							<li>Improve website performance</li>
						</ul>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							4. LEGAL BASIS (GDPR)
						</h2>
						<p>We process personal data under:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>
								Contractual necessity (product delivery and payment processing)
							</li>
							<li>
								Legitimate interest (security, fraud prevention, analytics)
							</li>
							<li>Consent (marketing emails and optional cookies)</li>
							<li>
								Legal obligations (tax and accounting compliance under Portuguese
								law)
							</li>
						</ul>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							5. DATA SHARING
						</h2>
						<p>
							We share personal data only with necessary service providers:
						</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Stripe (payment processing)</li>
							<li>GitHub (repository access)</li>
							<li>MailerLite (email marketing)</li>
							<li>Resend (transactional email)</li>
							<li>Google Analytics (usage analytics)</li>
							<li>Hosting providers (website infrastructure)</li>
						</ul>
						<p>We do not sell, rent, or trade personal data.</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							6. DATA RETENTION
						</h2>
						<p>We retain:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>
								Purchase and invoice records as required by Portuguese tax law
							</li>
							<li>
								License-related data while Product access is active
							</li>
							<li>Marketing data until consent is withdrawn</li>
						</ul>
						<p>You may request deletion where legally permissible.</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							7. INTERNATIONAL TRANSFERS
						</h2>
						<p>
							Some service providers (Stripe, GitHub, Google, MailerLite,
							Resend) may process data outside the EU.
						</p>
						<p className="mt-4">
							Where required, appropriate safeguards such as Standard
							Contractual Clauses are relied upon.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							8. SECURITY
						</h2>
						<p>
							We implement reasonable technical and organizational safeguards to
							protect personal data.
						</p>
						<p className="mt-4">
							However, no online transmission can be guaranteed 100% secure.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							9. YOUR RIGHTS (GDPR)
						</h2>
						<p>You have the right to:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Access your personal data</li>
							<li>Request correction</li>
							<li>Request deletion (where legally permitted)</li>
							<li>Withdraw consent for marketing</li>
							<li>Object to certain processing</li>
							<li>Request data portability</li>
							<li>Lodge a complaint with a supervisory authority</li>
						</ul>
						<p>
							To exercise your rights, contact:
							<br />
							support@prochat.tools
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							10. COOKIES
						</h2>
						<p>We use essential cookies for functionality.</p>
						<p className="mt-4">
							Analytics cookies may be used for performance analysis.
						</p>
						<p className="mt-4">
							You may disable cookies in your browser settings.
						</p>
						<p className="mt-4">
							If required by EU law, a cookie consent mechanism will be
							provided.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							11. THIRD-PARTY LINKS
						</h2>
						<p>
							We are not responsible for third-party websites or services linked
							from our website.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							12. POLICY UPDATES
						</h2>
						<p>We may update this Policy periodically.</p>
						<p className="mt-4">
							The latest version will always be published on this page.
						</p>
					</article>
				</article>
			</main>
		</section>
	)
}
