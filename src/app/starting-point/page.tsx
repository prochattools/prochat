import type { Metadata } from 'next'
import Link from 'next/link'
import StartSignupForm from '@/app/starting-point/_components/StartSignupForm'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Check } from 'lucide-react'

// --- Metadata ---
export const metadata: Metadata = {
  title: 'The SaaS Starting Point | ProChat',
  description:
    'Structure first. SaaS second. Get the free PDF and a guided 3-part email series.',
}

// --- Constants & Data ---
const FAQ_ITEMS = [
  {
    question: 'Do I need to be technical to use this?',
    answer:
      'No. This framework is designed for beginners and non-developers who want to build with structure instead of guessing.',
  },
  {
    question: 'How long does this take each week?',
    answer:
      'Most people can execute the process with 5–10 focused hours per week.',
  },
  {
    question: 'Do I need expensive tools to start?',
    answer:
      'No. You can begin lean. In early stages, a practical MVP path often stays in the €0–€50 range.',
  },
  {
    question: 'Is this another “make money fast” promise?',
    answer:
      'No. This is a disciplined starting framework focused on sequence, clarity, and reducing fragility.',
  },
  {
    question: 'What do I receive after opting in?',
    answer:
      'You get the PDF immediately plus 3 short follow-up emails that guide your next decisions.',
  },
]

// --- Design Tokens / Styles ---
// Background: Soft off-white, Forced Light Mode
const BG_PAGE = 'bg-[#F8FAFC] dark:bg-[#F8FAFC]'
// Typography: Deep navy headings, Muted slate body, Forced Light Mode
const TEXT_H1 =
  'font-extrabold tracking-tight text-[#0F172A] dark:text-[#0F172A] leading-[1.1] text-[2.5rem] md:text-[4rem]'
const TEXT_H2 =
  'text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#0F172A] md:text-4xl'
const TEXT_H3 = 'text-lg font-semibold text-[#0F172A] dark:text-[#0F172A]'
const TEXT_BODY = 'text-base leading-relaxed text-[#475569] dark:text-[#475569]'
const TEXT_BODY_LG = 'text-lg leading-[1.6] text-[#475569] dark:text-[#475569]'

// Shadows
const SHADOW_CARD_ELEVATED =
  'shadow-[0_20px_60px_rgba(15,23,42,0.08)]'
const SHADOW_CARD_SUBTLE = 'shadow-[0_4px_16px_rgba(0,0,0,0.04)]'

// Component Styles - FORCE LIGHT MODE OVERRIDES
// We use !important or specific overrides to ensure the system dark mode doesn't break this specific landing page
const CARD_STYLE_BASE = `bg-white dark:bg-white rounded-2xl border border-slate-200 dark:border-slate-200 ${SHADOW_CARD_SUBTLE}`

