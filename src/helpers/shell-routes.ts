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
  '/docs/*',
  '/contact',
  '/privacy',
  '/terms',
] as const

export const FUTURE_CANONICAL_VISUAL_ROUTES = ['/philosophy', '/about'] as const

export const SHELL_ROUTE_DEFINITIONS: readonly ShellRouteDefinition[] = [
  { routeId: 'ROUTE-001', sourcePattern: '/', runtimePattern: '/', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-002', sourcePattern: '/prochat-memory', runtimePattern: '/prochat-memory', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-003', sourcePattern: '/qa-memory', runtimePattern: '/qa-memory', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-004', sourcePattern: '/contact', runtimePattern: '/contact', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-005', sourcePattern: '/privacy', runtimePattern: '/privacy', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-006', sourcePattern: '/terms', runtimePattern: '/terms', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-007', sourcePattern: '/docs', runtimePattern: '/docs', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-008', sourcePattern: '/docs/[category]/[[...slug]]', runtimePattern: '/docs/[category]/[[...slug]]', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-009', sourcePattern: 'global 404', runtimePattern: null, shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-010', sourcePattern: 'global error', runtimePattern: null, shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-011', sourcePattern: 'docs 404', runtimePattern: null, shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-012', sourcePattern: '/memory', runtimePattern: '/memory', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-013', sourcePattern: '/memory-qa', runtimePattern: '/memory-qa', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-014', sourcePattern: '/workbench', runtimePattern: '/workbench', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-015', sourcePattern: 'missing /philosophy', runtimePattern: '/philosophy', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-016', sourcePattern: 'missing /about', runtimePattern: '/about', shellClass: 'canonical_public_shell' },
  { routeId: 'ROUTE-017', sourcePattern: '/buildflow', runtimePattern: '/buildflow', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-018', sourcePattern: '/systems/prochat-os', runtimePattern: '/systems/prochat-os', shellClass: 'temporary_legacy_compatibility' },
  // ROUTE-019 (/systems/events) — removed per PXF-018H Item 19 (zero repository consumers)
  { routeId: 'ROUTE-020', sourcePattern: '/ai-workflows', runtimePattern: '/ai-workflows', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-021', sourcePattern: '/legal-ai-workflows', runtimePattern: '/legal-ai-workflows', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-022', sourcePattern: '/studio', runtimePattern: '/studio', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-023', sourcePattern: '/kits', runtimePattern: '/kits', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-024', sourcePattern: '/kits/prokit', runtimePattern: '/kits/prokit', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-025', sourcePattern: '/kits/prokit/finish', runtimePattern: '/kits/prokit/finish', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-026', sourcePattern: '/kits/saaskit', runtimePattern: '/kits/saaskit', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-027', sourcePattern: '/kits/saaskit/finish', runtimePattern: '/kits/saaskit/finish', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-028', sourcePattern: '/kits/uxkit', runtimePattern: '/kits/uxkit', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-029', sourcePattern: '/kits/waaskit', runtimePattern: '/kits/waaskit', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-030', sourcePattern: '/waitlist', runtimePattern: '/waitlist', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-031', sourcePattern: '/waiting-list', runtimePattern: '/waiting-list', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-032', sourcePattern: '/book', runtimePattern: '/contact', shellClass: 'temporary_legacy_compatibility' }, // PXF-018A Item 2: consolidated to /contact
  { routeId: 'ROUTE-033', sourcePattern: '/proof', runtimePattern: '/proof', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-034', sourcePattern: '/starting-point', runtimePattern: '/starting-point', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-035', sourcePattern: '/docs/learn', runtimePattern: '/docs/learn', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-036', sourcePattern: '/docs/learn/production-guide', runtimePattern: '/docs/learn/production-guide', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-037', sourcePattern: '/docs/learn/saas-starting-point', runtimePattern: '/docs/learn/saas-starting-point', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-038', sourcePattern: '/blog', runtimePattern: '/blog', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-039', sourcePattern: '/blog/[slug]', runtimePattern: '/blog/[slug]', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-040', sourcePattern: '/prompts', runtimePattern: '/prompts', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-041', sourcePattern: '/prompts/[category]/[slug]', runtimePattern: '/prompts/[category]/[slug]', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-042', sourcePattern: '/waas/accountants', runtimePattern: '/waas/accountants', shellClass: 'temporary_legacy_compatibility' },
  { routeId: 'ROUTE-043', sourcePattern: '/privacy-policy', runtimePattern: '/privacy-policy', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-044', sourcePattern: '/tos', runtimePattern: '/tos', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-045', sourcePattern: '/admin', runtimePattern: '/admin', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-046', sourcePattern: '/admin/licenses', runtimePattern: '/admin/licenses', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-047', sourcePattern: '/admin/og', runtimePattern: '/admin/og', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-048', sourcePattern: '/admin/waitlist', runtimePattern: '/admin/waitlist', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-049', sourcePattern: '/dashboard', runtimePattern: '/dashboard', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-050', sourcePattern: '/chat/[projectID]', runtimePattern: '/chat/[projectID]', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-051', sourcePattern: '/preferences', runtimePattern: '/preferences', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-052', sourcePattern: '/sign-in/[[...sign-in]]', runtimePattern: '/sign-in/[[...sign-in]]', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-053', sourcePattern: '/sign-up/[[...sign-up]]', runtimePattern: '/sign-up/[[...sign-up]]', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-054', sourcePattern: '/processing-page/[[...processing-page]]', runtimePattern: '/processing-page/[[...processing-page]]', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-055', sourcePattern: '/success', runtimePattern: '/success', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-056', sourcePattern: '/maintenance', runtimePattern: '/maintenance', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-057', sourcePattern: '/debug/analytics', runtimePattern: '/debug/analytics', shellClass: 'protected_internal_shell' },
  { routeId: 'ROUTE-058', sourcePattern: '/unsubscribe', runtimePattern: '/unsubscribe', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-059', sourcePattern: '/api/contact', runtimePattern: '/api/contact', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-060', sourcePattern: '/api/health', runtimePattern: '/api/health', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-061', sourcePattern: '/api/preferences', runtimePattern: '/api/preferences', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-062', sourcePattern: '/api/projects', runtimePattern: '/api/projects', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-063', sourcePattern: '/api/tenants/projects', runtimePattern: '/api/tenants/projects', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-064', sourcePattern: '/api/subscription', runtimePattern: '/api/subscription', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-065', sourcePattern: '/api/stripe/create-checkout', runtimePattern: '/api/stripe/create-checkout', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-066', sourcePattern: '/api/stripe/create-portal', runtimePattern: '/api/stripe/create-portal', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-067', sourcePattern: '/api/webhook/stripe', runtimePattern: '/api/webhook/stripe', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-068', sourcePattern: '/api/store/prokit/claim', runtimePattern: '/api/store/prokit/claim', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-069', sourcePattern: '/api/store/saaskit/claim', runtimePattern: '/api/store/saaskit/claim', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-070', sourcePattern: '/api/waitlist', runtimePattern: '/api/waitlist', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-071', sourcePattern: '/api/waiting-list', runtimePattern: '/api/waiting-list', shellClass: 'no_shared_shell' },
  { routeId: 'ROUTE-072', sourcePattern: '/api/mailerlite/subscribe', runtimePattern: '/api/mailerlite/subscribe', shellClass: 'no_shared_shell' },
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
  { routeId: 'ROUTE-084', sourcePattern: '/admin/licenses/revoke', runtimePattern: '/admin/licenses/revoke', shellClass: 'protected_internal_shell' },
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
