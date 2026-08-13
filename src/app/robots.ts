import { MetadataRoute } from 'next'
import { getSiteUrl } from '@/libs/site-url'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/account/',
          '/settings/',
          '/preferences/',
          '/chat/',
          '/sign-in/',
          '/sign-up/',
          '/private/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: `${baseUrl}`,
  }
}
