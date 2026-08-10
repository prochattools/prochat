'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h9" />
      <path d="m9 4 4 4-4 4" />
    </svg>
  )
}

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => {
      if (query.matches) {
        videoRef.current?.pause()
        return
      }
      void videoRef.current?.play().catch(() => undefined)
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return (
    <section className="hv4-hero" aria-labelledby="hv4-hero-title">
      <div className="hv4-hero__media" aria-hidden="true">
        <video ref={videoRef} muted playsInline preload="metadata" poster="/motion/home-v2/a2-review-gate-poster.png">
          <source src="/motion/home-v2/a2-review-gate-vp9.webm" type="video/webm" />
          <source src="/motion/home-v2/a2-review-gate-h264.mp4" type="video/mp4" />
        </video>
        <img src="/motion/home-v2/a2-review-gate-final.png" alt="" className="hv4-hero__still" />
      </div>
      <div className="hv4-hero__content">
        <p className="hv4-eyebrow">Structured memory for AI work</p>
        <h1 id="hv4-hero-title">Build memory that gets better with your work.</h1>
        <p className="hv4-hero__lede">Keep reviewed decisions, evidence, and lessons reusable across every new task.</p>
        <div className="hv4-actions">
          <Link href="/memory" className="hv4-button hv4-button--light">Explore Memory <ArrowIcon /></Link>
          <Link href="/workbench" className="hv4-button hv4-button--ghost">Start with Workbench <ArrowIcon /></Link>
        </div>
      </div>
    </section>
  )
}

function ContextLocalSection() {
  return (
    <section className="hv4-context" aria-labelledby="hv4-context-title">
      <header className="hv4-centered-heading">
        <p className="hv4-eyebrow">Context: Local</p>
        <h2 id="hv4-context-title">The right memory, close to the work.</h2>
        <p>Reviewed context stays local, inspectable, and ready when the next task begins.</p>
      </header>

      <div className="hv4-context__visual" aria-label="A local memory system connecting evidence, review, and current-task context">
        <div className="hv4-orbit hv4-orbit--outer" />
        <div className="hv4-orbit hv4-orbit--middle" />
        <div className="hv4-orbit hv4-orbit--inner" />
        <div className="hv4-memory-core">
          <span className="hv4-memory-core__label">Memory</span>
          <strong>Reviewed context</strong>
          <small>local · durable · inspectable</small>
        </div>
        <div className="hv4-node hv4-node--source"><span>Evidence</span><strong>Source attached</strong></div>
        <div className="hv4-node hv4-node--review"><span>Review</span><strong>Human decision</strong></div>
        <div className="hv4-node hv4-node--task"><span>Current task</span><strong>Relevant only</strong></div>
        <svg className="hv4-context__routes" viewBox="0 0 900 520" aria-hidden="true">
          <path d="M170 260 C280 135 360 150 450 258" />
          <path d="M730 130 C610 105 540 145 450 258" />
          <path d="M735 392 C615 430 530 370 450 258" />
        </svg>
      </div>

      <div className="hv4-triplet">
        <article><span>01</span><h3>Capture evidence</h3><p>Keep source, state, and provenance attached.</p></article>
        <article><span>02</span><h3>Review what lasts</h3><p>People decide what becomes durable memory.</p></article>
        <article><span>03</span><h3>Retrieve what matters</h3><p>Use the smallest trusted context for the task.</p></article>
      </div>
    </section>
  )
}

function TrustSection() {
  return (
    <section className="hv4-trust" aria-labelledby="hv4-trust-title">
      <header className="hv4-centered-heading hv4-centered-heading--compact">
        <p className="hv4-eyebrow">Built for inspectable AI work</p>
        <h2 id="hv4-trust-title">Trust comes from what you can verify.</h2>
      </header>
      <div className="hv4-trust__frame">
        <div className="hv4-trust__quote">
          <p>Memory stays readable. Review stays explicit. Every important change can be traced back to its source.</p>
          <span>ProChat product principle</span>
        </div>
        <div className="hv4-trust__facts">
          <span>Local files</span>
          <span>Human-reviewed</span>
          <span>Git-versioned</span>
          <span>Model-agnostic</span>
        </div>
      </div>
    </section>
  )
}

