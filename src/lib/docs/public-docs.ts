import type { PageMapItem } from 'nextra'

import { getSectionEntries, getSectionEntry } from '@/lib/content'
import type { ContentEntry } from '@/lib/content/types'

type DocsPageItem = {
  name: string
  route: string
  title?: string
  frontMatter?: Record<string, unknown>
}

type DocsFolderItem = {
  name: string
  route: string
  children: DocsPageMapItem[]
  title?: string
}

type DocsPageMapItem = DocsPageItem | DocsFolderItem

const PUBLIC_PRODUCTS = ['prokit', 'saaskit'] as const
const PUBLIC_PRODUCT_SET = new Set<string>(PUBLIC_PRODUCTS)
const SHARED_ROUTE_OVERRIDES: Record<string, string> = {
  try: 'try-in-2-minutes',
}

let publicDocsPageMapPromise: Promise<PageMapItem[]> | null = null

function page(name: string, route: string, title: string): DocsPageItem {
  return {
    name,
    route,
    title,
    frontMatter: { title },
  }
}

function folder(
  name: string,
  title: string,
  route: string,
  children: DocsPageMapItem[],
): DocsFolderItem {
  return {
    name,
    route,
    title,
    children,
  }
}

function buildPublicSidebarMap(): DocsPageMapItem[] {
  return [
    folder('getting-started', 'Getting Started', '/docs/shared/try-in-2-minutes', [
      page('try-in-2-minutes', '/docs/shared/try-in-2-minutes', 'Try in 2 minutes'),
      page('quick-start', '/docs/shared/quick-start', 'Quick Start'),
    ]),
    folder('products', 'Products', '/docs', [
      folder('prokit', 'ProKit', '/docs/prokit', [
        page('what-you-get', '/docs/prokit/what-you-get', 'What You Get'),
        page('use-cases', '/docs/prokit/use-cases', 'Use Cases'),
        page('why-a-boilerplate', '/docs/prokit/why-a-boilerplate', 'Why a Boilerplate?'),
        page('launch-checklist', '/docs/prokit/launch-checklist', 'Launch Checklist'),
      ]),
      folder('saaskit', 'SaaSKit', '/docs/saaskit', [
        page('what-you-get', '/docs/saaskit/what-you-get', 'What You Get'),
        page('use-cases', '/docs/saaskit/use-cases', 'Use Cases'),
        page('why-a-boilerplate', '/docs/saaskit/why-a-boilerplate', 'Why a Boilerplate?'),
        page('launch-checklist', '/docs/saaskit/launch-checklist', 'Launch Checklist'),
      ]),
    ]),
    folder('core-features', 'Core Features', '/docs/features/auth', [
      page('auth', '/docs/features/auth', 'Auth'),
      page('billing', '/docs/features/billing', 'Billing'),
      page('email', '/docs/features/email', 'Email'),
      page('deployment', '/docs/features/deployment', 'Deployment'),
    ]),
    folder('advanced', 'Advanced', '/docs/shared/architecture', [
      page('architecture', '/docs/shared/architecture', 'Architecture'),
      page('configuration', '/docs/shared/configuration', 'Configuration'),
      page('integrations', '/docs/shared/integrations', 'Integrations'),
    ]),
  ]
}

export async function getPublicDocsPageMap() {
  if (!publicDocsPageMapPromise) {
    publicDocsPageMapPromise = Promise.resolve(
      buildPublicSidebarMap() as unknown as PageMapItem[],
    )
  }

  return publicDocsPageMapPromise
}

export async function getPublicDocEntry(routeSegments: string[]): Promise<ContentEntry | null> {
  const primary = await getSectionEntry('docs', routeSegments)
  if (primary) return primary

  if (routeSegments.length < 2) return null
  if (!PUBLIC_PRODUCT_SET.has(routeSegments[0])) return null

  const sharedSlug = SHARED_ROUTE_OVERRIDES[routeSegments[1]]
  if (sharedSlug) {
    const sharedEntry = await getSectionEntry('docs', ['shared', sharedSlug])
    if (sharedEntry) {
      return {
        ...sharedEntry,
        routeSegments,
        category: routeSegments[0],
        urlPath: `/docs/${routeSegments.join('/')}`,
      }
    }
  }

  const featureSegments = ['features', ...routeSegments.slice(1)]
  const fallback = await getSectionEntry('docs', featureSegments)
  if (!fallback) return null

  return {
    ...fallback,
    routeSegments,
    category: routeSegments[0],
    urlPath: `/docs/${routeSegments.join('/')}`,
  }
}

export async function getPublicDocsStaticParams() {
  const entries = await getSectionEntries('docs')

  return entries
    .filter(entry => entry.routeSegments.length > 0)
    .map(entry => ({
      category: entry.routeSegments[0],
      slug: entry.routeSegments.slice(1),
    }))
}
