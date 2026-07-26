import config from '@/config'
import { articleSchema, howToSchema, productSchema } from '@/lib/seo/schema'
import { getSiteUrl } from '@/libs/site-url'

type Offer = {
  '@type': 'Offer'
  price: string
  priceCurrency: string
  availability?: string
  url?: string
}

export function getOrganizationSchema() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ProChat',
    description: config.appDescription,
    url: `${siteUrl}/`,
    founder: {
      '@type': 'Person',
      name: 'Steve Westhoek',
    },
    sameAs: [
      'https://www.linkedin.com/company/prochattools',
      'https://github.com/prochattools',
      'https://www.youtube.com/@prochattools',
    ],
  }
}

export function getWebsiteSchema() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.appName,
    description: config.appDescription,
    url: `${siteUrl}/`,
  }
}

export function getMemorySchema() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: 'ProChat Memory',
    description:
      'Local-first, review-first memory for preserving evidence, decisions, corrections, and selectively retrieved project context.',
    url: `${siteUrl}/memory`,
    creator: {
      '@type': 'Organization',
      name: 'ProChat',
      url: `${siteUrl}/`,
    },
  }
}

export function getMemoryQaSchema() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ProChat Memory for QA',
    description:
      'A selected public source-available beta for preserving reviewed QA evidence, investigations, corrections, and lessons.',
    url: `${siteUrl}/memory-qa`,
    applicationCategory: 'DeveloperApplication',
    isAccessibleForFree: true,
    license: 'https://github.com/prochattools/memory-qa/blob/main/LICENSE.md',
    author: {
      '@type': 'Organization',
      name: 'ProChat',
      url: `${siteUrl}/`,
    },
  }
}

export function getWorkbenchSchema() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'ProChat Workbench',
    description:
      'A free self-hosted prerelease for bounded local project context, guarded file changes, validation, and explicit Git actions.',
    url: `${siteUrl}/workbench`,
    applicationCategory: 'DeveloperApplication',
    isAccessibleForFree: true,
    license: 'https://github.com/prochattools/workbench/blob/main/LICENSE',
    softwareVersion: 'prerelease',
    author: {
      '@type': 'Organization',
      name: 'ProChat',
      url: `${siteUrl}/`,
    },
  }
}

export function getDocsSchemas() {
  const siteUrl = getSiteUrl()

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'ProChat Documentation',
      description:
        'Documentation for ProChat Memory, the selected Memory for QA beta, and ProChat Workbench.',
      url: `${siteUrl}/docs`,
      isPartOf: {
        '@type': 'WebSite',
        name: 'ProChat',
        url: `${siteUrl}/`,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ProChat',
          item: `${siteUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Documentation',
          item: `${siteUrl}/docs`,
        },
      ],
    },
  ]
}

export function getSoftwareApplicationSchema({
  name,
  description,
  urlPath,
  offers,
}: {
  name: string
  description: string
  urlPath: string
  offers: Offer[]
}) {
  return {
    ...productSchema({ name, description, urlPath }),
    offers,
  }
}

export function getEventSchema({
  name,
  description,
  urlPath,
}: {
  name: string
  description: string
  urlPath: string
}) {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name,
    eventStatus: 'PreOrder',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: {
      '@type': 'VirtualLocation',
      url: `${siteUrl}${urlPath}`,
    },
    description,
    organizer: {
      '@type': 'Organization',
      name: config.appName,
      url: `${siteUrl}/`,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
      url: `${siteUrl}${urlPath}`,
    },
  }
}

export { articleSchema, howToSchema, productSchema }
