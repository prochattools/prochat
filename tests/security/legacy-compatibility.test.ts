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

describe('Lean compatibility routes and APIs', () => {
  describe('API equivalence: /api/waiting-list vs /api/waitlist', () => {
    it('source: /api/waiting-list/route.ts is exact POST re-export of ../waitlist/route', () => {
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
      const response = await fetch(`${baseUrl}/api/waiting-list`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'honeypot-security-check@example.com',
          products: ['memory-qa'],
          company_website: 'filled-by-bot',
        }),
      })

      assert.equal(response.status, 200, 'honeypot should return 200')
      const data = await readJson(response)
      assert.equal(data.spamFiltered, true, 'honeypot response must set spamFiltered: true')
    })
  })

  describe('Intentional compatibility redirects', () => {
    for (const route of [
      { path: 'src/app/book/page.tsx', expected: "redirect('/contact')" },
      { path: 'src/app/starting-point/page.tsx', expected: "redirect('/workbench')" },
      { path: 'src/app/waas/accountants/page.tsx', expected: "redirect('/workbench')" },
      {
        path: 'src/app/waitlist/page.tsx',
        expected: "redirect('/contact?topic=memory-qa-beta#contact-form-card')",
      },
    ]) {
      it(`${route.path} keeps its lean redirect`, () => {
        const source = readFileSync(resolve(process.cwd(), route.path), 'utf-8')
        assert(
          source.includes(route.expected),
          `${route.path} must include ${route.expected}, got: ${source.trim()}`,
        )
      })
    }

    for (const route of [
      { from: '/buildflow', to: '/workbench' },
      { from: '/systems/prochat-os', to: '/workbench' },
      { from: '/learn', to: '/docs' },
      { from: '/docs/learn', to: '/docs' },
      { from: '/waiting-list', to: '/contact' },
    ]) {
      it(`${route.from} resolves into ${route.to}`, async () => {
        const response = await fetch(`${baseUrl}${route.from}`)
        assert.equal(response.status, 200, `${route.from} should resolve successfully`)
        assert.equal(new URL(response.url).pathname, route.to)
      })
    }
  })

  describe('Retired public products do not render', () => {
    for (const route of [
      '/ai-workflows',
      '/legal-ai-workflows',
      '/proof',
      '/studio',
      '/kits',
      '/kits/prokit',
      '/kits/saaskit',
      '/kits/uxkit',
      '/kits/waaskit',
      '/prompts',
      '/docs/saaskit/launch-flow',
    ]) {
      it(`${route} returns 404`, async () => {
        const response = await fetch(`${baseUrl}${route}`)
        assert.equal(response.status, 404, `${route} must not render a retired product page`)
      })
    }
  })

  describe('Empty legacy stub directories remain unavailable', () => {
    for (const route of [
      '/guides',
      '/guides/test-topic/test-slug',
      '/playbooks',
      '/snippets',
      '/glossary',
      '/bb',
    ]) {
      it(`${route} returns 404`, async () => {
        const response = await fetch(`${baseUrl}${route}`)
        assert.equal(response.status, 404, `${route} should remain unavailable`)
      })
    }
  })
})
