import type { Metadata } from 'next'
import { Suspense } from 'react'
import { BookOpen } from 'lucide-react'
import HeroBadge from '@/components/ui/hero-badge'
import HeroSection from '@/components/marketing/HeroSection'
import { Button } from '@/components/ui/button'
import StartSignupForm from './_components/StartSignupForm'
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

export default function StartHerePage() {
  const heroButtonLabel = (
    <span
      className="pc-action-label"
      dangerouslySetInnerHTML={{
        __html:
          '<span class="font-semibold text-current">SEND ME</span><span aria-hidden="true" class="opacity-70"> - </span><span class="opacity-70">THE FRAMEWORK</span>',
      }}
    />
  )

  return (
    <main className="min-h-screen bg-background text-foreground font-brand selection:bg-primary/20 selection:text-foreground">
      <Suspense fallback={null}>
        <SourceTracker />
      </Suspense>
      <HeroSection
        className="pc-marketing-hero--lines-mobile border-b border-border"
        eyebrow={<HeroBadge text="Free Framework" />}
        title="Turn your SaaS idea into a buildable system."
        subtitle="A practical framework for non-technical founders who want to define the buyer, pain, outcome, proof, and boundary before building the wrong thing."
        subtitleClassName="mx-auto max-w-3xl text-center"
      >
        <div id="starting-point-hero" className="mx-auto mt-3 w-full max-w-3xl space-y-4 text-center px-4">
          <div className="mx-auto w-full max-w-2xl">
            <Suspense fallback={null}>
              <StartSignupForm buttonLabel={heroButtonLabel} />
            </Suspense>
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-2.5 text-sm font-semibold text-foreground sm:grid-cols-3 sm:gap-3">
            <span className="inline-flex min-h-[42px] w-full items-center justify-center rounded-2xl bg-foreground/5 px-4 py-2 text-center">Clarify the buyer</span>
            <span className="inline-flex min-h-[42px] w-full items-center justify-center rounded-2xl bg-foreground/5 px-4 py-2 text-center">Sharpen the outcome</span>
            <span className="inline-flex min-h-[42px] w-full items-center justify-center rounded-2xl bg-foreground/5 px-4 py-2 text-center">Test the idea</span>
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            AI builds code. Structure ships products.
          </p>
        </div>
      </HeroSection>

      <section className="border-b border-border bg-background/60 py-24">
        <div className="mx-auto max-w-5xl px-page">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">Why founders fail before the first launch</h2>
          <p className="mt-3 max-w-3xl text-lg font-semibold text-muted-foreground">
            They write code without knowing who they serve or what outcome matters, so the build collapses under pressure.
          </p>
          <ul className="mt-8 grid gap-6 text-sm text-muted-foreground sm:grid-cols-2">
            {['Define the real problem', 'Scope the minimal outcome', 'Calculate cost exposure', 'Set system boundaries'].map(point => (
              <li key={point} className="flex items-start gap-3 rounded-2xl border border-border bg-surface px-6 py-6 shadow-sm">
                <span className="mt-0.5 h-2 w-2 rounded-full bg-primary" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-muted/60 py-24">
        <div className="mx-auto max-w-5xl px-page">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">Who should grab it</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Non-technical founders who want clarity before wiring infrastructure or hiring engineering help.
          </p>
          <ul className="mt-8 grid gap-6 text-sm text-muted-foreground md:grid-cols-3">
            {AUDIENCE_CARDS.map(card => (
              <li key={card.title} className="rounded-2xl border border-border bg-background px-6 py-6 shadow-sm">
                <p className="font-semibold text-foreground">{card.title}</p>
                <p>{card.desc}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16 pt-3 text-center">
            <Button asChild variant="primary" size="lg" className="mx-auto">
              <a href="#starting-point-hero">GET THE FRAMEWORK</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background/70 py-24">
        <div className="mx-auto max-w-5xl px-page">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">What the framework helps you decide</h2>
          <p className="mt-2 text-lg text-muted-foreground">Skip rework by locking focus before writing code.</p>
          <ul className="mt-8 grid gap-6 text-sm text-muted-foreground md:grid-cols-2">
            {PREPARATION_POINTS.map(point => (
              <li key={point} className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-6 py-6 shadow-sm">
                <BrandCheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-muted/60 py-24">
        <div className="mx-auto max-w-5xl px-page">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">Inside the PDF</h2>
          <p className="mt-2 text-lg text-muted-foreground">Step-by-step prompts that keep your scope honest.</p>
          <ul className="mt-8 grid gap-6 text-sm text-muted-foreground md:grid-cols-2">
            {PDF_ITEMS.map(item => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-border bg-background px-6 py-6 shadow-sm">
                <BookOpen className="mt-0.5 h-5 w-5 text-primary" strokeWidth={2.25} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-border bg-background px-page py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground">Quick FAQ</h2>
          <p className="mt-2 text-lg text-muted-foreground">Final doubts cleared.</p>
          <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
            {FAQ_BULLETS.map(item => (
              <li key={item} className="rounded-2xl border border-border bg-card px-6 py-6 text-base">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-16 pt-3 text-center">
            <Button asChild variant="primary" size="lg" className="mx-auto">
              <a href="#starting-point-hero">GET THE FRAMEWORK</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
