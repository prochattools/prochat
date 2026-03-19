import type { PageMapItem } from 'nextra'

import { getSectionEntries } from '@/lib/content'
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
  frontMatter?: Record<string, unknown>
}

type DocsPageMapItem = DocsPageItem | DocsFolderItem

const PUBLIC_PRODUCTS = ['prokit', 'saaskit'] as const
const PUBLIC_PRODUCT_SET = new Set<string>(PUBLIC_PRODUCTS)
const PUBLIC_DOC_TOP_LEVEL_SEGMENTS = ['features', 'prokit', 'saaskit', 'shared'] as const
const PUBLIC_DOC_TOP_LEVEL_SET = new Set<string>(PUBLIC_DOC_TOP_LEVEL_SEGMENTS)
const PRIVATE_VISIBILITY_VALUES = new Set(['internal', 'private'])
const COLLAPSED_SECTION_PAGES = new Set(['overview', 'what-you-get'])
const HIDDEN_PUBLIC_DOC_EXACT_ROUTES = new Set([
  'prokit/README',
  'prokit/install',
  'saaskit/overview',
  'saaskit/what-you-get',
  'prokit/overview',
  'prokit/what-you-get',
  'shared/overview',
  'shared/what-you-get',
  'features/overview',
  'features/what-you-get',
])
const HIDDEN_PUBLIC_DOC_PREFIXES = ['prokit/api'] as const
const SHARED_ROUTE_OVERRIDES: Record<string, string> = {
  try: 'try-in-2-minutes',
}

let publicDocsDataPromise: Promise<PublicDocsData> | null = null

type DocsTreeNode = {
  segment: string
  routeSegments: string[]
  entry?: ContentEntry
  children: Map<string, DocsTreeNode>
}

type PublicDocsData = {
  entries: ContentEntry[]
  entryMap: Map<string, ContentEntry>
  pageMap: PageMapItem[]
  staticParams: Array<{ category: string; slug: string[] }>
}

function page(
  name: string,
  route: string,
  title: string,
  frontMatter: Record<string, unknown> = { title },
): DocsPageItem {
  return {
    name,
    route,
    title,
    frontMatter,
  }
}

function folder(
  name: string,
  title: string,
  route: string,
  children: DocsPageMapItem[],
  frontMatter?: Record<string, unknown>,
): DocsFolderItem {
  return {
    name,
    route,
    title,
    children,
    frontMatter,
  }
}

function sanitizePageMapItems(items: DocsPageMapItem[]): DocsPageMapItem[] {
  const sanitized = items
    .map(item => {
      if (!('children' in item)) {
        return item
      }

      const children = sanitizePageMapItems(item.children as DocsPageMapItem[])
      if (children.length === 0) {
        return null
      }

      return {
        ...item,
        children,
      }
    })
    .filter((item): item is DocsPageMapItem => item !== null)

  return sanitized
}

