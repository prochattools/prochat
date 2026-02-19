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
import { BlueprintCard, Scaffolding } from '@/app/(marketing)/components/ui/Scaffolding'

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
		<main className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-[#2563EB]/20 dark:bg-[#0B111B] dark:text-[#E6EAF2] dark:selection:bg-[#1D4ED8]/40 overflow-x-hidden relative">
			<div className="fixed inset-0 pointer-events-none z-0">
				<Scaffolding opacity={0.6} />
			</div>
			<div className="relative z-10 min-h-screen">
				<Hero
					headline={
						<span className="flex flex-col items-center gap-6">
							<span className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#1D4ED8] bg-[#1D4ED8]/10 px-3 py-1 rounded-full border border-[#1D4ED8]/20 dark:text-[#2563EB] dark:bg-[#1D4ED8]/20 dark:border-[#1D4ED8]/30">
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
					className="py-24 bg-white border-b border-slate-100 dark:bg-[#0B111B] dark:border-[#1E242D]"
				>
					<div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div>
								<Reveal>
									<h2 className="text-3xl font-bold text-slate-900 mb-6 dark:text-white">
										Studio is not an agency.
									</h2>
								</Reveal>
								<Reveal delay={0.3}>
									<div>
										<p className="text-slate-600 mb-6 leading-relaxed dark:text-slate-300">
											Studio exists to apply the ProChat system to real client
											situations. Every engagement is constrained by the same rules
											that govern the system itself.
										</p>
										<p className="text-slate-600 mb-6 leading-relaxed dark:text-slate-300">
											This is not custom work by request. This is not open-ended
											consulting. This is system execution in the wild.
										</p>
									</div>
								</Reveal>
							</div>
							<div className="space-y-4">
								{STUDIO_CONSTRAINTS.map((item, i) => (
									<Reveal key={item} delay={0.4 + i * 0.1}>
										<div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg dark:bg-[#0F1626] dark:border-[#1E242D]">
											<div className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
											<span className="font-medium text-slate-900 dark:text-slate-100">
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
					className="py-32 bg-slate-50/50 border-b border-slate-200 dark:bg-[#0F1626] dark:border-[#1E242D]"
				>
					<div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
						<Reveal>
							<div className="text-center mb-16">
								<h2 className="text-3xl font-bold text-slate-900 dark:text-white">
									How Studio engagements actually run
								</h2>
							</div>
						</Reveal>

						<div className="grid md:grid-cols-4 gap-6">
							{STUDIO_STEPS.map((step, i) => (
								<Reveal key={step.title} delay={i * 0.1}>
									<BlueprintCard className="h-full p-6 flex flex-col hover:border-[#1D4ED8]/30">
										<div className="text-4xl font-bold text-slate-100 mb-4 font-mono dark:text-slate-700">
											0{i + 1}
										</div>
										<h3 className="text-lg font-bold text-slate-900 mb-2 dark:text-white">
											{step.title}
										</h3>
										<p className="text-sm text-slate-600 leading-relaxed dark:text-slate-300">
											{step.desc}
										</p>
									</BlueprintCard>
								</Reveal>
							))}
						</div>
					</div>
				</section>

				<section className="py-32 bg-white border-b border-slate-100 dark:bg-[#0B111B] dark:border-[#1E242D]">
					<div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
						<Reveal>
							<h2 className="text-3xl font-bold text-slate-900 mb-12 dark:text-white">
								Studio produces artifacts, not deliverables.
							</h2>
						</Reveal>

						<div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
							{STUDIO_ARTIFACTS.map((item, i) => (
								<Reveal key={item.label} delay={i * 0.1}>
									<BlueprintCard className="p-6 flex flex-col items-center text-center gap-4 bg-slate-50 border-slate-200 h-full justify-center transition-colors hover:bg-white dark:bg-[#0F1626] dark:border-[#1E242D] dark:hover:bg-[#0B111B]">
										<div className="text-slate-400 transition-colors group-hover:text-[#1D4ED8] dark:text-slate-500 dark:group-hover:text-[#2563EB]">
											{item.icon}
										</div>
										<span className="font-bold text-slate-700 text-sm dark:text-slate-200">
											{item.label}
										</span>
									</BlueprintCard>
								</Reveal>
							))}
						</div>

						<Reveal delay={0.5}>
							<p className="mt-12 text-center text-sm text-slate-400 font-mono dark:text-slate-500">
								Some artifacts stay private. Some become public proof. None are
								speculative.
							</p>
						</Reveal>
					</div>
				</section>

				<section className="py-24 bg-white border-b border-slate-100 dark:bg-[#0B111B] dark:border-[#1E242D]">
					<div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
						<div className="grid md:grid-cols-2 gap-12">
							<Reveal width="100%">
								<div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl h-full dark:bg-[#0F1626] dark:border-[#1E242D]">
									<h3 className="text-lg font-bold text-[#1D4ED8] mb-6 flex items-center gap-2 dark:text-[#2563EB]">
										Studio is for you if:
									</h3>
									<ul className="space-y-4">
										{STUDIO_FIT.map((item) => (
											<li
												key={item}
												className="flex items-start gap-3 text-sm text-slate-700 font-medium dark:text-slate-200"
											>
												<Check
													size={16}
													className="mt-0.5 text-[#1D4ED8] shrink-0 dark:text-[#2563EB]"
												/>
												<span>{item}</span>
											</li>
										))}
									</ul>
								</div>
							</Reveal>

							<Reveal width="100%" delay={0.2}>
								<div className="p-8 bg-white border border-dashed border-slate-200 rounded-2xl h-full opacity-75 hover:opacity-100 transition-opacity dark:bg-[#0B111B] dark:border-[#1E242D]">
									<h3 className="text-lg font-bold text-slate-500 mb-6 flex items-center gap-2 dark:text-slate-300">
										Studio is not for you if:
									</h3>
									<ul className="space-y-4">
										{STUDIO_NOT_FIT.map((item) => (
											<li
												key={item}
												className="flex items-start gap-3 text-sm text-slate-500 dark:text-slate-400"
											>
												<X
													size={16}
													className="mt-0.5 text-slate-300 shrink-0 dark:text-slate-600"
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

				<section className="py-24 bg-white border-b border-slate-100 text-center dark:bg-[#0B111B] dark:border-[#1E242D]">
					<div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
						<div className="max-w-3xl mx-auto">
							<Reveal>
								<h2 className="text-3xl font-bold text-slate-900 mb-8 dark:text-white">
									Studio sits between system and scale.
								</h2>
							</Reveal>
							<Reveal delay={0.3}>
								<div className="flex flex-wrap justify-center gap-4 mb-10 text-sm md:text-base text-slate-600 dark:text-slate-300">
									<span className="bg-slate-50 px-4 py-2 rounded-full border border-slate-100 dark:bg-[#0F1626] dark:border-[#1E242D] dark:text-slate-300">
										System defines the rules
									</span>
									<ArrowRight className="text-slate-300 hidden md:block dark:text-slate-600" />
									<span className="bg-[#1D4ED8]/5 px-4 py-2 rounded-full border border-[#1D4ED8]/20 text-[#1D4ED8] font-bold dark:bg-[#1D4ED8]/20 dark:border-[#1D4ED8]/30 dark:text-[#2563EB]">
										Studio applies the rules
									</span>
									<ArrowRight className="text-slate-300 hidden md:block dark:text-slate-600" />
									<span className="bg-slate-50 px-4 py-2 rounded-full border border-slate-100 dark:bg-[#0F1626] dark:border-[#1E242D] dark:text-slate-300">
										Kits package what survives
									</span>
								</div>
							</Reveal>
							<Reveal delay={0.4}>
								<p className="text-lg text-slate-500 font-light italic dark:text-slate-400">
									&quot;Studio is how the system learns without lying to itself.&quot;
								</p>
							</Reveal>
						</div>
					</div>
				</section>

				<section className="py-24 bg-slate-900 text-white dark:bg-[#0F1626]">
					<div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8 text-center">
						<Reveal>
							<h2 className="text-3xl font-bold mb-6">
								Studio is intentionally limited.
							</h2>
						</Reveal>
						<Reveal delay={0.3}>
							<p className="text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
								Studio runs with a small number of active clients at any given
								time. This is not scarcity marketing. This is a capacity limit
								imposed by the system.
							</p>
						</Reveal>
						<Reveal delay={0.4}>
							<div className="inline-grid grid-cols-1 md:grid-cols-3 gap-8 text-left bg-white/5 p-8 rounded-2xl border border-white/10 dark:bg-white/5 dark:border-white/10">
								<div>
									<div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2 dark:text-slate-400">
										Intake
									</div>
									<div className="text-white font-medium">Limited</div>
								</div>
								<div>
									<div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2 dark:text-slate-400">
										Niches
									</div>
									<div className="text-white font-medium">Selective</div>
								</div>
								<div>
									<div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2 dark:text-slate-400">
										Expansion
									</div>
									<div className="text-white font-medium">Only after proof</div>
								</div>
							</div>
						</Reveal>
					</div>
				</section>

				<section className="py-32 bg-white flex flex-col items-center text-center dark:bg-[#0B111B]">
					<div className="mx-auto w-full max-w-[1120px] px-6 sm:px-8">
						<div className="max-w-3xl mx-auto">
							<Reveal>
								<h2 className="text-4xl font-bold text-slate-900 mb-8 dark:text-white">
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
