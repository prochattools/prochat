import type { Metadata } from 'next'
import config from '@/config'
import { getSiteUrl } from '@/libs/site-url'

/**
 * SEO Architecture Audit Summary (2026-03-05)
 * - Metadata source of truth is this helper + page-level `metadata` / `generateMetadata`.
 * - No second SEO utility should be introduced; all route metadata extends this function.
 * - Dynamic metadata belongs in dynamic routes only (`/blog/[slug]`), static routes use `metadata`.
 * - Canonical tags are controlled through `canonicalUrlRelative` and resolved via `metadataBase`.
 * - Structured data is now handled via reusable components/utilities (not ad-hoc inline JSON-LD).
 */

export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  twitter,
  robots,
  canonicalUrlRelative,
  extraTags,
}: Metadata & {
  canonicalUrlRelative?: string
  extraTags?: Record<string, unknown>
} = {}) => {
  const siteUrl = getSiteUrl()
  const defaultOgImage = '/og/prochat-home.png'

  return {
    title: title || config.appName,
    description: description || config.appDescription,
    keywords: keywords || [config.appName],
    applicationName: config.appName,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    metadataBase: new URL(`${siteUrl}/`),
    openGraph: {
      title: openGraph?.title || title || config.appName,
      description: openGraph?.description || description || config.appDescription,
      url:
        openGraph?.url ||
        (canonicalUrlRelative ? `${siteUrl}${canonicalUrlRelative}` : `${siteUrl}/`),
      siteName: (openGraph?.title || title || config.appName) as string,
      locale: 'en_US',
      type: 'website',
      images: openGraph?.images || [defaultOgImage],
      ...openGraph,
    },
    twitter: {
      title: twitter?.title || openGraph?.title || title || config.appName,
      description:
        twitter?.description ||
        openGraph?.description ||
        description ||
        config.appDescription,
      card: 'summary_large_image',
      creator: '@prochat',
      images: twitter?.images || openGraph?.images || [defaultOgImage],
      ...twitter,
    },
    ...(robots && { robots }),
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),
    ...extraTags,
  }
}
