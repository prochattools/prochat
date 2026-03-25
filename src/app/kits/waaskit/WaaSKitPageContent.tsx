'use client'
import KitsShell from '../_components/KitsShell'
import ContextualLinkCta from '@/components/ContextualLinkCta'
import { Button } from '@/components/ui/button'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { FeatureIcon } from './_components/FeatureIcon'

type WaaSKitPageContentProps = {
  priceId?: string | null
}

const comparisonData = [
  {
    metric: 'Workflow orchestration',
    manual: 'Build yourself',
    saasKit: 'Roadmap',
    iconName: 'check-blue',
  },
  {
    metric: 'Job scheduling',
    manual: 'Design + implement',
    saasKit: 'Roadmap',
    iconName: 'check-blue',
  },
  {
    metric: 'Integration framework',
    manual: 'Assemble patterns',
    saasKit: 'Roadmap',
    iconName: 'check-blue',
  },
  {
    metric: 'Monitoring dashboard',
    manual: 'DIY tooling',
    saasKit: 'Roadmap',
    iconName: 'check-blue',
  },
  {
    metric: 'Billing support',
    manual: 'Wire it yourself',
    saasKit: 'Roadmap',
    iconName: 'check-blue',
  },
]

const WaaSKitPageContent = ({ priceId: _priceId }: WaaSKitPageContentProps) => {
  const heroTitle = 'A future client-first validation path.'
  const heroSubtitle = 'Roadmap direction, not the current default offer.'
  const heroDescription =
    'WaaSKit is a future Website-as-a-Service direction for founders who may want to validate through client work first. It is not the current path for founders who want to launch software now.'
  const heroBase = heroTitle
  const heroAccent = ''
  const heroBadgeText = 'COMING SOON'
  const heroButtonHref = '/waitlist?product=waaskit'
  const heroButtonText = 'Join waitlist'
  return (
    <KitsShell>
      <div className="[--section-bg-rgb:255_255_255] [--section-alt-bg-rgb:241_245_249] dark:[--section-bg-rgb:15_17_21] dark:[--section-alt-bg-rgb:29_37_49]">
      <section
        id="top"
        className="relative isolate flex min-h-screen scroll-mt-24 items-center overflow-hidden bg-transparent px-0 pb-16 pt-28 sm:pb-20 sm:pt-32"
      >
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-page text-center">
          <HeroBadge text={heroBadgeText} className="mb-8" />

          <h1 className="pc-hero-title mb-8 text-foreground">
            {heroBase}
            <br />
            {heroAccent ? <span className="hero-accent">{heroAccent}</span> : null}
          </h1>
          <div className="mx-auto mt-6 max-w-2xl space-y-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
            <p>{heroDescription}</p>
            <p className="text-base text-muted-foreground">
              If you want the live production-ready path today, start with SaaSKit. WaaSKit stays on the roadmap.
            </p>
            <div className="flex flex-col items-center justify-center py-2">
              <HeroCheckRow
                items={[
                  'Roadmap only',
                  'Client-first validation',
                  'SaaSKit comes first',
                ]}
              />
            </div>
          </div>

          <div className="mt-10 flex w-full flex-col gap-4 md:w-auto md:flex-row">
            <Button asChild variant="primary" size="lg" className="w-full whitespace-normal text-center md:w-auto">
              <a href={heroButtonHref}>JOIN — WAITLIST</a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="w-full whitespace-normal text-center md:w-auto">
              <a href="#problem">SEE — THE ROADMAP CONTEXT</a>
            </Button>
          </div>

          <div className="mt-4 text-xs font-medium text-muted-foreground md:text-sm">
            Roadmap preview · Not a live product yet · Start with SaaSKit today
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
                    The Problem
                  </h3>
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
                  Some founders may want client proof before software.
                </h2>
                <p className="mb-4 font-medium text-foreground">
                  A client-first path can reveal recurring demand before a product exists.
                </p>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                WaaSKit represents a future direction for that path. It does not replace the current SaaSKit offer for founders who already want to build software.
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
                    A future Website-as-a-Service layer.
                  </h2>
                  <p className="mb-8 leading-relaxed text-muted-foreground">
                    WaaSKit sketches how a client-first validation path could look later. It is not the present focus of the ProChat offer stack.
                  </p>

                  <div className="space-y-4 rounded-lg border border-primary/20 bg-background/60 p-6 shadow-inner backdrop-blur-sm">
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Workflow guidance templates</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Client scheduling ideas</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Automation direction</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Billing support concepts</p>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <FeatureIcon name="check" className="h-4 w-4 text-green-400" />
                      <p className="text-sm font-medium">Monitoring direction ideas</p>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-border-subtle pt-8">
                    <h4 className="mb-4 font-bold text-foreground">
                      The future use case would be:
                    </h4>
                    <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Validate demand through repeatable client work first.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Learn which delivery and billing patterns repeat.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Spot the recurring problems worth productizing.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Move into SaaS only after there is stronger proof.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="manual" className="scroll-mt-24 border-y border-border bg-transparent py-24">
        <div className="mx-auto max-w-4xl px-page">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-[-0.02em] text-foreground">
              What it will include
            </h2>
            <p className="text-muted-foreground">
              A future direction for shaping Website-as-a-Service workflows and repeatable client delivery.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              These are roadmap ideas for a later client-first path, not the current live product stack.
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
                    <div className="text-xs uppercase tracking-wide text-white/50">Without WaaSKit</div>
                    <div className="mt-1 flex items-center gap-2 text-base font-medium text-white/80">
                      <FeatureIcon name={item.iconName} className="h-4 w-4 text-white/45" />
                      <span>{item.manual}</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-primary/30 bg-primary/10 p-3">
                    <div className="text-xs uppercase tracking-wide text-primary/75">WaaSKit</div>
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
              <div className="border-t border-border p-6 text-center md:border-l md:border-t-0">Without WaaSKit</div>
              <div className="border-t border-border bg-primary/10 p-6 text-center text-primary md:border-l md:border-t-0">
                WaaSKit
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
              WaaSKit is a future validation path. SaaSKit is the live product path today.
            </p>
          </div>
        </div>
      </section>

      <section id="who" className="scroll-mt-24 bg-transparent py-24">
        <div className="mx-auto max-w-5xl px-page">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] leading-tight text-foreground">
                What it is NOT.
              </h2>
                <p className="mb-8 text-lg text-muted-foreground">
                WaaSKit is not the current default for ProChat buyers. It is a future client-first route for founders who may want to validate through services before moving into software later.
              </p>
              <div className="h-1 w-20 rounded-full bg-primary" />
            </div>
            <div className="md:col-span-7">
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                <h3 className="mb-6 text-lg font-bold text-foreground">WaaSKit is not:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-muted-foreground">
                      A generic automation platform.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                      <span className="text-muted-foreground">
                      A done-for-you agency.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                      <span className="text-muted-foreground">
                      A full CRM.
                    </span>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FeatureIcon name="check-blue" className="h-3.5 w-3.5 text-primary" />
                    </div>
                      <span className="text-muted-foreground">
                      A drag-and-drop builder for every use case.
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
            Early access
          </p>
          <div className="mb-8 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-sm text-primary backdrop-blur-sm">
            Join the waitlist
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            Get early builds and updates.
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-muted-foreground">
            WaaSKit is still roadmap work. Join the waitlist for updates if the client-first path matters to you later, but start with SaaSKit if you need the live offer now.
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
              </ul>

              <Button asChild variant="primary" size="lg" className="w-full">
                <a href="/waitlist?product=waaskit">Join waitlist</a>
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

      <section id="faq" className="scroll-mt-24 border-t border-border bg-transparent py-24">
        <div className="mx-auto max-w-5xl px-page">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/90">FAQ</p>
            <h2 className="mt-4 text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">What is WaaSKit?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                WaaSKit is a future Website-as-a-Service direction on the ProChat roadmap. It is not a live product today.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">What is Website-as-a-Service?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Website-as-a-Service is a client-first model where niche websites are sold as ongoing services, making it easier to learn customer demand before deciding what deserves software.
              </p>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground">How does WaaSKit help discover SaaS ideas?</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                The planned idea is that recurring client work can reveal the patterns worth productizing into SaaS later.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="cta" className="scroll-mt-24 bg-transparent py-32 text-center">
        <div className="mx-auto max-w-2xl px-page">
          <h2 className="mb-6 text-4xl font-bold tracking-[-0.02em] text-foreground">
            Track the roadmap if the client-first path fits.
          </h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            WaaSKit is for later. If you want to launch software now, SaaSKit is still the current production-ready offer.
          </p>
          <div className="flex flex-col items-center justify-center">
            <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
              <a href="/waitlist?product=waaskit">JOIN — WAITLIST</a>
            </Button>
          </div>
        </div>
      </section>
      </div>
    </KitsShell>
  )
}

export default WaaSKitPageContent
