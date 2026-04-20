import fs from 'fs'
import path from 'path'

type UrlSitemapEntry = {
  loc: string
  lastmod: string
  changefreq: 'weekly'
  priority: string
}

type SitemapIndexEntry = {
  loc: string
  lastmod: string
}

function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (siteUrl) {
    return siteUrl.replace(/\/+$/, '')
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_SITE_URL is required to generate sitemap.xml in production.')
  }

  return 'http://localhost:3056'
}

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
    `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    '  </url>',
  ].join('\n')
}

function renderSitemapIndexEntry(entry: SitemapIndexEntry) {
  return [
    '  <sitemap>',
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
    '  </sitemap>',
  ].join('\n')
}

function writeXmlFile(outputPath: string, xml: string) {
  fs.writeFileSync(outputPath, xml, 'utf8')
}

async function main() {
  const baseUrl = getSiteUrl()
  const generatedAt = new Date().toISOString()
  const pagePaths = [
    { path: '/', priority: '1.0' },
    { path: '/contact', priority: '0.7' },
    { path: '/proof', priority: '0.7' },
    { path: '/kits', priority: '0.8' },
    { path: '/kits/prokit', priority: '0.8' },
    { path: '/kits/saaskit', priority: '0.9' },
    { path: '/starting-point', priority: '0.9' },
  ] as const

  const pageEntries: UrlSitemapEntry[] = pagePaths.map(entry => ({
    loc: `${baseUrl}${entry.path}`,
    lastmod: generatedAt,
    changefreq: 'weekly',
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
    { loc: `${baseUrl}/sitemap-pages.xml`, lastmod: generatedAt },
    { loc: `${baseUrl}/learn/sitemap.xml`, lastmod: generatedAt },
    { loc: `${baseUrl}/docs/sitemap.xml`, lastmod: generatedAt },
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

main().catch(error => {
  console.error('[sitemap] Failed to generate sitemap.xml')
  console.error(error)
  process.exit(1)
})
