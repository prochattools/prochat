'use client'

import Link from 'next/link'
import {
	Activity,
	ArrowRight,
	Check,
	FileText,
	Layout,
	Lock,
	Workflow,
	X,
} from 'lucide-react'
import { Hero } from '@/app/(marketing)/components/sections/Hero'
import { Button } from '@/app/(marketing)/components/ui/Button'
import { Reveal } from '@/app/(marketing)/components/ui/Reveal'
import { BlueprintCard, Scaffolding } from '@/components/ui/Scaffolding'

const STUDIO_CONSTRAINTS = [
	'Fixed scope',
	'Fixed sequence',
	'Fixed exit conditions',
	'Proof-first delivery',
]

const STUDIO_STEPS = [
	{
		title: '1. Client enters through an existing system',
		desc: 'No bespoke onboarding. No blank slate.',
	},
	{
		title: '2. Pain is validated against constraints',
		desc: 'If it doesn’t fit the system, it doesn’t proceed.',
	},
	{
		title: '3. Solution is built inside the system',
		desc: 'The system is allowed to say “no”.',
	},
	{
		title: '4. Output becomes proof',
		desc: 'Successful patterns graduate into Kits or System rules.',
	},
]

const STUDIO_ARTIFACTS = [
	{ icon: <Activity size={20} />, label: 'Live funnels' },
	{ icon: <Layout size={20} />, label: 'Working dashboards' },
	{ icon: <Lock size={20} />, label: 'Real infrastructure' },
	{ icon: <Workflow size={20} />, label: 'Tracked workflows' },
	{ icon: <FileText size={20} />, label: 'Constraint docs' },
]

const STUDIO_FIT = [
	'You want execution, not options',
	'You are okay being constrained',
	'You care more about outcomes than ownership',
	'You understand this may invalidate your original idea',
]

const STUDIO_NOT_FIT = [
	'You want full creative control',
	'You want rapid scaling promises',
	'You want SaaS before proof',
]

