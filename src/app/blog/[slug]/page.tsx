import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'

import ContentLayout from '@/components/content/ContentLayout'
import { renderMdxContent } from '@/components/content/MDXRenderer'
import StructuredData from '@/components/StructuredData'
import { getSectionEntry, getSectionStaticParams, getRelatedEntries } from '@/lib/content'
import {
  generateSocialImageUrl,
  generateStaticSocialImageUrl,
} from '@/lib/generateSocialImageUrl'
import { getSEOTags, createSocialImageParams } from '@/lib/seo/metadata'
import { articleSchema } from '@/lib/seo/schema'

export const dynamic = 'force-static'

type PageParams = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return getSectionStaticParams('blog')
}

export async function generateMetadata({ params }: PageParams) {
  const entry = await getSectionEntry('blog', [params.slug])

  if (!entry) {
    return getSEOTags({
      title: 'Article Not Found | ProChat Blog',
      description: 'The requested blog article could not be found.',
      canonicalUrlRelative: '/blog',
    })
  }

  const staticImagePath = path.join(process.cwd(), 'public', 'social', `${entry.slug}.png`)
  const socialImageUrl = entry.title
    ? fs.existsSync(staticImagePath)
      ? generateStaticSocialImageUrl(entry.slug)
      : generateSocialImageUrl(entry.title)
    : '/og'

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
    openGraph: {
      title: entry.metaTitle || entry.title,
      description: entry.metaDescription || entry.description,
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: entry.title || entry.metaTitle || 'ProChat social image',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.metaTitle || entry.title,
      description: entry.metaDescription || entry.description,
      images: [socialImageUrl],
    },
    socialImage,
  })
}

export default async function BlogArticlePage({ params }: PageParams) {
  const entry = await getSectionEntry('blog', [params.slug])

  if (!entry) notFound()

  const related = await getRelatedEntries('blog', entry.urlPath)
  const content = await renderMdxContent(entry.content, entry.title)

  return (
    <>
      <StructuredData
        id={`schema-blog-${entry.slug}`}
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
