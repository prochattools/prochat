'use client'

import Link from 'next/link'

import { CinematicMarketingShell } from './CinematicMarketingShell'
import { CinematicChapter, CinematicGlassPanel } from './cinematic/CinematicChapter'
import { CinematicMediaPage } from './cinematic/CinematicMediaPage'

function Arrow() { return <span aria-hidden="true">↗</span> }

export function HomeV2() {
  return (
    <CinematicMarketingShell contentOwnsMain>
      <main id="main-content" className="cm-shell__main cm-home-main">
        <CinematicMediaPage className="cm-home-experience" chapterCount={8}>
          <CinematicChapter id="home-intro" index={0} align="left">
            <p className="cm-chapter__eyebrow">A human-owned system for AI work</p>
            <h1>Remember what matters. Direct the work.</h1>
            <p className="cm-lede">Evermind remembers. Nevermind brings context. Mastermind directs the work.</p>
            <div className="cm-actions"><Link className="cm-actions__primary" href="/evermind">Explore Evermind <Arrow /></Link><Link className="cm-actions__secondary" href="#home-system">See the system <Arrow /></Link></div>
          </CinematicChapter>

          <CinematicChapter id="home-evermind" index={1} align="wide" eyebrow="01 / Evermind / Memory" title="Keep the lesson close to the work.">
            <p className="cm-lede">Capture the source, review what should last, and retrieve the smallest trusted context for the next task.</p>
            <div className="cm-stat-grid"><div><strong>Capture</strong><span>Keep source, state, and provenance attached.</span></div><div><strong>Review</strong><span>People decide what becomes durable memory.</span></div><div><strong>Retrieve</strong><span>Use relevant memory without surrendering ownership.</span></div></div>
          </CinematicChapter>

          <CinematicChapter id="home-nevermind" index={2} align="right" eyebrow="02 / Nevermind / Context" title="Memory becomes working context.">
            <CinematicGlassPanel className="cm-context-panel"><span className="cm-kicker">Stored memory → relevant context → active work</span><p className="cm-lede">Nevermind helps supported AI tools begin with the decisions and project knowledge that matter now, instead of asking you to rebuild the story.</p><div className="cm-context-panel__rail"><span>prior decision</span><i /><span>current task</span><i /><span>useful context</span></div><Link className="cm-inline-link" href="/nevermind">Explore Nevermind <Arrow /></Link></CinematicGlassPanel>
          </CinematicChapter>

          <CinematicChapter id="home-mastermind" index={3} align="left" eyebrow="03 / Mastermind / Execution" title="Direct the work with intent.">
            <div className="cm-mastermind-layout"><p className="cm-lede">Mastermind reasons across authorized project context, delegates bounded work when useful, and validates what actually changed.</p><CinematicGlassPanel><span className="cm-kicker">Controlled loop</span><ol className="cm-loop-list"><li>Reason</li><li>Delegate</li><li>Validate</li></ol><Link className="cm-inline-link" href="/mastermind">Explore Mastermind <Arrow /></Link></CinematicGlassPanel></div>
          </CinematicChapter>

          <CinematicChapter id="home-system" index={4} align="center" eyebrow="The relationship" title="One system. Three clear responsibilities.">
            <p className="cm-lede">Memory stays durable. Context stays useful. Execution stays deliberate and visible.</p><div className="cm-system-line"><span>Evermind / Memory</span><i aria-hidden="true" /><span>Nevermind / Context</span><i aria-hidden="true" /><span>Mastermind / Execution</span></div>
          </CinematicChapter>

          <CinematicChapter id="home-control" index={5} align="wide" eyebrow="Human control" title="Useful because you can inspect it.">
            <p className="cm-lede">Local. Human-reviewed. Inspectable. Portable. Controlled. ProChat keeps the important decisions legible as the work moves forward.</p><div className="cm-control-list"><span>Local files</span><span>Human-reviewed</span><span>Portable memory</span><span>Model-agnostic</span><span>Bounded execution</span></div>
          </CinematicChapter>

          <CinematicChapter id="home-choose" index={6} align="center" eyebrow="Choose your layer" title="Start where the work is waiting.">
            <div className="cm-choice-grid"><article><span className="cm-kicker">Evermind</span><h3>Remember what matters.</h3><p>Human-owned memory you can read, keep, and move with you.</p><Link href="/evermind">Explore Evermind <Arrow /></Link></article><article><span className="cm-kicker">Nevermind</span><h3>Bring context forward.</h3><p>Relevant prior decisions, available where the task is happening.</p><Link href="/nevermind">Explore Nevermind <Arrow /></Link></article><article><span className="cm-kicker">Mastermind</span><h3>Direct the work.</h3><p>Reason, delegate, and validate with real project context.</p><Link href="/mastermind">Explore Mastermind <Arrow /></Link></article></div>
          </CinematicChapter>

          <CinematicChapter id="home-closing" index={7} align="left" eyebrow="Start with one repeated workflow" title="Put trusted memory to work.">
            <p className="cm-lede">Start with human-owned memory, add working context, or direct the work.</p><div className="cm-actions"><Link className="cm-actions__primary" href="/evermind">Start with Evermind <Arrow /></Link><Link className="cm-actions__secondary" href="/contact">Talk through the work <Arrow /></Link></div>
          </CinematicChapter>
        </CinematicMediaPage>
      </main>
    </CinematicMarketingShell>
  )
}
