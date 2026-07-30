#!/usr/bin/env node

import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, 'src')
const ARCHIVE_DIR = path.join(ROOT, 'archive', 'legacy-public-platform')
const FOUNDATION_STYLE_PATH = path.join(
  ROOT,
  'src',
  'assets',
  'styles',
  'prochat-foundation.css',
)
const FOUNDATION_FONT_PATH = path.join(ROOT, 'src', 'lib', 'prochat-fonts.ts')
const SHELL_MANIFEST_PATH = path.join(
  ROOT,
  'docs',
  'migration',
  'WAVE1_SHELL_RESPONSIBILITIES.json',
)
const SHELL_ROUTES_PATH = path.join(ROOT, 'src', 'helpers', 'shell-routes.ts')
const APP_CHROME_PATH = path.join(ROOT, 'src', 'components', 'AppChrome.tsx')
const PROVIDERS_PATH = path.join(ROOT, 'src', 'components', 'providers.tsx')
const SHELL_COMPONENT_PATHS = {
  canonical: path.join(
    ROOT,
    'src',
    'components',
    'shell',
    'CanonicalPublicShell.tsx',
  ),
  protected: path.join(
    ROOT,
    'src',
    'components',
    'shell',
    'ProtectedInternalShell.tsx',
  ),
  legacy: path.join(
    ROOT,
    'src',
    'components',
    'shell',
    'LegacyCompatibilityShell.tsx',
  ),
  noShared: path.join(
    ROOT,
    'src',
    'components',
    'shell',
    'NoSharedShell.tsx',
  ),
}
const BASELINE_PATH = path.join(
  ROOT,
  'scripts',
  'design',
  'design-lint-baseline.json',
)

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g
const SOURCE_FILE_REGEX = /\.(?:[cm]?[jt]sx?|css|scss)$/
const ARCHIVE_GUARD_FILE_REGEX = /\.(?:[cm]?[jt]sx?|css|scss|sass|less|mdx)$/
const REQUIRED_FOUNDATION_TOKENS = [
  '--pc-foundation-color-page',
  '--pc-foundation-color-surface-raised',
  '--pc-foundation-color-surface-inset',
  '--pc-foundation-color-text-primary',
  '--pc-foundation-color-text-muted',
  '--pc-foundation-color-border-subtle',
  '--pc-foundation-color-border-strong',
  '--pc-foundation-color-accent',
  '--pc-foundation-color-focus-ring',
  '--pc-foundation-color-selection-background',
  '--pc-foundation-color-success',
  '--pc-foundation-color-warning',
  '--pc-foundation-color-error',
  '--pc-foundation-space-4',
  '--pc-foundation-container-page',
  '--pc-foundation-container-content',
  '--pc-foundation-container-reading',
  '--pc-foundation-radius-md',
  '--pc-foundation-shadow-sm',
  '--pc-foundation-font-primary',
  '--pc-foundation-font-technical',
  '--pc-foundation-duration-fast',
  '--pc-foundation-ease-standard',
]
const FORBIDDEN_FOUNDATION_PATTERNS = [
  /host\s*grotesk/i,
  /\binter\b/i,
  /playfair/i,
  /material\s*symbols/i,
  /\bpaper\b/i,
  /\bcoral\b/i,
  /\bolive\b/i,
  /gradient\s*\(/i,
  /\bglow\b/i,
  /\bblob\b/i,
  /backdrop-filter/i,
  /scroll-behavior\s*:\s*smooth/i,
  /@keyframes/i,
  /\banimation\s*:/i,
  /(?:^|[,{])\s*\*\s*(?=[,{])/m,
]
const MARKETING_BUTTON_ALIAS = "@/app/(marketing)/components/ui/Button"
const ARCHIVE_IMPORT_PATH = 'archive/legacy-public-platform'
const ARCHIVE_IMPORT_PATTERNS = [
  /\bimport\s+(?:[^'\"]+\s+from\s+)?['\"][^'\"]*archive\/legacy-public-platform[^'\"]*['\"]/, 
  /\bexport\s+[^'\"]+\s+from\s+['\"][^'\"]*archive\/legacy-public-platform[^'\"]*['\"]/, 
  /\bimport\s*\(\s*['\"][^'\"]*archive\/legacy-public-platform[^'\"]*['\"]\s*\)/,
  /\brequire\s*\(\s*['\"][^'\"]*archive\/legacy-public-platform[^'\"]*['\"]\s*\)/,
]
const LEGACY_SELECTOR_PATTERNS = [
  /\.hero--old\b/,
  /\.button--glass\b/,
  /\.pm-wordmark-mark\b/,
  /\.pc-action-label\b/,
]
const UNAUTHORIZED_STYLE_PATTERNS = [
  { pattern: /filter\s*:\s*drop-shadow\([^)]*(?:cyan|magenta|purple)/i, label: 'colored drop-shadow glow' },
  { pattern: /box-shadow\s*:[^;]*(?:cyan|magenta|purple)/i, label: 'named-color glow' },
]
const args = process.argv.slice(2)
const shouldWriteBaseline = args.includes('--write-baseline')
const shouldCheckArchiveImportsOnly = args.includes('--archive-imports-only')
const shouldCheckCanonicalFoundationOnly = args.includes(
  '--canonical-foundation-only',
)
const shouldCheckShellRoutingOnly = args.includes('--shell-routing-only')

async function walkFiles(directoryPath, fileRegex = SOURCE_FILE_REGEX) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(directoryPath, entry.name)

      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next') {
          return []
        }
        return walkFiles(fullPath, fileRegex)
      }

      if (!fileRegex.test(entry.name)) return []
      return [fullPath]
    }),
  )

  return files.flat()
}

function toRelativePath(absolutePath) {
  return path.relative(ROOT, absolutePath).replaceAll(path.sep, '/')
}

function countHexColors(content) {
  const matches = content.match(HEX_COLOR_REGEX)
  return matches ? matches.length : 0
}

function containsForbiddenArchiveImport(content) {
  return ARCHIVE_IMPORT_PATTERNS.some(pattern => pattern.test(content))
}

function assertArchiveImportGuard() {
  const forbiddenFixtures = [
    "import legacy from '../../archive/legacy-public-platform/components/legacy.js'",
    "export { legacy } from 'archive/legacy-public-platform/components/legacy.js'",
    "const legacy = await import('../archive/legacy-public-platform/routes/legacy.js')",
    "const legacy = require('../archive/legacy-public-platform/styles/legacy.js')",
  ]
  const allowedFixtures = [
    "import current from '@/components/current'",
    "const archiveReference = 'archive/legacy-public-platform'",
  ]

  if (
    forbiddenFixtures.some(fixture => !containsForbiddenArchiveImport(fixture)) ||
    allowedFixtures.some(fixture => containsForbiddenArchiveImport(fixture))
  ) {
    throw new Error('[design-lint] Archive import guard self-test failed.')
  }
}

async function lintArchiveImportsOnly() {
  assertArchiveImportGuard()
  const files = await walkFiles(SRC_DIR, ARCHIVE_GUARD_FILE_REGEX)
  const violations = []

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')
    if (containsForbiddenArchiveImport(content)) {
      violations.push(`${toRelativePath(file)} imports archived runtime source`)
    }
  }

  const compilableArchiveFiles = await walkFiles(
    ARCHIVE_DIR,
    ARCHIVE_GUARD_FILE_REGEX,
  ).catch(error => {
    if (error?.code === 'ENOENT') return []
    throw error
  })

  for (const file of compilableArchiveFiles) {
    violations.push(
      `${toRelativePath(file)} uses an executable source extension; store historical source as <original-name>.archive`,
    )
  }

  if (violations.length === 0) {
    console.log(
      '[design-lint] Archive boundary passed: imports, in-memory fixtures, and non-compilable storage.',
    )
    return
  }

  console.error('[design-lint] Archive boundary violations detected:')
  for (const violation of violations) {
    console.error(`  - ${violation}`)
  }
  process.exit(1)
}

async function lintCanonicalFoundationOnly() {
  const [styleContent, fontContent] = await Promise.all([
    fs.readFile(FOUNDATION_STYLE_PATH, 'utf8'),
    fs.readFile(FOUNDATION_FONT_PATH, 'utf8'),
  ])
  const violations = []

  for (const token of REQUIRED_FOUNDATION_TOKENS) {
    if (!styleContent.includes(`${token}:`)) {
      violations.push(`missing required token ${token}`)
    }
  }

  if (!styleContent.includes('--pc-foundation-color-accent: #3158c7;')) {
    violations.push('canonical ProChat Cobalt must be #3158C7')
  }

  for (const pattern of FORBIDDEN_FOUNDATION_PATTERNS) {
    if (pattern.test(styleContent)) {
      violations.push(`forbidden legacy or effect pattern ${pattern}`)
    }
  }

  const fontRequirements = [
    "import { Golos_Text, JetBrains_Mono } from 'next/font/google'",
    "variable: '--font-prochat-sans'",
    "variable: '--font-prochat-mono'",
  ]
  for (const requirement of fontRequirements) {
    if (!fontContent.includes(requirement)) {
      violations.push(`font module missing ${requirement}`)
    }
  }

  const forbiddenFontPatterns = [
    /next\/font\/local/,
    /@fontsource/,
    /host\s*grotesk/i,
    /playfair/i,
    /material\s*symbols/i,
    /\binter\b/i,
  ]
  for (const pattern of forbiddenFontPatterns) {
    if (pattern.test(fontContent)) {
      violations.push(`font module contains forbidden loading path ${pattern}`)
    }
  }

  if ((fontContent.match(/Golos_Text\s*\(/g) ?? []).length !== 1) {
    violations.push('font module must configure Golos Text exactly once')
  }
  if ((fontContent.match(/JetBrains_Mono\s*\(/g) ?? []).length !== 1) {
    violations.push('font module must configure JetBrains Mono exactly once')
  }

  const sourceFiles = await walkFiles(SRC_DIR, ARCHIVE_GUARD_FILE_REGEX)
  for (const file of sourceFiles) {
    if (file === FOUNDATION_STYLE_PATH || file === FOUNDATION_FONT_PATH) continue
    const content = await fs.readFile(file, 'utf8')
    if (
      content.includes('prochat-foundation.css') ||
      content.includes('prochat-fonts')
    ) {
      violations.push(`${toRelativePath(file)} consumes the additive foundation`)
    }
  }

  if (violations.length === 0) {
    console.log(
      '[design-lint] Canonical foundation passed: tokens, fonts, forbidden patterns, and zero live consumers.',
    )
    return
  }

  console.error('[design-lint] Canonical foundation violations detected:')
  for (const violation of violations) {
    console.error(`  - ${violation}`)
  }
  process.exit(1)
}

async function lintShellRoutingOnly() {
  const [
    manifestRaw,
    shellRoutes,
    appChrome,
    providers,
    canonicalShell,
    protectedShell,
    legacyShell,
    noSharedShell,
    foundationStyle,
  ] = await Promise.all([
    fs.readFile(SHELL_MANIFEST_PATH, 'utf8'),
    fs.readFile(SHELL_ROUTES_PATH, 'utf8'),
    fs.readFile(APP_CHROME_PATH, 'utf8'),
    fs.readFile(PROVIDERS_PATH, 'utf8'),
    fs.readFile(SHELL_COMPONENT_PATHS.canonical, 'utf8'),
    fs.readFile(SHELL_COMPONENT_PATHS.protected, 'utf8'),
    fs.readFile(SHELL_COMPONENT_PATHS.legacy, 'utf8'),
    fs.readFile(SHELL_COMPONENT_PATHS.noShared, 'utf8'),
    fs.readFile(FOUNDATION_STYLE_PATH, 'utf8'),
  ])

  const manifest = JSON.parse(manifestRaw)
  const manifestAssignments = new Map()
  for (const [shellClass, definition] of Object.entries(
    manifest.shell_classes ?? {},
  )) {
    for (const routeId of definition.route_ids ?? []) {
      if (manifestAssignments.has(routeId)) {
        throw new Error(`[design-lint] Duplicate manifest route ${routeId}.`)
      }
      manifestAssignments.set(routeId, shellClass)
    }
  }

  const executableAssignments = new Map()
  const routeDefinitionPattern =
    /routeId: '(ROUTE-\d{3})'.*?shellClass: '([^']+)'/g
  for (const match of shellRoutes.matchAll(routeDefinitionPattern)) {
    const [, routeId, shellClass] = match
    if (executableAssignments.has(routeId)) {
      throw new Error(`[design-lint] Duplicate executable route ${routeId}.`)
    }
    executableAssignments.set(routeId, shellClass)
  }

  const violations = []
  if (manifestAssignments.size !== 84) {
    violations.push(`manifest must contain 84 routes, found ${manifestAssignments.size}`)
  }
  if (executableAssignments.size !== 84) {
    violations.push(
      `executable route map must contain 84 routes, found ${executableAssignments.size}`,
    )
  }

  for (const [routeId, shellClass] of manifestAssignments) {
    if (executableAssignments.get(routeId) !== shellClass) {
      violations.push(
        `${routeId} executable class ${executableAssignments.get(routeId) ?? 'missing'} does not match ${shellClass}`,
      )
    }
  }

  if (!shellRoutes.includes('CURRENT_CANONICAL_VISUAL_ROUTES = [] as const')) {
    violations.push('current canonical visual route allowlist must remain empty')
  }

  for (const route of ['/memory', '/memory/qa', '/workbench', '/philosophy', '/about']) {
    if (!shellRoutes.includes(`'${route}'`)) {
      violations.push(`future canonical route ${route} is missing`)
    }
  }

  const requiredAppChromeMarkers = [
    'CanonicalPublicShell',
    'ProtectedInternalShell',
    'LegacyCompatibilityShell',
    'NoSharedShell',
    'getShellRouteClass',
    'isCurrentCanonicalVisualShellPath',
    'isCurrentDocsShellPath',
  ]
  for (const marker of requiredAppChromeMarkers) {
    if (!appChrome.includes(marker)) {
      violations.push(`AppChrome missing ${marker}`)
    }
  }

  const requiredProviderMarkers = [
    'CanonicalPublicProviders',
    'LegacyCompatibilityProviders',
    'isCurrentCanonicalVisualShellPath',
    '<ThemeProvider',
    '<Toaster',
    '<Tooltip',
  ]
  for (const marker of requiredProviderMarkers) {
    if (!providers.includes(marker)) {
      violations.push(`Providers missing ${marker}`)
    }
  }

  const legacyMarkers = [
    'pc-site-surface',
    'pc-site-surface__backdrop',
    'pc-site-surface__lines',
    'pc-site-surface__blob--hero',
    'pc-site-surface__blob--mid',
    'pc-site-surface__blob--lower',
    'pc-site-surface__blob--accent',
    'pc-site-surface__noise',
    '<Header />',
    '<AppShell>{children}</AppShell>',
  ]
  for (const marker of legacyMarkers) {
    if (!legacyShell.includes(marker)) {
      violations.push(`legacy compatibility shell missing ${marker}`)
    }
  }

  if (!protectedShell.includes('<LegacyCompatibilityShell>')) {
    violations.push('protected shell must preserve current legacy output')
  }
  if (noSharedShell.includes('<Header') || noSharedShell.includes('<AppShell')) {
    violations.push('no-shared shell must not render public chrome')
  }

  const canonicalMarkers = [
    "CANONICAL_MAIN_ID = 'main-content'",
    "CANONICAL_FOUNDATION_CLASS = 'pc-foundation-scope'",
    "'--font-prochat-sans'",
    "'--font-prochat-mono'",
    'Skip to content',
    '<main id={CANONICAL_MAIN_ID}>',
  ]
  for (const marker of canonicalMarkers) {
    if (!canonicalShell.includes(marker)) {
      violations.push(`canonical shell missing ${marker}`)
    }
  }

  if (
    !foundationStyle.includes('.pc-foundation-scope') ||
    !foundationStyle.includes('.pc-skip-link:focus-visible')
  ) {
    violations.push('canonical foundation scope or skip-link focus style missing')
  }

  if (
    executableAssignments.get('ROUTE-017') !==
    'temporary_legacy_compatibility'
  ) {
    violations.push('BuildFlow must remain temporary legacy compatibility')
  }

  if (violations.length === 0) {
    const counts = Object.fromEntries(
      Object.keys(manifest.shell_classes).map(shellClass => [
        shellClass,
        [...manifestAssignments.values()].filter(value => value === shellClass)
          .length,
      ]),
    )
    console.log(
      `[design-lint] Shell routing passed: ${JSON.stringify(counts)}; current canonical allowlist empty.`,
    )
    return
  }

  console.error('[design-lint] Shell routing violations detected:')
  for (const violation of violations) {
    console.error(`  - ${violation}`)
  }
  process.exit(1)
}

const GOVERNANCE_RULES = [
  'hardcoded-hex',
  'semantic-token-layer',
  'duplicate-system',
  'legacy-selector',
  'unauthorized-style',
]
const CANONICAL_COMPONENT_PATHS = {
  marketingNav: 'src/app/(marketing)/components/layout/MarketingNav.tsx',
  sharedButton: 'src/components/ui/button.tsx',
  marketingButton: 'src/app/(marketing)/components/ui/Button.tsx',
}
const ALLOWED_BUTTON_COMPONENTS = new Set([
  CANONICAL_COMPONENT_PATHS.sharedButton,
  CANONICAL_COMPONENT_PATHS.marketingButton,
])

function lineNumberFor(content, index) {
  return content.slice(0, index).split('\n').length
}

function pushAllPatternViolations(violations, rule, relativePath, content, pattern, remediation) {
  const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`
  const matcher = new RegExp(pattern.source, flags)
  for (const match of content.matchAll(matcher)) {
    violations.push({
      rule,
      file: relativePath,
      line: lineNumberFor(content, match.index ?? 0),
      pattern: match[0],
      remediation,
    })
  }
}

function collectContentViolations(relativePath, content) {
  const violations = []
  pushAllPatternViolations(
    violations,
    'hardcoded-hex',
    relativePath,
    content,
    HEX_COLOR_REGEX,
    'Replace the literal with an approved semantic token; update the baseline only for documented legacy debt.',
  )

  const isMarketingComponent =
    relativePath.startsWith('src/app/(marketing)/') &&
    relativePath !== 'src/app/(marketing)/prochat-memory-theme.css'
  const isDocsSurface =
    relativePath.startsWith('src/app/docs/') || relativePath === 'styles/docs.css'

  if (isMarketingComponent) {
    pushAllPatternViolations(
      violations,
      'semantic-token-layer',
      relativePath,
      content,
      /--pc-foundation-[a-z0-9-]+/i,
      'Marketing code must consume --pm-* or --pc-public-* semantic tokens.',
    )
  }
  if (isDocsSurface) {
    pushAllPatternViolations(
      violations,
      'semantic-token-layer',
      relativePath,
      content,
      /--(?:pm|pc-foundation)-[a-z0-9-]+/i,
      'Docs code must consume --pc-public-* semantic tokens.',
    )
  }

  for (const pattern of LEGACY_SELECTOR_PATTERNS) {
    pushAllPatternViolations(
      violations,
      'legacy-selector',
      relativePath,
      content,
      pattern,
      'Use the canonical navigation, logo, button, and typography systems.',
    )
  }

  for (const { pattern, label } of UNAUTHORIZED_STYLE_PATTERNS) {
    pushAllPatternViolations(
      violations,
      'unauthorized-style',
      relativePath,
      content,
      pattern,
      `Remove ${label}; use approved semantic shadows and the cobalt accent.`,
    )
  }

  if (!relativePath.startsWith('src/app/(marketing)/') && content.includes(MARKETING_BUTTON_ALIAS)) {
    violations.push({
      rule: 'duplicate-system',
      file: relativePath,
      line: lineNumberFor(content, content.indexOf(MARKETING_BUTTON_ALIAS)),
      pattern: MARKETING_BUTTON_ALIAS,
      remediation: 'Import @/components/ui/button outside the marketing surface.',
    })
  }
  if (containsForbiddenArchiveImport(content)) {
    violations.push({
      rule: 'legacy-selector',
      file: relativePath,
      line: 1,
      pattern: ARCHIVE_IMPORT_PATH,
      remediation: 'Archived code is historical evidence and must not be imported at runtime.',
    })
  }
  return violations
}

function collectDuplicatePathViolations(relativePaths) {
  const violations = []
  for (const relativePath of relativePaths) {
    if (/(?:^|\/)(?:PublicProductNavigation|Navbar|NavBar)\.tsx$/.test(relativePath)) {
      violations.push({
        rule: 'duplicate-system',
        file: relativePath,
        line: 1,
        pattern: path.posix.basename(relativePath),
        remediation: `Use ${CANONICAL_COMPONENT_PATHS.marketingNav}.`,
      })
    }
    if (/(?:^|\/)Button\.tsx$/.test(relativePath) && !ALLOWED_BUTTON_COMPONENTS.has(relativePath)) {
      violations.push({
        rule: 'duplicate-system',
        file: relativePath,
        line: 1,
        pattern: 'Button.tsx',
        remediation: `Use ${CANONICAL_COMPONENT_PATHS.sharedButton} or the approved marketing wrapper.`,
      })
    }
  }
  return violations
}

async function collectGovernanceViolations() {
  assertArchiveImportGuard()
  const files = await walkFiles(SRC_DIR)
  const relativePaths = files.map(toRelativePath)
  const violations = []

  for (const file of files) {
    const relativePath = toRelativePath(file)
    violations.push(...collectContentViolations(relativePath, await fs.readFile(file, 'utf8')))
  }

  const docsStylePath = path.join(ROOT, 'styles', 'docs.css')
  const docsStyleContent = await fs.readFile(docsStylePath, 'utf8').catch(error => {
    if (error?.code === 'ENOENT') return ''
    throw error
  })
  if (docsStyleContent) {
    violations.push(...collectContentViolations('styles/docs.css', docsStyleContent))
  }

  violations.push(...collectDuplicatePathViolations(relativePaths))

  for (const [role, relativePath] of Object.entries(CANONICAL_COMPONENT_PATHS)) {
    const exists = await fs.access(path.join(ROOT, relativePath)).then(() => true).catch(() => false)
    if (!exists) {
      violations.push({
        rule: 'duplicate-system',
        file: relativePath,
        line: 1,
        pattern: `missing canonical ${role}`,
        remediation: 'Restore the canonical component instead of introducing a parallel system.',
      })
    }
  }

  const marketingButton = await fs.readFile(path.join(ROOT, CANONICAL_COMPONENT_PATHS.marketingButton), 'utf8')
  if (!marketingButton.includes("from '@/components/ui/button'")) {
    violations.push({
      rule: 'duplicate-system',
      file: CANONICAL_COMPONENT_PATHS.marketingButton,
      line: 1,
      pattern: 'independent marketing button implementation',
      remediation: `Wrap ${CANONICAL_COMPONENT_PATHS.sharedButton}.`,
    })
  }

  return violations.sort((a, b) =>
    [a.rule, a.file, a.pattern, a.line].join('\0').localeCompare([b.rule, b.file, b.pattern, b.line].join('\0')),
  )
}

function exemptionKey({ rule, file, pattern }) {
  return JSON.stringify([rule, file, pattern])
}

function groupViolations(violations) {
  const groups = new Map()
  for (const violation of violations) {
    const key = exemptionKey(violation)
    const existing = groups.get(key) ?? { ...violation, count: 0 }
    existing.count += 1
    groups.set(key, existing)
  }
  return [...groups.values()].sort((a, b) => exemptionKey(a).localeCompare(exemptionKey(b)))
}

function validateBaseline(baseline) {
  if (baseline?.version !== 2 || !Array.isArray(baseline.exemptions)) {
    throw new Error('[design-lint] Baseline must use version 2 with an exemptions array.')
  }
  for (const exemption of baseline.exemptions) {
    if (
      !GOVERNANCE_RULES.includes(exemption.rule) ||
      typeof exemption.file !== 'string' ||
      typeof exemption.pattern !== 'string' ||
      !Number.isInteger(exemption.count) ||
      exemption.count < 1 ||
      typeof exemption.reason !== 'string' ||
      exemption.reason.trim().length < 10
    ) {
      throw new Error(`[design-lint] Invalid baseline exemption: ${JSON.stringify(exemption)}`)
    }
  }
}

async function writeBaseline() {
  const groups = groupViolations(await collectGovernanceViolations())
  const payload = {
    version: 2,
    generatedAt: new Date().toISOString(),
    authority: {
      source: 'Mind: wiki/organisations/prochat/brand/global-design-foundation.md',
      defaultMode: 'light',
      accent: '#3158C7',
    },
    exemptions: groups.map(({ rule, file, pattern, count }) => ({
      rule,
      file,
      pattern,
      count,
      reason: 'Existing production debt at PXF-010 baseline; migration remains tracked and this count may not increase.',
    })),
  }
  await fs.writeFile(BASELINE_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
  console.log(`[design-lint] Wrote ${payload.exemptions.length} explicit exemptions to ${toRelativePath(BASELINE_PATH)}.`)
}

function formatViolation(violation, allowedCount = 0, currentCount = 1) {
  return [
    `[${violation.rule}] ${violation.file}:${violation.line}`,
    `pattern=${JSON.stringify(violation.pattern)} count=${currentCount} baseline=${allowedCount}`,
    `remediation=${violation.remediation}`,
  ].join(' | ')
}

async function lintAgainstBaseline() {
  const baselineRaw = await fs.readFile(BASELINE_PATH, 'utf8').catch(() => null)
  if (!baselineRaw) throw new Error(`[design-lint] Missing baseline at ${toRelativePath(BASELINE_PATH)}.`)
  const baseline = JSON.parse(baselineRaw)
  validateBaseline(baseline)

  const groups = groupViolations(await collectGovernanceViolations())
  const exemptions = new Map(baseline.exemptions.map(item => [exemptionKey(item), item]))
  const failures = groups.filter(group => group.count > (exemptions.get(exemptionKey(group))?.count ?? 0))

  if (failures.length === 0) {
    console.log(`[design-lint] Passed ${GOVERNANCE_RULES.length} governance rules with ${baseline.exemptions.length} explicit debt exemptions.`)
    return
  }

  console.error('[design-lint] New or increased governance violations:')
  for (const failure of failures) {
    const allowed = exemptions.get(exemptionKey(failure))?.count ?? 0
    console.error(`  - ${formatViolation(failure, allowed, failure.count)}`)
  }
  process.exit(1)
}

function fixtureViolations(rule) {
  switch (rule) {
    case 'hardcoded-hex':
      return collectContentViolations('src/fixtures/hex.css', '.x { color: #123456; }').filter(item => item.rule === rule)
    case 'semantic-token-layer':
      return collectContentViolations('src/app/docs/fixture.css', '.x { color: var(--pm-text); }').filter(item => item.rule === rule)
    case 'duplicate-system':
      return collectDuplicatePathViolations(['src/fixtures/Navbar.tsx'])
    case 'legacy-selector':
      return collectContentViolations('src/fixtures/legacy.css', '.pm-wordmark-mark {}').filter(item => item.rule === rule)
    case 'unauthorized-style':
      return collectContentViolations('src/fixtures/glow.css', '.x { box-shadow: 0 0 1rem purple; }').filter(item => item.rule === rule)
    default:
      throw new Error(`[design-lint] Unknown fixture rule ${rule}.`)
  }
}

const fixtureRuleArg = args.find(arg => arg.startsWith('--fixture-rule='))
if (fixtureRuleArg) {
  const rule = fixtureRuleArg.slice('--fixture-rule='.length)
  const violations = fixtureViolations(rule)
  if (violations.length === 0) {
    console.error(`[design-lint] Fixture for ${rule} did not trigger.`)
    process.exit(2)
  }
  console.error(`[design-lint] Intentional fixture failure: ${formatViolation(violations[0])}`)
  process.exit(1)
} else if (shouldWriteBaseline) {
  await writeBaseline()
} else if (shouldCheckArchiveImportsOnly) {
  await lintArchiveImportsOnly()
} else if (shouldCheckCanonicalFoundationOnly) {
  await lintCanonicalFoundationOnly()
} else if (shouldCheckShellRoutingOnly) {
  await lintShellRoutingOnly()
} else {
  await lintAgainstBaseline()
}
