import Link from 'next/link'
import {
  ArrowRight,
  Check,
  CircleDot,
  Cloud,
  Database,
  Lock,
  Rocket,
  ShieldCheck,
} from 'lucide-react'

const systemCards = [
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
    title: 'ProKit',
    status: 'Available',
    description:
      'Verified wiring for team management, audit logs, and API keys operating in controlled environments.',
    href: '/kits/prokit',
    primary: false,
    icon: ShieldCheck,
  },
  {
    title: 'UXKit',
    status: 'Coming Soon',
    description:
      'Verified UI component systems. Designed for rapid, error-free dashboard assembly and clarity.',
    href: '/kits/uxkit-waitlist',
    primary: false,
    icon: CircleDot,
  },
  {
    title: 'WaaSKit',
    status: 'Roadmap',
    description:
      'Predictable deployment wrapper-as-a-service infrastructure. Built to enforce structural integrity.',
    href: '/kits',
    primary: false,
    icon: Cloud,
  },
]

const withoutStructure = [
  'You hesitate before shipping.',
  'You fear breaking something.',
  'You delay decisions.',
  'You compensate with complexity.',
]

const withStructure = [
  'You move with confidence.',
  'You iterate without anxiety.',
  'You ship knowing the foundation is verified.',
  'You focus on growth, not debugging.',
]

