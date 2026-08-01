#!/usr/bin/env node
/**
 * Validates that every static asset import in repository-owned source files
 * resolves to an existing file on disk.
 *
 * Uses the TypeScript compiler API (ts.createSourceFile) for syntax-only AST
 * parsing to detect all import forms:
 *   - Static imports (default, named, namespace, side-effect)
 *   - Dynamic imports: import('./foo.svg')
 *   - Require calls: require('./foo.svg')
 *   - Export-from: export { x } from './foo.svg', export * from './foo.svg'
 *   - new URL('./foo.svg', import.meta.url)
 *
 * Also scans .css files for url() references using regex.
 *
 * Resolves @/ alias to src/ and validates existence.
 * Ignores node_modules, .next, build output, and public/ path-based imports.
 * Fails with a non-zero exit code if any missing assets are found.
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, resolve, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')
const SRC_DIR = join(ROOT, 'src')

const ASSET_EXTENSIONS = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.woff', '.woff2']

const SCAN_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']

const CSS_EXTENSIONS = ['.css']

const EXCLUDE_DIRS = ['node_modules', '.next', 'out', 'dist', '.git']

/**
 * Check if a path refers to a static asset based on extension.
 */
function isAssetPath(p) {
  return ASSET_EXTENSIONS.some(ext => p.toLowerCase().endsWith(ext))
}

/**
 * Check if a path is external (http, https, node:) or public-root (starts with /).
 */
function isExternalOrPublic(p) {
  if (p.startsWith('http://') || p.startsWith('https://') || p.startsWith('node:')) return true
  if (p.startsWith('/') && !p.startsWith('/@')) return true
  return false
}

/**
 * Resolve an import path to an absolute filesystem path.
 * Returns null if the path cannot be resolved (e.g. bare specifiers).
 */
function resolveImportPath(importPath, importerFile, srcDir) {
  if (importPath.startsWith('@/')) {
    return join(srcDir, importPath.slice(2))
  }
  if (importPath.startsWith('.')) {
    return resolve(dirname(importerFile), importPath)
  }
  return null
}

/**
 * Recursively collect files using fs.readdirSync with { recursive: true } (Node 20+).
 * Filters by allowed extensions and excludes specified directories.
 */
function collectFiles(dir, extensions, excludeDirs) {
  const files = []
  let entries
  try {
    entries = readdirSync(dir, { recursive: true, withFileTypes: false })
  } catch {
    return files
  }

  for (const relPath of entries) {
    // Check exclusion: any path segment matches an excluded dir
    const parts = relPath.split('/')
    const isExcluded = parts.some(part => excludeDirs.includes(part))
    if (isExcluded) continue

    const fullPath = join(dir, relPath)
    const ext = extname(relPath)
    if (extensions.includes(ext)) {
      // Verify it's a file, not a directory
      try {
        const stat = statSync(fullPath)
        if (stat.isFile()) {
          files.push(fullPath)
        }
      } catch {
        // Skip inaccessible entries
      }
    }
  }
  return files
}

/**
 * Extract string literal value from an AST node (StringLiteral or NoSubstitutionTemplateLiteral).
 */
function getStringValue(node) {
  if (!node) return null
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text
  }
  return null
}

/**
 * Walk the AST to extract all asset import paths from a TypeScript/JavaScript source file.
 */
function extractImportsFromAST(sourceText, fileName) {
  const imports = []
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    ts.ScriptKind.TSX
  )

  function visit(node) {
    // 1. Static imports: import ... from '...' and import '...'
    if (ts.isImportDeclaration(node)) {
      const specifier = getStringValue(node.moduleSpecifier)
      if (specifier) {
        imports.push(specifier)
      }
    }

    // 2. Export-from: export { ... } from '...' and export * from '...'
    if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      const specifier = getStringValue(node.moduleSpecifier)
      if (specifier) {
        imports.push(specifier)
      }
    }

    // 3. Dynamic import: import('...')
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      if (node.arguments.length > 0) {
        const specifier = getStringValue(node.arguments[0])
        if (specifier) {
          imports.push(specifier)
        }
      }
    }

    // 4. Require: require('...')
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'require'
    ) {
      if (node.arguments.length > 0) {
        const specifier = getStringValue(node.arguments[0])
        if (specifier) {
          imports.push(specifier)
        }
      }
    }

    // 5. new URL('...', import.meta.url) pattern
    if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 'URL') {
      if (node.arguments && node.arguments.length >= 2) {
        const firstArg = getStringValue(node.arguments[0])
        if (firstArg) {
          // Verify second arg is import.meta.url
          const secondArg = node.arguments[1]
          if (
            ts.isPropertyAccessExpression(secondArg) &&
            secondArg.name.text === 'url' &&
            ts.isMetaProperty(secondArg.expression) &&
            secondArg.expression.name.text === 'meta'
          ) {
            imports.push(firstArg)
          }
        }
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return imports
}

/**
 * Extract asset paths from CSS url() references.
 * Matches: url(./path), url('./path'), url("./path")
 */
function extractImportsFromCSS(sourceText) {
  const imports = []
  const CSS_URL_RE = /url\(\s*['"]?([^'")\s]+)['"]?\s*\)/g
  let match
  while ((match = CSS_URL_RE.exec(sourceText)) !== null) {
    imports.push(match[1])
  }
  return imports
}

/**
 * Main validation logic. Exported for testability.
 */
export function validate(rootDir, srcDir) {
  const root = rootDir || ROOT
  const src = srcDir || SRC_DIR

  // Collect source files (JS/TS)
  const sourceFiles = collectFiles(root, SCAN_EXTENSIONS, EXCLUDE_DIRS)

  // Collect CSS files
  const cssFiles = collectFiles(root, CSS_EXTENSIONS, EXCLUDE_DIRS)

  const missing = []

  // Process JS/TS files with AST parsing
  for (const file of sourceFiles) {
    let source
    try {
      source = readFileSync(file, 'utf8')
    } catch {
      continue
    }

    const imports = extractImportsFromAST(source, file)

    for (const importPath of imports) {
      if (!isAssetPath(importPath)) continue
      if (isExternalOrPublic(importPath)) continue

      const resolved = resolveImportPath(importPath, file, src)
      if (resolved === null) continue

      if (!existsSync(resolved)) {
        const relFile = file.replace(root + '/', '')
        const relResolved = resolved.replace(root + '/', '')
        missing.push({ importer: relFile, importPath, resolved: relResolved })
      }
    }
  }

  // Process CSS files with regex
  for (const file of cssFiles) {
    let source
    try {
      source = readFileSync(file, 'utf8')
    } catch {
      continue
    }

    const imports = extractImportsFromCSS(source)

    for (const importPath of imports) {
      if (!isAssetPath(importPath)) continue
      if (isExternalOrPublic(importPath)) continue

      const resolved = resolveImportPath(importPath, file, src)
      if (resolved === null) continue

      if (!existsSync(resolved)) {
        const relFile = file.replace(root + '/', '')
        const relResolved = resolved.replace(root + '/', '')
        missing.push({ importer: relFile, importPath, resolved: relResolved })
      }
    }
  }

  return missing
}

// Export internals for testing
export {
  isAssetPath,
  isExternalOrPublic,
  resolveImportPath,
  collectFiles,
  extractImportsFromAST,
  extractImportsFromCSS,
  ASSET_EXTENSIONS,
  SCAN_EXTENSIONS,
  CSS_EXTENSIONS,
  EXCLUDE_DIRS,
}

// CLI entry point — only run when executed directly
const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(__filename)
if (isMain) {
  const missing = validate(ROOT, SRC_DIR)

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
}
