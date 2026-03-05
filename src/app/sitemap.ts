import { MetadataRoute } from 'next'
import { BlogPost, getAllBlogPosts } from '@/libs/blog'
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
  { path: '/kits/uxkit-waitlist', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/starting-point', changeFrequency: 'monthly', priority: 0.65 },
  { path: '/system/events', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.5 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const now = new Date()
  const blogPosts = await getAllBlogPosts()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(route => ({
    url: `${baseUrl}${route.path === '/' ? '' : route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post: BlogPost) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: 'monthly',
    priority: 0.64,
  }))

  return [...staticEntries, ...blogEntries]
}
