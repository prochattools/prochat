import { promises as fs } from 'fs'
import path from 'path'
import { parse as parseYaml } from 'yaml'

import { getContentConfig } from './config.ts'
import type { ContentEntry, ContentSection } from './types.ts'

const cache = new Map<ContentSection, Promise<ContentEntry[]>>()
const GENERATED_FILE_MARKER = '<!-- GENERATED FILE - DO NOT EDIT -->'

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

function asString(value: unknown, fallback = '') {
  return asOptionalString(value) || fallback
}

function asOptionalNumber(value?: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return undefined

    const parsed = Number(trimmed)
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return undefined
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
  return `${text.slice(0, max - 1).trimEnd()}…`
}

function readingTimeMinutes(content: string) {
  const words = stripMarkup(content).split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

function parseFrontmatter(rawFile: string, filePath: string) {
  let trimmed = rawFile.trim()

  if (!trimmed) {
    return null
  }

  while (trimmed.startsWith(GENERATED_FILE_MARKER)) {
    trimmed = trimmed.slice(GENERATED_FILE_MARKER.length).trimStart()
  }

  const match = trimmed.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error(`Missing frontmatter in content file: ${filePath}`)
  }

  const [, frontmatterRaw, content] = match
  let parsed: Record<string, unknown>

  try {
    parsed = (parseYaml(frontmatterRaw) || {}) as Record<string, unknown>
  } catch {
    parsed = Object.fromEntries(
      frontmatterRaw
        .split('\n')
        .filter(Boolean)
        .map(line => {
          const separatorIndex = line.indexOf(':')
          if (separatorIndex <= 0) return null
          const key = line.slice(0, separatorIndex).trim()
          const value = line.slice(separatorIndex + 1).trim()
          return [key, value] as const
        })
        .filter((entry): entry is readonly [string, string] => Boolean(entry)),
    )
  }

  return { parsed, content }
}

async function listMdxFiles(root: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(root, { withFileTypes: true })
    const nested = await Promise.all(
      entries.map(async entry => {
        const fullPath = path.join(root, entry.name)
        if (entry.isDirectory()) return listMdxFiles(fullPath)
        return entry.name.endsWith('.mdx') ? [fullPath] : []
      }),
    )

    return nested.flat()
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return []
    }

    throw error
  }
}

function buildRoute(section: ContentSection, filePath: string, root: string) {
  const config = getContentConfig(section)
  const relativePath = path.relative(root, filePath).replace(/\\/g, '/')
  const rawRouteSegments = relativePath.replace(/\.mdx$/, '').split('/')
  const isIndexPage =
    config.routeMode === 'nested' &&
    rawRouteSegments[rawRouteSegments.length - 1] === 'index'
  const routeSegments = isIndexPage
    ? rawRouteSegments.slice(0, -1)
    : rawRouteSegments
  const slug = routeSegments[routeSegments.length - 1] || 'index'
  const urlPath =
    config.routeMode === 'single'
      ? `/${section}/${slug}`
      : routeSegments.length > 0
        ? `/${section}/${routeSegments.join('/')}`
        : `/${section}`

  return { slug, routeSegments, urlPath }
}

