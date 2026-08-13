import { expect, test } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

type RouteCase = {
  path: string
  variant: string
  motif: string
  bodySelector: string
}

const ROUTES: RouteCase[] = [
  { path: '/', variant: 'home', motif: 'orbit', bodySelector: '.hv4-page[data-home-v2]' },
  { path: '/memory', variant: 'memory', motif: 'orbit', bodySelector: ".pm-public-product-page[data-product='memory']" },
  { path: '/memory-qa', variant: 'review', motif: 'review', bodySelector: ".pm-public-product-page[data-product='memory-qa']" },
  { path: '/workbench', variant: 'workbench', motif: 'pipeline', bodySelector: ".pm-public-product-page[data-product='workbench']" },
  { path: '/docs', variant: 'docs', motif: 'docs', bodySelector: '.pc-docs-hub' },
  { path: '/contact', variant: 'contact', motif: 'radar', bodySelector: '.contact-body-page' },
  { path: '/privacy', variant: 'legal', motif: 'ledger', bodySelector: ".pc-legal-ledger[data-legal-kind='privacy']" },
  { path: '/terms', variant: 'legal', motif: 'ledger', bodySelector: ".pc-legal-ledger[data-legal-kind='terms']" },
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
}

const REDIRECTS = [
  { from: '/prochat-memory', to: '/memory' },
  { from: '/qa-memory', to: '/memory-qa' },
  { from: '/book', to: '/contact' },
  { from: '/buildflow', to: '/workbench' },
  { from: '/system/prochat-os', to: '/workbench' },
  { from: '/systems/prochat-os', to: '/workbench' },
  { from: '/starting-point', to: '/workbench' },
  { from: '/waas/accountants', to: '/workbench' },
  { from: '/learn', to: '/docs' },
  { from: '/docs/learn', to: '/docs' },
  { from: '/privacy-policy', to: '/privacy' },
  { from: '/tos', to: '/terms' },
  { from: '/waitlist', to: '/contact' },
  { from: '/waiting-list', to: '/contact' },
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
        const body = page.locator(route.bodySelector)
        await expect(body, `${route.path} is missing its redesigned body marker`).toHaveCount(1)
        await expect(body).toBeVisible()

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
