import { MetadataRoute } from 'next'

import { getSiteUrl } from '@/libs/site-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const lastModified = new Date()

  return [
    {
      url: `${baseUrl}/learn`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn/saas-starting-point`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/learn/production-guide`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
