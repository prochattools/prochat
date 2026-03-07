import { notFound } from 'next/navigation'

import ContentLayout from '@/components/content/ContentLayout'
import { renderMdxContent } from '@/components/content/MDXRenderer'
import StructuredData from '@/components/StructuredData'
import { getSectionEntry, getSectionStaticParams, getRelatedEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'
import { articleSchema } from '@/lib/seo/schema'

export const dynamic = 'force-static'

type PageParams = { params: { category: string; slug: string } }

export async function generateStaticParams() {
  return getSectionStaticParams('docs')
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getSectionEntry('docs', [params.category, params.slug])
  if (!entry) {
    return getSEOTags({ title: 'Doc Not Found', description: 'The requested doc page could not be found.', canonicalUrlRelative: '/docs' })
  }

  return getSEOTags({
    title: entry.metaTitle || entry.title,
    description: entry.metaDescription || entry.description,
    keywords: entry.keywords,
    canonicalUrlRelative: entry.urlPath,
    openGraph: { title: entry.metaTitle || entry.title, description: entry.metaDescription || entry.description, images: [entry.ogImage], type: 'article' },
  })
}

export default async function DocsPage({ params }: PageParams) {
  const entry = await getSectionEntry('docs', [params.category, params.slug])
  if (!entry) notFound()
  const related = await getRelatedEntries('docs', entry.urlPath)
  const content = await renderMdxContent(entry.content)

  return (
    <>
      <StructuredData id={`schema-docs-${entry.slug}`} data={articleSchema({ title: entry.title, description: entry.description, urlPath: entry.urlPath, datePublished: entry.date, dateModified: entry.updated })} />
      <ContentLayout entry={entry} related={related}>{content}</ContentLayout>
    </>
  )
}
