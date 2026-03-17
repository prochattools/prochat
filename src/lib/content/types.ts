export type ContentSection =
  | 'docs'
  | 'prompts'

export type ContentSchemaType = 'article' | 'howTo'

export type ContentRouteMode = 'nested'

export type ContentEntry = {
  section: ContentSection
  sourcePath: string
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
  ogImage?: string
  ogLine1?: string
  ogLine2?: string
  ogSubtitle?: string
  primaryKeyword?: string
  content: string
  readingTimeMinutes: number
  excerpt: string
  urlPath: string
  schemaType: ContentSchemaType
  rawFrontmatter: Record<string, unknown>
}
