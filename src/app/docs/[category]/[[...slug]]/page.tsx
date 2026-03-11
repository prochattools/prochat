import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import StructuredData from '@/components/StructuredData'
import { getPublicDocEntry, getPublicDocsStaticParams } from '@/lib/docs/public-docs'
import { renderDocsMdxContent } from '@/lib/docs/nextra'
import { articleSchema } from '@/lib/seo/schema'
import { getSiteUrl } from '@/libs/site-url'

export const dynamic = 'force-static'

type PageParams = { params: { category: string; slug?: string[] } }

function getRouteSegments(params: PageParams['params']) {
  return [params.category, ...(params.slug ?? [])]
}

function getDocKeywords(entry: Awaited<ReturnType<typeof getPublicDocEntry>>, routeSegments: string[]) {
  if (entry?.keywords && entry.keywords.length > 0) {
    return entry.keywords
  }

  return ['documentation', ...routeSegments]
}

export async function generateStaticParams() {
  return getPublicDocsStaticParams()
}

export async function generateMetadata({ params }: PageParams) {
  const routeSegments = getRouteSegments(params)
  const entry = await getPublicDocEntry(routeSegments)
  const metadataBase = new URL(`${getSiteUrl()}/`)

  if (!entry) {
    return {
      title: 'Doc Not Found',
      description: 'The requested doc page could not be found.',
      applicationName: 'Product Documentation',
      metadataBase,
      alternates: { canonical: '/docs' },
    } satisfies Metadata
  }

  return {
    title: entry.metaTitle || entry.title,
    description: entry.metaDescription || entry.description,
    applicationName: 'Product Documentation',
    keywords: getDocKeywords(entry, routeSegments),
    metadataBase,
    alternates: { canonical: entry.urlPath },
    openGraph: {
      title: entry.metaTitle || entry.title,
      description: entry.metaDescription || entry.description,
      url: entry.urlPath,
      images: [entry.ogImage],
      type: 'article',
    },
    twitter: {
      title: entry.metaTitle || entry.title,
      description: entry.metaDescription || entry.description,
      images: [entry.ogImage],
      card: 'summary_large_image',
    },
  } satisfies Metadata
}

export default async function DocsPage({ params }: PageParams) {
  const routeSegments = getRouteSegments(params)
  const entry = await getPublicDocEntry(routeSegments)
  if (!entry) notFound()

  const content = await renderDocsMdxContent(entry)

  return (
    <>
      <StructuredData
        id={`schema-docs-${routeSegments.join('-')}`}
        data={articleSchema({
          title: entry.title,
          description: entry.description,
          urlPath: entry.urlPath,
          datePublished: entry.date,
          dateModified: entry.updated,
        })}
      />
      {content}
    </>
  )
}
