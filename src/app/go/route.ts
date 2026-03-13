import { NextRequest, NextResponse } from 'next/server'
import { resolveSource } from './source'

export function GET(request: NextRequest) {
  const source = resolveSource(request)
  const destination = new URL('/starting-point', request.url)
  destination.searchParams.set('src', source)
  return NextResponse.redirect(destination, 302)
}
