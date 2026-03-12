#!/usr/bin/env node
import { readdir, readFile, stat } from 'fs/promises'
import path from 'path'

import yaml from 'yaml'

import { DEFAULT_TEMPLATE, templates } from './templates/index.ts'
import { ensureTemplateSections, parseSections, validateMarkers } from './sections.ts'
import { RESERVED_DIRECTORIES, detectReservedDirectory } from './reserved.ts'
import { GENERATED_FILE_MARKER, hasGeneratedMarker } from './extract/shared.ts'
import type { TemplateDefinition } from './templates/types.ts'

const OUTPUT_ROOT = path.resolve('src', 'content', 'docs')
const MANIFEST_PATH = path.join(OUTPUT_ROOT, '.generated-manifest.json')
const REGISTRY_PATH = path.resolve('scripts', 'docs', 'products-registry.json')
const VERSION_PATTERN = /^v\d+$/i

const INGEST_ROOT = path.resolve('docs-ingest')
const COMMIT_PATTERN = /^[0-9a-f]{7,40}$/i
const STRICT_MODE = process.env.DOCS_STRICT === 'true'
const TECHNICAL_DOC_ROOTS = [
  'src/content/docs/prokit/',
  'src/content/docs/saaskit/',
  'src/content/docs/features/',
]
const MARKETING_DOC_SLUGS = new Set([
  'what-you-get',
  'use-cases',
  'who-this-is-for',
  'why-a-boilerplate',
])

function splitFrontmatter(raw: string) {
  let trimmed = raw.trimStart()
  if (trimmed.startsWith(GENERATED_FILE_MARKER)) {
    trimmed = trimmed.slice(GENERATED_FILE_MARKER.length).trimStart()
  }

  const match = trimmed.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { frontmatter: '', content: trimmed }
  }

  return { frontmatter: match[1], content: match[2] }
}

function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim()
}

function hasFrontmatterField(meta: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(meta, key)
}

type RegistryProduct = {
  id: string
  category: string
  template?: string
  apiSource?: 'typescript' | 'openapi' | 'none'
  apiSourcePaths?: string[]
}

type ManifestEntry = {
  outputPath: string
  sourceRepo: string
  category: string
  templateId?: string
  generator?: string
  sourceCommit?: string | null
}

async function loadRegistry() {
  try {
    const raw = await readFile(REGISTRY_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed.products)) {
      return parsed.products.map((product: { id: string; category: string; template?: string; apiSource?: 'typescript' | 'openapi' | 'none'; apiSourcePaths?: string[] }) => ({
        id: product.id,
        category: product.category,
        template: product.template,
        apiSource: product.apiSource,
        apiSourcePaths: product.apiSourcePaths,
      }))
    }
  } catch (error) {
    console.warn(`Unable to read registry: ${(error as Error).message}`)
  }
  return [] as Array<{ id: string; category: string }>
}

type IssueHandler = {
  warn: (message: string) => void
  strict: (message: string) => void
}

function createIssueHandler() {
  const warnings: string[] = []
  const errors: string[] = []

  const warn = (message: string) => {
    warnings.push(message)
  }

  const strict = (message: string) => {
    warnings.push(message)
    if (STRICT_MODE) {
      errors.push(message)
    }
  }

  return { warnings, errors, handler: { warn, strict } }
}

async function checkVersionDirs(root: string, label: string, handler: IssueHandler) {
  const entries = await readdir(root, { withFileTypes: true }).catch(() => [])
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    if (entry.name.startsWith('v') && !VERSION_PATTERN.test(entry.name)) {
      handler.strict(`${label} contains invalid version folder ${entry.name}`)
    }
  }
}

async function checkManualReservedFiles(productId: string, handler: IssueHandler) {
  const severity = STRICT_MODE ? handler.strict : handler.warn
  const root = path.join(INGEST_ROOT, productId)
  const conflicts = ['api.md', 'cli.md', 'sdk.md']
  for (const name of conflicts) {
    try {
      const fileInfo = await stat(path.join(root, name))
      if (fileInfo.isFile()) {
        severity(
          `docs-ingest/${productId}/${name} is reserved; move it under docs-ingest/${productId}/${name.replace('.md', '')}/`,
        )
      }
    } catch {
      continue
    }
  }
}

