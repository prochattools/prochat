import { expect, test } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

const routes = ['/', '/evermind', '/nevermind', '/mastermind', '/docs', '/contact', '/privacy', '/terms'] as const
const cinematicRoutes = new Set<string>(['/evermind', '/nevermind', '/mastermind'])

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

        const main = cinematicRoutes.has(route) ? page.locator('.cpf-root main') : page.locator('main').first()
        await expect(main).toBeVisible()

        if (cinematicRoutes.has(route)) {
          await expect(page.locator('.cpf-root'), `${route} is missing its cinematic root`).toHaveCount(1)
          await expect(page.locator('.cpf-root')).toBeVisible()
          await expect(page.locator('.cpf-nav'), `${route} is missing its cinematic navigation`).toHaveCount(1)
          await expect(page.locator('.cpf-nav')).toBeVisible()
        } else if (route === '/') {
          const navigation = page.locator('nav[aria-label="Primary navigation"]')
          await expect(navigation, 'homepage is missing its cinematic navigation').toHaveCount(1)
          await expect(navigation).toBeVisible()
          await expect(page.locator('nav.pm-navbar')).toHaveCount(0)

          const footer = page.locator('footer.home-cinematic-footer')
          await expect(footer, 'homepage is missing its cinematic footer').toHaveCount(1)
          await expect(footer).toBeVisible()
          await expect(page.locator('footer.pc-footer')).toHaveCount(0)
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

    await expect(page.locator('.contact-body-page')).toBeVisible()
    await expect(page.locator('.contact-intake-grid')).toBeVisible()
    await expect(page.locator('.contact-form-panel')).toBeVisible()
    await expect(page.getByText('Send the context', { exact: false })).toBeVisible()
    await expect(page.getByText('One brief is enough to start.', { exact: false })).toBeVisible()

    const evidence = await page.evaluate(() => {
      const shell = document.querySelector('.pc-canonical-shell') as HTMLElement | null
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

    const backgroundChannels = evidence.shellBackgroundColor.match(/\d+/g)?.map(Number) ?? []
    expect(backgroundChannels.length).toBeGreaterThanOrEqual(3)
    expect(Math.max(...backgroundChannels.slice(0, 3))).toBeLessThanOrEqual(16)
    expect(evidence.shellHeight).toBeGreaterThanOrEqual(evidence.viewportHeight)
    expect(evidence.intakeWidth).toBeGreaterThan(600)
    expect(evidence.panelHeight).toBeGreaterThan(300)
    expect(evidence.documentWidth).toBeLessThanOrEqual(evidence.viewportWidth)
  })

  test('mobile contact layout remains contained with shared chrome', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 })
    await page.goto(new URL('/contact', baseUrl).toString(), { waitUntil: 'networkidle' })

    await expect(page.locator('nav.pm-navbar')).toBeVisible()
    await expect(page.locator('.contact-intake-grid')).toBeVisible()
    await expect(page.locator('.contact-form-panel')).toBeVisible()
    await expect(page.locator('footer.pc-footer')).toBeVisible()

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
  })
})

