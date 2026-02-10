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
		<section className="py-24 bg-white relative dark:bg-[#0B111B]">
			<main className="mx-auto w-full max-w-3xl px-6 sm:px-8">
				<article className="space-y-10 text-slate-600 dark:text-slate-300 leading-relaxed">
					<header className="mb-12">
						<h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 dark:text-white">
							PRIVACY POLICY
						</h1>
						<p className="text-slate-500 text-sm font-medium dark:text-slate-400">
							Last updated: 28 October 2025
						</p>
					</header>

					<div className="space-y-4">
						<p className="font-bold text-slate-900 uppercase tracking-wide text-xs md:text-sm dark:text-white">
							PLEASE READ THIS TERMS OF SERVICE AGREEMENT CAREFULLY, AS IT
							CONTAINS IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS AND
							REMEDIES.
						</p>
						<p>
							These Terms of Service (“Terms”) govern your access to and use of
							ProChat™ provided by ArkWare Solutions (“Company”, “we”, “our”). By
							using the Service, you agree to these Terms.
						</p>
						<p>By using the Service, you consent to this Privacy Policy.</p>
					</div>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							1. Data Controller
						</h2>
						<div className="pl-1">
							<p className="font-medium text-slate-900 dark:text-white">
								ArkWare Solutions
							</p>
							<p>Arnhem, The Netherlands</p>
							<p className="mt-1">
								<span className="text-slate-400 dark:text-slate-500">
									Contact:
								</span>{' '}
								submit a ticket
							</p>
						</div>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-4 dark:text-white">
							2. Data We Collect
						</h2>
						<p className="mb-6">We may collect the following information:</p>

						<div className="space-y-6 pl-1">
							<div>
								<h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 dark:text-white">
									Account Information
								</h3>
								<p>Name, email address, password, and profile details.</p>
							</div>
							<div>
								<h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 dark:text-white">
									Payment Information
								</h3>
								<p>
									If you purchase a subscription, payment details are processed
									securely by Stripe. We do not store full credit card information.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 dark:text-white">
									Usage Information
								</h3>
								<p>
									IP address, browser type, device information, pages visited, and
									timestamps for security and analytics.
								</p>
							</div>
							<div>
								<h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 dark:text-white">
									Chat Content
								</h3>
								<p>Messages and files you send or upload are stored until you delete them.</p>
							</div>
							<div>
								<h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide mb-1 dark:text-white">
									Cookies & Similar Technologies
								</h3>
								<p>
									Used for authentication, functionality, and analytics via Google
									Analytics.
								</p>
							</div>
						</div>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							3. Lawful Basis for Processing (GDPR)
						</h2>
						<p className="mb-4">
							We process personal data under one or more of the following legal bases:
						</p>
						<ul className="list-disc pl-5 space-y-2 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Performance of a contract (providing the Service)</li>
							<li>Legitimate interests (security, fraud prevention, product improvements)</li>
							<li>Consent (newsletter marketing, optional cookies)</li>
							<li>Compliance with legal obligations</li>
						</ul>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							4. How We Use Data
						</h2>
						<ul className="list-disc pl-5 space-y-2 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Provide and maintain the Service</li>
							<li>Authenticate user accounts</li>
							<li>Process subscriptions and billing</li>
							<li>Improve performance and security</li>
							<li>Communicate updates and marketing messages (opt-out available)</li>
							<li>Analyze usage trends with Google Analytics</li>
						</ul>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							5. Sharing Your Information
						</h2>
						<p className="mb-4">
							We only share data with trusted service providers who assist in
							operating the Service:
						</p>
						<ul className="list-disc pl-5 space-y-2 mb-6 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Stripe (payments)</li>
							<li>Google Analytics (usage metrics)</li>
							<li>Hosting and infrastructure providers</li>
						</ul>
						<p className="font-medium text-slate-900 dark:text-white">
							We do not sell or rent personal data.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							6. Data Retention
						</h2>
						<p>
							Account and chat data are stored until the user deletes them or closes
							their account, unless retention is required for legal obligations.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							7. International Transfers
						</h2>
						<p>
							Your data may be processed outside the EU. We ensure appropriate
							safeguards such as Standard Contractual Clauses where required.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							8. Security
						</h2>
						<p>
							We implement industry-standard measures to protect your data but
							cannot guarantee absolute security of information transmitted online.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							9. Your Rights (GDPR)
						</h2>
						<p className="mb-4">You may:</p>
						<ul className="list-disc pl-5 space-y-2 mb-6 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Request access to your data</li>
							<li>Request correction or deletion</li>
							<li>Withdraw consent for marketing</li>
							<li>Object to certain processing</li>
							<li>Request data portability</li>
							<li>Lodge a complaint with a supervisory authority</li>
						</ul>
						<p className="bg-slate-50 p-3 rounded-lg border border-slate-100 inline-block text-sm dark:bg-[#0F1626] dark:border-[#1E242D]">
							To exercise rights:{' '}
							<span className="font-bold text-slate-900 dark:text-white">
								submit a ticket
							</span>
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							10. Children’s Privacy
						</h2>
						<p>
							The Service is intended for adults only (18+). We do not knowingly
							collect data from minors.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							11. Third-Party Links
						</h2>
						<p>
							We are not responsible for the privacy practices of websites linked
							from our Service.
						</p>
					</article>

					<article>
						<h2 className="text-xl font-bold text-slate-900 mb-3 dark:text-white">
							12. Updates to This Policy
						</h2>
						<p>
							We may update this Privacy Policy at any time. Continued use after
							changes indicates acceptance.
						</p>
					</article>

					<div className="pt-10 border-t border-slate-100 mt-10 dark:border-[#1E242D]">
						<p className="mb-2">
							For any privacy questions:{' '}
							<span className="font-medium text-slate-900 dark:text-white">
								submit a ticket
							</span>
						</p>
						<p>
							Still have a question? Here you can{' '}
							<span className="font-medium text-slate-900 dark:text-white">
								submit a ticket
							</span>
							.
						</p>
					</div>
				</article>
			</main>
		</section>
	)
}
