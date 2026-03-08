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
      'Verified wiring for team management, audit logs, and API keys operating in controlled environments.',
    href: '/kits/prokit',
    primary: false,
    icon: ShieldCheck,
  },
  {
    title: 'SaaSKit',
    status: 'Available',
    description:
      'Production-readiness is standard. Authentication, billing, and database structure pre-configured and verified.',
    href: '/kits/saaskit',
    primary: true,
    icon: Rocket,
  },
  {
    title: 'WaaSKit',
    status: 'Coming Soon',
    description:
      'Predictable deployment wrapper-as-a-service infrastructure. Built to enforce structural integrity.',
    href: '/kits',
    primary: false,
    icon: Cloud,
  },
  {
    title: 'UXKit',
    status: 'Roadmap',
    description:
      'Verified UI component systems. Designed for rapid, error-free dashboard assembly and clarity.',
    href: '/kits/uxkit-waitlist',
    primary: false,
    icon: CircleDot,
  },
] as const

const authorityBlocks: readonly AuthorityBlock[] = [
  {
    title: 'Features ship before boundaries',
    description:
      'AI can generate output. It does not assign ownership, state boundaries, or failure paths.',
  },
  {
    title: 'Billing and data drift quietly',
    description:
      'Without billing lifecycle rules and migration discipline, releases look complete while core state stays unstable.',
  },
  {
    title: 'No observability means no control',
    description:
      'If nobody can trace failures across boundaries, regressions, access bugs, and deployment mistakes compound.',
  },
] as const

const operatingSystemCards: readonly OperatingSystemCard[] = [
  {
    title: 'Education',
    description: 'Clear explanations of production concepts for non-technical founders.',
    icon: BookOpen,
  },
  {
    title: 'Validation',
    description: 'A disciplined path from idea to paying users without wasted build cycles.',
    icon: Check,
  },
  {
    title: 'Infrastructure',
    description: 'A hardened Next.js foundation with billing, auth, and data safety already structured.',
    icon: Database,
  },
  {
    title: 'Tooling',
    description: 'A production-ready SaaS foundation designed for controlled execution.',
    icon: Rocket,
    primary: true,
  },
] as const

const journeyPaths: readonly JourneyPath[] = [
  {
    title: 'Idea phase',
    description: 'Validate demand before writing production code.',
    href: '/blog/how-to-validate-a-saas-idea-without-coding',
    action: 'Read the validation guide',
  },
  {
    title: 'MVP phase',
    description: 'Ship a controlled first version without building infrastructure from scratch.',
    href: '/blog/how-to-build-a-saas-mvp-without-coding',
    action: 'Read the MVP guide',
  },
  {
    title: 'Production phase',
    description: 'Ensure billing, auth, and data boundaries are correct before scaling.',
    href: '/blog/nextjs-saas-infrastructure-checklist-for-non-technical-founders',
    action: 'Read the infrastructure checklist',
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
            Build AI SaaS.
            <br />
            <span className="hero-accent">Launch with real boundaries.</span>
          </>
        }
        subtitle="ProChat gives non-technical founders a structured launch foundation so billing, access, deployment, and content systems do not have to be improvised."
        primaryCTA={{
          href: '/kits/saaskit',
          label: 'Start with SaaSKit',
          note: 'Production foundation included.',
        }}
        secondaryCTA={{
          href: '/kits',
          label: 'Explore the framework',
          variant: 'secondary',
        }}
        tertiaryCTA={{ href: '/blog', label: 'Read the build guides' }}
        eyebrow={<HeroBadge text="Structured AI SaaS Launch" />}
        ambientMotion
        className="border-b border-border"
      >
        <HeroCheckRow
          items={['Skip infra rewrites', 'Define billing early', 'Launch with boundaries']}
          className="mx-auto"
        />
      </HeroSection>

      <Section tone="muted" spacing="default">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Why most AI-built SaaS apps fail.</h2>
            <p className="pc-body-copy pc-body-muted">
              AI shortens implementation. It does not define boundaries, ownership, or release criteria.
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
            A launch is only as stable as its boundaries.
          </p>
        </div>
      </Section>

      <Section tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">The Operating System for SaaS Builders</h2>
            <p className="pc-body-copy pc-body-muted">
              ProChat connects education, validation, infrastructure, and tooling into one controlled path from idea to launch.
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
            <Button asChild variant="tertiary" size="sm">
              <Link href="/kits/saaskit">Start building on a stable foundation</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="muted" spacing="default">
        <div className="mx-auto max-w-6xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Where do you start?</h2>
            <p className="pc-body-copy pc-body-muted">
              If you&apos;re new, start with the flagship guide. Then follow the structured path that matches your current constraint.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {journeyPaths.map(path => (
              <Panel key={path.title} tone="default" padding="default" className="h-full">
                <h3 className="pc-card-title mb-3 text-foreground">{path.title}</h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{path.description}</p>
                <Button asChild variant="tertiary" size="sm">
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
            <h2 className="pc-section-title mb-4 text-foreground">Choose the verified starting point.</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Each system removes a different layer of structural risk so you can move without guessing.
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
                      <Link href={card.href}>View system</Link>
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
          <h2 className="pc-section-title mb-6 text-foreground">Built by a professional software tester.</h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            ProChat is shaped by production testing experience. Every system is designed around failure modes, boundary conditions, and real-world usage — not demo scenarios.
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

      <Section id="cta" tone="surface" spacing="loose" className="mt-6">
        <div className="relative z-10 mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-8 text-foreground">Build your SaaS on structure — not improvisation.</h2>
          <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
            Start with the production-ready foundation. Then add features from a controlled system instead of rebuilding architecture by hand.
          </p>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="primary" size="lg">
                <Link href="/kits/saaskit">Start with SaaSKit</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/kits">Explore the framework</Link>
              </Button>
            </div>
            <p className="pc-cta-note">Includes auth, billing, and infrastructure patterns.</p>
          </div>
        </div>
      </Section>
    </div>
  )
}
