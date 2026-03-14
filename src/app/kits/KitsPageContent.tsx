'use client'

import Link from 'next/link'

import KitsShell from './_components/KitsShell'
import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import ScrollHintWrapper from '@/components/ui/ScrollHintWrapper'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'
import { cn } from '@/helpers/utils'

const PRODUCT_CARDS = [
  {
    name: 'ProKit',
    description:
      'A clean SaaS core for founders who already know what they want to build and just need a stable engineering foundation to ship from.',
    status: 'Live',
    href: '/kits/prokit',
    cta: 'VIEW — PROKIT',
    live: true,
  },
  {
    name: 'SaaSKit',
    description:
      'The best starting point for most founders—production-ready infrastructure plus the launch layer that lets you ship faster.',
    status: 'Live',
    href: '/kits/saaskit',
    cta: 'VIEW — SAASKIT',
    live: true,
  },
  {
    name: 'UX Kit',
    description:
      'A visual SaaS system with polished screens, dependable states, and conversion-focused components.',
    status: 'Coming Soon',
    href: '/waitlist',
    cta: 'VIEW — UXKIT',
    live: false,
  },
  {
    name: 'WaaSKit',
    description:
      'For founders who start with clients, cash flow, and validation before turning that experience into SaaS.',
    status: 'Coming Soon',
    href: null,
    cta: 'VIEW — WAASKIT',
    live: false,
  },
  {
    name: 'ProChat OS',
    description:
      'A roadmap operating layer that brings products, client workflows, and oversight into one controlled dashboard.',
    status: 'In Development',
    href: null,
    cta: 'In Development',
    live: false,
  },
] as const

const DIFFERENTIATION_GROUPS = [
  {
    name: 'Infrastructure',
    products: 'ProKit · SaaSKit',
    description: 'Production-ready foundations for authentication, billing, database structure, and deployment safety.',
  },
  {
    name: 'Design Layer',
    products: 'UX Kit',
    description: 'Structured interface patterns for founders who want clearer product UX and stronger conversion surfaces.',
  },
  {
    name: 'Monetization',
    products: 'WaaSKit',
    description: 'A focused layer for client-backed monetization systems and repeatable revenue operations.',
  },
  {
    name: 'Operations',
    products: 'ProChat OS',
    description: 'A unified dashboard layer for product oversight, workflow coordination, and operational visibility.',
  },
] as const

const COMPARISON_ROWS = [
  {
    label: 'Primary Use Case',
    values: [
      'Founders who want brand and funnel control',
      'Founders who want a structured launch path',
      'Teams shaping product UX and conversion surfaces',
      'Client-backed monetization systems',
      'Unified oversight across products and clients',
    ],
  },
  {
    label: 'Infrastructure Included',
    values: ['Core engine', 'Core + launch layer', 'No', 'Planned', 'Roadmap'],
  },
  {
    label: 'Design System',
    values: ['Bring your own', 'Integrated launch system', 'Structured design layer', 'Planned', 'Roadmap'],
  },
  {
    label: 'Monetization Layer',
    values: ['Custom', 'Structured launch layer', 'No', 'Client monetization', 'Unified revenue visibility'],
  },
  {
    label: 'Operational Dashboard',
    values: ['No', 'No', 'No', 'Planned', 'Yes'],
  },
  {
    label: 'Production Ready',
    values: ['Yes', 'Yes', 'In development', 'Coming soon', 'In development'],
  },
] as const

function StatusBadge({
  status,
  live,
}: {
  status: string
  live: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]',
        live
          ? 'kit-live-badge'
          : 'border-border-subtle bg-surface-soft text-muted-foreground',
      )}
    >
      {status}
      </span>
  )
}

function ProductCard({
  name,
  description,
  status,
  href,
  cta,
  live,
}: (typeof PRODUCT_CARDS)[number]) {
  return (
    <Panel
      tone={live ? 'default' : 'soft'}
      padding="default"
      interactive={live}
      className={cn('flex h-full flex-col gap-6', !live && 'opacity-[0.85]')}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="pc-card-title text-foreground">{name}</h3>
        <StatusBadge status={status} live={live} />
      </div>

      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-auto pt-2">
        {href ? (
          <Button asChild variant="secondary" size="sm" className={!live ? 'opacity-80' : undefined}>
            <Link href={href}>{cta}</Link>
          </Button>
        ) : (
          <Button variant="secondary" size="sm" disabled>
            {cta}
          </Button>
        )}
      </div>
    </Panel>
  )
}

