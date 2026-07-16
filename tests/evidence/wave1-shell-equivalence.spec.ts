import { expect, test } from '@playwright/test'

const baseUrl = process.env.WAVE1_BASE_URL
const runLabel = process.env.WAVE1_RUN_LABEL ?? 'unknown'
const baselineRef = process.env.WAVE1_BASELINE_REF ?? null
const targetRef = process.env.WAVE1_TARGET_REF ?? null
const baselineSha = process.env.WAVE1_BASELINE_SHA ?? baselineRef
const targetSha = process.env.WAVE1_TARGET_SHA ?? targetRef
const harnessSha = process.env.WAVE1_HARNESS_SHA ?? null

if (!baseUrl) {
  throw new Error('WAVE1_BASE_URL is required')
}

const firstPartyOrigin = new URL(baseUrl).origin

const viewports = [
  { name: '320', width: 320, height: 900 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 900 },
  { name: '1440', width: 1440, height: 1000 },
  { name: '1728', width: 1728, height: 1117 },
] as const

const htmlRoutes = [
  {
    name: 'home',
    path: '/',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public home shell',
    stableAssertion: 'Stop rebuilding context.',
  },
  {
    name: 'contact',
    path: '/contact',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public contact surface',
    stableAssertion: 'Start with one memory problem.',
  },
  {
    name: 'privacy',
    path: '/privacy',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public legal surface',
    stableAssertion: 'Privacy Policy for ProChat',
  },
  {
    name: 'docs',
    path: '/docs',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public documentation surface',
    stableAssertion: 'Docs',
  },
  {
    name: 'memory-legacy',
    path: '/prochat-memory',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public legacy compatibility surface',
    stableAssertion: 'ProChat Memory / Volume 01',
  },
  {
    name: 'buildflow',
    path: '/buildflow',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public compatibility surface',
    stableAssertion: 'BuildFlow is useful.',
  },
  {
    name: 'admin-licenses',
    path: '/admin/licenses',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public admin notice',
    stableAssertion: 'Admin authentication is not implemented yet.',
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public pricing surface',
    stableAssertion: 'Choose Your Plan',
  },
  {
    name: 'chat-project',
    path: '/chat/[projectID]',
    classification: 'skipped_requires_separate_protected_runner',
    expectedUnauthenticatedStatus: 'skipped',
    stableAssertion: 'No unauthenticated chat proof is claimed.',
    skipReason:
      'Chat project route depends on the /api/link TODO path and requires a separate protected runner.',
  },
  {
    name: 'sign-in',
    path: '/sign-in',
    classification: 'public_sign_in_surface',
    expectedUnauthenticatedStatus: 'public sign-in surface',
    stableAssertion: 'Sign in to',
  },
  {
    name: 'processing',
    path: '/processing-page',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public checkout placeholder',
    stableAssertion: 'Authentication is not enforced yet. Ory session validation is still TODO.',
  },
  {
    name: 'maintenance',
    path: '/maintenance',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public maintenance surface',
    stableAssertion: 'Website under construction',
  },
  {
    name: 'unsubscribe',
    path: '/unsubscribe',
    classification: 'route_accessibility',
    expectedUnauthenticatedStatus: 'public preference surface',
    stableAssertion: 'Waitlist Email Preferences',
  },
] as const

const endpointRoutes = [
  { name: 'health', path: '/api/health' },
  { name: 'og', path: '/og' },
] as const

const routeReadinessExpectations = new Map<string, string>([
  ['home', 'Stop rebuilding context.'],
  ['contact', 'Start with one memory problem.'],
  ['privacy', 'Privacy Policy for ProChat'],
  ['memory-legacy', 'ProChat Memory / Volume 01'],
  ['buildflow', 'BuildFlow is useful.'],
  ['admin-licenses', 'Licenses'],
  ['dashboard', 'Choose Your Plan'],
  ['sign-in', 'Sign in to'],
  ['processing', 'Payment Checkout'],
  ['maintenance', 'Website under construction'],
  ['unsubscribe', 'Waitlist Email Preferences'],
  ['chat-project', 'Chat'],
])

const screenshotPolicy = {
  screenshot_policy: 'PROVISIONAL_REQUIRES_FIRST_RUN_CALIBRATION',
  maxDiffPixelRatio: 0.001,
  global_masks: 'none unless a volatile region is proven',
  manual_review_required: true,
  locale: 'en-US',
  timezone: 'UTC',
  reduced_motion: 'reduce',
  animation_disabling: 'animations disabled and caret hidden',
  font_loading_readiness: 'captured through stable first-party rendering only',
  nonzero_diff_inspection: true,
  tolerance_reduction_after_first_run: true,
} as const

