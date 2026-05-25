import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * ProChat runtime auth is not enforced yet.
 *
 * Ory is the intended auth direction, but middleware intentionally stays
 * pass-through until Ory session validation is implemented here.
 */
export function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  // Skip static assets and public docs; reduces latency for public navigation.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|docs|docs/.*).*)'],
}