function WhyChooseSection() {
  return (
    <section className="hv4-why" aria-labelledby="hv4-why-title">
      <header className="hv4-centered-heading hv4-centered-heading--compact">
        <p className="hv4-eyebrow">Why ProChat</p>
        <h2 id="hv4-why-title">Keep the lesson. Put it back to work.</h2>
      </header>
      <div className="hv4-why__grid">
        <article className="hv4-feature-panel hv4-feature-panel--dark">
          <div className="hv4-feature-panel__copy">
            <p className="hv4-eyebrow">Memory for QA</p>
            <h3>Stop solving the same QA failure twice.</h3>
            <p>Preserve evidence, fixes, and reviewed conclusions as one reusable record.</p>
            <Link href="/memory-qa">Explore Memory for QA <ArrowIcon /></Link>
          </div>
          <div className="hv4-mini-console">
            <span>checkout · browser evidence</span>
            <strong>Selector contract reviewed</strong>
            <i>approved lesson</i>
          </div>
        </article>

        <article className="hv4-feature-panel hv4-feature-panel--cobalt">
          <div className="hv4-feature-panel__copy">
            <p className="hv4-eyebrow">Workbench</p>
            <h3>Build through ChatGPT locally.</h3>
            <p>Bring exact project context into a bounded workflow on your own computer.</p>
            <Link href="/workbench">Start with Workbench <ArrowIcon /></Link>
          </div>
          <div className="hv4-workflow-strip">
            <span>read context</span><b>→</b><span>make change</span><b>→</b><span>validate</span><b>→</b><span>commit</span>
          </div>
        </article>
      </div>
    </section>
  )
}

function SystemSection() {
  const modes = [
    { n: '01', title: 'Capture', copy: 'Evidence keeps its source.' },
    { n: '02', title: 'Review', copy: 'People decide what lasts.' },
    { n: '03', title: 'Retrieve', copy: 'Only relevant memory returns.' },
    { n: '04', title: 'Execute', copy: 'Workbench applies context safely.' },
  ]

  return (
    <section className="hv4-system" aria-labelledby="hv4-system-title">
      <header className="hv4-centered-heading">
        <p className="hv4-eyebrow">One memory model</p>
        <h2 id="hv4-system-title">From evidence to useful context.</h2>
        <p>One clear path from what happened to what the next task needs.</p>
      </header>

      <div className="hv4-system__frame">
        <div className="hv4-system__diagram" aria-hidden="true">
          <div className="hv4-system__rail" />
          <span className="hv4-system__chip hv4-system__chip--a">source</span>
          <span className="hv4-system__chip hv4-system__chip--b">review</span>
          <span className="hv4-system__chip hv4-system__chip--c">memory</span>
          <span className="hv4-system__chip hv4-system__chip--d">task</span>
        </div>
        <div className="hv4-system__columns">
          {modes.map((mode) => (
            <article key={mode.n}><span>{mode.n}</span><h3>{mode.title}</h3><p>{mode.copy}</p></article>
          ))}
        </div>
      </div>
    </section>
  )
}

function TailoredSection() {
  return (
    <section className="hv4-tailored" id="products" aria-labelledby="hv4-tailored-title">
      <header className="hv4-centered-heading hv4-centered-heading--compact">
        <p className="hv4-eyebrow">Built around the work</p>
        <h2 id="hv4-tailored-title">Use the surface that fits the job.</h2>
      </header>
      <div className="hv4-tailored__grid">
        <article className="hv4-tailored__memory">
          <p className="hv4-eyebrow">Memory</p>
          <h3>Keep reviewed project knowledge reusable.</h3>
          <Link href="/memory">Explore Memory <ArrowIcon /></Link>
        </article>
        <article className="hv4-tailored__local">
          <p className="hv4-eyebrow">Local-first</p>
          <h3>Your memory stays on your computer.</h3>
          <div className="hv4-local-stack"><span>files</span><span>Markdown</span><span>Git</span></div>
        </article>
        <article className="hv4-tailored__qa">
          <p className="hv4-eyebrow">Memory for QA</p>
          <h3>Turn failure evidence into durable lessons.</h3>
          <Link href="/memory-qa">Explore the beta <ArrowIcon /></Link>
        </article>
        <article className="hv4-tailored__workbench">
          <p className="hv4-eyebrow">Workbench</p>
          <h3>Put trusted context into a guarded local workflow.</h3>
          <Link href="/workbench">Open Workbench <ArrowIcon /></Link>
        </article>
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="hv4-closing" aria-labelledby="hv4-closing-title">
      <div>
        <p className="hv4-eyebrow">Start with one repeated workflow</p>
        <h2 id="hv4-closing-title">Put trusted memory to work.</h2>
        <p>Choose Memory for QA, begin with Workbench, or talk through a workflow.</p>
      </div>
      <div className="hv4-actions">
        <Link href="/contact?topic=memory-qa-beta#contact-form-card" className="hv4-button hv4-button--light">Apply for beta <ArrowIcon /></Link>
        <Link href="/workbench" className="hv4-button hv4-button--ghost">Start with Workbench <ArrowIcon /></Link>
      </div>
    </section>
  )
}

export function HomeV2() {
  return (
    <main className="hv4-page" data-home-v2>
      <HeroSection />
      <ContextLocalSection />
      <TrustSection />
      <WhyChooseSection />
      <SystemSection />
      <TailoredSection />
      <ClosingSection />
    </main>
  )
}
