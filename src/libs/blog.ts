import { getSectionEntries } from '@/lib/content'
import { BLOG_PILLARS, BLOG_TAGS, BlogPillarId, BlogTag } from '@/lib/blogStructure'

export type BlogCluster =
  | 'Build SaaS with AI'
  | 'Next.js SaaS Infrastructure'
  | 'Founder Execution'

export type BlogPost = {
  slug: string
  title: string
  description: string
  excerpt?: string
  category?: BlogPillarId
  date: string
  updated?: string
  author?: string
  cluster?: BlogCluster
  tags?: BlogTag[]
  takeaways?: string[]
  primaryKeyword?: string
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: string
  content: string
  readingTimeMinutes: number
  pillar?: boolean
  order?: number
  pillarCategory?: BlogPillarId
  pillarOrder?: number
}

let allPostsPromise: Promise<BlogPost[]> | null = null

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

function parseReadingTimeMinutes(value: unknown, fallback: number) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(1, Math.round(value))
  }

  if (typeof value === 'string') {
    const match = value.match(/\d+/)
    if (match) return Math.max(1, Number(match[0]))
  }

  return fallback
}

function mapEntryToBlogPost(entry: Awaited<ReturnType<typeof getSectionEntries>>[number]): BlogPost {
  const pillarOrder =
    typeof entry.rawFrontmatter.pillarOrder === 'number'
      ? entry.rawFrontmatter.pillarOrder
      : typeof entry.rawFrontmatter.pillarOrder === 'string'
        ? Number(entry.rawFrontmatter.pillarOrder)
        : undefined

  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    excerpt: entry.excerpt,
    category: entry.category as BlogPillarId | undefined,
    date: entry.date,
    updated: entry.updated,
    author: entry.author,
    cluster: (entry.rawFrontmatter.cluster as BlogCluster) || undefined,
    tags: entry.tags as BlogTag[],
    takeaways: parseList(entry.rawFrontmatter.takeaways || entry.rawFrontmatter.summary),
    primaryKeyword: entry.primaryKeyword,
    metaTitle: entry.metaTitle,
    metaDescription: entry.metaDescription,
    keywords: entry.keywords,
    ogImage: entry.ogImage,
    content: entry.content,
    readingTimeMinutes: parseReadingTimeMinutes(
      entry.rawFrontmatter.readingTime,
      entry.readingTimeMinutes,
    ),
    pillar: Boolean(entry.rawFrontmatter.pillar),
    pillarCategory: entry.rawFrontmatter.pillarCategory as BlogPillarId | undefined,
    pillarOrder,
    order:
      typeof entry.rawFrontmatter.order === 'number'
        ? entry.rawFrontmatter.order
        : typeof entry.rawFrontmatter.order === 'string'
          ? Number(entry.rawFrontmatter.order)
          : undefined,
  }
}

const allowedTags = new Set<string>(BLOG_TAGS)
const allowedCategories = new Set<string>(BLOG_PILLARS.map(pillar => pillar.id))

function validateBlogPost(post: BlogPost) {
  if (post.category && !allowedCategories.has(post.category)) {
    throw new Error(`Invalid blog category "${post.category}" for "${post.slug}".`)
  }

  if (post.pillarCategory && !allowedCategories.has(post.pillarCategory)) {
    throw new Error(`Invalid blog pillarCategory "${post.pillarCategory}" for "${post.slug}".`)
  }

  for (const tag of post.tags || []) {
    if (!allowedTags.has(tag)) {
      throw new Error(`Invalid blog tag "${tag}" for "${post.slug}".`)
    }
  }

  return post
}

function sortBlogPosts(posts: BlogPost[]) {
  const pillarIndex = new Map(BLOG_PILLARS.map(pillar => [pillar.id, pillar.order]))

  return [...posts].sort((left, right) => {
    if (Boolean(left.pillar) !== Boolean(right.pillar)) {
      return left.pillar ? -1 : 1
    }

    const leftPillarRank = pillarIndex.get(left.pillarCategory || '' as BlogPillarId) ?? Number.POSITIVE_INFINITY
    const rightPillarRank = pillarIndex.get(right.pillarCategory || '' as BlogPillarId) ?? Number.POSITIVE_INFINITY

    if (leftPillarRank !== rightPillarRank) {
      return leftPillarRank - rightPillarRank
    }

    const leftOrder = Number.isFinite(left.pillarOrder)
      ? (left.pillarOrder as number)
      : Number.isFinite(left.order)
        ? (left.order as number)
        : Number.POSITIVE_INFINITY
    const rightOrder = Number.isFinite(right.pillarOrder)
      ? (right.pillarOrder as number)
      : Number.isFinite(right.order)
        ? (right.order as number)
        : Number.POSITIVE_INFINITY

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder
    }

    return new Date(right.date).getTime() - new Date(left.date).getTime()
  })
}

function filterVisibleBlogPosts(posts: BlogPost[]) {
  const now = new Date()

  return posts.filter(post => {
    if (!post.date) return false

    const publishDate = new Date(post.date)
    if (Number.isNaN(publishDate.getTime())) return false

    return publishDate <= now
  })
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!allPostsPromise) {
    allPostsPromise = getSectionEntries('blog').then(entries => {
      const allPosts = entries.map(mapEntryToBlogPost).map(validateBlogPost)
      const visiblePosts = filterVisibleBlogPosts(allPosts)

      return sortBlogPosts(visiblePosts)
    })
  }

  return allPostsPromise
}

export async function getBlogPostBySlug(slug: string) {
  const posts = await getAllBlogPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function getBlogPostSlugs() {
  const posts = await getAllBlogPosts()
  return posts.map(post => post.slug)
}
