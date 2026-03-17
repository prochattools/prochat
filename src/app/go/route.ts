import { NextRequest, NextResponse } from 'next/server'
import { normalizeSource, SourceSlug, sourceFromReferrerString } from './source'

const MAX_AGE = 60 * 60 * 24 * 30
const SAASKIT_PATH = '/kits/saaskit'

export const dynamic = 'force-dynamic'

function requestUsesHttps(request: NextRequest) {
  const forwardedProto = request.headers
    .get('x-forwarded-proto')
    ?.split(',')[0]
    ?.trim()
    ?.toLowerCase()

  if (forwardedProto === 'https') return true
  if (forwardedProto === 'http') return false

  if (request.nextUrl.protocol === 'https:') {
    return true
  }

  const host = (request.headers.get('x-forwarded-host') || request.headers.get('host') || '')
    .split(',')[0]
    .trim()
    .toLowerCase()

  return Boolean(host) && !/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)
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
  response.cookies.set('pc_campaign', 'saaskit', cookieOptions)
}

function resolveSource(request: NextRequest): SourceSlug {
  const explicitSource = normalizeSource(request.nextUrl.searchParams.get('src'))
  const refererHeader = request.headers.get('referer') || request.headers.get('referrer')

  if (explicitSource) {
    return explicitSource
  }

  if (refererHeader) {
    return sourceFromReferrerString(refererHeader)
  }

  return 'direct'
}

function buildRedirectLocation(
  request: NextRequest,
  source: SourceSlug,
  shouldExposeSourceParam: boolean,
) {
  const queryParams = new URLSearchParams(request.nextUrl.searchParams)

  if (shouldExposeSourceParam) {
    queryParams.set('src', source)
  } else {
    queryParams.delete('src')
  }

  const searchString = queryParams.toString()

  return `${SAASKIT_PATH}${searchString ? `?${searchString}` : ''}`
}

export function GET(request: NextRequest) {
  let source: SourceSlug = 'direct'
  let location = SAASKIT_PATH

  try {
    const explicitSource = normalizeSource(request.nextUrl.searchParams.get('src'))
    source = resolveSource(request)
    location = buildRedirectLocation(request, source, Boolean(explicitSource) || source !== 'direct')
  } catch (error) {
    console.error('[go] failed to resolve redirect attribution', error)
  }

  const response = new NextResponse(null, { status: 307 })
  response.headers.set('Location', location)
  response.headers.set('Cache-Control', 'private, no-store, max-age=0')
  response.headers.set('Vary', 'host, x-forwarded-host, x-forwarded-proto, referer, referrer')
  setTrackingCookies(response, source, requestUsesHttps(request))
  return response
}
