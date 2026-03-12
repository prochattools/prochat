import Link from 'next/link'

export const metadata = {
  title: 'What is Website-as-a-Service? | ProChat',
  description: 'Learn how Website-as-a-Service works and how founders use it to discover SaaS opportunities.',
  alternates: { canonical: 'https://prochat.tools/guides/what-is-website-as-a-service' },
  openGraph: {
    title: 'What is Website-as-a-Service? | ProChat',
    description: 'Learn how Website-as-a-Service works and how founders use it to discover SaaS opportunities.',
    url: 'https://prochat.tools/guides/what-is-website-as-a-service',
    siteName: 'ProChat',
    type: 'article',
  },
}

const sectionClass = 'max-w-5xl px-page mx-auto'

export default function WhatIsWaaSGuide() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
      <div className="space-y-12 bg-[rgb(var(--section-bg-rgb))] pb-20 text-foreground">
      <section className="scroll-mt-24 bg-[rgb(var(--section-alt-bg-rgb))] py-24 text-center">
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
  )
}
