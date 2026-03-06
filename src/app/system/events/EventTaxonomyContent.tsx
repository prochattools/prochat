'use client'

import { Scaffolding, BlueprintCard } from '@/app/(marketing)/components/ui/Scaffolding'
import { Reveal } from '@/app/(marketing)/components/ui/Reveal'
import { Panel, Section } from '@/components/ui/surface'

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
	{
		name: 'explore_kits_click',
		description: 'Primary Explore kits CTA click from the global navigation.',
		payload: '{ location: "navbar|mobile_navbar" }',
	},
	{
		name: 'contact_submit',
		description: 'Successful submission of the main contact form.',
		payload: '{ form: "contact" }',
	},
	{
		name: 'blog_cta_click',
		description: 'Key conversion CTA click from blog index and blog article footers.',
		payload: '{ cta_type: "explore_kits|contact|related_article|blog|link", location: "blog_index_footer|blog_post_footer", href: "string" }',
	},
]

export default function EventTaxonomyContent() {
	return (
		<main className="relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
			<div className="fixed inset-0 pointer-events-none z-0">
				<Scaffolding opacity={0.6} />
			</div>
			<div className="relative z-10 min-h-screen">
				<Section tone="surface" spacing="default">
						<div className="max-w-5xl mx-auto px-page text-center">
							<Reveal>
								<h1 className="text-4xl font-bold tracking-[-0.05em] text-foreground md:text-5xl">
									Event taxonomy
								</h1>
							</Reveal>
							<Reveal delay={0.2}>
								<p className="mt-4 font-light text-muted-foreground">
									The analytics events used across ProChat and the kits.
								</p>
							</Reveal>
						</div>
					</Section>

					<Section tone="muted" spacing="default">
						<div className="max-w-6xl mx-auto px-page">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{EVENTS.map((event) => (
									<BlueprintCard key={event.name} className="p-6">
										<div className="space-y-4">
											<div className="text-xs font-bold uppercase tracking-widest text-tertiary">
												{event.name}
											</div>
											<p className="font-light text-muted-foreground">
												{event.description}
											</p>
											<Panel
												tone="soft"
												padding="compact"
												className="rounded-lg whitespace-pre-wrap font-mono text-xs text-tertiary"
											>
												{event.payload}
											</Panel>
										</div>
									</BlueprintCard>
								))}
							</div>
						</div>
					</Section>
				</div>
			</main>
	)
}
