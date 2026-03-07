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
import { AlertCircle, BookOpen, Check, MonitorPlay } from 'lucide-react'

export const metadata: Metadata = {
  title: 'The SaaS Starting Point | ProChat',
  description:
    'The Operating System for SaaS Builders. A preparation framework to reduce risk before you build.',
}

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
    question: 'Is this technical?',
    answer:
      'Not in the coding sense. This is structural preparation: risk, scope, cost, and decision quality before you build.',
  },
  {
    question: 'Is this a make-money guide?',
    answer:
      'No. It does not teach growth tactics or revenue shortcuts. It prevents wasted effort before execution starts.',
  },
  {
    question: 'Do I need money to start?',
    answer:
      'Preparation phase: $0-$50. You can validate commitment and define scope before meaningful infrastructure spend.',
  },
  {
    question: 'Should I watch YouTube first?',
    answer:
      'No. Read the PDF first. YouTube makes more sense once your outcome, boundaries, and risk profile are clear.',
  },
  {
    question: 'What happens if I skip preparation?',
    answer:
      'Risk rises quickly. Rebuild cost rises with it, and emotional burnout follows when effort compounds in the wrong direction.',
  },
]

const CARD_BASE = 'rounded-2xl border border-border bg-card shadow-sm'
const CARD_ELEVATED =
  'rounded-2xl border border-border bg-card shadow-[0_24px_60px_rgba(15,23,42,0.08)]'

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
                The Operating System
                <br className="hidden lg:block" />
                for SaaS Builders.
              </h1>
              <p className="font-sans max-w-[40ch] text-xl font-semibold leading-[1.45] text-foreground md:text-2xl">
                AI removed the coding barrier.
                <br />
                It did not remove consequences.
              </p>
              <p className="max-w-[52ch] text-lg leading-[1.7] text-muted-foreground md:text-xl">
                Building software is accessible now, which means mistakes scale faster too. Overbuilding can happen in days when boundaries are unclear.
                This page gives you a preparation system to reduce fragility before you deploy anything.
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
                    Get The SaaS Starting Point
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    This is the preparation phase. It helps you define a viable outcome before technical execution starts.
                  </p>
                </div>

                <div className="mb-6 [&_input]:!h-12 [&_input]:!bg-background [&_input]:!border-border [&_input]:!text-foreground [&_input]:!text-base [&_button]:!h-12 [&_button]:!text-base [&_button]:!font-semibold [&_button]:!whitespace-nowrap [&_button]:!px-6">
                  <StartSignupForm buttonLabel="Get the PDF" />
                </div>

                <div className="border-t border-border pt-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
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
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary/70" strokeWidth={2.25} />
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
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary/70" strokeWidth={2.25} />
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
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary/70" strokeWidth={2.25} />
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
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={item.question}
                  value={`item-${index}`}
                  className="border-b border-border px-6 last:border-0"
                >
                  <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline">
                    <span className="pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <footer className="bg-muted/70 py-8 text-center">
        <div className="mx-auto px-6">
          <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
            Built by Steve Westhoek. Software tester. The Operating System for SaaS Builders.
          </p>
          <div className="flex items-center justify-center gap-5 text-xs font-medium text-muted-foreground">
            <Link href="/privacy" className="transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
