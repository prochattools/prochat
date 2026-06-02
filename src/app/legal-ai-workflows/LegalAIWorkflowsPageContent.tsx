import Link from 'next/link'
import { CheckCircle2, FileText, LockKeyhole, ShieldCheck, Workflow } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const workflowOutputs = [
  'Client intake summary',
  'Document review summary',
  'Missing-information checklist',
  'Draft follow-up email',
  'Task list for the matter',
  'Structured matter notes',
] as const

const pilotSteps = [
  'Choose one repetitive document or intake workflow.',
  'Use fake or approved sample data for the first demo.',
  'Install or configure a private document/intake workspace.',
  'Add one ProChat OS workflow around that process.',
  'Review every output before anything is sent or changed.',
  'Decide after 30 days whether to continue managed support.',
] as const

const pricing = [
  {
    label: 'Pilot',
    price: '€750–€1,500',
    description: 'A focused 30-day pilot around one legal admin/document workflow.',
  },
  {
    label: 'Larger firm pilot',
    price: 'from €2,500',
    description: 'For firms with more people, stricter review, or more complex workflow mapping.',
  },
  {
    label: 'Managed support',
    price: 'from €250/month',
    description: 'Hosting, updates, workflow adjustments, support, and managed operations after the pilot.',
  },
] as const

export default function LegalAIWorkflowsPageContent() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="Private legal admin workflow pilot" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Private AI document workflows</span>
            <span className="hero-accent block">for small law firms.</span>
          </>
        }
        subtitle="Turn client emails, PDFs, notes, forms, and attachments into structured intake summaries, missing-information checklists, task lists, and draft follow-ups — with lawyer approval before anything is sent or changed."
        primaryCTA={{ href: '/book', label: 'Book a legal workflow discovery call' }}
        secondaryCTA={{ href: '#pilot', label: 'See the pilot offer', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['No legal advice claims', 'Human approval first', 'One workflow pilot']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="positioning" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">This is not legal advice automation</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The offer is legal admin and document workflow support. ProChat OS helps structure information, prepare drafts, surface missing details, and keep work moving. Lawyers stay in control and approve outputs first.
          </p>
        </div>
      </Section>

      <Section id="workflow" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <FileText className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">Messy legal/admin input</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Client emails, PDFs, notes, attachments, forms, matter documents, and follow-up information that someone currently has to structure manually.
            </p>
          </Panel>

          <div className="flex justify-center">
            <div className="rounded-full border border-primary/30 bg-primary/10 p-5 text-primary">
              <Workflow className="h-7 w-7" />
            </div>
          </div>

          <Panel tone="default" padding="default">
            <div className="mb-5 flex items-center gap-3 text-primary">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="pc-card-title text-foreground">Structured output for review</h3>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {workflowOutputs.map(output => (
                <div key={output} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {output}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="pilot" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Private Legal AI Workflow Pilot</h2>
            <p className="pc-body-copy pc-body-muted">
              We install or configure a private AI document/intake workspace for your firm and build one workflow around your real intake or document process.
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

      <Section id="process" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              Pilot structure
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">One workflow. Thirty days. Human approval.</h2>
            <p className="pc-body-copy pc-body-muted">
              The goal is not a broad AI rollout. The goal is to find one document or intake workflow that saves real admin time and can be safely reviewed by your firm.
            </p>
          </div>
          <Panel tone="default" padding="default">
            <div className="space-y-4">
              {pilotSteps.map((step, index) => (
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
        <div className="mx-auto max-w-7xl px-page">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ['Private by default', 'The pilot is designed around a private workspace and controlled access, not a public chatbot.'],
              ['Approval first', 'Nothing is sent or changed without lawyer approval during the pilot.'],
              ['Workflow, not advice', 'The system supports admin/document structure. It does not replace legal judgment.'],
            ].map(([title, description]) => (
              <Panel key={title} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  {title === 'Private by default' ? <LockKeyhole className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
                </div>
                <h3 className="pc-card-title mb-3 text-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="cta" tone="muted" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">Which legal admin workflow would you automate first?</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            Bring one repetitive intake, document, or follow-up process. We will map the smallest useful pilot and keep human approval first.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/book">BOOK — LEGAL WORKFLOW DISCOVERY</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}
