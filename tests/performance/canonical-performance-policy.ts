import {
  CANONICAL_ROUTES,
  REGRESSION_TOLERANCE,
  THRESHOLDS,
  type CanonicalRoute,
} from './canonical-performance.config'

export interface RawMetricSet {
  FCP_seconds: number
  LCP_seconds: number
  CLS: number
  TBT_ms: number
  SI_seconds: number
  performance_score: number
  total_bytes: number
  js_bytes: number
  request_count: number
}

export interface RouteMedians {
  FCP_seconds: number
  LCP_seconds: number
  CLS: number
  TBT_ms: number
  SI_seconds: number
  performance_score: number
  total_bytes: number
  js_bytes: number
  request_count: number
}

export interface ThresholdResult {
  metric: string
  value: number
  threshold: number
  passes: boolean
  note?: string
}

export interface RouteResult {
  route: CanonicalRoute
  rawRuns: RawMetricSet[]
  medians: RouteMedians
  thresholdResults: ThresholdResult[]
  passes: boolean
  targetGaps: string[]
}

export interface RegressionCheckResult {
  metric: string
  current: number
  baseline: number
  tolerance: number
  regresses: boolean
}

export interface PerformanceEnvironment {
  lighthouseVersion: string
  chromeVersion: string
  nodeVersion: string
  formFactor: string
  viewport: string
  deviceScaleFactor: number
  cpuThrottling: number
  networkThrottle: string
  throttlingMethod: string
  userAgent: string
  runCount: number
  timestamp: string
  applicationRevision: string
}

/**
 * Calculate the median of three values. Sorting before selecting ensures the
 * result is correct regardless of input order.
 *
 * Rejects missing, non-finite, and negative values before selecting the median.
 * Returns null if fewer than three valid values are present.
 */
export function median(values: number[]): number | null {
  const valid = values.filter((v) => typeof v === 'number' && isFinite(v) && v >= 0)
  if (valid.length < 3) return null
  const sorted = [...valid].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

export function computeMedians(runs: RawMetricSet[]): RouteMedians | null {
  const fields: (keyof RawMetricSet)[] = [
    'FCP_seconds',
    'LCP_seconds',
    'CLS',
    'TBT_ms',
    'SI_seconds',
    'performance_score',
    'total_bytes',
    'js_bytes',
    'request_count',
  ]

  const result: Partial<RouteMedians> = {}
  for (const field of fields) {
    const values = runs.map((run) => run[field])
    const m = median(values)
    if (m === null) return null
    result[field] = m
  }

  return result as RouteMedians
}

export function checkThresholds(medians: RouteMedians): ThresholdResult[] {
  return [
    {
      metric: 'LCP_seconds',
      value: medians.LCP_seconds,
      threshold: THRESHOLDS.LCP_seconds,
      passes: medians.LCP_seconds <= THRESHOLDS.LCP_seconds,
    },
    {
      metric: 'CLS',
      value: medians.CLS,
      threshold: THRESHOLDS.CLS,
      passes: medians.CLS <= THRESHOLDS.CLS,
    },
    {
      metric: 'FCP_seconds',
      value: medians.FCP_seconds,
      threshold: THRESHOLDS.FCP_seconds,
      passes: medians.FCP_seconds <= THRESHOLDS.FCP_seconds,
      note: 'provisional laboratory target',
    },
    {
      metric: 'TBT_ms',
      value: medians.TBT_ms,
      threshold: THRESHOLDS.TBT_ms,
      passes: medians.TBT_ms <= THRESHOLDS.TBT_ms,
      note: 'TBT is a laboratory interactivity diagnostic, not field INP',
    },
  ]
}

export function checkRegressionAgainstBaseline(
  current: RouteMedians,
  baseline: RouteMedians,
): RegressionCheckResult[] {
  const checks: RegressionCheckResult[] = []

  const fields: Array<{
    metric: keyof RouteMedians
    tolerance: number
  }> = [
    { metric: 'LCP_seconds', tolerance: REGRESSION_TOLERANCE.LCP_seconds },
    { metric: 'CLS', tolerance: REGRESSION_TOLERANCE.CLS },
    { metric: 'FCP_seconds', tolerance: REGRESSION_TOLERANCE.FCP_seconds },
    { metric: 'TBT_ms', tolerance: REGRESSION_TOLERANCE.TBT_ms },
    { metric: 'performance_score', tolerance: REGRESSION_TOLERANCE.performance_score },
  ]

  for (const { metric, tolerance } of fields) {
    const currentVal = current[metric] as number
    const baselineVal = baseline[metric] as number
    checks.push({
      metric,
      current: currentVal,
      baseline: baselineVal,
      tolerance,
      regresses: currentVal > baselineVal + tolerance,
    })
  }

  return checks
}

export function validateAllCanonicalRoutesPresent(routes: string[]): string[] {
  const missing = CANONICAL_ROUTES.filter((r) => !routes.includes(r))
  return missing.map((r) => `missing canonical route: ${r}`)
}

export function tbtIsLabMetricNotINP(): string {
  return 'TBT (Total Blocking Time) is a Lighthouse laboratory interactivity diagnostic. It is not field INP. Field INP requires real-user measurement.'
}
