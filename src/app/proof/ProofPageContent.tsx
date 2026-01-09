'use client'

import { useEffect, type ReactNode } from 'react'
import { Check, Users } from 'lucide-react'
import { trackEvent } from '@/utils/analytics'
import { Scaffolding } from '@/app/marketing-ai-studio/components/ui/Scaffolding'
import { Reveal } from '@/app/marketing-ai-studio/components/ui/Reveal'
import { Hero } from '@/app/marketing-ai-studio/components/sections/Hero'
import { FinalCTA } from '@/app/marketing-ai-studio/components/sections/FinalCTA'
import ProofLive from '@/app/marketing-ai-studio/components/sections/ProofLive'
import ProofOperational from '@/app/marketing-ai-studio/components/sections/ProofOperational'
import ProofTimeline from '@/app/marketing-ai-studio/components/sections/ProofTimeline'

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
		className={`py-24 bg-white border-b border-slate-100 dark:bg-[#0B111B] dark:border-[#1E242D] ${className}`}
	>
		{children}
	</section>
)

const Container = ({ className = '', children }: ContainerProps) => (
	<div className={`max-w-7xl mx-auto px-8 ${className}`}>{children}</div>
)

export default function ProofPageContent() {
	useEffect(() => {
		trackEvent('proof_view', { page: '/proof' })
	}, [])

	const handleCtaClick = (label: string) => () => {
		trackEvent('cta_click', { location: 'proof_page', cta: label })
	}

	return (
		<main className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-purple-200 dark:bg-[#0B111B] dark:text-[#E6EAF2] dark:selection:bg-[#5b49f5]/40 overflow-x-hidden relative">
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
										<h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight dark:text-white">
											What &quot;proof&quot; means here.
										</h2>
										<p className="text-slate-500 text-lg leading-relaxed max-w-[45ch] dark:text-slate-400">
											Most SaaS websites show outcomes without showing the process that
											produced them.
										</p>
									</div>
								</Reveal>

								<Reveal delay={0.1}>
									<div className="pl-6 border-l-2 border-[#5b49f5] italic text-slate-700 text-lg font-medium leading-relaxed dark:text-slate-200">
										&quot;This page does not show a highlight reel. It shows evidence
										that a real system exists, is being followed, and constrains
										decisions.&quot;
									</div>
								</Reveal>

								<Reveal delay={0.2}>
									<div className="pt-2">
										<p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 dark:text-slate-500">
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
													className="flex items-center gap-3 text-slate-900 font-medium dark:text-white"
												>
													<Check size={18} className="text-[#5b49f5] shrink-0" />
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
											<div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between opacity-50 grayscale dark:bg-[#0F1626] dark:border-[#1E242D]">
												<div className="flex items-center gap-3">
													<div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 dark:bg-[#1E242D] dark:text-slate-400">
														01
													</div>
													<span className="text-sm font-bold text-slate-500 dark:text-slate-400">
														CLIENTS
													</span>
												</div>
												<Users size={16} className="text-slate-400 dark:text-slate-500" />
											</div>

											{/* P2 - Active */}
											<div className="p-6 bg-white border border-[#5b49f5]/20 shadow-xl shadow-[#5b49f5]/5 rounded-xl relative scale-105 dark:bg-[#0F1424]">
												<div className="absolute -top-3 right-4 px-3 py-1 bg-[#5b49f5] text-white text-[10px] font-bold uppercase tracking-wide rounded-full">
													Current Phase
												</div>
												<div className="flex items-center gap-3 mb-3">
													<div className="w-8 h-8 rounded-full bg-[#5b49f5] flex items-center justify-center text-xs font-bold text-white">
														02
													</div>
													<span className="text-sm font-bold text-[#5b49f5]">
														SYSTEM CONSTRUCTION
													</span>
												</div>
												<p className="text-xs text-slate-500 leading-relaxed pl-11 dark:text-slate-400">
													Building the constraint engine based on service friction.
													Validating stack choices against real paid requests.
												</p>
											</div>

											{/* P3 */}
											<div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between opacity-50 border-dashed dark:bg-[#0F1626] dark:border-[#1E242D]">
												<div className="flex items-center gap-3">
													<div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-300 dark:border-[#1E242D] dark:text-slate-600">
														03
													</div>
													<span className="text-sm font-bold text-slate-400 dark:text-slate-500">
														ASSET SCALE
													</span>
												</div>
												<div className="w-4 h-4 rounded-full border border-slate-200 dark:border-[#1E242D]" />
											</div>
										</div>

										{/* Connector Line */}
										<div className="absolute left-[28px] top-6 bottom-6 w-px bg-slate-200 -z-0 dark:bg-[#1E242D]" />
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
					secondaryCtaLink="/kits#saaskit"
					onPrimaryCtaClick={handleCtaClick(FINAL_PRIMARY_CTA)}
					onSecondaryCtaClick={handleCtaClick(FINAL_SECONDARY_CTA)}
				/>
			</div>
		</main>
	)
}
