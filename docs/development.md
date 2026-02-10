# Development

Local development workflow for ProChat (built on the ProKit engine).

## Prerequisites

- Node.js 20+
- Shared Supabase/Postgres instance reachable at `localhost:5433` (default; configurable via `POSTGRES_PORT`)

## Shared Database Rule (Required)

- Dev and prod each use one shared Supabase/Postgres database.
- ProChat creates only `tenant_<slug>` schema and `tenant_<slug>_user` role in that shared database.
- Never create a dedicated database per app.

## Slug Rule (Required)

ProChat derives tenancy from the repo folder name:

- Repo folder name must match `[a-z0-9_-]+`.
- `APP_SLUG` must match the repo-derived slug: repo folder name with hyphens removed.
- Slug must be DB-safe: `[a-z0-9_]+`.

Examples:

- repo `my-app` -> `APP_SLUG=myapp`
- repo `my_app` -> `APP_SLUG=my_app`

## Quick Start

1. Ensure your shared Supabase/Postgres service is running and exposed on `localhost:5433` (or your configured `POSTGRES_PORT`).

2. Install and run:

```bash
npm install
npm run dev
```

### What `npm run dev` is expected to do

By convention ProChat wires `predev` to bootstrap the local environment:

- Create `.env` if missing (`scripts/dev/bootstrap-env.js`)
- Provision the tenant schema/user (`npm run db:init`)
- Run dev migrations (`npm run db:migrate:dev`)
- Start Next.js (`next dev`)

## Local Environment Model

- `DATABASE_URL` is the tenant connection (tenant user, tenant schema).
- `SYSTEM_DATABASE_URL` is an admin connection used by provisioning/cleanup/backups.
- `SHADOW_DATABASE_URL` is an admin connection used by `prisma migrate dev`.

Example `.env` (development):

```bash
APP_SLUG=prokitcore
NODE_ENV=development
POSTGRES_PORT=5433

SYSTEM_DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public
SHADOW_DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public

# Populated by the first db:init run:
DATABASE_URL=postgresql://tenant_prokitcore_user:<password>@localhost:5433/postgres?schema=tenant_prokitcore
```

## Common Local Commands

```bash
# provision schema + user + env outputs
npm run db:init -- --slug <slug>

# apply dev migrations (uses SHADOW_DATABASE_URL)
npm run db:migrate:dev

# delete a tenant (preview by default; use --force to delete prod tenants)
npm run db:cleanup -- --slug <slug>

# rename a tenant schema/user/registry (dry-run by default)
npm run db:rename -- --from <old> --to <new> [--apply]
```

## Troubleshooting Quick Hits

- Port `5433` already allocated:
  - Change `POSTGRES_PORT` (and update your local DB URLs), or stop the process already using `5433`.
- Prisma shadow DB errors:
  - Ensure `SHADOW_DATABASE_URL` is set to an admin connection (same as `SYSTEM_DATABASE_URL`).
- APP_SLUG mismatch:
  - Rename the repo folder so its repo-derived slug matches what you want (hyphens are removed), then rerun `npm run dev`.
