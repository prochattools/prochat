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

const listClass =
	'mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600'
const headingClass = 'mb-3 text-xl font-bold text-slate-900 dark:text-white'
const subheadingClass =
	'mb-2 mt-6 text-base font-bold text-slate-900 dark:text-white'
const linkClass =
	'font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900 dark:text-white dark:decoration-slate-600 dark:hover:decoration-white'

export default function PrivacyPage() {
	return (
		<section className="relative bg-transparent py-24">
			<div className="mx-auto w-full max-w-3xl px-page">
				<article className="space-y-10 leading-relaxed text-slate-600 dark:text-slate-300">
					<header className="mb-12">
						<h1 className="mb-4 text-3xl font-bold tracking-[-0.05em] text-slate-900 dark:text-white md:text-4xl">
							PRIVACY POLICY
						</h1>
						<p className="text-sm font-medium text-slate-500 dark:text-slate-400">
							Last updated: 25 July 2026
						</p>
					</header>

					<section aria-labelledby="privacy-scope">
						<h2 id="privacy-scope" className={headingClass}>
							1. SCOPE AND CONTROLLER
						</h2>
						<p>
							This policy explains how ProChat handles personal data when you use
							this website, contact us, or apply to participate in a selected beta.
						</p>
						<div className="mt-4 font-medium text-slate-900 dark:text-white">
							<p>Steve Westhoek, trading as ProChat</p>
							<p>Trabalhador Independente</p>
							<p>A. dos Descobri. 40, 4E.</p>
							<p>
								Privacy contact:{' '}
								<a className={linkClass} href="mailto:privacy@prochat.tools">
									privacy@prochat.tools
								</a>
							</p>
						</div>
					</section>

					<section aria-labelledby="privacy-data">
						<h2 id="privacy-data" className={headingClass}>
							2. DATA WE HANDLE
						</h2>
						<h3 className={subheadingClass}>Contact and beta enquiries</h3>
						<p>The Contact form may collect:</p>
						<ul className={listClass}>
							<li>Your name and email address</li>
							<li>The topic you select</li>
							<li>An optional company or project URL</li>
							<li>Your message</li>
							<li>A hidden honeypot value used to identify automated spam</li>
						</ul>
						<p>
							The Contact form does not accept file uploads. The website does not
							store Contact submissions in its application database.
						</p>

						<h3 className={subheadingClass}>Technical security data</h3>
						<p>
							For Contact-form security, the server reads the IP address supplied
							by trusted proxy headers and uses it for a short-lived, in-memory
							rate limit of six requests per minute. That rate-limit state is not
							written to repository-backed storage.
						</p>

						<h3 className={subheadingClass}>Analytics</h3>
						<p>
							ProChat uses privacy-focused Umami analytics hosted in Europe.
							Umami processes limited usage information and uses analytics cookies.
							Analytics data is retained according to the operational retention
							configured for the Umami installation. You may contact us for the
							current setting.
						</p>
					</section>

					<section aria-labelledby="privacy-use">
						<h2 id="privacy-use" className={headingClass}>
							3. HOW AND WHY WE USE DATA
						</h2>
						<ul className={listClass}>
							<li>To respond to enquiries and beta applications</li>
							<li>To send an acknowledgement or confirmation email</li>
							<li>To prevent spam, abuse, and excessive automated requests</li>
							<li>To operate, secure, and improve the public website</li>
							<li>To understand privacy-focused website usage through Umami</li>
							<li>To comply with applicable legal obligations</li>
						</ul>
						<p>
							Depending on the activity, processing is based on our legitimate
							interests in operating and securing the website, steps requested by
							you before beta participation, consent for non-essential analytics
							cookies, or compliance with legal obligations.
						</p>
					</section>

					<section aria-labelledby="privacy-sharing">
						<h2 id="privacy-sharing" className={headingClass}>
							4. SERVICE PROVIDERS AND SHARING
						</h2>
						<p>We use a limited set of service providers:</p>
						<ul className={listClass}>
							<li>
								<strong>Resend</strong> sends Contact notifications and confirmation
								emails.
							</li>
							<li>
								Our European hosting and deployment infrastructure serves the
								website and related application systems.
							</li>
							<li>
								Our European Umami installation processes privacy-focused analytics data.
							</li>
							<li>
								GitHub processes data when you choose to follow links to public
								repositories or use GitHub features.
							</li>
						</ul>
						<p>
							Contact messages are delivered to{' '}
							<a className={linkClass} href="mailto:info@prochat.tools">
								info@prochat.tools
							</a>
							. We do not sell personal data. We may disclose information where
							required by law or necessary to protect users, ProChat, or the
							public.
						</p>
					</section>

					<section aria-labelledby="privacy-retention">
						<h2 id="privacy-retention" className={headingClass}>
							5. RETENTION, DELETION, AND BACKUPS
						</h2>
						<p>
							Contact enquiries and related mailbox correspondence are normally
							retained for up to 24 months after the last correspondence, unless a
							longer period is reasonably required for legal compliance, security,
							record-keeping, or dispute resolution.
						</p>
						<p className="mt-4">
							Delivery metadata and message processing performed by Resend are
							retained according to Resend&apos;s operational policies and the relevant
							account configuration.
						</p>
						<p className="mt-4">
							You may request deletion at privacy@prochat.tools. We will apply the
							request to data we control, subject to legal or security reasons for
							continued retention. Deleted information may remain in encrypted
							backups until those backups expire through the normal backup-rotation
							process.
						</p>
					</section>

					<section aria-labelledby="privacy-transfers">
						<h2 id="privacy-transfers" className={headingClass}>
							6. PROCESSING LOCATIONS
						</h2>
						<p>
							ProChat&apos;s production hosting, deployment, database infrastructure,
							and Umami analytics are configured in Europe. External providers
							such as Resend and GitHub process data under their own terms and
							privacy notices. Where applicable, we rely on the safeguards made
							available by those providers and applicable data-protection law.
						</p>
					</section>

					<section aria-labelledby="privacy-security">
						<h2 id="privacy-security" className={headingClass}>
							7. SECURITY
						</h2>
						<p>
							We use measures including input validation, spam detection,
							short-lived rate limiting, scoped environment secrets, and limited
							data collection. No internet service can guarantee absolute
							security.
						</p>
					</section>

					<section aria-labelledby="privacy-rights">
						<h2 id="privacy-rights" className={headingClass}>
							8. YOUR DATA-PROTECTION RIGHTS
						</h2>
						<p>
							Depending on applicable law, you may request access, correction,
							deletion, restriction, portability, or objection, and may withdraw
							consent where processing relies on consent. Contact
							privacy@prochat.tools. We may need to verify your identity before
							acting on a request. We aim to respond within one month, as required
							by the GDPR, although complex requests may take longer where the law
							allows.
						</p>
						<p className="mt-4">
							You may also complain to the competent data-protection authority.
						</p>
					</section>

					<section aria-labelledby="privacy-cookies">
						<h2 id="privacy-cookies" className={headingClass}>
							9. COOKIES
						</h2>
						<p>
							The website may use essential cookies needed for security or basic
							operation and analytics cookies associated with Umami. ProChat does
							not use advertising cookies or third-party marketing trackers. You
							can control cookies through your browser settings. Disabling
							analytics cookies does not prevent access to the public website.
						</p>
					</section>

					<section aria-labelledby="privacy-links">
						<h2 id="privacy-links" className={headingClass}>
							10. THIRD-PARTY LINKS
						</h2>
						<p>
							The website links to GitHub and other third-party services. Their
							privacy practices and terms apply when you use those services.
						</p>
					</section>

					<section aria-labelledby="privacy-updates">
						<h2 id="privacy-updates" className={headingClass}>
							11. POLICY UPDATES
						</h2>
						<p>
							We may update this policy when our products, providers, or legal
							requirements change. The date above identifies the current version.
						</p>
					</section>
				</article>
			</div>
		</section>
	)
}
