import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/libs/site-url'

const CANONICAL_ROUTES = [
  '/',
  '/memory',
  '/memory-qa',
  '/workbench',
  '/docs',
  '/contact',
  '/privacy',
  '/terms',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const lastModified = new Date()

  return CANONICAL_ROUTES.map((path, index) => ({
    url: `${baseUrl}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : path === '/memory' || path === '/memory-qa' || path === '/workbench' ? 0.9 : 0.7,
  }))
}
