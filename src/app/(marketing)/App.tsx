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
      'A clean SaaS core for founders who already know what they want to build and need a stable foundation to build on.',
    href: '/kits/prokit',
    primary: false,
    icon: ShieldCheck,
    ctaLabel: 'VIEW — PROKIT',
  },
  {
    title: 'SaaSKit',
    status: 'Available',
    description:
      'The best starting point for most founders. A production-ready SaaS foundation with the launch layer already built in.',
    href: '/kits/saaskit',
    primary: true,
    icon: Rocket,
    ctaLabel: 'VIEW — SAASKIT',
  },
  {
    title: 'WaaSKit',
    status: 'Coming Soon',
    description:
      'For founders who want to start with clients, cash flow, and validated demand before turning that into SaaS.',
    href: '/kits',
    primary: false,
    icon: Cloud,
    ctaLabel: 'VIEW — WAASKIT',
  },
  {
    title: 'UXKit',
    status: 'Roadmap',
    description:
      'A complete visual SaaS system for founders who want polished screens, clear states, and a more credible product experience.',
    href: '/waitlist',
    primary: false,
    icon: CircleDot,
    ctaLabel: 'VIEW — UXKIT',
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
    title: 'You need a clearer idea',
    description:
      'You know you want to build something, but the buyer, pain, and smallest useful outcome are still fuzzy. Start by validating the problem before you write production code.',
    href: '/blog/how-to-validate-a-saas-idea-without-coding',
    action: 'READ — THE VALIDATION GUIDE',
  },
  {
    title: 'You need a first version',
    description:
      'You already know what you want to build. Now you need a controlled MVP path that helps you launch faster without stitching the whole stack together yourself.',
    href: '/blog/how-to-build-a-saas-mvp-without-coding',
    action: 'READ — THE MVP GUIDE',
  },
  {
    title: 'You need a stable foundation',
    description:
      'You are ready to sell or scale, but billing, auth, data, and deployment need to be structured properly so the product does not become fragile later.',
    href: '/blog/nextjs-saas-infrastructure-checklist-for-non-technical-founders',
    action: 'READ — THE INFRA CHECKLIST',
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
    <div className="bg-background text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        title={
          <>
            <span className="block text-foreground dark:text-white">AI builds it.</span>
            <span className="hero-accent block">Structure ships it.</span>
          </>
        }
        subtitle="ProChat gives non-technical founders a structured system to launch production-ready micro SaaS faster—without tool overwhelm, fragile setups, or guesswork."
        primaryCTA={{
          href: '/kits/saaskit',
          label: 'Start with SaaSKit',
        }}
        secondaryCTA={{
          href: '#why-most-ai-built-saas-apps-fail',
          label: 'Why - Launches Fail',
          variant: 'secondary',
        }}
        eyebrow={<HeroBadge text="Operating System for SaaS builders" />}
        ambientMotion
        className="border-b border-border"
      >
        <HeroCheckRow
          items={['Cut setup weeks', 'Reduce launch risk', 'Ship with confidence']}
          className="mx-auto"
        />
      </HeroSection>

        <Section
          id="why-most-ai-built-saas-apps-fail"
          tone="muted"
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
            <h2 className="pc-section-title mb-4 text-foreground">The system that helps you launch SaaS properly</h2>
            <p className="pc-body-copy pc-body-muted">
              ProChat gives non-technical founders the frameworks, kits, and infrastructure patterns to validate faster, build on a stable foundation, and launch with less guesswork.
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
              Built to reduce guesswork, rework, and fragile launches.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted" spacing="default">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Where should you start?</h2>
            <p className="pc-body-copy pc-body-muted">
              Most founders do not need everything at once. Start with the system that solves your biggest bottleneck right now.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {journeyPaths.map(path => (
              <Panel key={path.title} tone="default" padding="default" className="h-full flex flex-col justify-between gap-4">
                <div>
                  <h3 className="pc-card-title mb-3 text-foreground">{path.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{path.description}</p>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="systems" tone="transparent" spacing="loose">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mb-20 text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Choose the right product to start with</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Each ProChat product solves a different part of the build. Pick the one that matches what you need right now.
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

        <Section tone="muted" spacing="default">
          <div className="mx-auto max-w-5xl px-page text-center">
            <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="pc-section-title mb-6 text-foreground">Move faster with a structured system</h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              ProChat gives non-technical founders a calmer way to build: clear validation, stable foundations, and launch-ready systems that reduce rework, setup confusion, and fragile decisions.
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

      <Section id="cta" tone="surface" spacing="loose" className="mt-0 border-t-0">
        <div className="relative z-10 mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-8 text-foreground">Start with the kit built for real launches</h2>
          <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
            SaaSKit gives founders a production-ready SaaS foundation with the launch layer already included—so you can stop piecing systems together and start shipping a real product faster.
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
    </div>
  )
}
