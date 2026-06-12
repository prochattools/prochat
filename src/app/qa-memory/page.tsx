import Link from 'next/link'
import { BrainCircuit, CheckCircle2, Clock, DollarSign, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'
import { getSEOTags } from '@/libs/seo'

export const metadata = getSEOTags({
  title: 'ProChat QA Memory | Stop Investigating the Same Failure Twice',
  description:
    'ProChat QA Memory gives software testers a private AI-ready memory that remembers failures, detects patterns, and helps future QA work start from what testing already taught you.',
  keywords: [
    'ProChat QA Memory',
    'QA memory',
    'AI testing assistant',
    'software testing memory',
    'test failure triage',
    'persistent QA knowledge',
    'AI assisted testing',
  ],
  openGraph: {
    title: 'ProChat QA Memory | Stop Investigating the Same Failure Twice',
    description:
      'A private AI-ready QA memory for testers and testing teams that saves time, reduces repeated investigation, and makes every reviewed lesson reusable.',
    images: ['/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og'],
  },
  canonicalUrlRelative: '/qa-memory',
})

const outcomes = [
  {
    title: 'Save testing time',
    description:
      'Start triage from reviewed lessons instead of asking the same generic questions every time a failure appears.',
    icon: Clock,
  },
  {
    title: 'Reduce wasted budget',
    description:
      'Stop paying testers to rediscover known selector issues, flaky patterns, environment traps, and test-data mistakes.',
    icon: DollarSign,
  },
  {
    title: 'Lower QA worry',
    description:
      'Keep fragile project knowledge from disappearing into chats, tickets, logs, old branches, or one tester’s head.',
    icon: ShieldCheck,
  },
  {
    title: 'Improve with every review',
    description:
      'Every approved lesson makes the next investigation faster, sharper, and less dependent on memory or guesswork.',
    icon: TrendingUp,
  },
] as const

const pains = [
  'The same flaky test wastes another morning.',
  'A known selector problem gets investigated from scratch.',
  'Client-specific rules live in old chats and tickets.',
  'Generic AI gives generic debugging advice again.',
  'A tester leaves and hard-won context leaves with them.',
  'Old evidence gets trusted after reality has changed.',
] as const

const gains = [
  'Known failures are available when the next failure appears.',
  'The AI checks relevant project memory before suggesting next steps.',
  'Reusable lessons are drafted, reviewed, and safely stored.',
  'Stale or conflicting memory is flagged instead of blindly trusted.',
  'Cross-project lessons can be sanitized before reuse.',
  'The tester keeps using their existing tools and AI assistant.',
] as const

const memoryEngine = [
  'Routes naturally from a normal QA question.',
  'Retrieves only the relevant project memory.',
  'Compares current evidence with reviewed lessons.',
  'Suggests what should become reusable memory.',
  'Checks whether older memory may be stale.',
  'Keeps trusted writes review-gated.',
] as const

const whoFor = [
  'Freelance software testers who work across clients',
  'QA consultancies and testing companies',
  'SDETs carrying project context across teams',
  'Automation agencies supporting many client stacks',
] as const

export default function QAMemoryPage() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="ProChat QA Memory · Persistent testing intelligence" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Stop investigating</span>
            <span className="hero-accent block">the same failure twice.</span>
          </>
        }
        subtitle="ProChat QA Memory gives software testers a private AI-ready memory that remembers failures, detects patterns, checks freshness, and helps future QA work start from what testing already taught you."
        primaryCTA={{ href: '/book', label: 'Talk about QA Memory' }}
        secondaryCTA={{ href: '/', label: 'Explore ProChat OS', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Save QA time', 'Prevent repeated investigation', 'Use your existing tools']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="outcomes" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">What testers and testing teams get back</h2>
            <p className="pc-body-copy pc-body-muted">
              Less repeated triage, fewer missed project lessons, and more confidence that the next failure starts with the context you already earned.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {outcomes.map(card => {
              const Icon = card.icon
              return (
                <Panel key={card.title} tone="default" padding="default" className="h-full">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="pc-card-title mb-3 text-foreground">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </Panel>
              )
            })}
          </div>
        </div>
      </Section>

      <Section id="before-after" tone="transparent" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <h2 className="pc-card-title mb-5 text-foreground">Before QA memory</h2>
            <div className="grid gap-3">
              {pains.map(item => (
                <div key={item} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>

          <div className="flex justify-center">
            <div className="rounded-full border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-sm uppercase tracking-[0.16em] text-primary">
              Becomes
            </div>
          </div>

          <Panel tone="default" padding="default">
            <h2 className="pc-card-title mb-5 text-foreground">With ProChat QA Memory</h2>
            <div className="grid gap-3">
              {gains.map(item => (
                <div key={item} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="memory-engine" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              What the memory engine does
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">A junior QA memory assistant that keeps learning from reviewed work</h2>
            <p className="pc-body-copy pc-body-muted mb-6">
              ProChat QA Memory is not another testing framework. It is the memory layer beside the tools testers already use: Playwright, Cypress, Selenium, Robot Framework, Postman, Jira, TestRail, GitHub Actions, Cursor, Claude, ChatGPT, Copilot, or whatever comes next.
            </p>
            <p className="pc-body-copy pc-body-muted">
              The normal tester experience is black-box: ask about a failed test normally. The assistant looks up relevant QA memory, checks whether that memory is still fresh, and suggests the next best action without requiring a new client installation.
            </p>
          </div>

          <Panel tone="default" padding="default">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <div className="grid gap-3">
              {memoryEngine.map(item => (
                <div key={item} className="flex gap-3 rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="fit" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Built for testers who move across projects</h2>
            <p className="pc-body-copy pc-body-muted">
              Keep client-specific memory separated, sanitize reusable lessons, and carry your testing intelligence forward without putting ProChat files into client repositories by default.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {whoFor.map(item => (
              <Panel key={item} tone="default" padding="compact" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{item}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="cta" tone="muted" spacing="default">
        <div className="mx-auto max-w-4xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">Turn yesterday’s QA lessons into tomorrow’s starting point</h2>
          <p className="pc-body-copy pc-body-muted mx-auto mb-8 max-w-2xl">
            Start with one tester, one project, and one repeated failure pattern. If QA memory saves time there, it can grow into a private testing brain for the team.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/book">Talk about QA Memory</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/">Back to ProChat OS</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
