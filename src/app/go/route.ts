import { NextRequest, NextResponse } from 'next/server'
import { resolveSource } from './source'

export function GET(request: NextRequest) {
  const source = resolveSource(request)
  const host =
    (request.headers.get('x-forwarded-host') || request.headers.get('host')) ?? 'prochat.tools'
  const protocol = 'https'
  const redirectUrl = `${protocol}://${host}/starting-point?src=${source}`
  return NextResponse.redirect(redirectUrl, 302)
}
