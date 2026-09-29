import { expect, test, type Page } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL
if (!baseUrl) throw new Error('WAVE1_BASE_URL is required')

const CORE_ROUTES = ['/', '/evermind', '/nevermind', '/mastermind'] as const
const VIEWPORTS = [1440, 1280, 1024, 768, 430, 390, 360] as const

function routeUrl(route: string) {
  return new URL(route, baseUrl).toString()
}

async function sampleRenderedCanvas(page: Page) {
  return page.evaluate(async () => {
    const canvas = document.querySelector<HTMLCanvasElement>('.cm-video__canvas')
    if (!canvas) throw new Error('Cinematic canvas is missing')

    const scratch = document.createElement('canvas')
    scratch.width = 48
    scratch.height = 27
    const context = scratch.getContext('2d')
    if (!context) throw new Error('Canvas 2D context is unavailable')

    const result = { samples: 0, uncoveredSamples: 0, visibleCanvasSamples: 0, states: new Set<string>() }
    const read = () => {
      const root = canvas.closest<HTMLElement>('.cm-video')
      const poster = root?.querySelector<HTMLElement>('.cm-video__poster')
      result.states.add(root?.dataset.renderState ?? 'missing')
      const canvasOpacity = Number.parseFloat(getComputedStyle(canvas).opacity)
      const posterOpacity = Number.parseFloat(poster ? getComputedStyle(poster).opacity : '0')
      if (canvasOpacity >= 0.99) result.visibleCanvasSamples += 1
      context.clearRect(0, 0, scratch.width, scratch.height)
      context.drawImage(
        canvas,
        Math.max(0, (canvas.width - scratch.width) / 2),
        Math.max(0, (canvas.height - scratch.height) / 2),
        Math.min(canvas.width, scratch.width),
        Math.min(canvas.height, scratch.height),
        0,
        0,
        scratch.width,
        scratch.height,
      )
      const pixels = context.getImageData(0, 0, scratch.width, scratch.height).data
      let alpha = 0
      for (let index = 3; index < pixels.length; index += 4) alpha += pixels[index]
      result.samples += 1
      // The canvas is intentionally transparent while the poster is the visible
      // fallback. Count a gap only when neither layer covers the transition.
      if (canvasOpacity + posterOpacity < 0.98 || (canvasOpacity >= 0.99 && alpha === 0)) {
        result.uncoveredSamples += 1
      }
    }

    const step = async (direction: -1 | 1, count: number, distance: number) => {
      for (let index = 0; index < count; index += 1) {
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
        window.scrollBy(0, direction * distance)
        read()
      }
    }

    for (let cycle = 0; cycle < 3; cycle += 1) {
      await step(1, 42, 5)
      await step(-1, 42, 5)
      await step(1, 28, 26)
      await step(-1, 28, 26)
    }

    return { ...result, states: [...result.states] }
  })
}

