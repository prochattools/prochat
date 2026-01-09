'use client'

import { Scaffolding, BlueprintCard } from '@/app/marketing-ai-studio/components/ui/Scaffolding'
import { Reveal } from '@/app/marketing-ai-studio/components/ui/Reveal'

const EVENTS = [
	{
		name: 'cta_click',
		description: 'Primary call-to-action clicks across marketing and kit pages.',
		payload: '{ location: "string", cta: "string", href?: "string" }',
	},
	{
		name: 'kit_view',
		description: 'Kit detail page impressions (per kit).',
		payload: '{ kit: "prokit|saaskit|waaskit", page: "/kits/..." }',
	},
	{
		name: 'checkout_start',
		description: 'Intent to purchase a kit via checkout.',
		payload: '{ kit: "string", page: "/kits/..." }',
	},
	{
		name: 'proof_view',
		description: 'Proof page view for evidence inspection.',
		payload: '{ page: "/proof" }',
	},
	{
		name: 'proof_evidence_click',
		description: 'Evidence card click from the proof page.',
		payload: '{ id: "string", href: "string" }',
	},
]

export default function EventTaxonomyContent() {
	return (
		<main className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-purple-200 dark:bg-[#0B111B] dark:text-[#E6EAF2] dark:selection:bg-[#5b49f5]/40 overflow-x-hidden relative">
			<div className="fixed inset-0 pointer-events-none z-0">
				<Scaffolding opacity={0.6} />
			</div>
			<div className="relative z-10 min-h-screen">
				<section className="py-24 bg-white border-b border-slate-100 dark:bg-[#0B111B] dark:border-[#1E242D]">
					<div className="max-w-5xl mx-auto px-8 text-center">
						<Reveal>
							<h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
								Event taxonomy
							</h1>
						</Reveal>
						<Reveal delay={0.2}>
							<p className="text-slate-500 font-light mt-4 dark:text-slate-400">
								The analytics events used across ProChat and the kits.
							</p>
						</Reveal>
					</div>
				</section>

				<section className="py-24 bg-slate-50/50 border-y border-slate-200 dark:bg-[#0F1626] dark:border-[#1E242D]">
					<div className="max-w-6xl mx-auto px-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{EVENTS.map((event) => (
								<BlueprintCard key={event.name} className="p-6">
									<div className="space-y-4">
										<div className="text-xs font-bold text-slate-400 uppercase tracking-widest dark:text-slate-500">
											{event.name}
										</div>
										<p className="text-slate-600 font-light dark:text-slate-300">
											{event.description}
										</p>
										<pre className="text-xs text-slate-500 bg-white/70 border border-slate-200 rounded-lg p-3 dark:text-slate-300 dark:bg-[#0B111B] dark:border-[#1E242D] whitespace-pre-wrap">
											{event.payload}
										</pre>
									</div>
								</BlueprintCard>
							))}
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}
