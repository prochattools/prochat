import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  classifyLcpElement,
  diagnosticSummary,
  extractLcpPhases,
  extractPerformanceAttribution,
  extractRouteChunkInventory,
  extractTraceLcpAttribution,
  normalizeNetworkRequests,
  parseClientReferenceManifest,
  selectRepresentativeAttribution,
  topScriptsByTransfer,
} from './canonical-performance-attribution.mjs'

function lhr(audits = {}) {
  return { audits }
}

function node(selector, snippet, nodeLabel = '') {
  return { type: 'node', selector, snippet, nodeLabel }
}

function traceEvent(name, ts, data = {}, frame = 'main-frame') {
  return { name, ts, args: { data, frame } }
}

function traceArtifacts(events) {
  return { Trace: { traceEvents: events } }
}

describe('trace-based LCP attribution', () => {
  it('selects the highest candidate index for the main navigation', () => {
    const result = extractTraceLcpAttribution(
      traceArtifacts([
        traceEvent('navigationStart', 1_000_000, {
          documentLoaderURL: 'http://localhost:3000/memory',
          isOutermostMainFrame: true,
          navigationId: 'main-nav',
        }),
        traceEvent('largestContentfulPaint::Candidate', 1_080_000, {
          navigationId: 'main-nav',
          isOutermostMainFrame: true,
          candidateIndex: 1,
          nodeId: 10,
          nodeName: "P id='first'",
          type: 'text',
          size: 100,
        }),
        traceEvent('largestContentfulPaint::Candidate', 1_090_000, {
          navigationId: 'main-nav',
          isOutermostMainFrame: true,
          candidateIndex: 2,
          nodeId: 20,
          nodeName: "H1 id='final-title'",
          type: 'text',
          size: 200,
        }),
      ]),
    )
    assert.equal(result.finalCandidate.candidateIndex, 2)
    assert.equal(result.finalCandidate.selector, 'h1#final-title')
    assert.equal(result.finalCandidate.nodeId, 20)
  })

  it('matches candidates and FCP by navigationId', () => {
    const result = extractTraceLcpAttribution(
      traceArtifacts([
        traceEvent('navigationStart', 1_000_000, {
          documentLoaderURL: 'http://localhost:3000/memory',
          isOutermostMainFrame: true,
          navigationId: 'main-nav',
        }),
        traceEvent('firstContentfulPaint', 1_050_000, { navigationId: 'other-nav' }),
        traceEvent('firstContentfulPaint', 1_080_000, { navigationId: 'main-nav' }),
        traceEvent('largestContentfulPaint::Candidate', 1_060_000, {
          navigationId: 'other-nav',
          isOutermostMainFrame: true,
          candidateIndex: 9,
          nodeName: "H1 id='wrong'",
          type: 'text',
        }),
        traceEvent('largestContentfulPaint::Candidate', 1_090_000, {
          navigationId: 'main-nav',
          isOutermostMainFrame: true,
          candidateIndex: 1,
          nodeName: "H1 id='right'",
          type: 'text',
        }),
      ]),
    )
    assert.equal(result.finalCandidate.selector, 'h1#right')
    assert.equal(result.timings.navigationToFcpMs, 80)
  })

  it('records text candidate identity and replacement count', () => {
    const result = extractTraceLcpAttribution(
      traceArtifacts([
        traceEvent('navigationStart', 1_000_000, {
          documentLoaderURL: 'http://localhost:3000/memory',
          isOutermostMainFrame: true,
          navigationId: 'main-nav',
        }),
        traceEvent('largestContentfulPaint::Candidate', 1_080_000, {
          navigationId: 'main-nav',
          isOutermostMainFrame: true,
          candidateIndex: 1,
          nodeName: "P id='lead'",
          type: 'text',
        }),
        traceEvent('largestContentfulPaint::Candidate', 1_100_000, {
          navigationId: 'main-nav',
          isOutermostMainFrame: true,
          candidateIndex: 2,
          nodeId: 42,
          nodeName: "H1 id='pm-product-title-memory'",
          type: 'text',
          size: 73130,
        }),
      ]),
    )
    assert.equal(result.finalCandidate.type, 'text')
    assert.equal(result.finalCandidate.nodeName, "H1 id='pm-product-title-memory'")
    assert.equal(result.candidateCount, 2)
    assert.equal(result.replacementObserved, true)
    assert.deepEqual(result.candidateIndexes, [1, 2])
  })

  it('calculates navigation, FCP, and LCP timing from trace timestamps', () => {
    const result = extractTraceLcpAttribution(
      traceArtifacts([
        traceEvent('navigationStart', 1_000_000, {
          documentLoaderURL: 'http://localhost:3000/memory',
          isOutermostMainFrame: true,
          navigationId: 'main-nav',
        }),
        traceEvent('firstContentfulPaint', 1_090_000, { navigationId: 'main-nav' }),
        traceEvent('largestContentfulPaint::Candidate', 1_110_000, {
          navigationId: 'main-nav',
          isOutermostMainFrame: true,
          candidateIndex: 1,
          nodeName: "H1 id='title'",
          type: 'text',
        }),
      ]),
    )
    assert.deepEqual(result.timings, {
      navigationToFcpMs: 90,
      navigationToLcpMs: 110,
      fcpToLcpMs: 20,
    })
  })

  it('returns a truthful unavailable fallback without trace events', () => {
    const result = extractTraceLcpAttribution(null)
    assert.equal(result.available, false)
    assert.equal(result.candidateCount, 0)
    assert.equal(result.finalCandidate, null)
    assert.deepEqual(result.timings, {
      navigationToFcpMs: null,
      navigationToLcpMs: null,
      fcpToLcpMs: null,
    })
  })
})

