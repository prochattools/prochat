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
          headingLineHeight: heading
            ? (Number.parseFloat(getComputedStyle(heading).lineHeight) ||
               Number.parseFloat(getComputedStyle(heading).fontSize) * 1.2)
            : 0,
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
        // Assert no TOC is visibly rendered at mobile widths.
        // Uses Playwright visibility semantics (non-zero geometry + no hidden ancestor)
        // rather than computed display alone, which is insufficient when the server
        // fails to deliver stylesheets or an ancestor hides the element.
        await expect(page.locator('.nextra-toc:visible')).toHaveCount(0)
      } else {
        // Assert the intended desktop TOC is visible and within the viewport.
        await expect(page.locator('.nextra-toc').first()).toBeVisible()
        expect(layout.tocRight).toBeLessThanOrEqual(viewport.width)
      }
    })
  }
})

test('mobile docs page exposes keyboard focus and reduced-motion behavior', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(new URL('/docs', baseUrl).toString(), { waitUntil: 'networkidle' })

  const traversal = [] as Array<{
    tag: string
    href: string
    inFooter: boolean
    isSkipLink: boolean
    isMenu: boolean
    focusStyle: boolean
  }>
  for (let index = 0; index < 100; index += 1) {
    await page.keyboard.press('Tab')
    traversal.push(
      await page.evaluate(() => {
        const element = document.activeElement as HTMLElement | null
        const styles = element ? getComputedStyle(element) : null
        return {
          tag: element?.tagName ?? '',
          href: element?.getAttribute('href') ?? '',
          inFooter: !!element?.closest('footer'),
          isSkipLink: element?.textContent?.trim() === 'Skip to Content',
          isMenu: element?.tagName === 'SUMMARY' && element.textContent?.trim() === 'Menu',
          focusStyle: !!styles && (styles.outlineStyle !== 'none' || styles.boxShadow !== 'none'),
        }
      }),
    )
  }

  expect(traversal.some((item) => item.isSkipLink)).toBe(true)
  expect(traversal.some((item) => item.isMenu)).toBe(true)
  expect(traversal.some((item) => item.href === '/docs' || item.href.startsWith('/docs/'))).toBe(true)
  expect(traversal.some((item) => item.inFooter && item.href)).toBe(true)
  expect(traversal.some((item) => item.focusStyle)).toBe(true)

  const mobileDocsDrawer = await page.locator('.nextra-mobile-nav').count()
  expect(mobileDocsDrawer).toBeGreaterThan(0)
  expect(await page.getByRole('button', { name: /open navigation menu/i }).count()).toBe(0)
  // The custom Nextra integration intentionally has no mobile drawer trigger:
  // the desktop sidebar and TOC are removed below 768px, while the shared
  // header's semantic Menu summary remains the available mobile navigation.
  await page.getByText('Menu', { exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details.pm-mobile-nav')).toHaveAttribute('open', '')
  await page.keyboard.press('Escape')
  await expect
    .poll(() => page.evaluate(() => document.activeElement?.tagName ?? ''))
    .not.toBe('BODY')

  await expect
    .poll(() => page.evaluate(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches))
    .toBe(true)
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.documentElement).transitionDuration))
    .toBe('0s')
})