const KitsPageContent = () => {
  return (
    <KitsShell>
      <HeroSection
        className="min-h-[100svh] border-b border-border"
        eyebrow={<HeroBadge text="Kits for SaaS builders" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Choose the right kit to launch faster.</span>
          </>
        }
        subtitle="ProChat Kits give non-technical founders structured starting points for validation, product foundations, and launch-ready SaaS—without stitching systems together from scratch."
        primaryCTA={{ href: '/kits/saaskit', label: 'Start with SaaSKit' }}
        secondaryCTA={{ href: '#comparison', label: 'Compare kits', variant: 'secondary' }}
      >
        <HeroCheckRow
          items={['Compare kits fast', 'Avoid wrong starts', 'Launch with clarity']}
          className="mx-auto"
        />
      </HeroSection>

      <Section className="py-16 md:py-20 lg:py-[120px]">
        <div className="mx-auto w-full max-w-7xl px-page">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              One system. Multiple ways in.
            </div>
            <h2 className="pc-section-title mt-4 text-foreground">Choose the right kit to start with</h2>
            <p className="pc-body-copy pc-body-muted mt-3">
              Each kit solves a different part of the build. Start with the one that matches what you need right now.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCT_CARDS.map((card) => (
              <ProductCard key={card.name} {...card} />
            ))}
            <Panel tone="soft" padding="default" className="flex h-full flex-col gap-4 border border-border">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
                Not sure where to start?
              </div>
              <div>
                <h3 className="pc-card-title text-foreground">Start with SaaSKit</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Start with SaaSKit if you want the clearest path to a production-ready SaaS launch.
                </p>
              </div>
              <div className="mt-auto pt-2">
                <Button asChild variant="secondary" size="sm">
                  <Link href="/kits/saaskit">VIEW — SAASKIT</Link>
                </Button>
              </div>
            </Panel>
          </div>
        </div>
      </Section>

      <Section className="py-16 md:py-20 lg:py-[120px]">
        <div className="mx-auto w-full max-w-7xl px-page">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              How the products differ
            </div>
            <h2 className="pc-section-title mt-4 text-foreground">What each kit adds</h2>
            <p className="pc-body-copy pc-body-muted mt-3">
              Each product adds a different layer to the system, so you can choose based on what you need now and what you plan to grow into later.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {DIFFERENTIATION_GROUPS.map((group) => (
              <Panel key={group.name} tone="soft" padding="default" className="flex h-full flex-col gap-4">
                <div className="space-y-2">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
                    {group.products}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{group.name}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{group.description}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="comparison" className="pb-32 pt-16 md:pb-36 md:pt-20 lg:pb-[160px] lg:pt-[120px]">
        <div className="mx-auto w-full max-w-7xl px-page">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              Compare the kits
            </div>
            <h2 className="pc-section-title mt-4 text-foreground">Compare the kits at a glance</h2>
            <p className="pc-body-copy pc-body-muted mt-3">
              See what each kit includes so you can choose the right starting point faster.
            </p>
          </div>

          <Panel tone="default" padding="none" className="overflow-hidden">
            <ScrollHintWrapper direction="horizontal" storageKey="kits-comparison-table">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                  <thead className="bg-surface-soft">
                    <tr className="border-b border-border-subtle">
                      <th className="min-w-[12rem] px-4 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        Layer
                      </th>
                      {PRODUCT_CARDS.map((card) => (
                        <th key={card.name} className="min-w-[13rem] px-4 py-4">
                          <div className="text-base font-semibold text-foreground">{card.name}</div>
                          <div className="mt-2">
                            <StatusBadge status={card.status} live={card.live} />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, index) => (
                      <tr
                        key={row.label}
                        className={cn(
                          'border-b border-border-subtle last:border-b-0',
                          index % 2 === 0 ? 'bg-background' : 'bg-surface/60',
                        )}
                      >
                        <th className="px-4 py-4 font-medium text-foreground">{row.label}</th>
                        {row.values.map((value, valueIndex) => (
                          <td key={`${row.label}-${valueIndex}`} className="px-4 py-4 text-muted-foreground">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollHintWrapper>
          </Panel>
        </div>
      </Section>
    </KitsShell>
  )
}

export default KitsPageContent
