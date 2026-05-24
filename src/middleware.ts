import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * ProChat runtime auth is Ory-backed.
 *
 * This middleware intentionally stays pass-through until the Ory runtime
 * protection layer is implemented here. Clerk middleware is not active in
 * ProChat runtime anymore; Clerk may remain only in sold boilerplate/product
 * context where those products still use it.
 */
export function middleware(_req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  // Skip static assets and public docs; reduces latency for public navigation.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|docs|docs/.*).*)'],
}
