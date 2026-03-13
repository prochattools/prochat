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

const REFERER_MAP: Record<string, SourceSlug> = {
  'twitter.com': 'twitter',
  't.co': 'twitter',
  'linkedin.com': 'linkedin',
  'reddit.com': 'reddit',
  'youtube.com': 'youtube',
}

export function sourceFromReferer(referrer: string | null | undefined): SourceSlug | null {
  if (!referrer) return null
  try {
    const url = new URL(referrer)
    const normalizedHost = url.hostname.toLowerCase()
    const match = Object.keys(REFERER_MAP).find(host => normalizedHost === host || normalizedHost.endsWith(`.${host}`))
    return match ? REFERER_MAP[match] : null
  } catch {
    return null
  }
}
