import type { Metadata } from 'next'

import config from '@/config'
import { getSiteUrl } from '@/libs/site-url'
import { sanitizeSocialHeadlineLine, sanitizeSocialSubtitle } from '@/lib/social-image'

export const SITE_TITLE_SUFFIX = 'ProChat'
export const DEFAULT_DESCRIPTION =
  'ProChat builds local-first, review-first tools for reusable memory and safe AI-assisted project work.'

const brandPattern = /\s*[|—-]\s*ProChat$/i

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

export type SocialImageOptions = {
  line1?: string
  line2?: string
  subtitle?: string
}

export function createSocialImageParams(params: SocialImageOptions): SocialImageOptions | undefined {
  if (params.line1 || params.line2 || params.subtitle) {
    return params
  }

  return undefined
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
  socialImage,
}: Metadata & {
  canonicalUrlRelative?: string
  extraTags?: Record<string, unknown>
  socialImage?: SocialImageOptions
} = {}) => {
  const siteUrl = getSiteUrl()
  const defaultOgImage = '/og'
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

  const splitHeadline = (title: string) => {
    const separators = [':', ' - ', ' – ', '—', '|']
    for (const separator of separators) {
      const index = title.indexOf(separator)
      if (index > 0 && index < title.length - separator.length) {
        const before = title.slice(0, index).trim()
        const after = title.slice(index + separator.length).trim()
        return {
          line1: before || title,
          line2: after || 'ProChat',
        }
      }
    }

    return {
      line1: title,
      line2: 'ProChat',
    }
  }

  const effectiveTitle = typeof title === 'string' ? title : SITE_TITLE_SUFFIX
  const useOverrideLines = Boolean(socialImage?.line1 || socialImage?.line2)
  const socialHeadline = useOverrideLines
    ? {
        line1: socialImage?.line1?.trim() || effectiveTitle,
        line2: socialImage?.line2?.trim() || 'ProChat',
      }
    : splitHeadline(effectiveTitle)
  const rawSubtitle = socialImage?.subtitle ?? description
  const trimmedSubtitle = rawSubtitle
    ? rawSubtitle.length > 120
      ? `${rawSubtitle.slice(0, 117)}...`
      : rawSubtitle
    : undefined

  const buildSocialUrl = (line1: string, line2: string, subtitle?: string) => {
    const safeLine1 = sanitizeSocialHeadlineLine(line1) || line1
    const safeLine2 = sanitizeSocialHeadlineLine(line2) || line2
    const safeSubtitle = sanitizeSocialSubtitle(subtitle)

    const params = new URLSearchParams()
    params.set('line1', safeLine1)
    params.set('line2', safeLine2)
    if (safeSubtitle) {
      params.set('subtitle', safeSubtitle)
    }

    return `/social?${params.toString()}`
  }

  const providedOpenGraphImages = (() => {
    const candidate = openGraph?.images
    if (!candidate) return []
    if (Array.isArray(candidate)) {
      return candidate.filter(Boolean)
    }
    return [candidate]
  })()
  const fallbackImage = (() => {
    if (providedOpenGraphImages.length > 0) {
      return providedOpenGraphImages
    }

    return [buildSocialUrl(socialHeadline.line1, socialHeadline.line2, trimmedSubtitle)]
  })()

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords || [config.appName],
    applicationName: config.appName,
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
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
      images: fallbackImage,
    },
    twitter: {
      ...twitter,
      title: resolvedTwitterTitle,
      description: twitter?.description || openGraph?.description || resolvedDescription,
      card: 'summary_large_image',
      creator: '@prochat',
      images: twitter?.images || fallbackImage,
    },
    ...(robots && { robots }),
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),
    ...extraTags,
  }
}
