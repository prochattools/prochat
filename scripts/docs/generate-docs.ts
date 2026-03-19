#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

import yaml from 'yaml'
import { createHash } from 'crypto'

import { normalizeFrontmatter } from './transform/normalize-frontmatter.ts'
import { DEFAULT_TEMPLATE } from './templates/index.ts'
import { detectReservedDirectory } from './reserved.ts'
import { GENERATED_FILE_MARKER } from './extract/shared.ts'

const INGEST_ROOT = path.resolve('docs-ingest')
const OUTPUT_ROOT = path.resolve('src', 'content', 'docs')
const INTERNAL_DOCS_ROOT = path.resolve('docs')
const MANIFEST_PATH = path.join(OUTPUT_ROOT, '.generated-manifest.json')
const CACHE_ROOT = path.resolve('.cache', 'docs')
const CACHE_MANIFEST_PATH = path.join(CACHE_ROOT, 'manifest.json')
const REGISTRY_PATH = path.resolve('scripts', 'docs', 'products-registry.json')
const VERSION_PATTERN = /^v\\d+$/i
const SOURCE_COMMIT = process.env.DOCS_SOURCE_COMMIT?.trim() || null
const SOURCE_METADATA_FILE = '.source.json'

type ProductId = string

type ManifestEntry = {
  docId: string
  contentHash: string
  sourcePath: string
  outputPath: string
  category: string
  slug: string
  title: string
  description: string
  order: number
  keywords: string[]
  sourceRepo: string
  generator: string
  generatedAt: string
  sourceCommit: string | null
  templateId: string
}

type RegistryProduct = {
  id: string
  title: string
  category: string
  docsPath: string
  template?: string
  apiSource?: 'typescript' | 'openapi' | 'none'
  apiSourcePaths?: string[]
}

type DocTask = {
  payload: string
  targetPath: string
  manifestEntry: ManifestEntry
  metaEntry: { slug: string; title: string; order: number }
  unchanged: boolean
}

type HashStats = {
  analyzed: number
  regenerated: number
  skipped: number
}

async function gatherMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []

  await Promise.all(
    entries.map(async entry => {
      if (entry.name.startsWith('.')) {
        return
      }

      const resolved = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...(await gatherMarkdownFiles(resolved)))
        return
      }

      if (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx')) {
        return
      }

      files.push(resolved)
    }),
  )

  return files
}

function splitFrontmatter(raw: string) {
  let trimmed = raw.trimStart()

  while (trimmed.startsWith(GENERATED_FILE_MARKER)) {
    trimmed = trimmed.slice(GENERATED_FILE_MARKER.length).trimStart()
  }

  const match = trimmed.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { frontmatter: '', content: trimmed }
  }

  return { frontmatter: match[1], content: match[2] }
}

function defaultSlug(filePath: string) {
  return path
    .basename(filePath)
    .replace(/\.mdx?$/i, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '-')
}

function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim()
}

function prettyMeta(productTitle: string, entries: Array<{ slug: string; title: string; order: number }>) {
  const header = `export default {\n  '*': {\n    title: '${titleCase(productTitle)}',\n    display: 'hidden',\n  },\n`
  const body = entries
    .map(
      entry =>
        `  '${entry.slug}': {\n    title: '${entry.title.replace(/'/g, "\\'")}',\n    order: ${entry.order},\n  },`,
    )
    .join('\n')
  const footer = '\n}\n'
  return `${header}${body}${footer}`
}

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true })
}

async function loadRegistry(): Promise<RegistryProduct[]> {
  try {
    const raw = await readFile(REGISTRY_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed.products)) {
      return parsed.products
    }
  } catch {
    console.warn(`Unable to load registry at ${REGISTRY_PATH}`)
  }
  return []
}

async function warnUnregisteredIngestFolders(registryIds: Set<ProductId>) {
  const entries = await readdir(INGEST_ROOT, { withFileTypes: true }).catch(() => [])
  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }
    if (entry.name === '.tmp') {
      continue
    }
    if (!registryIds.has(entry.name)) {
      console.warn(`docs-ingest/${entry.name} is not registered; skipping.`)
    }
  }
}

async function collectVersionRoots(productRoot: string, productId: string) {
  const entries = await readdir(productRoot, { withFileTypes: true }).catch(error => {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw error
    }
    throw error
  })
  const versionEntries = entries.filter(entry => entry.isDirectory() && VERSION_PATTERN.test(entry.name))
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name.toLowerCase().startsWith('v') && !VERSION_PATTERN.test(entry.name)) {
      console.warn(`Skipping invalid version folder docs-ingest/${productId}/${entry.name}`)
    }
  }
  const roots = [{ version: '', root: productRoot }]
  for (const entry of versionEntries) {
    roots.push({ version: entry.name, root: path.join(productRoot, entry.name) })
  }
  return roots
}