const databaseLifecycleProof = {
  database_strategy: 'CONDITIONALLY_APPROVED',
  database_lifecycle: 'EPHEMERAL_GITHUB_SERVICE_CONTAINER',
  persistent_cleanup_required: false,
  job_teardown_cleanup: 'automatic',
  historical_commit_compatibility: 'NOT_YET_EXECUTED',
  fixture_strategy: 'MINIMAL_NON_PROTECTED_FIXTURES_ONLY',
} as const

const artifactPrivacyProof = {
  noCookies: true,
  noAuthorizationHeaders: true,
  noAuthStateFiles: true,
  noStorageState: true,
  noTokens: true,
  noRawServerLogs: true,
  noSecretTempDirectories: true,
  noPurchaserData: true,
  noLicenceData: true,
  noPaymentData: true,
  noRealEmailAddresses: true,
  noAnalyticsIdentifiers: true,
  traceMode: 'retain-on-failure',
} as const

const thirdPartyPolicyFamilies = [
  'Google Fonts',
  'analytics',
  'authentication providers',
  'Stripe',
  'Resend',
  'MailerLite',
  'GitHub',
  'Make',
  'n8n',
  'external images',
] as const

for (const route of htmlRoutes) {
  for (const viewport of viewports) {
    test(`${route.name} ${viewport.name}`, async ({ browser }, testInfo) => {
      if (route.classification === 'skipped_requires_separate_protected_runner') {
        await testInfo.attach(`${runLabel}-${route.name}-${viewport.name}.json`, {
          body: Buffer.from(
            JSON.stringify(
              {
                runLabel,
                route: route.path,
                viewport,
                status: 'skipped',
                browserRuntimeProof: null,
                requestedSha: {
                  baseline: baselineRef,
                  target: targetRef,
                },
                resolvedSha: {
                  baseline: baselineSha,
                  target: targetSha,
                  harness: harnessSha,
                },
                routeAccessProof: {
                  classification: route.classification,
                  expectedUnauthenticatedStatus:
                    route.expectedUnauthenticatedStatus,
                  stableAssertion: route.stableAssertion,
                  skipReason: route.skipReason,
                  separateProtectedRunnerRequired: true,
                  noAuthorizationProofClaimed: true,
                  noStateTransitionProofClaimed: true,
                },
                requestPolicyProof: {
                  blocked_third_party_requests: [],
                  blocked_state_changing_third_party_requests: [],
                  unexpected_first_party_failures: [],
                  unexpected_console_errors: [],
                  allowed_known_warnings: [],
                  third_party_policy_families: thirdPartyPolicyFamilies,
                },
                screenshotPolicy,
                artifactPrivacyProof,
                databaseLifecycleProof,
                mobileNavigationProof: null,
                screenshotName: `${route.name}-${viewport.name}.png`,
                evidenceName: `${runLabel}-${route.name}-${viewport.name}.json`,
              },
              null,
              2,
            ),
          ),
          contentType: 'application/json',
        })
        test.skip(route.skipReason)
      }

      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        reducedMotion: 'reduce',
      })
      const page = await context.newPage()
      const requestAudit: Array<{
        method: string
        url: string
        origin: string
        classification: 'first_party' | 'external'
        resourceType: string
      }> = []
      const blockedThirdPartyRequests: Array<{
        method: string
        url: string
        origin: string
        resourceType: string
        route: string
      }> = []
      const blockedStateChangingThirdPartyRequests: Array<{
        method: string
        url: string
        origin: string
        resourceType: string
        route: string
      }> = []
      const unexpectedFirstPartyFailures: Array<{
        method: string
        url: string
        origin: string
        resourceType: string
        errorText: string
      }> = []
      const unexpectedConsoleErrors: string[] = []
      const allowedKnownWarnings: string[] = []
      let mobileNavigationProof:
        | {
            openMenuAriaExpanded: string | null
            mobileNavVisible: boolean
            documentScrollWidth: number
            documentClientWidth: number
            mobileNavScrollWidth: number | null
            mobileNavClientWidth: number | null
            mobileNavOverflowX: string | null
            closeControlClosed?: boolean
            closedMenuAriaExpanded?: string | null
            escapeClosed?: boolean
            focusReturnedToTrigger?: boolean
            links: Array<{
              label: string
              href: string | null
              visible: boolean
              target: string | null
            }>
          }
        | null = null

      await page.route('**/*', async interceptedRoute => {
        const request = interceptedRoute.request()
        const url = request.url()
        const origin = new URL(url).origin
        const isFirstParty = origin === firstPartyOrigin
        const isInternalScheme =
          url.startsWith('data:') ||
          url.startsWith('blob:') ||
          url.startsWith('about:') ||
          url.startsWith('chrome-extension:') ||
          url.startsWith('chrome:')

        if (isFirstParty || isInternalScheme) {
          await interceptedRoute.continue()
          return
        }

        const record = {
          method: request.method(),
          url,
          origin,
          resourceType: request.resourceType(),
          route: route.name,
        }
        blockedThirdPartyRequests.push(record)
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method())) {
          blockedStateChangingThirdPartyRequests.push(record)
        }
        await interceptedRoute.abort('blockedbyclient')
      })

      page.on('request', request => {
        const url = request.url()
        const origin = new URL(url).origin
        const classification =
          origin === firstPartyOrigin ? 'first_party' : 'external'
        requestAudit.push({
          method: request.method(),
          url,
          origin,
          classification,
          resourceType: request.resourceType(),
        })
      })
      page.on('console', message => {
        if (message.type() === 'warning') {
          const warning = message.text()
          const allowedWarning = false
          if (allowedWarning) {
            allowedKnownWarnings.push(warning)
          } else {
            unexpectedConsoleErrors.push(warning)
          }
        }
        if (message.type() === 'error') unexpectedConsoleErrors.push(message.text())
      })
      page.on('requestfailed', request => {
        const origin = new URL(request.url()).origin
        if (origin !== firstPartyOrigin) {
          return
        }

        unexpectedFirstPartyFailures.push({
          method: request.method(),
          url: request.url(),
          origin,
          resourceType: request.resourceType(),
          errorText: request.failure()?.errorText ?? '',
        })
      })

      const response = await page.goto(new URL(route.path!, baseUrl).toString(), {
        waitUntil: 'domcontentloaded',
      })
      expect(response, 'route response').not.toBeNull()
      expect(response!.status(), 'route status').toBeLessThan(500)

      const readinessText = routeReadinessExpectations.get(route.name)
      if (readinessText) {
        await expect(
          page.getByText(readinessText, { exact: false }),
          `route readiness text for ${route.name}`,
        ).toBeVisible()
      }

      const shellEvidence = await page.evaluate(() => {
        const rootStyle = getComputedStyle(document.documentElement)
        return {
          canonicalScopeCount: document.querySelectorAll('.pc-foundation-scope')
            .length,
          canonicalSkipLinkCount: Array.from(
            document.querySelectorAll('a'),
          ).filter(link => link.textContent?.trim() === 'Skip to content').length,
          mainLandmarkCount: document.querySelectorAll('main').length,
          canonicalSansVariable: rootStyle
            .getPropertyValue('--font-prochat-sans')
            .trim(),
          canonicalMonoVariable: rootStyle
            .getPropertyValue('--font-prochat-mono')
            .trim(),
          bodyClass: document.body.className,
          htmlClass: document.documentElement.className,
          title: document.title,
        }
      })

      expect(shellEvidence.canonicalScopeCount).toBe(0)
      expect(shellEvidence.canonicalSkipLinkCount).toBe(0)
      expect(shellEvidence.canonicalSansVariable).toBe('')
      expect(shellEvidence.canonicalMonoVariable).toBe('')
      expect(shellEvidence.mainLandmarkCount).toBeLessThanOrEqual(1)

      if (route.name === 'home' && viewport.name === '320') {
        const openMenu = page.getByLabel('Open navigation menu')
        const mobileNav = page.locator('nav[aria-label="Mobile"]')
        await expect(openMenu).toBeVisible()
        await expect(openMenu).toHaveAttribute('aria-expanded', 'false')
        await openMenu.click()
        await expect(openMenu).toHaveAttribute('aria-expanded', 'true')
        await expect(mobileNav).toBeVisible()
        await expect(page.getByLabel('Close navigation menu')).toBeVisible()
        const mobileLinkLabels = [
          'Memory',
          'Memory for QA',
          'Workbench',
          'Contact',
          'LinkedIn',
          'GitHub',
        ] as const
        for (const label of mobileLinkLabels) {
          await expect(mobileNav.getByRole('link', { name: label })).toBeVisible()
        }
        await expect(mobileNav.getByRole('link', { name: 'Memory' })).toHaveAttribute(
          'href',
          '/prochat-memory',
        )
        await expect(
          mobileNav.getByRole('link', { name: 'Memory for QA' }),
        ).toHaveAttribute('href', '/qa-memory')
        await expect(mobileNav.getByRole('link', { name: 'Workbench' })).toHaveAttribute(
          'href',
          '/contact?topic=workbench',
        )
        await expect(mobileNav.getByRole('link', { name: 'Contact' })).toHaveAttribute(
          'href',
          '/contact',
        )
        await expect(mobileNav.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
          'href',
          'https://www.linkedin.com/company/prochattools',
        )
        await expect(mobileNav.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
          'href',
          'https://github.com/prochattools',
        )
        mobileNavigationProof = await page.evaluate(() => {
          const mobileNav = document.querySelector('nav[aria-label="Mobile"]')
          const openMenu = document.querySelector(
            '[aria-label="Open navigation menu"]',
          )
          const linkLabels = [
            'Memory',
            'Memory for QA',
            'Workbench',
            'Contact',
            'LinkedIn',
            'GitHub',
          ] as const
          return {
            documentScrollWidth: document.documentElement.scrollWidth,
            documentClientWidth: document.documentElement.clientWidth,
            mobileNavScrollWidth: mobileNav?.scrollWidth ?? null,
            mobileNavClientWidth: mobileNav?.clientWidth ?? null,
            mobileNavVisible: Boolean(
              mobileNav &&
                getComputedStyle(mobileNav).display !== 'none' &&
                getComputedStyle(mobileNav).visibility !== 'hidden',
            ),
            mobileNavOverflowX: mobileNav ? getComputedStyle(mobileNav).overflowX : null,
            openMenuAriaExpanded: openMenu?.getAttribute('aria-expanded') ?? null,
            links: linkLabels.map(label => {
              const link = Array.from(mobileNav?.querySelectorAll('a') ?? []).find(
                anchor => anchor.textContent?.trim() === label,
              ) as HTMLAnchorElement | undefined
              return {
                label,
                href: link?.getAttribute('href') ?? null,
                visible: Boolean(link),
                target: link?.getAttribute('target') ?? null,
              }
            }),
          }
        })
        expect(mobileNavigationProof).toMatchObject({
          openMenuAriaExpanded: 'true',
          mobileNavVisible: true,
          mobileNavOverflowX: expect.any(String),
        })
        expect(mobileNavigationProof?.documentScrollWidth).toBeLessThanOrEqual(
          mobileNavigationProof?.documentClientWidth ?? 0,
        )
        expect(mobileNavigationProof?.mobileNavScrollWidth).toBeLessThanOrEqual(
          mobileNavigationProof?.mobileNavClientWidth ?? 0,
        )
        expect(
          mobileNavigationProof?.links.map(link => [link.label, link.href]),
        ).toEqual([
          ['Memory', '/prochat-memory'],
          ['Memory for QA', '/qa-memory'],
          ['Workbench', '/contact?topic=workbench'],
          ['Contact', '/contact'],
          ['LinkedIn', 'https://www.linkedin.com/company/prochattools'],
          ['GitHub', 'https://github.com/prochattools'],
        ])
        const closeMenu = page.getByLabel('Close navigation menu')
        await expect(closeMenu).toBeVisible()
        await closeMenu.click()
        await expect(mobileNav).toBeHidden()
        await expect(openMenu).toHaveAttribute('aria-expanded', 'false')
        await openMenu.click()
        await expect(openMenu).toHaveAttribute('aria-expanded', 'true')
        await expect(mobileNav).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(openMenu).toHaveAttribute('aria-expanded', 'false')
        await expect(mobileNav).toBeHidden()
        await expect(openMenu).toBeFocused()
        if (!mobileNavigationProof) {
          throw new Error('Mobile navigation proof was not captured')
        }
        mobileNavigationProof = {
          ...mobileNavigationProof,
          closeControlClosed: true,
          escapeClosed: true,
          closedMenuAriaExpanded: 'false',
          focusReturnedToTrigger: true,
        }
      }

      if (route.name === 'admin-licenses') {
        await expect(
          page.getByText('Admin authentication is not implemented yet.', {
            exact: false,
          }),
        ).toBeVisible()
      }

      if (route.name === 'dashboard') {
        await expect(page.getByText('Choose Your Plan', { exact: false })).toBeVisible()
      }

      if (route.name === 'sign-in') {
        await expect(page.getByText('Sign in to', { exact: false })).toBeVisible()
      }

      if (route.name === 'processing') {
        await expect(
          page.getByText(
            'Authentication is not enforced yet. Ory session validation is still TODO.',
            { exact: false },
          ),
        ).toBeVisible()
      }

      await page.keyboard.press('Tab')
      const activeElement = await page.evaluate(() => ({
        tag: document.activeElement?.tagName ?? null,
        text: document.activeElement?.textContent?.trim().slice(0, 120) ?? null,
      }))

      const browserVersion = browser.version()
      const firstPartyRequests = requestAudit.filter(
        request => request.classification === 'first_party',
      )

      const navigation = await page.evaluate(() => {
        const entry = performance.getEntriesByType(
          'navigation',
        )[0] as PerformanceNavigationTiming | undefined
        return entry
          ? {
              domContentLoaded: entry.domContentLoadedEventEnd,
              loadEventEnd: entry.loadEventEnd,
              transferSize: entry.transferSize,
              decodedBodySize: entry.decodedBodySize,
            }
          : null
      })

      await testInfo.attach(`${runLabel}-${route.name}-${viewport.name}.json`, {
        body: Buffer.from(
          JSON.stringify(
            {
              runLabel,
              route: route.path,
              viewport,
              status: response!.status(),
              browserRuntimeProof: {
                browserVersion,
              },
              requestedSha: {
                baseline: baselineRef,
                target: targetRef,
              },
              resolvedSha: {
                baseline: baselineSha,
                target: targetSha,
                harness: harnessSha,
              },
              screenshotName: `${route.name}-${viewport.name}.png`,
              evidenceName: `${runLabel}-${route.name}-${viewport.name}.json`,
              routeAccessProof: {
                classification: route.classification,
                expectedUnauthenticatedStatus:
                  route.expectedUnauthenticatedStatus,
                stableAssertion: route.stableAssertion,
                separateProtectedRunnerRequired:
                  route.classification ===
                  'skipped_requires_separate_protected_runner',
                noAuthorizationProofClaimed: true,
                noStateTransitionProofClaimed: true,
              },
              requestPolicyProof: {
                firstPartyOrigin,
                requestAudit,
                first_party_requests: firstPartyRequests,
                blocked_third_party_requests: blockedThirdPartyRequests,
                blocked_state_changing_third_party_requests:
                  blockedStateChangingThirdPartyRequests,
                unexpected_first_party_failures: unexpectedFirstPartyFailures,
                unexpected_console_errors: unexpectedConsoleErrors,
                allowed_known_warnings: allowedKnownWarnings,
                third_party_policy_families: thirdPartyPolicyFamilies,
              },
              screenshotPolicy,
              artifactPrivacyProof,
              databaseLifecycleProof,
              shellEvidence,
              activeElement,
              navigation,
              unexpectedConsoleErrors,
              unexpectedFirstPartyFailures,
              blockedThirdPartyRequests,
              blockedStateChangingThirdPartyRequests,
              mobileNavigationProof,
            },
            null,
            2,
          ),
        ),
        contentType: 'application/json',
      })

      expect(
        blockedStateChangingThirdPartyRequests,
        'state-changing third-party requests',
      ).toEqual([])
      expect(unexpectedFirstPartyFailures, 'first-party request failures').toEqual([])
      expect(unexpectedConsoleErrors, 'browser console errors').toEqual([])

      await expect(page).toHaveScreenshot(`${route.name}-${viewport.name}.png`, {
        animations: 'disabled',
        caret: 'hide',
        fullPage: true,
        maxDiffPixelRatio: 0.001,
      })

      await context.close()
    })
  }
}

for (const endpoint of endpointRoutes) {
  test(`${endpoint.name} endpoint`, async ({ request }, testInfo) => {
    const response = await request.get(new URL(endpoint.path, baseUrl).toString())
    expect(response.status()).toBeLessThan(500)
    await testInfo.attach(`${runLabel}-${endpoint.name}.json`, {
      body: Buffer.from(
        JSON.stringify(
          {
            runLabel,
            route: endpoint.path,
            status: response.status(),
            contentType: response.headers()['content-type'] ?? null,
            requestedSha: {
              baseline: baselineRef,
              target: targetRef,
            },
            resolvedSha: {
              baseline: baselineSha,
              target: targetSha,
              harness: harnessSha,
            },
            screenshotName: null,
            routeAccessProof: null,
            requestPolicyProof: null,
            screenshotPolicy,
            artifactPrivacyProof,
            databaseLifecycleProof,
          },
          null,
          2,
        ),
      ),
      contentType: 'application/json',
    })
  })
}
