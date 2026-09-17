import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/libs/site-url'

const CANONICAL_ROUTES = [
  '/',
  '/evermind',
  '/nevermind',
  '/mastermind',
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
    priority: index === 0 ? 1 : path === '/evermind' || path === '/nevermind' || path === '/mastermind' ? 0.9 : 0.7,
  }))
}
