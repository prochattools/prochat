#!/usr/bin/env node
import { createHash } from 'crypto'
import { readFile, readdir, writeFile } from 'fs/promises'
import path from 'path'

import yaml from 'yaml'

import { normalizeFrontmatter } from '../transform/normalize-frontmatter.ts'
import { generateSectionContent } from './ai-client.ts'
import type { Metadata } from './ai-client.ts'
import { buildSectionContent, needsRegeneration, parseSections } from '../sections.ts'
import type { SectionEntry } from '../sections.ts'
import { DEFAULT_TEMPLATE, templates } from '../templates/index.ts'
import type { TemplateDefinition } from '../templates/types.ts'
import { detectReservedDirectory } from '../reserved.ts'
import { GENERATED_FILE_MARKER } from '../extract/shared.ts'

const INGEST_ROOT = path.resolve('docs-ingest')
const REGISTRY_PATH = path.resolve('scripts', 'docs', 'products-registry.json')
const MANIFEST_PATH = path.resolve('src', 'content', 'docs', '.generated-manifest.json')
const VERSION_PATTERN = /^v\d+$/i
const SKIP_AI = process.env.DOCS_SKIP_AI === 'true'
const SOURCE_COMMIT = process.env.DOCS_SOURCE_COMMIT?.trim() || null

type RegistryEntry = {
  id: string
  category: string
  template?: string
  apiSource?: 'typescript' | 'openapi' | 'none'
  apiSourcePaths?: string[]
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

type ManifestMap = Map<string, string>

async function loadManifest(): Promise<ManifestMap> {
  try {
    const content = await readFile(MANIFEST_PATH, 'utf-8')
    const entries: Array<{ sourcePath: string; contentHash: string }> = JSON.parse(content)
    return new Map(entries.map(entry => [entry.sourcePath, entry.contentHash]))
  } catch {
    return new Map()
  }
}

async function gatherMarkdownFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const files: string[] = []

  await Promise.all(
    entries.map(async entry => {
      if (entry.name.startsWith('.')) return
      const resolved = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        files.push(...(await gatherMarkdownFiles(resolved)))
        return
      }
      if (!entry.name.endsWith('.md') && !entry.name.endsWith('.mdx')) return
      files.push(resolved)
    }),
  )

  return files
}

async function listVersionFiles(productRoot: string, productId: string) {
  const versionFiles: Array<{ version: string; filePath: string }> = []
  try {
    const entries = await readdir(productRoot, { withFileTypes: true })
    const versionDirs = entries.filter(entry => entry.isDirectory() && VERSION_PATTERN.test(entry.name))
    for (const entry of entries) {
      if (entry.isDirectory() && entry.name.toLowerCase().startsWith('v') && !VERSION_PATTERN.test(entry.name)) {
        console.warn(`Skipping invalid version folder docs-ingest/${productId}/${entry.name}`)
      }
    }
    const roots = [{ version: '', root: productRoot }, ...versionDirs.map(entry => ({ version: entry.name, root: path.join(productRoot, entry.name) }))]
    for (const { version, root } of roots) {
      try {
        const files = await gatherMarkdownFiles(root)
        for (const file of files) {
          versionFiles.push({ version, filePath: file })
        }
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
          continue
        }
        throw error
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return versionFiles
    }
    throw error
  }
  return versionFiles
}

function splitFrontmatter(raw: string) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { frontmatter: '', content: raw }
  }

  return { frontmatter: match[1], content: match[2] }
}

