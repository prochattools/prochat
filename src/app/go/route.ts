import { NextRequest, NextResponse } from 'next/server'

const VALID_SOURCES = new Set(['twitter', 'linkedin', 'reddit', 'youtube', 'direct'])

function deriveSource(request: NextRequest) {
  const src = request.nextUrl.searchParams.get('src')
  if (src && VALID_SOURCES.has(src)) return src

  const referer = request.headers.get('referer') || ''
  if (referer.includes('twitter.com')) return 'twitter'
  if (referer.includes('linkedin.com')) return 'linkedin'
  if (referer.includes('reddit.com')) return 'reddit'
  if (referer.includes('youtube.com')) return 'youtube'

  return 'direct'
}

export function GET(request: NextRequest) {
  const safeSrc = deriveSource(request)
  const destination = new URL('/starting-point', request.url)
  destination.searchParams.set('src', safeSrc)
  return NextResponse.redirect(destination, 302)
}
