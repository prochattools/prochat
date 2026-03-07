import { notFound } from 'next/navigation'

import ContentLayout from '@/components/content/ContentLayout'
import { renderMdxContent } from '@/components/content/MDXRenderer'
import StructuredData from '@/components/StructuredData'
import { getSectionEntry, getSectionStaticParams, getRelatedEntries } from '@/lib/content'
import { getSEOTags } from '@/lib/seo/metadata'
import { howToSchema } from '@/lib/seo/schema'

export const dynamic = 'force-static'

type PageParams = { params: { segment: string; slug: string } }

export async function generateStaticParams() {
  return getSectionStaticParams('playbooks')
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getSectionEntry('playbooks', [params.segment, params.slug])
  if (!entry) {
    return getSEOTags({ title: 'Playbook Not Found', description: 'The requested playbook could not be found.', canonicalUrlRelative: '/playbooks' })
  }

  return getSEOTags({ title: entry.metaTitle || entry.title, description: entry.metaDescription || entry.description, keywords: entry.keywords, canonicalUrlRelative: entry.urlPath })
}

export default async function PlaybookPage({ params }: PageParams) {
  const entry = await getSectionEntry('playbooks', [params.segment, params.slug])
  if (!entry) notFound()
  const related = await getRelatedEntries('playbooks', entry.urlPath)
  const content = await renderMdxContent(entry.content)

  return (
    <>
      <StructuredData id={`schema-playbooks-${entry.slug}`} data={howToSchema({ name: entry.title, description: entry.description, urlPath: entry.urlPath })} />
      <ContentLayout entry={entry} related={related}>{content}</ContentLayout>
    </>
  )
}
