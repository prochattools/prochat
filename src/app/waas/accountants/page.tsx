import TrackedOutboundLink from '@/components/TrackedOutboundLink'

const AccountantBridgePage = () => {
	return (
		<section className="mx-auto max-w-2xl px-page py-16 text-slate-900 dark:text-white">
			<h1 className="text-3xl font-bold tracking-[-0.05em]">WaaS for Accountants</h1>
			<p className="mt-4 text-slate-600 dark:text-slate-400">
				This is a niche WaaS offer tailored for accounting firms. It lives on a
				dedicated funnel so the ProChat kits and system pages stay focused.
			</p>
			<p className="mt-3 text-slate-600 dark:text-slate-400">
				If you are an accountant exploring this offer, use the link below to
				visit the funnel.
			</p>
			<TrackedOutboundLink
				href="https://accountant.prochat.tools"
				target="_blank"
				rel="nofollow noopener noreferrer"
				className="mt-6 inline-flex items-center justify-center rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:border-border-subtle dark:text-white dark:hover:bg-surface-soft"
				eventName="outbound_funnel_click"
				eventPayload={{
					location: 'bridge_page',
					product: 'waaskit',
					destination: 'accountant_funnel',
					href: 'https://accountant.prochat.tools',
				}}
			>
				Open the accountant funnel
			</TrackedOutboundLink>
		</section>
	)
}

export default AccountantBridgePage
