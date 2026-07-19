'use client'

import {
  EvidenceNode,
  FlowArrow,
  IllustrationCanvas,
  MemoryRecord,
  ProvenanceLink,
  RelevanceFilter,
  RetrievalFocus,
  type IllustrationMotion,
} from '..'

export interface RetrievalCompositionProps {
  motion?: IllustrationMotion
  className?: string
}

export function RetrievalComposition({
  motion = 'none',
  className,
}: RetrievalCompositionProps) {
  return (
    <IllustrationCanvas
      viewBox="0 0 320 230"
      title="Relevant memory selected for the current task"
      description="A wider memory field contains current, historical, and excluded records. A relevance filter selects a small trusted set and sends only that context to the current task."
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
      <path
        d="M150 22v186"
        className="pm-composition__boundary"
      />
      <text x="18" y="24" className="pm-composition__meta">
        MEMORY FIELD
      </text>
      <text x="164" y="24" className="pm-composition__meta">
        CURRENT CONTEXT
      </text>

      <MemoryRecord
        variant="selected"
        label="Trusted lesson"
        meta="REVIEWED"
        compact
        x={16}
        y={39}
        revealOrder={0}
      />
      <MemoryRecord
        variant="historical"
        label="Prior pattern"
        meta="HIST-018"
        compact
        x={16}
        y={103}
        revealOrder={1}
      />
      <EvidenceNode
        variant="excluded"
        label="Unrelated"
        compact
        x={23}
        y={174}
        revealOrder={2}
      />

      <ProvenanceLink
        variant="direct"
        from={[143, 65]}
        to={[166, 78]}
        label=""
        compact
        revealOrder={3}
      />
      <ProvenanceLink
        variant="historical"
        from={[143, 129]}
        to={[166, 105]}
        label=""
        compact
        revealOrder={4}
      />
      <RelevanceFilter
        inputCount={6}
        outputCount={2}
        label="2 SELECTED"
        compact
        x={171}
        y={58}
        revealOrder={5}
      />
      <FlowArrow
        from={[226, 121]}
        to={[226, 149]}
        label="CONTEXT"
        revealOrder={6}
      />
      <RetrievalFocus
        label="Current task"
        taskId="TASK-042"
        compact
        x={167}
        y={155}
        revealOrder={7}
      />
    </IllustrationCanvas>
  )
}