async function validateIngestReservedFiles(product: RegistryProduct, handler: IssueHandler) {
  const severity = STRICT_MODE ? handler.strict : handler.warn
  const baseDir = path.join(INGEST_ROOT, product.id)
  for (const reserved of RESERVED_DIRECTORIES) {
    const dirPath = path.join(baseDir, reserved)
    const files = await gatherDocs(dirPath).catch(() => [])
    for (const filePath of files) {
      const raw = await readFile(filePath, 'utf-8')
      const relativePath = path.relative(process.cwd(), filePath)

      if (!hasGeneratedMarker(raw)) {
        severity(`${relativePath} must start with ${GENERATED_FILE_MARKER}`)
      }

      const { frontmatter } = splitFrontmatter(raw)
      let meta: Record<string, unknown> = {}
      try {
        meta = frontmatter ? (yaml.parse(frontmatter) as Record<string, unknown>) : {}
      } catch (error) {
        severity(`${relativePath} has invalid frontmatter: ${(error as Error).message}`)
        continue
      }

      const generatorValue = typeof meta.generator === 'string' ? meta.generator : undefined
      if (generatorValue !== 'auto') {
        severity(`${relativePath} in reserved directory ${reserved} must set generator: auto`)
      }
      if (!hasFrontmatterField(meta, 'sourceRepo')) {
        severity(`${relativePath} in reserved directory ${reserved} must define sourceRepo`)
      }
      if (!hasFrontmatterField(meta, 'sourceCommit')) {
        severity(`${relativePath} in reserved directory ${reserved} must define sourceCommit`)
      }
    }
  }
}

async function gatherDocs(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []

  await Promise.all(
    entries.map(async entry => {
      if (entry.name.startsWith('.')) return
      const resolved = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...(await gatherDocs(resolved)))
        return
      }
      if (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx')) return
      files.push(resolved)
    }),
  )

  return files
}

function toRepoRelativePath(filePath: string) {
  return path.relative(process.cwd(), filePath).replace(/\\/g, '/')
}

function shouldApplyTechnicalValidation(filePath: string) {
  const relativePath = toRepoRelativePath(filePath)
  const baseSlug = path.basename(relativePath).replace(/\.mdx?$/i, '')

  if (!TECHNICAL_DOC_ROOTS.some(root => relativePath.startsWith(root))) {
    return false
  }

  return !MARKETING_DOC_SLUGS.has(baseSlug)
}

