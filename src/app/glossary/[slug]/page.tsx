import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSEOTags } from '@/libs/seo'
import {
  GlossaryTerm,
  getAllGlossaryTerms,
  getGlossarySlugs,
  getGlossaryTermBySlug,
} from '@/libs/glossary'
import StructuredData from '@/components/StructuredData'
import { getDefinedTermSchema } from '@/libs/structured-data'

export const dynamic = 'force-static'

type PageParams = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getGlossarySlugs()
  return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params }: PageParams) {
  const term = await getGlossaryTermBySlug(params.slug)

  if (!term) {
    return getSEOTags({
      title: 'Glossary Term Not Found | ProChat',
      description: 'The requested glossary term could not be found.',
      canonicalUrlRelative: '/saas-glossary',
    })
  }

  return getSEOTags({
    title: term.metaTitle || `${term.title} Definition for SaaS Founders`,
    description: term.metaDescription || term.description,
    keywords: term.keywords,
    canonicalUrlRelative: `/glossary/${term.slug}`,
    openGraph: {
      title: term.metaTitle || `${term.title} Definition for SaaS Founders`,
      description: term.metaDescription || term.description,
      images: [term.ogImage || '/og/prochat-home.png'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: term.metaTitle || `${term.title} Definition for SaaS Founders`,
      description: term.metaDescription || term.description,
      images: [term.ogImage || '/og/prochat-home.png'],
    },
  })
}

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateIso))
}

export default async function GlossaryTermPage({ params }: PageParams) {
  const term = await getGlossaryTermBySlug(params.slug)

  if (!term) {
    notFound()
  }

  const relatedTerms = (await getAllGlossaryTerms())
    .filter((item: GlossaryTerm) => item.slug !== term.slug)
    .slice(0, 4)

  return (
    <main className="mx-auto max-w-4xl px-6 pb-20 pt-28 md:pt-32">
      <StructuredData
        id={`schema-glossary-${term.slug}`}
        data={getDefinedTermSchema({
          name: term.title,
          description: term.description,
          slug: term.slug,
        })}
      />

      <article>
        <header className="border-b border-border pb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            SaaS Founder Glossary
          </p>
          <h1 className="mt-3 font-brand text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
            {term.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {term.description}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Updated {formatDate(term.updated || term.date)} ·{' '}
            {term.readingTimeMinutes} min read
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <Link
              href="/saas-glossary"
              className="rounded-full border border-border px-3 py-1 text-muted-foreground transition-colors hover:text-primary"
            >
              Back to Glossary Hub
            </Link>
            <a
              href="#definition"
              className="rounded-full border border-border px-3 py-1 text-muted-foreground transition-colors hover:text-primary"
            >
              Definition
            </a>
            <a
              href="#simple-explanation"
              className="rounded-full border border-border px-3 py-1 text-muted-foreground transition-colors hover:text-primary"
            >
              Simple Explanation
            </a>
            <a
              href="#mistakes"
              className="rounded-full border border-border px-3 py-1 text-muted-foreground transition-colors hover:text-primary"
            >
              Common Mistakes
            </a>
            <a
              href="#next-step"
              className="rounded-full border border-border px-3 py-1 text-muted-foreground transition-colors hover:text-primary"
            >
              Next Step
            </a>
          </div>
        </header>

        <div
          className="prose prose-slate mt-10 max-w-none prose-headings:font-brand prose-headings:text-foreground prose-a:text-primary dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: term.content }}
        />
      </article>

      {relatedTerms.length > 0 && (
        <section className="mt-10">
          <h2 className="font-brand text-2xl font-bold text-foreground">
            Related Terms
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {relatedTerms.map((related: GlossaryTerm) => (
              <Link
                key={related.slug}
                href={`/glossary/${related.slug}`}
                className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <h3 className="font-brand text-lg font-bold text-foreground">
                  {related.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {related.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
