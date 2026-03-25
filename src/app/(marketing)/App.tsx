import Link from 'next/link'
import {
  BookOpen,
  Check,
  CircleDot,
  Cloud,
  Database,
  type LucideIcon,
  Rocket,
  ShieldCheck,
} from 'lucide-react'

import FAQSection from '@/components/FAQSection'
import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

type SystemCard = {
  title: string
  status: string
  description: string
  href: string
  primary: boolean
  icon: LucideIcon
  ctaLabel: string
}

type AuthorityBlock = {
  title: string
  description: string
}

type OperatingSystemCard = {
  title: string
  description: string
  icon: LucideIcon
  primary?: boolean
}

type JourneyPath = {
  title: string
  description: string
  href: string
  action: string
}

const systemCards: readonly SystemCard[] = [
  {
    title: 'ProKit',
    status: 'Available',
    description:
      'The lighter option for founders who already know their scope and want less built-in surface than SaaSKit.',
    href: '/kits/prokit',
    primary: false,
    icon: ShieldCheck,
    ctaLabel: 'VIEW — PROKIT',
  },
  {
    title: 'SaaSKit',
    status: 'Available',
    description:
      'The flagship boilerplate for most non-technical founders. Use it once the buyer, outcome, and MVP scope are clear.',
    href: '/kits/saaskit',
    primary: true,
    icon: Rocket,
    ctaLabel: 'START — SAASKIT',
  },
  {
    title: 'WaaSKit',
    status: 'Coming Soon',
    description:
      'A future client-first path. Keep the focus on SaaSKit if your goal is to launch software now.',
    href: 'https://prochat.tools/kits/waaskit',
    primary: false,
    icon: Cloud,
    ctaLabel: 'SEE — ROADMAP',
  },
  {
    title: 'UXKit',
    status: 'Roadmap',
    description:
      'A future UX layer for teams that already have a live SaaS foundation and want a stronger product surface later.',
    href: 'https://prochat.tools/kits/uxkit',
    primary: false,
    icon: CircleDot,
    ctaLabel: 'SEE — ROADMAP',
  },
] as const

const authorityBlocks: readonly AuthorityBlock[] = [
  {
    title: 'Too much built too soon',
    description:
      'Founders generate features fast, but without a clear first outcome. The result is more screens, more code, and more confusion—but no proof that the product solves the right problem.',
  },
  {
    title: 'No proof, just momentum',
    description:
      'Many founders keep building because progress feels real. But without validation, customer proof, or a clear buyer problem, they end up polishing something nobody urgently needs.',
  },
  {
    title: 'The launch falls apart later',
    description:
      'Billing, auth, data, and deployment decisions get pushed aside until they become painful. What looked fast in the beginning becomes unstable, expensive, and hard to maintain.',
  },
] as const

const operatingSystemCards: readonly OperatingSystemCard[] = [
  {
    title: 'Frameworks',
    description:
      'Clear systems that help you define the right outcome, reduce scope, and avoid building the wrong product first.',
    icon: BookOpen,
  },
  {
    title: 'Validation',
    description:
      'A practical way to test demand, sharpen the buyer problem, and know what deserves to be built before you sink weeks into code.',
    icon: Check,
  },
  {
    title: 'Infrastructure',
    description:
      'Production-ready patterns for auth, billing, data, and deployment, so your product is structured to survive real users.',
    icon: Database,
  },
  {
    title: 'Kits',
    description:
      'Ready-made foundations like SaaSKit that let you start faster without stitching tools together from scratch.',
    icon: Rocket,
    primary: true,
  },
] as const

