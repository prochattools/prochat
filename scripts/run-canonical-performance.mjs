/**
 * Canonical mobile performance evidence runner.
 *
 * Runs 3 Lighthouse audits per canonical route on a CI-started local
 * production server (WAVE1_BASE_URL=http://localhost:3000).
 *
 * Requirements:
 * - WAVE1_BASE_URL must be set to the local production server URL
 * - PROCHAT_MAINTENANCE_MODE must be 0 on the target server
 * - The server must already be running and healthy before this script starts
 *
 * Output:
 * - tests/performance/results/canonical-performance-TIMESTAMP.json
 * - tests/performance/results/canonical-performance-latest.json
 *
 * TBT is reported as a laboratory diagnostic only. It is NOT field INP.
 * INP requires field measurement or an approved RUM tool.
 */

import { createRequire } from 'module'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

import {
  diagnosticSummary,
  extractPerformanceAttribution,
  extractRouteChunkInventory,
  parseClientReferenceManifest,
  selectRepresentativeAttribution,
} from '../tests/performance/canonical-performance-attribution.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const lighthouse = (await import('lighthouse')).default
const { launch } = await import('chrome-launcher')

const BASE_URL = process.env.WAVE1_BASE_URL
if (!BASE_URL) {
  console.error('WAVE1_BASE_URL is required. Set it to the local production server URL.')
  process.exit(1)
}

if (BASE_URL.includes('prochat.tools') || BASE_URL.includes('staging')) {
  console.error('WAVE1_BASE_URL must not point to production or staging. Use http://localhost:3000.')
  process.exit(1)
}

const CANONICAL_ROUTES = ['/', '/memory', '/memory-qa', '/workbench', '/docs', '/contact', '/privacy', '/terms']
const DIAGNOSTIC_MODE = process.env.PERF_DIAGNOSTIC_MODE === '1'
const requestedDiagnosticRoutes = (process.env.PERF_DIAGNOSTIC_ROUTES ?? '')
  .split(',')
  .map((route) => route.trim())
  .filter(Boolean)
const unknownDiagnosticRoutes = requestedDiagnosticRoutes.filter((route) => !CANONICAL_ROUTES.includes(route))
if (unknownDiagnosticRoutes.length > 0) {
  console.error(`Unknown diagnostic routes: ${unknownDiagnosticRoutes.join(', ')}`)
  process.exit(1)
}
const ROUTES_TO_RUN = DIAGNOSTIC_MODE
  ? requestedDiagnosticRoutes.length > 0
    ? requestedDiagnosticRoutes
    : CANONICAL_ROUTES
  : CANONICAL_ROUTES
const RUNS_PER_ROUTE = DIAGNOSTIC_MODE ? 1 : 3
const TIMEOUT_MS = 25 * 60 * 1000
const BLOCKED_PATHS = ['/maintenance', '/error', '/404', '/500', '/not-found']
const RESULTS_DIR = join(__dirname, '..', 'tests', 'performance', 'results')

const NODE_VERSION = process.version

async function verifyRouteReady(url, route) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  try {
    const response = await fetch(url, { signal: controller.signal })
    clearTimeout(timeout)
    if (!response.ok) {
      throw new Error(`${route} returned HTTP ${response.status}`)
    }
    const finalPath = new URL(response.url).pathname.replace(/\/$/, '') || '/'
    const expectedPath = route.replace(/\/$/, '') || '/'
    for (const blocked of BLOCKED_PATHS) {
      if (finalPath === blocked) {
        throw new Error(`${route} redirected to blocked path: ${finalPath}`)
      }
    }
    if (finalPath !== expectedPath) {
      throw new Error(`${route} redirected away: expected ${expectedPath}, got ${finalPath}`)
    }
  } catch (err) {
    clearTimeout(timeout)
    throw err
  }
}

