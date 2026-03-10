export type ContentSection =
  | 'blog'
  | 'docs'
  | 'glossary'
  | 'playbooks'
  | 'prompts'
  | 'snippets'
  | 'guides'

export type ContentSchemaType = 'article' | 'glossary' | 'howTo'

export type ContentRouteMode = 'single' | 'nested'

export type ContentEntry = {
  section: ContentSection
  title: string
  description: string
  slug: string
  frontmatterSlug?: string
  routeSegments: string[]
  category?: string
  tags: string[]
  keywords: string[]
  order?: number
  date: string
  updated?: string
  author: string
  metaTitle?: string
  metaDescription?: string
  ogImage: string
  primaryKeyword?: string
  content: string
  readingTimeMinutes: number
  excerpt: string
  urlPath: string
  schemaType: ContentSchemaType
  rawFrontmatter: Record<string, unknown>
}
