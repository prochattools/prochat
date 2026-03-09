import type { Metadata } from 'next'
import Link from 'next/link'
import StartSignupForm from './_components/StartSignupForm'
import StartingPointFaq from './_components/StartingPointFaq'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, BookOpen, MonitorPlay } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The SaaS Starting Point | ProChat',
  description:
    'The Operating System for SaaS Builders. A preparation framework to reduce risk before you build.',
}

const NEXT_STEP_COLUMNS = [
  {
    title: 'Validate',
    copy: 'Read the validation guide before writing production code.',
    href: '/blog/how-to-validate-a-saas-idea-without-coding',
    cta: 'Read the guide',
  },
  {
    title: 'Define Infrastructure',
    copy: 'Understand auth, billing, deployment, and boundaries.',
    href: '/blog/what-makes-a-saas-boilerplate-production-ready',
    cta: 'Review the system',
  },
  {
    title: 'Implement',
    copy: 'Apply structure using SaaSKit.',
    href: '/kits',
    cta: 'Explore the kits',
  },
] as const

const AUDIENCE_CARDS = [
  {
    title: 'Builder Starting from Zero',
    desc: 'You see the opportunity AI created, but every option looks urgent. The risk is impulsive experimentation that creates noise instead of progress. Your task is clarity before action.',
  },
  {
    title: 'Time-Constrained Solo Builder',
    desc: 'You have 5-10 hours per week and cannot afford broad scope. The risk is scope inflation that steals momentum. Your task is reduction and sequence discipline.',
  },
  {
    title: 'Niche Insider',
    desc: 'You understand a specific market and where pain is real. The risk is overbuilding for edge cases too early. Your task is boundary definition before infrastructure.',
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
  'Risk x Impact framework',
  'Minimal Viable Outcome definition',
  'Cost exposure calculation',
  'Manual validation strategy',
  'Scope reduction discipline',
]

const FAQ_ITEMS = [
  {
    question: 'Is this for AI founders using no-code or AI tools?',
    answer:
      'Yes. It is written for founders using AI coding tools, no-code systems, or hybrid workflows. The focus is not the tool itself. The focus is how to make better structural decisions before you build.',
  },
  {
    question: 'Do I need to be technical?',
    answer:
      'No. You do not need to write code to use this framework. You do need to think clearly about scope, risk, cost, and sequence before you move into infrastructure.',
  },
  {
    question: 'Is this about validation or infrastructure?',
    answer:
      'It sits before both. Preparation helps you decide what should be validated, what can wait, and what infrastructure later needs to support. That makes validation cleaner and implementation less fragile.',
  },
  {
    question: 'How is this different from YouTube advice?',
    answer:
      'Most YouTube advice starts at execution. This framework starts at sequence and decision quality. It gives you a preparation layer first, so tutorials do not pull you into implementation before the structure is clear.',
  },
  {
    question: 'What happens if I skip preparation?',
    answer:
      'You usually overbuild, choose tools too early, or define the wrong system boundary. That pushes mistakes deeper into infrastructure, where they are more expensive to unwind. Preparation is what prevents that rebuild cycle.',
  },
]

const CARD_BASE = 'rounded-2xl border border-border bg-card shadow-sm'
const CARD_ELEVATED =
  'rounded-2xl border border-border bg-card shadow-[0_24px_60px_rgba(15,23,42,0.08)]'

function BrandCheckIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      aria-hidden="true"
      className="mt-0.5 h-[18px] w-[18px] shrink-0"
    >
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
  return (
    <main className="min-h-screen bg-background text-foreground font-brand selection:bg-primary/20 selection:text-foreground">
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden border-b border-border bg-background py-12 lg:py-0">
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--light dark:hidden" />
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--dark hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__wash hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__glow hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__vignette hidden dark:block" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-page md:px-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-1 space-y-8 lg:space-y-10">
            <div className="space-y-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Preparation Layer
              </p>
              <h1 className="pc-hero-title text-foreground">
                Before You Build,
                <br className="hidden lg:block" />
                Prepare.
              </h1>
              <p className="font-sans max-w-[40ch] text-xl font-semibold leading-[1.45] text-foreground md:text-2xl">
                AI removed the coding barrier.
                <br />
                It did not remove consequences.
              </p>
              <p className="max-w-[52ch] text-lg leading-[1.7] text-muted-foreground md:text-xl">
                Building software is accessible now, which means mistakes scale faster too. This page gives you a preparation system to reduce fragility before you deploy anything.
              </p>
            </div>

            <div className="flex max-w-lg items-start gap-4 rounded-xl border border-primary/15 bg-primary/5 p-5">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" strokeWidth={2.25} />
              <div className="space-y-1.5">
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Strict Separation
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  PDF = preparation.
                  <br />
                  YouTube = execution.
                </p>
              </div>
            </div>
          </div>

          <div className="order-2 mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div
                className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
                aria-hidden="true"
              />
              <div className={`${CARD_ELEVATED} relative p-8 lg:p-10`}>
                <div className="mb-6 space-y-3">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary">
                    Free PDF
                  </p>
                  <h3 className="font-sans text-2xl font-bold leading-tight text-foreground lg:text-3xl">
                    Download the Preparation Framework
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    This is the preparation phase. It helps you define a viable outcome before technical execution starts.
                  </p>
                </div>

                <div className="mb-6 [&_input]:!h-12 [&_input]:!bg-background [&_input]:!border-border [&_input]:!text-foreground [&_input]:!text-base [&_button]:!h-12 [&_button]:!text-base [&_button]:!font-semibold [&_button]:!whitespace-nowrap [&_button]:!px-6">
                  <StartSignupForm buttonLabel="Get the PDF" />
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm leading-relaxed text-foreground/72">
                    Clarity before complexity.
                    <br />
                    Structure before execution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-16">
        <div className="mx-auto max-w-4xl px-page">
          <div className={`${CARD_BASE} p-8 md:p-10`}>
            <div className="space-y-3">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                Who This Is For
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                This is for AI founders who can build quickly but want fewer rebuild cycles.
                <br />
                If you&apos;re moving fast, this keeps you from breaking structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/60 py-24">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-sans mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
              Preparation and Execution Are Not the Same
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              The PDF is preparation. YouTube is execution.
              Both are necessary, but they solve different problems in a different order.
            </p>
          </div>

          <div className="grid items-start gap-10 md:grid-cols-2 lg:gap-16">
            <div className="flex justify-center md:block">
              <div className="max-w-sm space-y-6 md:pl-8">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <BookOpen className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-foreground">The PDF helps you</h3>
                </div>
                <ul className="space-y-4">
                  {PREPARATION_POINTS.map(item => (
                    <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                      <BrandCheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-center md:block">
              <div className="max-w-sm space-y-6 md:pl-8">
                <div className="mb-2 flex items-center gap-3">
                  <div className="rounded-lg bg-background p-2 text-muted-foreground border border-border">
                    <MonitorPlay className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-foreground">The YouTube channel shows</h3>
                </div>
                <ul className="space-y-4">
                  {EXECUTION_POINTS.map(item => (
                    <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                      <BrandCheckIcon />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-12 text-center text-base font-medium text-foreground">
            Execution does not fix a vague idea.
            <br />
            Preparation prevents rebuild cycles.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-sans mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
              This Is Not for Everyone
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              This framework filters for seriousness. It is for builders who want fewer blind spots, not louder motivation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {AUDIENCE_CARDS.map(card => (
              <Card key={card.title} className={`${CARD_BASE} transition-shadow duration-300 hover:shadow-md`}>
                <CardContent className="space-y-4 p-8">
                  <h3 className="font-sans text-lg font-bold text-foreground">{card.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-12 text-center text-base font-medium text-foreground">
            If you are chasing fast money, this is not for you.
            <br />
            If you are willing to think before building, continue.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/60 py-24">
        <div className="mx-auto max-w-4xl px-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="font-sans text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
              Inside the PDF
            </h2>
          </div>

          <div className={`${CARD_BASE} p-8 md:p-10`}>
            <ul className="space-y-4">
              {PDF_ITEMS.map(item => (
                <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                  <BrandCheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-base font-medium text-foreground">
              This is not motivational.
              <br />
              It is protective.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="font-sans mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
              What Comes After Preparation?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {NEXT_STEP_COLUMNS.map(item => (
              <Card key={item.title} className={CARD_BASE}>
                <CardContent className="space-y-5 p-8">
                  <h3 className="font-sans text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{item.copy}</p>
                  <Link
                    href={item.href}
                    className="inline-flex items-center font-mono text-xs font-semibold uppercase tracking-[0.12em] text-primary transition-opacity hover:opacity-80"
                  >
                    {item.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-24">
        <div className="mx-auto max-w-4xl px-page">
          <div className={`${CARD_BASE} p-8 md:p-10`}>
            <h2 className="font-sans mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
              Why This Matters Now
            </h2>

            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              Five years ago, building SaaS required developers, capital, and long timelines. That barrier was high, and it filtered who could execute.
            </p>
            <ul className="mb-8 list-disc space-y-2 pl-5 marker:text-border">
              <li className="text-muted-foreground">Developers</li>
              <li className="text-muted-foreground">Capital</li>
              <li className="text-muted-foreground">Months of waiting</li>
            </ul>

            <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
              Today, AI removed that barrier. Anyone can build quickly, which means overbuilding can happen just as quickly.
            </p>
            <p className="text-lg font-medium leading-relaxed text-foreground">
              Structure is no longer optional.
              <br />
              It is the survival filter.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/40 py-24">
        <div className="mx-auto max-w-3xl px-page">
          <h2 className="font-sans mb-12 text-center text-3xl font-bold text-foreground">FAQ</h2>

          <div className={`${CARD_BASE} overflow-hidden`}>
            <StartingPointFaq items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <footer className="bg-muted/70 py-8 text-center">
        <div className="mx-auto px-6">
          <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
            Built by Steve Westhoek. SaaS Infrastructure Architect.
          </p>
          <div className="flex items-center justify-center gap-3 text-xs font-normal text-muted-foreground">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
