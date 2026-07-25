import { getSEOTags } from '@/libs/seo'

export const metadata = getSEOTags({
	title: 'Terms of Service | ProChat',
	description:
		'Terms of Service for ProChat and the use of https://prochat.tools.',
	openGraph: {
		title: 'Terms of Service | ProChat',
		description:
			'Terms of Service for ProChat and the use of https://prochat.tools.',
	},
	canonicalUrlRelative: '/terms',
})

const memoryQaLicenseUrl =
	'https://github.com/prochattools/memory-qa/blob/main/LICENSE.md'
const workbenchLicenseUrl =
	'https://github.com/prochattools/workbench/blob/main/LICENSE'

const listClass =
	'mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600'
const headingClass = 'mb-3 text-xl font-bold text-slate-900 dark:text-white'
const linkClass =
	'font-medium text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-900 dark:text-white dark:decoration-slate-600 dark:hover:decoration-white'

export default function TermsPage() {
	return (
		<section className="relative bg-transparent py-24">
			<div className="mx-auto w-full max-w-3xl px-page">
				<article className="space-y-10 leading-relaxed text-slate-600 dark:text-slate-300">
					<header className="mb-12">
						<h1 className="mb-4 text-3xl font-bold tracking-[-0.05em] text-slate-900 dark:text-white md:text-4xl">
							TERMS OF SERVICE
						</h1>
						<p className="text-sm font-medium text-slate-500 dark:text-slate-400">
							Last updated: 25 July 2026
						</p>
					</header>

					<section aria-labelledby="terms-scope">
						<h2 id="terms-scope" className={headingClass}>
							1. SCOPE
						</h2>
						<p>
							These Terms govern your use of the ProChat public website,
							documentation, Contact form, beta application process, and links to
							public product repositories. ProChat is operated by Steve Westhoek,
							trading as ProChat, Trabalhador Independente, A. dos Descobri. 40,
							4E.
						</p>
						<p className="mt-4">
							Product-specific repository licenses or written beta agreements
							control where they conflict with these website Terms.
						</p>
					</section>

					<section aria-labelledby="terms-website">
						<h2 id="terms-website" className={headingClass}>
							2. WEBSITE AND CONTACT USE
						</h2>
						<p>
							You may browse the public website and documentation for lawful
							informational purposes. When you submit a Contact message or beta
							application, provide accurate information that you are authorized to
							share. Do not submit secrets, credentials, confidential client data,
							private repository contents, unlawful content, or material that
							violates another person's rights.
						</p>
						<p className="mt-4">
							Submitting an enquiry does not create a customer relationship,
							guarantee beta approval, or obligate ProChat to provide a product,
							service, response, or support.
						</p>
					</section>

					<section aria-labelledby="terms-memory-qa">
						<h2 id="terms-memory-qa" className={headingClass}>
							3. MEMORY FOR QA SELECTED BETA
						</h2>
						<p>
							ProChat Memory for QA is a public source-available selected beta. It
							is not open-source software. Only people or organizations approved
							by ProChat may clone, evaluate, modify, or use it locally within the
							approved beta scope.
						</p>
						<p className="mt-4">
							The{' '}
							<a
								className={linkClass}
								href={memoryQaLicenseUrl}
								rel="noreferrer"
								target="_blank"
							>
								Memory for QA Beta Evaluation License
							</a>{' '}
							is the binding license for the public beta snapshot and controls if
							it conflicts with these Terms. It limits use to evaluation and
							testing by approved participants and prohibits unauthorized
							production use, redistribution, resale, hosted service use, and
							commercial exploitation.
						</p>
					</section>

					<section aria-labelledby="terms-workbench">
						<h2 id="terms-workbench" className={headingClass}>
							4. WORKBENCH AND OPEN-SOURCE SOFTWARE
						</h2>
						<p>
							ProChat Workbench is free, self-hosted software distributed under
							the GNU Affero General Public License version 3.0 only
							(&ldquo;AGPL-3.0-only&rdquo;). The{' '}
							<a
								className={linkClass}
								href={workbenchLicenseUrl}
								rel="noreferrer"
								target="_blank"
							>
								Workbench LICENSE
							</a>{' '}
							controls your rights and obligations for covered repository files.
						</p>
						<p className="mt-4">
							Third-party dependencies and other repository materials may have
							their own notices or licenses. Review the applicable repository
							files before copying, modifying, deploying, or distributing software.
							These website Terms do not reduce rights granted by the AGPL.
						</p>
					</section>

					<section aria-labelledby="terms-contributions">
						<h2 id="terms-contributions" className={headingClass}>
							5. FEEDBACK AND CONTRIBUTIONS
						</h2>
						<p>
							Public Issues, Discussions, pull requests, and other contributions
							must follow the rules and contribution terms in the relevant
							repository. Do not include secrets, personal data, confidential
							logs, private URLs, or proprietary client material.
						</p>
						<p className="mt-4">
							ProChat is not required to accept, merge, maintain, compensate, or
							respond to feedback or contributions. Rights in accepted
							contributions are governed by the applicable repository terms.
						</p>
					</section>

					<section aria-labelledby="terms-prerelease">
						<h2 id="terms-prerelease" className={headingClass}>
							6. PRERELEASE STATUS AND SUPPORT
						</h2>
						<p>
							Selected-beta and prerelease products may be incomplete, unavailable,
							or changed without notice. Features, file formats, APIs, licenses,
							and compatibility may change between versions.
						</p>
						<p className="mt-4">
							Unless a separate written agreement says otherwise, ProChat provides
							no service-level agreement, guaranteed response time, maintenance
							period, compatibility promise, ongoing update commitment, or obligation to
							continue any beta or prerelease.
						</p>
					</section>

					<section aria-labelledby="terms-acceptable-use">
						<h2 id="terms-acceptable-use" className={headingClass}>
							7. ACCEPTABLE USE
						</h2>
						<p>You must not use the website or ProChat products to:</p>
						<ul className={listClass}>
							<li>Break applicable law or another person's rights</li>
							<li>Probe, disrupt, overload, or bypass service security</li>
							<li>Submit malware, abusive automation, spam, or deceptive content</li>
							<li>Process data you are not authorized to use</li>
							<li>Misrepresent affiliation, certification, or endorsement</li>
							<li>Remove required copyright, license, or attribution notices</li>
						</ul>
					</section>

					<section aria-labelledby="terms-ip">
						<h2 id="terms-ip" className={headingClass}>
							8. INTELLECTUAL PROPERTY AND TRADEMARKS
						</h2>
						<p>
							ProChat retains rights in its website content, product names,
							branding, trademarks, and proprietary materials, except where a
							repository license or third-party license grants specific rights.
							Open-source and source-available licenses apply only to the material
							they expressly cover.
						</p>
						<p className="mt-4">
							Do not use ProChat names or branding in a way that suggests an
							unapproved partnership, certification, sponsorship, or endorsement.
						</p>
					</section>

					<section aria-labelledby="terms-memory">
						<h2 id="terms-memory" className={headingClass}>
							9. MEMORY AND HUMAN REVIEW
						</h2>
						<p>
							ProChat products help people capture, review, and retrieve project
							context. Stored or generated memory may be incomplete, stale,
							incorrect, or unsuitable for a later task. You remain responsible for
							reviewing evidence, protecting local files, following organizational
							and client rules, and making all professional, security, QA, legal,
							and operational decisions.
						</p>
						<p className="mt-4">
							ProChat does not provide autonomous testing, professional advice, or
							a guarantee that remembered information is accurate or current.
						</p>
					</section>

					<section aria-labelledby="terms-warranty">
						<h2 id="terms-warranty" className={headingClass}>
							10. NO WARRANTY
						</h2>
						<p>
							To the maximum extent permitted by law, the website, documentation,
							beta software, and prerelease software are provided &ldquo;as is&rdquo;
							and &ldquo;as available,&rdquo; without warranties of availability,
							accuracy, security, merchantability, fitness for a particular
							purpose, title, non-infringement, or error-free operation. You use
							them at your own risk.
						</p>
					</section>

					<section aria-labelledby="terms-liability">
						<h2 id="terms-liability" className={headingClass}>
							11. LIMITATION OF LIABILITY
						</h2>
						<p>
							To the maximum extent permitted by law, ProChat is not liable for
							indirect, incidental, special, consequential, exemplary, or punitive
							damages; lost profits or revenue; loss of data; business
							interruption; security incidents; or reliance on inaccurate or stale
							memory.
						</p>
						<p className="mt-4">
							Where liability cannot lawfully be excluded, it is limited to direct,
							reasonably foreseeable loss and, for any separately paid agreement,
							no more than the amount paid under that agreement, except where
							mandatory law requires otherwise.
						</p>
					</section>

					<section aria-labelledby="terms-payments">
						<h2 id="terms-payments" className={headingClass}>
							12. PAYMENTS AND REFUNDS
						</h2>
						<p>
							The current public Workbench path and Memory for QA selected beta do
							not use a standardized purchase flow. No refund right arises merely
							from accessing public repositories, documentation, or a free beta.
							If ProChat and you later enter a separate paid written agreement, its
							payment and refund terms control, subject to mandatory law.
						</p>
					</section>

					<section aria-labelledby="terms-suspension">
						<h2 id="terms-suspension" className={headingClass}>
							13. SUSPENSION AND TERMINATION
						</h2>
						<p>
							ProChat may restrict website access, reject Contact submissions, or
							end beta participation where reasonably necessary for security,
							abuse prevention, legal compliance, service discontinuation, or a
							breach of applicable terms.
						</p>
						<p className="mt-4">
							Memory for QA termination is governed by its beta license. Rights in
							Workbench are governed by the AGPL and cannot be withdrawn by these
							website Terms where the AGPL grants them.
						</p>
					</section>

					<section aria-labelledby="terms-law">
						<h2 id="terms-law" className={headingClass}>
							14. GOVERNING LAW AND CONSUMER RIGHTS
						</h2>
						<p>
							These Terms are governed by Portuguese law. Courts in Porto,
							Portugal, have jurisdiction where legally permitted. Nothing in
							these Terms removes mandatory rights or protections that apply under
							Portuguese, European Union, or other applicable consumer law.
						</p>
					</section>

					<section aria-labelledby="terms-updates">
						<h2 id="terms-updates" className={headingClass}>
							15. CHANGES TO THESE TERMS
						</h2>
						<p>
							We may update these Terms when the website, product availability,
							licenses, or legal requirements change. The date above identifies the
							current website Terms. Repository licenses identify their own
							applicable versions and terms.
						</p>
					</section>

					<section aria-labelledby="terms-contact">
						<h2 id="terms-contact" className={headingClass}>
							16. CONTACT
						</h2>
						<p>
							Questions about these Terms may be sent to{' '}
							<a className={linkClass} href="mailto:info@prochat.tools">
								info@prochat.tools
							</a>
							.
						</p>
					</section>
				</article>
			</div>
		</section>
	)
}
