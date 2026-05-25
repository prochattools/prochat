import Link from 'next/link'
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  HelpCircle,
  LockKeyhole,
  Sparkles,
  Workflow,
} from 'lucide-react'

import HeroSection from '@/components/marketing/HeroSection'
import HeroBadge from '@/components/ui/hero-badge'
import HeroCheckRow from '@/components/ui/hero-check-row'
import { Button } from '@/components/ui/button'
import { Panel, Section } from '@/components/ui/surface'

const FREE_BOOKING_URL = 'https://calendar.app.google/t6Vo8dNsHCUYgH8N9'
const PAID_BOOKING_URL = 'https://calendar.app.google/ShqLs2jtiL4tNNUa9'

const audienceCards = [
  {
    title: 'AI feels useful, but messy',
    description:
      'You know AI could help, but your tools, prompts, files, and workflows still feel scattered.',
    icon: HelpCircle,
  },
  {
    title: 'You want practical setup help',
    description:
      'You need someone to help with tools, local setup, automations, privacy basics, or a clearer daily workflow.',
    icon: Workflow,
  },
  {
    title: 'You want a calm plan',
    description:
      'You want your questions answered and a simple next-step plan instead of vague AI advice.',
    icon: CalendarCheck,
  },
] as const

const helpItems = [
  'Answer your AI questions, doubts, and worries',
  'Set up practical AI workflows for your work or business',
  'Help install local tools and CLIs where appropriate',
  'Help with automations that fit inside the session',
  'Review privacy and security basics',
  'Create a simple AI workflow plan after the call',
] as const

const exclusions = [
  'Full custom software development inside one session',
  'Guaranteed business results',
  'Complex automation builds unless separately scoped',
  'Legal, medical, financial, or enterprise security advice',
  'Unlimited follow-up support',
  'Extra implementation work beyond the booked time',
] as const

const bookingOptions = [
  {
    title: 'AI Fit Check',
    duration: '15 minutes',
    price: 'Free',
    description:
      'A short call for questions, doubts, worries, and deciding whether a focused setup session makes sense.',
    bestFor: 'Quick clarity before committing to a full session.',
    href: FREE_BOOKING_URL,
    cta: 'Book a free AI Fit Check',
    featured: true,
    icon: Clock,
  },
  {
    title: 'Personal AI Setup Session',
    duration: '60 minutes',
    price: '$150',
    description:
      'A focused 1:1 session for AI setup, automations, local tools, CLI setup, privacy/security basics, and a simple workflow plan after the call.',
    bestFor: 'Hands-on help making AI useful in your work, business, or personal productivity setup.',
    href: PAID_BOOKING_URL,
    cta: 'Book a 60-minute AI Setup Session',
    featured: false,
    icon: DollarSign,
  },
] as const

