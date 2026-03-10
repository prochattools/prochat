'use client'

import type { ReactNode } from 'react'
import { Check, Users } from 'lucide-react'
import { trackEvent } from '@/utils/analytics'
import { Scaffolding } from '@/app/(marketing)/components/ui/Scaffolding'
import { Reveal } from '@/app/(marketing)/components/ui/Reveal'
import { Hero } from '@/app/(marketing)/components/sections/Hero'
import { FinalCTA } from '@/app/(marketing)/components/sections/FinalCTA'
import ProofLive from '@/app/(marketing)/components/sections/ProofLive'
import ProofOperational from '@/app/(marketing)/components/sections/ProofOperational'
import ProofTimeline from '@/app/(marketing)/components/sections/ProofTimeline'

const HERO_PRIMARY_CTA = 'Explore kits'
const HERO_SECONDARY_CTA = 'See the system'
const FINAL_PRIMARY_CTA = 'Start with clients → WaaSKit'
const FINAL_SECONDARY_CTA = 'Start with SaaS → SaaSKit'

type SectionProps = {
	id?: string
	className?: string
	children: ReactNode
}

type ContainerProps = {
	className?: string
	children: ReactNode
}

const Section = ({ id, className = '', children }: SectionProps) => (
	<section
		id={id}
		className={`py-24 bg-background border-b border-border-subtle ${className}`}
	>
		{children}
	</section>
)

const Container = ({ className = '', children }: ContainerProps) => (
	<div className={`max-w-7xl mx-auto px-page ${className}`}>{children}</div>
)

export default function ProofPageContent() {
	const handleCtaClick = (label: string) => () => {
		trackEvent('product_cta_click', {
			location: 'proof_page',
			source_page: '/proof',
			cta: label,
		})
	}

	return (
		<main className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary/20 dark:selection:bg-primary/40 overflow-x-hidden relative">
			<div className="fixed inset-0 pointer-events-none z-0">
				<Scaffolding opacity={0.6} />
			</div>
			<div className="relative z-10 min-h-screen">
				<Hero
					headline="Proof, without pretending."
					subhead="No inflated metrics. Just inspectable evidence that the system exists and is being followed."
					microProof="System-first • Client-first • Proof-before-product"
					primaryCta={HERO_PRIMARY_CTA}
					primaryCtaLink="/kits"
					secondaryCta={HERO_SECONDARY_CTA}
					secondaryCtaLink="/#system"
					onPrimaryCtaClick={handleCtaClick(HERO_PRIMARY_CTA)}
					onSecondaryCtaClick={handleCtaClick(HERO_SECONDARY_CTA)}
				/>

				{/* ---------------------------------------------------------------------------
      SECTION B: WHAT "PROOF" MEANS HERE
      Constraint: 2-col grid, vertically centered text vs visual
      --------------------------------------------------------------------------- */}
				<Section id="proof-context">
					<Container>
						<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
							{/* Text Block (Left) */}
							<div className="flex flex-col justify-center space-y-8 order-2 lg:order-1">
								<Reveal>
									<div className="space-y-4">
										<h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
											What &quot;proof&quot; means here.
										</h2>
										<p className="text-muted-foreground text-lg leading-relaxed max-w-[45ch]">
											Most SaaS websites show outcomes without showing the process that
											produced them.
										</p>
									</div>
								</Reveal>

								<Reveal delay={0.1}>
									<div className="pl-6 border-l-2 border-primary italic text-foreground/90 text-lg font-medium leading-relaxed">
										&quot;This page does not show a highlight reel. It shows evidence
										that a real system exists, is being followed, and constrains
										decisions.&quot;
									</div>
								</Reveal>

								<Reveal delay={0.2}>
									<div className="pt-2">
										<p className="text-xs font-bold text-tertiary uppercase tracking-widest mb-4">
											OBSERVABLE EVIDENCE:
										</p>
										<ul className="space-y-3">
											{[
												'Real infrastructure',
												'Real workflows',
												'Real sequence',
												'Real limits',
											].map((item, i) => (
												<li
													key={i}
													className="flex items-center gap-3 text-foreground font-medium"
												>
													<Check size={18} className="text-primary shrink-0" />
													{item}
												</li>
											))}
										</ul>
									</div>
								</Reveal>
							</div>

							{/* Visual Block (Right) */}
							<div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
								<Reveal delay={0.2}>
									<div className="relative w-full max-w-md">
										{/* Abstract Process Visualization */}
										<div className="space-y-4 relative z-10">
											{/* P1 */}
											<div className="p-4 bg-surface-soft border border-border-subtle rounded-xl flex items-center justify-between opacity-50 grayscale">
												<div className="flex items-center gap-3">
													<div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
														01
													</div>
													<span className="text-sm font-bold text-muted-foreground">
														CLIENTS
													</span>
												</div>
												<Users size={16} className="text-tertiary" />
											</div>

											{/* P2 - Active */}
											<div className="p-6 bg-surface-elevated border border-primary/20 shadow-surface shadow-primary/10 rounded-xl relative scale-105">
												<div className="absolute -top-3 right-4 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide rounded-full">
													Current Phase
												</div>
												<div className="flex items-center gap-3 mb-3">
													<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
														02
													</div>
													<span className="text-sm font-bold text-primary">
														SYSTEM CONSTRUCTION
													</span>
												</div>
												<p className="text-xs text-muted-foreground leading-relaxed pl-11">
													Building the constraint engine based on service friction.
													Validating stack choices against real paid requests.
												</p>
											</div>

											{/* P3 */}
											<div className="p-4 bg-surface-soft border border-border-subtle rounded-xl flex items-center justify-between opacity-50 border-dashed">
												<div className="flex items-center gap-3">
													<div className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center text-xs font-bold text-tertiary">
														03
													</div>
													<span className="text-sm font-bold text-tertiary">
														ASSET SCALE
													</span>
												</div>
												<div className="w-4 h-4 rounded-full border border-border-subtle" />
											</div>
										</div>

										{/* Connector Line */}
										<div className="absolute left-[28px] top-6 bottom-6 w-px bg-border-subtle -z-0" />
									</div>
								</Reveal>
							</div>
						</div>
					</Container>
				</Section>

				<ProofLive />

				<ProofOperational />

				<ProofTimeline />

				<FinalCTA
					heading="Start with proof. Choose your entry point."
					subhead=""
					primaryCtaLabel={FINAL_PRIMARY_CTA}
					primaryCtaLink="/kits#waaskit"
					secondaryCtaLabel={FINAL_SECONDARY_CTA}
					secondaryCtaLink="/kits/saaskit"
					onPrimaryCtaClick={handleCtaClick(FINAL_PRIMARY_CTA)}
					onSecondaryCtaClick={handleCtaClick(FINAL_SECONDARY_CTA)}
				/>
			</div>
		</main>
	)
}
