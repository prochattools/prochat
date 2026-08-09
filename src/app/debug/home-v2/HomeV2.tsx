'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import {
  CONTEXT_CHAPTERS,
  CONTEXT_STATE_PROGRESS,
  type ScrollTriggerInstance,
} from './home-v2-motion'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h9" />
      <path d="m9 4 4 4-4 4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m4 9.2 3.1 3.1L14 5.7" />
    </svg>
  )
}

function NavBar() {
  return (
    <nav className="hv2-nav" aria-label="Homepage v2 navigation">
      <div className="hv2-nav__inner">
        <Link href="/debug/home-v2" className="hv2-nav__logo" aria-label="ProChat Home V2">
          <span className="hv2-nav__mark" aria-hidden="true">P</span>
          <span className="hv2-nav__wordmark">ProChat</span>
        </Link>
        <div className="hv2-nav__links">
          <Link href="/memory">Memory</Link>
          <Link href="/memory-qa">Memory for QA</Link>
          <Link href="/workbench">Workbench</Link>
          <Link href="/docs">Documentation</Link>
        </div>
        <Link href="/contact?topic=memory-qa-beta#contact-form-card" className="hv2-nav__cta">
          Apply for beta <ArrowIcon />
        </Link>
      </div>
    </nav>
  )
}

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncMotionPreference = () => {
      if (query.matches) {
        videoRef.current?.pause()
        return
      }

      void videoRef.current?.play().catch(() => {
        // The poster remains a complete fallback if autoplay is unavailable.
      })
    }

    syncMotionPreference()
    query.addEventListener('change', syncMotionPreference)
    return () => query.removeEventListener('change', syncMotionPreference)
  }, [])

  return (
    <section className="hv2-hero" aria-labelledby="hv2-hero-title" data-review-artifact="hero">
      <div className="hv2-hero__copy">
        <p className="hv2-kicker">Structured memory for AI workflows</p>
        <h1 id="hv2-hero-title">Build memory that gets better with your work.</h1>
        <p className="hv2-hero__lede">
          ProChat Memory keeps reviewed decisions, evidence, corrections, and lessons reusable — so every new task starts with trusted context instead of zero.
        </p>
        <div className="hv2-actions">
          <Link href="#products" className="hv2-btn hv2-btn--primary">
            Choose a product path <ArrowIcon />
          </Link>
          <Link href="/memory" className="hv2-btn hv2-btn--text">
            Understand the Memory model <ArrowIcon />
          </Link>
        </div>
      </div>

      <figure className="hv2-hero-film" data-a2-media>
        <div className="hv2-hero-film__bezel">
          <video
            ref={videoRef}
            className="hv2-hero-film__video"
            preload="none"
            muted
            playsInline
            aria-hidden="true"
          >
            <source src="/motion/home-v2/a2-review-gate-vp9.webm" type="video/webm" />
            <source src="/motion/home-v2/a2-review-gate-h264.mp4" type="video/mp4" />
          </video>
          <picture className="hv2-hero-film__fallback">
            <source media="(prefers-reduced-motion: reduce)" srcSet="/motion/home-v2/a2-review-gate-final.png" />
            <img
              src="/motion/home-v2/a2-review-gate-poster.png"
              width="1920"
              height="1080"
              alt="Reviewed evidence crossing a review gate into a provenance-preserving Memory workspace."
            />
          </picture>
        </div>
        <figcaption>
          <span>A2 · Review Gate</span>
          <span>Evidence stays inspectable until a person decides what becomes trusted memory.</span>
        </figcaption>
      </figure>
    </section>
  )
}

