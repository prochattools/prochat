import Link from 'next/link'

import Logo from '@/components/logo'

import {
  MemorySystemComposition,
  QABetaAdoptionComposition,
  QAMemoryFlowComposition,
  WorkbenchAdoptionComposition,
  WorkbenchGuardedFlowComposition,
} from './components/illustrations/compositions'
import HomepageTrackedLink from './components/HomepageTrackedLink'
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
  'Selected source-available beta for approved participants.',
  'For QA teams repeatedly investigating related failures.',
  'Preserves reviewed evidence, corrections, and reusable testing lessons.',
] as const

const workbenchProductPoints = [
  'Free self-hosted AGPL-3.0-only prerelease.',
  'For developers who want guarded local project work through ChatGPT.',
  'Keeps reads bounded, changes guarded, validation visible, and Git actions explicit.',
] as const

const memoryQaRepository = 'https://github.com/prochattools/memory-qa'
const workbenchRepository = 'https://github.com/prochattools/workbench'
const memoryQaBetaContactPath = '/contact?topic=memory-qa-beta#contact-form-card'
const memoryContactPath = '/contact?topic=memory#contact-form-card'

const memoryQaAdoptionActions = [
  {
    label: 'Apply for the selected beta',
    href: memoryQaBetaContactPath,
    kind: 'primary',
    external: false,
    eventName: 'product_cta_click',
    cta: 'apply_selected_beta',
  },
  {
    label: 'View the public repository',
    href: memoryQaRepository,
    kind: 'secondary',
    external: true,
    eventName: 'outbound_funnel_click',
    cta: 'view_repository',
  },
] as const

const workbenchAdoptionActions = [
  {
    label: 'Start with Workbench',
    href: '/workbench',
    kind: 'primary',
    external: false,
    eventName: 'product_cta_click',
    cta: 'start_workbench',
  },
  {
    label: 'View the repository',
    href: workbenchRepository,
    kind: 'secondary',
    external: true,
    eventName: 'outbound_funnel_click',
    cta: 'view_repository',
  },
] as const