async function run() {
  const registry = await loadRegistry()
  if (!registry.length) {
    console.warn('No registry entries; skipping validation.')
    return
  }

  const manifestRaw = await readFile(MANIFEST_PATH, 'utf-8')
  const manifest = JSON.parse(manifestRaw) as ManifestEntry[]
  const manifestMap = new Map(manifest.map((entry: ManifestEntry) => [entry.outputPath, entry]))

  const registryMap = new Map(registry.map((entry: RegistryProduct) => [entry.id, entry.category]))
  const categoryRegistry = new Set(registry.map((entry: RegistryProduct) => entry.category))
  const { warnings, errors, handler } = createIssueHandler()

  for (const product of registry) {
    await checkVersionDirs(path.join(INGEST_ROOT, product.id), `docs-ingest/${product.id}`, handler)
    await checkVersionDirs(path.join(OUTPUT_ROOT, product.id), `src/content/docs/${product.id}`, handler)
    await checkManualReservedFiles(product.id, handler)
    await validateIngestReservedFiles(product, handler)

    if (product.apiSource && product.apiSource !== 'none') {
      const apiFiles = await gatherDocs(path.join(INGEST_ROOT, product.id, 'api')).catch(() => [])
      if (apiFiles.length === 0) {
        handler.strict(`docs-ingest/${product.id}/api is empty but ${product.id} declares apiSource=${product.apiSource}`)
      }
    }

    const productDir = path.join(OUTPUT_ROOT, product.id)
    let files: string[] = []
    try {
      files = await gatherDocs(productDir)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        continue
      }
      throw error
    }

    const expectedCategory = product.category

    for (const filePath of files) {
      const raw = await readFile(filePath, 'utf-8')
      const { frontmatter, content } = splitFrontmatter(raw)
      let meta: Record<string, unknown>
      try {
        meta = frontmatter ? (yaml.parse(frontmatter) as Record<string, unknown>) : {}
      } catch (error) {
        handler.warn(`${filePath} has invalid frontmatter: ${(error as Error).message}`)
        continue
      }

      const templateId = product.template || DEFAULT_TEMPLATE.id
      const template = templates[templateId] ?? DEFAULT_TEMPLATE
      const applyTechnicalValidation = shouldApplyTechnicalValidation(filePath)

      if (applyTechnicalValidation) {
        const sections = parseSections(content)
        const { errors: markerErrors, warnings: markerWarnings } = validateMarkers(content, template.sections.map(section => section.name), {
          strict: STRICT_MODE,
        })
        markerWarnings.forEach(message => handler.warn(`${filePath} ${message}`))
        markerErrors.forEach(message => handler.strict(`${filePath} ${message}`))

        const missingSections = ensureTemplateSections(template, sections)
        const severity = STRICT_MODE ? handler.strict : handler.warn
        missingSections.forEach(section => severity(`${filePath} missing template section ${section}`))
      }

      const requiredFields = applyTechnicalValidation
        ? ['title', 'description', 'category', 'slug', 'order', 'keywords']
        : ['title', 'description']
      const missing = requiredFields.filter(key => !meta[key])
      if (missing.length) {
        handler.warn(`${filePath} missing fields: ${missing.join(', ')}`)
        continue
      }

      if (!applyTechnicalValidation) {
        continue
      }

      const commitValue = meta.sourceCommit
      if (commitValue && typeof commitValue === 'string' && !COMMIT_PATTERN.test(commitValue)) {
        handler.warn(`${filePath} sourceCommit ${commitValue} is not a valid git SHA`)
      }

      if (!categoryRegistry.has(meta.category as string)) {
        handler.strict(`${filePath} category ${meta.category} is not defined in the registry`)
      }

      if ((meta.category as string) !== expectedCategory) {
        handler.warn(`${filePath} category ${meta.category} does not match folder ${expectedCategory}`)
      }

      const baseSlug = path.basename(filePath).replace(/\.mdx?$/i, '')
      if (meta.slug !== baseSlug) {
        handler.warn(`${filePath} slug ${meta.slug} must match filename ${baseSlug}`)
      }

      const relativeProductPath = path.relative(path.join(OUTPUT_ROOT, product.id), filePath)
      const reservedDir = detectReservedDirectory(relativeProductPath)
      if (reservedDir) {
        const severity = STRICT_MODE ? handler.strict : handler.warn
        const generatorValue = typeof meta.generator === 'string' ? meta.generator : undefined
        if (generatorValue !== 'auto') {
          severity(`${filePath} in reserved directory ${reservedDir} must set generator: auto`)
        }
        if (!hasGeneratedMarker(raw)) {
          severity(`${filePath} in reserved directory ${reservedDir} must start with ${GENERATED_FILE_MARKER}`)
        }
        if (!hasFrontmatterField(meta, 'sourceRepo')) {
          severity(`${filePath} in reserved directory ${reservedDir} must define sourceRepo`)
        }
        if (!hasFrontmatterField(meta, 'sourceCommit')) {
          severity(`${filePath} in reserved directory ${reservedDir} must define sourceCommit`)
        }
      }

      const relativeOutput = path.relative(process.cwd(), filePath)
      if (!manifestMap.has(relativeOutput)) {
        handler.strict(`${filePath} not listed in manifest`)
      } else {
        const entry = manifestMap.get(relativeOutput)!
        if (!registryMap.has(entry.sourceRepo)) {
          handler.strict(`${filePath} sourceRepo ${entry.sourceRepo} is not registered`)
        } else if (registryMap.get(entry.sourceRepo) !== entry.category) {
          handler.warn(`${filePath} manifest category ${entry.category} does not match registry for ${entry.sourceRepo}`)
        }
        if (entry.sourceRepo !== product.id) {
          handler.strict(`${filePath} manifest sourceRepo ${entry.sourceRepo} does not match folder ${product.id}`)
        }
        if (reservedDir && entry.generator !== 'auto') {
          const reservedSeverity = STRICT_MODE ? handler.strict : handler.warn
          reservedSeverity(
            `${filePath} manifest generator ${entry.generator ?? 'undefined'} does not match reserved directory ${reservedDir}`,
          )
        }
        const manifestTemplate = entry.templateId || DEFAULT_TEMPLATE.id
        if (manifestTemplate !== templateId) {
          const mismatchHandler = STRICT_MODE ? handler.strict : handler.warn
          mismatchHandler(
            `${filePath} manifest template ${manifestTemplate} does not match registry template ${templateId}`,
          )
        }
      }
    }
  }

  for (const entry of manifest) {
    const abs = path.resolve(entry.outputPath)
    try {
      await readFile(abs)
    } catch (error) {
      handler.strict(`Manifest entry ${entry.outputPath} is missing on disk`)
    }
  }

  if (warnings.length) {
    warnings.forEach(warning => console.warn('⚠', warning))
    if (!STRICT_MODE || errors.length === 0) {
      console.warn('Docs validation completed with warnings.')
    }
  }

  if (errors.length) {
    errors.forEach(error => console.error('✖', error))
    process.exit(1)
  }

  if (!warnings.length) {
    console.log('Docs validation passed.')
  }
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
