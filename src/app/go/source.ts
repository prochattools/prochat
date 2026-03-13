export type SourceSlug = 'twitter' | 'linkedin' | 'reddit' | 'youtube' | 'direct'

const SOURCE_SET = new Set<SourceSlug>(['twitter', 'linkedin', 'reddit', 'youtube', 'direct'])

const REFERRER_MAP: Record<string, SourceSlug> = {
  'twitter.com': 'twitter',
  't.co': 'twitter',
  'linkedin.com': 'linkedin',
  'reddit.com': 'reddit',
  'youtube.com': 'youtube',
}

export function normalizeSource(value: string | null | undefined): SourceSlug | null {
  if (typeof value !== 'string') return null
  const candidate = value.toLowerCase()
  if (SOURCE_SET.has(candidate as SourceSlug)) {
    return candidate as SourceSlug
  }
  return null
}

export function sourceFromReferrerString(referrer: string | null | undefined): SourceSlug {
  if (!referrer) return 'direct'
  try {
    const url = new URL(referrer)
    const normalizedHost = url.hostname.toLowerCase()
    const match = Object.keys(REFERRER_MAP).find(
      host => normalizedHost === host || normalizedHost.endsWith(`.${host}`),
    )
    return match ? REFERRER_MAP[match] : 'direct'
  } catch (error) {
    return 'direct'
  }
}

export function resolveStartingPointSource({
  cookieSource,
  referrer,
}: {
  cookieSource: string | null
  referrer: string
}): SourceSlug {
  const explicit = normalizeSource(cookieSource)
  if (explicit) {
    return explicit
  }
  const referrerSource = sourceFromReferrerString(referrer)
  if (referrerSource) {
    return referrerSource
  }
  return 'direct'
}
