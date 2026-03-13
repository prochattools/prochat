import type { Metadata } from 'next'
import { Suspense } from 'react'
import StartSignupForm from './_components/StartSignupForm'
import { AlertCircle, BookOpen } from 'lucide-react'
import SourceTracker from './SourceTracker'

export const metadata: Metadata = {
  title: 'The SaaS Starting Point | ProChat',
  description: 'The Operating System for SaaS Builders. A preparation framework to reduce risk before you build.',
}

const AUDIENCE_CARDS = [
  {
    title: 'Builder Starting from Zero',
    desc: 'You need clarity before starting again, so impulses do not create noise.',
  },
  {
    title: 'Time-Constrained Solo Builder',
    desc: 'Make disciplined scope reductions inside 5-10 hours per week.',
  },
  {
    title: 'Niche Insider',
    desc: 'Define the problem boundary before picking tools and infrastructure.',
  },
]

const PREPARATION_POINTS = [
  'Narrow your outcome',
  'Define a Minimal Viable Outcome',
  'Calculate real cost',
  'Validate commitment',
]

const PDF_ITEMS = [
  'Risk x Impact framework',
  'Minimal Viable Outcome definition',
  'Cost exposure calculation',
  'Manual validation strategy',
  'Scope reduction discipline',
]

const FAQ_BULLETS = [
  'AI builders: this flow focuses on structure, not the tooling.',
  'No coding required; but you must clarify scope, risk, and sequence.',
  'Preparation reveals what deserves validation now and what can wait.',
  'Skip prep and you end up rewiring infrastructure mid-build.',
]

function BrandCheckIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" className="mt-0.5 h-[18px] w-[18px] shrink-0">
      <circle cx="9" cy="9" r="9" fill="currentColor" className="text-primary" />
      <path
        d="M5.3 9.2 7.5 11.35 12.6 6.35"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CARD_ELEVATED = 'rounded-2xl border border-border bg-card shadow-[0_24px_60px_rgba(15,23,42,0.08)]'

export default function StartHerePage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-brand selection:bg-primary/20 selection:text-foreground">
      <Suspense fallback={null}>
        <SourceTracker />
      </Suspense>
      <section className="relative isolate flex min-h-[100svh] items-center border-b border-border bg-background py-12 lg:py-0">
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--light dark:hidden" />
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--dark hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__wash hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__glow hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__vignette hidden dark:block" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-page md:px-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-6">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">Preparation Layer</p>
            <h1 className="pc-hero-title text-foreground">
              Before You Build,
              <br className="hidden lg:block" />
              Prepare.
            </h1>
            <p className="font-sans max-w-[40ch] text-xl font-semibold leading-[1.45] text-foreground md:text-2xl">
              AI made building easy.
              <br />
              It did not remove failure.
            </p>
            <p className="max-w-[52ch] text-lg leading-[1.7] text-muted-foreground md:text-xl">
              Most SaaS fails because founders build before defining the system. This page captures the preparation work that keeps that from happening.
            </p>
            <div className="flex max-w-lg items-start gap-4 rounded-xl border border-primary/15 bg-primary/5 p-5">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
              <div className="space-y-1.5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">Focused Preparation</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The PDF keeps prep separate from execution so your choices do not accumulate risk.
                </p>
              </div>
            </div>
          </div>
          <div className="order-2 mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
              <div className={`${CARD_ELEVATED} relative p-8 lg:p-10`}>
                <div className="mb-6 space-y-3">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary">Free PDF</p>
                  <h3 className="font-sans text-2xl font-bold leading-tight text-foreground lg:text-3xl">
                    Download the Preparation Framework
                  </h3>
                </div>
                <div className="mb-6 [&_input]:!h-12 [&_input]:!bg-background [&_input]:!border-border [&_input]:!text-foreground [&_input]:!text-base [&_button]:!h-12 [&_button]:!text-base [&_button]:!font-semibold [&_button]:!whitespace-nowrap [&_button]:!px-6">
                  <Suspense fallback={null}>
                    <StartSignupForm buttonLabel="Download the Starting Point" />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16">
        <div className="mx-auto max-w-5xl px-page">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">Why This Exists</h2>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            Most SaaS fails before it starts because founders build without defining scope and system boundaries.
          </p>
          <ul className="mt-6 grid gap-4 text-base text-muted-foreground sm:grid-cols-2">
            {['Define the real problem', 'Define the minimal outcome', 'Calculate cost exposure', 'Define system boundaries'].map(point => (
              <li key={point} className="flex items-start gap-3 rounded-2xl border border-border bg-card px-5 py-4">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-primary" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-muted/60 py-16">
        <div className="mx-auto max-w-4xl px-page">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">Who This Is For</h2>
          <p className="mt-2 text-lg text-muted-foreground">Fast builders who need structure before execution.</p>
          <ul className="mt-6 space-y-3">
            {AUDIENCE_CARDS.map(card => (
              <li key={card.title} className="rounded-2xl border border-border bg-card px-6 py-4 text-base text-muted-foreground">
                <p className="font-semibold text-foreground">{card.title}</p>
                <p>{card.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16">
        <div className="mx-auto max-w-4xl px-page">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">Preparation Checklist</h2>
          <p className="mt-2 text-lg text-muted-foreground">Make these decisions before writing code.</p>
          <ul className="mt-6 space-y-3">
            {PREPARATION_POINTS.map(point => (
              <li key={point} className="flex items-start gap-3 rounded-2xl border border-border bg-card px-6 py-4 text-base text-muted-foreground">
                <BrandCheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-muted/60 py-16">
        <div className="mx-auto max-w-4xl px-page">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">Inside the PDF</h2>
          <p className="mt-2 text-lg text-muted-foreground">The download walks through these focused prompts.</p>
          <ul className="mt-6 space-y-3">
            {PDF_ITEMS.map(item => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-card px-6 py-4 text-base text-muted-foreground">
                <BookOpen className="mt-0.5 h-5 w-5 text-primary" strokeWidth={2.25} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16">
        <div className="mx-auto max-w-4xl px-page">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">Quick FAQ</h2>
          <p className="mt-2 text-lg text-muted-foreground">Short answers to keep you moving.</p>
          <ul className="mt-6 space-y-3">
            {FAQ_BULLETS.map(item => (
              <li key={item} className="rounded-2xl border border-border bg-card px-6 py-4 text-base text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