async function readEntry(section: ContentSection, filePath: string, root: string): Promise<ContentEntry | null> {
  const config = getContentConfig(section)
  const rawFile = await fs.readFile(filePath, 'utf8')
  const parsedFile = parseFrontmatter(rawFile, filePath)

  if (!parsedFile) {
    return null
  }

  const { parsed, content } = parsedFile
  const { slug, routeSegments, urlPath } = buildRoute(section, filePath, root)
  const seo = (parsed.seo as Record<string, unknown> | undefined) || {}
  const isDraft = parsed.draft === true || parsed.draft === 'true'

  if (isDraft) {
    return null
  }

  const title = asString(parsed.title, slug)
  const description =
    asOptionalString(parsed.description) ||
    asOptionalString(parsed.excerpt) ||
    asOptionalString(seo.description) ||
    excerptFromContent(content)
  const tags = parseList(parsed.tags)
  const keywords = parseList(parsed.keywords)
  const order = asOptionalNumber(parsed.order)
  const publishedAt = asOptionalString(parsed.publishedAt)
  const updated = asOptionalString(parsed.updated)

  return {
    section,
    sourcePath: path.relative(process.cwd(), filePath).replace(/\\/g, '/'),
    title,
    description,
    slug,
    frontmatterSlug: asOptionalString(parsed.slug),
    routeSegments,
    category: asOptionalString(parsed.category) || routeSegments[0],
    tags,
    keywords,
    order,
    date: publishedAt || asOptionalString(parsed.date) || new Date().toISOString(),
    updated,
    author: asOptionalString(parsed.author) || 'Steve',
    metaTitle: asOptionalString(parsed.metaTitle) || asOptionalString(seo.title),
    metaDescription:
      asOptionalString(parsed.metaDescription) || asOptionalString(seo.description),
    ogImage: asOptionalString(parsed.ogImage) || '/og',
    primaryKeyword: asOptionalString(parsed.primaryKeyword),
    content,
    readingTimeMinutes: readingTimeMinutes(content),
    excerpt: asOptionalString(parsed.excerpt) || excerptFromContent(content),
    urlPath,
    schemaType: config.schemaType,
    rawFrontmatter: parsed,
  }
}

export async function getSectionEntries(section: ContentSection): Promise<ContentEntry[]> {
  if (!cache.has(section)) {
    cache.set(
      section,
      (async () => {
        const config = getContentConfig(section)
        const files = (
          await Promise.all(config.roots.map(root => listMdxFiles(root)))
        ).flat()

        const entries = await Promise.all(
          files.map(async filePath => {
            const root = config.roots.find(candidate => filePath.startsWith(candidate))
            if (!root) throw new Error(`Unable to resolve content root for ${filePath}`)
            return readEntry(section, filePath, root)
          }),
        )

        const validEntries = entries.filter((entry): entry is ContentEntry => Boolean(entry))
        const deduped = Array.from(new Map(validEntries.map(entry => [entry.urlPath, entry])).values())

        return deduped.sort((a, b) => {
          const leftOrder = a.order ?? Number.POSITIVE_INFINITY
          const rightOrder = b.order ?? Number.POSITIVE_INFINITY

          if (leftOrder !== rightOrder) {
            return leftOrder - rightOrder
          }

          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
      })(),
    )
  }

  return cache.get(section)!
}

export async function getSectionEntry(
  section: ContentSection,
  routeSegments: string[],
): Promise<ContentEntry | null> {
  const entries = await getSectionEntries(section)
  return entries.find(entry => entry.routeSegments.join('/') === routeSegments.join('/')) || null
}

export async function getSectionStaticParams(section: ContentSection) {
  const config = getContentConfig(section)
  const entries = await getSectionEntries(section)

  return entries.map(entry =>
    Object.fromEntries(
      config.paramNames.map((paramName, index) => [paramName, entry.routeSegments[index]]),
    ),
  )
}

export async function getRelatedEntries(
  section: ContentSection,
  currentPath: string,
  limit = 3,
) {
  const entries = await getSectionEntries(section)
  const current = entries.find(entry => entry.urlPath === currentPath)

  return entries
    .filter(entry => entry.urlPath !== currentPath)
    .sort((left, right) => {
      const leftScore =
        Number(left.category === current?.category) +
        left.tags.filter(tag => current?.tags.includes(tag)).length
      const rightScore =
        Number(right.category === current?.category) +
        right.tags.filter(tag => current?.tags.includes(tag)).length

      return rightScore - leftScore
    })
    .slice(0, limit)
}

export function getSectionIndexPath(section: ContentSection) {
  return getContentConfig(section).indexPath
}
