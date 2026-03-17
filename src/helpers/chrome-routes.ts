export const CHROMELESS_ROUTES = ['/starting-point', '/docs']
export const FULLSCREEN_ROUTES: string[] = []
export const MINIMAL_HEADER_ROUTES = ['/kits/prokit/finish', '/kits/saaskit/finish']
export const FOOTERLESS_ROUTES = ['/kits/prokit/finish', '/kits/saaskit/finish']
export const MARKETING_SURFACE_ROUTES = [
  '/',
  '/contact',
  '/learn',
  '/proof',
  '/studio',
  '/systems/prochat-os',
  '/systems/events',
  '/waitlist',
  '/waiting-list',
  '/waas/accountants',
  '/prompts',
  '/privacy',
  '/terms',
] as const

export function isChromelessPath(pathname: string) {
  return CHROMELESS_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
}

export function isFullscreenPath(pathname: string) {
  return FULLSCREEN_ROUTES.some(route => pathname === route)
}

export function isMinimalHeaderPath(pathname: string) {
  return MINIMAL_HEADER_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
}

export function isFooterlessPath(pathname: string) {
  return FOOTERLESS_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
}

export function isMarketingSurfacePath(pathname: string) {
  return (
    pathname.startsWith('/kits') ||
    pathname.startsWith('/learn/') ||
    MARKETING_SURFACE_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
  )
}