test.describe('homepage cinematic journey evidence', () => {
  test('homepage owns one cinematic root, three product stages, and one canonical h1', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto(new URL('/', baseUrl).toString(), { waitUntil: 'domcontentloaded' })

    const journey = page.locator('[data-home-cinematic]')
    await expect(page.locator('header.home-cinematic-header')).toHaveCount(1)
    await expect(page.locator('nav[aria-label="Primary navigation"]')).toHaveCount(1)
    await expect(page.locator('nav.pm-navbar')).toHaveCount(0)
    await expect(page.locator('footer.home-cinematic-footer')).toHaveCount(1)
    await expect(page.locator('footer.pc-footer')).toHaveCount(0)
    await expect(page.getByRole('img', { name: 'ProChat logo' }).first()).toBeVisible()
    await expect(journey).toHaveCount(1)
    await expect(journey.locator('.home-cinematic__media')).toHaveCount(1)
    await expect(journey.locator('.home-cinematic__stage')).toHaveCount(3)
    await expect(page.locator('main h1')).toHaveCount(1)
    await expect(page.locator('main h1')).toHaveText('Remember what matters. Direct the work.')
    await expect(page.locator('main')).toContainText('Evermind remembers. Nevermind brings context. Mastermind directs the work.')
    await expect(page.locator('.home-cinematic__stage-label')).toHaveText([
      'Evermind / Memory',
      'Nevermind / Context',
      'Mastermind / Execution',
    ])
    await expect(page.locator('footer.home-cinematic-footer')).toContainText('Local files · Human-reviewed · Portable memory')
    for (const href of ['/evermind', '/nevermind', '/mastermind', '/docs', '/contact', '/privacy', '/terms']) {
      expect(
        await page.locator(`footer.home-cinematic-footer a[href="${href}"]`).count(),
        `homepage footer is missing ${href}`,
      ).toBeGreaterThan(0)
    }

    for (const href of ['/evermind', '/nevermind', '/mastermind']) {
      await expect(journey.locator(`a[href="${href}"]`), `homepage is missing ${href}`).toHaveCount(1)
    }

    await page.evaluate(() => window.scrollTo(0, document.querySelector('[data-home-cinematic]')?.getBoundingClientRect().top ?? 0))
    await page.waitForTimeout(80)
    await expect(journey).toHaveAttribute('data-active-stage', 'evermind')

    await page.evaluate(() => {
      const journey = document.querySelector<HTMLElement>('[data-home-cinematic]')
      if (!journey) return
      const start = journey.getBoundingClientRect().top + window.scrollY
      window.scrollTo(0, start + journey.offsetHeight * 0.5)
    })
    await page.waitForTimeout(80)
    await expect(journey).toHaveAttribute('data-active-stage', 'nevermind')

    const layout = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
      journeyHeight: document.querySelector('[data-home-cinematic]')?.getBoundingClientRect().height ?? 0,
    }))
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
    expect(layout.journeyHeight).toBeGreaterThanOrEqual(2500)
  })

  test('homepage reduced motion keeps every act visible and suppresses scrubbing', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(new URL('/', baseUrl).toString(), { waitUntil: 'domcontentloaded' })

    const journey = page.locator('[data-home-cinematic]')
    await expect(journey.locator('.home-cinematic__stage')).toHaveCount(3)
    for (const stage of await journey.locator('.home-cinematic__stage').all()) {
      await expect(stage).toBeVisible()
      await expect(stage.locator('a')).toBeVisible()
    }

    const initialStage = await journey.getAttribute('data-active-stage')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(80)
    await expect(journey).toHaveAttribute('data-active-stage', initialStage ?? 'evermind')

    const motion = await page.evaluate(() => ({
      canvasDisplay: getComputedStyle(document.querySelector('.home-cinematic__media canvas') as HTMLElement).display,
      sectionPosition: getComputedStyle(document.querySelector('.home-cinematic__sticky') as HTMLElement).position,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }))
    expect(motion.canvasDisplay).toBe('none')
    expect(motion.sectionPosition).toBe('relative')
    expect(motion.documentWidth).toBeLessThanOrEqual(motion.viewportWidth)
    await expect(page.locator('footer.home-cinematic-footer')).toBeVisible()
    await expect(page.locator('footer.home-cinematic-footer a').first()).toBeVisible()
  })

  test('homepage mobile menu opens and closes without duplicating the shell', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 })
    await page.goto(new URL('/', baseUrl).toString(), { waitUntil: 'domcontentloaded' })

    const navigation = page.locator('nav[aria-label="Primary navigation"]')
    const toggle = navigation.locator('button[aria-controls="home-cinematic-mobile-menu"]')
    const menu = page.locator('#home-cinematic-mobile-menu')

    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(menu).toBeHidden()
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link', { name: 'Documentation' })).toBeVisible()

    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(menu).toBeHidden()
    await expect(page.locator('nav[aria-label="Primary navigation"]')).toHaveCount(1)
    await expect(page.locator('footer.home-cinematic-footer')).toHaveCount(1)
  })
})
