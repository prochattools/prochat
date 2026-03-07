import type { Metadata } from 'next'

import config from '@/config'
import { getSiteUrl } from '@/libs/site-url'

export const SITE_TITLE_SUFFIX = 'ProChat — The Operating System for SaaS Builders'
export const DEFAULT_DESCRIPTION =
  'ProChat is the operating system for SaaS builders. Structured systems, production-safe foundations, and AI-driven execution for non-technical founders.'

const brandPattern = /\s*[|—-]\s*ProChat(?:\s+Blog)?$/i

export function formatMetaTitle(value?: string | null) {
  if (!value) return SITE_TITLE_SUFFIX

  const trimmed = value.trim()
  if (!trimmed || trimmed === SITE_TITLE_SUFFIX || trimmed === config.appName) {
    return SITE_TITLE_SUFFIX
  }

  const normalized = trimmed.replace(brandPattern, '').trim()
  if (!normalized || normalized === config.appName) {
    return SITE_TITLE_SUFFIX
  }

  return `${normalized} | ${SITE_TITLE_SUFFIX}`
}

export function getCanonicalUrl(relativePath?: string) {
  const siteUrl = getSiteUrl()
  return relativePath ? `${siteUrl}${relativePath}` : `${siteUrl}/`
}

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
    typeof title === 'string' ? formatMetaTitle(title) : title || SITE_TITLE_SUFFIX
  const resolvedDescription = description || DEFAULT_DESCRIPTION
  const resolvedOgTitle =
    typeof openGraph?.title === 'string'
      ? formatMetaTitle(openGraph.title)
      : typeof title === 'string'
        ? formatMetaTitle(title)
        : SITE_TITLE_SUFFIX
  const resolvedTwitterTitle =
    typeof twitter?.title === 'string'
      ? formatMetaTitle(twitter.title)
      : typeof openGraph?.title === 'string'
        ? formatMetaTitle(openGraph.title)
        : typeof title === 'string'
          ? formatMetaTitle(title)
          : SITE_TITLE_SUFFIX

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
      url: openGraph?.url || getCanonicalUrl(canonicalUrlRelative),
      siteName: SITE_TITLE_SUFFIX,
      locale: 'en_US',
      type: 'website',
      images: openGraph?.images || [defaultOgImage],
    },
    twitter: {
      ...twitter,
      title: resolvedTwitterTitle,
      description: twitter?.description || openGraph?.description || resolvedDescription,
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
