'use client'

import {
  CorrectionMarker,
  EvidenceNode,
  FlowArrow,
  IllustrationCanvas,
  MemoryBranch,
  MemoryRecord,
  MemoryStack,
  ProvenanceLink,
  ReviewCheckpoint,
  type IllustrationMotion,
} from '..'

export interface ReviewStructureCompositionProps {
  motion?: IllustrationMotion
  className?: string
}

export function ReviewStructureComposition({
  motion = 'none',
  className,
}: ReviewStructureCompositionProps) {
  return (
    <IllustrationCanvas
      viewBox="0 0 320 230"
      title="Evidence reviewed before joining structured memory"
      description="Two evidence sources connect to a candidate record. A human review checkpoint approves the record while a corrected branch remains visible beside the structured memory."
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
        EVIDENCE
      </text>
      <text x="118" y="24" className="pm-composition__meta">
        CANDIDATE
      </text>

      <EvidenceNode
        variant="linked"
        label="Run log"
        compact
        x={16}
        y={39}
        revealOrder={0}
      />
      <EvidenceNode
        variant="available"
        label="Review note"
        compact
        x={16}
        y={88}
        revealOrder={1}
      />
      <ProvenanceLink
        variant="direct"
        from={[98, 52]}
        to={[116, 57]}
        label=""
        compact
        revealOrder={2}
      />
      <ProvenanceLink
        variant="inferred"
        from={[98, 101]}
        to={[116, 82]}
        label=""
        compact
        revealOrder={3}
      />
      <MemoryRecord
        variant="raw"
        label="Candidate lesson"
        meta="MEM-DRAFT"
        compact
        x={118}
        y={40}
        revealOrder={4}
      />
      <FlowArrow
        from={[181, 94]}
        to={[181, 112]}
        variant="transformation"
        revealOrder={5}
      />
      <ReviewCheckpoint
        state="approved"
        label="Human review"
        compact
        x={118}
        y={116}
        revealOrder={6}
      />

      <MemoryBranch
        variant="superseded"
        label="HISTORY KEPT"
        compact
        x={18}
        y={161}
        revealOrder={7}
      />
      <CorrectionMarker
        label="CORRECTED"
        compact
        x={87}
        y={207}
        revealOrder={8}
      />
      <FlowArrow
        from={[246, 136]}
        to={[263, 162]}
        revealOrder={9}
      />
      <MemoryStack
        label="Trusted memory"
        reviewedCount={1}
        compact
        x={190}
        y={158}
        revealOrder={10}
      />
    </IllustrationCanvas>
  )
}
