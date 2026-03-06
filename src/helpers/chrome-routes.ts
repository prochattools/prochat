export const CHROMELESS_ROUTES = ['/starting-point']
export const FULLSCREEN_ROUTES = ['/saas-glossary']

export function isChromelessPath(pathname: string) {
  return CHROMELESS_ROUTES.some(route => pathname === route || pathname.startsWith(`${route}/`))
}

export function isFullscreenPath(pathname: string) {
  return FULLSCREEN_ROUTES.some(route => pathname === route)
}
