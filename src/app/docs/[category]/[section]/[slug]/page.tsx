import { notFound } from 'next/navigation'

import ContentLayout from '@/components/content/ContentLayout'
import StructuredData from '@/components/StructuredData'
import { getRelatedEntries, getSectionEntries, getSectionEntry } from '@/lib/content'
import { renderDocsMdxContent } from '@/lib/docs/nextra'
import { getSEOTags } from '@/lib/seo/metadata'
import { articleSchema } from '@/lib/seo/schema'

export const dynamic = 'force-static'

type PageParams = { params: { category: string; section: string; slug: string } }

export async function generateStaticParams() {
  const entries = await getSectionEntries('docs')
  return entries
    .filter(entry => entry.routeSegments.length === 3)
    .map(entry => ({
      category: entry.routeSegments[0],
      section: entry.routeSegments[1],
      slug: entry.routeSegments[2],
    }))
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getSectionEntry('docs', [params.category, params.section, params.slug])
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

export default async function NestedDocsPage({ params }: PageParams) {
  const routeSegments = [params.category, params.section, params.slug]
  const entry = await getSectionEntry('docs', routeSegments)
  if (!entry) notFound()

  const related = await getRelatedEntries('docs', entry.urlPath)
  let content = null

  try {
    content = await renderDocsMdxContent(routeSegments, entry.content)
  } catch {
    notFound()
  }

  return (
    <>
      <StructuredData
        id={`schema-docs-${entry.slug}-${params.section}`}
        data={articleSchema({
          title: entry.title,
          description: entry.description,
          urlPath: entry.urlPath,
          datePublished: entry.date,
          dateModified: entry.updated,
        })}
      />
      <ContentLayout entry={entry} related={related}>
        {content}
      </ContentLayout>
    </>
  )
}
