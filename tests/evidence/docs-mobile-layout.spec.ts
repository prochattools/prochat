import { expect, test } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

const viewports = [
  { width: 1440, height: 1000 },
  { width: 1024, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 900 },
  { width: 320, height: 900 },
] as const

test.describe('/docs responsive layout', () => {
  for (const viewport of viewports) {
    test(`${viewport.width}px has contained layout and usable heading`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto(new URL('/docs', baseUrl).toString(), { waitUntil: 'networkidle' })

      const layout = await page.evaluate(() => {
        const heading = document.querySelector('main h1')
        const toc = document.querySelector('.nextra-toc')
        const headingRect = heading?.getBoundingClientRect()
        const tocRect = toc?.getBoundingClientRect()
        const horizontallyScrollable = [...document.querySelectorAll('pre, table')]
          .map((element) => ({
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
            overflowX: getComputedStyle(element).overflowX,
          }))
          .filter(({ scrollWidth, clientWidth }) => scrollWidth > clientWidth)
        return {
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
          headingWidth: headingRect?.width ?? 0,
          headingHeight: headingRect?.height ?? 0,
          headingText: heading?.textContent ?? '',
          headingLineHeight: heading ? Number.parseFloat(getComputedStyle(heading).lineHeight) : 0,
          tocVisible: !!toc && getComputedStyle(toc).display !== 'none',
          tocRight: tocRect?.right ?? 0,
          horizontallyScrollable,
        }
      })

      expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
      expect(layout.headingWidth).toBeGreaterThan(200)
      expect(layout.headingHeight / layout.headingLineHeight).toBeLessThan(layout.headingText.length / 2)
      for (const element of layout.horizontallyScrollable) {
        expect(element.overflowX).toMatch(/auto|scroll/)
      }

      if (viewport.width < 768) {
        expect(layout.tocVisible).toBe(false)
      } else {
        expect(layout.tocRight).toBeLessThanOrEqual(viewport.width)
      }
    })
  }
})

test('mobile docs page exposes keyboard focus and reduced-motion behavior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 })
  await page.goto(new URL('/docs', baseUrl).toString(), { waitUntil: 'networkidle' })

  await page.keyboard.press('Tab')
  await expect
    .poll(() => page.evaluate(() => document.activeElement?.tagName ?? ''))
    .not.toBe('BODY')

  const focused = await page.evaluate(() => {
    const element = document.activeElement
    return {
      tag: element?.tagName ?? '',
      outline: element ? getComputedStyle(element).outlineStyle : 'none',
    }
  })
  expect(focused.tag).not.toBe('BODY')
  expect(focused.outline).not.toBe('none')

  await expect
    .poll(() => page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches))
    .toBe(true)
})
