import fs from 'node:fs'
import process from 'node:process'
import ts from 'typescript'
import YAML from 'yaml'

const workflowPath = '.github/workflows/wave1-browser-equivalence.yml'
const specPath = 'tests/evidence/wave1-shell-equivalence.spec.ts'
const configPath = 'tests/evidence/playwright.wave1.config.ts'

const pinnedActions = {
  checkout: 'actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5',
  setupNode: 'actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020',
  uploadArtifact:
    'actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02',
}

const workflowRaw = fs.readFileSync(workflowPath, 'utf8')
const spec = fs.readFileSync(specPath, 'utf8')
const config = fs.readFileSync(configPath, 'utf8')
const workflow = YAML.parse(workflowRaw)
const diagnostics =
  ts
    .transpileModule(spec, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
      },
      reportDiagnostics: true,
    })
    .diagnostics?.filter(
      diagnostic => diagnostic.category === ts.DiagnosticCategory.Error,
    ) ?? []

const errors = []
const compareJob = workflow?.jobs?.compare

if (!workflow?.on?.workflow_dispatch) errors.push('workflow_dispatch missing')
if (!compareJob) errors.push('compare job missing')
if (compareJob?.environment !== 'wave1-browser-verification') {
  errors.push('GitHub environment mismatch')
}
if (!Array.isArray(compareJob?.steps) || compareJob.steps.length < 11) {
  errors.push('workflow steps incomplete')
}

for (const required of [
  'permissions:',
  'contents: read',
  'persist-credentials: false',
  'fetch-depth: 0',
  'WAVE1_BASELINE_REF',
  'WAVE1_TARGET_REF',
  'WAVE1_BASELINE_SHA',
  'WAVE1_TARGET_SHA',
  'WAVE1_HARNESS_SHA',
  'PROCHAT_MAINTENANCE_MODE',
  'db:init',
  'db:migrate:prod',
  'chromiumExecutablePath',
  'playwright.wave1.config.ts',
  'wave1-shell-equivalence.spec.ts',
  'Cleanup runner evidence',
  '--trace=retain-on-failure',
  'steps.provenance.outputs.baseline_sha',
  'steps.provenance.outputs.target_sha',
  'steps.provenance.outputs.harness_sha',
  'wave1-browser-equivalence-${{ steps.provenance.outputs.baseline_sha }}-${{ steps.provenance.outputs.target_sha }}',
  'Protected session strategy: public and unauthenticated only',
  'Screenshot policy: provisional, retain-on-failure traces, no arbitrary masks',
  'actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5',
  'actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020',
  'actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02',
]) {
  if (!workflowRaw.includes(required)) errors.push(`workflow missing ${required}`)
}

for (const forbidden of [
  'actions/checkout@v4',
  'actions/setup-node@v4',
  'actions/upload-artifact@v4',
  '--trace=on',
  'WAVE1_PROTECTED_STATE_BASELINE_B64',
  'WAVE1_PROTECTED_STATE_TARGET_B64',
  'WAVE1_PROTECTED_STATE_PATH',
  'WAVE1_CHAT_PROJECT_ID',
  'chat_project_id',
  'wave1-auth',
  'storageState',
  'baseline.log',
  'target.log',
]) {
  if (workflowRaw.includes(forbidden)) errors.push(`workflow still contains ${forbidden}`)
}

