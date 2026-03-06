#!/usr/bin/env node

import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, 'src')
const BASELINE_PATH = path.join(
  ROOT,
  'scripts',
  'design',
  'design-lint-baseline.json',
)

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g
const SOURCE_FILE_REGEX = /\.(?:[cm]?[jt]sx?|css|scss)$/
const MARKETING_BUTTON_ALIAS = "@/app/(marketing)/components/ui/Button"

const args = process.argv.slice(2)
const shouldWriteBaseline = args.includes('--write-baseline')

async function walkFiles(directoryPath) {
  const entries = await fs.readdir(directoryPath, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async entry => {
      const fullPath = path.join(directoryPath, entry.name)

      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next') {
          return []
        }
        return walkFiles(fullPath)
      }

      if (!SOURCE_FILE_REGEX.test(entry.name)) return []
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

async function collectCurrentHexCounts() {
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
} else {
  await lintAgainstBaseline()
}
