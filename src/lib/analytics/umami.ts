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

export function trackEvent(
  name: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  if (!isBrowser()) return

  const umami = getUmamiTracker()
  if (typeof umami?.track === 'function') {
    if (Object.keys(payload).length > 0) {
      umami.track(name, payload)
    } else {
      umami.track(name)
    }
    return
  }

  const gtag = (
    window as typeof window & {
      gtag?: (...args: unknown[]) => void
    }
  ).gtag
  if (typeof gtag === 'function') {
    gtag('event', name, payload)
    return
  }

  const plausible = (
    window as typeof window & {
      plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void
    }
  ).plausible
  if (typeof plausible === 'function') {
    plausible(name, { props: payload })
    return
  }

  const analyticsTrack = (
    window as typeof window & {
      analytics?: {
        track?: (event: string, props?: AnalyticsPayload) => void
      }
    }
  ).analytics?.track
  if (typeof analyticsTrack === 'function') {
    analyticsTrack(name, payload)
    return
  }

  if (isDev) {
    console.debug('[analytics]', name, payload)
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
