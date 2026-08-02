import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { CANONICAL_ROUTES, REGRESSION_TOLERANCE, THRESHOLDS } from './canonical-performance.config'
import {
  checkRegressionAgainstBaseline,
  checkThresholds,
  computeMedians,
  median,
  tbtIsLabMetricNotINP,
  validateAllCanonicalRoutesPresent,
  type RawMetricSet,
  type RouteMedians,
} from './canonical-performance-policy'

function rawRun(overrides: Partial<RawMetricSet> = {}): RawMetricSet {
  return {
    FCP_seconds: 1.0,
    LCP_seconds: 2.0,
    CLS: 0.05,
    TBT_ms: 100,
    SI_seconds: 2.5,
    performance_score: 80,
    total_bytes: 500_000,
    js_bytes: 200_000,
    request_count: 20,
    ...overrides,
  }
}

function medians(overrides: Partial<RouteMedians> = {}): RouteMedians {
  return {
    FCP_seconds: 1.0,
    LCP_seconds: 2.0,
    CLS: 0.05,
    TBT_ms: 100,
    SI_seconds: 2.5,
    performance_score: 80,
    total_bytes: 500_000,
    js_bytes: 200_000,
    request_count: 20,
    ...overrides,
  }
}

describe('median()', () => {
  it('calculates the median for three sorted values', () => {
    assert.equal(median([1, 2, 3]), 2)
  })

  it('calculates the median for unsorted input', () => {
    assert.equal(median([3, 1, 2]), 2)
  })

  it('calculates the median when all values are equal', () => {
    assert.equal(median([5, 5, 5]), 5)
  })

  it('returns the middle value for odd-count inputs', () => {
    assert.equal(median([10, 20, 30]), 20)
  })

  it('returns the average of the two middle values for even-count inputs', () => {
    assert.equal(median([10, 20, 30, 40]), 25)
  })

  it('returns null for a missing metric (empty array)', () => {
    assert.equal(median([]), null)
  })

  it('returns null when fewer than three valid runs are present', () => {
    assert.equal(median([1, 2]), null)
  })

  it('returns null for NaN values', () => {
    assert.equal(median([1, NaN, 3]), null)
  })

  it('returns null for negative values', () => {
    assert.equal(median([-1, 2, 3]), null)
  })

  it('returns null when all inputs are non-finite', () => {
    assert.equal(median([Infinity, -Infinity, NaN]), null)
  })
})

describe('computeMedians()', () => {
  it('computes medians for three valid runs', () => {
    const runs = [rawRun({ LCP_seconds: 1.8 }), rawRun({ LCP_seconds: 2.0 }), rawRun({ LCP_seconds: 2.2 })]
    const result = computeMedians(runs)
    assert.ok(result !== null)
    assert.equal(result.LCP_seconds, 2.0)
  })

  it('returns null when a metric has fewer than three valid values', () => {
    const runs = [
      rawRun({ LCP_seconds: NaN }),
      rawRun({ LCP_seconds: 2.0 }),
      rawRun({ LCP_seconds: 2.2 }),
    ]
    assert.equal(computeMedians(runs), null)
  })
})

describe('checkThresholds()', () => {
  it('passes when LCP is exactly at the threshold', () => {
    const result = checkThresholds(medians({ LCP_seconds: THRESHOLDS.LCP_seconds }))
    const lcp = result.find((r) => r.metric === 'LCP_seconds')
    assert.ok(lcp?.passes)
  })

  it('fails when LCP exceeds the threshold', () => {
    const result = checkThresholds(medians({ LCP_seconds: THRESHOLDS.LCP_seconds + 0.001 }))
    const lcp = result.find((r) => r.metric === 'LCP_seconds')
    assert.ok(!lcp?.passes)
  })

  it('passes when CLS is exactly at the threshold', () => {
    const result = checkThresholds(medians({ CLS: THRESHOLDS.CLS }))
    const cls = result.find((r) => r.metric === 'CLS')
    assert.ok(cls?.passes)
  })

  it('fails when CLS exceeds the threshold', () => {
    const result = checkThresholds(medians({ CLS: THRESHOLDS.CLS + 0.001 }))
    const cls = result.find((r) => r.metric === 'CLS')
    assert.ok(!cls?.passes)
  })

  it('passes when FCP is exactly at the provisional threshold', () => {
    const result = checkThresholds(medians({ FCP_seconds: THRESHOLDS.FCP_seconds }))
    const fcp = result.find((r) => r.metric === 'FCP_seconds')
    assert.ok(fcp?.passes)
  })

  it('fails when FCP exceeds the provisional threshold', () => {
    const result = checkThresholds(medians({ FCP_seconds: THRESHOLDS.FCP_seconds + 0.001 }))
    const fcp = result.find((r) => r.metric === 'FCP_seconds')
    assert.ok(!fcp?.passes)
  })

  it('passes when TBT is exactly at the threshold', () => {
    const result = checkThresholds(medians({ TBT_ms: THRESHOLDS.TBT_ms }))
    const tbt = result.find((r) => r.metric === 'TBT_ms')
    assert.ok(tbt?.passes)
  })

  it('fails when TBT exceeds the threshold', () => {
    const result = checkThresholds(medians({ TBT_ms: THRESHOLDS.TBT_ms + 1 }))
    const tbt = result.find((r) => r.metric === 'TBT_ms')
    assert.ok(!tbt?.passes)
  })
})

