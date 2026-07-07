import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const MAINTENANCE_PATH = '/maintenance'
const MAINTENANCE_MODE_VALUE = process.env.PROCHAT_MAINTENANCE_MODE ?? '1'

const PUBLIC_FILE_PATTERN = /\.[^/]+$/

function isMaintenanceModeEnabled() {
  const normalizedValue = MAINTENANCE_MODE_VALUE.trim().toLowerCase()

  return !['0', 'false', 'off', 'no'].includes(normalizedValue)
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
 * Temporary full-site maintenance lock.
 *
 * All public routes are redirected to /maintenance while static assets,
 * Next.js internals, public metadata files, and API routes remain available.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

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
