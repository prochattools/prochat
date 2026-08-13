export const CHROMELESS_ROUTES = ['/sign-in', '/sign-up'] as const
export const FULLSCREEN_ROUTES: readonly string[] = []
export const MINIMAL_HEADER_ROUTES: readonly string[] = []
export const FOOTERLESS_ROUTES: readonly string[] = []

export const MARKETING_SURFACE_ROUTES = [
  '/',
  '/memory',
  '/memory-qa',
  '/workbench',
  '/docs',
  '/contact',
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
  return MARKETING_SURFACE_ROUTES.some(route => pathname === route)
}