async function writeProductMeta(product: RegistryProduct, entries: Array<{ slug: string; title: string; order: number }>) {
  const productDir = path.join(OUTPUT_ROOT, product.id)
  await ensureDir(productDir)
  const filePath = path.join(productDir, '_meta.js')
  const sorted = [...entries].sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order
    }
    return a.title.localeCompare(b.title)
  })
  const content = prettyMeta(product.title || product.id, sorted)
  await writeFile(filePath, content, 'utf-8')
}

async function writeManifest(entries: ManifestEntry[]) {
  await ensureDir(OUTPUT_ROOT)
  await writeFile(MANIFEST_PATH, JSON.stringify(entries, null, 2), 'utf-8')
  await ensureDir(CACHE_ROOT)
  await writeFile(CACHE_MANIFEST_PATH, JSON.stringify(entries, null, 2), 'utf-8')
}

async function loadCacheManifest(): Promise<ManifestEntry[]> {
  try {
    const raw = await readFile(CACHE_MANIFEST_PATH, 'utf-8')
    return JSON.parse(raw) as ManifestEntry[]
  } catch {
    return []
  }
}

async function loadProductSourceCommit(productId: string) {
  try {
    const raw = await readFile(path.join(INGEST_ROOT, productId, SOURCE_METADATA_FILE), 'utf-8')
    const parsed = JSON.parse(raw) as { sourceCommit?: unknown }
    return typeof parsed.sourceCommit === 'string' && parsed.sourceCommit.trim() ? parsed.sourceCommit.trim() : null
  } catch {
    return SOURCE_COMMIT
  }
}

async function prepareDocTask(
  product: RegistryProduct,
  version: string,
  versionRoot: string,
  filePath: string,
  productSourceCommit: string | null,
  stats: { generated: number; skipped: number },
  prevManifestMap: Map<string, ManifestEntry>,
) {
  if (filePath.startsWith(INTERNAL_DOCS_ROOT + path.sep)) {
    stats.skipped += 1
    console.warn(`Skipping internal doc ${filePath}`)
    return
  }

  const relativePath = path.relative(versionRoot, filePath)
  if (relativePath.startsWith('..')) {
    stats.skipped += 1
    return
  }
  const reservedSection = detectReservedDirectory(relativePath)

  const raw = await readFile(filePath, 'utf-8')
  const { frontmatter, content } = splitFrontmatter(raw)
  let meta: Record<string, unknown>
  try {
    meta = frontmatter ? (yaml.parse(frontmatter) as Record<string, unknown>) : {}
  } catch (error) {
    stats.skipped += 1
    console.warn(`Unable to parse frontmatter for ${filePath}: ${(error as Error).message}`)
    return
  }

  const slugBase = relativePath.replace(/\.mdx?$/i, '')
  const slugDefault = slugBase.split(path.sep).pop() ?? defaultSlug(filePath)
  let normalized
  try {
    normalized = normalizeFrontmatter(meta || {}, {
      slug: slugDefault,
      category: product.category,
      titleFallback: titleCase(slugDefault),
      orderFallback: 100,
      keywordsFallback: [product.id, product.title],
    })
  } catch (error) {
    stats.skipped += 1
    console.warn(`Normalization failed for ${filePath}: ${(error as Error).message}`)
    return
  }

  const templateId = product.template ?? DEFAULT_TEMPLATE.id
  const { keywords, generator: normalizedGenerator, ...base } = normalized
  const generatorFromFrontmatter =
    typeof normalizedGenerator === 'string' && normalizedGenerator.trim()
      ? normalizedGenerator.trim()
      : undefined
  const generatorValue = reservedSection ? 'auto' : generatorFromFrontmatter ?? 'ai'
  if (reservedSection && generatorValue !== 'auto') {
    throw new Error(`Reserved directory ${reservedSection} must emit generator:auto for ${filePath}`)
  }

  const targetDir = path.join(OUTPUT_ROOT, product.id, version || '', path.dirname(relativePath))
  const targetFileName = path.basename(relativePath).replace(/\.mdx?$/i, '.mdx')
  const targetPath = path.join(targetDir, targetFileName)

  if (targetPath.startsWith(path.join(OUTPUT_ROOT, 'foundations') + path.sep)) {
    stats.skipped += 1
    console.warn(`Skipping overwriting foundations doc ${targetPath}`)
    return
  }

  const relativeOutput = path.relative(process.cwd(), targetPath)
  const prevEntry = prevManifestMap.get(relativeOutput)

  const buildPayload = (timestamp: string) => {
      const frontmatterPayload = {
        ...base,
        sourceRepo: product.id,
        generator: generatorValue,
        generatedAt: timestamp,
        sourceCommit: productSourceCommit,
      }
    const baseYaml = yaml.stringify(frontmatterPayload, { indent: 2 }).trim()
    const keywordsBlock = ['keywords:', ...keywords.map(keyword => `  - ${keyword}`)].join('\n')
    const frontmatterBlock = `---\n${baseYaml ? `${baseYaml}\n` : ''}${keywordsBlock}\n---\n`
    const payloadValue = `${GENERATED_FILE_MARKER}\n${frontmatterBlock}${content.trimStart()}\n`
    const contentHash = createHash('sha256').update(payloadValue, 'utf-8').digest('hex')
    return { payload: payloadValue, contentHash, generatedAt: timestamp }
  }

  let generatedAt = prevEntry?.generatedAt ?? new Date().toISOString()
  let { payload, contentHash } = buildPayload(generatedAt)
  let unchanged = Boolean(prevEntry && prevEntry.contentHash === contentHash)

  if (unchanged) {
    const currentOutput = await readFile(targetPath, 'utf-8').catch(() => null)
    if (currentOutput !== payload) {
      unchanged = false
    }
  }

  if (prevEntry && !unchanged) {
    const next = buildPayload(new Date().toISOString())
    payload = next.payload
    contentHash = next.contentHash
    generatedAt = next.generatedAt
  }

  const docId = `${product.id}.${normalized.slug}`
  const manifestEntry: ManifestEntry = {
    docId,
    sourcePath: path.relative(process.cwd(), filePath),
    outputPath: relativeOutput,
    category: normalized.category,
    slug: normalized.slug,
    title: normalized.title,
    description: normalized.description,
    order: normalized.order,
    keywords,
    contentHash,
    sourceRepo: product.id,
    templateId,
    generatedAt,
    generator: generatorValue,
    sourceCommit: productSourceCommit,
  }

  return {
    payload,
    targetPath,
    manifestEntry,
    metaEntry: { slug: normalized.slug, title: normalized.title, order: normalized.order },
    unchanged,
  }
}

