import { expect, test } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

type RouteCase = {
  path: string
  variant: string
  motif: string
}

const ROUTES: RouteCase[] = [
  { path: '/', variant: 'home', motif: 'orbit' },
  { path: '/memory', variant: 'memory', motif: 'orbit' },
  { path: '/memory-qa', variant: 'review', motif: 'review' },
  { path: '/workbench', variant: 'workbench', motif: 'pipeline' },
  { path: '/docs', variant: 'docs', motif: 'docs' },
  { path: '/docs/saaskit/launch-flow', variant: 'docs', motif: 'docs' },
  { path: '/docs/learn', variant: 'learn', motif: 'learn' },
  { path: '/docs/learn/production-guide', variant: 'learn', motif: 'learn' },
  { path: '/docs/learn/saas-starting-point', variant: 'learn', motif: 'learn' },
  { path: '/contact', variant: 'contact', motif: 'radar' },
  { path: '/privacy', variant: 'legal', motif: 'ledger' },
  { path: '/terms', variant: 'legal', motif: 'ledger' },
  { path: '/buildflow', variant: 'os', motif: 'pipeline' },
  { path: '/systems/prochat-os', variant: 'os', motif: 'pipeline' },
  { path: '/ai-workflows', variant: 'workflow', motif: 'pipeline' },
  { path: '/studio', variant: 'studio', motif: 'canvas' },
  { path: '/kits', variant: 'kits', motif: 'modules' },
  { path: '/kits/prokit', variant: 'kits', motif: 'modules' },
  { path: '/kits/saaskit', variant: 'kits', motif: 'modules' },
  { path: '/kits/uxkit', variant: 'kits', motif: 'modules' },
  { path: '/kits/waaskit', variant: 'kits', motif: 'modules' },
  { path: '/proof', variant: 'proof', motif: 'timeline' },
  { path: '/prompts', variant: 'prompts', motif: 'prompts' },
  { path: '/prompts/execution/validate-this-saas-idea', variant: 'prompts', motif: 'prompts' },
  { path: '/waitlist', variant: 'waitlist', motif: 'queue' },
]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 900 },
] as const

const MOTION_SELECTORS: Record<string, string> = {
  orbit: '.pc-route-orbit',
  review: '.pc-route-review-packet',
  pipeline: '.pc-route-motif--pipeline i',
  radar: '.pc-route-radar-sweep',
  ledger: '.pc-route-ledger-cursor',
  canvas: '.pc-route-canvas-playhead',
  modules: '.pc-route-motif--modules span',
  queue: '.pc-route-motif--queue span',
}

const REDIRECTS = [
  { from: '/prochat-memory', to: '/memory' },
  { from: '/qa-memory', to: '/memory-qa' },
  { from: '/book', to: '/contact' },
  { from: '/starting-point', to: '/workbench' },
  { from: '/waas/accountants', to: '/workbench' },
  { from: '/blog', to: '/docs/learn' },
  { from: '/legal-ai-workflows', to: '/ai-workflows' },
  { from: '/privacy-policy', to: '/privacy' },
  { from: '/tos', to: '/terms' },
  { from: '/waiting-list', to: '/waitlist' },
] as const

function normalizedPath(url: string) {
  return new URL(url).pathname.replace(/\/$/, '') || '/'
}

test.describe('site-wide V4 public route evidence', () => {
  for (const route of ROUTES) {
    for (const viewport of VIEWPORTS) {
      test(`${route.path} uses ${route.variant} at ${viewport.name}`, async ({ page }) => {
        const pageErrors: string[] = []
        const consoleErrors: string[] = []
        page.on('pageerror', error => pageErrors.push(error.message))
        page.on('console', message => {
          if (message.type() === 'error') consoleErrors.push(message.text())
        })

        await page.setViewportSize(viewport)
        const response = await page.goto(new URL(route.path, baseUrl).toString(), {
          waitUntil: 'domcontentloaded',
        })

        expect(response, `${route.path} did not return a response`).not.toBeNull()
        expect(response!.status(), `${route.path} returned ${response!.status()}`).toBeLessThan(400)
        expect(normalizedPath(page.url()), `${route.path} redirected unexpectedly`).toBe(route.path)

        const shell = page.locator('.pc-canonical-shell.pc-public-v4')
        await expect(shell).toHaveCount(1)
        await expect(shell).toHaveAttribute('data-public-variant', route.variant)

        await expect(page.locator('nav.pm-navbar')).toHaveCount(1)
        await expect(page.locator('footer.pc-footer')).toHaveCount(1)
        await expect(page.locator('main')).toHaveCount(1)
        await expect(page.locator('main')).toBeVisible()

        const scene = page.locator(`.pc-route-scene--${route.variant}`)
        await expect(scene).toHaveCount(1)
        await expect(scene.locator(`.pc-route-motif--${route.motif}`)).toHaveCount(1)

        const layout = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        }))
        expect(layout.documentWidth, `${route.path} horizontally overflows`).toBeLessThanOrEqual(layout.viewportWidth)

        expect(pageErrors, `${route.path} page errors: ${pageErrors.join(' | ')}`).toEqual([])
        expect(consoleErrors, `${route.path} console errors: ${consoleErrors.join(' | ')}`).toEqual([])
      })
    }
  }

  test('animated route motifs animate normally and stop under reduced motion', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })

    for (const route of ROUTES) {
      const selector = MOTION_SELECTORS[route.motif]
      if (!selector) continue

      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await page.goto(new URL(route.path, baseUrl).toString(), { waitUntil: 'domcontentloaded' })
      const normalAnimation = await page.locator(selector).first().evaluate(element => getComputedStyle(element).animationName)
      expect(normalAnimation, `${route.path} expected active motif animation`).not.toBe('none')

      await page.emulateMedia({ reducedMotion: 'reduce' })
      const reducedAnimation = await page.locator(selector).first().evaluate(element => getComputedStyle(element).animationName)
      expect(reducedAnimation, `${route.path} animation must stop under reduced motion`).toBe('none')
    }
  })

  for (const redirect of REDIRECTS) {
    test(`${redirect.from} preserves redirect to ${redirect.to}`, async ({ page }) => {
      const response = await page.goto(new URL(redirect.from, baseUrl).toString(), {
        waitUntil: 'domcontentloaded',
      })
      expect(response).not.toBeNull()
      expect(response!.status()).toBeLessThan(400)
      await page.waitForURL(url => normalizedPath(url.toString()) === redirect.to)
      expect(normalizedPath(page.url())).toBe(redirect.to)
    })
  }
})
