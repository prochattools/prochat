#!/usr/bin/env node
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'fs/promises'
import path from 'path'

const REGISTRY_PATH = path.resolve('scripts', 'docs', 'products-registry.json')
const INGEST_ROOT = path.resolve('docs-ingest')
const TMP_ROOT = path.join(INGEST_ROOT, '.tmp')
const DEFAULT_EXPORT_PATH = 'docs-export'
const NON_INGESTABLE_DIRECTORIES = new Set(['private', 'docs-private'])
const SOURCE_METADATA_FILE = '.source.json'

type RegistryProduct = {
  id: string
  title: string
  category: string
  docsPath: string
  canonicalDocsRoot?: string
  apiSource?: 'typescript' | 'openapi' | 'none'
  apiSourcePaths?: string[]
}

async function loadRegistry(): Promise<RegistryProduct[]> {
  try {
    const raw = await readFile(REGISTRY_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed.products)) {
      return parsed.products
    }
  } catch (error) {
    console.error(`Unable to read product registry: ${(error as Error).message}`)
  }
  return []
}

function resolveParameters() {
  const [, , argProduct, argPath, argCommit] = process.argv
  const envProduct = process.env.DOCS_EXPORT_PRODUCT
  const envPath = process.env.DOCS_EXPORT_PATH
  const envCommit = process.env.DOCS_EXPORT_COMMIT
  const envSourcePath = process.env.DOCS_EXPORT_SOURCE_PATH
  const envSourceLayout = process.env.DOCS_EXPORT_SOURCE_LAYOUT
  const envRepoUrl = process.env.DOCS_EXPORT_REPO_URL
  const product = envProduct || argProduct
  const docsPath = envPath || argPath || DEFAULT_EXPORT_PATH
  const commit = envCommit || argCommit || null
  const sourceLayout: 'canonical' | 'legacy' | null =
    envSourceLayout === 'canonical' || envSourceLayout === 'legacy' ? envSourceLayout : null
  return {
    product,
    exportRoot: path.resolve(docsPath),
    commit,
    sourcePath: envSourcePath || null,
    sourceLayout,
    repoUrl: envRepoUrl || null,
  }
}

async function resolveProductExportRoot(exportRoot: string, productId: string) {
  const nestedRoot = path.join(exportRoot, productId)
  try {
    const nestedStat = await stat(nestedRoot)
    if (nestedStat.isDirectory()) {
      return nestedRoot
    }
  } catch {
    return exportRoot
  }
  return exportRoot
}

async function copyMarkdown(dir: string, dest: string, counter: { copied: number; skipped: number }) {
  const entries = await readdir(dir, { withFileTypes: true })
  await mkdir(dest, { recursive: true })
  await Promise.all(
    entries.map(async entry => {
      if (entry.name.startsWith('.')) return
      if (entry.isDirectory() && NON_INGESTABLE_DIRECTORIES.has(entry.name)) {
        counter.skipped += 1
        return
      }
      const source = path.join(dir, entry.name)
      const target = path.join(dest, entry.name)
      if (entry.isDirectory()) {
        await copyMarkdown(source, target, counter)
        return
      }
      if (!entry.name.match(/\.mdx?$/i)) {
        counter.skipped += 1
        return
      }
      const content = await readFile(source)
      await writeFile(target, content)
      counter.copied += 1
    }),
  )
}

async function writeSourceMetadata(
  targetRoot: string,
  commit: string | null,
  sourcePath: string | null,
  sourceLayout: 'canonical' | 'legacy' | null,
  repoUrl: string | null,
) {
  const metadataPath = path.join(targetRoot, SOURCE_METADATA_FILE)
  await writeFile(
    metadataPath,
    JSON.stringify(
      {
        sourceCommit: commit,
        sourcePath,
        sourceLayout,
        repoUrl,
        syncedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
    'utf-8',
  )
}

async function run() {
  const registry = await loadRegistry()
  if (!registry.length) {
    console.error('Product registry is empty. Cannot ingest external docs.')
    process.exit(1)
  }

  const { product, exportRoot, commit, sourcePath, sourceLayout, repoUrl } = resolveParameters()

  try {
    await stat(exportRoot)
  } catch {
    console.warn(`Export path ${exportRoot} does not exist. Nothing to ingest.`)
    return
  }

  const targets = product
    ? registry.filter(entry => entry.id === product)
    : registry

  if (product && targets.length === 0) {
    console.warn(`Product ${product} is not registered. Skipping ingestion.`)
    return
  }

  const failures: string[] = []

  for (const target of targets) {
    const sourceRoot = product
      ? await resolveProductExportRoot(exportRoot, target.id)
      : path.join(exportRoot, target.id)
    try {
      await stat(sourceRoot)
    } catch {
      if (product) {
        console.warn(`Export path ${sourceRoot} does not exist. Nothing to ingest.`)
        failures.push(target.id)
      }
      continue
    }

    const tempRoot = path.join(TMP_ROOT, target.id)
    await rm(tempRoot, { recursive: true, force: true })
    const counter = { copied: 0, skipped: 0 }

    try {
      const targetRoot = path.join(INGEST_ROOT, target.id)
      await copyMarkdown(sourceRoot, tempRoot, counter)
      await rm(targetRoot, { recursive: true, force: true })
      await mkdir(path.dirname(targetRoot), { recursive: true })
      await rename(tempRoot, targetRoot)
      await writeSourceMetadata(targetRoot, commit, sourcePath, sourceLayout, repoUrl)
      console.log(`docs imported: ${counter.copied}, docs skipped: ${counter.skipped}`)
      console.log(`Sync success: docs-ingest/${target.id}`)
      if (commit) {
        console.log(`Source commit tracked: ${commit}`)
      }
    } catch (error) {
      console.error(`Sync failed for ${target.id}: ${(error as Error).message}`)
      await rm(tempRoot, { recursive: true, force: true })
      failures.push(target.id)
    }
  }

  if (failures.length > 0) {
    throw new Error(`External docs ingest failed for: ${failures.join(', ')}`)
  }
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
