import { NextRequest, NextResponse } from 'next/server'
import { normalizeSource, SourceSlug } from '../source'

const MAX_AGE = 60 * 60 * 24 * 30

const HOST = 'prochat.tools'

function buildRedirectUrl(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = forwardedHost || request.headers.get('host') || HOST
  const proto = request.headers.get('x-forwarded-proto') || 'https'
  return `${proto}://${host}/starting-point`
}

function setTrackingCookies(response: NextResponse, source: SourceSlug | null, secure: boolean) {
  const cookieOptions = {
    path: '/',
    maxAge: MAX_AGE,
    httpOnly: false,
    sameSite: 'lax' as const,
    secure,
  }
  if (source) {
    response.cookies.set('pc_source', source, cookieOptions)
  }
  response.cookies.set('pc_entry', 'go', cookieOptions)
  response.cookies.set('pc_campaign', 'lead-magnet', cookieOptions)
}

export function GET(
  request: NextRequest,
  { params }: { params: { source?: string[] } },
) {
  const explicitSource = normalizeSource(params.source?.[0])
  const source: SourceSlug | null = explicitSource ?? null

  const redirectUrl = buildRedirectUrl(request)
  const response = NextResponse.redirect(redirectUrl, 307)
  setTrackingCookies(response, source, process.env.NODE_ENV === 'production')

  return response
}
