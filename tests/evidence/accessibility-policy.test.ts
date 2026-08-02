import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  compareEvidenceBaseline,
  evaluateBlockingViolations,
  type AxeNodeLike,
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
