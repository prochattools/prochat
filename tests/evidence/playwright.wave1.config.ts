import { defineConfig } from '@playwright/test'

const isCI = process.env.CI === 'true'
const browserChannel = process.env.PLAYWRIGHT_CHANNEL

export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  outputDir: './test-results',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  retries: isCI ? 1 : 0,
  workers: 1,
  fullyParallel: false,
  reporter: isCI
    ? [['line']]
    : [['html', { outputFolder: './playwright-report', open: 'never' }]],
  use: {
    browserName: 'chromium',
    ...(browserChannel ? { launchOptions: { channel: browserChannel } } : {}),
    locale: 'en-US',
    timezoneId: 'UTC',
    colorScheme: 'light',
    contextOptions: {
      reducedMotion: 'reduce',
    },
    screenshot: 'only-on-failure',
    trace: isCI ? 'retain-on-failure' : 'on-first-retry',
    video: 'off',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
    ignoreHTTPSErrors: false,
  },
  projects: [
    {
      name: 'wave1-chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
})
