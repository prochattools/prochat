import { MetadataRoute } from 'next'

import { getPublicDocsEntries } from '@/lib/docs/public-docs'
import { getSiteUrl } from '@/libs/site-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const entries = (await getPublicDocsEntries()).filter(entry => entry.urlPath !== '/docs')
  const indexLastModified =
    entries.length > 0
      ? new Date(
          Math.max(
            ...entries.map(entry => new Date(entry.updated || entry.date).getTime()),
          ),
        )
      : new Date()
  const detailEntries: MetadataRoute.Sitemap = entries.map(entry => ({
    url: `${baseUrl}${entry.urlPath}`,
    lastModified: new Date(entry.updated || entry.date),
    changeFrequency: 'monthly',
    priority: 0.62,
  }))

  return [
    {
      url: `${baseUrl}/docs`,
      lastModified: indexLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...detailEntries,
  ]
}
