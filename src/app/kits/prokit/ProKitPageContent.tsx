'use client'

import { useCallback, useEffect, useState } from 'react'
import KitsShell from '../_components/KitsShell'
import { Button } from '@/components/ui/button'
import { handleCheckoutProcess } from '@/helpers/checkout'
import { useUser } from '@/libs/safeClerk'
import { trackEvent } from '@/utils/analytics'
import { FeatureIcon } from './_components/FeatureIcon'

interface ProKitPageContentProps {
  priceId: string | null
}

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
      'Clerk auth wiring',
      'Route-grouped app structure ((app))',
      'Session-ready patterns',
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
      'No built-in marketing frontend',
      'No blog or SEO system',
      'No workflow automation layer',
    ],
  },
]

const ProKitPageContent = ({ priceId }: ProKitPageContentProps) => {
  const { isLoaded, isSignedIn, user } = useUser()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [, setCheckoutError] = useState<string | null>(null)

  useEffect(() => {
    trackEvent('kit_view', { kit: 'prokit', page: '/kits/prokit' })
  }, [])

  const handleHeroCtaClick = useCallback(() => {
    trackEvent('cta_click', {
      kit: 'prokit',
      cta: 'hero_buy_prokit',
      page: '/kits/prokit',
    })
  }, [])

  const handleCheckoutClick = useCallback(() => {
    trackEvent('cta_click', {
      kit: 'prokit',
      cta: 'pricing_get_prokit',
      page: '/kits/prokit',
    })
    trackEvent('checkout_start', {
      kit: 'prokit',
      cta: 'pricing_get_prokit',
      page: '/kits/prokit',
    })

    if (!priceId || isCheckingOut) return

    const userId = isLoaded && isSignedIn ? user?.id || null : null
    const email =
      isLoaded && isSignedIn ? user?.primaryEmailAddress?.emailAddress || null : null

    handleCheckoutProcess(
      priceId,
      userId,
      email,
      setIsCheckingOut,
      setCheckoutError
    )
  }, [priceId, isCheckingOut, isLoaded, isSignedIn, user])

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
        className="relative isolate flex min-h-screen scroll-mt-24 items-center overflow-hidden bg-[rgb(var(--section-bg-rgb))] px-0 pb-16 pt-28 sm:pb-20 sm:pt-32"
      >
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--light dark:hidden" />
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--dark hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__wash hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__glow hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__vignette hidden dark:block" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-page text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 font-mono text-xs font-medium text-muted-foreground shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            ProKit Core Engine
          </div>

          <h1 className="pc-hero-title mb-8 text-foreground">
            Core infrastructure.
            <br />
            <span className="hero-accent">
              No marketing layer. No fluff.
            </span>
          </h1>

          <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>
              ProKit gives you the production-ready engine: auth, billing, database, and app
              structure — so you can build your product without rewriting the basics.
            </p>
            <p className="text-base text-muted-foreground">
              For builders who want control — not scaffolding.
            </p>
            <div className="flex flex-col items-center justify-center py-2">
              <div className="flex min-h-11 flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-md border border-border bg-card/90 px-4 py-2 font-mono text-sm leading-none text-foreground shadow-sm backdrop-blur-sm sm:flex-nowrap">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <FeatureIcon name="check-green" className="h-4 w-4 text-green-600" />
                  <span>Core infrastructure.</span>
                </span>
                <span className="hidden text-border sm:inline">|</span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <FeatureIcon name="check-green" className="h-4 w-4 text-green-600" />
                  <span>No marketing layer.</span>
                </span>
                <span className="hidden text-border sm:inline">|</span>
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                  <FeatureIcon name="check-green" className="h-4 w-4 text-green-600" />
                  <span>No fluff.</span>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-4 md:w-auto md:flex-row">
            <Button asChild variant="primary" size="lg">
              <a href="#pricing" onClick={handleHeroCtaClick}>
                Start with ProKit
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#breakdown">View full system breakdown</a>
            </Button>
          </div>

          <p className="mt-4 text-xs font-medium text-muted-foreground md:text-sm">
            For builders who want control — not scaffolding.
          </p>
        </div>
      </section>

      <section id="tester-mindset" className="border-y border-border bg-[rgb(var(--section-alt-bg-rgb))] py-24">
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
                Build on a clean foundation.
              </h2>
              <div className="space-y-3 text-lg leading-[1.6] text-muted-foreground">
                <p className="font-medium text-foreground">
                  ProKit is the core runtime behind a modern SaaS application.
                </p>
                <p>
                  It handles the essential wiring — authentication, subscriptions, database
                  structure, and deployment guards — without imposing a marketing layer or growth
                  system.
                </p>
                <p>
                  You bring the product idea.
                </p>
                <p>
                  ProKit gives you a stable engine.
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                  <span className="font-mono text-sm text-muted-foreground">POSITIONING:</span>
                  <span className="font-brand font-extrabold uppercase tracking-[0.02em] text-primary">
                    Core engine only.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="problem" className="relative scroll-mt-24 bg-[rgb(var(--section-bg-rgb))] py-24">
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
                  Production-ready structure
                </h2>
                <p className="mb-4 font-medium text-foreground">
                  Next.js App Router + TypeScript baseline
                </p>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Clean route grouping for scalable apps
                </p>
                <p className="mb-8 font-medium leading-relaxed text-muted-foreground">
                  Error + not-found boundaries included
                </p>

                <div className="space-y-4 rounded-lg border border-destructive/30 bg-destructive/10 p-6 shadow-sm">
                  <div className="flex items-start gap-3 text-sm text-destructive/90">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Clerk auth wiring (configurable)</p>
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

                <p className="mt-6 text-sm italic text-muted-foreground">
                  ProKit gives you a stable engine.
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

      <section id="manual" className="scroll-mt-24 border-y border-border bg-[rgb(var(--section-alt-bg-rgb))] py-24">
        <div className="mx-auto max-w-4xl px-page">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground">
              What ProKit intentionally does NOT include
            </h2>
            <p className="text-muted-foreground">
              ProKit is the core engine and deliberately excludes growth-layer systems.
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="grid grid-cols-3 border-b border-border bg-muted text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <div className="p-6">Scope</div>
              <div className="border-l border-border p-6 text-center">Core Boundary</div>
              <div className="border-l border-border bg-primary/10 p-6 text-center text-primary">
                ProKit
              </div>
            </div>

            <div className="grid grid-cols-3 border-b border-border transition-colors hover:bg-muted/60">
              <div className="flex items-center gap-2 p-6 font-medium text-foreground">
                <FeatureIcon name="schedule" className="h-4 w-4 text-muted-foreground" />
                Marketing
              </div>
              <div className="border-l border-border p-6 text-center text-muted-foreground">
                Frontend Layer
              </div>
              <div className="border-l border-border bg-primary/5 p-6 text-center font-bold text-primary">
                No built-in marketing frontend
              </div>
            </div>

            <div className="grid grid-cols-3 border-b border-border transition-colors hover:bg-muted/60">
              <div className="flex items-center gap-2 p-6 font-medium text-foreground">
                <FeatureIcon name="bug-report" className="h-4 w-4 text-muted-foreground" />
                SEO
              </div>
              <div className="border-l border-border p-6 text-center text-muted-foreground">
                Content Discovery
              </div>
              <div className="border-l border-border bg-primary/5 p-6 text-center font-bold text-primary">
                No blog or SEO system
              </div>
            </div>

            <div className="grid grid-cols-3 transition-colors hover:bg-muted/60">
              <div className="flex items-center gap-2 p-6 font-medium text-foreground">
                <FeatureIcon name="psychology" className="h-4 w-4 text-muted-foreground" />
                Automation
              </div>
              <div className="border-l border-border p-6 text-center text-muted-foreground">
                Workflow Layer
              </div>
              <div className="border-l border-border bg-primary/5 p-6 text-center font-bold text-primary">
                No workflow automation layer
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-muted-foreground">
              What ProKit includes — and nothing more.
            </p>
          </div>
        </div>
      </section>

      <section id="who" className="scroll-mt-24 bg-[rgb(var(--section-bg-rgb))] py-24">
        <div className="mx-auto max-w-5xl px-page">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] leading-tight text-foreground">
                For builders who want full control.
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                If you want growth modules, marketing routes, or workflow systems built-in —
                that&apos;s a different product.
              </p>
              <div className="h-1 w-20 rounded-full bg-primary" />
            </div>
            <div className="md:col-span-7">
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <h3 className="mb-6 text-lg font-bold text-foreground">ProKit is ideal if:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      You already know your product direction
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">You don&apos;t need a marketing scaffold</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      You prefer building your own frontend
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">You want a clean, reusable core engine</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative scroll-mt-24 overflow-hidden bg-[rgb(var(--section-alt-bg-rgb))] py-24">
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
            Use ProKit as the core engine for as many products as you want.
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
                {isCheckingOut ? 'Processing' : 'Start with ProKit'}
              </Button>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <FeatureIcon name="lock-filled" className="h-3 w-3" />
                Secure payment · Instant GitHub access
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="breakdown" className="scroll-mt-24 border-t border-border bg-[rgb(var(--section-bg-rgb))] py-24">
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

      <section id="cta" className="scroll-mt-24 bg-[rgb(var(--section-alt-bg-rgb))] py-32 text-center">
        <div className="mx-auto max-w-2xl px-page">
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground">
            Ship what matters.
          </h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            You don&apos;t need another idea.
            <br />
            <span className="font-medium text-foreground">You need a stable base.</span>
            <br />
            ProKit removes the repetitive work so you can focus on building your product.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <a href="#pricing">Build on ProKit</a>
            </Button>
            <a
              href="#breakdown"
              className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
            >
              View full system breakdown
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
