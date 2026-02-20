import type { Metadata } from 'next'
import Link from 'next/link'
import StartSignupForm from './_components/StartSignupForm'
import { Card, CardContent } from '@/components/ui/card'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Check, BookOpen, MonitorPlay, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: 'The SaaS Starting Point | ProChat',
    description:
        'Structure first. SaaS second. The preparation framework for serious builders.',
}

const AUDIENCE_CARDS = [
    {
        title: 'Builder Starting from Zero',
        desc: 'You see the opportunity AI created. Your risk is confusion and impulsive experimentation. Your task is clarity.',
    },
    {
        title: 'Time-Constrained Solo Builder',
        desc: 'You have 5–10 hours per week. Your risk is scope inflation. Your task is reduction.',
    },
    {
        title: 'Niche Insider',
        desc: 'You understand a specific industry. Your risk is overbuilding for edge cases. Your task is boundary definition.',
    },
]

const PREPARATION_POINTS = [
    'Narrow your outcome',
    'Define a Minimal Viable Outcome',
    'Calculate real cost',
    'Validate commitment',
    'Reduce structural fragility',
]

const EXECUTION_POINTS = [
    'Infrastructure walkthroughs',
    'Deployment systems',
    'Backup logic',
    'Vendor decisions',
    'Real builds, live',
]

const PDF_ITEMS = [
    'Risk × Impact framework',
    'Minimal Viable Outcome definition',
    'Cost exposure calculation',
    'Manual validation strategy',
    'Scope reduction discipline',
]

const FAQ_ITEMS = [
    {
        question: 'Is this technical?',
        answer: 'No. It is structural.',
    },
    {
        question: 'Is this a make-money guide?',
        answer: 'No. It prevents wasted effort.',
    },
    {
        question: 'Do I need money to start?',
        answer: 'Preparation phase: €0–€50.',
    },
    {
        question: 'Should I watch YouTube first?',
        answer: 'No. Read the PDF first.',
    },
    {
        question: 'What happens if I skip preparation?',
        answer:
            'Higher risk. Higher rebuild cost. Higher emotional burnout.',
    },
]

const BG_PAGE = 'bg-[#F8FAFC] dark:bg-[#F8FAFC]'
const TEXT_PRIMARY = 'text-[#0F172A] dark:text-[#0F172A]'
const TEXT_SECONDARY = 'text-[#475569] dark:text-[#475569]'
const TEXT_ACCENT = 'text-[#1D4ED8] dark:text-[#1D4ED8]'

const SHADOW_CARD_ELEVATED =
    'shadow-[0_20px_60px_rgba(15,23,42,0.08)]'
const SHADOW_CARD_SUBTLE = 'shadow-[0_4px_16px_rgba(0,0,0,0.04)]'

const CARD_BASE = `bg-white dark:bg-white rounded-2xl border border-slate-200 dark:border-slate-200 ${SHADOW_CARD_SUBTLE}`

