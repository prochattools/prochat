import Link from 'next/link'
import { BrainCircuit, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'
import { getSEOTags } from '@/libs/seo'

export const metadata = getSEOTags({
  title: 'ProChat Memory for QA | Stop Investigating the Same Failure Twice',
  description:
    'ProChat Memory for QA is the first discipline-specific edition of ProChat Memory, helping testers preserve reviewed lessons from failed tests, flaky behavior, selectors, environments, and release decisions.',
  keywords: [
    'ProChat Memory for QA',
    'QA testing memory',
    'software testing memory',
    'test failure triage',
    'reviewed QA lessons',
    'AI assisted testing',
  ],
  openGraph: {
    title: 'ProChat Memory for QA | Stop Investigating the Same Failure Twice',
    description:
      'A QA-focused edition of ProChat Memory for preserving reviewed lessons from failures, flaky behavior, selectors, environments, and release decisions.',
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
    title: 'Start from reviewed lessons',
    description:
      'Begin triage with project-specific lessons, known patterns, and current evidence instead of only generic advice.',
    icon: BrainCircuit,
  },
  {
    title: 'Reduce repeated investigation',
    description:
      'Keep selector issues, flaky patterns, environment traps, and test-data rules available for the next related failure.',
    icon: CheckCircle2,
  },
  {
    title: 'Keep testers in control',
    description:
      'AI can draft a proposed lesson, but testers review, edit, approve, or reject what becomes trusted memory.',
    icon: ShieldCheck,
  },
  {
    title: 'Improve through review',
    description:
      'Every approved correction gives future QA work clearer context without treating old memory as automatically final.',
    icon: Sparkles,
  },
] as const

const pains = [
  'A flaky test is investigated from scratch again.',
  'A known selector problem is buried in old chats or tickets.',
  'Client-specific rules depend on one tester remembering them.',
  'Generic AI advice misses project-specific evidence.',
  'A previous release lesson is not available during the next triage.',
  'Old notes are trusted after the environment has changed.',
] as const

const gains = [
  'Known failures are available when a related failure appears.',
  'Relevant project memory is checked beside current evidence.',
  'Reusable lessons are drafted, reviewed, and scoped before trust.',
  'Stale or conflicting memory can be questioned instead of blindly reused.',
  'Client-specific lessons can remain scoped or be sanitized before broader reuse.',
  'Testers keep using their existing tools and judgment.',
] as const

const memoryEngine = [
  'Retrieves only the QA memory relevant to the current failure.',
  'Compares current evidence with reviewed lessons.',
  'Highlights selector, environment, data, and release-pattern context.',
  'Drafts proposed memory updates for tester review.',
  'Keeps trusted writes review-gated.',
  'Treats current evidence as stronger than stale memory.',
] as const

const whoFor = [
  'Freelance software testers who move across clients',
  'QA consultancies and testing companies',
  'SDETs carrying project context across teams',
  'Automation agencies supporting many client stacks',
] as const

export default function QAMemoryPage() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="ProChat Memory for QA · First discipline-specific edition" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Stop investigating</span>
            <span className="hero-accent block">the same failure twice.</span>
          </>
        }
        subtitle="ProChat Memory for QA is the first launch niche for ProChat Memory, the flagship product for reusable, reviewable memory in AI-assisted work. It helps testers preserve reviewed lessons from failures, flaky behavior, selectors, environments, and release decisions."
        primaryCTA={{ href: '/contact?topic=memory-qa', label: 'Talk about Memory for QA' }}
        secondaryCTA={{ href: '/prochat-memory', label: 'Explore ProChat Memory', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Reviewed QA lessons', 'Current evidence first', 'Tester control']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="positioning" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
            First launch niche
          </div>
          <h2 className="pc-section-title mb-5 text-foreground">
            A QA-focused edition of ProChat Memory.
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            ProChat Memory is the parent and flagship product. ProChat Memory for QA applies that same local-first, review-first memory model to the repeated failure patterns testers meet across projects.
          </p>
        </div>
      </Section>

      <Section id="outcomes" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">What testers and testing teams get back</h2>
            <p className="pc-body-copy pc-body-muted">
              Less repeated triage, fewer lost project lessons, and more confidence that the next failure starts with reviewed context.
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
            <h2 className="pc-card-title mb-5 text-foreground">Before reviewed QA memory</h2>
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
            <h2 className="pc-card-title mb-5 text-foreground">With ProChat Memory for QA</h2>
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
              What the memory layer does
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">
              Reviewable memory beside the QA tools testers already use.
            </h2>
            <p className="pc-body-copy pc-body-muted mb-6">
              ProChat Memory for QA is not another testing framework. It is a memory layer beside Playwright, Cypress, Selenium, Robot Framework, Postman, Jira, TestRail, GitHub Actions, Cursor, Claude, ChatGPT, Copilot, or whatever comes next.
            </p>
            <p className="pc-body-copy pc-body-muted">
              Ask about a failed test normally. The assistant can look up relevant QA memory, compare it with current evidence, and propose the next useful check without replacing tester judgment.
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
              Keep client-specific memory separated, sanitize reusable lessons when appropriate, and carry reviewed testing knowledge forward without putting ProChat files into client repositories by default.
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
            Start with one tester, one project, and one repeated failure pattern. ProChat Memory for QA is designed to show where reviewed memory can reduce repeated investigation.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact?topic=memory-qa">Talk about Memory for QA</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/prochat-memory">Back to ProChat Memory</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
