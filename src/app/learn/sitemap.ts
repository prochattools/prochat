import { MetadataRoute } from 'next'

const SITE_URL = 'https://prochat.tools'

const LEARN_SITEMAP_ROUTES = [
  { path: '/learn', priority: 0.8 },
  { path: '/learn/production-guide', priority: 0.8 },
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  return LEARN_SITEMAP_ROUTES.map(route => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: route.priority,
  }))
}
