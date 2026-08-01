import { expect, test } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

const routes = ['/', '/memory', '/workbench', '/docs'] as const
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 900 },
] as const

test.describe('canonical route smoke evidence', () => {
  for (const route of routes) {
    for (const viewport of viewports) {
      test(`${route} resolves and remains contained at ${viewport.name}`, async ({ page }) => {
        await page.setViewportSize(viewport)

        const response = await page.goto(new URL(route, baseUrl).toString(), {
          waitUntil: 'domcontentloaded',
        })

        expect(response, `${route} did not return a navigation response`).not.toBeNull()
        expect(response!.status(), `${route} returned ${response!.status()}`).toBeLessThan(400)
        await expect(page.locator('main')).toBeVisible()

        const layout = await page.evaluate(() => ({
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        }))

        expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth)
      })
    }
  }
})
