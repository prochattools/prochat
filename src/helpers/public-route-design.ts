export type PublicVisualVariant =
  | 'home'
  | 'docs'
  | 'contact'
  | 'legal'

type PublicRouteDesignConfig = {
  variant: PublicVisualVariant
  contentOwnsMain?: boolean
  contentOwnsShell?: boolean
}

function normalize(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0] || '/'
  if (path === '/') return '/'
  return path.replace(/\/+$/, '') || '/'
}

export function getUnifiedPublicRouteConfig(pathname: string): PublicRouteDesignConfig | null {
  const path = normalize(pathname)

  if (path === '/') return { variant: 'home', contentOwnsShell: true }
  if (path === '/docs') return { variant: 'docs', contentOwnsMain: true, contentOwnsShell: true }
  if (path === '/contact') return { variant: 'contact', contentOwnsShell: true }
  if (path === '/privacy' || path === '/terms') return { variant: 'legal', contentOwnsShell: true }
  if (path === '/starting-point' || path === '/waas/accountants') {
    return { variant: 'docs', contentOwnsMain: true, contentOwnsShell: true }
  }

  return null
}
