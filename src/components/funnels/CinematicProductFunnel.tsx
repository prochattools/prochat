'use client'

import Link from 'next/link'
import { ChevronRight, Hexagon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import Logo from '@/components/logo'

import { ScrollVideoBackground } from './ScrollVideoBackground'


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

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`cpf-reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

export function CinematicProductFunnel({ kind }: { kind: 'evermind' | 'nevermind' | 'mastermind' }) {
  const c = CONTENT[kind]
  const actionId = kind === 'evermind' ? 'get-evermind' : kind === 'nevermind' ? 'founding-edition' : 'controlled-execution'
  return <div className={`cpf-root cpf-root--${kind}`}><ScrollVideoBackground /><div className="cpf-layer">
    <nav className="cpf-nav" aria-label={`${c.product} navigation`}><Link className="cpf-brand" href="/" aria-label="ProChat home"><Logo scale={0.68} /></Link><div className="cpf-nav__links"><Link href="/evermind">Evermind</Link><Link href="/nevermind">Nevermind</Link><Link href="/mastermind">Mastermind</Link></div><Link className="cpf-nav__cta" href={c.navHref}>{c.navCta}</Link></nav>
    <main><section className="cpf-section" aria-labelledby={`${kind}-hero-title`}><div className="cpf-section__top"><div className="cpf-service-list">{c.eyebrowItems.map((item, i) => <Reveal key={item} delay={150 + i * 120}><span>{item}</span></Reveal>)}</div><Reveal delay={300} className="cpf-intro"><p>{c.intro}</p></Reveal></div><div className="cpf-section__bottom"><div><Reveal delay={150}><div className="cpf-badge">{c.badge}</div></Reveal><Reveal delay={280}><h1 id={`${kind}-hero-title`}>{c.heroLine1}<br />{c.heroLine2}</h1></Reveal></div><Reveal delay={420}><div className="cpf-product-card"><div className="cpf-product-card__mark"><Hexagon size={30} strokeWidth={1.35} /></div><div><span className="cpf-product-card__kicker">{c.product}</span><strong>{c.cardTitle}</strong><small>{c.cardMeta}</small><Link href={c.cardHref}>{c.cardCta}<ChevronRight size={14} /></Link></div></div></Reveal></div></section>
    <div className="cpf-spacer" aria-hidden="true" />
    <section className="cpf-section" aria-labelledby={`${kind}-capability-title`}><div className="cpf-section__top"><Reveal delay={120}><div className="cpf-badge">{c.sectionBadge}</div></Reveal><Reveal delay={220} className="cpf-intro"><p>{c.sectionIntro}</p></Reveal></div><div className="cpf-capability__bottom"><div className="cpf-capability__copy"><Reveal delay={180}><h2 id={`${kind}-capability-title`}>{c.sectionLine1}<br />{c.sectionLine2}</h2></Reveal><Reveal delay={320}><p className="cpf-body-copy">{c.sectionBody}</p></Reveal><Reveal delay={420}><div className="cpf-actions" id={actionId}><Link className="cpf-button cpf-button--primary" href={c.primaryHref}>{c.primaryCta}<ChevronRight size={14} /></Link><Link className="cpf-button cpf-button--secondary" href={c.secondaryHref}>{c.secondaryCta}</Link></div></Reveal></div><div className="cpf-capabilities">{c.capabilities.map((cap, i) => <Reveal key={cap.title} delay={300 + i * 110}><div className="cpf-capability-row"><span className="cpf-capability-row__index">0{i + 1}</span><div><div className="cpf-capability-row__title"><strong>{cap.title}</strong><ChevronRight size={16} /></div><p>{cap.body}</p></div></div></Reveal>)}</div></div></section></main>
  </div></div>
}
