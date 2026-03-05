import { MetadataRoute } from 'next'
import config from '@/config'

function getBaseUrl() {
  const publicUrl = process.env.NEXT_PUBLIC_APP_URL?.trim()
  if (publicUrl) {
    return publicUrl.replace(/\/+$/, '')
  }

  return `https://${config.domainName}`
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
