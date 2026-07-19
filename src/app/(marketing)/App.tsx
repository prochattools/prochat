import Link from 'next/link'

import {
  CaptureComposition,
  MemorySystemComposition,
  QABetaAdoptionComposition,
  QAMemoryFlowComposition,
  RetrievalComposition,
  ReviewStructureComposition,
  WorkbenchAdoptionComposition,
  WorkbenchGuardedFlowComposition,
} from './components/illustrations/compositions'
import { MemoryLaserField } from './components/motion/MemoryLaserField'
import './prochat-memory-theme.css'

const navigation = [
  { href: '/memory', label: 'Memory' },
  { href: '/memory-qa', label: 'Memory for QA' },
  { href: '/workbench', label: 'Workbench' },
  { href: '/docs', label: 'Documentation' },
] as const

const memoryCards = [
  {
    className: 'pm-memory-card pm-memory-card--reviewed',
    eyebrow: 'Reviewed decision',
    title: 'Evidence supports the revised plan',
    meta: 'Approved · 18 Jul 2026',
    icon: 'check',
  },
  {
    className: 'pm-memory-card pm-memory-card--pattern',
    eyebrow: 'Pattern detected',
    title: 'Weekly handoffs lose the final decision',
    meta: 'Seen across 4 reviews',
    icon: 'branch',
  },
  {
    className: 'pm-memory-card pm-memory-card--source',
    eyebrow: 'Source evidence',
    title: 'Interview notes linked to the decision',
    meta: '12 source excerpts',
    icon: 'source',
  },
  {
    className: 'pm-memory-card pm-memory-card--correction',
    eyebrow: 'Correction',
    title: 'Original timeline assumption retired',
    meta: 'Superseded · Version 3',
    icon: 'rotate',
  },
  {
    className: 'pm-memory-card pm-memory-card--context',
    eyebrow: 'Relevant context',
    title: '3 reviewed records selected for this plan',
    meta: 'Current intent only',
    icon: 'search',
  },
  {
    className: 'pm-memory-card pm-memory-card--qa',
    eyebrow: 'Durable memory',
    title: 'Decision, evidence, and correction history',
    meta: 'Structured for reuse',
    icon: 'layers',
  },
] as const

const trustPrinciples = [
  'Local files',
  'Markdown-first',
  'Git-versioned',
  'Human-reviewed',
  'Model-agnostic',
] as const

const qaProductPoints = [
  'Preserve logs, screenshots, selectors, environments, data, and decisions together.',
  'Keep stale lessons correctable instead of silently reusing old assumptions.',
  'Retrieve reviewed QA context when a related failure appears later.',
] as const

const workbenchProductPoints = [
  'Admit exact local project context without widening source access by default.',
  'Keep reads bounded, changes guarded, validation visible, and Git actions explicit.',
  'Resume a run with the objective, evidence, file state, and next boundary intact.',
] as const

const memoryQaRepository = 'https://github.com/prochattools/memory-qa'
const workbenchRepository = 'https://github.com/prochattools/workbench'
const prochatDiscussions = 'https://github.com/orgs/prochattools/discussions'
const memoryQaBetaContactPath = '/contact?topic=memory-qa-beta#contact-form-card'

const memoryQaAdoptionActions = [
  {
    label: 'Apply for the selected beta',
    href: memoryQaBetaContactPath,
    kind: 'primary',
  },
  {
    label: 'View the repository on GitHub',
    href: memoryQaRepository,
    kind: 'secondary',
    external: true,
  },
  {
    label: 'Star Memory for QA on GitHub',
    href: memoryQaRepository,
    kind: 'secondary',
    external: true,
  },
  {
    label: 'Report sanitized feedback in GitHub Issues',
    href: `${memoryQaRepository}/issues`,
    kind: 'secondary',
    external: true,
  },
  {
    label: 'Join ProChat discussions on GitHub',
    href: prochatDiscussions,
    kind: 'secondary',
    external: true,
  },
] as const

const closingActions = [
  {
    label: 'Apply for the Memory for QA beta',
    href: memoryQaBetaContactPath,
    kind: 'primary',
    external: false,
  },
  {
    label: 'Explore ProChat Workbench',
    href: '/workbench',
    kind: 'secondary',
    external: false,
  },
  {
    label: 'View the Memory for QA repository',
    href: memoryQaRepository,
    kind: 'text',
    external: true,
  },
] as const

