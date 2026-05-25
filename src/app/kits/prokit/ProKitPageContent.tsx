'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
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

const techSpecs = [
  {
    icon: <FeatureIcon name="runtime" className="h-5 w-5 text-primary" />,
    title: 'Runtime Foundation',
    points: [
      'Next.js App Router + TypeScript baseline',
      'Prisma + Postgres integration',
      'Production migration safeguards',
    ],
  },
  {
    icon: <FeatureIcon name="auth" className="h-5 w-5 text-primary" />,
    title: 'Authentication & Access',
    points: [
      'Legacy auth wiring from the boilerplate lineage',
      'Route-grouped app structure ((app))',
      'Session-ready patterns; Ory is the ProChat runtime direction',
    ],
  },
  {
    icon: <FeatureIcon name="payments" className="h-5 w-5 text-primary" />,
    title: 'Payments & Billing',
    points: [
      'Stripe billing wiring',
      'Subscription persistence API',
      'Dashboard billing flow',
    ],
  },
  {
    icon: <FeatureIcon name="db" className="h-5 w-5 text-primary" />,
    title: 'Database & Migrations',
    points: [
      'Subscription Prisma model',
      'DB verify/init scripts',
      'Health endpoint',
    ],
  },
  {
    icon: <FeatureIcon name="seo" className="h-5 w-5 text-primary" />,
    title: 'Deployment Safeguards',
    points: [
      'Production migration guard',
      'Vercel migration hook',
      'Environment-driven configuration',
    ],
  },
  {
    icon: <FeatureIcon name="automation" className="h-5 w-5 text-primary" />,
    title: 'What ProKit intentionally does NOT include',
    points: [
      'No predefined marketing frontend',
      'No public content layer',
      'No workflow automation layer',
    ],
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
      product: 'prokit',
      location: 'hero_cta',
      cta: 'buy_prokit',
      source_page: '/kits/prokit',
    })
  }, [])

  const handleComparisonCtaClick = useCallback(() => {
    trackEvent('product_cta_click', {
      product: 'saaskit',
      location: 'comparison_cta',
      cta: 'see_saaskit',
      source_page: '/kits/prokit',
    })
  }, [])

  const handleCheckoutClick = useCallback(() => {
    trackEvent('checkout_start', {
      product: 'prokit',
      location: 'pricing_section',
      cta: 'buy_prokit',
      source_page: '/kits/prokit',
      value: PROKIT_PRICE,
      currency: PRICE_CURRENCY,
    })

    if (!priceId || isCheckingOut) return

    handleCheckoutProcess(priceId, null, null, setIsCheckingOut, setCheckoutError)
  }, [priceId, isCheckingOut])

  // Visual sanity checklist:
  // - Hero checklist icons use solid green checks.
  // - Real Problem uses filled red warning triangle and frustrated-face risk icon.
  // - Blue solution card uses darker outer blue + contrasted inner panel with green checks/dots.
  // - Pricing lock icon + all breakdown icons use filled glyphs.
  return (
    <KitsShell>
      <div className="[--section-bg-rgb:255_255_255] [--section-alt-bg-rgb:241_245_249] dark:[--section-bg-rgb:15_17_21] dark:[--section-alt-bg-rgb:29_37_49]">
      <section
        id="top"
        className="relative isolate flex min-h-screen scroll-mt-24 items-center overflow-hidden bg-transparent px-0 pb-16 pt-28 sm:pb-20 sm:pt-32"
      >
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-page text-center">
          <HeroBadge text="ProKit: the lighter engine layer" className="mb-8" />

          <h1 className="pc-hero-title mb-8 text-foreground">
            The lighter SaaS engine.
            <br />
            <span className="hero-accent">
              Full control over your brand.
            </span>
          </h1>

          <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>
              ProKit gives you the production-ready engine — authentication, billing, database,
              deployment — when you want the narrower infrastructure layer without the fuller launch
              path bundled into SaaSKit.
            </p>
            <p className="text-base text-muted-foreground">
              Choose ProKit if you want the wiring and plan to own the rest. Choose SaaSKit if you
              want the default production-ready foundation for launching faster with more guidance.
            </p>
            <div className="flex flex-col items-center justify-center py-2">
              <HeroCheckRow
                items={['Core engine only.', 'No launch layer.', 'Full brand control.']}
              />
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-4 md:w-auto md:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full whitespace-normal text-center md:w-auto">
              <a href="#pricing" onClick={handleHeroCtaClick}>
                Buy ProKit
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full whitespace-normal text-center md:w-auto">
              <a href="/kits/saaskit" onClick={handleComparisonCtaClick}>See the full SaaSKit path</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="tester-mindset" className="bg-transparent py-24">
        <div className="mx-auto max-w-3xl px-page">
          <div className="flex items-start gap-6">
            <div className="hidden flex-col items-center pt-2 md:flex">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-primary shadow-sm">
                <FeatureIcon name="shield-tester" className="h-5 w-5" />
              </div>
              <div className="h-32 w-px bg-gradient-to-b from-border to-transparent" />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-[-0.02em] text-foreground">
                Build on a lighter foundation.
              </h2>
              <div className="space-y-3 text-lg leading-[1.6] text-muted-foreground">
                <p className="font-medium text-foreground">
                  You control the experience. ProKit keeps the engine stable.
                </p>
                <p>
                  ProKit handles the infrastructure layer — authentication, subscriptions, database
                  structure, and deployment safeguards — without adding the fuller launch structure
                  bundled into SaaSKit.
                </p>
                <p>
                  You keep control over the brand, the funnel, and the way the product is presented.
                </p>
                <p>
                  Use ProKit when that flexibility matters more than getting the full launch layer
                  out of the box.
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  Built with the same production safeguards used in SaaSKit — but SaaSKit remains
                  the default path if you want the productization layer included.
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                  <span className="font-mono text-sm text-muted-foreground">POSITIONING:</span>
                  <span className="font-brand font-extrabold uppercase tracking-[0.02em] text-primary">
                    Infrastructure only.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="relative scroll-mt-24 bg-transparent py-24">
        <div className="mx-auto max-w-6xl px-page">
          <div className="grid items-start gap-12 md:grid-cols-2 lg:gap-24">
            <div className="relative">
              <div className="sticky top-24">
                <div className="mb-6 flex items-center gap-3">
                  <FeatureIcon name="warning-triangle-filled" className="h-5 w-5 text-destructive" />
                  <h3 className="text-xl font-bold uppercase tracking-wider text-foreground">
                    What You Get
                  </h3>
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                  Production-ready core
                </h2>
                <p className="mb-4 font-medium text-foreground">
                  Next.js App Router + TypeScript baseline
                </p>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  The engine layer that SaaSKit builds on top of
                </p>
                <p className="mb-8 font-medium leading-relaxed text-muted-foreground">
                  Error + not-found boundaries included
                </p>

                <div className="space-y-4 rounded-lg border border-destructive/30 bg-destructive/10 p-6 shadow-sm">
                  <div className="flex items-start gap-3 text-sm text-destructive/90">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Legacy auth wiring from the boilerplate lineage</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-destructive/90">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Stripe subscription persistence</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-destructive/90">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Checkout success &amp; cancel flows</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-destructive">
                    <FeatureIcon name="frustrated-face" className="mt-0.5 h-4 w-4" />
                    <p>Authentication &amp; billing core</p>
                  </div>
                </div>

                <p className="mt-6 text-sm italic text-muted-foreground">You control the brand. ProKit handles the engine underneath it.</p>
              </div>
            </div>

            <div id="solution" className="relative mt-12 md:mt-0">
              <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-surface-elevated p-8 text-foreground shadow-elevated transition-transform duration-500 md:p-12">
                <div
                  aria-hidden
                  className="pc-surface-grid-overlay absolute inset-0 opacity-20 dark:opacity-15"
                />
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <FeatureIcon name="verified" className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold uppercase tracking-wider text-muted-foreground">
                      Database &amp; subscription layer
                    </h3>
                  </div>
                  <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                    Deployment safeguards
                  </h2>
                  <p className="mb-8 leading-relaxed text-muted-foreground">
                    Core infrastructure that stays deliberate and minimal.
                  </p>

                  <div className="space-y-4 rounded-lg border border-primary/20 bg-background/60 p-6 shadow-inner backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Prisma + Postgres via DATABASE_URL</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Subscription data model</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">DB verify/init scripts + health endpoint</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Deployment safeguards</p>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-border-subtle pt-8">
                    <h4 className="mb-4 font-bold text-foreground">Deployment safeguards</h4>
                    <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Production migration guard
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Vercel migration hook
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Environment-driven configuration
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="manual" className="scroll-mt-24 bg-transparent py-24">
        <div className="mx-auto max-w-4xl px-page">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground">
              What ProKit does NOT do
            </h2>
            <p className="text-muted-foreground">
              ProKit protects infrastructure while leaving design, funnel, and growth decisions in your hands. If you want those layers included, SaaSKit is the better default.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="grid grid-cols-1 border-b border-border bg-muted text-sm font-bold uppercase tracking-wider text-muted-foreground md:grid-cols-3">
              <div className="p-6">Scope</div>
              <div className="border-t border-border p-6 text-center md:border-l md:border-t-0">Control Boundary</div>
              <div className="border-t border-border bg-primary/10 p-6 text-center text-primary md:border-l md:border-t-0">
                ProKit
              </div>
            </div>

            <div className="grid grid-cols-1 border-b border-border transition-colors hover:bg-muted/60 md:grid-cols-3">
              <div className="flex items-center gap-2 p-6 font-medium text-foreground">
                <FeatureIcon name="schedule" className="h-4 w-4 text-muted-foreground" />
                Marketing
              </div>
              <div className="border-t border-border p-6 text-center text-muted-foreground md:border-l md:border-t-0">
                Brand Experience
              </div>
              <div className="border-t border-border bg-primary/5 p-6 text-center font-bold text-primary md:border-l md:border-t-0">
                It does not lock you into a marketing framework
              </div>
            </div>

            <div className="grid grid-cols-1 border-b border-border transition-colors hover:bg-muted/60 md:grid-cols-3">
              <div className="flex items-center gap-2 p-6 font-medium text-foreground">
                <FeatureIcon name="bug-report" className="h-4 w-4 text-muted-foreground" />
                SEO
              </div>
              <div className="border-t border-border p-6 text-center text-muted-foreground md:border-l md:border-t-0">
                Design System
              </div>
              <div className="border-t border-border bg-primary/5 p-6 text-center font-bold text-primary md:border-l md:border-t-0">
                It does not dictate your design system
              </div>
            </div>

            <div className="grid grid-cols-1 transition-colors hover:bg-muted/60 md:grid-cols-3">
              <div className="flex items-center gap-2 p-6 font-medium text-foreground">
                <FeatureIcon name="psychology" className="h-4 w-4 text-muted-foreground" />
                Automation
              </div>
              <div className="border-t border-border p-6 text-center text-muted-foreground md:border-l md:border-t-0">
                Funnel Structure
              </div>
              <div className="border-t border-border bg-primary/5 p-6 text-center font-bold text-primary md:border-l md:border-t-0">
                It does not restrict your funnel structure
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              You keep the autonomy. ProKit keeps the infrastructure stable.
            </p>
          </div>
        </div>
      </section>

      <section id="who" className="scroll-mt-24 bg-transparent py-24">
        <div className="mx-auto max-w-5xl px-page">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] leading-tight text-foreground">
                When ProKit makes sense instead of the full SaaSKit layer
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                SaaSKit is the default recommendation for most founders who want the full production-ready foundation. <a href="/kits/saaskit" className="font-medium text-foreground underline-offset-4 hover:underline">See SaaSKit</a> if you want the structured launch layer included. Choose ProKit only when you specifically want the infrastructure layer without that added launch structure.
              </p>
              <div className="h-1 w-20 rounded-full bg-primary" />
            </div>
            <div className="md:col-span-7">
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="mb-6 text-lg font-bold text-foreground">ProKit is for you if:</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground">You want full control over branding and funnel</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground">You already know how you want to handle marketing and launch</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground">You are comfortable owning more implementation decisions</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">You want the clean engine without the fuller SaaSKit layer</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-6 text-lg font-bold text-foreground">SaaSKit is the better default if:</h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground">You want the default recommendation for a real launch</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground">You want the productization and launch layer included</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-muted-foreground">You want less ambiguity around go-to-market structure</span>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground">You want the fuller production-ready foundation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative scroll-mt-24 overflow-hidden bg-transparent py-24">
        <div
          aria-hidden
          className="pc-section-grid-overlay absolute inset-0 opacity-40 dark:opacity-20"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-page text-center">
          <div className="mb-8 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-sm text-primary backdrop-blur-sm">
            Documentation & Reuse Included
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            One payment. Unlimited projects.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-muted-foreground">
            Use ProKit as the lean infrastructure layer for as many products as you want.
          </p>
          <p className="mx-auto mb-8 max-w-2xl text-sm text-muted-foreground">
            If you want the fuller production-ready path, SaaSKit is the better fit. Choose ProKit only if you want the engine without the launch layer.
          </p>

          <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border-subtle bg-surface text-foreground shadow-elevated transition-transform duration-300 hover:-translate-y-1">
            <div className="relative border-b border-border p-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary" />
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                ProKit License
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-brand rounded bg-muted px-2 text-6xl font-bold tracking-[-0.03em] text-foreground">
                  $147
                </span>
                <span className="text-muted-foreground">/ once</span>
              </div>
            </div>

            <div className="bg-muted p-8">
              <ul className="mb-8 space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Production-ready infrastructure</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Auth + billing wiring</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Database baseline</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="font-bold text-foreground">Unlimited reuse</span>
                </li>
              </ul>

              <Button
                type="button"
                onClick={handleCheckoutClick}
                disabled={!priceId || isCheckingOut}
                variant="primary"
                size="lg"
                className="w-full"
              >
                {isCheckingOut ? 'Processing' : 'Buy ProKit'}
              </Button>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <FeatureIcon name="lock-filled" className="h-3 w-3" />
                Includes auth, billing, and infrastructure patterns
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="breakdown" className="scroll-mt-24 bg-transparent py-24">
        <div className="mx-auto max-w-6xl px-page">
          <details className="group overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-surface transition-shadow open:shadow-elevated">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden md:px-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  System Breakdown
                  </span>
                </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span>View full system breakdown</span>
                <FeatureIcon
                  name="arrow-downward"
                  className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                />
              </div>
            </summary>

            <div className="border-t border-border">
              <div className="mb-16 px-6 pt-10 text-center md:px-8">
                <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-primary">
                  What ProKit includes — and nothing more.
                </span>
                <h2 className="text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                  Complete Core Breakdown
                </h2>
              </div>

              <div className="grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3">
                {techSpecs.slice(0, 3).map((spec) => (
                  <div key={spec.title} className="group p-8 transition-colors hover:bg-muted/60">
                    <div className="mb-4 flex items-center gap-3">
                      {spec.icon}
                      <h3 className="text-lg font-bold text-foreground">{spec.title}</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {spec.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40 transition-colors group-hover:bg-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-3">
                {techSpecs.slice(3).map((spec) => (
                  <div key={spec.title} className="group p-8 transition-colors hover:bg-muted/60">
                    <div className="mb-4 flex items-center gap-3">
                      {spec.icon}
                      <h3 className="text-lg font-bold text-foreground">{spec.title}</h3>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {spec.points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40 transition-colors group-hover:bg-primary" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="border-t border-border bg-muted p-4 text-center">
                <p className="font-mono text-sm text-muted-foreground">
                  Full file-level documentation included after purchase.
                </p>
              </div>
            </div>
          </details>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-transparent py-24">
        <div className="mx-auto max-w-5xl px-page">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/90">FAQ</p>
            <h2 className="mt-4 text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">What is ProKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                ProKit is the lean infrastructure layer in the ProChat product stack. It includes authentication, billing, database integration, and deployment tooling for builders who want the core engine without the fuller launch layer in SaaSKit.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">Who should use ProKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                ProKit is designed for developers and technical founders who already know what they want to build and want maximum control over brand, funnel, and product structure.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">How is ProKit different from SaaSKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                ProKit is the engine layer. SaaSKit is the flagship productization layer built on top of ProKit for founders who want the fuller production-ready foundation.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="cta" className="scroll-mt-24 bg-transparent py-32 text-center">
        <div className="mx-auto max-w-2xl px-page">
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground">
            Choose ProKit when the leaner engine is enough.
          </h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            SaaSKit remains the flagship recommendation when you want the full production-ready path.
            <br />
            <span className="font-medium text-foreground">Choose ProKit when full control matters more than having the launch layer included.</span>
            <br />
            Build on the wiring once, then shape the product your way.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <a href="#pricing" onClick={handleHeroCtaClick}>Buy ProKit</a>
            </Button>
            <a
              href="/kits/saaskit"
              onClick={handleComparisonCtaClick}
              className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
            >
              See why SaaSKit is the default
              <FeatureIcon
                name="arrow-forward"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </section>
      </div>
    </KitsShell>
  )
}

export default ProKitPageContent
