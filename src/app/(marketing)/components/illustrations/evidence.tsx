'use client'

import type {
  EvidenceNodeVariant,
  IllustrationPoint,
  MemoryBranchVariant,
  PrimitiveProps,
  ProvenanceLinkVariant,
} from './types'
import {
  primitiveClassName,
  primitiveStyle,
} from './types'
import { useIllustrationDefinitions } from './IllustrationCanvas'

export interface EvidenceNodeProps extends PrimitiveProps {
  variant: EvidenceNodeVariant
  label?: string
}

const evidenceLabels: Record<EvidenceNodeVariant, string> = {
  available: 'AVAILABLE',
  linked: 'LINKED',
  uncertain: 'UNCERTAIN',
  excluded: 'EXCLUDED',
}

export function EvidenceNode({
  variant,
  label = 'Evidence',
  x = 0,
  y = 0,
  compact = false,
  revealOrder,
  className,
  opacity,
}: EvidenceNodeProps) {
  const nodeSize = compact ? 25 : 29
  const center = nodeSize / 2

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <g
        className={primitiveClassName(
          'evidence-node',
          variant,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        {variant === 'uncertain' ? (
          <rect
            x="2"
            y="2"
            width={nodeSize - 4}
            height={nodeSize - 4}
            rx="3"
            transform={`rotate(45 ${center} ${center})`}
            className="pm-primitive__surface"
          />
        ) : (
          <rect
            width={nodeSize}
            height={nodeSize}
            rx={variant === 'available' ? nodeSize / 2 : 7}
            className="pm-primitive__surface"
          />
        )}
        {variant === 'available' ? (
          <>
            <circle cx={center} cy={center} r="3" className="pm-primitive__fill-secondary" />
            <circle cx={center} cy={center} r="7" className="pm-evidence-node__halo" />
          </>
        ) : null}
        {variant === 'linked' ? (
          <path
            d={`M${center - 6} ${center + 2}a4 4 0 0 1 0-6l2-2a4 4 0 0 1 6 0M${center + 6} ${center - 2}a4 4 0 0 1 0 6l-2 2a4 4 0 0 1-6 0M${center - 3} ${center + 3}l6-6`}
            className="pm-primitive__line-accent"
          />
        ) : null}
        {variant === 'uncertain' ? (
          <text
            x={center}
            y={center + 4}
            textAnchor="middle"
            className="pm-evidence-node__symbol"
          >
            ?
          </text>
        ) : null}
        {variant === 'excluded' ? (
          <path
            d={`M${center - 5} ${center - 5}l10 10M${center + 5} ${center - 5}l-10 10`}
            className="pm-primitive__line-muted"
          />
        ) : null}
        <text x={nodeSize + 8} y="11" className="pm-primitive__label">
          {label}
        </text>
        <text x={nodeSize + 8} y="22" className="pm-primitive__state">
          {evidenceLabels[variant]}
        </text>
      </g>
    </g>
  )
}

export interface ProvenanceLinkProps extends PrimitiveProps {
  variant: ProvenanceLinkVariant
  from: IllustrationPoint
  to: IllustrationPoint
  label?: string
}

const provenanceLabels: Record<ProvenanceLinkVariant, string> = {
  direct: 'DIRECT',
  inferred: 'INFERRED',
  historical: 'HISTORICAL',
  superseded: 'SUPERSEDED',
}

export function ProvenanceLink({
  variant,
  from,
  to,
  label,
  compact = false,
  revealOrder,
  className,
  opacity,
}: ProvenanceLinkProps) {
  const definitions = useIllustrationDefinitions()
  const [fromX, fromY] = from
  const [toX, toY] = to
  const bend = Math.max(14, Math.abs(toX - fromX) * 0.28)
  const path = `M${fromX} ${fromY} C${fromX + bend} ${fromY} ${toX - bend} ${toY} ${toX} ${toY}`
  const midpointX = (fromX + toX) / 2
  const midpointY = (fromY + toY) / 2

  return (
    <g opacity={opacity}>
      <g
        className={primitiveClassName(
          'provenance-link',
          variant,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        <path
          d={path}
          className="pm-provenance-link__path"
          markerEnd={`url(#${variant === 'direct' ? definitions.arrow : definitions.arrowMuted})`}
        />
        {variant === 'direct' ? (
          <circle cx={midpointX} cy={midpointY} r="2.25" className="pm-primitive__fill-accent" />
        ) : null}
        {variant === 'inferred' ? (
          <path
            d={`M${midpointX - 3} ${midpointY}h6`}
            className="pm-primitive__line-muted"
          />
        ) : null}
        {variant === 'historical' ? (
          <circle
            cx={midpointX}
            cy={midpointY}
            r="4"
            className="pm-provenance-link__history"
          />
        ) : null}
        {variant === 'superseded' ? (
          <path
            d={`M${midpointX - 4} ${midpointY - 4}l8 8M${midpointX + 4} ${midpointY - 4}l-8 8`}
            className="pm-primitive__line-muted"
          />
        ) : null}
        <text
          x={midpointX}
          y={midpointY - 9}
          textAnchor="middle"
          className="pm-primitive__state"
        >
          {label ?? provenanceLabels[variant]}
        </text>
      </g>
    </g>
  )
}

export interface MemoryBranchProps extends PrimitiveProps {
  variant: MemoryBranchVariant
  label?: string
}

const branchLabels: Record<MemoryBranchVariant, string> = {
  active: 'ACTIVE',
  secondary: 'SECONDARY',
  superseded: 'SUPERSEDED',
  unresolved: 'UNRESOLVED',
}

export function MemoryBranch({
  variant,
  label,
  x = 0,
  y = 0,
  compact = false,
  revealOrder,
  className,
  opacity,
}: MemoryBranchProps) {
  const width = compact ? 82 : 102
  const height = compact ? 42 : 50
  const splitX = compact ? 32 : 39

  return (
    <g transform={`translate(${x} ${y})`} opacity={opacity}>
      <g
        className={primitiveClassName(
          'memory-branch',
          variant,
          compact,
          className,
        )}
        style={primitiveStyle(revealOrder)}
      >
        <path
          d={`M0 ${height / 2}h${splitX}c13 0 12-${height / 2 - 6} 25-${height / 2 - 6}h${width - splitX - 25}`}
          className="pm-memory-branch__path pm-memory-branch__path--primary"
        />
        <path
          d={`M${splitX} ${height / 2}c13 0 12 ${height / 2 - 6} 25 ${height / 2 - 6}h${width - splitX - 25}`}
          className="pm-memory-branch__path pm-memory-branch__path--secondary"
        />
        <circle cx="0" cy={height / 2} r="3" className="pm-memory-branch__node" />
        <circle
          cx={width}
          cy="6"
          r="3"
          className="pm-memory-branch__node pm-memory-branch__node--top"
        />
        <circle
          cx={width}
          cy={height - 6}
          r="3"
          className="pm-memory-branch__node pm-memory-branch__node--bottom"
        />
        {variant === 'superseded' ? (
          <path
            d={`M${width - 9} ${height - 12}l10 10`}
            className="pm-primitive__line-muted"
          />
        ) : null}
        {variant === 'unresolved' ? (
          <text
            x={width - 8}
            y={height - 14}
            textAnchor="middle"
            className="pm-memory-branch__question"
          >
            ?
          </text>
        ) : null}
        <text x="0" y={height + 12} className="pm-primitive__state">
          {label ?? branchLabels[variant]}
        </text>
      </g>
    </g>
  )
}
