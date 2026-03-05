import Link from 'next/link'
import { getSEOTags } from '@/libs/seo'
import { GlossaryTerm, getAllGlossaryTerms } from '@/libs/glossary'

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

function groupByAlphabet(terms: GlossaryTerm[]) {
  const groups = new Map<string, GlossaryTerm[]>()

  terms.forEach(term => {
    const letter = term.title.charAt(0).toUpperCase()
    const existing = groups.get(letter) || []
    existing.push(term)
    groups.set(letter, existing)
  })

  return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b))
}

export default async function SaaSGlossaryPage() {
  const terms = await getAllGlossaryTerms()
  const grouped = groupByAlphabet(terms)

  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:pt-32">
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="font-brand text-4xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
          SaaS Founder Glossary
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          A simple dictionary for non-technical founders building SaaS with AI,
          no-code, and low-code tools. Use this page to decode terms quickly and
          choose your next move with confidence.
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-brand text-2xl font-bold text-foreground">
          Browse Terms A-Z
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every term includes a plain-language definition, real-world example,
          common founder mistakes, and links to related build guides.
        </p>
      </section>

      <section className="mt-10 space-y-10">
        {grouped.map(([letter, letterTerms]) => (
          <div key={letter}>
            <h3 className="font-brand text-2xl font-bold text-foreground">
              {letter}
            </h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {letterTerms.map(term => (
                <article
                  key={term.slug}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <h4 className="font-brand text-xl font-bold text-foreground">
                    <Link
                      href={`/glossary/${term.slug}`}
                      className="hover:text-primary"
                    >
                      {term.title}
                    </Link>
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {term.description}
                  </p>
                  <p className="mt-3 text-xs text-muted-foreground">
                    Primary keyword: {term.primaryKeyword}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
