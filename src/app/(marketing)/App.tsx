import Link from 'next/link'
import { CheckCircle2, Clock, FileText, MessageSquareText, ShieldCheck, TrendingUp } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const beforeItems = [
  'Rewriting the same emails',
  'Explaining context again',
  'Searching for old examples',
  'Turning notes into tasks by hand',
  'Drafting follow-ups from scratch',
  'Reports that take too long',
] as const

const afterItems = [
  'Draft replies ready to review',
  'Clear summaries and next steps',
  'Task lists from messy notes',
  'Proposal drafts from examples',
  'Support answers in your style',
  'Reports prepared faster',
] as const

const benefits = [
  {
    title: 'Stop repeating yourself',
    description: 'Use your own examples, style, and business knowledge so the same context does not need to be explained every time.',
    icon: MessageSquareText,
  },
  {
    title: 'Prepare work faster',
    description: 'Turn messy notes, emails, files, and examples into drafts, summaries, tasks, and reports your team can review.',
    icon: Clock,
  },
  {
    title: 'Keep knowledge reusable',
    description: 'Capture the way good work is done so it does not stay hidden in one person’s head, inbox, or old documents.',
    icon: FileText,
  },
  {
    title: 'Review before use',
    description: 'People stay in control. Important outputs are reviewed before they are sent, changed, or treated as final.',
    icon: ShieldCheck,
  },
] as const

const roleExamples = [
  {
    title: 'Founder / owner',
    description: 'Messy notes and examples become client replies, proposal drafts, delegation notes, and task instructions.',
  },
  {
    title: 'Sales',
    description: 'Call notes, objections, and old examples become follow-up emails, proposal drafts, CRM notes, and next steps.',
  },
  {
    title: 'Support',
    description: 'Customer questions and scattered knowledge become reply drafts, issue summaries, escalation notes, and FAQ updates.',
  },
  {
    title: 'Marketing',
    description: 'Ideas, examples, and brand voice become outlines, posts, email drafts, briefs, and publishing tasks.',
  },
  {
    title: 'Operations',
    description: 'Meeting notes and recurring updates become status reports, task lists, handoffs, and action plans.',
  },
  {
    title: 'Consulting / agencies',
    description: 'Client notes and past work become summaries, recommendations, proposal sections, and follow-up drafts.',
  },
] as const

const offerSteps = [
  'You show us one task your team repeats every week.',
  'We collect a few examples of what good output looks like.',
  'ProChat prepares the first draft, summary, task list, reply, or report.',
  'Your team reviews it and tells us what should improve.',
  'If it saves time, we turn it into a managed working flow.',
] as const

export default function App() {
  return (
    <div className="pc-homepage bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="ProChat OS · Repeated work made faster" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Stop rewriting</span>
            <span className="hero-accent block">the same work.</span>
          </>
        }
        subtitle="ProChat turns your repeated emails, notes, examples, reports, and follow-ups into drafts, summaries, tasks, and replies your team can review and use."
        primaryCTA={{ href: '/ai-workflows', label: 'Show us one repeated task' }}
        secondaryCTA={{ href: '/book', label: 'Book a call', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Less rewriting', 'Faster drafts', 'Human review first']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="before-after" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <h3 className="pc-card-title mb-5 text-foreground">What slows teams down</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {beforeItems.map(item => (
                <div key={item} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>

          <div className="flex justify-center">
            <div className="rounded-full border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-sm uppercase tracking-[0.16em] text-primary">
              Becomes
            </div>
          </div>

          <Panel tone="default" padding="default">
            <h3 className="pc-card-title mb-5 text-foreground">What ProChat prepares</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {afterItems.map(item => (
                <div key={item} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="problem" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">Your team should not keep re-explaining the same context</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Most teams already have examples, rules, notes, decisions, and old work that show what good looks like. The problem is that this knowledge is scattered, so every draft starts too close to zero.
          </p>
        </div>
      </Section>

      <Section id="benefits" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">What your business gets</h2>
            <p className="pc-body-copy pc-body-muted">
              Clearer work, faster drafts, and less repeated explanation — without giving up human review.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map(card => {
              const Icon = card.icon
              return (
                <Panel key={card.title} tone="default" padding="default" className="h-full">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="pc-card-title mb-3 text-foreground">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </Panel>
              )
            })}
          </div>
        </div>
      </Section>

      <Section id="roles" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Where it helps first</h2>
            <p className="pc-body-copy pc-body-muted">
              Start with the person or team that repeats the most valuable work every week.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {roleExamples.map(example => (
              <Panel key={example.title} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="pc-card-title mb-3 text-foreground">{example.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{example.description}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="offer" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              First offer
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">Prove one time-saving result first</h2>
            <p className="pc-body-copy pc-body-muted">
              No broad rollout. No complicated setup. We start with one repeated task, a few examples, and one useful output your team can judge.
            </p>
            <div className="mt-8 flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center">
              <span className="rounded-full border border-border bg-background px-4 py-2">First test from €750</span>
              <span className="rounded-full border border-border bg-background px-4 py-2">Done-for-you launch from €1,500</span>
            </div>
          </div>
          <Panel tone="default" padding="default">
            <div className="space-y-4">
              {offerSteps.map((step, index) => (
                <div key={step} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-mono text-xs text-primary">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="cta" tone="transparent" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="pc-section-title mb-6 text-foreground">What work is your team repeating by hand?</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            Show us one repeated task and a few examples. We will show what a faster, review-ready version could look like.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/ai-workflows">START — TIME-SAVING TEST</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/book">BOOK — A CALL</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
