'use client'

import { useCallback, useRef } from 'react'

import { ScrollVideoBackground } from '../funnels/ScrollVideoBackground'

import './cinematic-marketing.css'

export function CinematicMediaPage({
  children,
  className = '',
  chapterCount,
  lite = false,
}: {
  children: React.ReactNode
  className?: string
  chapterCount: number
  lite?: boolean
}) {
  const pageRef = useRef<HTMLDivElement>(null)
  const handleProgress = useCallback((progress: number, isActive: boolean) => {
    const page = pageRef.current
    if (!page) return
    const activeChapter = Math.min(chapterCount - 1, Math.floor(progress * chapterCount))
    page.style.setProperty('--cm-progress', String(progress))
    page.dataset.activeChapter = String(activeChapter)
    page.dataset.journeyState = isActive ? 'active' : 'after'
  }, [chapterCount])

  return (
    <div
      ref={pageRef}
      className={`cm-experience ${lite ? 'cm-experience--lite' : ''} ${className}`.trim()}
      data-cinematic-experience
      data-active-chapter="0"
      data-journey-state="active"
    >
      <ScrollVideoBackground
        containerRef={pageRef}
        className="cm-experience__media"
        onProgress={handleProgress}
      />
      <div className="cm-experience__wash" aria-hidden="true" />
      <div className="cm-experience__content">{children}</div>
    </div>
  )
}
