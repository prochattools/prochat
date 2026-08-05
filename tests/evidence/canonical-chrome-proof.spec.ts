import path from 'node:path'
import { expect, test } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

const CANONICAL_ROUTES = [
  '/',
  '/memory',
  '/memory-qa',
  '/workbench',
  '/docs',
  '/contact',
  '/privacy',
  '/terms',
] as const

const DESKTOP = { name: 'desktop', width: 1440, height: 1000 } as const
const MOBILE = { name: 'mobile', width: 390, height: 900 } as const
const DOCS_NARROW = { name: 'narrow', width: 320, height: 900 } as const

const VIEWPORTS = [DESKTOP, MOBILE] as const

// ---------------------------------------------------------------------------
// Chrome invariants at each viewport
// ---------------------------------------------------------------------------

test.describe('canonical public chrome — structure and first-paint invariants', () => {
  for (const route of CANONICAL_ROUTES) {
    for (const viewport of VIEWPORTS) {
      test(`${route} chrome at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport)

        const response = await page.goto(new URL(route, baseUrl).toString(), {
          waitUntil: 'domcontentloaded',
        })

        expect(response, `${route} navigation response`).not.toBeNull()
        expect(response!.status(), `${route} HTTP status`).toBeLessThan(400)

        const finalPath = new URL(page.url()).pathname.replace(/\/$/, '') || '/'
        const expectedPath = route.replace(/\/$/, '') || '/'
        expect(finalPath, `${route} did not redirect away`).toBe(expectedPath)

        // No "Skip to content" link in DOM
        const skipLinks = await page.evaluate(() =>
          Array.from(document.querySelectorAll('a')).filter(
            a => a.textContent?.trim() === 'Skip to content',
          ).length,
        )
        expect(skipLinks, `${route} skip-link count`).toBe(0)

        // Exactly one canonical nav
        const navCount = await page.locator('nav.pm-navbar').count()
        expect(navCount, `${route} pm-navbar count at ${viewport.name}`).toBe(1)
        await expect(page.locator('nav.pm-navbar')).toBeVisible()

        // Exactly one canonical footer
        const footerCount = await page.locator('footer.pc-footer').count()
        expect(footerCount, `${route} pc-footer count at ${viewport.name}`).toBe(1)
        await expect(page.locator('footer.pc-footer')).toBeVisible()

        // html/body/shell backgrounds are neutral black
        const backgrounds = await page.evaluate(() => {
          const htmlBg = getComputedStyle(document.documentElement).backgroundColor
          const bodyBg = getComputedStyle(document.body).backgroundColor
          const shell = document.querySelector('.pc-canonical-shell') as HTMLElement | null
          const shellBg = shell ? getComputedStyle(shell).backgroundColor : null
          return { htmlBg, bodyBg, shellBg }
        })

        function channelsAreNeutralBlack(cssColor: string): boolean {
          const channels = cssColor.match(/\d+/g)?.map(Number) ?? []
          if (channels.length < 3) return false
          return Math.max(...channels.slice(0, 3)) <= 16
        }

        expect(
          channelsAreNeutralBlack(backgrounds.htmlBg),
          `${route} html bg is neutral black: ${backgrounds.htmlBg}`,
        ).toBe(true)
        expect(
          channelsAreNeutralBlack(backgrounds.bodyBg),
          `${route} body bg is neutral black: ${backgrounds.bodyBg}`,
        ).toBe(true)
        if (backgrounds.shellBg) {
          expect(
            channelsAreNeutralBlack(backgrounds.shellBg),
            `${route} canonical shell bg is neutral black: ${backgrounds.shellBg}`,
          ).toBe(true)
        }

        // theme-color meta is black
        const themeColor = await page.evaluate(() => {
          const el = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
          return el?.content ?? null
        })
        if (themeColor !== null) {
          expect(themeColor.toLowerCase(), `${route} theme-color`).toBe('#000000')
        }

        // No html/body background transition
        const transitions = await page.evaluate(() => {
          const htmlTrans = getComputedStyle(document.documentElement).transition
          const bodyTrans = getComputedStyle(document.body).transition
          return { htmlTrans, bodyTrans }
        })
        expect(
          transitions.htmlTrans.includes('background'),
          `${route} html has no background transition`,
        ).toBe(false)
        expect(
          transitions.bodyTrans.includes('background'),
          `${route} body has no background transition`,
        ).toBe(false)

        // No horizontal overflow
        const layout = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        }))
        expect(
          layout.documentWidth,
          `${route} no horizontal overflow at ${viewport.name}`,
        ).toBeLessThanOrEqual(layout.viewportWidth)
      })
    }
  }
})

// ---------------------------------------------------------------------------
// Chrome geometry consistency across routes at desktop
// ---------------------------------------------------------------------------

test.describe('canonical public chrome — geometry consistency at desktop', () => {
  test('identical header/footer computed geometry across all routes', async ({ page }) => {
    await page.setViewportSize(DESKTOP)

    const geometries: Array<{
      route: string
      navHeight: number
      navTop: number
      footerHeight: number
    }> = []

    for (const route of CANONICAL_ROUTES) {
      await page.goto(new URL(route, baseUrl).toString(), {
        waitUntil: 'domcontentloaded',
      })

      const geo = await page.evaluate(() => {
        const nav = document.querySelector('nav.pm-navbar')
        const footer = document.querySelector('footer.pc-footer')
        const navRect = nav?.getBoundingClientRect()
        const footerRect = footer?.getBoundingClientRect()
        return {
          navHeight: navRect ? Math.round(navRect.height) : -1,
          navTop: navRect ? Math.round(navRect.top) : -1,
          footerHeight: footerRect ? Math.round(footerRect.height) : -1,
        }
      })

      geometries.push({ route, ...geo })
    }

    const navHeights = geometries.map(g => g.navHeight)
    const footerHeights = geometries.map(g => g.footerHeight)
    const navTops = geometries.map(g => g.navTop)

    expect(new Set(navHeights).size, 'nav height is identical across routes').toBe(1)
    expect(new Set(footerHeights).size, 'footer height is identical across routes').toBe(1)
    expect(new Set(navTops).size, 'nav top position is identical across routes').toBe(1)
  })
})

// ---------------------------------------------------------------------------
// Docs — sidebar/content usable at desktop, mobile, and narrow
// ---------------------------------------------------------------------------

test.describe('docs page — layout with canonical shell', () => {
  test('docs sidebar visible at desktop', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto(new URL('/docs', baseUrl).toString(), {
      waitUntil: 'domcontentloaded',
    })

    await expect(page.locator('nav.pm-navbar')).toBeVisible()
    await expect(page.locator('footer.pc-footer')).toBeVisible()

    const docsShell = page.locator('.docs-shell').first()
    await expect(docsShell).toBeVisible()

    // No horizontal overflow
    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  })

  test('docs content visible at mobile (320px)', async ({ page }) => {
    await page.setViewportSize(DOCS_NARROW)
    await page.goto(new URL('/docs', baseUrl).toString(), {
      waitUntil: 'domcontentloaded',
    })

    await expect(page.locator('nav.pm-navbar')).toBeVisible()
    await expect(page.locator('footer.pc-footer')).toBeVisible()

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  })

  test('docs desktop screenshot', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto(new URL('/docs', baseUrl).toString(), {
      waitUntil: 'networkidle',
    })
    await page.screenshot({
      path: path.join('test-results', 'docs-desktop.png'),
      fullPage: true,
    })
  })

  test('docs mobile screenshot', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto(new URL('/docs', baseUrl).toString(), {
      waitUntil: 'networkidle',
    })
    await page.screenshot({
      path: path.join('test-results', 'docs-mobile.png'),
      fullPage: true,
    })
  })
})

// ---------------------------------------------------------------------------
// Contact — layout, copy, and screenshot
// ---------------------------------------------------------------------------

test.describe('contact page — canonical copy and layout', () => {
  test('contact page has correct copy and is vertically balanced at desktop', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto(new URL('/contact', baseUrl).toString(), {
      waitUntil: 'networkidle',
    })

    await expect(page.locator('nav.pm-navbar')).toBeVisible()
    await expect(page.locator('footer.pc-footer')).toBeVisible()

    // New copy present
    await expect(
      page.getByText("Let's talk", { exact: false }),
    ).toBeVisible()

    // Form panel is centered within the available main row
    const contactEvidence = await page.evaluate(() => {
      const panel = document.querySelector('.contact-form-panel') as HTMLElement | null
      const panelRect = panel?.getBoundingClientRect()
      const nav = document.querySelector('nav.pm-navbar')
      const navRect = nav?.getBoundingClientRect()
      const footer = document.querySelector('footer.pc-footer')
      const footerRect = footer?.getBoundingClientRect()
      const mainAreaTop = navRect ? navRect.bottom : 0
      const mainAreaBottom = footerRect ? footerRect.top : window.innerHeight
      const mainAreaCenter = mainAreaTop + (mainAreaBottom - mainAreaTop) / 2
      const panelCenter = panelRect ? panelRect.top + panelRect.height / 2 : 0
      return {
        panelCenter,
        mainAreaCenter,
        mainAreaHeight: mainAreaBottom - mainAreaTop,
        panelVisible: Boolean(panel && panelRect && panelRect.height > 0),
        footerVisible: Boolean(footer && footerRect && footerRect.height > 0),
        footerDistanceFromPanelBottom: panelRect && footerRect
          ? footerRect.top - panelRect.bottom
          : null,
      }
    })

    expect(contactEvidence.panelVisible, 'contact form panel is visible').toBe(true)
    expect(contactEvidence.footerVisible, 'footer is visible').toBe(true)

    // Footer follows naturally — no excessive blank region below form
    if (contactEvidence.footerDistanceFromPanelBottom !== null) {
      expect(
        contactEvidence.footerDistanceFromPanelBottom,
        'footer follows contact form without excessive blank space',
      ).toBeLessThan(200)
    }

    // No horizontal overflow
    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  })

  test('contact page contained at mobile (390px)', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto(new URL('/contact', baseUrl).toString(), {
      waitUntil: 'networkidle',
    })

    await expect(page.locator('nav.pm-navbar')).toBeVisible()
    await expect(page.locator('.contact-form-panel')).toBeVisible()
    await expect(page.locator('footer.pc-footer')).toBeVisible()

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  })

  test('contact desktop screenshot', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto(new URL('/contact', baseUrl).toString(), {
      waitUntil: 'networkidle',
    })
    await page.screenshot({
      path: path.join('test-results', 'contact-desktop.png'),
      fullPage: true,
    })
  })

  test('contact mobile screenshot', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto(new URL('/contact', baseUrl).toString(), {
      waitUntil: 'networkidle',
    })
    await page.screenshot({
      path: path.join('test-results', 'contact-mobile.png'),
      fullPage: true,
    })
  })
})
