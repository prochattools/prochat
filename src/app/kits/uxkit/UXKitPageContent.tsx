'use client'
import KitsShell from '../_components/KitsShell'
import ContextualLinkCta from '@/components/ContextualLinkCta'
import { Button } from '@/components/ui/button'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { FeatureIcon } from './_components/FeatureIcon'

type UXKitPageContentProps = {
  priceId?: string | null
}

const comparisonData = [
  {
    metric: 'Dashboard UI system',
    manual: 'Build yourself',
    saasKit: 'Included',
    iconName: 'check-blue',
  },
  {
    metric: 'Onboarding flows',
    manual: 'Design + implement',
    saasKit: 'Included',
    iconName: 'check-blue',
  },
  {
    metric: 'Billing and account screens',
    manual: 'Assemble patterns',
    saasKit: 'Included',
    iconName: 'check-blue',
  },
  {
    metric: 'AI interaction panels',
    manual: 'DIY UI patterns',
    saasKit: 'Included',
    iconName: 'check-blue',
  },
  {
    metric: 'Design tokens + theming',
    manual: 'Roll your own',
    saasKit: 'Included',
    iconName: 'check-blue',
  },
]

const UXKitPageContent = ({ priceId: _priceId }: UXKitPageContentProps) => {
  const heroTitle = 'Build SaaS interfaces fast.'
  const heroSubtitle = 'Production-ready UI infrastructure for modern SaaS products.'
  const heroDescription =
    'UXKit is the interface layer for SaaS applications. It provides dashboards, onboarding flows, billing UI, and AI interaction patterns so founders can launch production-ready SaaS interfaces without designing every screen from scratch.'
  const heroBase = heroTitle
  const heroAccent = ''
  const heroBadgeText = 'COMING SOON'
  const heroButtonHref = '/waitlist?product=uxkit'
  const heroButtonText = 'Join waitlist'
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
          <HeroBadge text={heroBadgeText} className="mb-8" />

          <h1 className="pc-hero-title mb-8 text-foreground">
            {heroBase}
            <br />
            {heroAccent ? <span className="hero-accent">{heroAccent}</span> : null}
          </h1>
          <p className="text-lg font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            {heroSubtitle}
          </p>

          <div className="mx-auto max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>{heroDescription}</p>
            <p className="text-xs text-muted-foreground">
              SaaS interface layer — works standalone or in tandem with ProKit/SaaSKit.
            </p>
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
              <a href={heroButtonHref}>{heroButtonText}</a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full whitespace-normal text-center md:w-auto">
              <a href="#manual">Compare with ProKit</a>
            </Button>
          </div>

          <p className="mt-4 text-xs font-medium text-muted-foreground md:text-sm">
            One-time payment · Unlimited reuse · Instant GitHub access
          </p>
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
                    The Problem
                  </h3>
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                  Founders often spend weeks building interface layers.
                </h2>
                <p className="mb-4 font-medium text-foreground">
                  Dashboards, account settings, billing screens, user onboarding, and admin tools all add months of work.
                </p>
                <div className="space-y-4 rounded-lg border border-destructive/30 bg-destructive/10 p-6 shadow-sm text-sm text-destructive/90">
                  <div className="flex items-start gap-3">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Dashboards</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Account settings</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Billing screens</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>User onboarding</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FeatureIcon name="close" className="mt-0.5 h-4 w-4" />
                    <p>Admin tools</p>
                  </div>
                </div>
                <p className="mt-6 text-sm italic text-muted-foreground">
                  UXKit removes this work by providing a complete UI infrastructure for SaaS products.
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
                      Mechanism
                    </h3>
                  </div>
                  <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                    A reusable UI engine for SaaS.
                  </h2>
                  <p className="mb-8 leading-relaxed text-muted-foreground">
                    UXKit supplies a reusable dashboard system, onboarding flows, billing/account screens,
                    AI interaction panels, and design tokens that keep every surface consistent.
                  </p>

                  <div className="space-y-4 rounded-lg border border-primary/20 bg-background/60 p-6 shadow-inner backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Reusable dashboard system</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Onboarding flows</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Billing/account screens</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">AI interaction panels</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Design tokens and component system</p>
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
              What it will include
            </h2>
            <p className="text-muted-foreground">
              The UI layer you build once and reuse across products.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              These are the pieces that normally take weeks to design, build, and keep consistent.
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
                    <div className="text-xs uppercase tracking-wide text-white/50">Without UXKit</div>
                    <div className="mt-1 flex items-center gap-2 text-base font-medium text-white/80">
                      <FeatureIcon name={item.iconName} className="h-4 w-4 text-white/45" />
                      <span>{item.manual}</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-primary/30 bg-primary/10 p-3">
                    <div className="text-xs uppercase tracking-wide text-primary/75">UXKit</div>
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
              <div className="p-6">Component</div>
              <div className="border-t border-border p-6 text-center md:border-l md:border-t-0">Without UXKit</div>
              <div className="border-t border-border bg-primary/10 p-6 text-center text-primary md:border-l md:border-t-0">
                UXKit
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
              Ship consistent UI faster, and keep it consistent as you scale.
            </p>
          </div>
        </div>
      </section>

      <section id="who" className="scroll-mt-24 bg-[rgb(var(--section-bg-rgb))] py-24">
        <div className="mx-auto max-w-5xl px-page">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] leading-tight text-foreground">
                What it is NOT.
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                UXKit is a UI layer. It complements your backend and product logic, it does not replace them.
              </p>
              <div className="h-1 w-20 rounded-full bg-primary" />
            </div>
            <div className="md:col-span-7">
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <h3 className="mb-6 text-lg font-bold text-foreground">UXKit is not:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      A backend framework or database layer.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      A billing processor or payments provider.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      A no-code builder.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      A design agency replacement.
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
            Early access
          </p>
          <div className="mb-8 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-sm text-primary backdrop-blur-sm">
            Join the waitlist
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            Get early builds and updates.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-muted-foreground">
            UXKit is in development. Join the waitlist to get early access, roadmap updates, and launch notes.
          </p>

          <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border-subtle bg-surface text-foreground shadow-elevated transition-transform duration-300 hover:-translate-y-1">
            <div className="bg-muted p-8">
              <ul className="mb-8 space-y-3 text-left">
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Early builds and previews</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Roadmap updates</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Launch notes and migration guidance</span>
                </li>
                <li className="flex items-center gap-3">
                  <FeatureIcon name="check-blue" className="h-5 w-5 text-primary" />
                  <span className="font-bold text-foreground">Founding pricing when it ships</span>
                </li>
              </ul>

              <Button asChild variant="primary" size="lg" className="w-full">
                <a href="/waitlist?product=uxkit">Join waitlist</a>
              </Button>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>No spam</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
                <span>Unsubscribe anytime</span>
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border-strong/80" />
                <span>Early access in Summer 2026</span>
              </div>
            </div>
          </div>
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
              <h3 className="text-lg font-bold text-foreground">What is UXKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                UXKit is a SaaS interface framework providing dashboards, onboarding flows, and SaaS UI patterns.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">Why use UXKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                UXKit accelerates SaaS development by providing proven UI patterns instead of designing interfaces from scratch.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">Can UXKit be used with SaaSKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Yes. UXKit integrates with SaaSKit and ProKit to provide the interface layer for SaaS applications.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="cta" className="scroll-mt-24 bg-[rgb(var(--section-alt-bg-rgb))] py-32 text-center">
        <div className="mx-auto max-w-2xl px-page">
          <ContextualLinkCta
            className="mb-10 text-left"
            title="Prefer a full SaaS foundation?"
            description="Explore ProKit or SaaSKit while UXKit is in development."
            links={[
              { href: '/kits/prokit', label: 'Explore ProKit' },
              { href: '/kits/saaskit', label: 'Explore SaaSKit' },
            ]}
          />
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground">
            Launch SaaS products with a production-ready UI system.
          </h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            Join 214 builders on the waitlist to stay ahead with early builds and momentum updates.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <a href="/waitlist?product=uxkit">Join waitlist</a>
            </Button>
            <a
              href="/kits/prokit"
              className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
            >
              Explore ProKit
              <FeatureIcon
                name="arrow-forward"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="/kits/saaskit"
              className="group flex items-center gap-2 font-bold text-primary transition-colors hover:text-primary/80"
            >
              Explore SaaSKit
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

export default UXKitPageContent
