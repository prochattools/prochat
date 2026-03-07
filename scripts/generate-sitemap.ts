import fs from 'fs'
import path from 'path'

import { getAllBlogPosts } from '@/libs/blog'

type SitemapEntry = {
  loc: string
  lastmod: string
  changefreq: 'weekly'
  priority: string
}

function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (siteUrl) {
    return siteUrl.replace(/\/+$/, '')
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_SITE_URL is required to generate sitemap.xml in production.')
  }

  return 'http://localhost:3000'
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderEntry(entry: SitemapEntry) {
  return [
    '  <url>',
    `    <loc>${escapeXml(entry.loc)}</loc>`,
    `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    '  </url>',
  ].join('\n')
}

async function main() {
  const baseUrl = getSiteUrl()
  const posts = await getAllBlogPosts()

  const entries: SitemapEntry[] = [
    {
      loc: `${baseUrl}/`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    },
    {
      loc: `${baseUrl}/blog`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    },
    ...posts.map(post => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: new Date(post.date).toISOString(),
      changefreq: 'weekly' as const,
      priority: '0.7',
    })),
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(renderEntry),
    '</urlset>',
    '',
  ].join('\n')

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml')
  fs.writeFileSync(outputPath, xml, 'utf8')
}

main().catch(error => {
  console.error('[sitemap] Failed to generate sitemap.xml')
  console.error(error)
  process.exit(1)
})
