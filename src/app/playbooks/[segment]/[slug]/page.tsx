import { notFound } from 'next/navigation'

import ContentLayout from '@/components/content/ContentLayout'
import { renderMdxContent } from '@/components/content/MDXRenderer'
import StructuredData from '@/components/StructuredData'
import { getSectionEntry, getFeaturedSectionStaticParams, getRelatedEntries } from '@/lib/content'
import { getSEOTags, createSocialImageParams } from '@/lib/seo/metadata'
import { howToSchema } from '@/lib/seo/schema'

type PageParams = { params: { segment: string; slug: string } }

export async function generateStaticParams() {
  return getFeaturedSectionStaticParams('playbooks', 8)
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getSectionEntry('playbooks', [params.segment, params.slug])
  if (!entry) {
    return getSEOTags({ title: 'Playbook Not Found', description: 'The requested playbook could not be found.', canonicalUrlRelative: '/playbooks' })
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
