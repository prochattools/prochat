import { promises as fs } from 'fs'
import path from 'path'

import type { PageMapItem } from 'nextra'

import { getSectionEntries, getSectionEntry } from '@/lib/content'
import type { ContentEntry } from '@/lib/content/types'

type MetaRecord = Record<string, string | Record<string, unknown>>
type DocsMetaItem = {
  data: MetaRecord
}
type DocsPageItem = {
  name: string
  route: string
  frontMatter?: Record<string, unknown>
  title?: string
}
type DocsFolderItem = {
  name: string
  route: string
  children: DocsPageMapItem[]
  title?: string
}
type DocsPageMapItem = DocsMetaItem | DocsPageItem | DocsFolderItem
type DocsNavigableItem = DocsPageItem | DocsFolderItem

const PRODUCT_GETTING_STARTED = new Set(['prokit', 'saaskit', 'future', 'waaskit'])
const GETTING_STARTED_CHILDREN = [
  { slug: 'try', title: 'Try the boilerplate in 2 minutes' },
  { slug: 'quick-start', title: 'Quick Start' },
]
const PRODUCT_CHILDREN = [
  { slug: 'what-you-get', title: 'What You Get' },
  { slug: 'use-cases', title: 'Use Cases' },
  { slug: 'how-it-works', title: 'How It Works' },
  { slug: 'launch-checklist', title: 'Launch Checklist' },
  { slug: 'who-this-is-for', title: 'Who This Is For' },
  { slug: 'why-a-boilerplate', title: 'Why a Boilerplate?' },
]
const SHARED_ROUTE_OVERRIDES: Record<string, string> = {
  try: 'try-in-2-minutes',
}

const PUBLIC_DOCS_ROOT = path.join(process.cwd(), 'src', 'content', 'docs')
let publicDocsEntryMapPromise: Promise<Map<string, ContentEntry>> | null = null
let publicDocsPageMapPromise: Promise<PageMapItem[]> | null = null

function toRouteSegments(relativeDir: string, fileName: string) {
  const directorySegments = relativeDir ? relativeDir.split('/') : []
  return fileName === 'index'
    ? directorySegments
    : [...directorySegments, fileName]
}

function toRoutePath(routeSegments: string[]) {
  return routeSegments.length > 0 ? `/docs/${routeSegments.join('/')}` : '/docs'
}

