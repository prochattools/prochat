import StructuredData from '@/components/StructuredData'
import PublicEditorialHero from '@/components/public/PublicEditorialHero'
import { getSEOTags } from '@/libs/seo'
import { getDocsSchemas } from '@/libs/structured-data'

const DOCS_DESCRIPTION =
  'Documentation and repository guidance for ProChat Memory for QA and ProChat Workbench.'

export async function generateMetadata() {
  return getSEOTags({
    title: 'ProChat Documentation | Memory for QA and Workbench',
    description: DOCS_DESCRIPTION,
    keywords: [
      'Memory for QA documentation',
      'ProChat Workbench documentation',
      'reviewed QA memory',
      'guarded local project work',
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
      line2: 'Memory for QA + Workbench',
      subtitle: 'Two repositories. Two current documentation paths.',
    },
    canonicalUrlRelative: '/docs',
  })
}

const paths = [
  {
    id: 'memory-qa',
    index: '01',
    eyebrow: 'Selected beta',
    title: 'Memory for QA',
    description:
      'Evaluate reviewed QA memory using the public repository, current beta license, repository docs, and issue tracker.',
    signals: ['Reviewed investigations', 'Evidence + correction', 'Selected beta'],
    links: [
      { label: 'Repository', href: 'https://github.com/prochattools/memory-qa' },
      { label: 'Documentation', href: 'https://github.com/prochattools/memory-qa/tree/main/docs' },
      { label: 'Issues', href: 'https://github.com/prochattools/memory-qa/issues' },
      { label: 'Beta access', href: '/contact?topic=memory-qa-beta#contact-form-card', internal: true },
    ],
  },
  {
    id: 'workbench',
    index: '02',
    eyebrow: 'Public prerelease',
    title: 'Workbench',
    description:
      'Use the public repository for setup, guarded local-project workflows, validation guidance, contribution rules, and release notes.',
    signals: ['Bounded context', 'Guarded changes', 'Explicit validation'],
    links: [
      { label: 'Repository', href: 'https://github.com/prochattools/workbench' },
      { label: 'README', href: 'https://github.com/prochattools/workbench/blob/main/README.md' },
      { label: 'Documentation', href: 'https://github.com/prochattools/workbench/tree/main/docs' },
      { label: 'Issues', href: 'https://github.com/prochattools/workbench/issues' },
    ],
  },
] as const

export default function DocsIndexPage() {
  return (
    <main className="pc-body-page pc-docs-hub" data-body-family="docs">
      <StructuredData id="schema-docs" data={getDocsSchemas()} />

      <PublicEditorialHero
        variant="docs"
        eyebrow="Documentation / current repositories"
        title={
          <>
            Two products.<br />
            <strong>Two documentation paths.</strong>
          </>
        }
        description="The website no longer maintains a second documentation universe. Current implementation guidance lives with the Memory for QA and Workbench repositories, where the code, release state, issues, and documentation stay together."
        primaryAction={{ href: '#repository-docs', label: 'Choose a repository' }}
        signals={['Memory for QA', 'Workbench', 'Repository-owned docs']}
        visualTitle="DOCS / CURRENT"
        visualCaption="CHOOSE → READ → EVALUATE → REPORT"
      />

      <section className="pc-docs-hub__paths" id="repository-docs" aria-labelledby="repository-docs-title">
        <div className="pc-docs-hub__intro">
          <div className="pc-body-kicker"><span aria-hidden="true" />Repository documentation</div>
          <h2 id="repository-docs-title">Start where the implementation lives.</h2>
          <p>
            Product documentation now follows the repositories instead of duplicating setup and implementation guidance inside the marketing site.
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
