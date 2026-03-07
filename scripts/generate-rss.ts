import fs from 'fs'
import path from 'path'

import { getAllBlogPosts } from '@/libs/blog'

function getSiteUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (siteUrl) {
    return siteUrl.replace(/\/+$/, '')
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('NEXT_PUBLIC_SITE_URL is required to generate rss.xml in production.')
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

async function main() {
  const baseUrl = getSiteUrl()
  const posts = await getAllBlogPosts()

  const xml = [
    '<?xml version="1.0" encoding="UTF-8" ?>',
    '<rss version="2.0">',
    '  <channel>',
    '    <title>ProChat Blog</title>',
    `    <link>${escapeXml(baseUrl)}</link>`,
    '    <description>The Operating System for SaaS Builders</description>',
    ...posts.flatMap(post => {
      const url = `${baseUrl}/blog/${post.slug}`

      return [
        '    <item>',
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid>${escapeXml(url)}</guid>`,
        `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.excerpt || post.description)}</description>`,
        '    </item>',
      ]
    }),
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')

  fs.writeFileSync(path.join(process.cwd(), 'public', 'rss.xml'), xml, 'utf8')
}

main().catch(error => {
  console.error('[rss] Failed to generate rss.xml')
  console.error(error)
  process.exit(1)
})
