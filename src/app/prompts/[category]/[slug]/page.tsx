import { notFound } from 'next/navigation'

import ContentLayout from '@/components/content/ContentLayout'
import { renderMdxContent } from '@/components/content/MDXRenderer'
import StructuredData from '@/components/StructuredData'
import { getSectionEntry, getSectionStaticParams, getRelatedEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'
import { howToSchema } from '@/lib/seo/schema'

export const dynamic = 'force-static'

type PageParams = { params: { category: string; slug: string } }

export async function generateStaticParams() {
  return getSectionStaticParams('prompts')
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getSectionEntry('prompts', [params.category, params.slug])
  if (!entry) {
    return getSEOTags({ title: 'Prompt Not Found', description: 'The requested prompt could not be found.', canonicalUrlRelative: '/prompts' })
  }

  return getSEOTags({ title: entry.metaTitle || entry.title, description: entry.metaDescription || entry.description, keywords: entry.keywords, canonicalUrlRelative: entry.urlPath })
}

export default async function PromptPage({ params }: PageParams) {
  const entry = await getSectionEntry('prompts', [params.category, params.slug])
  if (!entry) notFound()
  const related = await getRelatedEntries('prompts', entry.urlPath)
  const content = await renderMdxContent(entry.content)

  return (
    <>
      <StructuredData id={`schema-prompts-${entry.slug}`} data={howToSchema({ name: entry.title, description: entry.description, urlPath: entry.urlPath })} />
      <ContentLayout entry={entry} related={related}>{content}</ContentLayout>
    </>
  )
}