const journeyPaths: readonly JourneyPath[] = [
  {
    title: 'Clarify the idea',
    description:
      'Use the Starting Point framework to name the buyer, pain, outcome, and proof before any code is written.',
    href: '/learn/saas-starting-point',
    action: 'OPEN — STARTING POINT',
  },
  {
    title: 'Plan the build',
    description:
      'Use the Production Guide to turn a clear decision into the right implementation order before you start wiring SaaSKit.',
    href: '/learn/production-guide',
    action: 'OPEN — PRODUCTION GUIDE',
  },
  {
    title: 'Execute inside SaaSKit',
    description:
      'Use the prompts to move faster through positioning, scope, QA, and production prep once the SaaSKit build is underway.',
    href: '/prompts',
    action: 'OPEN — PROMPTS',
  },
] as const

const socialProofScaffold = [
  'Verified founder implementation notes',
  'Production launch reports',
  'Tester-led system reviews',
] as const

const SHOW_TESTIMONIAL_SCAFFOLD = false

export default function App() {
  return (
    <div className="pc-homepage bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        className=""
        showBackgrounds={false}
        title={
          <>
            <span className="block text-foreground dark:text-white">AI builds it.</span>
            <span className="hero-accent block">Structure ships it.</span>
          </>
        }
        subtitle="ProChat helps non-technical founders validate the right product, define the right scope, and launch faster with SaaSKit once the decision is clear."
        primaryCTA={{
          href: '/kits/saaskit',
          label: 'Start with SaaSKit',
        }}
        secondaryCTA={{
          href: '/learn/saas-starting-point',
          label: 'Start with Starting Point',
          variant: 'secondary',
        }}
        eyebrow={<HeroBadge text="Structured SaaS building for non-technical founders" />}
        ambientMotion
      >
        <HeroCheckRow
          items={['Cut setup weeks', 'Reduce launch risk', 'Ship with confidence']}
          className="mx-auto"
        />
      </HeroSection>

        <Section
          id="why-most-ai-built-saas-apps-fail"
          tone="transparent"
          spacing="default"
          className="scroll-mt-28 md:scroll-mt-32"
        >
          <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Why most AI-built SaaS still breaks</h2>
            <p className="pc-body-copy pc-body-muted">
              AI can generate code fast. It does not tell you what to build first, what to validate, or how to launch something stable.
            </p>
          </div>
            <div className="grid gap-6 md:grid-cols-3">
              {authorityBlocks.map(block => (
                <Panel key={block.title} tone="default" padding="default" className="h-full">
                  <h3 className="pc-card-title mb-3 text-foreground">{block.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{block.description}</p>
                </Panel>
              ))}
            </div>
            <p className="mt-10 text-center font-brand text-xl font-semibold tracking-[-0.02em] text-foreground">
              That is why so many AI-built SaaS products look finished but fail under real use.
            </p>
          </div>
        </Section>

      <Section tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">What supports a safer SaaSKit build</h2>
            <p className="pc-body-copy pc-body-muted">
              ProChat gives non-technical founders the preparation layer, the implementation sequence, and the boilerplate foundation needed to move from idea to live product without fragile setup work.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-4">
            {operatingSystemCards.map(card => {
              const Icon = card.icon

              return (
                <Panel
                  key={card.title}
                  tone={card.primary ? 'elevated' : 'default'}
                  padding="default"
                  className={card.primary ? 'border-primary/30' : ''}
                >
                  <div
                    className={[
                      'mb-5 flex h-11 w-11 items-center justify-center rounded-xl border',
                      card.primary
                        ? 'border-primary/20 bg-primary/10 text-primary'
                        : 'border-border bg-muted text-muted-foreground',
                    ].join(' ')}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="pc-card-title mb-3 text-foreground">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </Panel>
              )
            })}
          </div>
          <div className="mt-10 text-center">
            <p className="text-lg font-semibold tracking-[-0.02em] text-foreground">
              Clarify the decision first. Then build on SaaSKit.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="transparent" spacing="default">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Where should you start?</h2>
            <p className="pc-body-copy pc-body-muted">
              Preparation comes first. Then execution. Then implementation. Use these pages in order so the build naturally points toward SaaSKit instead of guesswork.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {journeyPaths.map(path => (
              <Panel key={path.title} tone="default" padding="default" className="h-full flex flex-col justify-between gap-4">
                <div>
                  <h3 className="pc-card-title mb-3 text-foreground">{path.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{path.description}</p>
                </div>
                <Button asChild variant="secondary" size="sm">
                  <Link href={path.href}>{path.action}</Link>
                </Button>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="systems" tone="transparent" spacing="loose">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mb-20 text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Most founders should start with SaaSKit</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              SaaSKit is the default path if you want to launch software. ProKit is the lighter fallback if you already know your scope. UXKit and WaaSKit stay on the roadmap.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {systemCards.map(card => {
              const Icon = card.icon
              const isMuted = card.status !== 'Available'

              return (
                <Panel
                  key={card.title}
                  tone={card.primary ? 'elevated' : 'default'}
                  padding="default"
                  className={[
                    'flex h-full flex-col transition-all duration-300',
                    card.primary
                      ? 'border-primary/30 hover:-translate-y-1 hover:shadow-elevated'
                      : 'hover:-translate-y-1 hover:border-border-strong hover:shadow-elevated',
                    isMuted ? 'opacity-80' : '',
                  ].join(' ')}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={[
                        'flex h-12 w-12 items-center justify-center rounded-lg border',
                        card.primary
                          ? 'border-primary/20 bg-primary/10 text-primary'
                          : 'border-border bg-muted text-muted-foreground',
                      ].join(' ')}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={[
                        'rounded-sm px-2 py-1 text-xs font-bold uppercase tracking-wider',
                        card.primary
                          ? 'bg-primary/10 text-primary'
                          : card.status === 'Coming Soon'
                            ? 'bg-surface-elevated text-muted-foreground'
                            : card.status === 'Roadmap'
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-muted text-foreground',
                      ].join(' ')}
                    >
                      {card.status}
                    </span>
                  </div>
                  <h3 className={['pc-card-title mb-2 text-foreground', card.primary ? 'text-2xl' : ''].join(' ')}>
                    {card.title}
                  </h3>
                  <p className="mb-8 flex-grow text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                  <div className={['mt-auto border-t pt-4', card.primary ? 'border-primary/20' : 'border-border'].join(' ')}>
                  <Button asChild variant={card.primary ? 'secondary' : 'tertiary'} size="sm">
                    <Link href={card.href}>{card.ctaLabel}</Link>
                  </Button>
                  </div>
                </Panel>
              )
            })}
          </div>
        </div>
      </Section>

        <Section tone="transparent" spacing="default">
          <div className="mx-auto max-w-5xl px-page text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="pc-section-title mb-6 text-foreground">Move faster with a structured system</h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              ProChat gives non-technical founders a calmer way to build: clear preparation, a practical implementation path, and a launch-ready boilerplate that reduces rework and setup confusion.
            </p>
          {SHOW_TESTIMONIAL_SCAFFOLD ? (
            <div className="grid gap-6 text-left md:grid-cols-3">
              {socialProofScaffold.map(item => (
                <Panel key={item} tone="default" padding="default">
                  <h3 className="pc-card-title text-foreground">{item}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Reserved for verified implementation notes once public launch reports are available.
                  </p>
                </Panel>
              ))}
            </div>
          ) : null}
        </div>
      </Section>

      <Section id="cta" tone="transparent" spacing="loose" className="mt-0">
        <div className="relative z-10 mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-8 text-foreground">Start with the kit built for real launches</h2>
          <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
            SaaSKit gives non-technical founders a production-ready boilerplate once the idea is clear, so you can stop piecing systems together and start shipping a real product faster.
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-4">
              <Button asChild variant="primary" size="lg">
                <Link href="/kits/saaskit">START — WITH SAASKIT</Link>
              </Button>
            </div>
            <p className="pc-cta-note">Includes auth, billing, database structure, and launch-ready pages.</p>
          </div>
        </div>
      </Section>
      <FAQSection tone="transparent" />
    </div>
  )
}
