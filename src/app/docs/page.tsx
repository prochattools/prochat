import StructuredData from '@/components/StructuredData'
import PublicEditorialHero from '@/components/public/PublicEditorialHero'
import { getSEOTags } from '@/libs/seo'
import { getDocsSchemas } from '@/libs/structured-data'

const DOCS_DESCRIPTION =
  'Documentation for Evermind, Nevermind, and Mastermind.'

export async function generateMetadata() {
  return getSEOTags({
    title: 'ProChat Documentation | Evermind, Nevermind, and Mastermind',
    description: DOCS_DESCRIPTION,
    keywords: [
      'Evermind documentation',
      'Nevermind documentation',
      'Mastermind documentation',
      'controlled AI execution',
    ],
    openGraph: {
      title: 'ProChat Documentation',
      description: DOCS_DESCRIPTION,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ProChat Documentation',
      description: DOCS_DESCRIPTION,
    },
    socialImage: {
      line1: 'ProChat Documentation',
      line2: 'Memory + context + execution',
      subtitle: 'Three products. One connected direction.',
    },
    canonicalUrlRelative: '/docs',
  })
}

const paths = [
  {
    id: 'evermind',
    index: '01',
    eyebrow: 'Human-owned memory',
    title: 'Evermind',
    description:
      'Start with local, portable memory that keeps the Capture · Review · Retrieve loop clear and inspectable.',
    signals: ['Free / local-first', 'Capture · Review · Retrieve', 'Human-owned'],
    links: [
      { label: 'Explore Evermind', href: '/evermind', internal: true },
      { label: 'Contact ProChat', href: '/contact', internal: true },
    ],
  },
  {
    id: 'nevermind',
    index: '02',
    eyebrow: 'Context layer',
    title: 'Nevermind',
    description:
      'See how Nevermind turns durable memory into working context for the AI tools and tasks you choose.',
    signals: ['Working context', 'Relevant retrieval', 'Tool-flexible'],
    links: [
      { label: 'Explore Nevermind', href: '/nevermind', internal: true },
      { label: 'Contact ProChat', href: '/contact', internal: true },
    ],
  },
  {
    id: 'mastermind',
    index: '03',
    eyebrow: 'Reasoning / orchestration',
    title: 'Mastermind',
    description:
      'Understand how Mastermind turns vague intentions into executable plans while bounded work and validation stay visible.',
    signals: ['Real project context', 'Bounded delegation', 'Explicit validation'],
    links: [
      { label: 'Explore Mastermind', href: '/mastermind', internal: true },
      { label: 'Contact ProChat', href: '/contact', internal: true },
    ],
  },
] as const

export default function DocsIndexPage() {
  return (
    <main className="pc-body-page pc-docs-hub" data-body-family="docs">
      <StructuredData id="schema-docs" data={getDocsSchemas()} />

      <PublicEditorialHero
        variant="docs"
        eyebrow="Documentation / product family"
        title={
          <>
            Three products.<br />
            <strong>One connected direction.</strong>
          </>
        }
        description="Explore the product family from human-owned memory to working context and controlled execution. Each product has a distinct role, and the pages keep those boundaries explicit."
        primaryAction={{ href: '#repository-docs', label: 'Choose a product' }}
        signals={['Evermind', 'Nevermind', 'Mastermind']}
        visualTitle="DOCS / PRODUCT FAMILY"
        visualCaption="REMEMBER → CONTEXTUALIZE → DIRECT"
      />

      <section className="pc-docs-hub__paths" id="repository-docs" aria-labelledby="repository-docs-title">
        <div className="pc-docs-hub__intro">
          <div className="pc-body-kicker"><span aria-hidden="true" />Product documentation</div>
          <h2 id="repository-docs-title">Start with the layer that fits the work.</h2>
          <p>
            Product documentation starts with the role each layer plays, so the path from memory to execution remains understandable.
          </p>
        </div>

        <div className="pc-docs-hub__grid">
          {paths.map(path => (
            <article key={path.id} className="pc-docs-hub__card" data-doc-product={path.id}>
              <header>
                <span>{path.index}</span>
                <div>
                  <small>{path.eyebrow}</small>
                  <h3>{path.title}</h3>
                </div>
              </header>
              <p>{path.description}</p>

              <ul className="pc-docs-hub__signals" aria-label={`${path.title} documentation signals`}>
                {path.signals.map(signal => <li key={signal}>{signal}</li>)}
              </ul>

              <div className="pc-docs-hub__links">
                {path.links.map(link => 'internal' in link && link.internal ? (
                  <a key={link.label} href={link.href}>{link.label}<span aria-hidden="true">→</span></a>
                ) : (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label}<span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="pc-docs-hub__boundary" aria-labelledby="docs-boundary-title">
        <div>
          <div className="pc-body-kicker"><span aria-hidden="true" />Documentation boundary</div>
          <h2 id="docs-boundary-title">No legacy SaaS documentation is maintained here.</h2>
        </div>
        <p>
          Legacy SaaS, launch, workflow, learning, and prompt documentation is retired from the active public site. Historical context remains available through repository history when needed.
        </p>
      </section>
    </main>
  )
}
