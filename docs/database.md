# Database

ProKit uses a single-tenant schema-per-app model in Postgres.

## Model Summary

- One app -> one tenant schema: `tenant_<slug>`
- One app -> one tenant DB user: `tenant_<slug>_user`
- Registry table `public.tenants` is **scripts-only** (provision/cleanup). The runtime app must not depend on it.
- Prisma schema is managed in `prisma/system.prisma` (single schema file).

## Shared Database Rule (Required)

- Exactly one Supabase/Postgres database is used per environment (dev and prod).
- Every app in that environment gets only a dedicated schema and role inside that same database.
- Never create a separate database per app.
- ProKit scripts may create/update only tenant schema objects (`tenant_<slug>` and `tenant_<slug>_user`), never a new app database.

## Slug Contract (Required)

- The repo/project name is the app slug.
- `APP_SLUG` must match the repo folder name.
- Slug must be DB-safe: `[a-z0-9_]+`.

Database objects are derived from the slug:

- schema: `tenant_<slug>`
- role: `tenant_<slug>_user`

## Connection Variables

Runtime (app):

- `DATABASE_URL` (tenant user, tenant schema)

Scripts only (provision/migrate/cleanup):

- `SYSTEM_DATABASE_URL` (admin connection; used for provisioning, backups, cleanup)

Dev-only (Prisma migrate dev):

- `SHADOW_DATABASE_URL` (admin connection). Required because tenant users cannot create Prisma shadow databases.

Other required vars:

- `APP_SLUG`
- `TENANT_DB_PASSWORD` (optional override; if not set, provisioning generates one)

Note: ProKit uses Prisma's `?schema=` connection parameter in `DATABASE_URL`. `psql` tools do not understand `schema=...`; ProKit scripts automatically strip it when calling `psql`/`pg_dump`/`pg_restore`.

## Development Defaults

- Default dev Postgres runs in Docker on `localhost:5433` (configurable via `POSTGRES_PORT`).

Example `.env` (development):

```bash
APP_SLUG=prokit
NODE_ENV=development
POSTGRES_PORT=5433

SYSTEM_DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public
SHADOW_DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public

DATABASE_URL=postgresql://tenant_prokit_user:<password>@localhost:5433/postgres?schema=tenant_prokit
```

## Provisioning + Migrations (Local)

- Provision tenant: `npm run db:init`
- Apply dev migrations: `npm run db:migrate:dev`

## Provisioning + Migrations (Production: Dokploy)

Production is hands-off:

- `npm start` runs `scripts/runtime/start-prod.sh`
- That runs the deploy gate: `scripts/db/deploy-prod.sh`
- The gate:
  - Detects pending migrations
  - Creates a schema-scoped backup when migrations are pending
  - Runs `db:init` + `db:migrate:prod`
  - Runs a smoke check
  - Auto-restores on failure (when a backup exists)

Do not run ad-hoc database commands in production.

## Migration State Mismatch (Production)

If the deploy gate fails with one of these:

- `[deploy] detected migrations: yes (migrations_table_missing)`
- `db has migrations not present on disk: ...`

it means the tenant schema is not in the expected state for this repo. This can happen if:

- migrations were squashed/removed in git, or
- you reused an existing tenant schema from another app/repo.

Fix options:

1. **Reset the tenant schema (data loss)**: set `PROKIT_RESET_TENANT_ON_MIGRATION_MISMATCH=1` in Dokploy env and redeploy a tag.
2. **Keep data**: restore the missing migration directories on disk (must match the checksums stored in the database).

## Rename Flow (Repo Slug Changes)

If you rename a repo that already has data, use one of these:

- Preferred (dev/admin): `npm run db:rename -- --from <old> --to <new> [--apply]`
- Hands-off production path: set `LEGACY_APP_SLUG=<old_slug>` in Dokploy env for the next deploy.
  - The deploy gate will rename `tenant_<old_slug>` -> `tenant_<new_slug>` if the target schema does not already exist.
  - Remove `LEGACY_APP_SLUG` after a successful deploy.
