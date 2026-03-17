export type TaxonomyItem = {
  slug: string
  label: string
  description?: string
}

export const categories: TaxonomyItem[] = [
  { slug: 'strategy', label: 'Strategy' },
  { slug: 'foundations', label: 'Foundations' },
  { slug: 'validation', label: 'Validation' },
  { slug: 'founder-ops', label: 'Founder Ops' },
  { slug: 'nextjs', label: 'Next.js' },
  { slug: 'metrics', label: 'Metrics' },
  { slug: 'infrastructure', label: 'Infrastructure' },
]

export const tags: TaxonomyItem[] = [
  { slug: 'seo-architecture', label: 'SEO Architecture' },
  { slug: 'saas-builders', label: 'SaaS Builders' },
  { slug: 'founder-ops', label: 'Founder Ops' },
  { slug: 'validation', label: 'Validation' },
  { slug: 'prompts', label: 'Prompts' },
]

function normalize(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function toTaxonomySlug(value: string) {
  return normalize(value)
}

export function getCategory(value?: string | null) {
  if (!value) return null
  const slug = normalize(value)
  return categories.find(item => item.slug === slug) || { slug, label: value }
}

export function getTag(value?: string | null) {
  if (!value) return null
  const slug = normalize(value)
  return tags.find(item => item.slug === slug) || { slug, label: value }
}

export function mapTags(values: string[] = []) {
  return values.map(value => getTag(value)).filter(Boolean) as TaxonomyItem[]
}
