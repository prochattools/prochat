#!/usr/bin/env node
/**
 * Idempotent provisioning for ProChat / ProKit.
 * - Derives slug from APP_SLUG or repo name (sanitized: letters/numbers).
 * - In dev: runs db:init + db:migrate:dev.
 * - In prod: runs db:init + db:migrate:prod using SYSTEM_DATABASE_URL/SHADOW_DATABASE_URL inside Dokploy VNet.
 */

const { spawnSync } = require('child_process')
const path = require('path')

const env = process.env.NODE_ENV || 'development'
function sanitizeSlug(input) {
  return (input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') || 'app'
}

const defaultSlug = sanitizeSlug((process.env.APP_SLUG || '').trim()) ||
  sanitizeSlug(path.basename(process.cwd()))
const slug = defaultSlug

if (!slug) {
  console.error('APP_SLUG is required to provision the database.')
  process.exit(1)
}

const run = (cmd, args) => {
  const { status, stdout, stderr } = spawnSync(cmd, args, {
    stdio: 'inherit',
    env: process.env,
    cwd: path.join(__dirname, '..'),
  })
  if (status !== 0) {
    process.exit(status || 1)
  }
}

// Always init tenant; scripts are idempotent.
run('npm', ['run', 'db:init', '--', '--slug', slug])

if (env === 'production') {
  run('npm', ['run', 'db:migrate:prod'])
} else {
  run('npm', ['run', 'db:migrate:dev'])
}

console.log(`✅ Provisioned tenant "${slug}" for ${env}`)
