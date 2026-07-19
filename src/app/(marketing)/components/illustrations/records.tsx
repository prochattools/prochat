'use client'

import type { MemoryRecordVariant, PrimitiveProps } from './types'
import { primitiveClassName, primitiveStyle } from './types'

export interface MemoryRecordProps extends PrimitiveProps {
  variant: MemoryRecordVariant
  label?: string
  meta?: string
}

const recordStateLabels: Record<MemoryRecordVariant, string> = {
  raw: 'RAW',
  reviewed: 'REVIEWED',
  historical: 'HISTORY',
  superseded: 'SUPERSEDED',
  selected: 'SELECTED',
}

function RecordStateIcon({
  variant,
  x,
  y,
}: {
  variant: MemoryRecordVariant
  x: number
  y: number
}) {
  if (variant === 'reviewed') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r="6.5" className="pm-primitive__line-accent" />
        <path d="m-3 0 2 2 4-4" className="pm-primitive__line-accent" />
      </g>
    )
  }

  if (variant === 'historical') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r="6.5" className="pm-primitive__line-muted" />
        <path d="M0-3v3l2.5 1.5" className="pm-primitive__line-muted" />
      </g>
    )
  }

  if (variant === 'superseded') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <path d="M-5 5 5-5M-5-5l10 10" className="pm-primitive__line-muted" />
      </g>
    )
  }

  if (variant === 'selected') {
    return (
      <g transform={`translate(${x} ${y})`}>
        <circle r="6.5" className="pm-primitive__line-accent" />
        <circle r="2" className="pm-primitive__fill-accent" />
      </g>
    )
  }

  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-5-6h7l4 4v8H-5Z" className="pm-primitive__line-muted" />
      <path d="M2-6v4h4" className="pm-primitive__line-muted" />
    </g>
  )
}

export function MemoryRecord({
  variant,
  label = 'Memory record',
  meta = 'MEM-001',
  x = 0,
  y = 0,
  compact = false,
  revealOrder,
  className,
  opacity,
}: MemoryRecordProps) {
  const width = compact ? 126 : 142
  const height = compact ? 52 : 62
  const iconX = width - 17

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <g
        className={primitiveClassName(
          'memory-record',
          variant,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        {variant === 'selected' ? (
          <rect
            x="-3"
            y="-3"
            width={width + 6}
            height={height + 6}
            rx="11"
            className="pm-memory-record__selection"
          />
        ) : null}
        <rect
          width={width}
          height={height}
          rx={compact ? 8 : 10}
          className="pm-primitive__surface"
        />
        <path d={`M12 18h${compact ? 33 : 42}`} className="pm-memory-record__rule" />
        <path d={`M12 25h${compact ? 70 : 84}`} className="pm-memory-record__rule" />
        {!compact ? (
          <path d={`M12 32h${variant === 'raw' ? 46 : 62}`} className="pm-memory-record__rule" />
        ) : null}
        <text x="12" y={compact ? 40 : 49} className="pm-primitive__label">
          {label}
        </text>
        <text x="12" y="11.5" className="pm-primitive__meta">
          {meta}
        </text>
        <text
          x={width - 13}
          y={height - 7}
          textAnchor="end"
          className="pm-primitive__state"
        >
          {recordStateLabels[variant]}
        </text>
        <RecordStateIcon variant={variant} x={iconX} y={17} />
        {variant === 'superseded' ? (
          <path
            d={`M9 ${height - 14}h${width - 18}`}
            className="pm-memory-record__strike"
          />
        ) : null}
      </g>
    </g>
  )
}

export interface MemoryStackProps extends PrimitiveProps {
  label?: string
  reviewedCount?: number
}

export function MemoryStack({
  label = 'Reviewed memory',
  reviewedCount = 3,
  x = 0,
  y = 0,
  compact = false,
  revealOrder,
  className,
  opacity,
}: MemoryStackProps) {
  const width = compact ? 112 : 136
  const height = compact ? 54 : 66
  const layerOffset = compact ? 5 : 7

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <g
        className={primitiveClassName(
          'memory-stack',
          undefined,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        <rect
          x={layerOffset * 2}
          y="0"
          width={width}
          height={height}
          rx="9"
          className="pm-memory-stack__back"
        />
        <rect
          x={layerOffset}
          y={layerOffset}
          width={width}
          height={height}
          rx="9"
          className="pm-memory-stack__middle"
        />
        <rect
          y={layerOffset * 2}
          width={width}
          height={height}
          rx="9"
          className="pm-primitive__surface-raised"
        />
        <path d="M13 28h45M13 35h76M13 42h58" className="pm-memory-record__rule" />
        {!compact ? (
          <text
            x="13"
            y={layerOffset * 2 + 10}
            className="pm-primitive__meta"
          >
            {reviewedCount} RECORDS
          </text>
        ) : null}
        <circle
          cx={width - 17}
          cy={layerOffset * 2 + 17}
          r="7"
          className="pm-primitive__line-accent"
        />
        <path
          d={`M${width - 21} ${layerOffset * 2 + 17}l3 3 5-6`}
          className="pm-primitive__line-accent"
        />
        <text x="13" y={height + layerOffset + 1} className="pm-primitive__label">
          {label}
        </text>
      </g>
    </g>
  )
}
