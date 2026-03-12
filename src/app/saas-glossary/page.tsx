import { getSEOTags } from '@/libs/seo'
import { getAllGlossaryTerms } from '@/libs/glossary'
import HeroStandard from '@/components/HeroStandard'
import GlossaryExplorer from './GlossaryExplorer'
import StructuredData from '@/components/StructuredData'

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

const glossarySchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'SaaS Founder Glossary',
  description: 'A glossary of key SaaS and startup concepts for founders building and launching software products.',
  url: 'https://prochat.tools/saas-glossary',
}

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
    <>
      <StructuredData id="schema-glossary-set" data={glossarySchema} />
      <section className="w-full pb-16 md:pb-20 lg:pb-24">
        <HeroStandard
        fullBleed
        showDivider={false}
        label="Glossary"
        title="SaaS Founder Glossary"
        subtitle="Fast SaaS definitions for non-technical founders. Search first, preview quickly, then open the full explanation only when needed."
        footer={<span>{terms.length} founder terms across validation, MVP, pricing, metrics, and infrastructure.</span>}
      />

      <div className="mx-auto w-full max-w-7xl px-page pt-4 md:pt-5">
        <GlossaryExplorer terms={explorerTerms} />
      </div>
    </section>
    </>
  )
}
