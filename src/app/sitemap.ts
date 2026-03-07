import { MetadataRoute } from 'next'

import { getSiteUrl } from '@/libs/site-url'

const STATIC_ROUTES: Array<{
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/kits', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/kits/saaskit', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/kits/prokit', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/proof', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/studio', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.72 },
  { path: '/docs', changeFrequency: 'monthly', priority: 0.68 },
  { path: '/playbooks', changeFrequency: 'monthly', priority: 0.67 },
  { path: '/prompts', changeFrequency: 'monthly', priority: 0.66 },
  { path: '/snippets', changeFrequency: 'monthly', priority: 0.64 },
  { path: '/guides', changeFrequency: 'monthly', priority: 0.69 },
  { path: '/saas-glossary', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/starting-point', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/system/events', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.5 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const now = new Date()

  return STATIC_ROUTES.map(route => ({
    url: `${baseUrl}${route.path === '/' ? '' : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
