export type AccessibilityViewport = 'desktop' | 'mobile'
export type BlockingImpact = 'critical' | 'serious'
export type EvidenceImpact = 'moderate' | 'minor' | 'unknown'

export interface AxeNodeLike {
  target: Array<string | string[]>
  html?: string
}

export interface AxeResultLike {
  id: string
  impact?: string | null
  nodes: AxeNodeLike[]
}

export interface ReviewedAxeException {
  id: string
  ruleId: string
  impact: BlockingImpact
  route: '/docs'
  viewport: AccessibilityViewport
  expectedTargets: string[]
  expectedNodeCount: number
  justification: string
  upstreamOwner: string
  reviewDate: string
}

export interface AccessibilityEvidenceEntry {
  kind: 'violation' | 'incomplete'
  impact: string
  ruleId: string
  nodeCount: number
}

export interface AccessibilityEvidenceBaseline {
  route: string
  viewport: AccessibilityViewport
  entries: AccessibilityEvidenceEntry[]
}

export interface ExceptionEvaluation {
  appliedExceptionIds: string[]
  unreviewed: Array<{ ruleId: string; impact: string; target: string }>
  staleExceptionIds: string[]
  cardinalityErrors: string[]
  duplicateMatches: string[]
}

export interface EvidenceComparison {
  regressions: string[]
  decreases: string[]
}

const GENERATED_HEADLESSUI_ID = /#headlessui-listbox-button-\\?:R[^\s>]+\\?:/g

function extractHref(html = ''): string | null {
  const match = html.match(/\shref="([^"]+)"/)
  return match?.[1] ?? null
}

function normalizeGeneratedSelector(selector: string): string {
  return selector.replace(GENERATED_HEADLESSUI_ID, '#headlessui-listbox-button-<generated>')
}

export function normalizeAxeTarget(node: AxeNodeLike): string {
  const selector = normalizeGeneratedSelector(node.target.flat(Infinity).join(' >>> '))
  const href = extractHref(node.html)

  if (selector.includes('headlessui-listbox-button')) {
    return 'docs-listbox|button|aria-haspopup=listbox'
  }

  if (selector.includes('nextra-scrollbar')) {
    const item = selector.match(/li:nth-child\((\d+)\)/)?.[1]
    const stableHref = href && !href.includes('...') ? href : null
    return `docs-sidebar|a|${stableHref ? `href=${stableHref}` : `item=${item ?? 'unknown'}`}`
  }

  if (selector.includes('transform-gpu')) {
    const item = selector.match(/li:nth-child\((\d+)\)/)?.[1]
    const stableHref = href && !href.includes('...') ? href : null
    return `docs-mobile-overlay|a|${stableHref ? `href=${stableHref}` : `item=${item ?? 'unknown'}`}`
  }

  if (selector.includes('max-w-')) {
    return `docs-pagination|a|${href ? `href=${href}` : 'href=unknown'}`
  }

  return selector
}

function relevantExceptions(
  exceptions: ReviewedAxeException[],
  route: string,
  viewport: AccessibilityViewport,
): ReviewedAxeException[] {
  return exceptions.filter((entry) => entry.route === route && entry.viewport === viewport)
}

