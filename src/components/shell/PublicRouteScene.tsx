import type { PublicVisualVariant } from '@/helpers/public-route-design'

function OrbitMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--orbit">
      <span className="pc-route-orbit pc-route-orbit--a" />
      <span className="pc-route-orbit pc-route-orbit--b" />
      <span className="pc-route-orbit pc-route-orbit--c" />
      <i className="pc-route-node pc-route-node--a" />
      <i className="pc-route-node pc-route-node--b" />
      <i className="pc-route-node pc-route-node--c" />
    </div>
  )
}

function ReviewMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--review">
      <span className="pc-route-gate pc-route-gate--a" />
      <span className="pc-route-gate pc-route-gate--b" />
      <span className="pc-route-review-path" />
      <i className="pc-route-review-packet" />
    </div>
  )
}

function PipelineMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--pipeline">
      {[0, 1, 2, 3].map(index => <span key={index} />)}
      <i />
    </div>
  )
}

function DocsMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--docs">
      <span className="pc-route-sheet pc-route-sheet--back" />
      <span className="pc-route-sheet pc-route-sheet--mid" />
      <span className="pc-route-sheet pc-route-sheet--front">
        <i /><i /><i /><i />
      </span>
    </div>
  )
}

function RadarMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--radar">
      <span /><span /><span />
      <i className="pc-route-radar-sweep" />
      <b className="pc-route-radar-dot pc-route-radar-dot--a" />
      <b className="pc-route-radar-dot pc-route-radar-dot--b" />
    </div>
  )
}

function LedgerMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--ledger">
      {[0, 1, 2, 3, 4].map(index => <span key={index} />)}
      <i className="pc-route-ledger-cursor" />
    </div>
  )
}

function ModulesMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--modules">
      {[0, 1, 2, 3, 4, 5].map(index => <span key={index} />)}
    </div>
  )
}

function CanvasMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--canvas">
      <span className="pc-route-canvas-frame" />
      <i className="pc-route-canvas-playhead" />
      <b className="pc-route-canvas-point pc-route-canvas-point--a" />
      <b className="pc-route-canvas-point pc-route-canvas-point--b" />
    </div>
  )
}

function TimelineMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--timeline">
      <span />
      {[0, 1, 2, 3].map(index => <i key={index} />)}
    </div>
  )
}

function PromptMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--prompts">
      {[0, 1, 2, 3].map(index => <span key={index}><i /></span>)}
    </div>
  )
}

function LearnMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--learn">
      <span className="pc-route-learn-line" />
      {[0, 1, 2, 3].map(index => <i key={index} />)}
    </div>
  )
}

function QueueMotif() {
  return (
    <div className="pc-route-motif pc-route-motif--queue">
      {[0, 1, 2, 3, 4, 5, 6].map(index => <span key={index} />)}
    </div>
  )
}

function renderMotif(variant: PublicVisualVariant) {
  switch (variant) {
    case 'home':
    case 'memory':
      return <OrbitMotif />
    case 'review':
      return <ReviewMotif />
    case 'workbench':
    case 'os':
    case 'workflow':
      return <PipelineMotif />
    case 'docs':
      return <DocsMotif />
    case 'contact':
      return <RadarMotif />
    case 'legal':
      return <LedgerMotif />
    case 'studio':
      return <CanvasMotif />
    case 'kits':
      return <ModulesMotif />
    case 'proof':
      return <TimelineMotif />
    case 'prompts':
      return <PromptMotif />
    case 'learn':
      return <LearnMotif />
    case 'waitlist':
      return <QueueMotif />
  }
}

export function PublicRouteScene({ variant }: { variant: PublicVisualVariant }) {
  return (
    <div className={`pc-route-scene pc-route-scene--${variant}`} aria-hidden="true">
      <div className="pc-route-scene__grid" />
      <div className="pc-route-scene__dots" />
      <div className="pc-route-scene__rail pc-route-scene__rail--a" />
      <div className="pc-route-scene__rail pc-route-scene__rail--b" />
      <svg className="pc-route-scene__paths" viewBox="0 0 1400 900" preserveAspectRatio="none">
        <path d="M70 260 C280 180 430 300 625 210" />
        <path d="M775 210 C970 310 1115 195 1330 280" />
        <path d="M120 700 C360 610 520 760 705 650 C900 535 1080 710 1280 620" />
      </svg>
      {renderMotif(variant)}
    </div>
  )
}
