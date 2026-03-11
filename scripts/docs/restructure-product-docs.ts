#!/usr/bin/env node
import { mkdir, readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'

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

const INTEGRATIONS_DIR = 'integrations'
const ADVANCED_DIR = 'advanced'
const INTEGRATION_KEYWORDS = ['integration', 'stripe', 'auth', 'mailerlite', 'github']

type DocRecord = {
  absolutePath: string
  relativePath: string
  label: string
  slug: string
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
        docs.push(await buildDocRecord(productPath, absolutePath))
      }
      continue
    }
    if (entry.isFile() && ['.md', '.mdx'].includes(path.extname(entry.name))) {
      const absolutePath = path.join(productPath, entry.name)
      docs.push(await buildDocRecord(productPath, absolutePath))
    }
  }

  return docs
}

async function buildDocRecord(productPath: string, absolutePath: string): Promise<DocRecord> {
  const relativePath = path.relative(productPath, absolutePath)
  const raw = await readFile(absolutePath, 'utf-8')
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

async function writeSummaryPage(
  productPath: string,
  section: (typeof ORDERED_SECTIONS)[number],
  matches: DocRecord[],
) {
  const targetPath = path.join(productPath, `${section.slug}.mdx`)
  const entries =
    matches.length === 0
      ? ['No matching technical docs were detected yet.']
      : matches.map(
          doc =>
            `- [${doc.label}](./${doc.relativePath.replace(/\\/g, '/')})`,
        )

  const content = `---
title: ${section.title}
description: ${section.description}
slug: ${section.slug}
order: ${ORDERED_SECTIONS.indexOf(section) + 1}
---

## Related technical docs

${entries.join('\n')}

`

  await writeFile(targetPath, content, 'utf-8')
}

async function ensureDirectory(productPath: string, dirName: string) {
  await mkdir(path.join(productPath, dirName), { recursive: true })
}

async function writeIndexPage(productPath: string, dirName: string, docs: DocRecord[]) {
  const dirPath = path.join(productPath, dirName)
  await ensureDirectory(productPath, dirName)
  const indexPath = path.join(dirPath, 'index.mdx')
  const entries =
    docs.length === 0
      ? ['- No integration docs detected yet.']
      : docs.map(doc => `- [${doc.label}](../${doc.relativePath.replace(/\\/g, '/')})`)

  const content = `---
title: ${dirName.charAt(0).toUpperCase() + dirName.slice(1)}
slug: ${dirName}
order: ${ORDERED_SECTIONS.length + 1}
---

## Related docs

${entries.join('\n')}
`

  await writeFile(indexPath, content, 'utf-8')
}

async function run() {
  const products = await readdir(DOCS_ROOT, { withFileTypes: true })
  for (const product of products) {
    if (!product.isDirectory()) continue
    const productPath = path.join(DOCS_ROOT, product.name)
    const docs = await collectDocs(productPath)
    const assigned = new Set<string>()

    for (const section of ORDERED_SECTIONS) {
      const matches = docs.filter(doc => !assigned.has(doc.absolutePath) && matchesKeywords(doc, section.keywords))
      matches.forEach(doc => assigned.add(doc.absolutePath))
      await writeSummaryPage(productPath, section, matches)
    }

    const integrationDocs = docs.filter(doc => !assigned.has(doc.absolutePath) && INTEGRATION_KEYWORDS.some(keyword => doc.relativePath.includes(keyword)))
    integrationDocs.forEach(doc => assigned.add(doc.absolutePath))
    await writeIndexPage(productPath, INTEGRATIONS_DIR, integrationDocs)

    const advancedDocs = docs.filter(doc => !assigned.has(doc.absolutePath))
    advancedDocs.forEach(doc => assigned.add(doc.absolutePath))
    await writeIndexPage(productPath, ADVANCED_DIR, advancedDocs)
  }
}

run().catch(error => {
  console.error(error)
  process.exit(1)
})
