import { promises as fs } from 'fs'
import path from 'path'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type BlogCluster =
  | 'Build SaaS with AI'
  | 'Next.js SaaS Infrastructure'
  | 'Founder Execution'

type Frontmatter = {
  title: string
  description: string
  date: string
  updated?: string
  author?: string
  cluster: BlogCluster
  keywords?: string[]
  ogImage?: string
}

export type BlogPost = Frontmatter & {
  slug: string
  content: string
  readingTimeMinutes: number
}

let allPostsPromise: Promise<BlogPost[]> | null = null

function parseFrontmatter(rawFile: string) {
  const match = rawFile.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)

  if (!match) {
    throw new Error('Missing frontmatter in blog file.')
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

  const keywords = parsed.keywords
    ? parsed.keywords.split('|').map(item => item.trim()).filter(Boolean)
    : []

  const frontmatter: Frontmatter = {
    title: parsed.title || '',
    description: parsed.description || '',
    date: parsed.date || '',
    updated: parsed.updated || undefined,
    author: parsed.author || 'Steve',
    cluster: (parsed.cluster || 'Founder Execution') as BlogCluster,
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

async function readBlogFile(fileName: string): Promise<BlogPost> {
  const fullPath = path.join(BLOG_DIR, fileName)
  const rawFile = await fs.readFile(fullPath, 'utf8')
  const slug = fileName.replace(/\.mdx$/, '')
  const { frontmatter, content } = parseFrontmatter(rawFile)

  if (!frontmatter.title || !frontmatter.description || !frontmatter.date) {
    throw new Error(`Invalid frontmatter in ${fileName}`)
  }

  return {
    ...frontmatter,
    slug,
    content,
    readingTimeMinutes: calculateReadingTimeMinutes(content),
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!allPostsPromise) {
    allPostsPromise = (async () => {
      const files = await fs.readdir(BLOG_DIR)
      const mdxFiles = files.filter(file => file.endsWith('.mdx'))
      const posts = await Promise.all(mdxFiles.map(readBlogFile))

      return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      )
    })()
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
