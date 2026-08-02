#!/usr/bin/env node
/**
 * Validate repository-owned static asset references without executing source.
 *
 * JavaScript and TypeScript are parsed with the TypeScript compiler API.
 * CSS, SCSS, and Sass files are scanned for local url() references.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, extname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = resolve(__dirname, '..')
const SRC_DIR = join(ROOT, 'src')

const ASSET_EXTENSIONS = [
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.avif',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf',
  '.eot',
  '.pdf',
]

const SCAN_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs']
const STYLESHEET_EXTENSIONS = ['.css', '.scss', '.sass']
const CSS_EXTENSIONS = STYLESHEET_EXTENSIONS
const EXCLUDE_DIRS = ['node_modules', '.next', 'out', 'dist', '.git']

/** @typedef {'import'|'side-effect-import'|'dynamic-import'|'require'|'export-from'|'new-url'|'css-url'} ReferenceSyntax */

/**
 * @typedef {Object} StaticAssetReference
 * @property {string} reference
 * @property {string} normalizedPath
 * @property {ReferenceSyntax} syntax
 */

function normalizeReference(reference) {
  const suffixIndex = reference.search(/[?#]/)
  return {
    reference,
    normalizedPath: suffixIndex === -1 ? reference : reference.slice(0, suffixIndex),
  }
}

function isAssetPath(reference) {
  const { normalizedPath } = normalizeReference(reference)
  return ASSET_EXTENSIONS.includes(extname(normalizedPath).toLowerCase())
}

function isExternalOrPublic(reference) {
  const trimmed = reference.trim()
  if (/^(?:https?:|data:|blob:|node:|\/\/)/i.test(trimmed)) return true
  if (trimmed.startsWith('/') && !trimmed.startsWith('/@')) return true
  return false
}

function resolveImportPath(reference, importerFile, srcDir) {
  const { normalizedPath } = normalizeReference(reference)
  if (normalizedPath.startsWith('@/')) {
    return join(srcDir, normalizedPath.slice(2))
  }
  if (normalizedPath.startsWith('.')) {
    return resolve(dirname(importerFile), normalizedPath)
  }
  return null
}

function collectFiles(dir, extensions, excludeDirs = EXCLUDE_DIRS) {
  const files = []
  if (!existsSync(dir)) return files

  function walk(current) {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (entry.isDirectory() && excludeDirs.includes(entry.name)) continue
      const fullPath = join(current, entry.name)
      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }
      if (entry.isFile() && extensions.includes(extname(entry.name).toLowerCase())) {
        files.push(fullPath)
      }
    }
  }

  walk(dir)
  return files.sort()
}

function getStringValue(node) {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text
  }
  return null
}

function makeReference(reference, syntax) {
  return { ...normalizeReference(reference), syntax }
}

function extractReferencesFromAST(sourceText, fileName) {
  /** @type {StaticAssetReference[]} */
  const references = []
  const sourceFile = ts.createSourceFile(
    fileName,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  )

  function add(node, syntax) {
    const reference = node ? getStringValue(node) : null
    if (reference) references.push(makeReference(reference, syntax))
  }

  function visit(node) {
    if (ts.isImportDeclaration(node)) {
      add(node.moduleSpecifier, node.importClause ? 'import' : 'side-effect-import')
    }

    if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      add(node.moduleSpecifier, 'export-from')
    }

    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      add(node.arguments[0], 'dynamic-import')
    }

    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'require'
    ) {
      add(node.arguments[0], 'require')
    }

    if (
      ts.isNewExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'URL' &&
      node.arguments?.length >= 2
    ) {
      const secondArg = node.arguments[1]
      const usesImportMetaUrl =
        ts.isPropertyAccessExpression(secondArg) &&
        secondArg.name.text === 'url' &&
        ts.isMetaProperty(secondArg.expression) &&
        secondArg.expression.name.text === 'meta'
      if (usesImportMetaUrl) add(node.arguments[0], 'new-url')
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return references
}

function extractImportsFromAST(sourceText, fileName) {
  return extractReferencesFromAST(sourceText, fileName).map((entry) => entry.reference)
}

function extractReferencesFromStylesheet(sourceText) {
  /** @type {StaticAssetReference[]} */
  const references = []
  const cssUrlPattern = /url\(\s*(['"]?)(.*?)\1\s*\)/g
  let match
  while ((match = cssUrlPattern.exec(sourceText)) !== null) {
    const reference = match[2].trim()
    if (reference) references.push(makeReference(reference, 'css-url'))
  }
  return references
}

function extractImportsFromCSS(sourceText) {
  return extractReferencesFromStylesheet(sourceText).map((entry) => entry.reference)
}

function toRepositoryPath(root, file) {
  return relative(root, file).split(sep).join('/')
}

function validate(rootDir = ROOT, srcDir = SRC_DIR) {
  const sourceFiles = collectFiles(rootDir, SCAN_EXTENSIONS, EXCLUDE_DIRS)
  const stylesheetFiles = collectFiles(rootDir, STYLESHEET_EXTENSIONS, EXCLUDE_DIRS)
  const missing = []

  const processReferences = (file, references) => {
    for (const entry of references) {
      if (!isAssetPath(entry.reference)) continue
      if (isExternalOrPublic(entry.reference)) continue

      const resolved = resolveImportPath(entry.reference, file, srcDir)
      if (!resolved || existsSync(resolved)) continue

      missing.push({
        importer: toRepositoryPath(rootDir, file),
        importPath: entry.reference,
        reference: entry.reference,
        normalizedPath: entry.normalizedPath,
        resolved: toRepositoryPath(rootDir, resolved),
        syntax: entry.syntax,
      })
    }
  }

  for (const file of sourceFiles) {
    let source
    try {
      source = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    processReferences(file, extractReferencesFromAST(source, file))
  }

  for (const file of stylesheetFiles) {
    let source
    try {
      source = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    processReferences(file, extractReferencesFromStylesheet(source))
  }

  return missing.sort((a, b) =>
    `${a.importer}:${a.reference}:${a.syntax}`.localeCompare(
      `${b.importer}:${b.reference}:${b.syntax}`,
    ),
  )
}

export {
  ASSET_EXTENSIONS,
  CSS_EXTENSIONS,
  EXCLUDE_DIRS,
  SCAN_EXTENSIONS,
  STYLESHEET_EXTENSIONS,
  collectFiles,
  extractImportsFromAST,
  extractImportsFromCSS,
  extractReferencesFromAST,
  extractReferencesFromStylesheet,
  isAssetPath,
  isExternalOrPublic,
  normalizeReference,
  resolveImportPath,
  validate,
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(__filename)
if (isMain) {
  const missing = validate(ROOT, SRC_DIR)
  if (missing.length === 0) {
    console.log('✓ All static asset imports resolved.')
    process.exit(0)
  }

  console.error(`✗ ${missing.length} unresolved static asset reference(s):`)
  for (const entry of missing) {
    console.error(`  importer: ${entry.importer}`)
    console.error(`  syntax: ${entry.syntax}`)
    console.error(`  reference: ${entry.reference}`)
    console.error(`  normalized: ${entry.normalizedPath}`)
    console.error(`  resolved: ${entry.resolved}`)
    console.error('')
  }
  process.exit(1)
}
