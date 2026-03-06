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
    content: term.content,
    category: term.category,
    stage: term.stage,
    synonyms: term.synonyms,
    priority: term.priority,
    focusTags: term.focusTags,
  }))

  return (
    <section className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden px-page pb-4 pt-4 md:pb-5 md:pt-5">
      <header className="w-full shrink-0 border-b border-border-subtle/80 pb-4 md:pb-5">
        <h1 className="font-brand text-3xl font-bold tracking-[-0.05em] text-foreground md:text-4xl">
          SaaS Founder Glossary
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Fast SaaS definitions for non-technical founders. Search first, preview quickly,
          then open the full explanation only when needed.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {terms.length} founder terms across validation, MVP, pricing, metrics, and infrastructure.
        </p>
      </header>

      <div className="min-h-0 flex-1 pt-4 md:pt-5">
        <GlossaryExplorer terms={explorerTerms} />
      </div>
    </section>
  )
}