export default function App() {
  return (
    <div className="overflow-hidden bg-background text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <section
        id="system"
        className="relative min-h-[88vh] border-b border-border bg-background pb-24 pt-[calc(var(--pc-header-height)+2.5rem)] sm:pb-28 sm:pt-[calc(var(--pc-header-height)+3rem)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[size:40px_40px] bg-[linear-gradient(to_right,rgba(29,78,216,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(29,78,216,0.035)_1px,transparent_1px)] opacity-50 dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.07)_1px,transparent_1px)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(29,78,216,0.06)_0%,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(circle_at_70%_50%,rgba(37,99,235,0.14)_0%,rgba(2,6,23,0)_70%)]"
        />
        <div className="relative z-10 mx-auto flex min-h-[calc(88vh-8rem)] max-w-3xl items-center px-page">
          <div className="w-full text-center">
            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              v2.0 Verified Architecture
            </div>
            <h1 className="mb-4 font-brand text-5xl font-bold leading-tight tracking-[-0.03em] text-foreground md:text-6xl lg:text-7xl">
              Build with AI.
              <br />
              <span className="text-primary">Operate with Structure.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              AI made software accessible. It did not remove structural risk. ProChat builds production systems
              that give founders guardrails so ideas do not collapse under hidden complexity.
            </p>
            <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/kits"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 font-brand text-lg font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Explore Systems
              </Link>
              <Link
                href="/kits/saaskit"
                className="inline-flex items-center justify-center rounded-xl border border-border-subtle bg-surface px-8 py-4 font-brand text-lg font-bold text-foreground shadow-surface transition-all hover:border-border-strong hover:bg-surface-soft"
              >
                Start with SaaSKit
              </Link>
            </div>
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
              >
                Read the build guides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="inline-flex items-center justify-center gap-3 text-sm font-medium text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Built and hardened by a professional software tester.
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-y border-border-subtle bg-surface-soft/70 py-28">
        <div className="mx-auto max-w-4xl px-page text-center">
          <h2 className="mb-8 font-brand text-4xl font-bold tracking-[-0.03em] text-foreground md:text-5xl">
            AI Removed the Coding Barrier.
          </h2>
          <p className="mb-12 text-xl font-light leading-loose text-muted-foreground md:text-2xl">
            Today, anyone can generate software. But access to AI is not the same as production readiness.
            AI expands possibility. Structure preserves it.
            <br />
            <br />
            <span className="text-2xl font-semibold tracking-[-0.02em] text-foreground">
              AI did not eliminate risk. It redistributed it.
            </span>
          </p>
          <div className="mx-auto mb-8 h-px w-full max-w-xs bg-border" />
          <div className="mx-auto h-16 w-px bg-gradient-to-b from-primary/30 to-transparent" />
        </div>
      </section>

      <section id="methodology" className="bg-background py-24">
        <div className="mx-auto grid max-w-6xl gap-20 px-page md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 font-brand text-sm font-bold uppercase tracking-[0.2em] text-primary">
              <ShieldCheck className="h-4 w-4" />
              Methodology
            </div>
            <h2 className="mb-6 font-brand text-4xl font-bold tracking-[-0.03em] text-foreground">Systems Before Speed.</h2>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              ProChat is not about becoming technical. It is about building inside a controlled environment.
              Guardrails reduce risk. Structure reduces overwhelm. Clarity drives execution.
            </p>
            <p className="rounded-r-lg border-l-4 border-primary bg-primary/5 py-2 pl-6 text-lg leading-relaxed text-muted-foreground">
              You focus on ideas and marketing. The system handles infrastructure.
            </p>
          </div>

          <div className="relative rounded-2xl border border-border-subtle bg-surface p-10 shadow-surface">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/40 p-4 opacity-70">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 h-2 w-24 rounded bg-muted" />
                  <div className="h-2 w-32 rounded bg-muted" />
                </div>
              </div>

              <div className="z-10 flex scale-[1.03] items-center gap-4 rounded-xl border border-primary/30 bg-surface-elevated p-5 shadow-elevated">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-brand text-lg font-bold text-foreground">System Architecture</h4>
                  <p className="text-sm text-muted-foreground">Controlled execution environment</p>
                </div>
                <Check className="h-5 w-5 text-primary" />
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-border bg-muted/40 p-4 opacity-70">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Database className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 h-2 w-24 rounded bg-muted" />
                  <div className="h-2 w-32 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="systems" className="border-y border-border-subtle bg-surface-soft/70 py-28">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mb-20 text-center">
            <h2 className="mb-4 font-brand text-4xl font-bold tracking-[-0.03em] text-foreground">
              Opinionated Systems for Serious Builders.
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Infrastructure designed to remove structural risk.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {systemCards.map(card => {
              const Icon = card.icon
              const isMuted = card.status !== 'Available'
              return (
                <div
                  key={card.title}
                  className={[
                    'flex h-full flex-col rounded-xl border p-8 transition-all duration-300',
                    card.primary
                      ? 'border-primary/50 bg-primary text-primary-foreground shadow-elevated hover:-translate-y-1 hover:shadow-elevated'
                      : 'border-border-subtle bg-surface shadow-surface hover:-translate-y-1 hover:border-border-strong hover:shadow-elevated',
                    isMuted ? 'opacity-80' : '',
                  ].join(' ')}
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={[
                        'flex h-12 w-12 items-center justify-center rounded-lg border',
                        card.primary
                          ? 'border-white/20 bg-white/10 text-blue-100'
                          : 'border-border bg-muted text-muted-foreground',
                      ].join(' ')}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={[
                        'rounded-sm px-2 py-1 text-xs font-bold uppercase tracking-wider',
                        card.primary
                          ? 'bg-white/20 text-white'
                          : card.status === 'Coming Soon'
                            ? 'bg-amber-100 text-amber-700'
                            : card.status === 'Roadmap'
                              ? 'bg-muted text-muted-foreground'
                              : 'bg-muted text-foreground',
                      ].join(' ')}
                    >
                      {card.status}
                    </span>
                  </div>
                  <h3 className={['mb-2 font-brand font-bold', card.primary ? 'text-2xl' : 'text-xl text-foreground'].join(' ')}>
                    {card.title}
                  </h3>
                  <p
                    className={[
                      'mb-8 flex-grow text-sm leading-relaxed',
                      card.primary ? 'text-blue-100' : 'text-muted-foreground',
                    ].join(' ')}
                  >
                    {card.description}
                  </p>
                  <Link
                    href={card.href}
                    className={[
                      'mt-auto inline-flex items-center gap-2 border-t pt-4 text-sm font-bold transition-all',
                      card.primary
                        ? 'border-white/20 text-white hover:gap-3'
                        : 'border-border text-foreground hover:gap-3 hover:text-primary',
                    ].join(' ')}
                  >
                    View System
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="comparison" className="bg-background py-28">
        <div className="mx-auto max-w-4xl px-page">
          <div className="mb-16 text-center">
            <h2 className="font-brand text-3xl font-bold tracking-[-0.03em] text-foreground">Why Structure Wins</h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-elevated md:grid md:grid-cols-2">
            <div className="border-b border-border-subtle bg-surface-soft/75 p-10 md:border-b-0 md:border-r">
              <h3 className="mb-8 flex items-center gap-2 font-brand text-xl font-bold text-muted-foreground">
                Without Structure
              </h3>
              <ul className="space-y-6">
                {withoutStructure.map(item => (
                  <li key={item} className="flex items-start gap-4 opacity-80">
                    <CircleDot className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <h4 className="text-sm font-bold uppercase tracking-wide text-foreground">{item}</h4>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative bg-surface-elevated p-10">
              <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-primary/10" />
              <h3 className="mb-8 flex items-center gap-2 font-brand text-xl font-bold text-primary">With Structure</h3>
              <ul className="space-y-6">
                {withStructure.map(item => (
                  <li key={item} className="flex items-start gap-4">
                    <Check className="mt-0.5 h-5 w-5 text-primary" />
                    <h4 className="text-sm font-bold uppercase tracking-wide text-foreground">{item}</h4>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border-subtle bg-surface/85 py-24">
        <div className="mx-auto max-w-5xl px-page text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="mb-6 font-brand text-3xl font-bold tracking-[-0.03em] text-foreground">No Black Boxes.</h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            You do not inherit hidden complexity. Every system includes architecture maps, documentation, and
            deployment walkthroughs. You see what you ship. You understand what you run.
          </p>
          <div className="grid gap-8 text-left md:grid-cols-3">
            <div className="rounded-lg border border-border-subtle bg-surface p-8 shadow-surface transition-colors hover:border-border-strong hover:bg-surface-soft">
              <h4 className="font-brand font-bold text-foreground">Detailed Docs</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Step-by-step setup guides that remove ambiguity.
              </p>
            </div>
            <div className="rounded-lg border border-border-subtle bg-surface p-8 shadow-surface transition-colors hover:border-border-strong hover:bg-surface-soft">
              <h4 className="font-brand font-bold text-foreground">Architecture Maps</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Visual database schemas to understand relationships.
              </p>
            </div>
            <div className="rounded-lg border border-border-subtle bg-surface p-8 shadow-surface transition-colors hover:border-border-strong hover:bg-surface-soft">
              <h4 className="font-brand font-bold text-foreground">Walkthroughs</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Video deployment guides for every major component.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="relative overflow-hidden bg-slate-950 py-28 text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[size:32px_32px] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-page text-center">
          <h2 className="mb-8 font-brand text-4xl font-bold tracking-[-0.03em] md:text-5xl">You Already Have the Idea.</h2>
          <p className="mb-12 text-xl font-light leading-relaxed text-white/75">
            AI removed the coding barrier. Now remove the structural risk. Less doubt. More execution.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href="/kits/saaskit"
              className="w-full rounded-lg bg-primary px-8 py-5 font-brand text-lg font-bold text-white shadow-lg transition-all hover:bg-primary/90 sm:w-auto"
            >
              Start with SaaSKit
            </Link>
            <Link
              href="/kits"
              className="w-full rounded-lg border border-white/30 px-8 py-5 font-brand text-lg font-bold text-white/80 transition-colors hover:border-white/60 hover:text-white sm:w-auto"
            >
              Explore All Systems
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
