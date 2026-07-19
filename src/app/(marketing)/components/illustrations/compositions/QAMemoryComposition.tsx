'use client'

import {
  CorrectionMarker,
  EvidenceNode,
  FlowArrow,
  IllustrationCanvas,
  MemoryRecord,
  MemoryStack,
  ProvenanceLink,
  ReviewCheckpoint,
  type IllustrationMotion,
} from '..'

export interface QAMemoryCompositionProps {
  motion?: IllustrationMotion
  className?: string
}

export function QAMemoryComposition({
  motion = 'none',
  className,
}: QAMemoryCompositionProps) {
  return (
    <IllustrationCanvas
      viewBox="0 0 320 230"
      title="QA evidence becoming a reviewed lesson"
      description="A failed test and its evidence connect to a candidate selector lesson. A tester reviews it before it joins structured QA memory, while a stale assumption remains visibly corrected."
      motion={motion}
      className={className}
    >
      <rect
        x="6"
        y="8"
        width="308"
        height="214"
        rx="14"
        className="pm-composition__field"
      />
      <text x="18" y="24" className="pm-composition__meta">
        CURRENT FAILURE
      </text>
      <text x="180" y="24" className="pm-composition__meta">
        REVIEWED QA MEMORY
      </text>

      <EvidenceNode
        variant="linked"
        label="Failure log"
        compact
        x={18}
        y={43}
        revealOrder={0}
      />
      <EvidenceNode
        variant="available"
        label="Screenshot"
        compact
        x={18}
        y={91}
        revealOrder={1}
      />
      <ProvenanceLink
        variant="direct"
        from={[103, 57]}
        to={[119, 68]}
        label=""
        compact
        revealOrder={2}
      />
      <ProvenanceLink
        variant="inferred"
        from={[103, 104]}
        to={[119, 88]}
        label=""
        compact
        revealOrder={3}
      />
      <MemoryRecord
        variant="raw"
        label="Selector lesson"
        meta="QA-DRAFT"
        compact
        x={121}
        y={49}
        revealOrder={4}
      />
      <FlowArrow
        from={[184, 101]}
        to={[184, 118]}
        variant="transformation"
        revealOrder={5}
      />
      <ReviewCheckpoint
        state="approved"
        label="Tester review"
        compact
        x={121}
        y={122}
        revealOrder={6}
      />
      <CorrectionMarker
        label="STALE RETIRED"
        compact
        x={49}
        y={190}
        revealOrder={7}
      />
      <FlowArrow
        from={[249, 142]}
        to={[270, 166]}
        revealOrder={8}
      />
      <MemoryStack
        label="QA lessons"
        reviewedCount={1}
        compact
        x={190}
        y={162}
        revealOrder={9}
      />
    </IllustrationCanvas>
  )
}
