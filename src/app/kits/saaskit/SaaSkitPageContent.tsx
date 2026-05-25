'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import KitsShell from '../_components/KitsShell'
import FAQSection from '@/components/FAQSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { handleCheckoutProcess } from '@/helpers/checkout'
import { trackEvent, trackEventOncePerSession } from '@/utils/analytics'
import { FeatureIcon } from './_components/FeatureIcon'
import SaaSkitSourceTracker from './SaaSkitSourceTracker'
import { SAASKIT_FAQ_ITEMS } from './faq-content'

type SaaSkitPageContentProps = {
  priceId?: string | null
  heroTitle?: string
  heroSubtitle?: string
  heroDescription?: string
  heroButtonText?: string
  heroFullViewport?: boolean
}

const SAASKIT_PRICE = 247
const PRICE_CURRENCY = 'USD'

const techSpecs = [
  {
    icon: <FeatureIcon name="runtime" className="h-5 w-5 text-primary" />,
    title: 'Runtime Foundation',
    points: [
      'Next.js 14 App Router config',
      'Type-safe environment variables',
      'Global error handling boundaries',
    ],
  },
  {
    icon: <FeatureIcon name="auth" className="h-5 w-5 text-primary" />,
    title: 'Authentication & Access',
    points: [
      'Legacy auth surface from the boilerplate lineage',
      'Protected route middleware is now pass-through in ProChat runtime',
      'Ory session validation remains the ProChat runtime TODO',
    ],
  },
  {
    icon: <FeatureIcon name="payments" className="h-5 w-5 text-primary" />,
    title: 'Payments & Billing',
    points: [
      'Verified Stripe webhooks',
      'Customer portal integration',
      'Subscription status syncing',
    ],
  },
  {
    icon: <FeatureIcon name="db" className="h-5 w-5 text-primary" />,
    title: 'Database & Migrations',
    points: [
      'Production-ready schema',
      'Automated migration scripts',
      'Relationship integrity checks',
    ],
  },
  {
    icon: <FeatureIcon name="seo" className="h-5 w-5 text-primary" />,
    title: 'Marketing & SEO',
    points: [
      'Dynamic sitemap generation',
      'OpenGraph image generation',
      'Structured data (JSON-LD)',
    ],
  },
  {
    icon: <FeatureIcon name="automation" className="h-5 w-5 text-primary" />,
    title: 'Automation & Integrations',
    points: [
      'Transactional email setup',
      'Background job processing patterns',
      'Typed API route handlers',
    ],
  },
]

const comparisonData = [
  {
    metric: 'Time to start building',
    manual: 'Weeks / Months',
    saasKit: 'Same day',
    iconName: 'schedule',
  },
  {
    metric: 'Setup errors',
    manual: 'Common',
    saasKit: 'Minimal',
    iconName: 'bug-report',
  },
  {
    metric: 'Momentum',
    manual: 'Fragile',
    saasKit: 'Focused',
    iconName: 'psychology',
  },
  {
    metric: 'Launch speed',
    manual: 'Slow',
    saasKit: 'Fast',
    iconName: 'arrow-forward',
  },
]

