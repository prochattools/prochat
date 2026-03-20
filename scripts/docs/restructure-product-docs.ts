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

type GeneratedSectionCopy = {
  intro: string[]
  guidanceHeading: string
  guidance: string[]
  note?: string
}

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

function productDisplayName(productId: string) {
  return productId === 'saaskit' ? 'SaaSKit' : 'ProKit'
}

function buildSectionCopy(productId: string, sectionSlug: string): GeneratedSectionCopy {
  const productName = productDisplayName(productId)
  const isSaaSKit = productId === 'saaskit'

  switch (sectionSlug) {
    case 'launch-flow':
      return {
        intro: [
          `Use this page when the base setup is working and you are moving from build mode to launch mode.`,
          isSaaSKit
            ? 'For SaaSKit, that usually means finishing the product stack, checking the launch path, and making sure the founder-facing experience is ready.'
            : 'For ProKit, that means keeping the core layer stable, then shipping only the pieces you need for the first real release.',
        ],
        guidanceHeading: 'What to do next',
        guidance: isSaaSKit
          ? [
              'Confirm auth, billing, email, and any required integrations are in place.',
              'Run the local flow once end to end so you know the launch path is not hiding setup gaps.',
              'Move to deployment only after the product path works without manual fixes.',
            ]
          : [
              'Keep the surface area small and only add product features after the foundation is working.',
              'Check the main user flow locally so you can catch setup problems before deployment.',
              'Use this as the transition point from infrastructure setup to a first real release.',
            ],
        note: isSaaSKit
          ? 'SaaSKit should read like a founder launch path with product, launch, and integration checks.'
          : 'ProKit should stay narrower and focus on the base engine plus the shortest path to a working release.',
      }
    case 'quick-start':
      return {
        intro: [
          `Use this page when you want the shortest path from clone to a working local app for ${productName}.`,
          'Read it before diving into deeper configuration so you do not overbuild the first run.',
        ],
        guidanceHeading: 'Fast path',
        guidance: [
          'Clone the repo, install dependencies, and make sure the environment file is present.',
          'Start the app locally and confirm the main routes and auth flow load cleanly.',
          'Only after the first boot works should you move into configuration and launch planning.',
        ],
        note: 'If the first boot fails, fix the basics before reading anything more advanced.',
      }
    case 'installation':
      return {
        intro: [
          `Use this page when you are setting up ${productName} for the first time or resetting a local environment.`,
          'It should answer the practical question: what has to happen before the app can actually run?',
        ],
        guidanceHeading: 'Installation order',
        guidance: isSaaSKit
          ? [
              'Install dependencies and confirm the environment values required for the product runtime are present.',
              'Set up the local database and any optional services you plan to use.',
              'Start the app and verify the launch path before moving to deeper customization.',
            ]
          : [
              'Install dependencies and confirm the base runtime environment is ready.',
              'Set up the local database and any shared services you need for the first run.',
              'Start the app and validate the engine before adding product-specific work.',
            ],
        note: isSaaSKit
          ? 'SaaSKit installation should make it clear where the product stack begins and where optional integrations start.'
          : 'ProKit installation should stay focused on the essential base setup and avoid product-layer detours.',
      }
    case 'configuration':
      return {
        intro: [
          `Use this page when the app is running and you need to decide what to configure now versus later.`,
          isSaaSKit
            ? 'For SaaSKit, that usually means the product runtime plus any optional integration keys.'
            : 'For ProKit, that usually means the small set of values needed for the engine and deployment path.',
        ],
        guidanceHeading: 'Configuration sequence',
        guidance: [
          'Set the required runtime values first so the app can boot reliably.',
          'Add optional integrations only after the core flow is stable.',
          'Keep environment changes small and verify them one group at a time.',
        ],
        note: 'If a setting is not required for the first successful run, leave it for later.',
      }
    case 'advanced':
      return {
        intro: [
          `Use this page after the basics are working and you want to understand the deeper product mechanics for ${productName}.`,
          'Do not start here unless the installation and configuration path already makes sense.',
        ],
        guidanceHeading: 'Read next',
        guidance: isSaaSKit
          ? [
              'Database, development, deployment, and integration docs are the best next reads.',
              'Use the advanced section to understand how the product pieces fit together, not to start setup from scratch.',
              'When something feels unclear, step back to the quick-start or installation pages first.',
            ]
          : [
              'Database, development, deployment, and stack docs are the best next reads.',
              'Use the advanced section to understand the lighter engine layer and where you own more of the structure.',
              'When something feels unclear, go back to the quick-start or installation pages first.',
            ],
        note: isSaaSKit
          ? 'SaaSKit advanced pages should help founders reason about launch-level product structure.'
          : 'ProKit advanced pages should help founders understand the narrower base layer without pulling them into SaaSKit assumptions.',
      }
    default:
      return {
        intro: [
          `Use this page to move from overview into the most relevant technical docs for ${productName}.`,
          'These generated overlays should point you toward the next practical step rather than act like empty placeholders.',
        ],
        guidanceHeading: 'Next steps',
        guidance: ['Read the linked technical docs below and keep the first pass focused on one setup decision at a time.'],
      }
  }
}

