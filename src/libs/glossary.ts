import { promises as fs } from 'fs'
import path from 'path'

const GLOSSARY_DIR = path.join(process.cwd(), 'content', 'glossary')

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
}

export type GlossaryTerm = Frontmatter & {
  slug: string
  content: string
  readingTimeMinutes: number
}

let allTermsPromise: Promise<GlossaryTerm[]> | null = null

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
