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
  RelevanceFilter,
  RetrievalFocus,
  ReviewCheckpoint,
  type IllustrationMotion,
} from '..'

export interface MemorySystemCompositionProps {
  motion?: IllustrationMotion
  className?: string
}

const title = 'The complete ProChat Memory lifecycle'
const description =
  'Raw work becomes candidate records, evidence and human review produce structured memory, and relevance filtering supplies a small context set to a current task. A visible human decision boundary comes before resulting work can return as a new candidate record.'

function DesktopMemorySystem({ motion }: { motion: IllustrationMotion }) {
  return (
    <IllustrationCanvas
      viewBox="0 0 1200 500"
      title={title}
      description={description}
      motion={motion}
      className="pm-memory-system-composition__desktop"
    >
      <g aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="1198"
          height="498"
          rx="18"
          className="pm-composition__field"
        />
        <path d="M400 62v386M800 62v386" className="pm-composition__boundary" />

        <text x="28" y="31" className="pm-system-composition__phase-index">
          01
        </text>
        <text x="61" y="31" className="pm-system-composition__phase">
          CAPTURE &amp; DETECT
        </text>
        <text x="426" y="31" className="pm-system-composition__phase-index">
          02
        </text>
        <text x="459" y="31" className="pm-system-composition__phase">
          REVIEW &amp; STRUCTURE
        </text>
        <text x="826" y="31" className="pm-system-composition__phase-index">
          03
        </text>
        <text x="859" y="31" className="pm-system-composition__phase">
          RETRIEVE &amp; APPLY
        </text>

        <text x="28" y="55" className="pm-system-composition__question">
          WHAT USEFUL INFORMATION EXISTS?
        </text>
        <text x="426" y="55" className="pm-system-composition__question">
          WHAT DESERVES TO LAST?
        </text>
        <text x="826" y="55" className="pm-system-composition__question">
          WHAT MATTERS FOR THIS TASK?
        </text>

        <MemoryRecord
          variant="raw"
          label="Conversation"
          meta="RAW-CHAT"
          compact
          x={28}
          y={94}
          revealOrder={0}
        />
        <MemoryRecord
          variant="raw"
          label="Decision note"
          meta="RAW-NOTE"
          compact
          x={28}
          y={165}
          revealOrder={1}
        />
        <EvidenceNode
          variant="available"
          label="Source evidence"
          compact
          x={35}
          y={246}
          revealOrder={2}
        />
        <EvidenceNode
          variant="uncertain"
          label="Observed pattern"
          compact
          x={35}
          y={304}
          revealOrder={3}
        />
        <text x="28" y="371" className="pm-composition__note">
          INPUT REMAINS RAW
        </text>

        <FlowArrow
          from={[159, 120]}
          to={[211, 178]}
          variant="transformation"
          revealOrder={4}
        />
        <FlowArrow
          from={[159, 191]}
          to={[211, 205]}
          variant="transformation"
          revealOrder={5}
        />
        <FlowArrow from={[135, 259]} to={[211, 230]} revealOrder={6} />
        <MemoryRecord
          variant="raw"
          label="Candidate record"
          meta="CANDIDATE"
          x={216}
          y={172}
          revealOrder={7}
        />
        <MemoryBranch
          variant="unresolved"
          label="PATTERN IS CANDIDATE"
          compact
          x={225}
          y={285}
          revealOrder={8}
        />
        <FlowArrow
          from={[358, 204]}
          to={[429, 204]}
          label="INSPECT"
          revealOrder={9}
        />

        <EvidenceNode
          variant="linked"
          label="Source A"
          compact
          x={426}
          y={104}
          revealOrder={10}
        />
        <EvidenceNode
          variant="available"
          label="Source B"
          compact
          x={426}
          y={169}
          revealOrder={11}
        />
        <ProvenanceLink
          variant="direct"
          from={[516, 117]}
          to={[548, 142]}
          label=""
          compact
          revealOrder={12}
        />
        <ProvenanceLink
          variant="inferred"
          from={[516, 182]}
          to={[548, 167]}
          label=""
          compact
          revealOrder={13}
        />
        <MemoryRecord
          variant="raw"
          label="Candidate memory"
          meta="MEM-DRAFT"
          compact
          x={552}
          y={126}
          revealOrder={14}
        />
        <FlowArrow
          from={[615, 180]}
          to={[615, 218]}
          variant="transformation"
          revealOrder={15}
        />
        <ReviewCheckpoint
          state="approved"
          label="Human review"
          x={543}
          y={225}
          revealOrder={16}
        />
        <ReviewCheckpoint
          state="rejected"
          label="Reject"
          compact
          x={425}
          y={306}
          revealOrder={17}
        />
        <MemoryRecord
          variant="superseded"
          label="Prior wording"
          meta="HISTORY"
          compact
          x={425}
          y={367}
          revealOrder={18}
        />
        <CorrectionMarker
          label="CORRECTED"
          compact
          x={574}
          y={397}
          revealOrder={19}
        />
        <FlowArrow from={[687, 247]} to={[713, 296]} revealOrder={20} />
        <MemoryStack
          label="Reviewed memory"
          reviewedCount={3}
          compact
          x={661}
          y={302}
          revealOrder={21}
        />
        <text x="662" y="402" className="pm-composition__note">
          HISTORY STAYS VISIBLE
        </text>
        <FlowArrow
          from={[780, 337]}
          to={[831, 337]}
          label="RETRIEVE"
          revealOrder={22}
        />

        <RetrievalFocus
          label="Current task"
          taskId="TASK-NOW"
          x={1024}
          y={91}
          revealOrder={23}
        />
        <MemoryRecord
          variant="selected"
          label="Current evidence"
          meta="REVIEWED"
          compact
          x={824}
          y={119}
          revealOrder={24}
        />
        <MemoryRecord
          variant="historical"
          label="Older pattern"
          meta="HISTORICAL"
          compact
          x={824}
          y={185}
          revealOrder={25}
        />
        <EvidenceNode
          variant="excluded"
          label="Outside scope"
          compact
          x={831}
          y={256}
          revealOrder={26}
        />
        <ProvenanceLink
          variant="direct"
          from={[951, 145]}
          to={[983, 196]}
          label=""
          compact
          revealOrder={27}
        />
        <ProvenanceLink
          variant="historical"
          from={[951, 211]}
          to={[983, 221]}
          label=""
          compact
          revealOrder={28}
        />
        <RelevanceFilter
          inputCount={6}
          outputCount={2}
          label="2 SELECTED"
          x={988}
          y={180}
          revealOrder={29}
        />
        <FlowArrow
          from={[1054, 180]}
          to={[1088, 151]}
          label="CONTEXT"
          revealOrder={30}
        />
        <ReviewCheckpoint
          state="pending"
          label="Human decides"
          x={1002}
          y={302}
          revealOrder={31}
          className="pm-system-composition__human-boundary"
        />
        <FlowArrow
          from={[1074, 348]}
          to={[1074, 381]}
          label="WORK"
          revealOrder={32}
        />
        <MemoryRecord
          variant="raw"
          label="New candidate"
          meta="NOT YET TRUSTED"
          compact
          x={1011}
          y={389}
          revealOrder={33}
        />
        <FlowArrow
          from={[1007, 445]}
          to={[793, 445]}
          label="NEXT REVIEW"
          variant="transformation"
          revealOrder={34}
          className="pm-system-composition__return"
        />
        <text x="824" y="476" className="pm-composition__note">
          CONTEXT SUPPORTS THE TASK · THE PERSON MAKES THE DECISION
        </text>
      </g>
    </IllustrationCanvas>
  )
}

