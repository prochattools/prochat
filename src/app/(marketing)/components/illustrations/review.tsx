'use client'

import type {
  PrimitiveProps,
  ReviewCheckpointState,
} from './types'
import { primitiveClassName, primitiveStyle } from './types'

export interface ReviewCheckpointProps extends PrimitiveProps {
  state: ReviewCheckpointState
  label?: string
}

const reviewLabels: Record<ReviewCheckpointState, string> = {
  pending: 'PENDING',
  approved: 'APPROVED',
  rejected: 'REJECTED',
  'revision-required': 'REVISE',
}

function ReviewStateIcon({
  state,
  x,
  y,
}: {
  state: ReviewCheckpointState
  x: number
  y: number
}) {
  if (state === 'approved') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r="8" className="pm-primitive__line-accent" />
        <path d="m-4 0 3 3 5-6" className="pm-primitive__line-accent" />
      </g>
    )
  }

  if (state === 'rejected') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r="8" className="pm-primitive__line-muted" />
        <path d="m-3-3 6 6M3-3l-6 6" className="pm-primitive__line" />
      </g>
    )
  }

  if (state === 'revision-required') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path
          d="M5-4A7 7 0 1 0 6 3M5-4v5H0"
          className="pm-primitive__line"
        />
      </g>
    )
  }

  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="8" className="pm-primitive__line-muted" />
      <path d="M0-4v5l3 2" className="pm-primitive__line-muted" />
    </g>
  )
}

export function ReviewCheckpoint({
  state,
  label = 'Human review',
  x = 0,
  y = 0,
  compact = false,
  revealOrder,
  className,
  opacity,
}: ReviewCheckpointProps) {
  const width = compact ? 126 : 144
  const height = compact ? 39 : 45
  const iconX = compact ? 21 : 24

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <g
        className={primitiveClassName(
          'review-checkpoint',
          state,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        <rect width={width} height={height} rx="10" className="pm-primitive__surface-raised" />
        <ReviewStateIcon state={state} x={iconX} y={height / 2} />
        <text x={compact ? 38 : 43} y={height / 2 - 1} className="pm-primitive__label">
          {label}
        </text>
        <text x={compact ? 38 : 43} y={height / 2 + 11} className="pm-primitive__state">
          {reviewLabels[state]}
        </text>
        <path
          d={`M${width - 17} ${height / 2 - 4}v8`}
          className="pm-review-checkpoint__gate"
        />
      </g>
    </g>
  )
}

export interface CorrectionMarkerProps extends PrimitiveProps {
  label?: string
}

export function CorrectionMarker({
  label = 'CORRECTED',
  x = 0,
  y = 0,
  compact = false,
  revealOrder,
  className,
  opacity,
}: CorrectionMarkerProps) {
  const radius = compact ? 14 : 17

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <g
        className={primitiveClassName(
          'correction-marker',
          undefined,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        <circle r={radius} className="pm-primitive__surface-raised" />
        <path
          d={`M${radius * 0.38} ${-radius * 0.28}A${radius * 0.55} ${radius * 0.55} 0 1 0 ${radius * 0.42} ${radius * 0.25}M${radius * 0.38} ${-radius * 0.28}v${radius * 0.42}h${-radius * 0.42}`}
          className="pm-primitive__line-accent"
        />
        <path
          d={`M${-radius * 0.72} ${radius * 0.72} ${radius * 0.72} ${-radius * 0.72}`}
          className="pm-correction-marker__revision"
        />
        <text x={radius + 10} y="3" className="pm-primitive__state">
          {label}
        </text>
      </g>
    </g>
  )
}
