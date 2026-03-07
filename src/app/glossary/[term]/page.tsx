import { notFound } from 'next/navigation'

import ContentLayout from '@/components/content/ContentLayout'
import { renderMdxContent } from '@/components/content/MDXRenderer'
import StructuredData from '@/components/StructuredData'
import { getSectionEntry, getSectionStaticParams, getRelatedEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'
import { glossarySchema } from '@/lib/seo/schema'

export const dynamic = 'force-static'

type PageParams = { params: { term: string } }

export async function generateStaticParams() {
  return getSectionStaticParams('glossary')
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getSectionEntry('glossary', [params.term])

  if (!entry) {
    return getSEOTags({
      title: 'Glossary Term Not Found | ProChat',
      description: 'The requested glossary term could not be found.',
      canonicalUrlRelative: '/saas-glossary',
    })
  }

  return getSEOTags({
    title: entry.metaTitle || `${entry.title} Definition for SaaS Founders`,
    description: entry.metaDescription || entry.description,
    keywords: entry.keywords,
    canonicalUrlRelative: entry.urlPath,
    openGraph: {
      title: entry.metaTitle || `${entry.title} Definition for SaaS Founders`,
      description: entry.metaDescription || entry.description,
      images: [entry.ogImage],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.metaTitle || `${entry.title} Definition for SaaS Founders`,
      description: entry.metaDescription || entry.description,
      images: [entry.ogImage],
    },
  })
}

export default async function GlossaryTermPage({ params }: PageParams) {
  const entry = await getSectionEntry('glossary', [params.term])
  if (!entry) notFound()

  const related = await getRelatedEntries('glossary', entry.urlPath, 4)
  const content = await renderMdxContent(entry.content)

  return (
    <>
      <StructuredData
        id={`schema-glossary-${entry.slug}`}
        data={glossarySchema({
          name: entry.title,
          description: entry.description,
          urlPath: entry.urlPath,
        })}
      />
      <ContentLayout entry={entry} related={related}>{content}</ContentLayout>
    </>
  )
}
