import config from '@/config'
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
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'DeveloperApplication',
    brand: config.appName,
    creator: {
      '@type': 'Person',
      name: 'Steve',
    },
    operatingSystem: 'Web',
    description,
    url: `${siteUrl}${urlPath}`,
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
  const siteUrl = getSiteUrl()
  const articleUrl = `${siteUrl}/blog/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: 'Steve',
    },
    publisher: {
      '@type': 'Organization',
      name: config.appName,
      url: `${siteUrl}/`,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: articleUrl,
    url: articleUrl,
  }
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
  const siteUrl = getSiteUrl()
  const termUrl = `${siteUrl}/glossary/${slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name,
    description,
    url: termUrl,
    inDefinedTermSet: `${siteUrl}/saas-glossary`,
  }
}