describe('LCP element evidence', () => {
  it('represents missing LCP evidence as unavailable', () => {
    const result = extractPerformanceAttribution(lhr())
    assert.deepEqual(result.lcp.element, {
      selector: 'unavailable',
      snippet: 'unavailable',
      nodeLabel: 'unavailable',
      resourceUrl: 'unavailable',
      elementType: 'unavailable',
    })
  })

  it('classifies text LCP elements', () => {
    assert.equal(classifyLcpElement(node('h1', '<h1>Memory that stays yours</h1>')), 'text')
  })

  it('classifies image LCP elements', () => {
    assert.equal(classifyLcpElement({ tagName: 'IMG', snippet: '<img src="hero.webp">' }), 'image')
  })

  it('extracts an available Lighthouse LCP node without inventing fields', () => {
    const result = extractPerformanceAttribution(
      lhr({
        'largest-contentful-paint-element': {
          title: 'Largest Contentful Paint element',
          details: { items: [{ node: node('main h1', '<h1>Memory</h1>', 'Memory') }] },
        },
      }),
    )
    assert.equal(result.lcp.element.selector, 'main h1')
    assert.equal(result.lcp.element.elementType, 'text')
    assert.equal(result.lcp.element.resourceUrl, 'unavailable')
  })
})

describe('LCP phase extraction', () => {
  it('extracts named non-negative phase values', () => {
    const phases = extractLcpPhases({
      'lcp-breakdown-insight': {
        details: {
          items: [
            { label: 'Time to first byte', duration: 120 },
            { label: 'Load delay', duration: 40 },
            { label: 'Load duration', duration: 15 },
            { label: 'Render delay', duration: 800 },
          ],
        },
      },
    })
    assert.deepEqual(phases, { ttfbMs: 120, loadDelayMs: 40, loadDurationMs: 15, renderDelayMs: 800 })
  })

  it('rejects negative and non-finite phase values', () => {
    const phases = extractLcpPhases({
      'lcp-breakdown-insight': {
        details: { items: [{ ttfb: -1, loadDelay: Number.NaN, loadTime: Infinity, renderDelay: -5 }] },
      },
    })
    assert.deepEqual(phases, { ttfbMs: null, loadDelayMs: null, loadDurationMs: null, renderDelayMs: null })
  })
})

