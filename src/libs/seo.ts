import type { Metadata } from 'next'

import config from '@/config'

/**
 * Minimal metadata helper.
 *
 * ProKit does not ship with a marketing/SEO content system; this is just a safe
 * place to centralize app name/description + canonical URLs.
 */
export function getSEOTags({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
}: Metadata & {
  canonicalUrlRelative?: string
  extraTags?: Record<string, unknown>
} = {}): Metadata {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/'
      : `https://${config.domainName}/`

  return {
    title: title || config.appName,
    description: description || config.appDescription,
    keywords: keywords || [config.appName],
    applicationName: config.appName,
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
      shortcut: ['/favicon.ico'],
      apple: [{ url: '/logo/prochat_logo_light.png' }],
    },
    openGraph: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      url: openGraph?.url || `https://${config.domainName}/`,
      siteName: (openGraph?.title || config.appName) as string,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: openGraph?.title || config.appName,
      description: openGraph?.description || config.appDescription,
      card: 'summary_large_image',
    },
    ...(canonicalUrlRelative && { alternates: { canonical: canonicalUrlRelative } }),
    ...extraTags,
  }
}
