'use client'

import {
  EvidenceNode,
  FlowArrow,
  IllustrationCanvas,
  MemoryRecord,
  MemoryStack,
  type IllustrationMotion,
} from '..'

export interface CaptureCompositionProps {
  motion?: IllustrationMotion
  className?: string
}

export function CaptureComposition({
  motion = 'none',
  className,
}: CaptureCompositionProps) {
  return (
    <IllustrationCanvas
      viewBox="0 0 320 230"
      title="Raw work captured as structured memory"
      description="Raw notes and source evidence cross a capture boundary and become structured memory. The reviewed stack remains visibly distinct from the unreviewed inputs."
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
        d="M160 24v182"
        className="pm-composition__boundary"
      />
      <text x="18" y="24" className="pm-composition__meta">
        WORK FRAGMENTS
      </text>
      <text x="174" y="24" className="pm-composition__meta">
        CAPTURED MEMORY
      </text>

      <MemoryRecord
        variant="raw"
        label="Work note"
        meta="NOTE-014"
        compact
        x={18}
        y={38}
        revealOrder={0}
      />
      <EvidenceNode
        variant="available"
        label="Run log"
        compact
        x={23}
        y={104}
        revealOrder={1}
      />
      <MemoryRecord
        variant="raw"
        label="Decision"
        meta="CHAT-029"
        compact
        x={18}
        y={148}
        revealOrder={2}
      />

      <FlowArrow
        from={[146, 65]}
        to={[181, 89]}
        variant="transformation"
        revealOrder={3}
      />
      <FlowArrow
        from={[105, 117]}
        to={[181, 112]}
        revealOrder={4}
      />
      <FlowArrow
        from={[146, 174]}
        to={[181, 137]}
        variant="transformation"
        revealOrder={5}
      />

      <MemoryStack
        label="Reviewed memory"
        reviewedCount={3}
        compact
        x={184}
        y={79}
        revealOrder={6}
      />
      <text x="191" y="170" className="pm-composition__note">
        REVIEW REMAINS EXPLICIT
      </text>
    </IllustrationCanvas>
  )
}
