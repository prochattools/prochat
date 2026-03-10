'use client'

import { Scaffolding, BlueprintCard } from '@/app/(marketing)/components/ui/Scaffolding'
import { Reveal } from '@/app/(marketing)/components/ui/Reveal'
import { Panel, Section } from '@/components/ui/surface'

const EVENTS = [
	{
		name: 'lead_magnet_view',
		description: 'First viewed state for the SaaS Starting Point lead magnet flow.',
		payload: '{ source_page: "/starting-point", asset: "preparation_framework" }',
	},
	{
		name: 'lead_magnet_submit',
		description: 'Email submission attempt for the Starting Point lead magnet.',
		payload: '{ source_page: "/starting-point", asset: "preparation_framework" }',
	},
	{
		name: 'lead_magnet_success',
		description: 'Successful lead magnet signup after provider acceptance.',
		payload: '{ source_page: "/starting-point", asset: "preparation_framework" }',
	},
	{
		name: 'waitlist_view',
		description: 'First viewed state for the roadmap waitlist flow.',
		payload: '{ source_page: "string" }',
	},
	{
		name: 'waitlist_submit',
		description: 'Waitlist form submit attempt with selected roadmap products.',
		payload: '{ source_page: "string", product: "uxkit|waaskit|prochat-os|other", products: "comma,separated" }',
	},
	{
		name: 'waitlist_success',
		description: 'Successful waitlist signup.',
		payload: '{ source_page: "string", product: "uxkit|waaskit|prochat-os|other", products: "comma,separated" }',
	},
	{
		name: 'nav_cta_click',
		description: 'High-intent primary navigation CTA click into the SaaSKit funnel.',
		payload: '{ location: "header_capsule|mobile_header_capsule|mobile_header_drawer", product: "saaskit", source_page: "string" }',
	},
	{
		name: 'product_cta_click',
		description: 'Meaningful product-page CTA click before checkout.',
		payload: '{ product: "prokit|saaskit|waaskit", location: "string", cta: "string", source_page: "string" }',
	},
	{
		name: 'pricing_view',
		description: 'Pricing section became visible on a commercial product page.',
		payload: '{ product: "prokit|saaskit", location: "pricing_section", source_page: "string" }',
	},
	{
		name: 'checkout_start',
		description: 'Checkout initiation for a paid product.',
		payload: '{ product: "prokit|saaskit", location: "string", cta: "string", source_page: "string", value: number, currency: "USD" }',
	},
	{
		name: 'checkout_success',
		description: 'Successful return to the checkout completion page.',
		payload: '{ product: "prokit|saaskit", source_page: "string", value: number, currency: "USD" }',
	},
	{
		name: 'checkout_cancel',
		description: 'User returned from Stripe without completing checkout.',
		payload: '{ product: "prokit|saaskit", source_page: "string", value: number, currency: "USD" }',
	},
	{
		name: 'contact_submit',
		description: 'Successful submission of the main contact form.',
		payload: '{ form: "contact", source_page: "/contact" }',
	},
	{
		name: 'blog_cta_click',
		description: 'Key conversion CTA click from blog index and blog article footers.',
		payload: '{ cta_type: "explore_kits|contact|related_article|blog|link", location: "blog_index_footer|blog_post_footer", href: "string" }',
	},
	{
		name: 'outbound_funnel_click',
		description: 'Outbound click into an external or bridge funnel with commercial intent.',
		payload: '{ location: "string", href: "string", product?: "waaskit|other", destination?: "string" }',
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