export default function StartHerePage() {
  return (
    <main className={`min-h-screen ${BG_PAGE} font-sans selection:bg-indigo-100 selection:text-indigo-900`}>
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle Grid */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.4]"
            aria-hidden="true"
          />
          {/* Soft Radial Depth */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_50%_0%,rgba(224,231,255,0.6)_0%,transparent_50%)] opactiy-60"
            aria-hidden="true"
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Column: Content */}
            <div className="space-y-8 lg:space-y-10 py-4">
              <div className="space-y-6">
                <h1 className={TEXT_H1}>
                  Structure first. <br className="hidden lg:block" />
                  SaaS second.
                </h1>
                <p className={`${TEXT_BODY_LG} max-w-[50ch]`}>
                  Identify what to build, validate it cheaply, and avoid fragile foundations.
                  A structured PDF guide for serious beginners.
                </p>
              </div>

              {/* Benefits List */}
              <ul className="space-y-4">
                {[
                  'Know what to build',
                  'Know what it will cost',
                  'Know how to start',
                  'Avoid fragile foundations',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 text-indigo-600 dark:text-indigo-600">
                      <Check className="h-5 w-5" strokeWidth={2.5} />
                    </div>
                    <span className="text-slate-700 dark:text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Trust Strip */}
              <div className="pt-4 border-t border-slate-200/60 dark:border-slate-200/60 max-w-md">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-500 mb-3 uppercase tracking-wider text-[11px]">
                  Perfect For
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Solo Founders', 'Non-Technical', 'Niche Creators'].map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-slate-100 dark:bg-slate-100 text-slate-600 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-200 px-3 py-1 text-xs font-semibold rounded-full border-0"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form Card */}
            <div className="relative h-full flex flex-col justify-center">
              {/* Decorative blob behind form */}
              <div
                className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"
                aria-hidden="true"
              />
              <div className={`relative bg-white dark:bg-white p-10 lg:p-12 rounded-2xl border border-slate-100 dark:border-slate-100 ${SHADOW_CARD_ELEVATED} flex flex-col justify-center min-h-[500px]`}>
                <div className="mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-indigo-600 dark:text-indigo-600 mb-3">
                    Free PDF Guide
                  </p>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-900 leading-tight">
                    Get "The SaaS Starting Point"
                  </h3>
                </div>

                {/* Re-using existing form component. */}
                <div className="[&_input]:!h-14 [&_input]:!text-base [&_input]:!bg-white [&_input]:!text-slate-900 [&_input]:!border-slate-200 [&_button]:!h-14 [&_button]:!text-lg [&_button]:!text-white">
                  <StartSignupForm buttonLabel="Get the Free PDF" />
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
                    <path d="M9 3.5L4.5 9L2.5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Secure. Unsubscribe anytime.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION: FOR YOU --- */}
      <section className="py-24 bg-white dark:bg-white border-t border-slate-100 dark:border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-16 md:text-center max-w-2xl mx-auto">
            <h2 className={TEXT_H2}>This is for you if...</h2>
            <p className={`mt-4 ${TEXT_BODY}`}>
              You want clarity, structure, and a process to follow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Starting from zero',
                desc: "You're not a developer and want a serious, practical way to begin without random trial-and-error."
              },
              {
                title: 'Time-constrained',
                desc: "You're solo or in a small team, and need disciplined progress with 5–10 focused hours per week."
              },
              {
                title: 'Creator or Expert',
                desc: "You already have clients, an audience, or a niche and want to build something real on stable ground."
              }
            ].map((card, i) => (
              <Card key={i} className={`border-slate-100 dark:border-slate-100 bg-white dark:bg-white ${SHADOW_CARD_SUBTLE} hover:shadow-md transition-shadow duration-300`}>
                <CardContent className="p-8">
                  <h3 className={`${TEXT_H3} mb-3`}>{card.title}</h3>
                  <p className={TEXT_BODY}>{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION: WHAT TO GET --- */}
      <section className="py-24 bg-slate-50/50 dark:bg-slate-50/50 border-t border-slate-200/60 dark:border-slate-200/60">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-12">
            <h2 className={TEXT_H2}>What you'll get</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Inside PDF */}
            <Card className={CARD_STYLE_BASE}>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-slate-900 dark:text-slate-900">Inside the PDF</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  'Why most SaaS fails before launch (and how to avoid it).',
                  'The 3 Pillars: Time, Money, and Mindset.',
                  'How to define scope and validate direction.',
                  'Practical AI prompts to speed up research.',
                  'A checklist for your first 30 days.'
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start text-[15px] text-slate-700 dark:text-slate-700 leading-relaxed">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Right: Cost/Value */}
            <Card className={CARD_STYLE_BASE}>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-slate-900 dark:text-slate-900">What it costs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-900 mb-2">Time</h4>
                  <p className="text-[15px] text-slate-700 dark:text-slate-700 leading-relaxed">
                    Typically 5–10 focused hours per week to execute with discipline.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-900 mb-2">Money</h4>
                  <p className="text-[15px] text-slate-700 dark:text-slate-700 leading-relaxed">
                    Often €0–€50 for early MVP scope when decisions are made in the right sequence.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-100">
                  <p className="text-indigo-700 dark:text-indigo-700 font-medium text-sm flex items-center gap-2">
                    <span className="uppercase tracking-wider font-bold text-xs">Result</span>
                    Clarity reduces fragility.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* --- SECTION: FAQ --- */}
      <section className="py-24 bg-white dark:bg-white border-t border-slate-100 dark:border-slate-100">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className={`${TEXT_H2} mb-10 text-center`}>FAQ</h2>

          <div className={`bg-white dark:bg-white rounded-xl border border-slate-200 dark:border-slate-200 ${SHADOW_CARD_SUBTLE} overflow-hidden`}>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-slate-100 dark:border-slate-100 last:border-0 px-6"
                >
                  <AccordionTrigger className="hover:no-underline py-5 text-left">
                    <span className="text-base font-semibold text-slate-900 dark:text-slate-900 pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-600 pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* --- FOOTER (Micro) --- */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-200 bg-slate-50 dark:bg-slate-50 text-center">
        <div className="container mx-auto px-6">
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-4">
            Built by Steve Westhoek — No hype. No income promises.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-600">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