async function run() {
  if (SKIP_AI) {
    console.log('DOCS_SKIP_AI=true; skipping AI generation')
    return
  }
  const registry = await loadRegistry()
  if (!registry.length) {
    console.warn('Registry is empty; no AI generation.')
    return
  }

  const manifest = await loadManifest()
  const categoryArg = process.argv[2] as string | undefined
  const products = categoryArg
    ? registry.filter((entry: RegistryEntry) => entry.id === categoryArg)
    : registry

  if (categoryArg && products.length === 0) {
    console.error(
      `Unsupported category ${categoryArg}. Available: ${registry.map((entry: RegistryEntry) => entry.id).join(', ')}`,
    )
    process.exit(1)
  }

  let analyzed = 0
  let regenerated = 0
  let skipped = 0

  for (const product of products) {
    console.log(`AI generation for ${product.id}`)
    const files = await listVersionFiles(path.join(INGEST_ROOT, product.id), product.id)

    for (const { filePath } of files) {
      analyzed += 1
      const raw = await readFile(filePath, 'utf-8')
      const hash = createHash('sha256').update(raw, 'utf-8').digest('hex')
      const relativeSource = path.relative(process.cwd(), filePath)
      const manifestHash = manifest.get(relativeSource)
      if (manifestHash && manifestHash === hash) {
        skipped += 1
        continue
      }

      const { frontmatter, content } = splitFrontmatter(raw)
      let meta: Record<string, unknown>
      try {
        meta = frontmatter ? (yaml.parse(frontmatter) as Record<string, unknown>) : {}
      } catch (error) {
        console.warn(`Skipping ${filePath}, invalid frontmatter: ${(error as Error).message}`)
        skipped += 1
        continue
      }

      const slugDefault = path.basename(filePath).replace(/\.mdx?$/i, '')
      const normalized = normalizeFrontmatter(meta || {}, {
        slug: slugDefault,
        category: product.category,
        titleFallback: titleCase(slugDefault),
        orderFallback: 100,
        keywordsFallback: [titleCase(product.category)],
      })

      const metadata: Metadata = {
        title: normalized.title,
        description: normalized.description,
        category: normalized.category,
        slug: normalized.slug,
        keywords: normalized.keywords,
      }

      const template: TemplateDefinition = templates[product.template ?? DEFAULT_TEMPLATE.id] ?? DEFAULT_TEMPLATE
      const docId = `${product.id}.${normalized.slug}`
      const relativeProductPath = path.relative(path.join(INGEST_ROOT, product.id), filePath)
      const reservedDir = detectReservedDirectory(relativeProductPath)
      const parsedSections = parseSections(content)
      const sectionMap = new Map(parsedSections.map(section => [section.name, section.content]))
      const existingSections: SectionEntry[] = [...parsedSections]
      const sectionsToGenerate = template.sections.filter(section => {
        const entry = sectionMap.get(section.name)
        return !entry || needsRegeneration(entry)
      })

      for (const section of sectionsToGenerate) {
        const sectionContent = await generateSectionContent(metadata, {
          docId,
          section: section.name,
          heading: section.heading,
          templateId: template.id,
          existingSections,
        })
        sectionMap.set(section.name, sectionContent)
        const index = existingSections.findIndex(entry => entry.name === section.name)
        if (index >= 0) {
          existingSections[index] = { name: section.name, content: sectionContent }
        } else {
          existingSections.push({ name: section.name, content: sectionContent })
        }
      }

      const orderedSections = template.sections.map(section => ({
        name: section.name,
        content: sectionMap.get(section.name) ?? '',
        heading: section.heading,
      }))

      const extraSections = existingSections.filter(
        entry => !template.sections.some(section => section.name === entry.name),
      )

      const finalContentSections = [
        ...orderedSections.map(section => buildSectionContent({ name: section.name, heading: section.heading }, section.content)),
        ...extraSections.map(entry => `<!-- AI:${entry.name}:start -->\n${entry.content}\n<!-- AI:${entry.name}:end -->`),
      ]

      const finalContent = finalContentSections.join('\n\n')

      const { keywords, ...base } = normalized
      const generatedAt = new Date().toISOString()
      const baseYaml = yaml.stringify({
        ...base,
        sourceRepo: product.id,
        generator: reservedDir ? 'auto' : 'ai',
        generatedAt,
        sourceCommit: SOURCE_COMMIT,
      }, { indent: 2 }).trim()
      const keywordsBlock = ['keywords:', ...keywords.map(keyword => `  - ${keyword}`)].join('\n')
      const frontmatterBlock = `---\n${baseYaml ? `${baseYaml}\n` : ''}${keywordsBlock}\n---\n`
      const payload = `${GENERATED_FILE_MARKER}\n${frontmatterBlock}${finalContent}\n`
      const finalHash = createHash('sha256').update(payload, 'utf-8').digest('hex')

      if (manifestHash && manifestHash === finalHash) {
        skipped += 1
        continue
      }

      await writeFile(filePath, payload, 'utf-8')
      regenerated += 1
    }
  }

  console.log(`Docs analyzed: ${analyzed}; regenerated: ${regenerated}; skipped unchanged: ${skipped}`)
}

function titleCase(value: string) {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .trim()
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
