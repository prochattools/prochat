import { getSectionEntries } from '@/lib/content'

export type GlossaryStage = 'Idea' | 'Validation' | 'MVP' | 'Launch' | 'Growth'

export type GlossaryTerm = {
  title: string
  slug: string
  description: string
  date: string
  updated?: string
  author?: string
  tags?: string[]
  primaryKeyword?: string
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: string
  category: string
  stage: GlossaryStage
  synonyms: string[]
  excerpt: string
  definition: string
  priority: number
  focusTags: string[]
  content: string
  readingTimeMinutes: number
}

let allTermsPromise: Promise<GlossaryTerm[]> | null = null

const DEFAULT_METADATA = {
  category: 'Infrastructure',
  stage: 'Launch' as GlossaryStage,
  synonyms: [] as string[],
  priority: 90,
}

const CATEGORY_FOCUS_TAGS: Record<string, string[]> = {
  Foundation: ['business model', 'non-technical'],
  MVP: ['scope', 'shipping'],
  Validation: ['customer research', 'traction'],
  Metrics: ['revenue', 'numbers'],
  Pricing: ['payments', 'monetization'],
  Infrastructure: ['systems', 'reliability'],
  Launch: ['activation', 'adoption'],
  Strategy: ['authority', 'messaging'],
}

const GLOSSARY_METADATA: Record<string, { category: string; stage: GlossaryStage; synonyms: string[]; priority: number }> = {
  saas: { category: 'Foundation', stage: 'Idea', synonyms: ['software as a service', 'saas business model'], priority: 1 },
  mvp: { category: 'MVP', stage: 'Validation', synonyms: ['minimum viable product', 'lean product'], priority: 2 },
  'product-market-fit': { category: 'Validation', stage: 'Growth', synonyms: ['pmf', 'market pull', 'product fit'], priority: 3 },
  churn: { category: 'Metrics', stage: 'Growth', synonyms: ['customer churn', 'churn rate', 'cancel rate'], priority: 4 },
  arr: { category: 'Metrics', stage: 'Growth', synonyms: ['annual recurring revenue'], priority: 5 },
  'customer-acquisition-cost': { category: 'Metrics', stage: 'Growth', synonyms: ['cac', 'acquisition cost'], priority: 6 },
  'lifetime-value': { category: 'Metrics', stage: 'Growth', synonyms: ['ltv', 'customer lifetime value'], priority: 7 },
  authentication: { category: 'Infrastructure', stage: 'Launch', synonyms: ['login', 'user access', 'sign in'], priority: 8 },
  'billing-system': { category: 'Pricing', stage: 'Launch', synonyms: ['billing', 'subscription billing', 'payments setup'], priority: 9 },
  api: { category: 'Infrastructure', stage: 'MVP', synonyms: ['integration endpoint', 'software integration'], priority: 10 },
  mrr: { category: 'Metrics', stage: 'Growth', synonyms: ['monthly recurring revenue'], priority: 11 },
  'subscription-model': { category: 'Pricing', stage: 'MVP', synonyms: ['recurring pricing', 'subscription pricing'], priority: 12 },
  'saas-boilerplate': { category: 'Infrastructure', stage: 'MVP', synonyms: ['saas starter', 'starter kit', 'template'], priority: 13 },
  'no-code': { category: 'Foundation', stage: 'Idea', synonyms: ['nocode', 'visual builder'], priority: 14 },
  'low-code': { category: 'Foundation', stage: 'MVP', synonyms: ['lowcode', 'hybrid build'], priority: 15 },
  'founder-market-fit': { category: 'Validation', stage: 'Idea', synonyms: ['founder fit', 'market alignment'], priority: 16 },
  'technical-debt': { category: 'Infrastructure', stage: 'Growth', synonyms: ['tech debt', 'maintenance burden'], priority: 17 },
  'user-onboarding': { category: 'Launch', stage: 'Launch', synonyms: ['user activation', 'first-time experience'], priority: 18 },
  'saas-infrastructure': { category: 'Infrastructure', stage: 'Launch', synonyms: ['product foundation', 'system setup'], priority: 19 },
  'startup-mvp': { category: 'MVP', stage: 'Validation', synonyms: ['startup minimum viable product', 'first launch version'], priority: 20 },
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function clampExcerpt(text: string, max = 170) {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

function getFocusTags(category: string, stage: GlossaryStage) {
  return Array.from(new Set([...(CATEGORY_FOCUS_TAGS[category] || []), stage.toLowerCase()]))
}

function extractDefinition(content: string) {
  const definitionMatch = content.match(/<strong>\s*Definition:\s*<\/strong>\s*([^<]+)/i)
  if (definitionMatch?.[1]) return definitionMatch[1].trim()

  const firstParagraphMatch = content.match(/<p>([\s\S]*?)<\/p>/i)
  if (!firstParagraphMatch?.[1]) return ''
  return stripHtml(firstParagraphMatch[1])
}

function parseList(value?: unknown) {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean)
  }

  if (typeof value !== 'string') {
    return []
  }

  return value
    .split(/[|;,]/)
    .map(item => item.trim())
    .filter(Boolean)
}

function asOptionalString(value?: unknown) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed || undefined
}

function mapEntryToGlossaryTerm(entry: Awaited<ReturnType<typeof getSectionEntries>>[number]): GlossaryTerm {
  const metadata = GLOSSARY_METADATA[entry.slug] || DEFAULT_METADATA
  const category = asOptionalString(entry.rawFrontmatter.category) || metadata.category
  const stage = (entry.rawFrontmatter.stage as GlossaryStage) || metadata.stage
  const synonyms = parseList(entry.rawFrontmatter.synonyms)
  const priorityRaw = Number(entry.rawFrontmatter.priority)
  const definition = extractDefinition(entry.content)
  const excerptSource =
    asOptionalString(entry.rawFrontmatter.excerpt) || definition || stripHtml(entry.content)

  return {
    title: entry.title,
    slug: entry.slug,
    description: entry.description,
    date: entry.date,
    updated: entry.updated,
    author: entry.author,
    tags: entry.tags,
    primaryKeyword: entry.primaryKeyword,
    metaTitle: entry.metaTitle,
    metaDescription: entry.metaDescription,
    keywords: entry.keywords,
    ogImage: entry.ogImage,
    category,
    stage,
    synonyms: synonyms.length ? synonyms : metadata.synonyms,
    excerpt: clampExcerpt(excerptSource),
    definition,
    priority: Number.isFinite(priorityRaw) ? priorityRaw : metadata.priority,
    focusTags: getFocusTags(category, stage),
    content: entry.content,
    readingTimeMinutes: entry.readingTimeMinutes,
  }
}

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  if (!allTermsPromise) {
    allTermsPromise = getSectionEntries('glossary').then(entries =>
      entries.map(mapEntryToGlossaryTerm).sort((a, b) => a.title.localeCompare(b.title)),
    )
  }

  return allTermsPromise
}

export async function getGlossaryTermBySlug(slug: string) {
  const terms = await getAllGlossaryTerms()
  return terms.find(term => term.slug === slug) || null
}

export async function getGlossarySlugs() {
  const terms = await getAllGlossaryTerms()
  return terms.map(term => term.slug)
}