const closingActions = [
  {
    label: 'Apply for the Memory for QA beta',
    href: memoryQaBetaContactPath,
    kind: 'primary',
    product: 'memory-qa',
    eventName: 'product_cta_click',
    cta: 'apply_beta',
  },
  {
    label: 'Start with Workbench',
    href: '/workbench',
    kind: 'secondary',
    product: 'workbench',
    eventName: 'product_cta_click',
    cta: 'start_workbench',
  },
  {
    label: 'Discuss a Memory workflow',
    href: memoryContactPath,
    kind: 'text',
    product: 'memory',
    eventName: 'product_cta_click',
    cta: 'discuss_memory_workflow',
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
        <path d="M7 3.5h7l3 3V20H7z" />
        <path d="M14 3.5V7h3M9.5 11h5M9.5 14h5M9.5 17H13" />
      </svg>
    )
  }

  if (name === 'rotate') {
    return (
      <svg {...common}>
        <path d="M4.5 8A8 8 0 1 1 6 17.5" />
        <path d="M4 4v4h4" />
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
  readonly external: boolean
  readonly eventName: 'product_cta_click' | 'outbound_funnel_click'
  readonly cta: string
}

function AdoptionActionLink({
  action,
  product,
}: {
  action: AdoptionAction
  product: 'memory-qa' | 'workbench'
}) {
  const className = [
    'pm-adoption-action',
    `pm-adoption-action--${action.kind}`,
    `pm-adoption-action--${product === 'memory-qa' ? 'qa' : 'workbench'}`,
  ].join(' ')

  return (
    <HomepageTrackedLink
      href={action.href}
      className={className}
      eventName={action.eventName}
      location="participation"
      product={product}
      cta={action.cta}
      external={action.external}
    >
      <span>{action.label}</span>
      <ArrowIcon />
    </HomepageTrackedLink>
  )
}

export default function App() {
  return (
    <div className="pm-marketing-page pm-homepage">
      <section className="pm-hero-section" aria-labelledby="pm-hero-title">
        <MemoryLaserField />
        <div className="pm-grid-overlay" aria-hidden="true" />

        <header className="pm-site-header">
          <nav className="pm-navbar" aria-label="Primary navigation">
            <Link href="/" className="pm-wordmark" aria-label="ProChat home">
              <Logo scale={0.62} />
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
              <Link href="#current-products" className="pm-pill-button pm-pill-button--dark">
                Choose a product
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
                <Link href="#current-products">Choose a product</Link>
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
            <HomepageTrackedLink
              href="#current-products"
              className="pm-pill-button pm-pill-button--light"
              eventName="product_cta_click"
              location="hero"
              product="memory"
              cta="choose_product_path"
            >
              Choose a product path
              <ArrowIcon />
            </HomepageTrackedLink>
            <HomepageTrackedLink
              href="/memory"
              className="pm-hero-secondary-link"
              eventName="product_cta_click"
              location="hero"
              product="memory"
              cta="understand_memory_model"
            >
              Understand the Memory model
              <ArrowIcon />
            </HomepageTrackedLink>
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
        id="current-products"
        className="pm-products-section"
        aria-labelledby="pm-products-title"
      >
        <div className="pm-products-section__inner">
          <header className="pm-products-header">
            <div className="pm-system-meta" aria-label="Chapter 2, Current products">
              <span>02</span>
              <span>CURRENT PRODUCTS</span>
              <span>TWO DISTINCT PATHS</span>
            </div>
            <h2 id="pm-products-title">
              <span>Choose the product</span>{' '}<span>that matches your work.</span>
            </h2>
            <p>
              Memory for QA preserves reviewed testing lessons. Workbench gives ChatGPT a guarded way to work with local projects. Each has a different audience, status, and next step.
            </p>
          </header>

          <div className="pm-products-layout">
            <article className="pm-product-path pm-product-path--qa" aria-labelledby="pm-product-qa-title">
              <div className="pm-product-path__visual">
                <QAMemoryFlowComposition motion="reveal" className="pm-product-path__illustration" />
              </div>
              <div className="pm-product-path__body">
                <div className="pm-product-path__meta">
                  <span>Selected source-available beta</span>
                  <span>For repeated QA investigations</span>
                </div>
                <h3 id="pm-product-qa-title">ProChat Memory for QA</h3>
                <p className="pm-product-path__promise">Stop solving the same QA failure twice.</p>
                <p>
                  Preserve investigation evidence, reviewed conclusions, and corrected lessons so related failures start with usable history.
                </p>
                <ul>
                  {qaProductPoints.map(point => <li key={point}>{point}</li>)}
                </ul>
                <div className="pm-product-choice-actions">
                  <HomepageTrackedLink
                    href={memoryQaBetaContactPath}
                    className="pm-pill-button pm-pill-button--light"
                    eventName="product_cta_click"
                    location="product_card"
                    product="memory-qa"
                    cta="apply_selected_beta"
                  >
                    Apply for the selected beta
                    <ArrowIcon />
                  </HomepageTrackedLink>
                  <HomepageTrackedLink
                    href="/memory-qa"
                    className="pm-product-path__secondary-action"
                    eventName="product_cta_click"
                    location="product_card"
                    product="memory-qa"
                    cta="explore_memory_qa"
                  >
                    Explore Memory for QA
                    <ArrowIcon />
                  </HomepageTrackedLink>
                </div>
              </div>
            </article>

            <article className="pm-product-path pm-product-path--workbench" aria-labelledby="pm-product-workbench-title">
              <div className="pm-product-path__visual">
                <WorkbenchGuardedFlowComposition motion="reveal" className="pm-product-path__illustration" />
              </div>
              <div className="pm-product-path__body">
                <div className="pm-product-path__meta">
                  <span>Free self-hosted AGPL prerelease</span>
                  <span>For guarded local project work</span>
                </div>
                <h3 id="pm-product-workbench-title">ProChat Workbench</h3>
                <p className="pm-product-path__promise">Build apps through ChatGPT locally.</p>
                <p>
                  Bring exact project context into a bounded workflow where reads, changes, validation, continuity, and Git boundaries remain visible.
                </p>
                <ul>
                  {workbenchProductPoints.map(point => <li key={point}>{point}</li>)}
                </ul>
                <div className="pm-product-choice-actions">
                  <HomepageTrackedLink
                    href="/workbench"
                    className="pm-pill-button pm-pill-button--light"
                    eventName="product_cta_click"
                    location="product_card"
                    product="workbench"
                    cta="start_workbench"
                  >
                    Start with Workbench
                    <ArrowIcon />
                  </HomepageTrackedLink>
                  <HomepageTrackedLink
                    href={workbenchRepository}
                    className="pm-product-path__secondary-action"
                    eventName="outbound_funnel_click"
                    location="product_card"
                    product="workbench"
                    cta="view_repository"
                    external
                  >
                    View the repository
                    <ArrowIcon />
                  </HomepageTrackedLink>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="memory-system" className="pm-system-section" aria-labelledby="pm-system-title">
        <div className="pm-system-section__inner">
          <header className="pm-system-header">
            <div className="pm-system-meta" aria-label="Chapter 3, The Memory model">
              <span>03</span>
              <span>THE MEMORY MODEL</span>
              <span>CAPTURE · REVIEW · RETRIEVE</span>
            </div>
            <h2 id="pm-system-title">
              <span>Turn repeated work</span>{' '}<span>into trusted context.</span>
            </h2>
            <p>
              Capture what the work produced, review what deserves to last, and retrieve only the context that matters for the task in front of you.
            </p>
          </header>

          <div className="pm-system-diagram-field">
            <div className="pm-system-diagram-field__grid" aria-hidden="true" />
            <MemorySystemComposition motion="reveal" className="pm-system-diagram" />
          </div>

          <ol className="pm-system-phases" aria-label="The three phases of ProChat Memory">
            <li>
              <span>01 / CAPTURE</span>
              <h3>Make the work inspectable.</h3>
              <p>Keep the evidence, decisions, and lessons that would otherwise disappear across tools and conversations.</p>
            </li>
            <li>
              <span>02 / REVIEW</span>
              <h3>Decide what deserves to last.</h3>
              <p>Human review can approve, reject, correct, or supersede a candidate before it becomes durable memory.</p>
            </li>
            <li>
              <span>03 / RETRIEVE</span>
              <h3>Use only what matters now.</h3>
              <p>Current intent filters reviewed memory into the smallest useful context set for the task at hand.</p>
            </li>
          </ol>

          <div className="pm-system-action">
            <HomepageTrackedLink
              href="/memory"
              className="pm-pill-button pm-pill-button--light"
              eventName="product_cta_click"
              location="memory_model"
              product="memory"
              cta="explore_memory_model"
            >
              Explore the Memory model
              <ArrowIcon />
            </HomepageTrackedLink>
          </div>
        </div>
      </section>

      <section id="participate" className="pm-adoption-section" aria-labelledby="pm-adoption-title">
        <div className="pm-adoption-section__inner">
          <header className="pm-adoption-header">
            <div className="pm-system-meta" aria-label="Chapter 4, Participate">
              <span>04</span>
              <span>PARTICIPATE</span>
              <span>ONE CLEAR NEXT STEP</span>
            </div>
            <h2 id="pm-adoption-title">
              <span>Choose a focused path.</span>{' '}<span>Keep the boundaries clear.</span>
            </h2>
            <p>
              Memory for QA is a selected source-available beta. Workbench is a free self-hosted AGPL prerelease. Each product has one direct start and one public repository path.
            </p>
          </header>

          <div className="pm-adoption-layout">
            <article className="pm-adoption-path pm-adoption-path--qa" aria-labelledby="pm-adoption-qa-title">
              <div className="pm-adoption-path__visual">
                <QABetaAdoptionComposition motion="reveal" className="pm-adoption-path__illustration" />
              </div>
              <div className="pm-adoption-path__body">
                <div className="pm-adoption-path__meta">
                  <span>Selected source-available beta</span>
                  <span>Approved participants only</span>
                </div>
                <h3 id="pm-adoption-qa-title">ProChat Memory for QA</h3>
                <p className="pm-adoption-path__lead">
                  Apply with one repeated QA workflow, or inspect the public repository before deciding whether the beta fits your evaluation context.
                </p>
                <div className="pm-adoption-actions" aria-label="Memory for QA participation actions">
                  {memoryQaAdoptionActions.map(action => (
                    <AdoptionActionLink key={action.label} action={action} product="memory-qa" />
                  ))}
                </div>
              </div>
            </article>

            <article className="pm-adoption-path pm-adoption-path--workbench" aria-labelledby="pm-adoption-workbench-title">
              <div className="pm-adoption-path__visual">
                <WorkbenchAdoptionComposition motion="reveal" className="pm-adoption-path__illustration" />
              </div>
              <div className="pm-adoption-path__body">
                <div className="pm-adoption-path__meta">
                  <span>Free and open source under AGPL-3.0-only</span>
                  <span>Self-hosted prerelease</span>
                </div>
                <h3 id="pm-adoption-workbench-title">ProChat Workbench</h3>
                <p className="pm-adoption-path__lead">
                  Start with the product guide, or inspect the repository before setting up a guarded local project workflow.
                </p>
                <div className="pm-adoption-actions" aria-label="Workbench participation actions">
                  {workbenchAdoptionActions.map(action => (
                    <AdoptionActionLink key={action.label} action={action} product="workbench" />
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="conversion-close" className="pm-closing-section" aria-labelledby="pm-closing-title">
        <div className="pm-closing-panel">
          <div className="pm-system-meta" aria-label="Chapter 5, Closing action">
            <span>05</span>
            <span>NEXT STEP</span>
            <span>CHOOSE YOUR PATH</span>
          </div>
          <h2 id="pm-closing-title">Put trusted memory to work.</h2>
          <p>
            Apply for the selected QA beta, begin with Workbench, or discuss one repeated workflow that should become durable Memory.
          </p>
          <div className="pm-closing-actions" aria-label="ProChat next steps">
            {closingActions.map(action => (
              <HomepageTrackedLink
                key={action.label}
                href={action.href}
                className={`pm-closing-action pm-closing-action--${action.kind}`}
                eventName={action.eventName}
                location="closing"
                product={action.product}
                cta={action.cta}
              >
                <span>{action.label}</span>
                <ArrowIcon />
              </HomepageTrackedLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
