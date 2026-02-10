import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentUrl = process.env.NEXT_PUBLIC_APP_URL || ''
  const now = new Date()

  return [
    {
      url: currentUrl,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${currentUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${currentUrl}/tos`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${currentUrl}/blog`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]
}
