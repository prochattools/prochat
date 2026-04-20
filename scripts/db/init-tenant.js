#!/usr/bin/env node
// ProChat marketing site – powered by the ProKit engine
// (c) 2025 Steve Westhoek / ProChat
/**
 * Provision a single-tenant schema + user + registry entry in an existing database.
 * This script never creates a database.
 *
 * Flags:
 *   --slug <slug>      (required in prod; defaults to "dev" in development)
 *   --preview          (optional; marks tenant type = "preview")
 *   --external-id <id> (optional; stored in registry)
 *
 * Env:
 *   APP_SLUG            used as a fallback slug
 *   TENANT_DB_PASSWORD  required in production, defaults to "devpass" in dev
 *   SYSTEM_DATABASE_URL admin connection for provisioning (required in prod)
 */

import pg from 'pg'
import fs from 'node:fs'
import path from 'node:path'

const { Client } = pg

function fail(msg) {
  console.error(`❌ ${msg}`)
  process.exit(1)
}

function parseArgs() {
  const args = process.argv.slice(2)
  const result = {
    slug: process.env.APP_SLUG || '',
    preview: false,
    externalId: process.env.EXTERNAL_ID || ''
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg === '--slug' && args[i + 1]) {
      result.slug = args[++i]
    } else if (arg === '--preview') {
      result.preview = true
    } else if (arg === '--external-id' && args[i + 1]) {
      result.externalId = args[++i]
    }
  }

  return result
}

function validateSlug(slug) {
  const safe = /^[a-z0-9_]+$/
  if (!safe.test(slug)) {
    fail(
      `Invalid slug "${slug}". Only lowercase letters, numbers and underscores are allowed.`
    )
  }
}

function quoteIdent(value) {
  return `"${String(value).replace(/"/g, '""')}"`
}

function quoteLiteral(value) {
  return `'${String(value).replace(/'/g, "''")}'`
}

function loadEnvFile(envPath) {
  if (!fs.existsSync(envPath)) return {}
  const lines = fs
    .readFileSync(envPath, 'utf8')
    .split('\n')
    .filter((l) => l.trim().length > 0 && !l.trim().startsWith('#'))

  const map = {}
  for (const line of lines) {
    const idx = line.indexOf('=')
    if (idx <= 0) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim()
    map[key] = value
  }
  return map
}

function persistEnv(envPath, updates) {
  const existing = loadEnvFile(envPath)
  const merged = { ...existing, ...updates }
  const content =
    Object.entries(merged)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n') + '\n'
  fs.writeFileSync(envPath, content, { encoding: 'utf8' })
}

