export type PublicVisualVariant =
  | 'home'
  | 'memory'
  | 'review'
  | 'workbench'
  | 'docs'
  | 'contact'
  | 'legal'

type PublicRouteDesignConfig = {
  variant: PublicVisualVariant
  contentOwnsMain?: boolean
}

function normalize(pathname: string) {
  const path = pathname.split(/[?#]/, 1)[0] || '/'
  if (path === '/') return '/'
  return path.replace(/\/+$/, '') || '/'
}

export function getUnifiedPublicRouteConfig(pathname: string): PublicRouteDesignConfig | null {
  const path = normalize(pathname)

  if (path === '/') return { variant: 'home' }
  if (path === '/memory') return { variant: 'memory' }
  if (path === '/memory-qa') return { variant: 'review' }
  if (path === '/workbench') return { variant: 'workbench' }
  if (path === '/docs') return { variant: 'docs', contentOwnsMain: true }
  if (path === '/contact') return { variant: 'contact' }
  if (path === '/privacy' || path === '/terms') return { variant: 'legal' }

  return null
}
