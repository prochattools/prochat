import { getSEOTags } from '@/libs/seo'
import { getAllGlossaryTerms } from '@/libs/glossary'
import HeroSection from '@/components/marketing/HeroSection'
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
    images: ['/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og'],
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
    <section className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden px-page pb-4 md:pb-5">
      <HeroSection
        align="left"
        density="compact"
        title="SaaS Founder Glossary"
        subtitle="Fast SaaS definitions for non-technical founders. Search first, preview quickly, then open the full explanation only when needed."
        eyebrow={<p className="pc-kicker">Glossary</p>}
        className="w-full shrink-0 border-b border-border-subtle/80 pb-4 pt-[calc(var(--pc-header-height)+1rem)] md:pb-5"
        contentClassName="max-w-3xl"
        footer={<span>{terms.length} founder terms across validation, MVP, pricing, metrics, and infrastructure.</span>}
      />

      <div className="min-h-0 flex-1 pt-4 md:pt-5">
        <GlossaryExplorer terms={explorerTerms} />
      </div>
    </section>
  )
}
