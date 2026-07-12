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

async function collectCurrentHexCounts() {
  assertArchiveImportGuard()
  const files = await walkFiles(SRC_DIR)
  const hexByFile = {}
  const violations = []

  for (const file of files) {
    const relativePath = toRelativePath(file)
    const content = await fs.readFile(file, 'utf8')
    const count = countHexColors(content)

    if (count > 0) {
      hexByFile[relativePath] = count
    }

    if (
      !relativePath.startsWith('src/app/(marketing)/') &&
      content.includes(MARKETING_BUTTON_ALIAS)
    ) {
      violations.push(
        `${relativePath} imports ${MARKETING_BUTTON_ALIAS}; use @/components/ui/button`,
      )
    }

    if (containsForbiddenArchiveImport(content)) {
      violations.push(
        `${relativePath} imports from ${ARCHIVE_IMPORT_PATH}; archived code is historical and non-runtime`,
      )
    }
  }

  const marketingButtonFilePath = path.join(
    ROOT,
    'src',
    'app',
    '(marketing)',
    'components',
    'ui',
    'Button.tsx',
  )
  const marketingButtonFile = await fs.readFile(marketingButtonFilePath, 'utf8')

  if (!marketingButtonFile.includes("from '@/components/ui/button'")) {
    violations.push(
      'src/app/(marketing)/components/ui/Button.tsx must be a wrapper around @/components/ui/button',
    )
  }

  return { hexByFile, violations }
}

function sortObjectKeys(objectValue) {
  return Object.fromEntries(
    Object.entries(objectValue).sort((a, b) => a[0].localeCompare(b[0])),
  )
}

async function writeBaseline() {
  const { hexByFile } = await collectCurrentHexCounts()
  const payload = {
    generatedAt: new Date().toISOString(),
    rule: 'No new hardcoded hex colors in src/ (baseline lock)',
    hexByFile: sortObjectKeys(hexByFile),
  }

  await fs.mkdir(path.dirname(BASELINE_PATH), { recursive: true })
  await fs.writeFile(BASELINE_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')

  const total = Object.values(hexByFile).reduce((sum, count) => sum + count, 0)
  console.log(
    `[design-lint] Baseline updated at ${toRelativePath(BASELINE_PATH)} with ${total} hex occurrences.`,
  )
}

async function lintAgainstBaseline() {
  const baselineRaw = await fs.readFile(BASELINE_PATH, 'utf8').catch(() => null)

  if (!baselineRaw) {
    console.error(
      `[design-lint] Missing baseline file at ${toRelativePath(BASELINE_PATH)}.`,
    )
    console.error('[design-lint] Run: npm run lint:design:baseline')
    process.exit(1)
  }

  const baseline = JSON.parse(baselineRaw)
  const baselineMap = baseline.hexByFile || {}

  const { hexByFile: currentHexByFile, violations } = await collectCurrentHexCounts()
  const newHexViolations = []

  for (const [filePath, count] of Object.entries(currentHexByFile)) {
    const baselineCount = baselineMap[filePath] || 0
    if (count > baselineCount) {
      newHexViolations.push({
        filePath,
        baselineCount,
        currentCount: count,
        delta: count - baselineCount,
      })
    }
  }

  if (violations.length === 0 && newHexViolations.length === 0) {
    console.log('[design-lint] Passed. No new token violations.')
    return
  }

  if (violations.length > 0) {
    console.error('\n[design-lint] Import governance violations:')
    for (const violation of violations) {
      console.error(`  - ${violation}`)
    }
  }

  if (newHexViolations.length > 0) {
    console.error('\n[design-lint] New hardcoded hex colors detected:')
    for (const violation of newHexViolations) {
      console.error(
        `  - ${violation.filePath}: ${violation.currentCount} (baseline ${violation.baselineCount}, +${violation.delta})`,
      )
    }
  }

  console.error(
    '\n[design-lint] Migrate to tokenized colors. If intentional, regenerate baseline with npm run lint:design:baseline.',
  )
  process.exit(1)
}

if (shouldWriteBaseline) {
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
