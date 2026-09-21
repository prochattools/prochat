import { CinematicMarketingPage, type CinematicMarketingPageData } from '../CinematicMarketingPage'

const CONTENT: Record<'evermind' | 'nevermind' | 'mastermind', CinematicMarketingPageData> = {
  evermind: {
    eyebrowItems: ['/ HUMAN-OWNED MEMORY', '/ LOCAL-FIRST', '/ PORTABLE'],
    intro: 'Evermind gives AI durable memory you can read, review, and keep under your control.',
    badge: 'FREE / HUMAN-OWNED',
    heroTitle: "Your AI forgets. Your memory shouldn't.",
    heroBody: 'Evermind gives AI a durable memory you can read, keep, and move with you.',
    cardTitle: 'Memory you own',
    cardMeta: 'free · readable · portable',
    cardCta: 'Get Evermind Free',
    cardHref: '#get-evermind',
    secondEyebrow: 'CAPTURE · REVIEW · RETRIEVE',
    secondTitle: 'Memory you own.',
    secondBody: 'Capture information, review what becomes canonical, and retrieve only the context you need.',
    capabilities: [
      { title: 'Capture', body: 'Bring useful information into Evermind.' },
      { title: 'Review', body: 'Decide what becomes trusted memory.' },
      { title: 'Retrieve', body: 'Pull the right context when it is needed.' },
    ],
    primaryCta: { label: 'Get Evermind Free', href: '#get-evermind', trackingCta: 'evermind_primary' },
    secondaryCta: { label: 'See how it works', href: '#cinematic-capabilities' },
  },
  nevermind: {
    eyebrowItems: ['/ WORKING CONTEXT', '/ CONTINUITY', '/ RELEVANCE'],
    intro: 'Nevermind brings the right memory into the work happening now.',
    badge: 'CONTEXT / ON DEMAND',
    heroTitle: 'The right context. At the right time.',
    heroBody: 'Nevermind turns durable memory into working context without loading everything at once.',
    cardTitle: 'Context on demand',
    cardMeta: 'orient · retrieve · contextualize',
    cardCta: 'Start with Evermind',
    cardHref: '/evermind',
    secondEyebrow: 'CONTEXT ON DEMAND',
    secondTitle: 'Bring memory into the work.',
    secondBody: 'Orient the task, surface relevant memory, and keep context available without turning every conversation into a data dump.',
    capabilities: [
      { title: 'Orient', body: 'Understand the active task.' },
      { title: 'Retrieve', body: 'Find the memory that matters now.' },
      { title: 'Contextualize', body: 'Bring that memory into the working environment.' },
    ],
    primaryCta: { label: 'Explore Nevermind', href: '#cinematic-capabilities', trackingCta: 'nevermind_primary' },
    secondaryCta: { label: 'Start with Evermind', href: '/evermind' },
  },
  mastermind: {
    eyebrowItems: ['/ CONTROLLED EXECUTION', '/ REAL PROJECT CONTEXT', '/ MODEL-FLEXIBLE'],
    intro: 'Mastermind turns vague intentions into controlled execution.',
    badge: 'REASON / DELEGATE / VALIDATE',
    heroTitle: 'Turn intent into controlled execution.',
    heroBody: 'Mastermind reasons across authorized project context, delegates bounded work, and validates what actually changed.',
    cardTitle: 'Controlled execution',
    cardMeta: 'reason · delegate · validate',
    cardCta: 'Explore Mastermind',
    cardHref: '#cinematic-capabilities',
    secondEyebrow: 'REASON · DELEGATE · VALIDATE',
    secondTitle: 'Direct the work deliberately.',
    secondBody: 'Make work legible from intent through validation while keeping authority and project boundaries explicit.',
    capabilities: [
      { title: 'Reason', body: 'Clarify intent using authorized project context.' },
      { title: 'Delegate', body: 'Hand bounded work to appropriate executors.' },
      { title: 'Validate', body: 'Check evidence, tests, diffs, and completion.' },
    ],
    primaryCta: { label: 'Explore Mastermind', href: '#cinematic-capabilities', trackingCta: 'mastermind_primary' },
    secondaryCta: { label: 'See Evermind', href: '/evermind' },
  },
}

export function CinematicProductFunnel({ kind }: { kind: 'evermind' | 'nevermind' | 'mastermind' }) {
  return <CinematicMarketingPage data={CONTENT[kind]} />
}
