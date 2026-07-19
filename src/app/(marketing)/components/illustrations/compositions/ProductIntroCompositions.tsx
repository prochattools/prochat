'use client'

import {
  EvidenceNode,
  FlowArrow,
  IllustrationCanvas,
  MemoryRecord,
  MemoryStack,
  ProvenanceLink,
  RelevanceFilter,
  RetrievalFocus,
  ReviewCheckpoint,
  type IllustrationMotion,
} from '..'

export interface ProductIntroCompositionProps {
  motion?: IllustrationMotion
  className?: string
}

export function QAMemoryFlowComposition({
  motion = 'none',
  className,
}: ProductIntroCompositionProps) {
  return (
    <IllustrationCanvas
      viewBox="0 0 520 320"
      preserveAspectRatio="xMidYMin meet"
      title="QA evidence becoming reusable reviewed memory"
      description="Failure logs, screenshots, environment notes, selector behavior, and data context connect to a tester-reviewed lesson before becoming reusable QA memory for a future investigation."
      motion={motion}
      className={className}
    >
      <rect
        x="8"
        y="10"
        width="504"
        height="300"
        rx="18"
        className="pm-composition__field"
      />
      <path d="M178 44v230M344 44v230" className="pm-composition__boundary" />

      <text x="25" y="35" className="pm-composition__meta">
        EVIDENCE
      </text>
      <text x="202" y="35" className="pm-composition__meta">
        TESTER REVIEW
      </text>
      <text x="367" y="35" className="pm-composition__meta">
        REUSE
      </text>

      <EvidenceNode
        variant="linked"
        label="Failure log"
        compact
        x={26}
        y={61}
        revealOrder={0}
      />
      <EvidenceNode
        variant="available"
        label="Screenshot"
        compact
        x={26}
        y={112}
        revealOrder={1}
      />
      <EvidenceNode
        variant="uncertain"
        label="Environment"
        compact
        x={26}
        y={163}
        revealOrder={2}
      />
      <EvidenceNode
        variant="linked"
        label="Selector data"
        compact
        x={26}
        y={214}
        revealOrder={3}
      />

      <ProvenanceLink
        variant="direct"
        from={[122, 75]}
        to={[204, 92]}
        label=""
        compact
        revealOrder={4}
      />
      <ProvenanceLink
        variant="inferred"
        from={[122, 126]}
        to={[204, 112]}
        label=""
        compact
        revealOrder={5}
      />
      <ProvenanceLink
        variant="inferred"
        from={[122, 177]}
        to={[204, 132]}
        label=""
        compact
        revealOrder={6}
      />

      <MemoryRecord
        variant="raw"
        label="Failure lesson"
        meta="QA-DRAFT"
        compact
        x={206}
        y={73}
        revealOrder={7}
      />
      <FlowArrow
        from={[269, 126]}
        to={[269, 153]}
        variant="transformation"
        revealOrder={8}
      />
      <ReviewCheckpoint
        state="approved"
        label="Tester review"
        compact
        x={206}
        y={157}
        revealOrder={9}
      />
      <MemoryRecord
        variant="superseded"
        label="Old timing rule"
        meta="HISTORY"
        compact
        x={204}
        y={225}
        revealOrder={10}
      />

      <FlowArrow
        from={[332, 176]}
        to={[374, 177]}
        label="SELECT"
        revealOrder={11}
      />
      <RelevanceFilter
        inputCount={6}
        outputCount={2}
        label="2 MATCH"
        compact
        x={373}
        y={77}
        revealOrder={12}
      />
      <MemoryStack
        label="QA memory"
        reviewedCount={4}
        compact
        x={372}
        y={172}
        revealOrder={13}
      />
      <RetrievalFocus
        label="Next failure"
        taskId="RUN-NOW"
        compact
        x={364}
        y={248}
        revealOrder={14}
      />
    </IllustrationCanvas>
  )
}

export function WorkbenchGuardedFlowComposition({
  motion = 'none',
  className,
}: ProductIntroCompositionProps) {
  return (
    <IllustrationCanvas
      viewBox="0 0 360 320"
      preserveAspectRatio="xMidYMin meet"
      title="Workbench guarded local project flow"
      description="A Workbench run admits exact local context, keeps source reads bounded, requires confirmation for guarded changes, validates the result, and leaves Git actions explicit."
      motion={motion}
      className={className}
    >
      <rect
        x="8"
        y="10"
        width="344"
        height="300"
        rx="18"
        className="pm-composition__field"
      />
      <text x="24" y="35" className="pm-composition__meta">
        LOCAL PROJECT
      </text>
      <text x="244" y="35" className="pm-composition__meta">
        GUARDED
      </text>

      <MemoryRecord
        variant="selected"
        label="Exact context"
        meta="3 FILES"
        compact
        x={30}
        y={61}
        revealOrder={0}
      />
      <EvidenceNode
        variant="linked"
        label="Bounded path"
        compact
        x={36}
        y={137}
        revealOrder={1}
      />
      <EvidenceNode
        variant="excluded"
        label="Outside scope"
        compact
        x={36}
        y={194}
        revealOrder={2}
      />

      <FlowArrow
        from={[160, 88]}
        to={[204, 88]}
        label="SCOPE"
        revealOrder={3}
      />
      <ReviewCheckpoint
        state="pending"
        label="Confirm change"
        compact
        x={198}
        y={65}
        revealOrder={4}
      />
      <FlowArrow
        from={[260, 109]}
        to={[260, 140]}
        variant="transformation"
        revealOrder={5}
      />
      <ReviewCheckpoint
        state="approved"
        label="Validation"
        compact
        x={198}
        y={144}
        revealOrder={6}
      />
      <FlowArrow
        from={[260, 188]}
        to={[260, 220]}
        revealOrder={7}
      />
      <MemoryRecord
        variant="reviewed"
        label="Git boundary"
        meta="EXPLICIT"
        compact
        x={198}
        y={225}
        revealOrder={8}
      />

      <ProvenanceLink
        variant="direct"
        from={[125, 151]}
        to={[198, 84]}
        label=""
        compact
        revealOrder={9}
      />
      <ProvenanceLink
        variant="superseded"
        from={[125, 208]}
        to={[198, 166]}
        label=""
        compact
        revealOrder={10}
      />
    </IllustrationCanvas>
  )
}
