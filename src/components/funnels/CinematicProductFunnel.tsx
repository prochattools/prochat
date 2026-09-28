import { CinematicMarketingPage, type CinematicMarketingPageData } from '../CinematicMarketingPage'

const CONTENT: Record<'evermind' | 'nevermind' | 'mastermind', CinematicMarketingPageData> = {
  evermind: {
    eyebrowItems: ['/ HUMAN-OWNED MEMORY', '/ LOCAL-FIRST', '/ PORTABLE'],
    intro: 'Evermind gives AI durable memory you can read, review, and keep under your control.',
    badge: 'FREE / HUMAN-OWNED',
    heroTitleLines: ['Your AI forgets.', 'Your memory', "shouldn't."],
    cardTitle: 'Evermind',
    cardMeta: 'MEMORY YOU OWN',
    cardCta: 'Get Evermind Free',
    cardHref: '#cinematic-capabilities',
    secondEyebrow: 'CAPTURE · REVIEW · RETRIEVE',
    secondIntro: 'Keep memory inspectable, reviewable, and portable.',
    secondTitleLines: ['Memory', 'you own.'],
    secondBody: 'Capture information, review what becomes canonical, and retrieve only the context you need.',
    capabilities: [
      { title: 'Capture', body: 'Bring useful information into Evermind.' },
      { title: 'Review', body: 'Decide what becomes trusted memory.' },
      { title: 'Retrieve', body: 'Pull the right context when it is needed.' },
    ],
    primaryCta: { label: 'Get Evermind Free', href: '#cinematic-capabilities', trackingCta: 'evermind_primary' },
    secondaryCta: { label: 'Explore Nevermind', href: '/nevermind' },
  },
  nevermind: {
    eyebrowItems: ['/ WORKING CONTEXT', '/ CONTINUITY', '/ RELEVANCE'],
    intro: 'Nevermind brings the right memory into the work happening now.',
    badge: 'CONTEXT / ON DEMAND',
    heroTitleLines: ['The right context.', 'At the right time.'],
    cardTitle: 'Nevermind',
    cardMeta: 'WORKING CONTEXT',
    cardCta: 'Explore Nevermind',
    cardHref: '#cinematic-capabilities',
    secondEyebrow: 'CONTEXT ON DEMAND',
    secondIntro: 'Bring relevant memory into active work without loading everything.',
    secondTitleLines: ['Bring memory', 'into the work.'],
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
    heroTitleLines: ['Turn intent', 'into controlled', 'execution.'],
    cardTitle: 'Mastermind',
    cardMeta: 'CONTROLLED EXECUTION',
    cardCta: 'Explore Mastermind',
    cardHref: '#cinematic-capabilities',
    secondEyebrow: 'REASON · DELEGATE · VALIDATE',
    secondIntro: 'Keep authority, scope, evidence, and completion explicit.',
    secondTitleLines: ['Direct the work', 'deliberately.'],
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