describe('checkRegressionAgainstBaseline()', () => {
  it('fails when LCP increases beyond tolerance', () => {
    const baseline = medians({ LCP_seconds: 2.0 })
    const current = medians({ LCP_seconds: 2.0 + REGRESSION_TOLERANCE.LCP_seconds + 0.001 })
    const results = checkRegressionAgainstBaseline(current, baseline)
    const lcp = results.find((r) => r.metric === 'LCP_seconds')
    assert.ok(lcp?.regresses)
  })

  it('passes when LCP decrease from baseline', () => {
    const baseline = medians({ LCP_seconds: 2.0 })
    const current = medians({ LCP_seconds: 1.5 })
    const results = checkRegressionAgainstBaseline(current, baseline)
    const lcp = results.find((r) => r.metric === 'LCP_seconds')
    assert.ok(!lcp?.regresses)
  })

  it('passes when LCP is within configured noise tolerance', () => {
    const baseline = medians({ LCP_seconds: 2.0 })
    const current = medians({ LCP_seconds: 2.0 + REGRESSION_TOLERANCE.LCP_seconds })
    const results = checkRegressionAgainstBaseline(current, baseline)
    const lcp = results.find((r) => r.metric === 'LCP_seconds')
    assert.ok(!lcp?.regresses)
  })

  it('records tolerance value in the result', () => {
    const baseline = medians()
    const current = medians()
    const results = checkRegressionAgainstBaseline(current, baseline)
    const lcp = results.find((r) => r.metric === 'LCP_seconds')
    assert.equal(lcp?.tolerance, REGRESSION_TOLERANCE.LCP_seconds)
  })
})

describe('validateAllCanonicalRoutesPresent()', () => {
  it('returns no errors when all eight canonical routes are present', () => {
    const errors = validateAllCanonicalRoutesPresent([...CANONICAL_ROUTES])
    assert.equal(errors.length, 0)
  })

  it('returns an error for each missing canonical route', () => {
    const errors = validateAllCanonicalRoutesPresent(['/'])
    assert.equal(errors.length, CANONICAL_ROUTES.length - 1)
  })

  it('fails when all routes are absent', () => {
    const errors = validateAllCanonicalRoutesPresent([])
    assert.equal(errors.length, CANONICAL_ROUTES.length)
  })

  it('fails when a non-canonical route is passed in place of a canonical one', () => {
    const routes = [...CANONICAL_ROUTES].map((r) => r + '/extra')
    const errors = validateAllCanonicalRoutesPresent(routes)
    assert.equal(errors.length, CANONICAL_ROUTES.length)
  })
})

describe('tbtIsLabMetricNotINP()', () => {
  it('returns a string that names TBT as a laboratory metric, not INP', () => {
    const label = tbtIsLabMetricNotINP()
    assert.ok(typeof label === 'string')
    assert.ok(label.includes('TBT'), 'must mention TBT')
    assert.ok(label.toLowerCase().includes('laboratory'), 'must mention laboratory')
    assert.ok(label.includes('INP'), 'must mention INP')
    assert.ok(!label.toLowerCase().includes('tbt is inp'), 'must not equate TBT with INP')
  })
})
