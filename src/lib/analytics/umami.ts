export type AnalyticsPayloadValue =
  | string
  | number
  | boolean
  | null
  | undefined

export type AnalyticsPayload = Record<string, AnalyticsPayloadValue>

export type AnalyticsEventName =
  | 'lead_magnet_view'
  | 'lead_magnet_submit'
  | 'lead_magnet_success'
  | 'waitlist_view'
  | 'waitlist_submit'
  | 'waitlist_success'
  | 'nav_cta_click'
  | 'product_cta_click'
  | 'pricing_view'
  | 'checkout_start'
  | 'checkout_success'
  | 'checkout_cancel'
  | 'contact_submit'
  | 'blog_cta_click'
  | 'outbound_funnel_click'

type UmamiTracker = {
  track?: (event: string, data?: AnalyticsPayload) => void
}

const isDev = process.env.NODE_ENV === 'development'
const FLUSH_INTERVAL_MS = 500
const MAX_FLUSH_ATTEMPTS = 20
const pendingEvents: Array<{ name: AnalyticsEventName; payload: AnalyticsPayload }> = []
let flushTimer: number | null = null
let flushAttempts = 0

function isBrowser() {
  return typeof window !== 'undefined'
}

function getUmamiTracker() {
  if (!isBrowser()) return null

  return (
    window as typeof window & {
      umami?: UmamiTracker
    }
  ).umami
}

function getStorageKey(key: string) {
  return `umami:${key}`
}

function sendToUmami(tracker: UmamiTracker, name: AnalyticsEventName, payload: AnalyticsPayload) {
  if (Object.keys(payload).length > 0) {
    tracker.track?.(name, payload)
  } else {
    tracker.track?.(name)
  }
}

function clearFlushTimer() {
  if (!isBrowser() || flushTimer === null) return
  window.clearTimeout(flushTimer)
  flushTimer = null
}

function scheduleFlush() {
  if (!isBrowser() || flushTimer !== null || pendingEvents.length === 0) {
    return
  }

  flushTimer = window.setTimeout(() => {
    flushTimer = null
    flushPendingEvents()
  }, FLUSH_INTERVAL_MS)
}

function flushPendingEvents() {
  if (!isBrowser() || pendingEvents.length === 0) {
    clearFlushTimer()
    return
  }

  const umami = getUmamiTracker()
  if (typeof umami?.track !== 'function') {
    flushAttempts += 1
    if (flushAttempts < MAX_FLUSH_ATTEMPTS) {
      scheduleFlush()
      return
    }

    if (isDev) {
      console.warn('[umami] tracker unavailable, dropping queued events', pendingEvents)
    }
    pendingEvents.length = 0
    clearFlushTimer()
    return
  }

  flushAttempts = 0
  clearFlushTimer()

  while (pendingEvents.length > 0) {
    const nextEvent = pendingEvents.shift()
    if (!nextEvent) continue
    sendToUmami(umami, nextEvent.name, nextEvent.payload)
  }
}

export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  if (!isBrowser()) return

  const umami = getUmamiTracker()
  if (typeof umami?.track === 'function') {
    sendToUmami(umami, name, payload)
    flushPendingEvents()
    return
  }

  pendingEvents.push({ name, payload })
  scheduleFlush()

  if (isDev) {
    console.debug('[umami:queued]', name, payload)
  }
}

export function trackEventOncePerSession(
  name: AnalyticsEventName,
  key: string,
  payload: AnalyticsPayload = {},
) {
  if (!isBrowser()) return

  try {
    const storageKey = getStorageKey(key)
    if (window.sessionStorage.getItem(storageKey)) {
      return
    }

    trackEvent(name, payload)
    window.sessionStorage.setItem(storageKey, '1')
  } catch {
    trackEvent(name, payload)
  }
}
