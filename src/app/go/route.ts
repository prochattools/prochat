import { NextRequest, NextResponse } from 'next/server'
import { normalizeSource, SourceSlug, sourceFromReferrerString } from './source'

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

export function GET(request: NextRequest) {
  const explicitSource = normalizeSource(request.nextUrl.searchParams.get('src'))
  const refererHeader = request.headers.get('referer') || request.headers.get('referrer')
  const source: SourceSlug = explicitSource
    ? explicitSource
    : refererHeader
    ? sourceFromReferrerString(refererHeader)
    : 'direct'

  const forwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host')
  const host = forwardedHost || request.nextUrl.host
  const scheme = request.nextUrl.protocol === 'https:' ? 'https' : 'http'
  const queryParams = new URLSearchParams(request.nextUrl.search)
  if (!queryParams.has('src')) {
    queryParams.set('src', source)
  }
  const searchString = queryParams.toString()
  const redirectUrl = `${scheme}://${host}/kits/saaskit${searchString ? `?${searchString}` : ''}`
  const response = NextResponse.redirect(redirectUrl, 307)
  setTrackingCookies(response, source, process.env.NODE_ENV === 'production')
  return response
}
