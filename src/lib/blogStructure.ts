export const BLOG_PILLARS = [
  {
    id: 'start-here',
    title: 'Start Here',
    description:
      'Start here if you are building your first production-ready SaaS.',
    order: 1,
  },
  {
    id: 'foundation',
    title: 'Foundation',
    description:
      'Validate the problem, narrow the MVP, and choose a scope that deserves to be built.',
    order: 2,
  },
  {
    id: 'structure',
    title: 'Structure',
    description:
      'Understand the system map and the infrastructure boundaries behind a trustworthy SaaS.',
    order: 3,
  },
  {
    id: 'build',
    title: 'Build',
    description:
      'Translate structure into implementation prompts and production-safe build decisions.',
    order: 4,
  },
  {
    id: 'production',
    title: 'Production',
    description:
      'Audit deployment, release, and launch safety before real traffic exposes weak assumptions.',
    order: 5,
  },
  {
    id: 'execution',
    title: 'Execution',
    description:
      'Sequence founder decisions from validated demand to paying users without creating chaos.',
    order: 6,
  },
] as const

export type BlogPillarId = (typeof BLOG_PILLARS)[number]['id']

export const BLOG_TAGS = [
  'ai',
  'nextjs',
  'saas',
  'mvp',
  'validation',
  'infrastructure',
  'production',
  'deployment',
  'stripe',
  'authentication',
  'non-technical-founders',
  'micro-saas',
  'architecture',
  'execution',
  'system-design',
] as const

export type BlogTag = (typeof BLOG_TAGS)[number]

export const BLOG_PILLAR_MAP = Object.fromEntries(
  BLOG_PILLARS.map(pillar => [pillar.id, pillar]),
) as Record<BlogPillarId, (typeof BLOG_PILLARS)[number]>

export function getBlogPillar(pillarId?: string | null) {
  if (!pillarId) return null
  return BLOG_PILLAR_MAP[pillarId as BlogPillarId] || null
}
