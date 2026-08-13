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
    test(`${viewport.width}px keeps the repository hub contained`, async ({ page }) => {
      await page.setViewportSize(viewport)
      const response = await page.goto(new URL('/docs', baseUrl).toString(), { waitUntil: 'networkidle' })

      expect(response).not.toBeNull()
      expect(response!.status()).toBeLessThan(400)

      const main = page.locator('main.pc-docs-hub')
      await expect(main).toHaveCount(1)
      await expect(main).toBeVisible()
      await expect(main.locator('h1')).toBeVisible()

      const cards = main.locator('.pc-docs-hub__card')
      await expect(cards).toHaveCount(2)
      await expect(cards.nth(0)).toContainText('Memory for QA')
      await expect(cards.nth(1)).toContainText('Workbench')
      await expect(main.locator('.pc-docs-hub__boundary')).toBeVisible()

      const layout = await page.evaluate(() => {
        const cardRects = [...document.querySelectorAll<HTMLElement>('.pc-docs-hub__card')].map(card => {
          const rect = card.getBoundingClientRect()
          return { left: rect.left, right: rect.right, top: rect.top, width: rect.width }
        })
        return {
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
          cardRects,
        }
      })

      expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
      for (const card of layout.cardRects) {
        expect(card.left).toBeGreaterThanOrEqual(0)
        expect(card.right).toBeLessThanOrEqual(layout.viewportWidth + 1)
        expect(card.width).toBeGreaterThan(200)
      }

      if (viewport.width <= 700) {
        expect(Math.abs(layout.cardRects[0].top - layout.cardRects[1].top)).toBeGreaterThan(40)
      } else {
        expect(Math.abs(layout.cardRects[0].top - layout.cardRects[1].top)).toBeLessThan(4)
      }
    })
  }
})

test('mobile docs page preserves keyboard focus and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(new URL('/docs', baseUrl).toString(), { waitUntil: 'networkidle' })

  const firstDocsLink = page.locator('.pc-docs-hub__links a').first()
  await expect(firstDocsLink).toBeVisible()
  await firstDocsLink.focus()
  await expect(firstDocsLink).toBeFocused()

  const reducedMotion = await page.evaluate(() => {
    const pulse = document.querySelector<HTMLElement>('.pc-body-hero__diagram-pulse')
    const line = document.querySelector<HTMLElement>('.pc-body-hero__diagram li > i')
    return {
      pulseAnimation: pulse ? getComputedStyle(pulse).animationName : 'none',
      lineAnimation: line ? getComputedStyle(line).animationName : 'none',
    }
  })

  expect(reducedMotion.pulseAnimation).toBe('none')
  expect(reducedMotion.lineAnimation).toBe('none')
})
