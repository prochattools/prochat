import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  compareEvidenceBaseline,
  evaluateBlockingViolations,
  summarizeNonBlockingEvidence,
  type AxeNodeLike,
  type AxeResultLike,
  type ReviewedAxeException,
} from './accessibility-policy'

function node(target: string): AxeNodeLike {
  return { target: [target], html: '<a href="/memory">Memory</a>' }
}

function exception(overrides: Partial<ReviewedAxeException> = {}): ReviewedAxeException {
  return {
    id: 'docs-link-desktop',
    ruleId: 'link-name',
    impact: 'serious',
    route: '/docs',
    viewport: 'desktop',
    expectedTargets: ['#exact-target'],
    expectedNodeCount: 1,
    justification: 'Reviewed fixture exception.',
    upstreamOwner: 'fixture',
    reviewDate: '2026-08-01',
    ...overrides,
  }
}

function violation(target = '#exact-target', impact = 'serious') {
  return [{ id: 'link-name', impact, nodes: [node(target)] }]
}

describe('evaluateBlockingViolations', () => {
  it('accepts an exact target match', () => {
    const result = evaluateBlockingViolations(violation(), '/docs', 'desktop', [exception()])
    assert.deepEqual(result.unreviewed, [])
    assert.deepEqual(result.staleExceptionIds, [])
    assert.deepEqual(result.cardinalityErrors, [])
    assert.deepEqual(result.appliedExceptionIds, ['docs-link-desktop'])
  })

  it('rejects a substring-only match', () => {
    const result = evaluateBlockingViolations(
      violation('#exact-target-suffix'),
      '/docs',
      'desktop',
      [exception()],
    )
    assert.equal(result.unreviewed.length, 1)
    assert.equal(result.staleExceptionIds.length, 1)
  })

  it('rejects the wrong route', () => {
    const result = evaluateBlockingViolations(violation(), '/memory', 'desktop', [exception()])
    assert.equal(result.unreviewed.length, 1)
  })

  it('rejects the wrong viewport', () => {
    const result = evaluateBlockingViolations(violation(), '/docs', 'mobile', [exception()])
    assert.equal(result.unreviewed.length, 1)
  })

  it('rejects the wrong impact', () => {
    const result = evaluateBlockingViolations(violation('#exact-target', 'critical'), '/docs', 'desktop', [exception()])
    assert.equal(result.unreviewed.length, 1)
    assert.equal(result.staleExceptionIds.length, 1)
  })

  it('fails when an additional node appears', () => {
    const result = evaluateBlockingViolations(
      [{ id: 'link-name', impact: 'serious', nodes: [node('#exact-target'), node('#new-target')] }],
      '/docs',
      'desktop',
      [exception()],
    )
    assert.equal(result.unreviewed.length, 1)
  })

  it('fails when duplicate nodes share one normalized target', () => {
    const result = evaluateBlockingViolations(
      [{ id: 'link-name', impact: 'serious', nodes: [node('#exact-target'), node('#exact-target')] }],
      '/docs',
      'desktop',
      [exception()],
    )
    assert.ok(result.cardinalityErrors.some((error) => error.includes('observed 2 node(s)')))
  })

  it('reports a missing expected node as stale', () => {
    const result = evaluateBlockingViolations([], '/docs', 'desktop', [exception()])
    assert.equal(result.staleExceptionIds.length, 1)
    assert.equal(result.cardinalityErrors.length, 1)
  })

  it('rejects duplicate exception matches', () => {
    const result = evaluateBlockingViolations(violation(), '/docs', 'desktop', [
      exception(),
      exception({ id: 'duplicate' }),
    ])
    assert.equal(result.duplicateMatches.length, 1)
  })

  it('rejects a configured node-count mismatch', () => {
    const result = evaluateBlockingViolations(violation(), '/docs', 'desktop', [
      exception({ expectedNodeCount: 2 }),
    ])
    assert.ok(result.cardinalityErrors.length >= 1)
  })
})

