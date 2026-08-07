'use client'

import Link from 'next/link'
import { CheckCircle2, Clock, FileText, MessageSquareText, ShieldCheck, TrendingUp } from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

type ProChatOSPageContentProps = {
  priceId?: string | null
}

const problemCards = [
  'People explain the same context again.',
  'Good examples are scattered across old work.',
  'AI drafts still need heavy rewriting.',
  'Reports, replies, and proposals start from scratch.',
  'Useful knowledge stays stuck in one person’s head.',
  'New team members need the same explanations repeatedly.',
] as const

const outputCards = [
  'Reply draft',
  'Proposal draft',
  'Support answer',
  'Report',
  'Task list',
  'Handoff note',
  'Meeting summary',
  'Next-step checklist',
] as const

const layers = [
  {
    title: 'Use your own examples',
    description: 'ProChat works from the way your business already writes, explains, decides, and follows up.',
    icon: FileText,
  },
  {
    title: 'Prepare repeated work',
    description: 'Emails, notes, files, calls, and old examples become drafts, summaries, reports, replies, and task lists.',
    icon: MessageSquareText,
  },
  {
    title: 'Review before use',
    description: 'Your team checks important outputs before anything is sent, changed, or treated as final.',
    icon: ShieldCheck,
  },
  {
    title: 'Improve over time',
    description: 'Corrections and feedback improve future outputs, so the same work does not keep starting from zero.',
    icon: TrendingUp,
  },
] as const

const useCases = [
  'Owner notes to delegation instructions',
  'Sales call to follow-up email and proposal draft',
  'Support issue to reply and escalation note',
  'Meeting notes to task list and status update',
  'Brand examples to content draft and brief',
  'Client context to summary and next steps',
] as const

export default function ProChatOSPageContent({ priceId: _priceId }: ProChatOSPageContentProps) {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        showBackgrounds={false}
        eyebrow={<HeroBadge text="ProChat OS" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Turn repeated work</span>
            <span className="hero-accent block">into reusable output.</span>
          </>
        }
        subtitle="ProChat helps your team use its own examples, style, notes, and business knowledge to prepare drafts, summaries, reports, replies, and next steps faster."
        primaryCTA={{ href: '/ai-workflows', label: 'Start with one task' }}
        secondaryCTA={{ href: '/contact', label: 'Book a call', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Your examples', 'Faster drafts', 'Review first']}
          className="mx-auto"
        />
      </HeroSection>

      <Section id="problem" tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <h2 className="pc-section-title mb-5 text-foreground">The work is not new. Your team is just doing it again.</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Every business has repeated emails, reports, follow-ups, proposals, support answers, and handoffs. ProChat helps turn the knowledge behind that work into outputs your team can review and use.
          </p>
        </div>
      </Section>

      <Section id="before" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Where time disappears</h2>
            <p className="pc-body-copy pc-body-muted">
              The pain is usually not one big task. It is the same small knowledge work repeated again and again.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {problemCards.map(card => (
              <Panel key={card} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{card}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="how" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">What ProChat makes easier</h2>
            <p className="pc-body-copy pc-body-muted">
              ProChat does not replace people. It prepares the work so people can review faster and start from a better draft.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {layers.map(card => {
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

      <Section id="input-output" tone="muted" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-8 px-page lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <Panel tone="default" padding="default">
            <h3 className="pc-card-title mb-5 text-foreground">You bring</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Notes, emails, examples, old proposals, support replies, brand voice, decisions, procedures, reports, files, or call summaries.
            </p>
          </Panel>

          <div className="flex justify-center">
            <div className="rounded-full border border-primary/30 bg-primary/10 px-5 py-3 font-mono text-sm uppercase tracking-[0.16em] text-primary">
              Becomes
            </div>
          </div>

          <Panel tone="default" padding="default">
            <h3 className="pc-card-title mb-5 text-foreground">You get</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {outputCards.map(item => (
                <div key={item} className="rounded-lg border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
                  {item}
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section id="examples" tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Useful first examples</h2>
            <p className="pc-body-copy pc-body-muted">
              Start with one repeated task where examples already exist and the result is easy to judge.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map(example => (
              <Panel key={example} tone="default" padding="default" className="h-full">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{example}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      <Section id="cta" tone="muted" spacing="loose">
        <div className="mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-6 text-foreground">Start with one repeated task</h2>
          <p className="mb-10 text-xl leading-relaxed text-muted-foreground">
            Send us a task your team still does by hand and a few examples. We will show what a faster, review-ready version could look like.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/ai-workflows">START — TIME-SAVING TEST</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/book">BOOK — A CALL</Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
