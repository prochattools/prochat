import { promises as fs } from 'fs'
import path from 'path'

const GLOSSARY_DIR = path.join(process.cwd(), 'content', 'glossary')

export type GlossaryStage = 'Idea' | 'Validation' | 'MVP' | 'Launch' | 'Growth'

type Frontmatter = {
  title: string
  slug?: string
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
  category?: string
  stage?: GlossaryStage
  synonyms?: string[]
  excerpt?: string
  priority?: number
}

export type GlossaryTerm = Frontmatter & {
  slug: string
  content: string
  readingTimeMinutes: number
  category: string
  stage: GlossaryStage
  synonyms: string[]
  excerpt: string
  definition: string
  priority: number
  focusTags: string[]
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
}

const GLOSSARY_METADATA: Record<
  string,
  {
    category: string
    stage: GlossaryStage
    synonyms: string[]
    priority: number
  }
> = {
  saas: {
    category: 'Foundation',
    stage: 'Idea',
    synonyms: ['software as a service', 'saas business model'],
    priority: 1,
  },
  mvp: {
    category: 'MVP',
    stage: 'Validation',
    synonyms: ['minimum viable product', 'lean product'],
    priority: 2,
  },
  'product-market-fit': {
    category: 'Validation',
    stage: 'Growth',
    synonyms: ['pmf', 'market pull', 'product fit'],
    priority: 3,
  },
  churn: {
    category: 'Metrics',
    stage: 'Growth',
    synonyms: ['customer churn', 'churn rate', 'cancel rate'],
    priority: 4,
  },
  arr: {
    category: 'Metrics',
    stage: 'Growth',
    synonyms: ['annual recurring revenue'],
    priority: 5,
  },
  'customer-acquisition-cost': {
    category: 'Metrics',
    stage: 'Growth',
    synonyms: ['cac', 'acquisition cost'],
    priority: 6,
  },
  'lifetime-value': {
    category: 'Metrics',
    stage: 'Growth',
    synonyms: ['ltv', 'customer lifetime value'],
    priority: 7,
  },
  authentication: {
    category: 'Infrastructure',
    stage: 'Launch',
    synonyms: ['login', 'user access', 'sign in'],
    priority: 8,
  },
  'billing-system': {
    category: 'Pricing',
    stage: 'Launch',
    synonyms: ['billing', 'subscription billing', 'payments setup'],
    priority: 9,
  },
  api: {
    category: 'Infrastructure',
    stage: 'MVP',
    synonyms: ['integration endpoint', 'software integration'],
    priority: 10,
  },
  mrr: {
    category: 'Metrics',
    stage: 'Growth',
    synonyms: ['monthly recurring revenue'],
    priority: 11,
  },
  'subscription-model': {
    category: 'Pricing',
    stage: 'MVP',
    synonyms: ['recurring pricing', 'subscription pricing'],
    priority: 12,
  },
  'saas-boilerplate': {
    category: 'Infrastructure',
    stage: 'MVP',
    synonyms: ['saas starter', 'starter kit', 'template'],
    priority: 13,
  },
  'no-code': {
    category: 'Foundation',
    stage: 'Idea',
    synonyms: ['nocode', 'visual builder'],
    priority: 14,
  },
  'low-code': {
    category: 'Foundation',
    stage: 'MVP',
    synonyms: ['lowcode', 'hybrid build'],
    priority: 15,
  },
  'founder-market-fit': {
    category: 'Validation',
    stage: 'Idea',
    synonyms: ['founder fit', 'market alignment'],
    priority: 16,
  },
  'technical-debt': {
    category: 'Infrastructure',
    stage: 'Growth',
    synonyms: ['tech debt', 'maintenance burden'],
    priority: 17,
  },
  'user-onboarding': {
    category: 'Launch',
    stage: 'Launch',
    synonyms: ['user activation', 'first-time experience'],
    priority: 18,
  },
  'saas-infrastructure': {
    category: 'Infrastructure',
    stage: 'Launch',
    synonyms: ['product foundation', 'system setup'],
    priority: 19,
  },
  'startup-mvp': {
    category: 'MVP',
    stage: 'Validation',
    synonyms: ['startup minimum viable product', 'first launch version'],
    priority: 20,
  },
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function clampExcerpt(text: string, max = 170) {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}…`
}

function getFocusTags(category: string, stage: GlossaryStage) {
  return Array.from(
    new Set([...(CATEGORY_FOCUS_TAGS[category] || []), stage.toLowerCase()]),
  )
}

function extractDefinition(content: string) {
  const definitionMatch = content.match(/<strong>\s*Definition:\s*<\/strong>\s*([^<]+)/i)
  if (definitionMatch?.[1]) return definitionMatch[1].trim()

  const firstParagraphMatch = content.match(/<p>([\s\S]*?)<\/p>/i)
  if (!firstParagraphMatch?.[1]) return ''
  return stripHtml(firstParagraphMatch[1])
}

function parseFrontmatter(rawFile: string) {
  const match = rawFile.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error('Missing frontmatter in glossary file.')
  }

  const [, frontmatterRaw, content] = match
  const frontmatterEntries = frontmatterRaw
    .split('\n')
    .filter(Boolean)
    .map(line => {
      const separatorIndex = line.indexOf(':')
      if (separatorIndex <= 0) return null

      const key = line.slice(0, separatorIndex).trim()
      const value = line.slice(separatorIndex + 1).trim()
      return [key, value] as const
    })
    .filter((entry): entry is readonly [string, string] => Boolean(entry))

  const parsed = Object.fromEntries(frontmatterEntries)

  const parseList = (value?: string) =>
    (value || '')
      .split(/[|;,]/)
      .map(item => item.trim())
      .filter(Boolean)

  const keywords = parseList(parsed.keywords)
  const tags = parseList(parsed.tags)
  const synonyms = parseList(parsed.synonyms)
  const priorityRaw = parsed.priority ? Number(parsed.priority) : undefined

  const frontmatter: Frontmatter = {
    title: parsed.title || '',
    slug: parsed.slug || undefined,
    description: parsed.description || '',
    date: parsed.date || '',
    updated: parsed.updated || undefined,
    author: parsed.author || 'Steve',
    tags,
    primaryKeyword: parsed.primaryKeyword || '',
    metaTitle: parsed.metaTitle || '',
    metaDescription: parsed.metaDescription || '',
    ogImage: parsed.ogImage || '/og/prochat-home.png',
    keywords,
    category: parsed.category || undefined,
    stage: (parsed.stage as GlossaryStage) || undefined,
    synonyms,
    excerpt: parsed.excerpt || undefined,
    priority: Number.isFinite(priorityRaw) ? priorityRaw : undefined,
  }

  return { frontmatter, content }
}

function calculateReadingTimeMinutes(content: string) {
  const plainText = content
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const words = plainText ? plainText.split(' ').length : 0
  return Math.max(1, Math.ceil(words / 220))
}

async function readGlossaryFile(fileName: string): Promise<GlossaryTerm> {
  const fullPath = path.join(GLOSSARY_DIR, fileName)
  const rawFile = await fs.readFile(fullPath, 'utf8')
  const slug = fileName.replace(/\.mdx$/, '')
  const { frontmatter, content } = parseFrontmatter(rawFile)
  const metadata = GLOSSARY_METADATA[slug] || DEFAULT_METADATA
  const definition = extractDefinition(content)
  const excerptSource = frontmatter.excerpt || definition || stripHtml(content)

  if (!frontmatter.title || !frontmatter.description || !frontmatter.date) {
    throw new Error(`Invalid frontmatter in ${fileName}`)
  }

  if (frontmatter.slug && frontmatter.slug !== slug) {
    throw new Error(
      `Slug mismatch in ${fileName}: frontmatter has "${frontmatter.slug}" but filename slug is "${slug}".`,
    )
  }

  return {
    ...frontmatter,
    slug,
    content,
    readingTimeMinutes: calculateReadingTimeMinutes(content),
    category: frontmatter.category || metadata.category,
    stage: frontmatter.stage || metadata.stage,
    synonyms:
      frontmatter.synonyms && frontmatter.synonyms.length > 0
        ? frontmatter.synonyms
        : metadata.synonyms,
    excerpt: clampExcerpt(excerptSource),
    definition,
    priority: frontmatter.priority || metadata.priority,
    focusTags: getFocusTags(frontmatter.category || metadata.category, frontmatter.stage || metadata.stage),
  }
}

export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  if (!allTermsPromise) {
    allTermsPromise = (async () => {
      const files = await fs.readdir(GLOSSARY_DIR)
      const mdxFiles = files.filter(file => file.endsWith('.mdx'))
      const terms = await Promise.all(mdxFiles.map(readGlossaryFile))

      return terms.sort((a, b) => a.title.localeCompare(b.title))
    })()
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
