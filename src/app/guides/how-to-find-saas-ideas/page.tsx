import Link from 'next/link'

export const metadata = {
  title: 'How to Find SaaS Ideas | ProChat',
  description: 'Learn practical methods for discovering SaaS ideas by solving real business problems and working with niche clients.',
  alternates: { canonical: 'https://prochat.tools/guides/how-to-find-saas-ideas' },
  openGraph: {
    title: 'How to Find SaaS Ideas | ProChat',
    url: 'https://prochat.tools/guides/how-to-find-saas-ideas',
    siteName: 'ProChat',
    type: 'article',
  },
}

const sectionClass = 'max-w-5xl px-page mx-auto'

export default function HowToFindSaaSIdeasGuide() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Find SaaS Ideas',
    author: {
      '@type': 'Organization',
      name: 'ProChat',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ProChat',
      url: 'https://prochat.tools',
    },
    mainEntityOfPage: 'https://prochat.tools/guides/how-to-find-saas-ideas',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes a good SaaS idea?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A good SaaS idea usually appears when the same problem keeps repeating across multiple businesses. When clients repeatedly ask for the same feature or workaround, the problem is often ready to become software.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should founders brainstorm SaaS ideas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Brainstorming can help generate ideas, but the strongest SaaS products usually come from solving real problems for real businesses rather than inventing ideas in isolation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do founders validate SaaS ideas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Validation happens when businesses are willing to pay for a solution. If multiple clients experience the same problem and confirm they would pay for a solution, the idea has real market demand.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Learn', item: 'https://prochat.tools/learn' },
              { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://prochat.tools/guides' },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'How to Find SaaS Ideas',
                item: 'https://prochat.tools/guides/how-to-find-saas-ideas',
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <div className="space-y-12 bg-[rgb(var(--section-bg-rgb))] pb-20 text-foreground">
        <div className="scroll-mt-24 bg-[rgb(var(--section-alt-bg-rgb))] py-6 text-center">
          <nav className="mx-auto flex max-w-4xl items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">
            <Link href="/learn" className="text-muted-foreground/80 hover:text-primary">Learn</Link>
            <span className="text-muted-foreground/40">/</span>
            <Link href="/guides" className="text-muted-foreground/80 hover:text-primary">Guides</Link>
            <span className="text-muted-foreground/40">/</span>
            <span className="text-muted-foreground">How to Find SaaS Ideas</span>
          </nav>
        </div>
        <section className="bg-[rgb(var(--section-alt-bg-rgb))] py-24 text-center">
        <div className="mx-auto max-w-4xl px-page">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Guide</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">How to Find SaaS Ideas</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Many founders struggle with the same question:
          </p>
          <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
            How do you find a SaaS idea that actually works?
          </p>
          <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
            Most people try brainstorming. They write lists of startup ideas. They watch trends. They try to invent something clever.
          </p>
          <p className="mt-2 text-lg leading-relaxed text-muted-foreground">
            But the best SaaS ideas rarely appear during brainstorming. They appear when you start solving real problems for real businesses.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/kits/waaskit"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white transition hover:bg-primary/80"
            >
              Explore WaaSKit
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" id="struggle">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Why most founders struggle to find SaaS ideas</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The biggest mistake founders make is trying to invent a product before they understand a market.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">They focus on technology instead of problems.</p>
          <p className="mt-2 text-lg text-muted-foreground">They build features before they talk to users.</p>
          <p className="mt-2 text-lg text-muted-foreground">This often leads to a product nobody asked for.</p>
          <p className="mt-4 text-lg text-muted-foreground">The result is months of development with no customers.</p>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--section-alt-bg-rgb))]" id="brainstorm">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Why brainstorming fails</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Brainstorming is conceptual. Real problems are practical.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            When founders sit alone trying to invent ideas, they often imagine problems that businesses do not actually care about.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            Real SaaS ideas usually come from observing how businesses work and where their workflows break.
          </p>
        </div>
      </section>

      <section className="py-16" id="method">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">The best way to find SaaS ideas</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The simplest way to discover SaaS ideas is to work closely with a niche.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            Instead of inventing software immediately, start by helping businesses solve problems manually.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">Website-as-a-Service is one way to do this.</p>
          <p className="mt-2 text-lg text-muted-foreground">
            By building and maintaining websites for businesses, founders build relationships and hear real frustrations from their clients.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">Over time patterns appear.</p>
          <p className="mt-2 text-lg text-muted-foreground">Those patterns often lead directly to SaaS ideas.</p>
          <p className="mt-3 text-lg text-muted-foreground">
            To understand the Website-as-a-Service model in more detail, read our primer <Link href="/guides/what-is-website-as-a-service" className="text-primary font-semibold">What is Website-as-a-Service?</Link>
          </p>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--section-alt-bg-rgb))]" id="signals">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">The three signals of a SaaS opportunity</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A problem is often ready to become software when three signals appear:
          </p>
          <ul className="mt-3 space-y-3 text-lg text-muted-foreground">
            <li>• the same problem repeats across multiple clients</li>
            <li>• the same feature is requested repeatedly</li>
            <li>• the same manual workaround keeps happening</li>
          </ul>
          <p className="mt-3 text-lg text-muted-foreground">When these patterns appear, you are no longer guessing.</p>
          <p className="mt-2 text-lg text-muted-foreground">You are observing real demand.</p>
        </div>
      </section>

      <section className="py-16" id="building">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Building the SaaS after validation</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Once those signals appear, the next step is building a solution.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            At this point founders need infrastructure for authentication, billing, and dashboards.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            Instead of building everything from scratch, tools like ProKit, SaaSKit, and UXKit provide a foundation for launching SaaS products quickly.
          </p>
        </div>
      </section>

      <section className="py-16 border-t border-border bg-[rgb(var(--section-alt-bg-rgb))]" id="faq">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">FAQ</h2>
          <article className="mt-6">
            <h3 className="text-lg font-semibold text-foreground">What makes a good SaaS idea?</h3>
            <p className="mt-2 text-lg text-muted-foreground">
              A good SaaS idea usually appears when the same problem keeps repeating across multiple businesses. When clients repeatedly ask for the same feature or workaround, the problem is often ready to become software.
            </p>
          </article>
          <article className="mt-6">
            <h3 className="text-lg font-semibold text-foreground">Should founders brainstorm SaaS ideas?</h3>
            <p className="mt-2 text-lg text-muted-foreground">
              Brainstorming can help generate ideas, but the strongest SaaS products usually come from solving real problems for real businesses rather than inventing ideas in isolation.
            </p>
          </article>
          <article className="mt-6">
            <h3 className="text-lg font-semibold text-foreground">How do founders validate SaaS ideas?</h3>
            <p className="mt-2 text-lg text-muted-foreground">
              Validation happens when businesses are willing to pay for a solution. If multiple clients experience the same problem and confirm they would pay for a solution, the idea has real market demand.
            </p>
          </article>
        </div>
      </section>

      <section className="py-16">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Key SaaS concepts</h2>
          <ul className="mt-4 space-y-3 text-lg text-muted-foreground">
            <li>
              <Link href="/glossary/product-market-fit" className="font-semibold text-primary">
                Product-market fit
              </Link>
            </li>
            <li>
              <Link href="/glossary/distribution" className="font-semibold text-primary">
                Distribution
              </Link>
            </li>
            <li>
              <Link href="/glossary/authority-stacking" className="font-semibold text-primary">
                Authority stacking
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-24" id="cta">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Seal the idea with customer validation</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            WaaSKit helps you launch a service quickly so you can start discovering SaaS ideas today.
          </p>
          <Link
            href="/kits/waaskit"
            className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-[0.28em] text-white transition hover:bg-primary/80"
          >
            Explore WaaSKit
          </Link>
        </div>
      </section>
    </div>
  </>
  )
}
