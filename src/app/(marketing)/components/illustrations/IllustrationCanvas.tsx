'use client'

import {
  createContext,
  useContext,
  useId,
  type ReactNode,
  type SVGProps,
} from 'react'

import type { IllustrationMotion } from './types'
import './illustration-primitives.css'

interface IllustrationDefinitionIds {
  arrow: string
  arrowMuted: string
  dotField: string
  focusGlow: string
  surfaceGlow: string
}

const IllustrationDefinitionContext =
  createContext<IllustrationDefinitionIds | null>(null)

export function useIllustrationDefinitions() {
  const definitions = useContext(IllustrationDefinitionContext)

  if (!definitions) {
    throw new Error(
      'ProChat illustration primitives must be rendered inside IllustrationCanvas.',
    )
  }

  return definitions
}

export interface IllustrationCanvasProps
  extends Omit<SVGProps<SVGSVGElement>, 'children' | 'title'> {
  children: ReactNode
  title?: string
  description?: string
  decorative?: boolean
  motion?: IllustrationMotion
}

export function IllustrationCanvas({
  children,
  title,
  description,
  decorative = false,
  motion = 'none',
  className,
  viewBox = '0 0 300 190',
  ...svgProps
}: IllustrationCanvasProps) {
  const instanceId = useId().replace(/:/g, '')
  const ids = {
    arrow: `pm-arrow-${instanceId}`,
    arrowMuted: `pm-arrow-muted-${instanceId}`,
    dotField: `pm-dot-field-${instanceId}`,
    focusGlow: `pm-focus-glow-${instanceId}`,
    surfaceGlow: `pm-surface-glow-${instanceId}`,
  }
  const titleId = `pm-title-${instanceId}`
  const descriptionId = `pm-description-${instanceId}`
  const meaningful = !decorative && Boolean(title)
  const labelledBy = meaningful
    ? [titleId, description ? descriptionId : null].filter(Boolean).join(' ')
    : undefined

  return (
    <IllustrationDefinitionContext.Provider value={ids}>
      <svg
        {...svgProps}
        className={[
          'pm-illustration',
          motion === 'reveal' ? 'pm-illustration--reveal' : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        viewBox={viewBox}
        role={meaningful ? 'img' : undefined}
        aria-hidden={meaningful ? undefined : true}
        aria-labelledby={labelledBy}
        focusable="false"
      >
        {meaningful ? <title id={titleId}>{title}</title> : null}
        {meaningful && description ? (
          <desc id={descriptionId}>{description}</desc>
        ) : null}
        <defs>
          <marker
            id={ids.arrow}
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
            markerUnits="userSpaceOnUse"
          >
            <path d="M1 1.5 7 4 1 6.5" className="pm-def-arrow" />
          </marker>
          <marker
            id={ids.arrowMuted}
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
            markerUnits="userSpaceOnUse"
          >
            <path d="M1 1.5 7 4 1 6.5" className="pm-def-arrow-muted" />
          </marker>
          <pattern
            id={ids.dotField}
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.7" className="pm-def-dot" />
          </pattern>
          <radialGradient id={ids.focusGlow}>
            <stop offset="0" className="pm-def-focus-start" />
            <stop offset="1" className="pm-def-focus-end" />
          </radialGradient>
          <filter
            id={ids.surfaceGlow}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        {children}
      </svg>
    </IllustrationDefinitionContext.Provider>
  )
}
