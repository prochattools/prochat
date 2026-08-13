import type {
  AccessibilityEvidenceBaseline,
  ReviewedAxeException,
} from './accessibility-policy'

export const REVIEWED_AXE_EXCEPTIONS: ReviewedAxeException[] = []

export const ACCESSIBILITY_EVIDENCE_BASELINES: AccessibilityEvidenceBaseline[] = [
  { route: '/', viewport: 'desktop', entries: [] },
  { route: '/', viewport: 'mobile', entries: [] },
  { route: '/memory', viewport: 'desktop', entries: [] },
  { route: '/memory', viewport: 'mobile', entries: [] },
  { route: '/memory-qa', viewport: 'desktop', entries: [] },
  { route: '/memory-qa', viewport: 'mobile', entries: [] },
  { route: '/workbench', viewport: 'desktop', entries: [] },
  { route: '/workbench', viewport: 'mobile', entries: [] },
  { route: '/docs', viewport: 'desktop', entries: [] },
  { route: '/docs', viewport: 'mobile', entries: [] },
  { route: '/contact', viewport: 'desktop', entries: [] },
  { route: '/contact', viewport: 'mobile', entries: [] },
  { route: '/privacy', viewport: 'desktop', entries: [] },
  { route: '/privacy', viewport: 'mobile', entries: [] },
  { route: '/terms', viewport: 'desktop', entries: [] },
  { route: '/terms', viewport: 'mobile', entries: [] },
]

export function getAccessibilityBaseline(route: string, viewport: 'desktop' | 'mobile') {
  const baseline = ACCESSIBILITY_EVIDENCE_BASELINES.find(
    (entry) => entry.route === route && entry.viewport === viewport,
  )
  if (!baseline) {
    throw new Error(`Missing accessibility evidence baseline for ${route} at ${viewport}`)
  }
  return baseline.entries
}
