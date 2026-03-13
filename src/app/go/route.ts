import { NextRequest, NextResponse } from 'next/server'
import { resolveSource } from './source'

export function GET(request: NextRequest) {
  const source = resolveSource(request)
  const redirectUrl = new URL(`/starting-point?src=${source}`, request.url)
  return NextResponse.redirect(redirectUrl, 302)
}
