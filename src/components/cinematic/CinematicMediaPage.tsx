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
    const chapters = Array.from(page.querySelectorAll<HTMLElement>('[data-cinematic-chapter]'))
    const viewportCenter = window.innerHeight / 2
    let activeChapter = 0
    let closestDistance = Number.POSITIVE_INFINITY
    chapters.forEach((chapter, index) => {
      const rect = chapter.getBoundingClientRect()
      const distance = Math.abs((rect.top + rect.bottom) / 2 - viewportCenter)
      if (distance < closestDistance) {
        closestDistance = distance
        activeChapter = index
      }
    })
    activeChapter = Math.min(chapterCount - 1, activeChapter)
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
      {!lite ? (
        <ScrollVideoBackground
          containerRef={pageRef}
          className="cm-experience__media"
          onProgress={handleProgress}
        />
      ) : null}
      <div className="cm-experience__wash" aria-hidden="true" />
      <div className="cm-experience__content">{children}</div>
    </div>
  )
}