export default function BookPageContent() {
  return (
    <div className="bg-transparent text-foreground selection:bg-primary/20 dark:selection:bg-primary/40">
      <HeroSection
        className="min-h-[100svh] border-b border-border"
        showBackgrounds={false}
        eyebrow={<HeroBadge text="Practical AI setup calls" />}
        title={
          <>
            <span className="block text-foreground dark:text-white">Get practical help</span>
            <span className="hero-accent block">setting up AI for your work.</span>
          </>
        }
        subtitle="Book a short fit check or a focused setup session for your business, computer, tools, automations, and personal AI workflow."
        primaryCTA={{ href: FREE_BOOKING_URL, label: 'Book a free AI Fit Check' }}
        secondaryCTA={{ href: PAID_BOOKING_URL, label: 'Book a 60-minute setup session', variant: 'secondary' }}
        ambientMotion
      >
        <HeroCheckRow
          items={['Free 15-minute fit check', '60-minute setup session', 'Practical AI workflow plan']}
          className="mx-auto"
        />
      </HeroSection>

      <Section tone="transparent" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="pc-section-title mb-4 text-foreground">Who this is for</h2>
            <p className="pc-body-copy pc-body-muted">
              This is for people who want AI to become useful in real work, not just another tool they opened once and forgot.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {audienceCards.map(card => {
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

      <Section id="calls" tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              Choose a call
            </div>
            <h2 className="pc-section-title mb-4 text-foreground">Start with clarity or book focused help</h2>
            <p className="pc-body-copy pc-body-muted">
              The free call is for fit and direction. The paid session is for practical setup and a clear workflow plan.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {bookingOptions.map(option => {
              const Icon = option.icon
              return (
                <Panel
                  key={option.title}
                  tone={option.featured ? 'elevated' : 'default'}
                  padding="default"
                  className={option.featured ? 'border-primary/30' : ''}
                >
                  <div className="mb-6 flex items-start justify-between gap-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {option.duration}
                      </div>
                      <div className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-foreground">
                        {option.price}
                      </div>
                    </div>
                  </div>
                  <h3 className="pc-card-title mb-3 text-foreground">{option.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
                  <p className="mb-8 text-sm font-medium leading-relaxed text-foreground">{option.bestFor}</p>
                  <Button asChild variant={option.featured ? 'primary' : 'secondary'} size="sm">
                    <Link href={option.href} target="_blank" rel="noreferrer">
                      {option.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Panel>
              )
            })}
          </div>
        </div>
      </Section>

      <Section tone="transparent" spacing="default">
        <div className="mx-auto grid max-w-7xl gap-10 px-page lg:grid-cols-2">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
              What I can help with
            </div>
            <h2 className="pc-section-title mb-5 text-foreground">Practical setup, not vague advice</h2>
            <p className="pc-body-copy pc-body-muted">
              The goal is to make AI useful for your actual work, business, computer setup, or personal productivity.
            </p>
          </div>
          <Panel tone="default" padding="default">
            <div className="grid gap-4">
              {helpItems.map(item => (
                <div key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </Section>

      <Section tone="muted" spacing="default">
        <div className="mx-auto max-w-7xl px-page">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
                Clear boundaries
              </div>
              <h2 className="pc-section-title mb-5 text-foreground">What is not included</h2>
              <p className="pc-body-copy pc-body-muted">
                If the work does not fit inside the booked time, you can hire me for additional scoped work separately.
              </p>
            </div>
            <Panel tone="default" padding="default">
              <div className="grid gap-4 md:grid-cols-2">
                {exclusions.map(item => (
                  <div key={item} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </div>
      </Section>

      <Section tone="transparent" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="pc-section-title mb-6 text-foreground">Bring one clear goal</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Before the call, prepare your main plan, problem, or goal. The clearer the outcome, the more useful the call will be.
          </p>
        </div>
      </Section>

      <Section tone="muted" spacing="default">
        <div className="mx-auto max-w-5xl px-page text-center">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary">
            Why ProChat
          </div>
          <h2 className="pc-section-title mb-6 text-foreground">Built from real agentic workflow work</h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            I also build ProChat OS, ProChat&apos;s Agentic Workflow OS for turning messy inputs into structured work. The same practical, workflow-first approach is what I bring into these 1:1 setup sessions.
          </p>
          <div className="mt-8">
            <Button asChild variant="secondary" size="sm">
              <Link href="/systems/prochat-os">Explore ProChat OS</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section id="cta" tone="transparent" spacing="loose">
        <div className="relative z-10 mx-auto max-w-3xl px-page text-center">
          <h2 className="pc-section-title mb-8 text-foreground">Book the call that fits your situation</h2>
          <p className="mb-12 text-xl leading-relaxed text-muted-foreground">
            Start with the free fit check if you are unsure. Book the 60-minute setup session if you already know you want practical help.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href={FREE_BOOKING_URL} target="_blank" rel="noreferrer">
                BOOK — FREE FIT CHECK
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={PAID_BOOKING_URL} target="_blank" rel="noreferrer">
                BOOK — 60-MIN SETUP
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  )
}
