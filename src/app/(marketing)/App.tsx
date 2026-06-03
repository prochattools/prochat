import Link from 'next/link'
import { CheckCircle2, Clock, FileText, ShieldCheck, TrendingUp } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const beforeItems = ['Messy emails', 'PDFs and attachments', 'Forms and notes', 'Follow-up chaos', 'Manual copy/paste', 'Missed tasks'] as const
const afterItems = ['Clear summaries', 'Missing-info checklists', 'Draft replies', 'Task lists', 'Status updates', 'Ready-to-review reports'] as const

const benefits = [
  {
    title: 'Save admin hours',
    description: 'Turn repetitive sorting, summarizing, drafting, and follow-up work into a repeatable flow your team can review.',
    icon: Clock,
  },
  {
    title: 'Respond faster',
    description: 'Give your team clear summaries, next steps, and draft replies so incoming work does not sit untouched.',
    icon: TrendingUp,
  },
  {
    title: 'Miss less information',
    description: 'Surface missing details, unclear requests, and follow-up questions before they slow the work down.',
    icon: FileText,
  },
  {
    title: 'Keep control',
    description: 'People approve important outputs before anything is sent, changed, or treated as final.',
    icon: ShieldCheck,
  },
] as const

const examples = [
  'A new client inquiry becomes a summary, checklist, task list, and draft reply.',
  'A folder of PDFs becomes key points, missing details, and a review-ready report.',
  'Messy internal notes become a clean action list and status update.',
  'A content idea becomes an outline, draft, checklist, and publishing tasks.',
  'A support request becomes a short summary, priority, next step, and response draft.',
  'A recurring report becomes a structured update instead of a manual rewrite.',
] as const

export default function App() {
  return (
    <div className="pc-homepage bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="ProChat OS · Managed AI Workflows" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Turn messy business work</span>
            <span className="hero-accent block">into clear next steps.</span>
          </>
        }
        subtitle="Send in emails, PDFs, forms, notes, folders, or tool data. Get summaries, checklists, tasks, reports, and draft replies your team can review and use."
        primaryCTA={{ href: '/ai-workflows', label: 'See what ProChat can do' }}
        secondaryCTA={{ href: '/book', label: 'Book a call', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Less admin work', 'Faster follow-up', 'Human approval first']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="outcome" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <h3 className="pc-card-title mb-5 text-foreground">Before ProChat OS</h3>
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
            <h3 className="pc-card-title mb-5 text-foreground">After ProChat OS</h3>
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
          <h2 className="pc-section-title mb-5 text-foreground">AI is useful. The work around it is still too manual.</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Most teams still copy information into AI tools, rewrite the output, create tasks by hand, paste drafts into email, and chase missing details themselves. ProChat OS is built to remove that repetitive admin layer.
          </p>
        </div>
      </Section>

      <Section id="benefits" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">What your business gets</h2>
            <p className="pc-body-copy pc-body-muted">
              The point is not another dashboard. The point is faster, clearer work with less repetitive manual effort.
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

      <Section id="how" tone="transparent" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              Simple entry points
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">Work can arrive the way it already arrives</h2>
            <p className="pc-body-copy pc-body-muted">
              Your team can send work by email, form, file drop, or API. ProChat sets up and manages the system behind it, so your business sees useful output instead of infrastructure.
            </p>
          </div>
          <Panel tone="default" padding="default">
            <div className="space-y-4">
              {[
                'Send messy information in.',
                'Receive structured output back.',
                'Review, approve, edit, or send it onward.',
                'Repeat the same process without rebuilding it every time.',
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

      <Section id="examples" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Examples of work ProChat can prepare</h2>
            <p className="pc-body-copy pc-body-muted">
              Pick the work that slows your team down most. ProChat turns it into a repeatable, reviewable output.
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
          <div className="mt-10 flex justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/ai-workflows">SEE — MANAGED WORKFLOWS</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section id="cta" tone="transparent" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">Where is your team still doing the same admin work by hand?</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
Show us one repetitive task that keeps stealing time. We will show what a faster, clearer version could look like before you commit to anything.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/book">BOOK — A DISCOVERY CALL</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/ai-workflows">VIEW — WORKFLOW OFFER</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
