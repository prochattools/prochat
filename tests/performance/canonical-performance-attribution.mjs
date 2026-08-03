import { basename } from 'node:path'

const LCP_AUDIT_IDS = [
  'largest-contentful-paint-element',
  'lcp-breakdown-insight',
  'lcp-discovery-insight',
  'largest-contentful-paint',
]

const ROUTE_MANIFEST_KEYS = {
  '/': ['/page'],
  '/memory': ['/(marketing)/memory/page'],
  '/memory-qa': ['/(marketing)/memory-qa/page'],
  '/workbench': ['/(marketing)/workbench/page'],
  '/docs': ['/docs/[[...mdxPath]]/page'],
  '/contact': ['/(marketing)/contact/page'],
  '/privacy': ['/(marketing)/privacy/page'],
  '/terms': ['/(marketing)/terms/page'],
}

function finiteNonNegative(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value : null
}

function normalizeText(value, fallback = 'unavailable') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function traceEventsFromArtifacts(artifacts) {
  if (Array.isArray(artifacts?.Trace?.traceEvents)) return artifacts.Trace.traceEvents
  if (Array.isArray(artifacts?.traces?.defaultPass?.traceEvents)) {
    return artifacts.traces.defaultPass.traceEvents
  }
  return []
}

function traceEventData(event) {
  return event?.args?.data ?? {}
}

function traceNodeSelector(nodeName) {
  if (typeof nodeName !== 'string' || !nodeName.trim()) return 'unavailable'
  const tag = nodeName.match(/^([A-Za-z][A-Za-z0-9-]*)/)?.[1]?.toLowerCase()
  const id = nodeName.match(/\bid=['"]([^'"]+)['"]/)?.[1]
  if (!tag) return 'unavailable'
  return id ? `${tag}#${id}` : tag
}

function traceElementType(candidate) {
  const data = traceEventData(candidate)
  const explicit = `${data.type ?? ''}`.toLowerCase()
  if (explicit === 'text' || explicit === 'image') return explicit
  const nodeName = `${data.nodeName ?? ''}`
  if (/^IMG\b|^PICTURE\b|^VIDEO\b/i.test(nodeName)) return 'image'
  if (/^SVG\b/i.test(nodeName)) return 'svg'
  if (/^H[1-6]\b|^P\b|^SPAN\b|^A\b|^BUTTON\b|^LABEL\b/i.test(nodeName)) return 'text'
  return nodeName ? 'unknown' : 'unavailable'
}

function microsecondsToMilliseconds(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 ? value / 1000 : null
}

export function extractTraceLcpAttribution(artifacts) {
  const events = traceEventsFromArtifacts(artifacts)
  const navigations = events
    .filter((event) => {
      if (event?.name !== 'navigationStart') return false
      const data = traceEventData(event)
      return data.isOutermostMainFrame === true && typeof data.documentLoaderURL === 'string' && data.documentLoaderURL.length > 0
    })
    .sort((a, b) => a.ts - b.ts)

  const navigation = navigations[0]
  if (!navigation) {
    return {
      available: false,
      navigationId: 'unavailable',
      navigationUrl: 'unavailable',
      frame: 'unavailable',
      candidateCount: 0,
      candidateIndexes: [],
      replacementObserved: false,
      finalCandidate: null,
      timings: {
        navigationToFcpMs: null,
        navigationToLcpMs: null,
        fcpToLcpMs: null,
      },
    }
  }

  const navigationData = traceEventData(navigation)
  const navigationId = navigationData.navigationId
  const candidates = events
    .filter((event) => {
      if (event?.name !== 'largestContentfulPaint::Candidate') return false
      const data = traceEventData(event)
      return data.navigationId === navigationId && data.isOutermostMainFrame === true
    })
    .sort((a, b) => {
      const indexA = finiteNonNegative(traceEventData(a).candidateIndex) ?? -1
      const indexB = finiteNonNegative(traceEventData(b).candidateIndex) ?? -1
      return indexA - indexB || a.ts - b.ts
    })
  const finalCandidate = candidates.at(-1) ?? null
  const finalData = traceEventData(finalCandidate)
  const fcp = events.find(
    (event) => event?.name === 'firstContentfulPaint' && traceEventData(event).navigationId === navigationId,
  )
  const navigationToFcpMs = fcp ? microsecondsToMilliseconds(fcp.ts - navigation.ts) : null
  const navigationToLcpMs = finalCandidate
    ? microsecondsToMilliseconds(finalCandidate.ts - navigation.ts)
    : null
  const fcpToLcpMs = fcp && finalCandidate
    ? microsecondsToMilliseconds(finalCandidate.ts - fcp.ts)
    : null

  return {
    available: Boolean(finalCandidate),
    navigationId: normalizeText(navigationId),
    navigationUrl: normalizeText(navigationData.documentLoaderURL),
    frame: normalizeText(navigation.args?.frame),
    candidateCount: candidates.length,
    candidateIndexes: candidates.map((candidate) => finiteNonNegative(traceEventData(candidate).candidateIndex)),
    replacementObserved: candidates.length > 1,
    finalCandidate: finalCandidate
      ? {
          candidateIndex: finiteNonNegative(finalData.candidateIndex),
          nodeId: finiteNonNegative(finalData.nodeId ?? finalData.DOMNodeId),
          nodeName: normalizeText(finalData.nodeName),
          selector: traceNodeSelector(finalData.nodeName),
          type: traceElementType(finalCandidate),
          size: finiteNonNegative(finalData.size),
          timestampUs: finiteNonNegative(finalCandidate.ts),
        }
      : null,
    timings: {
      navigationToFcpMs,
      navigationToLcpMs,
      fcpToLcpMs,
    },
  }
}

