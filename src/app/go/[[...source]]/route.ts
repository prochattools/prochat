import { NextRequest, NextResponse } from 'next/server'
import { normalizeSource, SourceSlug, sourceFromReferer } from '../source'

const MAX_AGE = 60 * 60 * 24 * 30

const HOST = 'prochat.tools'

function buildRedirectUrl(request: NextRequest) {
  const host =
    request.headers.get('x-forwarded-host') || request.headers.get('host') || HOST
  const protocol = request.nextUrl.protocol || 'https'
  // Keep the redirect clean; the source travels via cookie only.
  return `${protocol}://${host}/starting-point`
}

function setTrackingCookies(response: NextResponse, source: SourceSlug, secure: boolean) {
  const cookieOptions = {
    path: '/',
    maxAge: MAX_AGE,
    httpOnly: false,
    sameSite: 'lax' as const,
    secure,
  }
  response.cookies.set('pc_source', source, cookieOptions)
  response.cookies.set('pc_entry', 'go', cookieOptions)
  response.cookies.set('pc_campaign', 'lead-magnet', cookieOptions)
}

export function GET(
  request: NextRequest,
  { params }: { params: { source?: string[] } },
) {
  const explicitSource = normalizeSource(params.source?.[0])
  const referrerHeader = request.headers.get('referer') || request.headers.get('referrer')
  const referrerSource = sourceFromReferer(referrerHeader)
  const source: SourceSlug = explicitSource ?? referrerSource ?? 'direct'

  const redirectUrl = buildRedirectUrl(request)
  const response = NextResponse.redirect(redirectUrl, 307)
  setTrackingCookies(response, source, request.nextUrl.protocol === 'https')

  return response
}
