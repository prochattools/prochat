#!/usr/bin/env node
import { execFile } from 'node:child_process'
import { cp, mkdtemp, mkdir, readdir, readFile, rename, rm, stat } from 'fs/promises'
import os from 'os'
import path from 'path'
import { promisify } from 'node:util'

import { loadRegistry } from './shared.ts'

const execFileAsync = promisify(execFile)
const DOCS_EXPORT_ROOT = path.resolve('docs-export')
const DOCS_EXPORT_TMP_ROOT = path.join(DOCS_EXPORT_ROOT, '.tmp')
const CANONICAL_PUBLIC_DOCS_ROOT = path.join('docs', 'public')
const IGNORED_DIRS = new Set([
  '.git',
  '.github',
  '.next',
  '.turbo',
  '.cache',
  'node_modules',
  'dist',
  'build',
  'coverage',
  'out',
  'private',
  'docs-private',
])
const SENSITIVE_LINE_PATTERNS = [
  {
    label: 'private key assignment',
    regex: /\bprivate[_ -]?key\b\s*[:=]\s*['"]?[A-Za-z0-9+/=_-]{8,}/i,
  },
  {
    label: 'secret assignment',
    regex: /\b(?:secret|token|password|api[-_ ]?key)\b\s*[:=]\s*['"]?[A-Za-z0-9+/=_-]{8,}/i,
  },
  {
    label: '.env-style credential line',
    regex: /(?:^|\n)\s*[A-Z0-9_]*(?:SECRET|TOKEN|PASSWORD|API[_-]?KEY)[A-Z0-9_]*\s*=\s*.+/m,
  },
  {
    label: '.env file reference',
    regex: /(?:^|\n)\s*\.env(?:\.[A-Za-z0-9_-]+)?\s*$/m,
  },
]

function stripFencedCodeBlocks(content: string) {
  return content.replace(/```[\s\S]*?```/g, block => '\n'.repeat(block.split('\n').length - 1))
}

type ParsedArgs = {
  repoUrl: string
  target: string
}

type SourceCandidate = {
  absolutePath: string
  relativePath: string
  markdownFiles: number
}

type CopyStats = {
  copied: number
  skippedSensitive: number
}

function normalizeRepoName(repoUrl: string) {
  const trimmed = repoUrl.trim().replace(/\/+$/, '')
  const repoName = trimmed.split('/').pop() || ''
  return repoName.replace(/\.git$/i, '').toLowerCase()
}

function printUsage() {
  console.log('Usage: npm run docs:extract:repo -- <repo-url> <target>')
  console.log('Example: npm run docs:extract:repo -- https://github.com/prochattools/saaskit-dev saaskit')
}

function parseArgs(): ParsedArgs {
  const [, , repoUrl, target] = process.argv

  if (repoUrl === '--help' || repoUrl === '-h') {
    printUsage()
    process.exit(0)
  }

  if (!repoUrl || !target) {
    printUsage()
    process.exit(1)
  }

  return {
    repoUrl: repoUrl.trim(),
    target: target.trim(),
  }
}

function shouldIgnoreDirectory(name: string) {
  return name.startsWith('.') || IGNORED_DIRS.has(name)
}

async function directoryExists(dirPath: string) {
  try {
    const info = await stat(dirPath)
    return info.isDirectory()
  } catch {
    return false
  }
}

async function countMarkdownFiles(dirPath: string): Promise<number> {
  const entries = await readdir(dirPath, { withFileTypes: true }).catch(() => [])
  let total = 0

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (shouldIgnoreDirectory(entry.name)) continue
      total += await countMarkdownFiles(path.join(dirPath, entry.name))
      continue
    }

    if (entry.name.startsWith('.')) continue
    if (entry.name.match(/\.mdx?$/i)) {
      total += 1
    }
  }

  return total
}

async function resolveSourceCandidate(repoRoot: string, target: string): Promise<SourceCandidate | null> {
  const absolutePath = path.join(repoRoot, CANONICAL_PUBLIC_DOCS_ROOT)
  if (!(await directoryExists(absolutePath))) {
    return null
  }

  const markdownFiles = await countMarkdownFiles(absolutePath)
  if (markdownFiles === 0) {
    return null
  }

  return {
    relativePath: CANONICAL_PUBLIC_DOCS_ROOT,
    absolutePath,
    markdownFiles,
  }
}

async function findLegacySourceCandidate(repoRoot: string, target: string) {
  const candidates = [path.join('docs-public', target), 'docs-public']

  for (const relativePath of candidates) {
    const absolutePath = path.join(repoRoot, relativePath)
    if (!(await directoryExists(absolutePath))) continue
    const markdownFiles = await countMarkdownFiles(absolutePath)
    if (markdownFiles === 0) continue
    return { relativePath, absolutePath, markdownFiles }
  }

  return null
}

function detectSensitivePattern(content: string) {
  const scannableContent = stripFencedCodeBlocks(content)

  for (const pattern of SENSITIVE_LINE_PATTERNS) {
    if (pattern.regex.test(scannableContent)) {
      return pattern.label
    }
  }

  return null
}