function MobileMemorySystem({ motion }: { motion: IllustrationMotion }) {
  return (
    <IllustrationCanvas
      viewBox="0 0 340 1180"
      title={title}
      description={description}
      motion={motion}
      className="pm-memory-system-composition__mobile"
    >
      <g aria-hidden="true">
        <rect
          x="1"
          y="1"
          width="338"
          height="1178"
          rx="16"
          className="pm-composition__field"
        />

        <text x="18" y="29" className="pm-system-composition__phase-index">
          01
        </text>
        <text x="50" y="29" className="pm-system-composition__phase">
          CAPTURE &amp; DETECT
        </text>
        <text x="18" y="52" className="pm-system-composition__question">
          WHAT USEFUL INFORMATION EXISTS?
        </text>
        <MemoryRecord
          variant="raw"
          label="Conversation"
          meta="RAW WORK"
          compact
          x={18}
          y={78}
          revealOrder={0}
        />
        <EvidenceNode
          variant="available"
          label="Source evidence"
          compact
          x={25}
          y={153}
          revealOrder={1}
        />
        <EvidenceNode
          variant="uncertain"
          label="Candidate pattern"
          compact
          x={25}
          y={211}
          revealOrder={2}
        />
        <FlowArrow
          from={[145, 105]}
          to={[190, 139]}
          variant="transformation"
          revealOrder={3}
        />
        <MemoryRecord
          variant="raw"
          label="Candidate record"
          meta="UNREVIEWED"
          compact
          x={194}
          y={116}
          revealOrder={4}
        />
        <MemoryBranch
          variant="unresolved"
          label="CANDIDATE ONLY"
          compact
          x={196}
          y={202}
          revealOrder={5}
        />
        <text x="18" y="291" className="pm-composition__note">
          CAPTURE DOES NOT IMPLY TRUST
        </text>
        <FlowArrow
          from={[170, 305]}
          to={[170, 345]}
          label="INSPECT"
          revealOrder={6}
        />

        <path d="M18 330h304" className="pm-composition__boundary" />
        <text x="18" y="377" className="pm-system-composition__phase-index">
          02
        </text>
        <text x="50" y="377" className="pm-system-composition__phase">
          REVIEW &amp; STRUCTURE
        </text>
        <text x="18" y="400" className="pm-system-composition__question">
          WHAT DESERVES TO LAST?
        </text>
        <EvidenceNode
          variant="linked"
          label="Source A"
          compact
          x={20}
          y={432}
          revealOrder={7}
        />
        <EvidenceNode
          variant="available"
          label="Source B"
          compact
          x={20}
          y={490}
          revealOrder={8}
        />
        <ProvenanceLink
          variant="direct"
          from={[106, 445]}
          to={[139, 469]}
          label=""
          compact
          revealOrder={9}
        />
        <ProvenanceLink
          variant="inferred"
          from={[106, 503]}
          to={[139, 493]}
          label=""
          compact
          revealOrder={10}
        />
        <MemoryRecord
          variant="raw"
          label="Candidate memory"
          meta="MEM-DRAFT"
          compact
          x={143}
          y={454}
          revealOrder={11}
        />
        <FlowArrow
          from={[206, 507]}
          to={[206, 543]}
          variant="transformation"
          revealOrder={12}
        />
        <ReviewCheckpoint
          state="approved"
          label="Human review"
          compact
          x={143}
          y={551}
          revealOrder={13}
        />
        <ReviewCheckpoint
          state="rejected"
          label="Reject"
          compact
          x={18}
          y={624}
          revealOrder={14}
        />
        <MemoryRecord
          variant="superseded"
          label="Prior wording"
          meta="HISTORY"
          compact
          x={18}
          y={678}
          revealOrder={15}
        />
        <CorrectionMarker
          label="CORRECTED"
          compact
          x={160}
          y={711}
          revealOrder={16}
        />
        <MemoryStack
          label="Reviewed memory"
          reviewedCount={2}
          compact
          x={200}
          y={654}
          revealOrder={17}
        />
        <text x="18" y="764" className="pm-composition__note">
          CORRECTION HISTORY REMAINS VISIBLE
        </text>
        <FlowArrow
          from={[170, 778]}
          to={[170, 818]}
          label="RETRIEVE"
          revealOrder={18}
        />

        <path d="M18 804h304" className="pm-composition__boundary" />
        <text x="18" y="851" className="pm-system-composition__phase-index">
          03
        </text>
        <text x="50" y="851" className="pm-system-composition__phase">
          RETRIEVE &amp; APPLY
        </text>
        <text x="18" y="874" className="pm-system-composition__question">
          WHAT MATTERS FOR THIS TASK?
        </text>
        <MemoryRecord
          variant="selected"
          label="Current evidence"
          meta="REVIEWED"
          compact
          x={18}
          y={902}
          revealOrder={19}
        />
        <MemoryRecord
          variant="historical"
          label="Older pattern"
          meta="OUTSIDE SET"
          compact
          x={18}
          y={966}
          revealOrder={20}
        />
        <RelevanceFilter
          inputCount={5}
          outputCount={2}
          label="2 SELECTED"
          compact
          x={189}
          y={918}
          revealOrder={21}
        />
        <FlowArrow
          from={[244, 980]}
          to={[244, 1017]}
          label="CONTEXT"
          revealOrder={22}
        />
        <RetrievalFocus
          label="Current task"
          taskId="TASK-NOW"
          compact
          x={181}
          y={1024}
          revealOrder={23}
        />
        <ReviewCheckpoint
          state="pending"
          label="Human decides"
          compact
          x={18}
          y={1030}
          revealOrder={24}
          className="pm-system-composition__human-boundary"
        />
        <FlowArrow
          from={[82, 1070]}
          to={[82, 1100]}
          label="WORK"
          revealOrder={25}
        />
        <MemoryRecord
          variant="raw"
          label="New candidate"
          meta="NEXT REVIEW"
          compact
          x={18}
          y={1108}
          revealOrder={26}
        />
        <FlowArrow
          from={[148, 1134]}
          to={[332, 1134]}
          variant="transformation"
          revealOrder={27}
        />
        <FlowArrow
          from={[332, 1134]}
          to={[332, 812]}
          revealOrder={28}
          className="pm-system-composition__return"
        />
      </g>
    </IllustrationCanvas>
  )
}

export function MemorySystemComposition({
  motion = 'none',
  className,
}: MemorySystemCompositionProps) {
  return (
    <div
      className={['pm-memory-system-composition', className ?? '']
        .filter(Boolean)
        .join(' ')}
    >
      <DesktopMemorySystem motion={motion} />
      <MobileMemorySystem motion={motion} />
    </div>
  )
}
