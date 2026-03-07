import { MetadataRoute } from 'next'

import { getSectionEntries } from '@/lib/content'
import { getSiteUrl } from '@/libs/site-url'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const entries = await getSectionEntries('blog')

  return entries.map(entry => ({
    url: `${baseUrl}${entry.urlPath}`,
    lastModified: new Date(entry.updated || entry.date),
    changeFrequency: 'monthly',
    priority: 0.66,
  }))
}