describe('network and script attribution', () => {
  it('normalizes exact duplicate network requests once', () => {
    const request = {
      url: 'http://localhost/_next/static/chunks/2117-abc.js',
      resourceType: 'Script',
      transferSize: 100,
      resourceSize: 200,
      statusCode: 200,
      networkRequestTime: 1,
      networkEndTime: 2,
    }
    const result = normalizeNetworkRequests([request, { ...request }])
    assert.equal(result.length, 1)
  })

  it('preserves repeated requests with distinct timing', () => {
    const base = { url: 'http://localhost/app.js', resourceType: 'Script', transferSize: 100, statusCode: 200 }
    const result = normalizeNetworkRequests([
      { ...base, networkRequestTime: 1, networkEndTime: 2 },
      { ...base, networkRequestTime: 3, networkEndTime: 4 },
    ])
    assert.equal(result.length, 2)
  })

  it('sorts top scripts deterministically by transfer then URL', () => {
    const scripts = topScriptsByTransfer([
      { url: 'http://localhost/b.js', resourceType: 'Script', mimeType: 'application/javascript', transferSize: 200 },
      { url: 'http://localhost/a.js', resourceType: 'Script', mimeType: 'application/javascript', transferSize: 200 },
      { url: 'http://localhost/c.js', resourceType: 'Script', mimeType: 'application/javascript', transferSize: 300 },
    ])
    assert.deepEqual(scripts.map((item) => item.url), [
      'http://localhost/c.js',
      'http://localhost/a.js',
      'http://localhost/b.js',
    ])
  })

  it('counts every script in total JavaScript transfer beyond the top-ten list', () => {
    const items = Array.from({ length: 11 }, (_, index) => ({
      url: `http://localhost/chunk-${index}.js`,
      resourceType: 'Script',
      mimeType: 'application/javascript',
      transferSize: 100,
      resourceSize: 200,
      statusCode: 200,
      networkRequestTime: index + 1,
      networkEndTime: index + 2,
    }))
    const result = extractPerformanceAttribution(
      lhr({ 'network-requests': { details: { items } } }),
    )
    assert.equal(result.scripts.topByTransfer.length, 10)
    assert.equal(result.network.totalJavaScriptTransferBytes, 1100)
  })

  it('tolerates absent optional audits while preserving aggregate inputs separately', () => {
    const result = extractPerformanceAttribution(
      lhr({ 'network-requests': { details: { items: [] } }, 'bootup-time': { details: { items: [] } } }),
    )
    assert.equal(result.mainThread.longTasks.length, 0)
    assert.equal(result.scripts.topByTransfer.length, 0)
    assert.equal(result.lcp.availableAudits.length, 0)
  })
})

describe('route and representative attribution', () => {
  it('produces route-specific build-manifest inventories', () => {
    const result = extractRouteChunkInventory(
      {
        pages: {
          '/page': ['static/chunks/2117-a.js', 'static/chunks/home.js'],
          '/(marketing)/memory/page': ['static/chunks/2117-a.js', 'static/chunks/memory.js'],
        },
      },
      ['/', '/memory'],
    )
    assert.deepEqual(result['/'].files, ['static/chunks/2117-a.js', 'static/chunks/home.js'])
    assert.deepEqual(result['/memory'].files, ['static/chunks/2117-a.js', 'static/chunks/memory.js'])
  })

  it('parses per-route client-reference manifests and ignores numeric chunk IDs', () => {
    const parsed = parseClientReferenceManifest(
      'globalThis.__RSC_MANIFEST=(globalThis.__RSC_MANIFEST||{});' +
        'globalThis.__RSC_MANIFEST["/(marketing)/memory/page"]=' +
        JSON.stringify({
          clientModules: {
            a: { chunks: ['1931', 'static/chunks/2117-a.js', 'static/chunks/memory.js'] },
            b: { chunks: ['static/chunks/2117-a.js'] },
          },
          entryCSSFiles: { page: ['static/css/memory.css'] },
        }),
    )
    const result = extractRouteChunkInventory({ '/memory': parsed }, ['/memory'])
    assert.equal(result['/memory'].manifestKey, '/(marketing)/memory/page')
    assert.deepEqual(result['/memory'].files, [
      'static/chunks/2117-a.js',
      'static/chunks/memory.js',
      'static/css/memory.css',
    ])
  })

  it('selects attribution from the run nearest the median LCP', () => {
    const selected = selectRepresentativeAttribution(
      [
        { LCP_seconds: 2.1, attribution: { id: 'fast' } },
        { LCP_seconds: 2.8, attribution: { id: 'median' } },
        { LCP_seconds: 3.4, attribution: { id: 'slow' } },
      ],
      2.8,
    )
    assert.equal(selected.id, 'median')
  })

  it('keeps attribution separate from required aggregate metrics', () => {
    const summary = diagnosticSummary(
      {
        route: '/memory',
        medians: { LCP_seconds: 2.8 },
        attribution: {
          lcp: { element: { selector: 'h1' }, phases: { renderDelayMs: 500 } },
          scripts: { topByTransfer: [], topByExecution: [] },
          network: { totalJavaScriptTransferBytes: 123 },
          mainThread: { longTasks: [] },
        },
      },
      { '/memory': { manifestKey: '/(marketing)/memory/page', files: ['memory.js'] } },
    )
    assert.equal(summary.LCP_seconds, 2.8)
    assert.equal(summary.totalJavaScriptTransferBytes, 123)
    assert.equal(summary.routeChunks.files[0], 'memory.js')
  })
})
