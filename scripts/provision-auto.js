#!/usr/bin/env node
/**
 * Idempotent provisioning for ProChat / ProKit.
 * - Provisions tenant schema/role in an existing database (never creates a database).
 * - Resolves APP_SLUG from process env first, then .env/.env.production.
 * - In dev: runs db:init + db:migrate:dev.
 * - In prod: runs db:init + db:migrate:prod (Dokploy / VNet flow).
 */

import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const repoRoot = path.join(__dirname, '..')

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}

  const values = {}
  const lines = fs.readFileSync(filePath, 'utf8').split('\n')

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const separator = line.indexOf('=')
    if (separator <= 0) continue

    const key = line.slice(0, separator).trim()
    const value = line.slice(separator + 1).trim()
    values[key] = value
  }

  return values
}

const envFromDotEnv = readEnvFile(path.join(repoRoot, '.env'))
const envFromDotEnvProd = readEnvFile(path.join(repoRoot, '.env.production'))

const nodeEnv =
  (process.env.NODE_ENV ||
    envFromDotEnv.NODE_ENV ||
    envFromDotEnvProd.NODE_ENV ||
    'development')
    .trim()

const isProd = nodeEnv === 'production'

const slugFromFiles = isProd
  ? envFromDotEnvProd.APP_SLUG || envFromDotEnv.APP_SLUG
  : envFromDotEnv.APP_SLUG || envFromDotEnvProd.APP_SLUG

const slug = (process.env.APP_SLUG || slugFromFiles || (isProd ? '' : 'dev')).trim()

if (!slug) {
  console.error('APP_SLUG is required in production. Set APP_SLUG in Dokploy env.')
  process.exit(1)
}

const baseEnv = {
  ...process.env,
  NODE_ENV: nodeEnv,
  APP_SLUG: slug,
}

const run = (cmd, args) => {
  const { status } = spawnSync(cmd, args, {
    stdio: 'inherit',
    env: baseEnv,
    cwd: repoRoot,
  })

  if (status !== 0) {
    process.exit(status || 1)
  }
}

run('npm', ['run', 'db:init', '--', '--slug', slug])

if (isProd) {
  run('npm', ['run', 'db:migrate:prod'])
} else {
  run('npm', ['run', 'db:migrate:dev'])
}

console.log(`✅ Provisioned tenant "${slug}" for ${nodeEnv}`)