test.describe('ProChat final public-site quality', () => {
  test('core routes keep every cinematic background painted through repeated scroll reversals', async ({ page }) => {
    test.setTimeout(120_000)
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })

    for (const route of CORE_ROUTES) {
      const response = await page.goto(routeUrl(route), { waitUntil: 'domcontentloaded' })
      expect(response?.status(), `${route} response`).toBe(200)
      await expect(page.locator('.cm-video__canvas.is-visible')).toBeVisible()
      await expect.poll(() => page.locator('.cm-video__canvas').evaluate(canvas => getComputedStyle(canvas).opacity)).toBe('1')

      const sampled = await sampleRenderedCanvas(page)
      expect(sampled.samples, `${route} sampled frame count`).toBeGreaterThan(200)
      expect(sampled.visibleCanvasSamples, `${route} visible canvas samples`).toBeGreaterThan(200)
      expect(sampled.uncoveredSamples, `${route} uncovered background samples`).toBe(0)
      expect(sampled.states.every(state => state === 'bootstrap' || state === 'cache'), `${route} media state stays painted`).toBe(true)
    }
  })

  test('four cinematic pages share one clean header and CTA labels stay on a single line at all target widths', async ({ page }) => {
    test.setTimeout(180_000)
    await page.emulateMedia({ reducedMotion: 'no-preference' })

    for (const width of VIEWPORTS) {
      await page.setViewportSize({ width, height: width < 600 ? 844 : 900 })
      for (const route of CORE_ROUTES) {
        const response = await page.goto(routeUrl(route), { waitUntil: 'domcontentloaded' })
        expect(response?.status(), `${route} at ${width}px`).toBe(200)

        const evidence = await page.evaluate(() => {
          const heading = document.querySelector<HTMLElement>('main h1')
          const ctas = Array.from(document.querySelectorAll<HTMLElement>(
            '.cm-actions a, .cm-nav__cta',
          )).filter(element => element.getBoundingClientRect().width > 0).map(element => {
            const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
            let lineCount = 0
            if (textNode) {
              const range = document.createRange()
              range.selectNode(textNode)
              lineCount = new Set(Array.from(range.getClientRects()).map(rect => Math.round(rect.top))).size
            }
            return {
              label: element.textContent?.trim() ?? '',
              whiteSpace: getComputedStyle(element).whiteSpace,
              lines: lineCount,
              clipped: element.scrollWidth > element.clientWidth + 1,
            }
          })

          return {
            headers: document.querySelectorAll('header').length,
            navs: document.querySelectorAll('nav[aria-label="Primary navigation"]').length,
            mains: document.querySelectorAll('main').length,
            footers: document.querySelectorAll('footer').length,
            overflow: document.documentElement.scrollWidth > window.innerWidth,
            headingFont: heading ? getComputedStyle(heading).fontFamily : '',
            brandFont: heading ? getComputedStyle(heading).fontFamily.includes('Golos_Text') || getComputedStyle(heading).fontFamily.includes('Golos Text') : false,
            ctas,
          }
        })

        expect(evidence.headers, `${route} header count`).toBe(1)
        expect(evidence.navs, `${route} primary nav count`).toBe(1)
        expect(evidence.mains, `${route} main count`).toBe(1)
        expect(evidence.footers, `${route} footer count`).toBe(0)
        expect(evidence.overflow, `${route} overflow at ${width}px`).toBe(false)
        expect(evidence.brandFont, `${route} H1 uses Golos Text (${evidence.headingFont})`).toBe(true)
        expect(evidence.ctas.every(cta => cta.whiteSpace === 'nowrap' && cta.lines <= 1 && !cta.clipped), `${route} CTA labels at ${width}px: ${JSON.stringify(evidence.ctas)}`).toBe(true)
      }
    }
  })

  test('reduced motion leaves core stages readable without video playback or canvas painting', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })

    for (const route of CORE_ROUTES) {
      await page.goto(routeUrl(route), { waitUntil: 'domcontentloaded' })
      await expect(page.locator('main h1')).toBeVisible()
      const evidence = await page.evaluate(() => ({
        reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
        chaptersVisible: Array.from(document.querySelectorAll<HTMLElement>('[data-cinematic-chapter]')).every(element => {
          const style = getComputedStyle(element)
          return style.opacity === '1' && style.visibility !== 'hidden' && element.getBoundingClientRect().height > 0
        }),
        videoDisplay: document.querySelector('.cm-video__element') ? getComputedStyle(document.querySelector('.cm-video__element') as HTMLElement).display : 'not-present',
        canvasDisplay: document.querySelector('.cm-video__canvas') ? getComputedStyle(document.querySelector('.cm-video__canvas') as HTMLElement).display : 'not-present',
        videoPaused: document.querySelector('.cm-video__element') ? (document.querySelector('.cm-video__element') as HTMLVideoElement).paused : true,
        navLinkCount: Array.from(document.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Primary navigation"] a')).filter(link => link.getBoundingClientRect().width > 0).length,
      }))
      expect(evidence.reduced).toBe(true)
      expect(evidence.chaptersVisible, `${route} readable content`).toBe(true)
      expect(evidence.canvasDisplay, `${route} reduced-motion canvas layer`).toBe('none')
      expect(evidence.videoPaused, `${route} reduced-motion video must remain static`).toBe(true)
      expect(evidence.navLinkCount, `${route} usable navigation`).toBeGreaterThan(0)
    }
  })

  test('switching to reduced motion after load restores one stable poster layer', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto(routeUrl('/'), { waitUntil: 'domcontentloaded' })
    await expect(page.locator('.cm-video__canvas.is-visible')).toBeVisible()

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect.poll(() => page.locator('.cm-video__poster').evaluate(element => getComputedStyle(element).opacity)).toBe('1')

    const evidence = await page.evaluate(() => ({
      canvasDisplay: getComputedStyle(document.querySelector('.cm-video__canvas') as HTMLElement).display,
      videoOpacity: getComputedStyle(document.querySelector('.cm-video__element') as HTMLElement).opacity,
      posterOpacity: getComputedStyle(document.querySelector('.cm-video__poster') as HTMLElement).opacity,
    }))
    expect(evidence).toEqual({ canvasDisplay: 'none', videoOpacity: '0', posterOpacity: '1' })

    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await expect(page.locator('.cm-video__canvas.is-visible')).toBeVisible()
    const firstFrame = await page.locator('.cm-video__canvas').evaluate(element => {
      const canvas = element as HTMLCanvasElement
      const sample = document.createElement('canvas')
      sample.width = 16
      sample.height = 9
      const context = sample.getContext('2d')!
      context.drawImage(canvas, 0, 0, sample.width, sample.height)
      return [...context.getImageData(0, 0, sample.width, sample.height).data].reduce((sum, value, index) => sum + value * (index + 1), 0)
    })
    await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }))
    await expect.poll(() => page.locator('.cm-video__canvas').evaluate(element => {
      const canvas = element as HTMLCanvasElement
      const sample = document.createElement('canvas')
      sample.width = 16
      sample.height = 9
      const context = sample.getContext('2d')!
      context.drawImage(canvas, 0, 0, sample.width, sample.height)
      return [...context.getImageData(0, 0, sample.width, sample.height).data].reduce((sum, value, index) => sum + value * (index + 1), 0)
    }), { timeout: 10_000 }).not.toBe(firstFrame)
  })
})