const SaaSkitPageContent = ({
  priceId,
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroButtonText,
  heroFullViewport,
}: SaaSkitPageContentProps) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [, setCheckoutError] = useState<string | null>(null)
  const hasTrackedPricingView = useRef(false)

  const title =
    heroTitle ??
    'Launch your SaaS this week. Skip the months of setup.'
  const subtitle = heroSubtitle ?? 'SaaSKit removes the setup work that slows founders down.'
  const description =
    heroDescription ??
    'Start building your product immediately instead of wiring authentication, payments, and infrastructure from scratch.'
  const buttonText = heroButtonText ?? 'Start with SaaSKit — $247'
  const [heroBase, heroAccent] = title.split(' — ')

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
          product: 'saaskit',
          source_page: '/kits/saaskit',
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
      `checkout_cancel:saaskit:${searchParams.get('session_id') || 'no-session'}`,
      {
        product: 'saaskit',
        value: SAASKIT_PRICE,
        currency: PRICE_CURRENCY,
        source_page: '/kits/saaskit',
      },
    )
  }, [])

  const handleHeroCtaClick = useCallback(() => {
    trackEvent('product_cta_click', {
      product: 'saaskit',
      location: 'hero_cta',
      cta: 'buy_saaskit',
      source_page: '/kits/saaskit',
    })
  }, [])

  const handleHeroSecondaryClick = useCallback(() => {
    trackEvent('product_cta_click', {
      product: 'saaskit',
      location: 'hero_secondary_cta',
      cta: 'see_how_it_works',
      source_page: '/kits/saaskit',
    })
  }, [])

  const handleCheckoutClick = useCallback(() => {
    trackEvent('checkout_start', {
      product: 'saaskit',
      location: 'pricing_section',
      cta: 'buy_saaskit',
      source_page: '/kits/saaskit',
      value: SAASKIT_PRICE,
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
  const heroHeightClasses = heroFullViewport ? 'min-h-screen h-screen' : 'min-h-screen'

  return (
    <KitsShell>
      <SaaSkitSourceTracker />
      <div className="[--section-bg-rgb:255_255_255] [--section-alt-bg-rgb:241_245_249] dark:[--section-bg-rgb:15_17_21] dark:[--section-alt-bg-rgb:29_37_49]">
      <section
        id="top"
        className={`relative isolate flex ${heroHeightClasses} scroll-mt-24 items-center overflow-hidden bg-transparent px-0 pb-16 pt-28 sm:pb-20 sm:pt-32`}
      >
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-page text-center">
          <HeroBadge text="SaaSKit Structured Launch System" className="mb-8" />

          <h1 className="pc-hero-title mb-8 text-foreground">
            {heroBase}
            <br />
            {heroAccent ? <span className="hero-accent">{heroAccent}</span> : null}
          </h1>
          <p className="text-lg font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {subtitle}
          </p>

          <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>{description}</p>
            <div className="flex flex-col items-center justify-center py-2">
                <HeroCheckRow
                  items={[
                    'Start building immediately',
                    'Skip weeks of setup work',
                    'Launch faster with AI',
                  ]}
                />
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-4 md:w-auto md:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full whitespace-normal text-center md:w-auto">
              <a href="#pricing" onClick={handleHeroCtaClick}>
                {buttonText}
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full whitespace-normal text-center md:w-auto">
              <a href="#tester-mindset" onClick={handleHeroSecondaryClick}>See how it works</a>
            </Button>
          </div>

          <p className="mt-4 text-xs font-medium text-muted-foreground md:text-sm">
            One-time payment · Unlimited projects · Instant access
          </p>
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
                Built so your launch doesn’t stall.
              </h2>
              <div className="space-y-3 text-lg leading-[1.6] text-muted-foreground">
                <p>Most SaaS ideas do not fail because the idea is bad.</p>
                <p>They fail because founders lose momentum while assembling infrastructure.</p>
                <p>
                  SaaSKit gives you a working starting point so you can focus on building the product
                  that actually matters.
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                  <span className="font-mono text-sm text-muted-foreground">STATUS:</span>
                  <span className="font-brand font-extrabold uppercase tracking-[0.02em] text-primary">
                    Result: faster launches, fewer delays.
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
                    Most SaaS ideas never reach launch.
                  </h3>
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                  Before you can build your product you must figure out:
                </h2>
                <p className="mb-4 font-medium text-foreground">
                  authentication<br />
                  payments<br />
                  database structure<br />
                  deployment<br />
                  landing pages
                </p>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  For many founders this takes weeks or months. Momentum disappears before the product even exists.
                </p>
                <p className="mb-8 font-medium leading-relaxed text-muted-foreground">
                  The hardest part is keeping momentum while you assemble the foundation.
                </p>

                <div className="space-y-4 rounded-lg border border-destructive/30 bg-destructive/10 p-6 shadow-sm">
                  <div className="flex items-start gap-3 text-sm text-destructive/90">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Conflicting tutorials and ten tabs open</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-destructive/90">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Unexpected production errors</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm text-destructive/90">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Stripe half-configured</p>
                  </div>
                  <div className="flex items-start gap-3 text-sm font-medium text-destructive">
                    <FeatureIcon name="frustrated-face" className="mt-0.5 h-4 w-4" />
                    <p>&quot;What if this breaks in production?&quot;</p>
                  </div>
                </div>

                <p className="mt-6 text-sm italic text-muted-foreground">
                  Progress slows not because you lack skill, but because you&apos;re navigating
                  complexity you can&apos;t fully see.
                </p>
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
                      Start with the foundation already done.
                    </h3>
                  </div>
                  <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                    SaaSKit gives you a ready-to-use starting point so you can begin building your product immediately.
                  </h2>
                  <p className="mb-8 leading-relaxed text-muted-foreground">
                    Instead of assembling infrastructure, you start with a system where the essential parts already work together.
                  </p>

                  <div className="space-y-4 rounded-lg border border-primary/20 bg-background/60 p-6 shadow-inner backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Authentication already wired</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Database structure prepared</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Payments already connected</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Email system ready</p>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-border-subtle pt-8">
                    <p className="font-mono text-sm text-muted-foreground">
                      Go from idea to working SaaS faster.
                    </p>
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
              The difference is time.
            </h2>
            <p className="text-muted-foreground">You can assemble everything manually.</p>
            <p className="mt-4 text-sm text-muted-foreground">
              But most founders lose weeks configuring systems instead of building their product.
              SaaSKit removes that delay.
            </p>
          </div>

          <div className="md:hidden space-y-6">
            {comparisonData.map((item) => (
              <div
                key={item.metric}
                className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <h3 className="text-sm uppercase tracking-wide text-white/60">{item.metric}</h3>

                <div className="space-y-3">
                  <div className="rounded-lg bg-white/[0.02] p-3">
                    <div className="text-xs uppercase tracking-wide text-white/50">
                      Manual Setup
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-base font-medium text-white/80">
                      <FeatureIcon name={item.iconName} className="h-4 w-4 text-white/45" />
                      <span>{item.manual}</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-primary/30 bg-primary/10 p-3">
                    <div className="text-xs uppercase tracking-wide text-primary/75">SaaSKit</div>
                    <div className="mt-1 flex items-center gap-2 text-base font-semibold text-primary">
                      <FeatureIcon name={item.iconName} className="h-4 w-4 text-primary" />
                      <span>{item.saasKit}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-lg border border-border bg-card shadow-sm md:block">
            <div className="grid grid-cols-1 border-b border-border bg-muted text-sm font-bold uppercase tracking-wider text-muted-foreground md:grid-cols-3">
              <div className="p-6">Metric</div>
              <div className="border-t border-border p-6 text-center md:border-l md:border-t-0">Manual Setup</div>
              <div className="border-t border-border bg-primary/10 p-6 text-center text-primary md:border-l md:border-t-0">
                SaaSKit
              </div>
            </div>

            {comparisonData.map((item, index) => (
              <div
                key={item.metric}
                className={`grid grid-cols-1 transition-colors hover:bg-muted/60 md:grid-cols-3 ${
                  index < comparisonData.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex items-center gap-2 p-6 font-medium text-foreground">
                  <FeatureIcon name={item.iconName} className="h-4 w-4 text-muted-foreground" />
                  {item.metric}
                </div>
                <div className="border-t border-border p-6 text-center text-muted-foreground md:border-l md:border-t-0">
                  {item.manual}
                </div>
                <div className="border-t border-border bg-primary/5 p-6 text-center font-bold text-primary md:border-l md:border-t-0">
                  {item.saasKit}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              One payment bug or authentication failure can cost more time than this entire foundation.
            </p>
          </div>
        </div>
      </section>

      <section id="who" className="scroll-mt-24 bg-transparent py-24">
        <div className="mx-auto max-w-5xl px-page">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] leading-tight text-foreground">
                Who SaaSKit is for
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                SaaSKit is designed for founders who want to launch quickly.
                Not for teams rebuilding infrastructure from scratch.
              </p>
              <div className="h-1 w-20 rounded-full bg-primary" />
            </div>
            <div className="md:col-span-7">
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <h3 className="mb-6 text-lg font-bold text-foreground">Is this you?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      You want to build SaaS with AI without assembling infrastructure.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      You want a launch-ready starting point before writing custom features.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      You want to focus on your product instead of configuring systems.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                      You want to launch faster.
                    </span>
                  </li>
                </ul>
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
          <p className="mx-auto mb-4 max-w-2xl text-sm font-medium text-muted-foreground">
            This is for founders who want to launch fast, not rebuild every system.
          </p>
          <div className="mb-8 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-sm text-primary backdrop-blur-sm">
            Documentation & Reuse Included
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            One payment. Launch as many SaaS products as you want.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-muted-foreground">
            Start building immediately instead of wiring infrastructure for weeks.
          </p>
          <p className="mx-auto mb-6 max-w-xl text-sm text-muted-foreground">
            SaaSKit gives you a working SaaS foundation so you can focus on building your product.
          </p>

          <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border-subtle bg-surface text-foreground shadow-elevated transition-transform duration-300 hover:-translate-y-1">
            <div className="relative border-b border-border p-8">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary" />
              <div className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Standard License
              </div>
              <div className="flex items-baseline justify-center gap-1">
                <span className="font-brand rounded bg-muted px-2 text-6xl font-bold tracking-[-0.03em] text-foreground">
                  $247
                </span>
                <span className="text-muted-foreground">/ once</span>
              </div>
            </div>

            <div className="bg-muted p-8">
              <ul className="mb-8 space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Ready-to-build SaaS foundation</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">
                    Authentication, payments, and database already wired
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Built for fast launches</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="font-bold text-foreground">Use in unlimited projects</span>
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
                {isCheckingOut ? 'Processing' : 'Get SaaSKit'}
              </Button>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>Lifetime updates · No recurring fees</span>
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
                  Technical Deep Dive
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <span>See full system breakdown</span>
                <FeatureIcon
                  name="arrow-downward"
                  className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
                />
              </div>
            </summary>

            <div className="border-t border-border">
              <div className="mb-16 px-6 pt-10 text-center md:px-8">
                <span className="mb-2 block text-sm font-bold uppercase tracking-wide text-primary">
                  Technical Deep Dive
                </span>
                <h2 className="text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                  Complete System Breakdown
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

      <FAQSection
        id="faq"
        tone="transparent"
        className="scroll-mt-24 border-t border-border"
        title="Frequently Asked Questions"
        description="Practical pre-purchase answers on fit, licensing, setup, documentation, and support."
        items={SAASKIT_FAQ_ITEMS}
      />

      <section id="cta" className="scroll-mt-24 bg-transparent py-32 text-center">
        <div className="mx-auto max-w-2xl px-page">
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground">
            You already have the idea.
          </h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            AI removed the coding barrier.
            <br />
            SaaSKit removes the setup barrier.
            <br />
            <span className="font-medium text-foreground">
              Start building your SaaS today.
            </span>
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <a href="#pricing" onClick={handleHeroCtaClick}>Get SaaSKit</a>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </KitsShell>
  )
}

export default SaaSkitPageContent