function humanizeSegment(segment: string) {
  return segment
    .split(/[-_]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getMetaTitle(value: string | Record<string, unknown> | undefined) {
  if (typeof value === 'string') {
    return value
  }

  if (value && typeof value.title === 'string' && value.title.trim()) {
    return value.title.trim()
  }

  return undefined
}

function sortByMetaOrder<T extends { name: string }>(items: T[], meta: MetaRecord | null) {
  const explicitKeys = Object.keys(meta || {}).filter(key => key !== '*')
  const order = new Map(explicitKeys.map((key, index) => [key, index]))

  return [...items].sort((left, right) => {
    const leftOrder = order.get(left.name)
    const rightOrder = order.get(right.name)

    if (leftOrder !== undefined || rightOrder !== undefined) {
      if (leftOrder === undefined) return 1
      if (rightOrder === undefined) return -1
      return leftOrder - rightOrder
    }

    if (left.name === 'index' && right.name !== 'index') return -1
    if (right.name === 'index' && left.name !== 'index') return 1

    return left.name.localeCompare(right.name)
  })
}

function hasNavigableChildren(items: DocsPageMapItem[]) {
  return items.some(item => 'name' in item && 'route' in item)
}

async function loadMeta(relativeDir: string): Promise<MetaRecord | null> {
  const metaPath = path.join(PUBLIC_DOCS_ROOT, relativeDir, '_meta.js')

  try {
    const source = await fs.readFile(metaPath, 'utf8')
    const moduleFactory = new Function(
      source.replace(/^\s*export\s+default\s+/, 'return '),
    ) as () => MetaRecord

    return moduleFactory()
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null
    }

    throw error
  }
}

async function getPublicDocsEntryMap() {
  if (!publicDocsEntryMapPromise) {
    publicDocsEntryMapPromise = getSectionEntries('docs').then(
      entries => new Map(entries.map(entry => [entry.routeSegments.join('/'), entry])),
    )
  }

  return publicDocsEntryMapPromise
}

async function buildDirectory(relativeDir = ''): Promise<DocsPageMapItem[]> {
  const [meta, entryMap, dirents] = await Promise.all([
    loadMeta(relativeDir),
    getPublicDocsEntryMap(),
    fs.readdir(path.join(PUBLIC_DOCS_ROOT, relativeDir), { withFileTypes: true }),
  ])

  let pageItems: DocsNavigableItem[] = []

  for (const dirent of dirents) {
    if (dirent.name.startsWith('.')) continue

    if (dirent.isDirectory()) {
      const childRelativeDir = relativeDir ? `${relativeDir}/${dirent.name}` : dirent.name
      const children = await buildDirectory(childRelativeDir)

      if (!hasNavigableChildren(children)) {
        continue
      }

      pageItems.push({
        name: dirent.name,
        route: toRoutePath([...toRouteSegments(relativeDir, 'index'), dirent.name]),
        title: getMetaTitle(meta?.[dirent.name]) || humanizeSegment(dirent.name),
        children,
      })

      continue
    }

    if (!dirent.isFile() || path.extname(dirent.name) !== '.mdx') {
      continue
    }

    const baseName = path.parse(dirent.name).name

    if (baseName === '_meta') {
      continue
    }

    const routeSegments = toRouteSegments(relativeDir, baseName)
    const entry = entryMap.get(routeSegments.join('/'))
    const title = getMetaTitle(meta?.[baseName]) || entry?.title || humanizeSegment(baseName)

    pageItems.push({
      name: baseName,
      route: toRoutePath(routeSegments),
      title,
      frontMatter: {
        ...(entry?.rawFrontmatter || {}),
        title,
      },
    })
  }

  if (PRODUCT_GETTING_STARTED.has(relativeDir)) {
    const gettingStartedSlugs = new Set(GETTING_STARTED_CHILDREN.map(child => child.slug))
    const productChildSlugs = new Set(PRODUCT_CHILDREN.map(child => child.slug))
    const allSlugs = new Set([...gettingStartedSlugs, ...productChildSlugs])
    const productIndexRoute = toRoutePath(toRouteSegments(relativeDir, 'index'))

    const gettingStartedChildren = GETTING_STARTED_CHILDREN.map(child => ({
      name: child.slug,
      route: toRoutePath([...toRouteSegments(relativeDir, child.slug)]),
      title: child.title,
    }))

    const productChildren = PRODUCT_CHILDREN.map(child => ({
      name: child.slug,
      route: toRoutePath([...toRouteSegments(relativeDir, child.slug)]),
      title: child.title,
    }))

    pageItems = pageItems.filter(
      item => !('name' in item && allSlugs.has(item.name)),
    )

    pageItems.unshift({
      name: 'product',
      route: productIndexRoute,
      title: 'Product',
      children: productChildren,
    })

    pageItems.unshift({
      name: 'getting-started',
      route: productIndexRoute,
      title: 'Getting Started',
      children: gettingStartedChildren,
    })
  }

  const sortedItems = sortByMetaOrder(pageItems, meta)

  if (relativeDir === '') {
    const featureIndex = sortedItems.findIndex(
      item => 'name' in item && item.name === 'features' && 'children' in item,
    )

    if (featureIndex >= 0) {
      const [featureFolder] = sortedItems.splice(featureIndex, 1)
      const featureChildren = (featureFolder as DocsFolderItem).children

      sortedItems.unshift({
        name: 'core-features',
        route: '/docs/features',
        title: 'Core Features',
        children: featureChildren,
      })
    }
  }

  const validItems = sortedItems.filter(
    (item): item is DocsNavigableItem => 'name' in item && 'route' in item,
  )

  if (meta && Object.keys(meta).length > 0) {
    return [{ data: meta }, ...validItems]
  }

  return validItems
}

export async function getPublicDocsPageMap() {
  if (!publicDocsPageMapPromise) {
    publicDocsPageMapPromise = buildDirectory('').then(
      pageMap => pageMap as unknown as PageMapItem[],
    )
  }

  return publicDocsPageMapPromise
}

export async function getPublicDocEntry(routeSegments: string[]): Promise<ContentEntry | null> {
  const primary = await getSectionEntry('docs', routeSegments)
  if (primary) return primary

  if (routeSegments.length < 2) return null

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
