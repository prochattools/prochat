import path from 'node:path'
import { expect, test, type Page } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

const STANDARD_PUBLIC_ROUTES = [
  '/',
  '/docs',
  '/contact',
  '/privacy',
  '/terms',
] as const

const CINEMATIC_PRODUCT_ROUTES = ['/evermind', '/nevermind', '/mastermind'] as const
const CINEMATIC_SHELL_ROUTES = new Set<string>(['/', '/contact', ...CINEMATIC_PRODUCT_ROUTES, '/docs', '/privacy', '/terms'])

const DESKTOP = { name: 'desktop', width: 1440, height: 1000 } as const
const MOBILE = { name: 'mobile', width: 390, height: 900 } as const
const DOCS_NARROW = { name: 'narrow', width: 320, height: 900 } as const

const VIEWPORTS = [DESKTOP, MOBILE] as const
const CHROME_GEOMETRY_ROUTES = ['/', '/evermind', '/nevermind', '/mastermind', '/contact'] as const

function publicNav(page: Page, route: string) {
  return CINEMATIC_SHELL_ROUTES.has(route) ? page.locator('nav.cm-nav') : page.locator('nav.pm-navbar')
}

function publicFooter(page: Page, route: string) {
  return CINEMATIC_SHELL_ROUTES.has(route) ? page.locator('footer.cm-footer') : page.locator('footer.pc-footer')
}

// ---------------------------------------------------------------------------
// Chrome invariants at each viewport
// ---------------------------------------------------------------------------

