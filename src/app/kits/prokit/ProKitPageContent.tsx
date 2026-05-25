'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import KitsShell from '../_components/KitsShell'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { handleCheckoutProcess } from '@/helpers/checkout'
import { trackEvent, trackEventOncePerSession } from '@/utils/analytics'
import { FeatureIcon } from './_components/FeatureIcon'

interface ProKitPageContentProps {
  priceId: string | null
}

const PROKIT_PRICE = 97
const PRICE_CURRENCY = 'USD'

const legacySignals = [
  'ProKit remains available as a lean SaaS engine.',
  'It is no longer the flagship ProChat strategy.',
  'Use it when you specifically want legacy SaaS infrastructure patterns.',
  'Use ProChat OS when you want the new agentic workflow direction.',
] as const

const prochatOsComponents = [
  'workflow runtime / API',
  'memory and context store',
  'input and output connectors',
  'model router / AI selector',
  'approval and event log',
  'control console',
  'CLI and optional modules',
] as const

const prokitIncludes = [
  {
    icon: <FeatureIcon name="runtime" className="h-5 w-5 text-primary" />,
    title: 'Lean SaaS runtime foundation',
    points: [
      'Next.js App Router + TypeScript baseline',
      'Prisma + Postgres integration',
      'Production migration safeguards',
    ],
  },
  {
    icon: <FeatureIcon name="auth" className="h-5 w-5 text-primary" />,
    title: 'Legacy boilerplate patterns',
    points: [
      'Historical SaaS app structure',
      'Route-grouped app patterns',
      'Legacy auth/billing thinking preserved for reference',
    ],
  },
  {
    icon: <FeatureIcon name="payments" className="h-5 w-5 text-primary" />,
    title: 'Billing and subscription baseline',
    points: [
      'Stripe billing wiring',
      'Subscription persistence API',
      'Checkout success and cancel flow patterns',
    ],
  },
  {
    icon: <FeatureIcon name="automation" className="h-5 w-5 text-primary" />,
    title: 'What ProKit is not',
    points: [
      'Not ProChat OS',
      'Not an agentic workflow runtime',
      'Not the current flagship product strategy',
    ],
  },
]

const comparisonRows = [
  {
    label: 'Strategic role',
    prochatOs: 'Flagship Agentic Workflow OS',
    prokit: 'Legacy/supporting SaaS engine',
  },
  {
    label: 'Primary job',
    prochatOs: 'Turn messy inputs into structured outputs and actions',
    prokit: 'Provide a lean SaaS code foundation',
  },
  {
    label: 'Customer install',
    prochatOs: 'Private workflow runtime with memory, connectors, approvals, and modules',
    prokit: 'SaaS app foundation patterns for builders',
  },
  {
    label: 'Best for',
    prochatOs: 'Businesses and builders that want agentic workflows',
    prokit: 'Builders who specifically need the old lean SaaS foundation',
  },
]

