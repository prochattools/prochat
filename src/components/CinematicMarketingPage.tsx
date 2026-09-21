'use client'

import Link from 'next/link'

import {
  CinematicMarketingShell,
  type CinematicMarketingCta,
} from './CinematicMarketingShell'
import { CinematicChapter, CinematicGlassPanel } from './cinematic/CinematicChapter'
import { CinematicMediaPage } from './cinematic/CinematicMediaPage'

export type CinematicMarketingCapability = {
  title: string
  body: string
}

export type CinematicMarketingPageData = {
  eyebrowItems: readonly string[]
  intro: string
  badge: string
  heroTitle: string
  heroBody: string
  cardTitle: string
  cardMeta: string
  cardCta: string
  cardHref: string
  secondEyebrow: string
  secondTitle: string
  secondBody: string
  capabilities: readonly CinematicMarketingCapability[]
  primaryCta: CinematicMarketingCta
  secondaryCta: { label: string; href: string }
}

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

export function CinematicMarketingPage({ data }: { data: CinematicMarketingPageData }) {
  return (
    <CinematicMarketingShell contentOwnsMain cta={data.primaryCta} cinematicTheme>
      <main id="main-content" className="cm-shell__main cm-canonical-main">
        <CinematicMediaPage className="cm-marketing-experience" chapterCount={2}>
          <CinematicChapter id="cinematic-hero" index={0} align="wide">
            <div className="cm-template-topline">
              <div className="cm-template-services">
                {data.eyebrowItems.map(item => <span key={item}>{item}</span>)}
              </div>
              <p>{data.intro}</p>
            </div>

            <div className="cm-template-hero-grid">
              <div className="cm-template-hero-copy">
                <h1>{data.heroTitle}</h1>
                <p className="cm-template-badge">{data.badge}</p>
                <p className="cm-lede">{data.heroBody}</p>
                <div className="cm-actions">
                  <Link className="cm-actions__primary" href={data.primaryCta.href}>{data.primaryCta.label} <Arrow /></Link>
                  <Link className="cm-actions__secondary" href={data.secondaryCta.href}>{data.secondaryCta.label} <Arrow /></Link>
                </div>
              </div>
              <CinematicGlassPanel className="cm-template-context-card">
                <span className="cm-kicker">ProChat / public system</span>
                <strong>{data.cardTitle}</strong>
                <small>{data.cardMeta}</small>
                <Link className="cm-inline-link" href={data.cardHref}>{data.cardCta} <Arrow /></Link>
              </CinematicGlassPanel>
            </div>
          </CinematicChapter>

          <div className="cm-cinematic-spacer" aria-hidden="true" />

          <CinematicChapter id="cinematic-capabilities" index={1} align="wide" eyebrow={data.secondEyebrow}>
            <div className="cm-template-topline cm-template-topline--second">
              <span />
              <p>{data.secondBody}</p>
            </div>

            <div className="cm-template-section-grid">
              <div>
                <h2>{data.secondTitle}</h2>
                <p className="cm-lede">{data.secondBody}</p>
                <div className="cm-actions">
                  <Link className="cm-actions__primary" href={data.primaryCta.href}>{data.primaryCta.label} <Arrow /></Link>
                  <Link className="cm-actions__secondary" href={data.secondaryCta.href}>{data.secondaryCta.label} <Arrow /></Link>
                </div>
              </div>
              <CinematicGlassPanel className="cm-template-capability-panel">
                {data.capabilities.map((capability, index) => (
                  <div className="cm-template-capability" key={capability.title}>
                    <span className="cm-template-capability__index">0{index + 1}</span>
                    <div>
                      <strong>{capability.title}</strong>
                      <p>{capability.body}</p>
                    </div>
                    <span className="cm-template-capability__arrow" aria-hidden="true">↗</span>
                  </div>
                ))}
              </CinematicGlassPanel>
            </div>
          </CinematicChapter>
        </CinematicMediaPage>
      </main>
    </CinematicMarketingShell>
  )
}
