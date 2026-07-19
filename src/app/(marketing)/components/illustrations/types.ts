import type { CSSProperties, SVGProps } from 'react'

export type IllustrationMotion = 'none' | 'reveal'
export type IllustrationPoint = readonly [x: number, y: number]

export type MemoryRecordVariant =
  | 'raw'
  | 'reviewed'
  | 'historical'
  | 'superseded'
  | 'selected'

export type EvidenceNodeVariant =
  | 'available'
  | 'linked'
  | 'uncertain'
  | 'excluded'

export type ProvenanceLinkVariant =
  | 'direct'
  | 'inferred'
  | 'historical'
  | 'superseded'

export type ReviewCheckpointState =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'revision-required'

export type MemoryBranchVariant =
  | 'active'
  | 'secondary'
  | 'superseded'
  | 'unresolved'

export type FlowArrowVariant = 'progression' | 'transformation'

export interface PrimitiveProps
  extends Pick<SVGProps<SVGGElement>, 'className' | 'opacity'> {
  x?: number
  y?: number
  compact?: boolean
  revealOrder?: number
}

export function primitiveClassName(
  name: string,
  variant: string | undefined,
  compact: boolean | undefined,
  className: string | undefined,
) {
  return [
    'pm-primitive',
    `pm-${name}`,
    variant ? `pm-${name}--${variant}` : '',
    compact ? 'pm-primitive--compact' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}

export function primitiveStyle(revealOrder: number | undefined) {
  return {
    '--pm-reveal-order': revealOrder ?? 0,
  } as CSSProperties
}