function extractMetrics(lhr) {
  const audits = lhr.audits

  function numericValue(key) {
    const audit = audits[key]
    if (!audit || audit.numericValue === undefined || audit.numericValue === null) return NaN
    return audit.numericValue
  }

  const fcpMs = numericValue('first-contentful-paint')
  const lcpMs = numericValue('largest-contentful-paint')
  const cls = numericValue('cumulative-layout-shift')
  const tbtMs = numericValue('total-blocking-time')
  const siMs = numericValue('speed-index')
  const score = lhr.categories?.performance?.score

  // total-byte-weight is measured as total initial navigation transfer bytes
  const totalByteWeight = numericValue('total-byte-weight')
  const unusedJs = numericValue('unused-javascript')
  const renderBlockingResources = numericValue('render-blocking-resources')

  // Request count from network requests audit
  const networkRequests = audits['network-requests']
  const requestCount = networkRequests?.details?.items?.length ?? NaN

  // JavaScript transferred bytes from bootup time audit items
  let jsBytes = NaN
  const bootup = audits['bootup-time']
  if (bootup?.details?.items) {
    jsBytes = bootup.details.items.reduce((sum, item) => sum + (item.transferSize ?? 0), 0)
  }

  return {
    FCP_seconds: isFinite(fcpMs) ? fcpMs / 1000 : NaN,
    LCP_seconds: isFinite(lcpMs) ? lcpMs / 1000 : NaN,
    CLS: isFinite(cls) ? cls : NaN,
    TBT_ms: isFinite(tbtMs) ? tbtMs : NaN,
    SI_seconds: isFinite(siMs) ? siMs / 1000 : NaN,
    performance_score: typeof score === 'number' ? Math.round(score * 100) : NaN,
    total_bytes: isFinite(totalByteWeight) ? totalByteWeight : NaN,
    js_bytes: isFinite(jsBytes) ? jsBytes : NaN,
    request_count: isFinite(requestCount) ? requestCount : NaN,
  }
}

function median(values) {
  const valid = values.filter((v) => typeof v === 'number' && isFinite(v) && v >= 0)
  if (valid.length < 3) return null
  const sorted = [...valid].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
}

function computeMedians(runs) {
  const fields = ['FCP_seconds', 'LCP_seconds', 'CLS', 'TBT_ms', 'SI_seconds', 'performance_score', 'total_bytes', 'js_bytes', 'request_count']
  const result = {}
  for (const field of fields) {
    const values = runs.map((r) => r[field])
    const m = median(values)
    if (m === null) return null
    result[field] = m
  }
  return result
}

function checkThresholds(medians) {
  const THRESHOLDS = { LCP_seconds: 2.5, CLS: 0.1, FCP_seconds: 1.8, TBT_ms: 200 }
  return [
    { metric: 'LCP_seconds', value: medians.LCP_seconds, threshold: THRESHOLDS.LCP_seconds, passes: medians.LCP_seconds <= THRESHOLDS.LCP_seconds },
    { metric: 'CLS', value: medians.CLS, threshold: THRESHOLDS.CLS, passes: medians.CLS <= THRESHOLDS.CLS },
    { metric: 'FCP_seconds', value: medians.FCP_seconds, threshold: THRESHOLDS.FCP_seconds, passes: medians.FCP_seconds <= THRESHOLDS.FCP_seconds, note: 'provisional laboratory target' },
    { metric: 'TBT_ms', value: medians.TBT_ms, threshold: THRESHOLDS.TBT_ms, passes: medians.TBT_ms <= THRESHOLDS.TBT_ms, note: 'TBT is a laboratory interactivity diagnostic, not field INP' },
  ]
}

function loadRouteChunkInventory() {
  const root = join(__dirname, '..')
  const routeManifestPaths = {
    '/': '.next/server/app/(marketing)/page_client-reference-manifest.js',
    '/memory': '.next/server/app/(marketing)/memory/page_client-reference-manifest.js',
    '/memory-qa': '.next/server/app/(marketing)/memory-qa/page_client-reference-manifest.js',
    '/workbench': '.next/server/app/(marketing)/workbench/page_client-reference-manifest.js',
    '/docs': '.next/server/app/docs/page_client-reference-manifest.js',
    '/contact': '.next/server/app/(marketing)/contact/page_client-reference-manifest.js',
    '/privacy': '.next/server/app/(marketing)/privacy/page_client-reference-manifest.js',
    '/terms': '.next/server/app/(marketing)/terms/page_client-reference-manifest.js',
  }
  const manifests = {}
  for (const route of ROUTES_TO_RUN) {
    const relativePath = routeManifestPaths[route]
    const manifestPath = relativePath ? join(root, relativePath) : null
    if (!manifestPath || !existsSync(manifestPath)) {
      manifests[route] = null
      continue
    }
    manifests[route] = parseClientReferenceManifest(readFileSync(manifestPath, 'utf8'))
  }
  return extractRouteChunkInventory(manifests, ROUTES_TO_RUN)
}

