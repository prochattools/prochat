import { notFound } from 'next/navigation'

import ContentLayout from '@/components/content/ContentLayout'
import { renderMdxContent } from '@/components/content/MDXRenderer'
import StructuredData from '@/components/StructuredData'
import { getSectionEntry, getFeaturedSectionStaticParams, getRelatedEntries } from '@/lib/content'
import { getSEOTags, createSocialImageParams } from '@/lib/seo/metadata'
import { articleSchema } from '@/lib/seo/schema'

type PageParams = { params: { stack: string; slug: string } }

export async function generateStaticParams() {
  return getFeaturedSectionStaticParams('snippets', 0)
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getSectionEntry('snippets', [params.stack, params.slug])
  if (!entry) {
    return getSEOTags({ title: 'Snippet Not Found', description: 'The requested snippet could not be found.', canonicalUrlRelative: '/snippets' })
  }

  const socialImage = createSocialImageParams({
    line1: entry.ogLine1,
    line2: entry.ogLine2,
    subtitle: entry.ogSubtitle,
  })

  return getSEOTags({
    title: entry.metaTitle || entry.title,
    description: entry.metaDescription || entry.description,
    keywords: entry.keywords,
    canonicalUrlRelative: entry.urlPath,
    socialImage,
  })
}

export const revalidate = 3600

export default async function SnippetPage({ params }: PageParams) {
  const entry = await getSectionEntry('snippets', [params.stack, params.slug])
  if (!entry) notFound()
  const related = await getRelatedEntries('snippets', entry.urlPath)
  const content = await renderMdxContent(entry.content)

  return (
    <>
      <StructuredData id={`schema-snippets-${entry.slug}`} data={articleSchema({ title: entry.title, description: entry.description, urlPath: entry.urlPath, datePublished: entry.date, dateModified: entry.updated })} />
      <ContentLayout entry={entry} related={related}>{content}</ContentLayout>
    </>
  )
}
