#!/usr/bin/env node
import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises'
import path from 'path'
import yaml from 'yaml'

import { loadRegistry } from './extract/shared.ts'
import { GENERATED_FILE_MARKER } from './extract/shared.ts'

const DOCS_ROOT = path.resolve('src', 'content', 'docs')
const ORDERED_SECTIONS = [
  {
    slug: 'overview',
    title: 'Overview',
    description: 'High-level summary and positioning',
    keywords: ['overview', 'readme', 'intro', 'summary'],
  },
  {
    slug: 'what-you-get',
    title: 'What You Get',
    description: 'Customer-facing list of deliverables',
    keywords: ['what-you-get', 'features', 'product', 'value'],
  },
  {
    slug: 'architecture',
    title: 'Architecture',
    description: 'Technical architecture story',
    keywords: ['architecture', 'system'],
  },
  {
    slug: 'launch-flow',
    title: 'Launch Flow',
    description: 'Launch and activation sequence',
    keywords: ['launch', 'activation', 'flow'],
  },
  {
    slug: 'quick-start',
    title: 'Quick Start',
    description: 'Short guide to get going',
    keywords: ['quick-start', 'getting-started', 'start'],
  },
  {
    slug: 'installation',
    title: 'Installation',
    description: 'Installation steps for the product',
    keywords: ['install', 'installation'],
  },
  {
    slug: 'configuration',
    title: 'Configuration',
    description: 'Environment and configuration guidance',
    keywords: ['config', 'environment', 'env', 'settings'],
  },
  {
    slug: 'deployment',
    title: 'Deployment',
    description: 'Deployment and runtime notes',
    keywords: ['deploy', 'deployment', 'prod'],
  },
]

const SECTION_FALLBACK_LINKS: Record<string, Array<{ label: string; path: string }>> = {
  'launch-flow': [
    { label: 'Deployment guide', path: './deployment.mdx' },
    { label: 'Development workspace reference', path: './development.mdx' },
    { label: 'Architecture story', path: './architecture.mdx' },
  ],
  'quick-start': [
    { label: 'Development flow', path: './development.mdx' },
    { label: 'Getting started overview', path: './overview.mdx' },
  ],
  installation: [
    { label: 'Deployment checklist', path: './deployment.mdx' },
    { label: 'Development environment setup', path: './development.mdx' },
  ],
}

const INTEGRATIONS_DIR = 'integrations'
const ADVANCED_DIR = 'advanced'
const INTEGRATION_KEYWORDS = ['integration', 'stripe', 'auth', 'mailerlite', 'github']

type ManifestEntry = {
  outputPath: string
  sourceRepo: string
  sourceCommit?: string | null
  generatedAt?: string
}

async function loadManifestEntries(): Promise<ManifestEntry[]> {
  try {
    const manifestPath = path.join(DOCS_ROOT, '.generated-manifest.json')
    const raw = await readFile(manifestPath, 'utf-8')
    return JSON.parse(raw) as ManifestEntry[]
  } catch {
    return []
  }
}

async function buildManifestMap(entries: ManifestEntry[]) {
  const map = new Map<string, ManifestEntry[]>()
  for (const entry of entries) {
    const relative = path.relative(DOCS_ROOT, entry.outputPath)
    if (relative.startsWith('..')) continue
    const [product] = relative.split(path.sep)
    if (!product) continue
    const list = map.get(product) ?? []
    list.push(entry)
    map.set(product, list)
  }
  return map
}

function isoFromEntries(entries: ManifestEntry[]) {
  const timestamps = entries
    .map(entry => entry.generatedAt)
    .filter(Boolean)
    .map(value => Date.parse(value!))
    .filter(value => !Number.isNaN(value))
  if (!timestamps.length) return null
  return new Date(Math.max(...timestamps)).toISOString()
}

function buildOverlayFrontmatter(
  fields: Record<string, string | number>,
  generatedAt: string,
) {
  const frontmatter = yaml
    .stringify({
      ...fields,
      sourceRepo: 'prochat',
      generator: 'overlay',
      generatedAt,
    })
    .trim()

  return [
    GENERATED_FILE_MARKER,
    '---',
    frontmatter,
    '---',
    '',
  ].join('\n')
}
type DocRecord = {
  absolutePath: string
  relativePath: string
  label: string
  slug: string
}

