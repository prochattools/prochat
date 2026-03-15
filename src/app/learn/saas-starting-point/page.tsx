import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Check, Shield, CircleDot } from 'lucide-react'
import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const pageTitle = 'SaaS Starting Point | ProChat'
const pageDescription =
  'A structured framework for founders who want to turn an idea or insight into a production-ready SaaS decision before writing any code.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  metadataBase: new URL('https://prochat.tools'),
  alternates: {
    canonical: '/learn/saas-starting-point',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: '/learn/saas-starting-point',
    type: 'article',
    images: ['/og'],
  },
}

const steps = [
  {
    title: 'Define the buyer',
    description:
      'Map the person who will actually pay, including their desired outcome, current frustrations, and the context where the problem lives.',
    icon: Shield,
  },
  {
    title: 'Sharpen the proof',
    description:
      'Capture the specific evidence that proves this buyer actually cares—AMA replies, private beta interviews, demand signals, or niche audience requests.',
    icon: Check,
  },
  {
    title: 'Lock the boundary',
    description:
      'Decide what stays in scope for the first slice, what can wait, and what would break the experience if you built it too soon.',
    icon: CircleDot,
  },
]

const highlights = [
  'Works with AI-assisted writing and research because it standardizes input (buyer, proof, outcome, boundary).',
  'Keeps founders from building products without customer clarity or proof.',
  'Maps directly into SaaSKit once the framework shows what deserves structure.',
]

const ctaLink = '/starting-point'

export default function SaaSStartingPointPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection
        style={{ marginTop: 'calc(var(--pc-header-height) * -1)' }}
        className="pc-marketing-hero--lines-mobile border-b border-border"
        eyebrow={<HeroBadge text="Starting Point Framework" />}
        title="SaaS Starting Point"
        subtitle="The framework that helps founders define the buyer, proof, outcome, and boundary before building."
        subtitleClassName="mx-auto max-w-3xl text-center"
      >
        <div className="mx-auto mt-3 w-full max-w-3xl space-y-5 text-center px-4">
          <p className="text-lg font-semibold leading-relaxed text-muted-foreground">
            See how the Starting Point framework helps founders define the buyer, pain, outcome, proof, and boundary before they write code, then grab the full PDF to work through those same decisions with AI.
          </p>
          <Button asChild variant="primary" size="lg" className="mx-auto">
            <Link href={ctaLink}>GET THE FULL FRAMEWORK</Link>
          </Button>
        </div>
      </HeroSection>

      <Section tone="muted" spacing="loose">
        <div className="mx-auto max-w-5xl px-page">
          <div className="space-y-4 text-center">
            <h2 className="font-brand text-3xl font-bold text-foreground">Why most SaaS builds stall before launch</h2>
            <p className="text-lg text-muted-foreground">
              Founders often start with code, features, or infrastructure before clarifying who they serve or what proof exists. The result is fragile launches, rewrites, and uncertainty.
            </p>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:justify-center">
              {['Scope guesswork', 'Infrastructure chaos', 'Proof vacuum'].map(label => (
                <span
                  key={label}
                  className="inline-flex items-center justify-center rounded-full border border-border px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Button asChild variant="secondary" size="default">
              <Link href={ctaLink}>GET THE FULL FRAMEWORK</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="surface" spacing="loose" className="bg-background/95">
        <div className="mx-auto max-w-5xl px-page">
          <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-5">
            {[
              { label: 'Buyer', detail: 'Who pays for the solution and what outcome they truly need.' },
              { label: 'Pain', detail: 'The recurring frustration or constraint the buyer is living with today.' },
              { label: 'Outcome', detail: 'The measurable change that proves the new solution worked.' },
              { label: 'Proof', detail: 'The evidence that shows the buyer will care—demo reactions, demand signals, or pilot interest.' },
              { label: 'Boundary', detail: 'What stays in and what stays out for the first version so the scope stays solvable.' },
            ].map(item => (
              <Panel
                key={item.label}
                tone="default"
                padding="compact"
                className="flex h-full flex-col gap-3 bg-surface border border-border/50 p-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
                <p className="text-sm leading-relaxed text-muted-foreground/80">{item.detail}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="surface" spacing="loose" className="bg-background/90">
        <div className="mx-auto max-w-5xl px-page">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(step => (
              <Panel key={step.title} tone="default" padding="default" className="bg-surface">
                <div className="flex items-center gap-3 text-primary">
                  <step.icon className="h-5 w-5" />
                  <h3 className="font-brand text-lg text-foreground">{step.title}</h3>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">{step.description}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="muted" spacing="loose">
        <div className="mx-auto max-w-5xl px-page">
          <h2 className="font-brand text-3xl font-bold text-foreground">What the framework helps you decide</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            The framework leads you to the decisive question: what deserves software today, and what still needs proof or refinement?
          </p>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            {highlights.map(item => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-border bg-background px-5 py-4 shadow-sm"
              >
                <Check className="h-4 w-4 text-primary mt-1" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface" spacing="default" className="bg-background/80">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="font-brand text-3xl font-bold text-foreground">Where SaaSKit fits in</h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Once clarity is locked and you know what deserves software, SaaSKit removes the setup burden so you can execute with production-ready auth, billing, and launch paths. The framework shows you what to build, SaaSKit builds it safely.
          </p>
          <div className="mt-4 inline-flex rounded-full border border-primary/30 px-4 py-1 text-xs uppercase tracking-[0.35em] text-primary">
            SaaSKit → execution layer
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="secondary" size="lg">
              <Link href={ctaLink}>GET THE FULL FRAMEWORK</Link>
            </Button>
          </div>
        </div>
      </Section>

    </main>
  )
}
