import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

describe('API Security Protections', () => {
  const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'

  describe('GET /api/tenants/projects', () => {
    it('returns exactly 501 without authentication', async () => {
      const response = await fetch(`${baseUrl}/api/tenants/projects`, {
        method: 'GET',
      })
      assert.equal(response.status, 501, 'Expected exactly 501 Not Implemented')
    })

    it('returns JSON error message (not project data)', async () => {
      const response = await fetch(`${baseUrl}/api/tenants/projects`, {
        method: 'GET',
      })

      const body = await response.json()
      assert(body.error, 'Response must contain error property')
      assert.strictEqual(
        typeof body.projects,
        'undefined',
        'Response must not contain projects property'
      )
    })

    it('does not contain project metadata in response', async () => {
      const response = await fetch(`${baseUrl}/api/tenants/projects`, {
        method: 'GET',
      })

      const body = await response.json()
      const bodyStr = JSON.stringify(body)
      assert(
        !bodyStr.includes('id') || body.error,
        'Response body should not contain project identifiers'
      )
    })
  })

  describe('POST /api/contact', () => {
    it('rejects honeypot field violations with 400', async () => {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          topic: 'General',
          message: 'Test message',
          honeypot: 'filled', // honeypot field (should be empty)
        }),
      })

      assert.equal(response.status, 400, 'Honeypot violation must return 400')
    })

    it('blocks requests exceeding rate limit (6 per minute per IP)', async () => {
      const payload = {
        name: 'Rate Test',
        email: 'ratetest@example.com',
        topic: 'General',
        message: 'Test',
        honeypot: '',
      }

      const requests = []
      for (let i = 0; i < 8; i++) {
        requests.push(
          fetch(`${baseUrl}/api/contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        )
      }

      const responses = await Promise.all(requests)
      const statusCodes = responses.map((r) => r.status)

      // First 6 should succeed (200), remaining should be rate-limited (429)
      const successCount = statusCodes.filter((s) => s === 200).length
      const blockedCount = statusCodes.filter((s) => s === 429).length

      assert(
        successCount >= 6,
        `Expected at least 6 successful requests, got ${successCount}`
      )
      assert(blockedCount > 0, `Expected rate-limit blocks (429), got none`)
    })
  })

  describe('POST /api/waitlist', () => {
    it('rejects honeypot field violations with 400', async () => {
      const response = await fetch(`${baseUrl}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          products: [],
          honeypot: 'filled', // honeypot field (should be empty)
        }),
      })

      assert.equal(response.status, 400, 'Honeypot violation must return 400')
    })

    it('blocks requests exceeding rate limit (6 per minute per IP)', async () => {
      const payload = {
        email: 'ratetest-waitlist@example.com',
        products: [],
        honeypot: '',
      }

      const requests = []
      for (let i = 0; i < 8; i++) {
        requests.push(
          fetch(`${baseUrl}/api/waitlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          })
        )
      }

      const responses = await Promise.all(requests)
      const statusCodes = responses.map((r) => r.status)

      const successCount = statusCodes.filter((s) => [200, 409].includes(s)).length
      const blockedCount = statusCodes.filter((s) => s === 429).length

      assert(
        successCount >= 6,
        `Expected at least 6 successful requests, got ${successCount}`
      )
      assert(blockedCount > 0, `Expected rate-limit blocks (429), got none`)
    })
  })

  describe('POST /api/preferences', () => {
    it('rejects mutation without valid token', async () => {
      const response = await fetch(`${baseUrl}/api/preferences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'test@example.com',
          preferences: { unsubscribe: true },
        }),
      })

      // Must reject — token is required
      assert(
        [400, 401, 403].includes(response.status),
        `Preferences without token must be rejected (got ${response.status})`
      )
    })
  })

  describe('POST /api/webhook/stripe', () => {
    it('rejects requests with invalid stripe-signature header', async () => {
      const response = await fetch(`${baseUrl}/api/webhook/stripe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': 'invalid_signature',
        },
        body: JSON.stringify({
          type: 'payment_intent.succeeded',
          data: { object: {} },
        }),
      })

      assert.equal(
        response.status,
        400,
        'Invalid Stripe signature must return exactly 400'
      )
    })

    it('rejects requests missing stripe-signature header', async () => {
      const response = await fetch(`${baseUrl}/api/webhook/stripe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'payment_intent.succeeded',
          data: { object: {} },
        }),
      })

      assert.equal(
        response.status,
        400,
        'Missing Stripe signature must return exactly 400'
      )
    })
  })

  describe('Fail-closed protected API routes', () => {
    const failClosedRoutes = [
      { method: 'GET', path: '/api/projects' },
      { method: 'GET', path: '/api/subscription' },
      { method: 'GET', path: '/api/link' },
      { method: 'GET', path: '/api/active' },
      { method: 'GET', path: '/api/scenarios' },
    ]

    failClosedRoutes.forEach(({ method, path }) => {
      it(`${method} ${path} returns exactly 501`, async () => {
        const response = await fetch(`${baseUrl}${path}`, {
          method,
        })

        assert.equal(
          response.status,
          501,
          `${method} ${path} must return exactly 501 (got ${response.status})`
        )
      })
    })
  })
})
