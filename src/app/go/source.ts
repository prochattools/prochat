export type SourceSlug = 'twitter' | 'linkedin' | 'reddit' | 'youtube' | 'direct'

const SOURCE_SET = new Set<SourceSlug>(['twitter', 'linkedin', 'reddit', 'youtube', 'direct'])

export function normalizeSource(value: string | null | undefined): SourceSlug | null {
  if (typeof value !== 'string') return null
  const candidate = value.toLowerCase()
  if (SOURCE_SET.has(candidate as SourceSlug)) {
    return candidate as SourceSlug
  }
  return null
}
