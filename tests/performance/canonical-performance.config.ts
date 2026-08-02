/**
 * Mobile laboratory configuration for canonical performance measurement.
 *
 * This configuration must be used identically in local validation and CI runs.
 * All throttling values are Lighthouse's standard "Moto G Power" slow-4G preset.
 *
 * TBT is a laboratory interactivity diagnostic. It is NOT field INP.
 * INP_ms: 200 remains a future field-data or approved RUM requirement.
 */

export const MOBILE_LIGHTHOUSE_CONFIG = {
  formFactor: 'mobile' as const,
  viewport: { width: 390, height: 844, deviceScaleFactor: 2.625 },
  cpuThrottling: 4,
  networkThrottle: {
    rttMs: 150,
    throughputKbps: 1638.4,
    requestLatencyMs: 562.5,
    downloadThroughputKbps: 1474.56,
    uploadThroughputKbps: 675,
    offline: false,
  },
  throttlingMethod: 'simulate' as const,
  userAgent:
    'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
}

export const CANONICAL_ROUTES = [
  '/',
  '/memory',
  '/memory-qa',
  '/workbench',
  '/docs',
  '/contact',
  '/privacy',
  '/terms',
] as const

export type CanonicalRoute = (typeof CANONICAL_ROUTES)[number]

export const RUNS_PER_ROUTE = 3

export const AUDIT_TIMEOUT_MS = 25 * 60 * 1000

/**
 * Laboratory thresholds.
 *
 * LCP and CLS are from the canonical strategy targets.
 * FCP and TBT are provisional laboratory targets documented below.
 * INP cannot be measured by Lighthouse; it is excluded from this gate.
 *
 * TBT_NOTE: TBT (Total Blocking Time) is a laboratory proxy for main-thread
 * responsiveness. It correlates with INP but is not the same metric.
 * Field INP requires real-user measurement or an approved RUM tool.
 */
export const THRESHOLDS = {
  LCP_seconds: 2.5,
  CLS: 0.1,
  FCP_seconds: 1.8,
  TBT_ms: 200,
  performance_score_minimum: 0,
} as const

/**
 * Noise allowance for route-specific regression comparison.
 * Medians may fluctuate within this tolerance between runs without indicating
 * a real regression. Documented so tolerance decisions are explicit and testable.
 */
export const REGRESSION_TOLERANCE = {
  LCP_seconds: 0.3,
  CLS: 0.02,
  FCP_seconds: 0.3,
  TBT_ms: 50,
  performance_score: 5,
} as const
