'use client'

import Link from 'next/link'

import KitsShell from './_components/KitsShell'
import HeroSection from '@/components/marketing/HeroSection'
import ScrollHintWrapper from '@/components/ui/ScrollHintWrapper'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'
import { cn } from '@/helpers/utils'

const PRODUCT_CARDS = [
  {
    name: 'ProKit',
    description:
      'Production-ready authentication, billing, database, and deployment structure for founders who want full control over brand, funnel, and design.',
    status: 'Live',
    href: '/kits/prokit',
    cta: 'View ProKit',
    live: true,
  },
  {
    name: 'SaaSKit',
    description:
      'The same production foundation plus a structured marketing layer for founders who want a faster, opinionated path to launch.',
    status: 'Live',
    href: '/kits/saaskit',
    cta: 'View SaaSKit',
    live: true,
  },
  {
    name: 'UX Kit',
    description:
      'Interface system and structured design patterns for SaaS products built with clarity and conversion in mind.',
    status: 'Coming Soon',
    href: '/kits/uxkit-waitlist',
    cta: 'View UX Kit',
    live: false,
  },
  {
    name: 'WaaSKit',
    description:
      'A roadmap monetization layer for founders building service-backed SaaS offers and client-first recurring revenue paths.',
    status: 'Coming Soon',
    href: null,
    cta: 'Coming Soon',
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
          ? 'border-border bg-surface text-foreground'
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
        density="compact"
        showDivider={false}
        className="pb-20 pt-24 lg:pb-24 lg:pt-32"
        title="Kits, not guesses."
        subtitle="Different builders need different starting points."
        primaryCTA={{ href: '/kits/saaskit', label: 'Explore SaaSKit' }}
        secondaryCTA={{ href: '#comparison', label: 'Compare Kits', variant: 'secondary' }}
      />

      <Section className="py-16 md:py-20 lg:py-[120px]">
        <div className="mx-auto w-full max-w-7xl px-page">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              One system. Multiple ways in.
            </div>
            <h2 className="pc-section-title mt-4 text-foreground">Choose the product that matches your entry point.</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {PRODUCT_CARDS.map((card) => (
              <ProductCard key={card.name} {...card} />
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-16 md:py-20 lg:py-[120px]">
        <div className="mx-auto w-full max-w-7xl px-page">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              How the products differ
            </div>
            <h2 className="pc-section-title mt-4 text-foreground">Independent layers for distinct needs.</h2>
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

      <Section id="comparison" className="pb-16 pt-16 md:pb-20 md:pt-20 lg:pb-[120px] lg:pt-[120px]">
        <div className="mx-auto w-full max-w-7xl px-page">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              Compare the kits
            </div>
            <h2 className="pc-section-title mt-4 text-foreground">See where each product stands on its own.</h2>
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
