'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { CinematicMarketingShell } from '../CinematicMarketingShell'
import { CinematicChapter, CinematicGlassPanel } from '../cinematic/CinematicChapter'
import { CinematicMediaPage } from '../cinematic/CinematicMediaPage'
import Logo from '../logo'

import './cinematic-product-funnel.css'


type Capability = { title: string; body: string }
type FunnelContent = {
  product: 'Evermind' | 'Nevermind' | 'Mastermind'
  eyebrowItems: string[]
  intro: string
  badge: string
  heroLine1: string
  heroLine2: string
  cardTitle: string
  cardMeta: string
  cardCta: string
  cardHref: string
  navCta: string
  navHref: string
  sectionBadge: string
  sectionIntro: string
  sectionLine1: string
  sectionLine2: string
  sectionBody: string
  primaryCta: string
  primaryHref: string
  secondaryCta: string
  secondaryHref: string
  capabilities: Capability[]
}
const CONTENT: Record<'evermind' | 'nevermind' | 'mastermind', FunnelContent> = {
  evermind: {
    product: 'Evermind',
    eyebrowItems: ['/ HUMAN-OWNED MEMORY', '/ LOCAL-FIRST', '/ PORTABLE'],
    intro: 'Evermind gives AI a durable memory you can read, keep, and move with you.',
    badge: 'FREE / HUMAN-OWNED',
    heroLine1: 'Your AI forgets.',
    heroLine2: "Your memory shouldn't.",
    cardTitle: 'Memory you own',
    cardMeta: 'free · readable · portable',
    cardCta: 'Get Evermind Free',
    cardHref: '#get-evermind',
    navCta: 'Get Evermind Free',
    navHref: '#get-evermind',
    sectionBadge: 'MEMORY YOU OWN',
    sectionIntro: 'Keep durable AI memory in human-readable files instead of leaving it trapped inside individual AI products.',
    sectionLine1: 'Remember.',
    sectionLine2: 'Without lock-in.',
    sectionBody: 'Preserve decisions, lessons, and useful context in a form you can inspect. Change the AI. Keep the memory.',
    primaryCta: 'Get Evermind Free',
    primaryHref: '#get-evermind',
    secondaryCta: 'See Nevermind',
    secondaryHref: '/nevermind',
    capabilities: [
      { title: 'Human-readable', body: 'Durable memory stays understandable instead of disappearing into an opaque chat archive.' },
      { title: 'Portable by design', body: 'Keep your memory in files you can inspect, preserve, and move as your tools change.' },
      { title: 'Useful on its own', body: 'Evermind is the free memory foundation. Nevermind adds the operational layer around it.' },
    ],
  },
  nevermind: {
    product: 'Nevermind',
    eyebrowItems: ['/ PERSISTENT CONTEXT', '/ CLAUDE CODE + CODEX', '/ MACOS FOUNDING'],
    intro: 'Nevermind is the operating layer that helps supported AI tools begin with the context that matters.',
    badge: 'FOUNDING EDITION / €39 ONCE',
    heroLine1: 'Stop explaining your work',
    heroLine2: 'to AI over and over.',
    cardTitle: 'Founding Edition',
    cardMeta: 'macOS · €39 once',
    cardCta: 'Get Founding Edition',
    cardHref: '#founding-edition',
    navCta: 'Get Nevermind — €39',
    navHref: '#founding-edition',
    sectionBadge: 'CONTEXT ON DEMAND',
    sectionIntro: 'Your durable memory stays yours. Nevermind is designed to surface relevant prior context when supported AI tools need it.',
    sectionLine1: 'Start oriented.',
    sectionLine2: 'Keep working.',
    sectionBody: 'Less repeated explanation. More continuity. Durable memory changes stay review-gated so the system can help without silently becoming your source of truth.',
    primaryCta: 'Get Nevermind — €39',
    primaryHref: '#founding-edition',
    secondaryCta: 'Start with Evermind Free',
    secondaryHref: '/evermind',
    capabilities: [
      { title: 'Orient', body: 'Bring relevant project context and prior decisions into the work instead of rebuilding context by hand.' },
      { title: 'Remember with review', body: 'Useful durable memory can be proposed while you remain in control of what becomes canonical.' },
      { title: 'Work through your tools', body: 'Nevermind is designed to augment supported AI tools rather than replace them with another destination chat UI.' },
    ],
  },
  mastermind: {
    product: 'Mastermind',
    eyebrowItems: ['/ CONTROLLED EXECUTION', '/ REAL PROJECT CONTEXT', '/ MODEL-FLEXIBLE'],
    intro: 'Mastermind turns vague intentions into controlled execution.',
    badge: 'FREE / REASONING + ORCHESTRATION',
    heroLine1: 'Turn vague ideas',
    heroLine2: 'into executable plans.',
    cardTitle: 'Stay in control',
    cardMeta: 'reason · delegate · validate',
    cardCta: 'Explore Mastermind',
    cardHref: '#controlled-execution',
    navCta: 'Explore Mastermind',
    navHref: '#controlled-execution',
    sectionBadge: 'CONTROLLED EXECUTION',
    sectionIntro: 'Keep one reasoning layer in control while bounded work is executed directly or delegated to the AI tools you choose.',
    sectionLine1: 'Plan clearly.',
    sectionLine2: 'Execute deliberately.',
    sectionBody: 'Mastermind reasons across authorized project context, clarifies material ambiguity, builds executable plans, delegates bounded work when useful, and validates what actually changed.',
    primaryCta: 'Explore Mastermind',
    primaryHref: '#controlled-execution',
    secondaryCta: 'See Evermind',
    secondaryHref: '/evermind',
    capabilities: [
      { title: 'Reason across real work', body: 'Use authorized repositories, files, plans, and documents as grounded context instead of starting from a blank chat.' },
      { title: 'Delegate without losing control', body: 'Keep oversight while bounded work is carried out directly or handed to supported executors such as Codex or Claude Code.' },
      { title: 'Validate completion', body: 'Treat tests, diffs, evidence, and explicit Git boundaries as part of the workflow rather than optional cleanup.' },
    ],
  },
}

