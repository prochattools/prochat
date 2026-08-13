export type ShellRouteClass =
  | 'canonical_public_shell'
  | 'protected_internal_shell'
  | 'temporary_legacy_compatibility'
  | 'no_shared_shell'

type ShellRouteDefinition = {
  routeId: `ROUTE-${string}`
  sourcePattern: string
  runtimePattern: string | null
  shellClass: ShellRouteClass
}

export const CURRENT_CANONICAL_VISUAL_ROUTES = [
  '/',
  '/memory',
  '/memory-qa',
  '/workbench',
  '/docs',
  '/contact',
  '/privacy',
  '/terms',
] as const

export const FUTURE_CANONICAL_VISUAL_ROUTES = [] as const

export const SHELL_ROUTE_DEFINITIONS: readonly ShellRouteDefinition[] = [
  { routeId: 'ROUTE-001', sourcePattern: '/', runtimePattern: '/', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-002', sourcePattern: '/prochat-memory', runtimePattern: '/prochat-memory', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-003', sourcePattern: '/qa-memory', runtimePattern: '/qa-memory', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-004', sourcePattern: '/contact', runtimePattern: '/contact', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-005', sourcePattern: '/privacy', runtimePattern: '/privacy', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-006', sourcePattern: '/terms', runtimePattern: '/terms', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-007', sourcePattern: '/docs', runtimePattern: '/docs', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-009', sourcePattern: 'global 404', runtimePattern: null, shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-010', sourcePattern: 'global error', runtimePattern: null, shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-012', sourcePattern: '/memory', runtimePattern: '/memory', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-013', sourcePattern: '/memory-qa', runtimePattern: '/memory-qa', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-014', sourcePattern: '/workbench', runtimePattern: '/workbench', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-017', sourcePattern: '/buildflow', runtimePattern: '/workbench', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-018', sourcePattern: '/systems/prochat-os', runtimePattern: '/workbench', shellClass: 'temporary_legacy_compatibility' },
  // ROUTE-019 (/systems/events) — removed per PXF-018H Item 19 (zero repository consumers)
  { routeId: 'ROUTE-030', sourcePattern: '/waitlist', runtimePattern: '/contact', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-031', sourcePattern: '/waiting-list', runtimePattern: '/contact', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-032', sourcePattern: '/book', runtimePattern: '/contact', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-034', sourcePattern: '/starting-point', runtimePattern: '/workbench', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-038', sourcePattern: '/blog', runtimePattern: '/docs', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-042', sourcePattern: '/waas/accountants', runtimePattern: '/workbench', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-043', sourcePattern: '/privacy-policy', runtimePattern: '/privacy-policy', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-044', sourcePattern: '/tos', runtimePattern: '/tos', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-045', sourcePattern: '/admin', runtimePattern: '/admin', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-047', sourcePattern: '/admin/og', runtimePattern: '/admin/og', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-048', sourcePattern: '/admin/waitlist', runtimePattern: '/admin/waitlist', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-050', sourcePattern: '/chat/[projectID]', runtimePattern: '/chat/[projectID]', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-051', sourcePattern: '/preferences', runtimePattern: '/preferences', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-052', sourcePattern: '/sign-in/[[...sign-in]]', runtimePattern: '/sign-in/[[...sign-in]]', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-053', sourcePattern: '/sign-up/[[...sign-up]]', runtimePattern: '/sign-up/[[...sign-up]]', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-056', sourcePattern: '/maintenance', runtimePattern: '/maintenance', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-057', sourcePattern: '/debug/analytics', runtimePattern: '/debug/analytics', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-057b', sourcePattern: '/debug/home-v2', runtimePattern: '/debug/home-v2', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-058', sourcePattern: '/unsubscribe', runtimePattern: '/unsubscribe', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-059', sourcePattern: '/api/contact', runtimePattern: '/api/contact', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-060', sourcePattern: '/api/health', runtimePattern: '/api/health', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-061', sourcePattern: '/api/preferences', runtimePattern: '/api/preferences', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-062', sourcePattern: '/api/projects', runtimePattern: '/api/projects', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-063', sourcePattern: '/api/tenants/projects', runtimePattern: '/api/tenants/projects', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-070', sourcePattern: '/api/waitlist', runtimePattern: '/api/waitlist', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-071', sourcePattern: '/api/waiting-list', runtimePattern: '/api/waiting-list', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-073', sourcePattern: '/api/(make)/active', runtimePattern: '/api/active', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-074', sourcePattern: '/api/(make)/link', runtimePattern: '/api/link', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-075', sourcePattern: '/api/(make)/scenarios', runtimePattern: '/api/scenarios', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-076', sourcePattern: '/api/(make)/scenarios/openAIAssistant', runtimePattern: '/api/scenarios/openAIAssistant', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-077', sourcePattern: '/api/(n8n)/workflows/openAIAssistant', runtimePattern: '/api/workflows/openAIAssistant', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-078', sourcePattern: '/api/social/next', runtimePattern: '/api/social/next', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-079', sourcePattern: '/api/social/mark-posted', runtimePattern: '/api/social/mark-posted', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-080', sourcePattern: '/social', runtimePattern: '/social', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-081', sourcePattern: '/go', runtimePattern: '/go', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-082', sourcePattern: '/og', runtimePattern: '/og', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-083', sourcePattern: '/blog/[slug]/og', runtimePattern: '/blog/[slug]/og', shellClass: 'no_shared_shell' },
] as const

function normalizePathname(pathname: string) {
  const withoutQuery = pathname.split(/[?#]/, 1)[0] || '/'
  if (withoutQuery === '/') return '/'
  return withoutQuery.replace(/\/+$/, '') || '/'
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function routeTemplateToRegExp(template: string) {
  if (template === '/') return /^\/$/

  const segments = template.split('/').filter(Boolean)
  let source = '^'

  for (const segment of segments) {
    if (segment.startsWith('[[...') && segment.endsWith(']]')) {
      source += '(?:/.*)?'
    } else if (segment.startsWith('[...') && segment.endsWith(']')) {
      source += '/.+'
    } else if (segment.startsWith('[') && segment.endsWith(']')) {
      source += '/[^/]+'
    } else {
      source += `/${escapeRegExp(segment)}`
    }
  }

  return new RegExp(`${source}$`)
}

const RUNTIME_MATCHERS = SHELL_ROUTE_DEFINITIONS.flatMap(definition =>
  definition.runtimePattern
    ? [{ definition, matcher: routeTemplateToRegExp(definition.runtimePattern) }]
    : [],
)

export function getShellRouteDefinition(pathname: string) {
  const normalizedPathname = normalizePathname(pathname)
  return (
    RUNTIME_MATCHERS.find(({ matcher }) => matcher.test(normalizedPathname))
      ?.definition ?? null
  )
}

export function getShellRouteClass(pathname: string): ShellRouteClass {
  return (
    getShellRouteDefinition(pathname)?.shellClass ??
    'temporary_legacy_compatibility'
  )
}

export function isCurrentCanonicalVisualShellPath(pathname: string) {
  const normalizedPathname = normalizePathname(pathname)
  return CURRENT_CANONICAL_VISUAL_ROUTES.some(
    route => normalizedPathname === route,
  )
}

export function isFutureCanonicalVisualShellPath(pathname: string) {
  const normalizedPathname = normalizePathname(pathname)
  return FUTURE_CANONICAL_VISUAL_ROUTES.some(
    route => normalizedPathname === route,
  )
}

export function isCurrentDocsShellPath(pathname: string) {
  const normalizedPathname = normalizePathname(pathname)
  return (
    normalizedPathname === '/docs' || normalizedPathname.startsWith('/docs/')
  )
}
