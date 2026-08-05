import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { createFixedWindowRateLimiter } from '../../src/lib/security/fixed-window-rate-limit'

describe('createFixedWindowRateLimiter', () => {
  it('allows the first six requests and blocks the seventh', () => {
    const check = createFixedWindowRateLimiter({
      maxRequests: 6,
      windowMs: 60_000,
      now: () => 1_000,
    })

    for (let attempt = 1; attempt <= 6; attempt += 1) {
      assert.deepEqual(check('client-a'), {
        limited: false,
        retryAfterSeconds: 0,
      })
    }

    assert.deepEqual(check('client-a'), {
      limited: true,
      retryAfterSeconds: 60,
    })
  })

  it('resets after the configured window', () => {
    let now = 1_000
    const check = createFixedWindowRateLimiter({
      maxRequests: 1,
      windowMs: 60_000,
      now: () => now,
    })

    assert.equal(check('client-a').limited, false)
    assert.equal(check('client-a').limited, true)

    now += 60_000
    assert.deepEqual(check('client-a'), {
      limited: false,
      retryAfterSeconds: 0,
    })
  })

  it('keeps independent keys isolated', () => {
    const check = createFixedWindowRateLimiter({
      maxRequests: 1,
      windowMs: 60_000,
      now: () => 1_000,
    })

    assert.equal(check('client-a').limited, false)
    assert.equal(check('client-a').limited, true)
    assert.equal(check('client-b').limited, false)
  })

  it('rejects invalid configuration', () => {
    assert.throws(
      () => createFixedWindowRateLimiter({ maxRequests: 0, windowMs: 60_000 }),
      /maxRequests/,
    )
    assert.throws(
      () => createFixedWindowRateLimiter({ maxRequests: 1, windowMs: 0 }),
      /windowMs/,
    )
  })
})