function walkValues(value, visit, seen = new Set()) {
  if (!value || typeof value !== 'object' || seen.has(value)) return
  seen.add(value)
  visit(value)
  if (Array.isArray(value)) {
    for (const item of value) walkValues(item, visit, seen)
    return
  }
  for (const child of Object.values(value)) walkValues(child, visit, seen)
}

export function classifyLcpElement(node) {
  if (!node || typeof node !== 'object') return 'unavailable'
  const snippet = `${node.snippet ?? ''}`.trim().toLowerCase()
  const label = `${node.nodeLabel ?? ''}`.trim().toLowerCase()
  const tagName = `${node.tagName ?? ''}`.trim().toLowerCase()
  const combined = `${tagName} ${snippet} ${label}`

  if (tagName === 'img' || /<img\b/.test(snippet) || /image/.test(label)) return 'image'
  if (tagName === 'svg' || /<svg\b/.test(snippet)) return 'svg'
  if (/background-image|url\(/.test(combined)) return 'image'
  if (/^h[1-6]$/.test(tagName) || ['p', 'span', 'a', 'button', 'label'].includes(tagName)) return 'text'
  if (/<(?:h[1-6]|p|span|a|button|label)\b/.test(snippet)) return 'text'
  if (tagName === 'div' || tagName === 'section' || tagName === 'main' || /<(?:div|section|main)\b/.test(snippet)) {
    return 'container'
  }
  return combined.trim() ? 'unknown' : 'unavailable'
}

export function normalizeLcpNode(node) {
  if (!node || typeof node !== 'object') {
    return {
      selector: 'unavailable',
      snippet: 'unavailable',
      nodeLabel: 'unavailable',
      resourceUrl: 'unavailable',
      elementType: 'unavailable',
    }
  }

  const resourceUrl =
    node.url ?? node.src ?? node.currentSrc ?? node.resourceUrl ?? node.lcpResourceUrl ?? 'unavailable'

  return {
    selector: normalizeText(node.selector ?? node.path),
    snippet: normalizeText(node.snippet),
    nodeLabel: normalizeText(node.nodeLabel ?? node.label),
    resourceUrl: normalizeText(resourceUrl),
    elementType: classifyLcpElement(node),
  }
}

function findBestLcpNode(audits) {
  let best = null
  for (const id of LCP_AUDIT_IDS) {
    const audit = audits[id]
    if (!audit) continue
    walkValues(audit.details, (value) => {
      if (best) return
      const candidate = value.node ?? value.element ?? value.lcpElement
      if (candidate && typeof candidate === 'object') best = candidate
      if (!best && value.type === 'node') best = value
    })
    if (best) break
  }
  return best
}

const PHASE_ALIASES = [
  ['ttfbMs', ['ttfb', 'timeToFirstByte', 'time-to-first-byte', 'serverResponseTime']],
  ['loadDelayMs', ['loadDelay', 'resourceLoadDelay', 'load-delay']],
  ['loadDurationMs', ['loadTime', 'loadDuration', 'resourceLoadDuration', 'load-duration']],
  ['renderDelayMs', ['renderDelay', 'elementRenderDelay', 'render-delay']],
]

function assignPhase(phases, key, value) {
  const normalized = finiteNonNegative(value)
  if (normalized === null || phases[key] !== null) return
  phases[key] = normalized
}

function extractNamedPhase(phases, value) {
  const label = `${value.label ?? value.phase ?? value.name ?? value.groupLabel ?? ''}`.toLowerCase()
  const numeric = value.duration ?? value.timing ?? value.value ?? value.numericValue
  if (!label || finiteNonNegative(numeric) === null) return
  if (/time to first byte|ttfb/.test(label)) assignPhase(phases, 'ttfbMs', numeric)
  else if (/load delay|resource load delay/.test(label)) assignPhase(phases, 'loadDelayMs', numeric)
  else if (/load duration|load time|resource load duration/.test(label)) assignPhase(phases, 'loadDurationMs', numeric)
  else if (/render delay|element render delay/.test(label)) assignPhase(phases, 'renderDelayMs', numeric)
}

export function extractLcpPhases(audits) {
  const phases = {
    ttfbMs: null,
    loadDelayMs: null,
    loadDurationMs: null,
    renderDelayMs: null,
  }

  for (const id of ['lcp-breakdown-insight', 'largest-contentful-paint-element', 'largest-contentful-paint']) {
    const audit = audits[id]
    if (!audit) continue
    walkValues(audit, (value) => {
      for (const [phase, aliases] of PHASE_ALIASES) {
        for (const alias of aliases) {
          if (Object.hasOwn(value, alias)) assignPhase(phases, phase, value[alias])
        }
      }
      extractNamedPhase(phases, value)
    })
  }

  return phases
}

function summarizeAudit(id, audit) {
  if (!audit) return null
  return {
    id,
    title: normalizeText(audit.title),
    displayValue: normalizeText(audit.displayValue),
    numericValue: finiteNonNegative(audit.numericValue),
    detailsType: normalizeText(audit.details?.type),
  }
}

function extractDiscovery(audits) {
  const audit = audits['lcp-discovery-insight']
  const discovery = {
    auditAvailable: Boolean(audit),
    preloadDiscoverable: null,
    lazyLoaded: null,
    priorityHinted: null,
  }
  if (!audit) return discovery

  walkValues(audit.details, (value) => {
    for (const [key, target] of [
      ['shouldPreloadImage', 'preloadDiscoverable'],
      ['isLinkPreload', 'preloadDiscoverable'],
      ['wasLazyLoaded', 'lazyLoaded'],
      ['loading', 'lazyLoaded'],
      ['fetchPriority', 'priorityHinted'],
    ]) {
      if (!Object.hasOwn(value, key)) continue
      const raw = value[key]
      if (target === 'lazyLoaded') {
        if (typeof raw === 'boolean') discovery.lazyLoaded = raw
        if (typeof raw === 'string') discovery.lazyLoaded = raw.toLowerCase() === 'lazy'
      } else if (target === 'priorityHinted') {
        if (typeof raw === 'boolean') discovery.priorityHinted = raw
        if (typeof raw === 'string') discovery.priorityHinted = raw.toLowerCase() === 'high'
      } else if (typeof raw === 'boolean') discovery.preloadDiscoverable = raw
    }
  })
  return discovery
}

export function normalizeNetworkRequests(items = []) {
  const seen = new Set()
  const normalized = []
  for (const item of items) {
    if (!item || typeof item !== 'object' || typeof item.url !== 'string') continue
    const request = {
      url: item.url,
      filename: basename(new URL(item.url, 'http://localhost').pathname) || '/',
      transferSize: finiteNonNegative(item.transferSize) ?? 0,
      resourceSize: finiteNonNegative(item.resourceSize) ?? 0,
      statusCode: finiteNonNegative(item.statusCode),
      resourceType: normalizeText(item.resourceType, 'unknown'),
      mimeType: normalizeText(item.mimeType, 'unknown'),
      initiatorType: normalizeText(item.initiatorType ?? item.initiator?.type, 'unknown'),
      startTime: finiteNonNegative(item.networkRequestTime ?? item.startTime),
      endTime: finiteNonNegative(item.networkEndTime ?? item.endTime),
    }
    const identity = JSON.stringify([
      request.url,
      request.statusCode,
      request.startTime,
      request.endTime,
      request.transferSize,
      request.resourceSize,
    ])
    if (seen.has(identity)) continue
    seen.add(identity)
    normalized.push(request)
  }

  return normalized.sort((a, b) => {
    const startA = a.startTime ?? Number.MAX_SAFE_INTEGER
    const startB = b.startTime ?? Number.MAX_SAFE_INTEGER
    return startA - startB || a.url.localeCompare(b.url)
  })
}

export function topScriptsByTransfer(networkRequests, limit = 10) {
  return networkRequests
    .filter((request) => {
      const url = request.url.toLowerCase()
      return request.resourceType.toLowerCase() === 'script' || request.mimeType.includes('javascript') || /\.m?js(?:\?|$)/.test(url)
    })
    .sort((a, b) => b.transferSize - a.transferSize || a.url.localeCompare(b.url))
    .slice(0, limit)
}

export function normalizeBootupItems(items = [], limit = 10) {
  return items
    .filter((item) => item && typeof item.url === 'string')
    .map((item) => ({
      url: item.url,
      filename: basename(new URL(item.url, 'http://localhost').pathname) || '/',
      totalMs: finiteNonNegative(item.total) ?? 0,
      scriptingMs: finiteNonNegative(item.scripting) ?? 0,
      scriptParseCompileMs: finiteNonNegative(item.scriptParseCompile) ?? 0,
      transferSize: finiteNonNegative(item.transferSize) ?? 0,
    }))
    .sort((a, b) => b.totalMs - a.totalMs || a.url.localeCompare(b.url))
    .slice(0, limit)
}

function normalizeMainThreadItems(items = []) {
  return items
    .map((item) => ({
      group: normalizeText(item.groupLabel ?? item.group, 'unknown'),
      durationMs: finiteNonNegative(item.duration) ?? 0,
    }))
    .sort((a, b) => b.durationMs - a.durationMs || a.group.localeCompare(b.group))
}

function normalizeLongTasks(items = []) {
  return items
    .map((item) => ({
      url: normalizeText(item.url),
      startTimeMs: finiteNonNegative(item.startTime),
      durationMs: finiteNonNegative(item.duration) ?? 0,
    }))
    .sort((a, b) => b.durationMs - a.durationMs || a.url.localeCompare(b.url))
}

function auditItems(audits, id) {
  return Array.isArray(audits[id]?.details?.items) ? audits[id].details.items : []
}

export function extractPerformanceAttribution(lhr, artifacts = null) {
  const audits = lhr?.audits ?? {}
  const artifactKeys = artifacts && typeof artifacts === 'object' ? Object.keys(artifacts).sort() : []
  const traceEvents = Array.isArray(artifacts?.Trace?.traceEvents)
    ? artifacts.Trace.traceEvents.length
    : Array.isArray(artifacts?.traces?.defaultPass?.traceEvents)
      ? artifacts.traces.defaultPass.traceEvents.length
      : null
  const devtoolsLogEntries = Array.isArray(artifacts?.DevtoolsLog)
    ? artifacts.DevtoolsLog.length
    : Array.isArray(artifacts?.devtoolsLogs?.defaultPass)
      ? artifacts.devtoolsLogs.defaultPass.length
      : null
  const traceLcp = extractTraceLcpAttribution(artifacts)
  const auditLcpNode = normalizeLcpNode(findBestLcpNode(audits))
  const traceCandidate = traceLcp.finalCandidate
  const lcpNode = traceCandidate
    ? {
        selector: traceCandidate.selector,
        snippet: 'unavailable',
        nodeLabel: traceCandidate.nodeName,
        resourceUrl: 'unavailable',
        elementType: traceCandidate.type,
        nodeId: traceCandidate.nodeId,
        size: traceCandidate.size,
      }
    : auditLcpNode
  const networkRequests = normalizeNetworkRequests(auditItems(audits, 'network-requests'))
  const bootupItems = normalizeBootupItems(auditItems(audits, 'bootup-time'))
  const allScriptsByTransfer = topScriptsByTransfer(networkRequests, Number.MAX_SAFE_INTEGER)
  const topTransferScripts = allScriptsByTransfer.slice(0, 10)
  const cssAndJsRequests = networkRequests.filter((request) => {
    const type = request.resourceType.toLowerCase()
    return type === 'script' || type === 'stylesheet' || /\.(?:m?js|css)(?:\?|$)/i.test(request.url)
  })

  return {
    artifacts: {
      available: artifactKeys.length > 0,
      keys: artifactKeys,
      traceEventCount: traceEvents,
      devtoolsLogEntryCount: devtoolsLogEntries,
    },
    lcp: {
      element: lcpNode,
      phases: extractLcpPhases(audits),
      rawTrace: traceLcp,
      discovery: extractDiscovery(audits),
      availableAudits: LCP_AUDIT_IDS.map((id) => summarizeAudit(id, audits[id])).filter(Boolean),
      candidateReplacementEvidence: traceLcp.available
        ? {
            observed: traceLcp.replacementObserved,
            candidateCount: traceLcp.candidateCount,
            candidateIndexes: traceLcp.candidateIndexes,
          }
        : 'unavailable',
    },
    mainThread: {
      breakdown: normalizeMainThreadItems(auditItems(audits, 'mainthread-work-breakdown')),
      bootup: bootupItems,
      longTasks: normalizeLongTasks(auditItems(audits, 'long-tasks')),
      unusedJavaScript: auditItems(audits, 'unused-javascript'),
      renderBlockingResources: auditItems(audits, 'render-blocking-resources'),
      networkDependencyTree: summarizeAudit('network-dependency-tree-insight', audits['network-dependency-tree-insight']),
    },
    scripts: {
      topByTransfer: topTransferScripts,
      topByExecution: bootupItems,
    },
    network: {
      requests: networkRequests,
      cssAndJsRequests,
      totalJavaScriptTransferBytes: allScriptsByTransfer.reduce((sum, item) => sum + item.transferSize, 0),
    },
  }
}

export function selectRepresentativeAttribution(rawRuns, medianLcp) {
  const candidates = rawRuns.filter(
    (run) => Number.isFinite(run?.LCP_seconds) && run.attribution && typeof run.attribution === 'object',
  )
  if (candidates.length === 0) return null
  return candidates
    .slice()
    .sort((a, b) => {
      const distance = Math.abs(a.LCP_seconds - medianLcp) - Math.abs(b.LCP_seconds - medianLcp)
      return distance || a.LCP_seconds - b.LCP_seconds
    })[0].attribution
}

export function parseClientReferenceManifest(source) {
  if (typeof source !== 'string') return null
  const assignment = source.indexOf('={')
  if (assignment < 0) return null
  const routeKey = source.match(/__RSC_MANIFEST\["([^"]+)"\]/)?.[1] ?? 'unavailable'
  try {
    return {
      routeKey,
      manifest: JSON.parse(source.slice(assignment + 1)),
    }
  } catch {
    return null
  }
}

function clientReferenceFiles(parsed) {
  const manifest = parsed?.manifest ?? parsed
  if (!manifest || typeof manifest !== 'object') return []
  const javascript = Object.values(manifest.clientModules ?? {})
    .flatMap((entry) => (Array.isArray(entry?.chunks) ? entry.chunks : []))
    .filter((file) => typeof file === 'string' && (file.includes('/') || /\.m?js$/i.test(file)))
  const css = Object.values(manifest.entryCSSFiles ?? {})
    .flatMap((files) => (Array.isArray(files) ? files : []))
    .filter((file) => typeof file === 'string')
  return [...new Set([...javascript, ...css])].sort()
}

export function extractRouteChunkInventory(manifests, routes) {
  const pages = manifests?.pages
  const result = {}
  for (const route of routes) {
    if (pages && typeof pages === 'object') {
      const candidates = ROUTE_MANIFEST_KEYS[route] ?? []
      const key = candidates.find((candidate) => Array.isArray(pages[candidate]))
      result[route] = {
        manifestKey: key ?? 'unavailable',
        files: [...new Set(key ? pages[key] : [])].sort(),
      }
      continue
    }

    const parsed = manifests?.[route] ?? null
    result[route] = {
      manifestKey: parsed?.routeKey ?? 'unavailable',
      files: clientReferenceFiles(parsed),
    }
  }
  return result
}

export function diagnosticSummary(routeResult, routeChunkInventory) {
  const attribution = routeResult.attribution
  if (!attribution) return null
  const topTransfer = attribution.scripts.topByTransfer[0] ?? null
  const topExecution = attribution.scripts.topByExecution[0] ?? null
  return {
    route: routeResult.route,
    LCP_seconds: routeResult.medians.LCP_seconds,
    lcpElement: attribution.lcp.element,
    lcpPhases: attribution.lcp.phases,
    rawTraceTimings: attribution.lcp.rawTrace?.timings ?? {
      navigationToFcpMs: null,
      navigationToLcpMs: null,
      fcpToLcpMs: null,
    },
    lcpCandidateCount: attribution.lcp.rawTrace?.candidateCount ?? 0,
    lcpReplacementObserved: attribution.lcp.rawTrace?.replacementObserved ?? false,
    topScriptByTransfer: topTransfer,
    topScriptByExecution: topExecution,
    totalJavaScriptTransferBytes: attribution.network.totalJavaScriptTransferBytes,
    longTaskCount: attribution.mainThread.longTasks.length,
    routeChunks: routeChunkInventory?.[routeResult.route] ?? { manifestKey: 'unavailable', files: [] },
  }
}
