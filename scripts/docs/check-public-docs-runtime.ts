import {
  assertValidPublicDocsPageMap,
  getPublicDocsEntries,
  getPublicDocsPageMap,
  getPublicDocsStaticParams,
} from '@/lib/docs/public-docs'

function toRouteKey(category: string, slug: string[] = []) {
  return [category, ...slug].join('/')
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

  assertValidPublicDocsPageMap(pageMap)

  console.log(
    `Public docs runtime check passed: ${publicRouteKeys.size} public routes, ${staticRouteKeys.size} static params.`,
  )
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
