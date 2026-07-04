import Link from 'next/link'

import { Button } from '@/components/ui/button'

import './prochat-memory-theme.css'

const memoryInputs = [
  'Repeated explanations',
  'Old examples',
  'Project notes',
  'Review decisions',
] as const

const memoryOutputs = [
  'Reusable drafts',
  'Clear summaries',
  'Reviewed tasks',
  'Trusted answers',
] as const

const recordCards = [
  {
    label: 'Decision',
    title: 'Response format',
    body: 'Use the approved structure for recurring client replies.',
  },
  {
    label: 'Correction',
    title: 'Null handling',
    body: 'Return empty collections instead of null when no records exist.',
  },
  {
    label: 'Source',
    title: 'Release review',
    body: 'Keep final decisions connected to the source that produced them.',
  },
] as const

const workflowSteps = [
  ['01', 'Capture', 'Messy work, examples, notes, and decisions enter the memory workspace.'],
  ['02', 'Structure', 'Useful knowledge becomes inspectable Markdown records.'],
  ['03', 'Review', 'People approve what becomes trusted memory.'],
  ['04', 'Reuse', 'Only relevant memory enters the current task context.'],
] as const

const productHighlights = [
  'ProChat Memory — flagship product',
  'ProChat Memory for QA — first launch niche and first discipline-specific edition',
  'ProChat Workbench — second product',
] as const

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="pm-kicker">{children}</p>
}

function MemoryRecord({ label, title, body }: { label: string; title: string; body: string }) {
  return (
    <article className="pm-record-card">
      <div className="pm-record-meta">
        <span>{label}</span>
        <span>TRUSTED</span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  )
}

export default function App() {
  return (
    <div className="pc-homepage pm-marketing-page pm-homepage">
      <section className="pm-hero-section">
        <div className="pm-container pm-hero-grid">
          <div className="pm-hero-copy">
            <Kicker>PRIVATE, PERSISTENT MEMORY</Kicker>
            <h1>
              Stop rebuilding <em>context.</em>
            </h1>
            <p>
              ProChat Memory helps teams preserve useful decisions, corrections, examples, and review notes so AI-assisted work starts from remembered understanding instead of zero.
            </p>
            <div className="pm-actions">
              <Button asChild variant="primary" size="lg">
                <Link href="/prochat-memory">Explore Memory</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/qa-memory">See Memory for QA</Link>
              </Button>
            </div>
            <div className="pm-trust-line">Local files · Human-reviewed · Under your control</div>
          </div>

          <div className="pm-hero-art" aria-label="Messy work becoming structured persistent memory">
            <div className="pm-archive-caption">Filed under Memory · AI-assisted work</div>
            <div className="pm-memory-flow">
              <div className="pm-input-stack">
                {memoryInputs.map(item => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div className="pm-flow-arrow">→</div>
              <div className="pm-archive-box">
                <span className="pm-archive-label">Persistent memory</span>
                {memoryOutputs.map(item => (
                  <div key={item} className="pm-archive-row">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pm-editorial-section pm-section-rule">
        <div className="pm-container pm-two-column">
          <div>
            <Kicker>THE PROBLEM</Kicker>
            <h2>Every new session makes you pay again.</h2>
          </div>
          <div className="pm-section-copy">
            <p>
              Useful context already exists in previous conversations, files, reviews, corrections, and decisions. Without persistent memory, every new task starts with recovery work.
            </p>
            <p className="pm-statement">The work was already done. The understanding was not preserved.</p>
          </div>
        </div>
      </section>

      <section className="pm-editorial-section">
        <div className="pm-container pm-visual-split">
          <div>
            <Kicker>FROM WORK TO MEMORY</Kicker>
            <h2>Your work is already creating knowledge.</h2>
            <p>
              Decisions, corrections, conventions, examples, and sources can become structured records that remain available, inspectable, and reusable.
            </p>
          </div>
          <div className="pm-record-grid">
            {recordCards.map(card => (
              <MemoryRecord key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="pm-editorial-section pm-section-rule">
        <div className="pm-container">
          <div className="pm-centered-copy">
            <Kicker>RELEVANT BY DESIGN</Kicker>
            <h2>Remember broadly. Send only what matters.</h2>
            <p>
              The full archive remains available in the workspace. For the current task, ProChat selects the relevant records, sources, and known constraints so the active context stays focused.
            </p>
          </div>
          <div className="pm-selection-panel">
            <div className="pm-drawer">
              <span>Archive remains whole</span>
              <span>127 reviewed records</span>
            </div>
            <div className="pm-selected-records">
              <span>3 relevant records</span>
              <span>2 sources</span>
              <span>1 known constraint</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pm-editorial-section">
        <div className="pm-container pm-method-grid">
          <div>
            <Kicker>HOW IT WORKS</Kicker>
            <h2>Capture, structure, review, reuse.</h2>
          </div>
          <div className="pm-step-list">
            {workflowSteps.map(([number, title, description]) => (
              <article key={title} className="pm-step-card">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-editorial-section pm-section-rule">
        <div className="pm-container pm-visual-split">
          <div className="pm-review-card">
            <div className="pm-review-state">REVIEW REQUIRED</div>
            <h3>Batch endpoints should validate array length before processing.</h3>
            <p>AI can propose. You control what the system remembers.</p>
            <div className="pm-review-actions">
              <button type="button">Approve</button>
              <button type="button">Edit</button>
              <button type="button">Reject</button>
            </div>
          </div>
          <div>
            <Kicker>HUMAN CONTROL</Kicker>
            <h2>It notices. You decide.</h2>
            <p>
              ProChat may identify a reusable lesson and draft a memory record. Only reviewed information becomes trusted memory.
            </p>
          </div>
        </div>
      </section>

      <section className="pm-editorial-section">
        <div className="pm-container">
          <div className="pm-centered-copy">
            <Kicker>CURRENT PRODUCTS</Kicker>
            <h2>Memory first. QA first. Workbench second.</h2>
            <p>
              ProChat Memory is the flagship. ProChat Memory for QA is the first launch niche. ProChat Workbench is the second product for safe local project work.
            </p>
          </div>
          <div className="pm-usecase-grid">
            {productHighlights.map(item => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-final-cta">
        <div className="pm-container pm-final-panel">
          <Kicker>MEMORY FOR QA</Kicker>
          <h2>Help shape the first discipline-specific edition.</h2>
          <p>
            Start with one repeated QA or project-context problem and help evaluate where ProChat Memory can reduce repeated explanation and recovery effort.
          </p>
          <div className="pm-actions pm-actions-center">
            <Button asChild variant="primary" size="lg">
              <Link href="/contact?topic=memory-qa">Become a tester</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/prochat-memory">See how Memory works</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