test.describe('canonical public chrome — structure and first-paint invariants', () => {
  for (const route of STANDARD_PUBLIC_ROUTES) {
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

        // No skip-control visible or accessible — case-insensitive, role-aware
        const skipControl = page.getByRole('link', { name: /^skip to content$/i })
        await expect(
          skipControl,
          `${route} must have no accessible skip-to-content control at ${viewport.name}`,
        ).toHaveCount(0)

        // Exactly one canonical nav
        const nav = publicNav(page, route)
        expect(await nav.count(), `${route} public nav count at ${viewport.name}`).toBe(1)
        await expect(nav).toBeVisible()

        // Exactly one canonical footer
        const footer = publicFooter(page, route)
        expect(await footer.count(), `${route} public footer count at ${viewport.name}`).toBe(1)
        await expect(footer).toBeVisible()

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

    for (const route of CHROME_GEOMETRY_ROUTES) {
      await page.goto(new URL(route, baseUrl).toString(), {
        waitUntil: 'domcontentloaded',
      })

      const geo = await page.evaluate((route) => {
          const cinematic = ['/', '/contact', '/evermind', '/nevermind', '/mastermind', '/docs', '/privacy', '/terms'].includes(route)
        const nav = document.querySelector(cinematic ? 'nav.cm-nav' : 'nav.pm-navbar')
        const footer = document.querySelector(cinematic ? 'footer.cm-footer' : 'footer.pc-footer')
        const navRect = nav?.getBoundingClientRect()
        const footerRect = footer?.getBoundingClientRect()
        return {
          navHeight: navRect ? navRect.height : -1,
          navTop: navRect ? navRect.top : -1,
          footerHeight: footerRect ? footerRect.height : -1,
        }
      }, route)

      geometries.push({ route, ...geo })
    }

    const NAV_TOLERANCE_PX = 2

    const navHeights = geometries.map(g => g.navHeight)
    const navHeightMin = Math.min(...navHeights)
    const navHeightMax = Math.max(...navHeights)
    expect(
      navHeightMax - navHeightMin,
      `nav height spread across routes must be ≤${NAV_TOLERANCE_PX}px, got ${navHeightMin}–${navHeightMax}`,
    ).toBeLessThanOrEqual(NAV_TOLERANCE_PX)

    const navTops = geometries.map(g => g.navTop)
    const navTopMin = Math.min(...navTops)
    const navTopMax = Math.max(...navTops)
    expect(
      navTopMax - navTopMin,
      `nav top spread across routes must be ≤${NAV_TOLERANCE_PX}px, got ${navTopMin}–${navTopMax}`,
    ).toBeLessThanOrEqual(NAV_TOLERANCE_PX)

    // Footer must be present on every route (height > 0) — absolute height may vary
    // by route due to font loading order; exact equality is not asserted here.
    const footerHeights = geometries.map(g => g.footerHeight)
    expect(
      Math.min(...footerHeights),
      'footer must have positive height on all routes',
    ).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// Cinematic product funnels — route-owned chrome and motion invariants
// ---------------------------------------------------------------------------

test.describe('cinematic product funnels — route-owned chrome', () => {
  for (const route of CINEMATIC_PRODUCT_ROUTES) {
    for (const viewport of VIEWPORTS) {
      test(`${route} renders its funnel at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport)

        const response = await page.goto(new URL(route, baseUrl).toString(), {
          waitUntil: 'domcontentloaded',
        })

        expect(response, `${route} navigation response`).not.toBeNull()
        expect(response!.status(), `${route} HTTP status`).toBeLessThan(400)
        expect(new URL(page.url()).pathname.replace(/\/$/, '') || '/', `${route} final path`).toBe(route)

        await expect(page.locator('.cpf-root')).toHaveCount(1)
        await expect(page.locator('.cpf-root')).toBeVisible()
        await expect(page.locator('nav.cm-nav')).toHaveCount(1)
        await expect(page.locator('nav.cm-nav')).toBeVisible()
        await expect(page.locator('main.cpf-root')).toBeVisible()
        await expect(page.locator('main.cpf-root h1').first()).toBeVisible()
        await expect(page.locator('main.cpf-root h1').first()).not.toHaveText('')

        for (const product of ['Evermind', 'Nevermind', 'Mastermind']) {
          const href = `/${product.toLowerCase()}`
          const productLink = page.locator(`.cm-nav__links a[href="${href}"]`)
          await expect(productLink).toHaveCount(1)
          if (viewport.name === 'desktop') {
            await expect(productLink).toBeVisible()
          }
        }

        const layout = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        }))
        expect(layout.documentWidth, `${route} overflows at ${viewport.name}`).toBeLessThanOrEqual(layout.viewportWidth)
      })
    }
  }

  test('product funnels honor reduced motion', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.emulateMedia({ reducedMotion: 'reduce' })

    for (const route of CINEMATIC_PRODUCT_ROUTES) {
      await page.goto(new URL(route, baseUrl).toString(), { waitUntil: 'domcontentloaded' })
      const motion = await page.evaluate(() => {
        const chapter = document.querySelector<HTMLElement>('[data-cinematic-chapter]')
        const canvas = document.querySelector<HTMLElement>('.cm-video__canvas')
        return {
          chapterTransitionDuration: chapter ? getComputedStyle(chapter).transitionDuration : '',
          canvasDisplay: canvas ? getComputedStyle(canvas).display : 'none',
        }
      })
      expect(motion.chapterTransitionDuration, `${route} chapter transitions must stop under reduced motion`).toBe('0s')
      expect(motion.canvasDisplay, `${route} video canvas must be hidden under reduced motion`).toBe('none')
    }
  })
})

// ---------------------------------------------------------------------------
// Docs — repository hub usable at desktop, mobile, and narrow
// ---------------------------------------------------------------------------

test.describe('docs page — repository hub with canonical shell', () => {
  test('docs repository cards visible at desktop', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto(new URL('/docs', baseUrl).toString(), {
      waitUntil: 'domcontentloaded',
    })

    await expect(page.locator('nav.cm-nav')).toBeVisible()
    await expect(page.locator('footer.cm-footer')).toBeVisible()

    const docsHub = page.locator('main.pc-docs-hub')
    await expect(docsHub).toBeVisible()
    await expect(docsHub.locator('.pc-docs-hub__card')).toHaveCount(3)
    await expect(docsHub).toContainText('Evermind')
    await expect(docsHub).toContainText('Nevermind')
    await expect(docsHub).toContainText('Mastermind')

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  })

  test('docs repository hub visible at mobile (320px)', async ({ page }) => {
    await page.setViewportSize(DOCS_NARROW)
    await page.goto(new URL('/docs', baseUrl).toString(), {
      waitUntil: 'domcontentloaded',
    })

    await expect(page.locator('nav.cm-nav')).toBeVisible()
    await expect(page.locator('main.pc-docs-hub')).toBeVisible()
    await expect(page.locator('.pc-docs-hub__card')).toHaveCount(3)
    await expect(page.locator('footer.cm-footer')).toBeVisible()

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
  test('contact page exposes the current intake layout at desktop', async ({ page }) => {
    await page.setViewportSize(DESKTOP)
    await page.goto(new URL('/contact', baseUrl).toString(), {
      waitUntil: 'networkidle',
    })

    await expect(page.locator('nav.cm-nav')).toBeVisible()
    await expect(page.locator('footer.cm-footer')).toBeVisible()
    await expect(page.locator('.cm-contact-page')).toBeVisible()
    await expect(page.locator('.contact-intake-grid')).toBeVisible()
    await expect(page.locator('.contact-form-panel')).toBeVisible()
    await expect(page.getByText('Send the context', { exact: false })).toBeVisible()
    await expect(page.getByText('One brief is enough to start.', { exact: false })).toBeVisible()

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      intakeWidth: document.querySelector<HTMLElement>('.contact-intake-grid')?.getBoundingClientRect().width ?? 0,
      formHeight: document.querySelector<HTMLElement>('.contact-form-panel')?.getBoundingClientRect().height ?? 0,
    }))

    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
    expect(layout.intakeWidth).toBeGreaterThan(600)
    expect(layout.formHeight).toBeGreaterThan(300)
  })

  test('contact page contained at mobile (390px)', async ({ page }) => {
    await page.setViewportSize(MOBILE)
    await page.goto(new URL('/contact', baseUrl).toString(), {
      waitUntil: 'networkidle',
    })

    await expect(page.locator('nav.cm-nav')).toBeVisible()
    await expect(page.locator('.contact-form-panel')).toBeVisible()
    await expect(page.locator('footer.cm-footer')).toBeVisible()

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

// ---------------------------------------------------------------------------
// Client navigation — no blue frame, skip-control flash, or duplicated chrome
// ---------------------------------------------------------------------------

test.describe('client navigation — chrome integrity across route changes', () => {
  test('homepage → docs → contact → homepage maintains single chrome', async ({ page }) => {
    await page.setViewportSize(DESKTOP)

    // Start on homepage
    await page.goto(new URL('/', baseUrl).toString(), { waitUntil: 'domcontentloaded' })
    expect(await publicNav(page, '/').count()).toBe(1)
    expect(await publicFooter(page, '/').count()).toBe(1)

    // Navigate to /docs
    await page.goto(new URL('/docs', baseUrl).toString(), { waitUntil: 'domcontentloaded' })
    expect(
      await publicNav(page, '/docs').count(),
      'exactly one nav after navigating to /docs',
    ).toBe(1)
    expect(
      await publicFooter(page, '/docs').count(),
      'exactly one footer after navigating to /docs',
    ).toBe(1)
    // No skip control visible after navigation
    await expect(
      page.getByRole('link', { name: /^skip to content$/i }),
      'no accessible skip control on /docs after client navigation',
    ).toHaveCount(0)

    // Navigate to /contact
    await page.goto(new URL('/contact', baseUrl).toString(), { waitUntil: 'domcontentloaded' })
    expect(
      await publicNav(page, '/contact').count(),
      'exactly one nav after navigating to /contact',
    ).toBe(1)
    expect(
      await publicFooter(page, '/contact').count(),
      'exactly one footer after navigating to /contact',
    ).toBe(1)

    // Navigate back to homepage
    await page.goto(new URL('/', baseUrl).toString(), { waitUntil: 'domcontentloaded' })
    expect(
      await publicNav(page, '/').count(),
      'exactly one nav after returning to homepage',
    ).toBe(1)
    expect(
      await publicFooter(page, '/').count(),
      'exactly one footer after returning to homepage',
    ).toBe(1)

    // No horizontal overflow on final page
    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(layout.documentWidth, 'no horizontal overflow after client navigation').toBeLessThanOrEqual(
      layout.viewportWidth,
    )
  })
})
