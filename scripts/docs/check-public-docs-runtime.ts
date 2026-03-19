import { getPublicDocsEntries, getPublicDocsPageMap, getPublicDocsStaticParams } from '@/lib/docs/public-docs'

type PageMapNode = {
  name?: string
  route?: string
  children?: PageMapNode[]
}

function toRouteKey(category: string, slug: string[] = []) {
  return [category, ...slug].join('/')
}

function assertNoEmptyFolders(nodes: PageMapNode[], path: string[] = []) {
  for (const node of nodes) {
    if (!node || typeof node !== 'object') {
      throw new Error(`Public docs page map contains an invalid node at ${path.join('/') || '<root>'}.`)
    }

    if (!('children' in node) || !Array.isArray(node.children)) {
      continue
    }

    const nodePath = [...path, node.name || node.route || '<folder>']
    if (node.children.length === 0) {
      throw new Error(`Public docs page map contains an empty folder at ${nodePath.join('/')}.`)
    }

    assertNoEmptyFolders(node.children, nodePath)
  }
}

async function main() {
  const [entries, staticParams, pageMap] = await Promise.all([
    getPublicDocsEntries(),
    getPublicDocsStaticParams(),
    getPublicDocsPageMap(),
  ])

  const publicRouteKeys = new Set(
    entries
      .filter(entry => entry.routeSegments.length > 0)
      .map(entry => entry.routeSegments.join('/')),
  )
  const staticRouteKeys = new Set(
    staticParams.map(param => toRouteKey(param.category, param.slug)),
  )

  const missingStaticRoutes = [...publicRouteKeys]
    .filter(routeKey => !staticRouteKeys.has(routeKey))
    .sort()

  if (missingStaticRoutes.length > 0) {
    throw new Error(
      [
        'Public docs static params are missing routable docs pages.',
        ...missingStaticRoutes.map(routeKey => `- ${routeKey}`),
      ].join('\n'),
    )
  }

  assertNoEmptyFolders(pageMap as PageMapNode[])

  console.log(
    `Public docs runtime check passed: ${publicRouteKeys.size} public routes, ${staticRouteKeys.size} static params.`,
  )
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
