import type { NextRequest } from 'next/server'

export type SourceSlug = 'twitter' | 'linkedin' | 'reddit' | 'youtube' | 'direct'

export const VALID_SOURCES: SourceSlug[] = ['twitter', 'linkedin', 'reddit', 'youtube', 'direct']
const SOURCE_SET = new Set(VALID_SOURCES)

export function normalizeSource(value: string | null | undefined): SourceSlug | null {
  if (!value) return null
  const candidate = value.toLowerCase()
  return SOURCE_SET.has(candidate as SourceSlug) ? (candidate as SourceSlug) : null
}

export function deriveSourceFromReferer(request: NextRequest): SourceSlug {
  const referer = request.headers.get('referer')?.toLowerCase() || ''
  if (referer.includes('twitter.com') || referer.includes('x.com')) return 'twitter'
  if (referer.includes('linkedin.com')) return 'linkedin'
  if (referer.includes('reddit.com')) return 'reddit'
  if (referer.includes('youtube.com')) return 'youtube'
  return 'direct'
}

export function resolveSource(request: NextRequest): SourceSlug {
  const querySrc = normalizeSource(request.nextUrl.searchParams.get('src'))
  if (querySrc) return querySrc
  return deriveSourceFromReferer(request)
}
