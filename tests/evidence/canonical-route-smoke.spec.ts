import { expect, test } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

const routes = ['/', '/evermind', '/nevermind', '/mastermind', '/docs', '/contact', '/privacy', '/terms'] as const
const cinematicRoutes = new Set<string>(['/', '/evermind', '/nevermind', '/mastermind', '/contact'])
const coreCinematicRoutes = new Set<string>(['/', '/evermind', '/nevermind', '/mastermind'])

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 900 },
] as const

const BLOCKED_PATHS = ['/maintenance', '/error', '/404', '/500', '/not-found']

test.describe('canonical route smoke evidence', () => {
  for (const route of routes) {
    for (const viewport of viewports) {
      test(`${route} renders on its own path at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport)

        const response = await page.goto(new URL(route, baseUrl).toString(), {
          waitUntil: 'domcontentloaded',
        })

        expect(response, `${route} did not return a navigation response`).not.toBeNull()
        expect(response!.status(), `${route} returned ${response!.status()}`).toBeLessThan(400)

        // Assert final pathname — strip optional trailing slash then compare.
        const finalPath = new URL(page.url()).pathname.replace(/\/$/, '') || '/'
        const expectedPath = route.replace(/\/$/, '') || '/'

        for (const blocked of BLOCKED_PATHS) {
          expect(
            finalPath,
            `${route} was redirected to blocked path ${finalPath}`,
          ).not.toBe(blocked)
        }

        expect(
          finalPath,
          `${route} redirected away: expected ${expectedPath}, landed on ${finalPath}`,
        ).toBe(expectedPath)

        const main = page.locator('main').first()
        await expect(main).toBeVisible()

        if (cinematicRoutes.has(route)) {
          if (route === '/' || route === '/contact') {
            await expect(page.locator('[data-cinematic-experience]'), `${route} is missing its cinematic experience`).toHaveCount(1)
          } else {
            await expect(page.locator('.cm-canonical-main'), `${route} is missing its cinematic root`).toHaveCount(1)
            await expect(page.locator('.cm-canonical-main')).toBeVisible()
          }
          await expect(page.locator('nav.cm-nav'), `${route} is missing its cinematic navigation`).toHaveCount(1)
          await expect(page.locator('footer.cm-footer'), `${route} footer contract`).toHaveCount(coreCinematicRoutes.has(route) ? 0 : 1)
        } else {
          const navigation = page.locator('nav.pm-navbar')
          await expect(navigation, `${route} is missing the canonical public navigation`).toHaveCount(1)
          await expect(navigation).toBeVisible()

          const footer = page.locator('footer.pc-footer')
          await expect(footer, `${route} is missing the canonical public footer`).toHaveCount(1)
          await expect(footer).toBeVisible()
          await expect(footer.getByRole('link', { name: 'ProChat home' })).toBeVisible()
        }

        // A non-empty primary heading must be present — proves the page rendered.
        // Pattern is intentionally loose: any word characters suffice to avoid coupling to marketing copy.
        const h1 = page.locator('main h1').first()
        await expect(h1).toBeVisible()
        const headingText = await h1.textContent()
        expect(
          headingText?.trim().length ?? 0,
          `${route} h1 is empty at ${viewport.name}`,
        ).toBeGreaterThan(5)

        // No horizontal document overflow.
        const layout = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        }))

        expect(
          layout.documentWidth,
          `${route} overflows at ${viewport.name}: doc=${layout.documentWidth} vp=${layout.viewportWidth}`,
        ).toBeLessThanOrEqual(layout.viewportWidth)
      })
    }
  }
})

test.describe('contact page visual closeout', () => {
  test('desktop contact intake renders the current V4 composition', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto(new URL('/contact', baseUrl).toString(), { waitUntil: 'networkidle' })

    await expect(page.locator('.cm-contact-page')).toBeVisible()
    await expect(page.locator('.contact-intake-grid')).toBeVisible()
    await expect(page.locator('.contact-form-panel')).toBeVisible()
    await expect(page.getByText('Send the context', { exact: false })).toBeVisible()
    await expect(page.getByText('One brief is enough to start.', { exact: false })).toBeVisible()

    const evidence = await page.evaluate(() => {
      const shell = document.querySelector('.cm-shell') as HTMLElement | null
      const intake = document.querySelector('.contact-intake-grid') as HTMLElement | null
      const panel = document.querySelector('.contact-form-panel') as HTMLElement | null
      const shellStyle = shell ? getComputedStyle(shell) : null
      return {
        shellBackgroundColor: shellStyle?.backgroundColor ?? '',
        shellHeight: shell?.getBoundingClientRect().height ?? 0,
        intakeWidth: intake?.getBoundingClientRect().width ?? 0,
        panelHeight: panel?.getBoundingClientRect().height ?? 0,
        viewportHeight: window.innerHeight,
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
      }
    })

    expect(evidence.shellBackgroundColor).not.toBe('')
    expect(evidence.shellHeight).toBeGreaterThanOrEqual(evidence.viewportHeight)
    expect(evidence.intakeWidth).toBeGreaterThan(600)
    expect(evidence.panelHeight).toBeGreaterThan(300)
    expect(evidence.documentWidth).toBeLessThanOrEqual(evidence.viewportWidth)
  })

  test('mobile contact layout remains contained with shared chrome', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 })
    await page.goto(new URL('/contact', baseUrl).toString(), { waitUntil: 'networkidle' })

    await expect(page.locator('nav.cm-nav')).toBeVisible()
    await expect(page.locator('.contact-intake-grid')).toBeVisible()
    await expect(page.locator('.contact-form-panel')).toBeVisible()
    await expect(page.locator('footer.cm-footer')).toBeVisible()

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  })
})