function isOverlayDoc(raw: string) {
  return /(?:^|\n)sourceRepo:\s*prochat\s*(?:\n|$)/.test(raw) && /(?:^|\n)generator:\s*overlay\s*(?:\n|$)/.test(raw)
}

function slugify(value: string) {
  return value
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

async function collectDocs(productPath: string): Promise<DocRecord[]> {
  const entries = await readdir(productPath, { withFileTypes: true })
  const docs: DocRecord[] = []

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subEntries = await readdir(path.join(productPath, entry.name), { withFileTypes: true })
      for (const subEntry of subEntries) {
        if (!subEntry.isFile() || path.extname(subEntry.name) !== '.mdx') continue
        const absolutePath = path.join(productPath, entry.name, subEntry.name)
        const doc = await buildDocRecord(productPath, absolutePath)
        if (doc) {
          docs.push(doc)
        }
      }
      continue
    }
    if (entry.isFile() && ['.md', '.mdx'].includes(path.extname(entry.name))) {
      const absolutePath = path.join(productPath, entry.name)
      const doc = await buildDocRecord(productPath, absolutePath)
      if (doc) {
        docs.push(doc)
      }
    }
  }

  return docs
}

async function buildDocRecord(productPath: string, absolutePath: string): Promise<DocRecord | null> {
  const relativePath = path.relative(productPath, absolutePath)
  const raw = await readFile(absolutePath, 'utf-8')
  if (isOverlayDoc(raw)) {
    return null
  }
  const label = extractTitle(raw) || path.basename(relativePath, path.extname(relativePath))
  return {
    absolutePath,
    relativePath,
    label,
    slug: slugify(relativePath),
  }
}

function extractTitle(raw: string) {
  const match = raw.match(/^---\s*([\s\S]*?)\s*---/)
  if (!match) return ''
  const frontmatter = match[1]
  const titleMatch = frontmatter.match(/title:\s*['"]?([^'"\n]+)['"]?/)
  return titleMatch ? titleMatch[1].trim() : ''
}

function matchesKeywords(doc: DocRecord, keywords: string[]) {
  const haystack = `${doc.relativePath} ${doc.label}`.toLowerCase()
  return keywords.some(keyword => haystack.includes(keyword))
}

async function isNonOverlayDoc(filePath: string) {
  try {
    const raw = await readFile(filePath, 'utf-8')
    return !isOverlayDoc(raw)
  } catch {
    return false
  }
}

async function writeSummaryPage(
  productPath: string,
  section: (typeof ORDERED_SECTIONS)[number],
  matches: DocRecord[],
  generatedAt: string,
) {
  const targetPath = path.join(productPath, `${section.slug}.mdx`)
  if (await isNonOverlayDoc(targetPath)) {
    return
  }
  const fallbackLinks = SECTION_FALLBACK_LINKS[section.slug] ?? []
  const entries =
    matches.length > 0
      ? matches.map(
          doc =>
            `- [${doc.label}](./${doc.relativePath.replace(/\\/g, '/')})`,
        )
      : fallbackLinks.length > 0
        ? fallbackLinks.map(link => `- [${link.label}](${link.path})`)
        : ['- No matching technical docs were detected yet.']

  const content = `${buildOverlayFrontmatter(
    {
      title: section.title,
      description: section.description,
      slug: section.slug,
      order: ORDERED_SECTIONS.indexOf(section) + 1,
    },
    generatedAt,
  )}

## Related technical docs

${entries.join('\n')}

`

  await writeFile(targetPath, content, 'utf-8')
}

async function ensureDirectory(productPath: string, dirName: string) {
  await mkdir(path.join(productPath, dirName), { recursive: true })
}

async function directoryExists(dirPath: string) {
  try {
    const info = await stat(dirPath)
    return info.isDirectory()
  } catch {
    return false
  }
}

