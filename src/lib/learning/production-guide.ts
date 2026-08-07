import { promises as fs } from 'fs'
import path from 'path'
import { parse as parseYaml } from 'yaml'

import { splitSocialTitle } from '@/lib/social-image'

export const LEGACY_PRODUCTION_GUIDE_SLUG = 'how-to-build-saas-with-ai-non-developer'
export const PRODUCTION_GUIDE_PATH = '/docs/learn/production-guide'
export const PRODUCTION_GUIDE_STATIC_SOCIAL_IMAGE_SLUG = LEGACY_PRODUCTION_GUIDE_SLUG

const PRODUCTION_GUIDE_SOURCE_PATH = path.join(
  process.cwd(),
  'src',
  'content',
  'learn',
  'production-guide.mdx',
)

export type ProductionGuideEntry = {
  title: string
  description: string
  excerpt: string
  date: string
  updated?: string
  keywords: string[]
  metaTitle?: string
  metaDescription?: string
  ogLine1?: string
  ogLine2?: string
  ogSubtitle?: string
  content: string
}

let productionGuidePromise: Promise<ProductionGuideEntry | null> | null = null

function asOptionalString(value?: unknown) {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed || undefined
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

function stripMarkup(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function excerptFromContent(content: string, max = 180) {
  const text = stripMarkup(content)
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trimEnd()}...`
}

function parseFrontmatter(rawFile: string) {
  const match = rawFile.trim().match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error('Missing frontmatter in src/content/learn/production-guide.mdx')
  }

  const [, frontmatterRaw, content] = match
  const parsed = (parseYaml(frontmatterRaw) || {}) as Record<string, unknown>

  return { parsed, content }
}

export async function getProductionGuideEntry(): Promise<ProductionGuideEntry | null> {
  if (!productionGuidePromise) {
    productionGuidePromise = (async () => {
      try {
        const rawFile = await fs.readFile(PRODUCTION_GUIDE_SOURCE_PATH, 'utf8')
        const { parsed, content } = parseFrontmatter(rawFile)
        const seo = (parsed.seo as Record<string, unknown> | undefined) || {}
        const description =
          asOptionalString(parsed.description) ||
          asOptionalString(parsed.excerpt) ||
          asOptionalString(seo.description) ||
          excerptFromContent(content)

        return {
          title: asOptionalString(parsed.title) || 'Production Guide',
          description,
          excerpt: asOptionalString(parsed.excerpt) || description,
          date: asOptionalString(parsed.publishedAt) || new Date().toISOString(),
          updated: asOptionalString(parsed.updated),
          keywords: parseList(parsed.keywords),
          metaTitle: asOptionalString(parsed.metaTitle) || asOptionalString(seo.title),
          metaDescription:
            asOptionalString(parsed.metaDescription) || asOptionalString(seo.description),
          ogLine1: asOptionalString(parsed.ogLine1),
          ogLine2: asOptionalString(parsed.ogLine2),
          ogSubtitle: asOptionalString(parsed.ogSubtitle),
          content,
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          return null
        }

        throw error
      }
    })()
  }

  return productionGuidePromise
}

export function getProductionGuideSocialImage(entry: ProductionGuideEntry) {
  const [fallbackLine1, fallbackLine2] = splitSocialTitle(entry.title)

  return {
    slug: PRODUCTION_GUIDE_STATIC_SOCIAL_IMAGE_SLUG,
    line1: entry.ogLine1 || fallbackLine1,
    line2: entry.ogLine2 || fallbackLine2,
    subtitle: entry.ogSubtitle || entry.metaDescription || entry.description,
  }
}