function titleize(segment: string) {
  const brandedLabels: Record<string, string> = {
    prokit: 'ProKit',
    saaskit: 'SaaSKit',
    waaskit: 'WaaSKit',
    uxkit: 'UXKit',
  }

  if (brandedLabels[segment]) {
    return brandedLabels[segment]
  }

  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function normalizeFlag(value: unknown) {
  if (typeof value !== 'string') return undefined
  const normalized = value.trim().toLowerCase()
  return normalized || undefined
}

function isTrueFlag(value: unknown) {
  return value === true || normalizeFlag(value) === 'true'
}

function isFalseFlag(value: unknown) {
  return value === false || normalizeFlag(value) === 'false'
}

function isPublicDocsRoute(routeSegments: string[]) {
  if (routeSegments.length === 0) {
    return true
  }

  return PUBLIC_DOC_TOP_LEVEL_SET.has(routeSegments[0])
}

function hasPrivateVisibility(entry: ContentEntry) {
  const visibility = normalizeFlag(entry.rawFrontmatter.visibility)

  if (visibility && PRIVATE_VISIBILITY_VALUES.has(visibility)) {
    return true
  }

  return (
    isTrueFlag(entry.rawFrontmatter.private) ||
    isTrueFlag(entry.rawFrontmatter.internal) ||
    isFalseFlag(entry.rawFrontmatter.public) ||
    isFalseFlag(entry.rawFrontmatter.published)
  )
}

function isHiddenPublicDocsRoute(routeSegments: string[]) {
  const routeKey = routeSegments.join('/')

  if (HIDDEN_PUBLIC_DOC_EXACT_ROUTES.has(routeKey)) {
    return true
  }

  return HIDDEN_PUBLIC_DOC_PREFIXES.some(
    prefix => routeKey === prefix || routeKey.startsWith(`${prefix}/`),
  )
}

function isPublicDocEntry(entry: ContentEntry) {
  return (
    isPublicDocsRoute(entry.routeSegments) &&
    !hasPrivateVisibility(entry) &&
    !isHiddenPublicDocsRoute(entry.routeSegments)
  )
}

function toStaticParam(entry: ContentEntry) {
  return {
    category: entry.routeSegments[0],
    slug: entry.routeSegments.slice(1),
  }
}

function createNode(segment: string, routeSegments: string[]): DocsTreeNode {
  return {
    segment,
    routeSegments,
    children: new Map<string, DocsTreeNode>(),
  }
}

function getNodeWeight(node: DocsTreeNode) {
  return node.entry?.order ?? Number.POSITIVE_INFINITY
}

function getNodeLabel(node: DocsTreeNode) {
  const entryTitle = node.entry?.title?.trim()
  const fallbackTitle = titleize(node.segment)

  if (!entryTitle) {
    return fallbackTitle
  }

  if (entryTitle.toLowerCase() === node.segment.toLowerCase()) {
    return fallbackTitle
  }

  return entryTitle
}

function getNodeRoute(node: DocsTreeNode): string {
  if (node.entry) {
    return node.entry.urlPath
  }

  const firstChild = Array.from(node.children.values())
    .sort(compareNodes)[0]

  return firstChild ? getNodeRoute(firstChild) : '/docs'
}

function compareNodes(left: DocsTreeNode, right: DocsTreeNode) {
  const orderDelta = getNodeWeight(left) - getNodeWeight(right)
  if (orderDelta !== 0) {
    return orderDelta
  }

  return getNodeLabel(left).localeCompare(getNodeLabel(right))
}

function asPageMapItem(node: DocsTreeNode): DocsPageMapItem {
  const title = getNodeLabel(node)
  const route = getNodeRoute(node)
  const display = node.entry?.rawFrontmatter.display
  const frontMatter = display ? { title, display } : { title }

  if (node.children.size === 0) {
    return page(title, route, title, frontMatter)
  }

  const children = Array.from(node.children.values())
    .sort(compareNodes)
    .map(asPageMapItem)

  return folder(title, title, route, children, frontMatter)
}

function buildDocsTree(entries: ContentEntry[]) {
  const root = createNode('docs', [])

  for (const entry of entries) {
    if (entry.routeSegments.length === 0) {
      continue
    }

    let current = root

    for (const [index, segment] of entry.routeSegments.entries()) {
      if (!current.children.has(segment)) {
        current.children.set(
          segment,
          createNode(segment, entry.routeSegments.slice(0, index + 1)),
        )
      }

      current = current.children.get(segment)!
    }

    current.entry = entry
  }

  return root
}

async function buildPublicDocsData(): Promise<PublicDocsData> {
  const entries = (await getSectionEntries('docs')).filter(isPublicDocEntry)
  const detailEntries = entries.filter(entry => entry.routeSegments.length > 0)
  const tree = buildDocsTree(detailEntries)

  return {
    entries,
    entryMap: new Map(entries.map(entry => [entry.routeSegments.join('/'), entry])),
    pageMap: sanitizePageMapItems(
      Array.from(tree.children.values())
        .sort(compareNodes)
        .map(asPageMapItem),
    ) as PageMapItem[],
    // Prebuild every public docs route. The built app's on-demand render path has
    // been the source of repeated production 500s for otherwise valid doc pages.
    staticParams: detailEntries.map(toStaticParam),
  }
}

async function getPublicDocsData() {
  if (!publicDocsDataPromise) {
    publicDocsDataPromise = buildPublicDocsData()
  }

  return publicDocsDataPromise
}

export async function getPublicDocsEntries() {
  const data = await getPublicDocsData()
  return data.entries
}

export async function getPublicDocsPageMap() {
  const data = await getPublicDocsData()
  return data.pageMap
}

function normalizePublicDocRouteSegments(routeSegments: string[]) {
  if (routeSegments.length === 0) {
    return routeSegments
  }

  if (!isPublicDocsRoute(routeSegments)) {
    return null
  }

  if (routeSegments[routeSegments.length - 1] === 'index') {
    return routeSegments.slice(0, -1)
  }

  if (routeSegments[0] === 'shared' && routeSegments.length === 2) {
    const sharedSlug = SHARED_ROUTE_OVERRIDES[routeSegments[1]]
    if (sharedSlug) {
      return ['shared', sharedSlug]
    }
  }

  if (routeSegments.length === 2 && routeSegments[1] === 'README') {
    return [routeSegments[0]]
  }

  if (routeSegments.length === 2 && routeSegments[1] === 'install' && routeSegments[0] === 'prokit') {
    return ['prokit', 'installation']
  }

  if (routeSegments.length === 2 && COLLAPSED_SECTION_PAGES.has(routeSegments[1])) {
    return [routeSegments[0]]
  }

  if (routeSegments[0] === 'prokit' && routeSegments[1] === 'api') {
    return null
  }

  return routeSegments
}

function resolvePublicDocEntry(
  routeSegments: string[],
  entriesByRoute: Map<string, ContentEntry>,
) {
  const primary = entriesByRoute.get(routeSegments.join('/'))
  if (primary) {
    return primary
  }

  const normalizedRouteSegments = normalizePublicDocRouteSegments(routeSegments)

  if (!normalizedRouteSegments) {
    return null
  }

  const normalized = entriesByRoute.get(normalizedRouteSegments.join('/'))
  if (normalized) {
    return normalized
  }

  if (!PUBLIC_PRODUCT_SET.has(routeSegments[0]) || routeSegments.length < 2) {
    return null
  }

  return entriesByRoute.get(['features', ...routeSegments.slice(1)].join('/')) || null
}

function toDocHref(routeSegments: string[]) {
  return routeSegments.length > 0 ? `/docs/${routeSegments.join('/')}` : '/docs'
}

export async function getPublicDocHrefResolver() {
  const { entryMap: entriesByRoute } = await getPublicDocsData()

  return (routeSegments: string[]) => {
    const entry = resolvePublicDocEntry(routeSegments, entriesByRoute)
    if (!entry) {
      return null
    }

    const exact = entriesByRoute.get(routeSegments.join('/'))
    if (exact) {
      return exact.urlPath
    }

    const normalizedRouteSegments = normalizePublicDocRouteSegments(routeSegments)
    if (normalizedRouteSegments) {
      const normalized = entriesByRoute.get(normalizedRouteSegments.join('/'))
      if (normalized) {
        return toDocHref(normalizedRouteSegments)
      }
    }

    if (PUBLIC_PRODUCT_SET.has(routeSegments[0]) && routeSegments.length >= 2) {
      return entry.urlPath
    }

    return null
  }
}

export async function getPublicDocEntry(routeSegments: string[]): Promise<ContentEntry | null> {
  const { entryMap: entriesByRoute } = await getPublicDocsData()
  const routeKey = routeSegments.join('/')
  return entriesByRoute.get(routeKey) || null
}

export async function getPublicDocsStaticParams() {
  const data = await getPublicDocsData()
  return data.staticParams
}