function formatGuidance(items: string[]) {
  return items.map(item => `- ${item}`).join('\n')
}

function buildRelatedDocsList(matches: DocRecord[], fallbackLinks: Array<{ label: string; path: string }>) {
  const docs =
    matches.length > 0
      ? matches.map(doc => `- [${doc.label}](./${doc.relativePath.replace(/\\/g, '/')})`)
      : fallbackLinks.map(link => `- [${link.label}](${link.path})`)

  return docs.length > 0 ? docs : ['- Read the related technical docs in this product section.']
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
  productId: string,
  section: (typeof ORDERED_SECTIONS)[number],
  matches: DocRecord[],
  generatedAt: string,
) {
  const targetPath = path.join(productPath, `${section.slug}.mdx`)
  if (await isNonOverlayDoc(targetPath)) {
    return
  }
  const fallbackLinks = SECTION_FALLBACK_LINKS[section.slug] ?? []
  const sectionCopy = buildSectionCopy(productId, section.slug)
  const relatedDocs = buildRelatedDocsList(matches, fallbackLinks)
  const noteBlock = sectionCopy.note ? `\n> **Note:** ${sectionCopy.note}\n` : ''

  const content = `${buildOverlayFrontmatter(
    {
      title: section.title,
      description: section.description,
      slug: section.slug,
      order: ORDERED_SECTIONS.indexOf(section) + 1,
    },
    generatedAt,
  )}

${sectionCopy.intro.map(paragraph => `${paragraph}\n`).join('\n')}

## ${sectionCopy.guidanceHeading}

${formatGuidance(sectionCopy.guidance)}

${noteBlock}

## Related technical docs

${relatedDocs.join('\n')}

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
  const isAdvanced = dirName === ADVANCED_DIR
  const entries =
    docs.length === 0
      ? ['- No integration docs detected yet.']
      : docs.map(doc => `- [${doc.label}](../${doc.relativePath.replace(/\\/g, '/')})`)
  const intro = isAdvanced
    ? [
        'Use this page when you are done with the basics and want the deeper technical reference for this product.',
        'Advanced pages should help you understand structure, not replace the quick-start or installation flow.',
      ]
    : [
        'Use this page to find the higher-value companion docs that support the product setup and implementation path.',
        'It should point you toward the most relevant technical references without burying them in a blank shell.',
      ]
  const guidance = isAdvanced
    ? [
        'Read the technical docs listed here in the order that matches your current problem.',
        'If you are still setting up the product, go back to quick-start or installation first.',
      ]
    : [
        'Follow the listed docs and keep the first pass focused on one integration at a time.',
        'If no integration docs exist yet, use the core product docs first and revisit this page later.',
      ]

  const content = `${buildOverlayFrontmatter(
    {
      title: dirName.charAt(0).toUpperCase() + dirName.slice(1),
      slug: dirName,
      order: ORDERED_SECTIONS.length + 1,
    },
    generatedAt,
  )}

${intro.map(paragraph => `${paragraph}\n`).join('\n')}

## How to use this section

${formatGuidance(guidance)}

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
      await writeSummaryPage(productPath, product.id, section, matches, overlayGeneratedAt)
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
