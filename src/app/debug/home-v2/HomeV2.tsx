'use client'

import Link from 'next/link'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h9" /><path d="m9 4 4 4-4 4" />
    </svg>
  )
}

function NavBar() {
  return (
    <nav className="hv2-nav" aria-label="Homepage v2 navigation">
      <div className="hv2-nav__inner">
        <Link href="/debug/home-v2" className="hv2-nav__logo" aria-label="ProChat home">
          <span className="hv2-nav__wordmark">ProChat</span>
        </Link>
        <div className="hv2-nav__links">
          <Link href="/memory">Memory</Link>
          <Link href="/memory-qa">QA</Link>
          <Link href="/workbench">Workbench</Link>
          <Link href="/docs">Docs</Link>
        </div>
        <div className="hv2-nav__actions">
          <Link href="/contact?topic=memory-qa-beta#contact-form-card" className="hv2-nav__cta">
            Apply for beta <ArrowIcon />
          </Link>
        </div>
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section className="hv2-hero" aria-labelledby="hv2-hero-title">
      <div className="hv2-hero__ambient" aria-hidden="true">
        <div className="hv2-hero__gradient" />
        <div className="hv2-hero__grid" />
      </div>
      <div className="hv2-hero__content">
        <p className="hv2-hero__kicker">Structured memory for AI workflows</p>
        <h1 id="hv2-hero-title" className="hv2-hero__title">
          Build memory that gets better with your work.
        </h1>
        <p className="hv2-hero__lede">
          ProChat Memory keeps reviewed decisions, evidence, corrections, and lessons reusable — so every new task starts with trusted context instead of zero.
        </p>
        <div className="hv2-hero__actions">
          <Link href="#products" className="hv2-btn hv2-btn--primary">
            Choose a product path <ArrowIcon />
          </Link>
          <Link href="/memory" className="hv2-btn hv2-btn--ghost">
            Understand the Memory model <ArrowIcon />
          </Link>
        </div>
      </div>
      <div className="hv2-hero__media" aria-hidden="true">
        <div className="hv2-hero__stage">
          <div className="hv2-hero__card hv2-hero__card--1">
            <span className="hv2-hero__card-type">Reviewed decision</span>
            <strong>Evidence supports the revised plan</strong>
            <small>Approved · 18 Jul 2026</small>
          </div>
          <div className="hv2-hero__card hv2-hero__card--2">
            <span className="hv2-hero__card-type">Pattern detected</span>
            <strong>Weekly handoffs lose the final decision</strong>
            <small>Seen across 4 reviews</small>
          </div>
          <div className="hv2-hero__card hv2-hero__card--3">
            <span className="hv2-hero__card-type">Source evidence</span>
            <strong>Interview notes linked to the decision</strong>
            <small>12 source excerpts</small>
          </div>
          <div className="hv2-hero__gate" />
          <div className="hv2-hero__memory-badge">
            <span>3 reviewed</span>
            <strong>TRUSTED</strong>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const principles = ['Local files', 'Markdown-first', 'Git-versioned', 'Human-reviewed', 'Model-agnostic']
  return (
    <section className="hv2-trust" aria-label="Trust principles">
      <div className="hv2-trust__inner">
        {principles.map((p, i) => (
          <div key={p} className="hv2-trust__item">
            <span className="hv2-trust__num">{String(i + 1).padStart(2, '0')}</span>
            <span>{p}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ExperientialChapter() {
  return (
    <section className="hv2-chapter" aria-labelledby="hv2-chapter-title">
      <div className="hv2-chapter__inner">
        <div className="hv2-chapter__copy">
          <p className="hv2-kicker">Review Gate</p>
          <h2 id="hv2-chapter-title" className="hv2-chapter__title">
            Work arrives before it becomes memory.
          </h2>
          <p className="hv2-chapter__body">
            Evidence keeps its source, state, and provenance until review changes what can be trusted. Nothing is promoted automatically.
          </p>
        </div>
        <div className="hv2-chapter__media">
          <div className="hv2-chapter__viewport">
            <div className="hv2-chapter__evidence">
              <article className="hv2-evidence-card hv2-evidence-card--code">
                <div className="hv2-evidence-card__head">
                  <span className="hv2-evidence-card__pill">code</span>
                  <span className="hv2-evidence-card__meta">commit 42d8a1</span>
                </div>
                <h3>Use stable data attributes for checkout selectors</h3>
                <p>Replace text-coupled selectors before rerunning the browser flow.</p>
                <span className="hv2-evidence-card__state hv2-evidence-card__state--pending">candidate</span>
              </article>
              <article className="hv2-evidence-card hv2-evidence-card--browser">
                <div className="hv2-evidence-card__head">
                  <span className="hv2-evidence-card__pill">browser</span>
                  <span className="hv2-evidence-card__meta">10:42:16</span>
                </div>
                <h3>Expected confirmation banner was not found</h3>
                <p>Checkout verification failed after the final submit action.</p>
                <span className="hv2-evidence-card__state hv2-evidence-card__state--pending">unreviewed</span>
              </article>
              <article className="hv2-evidence-card hv2-evidence-card--decision">
                <div className="hv2-evidence-card__head">
                  <span className="hv2-evidence-card__pill">decision</span>
                  <span className="hv2-evidence-card__meta">review #218</span>
                </div>
                <h3>Keep production redirects explicit</h3>
                <p>Preserve redirect destinations as signed owner decisions.</p>
                <span className="hv2-evidence-card__state hv2-evidence-card__state--pending">awaiting review</span>
              </article>
            </div>
            <div className="hv2-chapter__gate-line" aria-hidden="true">
              <span>REVIEW GATE</span>
            </div>
            <div className="hv2-chapter__memory-zone">
              <div className="hv2-chapter__memory-header">
                <strong>Memory workspace</strong>
                <span>reviewed · provenance intact</span>
              </div>
              <div className="hv2-chapter__memory-record">
                <strong>Stable selector contract</strong>
                <span>code · 42d8a1 · approved</span>
              </div>
              <div className="hv2-chapter__memory-record">
                <strong>Browser verification requirement</strong>
                <span>evidence · current</span>
              </div>
              <div className="hv2-chapter__memory-record">
                <strong>Production redirect contract</strong>
                <span>owner decision · approved</span>
              </div>
              <div className="hv2-chapter__ready">
                <span>Context verified</span>
                <strong>READY</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MemoryModelSection() {
  const phases = [
    { num: '01', name: 'CAPTURE', title: 'Make the work inspectable.', body: 'Keep the evidence, decisions, and lessons that would otherwise disappear across tools and conversations.' },
    { num: '02', name: 'REVIEW', title: 'Decide what deserves to last.', body: 'Human review can approve, reject, correct, or supersede a candidate before it becomes durable memory.' },
    { num: '03', name: 'RETRIEVE', title: 'Use only what matters now.', body: 'Current intent filters reviewed memory into the smallest useful context set for the task at hand.' },
  ]
  return (
    <section className="hv2-model" aria-labelledby="hv2-model-title">
      <div className="hv2-model__inner">
        <header className="hv2-model__header">
          <p className="hv2-kicker">The Memory model</p>
          <h2 id="hv2-model-title" className="hv2-model__title">
            Turn repeated work into trusted context.
          </h2>
          <p className="hv2-model__lede">
            Capture what the work produced, review what deserves to last, and retrieve only the context that matters for the task in front of you.
          </p>
        </header>
        <div className="hv2-model__phases">
          {phases.map(phase => (
            <article key={phase.num} className="hv2-phase">
              <div className="hv2-phase__num">{phase.num}</div>
              <div className="hv2-phase__label">{phase.name}</div>
              <h3 className="hv2-phase__title">{phase.title}</h3>
              <p className="hv2-phase__body">{phase.body}</p>
            </article>
          ))}
        </div>
        <div className="hv2-model__cta">
          <Link href="/memory" className="hv2-btn hv2-btn--primary">
            Explore the Memory model <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProductsSection() {
  return (
    <section id="products" className="hv2-products" aria-labelledby="hv2-products-title">
      <div className="hv2-products__inner">
        <header className="hv2-products__header">
          <p className="hv2-kicker">Current products</p>
          <h2 id="hv2-products-title" className="hv2-products__title">
            Choose the product that matches your work.
          </h2>
          <p className="hv2-products__lede">
            Memory for QA preserves reviewed testing lessons. Workbench gives ChatGPT a guarded way to work with local projects. Each has a different audience, status, and next step.
          </p>
        </header>
        <div className="hv2-products__grid">
          <article className="hv2-product-card">
            <div className="hv2-product-card__badge">Selected beta</div>
            <h3 className="hv2-product-card__title">ProChat Memory for QA</h3>
            <p className="hv2-product-card__promise">Stop solving the same QA failure twice.</p>
            <p className="hv2-product-card__body">
              Preserve investigation evidence, reviewed conclusions, and corrected lessons so related failures start with usable history.
            </p>
            <ul className="hv2-product-card__features">
              <li>Selected source-available beta for approved participants.</li>
              <li>For QA teams repeatedly investigating related failures.</li>
              <li>Preserves reviewed evidence, corrections, and reusable testing lessons.</li>
            </ul>
            <div className="hv2-product-card__actions">
              <Link href="/contact?topic=memory-qa-beta#contact-form-card" className="hv2-btn hv2-btn--primary">
                Apply for the selected beta <ArrowIcon />
              </Link>
              <Link href="/memory-qa" className="hv2-btn hv2-btn--ghost">
                Explore Memory for QA <ArrowIcon />
              </Link>
            </div>
          </article>
          <article className="hv2-product-card">
            <div className="hv2-product-card__badge">Free · AGPL</div>
            <h3 className="hv2-product-card__title">ProChat Workbench</h3>
            <p className="hv2-product-card__promise">Build apps through ChatGPT locally.</p>
            <p className="hv2-product-card__body">
              Bring exact project context into a bounded workflow where reads, changes, validation, continuity, and Git boundaries remain visible.
            </p>
            <ul className="hv2-product-card__features">
              <li>Free self-hosted AGPL-3.0-only prerelease.</li>
              <li>For developers who want guarded local project work through ChatGPT.</li>
              <li>Keeps reads bounded, changes guarded, validation visible, and Git actions explicit.</li>
            </ul>
            <div className="hv2-product-card__actions">
              <Link href="/workbench" className="hv2-btn hv2-btn--primary">
                Start with Workbench <ArrowIcon />
              </Link>
              <Link href="https://github.com/prochattools/workbench" className="hv2-btn hv2-btn--ghost">
                View the repository <ArrowIcon />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function ContextAssemblySection() {
  return (
    <section className="hv2-assembly" aria-labelledby="hv2-assembly-title">
      <div className="hv2-assembly__inner">
        <header className="hv2-assembly__header">
          <p className="hv2-kicker">Context Assembly</p>
          <h2 id="hv2-assembly-title" className="hv2-assembly__title">
            The answer shows where its context came from.
          </h2>
          <p className="hv2-assembly__lede">
            Applied context stays inspectable rather than disappearing behind the response. Provenance remains attached to every recommendation.
          </p>
        </header>
        <div className="hv2-assembly__demo">
          <div className="hv2-assembly__step hv2-assembly__step--active">
            <div className="hv2-assembly__step-num">01</div>
            <h3>Task intent</h3>
            <p>Start with the task, not the archive.</p>
          </div>
          <div className="hv2-assembly__step">
            <div className="hv2-assembly__step-num">02</div>
            <h3>Relevance filtering</h3>
            <p>Only reviewed records that match the task.</p>
          </div>
          <div className="hv2-assembly__step">
            <div className="hv2-assembly__step-num">03</div>
            <h3>Context assembly</h3>
            <p>Selected records form bounded context.</p>
          </div>
          <div className="hv2-assembly__step">
            <div className="hv2-assembly__step-num">04</div>
            <h3>Applied context</h3>
            <p>Response with visible provenance.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  return (
    <section className="hv2-arch" aria-labelledby="hv2-arch-title">
      <div className="hv2-arch__inner">
        <header className="hv2-arch__header">
          <p className="hv2-kicker">Architecture</p>
          <h2 id="hv2-arch-title" className="hv2-arch__title">
            Local, structured, human-controlled.
          </h2>
          <p className="hv2-arch__lede">
            Memory lives in local Markdown files. Git provides versioning. Human review gates every promotion. No cloud dependency required.
          </p>
        </header>
        <div className="hv2-arch__diagram">
          <div className="hv2-arch__layer hv2-arch__layer--source">
            <h4>Sources</h4>
            <div className="hv2-arch__nodes">
              <span>Conversations</span>
              <span>Code changes</span>
              <span>Browser evidence</span>
              <span>Owner decisions</span>
            </div>
          </div>
          <div className="hv2-arch__flow" aria-hidden="true" />
          <div className="hv2-arch__layer hv2-arch__layer--gate">
            <h4>Review Gate</h4>
            <div className="hv2-arch__nodes">
              <span>Approve</span>
              <span>Reject</span>
              <span>Correct</span>
              <span>Supersede</span>
            </div>
          </div>
          <div className="hv2-arch__flow" aria-hidden="true" />
          <div className="hv2-arch__layer hv2-arch__layer--memory">
            <h4>Durable Memory</h4>
            <div className="hv2-arch__nodes">
              <span>Markdown files</span>
              <span>Git versioned</span>
              <span>Searchable</span>
              <span>Retrievable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="hv2-closing" aria-labelledby="hv2-closing-title">
      <div className="hv2-closing__inner">
        <h2 id="hv2-closing-title" className="hv2-closing__title">
          Put trusted memory to work.
        </h2>
        <p className="hv2-closing__body">
          Apply for the selected QA beta, begin with Workbench, or discuss one repeated workflow that should become durable Memory.
        </p>
        <div className="hv2-closing__actions">
          <Link href="/contact?topic=memory-qa-beta#contact-form-card" className="hv2-btn hv2-btn--primary hv2-btn--large">
            Apply for the Memory for QA beta <ArrowIcon />
          </Link>
          <Link href="/workbench" className="hv2-btn hv2-btn--secondary hv2-btn--large">
            Start with Workbench <ArrowIcon />
          </Link>
          <Link href="/contact?topic=memory#contact-form-card" className="hv2-btn hv2-btn--ghost">
            Discuss a Memory workflow <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="hv2-footer">
      <div className="hv2-footer__inner">
        <div className="hv2-footer__top">
          <div className="hv2-footer__brand">
            <span className="hv2-footer__wordmark">ProChat</span>
            <p className="hv2-footer__tagline">Structured memory for AI workflows.</p>
          </div>
          <div className="hv2-footer__columns">
            <div className="hv2-footer__col">
              <h4>Products</h4>
              <Link href="/memory">ProChat Memory</Link>
              <Link href="/memory-qa">Memory for QA</Link>
              <Link href="/workbench">Workbench</Link>
              <Link href="/studio">Studio</Link>
            </div>
            <div className="hv2-footer__col">
              <h4>Resources</h4>
              <Link href="/docs">Documentation</Link>
              <Link href="/blog">Blog</Link>
              <Link href="https://github.com/prochattools">GitHub</Link>
              <Link href="/docs/getting-started">Getting Started</Link>
              <Link href="/docs/design-system">Design System</Link>
            </div>
            <div className="hv2-footer__col">
              <h4>Use Cases</h4>
              <Link href="/memory">Decision memory</Link>
              <Link href="/memory-qa">QA investigations</Link>
              <Link href="/workbench">Local project work</Link>
              <Link href="/memory">Pattern detection</Link>
            </div>
            <div className="hv2-footer__col">
              <h4>Company</h4>
              <Link href="/contact">Contact</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/blog">Updates</Link>
            </div>
          </div>
        </div>
        <div className="hv2-footer__bottom">
          <span>&copy; 2026 ProChat. All rights reserved.</span>
          <div className="hv2-footer__bottom-links">
            <Link href="/terms">Terms</Link>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function HomeV2() {
  return (
    <div className="hv2-page">
      <NavBar />
      <main>
        <HeroSection />
        <TrustStrip />
        <ExperientialChapter />
        <MemoryModelSection />
        <ProductsSection />
        <ContextAssemblySection />
        <ArchitectureSection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  )
}
