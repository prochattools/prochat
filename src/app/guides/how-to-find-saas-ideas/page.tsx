import Link from 'next/link'

export const metadata = {
  title: 'How to Find SaaS Ideas | ProChat',
  description: 'A practical method for discovering software ideas from real business problems.',
  alternates: { canonical: 'https://prochat.tools/guides/how-to-find-saas-ideas' },
  openGraph: {
    title: 'How to Find SaaS Ideas | ProChat',
    description: 'A practical method for discovering software ideas from real business problems.',
    url: 'https://prochat.tools/guides/how-to-find-saas-ideas',
    siteName: 'ProChat',
    type: 'article',
  },
}

const sectionClass = 'max-w-5xl px-page mx-auto'

export default function HowToFindSaaSIdeasGuide() {
  return (
    <div className="space-y-12 bg-[rgb(var(--section-bg-rgb))] pb-20 text-foreground">
      <section className="scroll-mt-24 bg-[rgb(var(--section-alt-bg-rgb))] py-24 text-center">
        <div className="mx-auto max-w-4xl px-page">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground">Guide</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-foreground md:text-5xl">How to Find SaaS Ideas</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A practical method for discovering software ideas from real business problems.
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
            They build features without understanding recurring customer pain, then wonder why adoption is slow.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--section-alt-bg-rgb))]" id="brainstorm">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Why brainstorming fails</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Brainstorming often produces nice-to-have ideas without validating whether anyone pays for them.
          </p>
        </div>
      </section>

      <section className="py-16" id="method">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">The best way to find SaaS ideas</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start with services (Website-as-a-Service or consulting), talk to clients, and capture repeated requests before automating.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[rgb(var(--section-alt-bg-rgb))]" id="signals">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">The three signals of a SaaS opportunity</h2>
          <ul className="mt-6 space-y-3 text-lg text-muted-foreground">
            <li>• The same problem comes up repeatedly</li>
            <li>• Clients keep asking for the same feature</li>
            <li>• A manual workaround resurfaces over and over</li>
          </ul>
        </div>
      </section>

      <section className="py-16" id="building">
        <div className={sectionClass}>
          <h2 className="text-3xl font-bold text-foreground">Building the SaaS after validation</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Once those signals appear, automate the workflows using the ProChat stack and transition customers to the new product.
          </p>
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
  )
}
