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
  { path: '/', variant: 'home', motif: 'cinematic', bodySelector: '[data-cinematic-experience]' },
  { path: '/evermind', variant: 'evermind', motif: 'cinematic', bodySelector: '.cm-canonical-main' },
  { path: '/nevermind', variant: 'nevermind', motif: 'cinematic', bodySelector: '.cm-canonical-main' },
  { path: '/mastermind', variant: 'mastermind', motif: 'cinematic', bodySelector: '.cm-canonical-main' },
  { path: '/docs', variant: 'docs', motif: 'docs', bodySelector: '.cm-utility-docs' },
  { path: '/contact', variant: 'contact', motif: 'cinematic', bodySelector: '.cm-utility-contact' },
  { path: '/privacy', variant: 'legal', motif: 'ledger', bodySelector: ".pc-legal-ledger[data-legal-kind='privacy']" },
  { path: '/terms', variant: 'legal', motif: 'ledger', bodySelector: ".pc-legal-ledger[data-legal-kind='terms']" },
]

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 900 },
] as const

const MOTION_SELECTORS: Record<string, string> = {
  orbit: '.pc-route-orbit',
  radar: '.pc-route-radar-sweep',
  ledger: '.pc-route-ledger-cursor',
}

const CORE_CINEMATIC_ROUTES = new Set(['/', '/evermind', '/nevermind', '/mastermind'])
const UTILITY_ROUTES = new Set(['/docs', '/contact', '/privacy', '/terms'])

const REDIRECTS = [
  { from: '/prochat-memory', to: '/evermind' },
  { from: '/qa-memory', to: '/evermind' },
  { from: '/book', to: '/contact' },
  { from: '/workbench', to: '/mastermind' },
  { from: '/buildflow', to: '/mastermind' },
  { from: '/system/prochat-os', to: '/mastermind' },
  { from: '/systems/prochat-os', to: '/mastermind' },
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

        if (CORE_CINEMATIC_ROUTES.has(route.path)) {
          await expect(page.locator('.cm-shell')).toHaveCount(1)
          await expect(page.locator('nav.cm-nav')).toHaveCount(1)
          await expect(page.locator('footer')).toHaveCount(0)
          await expect(page.locator('.cm-shell--core')).toHaveCount(1)
          await expect(page.locator('.cm-marketing-experience')).toHaveCount(1)
          await expect(page.locator('.cm-footer iframe')).toHaveCount(0)
          await expect(page.locator('.pm-navbar,.pc-footer')).toHaveCount(0)
        } else if (UTILITY_ROUTES.has(route.path)) {
          await expect(page.locator('.cm-shell.cm-shell--utility')).toHaveCount(1)
          await expect(page.locator('nav.cm-nav')).toHaveCount(1)
          await expect(page.locator('footer')).toHaveCount(0)
        } else {
          throw new Error(`No route-shell contract configured for ${route.path}`)
        }
        await expect(page.locator('main')).toHaveCount(1)
        await expect(page.locator('main')).toBeVisible()
        const body = page.locator(route.bodySelector)
        await expect(body, `${route.path} is missing its redesigned body marker`).toHaveCount(1)
        await expect(body).toBeVisible()

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
      if (CORE_CINEMATIC_ROUTES.has(route.path)) {
        await page.emulateMedia({ reducedMotion: 'no-preference' })
        await page.goto(new URL(route.path, baseUrl).toString(), { waitUntil: 'domcontentloaded' })
        expect(await page.locator('.cm-video__canvas').evaluate(element => getComputedStyle(element).display), `${route.path} canvas should render normally`).not.toBe('none')
        await page.emulateMedia({ reducedMotion: 'reduce' })
        expect(await page.locator('.cm-video__canvas').evaluate(element => getComputedStyle(element).display), `${route.path} canvas should stop under reduced motion`).toBe('none')
        continue
      }
      if (UTILITY_ROUTES.has(route.path)) continue

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
