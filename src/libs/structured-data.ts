import config from '@/config'
import { articleSchema, glossarySchema, howToSchema, productSchema } from '@/lib/seo/schema'
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
    name: config.appName,
    description: config.appDescription,
    url: `${siteUrl}/`,
    founder: {
      '@type': 'Person',
      name: 'Steve',
    },
    sameAs: [
      'https://www.linkedin.com/company/prochattools',
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
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/blog?query={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
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

export function getBlogPostingSchema({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  slug: string
  datePublished: string
  dateModified?: string
}) {
  return articleSchema({
    title,
    description,
    urlPath: `/blog/${slug}`,
    datePublished,
    dateModified,
  })
}

export function getDefinedTermSchema({
  name,
  description,
  slug,
}: {
  name: string
  description: string
  slug: string
}) {
  return glossarySchema({
    name,
    description,
    urlPath: `/glossary/${slug}`,
  })
}

export { articleSchema, glossarySchema, howToSchema, productSchema }
