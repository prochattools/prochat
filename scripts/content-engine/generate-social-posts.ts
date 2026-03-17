import fs from 'fs'
import path from 'path'

function buildTrackedUrl(url: string, params: { ref: string; campaign: string; pillar: string }) {
  if (!url) return url
  const existingIndex = url.indexOf('?')
  const base = existingIndex >= 0 ? url.slice(0, existingIndex) : url
  const search = existingIndex >= 0 ? url.slice(existingIndex + 1) : ''
  const query = new URLSearchParams(search)

  if (params.ref) query.set('ref', params.ref)
  if (params.campaign) query.set('campaign', params.campaign)
  if (params.pillar) query.set('pillar', params.pillar)

  const serialized = query.toString()
  return serialized ? `${base}?${serialized}` : base
}

type Platform = 'twitter' | 'linkedin'

type PostEntry = {
  id: number
  type: 'insight' | 'definition' | 'principle'
  text: string
  link: string
  pillar: string
}

interface SocialPost extends PostEntry {
  platform: Platform
  campaign: 'evergreen'
  scheduledDay: string
  scheduledTimeLisbon: string
}

type SocialSeed = {
  title: string
  url: string
  pillar: string
  insight: string
  definition: string
  principle: string
}

const PLATFORM_SCHEDULE = {
  twitter: {
    scheduledDay: 'Tuesday/Thursday',
    scheduledTimeLisbon: '16:00',
  },
  linkedin: {
    scheduledDay: 'Tuesday/Thursday',
    scheduledTimeLisbon: '11:00',
  },
} as const

const ROOT = process.cwd()
const outputDir = path.join(ROOT, 'content', 'social')

const SOCIAL_SEEDS: SocialSeed[] = [
  {
    title: 'Learn',
    url: '/learn',
    pillar: 'learn',
    insight:
      'Most founders do not need a bigger resource library. They need a tighter sequence they can actually follow.',
    definition:
      'Learn is the curated layer that shows what to use first, what to use next, and where the implementation layer starts.',
    principle:
      'A small learning surface is easier to trust, easier to finish, and easier to ship from.',
  },
  {
    title: 'Starting Point',
    url: '/learn/saas-starting-point',
    pillar: 'starting-point',
    insight:
      'Founders usually overbuild because they never lock the buyer, the proof, or the first boundary before writing code.',
    definition:
      'Starting Point is the pre-build framework for clarifying the buyer, the outcome, and the first safe version of the product.',
    principle:
      'Scope gets cheaper when the decision work happens before the repository gets noisy.',
  },
  {
    title: 'Production Guide',
    url: '/learn/production-guide',
    pillar: 'production',
    insight:
      'A validated idea still fails if the execution order is wrong and the production risks show up late.',
    definition:
      'The Production Guide is the implementation sequence for turning a validated idea into a build that can survive launch pressure.',
    principle:
      'Production quality comes from decision order, not from adding more tools after the architecture is already unstable.',
  },
  {
    title: 'AI Prompts',
    url: '/prompts',
    pillar: 'prompts',
    insight:
      'AI moves faster when the prompts sit inside a defined system instead of acting like a replacement for product judgment.',
    definition:
      'AI Prompts is the execution layer for founders who already know the sequence and need help moving through concrete implementation work.',
    principle:
      'Prompts are useful when they reinforce structure, not when they encourage more scope drift.',
  },
  {
    title: 'Documentation',
    url: '/docs',
    pillar: 'docs',
    insight:
      'Teams lose time when implementation details live in heads, chat logs, and scattered setup notes instead of one reference surface.',
    definition:
      'Documentation is the implementation layer for setup rules, deployment details, and shared product behavior.',
    principle:
      'Execution gets faster when the operational details are explicit enough to be checked, not guessed.',
  },
  {
    title: 'Kits',
    url: '/kits',
    pillar: 'kits',
    insight:
      'Founders burn weeks rebuilding infrastructure that should already be settled before feature work starts.',
    definition:
      'Kits is the product layer where the implementation path turns into a usable foundation you can actually build on.',
    principle:
      'The right foundation removes repeat setup work so the product effort can stay focused on the thing being sold.',
  },
  {
    title: 'SaaSKit',
    url: '/kits/saaskit',
    pillar: 'saaskit',
    insight:
      'Shipping faster only helps when auth, billing, deployment, and product structure are already wired in a production-safe way.',
    definition:
      'SaaSKit is the production-ready foundation for founders who want the SaaS system in place before feature work expands.',
    principle:
      'Speed is only useful when the first release does not create a maintenance trap on day one.',
  },
  {
    title: 'ProKit',
    url: '/kits/prokit',
    pillar: 'prokit',
    insight:
      'Product momentum slows down when every new build starts with another round of infrastructure setup and integration glue.',
    definition:
      'ProKit is the infrastructure layer for teams who want the core application wiring solved before they scale the product surface.',
    principle:
      'A stable infrastructure layer reduces decision fatigue and makes follow-on product work easier to control.',
  },
]

function buildPosts() {
  const posts: PostEntry[] = []
  let id = 1

  for (const seed of SOCIAL_SEEDS) {
    posts.push(
      {
        id: id++,
        type: 'insight',
        text: `${seed.insight}\n\nUse ${seed.title} ↓\n${seed.url}`,
        link: seed.url,
        pillar: seed.pillar,
      },
      {
        id: id++,
        type: 'definition',
        text: `${seed.definition}\n\nOpen ${seed.title} ↓\n${seed.url}`,
        link: seed.url,
        pillar: seed.pillar,
      },
      {
        id: id++,
        type: 'principle',
        text: `${seed.principle}\n\nUse ${seed.title} when you need the next layer ↓\n${seed.url}`,
        link: seed.url,
        pillar: seed.pillar,
      },
    )
  }

  return posts
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function trackedPosts(posts: PostEntry[], platform: Platform): SocialPost[] {
  const schedule = PLATFORM_SCHEDULE[platform]

  return posts.map(post => ({
    ...post,
    platform,
    link: buildTrackedUrl(post.link, {
      ref: platform,
      campaign: 'evergreen',
      pillar: post.pillar,
    }),
    campaign: 'evergreen',
    scheduledDay: schedule.scheduledDay,
    scheduledTimeLisbon: schedule.scheduledTimeLisbon,
  }))
}

function writeJson(file: string, data: unknown) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

function run() {
  const posts = buildPosts()
  ensureDir(outputDir)

  const twitterPosts = trackedPosts(posts, 'twitter').map((post, index) => ({
    ...post,
    id: index + 1,
  }))
  const linkedinPosts = trackedPosts(posts, 'linkedin').map((post, index) => ({
    ...post,
    id: index + 1,
  }))

  writeJson(path.join(outputDir, 'twitter.json'), twitterPosts)
  writeJson(path.join(outputDir, 'linkedin.json'), linkedinPosts)
}

run()
