import Link from 'next/link'
import { CheckCircle2, Clock, FileText, Mail, ShieldCheck, TrendingUp } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const examples = [
  'New client requests become summaries, next steps, and draft replies.',
  'Messy document packs become key points, missing details, and checklists.',
  'Support or service requests become priority, context, task list, and response draft.',
  'Recurring reports become structured updates instead of manual rewrites.',
  'Content ideas become outlines, drafts, publishing tasks, and follow-up actions.',
  'Internal notes become clear action lists and status updates.',
] as const

const outcomes = [
  'Less copying and pasting',
  'Faster first replies',
  'Clearer handoffs',
  'Fewer forgotten follow-ups',
  'More consistent admin work',
  'Outputs ready for review',
] as const

const offerItems = [
  {
    title: 'Workflow prototype',
    price: 'from €750',
    description: 'A practical first version that shows how one messy process can become a clear output your team can review.',
  },
  {
    title: 'Managed setup',
    price: 'from €1,500',
    description: 'ProChat sets up and manages the workflow for you, using simple entry points such as email, forms, file drops, or API calls.',
  },
  {
    title: 'Monthly support',
    price: 'available',
    description: 'Keep the workflow running, improve the outputs, add small changes, and expand only when it keeps saving time.',
  },
] as const

const steps = [
  'You show us the repetitive work that slows the team down.',
  'We define what a useful finished output should look like.',
  'ProChat prepares summaries, checklists, tasks, reports, or drafts for review.',
  'Your team approves, edits, sends, or uses the output.',
  'The same process becomes faster the next time similar work arrives.',
] as const

export default function AIWorkflowsPageContent() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="Managed AI workflows" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Stop losing hours</span>
            <span className="hero-accent block">to repetitive admin work.</span>
          </>
        }
        subtitle="Send messy emails, PDFs, forms, notes, folders, or API data in. Get summaries, checklists, reports, tasks, and draft replies back for human review."
        primaryCTA={{ href: '/book', label: 'Book a workflow discovery call' }}
        secondaryCTA={{ href: '#examples', label: 'See examples', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Save admin time', 'Respond faster', 'Human approval first']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="problem" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">Your team should not be the glue between every tool</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            If people still read every message, summarize every document, chase every missing detail, write every follow-up, and update every task by hand, AI is not saving enough time yet.
          </p>
        </div>
      </Section>

      <Section id="flow" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <Mail className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">What comes in</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Emails, forms, PDFs, notes, folders, attachments, support requests, reports, files, and data from other tools.
            </p>
          </Panel>

          <div className="flex justify-center">
            <div className="rounded-full border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-sm uppercase tracking-[0.16em] text-primary">
              Becomes
            </div>
          </div>

          <Panel tone="default" padding="default">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <FileText className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">What you get back</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {['Summary', 'Checklist', 'Draft reply', 'Task list', 'Report', 'Status update'].map(output => (
                <div key={output} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {output}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="outcomes" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">The outcome is speed and clarity</h2>
            <p className="pc-body-copy pc-body-muted">
              You are not buying infrastructure. You are buying back time from repetitive information work.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {outcomes.map(outcome => (
              <Panel key={outcome} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="pc-card-title text-foreground">{outcome}</h3>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="examples" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Examples your team can recognize</h2>
            <p className="pc-body-copy pc-body-muted">
              The best workflow is the one your team already repeats every week and does not want to keep doing manually.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {examples.map(example => (
              <Panel key={example} tone="default" padding="default" className="h-full">
                <p className="text-sm leading-relaxed text-muted-foreground">{example}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="offer" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">A practical way to test it</h2>
            <p className="pc-body-copy pc-body-muted">
              We keep the first step small: show the before, define the after, and prove whether the result is worth paying for.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {offerItems.map(item => (
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

      <Section id="process" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              How it feels for your team
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">Simple input. Useful output. Review before action.</h2>
            <p className="pc-body-copy pc-body-muted">
              Your team does not need to learn a complex system first. Work can arrive through simple entry points, and the result comes back in a form people can check and use.
            </p>
          </div>
          <Panel tone="default" padding="default">
            <div className="space-y-4">
              {steps.map((step, index) => (
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

      <Section id="trust" tone="transparent" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-6 px-page md:grid-cols-3">
          {[
            { title: 'Managed for you', body: 'ProChat sets up and runs the workflow system, so your business focuses on the result, not the infrastructure.', icon: Clock },
            { title: 'Connected to your work', body: 'Work can come in through email, forms, file drops, or API calls, depending on what fits your process.', icon: TrendingUp },
            { title: 'Approval stays human', body: 'Important outputs are reviewed before they are sent, changed, or treated as final.', icon: ShieldCheck },
          ].map(item => {
            const Icon = item.icon
            return (
              <Panel key={item.title} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="pc-card-title mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Panel>
            )
          })}
        </div>
      </Section>

      <Section id="cta" tone="muted" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="pc-section-title mb-6 text-foreground">Which repetitive task is costing your team the most time?</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            Show us the messy input and the result you wish your team had. We will tell you what a first useful version could look like.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/book">BOOK — WORKFLOW DISCOVERY CALL</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}
