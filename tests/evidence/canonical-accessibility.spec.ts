import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import {
  REVIEWED_AXE_EXCEPTIONS,
  getAccessibilityBaseline,
} from './accessibility-evidence'
import {
  compareEvidenceBaseline,
  evaluateBlockingViolations,
  summarizeNonBlockingEvidence,
  type AccessibilityViewport,
  type AxeResultLike,
} from './accessibility-policy'

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

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 900 },
] as const

const BLOCKED_PATHS = ['/maintenance', '/error', '/404', '/500', '/not-found']

// Axe 4.12.1 has no aggregate wcag22a tag. Applicable WCAG 2.2 Level A
// criteria remain represented by Axe's individual success-criterion tags;
// wcag22aa adds the supported aggregate WCAG 2.2 AA rules.
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

function formatPolicyErrors(label: string, errors: string[]): string {
  return `${label}:\n${errors.map((error) => `- ${error}`).join('\n')}`
}

test.describe('canonical accessibility evidence', () => {
  for (const route of CANONICAL_ROUTES) {
    for (const viewport of VIEWPORTS) {
      test(`${route} passes Axe WCAG gates at ${viewport.name}`, async ({ page }, testInfo) => {
        await page.setViewportSize(viewport)

        const response = await page.goto(new URL(route, baseUrl).toString(), {
          waitUntil: 'domcontentloaded',
        })

        expect(response, `${route} did not return a response`).not.toBeNull()
        expect(
          response!.status(),
          `${route} returned ${response!.status()} at ${viewport.name}`,
        ).toBeLessThan(400)

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

        await expect(page.locator('main')).toBeVisible()

        // Scan the complete application document. Reviewed exceptions are
        // applied after Axe analysis so no subtree or unrelated rule is hidden.
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(WCAG_TAGS)
          .analyze()

        const viewportName = viewport.name as AccessibilityViewport
        const blockingEvaluation = evaluateBlockingViolations(
          accessibilityScanResults.violations as AxeResultLike[],
          route,
          viewportName,
          REVIEWED_AXE_EXCEPTIONS,
        )

        const actualEvidence = summarizeNonBlockingEvidence(
          accessibilityScanResults.violations as AxeResultLike[],
          accessibilityScanResults.incomplete as AxeResultLike[],
        )
        const reviewedBaseline = getAccessibilityBaseline(route, viewportName)
        const baselineEvaluation = compareEvidenceBaseline(actualEvidence, reviewedBaseline)

        const policyErrors = [
          ...blockingEvaluation.unreviewed.map(
            (entry) =>
              `unreviewed ${entry.impact} ${entry.ruleId} at ${entry.target}`,
          ),
          ...blockingEvaluation.staleExceptionIds.map(
            (entry) => `stale exception ${entry}`,
          ),
          ...blockingEvaluation.cardinalityErrors.map(
            (entry) => `exception cardinality ${entry}`,
          ),
          ...blockingEvaluation.duplicateMatches.map(
            (entry) => `duplicate exception ${entry}`,
          ),
          ...baselineEvaluation.regressions.map(
            (entry) => `evidence baseline ${entry}`,
          ),
        ]

        await testInfo.attach(
          `axe-results-${route.replace(/\//g, '_') || 'root'}-${viewport.name}.json`,
          {
            contentType: 'application/json',
            body: JSON.stringify(
              {
                route,
                viewport: viewport.name,
                tags: WCAG_TAGS,
                violations: accessibilityScanResults.violations,
                incomplete: accessibilityScanResults.incomplete,
                appliedReviewedExceptions: blockingEvaluation.appliedExceptionIds,
                staleExceptions: blockingEvaluation.staleExceptionIds,
                duplicateMatches: blockingEvaluation.duplicateMatches,
                cardinalityErrors: blockingEvaluation.cardinalityErrors,
                actualNonBlockingEvidence: actualEvidence,
                reviewedNonBlockingBaseline: reviewedBaseline,
                baselineDecreases: baselineEvaluation.decreases,
                policyErrors,
              },
              null,
              2,
            ),
          },
        )

        for (const exceptionId of blockingEvaluation.appliedExceptionIds) {
          console.log(`[${route} ${viewport.name}] applied reviewed exception ${exceptionId}`)
        }
        for (const decrease of baselineEvaluation.decreases) {
          console.log(`[${route} ${viewport.name}] baseline decrease: ${decrease}`)
        }

        if (policyErrors.length > 0) {
          throw new Error(
            formatPolicyErrors(
              `Accessibility policy failed on ${route} at ${viewport.name}`,
              policyErrors,
            ),
          )
        }
      })
    }
  }
})