function TechnicalEvidenceSection() {
  return (
    <section className="hv2-evidence" aria-labelledby="hv2-evidence-title" data-review-artifact="technical-evidence">
      <div className="hv2-evidence__intro">
        <p className="hv2-kicker hv2-kicker--dark">Technical evidence</p>
        <h2 id="hv2-evidence-title">Measured behavior, not borrowed credibility.</h2>
        <p>
          No customer logos or inflated adoption claims. These figures come from the validated A2 and B2 technical proofs on this branch, measured in Chrome before homepage integration.
        </p>
      </div>
      <div className="hv2-proof-system" aria-label="Measured A2 and B2 validation record">
        <header className="hv2-proof-system__header">
          <div><span className="hv2-ui-label">Validation record · Home V2 V3</span><strong>Two signature systems, measured as shipped.</strong></div>
          <span className="hv2-status hv2-status--approved"><CheckIcon /> Browser verified</span>
        </header>
        <div className="hv2-proof-system__body">
          <article className="hv2-proof-system__a2">
            <div className="hv2-proof-system__title"><span>A2</span><div><strong>Review Gate cinematic</strong><small>Deterministic product film</small></div></div>
            <dl>
              <div><dt>Duration</dt><dd>6.400 s · 192 frames</dd></div>
              <div><dt>H.264</dt><dd>788,522 bytes · High profile</dd></div>
              <div><dt>VP9</dt><dd>524,748 bytes · Profile 0</dd></div>
              <div><dt>Seek interval</dt><dd>1.000 s · short GOP</dd></div>
            </dl>
          </article>
          <article className="hv2-proof-system__b2">
            <div className="hv2-proof-system__title"><span>B2</span><div><strong>Context Assembly</strong><small>Scroll-linked state system</small></div></div>
            <dl>
              <div><dt>Runtime</dt><dd>71 FPS · desktop and mobile</dd></div>
              <div><dt>Desktop CLS</dt><dd>0.007</dd></div>
              <div><dt>Mobile CLS</dt><dd>0.036</dd></div>
              <div><dt>State recovery</dt><dd>Forward + reverse verified</dd></div>
            </dl>
          </article>
        </div>
        <footer className="hv2-proof-system__footer">
          <span>Reduced motion: verified</span><span>Console errors: 0</span><span>Layout overflow: 0</span><strong>Measured, not implied</strong>
        </footer>
      </div>
    </section>
  )
}

const MEMORY_PHASES = [
  {
    number: '01',
    label: 'Capture',
    title: 'Make the work inspectable.',
    body: 'Keep the evidence, decisions, and lessons that would otherwise disappear across tools and conversations.',
  },
  {
    number: '02',
    label: 'Review',
    title: 'Decide what deserves to last.',
    body: 'Human review can approve, reject, correct, or supersede a candidate before it becomes durable memory.',
  },
  {
    number: '03',
    label: 'Retrieve',
    title: 'Use only what matters now.',
    body: 'Current intent filters reviewed memory into the smallest useful context set for the task at hand.',
  },
]

