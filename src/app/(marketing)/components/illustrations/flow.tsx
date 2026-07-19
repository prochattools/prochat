'use client'

import type {
  FlowArrowVariant,
  IllustrationPoint,
  PrimitiveProps,
} from './types'
import { primitiveClassName, primitiveStyle } from './types'
import { useIllustrationDefinitions } from './IllustrationCanvas'

export interface FlowArrowProps extends PrimitiveProps {
  from: IllustrationPoint
  to: IllustrationPoint
  variant?: FlowArrowVariant
  label?: string
}

export function FlowArrow({
  from,
  to,
  variant = 'progression',
  label,
  compact = false,
  revealOrder,
  className,
  opacity,
}: FlowArrowProps) {
  const definitions = useIllustrationDefinitions()
  const [fromX, fromY] = from
  const [toX, toY] = to
  const midpointX = (fromX + toX) / 2
  const midpointY = (fromY + toY) / 2

  return (
    <g opacity={opacity}>
      <g
        className={primitiveClassName(
          'flow-arrow',
          variant,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        <path
          d={`M${fromX} ${fromY}L${toX} ${toY}`}
          className="pm-flow-arrow__path"
          markerEnd={`url(#${definitions.arrow})`}
        />
        {variant === 'transformation' ? (
          <rect
            x={midpointX - 4}
            y={midpointY - 4}
            width="8"
            height="8"
            rx="2"
            transform={`rotate(45 ${midpointX} ${midpointY})`}
            className="pm-flow-arrow__transform"
          />
        ) : (
          <circle
            cx={midpointX}
            cy={midpointY}
            r="1.8"
            className="pm-primitive__fill-secondary"
          />
        )}
        {label ? (
          <text
            x={midpointX}
            y={midpointY - 8}
            textAnchor="middle"
            className="pm-primitive__state"
          >
            {label}
          </text>
        ) : null}
      </g>
    </g>
  )
}
