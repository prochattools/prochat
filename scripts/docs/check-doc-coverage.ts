#!/usr/bin/env node
import { execFile } from 'node:child_process'
import { stat } from 'fs/promises'
import path from 'path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const STRICT_MODE = process.env.DOCS_STRICT === 'true'
const DOCS_PUBLIC_ROOT = path.resolve('docs-public')
const CORE_PREFIXES = ['src/', 'packages/']
const DOCS_PREFIX = 'docs-public/'

async function pathExists(targetPath: string) {
  try {
    await stat(targetPath)
    return true
  } catch {
    return false
  }
}

async function gitDiffNames(args: string[]) {
  try {
    const { stdout } = await execFileAsync('git', args, {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024,
    })

    return stdout
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
  } catch {
    return []
  }
}

async function resolveCommittedDiffBase() {
  const explicitBase = process.env.DOCS_COVERAGE_DIFF_BASE?.trim()
  if (explicitBase) {
    return explicitBase
  }

  const githubBaseRef = process.env.GITHUB_BASE_REF?.trim()
  if (githubBaseRef) {
    const remoteRef = `origin/${githubBaseRef}`
    try {
      const { stdout } = await execFileAsync('git', ['merge-base', 'HEAD', remoteRef], {
        cwd: process.cwd(),
        maxBuffer: 1024 * 1024,
      })
      return stdout.trim()
    } catch {
      // fall through
    }
  }

  try {
    const { stdout } = await execFileAsync('git', ['rev-parse', 'HEAD^'], {
      cwd: process.cwd(),
      maxBuffer: 1024 * 1024,
    })
    return stdout.trim()
  } catch {
    return null
  }
}

async function collectChangedFiles() {
  const workingTree = await gitDiffNames(['diff', '--name-only'])
  const staged = await gitDiffNames(['diff', '--name-only', '--cached'])
  const changed = new Set([...workingTree, ...staged])

  if (changed.size > 0) {
    return [...changed]
  }

  const committedBase = await resolveCommittedDiffBase()
  if (!committedBase) {
    return []
  }

  return gitDiffNames(['diff', '--name-only', `${committedBase}..HEAD`])
}

async function run() {
  if (!(await pathExists(DOCS_PUBLIC_ROOT))) {
    console.log('Docs coverage check skipped: docs-public/ is not present in this repository.')
    return
  }

  const changedFiles = await collectChangedFiles()
  if (changedFiles.length === 0) {
    console.log('Docs coverage check skipped: no changed files detected.')
    return
  }

  const hasCoreChanges = changedFiles.some(filePath =>
    CORE_PREFIXES.some(prefix => filePath.startsWith(prefix)),
  )
  const hasDocsPublicChanges = changedFiles.some(filePath => filePath.startsWith(DOCS_PREFIX))

  if (!hasCoreChanges) {
    console.log('Docs coverage check passed: no core source changes detected.')
    return
  }

  if (hasDocsPublicChanges) {
    console.log('Docs coverage check passed: docs-public changes detected alongside core source changes.')
    return
  }

  const message = 'Docs coverage may be missing for recent changes.'
  if (STRICT_MODE) {
    console.error(`✖ ${message}`)
    process.exit(1)
  }

  console.warn(`⚠ ${message}`)
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