for (const required of [
  "{ name: '320', width: 320",
  "{ name: '768', width: 768",
  "{ name: '1024', width: 1024",
  "{ name: '1440', width: 1440",
  "{ name: '1728', width: 1728",
  "path: '/'",
  "path: '/contact'",
  "path: '/privacy'",
  "path: '/docs'",
  "path: '/prochat-memory'",
  "path: '/buildflow'",
  "path: '/admin/licenses'",
  "path: '/dashboard'",
  "path: '/chat/[projectID]'",
  "path: '/sign-in'",
  "path: '/processing-page'",
  "path: '/maintenance'",
  "path: '/unsubscribe'",
  "path: '/api/health'",
  "path: '/og'",
  'route_accessibility',
  'public_sign_in_surface',
  'skipped_requires_separate_protected_runner',
  'skipReason',
  'No unauthenticated chat proof is claimed.',
  'Admin authentication is not implemented yet.',
  'Choose Your Plan',
  'Sign in to',
  'Authentication is not enforced yet. Ory session validation is still TODO.',
  'Open navigation menu',
  'Close navigation menu',
  'Memory for QA',
  'aria-expanded',
  'closeControlClosed',
  'escapeClosed',
  'focusReturnedToTrigger',
  'documentScrollWidth',
  'documentClientWidth',
  'mobileNavScrollWidth',
  'mobileNavClientWidth',
  'mobileNavOverflowX',
  'requestPolicyProof',
  'first_party_requests',
  'blocked_third_party_requests',
  'blocked_state_changing_third_party_requests',
  'unexpected_first_party_failures',
  'unexpected_console_errors',
  'allowed_known_warnings',
  'third_party_policy_families',
  'noAuthorizationProofClaimed',
  'noStateTransitionProofClaimed',
  'separateProtectedRunnerRequired',
  'screenshotPolicy',
  'PROVISIONAL_REQUIRES_FIRST_RUN_CALIBRATION',
  'maxDiffPixelRatio: 0.001',
  "global_masks: 'none unless a volatile region is proven'",
  'manual_review_required: true',
  'databaseLifecycleProof',
  "database_strategy: 'CONDITIONALLY_APPROVED'",
  "database_lifecycle: 'EPHEMERAL_GITHUB_SERVICE_CONTAINER'",
  'artifactPrivacyProof',
  'noCookies: true',
  'noAuthorizationHeaders: true',
  'noAuthStateFiles: true',
  'noStorageState: true',
  'noTokens: true',
  'browserRuntimeProof',
  'browser.version()',
  'requestedSha',
  'resolvedSha',
  'screenshotName',
  'evidenceName',
  "page.route('**/*'",
  'retain-on-failure',
  'toHaveScreenshot',
  'toHaveAttribute',
]) {
  if (!spec.includes(required)) errors.push(`spec missing ${required}`)
}

for (const forbidden of [
  'protectedStatePath',
  'protectedContext',
  'protectedRouteProof',
  'storageStateProvided',
  'WAVE1_PROTECTED_STATE_PATH',
  'WAVE1_CHAT_PROJECT_ID',
  'chat_project_id',
  'commitProvenance',
  'externalRequests',
  'firstPartyRequestFailures',
  'requestFailures',
  'consoleErrors',
  'protectedFlowProof',
  'storageState',
  'authorized',
]) {
  if (spec.includes(forbidden)) errors.push(`spec still contains ${forbidden}`)
}

for (const required of [
  "name: 'wave1-chromium'",
  "browserName: 'chromium'",
  "reducedMotion: 'reduce'",
  'workers: 1',
  'retries: 0',
  "locale: 'en-US'",
  "timezoneId: 'UTC'",
  "screenshot: 'only-on-failure'",
]) {
  if (!config.includes(required)) errors.push(`config missing ${required}`)
}

for (const diagnostic of diagnostics) {
  errors.push(
    `TypeScript syntax: ${ts.flattenDiagnosticMessageText(
      diagnostic.messageText,
      ' ',
    )}`,
  )
}

if (errors.length > 0) {
  console.error(JSON.stringify({ status: 'failed', errors }, null, 2))
  process.exit(1)
}

console.log(
  JSON.stringify(
    {
      status: 'ok',
      yaml: 'valid',
      workflowSteps: compareJob.steps.length,
      typescriptSyntax: 'valid',
      routeMatrix: '15 route records',
      viewports: 5,
      environment: compareJob.environment,
      actionPins: pinnedActions,
      proofFields:
        'requestedSha resolvedSha routeAccessProof requestPolicyProof screenshotPolicy databaseLifecycleProof artifactPrivacyProof mobileNavigationProof',
    },
    null,
    2,
  ),
)
