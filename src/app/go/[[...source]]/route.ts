import { NextRequest, NextResponse } from 'next/server'
import { normalizeSource, SourceSlug, sourceFromReferrerString } from '../source'

const MAX_AGE = 60 * 60 * 24 * 30

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
  let source: SourceSlug
  if (explicitSource) {
    source = explicitSource
  } else {
    const refererHeader = request.headers.get('referer') || request.headers.get('referrer')
    source = refererHeader ? sourceFromReferrerString(refererHeader) : 'direct'
  }

  const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host')
  const host = forwardedHost || request.nextUrl.host
  const redirectUrl = `https://${host}/starting-point?src=${source}`
  const response = NextResponse.redirect(redirectUrl, 307)
  setTrackingCookies(response, source, process.env.NODE_ENV === 'production')

  return response
}
