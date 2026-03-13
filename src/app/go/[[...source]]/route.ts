import { NextRequest, NextResponse } from 'next/server'
import { deriveSourceFromReferer, normalizeSource, SourceSlug, VALID_SOURCES } from '../source'

const MAX_AGE = 60 * 30

function buildRedirectUrl(request: NextRequest) {
  const host =
    request.headers.get('x-forwarded-host') || request.headers.get('host') || 'prochat.tools'
  const protocol = 'https'
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
  const pathSource = normalizeSource(params.source?.[0])
  const source: SourceSlug = pathSource ?? deriveSourceFromReferer(request)

  const redirectUrl = buildRedirectUrl(request)
  const response = NextResponse.redirect(redirectUrl, 302)
  setTrackingCookies(response, source, request.nextUrl.protocol === 'https')

  return response
}
