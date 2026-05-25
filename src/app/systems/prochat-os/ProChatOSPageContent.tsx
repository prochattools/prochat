'use client'

import Link from 'next/link'
import { CheckCircle2, Database, GitBranch, ServerCog, ShieldCheck, Workflow } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

type ProChatOSPageContentProps = {
  priceId?: string | null
}

const components = [
  'Workflow runtime / API',
  'Worker and scheduler',
  'Memory and context store',
  'Input and output connectors',
  'Model router / AI selector',
  'Approval and event log',
  'Control console',
  'CLI and optional modules',
] as const

const principles = [
  {
    title: 'Private runtime',
    description: 'A customer gets their own sanitized ProChat OS instance, not Steve’s private mind or brain repos.',
    icon: ServerCog,
  },
  {
    title: 'Context-aware agents',
    description: 'Workflows can use customer memory, documents, people, projects, decisions, and workflow history.',
    icon: Database,
  },
  {
    title: 'Connector-first',
    description: 'The system fits into existing inputs and outputs instead of forcing every user into a new dashboard.',
    icon: GitBranch,
  },
  {
    title: 'Approval first',
    description: 'Sensitive actions start with human approval and only move toward automation after trust is earned.',
    icon: ShieldCheck,
  },
] as const

export default function ProChatOSPageContent({ priceId: _priceId }: ProChatOSPageContentProps) {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="ProChat OS · Flagship" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">The Agentic Workflow OS</span>
            <span className="hero-accent block">for messy business work.</span>
          </>
        }
        subtitle="ProChat OS is an installable private workflow runtime that connects messy inputs to business tools through memory, connectors, model routing, workflow agents, approvals, logs, and a control console."
        primaryCTA={{ href: '/book', label: 'Book a call' }}
        secondaryCTA={{ href: '#architecture', label: 'See what gets installed', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Private install', 'Memory + connectors', 'Human approval first']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="what-it-is" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">What ProChat OS is</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            ProChat OS is the middle layer between messy business inputs and the tools a business already uses. It turns emails, files, forms, notes, folders, APIs, and other inputs into structured summaries, tasks, drafts, reports, updates, and actions.
          </p>
        </div>
      </Section>

      <Section id="architecture" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              Technical definition
            </div>
            <h2 className="pc-section-title mb-4 text-foreground">What a client installs</h2>
            <p className="pc-body-copy pc-body-muted">
              A sanitized ProChat OS instance: customer memory, customer workflows, customer credentials, connectors, logs, approvals, and optional modules.
            </p>
          </div>
          <Panel tone="default" padding="default">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {components.map(component => (
                <div key={component} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{component}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="principles" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Designed for real workflows</h2>
            <p className="pc-body-copy pc-body-muted">
              ProChat OS is not a chatbot and not only a dashboard. The dashboard is the command center. The product is the runtime that moves work.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {principles.map(card => {
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

      <Section id="business-model" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              Commercial model
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">Free personal use, paid commercial use</h2>
            <p className="pc-body-copy pc-body-muted">
              The intended model is a free personal/non-commercial GitHub version, with commercial licenses, managed setup, hosting, support, and implementation sold separately.
            </p>
          </div>
          <Panel tone="default" padding="default">
            <div className="grid gap-4">
              {[
                'Personal/non-commercial GitHub version',
                'Commercial license for business use',
                'Managed install on customer-owned or ProChat-managed infrastructure',
                'Workflow modules and support plans',
              ].map(item => (
                <div key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="first-wedge" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Workflow className="h-5 w-5" />
          </div>
          <h2 className="pc-section-title mb-6 text-foreground">First wedge: law-firm document workflows</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            The public ProChat OS website remains business-agnostic. Law firms are the first direct outreach wedge, using a legal document workspace demo and ProChat OS workflow layer as the concrete starting point.
          </p>
        </div>
      </Section>

      <Section id="cta" tone="muted" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">Start with one workflow</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            The first managed ProChat OS install should start with one painful workflow, human approval first, and clear before/after value.
          </p>
          <Button asChild variant="primary" size="lg">
            <Link href="/book">BOOK — A CALL</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}