describe('compareEvidenceBaseline', () => {
  const baseline = [
    { kind: 'violation' as const, impact: 'moderate', ruleId: 'example-rule', nodeCount: 1 },
    { kind: 'incomplete' as const, impact: 'serious', ruleId: 'color-contrast', nodeCount: 3 },
  ]

  it('rejects a new moderate finding', () => {
    const result = compareEvidenceBaseline(
      [...baseline, { kind: 'violation', impact: 'moderate', ruleId: 'new-rule', nodeCount: 1 }],
      baseline,
    )
    assert.equal(result.regressions.length, 1)
  })

  it('rejects an increased incomplete node count', () => {
    const result = compareEvidenceBaseline(
      [baseline[0], { ...baseline[1], nodeCount: 4 }],
      baseline,
    )
    assert.equal(result.regressions.length, 1)
  })

  it('reports a reduced baseline count for cleanup', () => {
    const result = compareEvidenceBaseline(
      [baseline[0], { ...baseline[1], nodeCount: 2 }],
      baseline,
    )
    assert.equal(result.regressions.length, 0)
    assert.equal(result.decreases.length, 1)
  })
})

describe('summarizeNonBlockingEvidence — environment-sensitive rule exclusion', () => {
  function incompleteResult(id: string, nodes: AxeNodeLike[]): AxeResultLike {
    return { id, impact: 'serious', nodes }
  }

  function violationResult(id: string, impact: string, nodes: AxeNodeLike[]): AxeResultLike {
    return { id, impact, nodes }
  }

  it('omits a color-contrast incomplete result from non-blocking baseline evidence', () => {
    const result = summarizeNonBlockingEvidence(
      [],
      [incompleteResult('color-contrast', [node('#el1'), node('#el2')])],
    )
    assert.equal(result.length, 0, 'color-contrast incomplete should be omitted entirely')
  })

  it('does not omit a color-contrast serious violation', () => {
    const result = summarizeNonBlockingEvidence(
      [violationResult('color-contrast', 'serious', [node('#el1')])],
      [],
    )
    assert.equal(result.length, 0, 'serious violation is blocking scope, not non-blocking evidence')
  })

  it('a serious color-contrast violation is unreviewed and blocking unless an exact exception exists', () => {
    const result = evaluateBlockingViolations(
      [{ id: 'color-contrast', impact: 'serious', nodes: [node('#any-element')] }],
      '/memory',
      'desktop',
      [],
    )
    assert.equal(result.unreviewed.length, 1)
    assert.equal(result.unreviewed[0].ruleId, 'color-contrast')
    assert.equal(result.unreviewed[0].impact, 'serious')
  })

  it('a serious color-contrast violation passes only when an exact reviewed exception matches', () => {
    const contrastException: ReviewedAxeException = exception({
      id: 'contrast-exception-1',
      ruleId: 'color-contrast',
      impact: 'serious',
      route: '/docs',
      viewport: 'desktop',
      expectedTargets: ['#any-element'],
      expectedNodeCount: 1,
    })
    const result = evaluateBlockingViolations(
      [{ id: 'color-contrast', impact: 'serious', nodes: [node('#any-element')] }],
      '/docs',
      'desktop',
      [contrastException],
    )
    assert.equal(result.unreviewed.length, 0)
    assert.deepEqual(result.appliedExceptionIds, ['contrast-exception-1'])
  })

  it('other incomplete rules are recorded in non-blocking evidence', () => {
    const result = summarizeNonBlockingEvidence(
      [],
      [
        incompleteResult('aria-prohibited-attr', [node('#el1'), node('#el2')]),
        incompleteResult('color-contrast', [node('#el3')]),
        incompleteResult('link-in-text-block', [node('#el4')]),
      ],
    )
    assert.equal(result.length, 2)
    const ruleIds = result.map((entry) => entry.ruleId)
    assert.ok(ruleIds.includes('aria-prohibited-attr'))
    assert.ok(ruleIds.includes('link-in-text-block'))
    assert.ok(!ruleIds.includes('color-contrast'), 'color-contrast must remain excluded')
  })

  it('only the color-contrast rule is excluded from incomplete baselines', () => {
    const otherRules = ['aria-prohibited-attr', 'link-in-text-block', 'scrollable-region-focusable']
    for (const ruleId of otherRules) {
      const result = summarizeNonBlockingEvidence(
        [],
        [incompleteResult(ruleId, [node('#el1')])],
      )
      assert.equal(result.length, 1, `${ruleId} should be recorded, not excluded`)
      assert.equal(result[0].ruleId, ruleId)
    }
  })
})