async function main() {
  const env = process.env.NODE_ENV || 'development'
  const isProd = env === 'production'

  let systemUrl = process.env.SYSTEM_DATABASE_URL
  if (!systemUrl) {
    if (isProd) {
      fail('SYSTEM_DATABASE_URL is required in production')
    } else {
      systemUrl =
        'postgresql://postgres:postgres@localhost:5434/postgres?schema=public'
      console.log(
        'ℹ️ SYSTEM_DATABASE_URL not set, using default local Docker Postgres:',
        systemUrl
      )
    }
  }

  const { slug: rawSlug, preview, externalId } = parseArgs()
  let slug = (rawSlug || '').trim()
  if (!slug) {
    if (isProd) {
      fail('No tenant slug provided. Use --slug <slug> or set APP_SLUG.')
    }
    slug = 'dev'
    console.log('ℹ️ No slug provided, defaulting to "dev" in development')
  }
  validateSlug(slug)

  const schema = `tenant_${slug}`
  const user = `${schema}_user`
  const tenantType = preview ? 'preview' : 'prod'
  const parsedSystemUrl = new URL(systemUrl)
  const dbName = parsedSystemUrl.pathname.replace(/^\/+/, '') || 'postgres'

  let password = process.env.TENANT_DB_PASSWORD
  if (!password) {
    if (isProd) {
      fail('TENANT_DB_PASSWORD is required in production')
    } else {
      password = 'devpass'
      console.log(
        'ℹ️ TENANT_DB_PASSWORD not set, using default dev password "devpass".'
      )
    }
  }

  const dbIdent = quoteIdent(dbName)
  const schemaIdent = quoteIdent(schema)
  const schemaLit = quoteLiteral(schema)
  const userIdent = quoteIdent(user)
  const userLit = quoteLiteral(user)
  const passwordLit = quoteLiteral(password)

  console.log('--------------------------------------------------')
  console.log(`🚀 Provisioning tenant "${slug}" (${env})`)
  console.log(`Database: ${dbName} (existing DB, schema-only provisioning)`)
  console.log(`Schema: ${schema}`)
  console.log(`User:   ${user}`)
  console.log(`Type:   ${tenantType}`)
  console.log('--------------------------------------------------')

  const client = new Client({ connectionString: systemUrl })

  try {
    await client.connect()

    const ddlSql = `
      CREATE SCHEMA IF NOT EXISTS ${schemaIdent};

      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT FROM pg_catalog.pg_roles WHERE rolname = ${userLit}
        ) THEN
          CREATE ROLE ${userIdent}
          WITH LOGIN PASSWORD ${passwordLit}
          NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS;
        ELSE
          ALTER ROLE ${userIdent}
          WITH LOGIN PASSWORD ${passwordLit}
          NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS;
        END IF;
      END
      $$;

      -- Restrict DB-level privileges: connect only.
      REVOKE ALL PRIVILEGES ON DATABASE ${dbIdent} FROM ${userIdent};
      GRANT CONNECT ON DATABASE ${dbIdent} TO ${userIdent};

      -- Lock down access outside the tenant schema.
      REVOKE ALL ON SCHEMA public FROM ${userIdent};
      REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM ${userIdent};
      REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public FROM ${userIdent};
      REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public FROM ${userIdent};

      DO $$
      DECLARE
        other_schema text;
      BEGIN
        FOR other_schema IN
          SELECT nspname
          FROM pg_namespace
          WHERE nspname LIKE 'tenant\\_%' ESCAPE '\\'
            AND nspname <> ${schemaLit}
        LOOP
          EXECUTE format('REVOKE ALL ON SCHEMA %I FROM %I', other_schema, ${userLit});
          EXECUTE format('REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA %I FROM %I', other_schema, ${userLit});
          EXECUTE format('REVOKE ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA %I FROM %I', other_schema, ${userLit});
          EXECUTE format('REVOKE ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA %I FROM %I', other_schema, ${userLit});
        END LOOP;
      END
      $$;

      -- Tenant schema privileges only.
      REVOKE ALL ON SCHEMA ${schemaIdent} FROM PUBLIC;
      GRANT USAGE, CREATE ON SCHEMA ${schemaIdent} TO ${userIdent};
      GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ${schemaIdent} TO ${userIdent};
      GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA ${schemaIdent} TO ${userIdent};
      GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA ${schemaIdent} TO ${userIdent};
      ALTER DEFAULT PRIVILEGES IN SCHEMA ${schemaIdent}
        GRANT ALL PRIVILEGES ON TABLES TO ${userIdent};
      ALTER DEFAULT PRIVILEGES IN SCHEMA ${schemaIdent}
        GRANT ALL PRIVILEGES ON SEQUENCES TO ${userIdent};
      ALTER DEFAULT PRIVILEGES IN SCHEMA ${schemaIdent}
        GRANT ALL PRIVILEGES ON FUNCTIONS TO ${userIdent};
      ALTER ROLE ${userIdent} SET search_path = ${schemaIdent};
    `

    await client.query(ddlSql)

    const ensureTenantsSql = `
      CREATE TABLE IF NOT EXISTS public.tenants (
        slug text PRIMARY KEY,
        schema_name text NOT NULL,
        db_user text NOT NULL,
        db_password text NOT NULL,
        type text NOT NULL,
        external_id text,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      );

      -- Backfill missing columns for older installs
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'tenants'
            AND column_name = 'schema_name'
        ) THEN
          ALTER TABLE public.tenants ADD COLUMN schema_name text;
        END IF;

        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'tenants'
            AND column_name = 'db_user'
        ) THEN
          ALTER TABLE public.tenants ADD COLUMN db_user text;
        END IF;

        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'tenants'
            AND column_name = 'db_password'
        ) THEN
          ALTER TABLE public.tenants ADD COLUMN db_password text;
        END IF;

        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'tenants'
            AND column_name = 'type'
        ) THEN
          ALTER TABLE public.tenants ADD COLUMN type text DEFAULT 'prod';
        END IF;

        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'tenants'
            AND column_name = 'external_id'
        ) THEN
          ALTER TABLE public.tenants ADD COLUMN external_id text;
        END IF;

        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'tenants'
            AND column_name = 'created_at'
        ) THEN
          ALTER TABLE public.tenants ADD COLUMN created_at timestamptz DEFAULT now();
        END IF;

        IF NOT EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_schema = 'public'
            AND table_name = 'tenants'
            AND column_name = 'updated_at'
        ) THEN
          ALTER TABLE public.tenants ADD COLUMN updated_at timestamptz DEFAULT now();
        END IF;
      END;
      $$;
    `
    await client.query(ensureTenantsSql)

    const upsertTenantSql = `
      INSERT INTO public.tenants (slug, schema_name, db_user, db_password, type, external_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, now(), now())
      ON CONFLICT (slug) DO UPDATE
      SET schema_name = EXCLUDED.schema_name,
          db_user = EXCLUDED.db_user,
          db_password = EXCLUDED.db_password,
          type = EXCLUDED.type,
          external_id = EXCLUDED.external_id,
          updated_at = now();
    `

    await client.query(upsertTenantSql, [
      slug,
      schema,
      user,
      password,
      tenantType,
      externalId || null
    ])

    console.log('✅ Tenant provisioning completed')
    console.log(`- slug:        ${slug}`)
    console.log(`- schema:      ${schema}`)
    console.log(`- db user:     ${user}`)
    console.log(`- tenant type: ${tenantType}`)
    console.log('--------------------------------------------------')

    const host = parsedSystemUrl.hostname
    const port = parsedSystemUrl.port || '5434'
    const runtimeDbUrl = `postgresql://${encodeURIComponent(
      user
    )}:${encodeURIComponent(password)}@${host}:${port}/${dbName}?schema=${schema}`

    if (!isProd) {
      const envPath = path.join(process.cwd(), '.env')
      const updates = {
        APP_SLUG: slug,
        NODE_ENV: 'development',
        DATABASE_URL: runtimeDbUrl
      }

      if (!loadEnvFile(envPath).SYSTEM_DATABASE_URL) {
        updates.SYSTEM_DATABASE_URL = systemUrl
      }
      if (!loadEnvFile(envPath).SHADOW_DATABASE_URL) {
        updates.SHADOW_DATABASE_URL = systemUrl
      }

      persistEnv(envPath, updates)
      console.log('✅ Updated .env for development')
      console.log('   DATABASE_URL=', runtimeDbUrl)
      console.log('--------------------------------------------------')
    } else {
      console.log('🔑 Suggested DATABASE_URL (production):')
      console.log(runtimeDbUrl)
      console.log('--------------------------------------------------')
    }
  } catch (err) {
    console.error('❌ Error provisioning tenant:', err)
    process.exit(1)
  } finally {
    await client.end().catch(() => {})
  }
}

main().catch((err) => {
  console.error('❌ Fatal error:', err)
  process.exit(1)
})