export function CinematicProductFunnel({ kind }: { kind: 'evermind' | 'nevermind' | 'mastermind' }) {
  const c = CONTENT[kind]
  const actionId = kind === 'evermind' ? 'get-evermind' : kind === 'nevermind' ? 'founding-edition' : 'controlled-execution'
  return (
    <CinematicMarketingShell
      contentOwnsMain
      cta={{ label: c.navCta, href: c.navHref, trackingCta: `${kind}_primary` }}
    >
      <main id="main-content" className={`cpf-root cpf-root--${kind}`}>
        <CinematicMediaPage className="cm-product-experience" chapterCount={4}>
          <CinematicChapter id={`${kind}-hero`} index={0} align="left" eyebrow={c.badge} headingLevel="h1" title={`${c.heroLine1} ${c.heroLine2}`}>
            <p className="cm-lede">{c.intro}</p>
            <div className="cpf-service-list">{c.eyebrowItems.map(item => <span key={item}>{item}</span>)}</div>
            <CinematicGlassPanel className="cpf-product-card"><div className="cpf-product-card__mark"><Logo scale={0.55} /></div><div><span className="cpf-product-card__kicker">{c.product}</span><strong>{c.cardTitle}</strong><small>{c.cardMeta}</small><Link href={c.cardHref}>{c.cardCta}<ChevronRight size={14} /></Link></div></CinematicGlassPanel>
          </CinematicChapter>
          <CinematicChapter id={`${kind}-story`} index={1} align="right" eyebrow={c.sectionBadge} title={`${c.sectionLine1} ${c.sectionLine2}`}>
            <p className="cm-lede">{c.sectionIntro}</p>
            <CinematicGlassPanel className="cpf-story-panel"><p>{c.sectionBody}</p><ul>{c.capabilities.map(cap => <li key={cap.title}><strong>{cap.title}</strong><span>{cap.body}</span></li>)}</ul></CinematicGlassPanel>
          </CinematicChapter>
          <CinematicChapter id={`${kind}-proof`} index={2} align="center" eyebrow="The operating loop" title="Keep the important part visible.">
            <div className="cm-flow-grid">{c.capabilities.map((cap, index) => <article key={cap.title}><span className="cm-flow-grid__index">0{index + 1}</span><strong>{cap.title}</strong><p>{cap.body}</p></article>)}</div>
          </CinematicChapter>
          <CinematicChapter id={`${kind}-cta`} index={3} align="left" eyebrow="Ready when you are" title={c.sectionLine1}>
            <p className="cm-lede">{c.sectionBody}</p>
            <div className="cm-actions" id={actionId}><Link className="cm-actions__primary" href={c.primaryHref}>{c.primaryCta}<ChevronRight size={14} /></Link><Link className="cm-actions__secondary" href={c.secondaryHref}>{c.secondaryCta}</Link></div>
          </CinematicChapter>
        </CinematicMediaPage>
      </main>
    </CinematicMarketingShell>
  )
}
