import Link from 'next/link'
import { Bot, Database, GitBranch, ShieldCheck, Workflow } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const inputItems = ['Emails', 'PDFs', 'Notes', 'Forms', 'Folders', 'APIs'] as const
const outputItems = ['Summaries', 'Checklists', 'Tasks', 'Drafts', 'Reports', 'Tool-ready fields'] as const

const pillars = [
  {
    title: 'Workflow runtime',
    description: 'Runs configurable agents and workflows that move work from input to structured output.',
    icon: Workflow,
  },
  {
    title: 'Memory and context',
    description: 'Stores customer-specific context, documents, decisions, people, projects, and workflow history.',
    icon: Database,
  },
  {
    title: 'Connectors and routing',
    description: 'Connects to selected inputs and outputs so AI is part of the workflow, not trapped in a chat box.',
    icon: GitBranch,
  },
  {
    title: 'Approval first',
    description: 'Starts with human approval, then allows more automation only after the workflow earns trust.',
    icon: ShieldCheck,
  },
] as const

const examples = [
  'Client intake automation',
  'Document and email summarization',
  'Missing-information checklists',
  'Draft follow-up emails',
  'Internal reports and task creation',
  'Content workflow automation',
] as const

export default function App() {
  return (
    <div className="pc-homepage bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="ProChat OS · Agentic Workflow OS" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Agentic workflows</span>
            <span className="hero-accent block">between messy inputs and business tools.</span>
          </>
        }
        subtitle="ProChat OS is an installable private workflow runtime that connects emails, files, forms, folders, APIs, and business tools through memory, agents, approvals, and structured outputs."
        primaryCTA={{ href: '/systems/prochat-os', label: 'Explore ProChat OS' }}
        secondaryCTA={{ href: '/book', label: 'Book a call', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Private runtime', 'Human approval first', 'Managed setup available']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="problem" tone="transparent" spacing="default">
        <div className="mx-auto max-w-6xl px-page text-center">
          <h2 className="pc-section-title mb-4 text-foreground">AI chat is not enough</h2>
          <p className="pc-body-copy pc-body-muted mx-auto max-w-3xl">
            Most businesses still copy information into chat tools, wait for output, reformat it, create tasks manually, and paste results into other systems. ProChat OS removes that manual AI glue work.
          </p>
        </div>
      </Section>

      <Section id="flow" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <h3 className="pc-card-title mb-5 text-foreground">Messy inputs</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {inputItems.map(item => (
                <div key={item} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>

          <div className="flex justify-center">
            <div className="rounded-full border border-primary/30 bg-primary/10 p-5 text-primary">
              <Bot className="h-7 w-7" />
            </div>
          </div>

          <Panel tone="default" padding="default">
            <h3 className="pc-card-title mb-5 text-foreground">Structured outputs</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {outputItems.map(item => (
                <div key={item} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="architecture" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">What gets installed</h2>
            <p className="pc-body-copy pc-body-muted">
              A private Agentic Workflow OS runtime: workflow API, memory/context store, connectors, model routing, approval log, control console, CLI, and optional modules.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map(card => {
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

      <Section id="workflow-examples" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Automate one painful workflow first</h2>
            <p className="pc-body-copy pc-body-muted">
              Start with one repetitive process. ProChat OS maps the inputs and outputs, structures the work, asks for human approval, and only expands once the workflow proves value.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {examples.map(example => (
              <Panel key={example} tone="default" padding="default" className="h-full">
                <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
                  Workflow example
                </div>
                <h3 className="pc-card-title text-foreground">{example}</h3>
              </Panel>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/ai-workflows">BOOK — WORKFLOW DISCOVERY</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section id="cta" tone="transparent" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">Start with one workflow</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            ProChat OS starts small: one messy workflow, human approval first, then more automation once the system proves value.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/systems/prochat-os">EXPLORE — PROCHAT OS</Link>
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
