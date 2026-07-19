'use client'

import {
  EvidenceNode,
  FlowArrow,
  IllustrationCanvas,
  MemoryRecord,
  ProvenanceLink,
  ReviewCheckpoint,
  type IllustrationMotion,
} from '..'

export interface AdoptionCompositionProps {
  motion?: IllustrationMotion
  className?: string
}

export function QABetaAdoptionComposition({
  motion = 'none',
  className,
}: AdoptionCompositionProps) {
  return (
    <IllustrationCanvas
      viewBox="0 0 620 310"
      preserveAspectRatio="xMidYMin meet"
      title="Memory for QA selected beta participation path"
      description="A public source-available repository can be inspected and starred, then a selected beta application is reviewed before approved testers evaluate locally and return sanitized feedback."
      motion={motion}
      className={className}
    >
      <rect
        x="8"
        y="10"
        width="604"
        height="290"
        rx="18"
        className="pm-composition__field"
      />
      <path d="M166 45v218M330 45v218M486 45v218" className="pm-composition__boundary" />

      <text x="28" y="35" className="pm-composition__meta">
        INSPECT
      </text>
      <text x="195" y="35" className="pm-composition__meta">
        APPLY
      </text>
      <text x="358" y="35" className="pm-composition__meta">
        EVALUATE
      </text>
      <text x="512" y="35" className="pm-composition__meta">
        FEEDBACK
      </text>

      <MemoryRecord
        variant="reviewed"
        label="QA repository"
        meta="PUBLIC VIEW"
        compact
        x={28}
        y={66}
        revealOrder={0}
      />
      <EvidenceNode
        variant="linked"
        label="Star"
        compact
        x={35}
        y={148}
        revealOrder={1}
      />
      <EvidenceNode
        variant="available"
        label="Read license"
        compact
        x={35}
        y={205}
        revealOrder={2}
      />

      <FlowArrow
        from={[154, 94]}
        to={[205, 94]}
        label="SELECTED"
        revealOrder={3}
      />
      <ReviewCheckpoint
        state="pending"
        label="Beta application"
        compact
        x={204}
        y={72}
        revealOrder={4}
      />
      <FlowArrow
        from={[267, 116]}
        to={[267, 148]}
        variant="transformation"
        revealOrder={5}
      />
      <ReviewCheckpoint
        state="approved"
        label="Approved tester"
        compact
        x={204}
        y={153}
        revealOrder={6}
      />

      <FlowArrow from={[330, 175]} to={[370, 175]} revealOrder={7} />
      <MemoryRecord
        variant="selected"
        label="Local evaluation"
        meta="BETA LICENSE"
        compact
        x={370}
        y={103}
        revealOrder={8}
      />
      <EvidenceNode
        variant="linked"
        label="Sanitized issue"
        compact
        x={520}
        y={85}
        revealOrder={9}
      />
      <EvidenceNode
        variant="linked"
        label="ProChat discussion"
        compact
        x={520}
        y={165}
        revealOrder={10}
      />
      <ProvenanceLink
        variant="direct"
        from={[496, 130]}
        to={[520, 99]}
        label="REPORT"
        compact
        revealOrder={11}
      />
      <ProvenanceLink
        variant="inferred"
        from={[496, 150]}
        to={[520, 179]}
        label="DISCUSS"
        compact
        revealOrder={12}
      />

      <text x="28" y="279" className="pm-composition__note">
        SOURCE-AVAILABLE SELECTED BETA · NO CODE CONTRIBUTION PATH IN THIS BETA
      </text>
    </IllustrationCanvas>
  )
}

export function WorkbenchAdoptionComposition({
  motion = 'none',
  className,
}: AdoptionCompositionProps) {
  return (
    <IllustrationCanvas
      viewBox="0 0 420 310"
      preserveAspectRatio="xMidYMin meet"
      title="Workbench open-source prerelease participation path"
      description="The Workbench repository can be viewed, starred, forked, cloned, self-hosted, discussed, and used for contribution proposals under the contributor-rights boundary."
      motion={motion}
      className={className}
    >
      <rect
        x="8"
        y="10"
        width="404"
        height="290"
        rx="18"
        className="pm-composition__field"
      />
      <text x="26" y="35" className="pm-composition__meta">
        REPOSITORY
      </text>
      <text x="254" y="35" className="pm-composition__meta">
        COMMUNITY
      </text>

      <MemoryRecord
        variant="reviewed"
        label="Workbench repo"
        meta="AGPL-3.0"
        compact
        x={28}
        y={66}
        revealOrder={0}
      />
      <EvidenceNode
        variant="linked"
        label="Fork or clone"
        compact
        x={35}
        y={148}
        revealOrder={1}
      />
      <ReviewCheckpoint
        state="approved"
        label="Self-host"
        compact
        x={38}
        y={214}
        revealOrder={2}
      />

      <FlowArrow
        from={[155, 92]}
        to={[230, 92]}
        label="USE"
        revealOrder={3}
      />
      <EvidenceNode
        variant="linked"
        label="Issue"
        compact
        x={238}
        y={75}
        revealOrder={4}
      />
      <EvidenceNode
        variant="linked"
        label="Discussion"
        compact
        x={238}
        y={139}
        revealOrder={5}
      />
      <FlowArrow
        from={[150, 232]}
        to={[238, 220]}
        label="PROPOSE"
        variant="transformation"
        revealOrder={6}
      />
      <ReviewCheckpoint
        state="pending"
        label="Rights process"
        compact
        x={238}
        y={201}
        revealOrder={7}
      />

      <text x="26" y="279" className="pm-composition__note">
        CONTRIBUTION PROPOSALS ARE WELCOME · MERGE REQUIRES CONTRIBUTOR RIGHTS
      </text>
    </IllustrationCanvas>
  )
}
