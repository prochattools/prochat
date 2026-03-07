import fs from 'fs'
import path from 'path'
import { parseDocument } from 'yaml'

type PostRecord = {
  slug: string
  fileName: string
  title: string
  category?: string
  links: string[]
}

const BLOG_ROOT = path.join(process.cwd(), 'src/lib/content/blog')
const BLOG_PREFIX = '/blog/'

function readBlogFiles() {
  return fs
    .readdirSync(BLOG_ROOT)
    .filter(fileName => fileName.endsWith('.mdx'))
    .sort()
}

function parsePost(fileName: string): PostRecord | null {
  const fullPath = path.join(BLOG_ROOT, fileName)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    return null
  }

  const [, frontmatter, content] = match
  const data = parseDocument(frontmatter).toJS() as Record<string, unknown>
  const slug = String(data.slug || fileName.replace(/\.mdx$/, ''))
  const title = String(data.title || slug)
  const category = typeof data.category === 'string' ? data.category : undefined

  const markdownLinks = [...content.matchAll(/\]\((\/(?:blog|kits)\/[^)#?\s]+)[^)]*\)/g)].map(
    matchResult => matchResult[1],
  )
  const jsxLinks = [...content.matchAll(/\b(?:href|primaryHref)\s*=\s*"(\/(?:blog|kits)\/[^"]+)"/g)].map(
    matchResult => matchResult[1],
  )
  const bareLinks = [...content.matchAll(/(^|\s)(\/kits\/saaskit)(?=$|\s)/gm)].map(
    matchResult => matchResult[2],
  )

  const links = [...new Set([...markdownLinks, ...jsxLinks, ...bareLinks])]

  return { slug, fileName, title, category, links }
}

function toBlogSlug(link: string) {
  if (!link.startsWith(BLOG_PREFIX)) return null
  return link.slice(BLOG_PREFIX.length).split('#')[0].split('?')[0]
}

function main() {
  const posts = readBlogFiles()
    .map(parsePost)
    .filter((post): post is PostRecord => Boolean(post))

  const knownSlugs = new Set(posts.map(post => post.slug))
  const inboundCounts = new Map<string, number>()

  for (const post of posts) {
    const uniqueTargets = new Set<string>()

    for (const link of post.links) {
      const targetSlug = toBlogSlug(link)
      if (!targetSlug || !knownSlugs.has(targetSlug)) continue
      if (targetSlug === post.slug || uniqueTargets.has(targetSlug)) continue

      uniqueTargets.add(targetSlug)
      inboundCounts.set(targetSlug, (inboundCounts.get(targetSlug) || 0) + 1)
    }
  }

  const lowInbound = posts.filter(post => (inboundCounts.get(post.slug) || 0) < 2)

  if (lowInbound.length === 0) {
    console.log('Internal link audit: no low-inbound posts detected.')
    return
  }

  console.warn('Internal link audit: posts with fewer than 2 inbound blog links')
  for (const post of lowInbound) {
    console.warn(
      `- ${post.slug} (${post.category || 'uncategorized'}) → ${inboundCounts.get(post.slug) || 0} inbound`,
    )
  }
}

main()