export function evaluateBlockingViolations(
  violations: AxeResultLike[],
  route: string,
  viewport: AccessibilityViewport,
  exceptions: ReviewedAxeException[],
): ExceptionEvaluation {
  const relevant = relevantExceptions(exceptions, route, viewport)
  const matchedTargets = new Map<string, Map<string, number>>()
  const applied = new Set<string>()
  const unreviewed: ExceptionEvaluation['unreviewed'] = []
  const duplicateMatches: string[] = []
  const cardinalityErrors: string[] = []

  for (const entry of relevant) {
    if (entry.expectedTargets.length !== entry.expectedNodeCount) {
      cardinalityErrors.push(
        `${entry.id}: expectedNodeCount=${entry.expectedNodeCount} but expectedTargets=${entry.expectedTargets.length}`,
      )
    }
    if (new Set(entry.expectedTargets).size !== entry.expectedTargets.length) {
      cardinalityErrors.push(`${entry.id}: expectedTargets contains duplicates`)
    }
    matchedTargets.set(entry.id, new Map())
  }

  for (const violation of violations) {
    const impact = violation.impact ?? 'unknown'
    if (impact !== 'critical' && impact !== 'serious') continue

    for (const node of violation.nodes) {
      const target = normalizeAxeTarget(node)
      const matches = relevant.filter(
        (entry) =>
          entry.ruleId === violation.id &&
          entry.impact === impact &&
          entry.expectedTargets.includes(target),
      )

      if (matches.length === 0) {
        unreviewed.push({ ruleId: violation.id, impact, target })
        continue
      }

      if (matches.length > 1) {
        duplicateMatches.push(
          `${violation.id}:${impact}:${target} matched ${matches.map((entry) => entry.id).join(', ')}`,
        )
        continue
      }

      const match = matches[0]
      const observedTargets = matchedTargets.get(match.id)
      if (observedTargets) {
        observedTargets.set(target, (observedTargets.get(target) ?? 0) + 1)
      }
      applied.add(match.id)
    }
  }

  const staleExceptionIds: string[] = []
  for (const entry of relevant) {
    const observed = matchedTargets.get(entry.id) ?? new Map<string, number>()
    const missing = entry.expectedTargets.filter((target) => !observed.has(target))
    if (missing.length > 0) {
      staleExceptionIds.push(`${entry.id}: missing ${missing.join(', ')}`)
    }

    for (const target of entry.expectedTargets) {
      const observedCount = observed.get(target) ?? 0
      if (observedCount > 1) {
        cardinalityErrors.push(
          `${entry.id}: target ${target} observed ${observedCount} node(s), expected 1`,
        )
      }
    }

    const observedNodeCount = [...observed.values()].reduce((sum, count) => sum + count, 0)
    if (observedNodeCount !== entry.expectedNodeCount) {
      cardinalityErrors.push(
        `${entry.id}: observed ${observedNodeCount} node(s), expected ${entry.expectedNodeCount}`,
      )
    }
  }

  return {
    appliedExceptionIds: [...applied].sort(),
    unreviewed,
    staleExceptionIds,
    cardinalityErrors,
    duplicateMatches,
  }
}

export function summarizeNonBlockingEvidence(
  violations: AxeResultLike[],
  incomplete: AxeResultLike[],
): AccessibilityEvidenceEntry[] {
  const entries: AccessibilityEvidenceEntry[] = []

  for (const violation of violations) {
    const impact = violation.impact ?? 'unknown'
    if (impact === 'critical' || impact === 'serious') continue
    entries.push({
      kind: 'violation',
      impact,
      ruleId: violation.id,
      nodeCount: violation.nodes.length,
    })
  }

  for (const result of incomplete) {
    entries.push({
      kind: 'incomplete',
      impact: result.impact ?? 'unknown',
      ruleId: result.id,
      nodeCount: result.nodes.length,
    })
  }

  return entries.sort((a, b) =>
    `${a.kind}:${a.impact}:${a.ruleId}`.localeCompare(`${b.kind}:${b.impact}:${b.ruleId}`),
  )
}

function evidenceKey(entry: AccessibilityEvidenceEntry): string {
  return `${entry.kind}:${entry.impact}:${entry.ruleId}`
}

export function compareEvidenceBaseline(
  actual: AccessibilityEvidenceEntry[],
  baseline: AccessibilityEvidenceEntry[],
): EvidenceComparison {
  const actualMap = new Map(actual.map((entry) => [evidenceKey(entry), entry]))
  const baselineMap = new Map(baseline.map((entry) => [evidenceKey(entry), entry]))
  const regressions: string[] = []
  const decreases: string[] = []

  for (const [key, entry] of actualMap) {
    const reviewed = baselineMap.get(key)
    if (!reviewed) {
      regressions.push(`unreviewed finding ${key} with ${entry.nodeCount} node(s)`)
      continue
    }
    if (entry.nodeCount > reviewed.nodeCount) {
      regressions.push(
        `${key} increased from ${reviewed.nodeCount} to ${entry.nodeCount} node(s)`,
      )
    } else if (entry.nodeCount < reviewed.nodeCount) {
      decreases.push(
        `${key} decreased from ${reviewed.nodeCount} to ${entry.nodeCount} node(s)`,
      )
    }
  }

  for (const [key, entry] of baselineMap) {
    if (!actualMap.has(key)) {
      decreases.push(`${key} decreased from ${entry.nodeCount} to 0 node(s)`)
    }
  }

  return { regressions, decreases }
}