const workbenchAdoptionActions = [
  {
    label: 'View ProChat Workbench on GitHub',
    href: workbenchRepository,
    kind: 'primary',
    external: true,
  },
  {
    label: 'Star Workbench on GitHub',
    href: workbenchRepository,
    kind: 'secondary',
    external: true,
  },
  {
    label: 'Clone and self-host from the repository README',
    href: `${workbenchRepository}/blob/main/README.md`,
    kind: 'secondary',
    external: true,
  },
  {
    label: 'Open a Workbench issue on GitHub',
    href: `${workbenchRepository}/issues`,
    kind: 'secondary',
    external: true,
  },
  {
    label: 'Join a Workbench discussion on GitHub',
    href: `${workbenchRepository}/discussions`,
    kind: 'secondary',
    external: true,
  },
  {
    label: 'Propose a contribution through CONTRIBUTING.md',
    href: `${workbenchRepository}/blob/main/CONTRIBUTING.md`,
    kind: 'secondary',
    external: true,
  },
] as const

type IconName = (typeof memoryCards)[number]['icon']

function MemoryIcon({ name }: { name: IconName }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  if (name === 'check') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    )
  }

  if (name === 'branch') {
    return (
      <svg {...common}>
        <circle cx="6" cy="6" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <path d="M8 6h8M7.2 7.6 11 16M16.8 7.6 13 16" />
      </svg>
    )
  }

  if (name === 'source') {
    return (
      <svg {...common}>
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
      </svg>
    )
  }

  if (name === 'rotate') {
    return (
      <svg {...common}>
        <path d="M4 11a8 8 0 1 1 2.3 5.7" />
        <path d="M4 5v6h6" />
      </svg>
    )
  }

  if (name === 'search') {
    return (
      <svg {...common}>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="m15 15 4 4" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="m4 8 8-4 8 4-8 4-8-4Z" />
      <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h9" />
      <path d="m9 4 4 4-4 4" />
    </svg>
  )
}

type AdoptionAction = {
  readonly label: string
  readonly href: string
  readonly kind: 'primary' | 'secondary'
  readonly external?: boolean
}

