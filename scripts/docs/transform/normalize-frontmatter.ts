export type NormalizedFrontmatter = {
  title: string
  description: string
  category: string
  slug: string
  order: number
  keywords: string[]
  [key: string]: unknown
}

type NormalizeOptions = {
  slug: string
  category: string
  titleFallback?: string
  descriptionFallback?: string
  orderFallback?: number
  keywordsFallback?: string[]
}

function asString(value?: unknown) {
  if (typeof value === 'string' && value.trim()) {
    return value.trim()
  }
  return undefined
}

function asNumber(value?: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.round(value)
  }
  if (typeof value === 'string') {
    const parsed = Number(value.trim())
    if (Number.isFinite(parsed)) {
      return Math.round(parsed)
    }
  }
  return undefined
}

function parseKeywords(value?: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(item => String(item).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(/[|,;]+/)
      .map(item => item.trim())
      .filter(Boolean)
  }

  return []
}

function humanize(text: string) {
  return text
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim()
}

export function normalizeFrontmatter(
  frontmatter: Record<string, unknown>,
  opts: NormalizeOptions,
): NormalizedFrontmatter {
  const slug = asString(frontmatter.slug) || opts.slug
  const title = asString(frontmatter.title) || opts.titleFallback || humanize(slug)
  const category = asString(frontmatter.category) || opts.category
  const description =
    asString(frontmatter.description) ||
    opts.descriptionFallback ||
    `Documentation for ${title}.`
  const order =
    asNumber(frontmatter.order) ?? opts.orderFallback ?? 100
  const keywords = [
    ...new Set(
      [
        ...parseKeywords(frontmatter.keywords),
        ...(opts.keywordsFallback || []),
        title,
        category,
      ]
        .map(item => item.trim())
        .filter(Boolean),
    ),
  ]

  return {
    ...frontmatter,
    title,
    description,
    category,
    slug,
    order,
    keywords,
  }
}
