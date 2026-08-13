import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { describe, it } from 'node:test'

const baseUrl = process.env.TEST_BASE_URL

if (!baseUrl) {
  throw new Error('TEST_BASE_URL is required')
}

async function readJson(response: Response) {
  return response.json() as Promise<Record<string, unknown>>
}

describe('API security protections', () => {
  describe('GET /api/tenants/projects', () => {
    it('returns exactly 501 with an error-only response', async () => {
      const response = await fetch(`${baseUrl}/api/tenants/projects`)
      assert.equal(response.status, 501)
      assert.deepEqual(await readJson(response), {
        error: 'Authentication and tenant authorization are not yet implemented.',
        detail:
          'This endpoint requires runtime session validation and tenant-scoped authorization.',
      })
    })

    it('contains no Prisma import or project query', async () => {
      const source = await readFile(
        new URL('../../src/app/api/tenants/projects/route.ts', import.meta.url),
        'utf8',
      )
      assert.doesNotMatch(source, /@\/libs\/prisma|\bprisma\b|findMany\s*\(/)
    })
  })

  it('filters a schema-valid Contact honeypot submission', async () => {
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Security Test',
        email: 'contact-honeypot@example.com',
        topic: 'General Question',
        message: 'This schema-valid message is intentionally longer than twenty characters.',
        honeypot: 'filled-by-bot',
      }),
    })

    assert.equal(response.status, 200)
    assert.deepEqual(await readJson(response), {
      success: true,
      spamFiltered: true,
    })
  })

  it('filters a schema-valid Waitlist honeypot submission', async () => {
    const response = await fetch(`${baseUrl}/api/waitlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'waitlist-honeypot@example.com',
        products: ['memory-qa'],
        honeypot: 'filled-by-bot',
      }),
    })

    assert.equal(response.status, 200)
    const body = await readJson(response)
    assert.equal(body.success, true)
    assert.equal(body.spamFiltered, true)
  })

  it('redirects an invalid Preferences token with error=invalid', async () => {
    const formData = new FormData()
    formData.set('token', 'invalid-security-test-token')
    formData.append('products', 'workbench')

    const response = await fetch(`${baseUrl}/api/preferences`, {
      method: 'POST',
      body: formData,
      redirect: 'manual',
    })

    assert.equal(response.status, 303)
    const location = response.headers.get('location')
    assert(location)
    const redirectUrl = new URL(location, baseUrl)
    assert.equal(redirectUrl.pathname, '/preferences')
    assert.equal(redirectUrl.searchParams.get('error'), 'invalid')
  })

  for (const route of [
    '/api/projects',
    '/api/link',
    '/api/active',
    '/api/scenarios',
  ]) {
    it(`fails closed at ${route} with exactly 501`, async () => {
      const response = await fetch(`${baseUrl}${route}`)
      assert.equal(response.status, 501)
    })
  }
})
