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
const PRIORITY_STATIC_DOC_ROUTES = new Set([
  'features',
  'prokit',
  'prokit/launch-flow',
  'prokit/quick-start',
  'prokit/what-you-get',
  'saaskit',
  'saaskit/launch-flow',
  'saaskit/quick-start',
  'saaskit/what-you-get',
  'shared',
  'shared/architecture',
  'shared/deployment',
  'shared/quick-start',
  'shared/try-in-2-minutes',
])
const SHARED_ROUTE_OVERRIDES: Record<string, string> = {
  try: 'try-in-2-minutes',
}
const HIDDEN_PAGE_MAP_EXACT_ROUTES = new Set([
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
const HIDDEN_PAGE_MAP_PREFIXES = ['prokit/api'] as const

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

function isPublicDocEntry(entry: ContentEntry) {
  return isPublicDocsRoute(entry.routeSegments) && !hasPrivateVisibility(entry)
}

function isPriorityStaticDocEntry(entry: ContentEntry) {
  return PRIORITY_STATIC_DOC_ROUTES.has(entry.routeSegments.join('/'))
}

function getPageMapDisplay(routeSegments: string[]) {
  const routeKey = routeSegments.join('/')

  if (HIDDEN_PAGE_MAP_EXACT_ROUTES.has(routeKey)) {
    return 'hidden' as const
  }

  if (HIDDEN_PAGE_MAP_PREFIXES.some(prefix => routeKey === prefix || routeKey.startsWith(`${prefix}/`))) {
    return 'hidden' as const
  }

  return undefined
}

function asHiddenPageMapEntry(entry: ContentEntry, routeSegments = entry.routeSegments): ContentEntry {
  return {
    ...entry,
    routeSegments,
    category: routeSegments[0] || entry.category,
    urlPath: routeSegments.length > 0 ? `/docs/${routeSegments.join('/')}` : '/docs',
    rawFrontmatter: {
      ...entry.rawFrontmatter,
      display: 'hidden',
    },
  }
}

function buildHiddenPageMapEntries(entries: ContentEntry[], visibleEntries: ContentEntry[]) {
  const visibleRouteSet = new Set(visibleEntries.map(entry => entry.routeSegments.join('/')))
  const hiddenEntries = entries
    .filter(entry => entry.routeSegments.length > 0)
    .filter(entry => !visibleRouteSet.has(entry.routeSegments.join('/')))
    .map(entry => asHiddenPageMapEntry(entry))

  const featureEntries = visibleEntries.filter(entry => entry.routeSegments[0] === 'features')

  for (const product of PUBLIC_PRODUCTS) {
    for (const featureEntry of featureEntries) {
      const aliasRouteSegments = [product, ...featureEntry.routeSegments.slice(1)]
      const aliasRouteKey = aliasRouteSegments.join('/')

      if (visibleRouteSet.has(aliasRouteKey)) {
        continue
      }

      hiddenEntries.push(asHiddenPageMapEntry(featureEntry, aliasRouteSegments))
      visibleRouteSet.add(aliasRouteKey)
    }
  }

  return Array.from(
    new Map(hiddenEntries.map(entry => [entry.routeSegments.join('/'), entry])).values(),
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
  const display = node.entry?.rawFrontmatter.display || getPageMapDisplay(node.routeSegments)
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
  const allEntries = await getSectionEntries('docs')
  const entries = allEntries.filter(isPublicDocEntry)
  const detailEntries = entries.filter(entry => entry.routeSegments.length > 0)
  const hiddenPageMapEntries = buildHiddenPageMapEntries(allEntries, entries)
  const tree = buildDocsTree([...detailEntries, ...hiddenPageMapEntries])

  return {
    entries,
    entryMap: new Map(entries.map(entry => [entry.routeSegments.join('/'), entry])),
    pageMap: Array.from(tree.children.values())
      .sort(compareNodes)
      .map(asPageMapItem) as PageMapItem[],
    staticParams: Array.from(
      new Map(
        [
          ...detailEntries.filter(isPriorityStaticDocEntry),
          ...hiddenPageMapEntries,
        ].map(entry => [entry.routeSegments.join('/'), toStaticParam(entry)]),
      ).values(),
    ),
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

export async function getPublicDocEntry(routeSegments: string[]): Promise<ContentEntry | null> {
  if (!isPublicDocsRoute(routeSegments)) {
    return null
  }

  const routeKey = routeSegments.join('/')
  const { entryMap: entriesByRoute } = await getPublicDocsData()
  const primary = entriesByRoute.get(routeKey) || null
  if (primary) return primary

  if (routeSegments.length < 2) return null
  if (!PUBLIC_PRODUCT_SET.has(routeSegments[0])) return null

  const sharedSlug = SHARED_ROUTE_OVERRIDES[routeSegments[1]]
  if (sharedSlug) {
    const sharedEntry = entriesByRoute.get(`shared/${sharedSlug}`) || null
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
  const fallback = entriesByRoute.get(featureSegments.join('/')) || null
  if (!fallback) return null

  return {
    ...fallback,
    routeSegments,
    category: routeSegments[0],
    urlPath: `/docs/${routeSegments.join('/')}`,
  }
}

export async function getPublicDocsStaticParams() {
  const data = await getPublicDocsData()
  return data.staticParams
}
