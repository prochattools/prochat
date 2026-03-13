import Link from 'next/link'
import { notFound } from 'next/navigation'

import ContentLayout from '@/components/content/ContentLayout'
import { renderMdxContent } from '@/components/content/MDXRenderer'
import StructuredData from '@/components/StructuredData'
import { getSectionEntry, getFeaturedSectionStaticParams, getRelatedEntries } from '@/lib/content'
import { getSEOTags, createSocialImageParams } from '@/lib/seo/metadata'
import { glossarySchema } from '@/lib/seo/schema'

type PageParams = { params: { term: string } }

export async function generateStaticParams() {
  return getFeaturedSectionStaticParams('glossary', 0)
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

  const glossaryImages = entry.ogImage ? [entry.ogImage] : undefined

  const socialImage = createSocialImageParams({
    line1: entry.ogLine1,
    line2: entry.ogLine2,
    subtitle: entry.ogSubtitle,
  })

  return getSEOTags({
    title: entry.metaTitle || `${entry.title} Definition for SaaS Founders`,
    description: entry.metaDescription || entry.description,
    keywords: entry.keywords,
    canonicalUrlRelative: entry.urlPath,
    openGraph: {
      title: entry.metaTitle || `${entry.title} Definition for SaaS Founders`,
      description: entry.metaDescription || entry.description,
      ...(glossaryImages && { images: glossaryImages }),
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.metaTitle || `${entry.title} Definition for SaaS Founders`,
      description: entry.metaDescription || entry.description,
      ...(glossaryImages && { images: glossaryImages }),
    },
    socialImage,
  })
}

export const revalidate = 3600

const guideLinks: Record<string, { href: string; label: string }[]> = {
  'product-market-fit': [{ href: '/guides/how-to-find-saas-ideas', label: 'How to Find SaaS Ideas' }],
  distribution: [{ href: '/guides/how-to-find-saas-ideas', label: 'How to Find SaaS Ideas' }],
  'authority-stacking': [{ href: '/guides/how-to-find-saas-ideas', label: 'How to Find SaaS Ideas' }],
  'recurring-revenue': [{ href: '/guides/what-is-website-as-a-service', label: 'What is Website-as-a-Service?' }],
  'customer-acquisition': [{ href: '/guides/what-is-website-as-a-service', label: 'What is Website-as-a-Service?' }],
  'productized-service': [{ href: '/guides/waas-to-saas', label: 'From Website-as-a-Service to SaaS' }],
  'scalable-software': [{ href: '/guides/waas-to-saas', label: 'From Website-as-a-Service to SaaS' }],
  'startup-traction': [{ href: '/guides/waas-to-saas', label: 'From Website-as-a-Service to SaaS' }],
}

export default async function GlossaryTermPage({ params }: PageParams) {
  const entry = await getSectionEntry('glossary', [params.term])
  if (!entry) notFound()

  const related = await getRelatedEntries('glossary', entry.urlPath, 4)
  const content = await renderMdxContent(entry.content)
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.title,
    description: entry.description,
    inDefinedTermSet: 'https://prochat.tools/saas-glossary',
  }
  const relatedLinks = related.slice(0, 3)

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
      <StructuredData id={`schema-defined-term-${entry.slug}`} data={definedTermSchema} />
      <div className="mx-auto max-w-5xl px-page pt-8 text-sm text-muted-foreground">
        <Link href="/saas-glossary" className="font-medium underline decoration-border-strong/80 underline-offset-4">
          Back to the SaaS Founder Glossary
        </Link>
      </div>
      <ContentLayout entry={entry} related={related}>{content}</ContentLayout>
      {guideLinks[entry.slug] ? (
        <section className="mx-auto max-w-5xl px-page pb-14 pt-10">
          <h2 className="font-brand text-2xl font-bold tracking-[-0.02em] text-foreground">Learn more about this concept</h2>
          <ul className="mt-4 space-y-3 text-lg text-muted-foreground">
            {guideLinks[entry.slug].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-semibold text-primary underline decoration-border-strong/80 underline-offset-4">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {relatedLinks.length > 0 ? (
        <section className="mx-auto max-w-5xl px-page pb-24 pt-10">
          <h2 className="font-brand text-2xl font-bold tracking-[-0.02em] text-foreground">Related SaaS concepts</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {relatedLinks.map(rel => (
              <li key={rel.slug}>
                <Link
                  href={`/glossary/${rel.slug}`}
                  className="text-sm font-semibold text-primary underline decoration-border-strong/80 underline-offset-4 transition-colors hover:text-primary/80"
                >
                  {rel.title}
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">{rel.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  )
}
