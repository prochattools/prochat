# Development

Local development workflow for ProKit.

## Prerequisites

- Node.js 20+
- Docker Desktop (or equivalent)
- PostgreSQL 15 reachable at `localhost:5433` (default; configurable via `POSTGRES_PORT`)

## Slug Rule (Required)

ProKit derives tenancy from the repo name:

- Repo folder name must match `[a-z0-9_]+`.
- `APP_SLUG` must match the repo folder name.

If you want an app slug like `my_app`, the repo folder must also be named `my_app`.

## Quick Start

1. Start Postgres:

```bash
docker compose up -d postgres
```

2. Install and run:

```bash
npm install
npm run dev
```

### What `npm run dev` is expected to do

By convention ProKit wires `predev` to bootstrap the local environment:

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
APP_SLUG=prokit
NODE_ENV=development
POSTGRES_PORT=5433

SYSTEM_DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public
SHADOW_DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public

# Populated by the first db:init run:
DATABASE_URL=postgresql://tenant_prokit_user:<password>@localhost:5433/postgres?schema=tenant_prokit
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
  - Rename the repo folder to the slug you want, then rerun `npm run dev`.

