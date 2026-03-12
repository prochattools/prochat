import Link from 'next/link'

export const metadata = {
  title: 'What is Website-as-a-Service? | ProChat',
  description: 'Learn how Website-as-a-Service works and how founders use it to discover SaaS opportunities.',
  alternates: { canonical: 'https://prochat.tools/guides/what-is-website-as-a-service' },
  openGraph: {
    title: 'What is Website-as-a-Service? | ProChat',
    url: 'https://prochat.tools/guides/what-is-website-as-a-service',
    siteName: 'ProChat',
    type: 'article',
  },
}

const sectionClass = 'max-w-5xl px-page mx-auto'

export default function WhatIsWaaSGuide() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What is Website-as-a-Service?',
    author: {
      '@type': 'Organization',
      name: 'ProChat',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ProChat',
      url: 'https://prochat.tools',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does Website-as-a-Service mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Website-as-a-Service is a business model where websites are provided as an ongoing service instead of a one-time project. Clients pay monthly for hosting, updates, maintenance, and support.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is WaaS different from traditional web development?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Traditional web development delivers a website as a finished project. Website-as-a-Service creates an ongoing relationship where the provider continuously improves and maintains the website.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Website-as-a-Service lead to SaaS ideas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. When founders work closely with clients through WaaS, they start noticing repeated problems and workflows. Those patterns often reveal opportunities for building SaaS products.',
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
                name: 'What is Website-as-a-Service?',
                item: 'https://prochat.tools/guides/what-is-website-as-a-service',
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
            <span className="text-muted-foreground">What is Website-as-a-Service?</span>
          </nav>
        </div>
        <section className="bg-[rgb(var(--section-alt-bg-rgb))] py-24 text-center">
        <div className="mx-auto max-w-4xl px-page">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Guide</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">What is Website-as-a-Service?</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Website-as-a-Service (WaaS) is a model where websites are sold as subscription services instead of one-time projects.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Instead of building a website and handing it over, the provider hosts, maintains, and improves the website continuously for a monthly fee.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            For founders, this creates something extremely valuable: direct contact with real businesses and immediate revenue.
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

      <section className="py-16" id="definition">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">What Website-as-a-Service means</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Website-as-a-Service packages a niche website offering into a repeatable subscription business, where you deliver value and learn customer pain points before building software to automate the solution.
          </p>
          <p className="mt-3 text-lg text-muted-foreground">
            Website-as-a-Service is often the opening chapter of a longer path. Read <Link href="/guides/waas-to-saas" className="font-semibold text-primary">From Website-as-a-Service to SaaS</Link> to explore the full strategy.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--section-alt-bg-rgb))]" id="traditional">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">The traditional website model</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Most web development follows a project model.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">A client pays once.</p>
          <p className="text-lg text-muted-foreground">A website is delivered.</p>
          <p className="text-lg text-muted-foreground">The relationship often ends.</p>
          <p className="mt-4 text-lg text-muted-foreground">This model creates two problems:</p>
          <ul className="mt-3 space-y-2 text-lg text-muted-foreground">
            <li>• income becomes unpredictable</li>
            <li>• learning from clients becomes limited</li>
          </ul>
          <p className="mt-3 text-lg text-muted-foreground">Once the project ends, the feedback loop disappears.</p>
        </div>
      </section>

      <section className="py-16" id="waas-model">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">The Website-as-a-Service model</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Website-as-a-Service changes this structure.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            Instead of selling a product once, you sell a service over time.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            Clients pay monthly for:
          </p>
          <ul className="mt-3 space-y-2 text-lg text-muted-foreground">
            <li>• hosting</li>
            <li>• maintenance</li>
            <li>• updates</li>
            <li>• improvements</li>
            <li>• support</li>
          </ul>
          <p className="mt-3 text-lg text-muted-foreground">This creates predictable revenue and long-term relationships.</p>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--section-alt-bg-rgb))]" id="discovery">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Why founders use WaaS to discover SaaS ideas</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Working closely with businesses reveals patterns.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">Clients repeat the same requests.</p>
          <p className="text-lg text-muted-foreground">They struggle with similar workflows.</p>
          <p className="mt-4 text-lg text-muted-foreground">Over time you notice three signals:</p>
          <ul className="mt-3 space-y-2 text-lg text-muted-foreground">
            <li>• the same problem repeats</li>
            <li>• the same feature is requested</li>
            <li>• the same manual workaround keeps happening</li>
          </ul>
          <p className="mt-3 text-lg text-muted-foreground">Those patterns are often the beginning of SaaS.</p>
        </div>
      </section>

      <section className="py-16" id="niches">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Good niches for starting WaaS</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Some niches are easier to start with because they already understand the value of professional services.
          </p>
          <p className="mt-3 text-lg text-muted-foreground">Examples include:</p>
          <ul className="mt-3 space-y-2 text-lg text-muted-foreground">
            <li>• lawyers</li>
            <li>• real estate agencies</li>
            <li>• accountants</li>
          </ul>
          <p className="mt-3 text-lg text-muted-foreground">
            These businesses depend heavily on reputation and client acquisition, making professional websites extremely valuable.
          </p>
        </div>
      </section>

      <section className="py-16 border-t border-border bg-[rgb(var(--section-alt-bg-rgb))]" id="faq">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">FAQ</h2>
          <article className="mt-6">
            <h3 className="text-lg font-semibold text-foreground">What does Website-as-a-Service mean?</h3>
            <p className="mt-2 text-lg text-muted-foreground">
              Website-as-a-Service is a business model where websites are provided as an ongoing service instead of a one-time project. Clients pay monthly for hosting, updates, maintenance, and support.
            </p>
          </article>
          <article className="mt-6">
            <h3 className="text-lg font-semibold text-foreground">How is WaaS different from traditional web development?</h3>
            <p className="mt-2 text-lg text-muted-foreground">
              Traditional web development delivers a website as a finished project. Website-as-a-Service creates an ongoing relationship where the provider continuously improves and maintains the website.
            </p>
          </article>
          <article className="mt-6">
            <h3 className="text-lg font-semibold text-foreground">Can Website-as-a-Service lead to SaaS ideas?</h3>
            <p className="mt-2 text-lg text-muted-foreground">
              Yes. When founders work closely with clients through WaaS, they start noticing repeated problems and workflows. Those patterns often reveal opportunities for building SaaS products.
            </p>
          </article>
        </div>
      </section>

      <section className="py-16">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Key SaaS concepts</h2>
          <ul className="mt-4 space-y-3 text-lg text-muted-foreground">
            <li>
              <Link href="/glossary/recurring-revenue" className="font-semibold text-primary">
                Recurring revenue
              </Link>
            </li>
            <li>
              <Link href="/glossary/customer-acquisition" className="font-semibold text-primary">
                Customer acquisition
              </Link>
            </li>
            <li>
              <Link href="/glossary/productized-service" className="font-semibold text-primary">
                Productized service
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-24" id="cta">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Start with WaaS to build SaaS with confidence</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Build relationships first, understand recurring demands, and let the SaaS idea emerge while you get paid each month.
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
