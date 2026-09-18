'use client'

import Link from 'next/link'

import { CinematicHomepageJourney } from './CinematicHomepageJourney'
import { CinematicHomepageFooter, CinematicHomepageNav } from './CinematicHomepageShell'

function ArrowIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h9" />
      <path d="m9 4 4 4-4 4" />
    </svg>
  )
}
function ContextLocalSection() {
  return (
    <section className="hv4-context" aria-labelledby="hv4-context-title">
      <header className="hv4-centered-heading">
        <p className="hv4-eyebrow">Context: Local</p>
        <h2 id="hv4-context-title">The right <span className="hv4-accent-word">memory</span>, close to the work.</h2>
        <p>Reviewed context stays local, inspectable, and ready when the next task begins.</p>
      </header>

      <div className="hv4-context__visual" role="group" aria-label="A local memory system connecting evidence, review, and current-task context">
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
        <h2 id="hv4-trust-title">Trust comes from what you can <span className="hv4-accent-word">verify.</span></h2>
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

function SignalStrip() {
  const signals = ['source attached', 'human-reviewed', 'local files', 'task-ready', 'git-versioned', 'bounded execution']

  return (
    <div className="hv4-signal-strip" aria-hidden="true">
      <div className="hv4-signal-strip__track">
        {[...signals, ...signals].map((signal, index) => (
          <span key={`${signal}-${index}`}><i />{signal}</span>
        ))}
      </div>
    </div>
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
            <p className="hv4-eyebrow">Nevermind</p>
            <h3>Turn memory into working context.</h3>
            <p>Bring the context that matters into the tools and tasks you are already using.</p>
            <Link href="/nevermind">Explore Nevermind <ArrowIcon /></Link>
          </div>
          <div className="hv4-mini-console">
            <span>checkout · browser evidence</span>
            <strong>Selector contract reviewed</strong>
            <i>approved lesson</i>
          </div>
        </article>

        <article className="hv4-feature-panel hv4-feature-panel--cobalt">
          <div className="hv4-feature-panel__copy">
            <p className="hv4-eyebrow">Mastermind</p>
            <h3>Turn vague intentions into controlled execution.</h3>
            <p>Reason across real project context, delegate bounded work, and validate what changed.</p>
            <Link href="/mastermind">Explore Mastermind <ArrowIcon /></Link>
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
    { n: '01', title: 'Remember', copy: 'Evermind keeps memory human-owned.' },
    { n: '02', title: 'Contextualize', copy: 'Nevermind brings memory into the work.' },
    { n: '03', title: 'Plan', copy: 'Mastermind turns intent into an executable plan.' },
    { n: '04', title: 'Direct', copy: 'Bounded execution stays visible and deliberate.' },
  ]

  return (
    <section className="hv4-system" aria-labelledby="hv4-system-title">
      <header className="hv4-centered-heading">
        <p className="hv4-eyebrow">One memory model</p>
        <h2 id="hv4-system-title">From evidence to useful <span className="hv4-accent-word">context.</span></h2>
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
          <p className="hv4-eyebrow">Evermind</p>
          <h3>Keep human-owned memory reusable.</h3>
          <p>Free, local-first memory with a clear Capture · Review · Retrieve loop.</p>
          <Link href="/evermind">Explore Evermind <ArrowIcon /></Link>
        </article>
        <article className="hv4-tailored__nevermind">
          <p className="hv4-eyebrow">Nevermind</p>
          <h3>Bring memory into working context.</h3>
          <p>Nevermind turns memory into working context for the AI tools you choose.</p>
          <Link href="/nevermind">Explore Nevermind <ArrowIcon /></Link>
        </article>
        <article className="hv4-tailored__mastermind">
          <p className="hv4-eyebrow">Mastermind</p>
          <h3>Direct bounded work with real project context.</h3>
          <Link href="/mastermind">Explore Mastermind <ArrowIcon /></Link>
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
        <p>Start with human-owned memory, add working context, or direct the work.</p>
      </div>
      <div className="hv4-actions">
        <Link href="/evermind" className="hv4-button hv4-button--light">Start with Evermind <ArrowIcon /></Link>
        <Link href="/mastermind" className="hv4-button hv4-button--ghost">Explore Mastermind <ArrowIcon /></Link>
      </div>
    </section>
  )
}

export function HomeV2() {
  return (
    <>
      <CinematicHomepageNav />
      <main id="main-content" className="hv4-page" data-home-v2>
        <CinematicHomepageJourney />
        <ContextLocalSection />
        <TrustSection />
        <SignalStrip />
        <WhyChooseSection />
        <SystemSection />
        <TailoredSection />
        <ClosingSection />
      </main>
      <CinematicHomepageFooter />
    </>
  )
}