function AdoptionActionLink({
  action,
  product,
}: {
  action: AdoptionAction
  product: 'qa' | 'workbench'
}) {
  const className = [
    'pm-adoption-action',
    `pm-adoption-action--${action.kind}`,
    `pm-adoption-action--${product}`,
  ].join(' ')

  const content = (
    <>
      <span>{action.label}</span>
      <ArrowIcon />
    </>
  )

  if (action.external) {
    return (
      <a
        href={action.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={action.href} className={className}>
      {content}
    </Link>
  )
}

export default function App() {
  return (
    <main className="pm-marketing-page pm-homepage">
      <section className="pm-hero-section" aria-labelledby="pm-hero-title">
        <MemoryLaserField />
        <div className="pm-grid-overlay" aria-hidden="true" />

        <header className="pm-site-header">
          <nav className="pm-navbar" aria-label="Primary navigation">
            <Link href="/" className="pm-wordmark" aria-label="ProChat home">
              <span className="pm-wordmark-mark">P</span>
              <span>prochat</span>
            </Link>

            <div className="pm-nav-links">
              {navigation.map(item => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pm-nav-actions">
              <Link href="/contact" className="pm-nav-text-action">
                Contact
              </Link>
              <Link href="/memory" className="pm-pill-button pm-pill-button--dark">
                Explore Memory
                <ArrowIcon />
              </Link>
            </div>

            <details className="pm-mobile-nav">
              <summary>Menu</summary>
              <div className="pm-mobile-nav-panel">
                {navigation.map(item => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
                <Link href="/contact">Contact</Link>
                <Link href="/memory">Explore Memory</Link>
              </div>
            </details>
          </nav>
        </header>

        <div className="pm-hero-content">
          <div className="pm-status-pill">
            <span className="pm-status-dot" aria-hidden="true" />
            Local, reviewed, durable context
          </div>

          <h1 id="pm-hero-title">Build memory that gets better with your work.</h1>
          <p className="pm-hero-lede">
            ProChat Memory keeps reviewed decisions, evidence, corrections, and lessons reusable—so every new task starts with trusted context instead of zero.
          </p>

          <div className="pm-hero-actions">
            <Link href="/memory" className="pm-pill-button pm-pill-button--light">
              Explore ProChat Memory
              <ArrowIcon />
            </Link>
            <Link href="/docs" className="pm-hero-secondary-link">
              Read the documentation
              <ArrowIcon />
            </Link>
          </div>

          <div className="pm-trust-line" aria-label="Product trust principles">
            <span className="pm-trust-shield" aria-hidden="true">◇</span>
            Local files · Human-reviewed · Git-versioned · Model-agnostic
          </div>
        </div>

        <div className="pm-card-stage" aria-label="Examples of ProChat Memory records">
          <div className="pm-card-stage-glow" aria-hidden="true" />
          {memoryCards.map(card => (
            <article key={card.title} className={card.className}>
              <div className="pm-card-topline">
                <span className="pm-card-icon"><MemoryIcon name={card.icon} /></span>
                <span>{card.eyebrow}</span>
              </div>
              <h2>{card.title}</h2>
              <p>{card.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pm-trust-strip" aria-labelledby="pm-trust-strip-title">
        <div className="pm-trust-strip__inner">
          <div className="pm-trust-strip__label">
            <span className="pm-trust-strip__dot" aria-hidden="true" />
            <h2 id="pm-trust-strip-title">Memory you can inspect</h2>
          </div>
          <ul className="pm-trust-principles">
            {trustPrinciples.map((principle, index) => (
              <li key={principle}>
                <span className="pm-trust-principle__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="memory-benefits"
        className="pm-benefits-section"
        aria-labelledby="pm-benefits-title"
      >
        <div className="pm-benefits-header">
          <div className="pm-section-pill">
            <span className="pm-section-pill__mark" aria-hidden="true" />
            Why memory matters
          </div>
          <h2 id="pm-benefits-title">Turn repeated work into trusted memory.</h2>
          <p>
            ProChat Memory keeps useful evidence, decisions, corrections, and
            lessons available, so future work starts with context instead of
            repetition.
          </p>
        </div>

        <div className="pm-benefits-grid">
          <article className="pm-benefit">
            <div className="pm-benefit-visual">
              <CaptureComposition
                motion="reveal"
                className="pm-benefit-illustration"
              />
            </div>
            <div className="pm-benefit-copy">
              <span className="pm-benefit-number">01 / CAPTURE</span>
              <h3>Capture what the work already taught you.</h3>
              <p>
                Keep the evidence, decisions, and lessons that would otherwise
                disappear across tools and conversations.
              </p>
            </div>
          </article>

          <article className="pm-benefit">
            <div className="pm-benefit-visual">
              <ReviewStructureComposition
                motion="reveal"
                className="pm-benefit-illustration"
              />
            </div>
            <div className="pm-benefit-copy">
              <span className="pm-benefit-number">02 / REVIEW</span>
              <h3>Review before memory becomes truth.</h3>
              <p>
                Every trusted memory remains connected to evidence, correction
                history, and explicit human judgment.
              </p>
            </div>
          </article>

          <article className="pm-benefit">
            <div className="pm-benefit-visual">
              <RetrievalComposition
                motion="reveal"
                className="pm-benefit-illustration"
              />
            </div>
            <div className="pm-benefit-copy">
              <span className="pm-benefit-number">03 / RETRIEVE</span>
              <h3>Bring back only what matters now.</h3>
              <p>
                Retrieve the smallest trusted context for the current task
                instead of sending an entire history to the model.
              </p>
            </div>
          </article>
        </div>

        <div className="pm-benefits-action">
          <Link
            href="/memory"
            className="pm-pill-button pm-pill-button--light"
          >
            See how ProChat Memory works
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <section
        id="memory-system"
        className="pm-system-section"
        aria-labelledby="pm-system-title"
      >
        <div className="pm-system-section__inner">
          <header className="pm-system-header">
            <div className="pm-system-meta" aria-label="Chapter 3, The Memory System">
              <span>03</span>
              <span>THE MEMORY SYSTEM</span>
              <span>ONE CONTINUOUS LIFECYCLE</span>
            </div>
            <h2 id="pm-system-title">
              <span>From useful fragments</span>
              {' '}
              <span>to trusted context.</span>
            </h2>
            <p>
              Capture what the work produced, review what deserves to last,
              and retrieve only the context that matters for the task in
              front of you.
            </p>
          </header>

          <div className="pm-system-diagram-field">
            <div className="pm-system-diagram-field__grid" aria-hidden="true" />
            <MemorySystemComposition
              motion="reveal"
              className="pm-system-diagram"
            />
          </div>

          <ol className="pm-system-phases" aria-label="The three phases of ProChat Memory">
            <li>
              <span>01 / CAPTURE &amp; DETECT</span>
              <h3>Make the work inspectable.</h3>
              <p>
                Conversations, notes, evidence, decisions, results, and
                observations stay raw while ProChat forms candidate records
                and detects possible patterns.
              </p>
            </li>
            <li>
              <span>02 / REVIEW &amp; STRUCTURE</span>
              <h3>Decide what deserves to last.</h3>
              <p>
                Evidence stays connected to conclusions. Human review can
                approve, reject, correct, or supersede a candidate before it
                joins durable memory.
              </p>
            </li>
            <li>
              <span>03 / RETRIEVE &amp; APPLY</span>
              <h3>Use only what matters now.</h3>
              <p>
                Current intent filters a wider reviewed memory field into a
                small context set. ProChat supplies context; the person still
                decides what to do.
              </p>
            </li>
          </ol>

          <div className="pm-system-action">
            <Link href="/memory" className="pm-pill-button pm-pill-button--light">
              Explore the Memory model
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="current-products"
        className="pm-products-section"
        aria-labelledby="pm-products-title"
      >
        <div className="pm-products-section__inner">
          <header className="pm-products-header">
            <div className="pm-system-meta" aria-label="Chapter 4, Current products">
              <span>04</span>
              <span>CURRENT PRODUCTS</span>
              <span>TWO VERIFIED PATHS</span>
            </div>
            <h2 id="pm-products-title">
              <span>Start with a real workflow.</span>
              {' '}
              <span>Build from trusted memory.</span>
            </h2>
            <p>
              ProChat Memory begins with a focused QA edition, while ProChat
              Workbench gives ChatGPT a guarded way to work with local
              projects. They share a design language, but they are not the
              same product path.
            </p>
          </header>

          <div className="pm-products-layout">
            <article
              className="pm-product-path pm-product-path--qa"
              aria-labelledby="pm-product-qa-title"
            >
              <div className="pm-product-path__visual">
                <QAMemoryFlowComposition
                  motion="reveal"
                  className="pm-product-path__illustration"
                />
              </div>

              <div className="pm-product-path__body">
                <div className="pm-product-path__meta">
                  <span>Memory edition</span>
                  <span>Primary path</span>
                </div>
                <h3 id="pm-product-qa-title">ProChat Memory for QA</h3>
                <p className="pm-product-path__promise">
                  Stop solving the same QA failure twice.
                </p>
                <p>
                  Preserve investigation evidence, reviewed conclusions, and
                  corrected lessons from failures so future QA work starts
                  with current evidence and usable history.
                </p>
                <ul>
                  {qaProductPoints.map(point => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link href="/memory-qa" className="pm-pill-button pm-pill-button--light">
                  Explore Memory for QA
                  <ArrowIcon />
                </Link>
              </div>
            </article>

            <article
              className="pm-product-path pm-product-path--workbench"
              aria-labelledby="pm-product-workbench-title"
            >
              <div className="pm-product-path__visual">
                <WorkbenchGuardedFlowComposition
                  motion="reveal"
                  className="pm-product-path__illustration"
                />
              </div>

              <div className="pm-product-path__body">
                <div className="pm-product-path__meta">
                  <span>Second product</span>
                  <span>Guarded local work</span>
                </div>
                <h3 id="pm-product-workbench-title">ProChat Workbench</h3>
                <p className="pm-product-path__promise">
                  Build apps through ChatGPT locally.
                </p>
                <p>
                  Bring exact project context into a bounded workflow where
                  source reads, file changes, validation, run continuity, and
                  Git boundaries remain visible.
                </p>
                <ul>
                  {workbenchProductPoints.map(point => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link href="/workbench" className="pm-product-path__secondary-action">
                  Explore ProChat Workbench
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="participate"
        className="pm-adoption-section"
        aria-labelledby="pm-adoption-title"
      >
        <div className="pm-adoption-section__inner">
          <header className="pm-adoption-header">
            <div className="pm-system-meta" aria-label="Chapter 5, Participate">
              <span>05</span>
              <span>PARTICIPATE</span>
              <span>PRODUCT-SPECIFIC PATHS</span>
            </div>
            <h2 id="pm-adoption-title">
              <span>Use it.</span>
              {' '}
              <span>Test it.</span>
              {' '}
              <span>Help shape what comes next.</span>
            </h2>
            <p>
              ProChat’s current products have different participation paths.
              Memory for QA is a selected source-available beta. Workbench is
              a free self-hosted AGPL prerelease.
            </p>
          </header>

          <div className="pm-adoption-layout">
            <article
              className="pm-adoption-path pm-adoption-path--qa"
              aria-labelledby="pm-adoption-qa-title"
            >
              <div className="pm-adoption-path__visual">
                <QABetaAdoptionComposition
                  motion="reveal"
                  className="pm-adoption-path__illustration"
                />
              </div>

              <div className="pm-adoption-path__body">
                <div className="pm-adoption-path__meta">
                  <span>Public source-available QA beta</span>
                  <span>Free for approved beta testers</span>
                </div>
                <h3 id="pm-adoption-qa-title">ProChat Memory for QA</h3>
                <p className="pm-adoption-path__lead">
                  Inspect the public repository, apply for the selected beta,
                  evaluate locally only after approval, then return sanitized
                  feedback through GitHub.
                </p>
                <ul className="pm-adoption-claims">
                  <li>Public repository may be viewed and starred.</li>
                  <li>Approved participants may clone and evaluate locally under the beta license.</li>
                  <li>Code contributions and source-code pull requests are not accepted during the current beta.</li>
                </ul>
                <div className="pm-adoption-actions" aria-label="Memory for QA participation actions">
                  {memoryQaAdoptionActions.map(action => (
                    <AdoptionActionLink
                      key={action.label}
                      action={action}
                      product="qa"
                    />
                  ))}
                </div>
              </div>
            </article>

            <article
              className="pm-adoption-path pm-adoption-path--workbench"
              aria-labelledby="pm-adoption-workbench-title"
            >
              <div className="pm-adoption-path__visual">
                <WorkbenchAdoptionComposition
                  motion="reveal"
                  className="pm-adoption-path__illustration"
                />
              </div>

              <div className="pm-adoption-path__body">
                <div className="pm-adoption-path__meta">
                  <span>Free and open source under AGPL-3.0-only</span>
                  <span>Self-hosted prerelease</span>
                </div>
                <h3 id="pm-adoption-workbench-title">ProChat Workbench</h3>
                <p className="pm-adoption-path__lead">
                  View, star, fork, or clone the repository; self-host ProChat
                  Workbench locally; open an issue, join a discussion, or
                  propose a contribution.
                </p>
                <ul className="pm-adoption-claims">
                  <li>External pull-request merge requires the contributor-rights process.</li>
                  <li>Separate commercial or OEM licensing may be requested.</li>
                </ul>
                <div className="pm-adoption-actions" aria-label="Workbench participation actions">
                  {workbenchAdoptionActions.map(action => (
                    <AdoptionActionLink
                      key={action.label}
                      action={action}
                      product="workbench"
                    />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section
        id="conversion-close"
        className="pm-closing-section"
        aria-labelledby="pm-closing-title"
      >
        <div className="pm-closing-panel">
          <div className="pm-system-meta" aria-label="Chapter 6, Closing action">
            <span>06</span>
            <span>NEXT STEP</span>
            <span>CONVERSION CLOSURE</span>
          </div>
          <h2 id="pm-closing-title">Put trusted memory to work.</h2>
          <p>
            Start with the selected Memory for QA beta or explore Workbench
            for guarded local project work. Both paths keep context,
            evidence, and control visible.
          </p>
          <div className="pm-closing-actions" aria-label="ProChat next steps">
            {closingActions.map(action => {
              const className = [
                'pm-closing-action',
                `pm-closing-action--${action.kind}`,
              ].join(' ')
              const content = (
                <>
                  <span>{action.label}</span>
                  <ArrowIcon />
                </>
              )

              if (action.external) {
                return (
                  <a
                    key={action.label}
                    href={action.href}
                    className={className}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                )
              }

              return (
                <Link key={action.label} href={action.href} className={className}>
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
