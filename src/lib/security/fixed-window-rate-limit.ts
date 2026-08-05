export type FixedWindowRateLimitEntry = {
  count: number
  resetAt: number
}

export type FixedWindowRateLimitResult = {
  limited: boolean
  retryAfterSeconds: number
}

type FixedWindowRateLimiterOptions = {
  maxRequests: number
  windowMs: number
  store?: Map<string, FixedWindowRateLimitEntry>
  now?: () => number
}

export function createFixedWindowRateLimiter({
  maxRequests,
  windowMs,
  store = new Map<string, FixedWindowRateLimitEntry>(),
  now = Date.now,
}: FixedWindowRateLimiterOptions) {
  if (!Number.isInteger(maxRequests) || maxRequests < 1) {
    throw new Error('maxRequests must be a positive integer')
  }

  if (!Number.isFinite(windowMs) || windowMs <= 0) {
    throw new Error('windowMs must be a positive number')
  }

  return function checkRateLimit(key: string): FixedWindowRateLimitResult {
    const timestamp = now()
    const current = store.get(key)

    if (!current || current.resetAt <= timestamp) {
      store.set(key, {
        count: 1,
        resetAt: timestamp + windowMs,
      })
      return { limited: false, retryAfterSeconds: 0 }
    }

    if (current.count >= maxRequests) {
      return {
        limited: true,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((current.resetAt - timestamp) / 1000),
        ),
      }
    }

    current.count += 1
    store.set(key, current)
    return { limited: false, retryAfterSeconds: 0 }
  }
}