async function runLighthouse(url, chromePort) {
  const result = await lighthouse(url, {
    port: chromePort,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance'],
    formFactor: 'mobile',
    screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 2.625 },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      requestLatencyMs: 562.5,
      downloadThroughputKbps: 1474.56,
      uploadThroughputKbps: 675,
      cpuSlowdownMultiplier: 4,
      offline: false,
    },
    throttlingMethod: 'simulate',
    emulatedUserAgent: 'Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36',
    disableFullPageScreenshot: true,
  })
  return result
}

async function main() {
  const startTime = Date.now()
  console.log(DIAGNOSTIC_MODE ? 'Starting canonical performance diagnostic attribution' : 'Starting canonical performance evidence collection')
  console.log(`Base URL: ${BASE_URL}`)
  console.log(`Routes: ${ROUTES_TO_RUN.length}, runs per route: ${RUNS_PER_ROUTE}, total audits: ${ROUTES_TO_RUN.length * RUNS_PER_ROUTE}`)

  mkdirSync(RESULTS_DIR, { recursive: true })

  let chrome
  let chromeVersion = 'unknown'

  try {
    chrome = await launch({
      chromeFlags: [
        '--headless=new',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    })

    // Get Chrome version
    try {
      const versionResponse = await fetch(`http://localhost:${chrome.port}/json/version`)
      const versionData = await versionResponse.json()
      chromeVersion = versionData.Browser ?? 'unknown'
    } catch {
      // Non-fatal
    }

    const lhVersion = JSON.parse(readFileSync(new URL('../node_modules/lighthouse/package.json', import.meta.url), 'utf8')).version

    const environment = {
      lighthouseVersion: lhVersion,
      chromeVersion,
      nodeVersion: NODE_VERSION,
      formFactor: 'mobile',
      viewport: '390x844 @ 2.625x',
      deviceScaleFactor: 2.625,
      cpuThrottling: 4,
      networkThrottle: 'Slow 4G: rtt=150ms, dl=1474.56kbps, ul=675kbps',
      throttlingMethod: 'simulate',
      userAgent: 'Moto G Power (2022) Android 11',
      runCount: RUNS_PER_ROUTE,
      mode: DIAGNOSTIC_MODE ? 'diagnostic' : 'canonical-gate',
      routes: ROUTES_TO_RUN,
      timestamp: new Date().toISOString(),
      applicationRevision: process.env.GITHUB_SHA ?? process.env.PROCHAT_GIT_SHA ?? 'local',
      tbtNote: 'TBT is a laboratory interactivity diagnostic. It is not field INP.',
      inpNote: 'INP (Interaction to Next Paint) requires field measurement or an approved RUM tool and is not provided by Lighthouse.',
    }
    const routeChunkInventory = loadRouteChunkInventory()

    console.log(`\nEnvironment:`)
    console.log(`  Lighthouse: ${environment.lighthouseVersion}`)
    console.log(`  Chrome: ${environment.chromeVersion}`)
    console.log(`  Node: ${environment.nodeVersion}`)
    console.log(`  Form factor: mobile (Moto G Power 2022 simulation)`)
    console.log(`  Viewport: ${environment.viewport}`)
    console.log(`  CPU throttle: ${environment.cpuThrottling}x`)
    console.log(`  Network: ${environment.networkThrottle}`)

    const routeResults = []
    const failedRoutes = []

    for (const route of ROUTES_TO_RUN) {
      if (Date.now() - startTime > TIMEOUT_MS) {
        console.error(`Timeout exceeded (${TIMEOUT_MS}ms). Stopping.`)
        process.exitCode = 1
        break
      }

      const url = new URL(route, BASE_URL).toString()
      console.log(`\n[${ROUTES_TO_RUN.indexOf(route) + 1}/${ROUTES_TO_RUN.length}] ${route}`)

      try {
        await verifyRouteReady(url, route)
      } catch (err) {
        console.error(`  Route verification failed: ${err.message}`)
        failedRoutes.push({ route, error: err.message })
        continue
      }

      const rawRuns = []
      let runsFailed = 0

      for (let run = 1; run <= RUNS_PER_ROUTE; run++) {
        console.log(`  Run ${run}/${RUNS_PER_ROUTE}...`)
        try {
          const lighthouseResult = await runLighthouse(url, chrome.port)
          const lhr = lighthouseResult.lhr
          const metrics = extractMetrics(lhr)
          const attribution = extractPerformanceAttribution(lhr, lighthouseResult.artifacts)
          rawRuns.push({ ...metrics, attribution })
          console.log(`    LCP: ${metrics.LCP_seconds.toFixed(2)}s  CLS: ${metrics.CLS.toFixed(3)}  TBT: ${metrics.TBT_ms.toFixed(0)}ms  FCP: ${metrics.FCP_seconds.toFixed(2)}s  score: ${metrics.performance_score}`)
        } catch (err) {
          console.error(`  Run ${run} failed: ${err.message}`)
          runsFailed++
        }
      }

      if (rawRuns.length < RUNS_PER_ROUTE) {
        console.error(`  Insufficient valid runs: ${rawRuns.length}/${RUNS_PER_ROUTE}`)
        failedRoutes.push({ route, error: `Only ${rawRuns.length}/${RUNS_PER_ROUTE} runs completed` })
        continue
      }

      const computedMedians = DIAGNOSTIC_MODE
        ? {
            FCP_seconds: rawRuns[0].FCP_seconds,
            LCP_seconds: rawRuns[0].LCP_seconds,
            CLS: rawRuns[0].CLS,
            TBT_ms: rawRuns[0].TBT_ms,
            SI_seconds: rawRuns[0].SI_seconds,
            performance_score: rawRuns[0].performance_score,
            total_bytes: rawRuns[0].total_bytes,
            js_bytes: rawRuns[0].js_bytes,
            request_count: rawRuns[0].request_count,
          }
        : computeMedians(rawRuns)
      if (!computedMedians) {
        console.error(`  Median computation failed — one or more metrics have insufficient valid values`)
        failedRoutes.push({ route, error: 'Median computation failed' })
        continue
      }

      const thresholdResults = checkThresholds(computedMedians)
      const targetGaps = thresholdResults.filter((r) => !r.passes).map((r) => `${r.metric}: ${r.value.toFixed ? r.value.toFixed(3) : r.value} > threshold ${r.threshold}${r.note ? ` (${r.note})` : ''}`)
      const passes = targetGaps.length === 0

      console.log(`  Medians — LCP: ${computedMedians.LCP_seconds.toFixed(2)}s  CLS: ${computedMedians.CLS.toFixed(3)}  TBT: ${computedMedians.TBT_ms.toFixed(0)}ms  FCP: ${computedMedians.FCP_seconds.toFixed(2)}s  score: ${computedMedians.performance_score}`)
      if (targetGaps.length > 0) {
        console.log(`  TARGET GAPS: ${targetGaps.join(', ')}`)
      } else {
        console.log(`  All thresholds pass`)
      }

      const attribution = selectRepresentativeAttribution(rawRuns, computedMedians.LCP_seconds)
      routeResults.push({
        route,
        rawRuns,
        medians: computedMedians,
        thresholdResults,
        passes,
        targetGaps,
        attribution,
        routeChunks: routeChunkInventory[route] ?? { manifestKey: 'unavailable', files: [] },
        failedRequests: [],
      })
    }

    const allThresholdsMet = routeResults.length === ROUTES_TO_RUN.length &&
      routeResults.every((r) => r.passes) &&
      failedRoutes.length === 0
    const runSucceeded = routeResults.length === ROUTES_TO_RUN.length &&
      failedRoutes.length === 0 &&
      (DIAGNOSTIC_MODE || allThresholdsMet)
    const diagnostics = routeResults.map((result) => diagnosticSummary(result, routeChunkInventory))

    const output = {
      environment,
      routeChunkInventory,
      routeResults,
      diagnostics,
      failedRoutes,
      summary: {
        mode: DIAGNOSTIC_MODE ? 'diagnostic' : 'canonical-gate',
        totalRoutes: ROUTES_TO_RUN.length,
        completedRoutes: routeResults.length,
        failedRoutes: failedRoutes.length,
        routesPassing: routeResults.filter((r) => r.passes).length,
        routesWithTargetGaps: routeResults.filter((r) => !r.passes).map((r) => r.route),
        allThresholdsMet,
        runSucceeded,
      },
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
    const outputPrefix = DIAGNOSTIC_MODE ? 'canonical-performance-diagnostic' : 'canonical-performance'
    const timestampedPath = join(RESULTS_DIR, `${outputPrefix}-${timestamp}.json`)
    const latestPath = join(RESULTS_DIR, `${outputPrefix}-latest.json`)

    writeFileSync(timestampedPath, JSON.stringify(output, null, 2))
    writeFileSync(latestPath, JSON.stringify(output, null, 2))

    console.log(`\n=== Summary ===`)
    console.log(`Mode: ${output.summary.mode}`)
    console.log(`Routes completed: ${routeResults.length}/${ROUTES_TO_RUN.length}`)
    console.log(`Routes passing all thresholds: ${output.summary.routesPassing}/${ROUTES_TO_RUN.length}`)
    if (output.summary.routesWithTargetGaps.length > 0) {
      console.log(`Routes with target gaps: ${output.summary.routesWithTargetGaps.join(', ')}`)
    }
    if (failedRoutes.length > 0) {
      console.log(`Failed routes: ${failedRoutes.map((r) => r.route).join(', ')}`)
    }
    console.log(`Results: ${latestPath}`)

    console.log(`\n=== Route-by-route ${DIAGNOSTIC_MODE ? 'observations' : 'medians'} (mobile simulated) ===`)
    console.log('Route'.padEnd(15), 'FCP(s)'.padEnd(8), 'LCP(s)'.padEnd(8), 'CLS'.padEnd(7), 'TBT(ms)'.padEnd(9), 'SI(s)'.padEnd(7), 'Score'.padEnd(7), 'Total(KB)'.padEnd(11), 'JS(KB)')
    for (const r of routeResults) {
      const m = r.medians
      const gap = r.passes ? '' : ' !'
      console.log(
        r.route.padEnd(15),
        m.FCP_seconds.toFixed(2).padEnd(8),
        m.LCP_seconds.toFixed(2).padEnd(8),
        m.CLS.toFixed(3).padEnd(7),
        m.TBT_ms.toFixed(0).padEnd(9),
        m.SI_seconds.toFixed(2).padEnd(7),
        String(m.performance_score).padEnd(7),
        (m.total_bytes / 1024).toFixed(0).padEnd(11),
        (m.js_bytes / 1024).toFixed(0) + gap
      )
    }

    console.log('\n=== LCP attribution summary ===')
    for (const item of diagnostics.filter(Boolean)) {
      const trace = item.rawTraceTimings
      const topTransfer = item.topScriptByTransfer?.filename ?? 'unavailable'
      const topExecution = item.topScriptByExecution?.filename ?? 'unavailable'
      console.log(
        `${item.route}: LCP ${item.LCP_seconds.toFixed(2)}s; ` +
          `${item.lcpElement.elementType} ${item.lcpElement.selector}; ` +
          `trace nav→FCP ${trace.navigationToFcpMs ?? 'n/a'}ms; ` +
          `nav→LCP ${trace.navigationToLcpMs ?? 'n/a'}ms; FCP→LCP ${trace.fcpToLcpMs ?? 'n/a'}ms; ` +
          `candidates ${item.lcpCandidateCount}; replacement ${item.lcpReplacementObserved}; ` +
          `top transfer ${topTransfer}; top execution ${topExecution}; ` +
          `JS ${(item.totalJavaScriptTransferBytes / 1024).toFixed(0)}KB; long tasks ${item.longTaskCount}`,
      )
    }

    if (!runSucceeded) {
      console.log('\nOne or more routes have target gaps or failed to complete.')
      console.log('See target gap and attribution entries in the results JSON for bounded repair recommendations.')
      process.exitCode = 1
    } else if (DIAGNOSTIC_MODE && !allThresholdsMet) {
      console.log('\nDiagnostic attribution completed; threshold gaps are recorded without changing canonical gate behavior.')
    }
  } finally {
    if (chrome) {
      await chrome.kill()
    }
  }
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
