import Link from 'next/link'
import { CheckCircle2, FileText, Mail, ShieldCheck, Workflow } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const examples = [
  'Client intake automation',
  'Document and email summarization',
  'Missing-information checklist',
  'Draft follow-up emails',
  'Content workflow automation',
  'Internal reports and task creation',
] as const

const outputs = [
  'Summaries',
  'Checklists',
  'Reports',
  'Draft replies',
  'Tasks',
  'Status updates',
] as const

const offerItems = [
  {
    title: 'Workflow prototype',
    price: 'from €750',
    description: 'A focused prototype around one repetitive workflow using fake or approved sample data.',
  },
  {
    title: 'Managed setup',
    price: 'from €1,500',
    description: 'Private setup, workflow mapping, configuration, and first managed automation path.',
  },
  {
    title: 'Monthly support',
    price: 'available',
    description: 'Ongoing support, updates, workflow iteration, and managed operations after the pilot.',
  },
] as const

const steps = [
  'Pick one repetitive workflow.',
  'Map the messy inputs and useful outputs.',
  'Build a private AI-assisted workflow.',
  'Review every output before anything is sent or changed.',
  'Continue only if the workflow saves real time.',
] as const

export default function AIWorkflowsPageContent() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="Managed ProChat OS workflows" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Managed AI workflows</span>
            <span className="hero-accent block">for messy business processes.</span>
          </>
        }
        subtitle="Turn emails, PDFs, forms, notes, folders, and APIs into structured summaries, checklists, reports, tasks, and draft replies — with human approval first."
        primaryCTA={{ href: '/book', label: 'Book a workflow discovery call' }}
        secondaryCTA={{ href: '#examples', label: 'See workflow examples', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['One workflow first', 'Private setup', 'Human approval before changes']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="problem" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">Do not buy another disconnected AI tool</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Most teams already have enough tools. The problem is the manual work between them: copying information, asking AI, reformatting output, creating tasks, drafting follow-ups, and updating systems by hand.
          </p>
        </div>
      </Section>

      <Section id="flow" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <Mail className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">Messy inputs</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Emails, PDFs, forms, notes, folders, APIs, attachments, transcripts, and unstructured business information.
            </p>
          </Panel>

          <div className="flex justify-center">
            <div className="rounded-full border border-primary/30 bg-primary/10 p-5 text-primary">
              <Workflow className="h-7 w-7" />
            </div>
          </div>

          <Panel tone="default" padding="default">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <FileText className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">Structured outputs</h3>
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

      <Section id="examples" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Start with one workflow</h2>
            <p className="pc-body-copy pc-body-muted">
              The fastest path is not a broad AI rollout. It is one narrow workflow with visible before/after value.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {examples.map(example => (
              <Panel key={example} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <h3 className="pc-card-title text-foreground">{example}</h3>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="offer" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">30-day workflow pilot</h2>
            <p className="pc-body-copy pc-body-muted">
              We pick one repetitive workflow, build the first prototype, review outputs with you, and only continue if it saves real admin time.
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

      <Section id="process" tone="transparent" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              How it works
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">Proof before scale</h2>
            <p className="pc-body-copy pc-body-muted">
              ProChat OS starts with human approval first. No output is sent or changed automatically until the workflow has earned trust.
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

      <Section id="cta" tone="muted" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="pc-section-title mb-6 text-foreground">Find the first workflow worth automating</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            Bring one messy workflow. We will map the inputs, outputs, approval points, and the smallest useful pilot.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/book">BOOK — WORKFLOW DISCOVERY CALL</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}
