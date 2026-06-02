'use client'

import Link from 'next/link'
import { CheckCircle2, Clock, FileText, Mail, ShieldCheck, TrendingUp } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

type ProChatOSPageContentProps = {
  priceId?: string | null
}

const outcomes = [
  {
    title: 'Less admin drag',
    description: 'Repetitive sorting, summarizing, drafting, and task creation become faster and more consistent.',
    icon: Clock,
  },
  {
    title: 'Clearer information',
    description: 'Messy documents, notes, forms, and emails become summaries, checklists, and reports people can review.',
    icon: FileText,
  },
  {
    title: 'Faster follow-up',
    description: 'Prepare draft replies and next-step lists so important work does not wait for someone to start from scratch.',
    icon: TrendingUp,
  },
  {
    title: 'Human control',
    description: 'Important outputs can be reviewed and approved before they are sent, changed, or treated as final.',
    icon: ShieldCheck,
  },
] as const

const examples = [
  'Emails and attachments become a clear client or customer summary.',
  'PDFs and notes become missing-information checklists.',
  'Incoming requests become priorities, tasks, and draft responses.',
  'Recurring reports become structured updates instead of manual rewrites.',
  'Content inputs become outlines, drafts, and publishing tasks.',
  'Internal notes become a clean action list for the team.',
] as const

const entryPoints = ['Email', 'Forms', 'File drops', 'Folders', 'API calls', 'Manual upload'] as const
const outputs = ['Summary', 'Checklist', 'Draft reply', 'Task list', 'Report', 'Status update'] as const

export default function ProChatOSPageContent({ priceId: _priceId }: ProChatOSPageContentProps) {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="ProChat OS · Managed AI workflows" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Messy business information in.</span>
            <span className="hero-accent block">Useful work out.</span>
          </>
        }
        subtitle="ProChat OS helps your team turn emails, PDFs, forms, notes, folders, and API data into summaries, checklists, tasks, reports, status updates, and draft replies for review."
        primaryCTA={{ href: '/ai-workflows', label: 'See managed workflows' }}
        secondaryCTA={{ href: '/book', label: 'Book a call', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Save admin time', 'Review before action', 'Managed for your business']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="plain-definition" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">What ProChat OS does</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            ProChat OS helps businesses get repetitive information work done faster. Your team sends messy input in, and ProChat prepares a clear output that people can review, edit, approve, or send onward.
          </p>
        </div>
      </Section>

      <Section id="before-after" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <Mail className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">Ways work can arrive</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {entryPoints.map(item => (
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
            <div className="mb-5 flex items-center gap-3 text-primary">
              <FileText className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">What your team gets back</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {outputs.map(item => (
                <div key={item} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="benefits" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Why businesses use it</h2>
            <p className="pc-body-copy pc-body-muted">
              ProChat is useful when the same type of information keeps arriving and people keep doing the same manual work to make it usable.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {outcomes.map(card => {
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

      <Section id="managed" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              Managed for your business
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">You focus on the result, not the setup</h2>
            <p className="pc-body-copy pc-body-muted">
              ProChat sets up and manages the workflow system behind the scenes. Your business uses simple entry points like email, forms, file drops, or APIs and receives useful output back for review.
            </p>
          </div>
          <Panel tone="default" padding="default">
            <div className="space-y-4">
              {[
                'You choose the repetitive work that costs time.',
                'We define what the finished output should look like.',
                'Your team sends work in through the simplest entry point.',
                'ProChat prepares the result for review.',
                'You approve, edit, send, or use the output.',
              ].map((step, index) => (
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

      <Section id="examples" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Examples of useful output</h2>
            <p className="pc-body-copy pc-body-muted">
              The exact workflow depends on the business, but the outcome is always the same: less messy input, more usable work.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {examples.map(example => (
              <Panel key={example} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{example}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="cta" tone="muted" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">What messy work should become easier first?</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            Show us what your team receives today and what a useful finished output should look like. We will help you define the fastest practical version.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/book">BOOK — A CALL</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/ai-workflows">SEE — MANAGED WORKFLOWS</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
