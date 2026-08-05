import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

const baseUrl = process.env.TEST_BASE_URL

if (!baseUrl) {
  throw new Error('TEST_BASE_URL is required')
}

async function readJson(response: Response) {
  return response.json() as Promise<Record<string, unknown>>
}

describe('Legacy compatibility routes and APIs', () => {
  describe('API equivalence: /api/waiting-list vs /api/waitlist', () => {
    it('/api/waiting-list POST has same behavior as /api/waitlist', async () => {
      // Both endpoints should accept the same schema
      const schema = {
        email: 'legacy-compat-test@example.com',
        products: ['uxkit'],
      }

      const response1 = await fetch(`${baseUrl}/api/waiting-list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schema),
      })

      const response2 = await fetch(`${baseUrl}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schema),
      })

      // Both should succeed
      assert.equal(response1.status, 200, '/api/waiting-list should return 200')
      assert.equal(response2.status, 200, '/api/waitlist should return 200')

      const data1 = await readJson(response1)
      const data2 = await readJson(response2)

      // Both should have success field
      assert.equal(data1.success, true, '/api/waiting-list response should have success: true')
      assert.equal(data2.success, true, '/api/waitlist response should have success: true')
    })

    it('/api/waiting-list inherits rate limiting from /api/waitlist', async () => {
      const schema = {
        email: 'rate-limit-test-waiting-list@example.com',
        products: ['uxkit'],
      }

      // Submit 7 requests to /api/waiting-list (should allow 6, block 7th)
      const results = []
      for (let i = 0; i < 7; i++) {
        const response = await fetch(`${baseUrl}/api/waiting-list`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(schema),
        })
        results.push(response.status)
      }

      // First 6 should succeed
      assert.equal(results.slice(0, 6).every(s => s === 200), true, 'First 6 requests should succeed (200)')
      // 7th should be rate-limited
      assert.equal(results[6], 429, '7th request should be rate-limited (429)')
    })

    it('/api/waiting-list rejects same honeypot schema as /api/waitlist', async () => {
      const honeypotSchema = {
        email: 'honeypot-test@example.com',
        products: ['uxkit'],
        website: 'filled-by-bot',
      }

      const response = await fetch(`${baseUrl}/api/waiting-list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(honeypotSchema),
      })

      assert.equal(response.status, 200)
      const data = await readJson(response)
      assert.equal(data.spamFiltered, true, 'honeypot submission should be filtered')
    })
  })

  describe('Redirect routes backward compatibility', () => {
    it('/legal-ai-workflows redirects to /ai-workflows', async () => {
      const response = await fetch(`${baseUrl}/legal-ai-workflows`, {
        redirect: 'manual',
      })

      // Should be a redirect (30x)
      assert(
        response.status >= 300 && response.status < 400,
        '/legal-ai-workflows should redirect (3xx status)',
      )
      const location = response.headers.get('location')
      assert(location?.includes('/ai-workflows'), `redirect location should point to /ai-workflows, got ${location}`)
    })
  })

  describe('Legacy route accessibility', () => {
    it('/book page is accessible and returns 200', async () => {
      const response = await fetch(`${baseUrl}/book`)
      assert.equal(response.status, 200, '/book should return 200')
    })

    it('/learn page is accessible and returns 200', async () => {
      const response = await fetch(`${baseUrl}/learn`)
      assert.equal(response.status, 200, '/learn should return 200')
    })

    it('/proof page is accessible and returns 200', async () => {
      const response = await fetch(`${baseUrl}/proof`)
      assert.equal(response.status, 200, '/proof should return 200')
    })

    it('/starting-point page is accessible and returns 200', async () => {
      const response = await fetch(`${baseUrl}/starting-point`)
      assert.equal(response.status, 200, '/starting-point should return 200')
    })

    it('/ai-workflows page is accessible and returns 200', async () => {
      const response = await fetch(`${baseUrl}/ai-workflows`)
      assert.equal(response.status, 200, '/ai-workflows should return 200')
    })

    it('/systems/prochat-os page is accessible and returns 200', async () => {
      const response = await fetch(`${baseUrl}/systems/prochat-os`)
      assert.equal(response.status, 200, '/systems/prochat-os should return 200')
    })

    it('/systems/events page is accessible and returns 200', async () => {
      const response = await fetch(`${baseUrl}/systems/events`)
      assert.equal(response.status, 200, '/systems/events should return 200')
    })

    it('/waas/accountants page is accessible and returns 200', async () => {
      const response = await fetch(`${baseUrl}/waas/accountants`)
      assert.equal(response.status, 200, '/waas/accountants should return 200')
    })
  })

  describe('Empty stub directories return 404', () => {
    it('/guides returns 404', async () => {
      const response = await fetch(`${baseUrl}/guides`)
      assert.equal(response.status, 404, '/guides stub should return 404')
    })

    it('/guides/topic/slug returns 404', async () => {
      const response = await fetch(`${baseUrl}/guides/test-topic/test-slug`)
      assert.equal(response.status, 404, '/guides/[topic]/[slug] stub should return 404')
    })

    it('/playbooks returns 404', async () => {
      const response = await fetch(`${baseUrl}/playbooks`)
      assert.equal(response.status, 404, '/playbooks stub should return 404')
    })

    it('/snippets returns 404', async () => {
      const response = await fetch(`${baseUrl}/snippets`)
      assert.equal(response.status, 404, '/snippets stub should return 404')
    })

    it('/glossary returns 404', async () => {
      const response = await fetch(`${baseUrl}/glossary`)
      assert.equal(response.status, 404, '/glossary stub should return 404')
    })

    it('/bb returns 404', async () => {
      const response = await fetch(`${baseUrl}/bb`)
      assert.equal(response.status, 404, '/bb stub should return 404')
    })
  })
})
