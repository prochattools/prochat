#!/usr/bin/env node
// ProChat marketing site – powered by the ProKit engine
// (c) 2025 Steve Westhoek / ProChat

const fs = require('fs')
const path = require('path')

const envPath = path.join(process.cwd(), '.env')

function sanitizeSlug(input) {
  return (input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') || 'app'
}

if (fs.existsSync(envPath)) {
  console.log('✅ .env already exists, skipping bootstrap')
  process.exit(0)
}

// Default slug: sanitized repo folder name (no hyphens/underscores/dots)
const repoName = path.basename(process.cwd())
const rawSlug = process.env.APP_SLUG || repoName
const slug = sanitizeSlug(rawSlug)

const systemUrl =
  process.env.SYSTEM_DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5433/postgres?schema=public'

const content = [
  `APP_SLUG=${slug}`,
  `NODE_ENV=development`,
  `SYSTEM_DATABASE_URL=${systemUrl}`,
  `SHADOW_DATABASE_URL=${systemUrl}`,
  `# DATABASE_URL will be populated automatically after the first "npm run db:init"`,
  ''
].join('\n')

fs.writeFileSync(envPath, content, { encoding: 'utf8' })
console.log('✅ Created .env for development with default settings')
