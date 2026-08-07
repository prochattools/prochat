import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import StructuredData from '@/components/StructuredData'
import ContextualLinkCta from '@/components/ContextualLinkCta'
import { renderMdxContent } from '@/components/content/MDXRenderer'
import {
  getProductionGuideEntry,
  getProductionGuideSocialImage,
  PRODUCTION_GUIDE_PATH,
} from '@/lib/learning/production-guide'
import { articleSchema } from '@/lib/seo/schema'
import {
  createSocialImageParams,
  getSEOTags,
} from '@/lib/seo/metadata'
import {
  generateSocialImageUrl,
  generateStaticSocialImageUrl,
} from '@/lib/generateSocialImageUrl'

export async function generateMetadata() {
  const entry = await getProductionGuideEntry()

  if (!entry) {
    return getSEOTags({
      title: 'Production Guide | ProChat',
      description: 'The requested production guide could not be found.',
      canonicalUrlRelative: PRODUCTION_GUIDE_PATH,
      robots: { index: true, follow: true },
    })
  }

  const socialImage = getProductionGuideSocialImage(entry)
  const staticImagePath = path.join(process.cwd(), 'public', 'social', `${socialImage.slug}.png`)
  const socialImageUrl = entry.title
    ? fs.existsSync(staticImagePath)
      ? generateStaticSocialImageUrl(socialImage.slug)
      : generateSocialImageUrl(socialImage)
    : '/og'
  const socialImageParams = createSocialImageParams({
    line1: socialImage.line1,
    line2: socialImage.line2,
    subtitle: socialImage.subtitle,
  })

  return getSEOTags({
    title: entry.metaTitle || entry.title,
    description: entry.metaDescription || entry.description,
    keywords: entry.keywords,
    canonicalUrlRelative: PRODUCTION_GUIDE_PATH,
    robots: { index: true, follow: true },
    openGraph: {
      title: entry.metaTitle || entry.title,
      description: entry.metaDescription || entry.description,
      url: PRODUCTION_GUIDE_PATH,
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
    socialImage: socialImageParams,
  })
}

export const revalidate = 86400

export default async function ProductionGuidePage() {
  const entry = await getProductionGuideEntry()

  if (!entry) notFound()

  const content = await renderMdxContent(entry.content, entry.title)

  return (
    <main className="mx-auto max-w-5xl px-page pb-24 pt-24 md:pt-28">
      <StructuredData
        id="schema-production-guide"
        data={articleSchema({
          title: entry.title,
          description: entry.description,
          urlPath: PRODUCTION_GUIDE_PATH,
          datePublished: entry.date,
          dateModified: entry.updated,
        })}
      />

      <article className="pc-article-shell">
        <header className="border-b border-border-subtle/80 pb-8">
          <Link
            href="/docs/learn"
            className="inline-flex rounded-full border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Back to Learn
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-tertiary">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle/80 bg-surface-soft/70 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
              Production Guide
            </span>
            <span className="inline-flex items-center rounded-full border border-border-subtle/70 bg-surface/75 px-2.5 py-1 text-[11px] text-muted-foreground">
              Implementation Sequence
            </span>
          </div>
          <h1 className="mt-5 font-brand text-4xl font-bold tracking-[-0.05em] text-foreground md:text-[3.4rem]">
            {entry.title}
          </h1>
          <p className="mt-4 max-w-3xl text-[1rem] leading-7 text-muted-foreground md:text-[1.02rem]">
            {entry.description}
          </p>
        </header>

        <div className="prose-premium mt-12 font-body">{content}</div>
      </article>

      <ContextualLinkCta
        className="mx-auto mt-14 max-w-4xl border-border/80 bg-surface-elevated/95 shadow-elevated"
        title="Use the next layer when you are ready to ship"
        description="Keep the sequence tight: prompts for execution, docs for implementation, and SaaSKit when you want the production foundation already wired."
        links={[
          { href: '/prompts/founder-ops/weekly-review', label: 'Open AI Prompts' },
          { href: '/docs', label: 'Open Documentation' },
          { href: '/kits/saaskit', label: 'Explore SaaSKit' },
        ]}
        analytics={{
          eventName: 'blog_cta_click',
          location: 'production_guide_footer',
        }}
      />
    </main>
  )
}