export default function StartHerePage() {
    return (
        <main className={`min-h-screen ${BG_PAGE} font-sans selection:bg-[#2563EB]/20 selection:text-[#0F172A]`}>

            <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 lg:py-0">
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div
                        className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4]"
                        aria-hidden="true"
                    />
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(224,231,255,0.6)_0%,transparent_50%)] opactiy-60"
                        aria-hidden="true"
                    />
                </div>

                <div className="container mx-auto px-8 md:px-12 max-w-7xl relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="space-y-8 lg:space-y-10 order-1">
                            <div className="space-y-6">
                                <h1 className={`font-extrabold tracking-tight ${TEXT_PRIMARY} leading-[1.1] text-[2.75rem] md:text-[4.25rem]`}>
                                    Structure first. <br className="hidden lg:block" />
                                    SaaS second.
                                </h1>
                                <p className={`text-xl md:text-2xl leading-[1.45] ${TEXT_PRIMARY} max-w-[40ch]`}>
                                    AI removed the coding barrier.
                                    <br />
                                    It did not remove consequences.
                                </p>
                                <p className={`text-lg md:text-xl leading-[1.6] ${TEXT_SECONDARY} max-w-[50ch]`}>
                                    Building SaaS is now accessible.
                                    <br className="hidden md:block" />
                                    Overbuilding is now faster.
                                    <br className="hidden md:block" />
                                    This guide exists to prevent fragility before you deploy anything.
                                </p>
                            </div>

                            <div className="flex items-start gap-4 p-5 rounded-xl bg-[#1D4ED8]/5 border border-[#1D4ED8]/10 max-w-lg">
                                <AlertCircle className={`w-5 h-5 mt-0.5 ${TEXT_ACCENT} flex-shrink-0`} />
                                <div className="space-y-1.5">
                                    <p className={`text-sm font-semibold ${TEXT_PRIMARY}`}>
                                        Preparation before execution
                                    </p>
                                    <p className={`text-sm ${TEXT_SECONDARY} leading-relaxed`}>
                                        This page is preparation.
                                        <br />
                                        YouTube is execution.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative order-2 w-full max-w-lg mx-auto lg:max-w-none">
                            <div
                                className="absolute -top-12 -right-12 w-64 h-64 bg-[#1D4ED8]/10 rounded-full blur-3xl opacity-60 pointer-events-none"
                                aria-hidden="true"
                            />
                            <div className={`relative bg-white dark:bg-white p-8 lg:p-10 rounded-2xl border border-slate-100 dark:border-slate-100 ${SHADOW_CARD_ELEVATED}`}>
                                <div className="mb-6">
                                    <p className={`text-xs font-bold uppercase tracking-[0.1em] ${TEXT_ACCENT} mb-3`}>
                                        Free PDF Guide
                                    </p>
                                    <h3 className={`text-2xl lg:text-3xl font-bold ${TEXT_PRIMARY} leading-tight`}>
                                        Get the Free PDF – The SaaS Starting Point
                                    </h3>
                                </div>

                                <div className="[&_input]:!h-12 [&_input]:!text-base [&_input]:!bg-white [&_input]:!text-slate-900 [&_input]:!border-slate-200 [&_button]:!h-12 [&_button]:!text-base [&_button]:!text-white mb-6">
                                    <StartSignupForm buttonLabel="Get the Free PDF – The SaaS Starting Point" />
                                </div>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-100">
                                    <p className={`text-sm leading-relaxed ${TEXT_SECONDARY}`}>
                                        Preparation before infrastructure.
                                        <br />
                                        Clarity before complexity.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-50/50 dark:bg-slate-50/50 border-t border-slate-200/60 dark:border-slate-200/60">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <h2 className={`${TEXT_PRIMARY} text-3xl md:text-4xl font-bold tracking-tight mb-4`}>
                            Preparation and Execution Are Not the Same
                        </h2>
                        <p className={`${TEXT_SECONDARY} text-lg`}>
                            The PDF is preparation.
                            <br />
                            YouTube is execution.
                        </p>
                        <p className={`${TEXT_SECONDARY} text-base mt-4`}>
                            Built from a software tester lens: Risk × Impact, scope reduction, fragility detection, and cost calculation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start justify-center">
                        <div className="relative flex justify-center md:block">
                            <div className="max-w-sm mx-auto md:mx-0">
                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#1D4ED8] rounded-full opacity-20 hidden md:block"></div>
                                <div className="md:pl-8 space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-[#1D4ED8]/10 text-[#1E3A8A]">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <h3 className={`text-xl font-bold ${TEXT_PRIMARY}`}>The PDF helps you</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {PREPARATION_POINTS.map((item, i) => (
                                            <li key={i} className={`flex items-start gap-3 text-base ${TEXT_SECONDARY}`}>
                                                <Check className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="relative flex justify-center md:block">
                            <div className="max-w-sm mx-auto md:mx-0">
                                <div className="md:pl-8 space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
                                            <MonitorPlay className="w-5 h-5" />
                                        </div>
                                        <h3 className={`text-xl font-bold ${TEXT_PRIMARY}`}>The YouTube channel shows</h3>
                                    </div>
                                    <ul className="space-y-4">
                                        {EXECUTION_POINTS.map((item, i) => (
                                            <li key={i} className={`flex items-start gap-3 text-base ${TEXT_SECONDARY}`}>
                                                <Check className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className={`${TEXT_PRIMARY} text-base font-medium mt-12 text-center`}>
                        Execution does not fix a vague idea.
                        <br />
                        Preparation prevents rebuild cycles.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-white dark:bg-white border-t border-slate-100 dark:border-slate-100">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <h2 className={`${TEXT_PRIMARY} text-3xl md:text-4xl font-bold tracking-tight mb-4`}>
                            This Is Not for Everyone
                        </h2>
                        <p className={`${TEXT_SECONDARY} text-lg`}>
                            This framework filters for seriousness.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {AUDIENCE_CARDS.map((card, i) => (
                            <Card key={i} className={`${CARD_BASE} hover:shadow-md transition-shadow duration-300`}>
                                <CardContent className="p-8">
                                    <h3 className={`text-lg font-bold ${TEXT_PRIMARY} mb-4`}>
                                        {card.title}
                                    </h3>
                                    <p className={`${TEXT_SECONDARY} text-base leading-relaxed`}>
                                        {card.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <p className={`${TEXT_PRIMARY} text-base font-medium mt-12 text-center`}>
                        If you are chasing fast money, this is not for you.
                        <br />
                        If you are willing to think before building, continue.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-slate-50/50 dark:bg-slate-50/50 border-t border-slate-200/60 dark:border-slate-200/60">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-12 text-center max-w-2xl mx-auto">
                        <h2 className={`${TEXT_PRIMARY} text-3xl md:text-4xl font-bold tracking-tight mb-4`}>
                            Inside the PDF
                        </h2>
                    </div>

                    <div className={`${CARD_BASE} p-8 md:p-10`}>
                        <ul className="space-y-4">
                            {PDF_ITEMS.map((item, i) => (
                                <li key={i} className={`flex items-start gap-3 text-base ${TEXT_SECONDARY}`}>
                                    <Check className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <p className={`${TEXT_PRIMARY} text-base font-medium mt-8`}>
                            This is not motivational.
                            <br />
                            It is protective.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white dark:bg-white border-t border-slate-100 dark:border-slate-100">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className={`${CARD_BASE} p-8 md:p-10`}>
                        <h2 className={`${TEXT_PRIMARY} text-3xl md:text-4xl font-bold tracking-tight mb-6`}>
                            Why This Matters Now
                        </h2>

                        <p className={`${TEXT_SECONDARY} text-lg mb-6`}>
                            Five years ago, building SaaS required:
                        </p>
                        <ul className="mb-8 list-disc space-y-2 pl-5 marker:text-slate-300 dark:marker:text-slate-600">
                            <li className={TEXT_SECONDARY}>Developers</li>
                            <li className={TEXT_SECONDARY}>Capital</li>
                            <li className={TEXT_SECONDARY}>Months of waiting</li>
                        </ul>

                        <p className={`${TEXT_SECONDARY} text-lg mb-4`}>
                            Today, AI removed that barrier.
                        </p>
                        <p className={`${TEXT_SECONDARY} text-lg mb-4`}>
                            Now anyone can build.
                        </p>
                        <p className={`${TEXT_SECONDARY} text-lg mb-4`}>
                            But when building becomes easy,
                            <br />
                            overbuilding becomes dangerous.
                        </p>
                        <p className={`${TEXT_PRIMARY} text-lg font-medium`}>
                            Structure is no longer optional.
                            <br />
                            It is the survival filter.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white dark:bg-white border-t border-slate-100 dark:border-slate-100">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className={`${TEXT_PRIMARY} text-3xl font-bold text-center mb-12`}>FAQ</h2>

                    <div className={`${CARD_BASE} overflow-hidden`}>
                        <Accordion type="single" collapsible className="w-full">
                            {FAQ_ITEMS.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="border-b border-slate-100 dark:border-slate-100 last:border-0 px-6"
                                >
                                    <AccordionTrigger className="hover:no-underline py-5 text-left text-base font-semibold">
                                        <span className="pr-4 text-slate-900 dark:text-slate-900">{item.question}</span>
                                    </AccordionTrigger>
                                    <AccordionContent className={`${TEXT_SECONDARY} text-[15px] leading-relaxed pb-5`}>
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-slate-200 dark:border-slate-200 bg-slate-50 dark:bg-slate-50 text-center">
                <div className="container mx-auto px-6">
                    <p className={`text-sm ${TEXT_SECONDARY} mb-4`}>
                        Built by Steve Westhoek.
                        <br />
                        Software tester.
                        <br />
                        Structure first. SaaS second.
                    </p>
                    <div className={`flex items-center justify-center gap-6 text-sm font-medium ${TEXT_SECONDARY}`}>
                        <Link href="/privacy" className="hover:text-[#2563EB] transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-[#2563EB] transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>

        </main>
    )
}
