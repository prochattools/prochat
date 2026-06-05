import Link from 'next/link'
import { CheckCircle2, Clock, FileText, MessageSquareText, TrendingUp } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const painfulTasks = [
  'Follow-up emails that always need the same context',
  'Proposal drafts that start from old examples',
  'Support replies that should sound consistent',
  'Meeting notes that need to become tasks',
  'Reports that get rewritten every week',
  'Founder instructions that keep being repeated',
] as const

const outputs = [
  'Draft reply',
  'Proposal draft',
  'Support answer',
  'Task list',
  'Status report',
  'Next-step checklist',
] as const

const offerCards = [
  {
    title: 'First time-saving test',
    price: 'from €750',
    description: 'We take one repeated task, collect a few examples, and show what a faster review-ready output could look like.',
  },
  {
    title: 'Done-for-you launch',
    price: 'from €1,500',
    description: 'We set up the working flow for one person or team using simple entry points such as email, forms, files, or API calls.',
  },
  {
    title: 'Managed improvement',
    price: 'from €250/month',
    description: 'We keep outputs useful, improve examples and rules, and expand only when the work keeps saving time.',
  },
] as const

const process = [
  'Pick one repeated task that still takes too much manual effort.',
  'Share a few examples of what good work looks like.',
  'ProChat prepares the first draft, summary, report, reply, or task list.',
  'Your team reviews the output and tells us what is missing or wrong.',
  'We improve the result and decide whether it is worth launching properly.',
] as const

const buyerExamples = [
  {
    title: 'Founder / owner',
    description: 'Turn messy notes and old examples into replies, proposals, task instructions, and delegation notes.',
  },
  {
    title: 'Sales team',
    description: 'Turn calls, objections, and examples into follow-ups, proposal sections, CRM notes, and next steps.',
  },
  {
    title: 'Support team',
    description: 'Turn customer issues and known answers into reply drafts, escalation notes, and clearer handoffs.',
  },
  {
    title: 'Marketing team',
    description: 'Turn brand voice, examples, and campaign notes into better drafts, briefs, outlines, and posts.',
  },
] as const

export default function AIWorkflowsPageContent() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="First time-saving test" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Show us one task</span>
            <span className="hero-accent block">your team keeps repeating.</span>
          </>
        }
        subtitle="We turn your messy notes, examples, emails, files, and context into one review-ready output, so you can see whether ProChat saves real time before expanding."
        primaryCTA={{ href: '/book', label: 'Book a time-saving call' }}
        secondaryCTA={{ href: '#offer', label: 'See the offer', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['One repeated task', 'Real examples', 'Review-ready output']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="pain" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">The problem is not that your team lacks AI</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The problem is that people still have to explain the same context, find the same examples, rewrite the same drafts, and turn the same messy input into useful work by hand.
          </p>
        </div>
      </Section>

      <Section id="examples" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Good first tasks</h2>
            <p className="pc-body-copy pc-body-muted">
              Start where the pain is obvious and the output is easy to judge.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {painfulTasks.map(task => (
              <Panel key={task} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <MessageSquareText className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{task}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="output" tone="transparent" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <FileText className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">What you send in</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Notes, examples, emails, files, previous replies, decisions, procedures, call summaries, or anything that shows how the work should be done.
            </p>
          </Panel>

          <div className="flex justify-center">
            <div className="rounded-full border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-sm uppercase tracking-[0.16em] text-primary">
              Becomes
            </div>
          </div>

          <Panel tone="default" padding="default">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">What you get back</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {outputs.map(output => (
                <div key={output} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {output}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="offer" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Start small, judge the result</h2>
            <p className="pc-body-copy pc-body-muted">
              You do not need a broad rollout to know if this is useful. One repeated task is enough to prove the direction.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {offerCards.map(item => (
              <Panel key={item.title} tone="default" padding="default" className="h-full">
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
                  {item.price}
                </div>
                <h3 className="pc-card-title mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="process" tone="transparent" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              How the test works
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">Simple enough to try quickly</h2>
            <p className="pc-body-copy pc-body-muted">
              The first version can be run from files and examples. It does not need access to your whole company or a complex installation.
            </p>
          </div>
          <Panel tone="default" padding="default">
            <div className="space-y-4">
              {process.map((step, index) => (
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

      <Section id="roles" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Useful across roles</h2>
            <p className="pc-body-copy pc-body-muted">
              The first version should serve one person or team. Expansion comes after the output is useful.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {buyerExamples.map(example => (
              <Panel key={example.title} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="pc-card-title mb-3 text-foreground">{example.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{example.description}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="cta" tone="transparent" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
          <h2 className="pc-section-title mb-6 text-foreground">Start with the work your team already repeats</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            Bring one repeated task and a few examples. We will show what a faster, review-ready version could look like.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/book">BOOK — TIME-SAVING CALL</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/systems/prochat-os">VIEW — PROCHAT OS</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
