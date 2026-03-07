import { promises as fs } from 'fs'
import path from 'path'

import { getContentConfig } from './config'
import { ContentEntry, ContentSection } from './types'

const cache = new Map<ContentSection, Promise<ContentEntry[]>>()

function parseList(value?: string) {
  return (value || '')
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
  return `${text.slice(0, max - 1).trimEnd()}…`
}

function readingTimeMinutes(content: string) {
  const words = stripMarkup(content).split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}

function parseFrontmatter(rawFile: string) {
  const match = rawFile.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error('Missing frontmatter in content file.')
  }

  const [, frontmatterRaw, content] = match
  const parsed = Object.fromEntries(
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
  const routeSegments = relativePath.replace(/\.mdx$/, '').split('/')
  const slug = routeSegments[routeSegments.length - 1]
  const urlPath =
    config.routeMode === 'single'
      ? `/${section}/${slug}`
      : `/${section}/${routeSegments.join('/')}`

  return { slug, routeSegments, urlPath }
}

async function readEntry(section: ContentSection, filePath: string, root: string): Promise<ContentEntry> {
  const config = getContentConfig(section)
  const rawFile = await fs.readFile(filePath, 'utf8')
  const { parsed, content } = parseFrontmatter(rawFile)
  const { slug, routeSegments, urlPath } = buildRoute(section, filePath, root)

  const title = parsed.title || slug
  const description = parsed.description || excerptFromContent(content)
  const tags = parseList(parsed.tags)
  const keywords = parseList(parsed.keywords)

  return {
    section,
    title,
    description,
    slug,
    routeSegments,
    category: parsed.category || routeSegments[0],
    tags,
    keywords,
    date: parsed.date || new Date().toISOString(),
    updated: parsed.updated || undefined,
    author: parsed.author || 'Steve',
    metaTitle: parsed.metaTitle || undefined,
    metaDescription: parsed.metaDescription || undefined,
    ogImage: parsed.ogImage || '/og/prochat-home.png',
    primaryKeyword: parsed.primaryKeyword || undefined,
    content,
    readingTimeMinutes: readingTimeMinutes(content),
    excerpt: excerptFromContent(content),
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

        const deduped = Array.from(new Map(entries.map(entry => [entry.urlPath, entry])).values())

        return deduped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
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