const ProKitPageContent = ({ priceId }: ProKitPageContentProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [, setCheckoutError] = useState<string | null>(null)
  const hasTrackedPricingView = useRef(false)

  useEffect(() => {
    const pricingSection = document.getElementById('pricing')
    if (!pricingSection) return

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (!entry?.isIntersecting || hasTrackedPricingView.current) {
          return
        }

        hasTrackedPricingView.current = true
        trackEvent('pricing_view', {
          product: 'prokit',
          source_page: '/kits/prokit',
          location: 'pricing_section',
        })
      },
      { threshold: 0.45 },
    )

    observer.observe(pricingSection)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get('checkout') !== 'cancelled') return

    trackEventOncePerSession(
      'checkout_cancel',
      `checkout_cancel:prokit:${searchParams.get('session_id') || 'no-session'}`,
      {
        product: 'prokit',
        value: PROKIT_PRICE,
        currency: PRICE_CURRENCY,
        source_page: '/kits/prokit',
      },
    )
  }, [])

  const handleHeroCtaClick = useCallback(() => {
    trackEvent('product_cta_click', {
      product: 'prochat_os',
      location: 'hero_cta',
      cta: 'explore_prochat_os',
      source_page: '/kits/prokit',
    })
  }, [])

  const handleCheckoutClick = useCallback(() => {
    trackEvent('checkout_start', {
      product: 'prokit',
      location: 'pricing_section',
      cta: 'buy_prokit_legacy',
      source_page: '/kits/prokit',
      value: PROKIT_PRICE,
      currency: PRICE_CURRENCY,
    })

    if (!priceId || isCheckingOut) return

    handleCheckoutProcess(priceId, null, null, setIsCheckingOut, setCheckoutError)
  }, [priceId, isCheckingOut])

  return (
    <KitsShell>
      <div className="[--section-bg-rgb:255_255_255] [--section-alt-bg-rgb:241_245_249] dark:[--section-bg-rgb:15_17_21] dark:[--section-alt-bg-rgb:29_37_49]">
        <section
          id="top"
          className="relative isolate flex min-h-screen scroll-mt-24 items-center overflow-hidden bg-transparent px-0 pb-16 pt-28 sm:pb-20 sm:pt-32"
        >
          <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-page text-center">
            <HeroBadge text="Legacy product · ProChat OS is the flagship" className="mb-8" />

            <h1 className="pc-hero-title mb-8 text-foreground">
              ProKit is still available.
              <br />
              <span className="hero-accent">ProChat OS is the future.</span>
            </h1>

            <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              <p>
                ProKit is the legacy lean SaaS engine for builders who want old-school SaaS infrastructure patterns: app structure, database, billing, and deployment safeguards.
              </p>
              <p className="text-base text-muted-foreground">
                The new ProChat flagship is ProChat OS: an installable Agentic Workflow OS that connects messy business inputs to structured outputs, approvals, memory, agents, and business tools.
              </p>
              <div className="flex flex-col items-center justify-center py-2">
                <HeroCheckRow
                  items={['ProKit preserved', 'ProChat OS leads', 'Managed workflows are the new direction']}
                />
              </div>
            </div>

            <div className="mt-10 flex w-full flex-col gap-4 md:w-auto md:flex-row">
              <Button asChild variant="primary" size="lg" className="w-full whitespace-normal text-center md:w-auto">
                <Link href="/systems/prochat-os" onClick={handleHeroCtaClick}>
                  Explore ProChat OS
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="w-full whitespace-normal text-center md:w-auto">
                <a href="#prokit-legacy">View ProKit legacy details</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="prochat-os" className="bg-transparent py-24">
          <div className="mx-auto max-w-6xl px-page">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                The flagship is now an Agentic Workflow OS
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                ProChat OS is not a SaaS kit, not a chatbot, and not just a dashboard. It is a private workflow runtime that sits between messy inputs and the tools a business already uses.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {prochatOsComponents.map(component => (
                <div key={component} className="rounded-lg border border-border bg-card p-5 text-sm font-medium text-foreground shadow-sm">
                  {component}
                </div>
              ))}
            </div>

            <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-primary/20 bg-primary/10 p-8 text-center">
              <p className="text-xl font-semibold tracking-[-0.02em] text-foreground">
                Messy emails, files, forms, notes, folders, and APIs go in. Structured summaries, tasks, drafts, reports, updates, and actions come out — with human approval first.
              </p>
            </div>
          </div>
        </section>

        <section id="prokit-legacy" className="relative scroll-mt-24 bg-transparent py-24">
          <div className="mx-auto max-w-6xl px-page">
            <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-24">
              <div className="relative">
                <div className="sticky top-24">
                  <div className="mb-6 flex items-center gap-3">
                    <FeatureIcon name="warning-triangle-filled" className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">
                      ProKit status
                    </h3>
                  </div>
                  <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                    A preserved legacy product, not the strategic center
                  </h2>
                  <p className="mb-8 leading-relaxed text-muted-foreground">
                    ProKit remains useful for builders who specifically want a lean SaaS engine. It should be understood as a supporting product under the ProChat OS strategy.
                  </p>

                  <div className="space-y-4 rounded-lg border border-primary/20 bg-primary/10 p-6 shadow-sm">
                    {legacySignals.map(signal => (
                      <div key={signal} className="flex items-start gap-3 text-sm text-foreground">
                        <FeatureIcon name="check" className="mt-0.5 h-4 w-4 text-primary" />
                        <p>{signal}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div id="solution" className="relative mt-12 md:mt-0">
                <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-surface-elevated p-8 text-foreground shadow-elevated transition-transform duration-500 md:p-12">
                  <div aria-hidden className="pc-surface-grid-overlay absolute inset-0 opacity-20 dark:opacity-15" />
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-3">
                      <FeatureIcon name="verified" className="h-5 w-5 text-primary" />
                      <h3 className="text-xl font-bold uppercase tracking-wider text-muted-foreground">
                        Use ProKit when
                      </h3>
                    </div>
                    <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                      You want the old lean SaaS foundation
                    </h2>
                    <p className="mb-8 leading-relaxed text-muted-foreground">
                      ProKit still makes sense when your goal is a traditional SaaS app foundation and you want to own the brand, funnel, product surface, and workflow strategy yourself.
                    </p>

                    <div className="space-y-4 rounded-lg border border-primary/20 bg-background/60 p-6 shadow-inner backdrop-blur-sm">
                      {[
                        'You are a technical builder.',
                        'You already know the SaaS product you want to build.',
                        'You want infrastructure patterns, not the ProChat OS runtime.',
                        'You understand this is a legacy/supporting product.',
                      ].map(item => (
                        <div key={item} className="flex items-center gap-3 text-foreground">
                          <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                          <p className="text-sm font-medium">{item}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-border-subtle pt-8">
                      <h4 className="mb-4 font-bold text-foreground">Better default path:</h4>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        If you are trying to automate business processes, connect tools, create agentic workflows, or buy managed setup, start with ProChat OS instead of ProKit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="included" className="scroll-mt-24 bg-transparent py-24">
          <div className="mx-auto max-w-6xl px-page">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                What ProKit still includes
              </h2>
              <p className="text-muted-foreground">
                ProKit is preserved for builders who still need the legacy lean SaaS layer. It is not the recommended starting point for ProChat OS work.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {prokitIncludes.map(section => (
                <div key={section.title} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-muted text-primary">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground">{section.title}</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {section.points.map(point => (
                      <li key={point} className="flex gap-3">
                        <FeatureIcon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="comparison" className="scroll-mt-24 bg-transparent py-24">
          <div className="mx-auto max-w-5xl px-page">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                ProChat OS vs ProKit
              </h2>
              <p className="text-muted-foreground">
                The clean way to understand the current product hierarchy.
              </p>
            </div>

            <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              <div className="grid grid-cols-1 border-b border-border bg-muted text-sm font-bold uppercase tracking-wider text-muted-foreground md:grid-cols-3">
                <div className="p-6">Decision</div>
                <div className="border-t border-border bg-primary/10 p-6 text-center text-primary md:border-l md:border-t-0">
                  ProChat OS
                </div>
                <div className="border-t border-border p-6 text-center md:border-l md:border-t-0">ProKit</div>
              </div>

              {comparisonRows.map(row => (
                <div key={row.label} className="grid grid-cols-1 border-b border-border last:border-b-0 transition-colors hover:bg-muted/60 md:grid-cols-3">
                  <div className="p-6 font-medium text-foreground">{row.label}</div>
                  <div className="border-t border-border bg-primary/5 p-6 text-center font-bold text-primary md:border-l md:border-t-0">
                    {row.prochatOs}
                  </div>
                  <div className="border-t border-border p-6 text-center text-muted-foreground md:border-l md:border-t-0">
                    {row.prokit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 bg-transparent py-24">
          <div className="mx-auto max-w-4xl px-page text-center">
            <HeroBadge text="Legacy product access" className="mb-8" />
            <h2 className="mb-6 text-4xl font-bold tracking-[-0.03em] text-foreground md:text-5xl">
              Still need ProKit?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Buy ProKit only if you specifically want the preserved lean SaaS engine. For the flagship product direction, start with ProChat OS.
            </p>

            <div className="mx-auto mb-10 max-w-md rounded-2xl border border-border bg-card p-8 shadow-elevated">
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                ProKit legacy access
              </div>
              <div className="mb-4 text-5xl font-bold tracking-[-0.04em] text-foreground">
                ${PROKIT_PRICE}
              </div>
              <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                Lean SaaS infrastructure patterns for builders who know they need this specific legacy product.
              </p>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                disabled={!priceId || isCheckingOut}
                onClick={handleCheckoutClick}
              >
                {isCheckingOut ? 'Opening checkout…' : 'Buy ProKit legacy access'}
              </Button>
              {!priceId ? (
                <p className="mt-4 text-xs text-muted-foreground">
                  Checkout is not configured yet.
                </p>
              ) : null}
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="primary" size="lg">
                <Link href="/systems/prochat-os">EXPLORE — PROCHAT OS</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/book">BOOK — A CALL</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </KitsShell>
  )
}

export default ProKitPageContent
