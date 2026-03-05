import { getSEOTags } from '@/libs/seo'
import { getAllGlossaryTerms } from '@/libs/glossary'
import GlossaryExplorer from './GlossaryExplorer'

export const metadata = getSEOTags({
  title: 'SaaS Founder Glossary | ProChat',
  description:
    'Plain-language SaaS definitions for non-technical founders building with AI, no-code, and low-code tools.',
  keywords: [
    'saas glossary',
    'saas terms for founders',
    'non technical founder dictionary',
    'what is mvp',
    'what is churn',
  ],
  openGraph: {
    title: 'SaaS Founder Glossary | ProChat',
    description:
      'Plain-language SaaS definitions for non-technical founders building with AI, no-code, and low-code tools.',
    images: ['/og/prochat-home.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/prochat-home.png'],
  },
  canonicalUrlRelative: '/saas-glossary',
})

export default async function SaaSGlossaryPage() {
  const terms = await getAllGlossaryTerms()
  const explorerTerms = terms.map(term => ({
    slug: term.slug,
    title: term.title,
    description: term.description,
    excerpt: term.excerpt,
    definition: term.definition,
    category: term.category,
    stage: term.stage,
    synonyms: term.synonyms,
    priority: term.priority,
  }))

  return (
    <main className="mx-auto max-w-7xl px-page pb-16 pt-28 md:pt-32">
      <section className="mx-auto max-w-4xl">
        <h1 className="font-brand text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
          SaaS Founder Glossary
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          A fast, founder-first dictionary for SaaS terms. Search instantly, scan
          compact definitions, and open full explanations only when you need detail.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {terms.length} terms across validation, MVP, pricing, metrics, and
          infrastructure.
        </p>
      </section>

      <GlossaryExplorer terms={explorerTerms} />
    </main>
  )
}
