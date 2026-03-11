import { notFound } from 'next/navigation'

import StructuredData from '@/components/StructuredData'
import { getPublicDocEntry, getPublicDocsStaticParams } from '@/lib/docs/public-docs'
import { renderDocsMdxContent } from '@/lib/docs/nextra'
import { getSEOTags } from '@/lib/seo/metadata'
import { articleSchema } from '@/lib/seo/schema'

export const dynamic = 'force-static'

type PageParams = { params: { category: string; slug?: string[] } }

function getRouteSegments(params: PageParams['params']) {
  return [params.category, ...(params.slug ?? [])]
}

export async function generateStaticParams() {
  return getPublicDocsStaticParams()
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getPublicDocEntry(getRouteSegments(params))
  if (!entry) {
    return getSEOTags({
      title: 'Doc Not Found',
      description: 'The requested doc page could not be found.',
      canonicalUrlRelative: '/docs',
    })
  }

  return getSEOTags({
    title: entry.metaTitle || entry.title,
    description: entry.metaDescription || entry.description,
    keywords: entry.keywords,
    canonicalUrlRelative: entry.urlPath,
    openGraph: {
      title: entry.metaTitle || entry.title,
      description: entry.metaDescription || entry.description,
      images: [entry.ogImage],
      type: 'article',
    },
  })
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