async function run() {
  const stats = { generated: 0, skipped: 0 }
  const hashStats: HashStats = { analyzed: 0, regenerated: 0, skipped: 0 }
  const perProductMeta = new Map<string, Array<{ slug: string; title: string; order: number }>>()
  const categories = new Set<string>()
  const registry = await loadRegistry()

  if (!registry.length) {
    console.warn('No products registered, skipping docs generation.')
    await writeManifest([])
    return
  }

  const registryIds = new Set(registry.map(product => product.id))
  await warnUnregisteredIngestFolders(registryIds)

  const prevManifest = await loadCacheManifest()
  const prevManifestMap = new Map(prevManifest.map(entry => [entry.outputPath, entry]))
  let allMatch = prevManifest.length > 0
  const seenOutputs = new Set<string>()
  const tasks: DocTask[] = []

  for (const product of registry) {
    const productRoot = path.join(INGEST_ROOT, product.id)
    const productSourceCommit = await loadProductSourceCommit(product.id)
    let versionRoots: Array<{ version: string; root: string }> = []
    try {
      versionRoots = await collectVersionRoots(productRoot, product.id)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        console.warn(`No ingest folder for product ${product.id}, skipping.`)
        continue
      }
      throw error
    }

      for (const { version, root } of versionRoots) {
        for (const file of await gatherMarkdownFiles(root)) {
          const task = await prepareDocTask(product, version, root, file, productSourceCommit, stats, prevManifestMap)
          if (!task) {
            continue
          }

        tasks.push(task)
        const metaEntries = perProductMeta.get(product.id) ?? []
        metaEntries.push(task.metaEntry)
        perProductMeta.set(product.id, metaEntries)
        categories.add(task.manifestEntry.category)

        hashStats.analyzed += 1
        seenOutputs.add(task.manifestEntry.outputPath)
        if (task.unchanged) {
          hashStats.skipped += 1
        } else {
          hashStats.regenerated += 1
          allMatch = false
        }
      }
    }
  }

  if (prevManifest.length !== seenOutputs.size) {
    allMatch = false
  }

  console.log(
    `Docs analyzed: ${hashStats.analyzed}; Docs regenerated: ${hashStats.regenerated}; Docs skipped due to unchanged hash: ${hashStats.skipped}`,
  )

  if (allMatch && hashStats.analyzed > 0) {
    console.log('Docs unchanged, skipping build')
    return
  }

  for (const task of tasks) {
    await ensureDir(path.dirname(task.targetPath))
    await writeFile(task.targetPath, task.payload, 'utf-8')
    stats.generated += 1
  }

  const manifestEntries = tasks.map(task => task.manifestEntry)
  await writeManifest(manifestEntries)

  for (const product of registry) {
    const entries = perProductMeta.get(product.id) ?? []
    await writeProductMeta(product, entries)
  }

  console.log(`Generated ${stats.generated} docs, skipped ${stats.skipped}. Categories: ${[...categories].map(titleCase).join(', ') || 'none'}.`)
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
