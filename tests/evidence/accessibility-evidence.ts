import type {
  AccessibilityEvidenceBaseline,
  ReviewedAxeException,
} from './accessibility-policy'

const docsSidebarTargets = [
  'docs-sidebar|a|href=/docs',
  'docs-sidebar|a|href=/memory',
  'docs-sidebar|a|href=/memory-qa',
  'docs-sidebar|a|href=/workbench',
  'docs-sidebar|a|item=5',
  'docs-sidebar|a|href=/privacy',
  'docs-sidebar|a|href=/terms',
]

const docsMobileOverlayTargets = [
  'docs-mobile-overlay|a|href=/docs',
  'docs-mobile-overlay|a|href=/memory',
  'docs-mobile-overlay|a|href=/memory-qa',
  'docs-mobile-overlay|a|href=/workbench',
  'docs-mobile-overlay|a|item=5',
  'docs-mobile-overlay|a|href=/privacy',
  'docs-mobile-overlay|a|href=/terms',
]

const listboxTarget = 'docs-listbox|button|aria-haspopup=listbox'
const paginationTarget = 'docs-pagination|a|href=/memory'

export const REVIEWED_AXE_EXCEPTIONS: ReviewedAxeException[] = [
  {
    id: 'docs-desktop-button-name-listbox',
    ruleId: 'button-name',
    impact: 'critical',
    route: '/docs',
    viewport: 'desktop',
    expectedTargets: [listboxTarget],
    expectedNodeCount: 1,
    justification:
      'nextra-theme-docs v4 renders an unnamed HeadlessUI listbox button and exposes no supported application-level label or removal prop.',
    upstreamOwner: 'nextra-theme-docs v4 / HeadlessUI',
    reviewDate: '2026-08-01',
  },
  {
    id: 'docs-mobile-button-name-listbox',
    ruleId: 'button-name',
    impact: 'critical',
    route: '/docs',
    viewport: 'mobile',
    expectedTargets: [listboxTarget],
    expectedNodeCount: 1,
    justification:
      'nextra-theme-docs v4 renders an unnamed HeadlessUI listbox button and exposes no supported application-level label or removal prop.',
    upstreamOwner: 'nextra-theme-docs v4 / HeadlessUI',
    reviewDate: '2026-08-01',
  },
  {
    id: 'docs-desktop-target-size-listbox',
    ruleId: 'target-size',
    impact: 'serious',
    route: '/docs',
    viewport: 'desktop',
    expectedTargets: [listboxTarget],
    expectedNodeCount: 1,
    justification:
      'The same Nextra-owned HeadlessUI listbox button is 12x28px and cannot be resized or removed through the supported layout API.',
    upstreamOwner: 'nextra-theme-docs v4 / HeadlessUI',
    reviewDate: '2026-08-01',
  },
  {
    id: 'docs-mobile-target-size-listbox',
    ruleId: 'target-size',
    impact: 'serious',
    route: '/docs',
    viewport: 'mobile',
    expectedTargets: [listboxTarget],
    expectedNodeCount: 1,
    justification:
      'The same Nextra-owned HeadlessUI listbox button is 12x28px and cannot be resized or removed through the supported layout API.',
    upstreamOwner: 'nextra-theme-docs v4 / HeadlessUI',
    reviewDate: '2026-08-01',
  },
  {
    id: 'docs-desktop-link-name-navigation',
    ruleId: 'link-name',
    impact: 'serious',
    route: '/docs',
    viewport: 'desktop',
    expectedTargets: [...docsSidebarTargets, ...docsMobileOverlayTargets, paginationTarget],
    expectedNodeCount: 15,
    justification:
      'Nextra v4 sidebar, mobile-overlay, and pagination links render without an Axe-resolvable accessible name; supported Layout props do not expose labels for these generated anchors.',
    upstreamOwner: 'nextra-theme-docs v4',
    reviewDate: '2026-08-01',
  },
  {
    id: 'docs-mobile-link-name-navigation',
    ruleId: 'link-name',
    impact: 'serious',
    route: '/docs',
    viewport: 'mobile',
    expectedTargets: [...docsSidebarTargets, paginationTarget],
    expectedNodeCount: 8,
    justification:
      'Nextra v4 sidebar and pagination links render without an Axe-resolvable accessible name; supported Layout props do not expose labels for these generated anchors.',
    upstreamOwner: 'nextra-theme-docs v4',
    reviewDate: '2026-08-01',
  },
]

function incomplete(ruleId: string, nodeCount: number, impact = 'serious') {
  return { kind: 'incomplete' as const, impact, ruleId, nodeCount }
}

// color-contrast is excluded from all baselines — see ENVIRONMENT_SENSITIVE_INCOMPLETE_RULES
// in accessibility-policy.ts. Its incomplete count varies significantly between
// macOS and headless Linux Chromium due to font rendering differences.
export const ACCESSIBILITY_EVIDENCE_BASELINES: AccessibilityEvidenceBaseline[] = [
  { route: '/', viewport: 'desktop', entries: [incomplete('aria-prohibited-attr', 9)] },
  { route: '/', viewport: 'mobile', entries: [incomplete('aria-prohibited-attr', 9)] },
  { route: '/memory', viewport: 'desktop', entries: [] },
  { route: '/memory', viewport: 'mobile', entries: [] },
  { route: '/memory-qa', viewport: 'desktop', entries: [] },
  { route: '/memory-qa', viewport: 'mobile', entries: [] },
  { route: '/workbench', viewport: 'desktop', entries: [] },
  { route: '/workbench', viewport: 'mobile', entries: [] },
  {
    route: '/docs',
    viewport: 'desktop',
    entries: [
      incomplete('aria-prohibited-attr', 1),
    ],
  },
  {
    route: '/docs',
    viewport: 'mobile',
    entries: [
      incomplete('aria-prohibited-attr', 1),
    ],
  },
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
