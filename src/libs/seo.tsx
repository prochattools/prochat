import type { Metadata } from 'next'
import config from '@/config'
import { getSiteUrl } from '@/libs/site-url'

const BRAND_TITLE_SUFFIX = 'ProChat — The Operating System for SaaS Builders'
const brandPattern = /\s*[|—-]\s*ProChat(?:\s+Blog)?$/i

function formatMetaTitle(value?: string | null) {
  if (!value) return BRAND_TITLE_SUFFIX

  const trimmed = value.trim()
  if (!trimmed || trimmed === BRAND_TITLE_SUFFIX || trimmed === config.appName) {
    return BRAND_TITLE_SUFFIX
  }

  const normalized = trimmed.replace(brandPattern, '').trim()
  if (!normalized || normalized === config.appName) {
    return BRAND_TITLE_SUFFIX
  }

  if (normalized === BRAND_TITLE_SUFFIX) {
    return BRAND_TITLE_SUFFIX
  }

  return `${normalized} | ${BRAND_TITLE_SUFFIX}`
}

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
  const resolvedTitle =
    typeof title === 'string' ? formatMetaTitle(title) : title || BRAND_TITLE_SUFFIX
  const resolvedDescription = description || config.appDescription
  const resolvedOgTitle =
    typeof openGraph?.title === 'string'
      ? formatMetaTitle(openGraph.title)
      : typeof title === 'string'
        ? formatMetaTitle(title)
        : BRAND_TITLE_SUFFIX
  const resolvedTwitterTitle =
    typeof twitter?.title === 'string'
      ? formatMetaTitle(twitter.title)
      : typeof openGraph?.title === 'string'
        ? formatMetaTitle(openGraph.title)
        : typeof title === 'string'
          ? formatMetaTitle(title)
          : BRAND_TITLE_SUFFIX

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords || [config.appName],
    applicationName: config.appName,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    metadataBase: new URL(`${siteUrl}/`),
    openGraph: {
      ...openGraph,
      title: resolvedOgTitle,
      description: openGraph?.description || resolvedDescription,
      url:
        openGraph?.url ||
        (canonicalUrlRelative ? `${siteUrl}${canonicalUrlRelative}` : `${siteUrl}/`),
      siteName: BRAND_TITLE_SUFFIX,
      locale: 'en_US',
      type: 'website',
      images: openGraph?.images || [defaultOgImage],
    },
    twitter: {
      ...twitter,
      title: resolvedTwitterTitle,
      description:
        twitter?.description ||
        openGraph?.description ||
        resolvedDescription,
      card: 'summary_large_image',
      creator: '@prochat',
      images: twitter?.images || openGraph?.images || [defaultOgImage],
    },
    ...(robots && { robots }),
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),
    ...extraTags,
  }
}
