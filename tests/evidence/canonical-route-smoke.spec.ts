import { expect, test } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

const routes = ['/', '/memory', '/memory-qa', '/workbench', '/docs', '/contact', '/privacy', '/terms'] as const

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

        await expect(page.locator('main')).toBeVisible()

        const navigation = page.locator('nav.pm-navbar')
        await expect(navigation, `${route} is missing the canonical public navigation`).toHaveCount(1)
        await expect(navigation).toBeVisible()

        const footer = page.locator('footer.pc-footer')
        await expect(footer, `${route} is missing the canonical public footer`).toHaveCount(1)
        await expect(footer).toBeVisible()
        await expect(footer.getByRole('link', { name: 'ProChat home' })).toBeVisible()

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
  test('desktop contact form is centered on a neutral full-height background', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto(new URL('/contact', baseUrl).toString(), { waitUntil: 'networkidle' })

    const evidence = await page.evaluate(() => {
      const shell = document.querySelector('.pc-canonical-shell') as HTMLElement | null
      const main = document.querySelector('.contact-page-main') as HTMLElement | null
      const panel = document.querySelector('.contact-form-panel') as HTMLElement | null
      const shellStyle = shell ? getComputedStyle(shell) : null
      const mainStyle = main ? getComputedStyle(main) : null
      const panelRect = panel?.getBoundingClientRect()

      return {
        shellBackgroundColor: shellStyle?.backgroundColor ?? '',
        shellHeight: shell?.getBoundingClientRect().height ?? 0,
        mainDisplay: mainStyle?.display ?? '',
        mainJustifyContent: mainStyle?.justifyContent ?? '',
        formCenterY: panelRect ? panelRect.top + panelRect.height / 2 : 0,
        panelVisible: Boolean(panel && panelRect && panelRect.height > 0),
        viewportCenterY: window.innerHeight / 2,
        viewportHeight: window.innerHeight,
      }
    })

    // Shell background is neutral black (canonical public surface)
    const backgroundChannels = evidence.shellBackgroundColor.match(/\d+/g)?.map(Number) ?? []
    expect(backgroundChannels.length).toBeGreaterThanOrEqual(3)
    expect(Math.max(...backgroundChannels.slice(0, 3))).toBeLessThanOrEqual(16)
    // Shell fills at least the viewport
    expect(evidence.shellHeight).toBeGreaterThanOrEqual(evidence.viewportHeight)
    // Contact main is a column flex with vertical centering
    expect(evidence.mainDisplay).toBe('flex')
    expect(evidence.mainJustifyContent).toBe('center')
    // Form panel is visible
    expect(evidence.panelVisible, 'contact form panel exists and is visible').toBe(true)
    // Form is centered within the visible area
    expect(Math.abs(evidence.formCenterY - evidence.viewportCenterY)).toBeLessThan(
      evidence.viewportHeight * 0.4,
    )
  })

  test('mobile contact layout remains contained with shared chrome', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 })
    await page.goto(new URL('/contact', baseUrl).toString(), { waitUntil: 'networkidle' })

    await expect(page.locator('nav.pm-navbar')).toBeVisible()
    await expect(page.locator('.contact-form-panel')).toBeVisible()
    await expect(page.locator('footer.pc-footer')).toBeVisible()

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  })
})
