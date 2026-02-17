import type { Metadata } from 'next'
import Link from 'next/link'
import StartSignupForm from './_components/StartSignupForm'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Check, BookOpen, MonitorPlay, AlertCircle } from 'lucide-react'

// --- Metadata ---
export const metadata: Metadata = {
    title: 'The SaaS Starting Point | ProChat',
    description:
        'Structure first. SaaS second. The preparation framework for serious builders.',
}

// --- Constants & Data ---
const AUDIENCE_CARDS = [
    {
        title: 'Starting from zero',
        desc: 'You feel overwhelmed by tool hype and don’t know where to start. You need a safe, structured entry point—not a "make money fast" scheme.',
    },
    {
        title: 'Time-constrained builder',
        desc: 'You have a job and limited hours. You need discipline and a narrow scope to make progress in 5–10 hours a week without burning out.',
    },
    {
        title: 'Creator with a niche',
        desc: 'You already have an audience but fear overbuilding. You need a way to validate your software idea without risking your reputation.',
    },
]

const FAQ_ITEMS = [
    {
        question: 'Is this technical?',
        answer:
            'No. This is a preparation framework. It covers thinking, risk calculation, and decision-making. The technical execution happens later on the YouTube channel.',
    },
    {
        question: 'Is this another “make money fast” guide?',
        answer:
            'No. This is about building stable software. It requires work, patience, and 5–10 hours of weekly focus. If you want shortcuts, this is not for you.',
    },
    {
        question: 'Do I need money to start?',
        answer:
            'The PDF teaches you how to start with €0–€50/month in the early stages. You do not need expensive tools or venture capital to prepare and validate.',
    },
    {
        question: 'What if I don’t have an idea yet?',
        answer:
            'The PDF includes a specific framework for identifying and narrowing an outcome based on problems you can already solve manually.',
    },
    {
        question: 'What happens after I download?',
        answer:
            'You get the PDF immediately. Then you receive 3 short, structured emails over 3 days to help you apply it. Then you are ready for the execution videos.',
    },
    {
        question: 'Should I read the PDF before watching the videos?',
        answer:
            'Yes. The PDF is the preparation phase. The videos assume you’ve already decided what to build. Preparation first. Execution second.',
    },
    {
        question: 'What happens if I skip the preparation and start building?',
        answer:
            'You increase the risk of building the wrong thing. That costs time and money. This framework exists to reduce that risk.',
    },
]

// --- Design Tokens / Styles (Forced Light Mode) ---
const BG_PAGE = 'bg-[#F8FAFC] dark:bg-[#F8FAFC]'
const TEXT_PRIMARY = 'text-[#0F172A] dark:text-[#0F172A]'
const TEXT_SECONDARY = 'text-[#475569] dark:text-[#475569]'
const TEXT_ACCENT = 'text-[#4338CA] dark:text-[#4338CA]'

// Shadows
const SHADOW_CARD_ELEVATED =
    'shadow-[0_20px_60px_rgba(15,23,42,0.08)]'
const SHADOW_CARD_SUBTLE = 'shadow-[0_4px_16px_rgba(0,0,0,0.04)]'

const CARD_BASE = `bg-white dark:bg-white rounded-2xl border border-slate-200 dark:border-slate-200 ${SHADOW_CARD_SUBTLE}`

