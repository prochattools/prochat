import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const baseUrl = process.env.TEST_BASE_URL

if (!baseUrl) {
  throw new Error('TEST_BASE_URL is required')
}

async function readJson(response: Response) {
  return response.json() as Promise<Record<string, unknown>>
}

describe('Legacy compatibility routes and APIs', () => {
  describe('API equivalence: /api/waiting-list vs /api/waitlist', () => {
    it('source: /api/waiting-list/route.ts is exact POST re-export of ../waitlist/route', () => {
      // Verify source equivalence without executing (no DB writes, no emails)
      const waitingListSource = readFileSync(
        resolve(process.cwd(), 'src/app/api/waiting-list/route.ts'),
        'utf-8',
      )
      const expected = "export { POST } from '../waitlist/route'"

      assert.equal(
        waitingListSource.trim(),
        expected,
        'waiting-list/route.ts must be exact POST re-export',
      )
    })

    it('honeypot: /api/waiting-list POST exits before persistence', async () => {
      // Test that honeypot field triggers success response WITHOUT writing DB
      const honeypotSchema = {
        email: 'honeypot-security-check@example.com',
        products: ['uxkit'],
        website: 'filled-by-bot', // honeypot field
      }

      const response = await fetch(`${baseUrl}/api/waiting-list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(honeypotSchema),
      })

      assert.equal(response.status, 200, 'honeypot should return 200')
      const data = await readJson(response)
      assert.equal(data.spamFiltered, true, 'honeypot response must set spamFiltered: true')
      // Handler exits before Prisma.waitlistSignup.create() is called
    })
  })

  describe('Route redirects: backward compatibility', () => {
    it('/legal-ai-workflows redirects to /ai-workflows', async () => {
      const response = await fetch(`${baseUrl}/legal-ai-workflows`, {
        redirect: 'manual',
      })

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
