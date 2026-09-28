import path from 'node:path'

import { expect, test, type Page } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) throw new Error('WAVE1_BASE_URL is required')

const CINEMATIC_ROUTES = ['/', '/evermind', '/nevermind', '/mastermind'] as const
const GEOMETRY_POINTS = Array.from({ length: 21 }, (_, index) => index / 20)
const SCREENSHOT_VIEWPORTS = [
  ['1600x1000', 1600, 1000],
  ['1440x900', 1440, 900],
  ['1280x800', 1280, 800],
  ['1024x768', 1024, 768],
  ['834x1194', 834, 1194],
  ['768x1024', 768, 1024],
  ['430x932', 430, 932],
  ['390x844', 390, 844],
  ['375x812', 375, 812],
] as const

function url(route: string) {
  return new URL(route, baseUrl).toString()
}

async function settle(page: Page) {
  await page.waitForTimeout(520)
}

async function scrollInstantly(page: Page, y: number) {
  await page.evaluate(target => window.scrollTo({ top: target, behavior: 'instant' }), y)
}

test.describe('cinematic marketing experience', () => {
  test('owns one exact shared shell, template, and media engine per route', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })

    for (const route of CINEMATIC_ROUTES) {
      const response = await page.goto(url(route), { waitUntil: 'networkidle' })
      expect(response?.status(), `${route} response`).toBe(200)

      const evidence = await page.evaluate(() => ({
        headers: document.querySelectorAll('header').length,
        primaryNav: document.querySelectorAll('nav[aria-label="Primary navigation"]').length,
        footers: document.querySelectorAll('footer').length,
        h1: document.querySelectorAll('main h1').length,
        experience: document.querySelectorAll('[data-cinematic-experience]').length,
        chapters: document.querySelectorAll('[data-cinematic-chapter]').length,
        mediaRoots: document.querySelectorAll('.cm-video').length,
        canvases: document.querySelectorAll('.cm-video__canvas').length,
        videos: document.querySelectorAll('.cm-video video').length,
        legacyNav: document.querySelectorAll('.pm-navbar,.cpf-nav').length,
        legacyFooter: document.querySelectorAll('.pc-footer').length,
        statusIframe: document.querySelectorAll('.cm-footer iframe').length,
        coreShell: document.querySelectorAll('.cm-shell--core').length,
        navRadius: getComputedStyle(document.querySelector('.cm-nav') as HTMLElement).borderRadius,
        overflow: document.documentElement.scrollWidth > window.innerWidth,
      }))

      expect(evidence).toEqual({
        headers: 1,
        primaryNav: 1,
        footers: 0,
        h1: 1,
        experience: 1,
        chapters: 2,
        mediaRoots: 1,
        canvases: 1,
        videos: 1,
        legacyNav: 0,
        legacyFooter: 0,
        statusIframe: 0,
        coreShell: 1,
        navRadius: '0px',
        overflow: false,
      })
    }
  })

  test('uses the supplied copy and the same data-driven template on all four routes', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })

    const expected = {
      '/': ['Remember what matters. Direct the work.', 'Evermind remembers. Nevermind brings context. Mastermind directs the work.'],
      '/evermind': ["Your AI forgets. Your memory shouldn't.", 'CAPTURE · REVIEW · RETRIEVE'],
      '/nevermind': ['The right context. At the right time.', 'CONTEXT ON DEMAND'],
      '/mastermind': ['Turn intent into controlled execution.', 'REASON · DELEGATE · VALIDATE'],
    } as const

    for (const route of CINEMATIC_ROUTES) {
      await page.goto(url(route), { waitUntil: 'networkidle' })
      const [h1, marker] = expected[route]
      await expect(page.locator('main h1')).toHaveText(h1)
      await expect(page.locator('main')).toContainText(marker)
      if (route === '/') await expect(page.locator('main')).toContainText(expected['/'][1])
    }
  })

  test('mobile navigation opens, exposes product routes, and remains usable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(url('/'), { waitUntil: 'networkidle' })

    await scrollInstantly(page, 240)
    const header = page.locator('.cm-nav-shell')
    await expect(header).toHaveAttribute('data-scrolled', 'true')
    const scrolledSurface = await header.evaluate(element => ({
      background: getComputedStyle(element).backgroundColor,
      blur: getComputedStyle(element).backdropFilter,
    }))
    expect(scrolledSurface.background).toBe('rgba(255, 255, 255, 0.14)')
    expect(scrolledSurface.blur).toContain('blur(')
    await scrollInstantly(page, 0)
    await expect(header).toHaveAttribute('data-scrolled', 'false')
    const topSurface = await header.evaluate(element => getComputedStyle(element).backgroundColor)
    expect(topSurface).toBe('rgba(0, 0, 0, 0)')

    const menu = page.getByRole('button', { name: 'Menu' })
    await expect(menu).toBeVisible()
    await menu.click()
    const closeMenu = page.getByRole('button', { name: 'Close' })
    await expect(closeMenu).toHaveAttribute('aria-expanded', 'true')
    await expect(page.locator('#cm-mobile-menu')).toBeVisible()
    await page.locator('#cm-mobile-menu').getByRole('link', { name: 'Mastermind' }).click()
    await expect(page).toHaveURL(/\/mastermind$/)
    await expect(page.locator('main h1')).toHaveText('Turn intent into controlled execution.')
    await expect(page.locator('header')).toHaveCount(1)
    await expect(page.locator('nav[aria-label="Primary navigation"]')).toHaveCount(1)
    await expect(page.locator('footer')).toHaveCount(0)

    await page.getByRole('button', { name: 'Menu' }).click()
    await page.locator('#cm-mobile-menu').getByRole('link', { name: 'Evermind', exact: true }).click()
    await expect(page).toHaveURL(/\/evermind$/)
    await expect(page.locator('main h1')).toHaveText("Your AI forgets. Your memory shouldn't.")
    await expect(page.locator('header')).toHaveCount(1)
    await expect(page.locator('footer')).toHaveCount(0)

    await page.goBack()
    await expect(page).toHaveURL(/\/mastermind$/)
    await expect(page.locator('main h1')).toHaveText('Turn intent into controlled execution.')
    await expect(page.locator('header')).toHaveCount(1)
    await expect(page.locator('footer')).toHaveCount(0)
  })

  for (const route of CINEMATIC_ROUTES) {
    test(`${route} keeps major narrative rectangles exclusive across the scroll timeline`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await page.goto(url(route), { waitUntil: 'networkidle' })

      const activeChapters = new Set<string>()
      const activationSequence: string[] = []
      const frameChecksums: number[] = []
      const maxScroll = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - window.innerHeight))

      for (const point of GEOMETRY_POINTS) {
        await scrollInstantly(page, maxScroll * point)
        await settle(page)

        const sample = await page.evaluate(() => {
          const root = document.querySelector<HTMLElement>('[data-cinematic-experience]')
          const major = Array.from(document.querySelectorAll<HTMLElement>('[data-cinematic-chapter] h1, [data-cinematic-chapter] h2'))
            .filter(element => {
              const style = getComputedStyle(element)
              const rect = element.getBoundingClientRect()
              return Number(style.opacity) > 0.9 && rect.width > 0 && rect.height > 0
            })
            .map(element => ({
              text: element.textContent?.trim() ?? '',
              rect: element.getBoundingClientRect().toJSON(),
            }))
          const overlaps: Array<[string, string]> = []
          for (let left = 0; left < major.length; left += 1) {
            for (let right = left + 1; right < major.length; right += 1) {
              const a = major[left].rect
              const b = major[right].rect
              const overlapWidth = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left))
              const overlapHeight = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top))
              if (overlapWidth * overlapHeight > 4) overlaps.push([major[left].text, major[right].text])
            }
          }
          const canvas = document.querySelector<HTMLCanvasElement>('.cm-video__canvas')
          const context = canvas?.getContext('2d')
          const pixels = context && canvas ? context.getImageData(0, 0, Math.min(canvas.width, 16), Math.min(canvas.height, 16)).data : []
          const checksum = Array.from(pixels).reduce((sum, value, index) => (sum + value * (index + 1)) % 1000000007, 0)
          return { activeChapter: root?.dataset.activeChapter ?? '', overlaps, checksum }
        })

        activeChapters.add(sample.activeChapter)
        if (activationSequence.at(-1) !== sample.activeChapter) activationSequence.push(sample.activeChapter)
        frameChecksums.push(sample.checksum)
        expect(sample.overlaps, `${route} has overlapping major headings at ${point * 100}%`).toEqual([])
      }

      expect([...activeChapters].sort(), `${route} chapter activation coverage`).toEqual(['0', '1'])
      expect(activationSequence, `${route} stages activate in order`).toEqual(['0', '1'])
      expect(new Set(frameChecksums).size, `${route} background frame checksum changed`).toBeGreaterThan(1)
    })
  }

  test('reduced motion keeps all content readable without canvas scrubbing', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })

    for (const route of CINEMATIC_ROUTES) {
      await page.goto(url(route), { waitUntil: 'networkidle' })
      const evidence = await page.evaluate(() => ({
        reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        chapters: Array.from(document.querySelectorAll<HTMLElement>('[data-cinematic-chapter]')).map(element => ({
          visible: getComputedStyle(element).opacity === '1' && getComputedStyle(element).visibility !== 'hidden',
          rect: element.getBoundingClientRect().height,
        })),
        canvasDisplay: getComputedStyle(document.querySelector('.cm-video__canvas') as HTMLElement).display,
        videoOpacity: getComputedStyle(document.querySelector('.cm-video__element') as HTMLElement).opacity,
        videoCurrentTime: (document.querySelector('.cm-video__element') as HTMLVideoElement).currentTime,
        links: Array.from(document.querySelectorAll<HTMLAnchorElement>('main a')).filter(link => link.getBoundingClientRect().width > 0).length,
      }))
      expect(evidence.reduced).toBe(true)
      expect(evidence.chapters.every(chapter => chapter.visible && chapter.rect > 0), `${route} readable chapters`).toBe(true)
      expect(evidence.canvasDisplay, `${route} canvas is not required under reduced motion`).toBe('none')
      expect(evidence.videoOpacity, `${route} keeps one stable media layer under reduced motion`).toBe('1')
      expect(evidence.links, `${route} links remain usable under reduced motion`).toBeGreaterThan(0)
      await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
      await page.waitForTimeout(250)
      const reducedVideoTime = await page.locator('.cm-video__element').evaluate((element: HTMLVideoElement) => element.currentTime)
      expect(Math.abs(reducedVideoTime - evidence.videoCurrentTime), `${route} video does not scrub under reduced motion`).toBeLessThanOrEqual(0.02)
    }
  })

  test('captures the required responsive and scroll-state visual matrix', async ({ page }) => {
    test.setTimeout(180_000)
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    for (const [name, width, height] of SCREENSHOT_VIEWPORTS) {
      await page.setViewportSize({ width, height })
      for (const route of CINEMATIC_ROUTES) {
        await page.goto(url(route), { waitUntil: 'networkidle' })
        const maxScroll = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - window.innerHeight))
        for (const [state, ratio] of [['top', 0], ['mid', 0.45], ['section-two', 0.78], ['end', 1]] as const) {
          await scrollInstantly(page, maxScroll * ratio)
          await settle(page)
          await page.screenshot({
            path: path.join('test-results', `cinematic-${route === '/' ? 'home' : route.slice(1)}-${name}-${state}.png`),
            fullPage: false,
          })
        }
      }
    }
  })
})