export default function StartHerePage() {
    return (
        <main className={`min-h-screen ${BG_PAGE} font-sans selection:bg-indigo-100 selection:text-indigo-900`}>

            {/* --- HERO SECTION (100vh) --- */}
            <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-12 lg:py-0">
                {/* Background Effects */}
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

                        {/* Left: Message */}
                        <div className="space-y-8 lg:space-y-10 order-1">
                            <div className="space-y-6">
                                <h1 className={`font-extrabold tracking-tight ${TEXT_PRIMARY} leading-[1.1] text-[2.75rem] md:text-[4.25rem]`}>
                                    Structure first. <br className="hidden lg:block" />
                                    SaaS second.
                                </h1>
                                <p className={`text-lg md:text-xl leading-[1.6] ${TEXT_SECONDARY} max-w-[50ch]`}>
                                    Prepare before you build. Decide before you deploy. <br className="hidden md:block" />
                                    A structured guide to help you decide what to build — before you waste time or money.
                                </p>
                            </div>

                            {/* Separation of Concerns Badge/Alert */}
                            <div className="flex items-start gap-4 p-5 rounded-xl bg-indigo-50/50 dark:bg-indigo-50/50 border border-indigo-100 dark:border-indigo-100 max-w-lg">
                                <AlertCircle className={`w-5 h-5 mt-0.5 ${TEXT_ACCENT} flex-shrink-0`} />
                                <div className="space-y-1">
                                    <p className={`text-sm font-semibold ${TEXT_PRIMARY}`}>
                                        Strict Separation
                                    </p>
                                    <p className={`text-sm ${TEXT_SECONDARY} leading-relaxed`}>
                                        The PDF is your preparation. <br />
                                        The execution (infrastructure & coding) happens on <strong>YouTube</strong>. <br />
                                        Do not skip the preparation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Form Card */}
                        <div className="relative order-2 w-full max-w-lg mx-auto lg:max-w-none">
                            <div
                                className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"
                                aria-hidden="true"
                            />
                            <div className={`relative bg-white dark:bg-white p-8 lg:p-10 rounded-2xl border border-slate-100 dark:border-slate-100 ${SHADOW_CARD_ELEVATED}`}>
                                <div className="mb-6">
                                    <p className={`text-xs font-bold uppercase tracking-[0.1em] ${TEXT_ACCENT} mb-3`}>
                                        Free PDF Guide
                                    </p>
                                    <h3 className={`text-2xl lg:text-3xl font-bold ${TEXT_PRIMARY} leading-tight`}>
                                        Get "The SaaS Starting Point"
                                    </h3>
                                </div>

                                {/* Form Container */}
                                <div className="[&_input]:!h-12 [&_input]:!text-base [&_input]:!bg-white [&_input]:!text-slate-900 [&_input]:!border-slate-200 [&_button]:!h-12 [&_button]:!text-base [&_button]:!text-white mb-6">
                                    <StartSignupForm buttonLabel="Get the Free PDF" />
                                </div>

                                {/* What you receive list */}
                                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-100">
                                    <p className={`text-xs font-semibold uppercase tracking-wider ${TEXT_SECONDARY}`}>
                                        You will receive:
                                    </p>
                                    <ul className="space-y-2">
                                        {[
                                            'The PDF framework immediately',
                                            '3 short follow-up emails',
                                            'Clear next steps'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-700">
                                                <Check className="w-4 h-4 text-indigo-500" strokeWidth={2.5} />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- SECTION: THIS IS FOR YOU --- */}
            <section className="py-24 bg-white dark:bg-white border-t border-slate-100 dark:border-slate-100">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-16 md:text-center max-w-2xl mx-auto">
                        <h2 className={`${TEXT_PRIMARY} text-3xl md:text-4xl font-bold tracking-tight`}>
                            This is for you if...
                        </h2>
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
                </div>
            </section>

            {/* --- SECTION: WHAT COMPRISES THE SYSTEM (Split) --- */}
            <section className="py-24 bg-slate-50/50 dark:bg-slate-50/50 border-t border-slate-200/60 dark:border-slate-200/60">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-16 md:text-center max-w-3xl mx-auto">
                        <h2 className={`${TEXT_PRIMARY} text-3xl md:text-4xl font-bold tracking-tight mb-4`}>
                            What you will get
                        </h2>
                        <p className={`${TEXT_SECONDARY} text-lg`}>
                            A clear separation between thinking and building.
                            <br />
                            <span className="text-base opacity-80 mt-2 block font-medium">
                                Built from a software tester’s perspective: reduce risk before increasing complexity.
                            </span>
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start justify-center">

                        {/* Left: Preparation (PDF) */}
                        <div className="relative flex justify-center md:block">
                            <div className="max-w-sm mx-auto md:mx-0">
                                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-500 rounded-full opacity-20 hidden md:block"></div>
                                <div className="md:pl-8 space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-100 text-indigo-700">
                                            <BookOpen className="w-5 h-5" />
                                        </div>
                                        <h3 className={`text-xl font-bold ${TEXT_PRIMARY}`}>Inside the PDF</h3>
                                    </div>
                                    <p className={`text-sm font-semibold uppercase tracking-wider ${TEXT_ACCENT}`}>
                                        The Preparation Phase
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            'Counting the real cost (Time & Money)',
                                            'Defining a Minimal Viable Outcome',
                                            'Validation logic (Risk × Impact)',
                                            'Decision clarity (No guessing)'
                                        ].map((item, i) => (
                                            <li key={i} className={`flex items-start gap-3 text-base ${TEXT_SECONDARY}`}>
                                                <Check className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Right: Execution (YouTube) */}
                        <div className="relative flex justify-center md:block">
                            <div className="max-w-sm mx-auto md:mx-0">
                                <div className="md:pl-8 space-y-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-100 text-slate-700">
                                            <MonitorPlay className="w-5 h-5" />
                                        </div>
                                        <h3 className={`text-xl font-bold ${TEXT_PRIMARY}`}>On YouTube</h3>
                                    </div>
                                    <p className={`text-sm font-semibold uppercase tracking-wider ${TEXT_SECONDARY}`}>
                                        The Execution Phase
                                    </p>
                                    <ul className="space-y-4">
                                        {[
                                            'Installing managed infrastructure',
                                            'Live deployment walkthroughs',
                                            'Vendor comparisons',
                                            'Avoiding platform lock-in',
                                            'Step-by-step screen shares. No guessing.'
                                        ].map((item, i) => (
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

                </div>
            </section>

            {/* --- SECTION: FAQ --- */}
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

            {/* --- FOOTER --- */}
            <footer className="py-12 border-t border-slate-200 dark:border-slate-200 bg-slate-50 dark:bg-slate-50 text-center">
                <div className="container mx-auto px-6">
                    <p className={`text-sm ${TEXT_SECONDARY} mb-4`}>
                        Built by Steve Westhoek — Structure first. SaaS second.
                    </p>
                    <div className={`flex items-center justify-center gap-6 text-sm font-medium ${TEXT_SECONDARY}`}>
                        <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms</Link>
                    </div>
                </div>
            </footer>

        </main>
    )
}
