'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import KitsShell from '../_components/KitsShell'
import ContextualLinkCta from '@/components/ContextualLinkCta'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { handleCheckoutProcess } from '@/helpers/checkout'
import { useUser } from '@/libs/safeClerkHooks'
import { trackEvent, trackEventOncePerSession } from '@/utils/analytics'
import { FeatureIcon } from './_components/FeatureIcon'

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
      'Magic link & social login ready',
      'Protected route middleware',
      'User session management',
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
    metric: 'Time Cost',
    manual: 'Weeks / Months',
    saasKit: 'Immediate',
    iconName: 'schedule',
  },
  {
    metric: 'Error Cost',
    manual: 'High (Unknowns)',
    saasKit: 'Minimal (Verified)',
    iconName: 'bug-report',
  },
  {
    metric: 'Confidence Cost',
    manual: 'Fragile / Anxious',
    saasKit: 'Stable / Focused',
    iconName: 'psychology',
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
  const { isLoaded, isSignedIn, user } = useUser()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [, setCheckoutError] = useState<string | null>(null)
  const hasTrackedPricingView = useRef(false)

  const title =
    heroTitle ??
    'Launch your SaaS — without building the foundation from scratch.'
  const subtitle = heroSubtitle ?? 'Production-ready Next.js SaaS infrastructure.'
  const description =
    heroDescription ??
    'SaaSKit gives you authentication, billing, database integration, and deployment patterns so you can focus on building your product.'
  const buttonText = heroButtonText ?? 'Start with SaaSKit'
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

  const handleComparisonCtaClick = useCallback(() => {
    trackEvent('product_cta_click', {
      product: 'prokit',
      location: 'comparison_cta',
      cta: 'compare_with_prokit',
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
  const heroHeightClasses = heroFullViewport ? 'min-h-screen h-screen' : 'min-h-screen'

  return (
    <KitsShell>
      <div className="[--section-bg-rgb:255_255_255] [--section-alt-bg-rgb:241_245_249] dark:[--section-bg-rgb:15_17_21] dark:[--section-alt-bg-rgb:29_37_49]">
      <section
        id="top"
        className={`relative isolate flex ${heroHeightClasses} scroll-mt-24 items-center overflow-hidden bg-[rgb(var(--section-bg-rgb))] px-0 pb-16 pt-28 sm:pb-20 sm:pt-32`}
      >
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--light dark:hidden" />
        <div aria-hidden className="pc-marketing-hero__bg pc-marketing-hero__bg--dark hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__wash hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__glow hidden dark:block" />
        <div aria-hidden className="pc-marketing-hero__vignette hidden dark:block" />

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
                  'Core infrastructure included.',
                  'Marketing system included.',
                  'Production-ready from day one.',
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
              <a href="#manual" onClick={handleComparisonCtaClick}>Compare with ProKit</a>
            </Button>
          </div>

          <p className="mt-4 text-xs font-medium text-muted-foreground md:text-sm">
            One-time payment · Unlimited reuse · Instant GitHub access
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
                Designed around failure prevention.
              </h2>
              <div className="space-y-3 text-lg leading-[1.6] text-muted-foreground">
                <p>
                  Structured by a professional software tester.
                </p>
                <p>
                  Built to reduce production mistakes before they happen.
                </p>
                <p>
                  The same production safeguards used in SaaSKit are there to keep billing, access,
                  and deployment boundaries stable from the start.
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                  <span className="font-mono text-sm text-muted-foreground">STATUS:</span>
                  <span className="font-brand font-extrabold uppercase tracking-[0.02em] text-primary">
                    Calm Systems. Fewer Failures.
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
                    The Real Problem
                  </h3>
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                  Invisible complexity.
                </h2>
                <p className="mb-4 font-medium text-foreground">
                  You don&apos;t know what you don&apos;t know. And that uncertainty slows momentum.
                </p>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Infrastructure failures are quiet, not loud: payments half-working, emails
                  inconsistently delivering, database structure slowly breaking, confidence eroding.
                </p>
                <p className="mb-8 font-medium leading-relaxed text-muted-foreground">
                  Silent failures are worse than obvious ones.
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
                      What SaaSKit Gives You
                    </h3>
                  </div>
                  <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                    Reduced uncertainty.
                  </h2>
                  <p className="mb-8 leading-relaxed text-muted-foreground">
                    SaaSKit gives you the structured launch layer: production-ready infrastructure
                    underneath, plus the marketing system that keeps momentum from stalling once the
                    product is ready.
                  </p>

                  <div className="space-y-4 rounded-lg border border-primary/20 bg-background/60 p-6 shadow-inner backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Authentication wired and secure</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Database structured and verified</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Stripe payments connected</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Email systems ready</p>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-border-subtle pt-8">
                    <h4 className="mb-4 font-bold text-foreground">
                      From idea to live SaaS faster because:
                    </h4>
                    <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Infrastructure is pre-structured.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Billing lifecycle is predefined.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        SEO system is integrated.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Deployment patterns are production-safe.
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
              Manual Setup vs SaaSKit
            </h2>
            <p className="text-muted-foreground">
              Manual setup looks cheaper until you calculate the cost of confidence.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              If you want full control over branding and marketing systems,{' '}
              <a href="/kits/prokit" className="font-medium text-foreground underline-offset-4 hover:underline">
                ProKit
              </a>{' '}
              may be the better fit. If you want structured speed and a launch-ready foundation,
              SaaSKit is the path.
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
              One production billing mistake or authentication failure can cost more than this
              entire foundation.
            </p>
          </div>
        </div>
      </section>

      <section id="who" className="scroll-mt-24 bg-[rgb(var(--section-bg-rgb))] py-24">
        <div className="mx-auto max-w-5xl px-page">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] leading-tight text-foreground">
                Who this is for.
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                This is for non-technical founders who want to move quickly without improvising the
                systems underneath the launch.
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
                      You want to build with AI without piecing infrastructure together from zero.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      You want a launch-ready foundation before you spend time on custom growth work.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      You want structure around billing, access, deployment, and content from day
                      one.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="font-medium text-foreground">
                      You want speed because the structure is already in place.
                    </span>
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
          <p className="mx-auto mb-4 max-w-2xl text-sm font-medium text-muted-foreground">
            This is for founders who want to launch — not assemble infrastructure.
          </p>
          <div className="mb-8 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-sm text-primary backdrop-blur-sm">
            Documentation & Reuse Included
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            One payment. Unlimited reuse.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-muted-foreground">
            AI made this era possible. Structure makes it sustainable. You are not buying code;
            you are buying a stable launch foundation.
          </p>
          <p className="mx-auto mb-6 max-w-xl text-sm text-muted-foreground">
            One production billing mistake or authentication failure can cost more than this entire
            foundation.
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
                  <span className="text-muted-foreground">Production-ready structure</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Verified auth, payment, and DB wiring</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Months of hesitation removed</span>
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
                {isCheckingOut ? 'Processing' : 'Buy SaaSKit'}
              </Button>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>Lifetime updates</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
                <span>No recurring fees</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
                <span>Production-ready foundation</span>
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

      <section id="faq" className="scroll-mt-24 border-t border-border bg-[rgb(var(--section-bg-rgb))] py-24">
        <div className="mx-auto max-w-5xl px-page">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/90">FAQ</p>
            <h2 className="mt-4 text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">What is SaaSKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                SaaSKit is a production-ready foundation for building SaaS applications with modern architecture and infrastructure.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">What can you build with SaaSKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                You can build subscription SaaS platforms, B2B tools, automation services, and niche SaaS products.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">How does SaaSKit relate to ProKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                SaaSKit builds on top of ProKit. ProKit provides the infrastructure layer while SaaSKit provides the SaaS application architecture.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="cta" className="scroll-mt-24 bg-[rgb(var(--section-alt-bg-rgb))] py-32 text-center">
        <div className="mx-auto max-w-2xl px-page">
          <ContextualLinkCta
            className="mb-10 text-left"
            title="Need more control over brand and funnel?"
            description="Explore other ProChat kits for different starting points or to adapt infrastructure around SaaSKit's launch-ready system."
            links={[
              { href: '/kits/prokit', label: 'Explore ProKit' },
              { href: '/kits/uxkit', label: 'Explore UXKit' },
            ]}
          />
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground">
            You already have the idea.
          </h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            AI removed the coding barrier. Now remove the structural risk.
            <br />
            <span className="font-medium text-foreground">
              Start building on structure instead of improvising the foundation.
            </span>
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <a href="#pricing" onClick={handleHeroCtaClick}>Buy SaaSKit</a>
            </Button>
            <a
              href="/kits/prokit"
              onClick={handleComparisonCtaClick}
              className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
            >
              Explore ProKit
              <FeatureIcon
                name="arrow-forward"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="/kits/uxkit"
              className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
            >
              Explore UXKit
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

export default SaaSkitPageContent
