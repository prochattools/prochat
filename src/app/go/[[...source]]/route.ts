import { NextRequest, NextResponse } from 'next/server'
import { normalizeSource, SourceSlug } from '../source'

const MAX_AGE = 60 * 60 * 24 * 30

const HOST = 'prochat.tools'

function buildPublicUrl(request: NextRequest, path: string) {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = forwardedHost || request.headers.get('host') || request.nextUrl.host
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const rawProto = forwardedProto || request.nextUrl.protocol || 'https'
  const protocol = rawProto.replace(/:$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${protocol}://${host}${normalizedPath}`
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
  const source: SourceSlug = explicitSource ?? 'direct'

  const redirectUrl = new URL(buildPublicUrl(request, '/starting-point'))
  redirectUrl.searchParams.set('src', source)
  const response = NextResponse.redirect(redirectUrl, 307)
  setTrackingCookies(response, source, process.env.NODE_ENV === 'production')

  return response
}
