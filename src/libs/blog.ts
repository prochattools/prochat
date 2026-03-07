import { getSectionEntries } from '@/lib/content'

export type BlogCluster =
  | 'Build SaaS with AI'
  | 'Next.js SaaS Infrastructure'
  | 'Founder Execution'

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  updated?: string
  author?: string
  cluster?: BlogCluster
  tags?: string[]
  takeaways?: string[]
  primaryKeyword?: string
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: string
  content: string
  readingTimeMinutes: number
}

let allPostsPromise: Promise<BlogPost[]> | null = null

function parseList(value?: string) {
  return (value || '')
    .split(/[|;,]/)
    .map(item => item.trim())
    .filter(Boolean)
}

function mapEntryToBlogPost(entry: Awaited<ReturnType<typeof getSectionEntries>>[number]): BlogPost {
  return {
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    date: entry.date,
    updated: entry.updated,
    author: entry.author,
    cluster: (entry.rawFrontmatter.cluster as BlogCluster) || undefined,
    tags: entry.tags,
    takeaways: parseList(entry.rawFrontmatter.takeaways || entry.rawFrontmatter.summary),
    primaryKeyword: entry.primaryKeyword,
    metaTitle: entry.metaTitle,
    metaDescription: entry.metaDescription,
    keywords: entry.keywords,
    ogImage: entry.ogImage,
    content: entry.content,
    readingTimeMinutes: entry.readingTimeMinutes,
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!allPostsPromise) {
    allPostsPromise = getSectionEntries('blog').then(entries =>
      entries.map(mapEntryToBlogPost),
    )
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
