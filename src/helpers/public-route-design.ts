export type PublicVisualVariant =
  | 'home'
  | 'memory'
  | 'review'
  | 'workbench'
  | 'docs'
  | 'learn'
  | 'contact'
  | 'legal'
  | 'os'
  | 'workflow'
  | 'studio'
  | 'kits'
  | 'proof'
  | 'prompts'
  | 'waitlist'

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

  if (path === '/docs/learn') return { variant: 'learn' }
  if (path.startsWith('/docs/learn/production-guide')) return { variant: 'learn', contentOwnsMain: true }
  if (path.startsWith('/docs/learn/saas-starting-point')) return { variant: 'learn', contentOwnsMain: true }
  if (path === '/docs' || path.startsWith('/docs/')) return { variant: 'docs', contentOwnsMain: true }

  if (path === '/contact') return { variant: 'contact' }
  if (path === '/privacy' || path === '/terms') return { variant: 'legal' }

  if (path === '/systems/prochat-os' || path === '/buildflow') return { variant: 'os' }
  if (path === '/ai-workflows') return { variant: 'workflow' }
  if (path === '/studio') return { variant: 'studio', contentOwnsMain: true }

  if (path === '/kits' || path.startsWith('/kits/')) {
    if (path.endsWith('/finish')) return null
    return { variant: 'kits' }
  }

  if (path === '/proof') return { variant: 'proof', contentOwnsMain: true }
  if (path === '/prompts') return { variant: 'prompts' }
  if (path.startsWith('/prompts/')) return { variant: 'prompts', contentOwnsMain: true }
  if (path === '/waitlist') return { variant: 'waitlist', contentOwnsMain: true }

  return null
}
