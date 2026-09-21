import { CinematicMarketingPage } from './CinematicMarketingPage'

export function HomeV2() {
  return <CinematicMarketingPage data={{
    eyebrowItems: ['/ HUMAN-OWNED MEMORY', '/ WORKING CONTEXT', '/ CONTROLLED EXECUTION'],
    intro: 'A human-owned system for AI work — from memory to context to controlled execution.',
    badge: 'EVERMIND · NEVERMIND · MASTERMIND',
    heroTitle: 'Remember what matters. Direct the work.',
    heroBody: 'Evermind remembers. Nevermind brings context. Mastermind directs the work.',
    cardTitle: 'Memory · Context · Execution',
    cardMeta: 'one connected system / three clear responsibilities',
    cardCta: 'Explore the system',
    cardHref: '#cinematic-capabilities',
    secondEyebrow: 'ONE CONNECTED SYSTEM',
    secondTitle: 'Memory. Context. Execution.',
    secondBody: 'Start with human-owned memory, bring the right context into active work, and direct execution with explicit control.',
    capabilities: [
      { title: 'Remember', body: 'Evermind keeps durable human-owned memory.' },
      { title: 'Contextualize', body: 'Nevermind brings relevant memory into working context.' },
      { title: 'Direct', body: 'Mastermind turns intent into controlled execution.' },
    ],
    primaryCta: { label: 'Explore Evermind', href: '/evermind', trackingCta: 'explore_evermind' },
    secondaryCta: { label: 'See the system', href: '#cinematic-capabilities' },
  }} />
}
