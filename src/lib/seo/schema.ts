import config from '@/config'
import { getSiteUrl } from '@/libs/site-url'

export function articleSchema({
  title,
  description,
  urlPath,
  datePublished,
  dateModified,
}: {
  title: string
  description: string
  urlPath: string
  datePublished: string
  dateModified?: string
}) {
  const siteUrl = getSiteUrl()
  const url = `${siteUrl}${urlPath}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Person', name: 'Steve' },
    publisher: { '@type': 'Organization', name: config.appName, url: `${siteUrl}/` },
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: url,
    url,
  }
}

export function productSchema({
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
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'DeveloperApplication',
    brand: config.appName,
    creator: { '@type': 'Person', name: 'Steve' },
    operatingSystem: 'Web',
    description,
    url: `${siteUrl}${urlPath}`,
  }
}

export function howToSchema({
  name,
  description,
  urlPath,
  steps,
}: {
  name: string
  description: string
  urlPath: string
  steps?: string[]
}) {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url: `${siteUrl}${urlPath}`,
    step: (steps || []).map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step,
      text: step,
    })),
  }
}
