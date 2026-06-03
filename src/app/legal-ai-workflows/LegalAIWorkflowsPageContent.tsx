import Link from 'next/link'
import { CheckCircle2, Clock, FileText, ShieldCheck, TrendingUp } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const beforeItems = [
  'Client emails with missing context',
  'PDFs and attachments to review',
  'Manual intake notes',
  'Follow-up questions buried in threads',
] as const

const afterItems = [
  'Intake summary',
  'Missing-information checklist',
  'Matter task list',
  'Draft follow-up email',
] as const

const outputs = [
  'Client intake summary',
  'Document review summary',
  'Missing-information checklist',
  'Draft follow-up email',
  'Task list for the matter',
  'Structured matter notes',
] as const

const pricing = [
  {
    label: 'First time-saving test',
    price: '€750–€1,500',
    description: 'Test one intake, document, or follow-up task using fake or approved sample data first.',
  },
  {
    label: 'Larger firm test',
    price: 'from €2,500',
    description: 'For firms with more people, more review steps, or a more complex document process.',
  },
  {
    label: 'Ongoing improvement',
    price: 'from €250/month',
    description: 'Keep the results useful, adjust them as your process changes, and expand only when it keeps saving time.',
  },
] as const

const steps = [
  'You show the document or intake work that currently takes too much time.',
  'We define what a useful reviewed output should look like.',
  'ProChat prepares the first summary, checklist, tasks, or draft reply.',
  'A lawyer reviews, edits, approves, or rejects the output.',
  'The same type of work becomes faster the next time it arrives.',
] as const

export default function LegalAIWorkflowsPageContent() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="AI document workflow support for law firms" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Turn client document chaos</span>
            <span className="hero-accent block">into review-ready legal admin.</span>
          </>
        }
        subtitle="Client emails, PDFs, notes, forms, and attachments become intake summaries, missing-information checklists, matter tasks, and draft follow-ups — with lawyer review before anything is used."
        primaryCTA={{ href: '/book', label: 'Book a legal time-saving call' }}
        secondaryCTA={{ href: '#examples', label: 'See what it prepares', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Admin support only', 'Lawyer review first', 'No automatic legal advice']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="positioning" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">This helps with legal admin, not legal judgment</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            ProChat helps prepare the boring but necessary structure around document-heavy work: summaries, checklists, missing details, task lists, and draft follow-ups. Your firm stays in control of the final review.
          </p>
        </div>
      </Section>

      <Section id="before-after" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <h3 className="pc-card-title mb-5 text-foreground">Before</h3>
            <div className="grid gap-3">
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
            <h3 className="pc-card-title mb-5 text-foreground">After</h3>
            <div className="grid gap-3">
              {afterItems.map(item => (
                <div key={item} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="examples" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">What ProChat can prepare for review</h2>
            <p className="pc-body-copy pc-body-muted">
              The goal is not to replace lawyers. The goal is to reduce the admin load before review begins.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {outputs.map(output => (
              <Panel key={output} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="pc-card-title text-foreground">{output}</h3>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="offer" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">See whether it saves your firm real time</h2>
            <p className="pc-body-copy pc-body-muted">
              Show us one intake, document, or follow-up task that takes too long. We prepare a review-ready version so your firm can judge the time savings clearly.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pricing.map(item => (
              <Panel key={item.label} tone="default" padding="default" className="h-full">
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
                  {item.label}
                </div>
                <h3 className="pc-card-title mb-3 text-foreground">{item.price}</h3>
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
              What the pilot looks like
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">From messy matter information to reviewed next steps</h2>
            <p className="pc-body-copy pc-body-muted">
              Your firm does not need to commit to a broad AI rollout. The first test is about one practical before-and-after result.
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

      <Section id="trust" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'No automatic advice', description: 'The system prepares admin and document outputs for review. It does not replace legal judgment.', icon: ShieldCheck },
              { title: 'Faster intake', description: 'New matter information can be summarized and organized before a lawyer reviews it.', icon: Clock },
              { title: 'Clearer follow-up', description: 'Missing details and draft questions are prepared so the next email is easier to send.', icon: TrendingUp },
            ].map(item => {
              const Icon = item.icon
              return (
                <Panel key={item.title} tone="default" padding="default" className="h-full">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="pc-card-title mb-3 text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </Panel>
              )
            })}
          </div>
        </div>
      </Section>

      <Section id="cta" tone="transparent" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">Which legal admin task should stop taking so much time?</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            Show us one document, intake, or follow-up process. We will show what a faster reviewed version could look like.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/book">BOOK — LEGAL TIME-SAVING CALL</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}
