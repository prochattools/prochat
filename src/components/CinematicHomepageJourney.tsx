'use client'

import Link from 'next/link'
import { useCallback, useRef } from 'react'

import { ScrollVideoBackground } from './funnels/ScrollVideoBackground'

const STAGES = [
  {
    id: 'evermind',
    number: '01',
    label: 'Evermind / Memory',
    title: 'Capture what matters.',
    body: 'Keep it human-owned.',
    detail: 'Capture · Review · Retrieve',
    href: '/evermind',
    cta: 'Explore Evermind',
  },
  {
    id: 'nevermind',
    number: '02',
    label: 'Nevermind / Context',
    title: 'Nevermind turns memory into working context.',
    body: 'Bring the right prior decisions into the task in front of you.',
    detail: 'Orient · connect · continue',
    href: '/nevermind',
    cta: 'Explore Nevermind',
  },
  {
    id: 'mastermind',
    number: '03',
    label: 'Mastermind / Execution',
    title: 'Mastermind turns vague intentions into controlled execution.',
    body: 'Make the work legible from intent through validation.',
    detail: 'Reason · delegate · validate',
    href: '/mastermind',
    cta: 'Explore Mastermind',
  },
] as const

function stageForProgress(progress: number) {
  if (progress < 1 / 3) return 'evermind'
  if (progress < 2 / 3) return 'nevermind'
  return 'mastermind'
}

export function CinematicHomepageJourney() {
  const sectionRef = useRef<HTMLElement>(null)
  const handleProgress = useCallback((progress: number, isActive: boolean) => {
    const section = sectionRef.current
    if (!section) return
    section.style.setProperty('--home-journey-progress', String(progress))
    section.dataset.activeStage = stageForProgress(progress)
    section.dataset.journeyState = isActive ? 'active' : 'after'
  }, [])

  return (
    <section
      ref={sectionRef}
      className="home-cinematic"
      data-home-cinematic
      data-active-stage="evermind"
      data-journey-state="active"
      aria-labelledby="home-cinematic-title"
    >
      <div className="home-cinematic__sticky">
        <ScrollVideoBackground
          containerRef={sectionRef}
          className="home-cinematic__media"
          onProgress={handleProgress}
        />
        <div className="home-cinematic__wash" aria-hidden="true" />
        <div className="home-cinematic__content">
          <div className="home-cinematic__intro">
            <p className="hv4-eyebrow">A human-owned system for AI work</p>
            <h1 id="home-cinematic-title">Remember what matters. Direct the work.</h1>
            <p>Evermind remembers. Nevermind brings context. Mastermind directs the work.</p>
          </div>

          <ol className="home-cinematic__stages" aria-label="ProChat product journey">
            {STAGES.map((stage) => (
              <li key={stage.id} className="home-cinematic__stage" data-stage={stage.id}>
                <div className="home-cinematic__stage-marker" aria-hidden="true">
                  <span>{stage.number}</span>
                  <i />
                </div>
                <div className="home-cinematic__stage-copy">
                  <p className="home-cinematic__stage-label">{stage.label}</p>
                  <h2>{stage.title}</h2>
                  <p className="home-cinematic__stage-body">{stage.body}</p>
                  <p className="home-cinematic__stage-detail">{stage.detail}</p>
                  <Link href={stage.href}>{stage.cta}<span aria-hidden="true">↗</span></Link>
                </div>
              </li>
            ))}
          </ol>

          <div className="home-cinematic__progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  )
}