async function writeIndexPage(productPath: string, dirName: string, docs: DocRecord[], generatedAt: string) {
  const dirPath = path.join(productPath, dirName)
  await ensureDirectory(productPath, dirName)
  const indexPath = path.join(dirPath, 'index.mdx')
  const entries =
    docs.length === 0
      ? ['- No integration docs detected yet.']
      : docs.map(doc => `- [${doc.label}](../${doc.relativePath.replace(/\\/g, '/')})`)

  const content = `${buildOverlayFrontmatter(
    {
      title: dirName.charAt(0).toUpperCase() + dirName.slice(1),
      slug: dirName,
      order: ORDERED_SECTIONS.length + 1,
    },
    generatedAt,
  )}

## Related docs

${entries.join('\n')}
`

  await writeFile(indexPath, content, 'utf-8')
}

async function writeLandingPage(
  productPath: string,
  productId: string,
  productInfo: { title?: string; description?: string; repoUrl?: string } | undefined,
  manifestEntries: ManifestEntry[],
) {
  const targetPath = path.join(productPath, 'index.mdx')
  const title = productInfo?.title ?? productId
  const description = productInfo?.description ?? `${title} documentation`
  const lastSync = isoFromEntries(manifestEntries) ?? new Date().toISOString()
  const sectionLinks = ORDERED_SECTIONS.map(section => `- [${section.title}](./${section.slug}.mdx)`).join('\n')
  const quickLinks = [
    '- [Quick Start](./quick-start.mdx)',
    '- [Installation](./installation.mdx)',
    '- [Integrations](./integrations/index.mdx)',
    '- [Advanced](./advanced/index.mdx)',
  ].join('\n')

  const content = `${buildOverlayFrontmatter(
    {
      title,
      description,
      slug: 'index',
      order: 0,
      keywords: [productId, 'landing', ...(productInfo?.title ? [productInfo.title] : [])].join(', '),
    },
    lastSync,
  )}

## Product overview

${description}

## Generated documentation sections

${sectionLinks}

## Quick links

${quickLinks}

`

  await writeFile(targetPath, content, 'utf-8')
}

async function run() {
  const registry = await loadRegistry()
  const manifestEntries = await loadManifestEntries()
  const manifestMap = await buildManifestMap(manifestEntries)
  for (const product of registry) {
    const productPath = path.join(DOCS_ROOT, product.id)
    if (!(await directoryExists(productPath))) {
      continue
    }
    if ((manifestMap.get(product.id) ?? []).length === 0) {
      continue
    }
    const docs = await collectDocs(productPath)
    const overlayGeneratedAt = isoFromEntries(manifestMap.get(product.id) ?? []) ?? new Date().toISOString()
    const assigned = new Set<string>()

    for (const section of ORDERED_SECTIONS) {
      const canonicalFile = docs.find(
        doc =>
          doc.relativePath === `${section.slug}.mdx` ||
          doc.relativePath === `${section.slug}.md`,
      )
      if (canonicalFile) {
        assigned.add(canonicalFile.absolutePath)
        continue
      }
      const matches = docs.filter(doc => !assigned.has(doc.absolutePath) && matchesKeywords(doc, section.keywords))
      matches.forEach(doc => assigned.add(doc.absolutePath))
      await writeSummaryPage(productPath, section, matches, overlayGeneratedAt)
    }

    const integrationDocs = docs.filter(doc => !assigned.has(doc.absolutePath) && INTEGRATION_KEYWORDS.some(keyword => doc.relativePath.includes(keyword)))
    integrationDocs.forEach(doc => assigned.add(doc.absolutePath))
    await writeIndexPage(productPath, INTEGRATIONS_DIR, integrationDocs, overlayGeneratedAt)

    const advancedDocs = docs.filter(doc => !assigned.has(doc.absolutePath))
    advancedDocs.forEach(doc => assigned.add(doc.absolutePath))
    await writeIndexPage(productPath, ADVANCED_DIR, advancedDocs, overlayGeneratedAt)
    await writeLandingPage(productPath, product.id, product, manifestMap.get(product.id) ?? [])
  }
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
