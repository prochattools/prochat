#!/usr/bin/env node

import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, 'src')
const ARCHIVE_DIR = path.join(ROOT, 'archive', 'legacy-public-platform')
const BASELINE_PATH = path.join(
  ROOT,
  'scripts',
  'design',
  'design-lint-baseline.json',
)

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g
const SOURCE_FILE_REGEX = /\.(?:[cm]?[jt]sx?|css|scss)$/
const ARCHIVE_GUARD_FILE_REGEX = /\.(?:[cm]?[jt]sx?|css|scss|sass|less|mdx)$/
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
} else {
  await lintAgainstBaseline()
}
