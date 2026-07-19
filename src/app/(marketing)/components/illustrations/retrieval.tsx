'use client'

import type { PrimitiveProps } from './types'
import { primitiveClassName, primitiveStyle } from './types'
import { useIllustrationDefinitions } from './IllustrationCanvas'

export interface RetrievalFocusProps extends PrimitiveProps {
  label?: string
  taskId?: string
}

export function RetrievalFocus({
  label = 'Current task',
  taskId = 'TASK-042',
  x = 0,
  y = 0,
  compact = false,
  revealOrder,
  className,
  opacity,
}: RetrievalFocusProps) {
  const definitions = useIllustrationDefinitions()
  const width = compact ? 118 : 142
  const height = compact ? 48 : 56
  const focusX = width - (compact ? 21 : 24)

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <g
        className={primitiveClassName(
          'retrieval-focus',
          undefined,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        <circle
          cx={focusX}
          cy={height / 2}
          r={compact ? 9 : 11}
          className="pm-retrieval-focus__glow"
          filter={`url(#${definitions.surfaceGlow})`}
        />
        <circle
          cx={focusX}
          cy={height / 2}
          r={compact ? 20 : 24}
          fill={`url(#${definitions.focusGlow})`}
        />
        <rect width={width} height={height} rx="11" className="pm-primitive__surface-raised" />
        <text x="13" y="18" className="pm-primitive__meta">
          {taskId}
        </text>
        <text x="13" y={compact ? 37 : 42} className="pm-primitive__label">
          {label}
        </text>
        <circle
          cx={focusX - 2}
          cy={height / 2 - 2}
          r={compact ? 6 : 7}
          className="pm-primitive__line-accent"
        />
        <path
          d={`M${focusX + 3} ${height / 2 + 3}l6 6`}
          className="pm-primitive__line-accent"
        />
        <path
          d={`M${focusX - 13} ${height / 2 - 13}h6M${focusX - 13} ${height / 2 - 13}v6M${focusX + 9} ${height / 2 + 13}h6M${focusX + 15} ${height / 2 + 7}v6`}
          className="pm-retrieval-focus__brackets"
        />
      </g>
    </g>
  )
}

export interface RelevanceFilterProps extends PrimitiveProps {
  inputCount?: number
  outputCount?: number
  label?: string
}

export function RelevanceFilter({
  inputCount = 6,
  outputCount = 2,
  label = 'RELEVANT',
  x = 0,
  y = 0,
  compact = false,
  revealOrder,
  className,
  opacity,
}: RelevanceFilterProps) {
  const width = compact ? 110 : 132
  const height = compact ? 62 : 72
  const inputDots = Math.min(Math.max(inputCount, 3), 7)
  const outputDots = Math.min(Math.max(outputCount, 1), 3)
  const definitions = useIllustrationDefinitions()

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <g
        className={primitiveClassName(
          'relevance-filter',
          undefined,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        <rect width={width} height={height} rx="11" className="pm-primitive__surface" />
        <rect
          x="7"
          y="7"
          width={width - 14}
          height={height - 14}
          rx="7"
          fill={`url(#${definitions.dotField})`}
          className="pm-relevance-filter__field"
        />
        <path
          d={`M${width * 0.31} 18h${width * 0.38}l-${width * 0.14} 16v12l-${width * 0.1} 7V34Z`}
          className="pm-primitive__line"
        />
        {Array.from({ length: inputDots }, (_, index) => (
          <circle
            key={`input-${index}`}
            cx={13 + index * ((width - 26) / Math.max(inputDots - 1, 1))}
            cy="11"
            r="1.7"
            className="pm-primitive__fill-muted"
          />
        ))}
        {Array.from({ length: outputDots }, (_, index) => (
          <circle
            key={`output-${index}`}
            cx={width / 2 + (index - (outputDots - 1) / 2) * 10}
            cy={height - 11}
            r="2"
            className="pm-primitive__fill-accent"
          />
        ))}
        <text x={width - 9} y={height - 8} textAnchor="end" className="pm-primitive__state">
          {label}
        </text>
      </g>
    </g>
  )
}
