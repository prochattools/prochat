import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const MAINTENANCE_PATH = '/maintenance'
const MAINTENANCE_MODE_VALUE = process.env.PROCHAT_MAINTENANCE_MODE ?? '1'

const PUBLIC_FILE_PATTERN = /\.[^/]+$/
const DEBUG_PATTERN = /^\/debug(?:\/|$)/

function isMaintenanceModeEnabled() {
  const normalizedValue = MAINTENANCE_MODE_VALUE.trim().toLowerCase()

  return !['0', 'false', 'off', 'no'].includes(normalizedValue)
}

function isDevelopmentEnvironment() {
  const nodeEnv = (process.env.NODE_ENV ?? 'production').trim().toLowerCase()
  return nodeEnv === 'development'
}

function shouldBypassMaintenance(pathname: string) {
  return (
    pathname === MAINTENANCE_PATH ||
    pathname.startsWith(`${MAINTENANCE_PATH}/`) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname === '/manifest.webmanifest' ||
    pathname === '/site.webmanifest' ||
    PUBLIC_FILE_PATTERN.test(pathname)
  )
}

/**
 * Middleware for maintenance mode and development-only route protection.
 *
 * - All public routes are redirected to /maintenance while static assets,
 *   Next.js internals, public metadata files, and API routes remain available.
 * - Debug routes (/debug, /debug/analytics) are accessible only in development;
 *   production requests return 404 (PXF-018G: Items 14, 15).
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // PXF-018G: Items 14–15 — Gate /debug routes to development environment only
  if (DEBUG_PATTERN.test(pathname) && !isDevelopmentEnvironment()) {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 })
  }

  if (!isMaintenanceModeEnabled() || shouldBypassMaintenance(pathname)) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = MAINTENANCE_PATH
  url.search = ''

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|_next/data).*)'],
}
