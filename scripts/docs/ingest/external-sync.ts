#!/usr/bin/env node
import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from 'fs/promises'
import path from 'path'

const REGISTRY_PATH = path.resolve('scripts', 'docs', 'products-registry.json')
const INGEST_ROOT = path.resolve('docs-ingest')
const TMP_ROOT = path.join(INGEST_ROOT, '.tmp')
const DEFAULT_EXPORT_PATH = 'docs-export'

type RegistryProduct = {
  id: string
  title: string
  category: string
  docsPath: string
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
  const product = envProduct || argProduct
  const docsPath = envPath || argPath || DEFAULT_EXPORT_PATH
  const commit = envCommit || argCommit || null
  return {
    product,
    exportRoot: path.resolve(docsPath),
    commit,
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

async function seedExistingDocs(sourceRoot: string, tempRoot: string) {
  const silentCounter = { copied: 0, skipped: 0 }
  await copyMarkdown(sourceRoot, tempRoot, silentCounter)
}

async function run() {
  const registry = await loadRegistry()
  if (!registry.length) {
    console.error('Product registry is empty. Cannot ingest external docs.')
    process.exit(1)
  }

  const { product, exportRoot, commit } = resolveParameters()

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

  for (const target of targets) {
    const sourceRoot = product
      ? await resolveProductExportRoot(exportRoot, target.id)
      : path.join(exportRoot, target.id)
    try {
      await stat(sourceRoot)
    } catch {
      if (product) {
        console.warn(`Export path ${sourceRoot} does not exist. Nothing to ingest.`)
      }
      continue
    }

    const tempRoot = path.join(TMP_ROOT, target.id)
    await rm(tempRoot, { recursive: true, force: true })
    const counter = { copied: 0, skipped: 0 }

    try {
      const targetRoot = path.join(INGEST_ROOT, target.id)
      await seedExistingDocs(targetRoot, tempRoot)
      await copyMarkdown(sourceRoot, tempRoot, counter)
      await rm(targetRoot, { recursive: true, force: true })
      await mkdir(path.dirname(targetRoot), { recursive: true })
      await rename(tempRoot, targetRoot)
      console.log(`docs imported: ${counter.copied}, docs skipped: ${counter.skipped}`)
      console.log(`Sync success: docs-ingest/${target.id}`)
      if (commit) {
        process.env.DOCS_SOURCE_COMMIT = commit
        console.log(`Source commit tracked: ${commit}`)
      }
    } catch (error) {
      console.error(`Sync failed for ${target.id}: ${(error as Error).message}`)
      await rm(tempRoot, { recursive: true, force: true })
    }
  }
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
