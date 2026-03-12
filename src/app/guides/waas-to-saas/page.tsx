import Link from 'next/link'

export const metadata = {
  title: 'From Website-as-a-Service to SaaS | ProChat',
  description:
    'Learn the practical path from selling niche websites to building SaaS products. A guide to starting with WaaS and evolving into SaaS using the ProChat stack.',
  alternates: { canonical: 'https://prochat.tools/guides/waas-to-saas' },
  openGraph: {
    title: 'From Website-as-a-Service to SaaS | ProChat',
    description:
      'Learn the practical path from selling niche websites to building SaaS products. A guide to starting with WaaS and evolving into SaaS using the ProChat stack.',
    url: 'https://prochat.tools/guides/waas-to-saas',
    siteName: 'ProChat',
    type: 'article',
  },
}

const sectionClass = 'max-w-5xl px-page mx-auto'

export default function WaaSToSaaSGuide() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'From Website-as-a-Service to SaaS',
    description: 'The practical path to building a SaaS business from real customer demand.',
    author: {
      '@type': 'Organization',
      name: 'ProChat',
    },
    publisher: {
      '@type': 'Organization',
      name: 'ProChat',
      url: 'https://prochat.tools',
    },
    mainEntityOfPage: 'https://prochat.tools/guides/waas-to-saas',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="space-y-12 bg-[rgb(var(--section-bg-rgb))] pb-20 text-foreground">
      <section className="scroll-mt-24 bg-[rgb(var(--section-alt-bg-rgb))] py-24 text-center">
        <div className="mx-auto max-w-4xl px-page">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Guide</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">From Website-as-a-Service to SaaS</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            The practical path to building a SaaS business from real customer demand.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            If you want to discover SaaS ideas faster, read <Link href="/guides/how-to-find-saas-ideas" className="font-semibold text-primary">How to Find SaaS Ideas</Link> and revisit the model in <Link href="/guides/what-is-website-as-a-service" className="font-semibold text-primary">What is Website-as-a-Service?</Link>.
          </p>
          <p className="mt-6 text-base text-muted-foreground">
            Most founders try to build SaaS first and then struggle to find customers. A better path is to launch a niche Website-as-a-Service with <Link href="/kits/waaskit" className="font-semibold text-primary">WaaSKit</Link>, work with real clients, learn their pain points, and evolve those solutions into SaaS.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/kits/waaskit"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-white transition hover:bg-primary/80"
            >
              Explore WaaSKit
            </Link>
            <Link
              href="/kits/saaskit"
              className="rounded-full border border-border px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-primary transition hover:bg-primary/5"
            >
              Explore SaaSKit
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16" id="problem">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">The problem with building SaaS first</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Many founders build software before they understand a market. They spend months building features, billing, dashboards, and onboarding flows without knowing whether anyone will pay. This creates the trap of building first and searching for demand later.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--section-alt-bg-rgb))]" id="waas">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Why Website-as-a-Service is the better starting point</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Website-as-a-Service lets founders start with a niche, sell immediately, and work with real businesses through <Link href="/kits/waaskit" className="font-semibold text-primary">WaaSKit</Link>. Instead of guessing problems they hear them directly from customers. Instead of waiting for validation, they get paid while learning.
          </p>
        </div>
      </section>

      <section className="py-16" id="transition">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">How WaaS becomes SaaS</h2>
          <p className="mt-4 text-lg text-muted-foreground">The transition usually looks like this:</p>
          <ul className="mt-6 space-y-3 text-lg text-muted-foreground">
            <li>• choose a niche</li>
            <li>• sell websites to real clients</li>
            <li>• observe recurring problems</li>
            <li>• solve those problems repeatedly</li>
            <li>• identify what can become software</li>
            <li>• turn repeated solutions into SaaS</li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--section-alt-bg-rgb))]" id="stack">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">The ProChat stack</h2>
          <p className="mt-4 text-lg text-muted-foreground">ProChat supports this journey with a layered product stack.</p>
          <ul className="mt-6 space-y-3 text-lg text-muted-foreground">
            <li>
              <Link href="/kits/waaskit" className="font-semibold text-primary">
                WaaSKit
              </Link>{' '}
              — start a niche Website-as-a-Service business and prove the market.
            </li>
            <li>
              <Link href="/kits/prokit" className="font-semibold text-primary">
                ProKit
              </Link>{' '}
              — provides the reusable infrastructure once you turn solutions into software.
            </li>
            <li>
              <Link href="/kits/saaskit" className="font-semibold text-primary">
                SaaSKit
              </Link>{' '}
              — production-ready SaaS foundation for scaling what you learned from clients.
            </li>
            <li>
              <Link href="/kits/uxkit" className="font-semibold text-primary">
                UXKit
              </Link>{' '}
              — provides the UI system when you need faster front-end polish.
            </li>
            <li>
              <Link href="/system/prochat-os" className="font-semibold text-primary">
                ProChat OS
              </Link>{' '}
              — command center that keeps every product running once you operate multiple kits.
            </li>
          </ul>
        </div>
      </section>

      <section className="py-24" id="cta">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Start where demand already exists</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The fastest path to SaaS is often not software first. It is services first, demand first, and software second.
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
