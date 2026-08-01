#!/usr/bin/env node
/**
 * Validates that every static asset import in repository-owned source files
 * resolves to an existing file on disk.
 *
 * Scans .ts, .tsx, .js, .jsx, .mjs, .cjs for import statements ending in known
 * asset extensions (.svg, .png, .jpg, .jpeg, .gif, .webp, .ico, .woff, .woff2).
 *
 * Resolves @/ alias to src/ and validates existence.
 * Ignores node_modules, .next, build output, and public/ path-based imports.
 * Fails with a non-zero exit code if any missing assets are found.
 */

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')
const SRC_DIR = join(ROOT, 'src')

const ASSET_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2']

const SCAN_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']

const EXCLUDE_DIRS = ['node_modules', '.next', 'out', 'dist', '.git']

// Regex: matches static import/require of asset files.
// Captures the path string from single or double quotes.
const IMPORT_RE = /(?:import\s+\S+\s+from|import\s*\(|require\s*\()\s*['"]([^'"]+)['"]/g

function isAssetPath(p) {
  return ASSET_EXTENSIONS.some(ext => p.toLowerCase().endsWith(ext))
}

function isExternalOrPublic(p) {
  // Skip: absolute URLs, node: protocol, public/ static serving path strings
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('node:')) return true
  // Skip: public/ references that are served at runtime, not static imports
  if (p.startsWith('/') && !p.startsWith('/@') ) return true
  return false
}

function resolveImportPath(importPath, importerFile) {
  if (importPath.startsWith('@/')) {
    return join(SRC_DIR, importPath.slice(2))
  }
  if (importPath.startsWith('.')) {
    return resolve(dirname(importerFile), importPath)
  }
  return null
}

function collectSourceFiles(dir) {
  const files = []
  let entries
  try {
    entries = execSync(`find "${dir}" -type f`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 })
      .split('\n')
      .filter(Boolean)
  } catch {
    return files
  }

  for (const entry of entries) {
    const isExcluded = EXCLUDE_DIRS.some(ex => entry.includes(`/${ex}/`) || entry.includes(`/${ex}`))
    if (isExcluded) continue
    const ext = entry.slice(entry.lastIndexOf('.'))
    if (SCAN_EXTENSIONS.includes(ext)) {
      files.push(entry)
    }
  }
  return files
}

const files = collectSourceFiles(ROOT)
const missing = []

for (const file of files) {
  let source
  try {
    source = readFileSync(file, 'utf8')
  } catch {
    continue
  }

  let match
  IMPORT_RE.lastIndex = 0
  while ((match = IMPORT_RE.exec(source)) !== null) {
    const importPath = match[1]
    if (!isAssetPath(importPath)) continue
    if (isExternalOrPublic(importPath)) continue

    const resolved = resolveImportPath(importPath, file)
    if (resolved === null) continue

    if (!existsSync(resolved)) {
      const relFile = file.replace(ROOT + '/', '')
      const relResolved = resolved.replace(ROOT + '/', '')
      missing.push({ importer: relFile, importPath, resolved: relResolved })
    }
  }
}

if (missing.length === 0) {
  console.log('✓ All static asset imports resolved.')
  process.exit(0)
} else {
  console.error(`✗ ${missing.length} unresolved static asset import(s):`)
  for (const { importer, importPath, resolved } of missing) {
    console.error(`  ${importer}`)
    console.error(`    imports: ${importPath}`)
    console.error(`    resolved: ${resolved}`)
    console.error('')
  }
  process.exit(1)
}