async function copyMarkdownOnly(sourceRoot: string, targetRoot: string): Promise<CopyStats> {
  await mkdir(targetRoot, { recursive: true })
  const entries = await readdir(sourceRoot, { withFileTypes: true })
  const stats: CopyStats = { copied: 0, skippedSensitive: 0 }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (shouldIgnoreDirectory(entry.name)) continue
      const nested = await copyMarkdownOnly(path.join(sourceRoot, entry.name), path.join(targetRoot, entry.name))
      stats.copied += nested.copied
      stats.skippedSensitive += nested.skippedSensitive
      continue
    }

    if (entry.name.startsWith('.')) continue
    if (!entry.name.match(/\.mdx?$/i)) continue

    const sourcePath = path.join(sourceRoot, entry.name)
    const content = await readFile(sourcePath, 'utf-8')
    const sensitivePattern = detectSensitivePattern(content)
    if (sensitivePattern) {
      console.warn(
        `Skipping ${path.relative(process.cwd(), sourcePath)} due to sensitive content pattern: ${sensitivePattern}.`,
      )
      stats.skippedSensitive += 1
      continue
    }

    await mkdir(targetRoot, { recursive: true })
    await cp(sourcePath, path.join(targetRoot, entry.name))
    stats.copied += 1
  }

  return stats
}

async function cloneRepository(repoUrl: string, cloneRoot: string) {
  await execFileAsync('git', ['clone', '--depth', '1', repoUrl, cloneRoot], {
    cwd: process.cwd(),
    maxBuffer: 10 * 1024 * 1024,
  })

  const { stdout } = await execFileAsync('git', ['-C', cloneRoot, 'rev-parse', 'HEAD'], {
    cwd: process.cwd(),
    maxBuffer: 1024 * 1024,
  })

  return stdout.trim()
}

async function syncIntoIngest(
  target: string,
  sourceCommit: string,
  sourcePath: string,
  sourceLayout: 'canonical',
  repoUrl: string,
) {
  await execFileAsync(
    process.execPath,
    [
      '-r',
      'ts-node/register/transpile-only',
      path.resolve('scripts/docs/ingest/external-sync.ts'),
      target,
      DOCS_EXPORT_ROOT,
      sourceCommit,
    ],
    {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024,
      env: {
        ...process.env,
        DOCS_EXPORT_PRODUCT: target,
        DOCS_EXPORT_PATH: DOCS_EXPORT_ROOT,
        DOCS_EXPORT_COMMIT: sourceCommit,
        DOCS_EXPORT_SOURCE_PATH: sourcePath,
        DOCS_EXPORT_SOURCE_LAYOUT: sourceLayout,
        DOCS_EXPORT_REPO_URL: repoUrl,
      },
    },
  )
}

async function run() {
  const { repoUrl, target } = parseArgs()
  const repoName = normalizeRepoName(repoUrl)

  if (repoName === 'prochat' || target.toLowerCase() === 'prochat') {
    console.warn('Internal repository skipped.')
    return
  }

  const registry = await loadRegistry()
  const product = registry.find(entry => entry.id === target)

  if (!product) {
    console.error(`Target "${target}" is not registered in scripts/docs/products-registry.json.`)
    process.exit(1)
  }

  const tempRoot = await mkdtemp(path.join(os.tmpdir(), `product-docs-${target}-`))
  const cloneRoot = path.join(tempRoot, 'repo')
  const exportRoot = path.join(DOCS_EXPORT_ROOT, target)
  const tempExportRoot = path.join(DOCS_EXPORT_TMP_ROOT, target)

  try {
    console.log(`Cloning ${repoUrl}...`)
    const sourceCommit = await cloneRepository(repoUrl, cloneRoot)
    console.log(`Cloned ${repoUrl} at ${sourceCommit}.`)

    const source = await resolveSourceCandidate(cloneRoot, target)
    if (!source) {
      const legacySource = await findLegacySourceCandidate(cloneRoot, target)
      if (legacySource) {
        console.error(
          `Unsupported legacy public docs source detected at ${legacySource.relativePath} in ${repoUrl}.`,
        )
        console.error(`Migrate this repository to ${product.canonicalDocsRoot ?? CANONICAL_PUBLIC_DOCS_ROOT}.`)
        process.exit(1)
      }
      console.error(`Public docs source not found in ${repoUrl}.`)
      console.error('Expected canonical docs/public/.')
      process.exit(1)
    }

    console.log(`Using canonical docs source: ${source.relativePath}`)

    await rm(tempExportRoot, { recursive: true, force: true })
    const copyStats = await copyMarkdownOnly(source.absolutePath, tempExportRoot)
    if (copyStats.copied === 0) {
      console.error(`No safe markdown docs were found for ${target}; ingest aborted.`)
      process.exit(1)
    }

    await rm(exportRoot, { recursive: true, force: true })
    await mkdir(path.dirname(exportRoot), { recursive: true })
    await rename(tempExportRoot, exportRoot)

    console.log(
      `Copied ${copyStats.copied} markdown docs from ${source.relativePath} into ${path.relative(process.cwd(), exportRoot)}.`,
    )
    if (copyStats.skippedSensitive > 0) {
      console.warn(`Skipped ${copyStats.skippedSensitive} file(s) due to sensitive content patterns.`)
    }

    await syncIntoIngest(target, sourceCommit, source.relativePath, 'canonical', repoUrl)
    console.log(`Synced external docs into docs-ingest/${target}.`)
    console.log('Next steps: npm run docs:ai-build')
  } finally {
    await rm(tempExportRoot, { recursive: true, force: true })
    await rm(tempRoot, { recursive: true, force: true })
  }
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
