import path from 'node:path'

import { expect, test, type Page } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) throw new Error('WAVE1_BASE_URL is required')

const CINEMATIC_ROUTES = ['/', '/evermind', '/nevermind', '/mastermind', '/contact'] as const
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

test.describe('cinematic marketing experience', () => {
  test('owns one shared shell and one media engine per route', async ({ page }) => {
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
        mediaRoots: document.querySelectorAll('.cm-video').length,
        canvases: document.querySelectorAll('.cm-video__canvas').length,
        videos: document.querySelectorAll('.cm-video video').length,
        legacyNav: document.querySelectorAll('.pm-navbar,.cpf-nav').length,
        legacyFooter: document.querySelectorAll('.pc-footer').length,
        overflow: document.documentElement.scrollWidth > window.innerWidth,
      }))

      expect(evidence).toEqual({
        headers: 1,
        primaryNav: 1,
        footers: 1,
        h1: 1,
        experience: 1,
        mediaRoots: 1,
        canvases: 1,
        videos: 1,
        legacyNav: 0,
        legacyFooter: 0,
        overflow: false,
      })
    }
  })

  for (const route of ['/', '/evermind', '/nevermind', '/mastermind'] as const) {
    test(`${route} keeps major narrative rectangles exclusive across the scroll timeline`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await page.goto(url(route), { waitUntil: 'networkidle' })

      const activeChapters = new Set<string>()
      const frameChecksums: number[] = []
      const maxScroll = await page.evaluate(() => Math.max(0, document.documentElement.scrollHeight - window.innerHeight))

      for (const point of GEOMETRY_POINTS) {
        await page.evaluate((y) => window.scrollTo(0, y), maxScroll * point)
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
        frameChecksums.push(sample.checksum)
        expect(sample.overlaps, `${route} has overlapping major headings at ${point * 100}%`).toEqual([])
      }

      expect([...activeChapters].sort(), `${route} chapter activation coverage`).toEqual(
        route === '/' ? ['0', '1', '2', '3', '4', '5', '6', '7'] : ['0', '1', '2', '3'],
      )
      expect(new Set(frameChecksums).size, `${route} background frame checksum changed`).toBeGreaterThan(1)
    })
  }

  test('reduced motion keeps all chapters readable without canvas scrubbing', async ({ page }) => {
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
        links: Array.from(document.querySelectorAll<HTMLAnchorElement>('main a')).filter(link => link.getBoundingClientRect().width > 0).length,
      }))
      expect(evidence.reduced).toBe(true)
      expect(evidence.chapters.every(chapter => chapter.visible && chapter.rect > 0), `${route} readable chapters`).toBe(true)
      expect(evidence.canvasDisplay, `${route} canvas is not required under reduced motion`).toBe('none')
      expect(evidence.links, `${route} links remain usable under reduced motion`).toBeGreaterThan(0)
    }
  })

  test('captures the requested responsive visual matrix for manual review', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    for (const [name, width, height] of SCREENSHOT_VIEWPORTS) {
      await page.setViewportSize({ width, height })
      for (const route of ['/', '/evermind', '/nevermind', '/mastermind', '/contact'] as const) {
        await page.goto(url(route), { waitUntil: 'networkidle' })
        await page.screenshot({
          path: path.join('test-results', `cinematic-${route === '/' ? 'home' : route.slice(1)}-${name}.png`),
          fullPage: false,
        })
      }
    }
  })
})
