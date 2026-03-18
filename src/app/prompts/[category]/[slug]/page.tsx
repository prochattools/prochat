import { notFound } from 'next/navigation'

import PromptPageLayout from '@/components/prompts/PromptPageLayout'
import StructuredData from '@/components/StructuredData'
import { getSectionEntry, getFeaturedSectionStaticParams, getRelatedEntries } from '@/lib/content'
import { getSEOTags, createSocialImageParams } from '@/lib/seo/metadata'
import { howToSchema } from '@/lib/seo/schema'

type PageParams = { params: { category: string; slug: string } }

export async function generateStaticParams() {
  return getFeaturedSectionStaticParams('prompts', 0)
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getSectionEntry('prompts', [params.category, params.slug])
  if (!entry) {
    return getSEOTags({ title: 'Prompt Not Found', description: 'The requested prompt could not be found.', canonicalUrlRelative: '/prompts' })
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
    robots: { index: false, follow: true },
    socialImage,
  })
}

export const revalidate = 3600

export default async function PromptPage({ params }: PageParams) {
  const entry = await getSectionEntry('prompts', [params.category, params.slug])
  if (!entry) notFound()
  const related = await getRelatedEntries('prompts', entry.urlPath)

  return (
    <>
      <StructuredData id={`schema-prompts-${entry.slug}`} data={howToSchema({ name: entry.title, description: entry.description, urlPath: entry.urlPath })} />
      <PromptPageLayout entry={entry} related={related} />
    </>
  )
}