function MemoryModelSection() {
  return (
    <section className="hv2-memory-model" aria-labelledby="hv2-memory-model-title">
      <div className="hv2-memory-model__headline">
        <p className="hv2-kicker hv2-kicker--dark">The Memory model</p>
        <h2 id="hv2-memory-model-title">Turn repeated work into trusted context.</h2>
        <p>
          Capture what the work produced, review what deserves to last, and retrieve only the context that matters for the task in front of you.
        </p>
      </div>

      <div className="hv2-memory-model__body">
        <ol className="hv2-memory-steps">
          {MEMORY_PHASES.map(phase => (
            <li key={phase.number}>
              <span className="hv2-memory-steps__number">{phase.number}</span>
              <div>
                <span className="hv2-memory-steps__label">{phase.label}</span>
                <h3>{phase.title}</h3>
                <p>{phase.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="hv2-ledger" aria-label="Example reviewed memory ledger">
          <header>
            <div>
              <span className="hv2-ui-label">memory://qa/checkout</span>
              <strong>Reviewed project record</strong>
            </div>
            <span className="hv2-status hv2-status--approved"><CheckIcon /> Approved</span>
          </header>
          <div className="hv2-ledger__question">
            <span>Current task</span>
            <strong>Verify checkout without reopening settled architecture.</strong>
          </div>
          <div className="hv2-ledger__rows">
            <div><span>Source</span><strong>browser evidence · 10:42</strong></div>
            <div><span>Decision</span><strong>stable selector contract</strong></div>
            <div><span>Scope</span><strong>project · checkout</strong></div>
            <div><span>Revision</span><strong>Git · 42d8a1</strong></div>
          </div>
          <footer>
            <span>Current evidence can override this record.</span>
            <span>Provenance intact</span>
          </footer>
        </div>
      </div>

      <Link href="/memory" className="hv2-inline-link">
        Explore the Memory model <ArrowIcon />
      </Link>
    </section>
  )
}

function MemoryForQASection() {
  return (
    <section className="hv2-product hv2-product--memory" aria-labelledby="hv2-memory-qa-title" data-review-artifact="memory-product">
      <div className="hv2-product__copy">
        <p className="hv2-kicker hv2-kicker--dark">ProChat Memory for QA · Selected beta</p>
        <h2 id="hv2-memory-qa-title">Stop solving the same QA failure twice.</h2>
        <p>
          Preserve investigation evidence, reviewed conclusions, and corrected lessons so related failures start with usable history.
        </p>
        <ul className="hv2-product__facts">
          <li>Selected source-available beta for approved participants.</li>
          <li>For QA teams repeatedly investigating related failures.</li>
          <li>Reviewed evidence, corrections, and testing lessons stay reusable.</li>
        </ul>
        <div className="hv2-actions">
          <Link href="/contact?topic=memory-qa-beta#contact-form-card" className="hv2-btn hv2-btn--primary">
            Apply for the selected beta <ArrowIcon />
          </Link>
          <Link href="/memory-qa" className="hv2-btn hv2-btn--text hv2-btn--text-dark">
            Explore Memory for QA <ArrowIcon />
          </Link>
        </div>
      </div>

      <div className="hv2-qa-surface" aria-label="QA investigation evidence and reviewed conclusion">
        <header>
          <div>
            <span className="hv2-ui-label">Investigation · checkout confirmation</span>
            <strong>Failure evidence remains attached to the lesson.</strong>
          </div>
          <span className="hv2-status hv2-status--open">Review open</span>
        </header>
        <div className="hv2-qa-surface__trace">
          <div><span>10:42:16</span><strong>Expected confirmation banner was not found.</strong><small>browser · current run</small></div>
          <div><span>10:44:02</span><strong>Selector depends on translated button text.</strong><small>code · commit 42d8a1</small></div>
          <div><span>10:48:31</span><strong>Stable data attribute restores deterministic verification.</strong><small>reviewed conclusion</small></div>
        </div>
        <footer>
          <span className="hv2-status hv2-status--approved"><CheckIcon /> Approved lesson</span>
          <strong>Use stable data attributes for checkout selectors.</strong>
        </footer>
      </div>
    </section>
  )
}

function WorkbenchSection() {
  return (
    <section className="hv2-product hv2-product--workbench" aria-labelledby="hv2-workbench-title" data-review-artifact="workbench-product">
      <div className="hv2-workbench-flow" aria-label="Workbench bounded local execution flow">
        <div className="hv2-workbench-flow__request">
          <span className="hv2-ui-label">ChatGPT request</span>
          <strong>Update the checkout flow and verify the result.</strong>
        </div>
        <div className="hv2-workbench-flow__rail" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="hv2-workbench-flow__operations">
          <div><span>01</span><strong>Bounded context</strong><small>exact repo paths</small></div>
          <div><span>02</span><strong>Guarded change</strong><small>approved file scope</small></div>
          <div><span>03</span><strong>Targeted validation</strong><small>browser + type check</small></div>
          <div><span>04</span><strong>Explicit Git action</strong><small>review before push</small></div>
        </div>
        <div className="hv2-workbench-flow__result">
          <span className="hv2-status hv2-status--approved"><CheckIcon /> Validated locally</span>
          <strong>3 files changed · 0 console errors</strong>
        </div>
      </div>

      <div className="hv2-product__copy">
        <p className="hv2-kicker">ProChat Workbench · Free AGPL prerelease</p>
        <h2 id="hv2-workbench-title">Build apps through ChatGPT locally.</h2>
        <p>
          Bring exact project context into a bounded workflow where reads, changes, validation, continuity, and Git boundaries remain visible.
        </p>
        <ul className="hv2-product__facts">
          <li>ChatGPT remains the reasoning and conversation surface.</li>
          <li>Your computer remains the execution environment.</li>
          <li>Workbench keeps policy, evidence, validation, and Git discipline explicit.</li>
        </ul>
        <div className="hv2-actions">
          <Link href="/workbench" className="hv2-btn hv2-btn--light">
            Start with Workbench <ArrowIcon />
          </Link>
          <Link href="https://github.com/prochattools/workbench" className="hv2-btn hv2-btn--text">
            View the repository <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  )
}

function ContextAssemblySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<ScrollTriggerInstance | null>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return

    gsap.registerPlugin(ScrollTrigger)

    const relevant = gsap.utils.toArray('.hv2-b2-memory--relevant', root)
    const irrelevant = root.querySelector('.hv2-b2-memory--irrelevant')
    const signals = gsap.utils.toArray('.hv2-b2-task__signals span', root)
    const contextColumn = root.querySelector('.hv2-b2-context')
    const response = root.querySelector('.hv2-b2-response')
    const memoryField = root.querySelector('.hv2-b2-memory-field')
    const connectors = root.querySelector('.hv2-b2-connectors')
    const task = root.querySelector('.hv2-b2-task')
    const appliedManifest = root.querySelector('.hv2-b2-applied-manifest')

    if (!irrelevant || !contextColumn || !response || !memoryField || !connectors || !task || !appliedManifest) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactLandscapePreference = window.matchMedia('(max-height: 520px) and (orientation: landscape)')
    const animatedTargets = [
      ...relevant,
      irrelevant,
      ...signals,
      contextColumn,
      response,
      memoryField,
      connectors,
      task,
      appliedManifest,
    ]
    let timeline: ReturnType<typeof gsap.timeline> | null = null

    const resetMotion = () => {
      triggerRef.current?.kill()
      triggerRef.current = null
      timeline?.kill()
      timeline = null
      gsap.set(animatedTargets, { clearProps: 'all' })
    }

    const configureMotion = () => {
      resetMotion()

      if (motionPreference.matches || compactLandscapePreference.matches) {
        gsap.set(relevant, { opacity: 1, scale: 1, x: 0 })
        gsap.set(irrelevant, { opacity: 0.18 })
        gsap.set(signals, { color: 'rgb(219 228 255)', borderColor: 'rgb(111 138 220)', backgroundColor: 'rgb(33 50 92)' })
        gsap.set(memoryField, { autoAlpha: 0 })
        gsap.set(connectors, { opacity: 0 })
        gsap.set(contextColumn, { autoAlpha: 0 })
        gsap.set(task, { autoAlpha: 0 })
        gsap.set(appliedManifest, { opacity: 1, y: 0 })
        gsap.set(response, { opacity: 1, x: 0, scale: 1 })
        activeIndexRef.current = 3
        setActiveIndex(3)
        ScrollTrigger.refresh()
        return
      }

      activeIndexRef.current = 0
      setActiveIndex(0)
      gsap.set(relevant, { opacity: 0.28, scale: 0.985, x: 28 })
      gsap.set(irrelevant, { opacity: 0.24, scale: 0.985, x: 28 })
      gsap.set(contextColumn, { opacity: 0, x: 50, scale: 0.985 })
      gsap.set(response, { opacity: 0, x: 54, scale: 0.985 })
      gsap.set(appliedManifest, { opacity: 0, y: 18 })
      gsap.set(connectors, { opacity: 0 })

      timeline = gsap.timeline({ defaults: { ease: 'none' } })
      timeline
        .to(signals, { color: 'rgb(219 228 255)', borderColor: 'rgb(111 138 220)', backgroundColor: 'rgb(33 50 92)', duration: 0.12, stagger: 0.025 }, 0.12)
        .to(relevant, { opacity: 1, scale: 1, x: 0, borderColor: 'rgb(113 141 224)', duration: 0.18, stagger: 0.025 }, 0.16)
        .to(irrelevant, { opacity: 0.12, x: 42, duration: 0.16 }, 0.18)
        .to(connectors, { opacity: 0.82, duration: 0.14 }, 0.2)
        .to(connectors, { opacity: 0.12, duration: 0.1 }, 0.39)
        .to(memoryField, { autoAlpha: 0, x: 44, duration: 0.1 }, 0.4)
        .to(contextColumn, { opacity: 1, x: 0, scale: 1, duration: 0.2 }, 0.43)
        .to(task, { y: -14, borderColor: 'rgb(94 117 172)', duration: 0.18 }, 0.44)
        .to(contextColumn, { autoAlpha: 0, x: 38, scale: 0.99, duration: 0.08 }, 0.62)
        .to(memoryField, { opacity: 0, duration: 0.08 }, 0.62)
        .to(task, { autoAlpha: 0, y: -20, duration: 0.06 }, 0.64)
        .to(response, { opacity: 1, x: 0, scale: 1, duration: 0.18 }, 0.7)
        .to(appliedManifest, { opacity: 1, y: 0, duration: 0.14 }, 0.72)

      triggerRef.current = ScrollTrigger.create({
        trigger: root,
        start: 'top top+=68',
        end: 'bottom bottom',
        scrub: 0.55,
        animation: timeline,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const nextIndex = self.progress < 0.22 ? 0 : self.progress < 0.48 ? 1 : self.progress < 0.8 ? 2 : 3
          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex
            setActiveIndex(nextIndex)
          }
        },
      })
      ScrollTrigger.refresh()
    }

    configureMotion()
    motionPreference.addEventListener('change', configureMotion)
    compactLandscapePreference.addEventListener('change', configureMotion)

    return () => {
      motionPreference.removeEventListener('change', configureMotion)
      compactLandscapePreference.removeEventListener('change', configureMotion)
      resetMotion()
    }
  }, [])

  const scrollToState = (index: number) => {
    const trigger = triggerRef.current
    if (!trigger) return
    const progress = CONTEXT_STATE_PROGRESS[index]
    window.scrollTo({ top: trigger.start + (trigger.end - trigger.start) * progress, behavior: 'smooth' })
  }

  const chapter = CONTEXT_CHAPTERS[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="hv2-b2"
      aria-labelledby="hv2-b2-title"
      data-context-state={chapter.name}
      data-review-artifact="context-assembly"
    >
      <div className="hv2-b2__stage">
        <div className="hv2-b2__copy">
          <p className="hv2-kicker">{chapter.label}</p>
          <h2 id="hv2-b2-title">{chapter.title}</h2>
          <p>{chapter.copy}</p>
        </div>

        <div className="hv2-b2-task" aria-hidden={activeIndex === 3}>
          <span className="hv2-ui-label">Current task</span>
          <h3>Fix checkout regression without reopening resolved architecture.</h3>
          <p>Need verified implementation context, prior owner decisions, and browser evidence.</p>
          <div className="hv2-b2-task__signals"><span>checkout</span><span>selectors</span><span>production</span></div>
        </div>

        <div className="hv2-b2-memory-field" aria-label="Reviewed memory candidates" aria-hidden={activeIndex >= 2}>
          <article className="hv2-b2-memory hv2-b2-memory--relevant"><strong>Stable selector contract</strong><small>code · commit 42d8a1 · approved</small></article>
          <article className="hv2-b2-memory hv2-b2-memory--relevant"><strong>Production redirect contract</strong><small>owner decision · approved</small></article>
          <article className="hv2-b2-memory hv2-b2-memory--relevant"><strong>Browser verification requirement</strong><small>evidence · current</small></article>
          <article className="hv2-b2-memory hv2-b2-memory--irrelevant"><strong>Deprecated billing experiment</strong><small>retired · unrelated scope</small></article>
        </div>

        <svg className="hv2-b2-connectors" viewBox="0 0 1440 820" preserveAspectRatio="none" aria-hidden="true">
          <path d="M485 545 C650 545 685 298 760 298" />
          <path d="M485 545 C650 545 685 430 760 430" />
          <path d="M485 545 C650 545 685 562 760 562" />
        </svg>

        <div className="hv2-b2-context" aria-label="Assembled context" aria-hidden={activeIndex !== 2}>
          <header><strong>Assembled context</strong><span>3 reviewed records</span></header>
          <article><strong>Stable selector contract</strong><small>code · commit 42d8a1 · approved</small></article>
          <article><strong>Production redirect contract</strong><small>owner decision · approved</small></article>
          <article><strong>Browser verification requirement</strong><small>evidence · current</small></article>
        </div>

        <div className="hv2-b2-response" aria-label="Applied context response" aria-hidden={activeIndex !== 3}>
          <span className="hv2-ui-label">Applied context</span>
          <h3>Change the selector. Preserve the redirect contract.</h3>
          <p>
            The reviewed evidence supports replacing the translated-text selector with a stable data attribute. The production redirect remains an explicit owner decision and stays unchanged.
          </p>
          <div className="hv2-b2-response__citations"><span>42d8a1</span><span>browser:10:42</span><span>decision:redirects</span></div>
          <footer><span>3 sources applied</span><strong><CheckIcon /> Provenance visible</strong></footer>
        </div>

        <div className="hv2-b2-applied-manifest" aria-label="Applied source manifest" aria-hidden={activeIndex !== 3}>
          <header><span>Context manifest</span><strong>3 / 3 reviewed</strong></header>
          <div><span>Code</span><strong>42d8a1</strong></div>
          <div><span>Evidence</span><strong>browser · 10:42</strong></div>
          <div><span>Decision</span><strong>production redirects</strong></div>
        </div>

        <div className="hv2-b2__rail" aria-label="Context assembly states">
          {CONTEXT_CHAPTERS.map((item, index) => (
            <button key={item.name} type="button" aria-current={activeIndex === index ? 'step' : undefined} onClick={() => scrollToState(index)}>
              <span>{String(index + 1).padStart(2, '0')}</span>{item.label.split(' · ')[1]}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  const columns = [
    'Evidence sources',
    'Scope',
    'Review',
    'Durable memory',
    'Retrieval',
    'Workbench execution',
  ]
  const rows = [
    {
      label: 'Primary object',
      values: ['Code, browser, decisions', 'Project boundary', 'Candidate lesson', 'Markdown record', 'Task context', 'Guarded change'],
    },
    {
      label: 'Human action',
      values: ['Inspect source', 'Choose boundary', 'Approve, edit, reject', 'Correct or retire', 'Confirm relevance', 'Validate and stage'],
    },
    {
      label: 'Visible record',
      values: ['Source reference', 'Scope metadata', 'Review history', 'Git revision', 'Applied manifest', 'Validation receipt'],
    },
    {
      label: 'Failure guard',
      values: ['Stale evidence', 'Over-broad reuse', 'Unreviewed claim', 'Superseded lesson', 'Archive overload', 'Unconfirmed mutation'],
    },
  ]

  return (
    <section className="hv2-architecture" aria-labelledby="hv2-architecture-title" data-review-artifact="architecture">
      <header>
        <p className="hv2-kicker hv2-kicker--dark">The complete system</p>
        <h2 id="hv2-architecture-title">Evidence in. Better work out.</h2>
        <p>Every stage keeps its object, owner action, record, and failure boundary visible from first evidence through guarded execution.</p>
      </header>

      <div className="hv2-system-frame">
        <div className="hv2-system-frame__rail" aria-hidden="true"><span>CURRENT EVIDENCE</span><i /><span>CONTROLLED USE</span></div>
        <div className="hv2-system-frame__table-wrap">
          <table>
            <thead><tr><th scope="col">System state</th>{columns.map((column, index) => <th key={column} scope="col"><span>{String(index + 1).padStart(2, '0')}</span>{column}</th>)}</tr></thead>
            <tbody>{rows.map(row => <tr key={row.label}><th scope="row">{row.label}</th>{row.values.map((value, index) => <td key={`${row.label}-${columns[index]}`}>{value}</td>)}</tr>)}</tbody>
          </table>
        </div>
        <footer><span>Local Markdown</span><span>Git versioning</span><span>Visible provenance</span><span>Relevant retrieval</span><strong>Human judgment remains authoritative</strong></footer>
      </div>
    </section>
  )
}

function TailoredSection() {
  return (
    <section className="hv2-tailored" aria-labelledby="hv2-tailored-title" data-review-artifact="modular-grid">
      <header>
        <p className="hv2-kicker hv2-kicker--dark">Built around the work</p>
        <h2 id="hv2-tailored-title">One memory model. Different working surfaces.</h2>
        <p>Start with the discipline, interface, or ownership boundary that matches the project in front of you.</p>
      </header>
      <div className="hv2-tailored__grid">
        <article className="hv2-tailored__qa">
          <span className="hv2-ui-label">Memory for QA · selected beta</span>
          <div><h3>Keep the investigation attached to the lesson.</h3><p>Failures, evidence, fixes, selectors, environments, and reviewer decisions remain readable as one reusable record.</p></div>
          <Link href="/memory-qa">Explore Memory for QA <ArrowIcon /></Link>
        </article>
        <article className="hv2-tailored__workbench">
          <span className="hv2-ui-label">Workbench</span>
          <h3>Put reviewed context into a guarded local workflow.</h3>
          <Link href="/workbench">Explore Workbench <ArrowIcon /></Link>
        </article>
        <article className="hv2-tailored__docs">
          <span className="hv2-ui-label">Documentation and technical work</span>
          <h3>Preserve decisions where the next maintainer can inspect them.</h3>
          <p>Use human-readable records, exact sources, and correction history instead of an opaque context layer.</p>
          <Link href="/docs">Read the documentation <ArrowIcon /></Link>
        </article>
        <article className="hv2-tailored__local">
          <span className="hv2-ui-label">Local-first architecture</span>
          <div className="hv2-tailored__local-map" aria-hidden="true"><span>your computer</span><i /><span>Markdown</span><i /><span>Git</span></div>
          <h3>Customer memory remains on the customer&apos;s computer.</h3>
          <p>Readable files and explicit Git history keep ownership and change visible.</p>
        </article>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="hv2-closing" aria-labelledby="hv2-closing-title" data-review-artifact="closing-cta">
      <div>
        <p className="hv2-kicker hv2-kicker--inverse">Choose the next path</p>
        <h2 id="hv2-closing-title">Put trusted memory to work.</h2>
        <p>Apply for the selected QA beta, begin with Workbench, or discuss one repeated workflow that should become durable Memory.</p>
      </div>
      <div className="hv2-closing__actions">
        <Link href="/contact?topic=memory-qa-beta#contact-form-card" className="hv2-btn hv2-btn--light">
          Apply for the Memory for QA beta <ArrowIcon />
        </Link>
        <Link href="/workbench" className="hv2-btn hv2-btn--outline-light">Start with Workbench <ArrowIcon /></Link>
        <Link href="/contact?topic=memory#contact-form-card" className="hv2-btn hv2-btn--text">Discuss a Memory workflow <ArrowIcon /></Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="hv2-footer" data-review-artifact="footer">
      <div className="hv2-footer__brand">
        <span className="hv2-footer__wordmark">ProChat</span>
        <p>Structured memory for AI workflows. Evidence stays visible, memory stays reviewable, and actions stay explicit.</p>
      </div>
      <div className="hv2-footer__columns">
        <div><h3>Products</h3><Link href="/memory">ProChat Memory</Link><Link href="/memory-qa">Memory for QA</Link><Link href="/workbench">Workbench</Link></div>
        <div><h3>Explore</h3><Link href="/memory">How Memory works</Link><Link href="/memory-qa">The QA edition</Link><Link href="/workbench">Local Workbench</Link></div>
        <div><h3>Resources</h3><Link href="/docs">Documentation</Link><Link href="https://github.com/prochattools">GitHub</Link><Link href="/contact">Contact</Link></div>
        <div><h3>Company</h3><Link href="/contact?topic=memory-qa-beta#contact-form-card">Selected QA beta</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Contact</Link></div>
      </div>
      <div className="hv2-footer__bottom"><span>© 2026 ProChat. All rights reserved.</span><span>Local-first · Memory-first · Human-reviewed</span></div>
    </footer>
  )
}

export function HomeV2() {
  return (
    <div className="hv2-page" data-home-v2>
      <NavBar />
      <main>
        <HeroSection />
        <TechnicalEvidenceSection />
        <MemoryModelSection />
        <ContextAssemblySection />
        <section id="products" className="hv2-paired-products" aria-labelledby="hv2-products-title" data-review-artifact="paired-products">
          <header>
            <p className="hv2-kicker hv2-kicker--dark">Two products, one philosophy</p>
            <h2 id="hv2-products-title">Keep knowledge reusable. Put it to work safely.</h2>
            <p>Memory preserves what the project learned. Workbench brings exact local context into guarded execution.</p>
          </header>
          <div className="hv2-paired-products__grid"><MemoryForQASection /><WorkbenchSection /></div>
        </section>
        <ArchitectureSection />
        <TailoredSection />
        <ClosingSection />
      </main>
      <Footer />
    </div>
  )
}
