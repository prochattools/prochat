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
    <main className="mx-auto flex h-[calc(100dvh-4.5rem)] max-w-7xl flex-col overflow-hidden px-page pb-4 pt-24 md:pt-28">
      <section className="mx-auto w-full max-w-4xl shrink-0">
        <h1 className="font-brand text-3xl font-bold tracking-[-0.02em] text-foreground md:text-4xl">
          SaaS Founder Glossary
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Fast SaaS definitions for non-technical founders. Search first, preview quickly,
          then open the full explanation only when needed.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {terms.length} founder terms across validation, MVP, pricing, metrics, and infrastructure.
        </p>
      </section>

      <div className="mt-4 min-h-0 flex-1">
        <GlossaryExplorer terms={explorerTerms} />
      </div>
    </main>
  )
}
