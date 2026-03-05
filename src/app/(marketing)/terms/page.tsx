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

export default function TermsPage() {
	return (
		<section className="relative bg-white py-24 dark:bg-[#0B111B]">
			<main className="mx-auto w-full max-w-3xl px-page">
				<article className="space-y-10 leading-relaxed text-slate-600 dark:text-slate-300">
					<header className="mb-12">
						<h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
							TERMS OF SERVICE
						</h1>
						<p className="text-sm font-medium text-slate-500 dark:text-slate-400">
							Last updated: 20 February 2026
						</p>
					</header>

					<div className="space-y-4">
						<p>
							These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
							use of the ProChat website and all products and services provided
							by:
						</p>
						<p className="font-medium text-slate-900 dark:text-white">
							Steve Westhoek, trading as ProChat (ENI)
							<br />
							Porto, Portugal
							<br />
							Email: support@prochat.tools
						</p>
						<p>
							By accessing the website or purchasing any product, you agree to
							these Terms.
						</p>
					</div>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							1. OVERVIEW
						</h2>
						<p>
							ProChat provides digital products, including but not limited to
							software boilerplates such as SaaSKit and ProKit (the
							&ldquo;Products&rdquo;).
						</p>
						<p className="mt-4">These Terms apply to:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Website use</li>
							<li>All digital products</li>
							<li>All updates and versions</li>
							<li>All related services</li>
						</ul>
						<p>
							If you do not agree, do not use the website or purchase the
							Products.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							2. ELIGIBILITY
						</h2>
						<p>
							You must be at least 18 years old and legally capable of entering
							into binding contracts.
						</p>
						<p className="mt-4">
							If purchasing on behalf of a business, you confirm you have
							authority to bind that entity.
						</p>
					</article>

					<article id="digital-product-license">
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							3. DIGITAL PRODUCT LICENSE (GENERAL)
						</h2>
						<p>Upon purchase, you are granted a:</p>
						<p className="mt-3 font-medium text-slate-900 dark:text-white">
							Non-exclusive, non-transferable, non-sublicensable license
							<br />
							to use the purchased Product under the conditions below.
						</p>
						<p className="mt-4">You may:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Use the Product for your own commercial activities</li>
							<li>Build unlimited SaaS applications</li>
							<li>Sell subscriptions to your SaaS products</li>
							<li>Modify the source code for your internal business use</li>
						</ul>
						<p>You may NOT:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Resell, sublicense, distribute, or transfer the source code</li>
							<li>
								Share repository access outside your licensed organization
							</li>
							<li>Publish the source code publicly</li>
							<li>
								Sell the Product as a template, boilerplate, starter,
								framework, or competing product
							</li>
							<li>
								Create a competing boilerplate or derivative framework based
								substantially on the Product
							</li>
							<li>
								Include the source code inside client deliverables unless the
								client has purchased their own license
							</li>
						</ul>
						<p>
							This license grants usage rights, not ownership. All intellectual
							property remains with ProChat.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							4. INTERNAL TEAM ACCESS
						</h2>
						<p>
							A license may be used internally by one business entity.
						</p>
						<p className="mt-4">Internal team members may access the code only if:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>
								They are employees or contractors of the same business
							</li>
							<li>
								They are working on the same SaaS project(s) under that business
							</li>
						</ul>
						<p>
							If a separate department, subsidiary, client, or separate legal
							entity uses the Product, a separate license is required.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							5. BUSINESS SALE OR TRANSFER
						</h2>
						<p>
							If you sell your SaaS business and transfer ownership of the
							source code, the new owner must purchase a new license from
							ProChat.
						</p>
						<p className="mt-4">The license is non-transferable.</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							6. PRODUCT-SPECIFIC TERMS
						</h2>
						<h3 className="mb-2 mt-4 text-base font-bold text-slate-900 dark:text-white">
							6.1 SaaSKit License
						</h3>
						<p>SaaSKit is licensed for:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Unlimited SaaS projects under one business</li>
							<li>Commercial deployment</li>
							<li>Lifetime access to updates via GitHub</li>
						</ul>
						<p>You may not:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Resell SaaSKit as a development kit</li>
							<li>Offer SaaSKit as a service to clients</li>
							<li>Provide repo access to clients</li>
						</ul>
						<p>Clients must purchase their own license.</p>

						<h3 className="mb-2 mt-6 text-base font-bold text-slate-900 dark:text-white">
							6.2 ProKit License
						</h3>
						<p>
							ProKit is licensed under the same conditions as SaaSKit.
						</p>
						<p className="mt-4">
							Commercial usage is permitted for your own SaaS businesses only.
						</p>
						<p className="mt-4">
							Resale, redistribution, and template repackaging are strictly
							prohibited.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							7. LIFETIME UPDATES
						</h2>
						<p>
							Your purchase includes lifetime access to future updates of the
							Product.
						</p>
						<p className="mt-4">
							Updates are provided at ProChat&rsquo;s discretion and may modify
							structure, features, or dependencies.
						</p>
						<p className="mt-4">
							No guarantee is made regarding frequency or scope of updates.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							8. SUPPORT
						</h2>
						<p>Support is limited.</p>
						<p className="mt-4">Documentation is provided.</p>
						<p className="mt-4">
							Questions may be submitted to: support@prochat.tools
						</p>
						<p className="mt-4">
							There is no obligation to provide custom development, consulting,
							or extended assistance.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							9. NO REFUNDS
						</h2>
						<p>
							Due to the digital and irreversible nature of source code access,
							all sales are final.
						</p>
						<p className="mt-4">
							No refunds, cancellations, or chargebacks are permitted once
							access is granted.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							10. INTELLECTUAL PROPERTY
						</h2>
						<p>
							All Products, source code, branding, structure, architecture, and
							related materials remain the exclusive intellectual property of
							ProChat.
						</p>
						<p className="mt-4">No ownership rights are transferred.</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							11. DISCLAIMER
						</h2>
						<p>Products are provided &ldquo;as is&rdquo; without warranties of any kind.</p>
						<p className="mt-4">ProChat does not guarantee:</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Business success</li>
							<li>Revenue</li>
							<li>Compatibility with future technologies</li>
							<li>Continuous availability</li>
						</ul>
						<p>Use is at your own risk.</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							12. LIMITATION OF LIABILITY
						</h2>
						<p>
							To the maximum extent permitted by law, ProChat shall not be liable
							for:
						</p>
						<ul className="mb-4 mt-2 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
							<li>Indirect or consequential damages</li>
							<li>Loss of profits</li>
							<li>Business interruption</li>
							<li>Data loss</li>
						</ul>
						<p>
							Total liability shall not exceed the amount paid for the Product.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							13. TERMINATION
						</h2>
						<p>
							Violation of these Terms results in immediate termination of your
							license without refund.
						</p>
						<p className="mt-4">
							Upon termination, you must cease using the Product and destroy all
							copies.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							14. GOVERNING LAW
						</h2>
						<p>These Terms are governed by the laws of Portugal.</p>
						<p className="mt-4">
							Any disputes shall be resolved in Porto, Portugal.
						</p>
					</article>

					<article>
						<h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
							15. CONTACT
						</h2>
						<p>Support: support@prochat.tools</p>
						<p className="mt-4">
							Business: Steve Westhoek (ENI), Porto, Portugal
						</p>
					</article>
				</article>
			</main>
		</section>
	)
}