export default function StudioPageContent() {
	return (
		<main className="relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
			<div className="fixed inset-0 pointer-events-none z-0">
				<Scaffolding opacity={0.6} />
			</div>
			<div className="relative z-10 min-h-screen">
				<Hero
					headline={
						<span className="flex flex-col items-center gap-6">
							<span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary md:text-sm">
								Live client work · Limited intake
							</span>
							<span className="block">Studio is where the system gets applied.</span>
						</span>
					}
					subhead="Client work, executed under the same constraints the system enforces. No shortcuts. No speculative builds."
					primaryCta="See how Studio works"
					primaryCtaLink="#how-it-works"
					secondaryCta="View system → proof flow"
					secondaryCtaLink="/proof"
					microProof=""
				/>

				<section
					id="what-is-studio"
					className="border-b border-border-subtle bg-surface py-24"
				>
					<div className="mx-auto w-full max-w-[1120px] px-page">
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div>
								<Reveal>
									<h2 className="mb-6 text-3xl font-bold text-foreground">
										Studio is not an agency.
									</h2>
								</Reveal>
								<Reveal delay={0.3}>
									<div>
										<p className="mb-6 leading-relaxed text-muted-foreground">
											Studio exists to apply the ProChat system to real client
											situations. Every engagement is constrained by the same rules
											that govern the system itself.
										</p>
										<p className="mb-6 leading-relaxed text-muted-foreground">
											This is not custom work by request. This is not open-ended
											consulting. This is system execution in the wild.
										</p>
									</div>
								</Reveal>
							</div>
							<div className="space-y-4">
								{STUDIO_CONSTRAINTS.map((item, i) => (
									<Reveal key={item} delay={0.4 + i * 0.1}>
										<div className="flex items-center gap-3 rounded-lg border border-border-subtle bg-surface-soft p-4">
											<div className="h-1.5 w-1.5 rounded-full bg-primary" />
											<span className="font-medium text-foreground">
												{item}
											</span>
										</div>
									</Reveal>
								))}
							</div>
						</div>
					</div>
				</section>

				<section
					id="how-it-works"
					className="border-b border-border-subtle bg-surface-soft/70 py-32"
				>
					<div className="mx-auto w-full max-w-[1120px] px-page">
						<Reveal>
							<div className="text-center mb-16">
								<h2 className="text-3xl font-bold text-foreground">
									How Studio engagements actually run
								</h2>
							</div>
						</Reveal>

						<div className="grid md:grid-cols-4 gap-6">
							{STUDIO_STEPS.map((step, i) => (
								<Reveal key={step.title} delay={i * 0.1}>
									<BlueprintCard className="flex h-full flex-col p-6 hover:border-primary/30">
										<div className="mb-4 font-mono text-4xl font-bold text-muted">
											0{i + 1}
										</div>
										<h3 className="mb-2 text-lg font-bold text-foreground">
											{step.title}
										</h3>
										<p className="text-sm leading-relaxed text-muted-foreground">
											{step.desc}
										</p>
									</BlueprintCard>
								</Reveal>
							))}
						</div>
					</div>
				</section>

				<section className="border-b border-border-subtle bg-surface py-32">
					<div className="mx-auto w-full max-w-[1120px] px-page">
						<Reveal>
							<h2 className="mb-12 text-3xl font-bold text-foreground">
								Studio produces artifacts, not deliverables.
							</h2>
						</Reveal>

						<div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
							{STUDIO_ARTIFACTS.map((item, i) => (
								<Reveal key={item.label} delay={i * 0.1}>
									<BlueprintCard className="flex h-full flex-col items-center justify-center gap-4 border-border-subtle bg-surface-soft p-6 text-center transition-colors hover:bg-surface">
										<div className="text-muted-foreground transition-colors group-hover:text-primary">
											{item.icon}
										</div>
										<span className="text-sm font-bold text-foreground">
											{item.label}
										</span>
									</BlueprintCard>
								</Reveal>
							))}
						</div>

						<Reveal delay={0.5}>
							<p className="mt-12 text-center font-mono text-sm text-tertiary">
								Some artifacts stay private. Some become public proof. None are
								speculative.
							</p>
						</Reveal>
					</div>
				</section>

				<section className="border-b border-border-subtle bg-surface py-24">
					<div className="mx-auto w-full max-w-[1120px] px-page">
						<div className="grid md:grid-cols-2 gap-12">
							<Reveal width="100%">
								<div className="h-full rounded-2xl border border-border-subtle bg-surface-soft p-8">
									<h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-primary">
										Studio is for you if:
									</h3>
									<ul className="space-y-4">
										{STUDIO_FIT.map((item) => (
											<li
												key={item}
												className="flex items-start gap-3 text-sm font-medium text-foreground"
											>
												<Check
													size={16}
													className="mt-0.5 shrink-0 text-primary"
												/>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							</Reveal>

							<Reveal width="100%" delay={0.2}>
								<div className="h-full rounded-2xl border border-dashed border-border-subtle bg-surface p-8 opacity-75 transition-opacity hover:opacity-100">
									<h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-muted-foreground">
										Studio is not for you if:
									</h3>
									<ul className="space-y-4">
										{STUDIO_NOT_FIT.map((item) => (
											<li
												key={item}
												className="flex items-start gap-3 text-sm text-muted-foreground"
											>
												<X
													size={16}
													className="mt-0.5 shrink-0 text-muted-soft"
												/>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							</Reveal>
						</div>
					</div>
				</section>

				<section className="border-b border-border-subtle bg-surface py-24 text-center">
					<div className="mx-auto w-full max-w-[1120px] px-page">
						<div className="max-w-3xl mx-auto">
							<Reveal>
								<h2 className="mb-8 text-3xl font-bold text-foreground">
									Studio sits between system and scale.
								</h2>
							</Reveal>
							<Reveal delay={0.3}>
								<div className="mb-10 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground md:text-base">
									<span className="rounded-full border border-border-subtle bg-surface-soft px-4 py-2">
										System defines the rules
									</span>
									<ArrowRight className="hidden text-muted-soft md:block" />
									<span className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-bold text-primary">
										Studio applies the rules
									</span>
									<ArrowRight className="hidden text-muted-soft md:block" />
									<span className="rounded-full border border-border-subtle bg-surface-soft px-4 py-2">
										Kits package what survives
									</span>
								</div>
							</Reveal>
							<Reveal delay={0.4}>
								<p className="text-lg font-light italic text-muted-foreground">
									&quot;Studio is how the system learns without lying to itself.&quot;
								</p>
							</Reveal>
						</div>
					</div>
				</section>

				<section className="bg-surface-elevated py-24 text-foreground">
					<div className="mx-auto w-full max-w-[1120px] px-page text-center">
						<Reveal>
							<h2 className="text-3xl font-bold mb-6">
								Studio is intentionally limited.
							</h2>
						</Reveal>
						<Reveal delay={0.3}>
							<p className="mx-auto mb-10 max-w-2xl leading-relaxed text-muted-foreground">
								Studio runs with a small number of active clients at any given
								time. This is not scarcity marketing. This is a capacity limit
								imposed by the system.
							</p>
						</Reveal>
						<Reveal delay={0.4}>
							<div className="inline-grid grid-cols-1 gap-8 rounded-2xl border border-border-subtle bg-surface/70 p-8 text-left md:grid-cols-3">
								<div>
									<div className="mb-2 text-xs font-bold uppercase tracking-widest text-tertiary">
										Intake
									</div>
									<div className="font-medium text-foreground">Limited</div>
								</div>
								<div>
									<div className="mb-2 text-xs font-bold uppercase tracking-widest text-tertiary">
										Niches
									</div>
									<div className="font-medium text-foreground">Selective</div>
								</div>
								<div>
									<div className="mb-2 text-xs font-bold uppercase tracking-widest text-tertiary">
										Expansion
									</div>
									<div className="font-medium text-foreground">Only after proof</div>
								</div>
							</div>
						</Reveal>
					</div>
				</section>

				<section className="flex flex-col items-center bg-surface py-32 text-center">
					<div className="mx-auto w-full max-w-[1120px] px-page">
						<div className="max-w-3xl mx-auto">
							<Reveal>
								<h2 className="mb-8 text-4xl font-bold text-foreground">
									Start with proof, not persuasion.
								</h2>
							</Reveal>
							<Reveal delay={0.3}>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<Link href="/proof">
										<Button size="lg" className="h-16 px-10">
											View Proof
										</Button>
									</Link>
									<Link href="/kits">
										<Button variant="secondary" size="lg" className="h-16 px-10">
											Explore Kits
										</Button>
									</Link>
								</div>
							</Reveal>
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}
