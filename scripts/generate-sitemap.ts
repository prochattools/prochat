import fs from 'fs'
import path from 'path'

type ChangeFrequency = 'weekly' | 'monthly' | 'yearly'

type UrlSitemapEntry = {
  loc: string
  changefreq: ChangeFrequency
  priority: string
}

type SitemapIndexEntry = {
  loc: string
}

const SITE_URL = 'https://prochat.tools'

const PAGE_PATHS = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/memory', changefreq: 'weekly', priority: '0.9' },
  { path: '/memory-qa', changefreq: 'weekly', priority: '0.85' },
  { path: '/workbench', changefreq: 'weekly', priority: '0.85' },
  { path: '/docs', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.7' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.5' },
  { path: '/terms', changefreq: 'yearly', priority: '0.5' },
] as const

const NESTED_SITEMAP_PATHS = ['/learn/sitemap.xml', '/docs/sitemap.xml'] as const

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderUrlEntry(entry: UrlSitemapEntry) {
  return [
    '  <url>',
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    '  </url>',
  ].join('\n')
}

function renderSitemapIndexEntry(entry: SitemapIndexEntry) {
  return [
    '  <sitemap>',
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    '  </sitemap>',
  ].join('\n')
}

function writeXmlFile(outputPath: string, xml: string) {
  fs.writeFileSync(outputPath, xml, 'utf8')
}

function main() {
  const pageEntries: UrlSitemapEntry[] = PAGE_PATHS.map(entry => ({
    loc: `${SITE_URL}${entry.path}`,
    changefreq: entry.changefreq,
    priority: entry.priority,
  }))

  const pagesXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pageEntries.map(renderUrlEntry),
    '</urlset>',
    '',
  ].join('\n')

  const sitemapEntries: SitemapIndexEntry[] = [
    { loc: `${SITE_URL}/sitemap-pages.xml` },
    ...NESTED_SITEMAP_PATHS.map(sitemapPath => ({ loc: `${SITE_URL}${sitemapPath}` })),
  ]

  const sitemapIndexXml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapEntries.map(renderSitemapIndexEntry),
    '</sitemapindex>',
    '',
  ].join('\n')

  const publicDir = path.join(process.cwd(), 'public')
  writeXmlFile(path.join(publicDir, 'sitemap-pages.xml'), pagesXml)
  writeXmlFile(path.join(publicDir, 'sitemap.xml'), sitemapIndexXml)
}

try {
  main()
} catch (error) {
  console.error('[sitemap] Failed to generate sitemap.xml')
  console.error(error)
  process.exit(1)
}
