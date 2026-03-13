import { NextRequest, NextResponse } from 'next/server'
import { normalizeSource, resolveSource } from '../source'

export function GET(request: NextRequest, { params }: { params: { source?: string } }) {
  const pathSource = normalizeSource(params.source)
  const source = pathSource ?? resolveSource(request)
  const destination = new URL('/starting-point', request.url)
  destination.searchParams.set('src', source)
  return NextResponse.redirect(destination, 302)
}
