# Database

Single source of truth for database behavior in SaaSKit (ProKit engine). Use this doc for provisioning, migrations, cleanup, and environment rules.

## Model summary
- One app -> one schema: `tenant_<slug>`
- One app -> one database user: `tenant_<slug>_user`
- Registry table `public.tenants` is infra-only (provision/cleanup). Runtime must not read it.
- Prisma schema is managed in `prisma/system.prisma`.

## Isolation rules (required)
- Tenant schemas must be isolated. No cross-schema foreign keys, views, or functions.
- Tenant users must not have `USAGE` or `CREATE` on `public`.
- Tenant user `search_path` must be `tenant_<slug>, pg_catalog` (no `public`).
- Runtime must never depend on `public` objects (except `pg_catalog`).

## Naming and slug contract
- The project name is the app slug.
- The app slug is the tenant schema name suffix.
- Example: project `saaskit` -> `APP_SLUG=saaskit` -> schema `tenant_saaskit`.
- Slug must be DB-safe (`[a-z0-9_]+`).

## Environments
### Development (local)
- Postgres runs in Docker on `localhost:5433` (default; configurable via `POSTGRES_PORT`).
- Scripts and runtime connect directly from your machine.

### Production (Dokploy - primary)
- Postgres runs on a private host reachable only from Dokploy Super Base VMs.
- Provisioning and migrations are executed automatically by the runtime gate inside Dokploy on deploy (hands-off).

### Production (public hosting - optional)
- Only possible if the database is publicly reachable or accessed via a secure proxy/tunnel.

## Connection variables
Runtime (app):
- `DATABASE_URL` (tenant user, tenant schema)

Scripts only (provision/migrate/cleanup):
- `SYSTEM_DATABASE_URL` (admin user, public schema)

Dev-only (Prisma migrate dev):
- `SHADOW_DATABASE_URL` (admin user, public schema). Required because tenant users cannot create shadow databases.

Other required vars:
- `APP_SLUG` (tenant slug)
- `TENANT_DB_PASSWORD` (optional override; if not set, provisioning generates one)

Examples:
```bash
# .env (development)
APP_SLUG=saaskit
POSTGRES_PORT=5433
DATABASE_URL=postgresql://tenant_saaskit_user:<password>@localhost:5433/postgres?schema=tenant_saaskit
SYSTEM_DATABASE_URL=postgresql://postgres:<admin-password>@localhost:5433/postgres?schema=public
SHADOW_DATABASE_URL=postgresql://postgres:<admin-password>@localhost:5433/postgres?schema=public

# Production (Dokploy env)
APP_SLUG=saaskit
TENANT_DB_PASSWORD=<strong-password>
DATABASE_URL=postgresql://tenant_saaskit_user:<TENANT_DB_PASSWORD>@<db-host>:5433/postgres?schema=tenant_saaskit
SYSTEM_DATABASE_URL=postgresql://<admin-user>:<admin-password>@<db-host>:5433/postgres?schema=public
```

## Admin role contract (required)
- `SYSTEM_DATABASE_URL` uses the admin role that owns tenant schemas and can create roles, schemas, and tables.
- This is the only supported role for provisioning, cleanup, backups, and migrations.

## Tenant user contract (required)
- `DATABASE_URL` uses `tenant_<slug>_user` with `schema=tenant_<slug>`.
- Tenant users have full DDL/DML inside their schema only.
- Tenant users have no `USAGE` or `CREATE` on `public`.

## Supported commands (entry points)
Provision:
```bash
npm run db:init -- --slug <slug> [--external-id <id>]
```

Migrations:
```bash
# local development
npm run db:migrate:dev

# production
# handled automatically by the runtime gate on deploy (Dokploy)
```

Cleanup:
```bash
npm run db:cleanup -- --slug <slug> [--force]
```

## Renaming A Tenant (APP_SLUG Change)
If you previously deployed this app under a different slug (for example `prokit`) and you want to keep the data, rename the existing tenant schema/user instead of provisioning a fresh tenant.

Recommended (production, no manual commands):
- Set `APP_SLUG=saaskit` in Dokploy.
- Set `LEGACY_APP_SLUG=prokit` for a single deployment.
- Deploy a new release tag. The runtime gate (`scripts/runtime/start-prod.sh` -> `scripts/db/deploy-prod.sh`) will rename the tenant before provisioning/migrations run.

Manual (development / break-glass):
Dry-run:
```bash
SYSTEM_DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public \
  npm run db:rename -- --from prokit --to saaskit
```

Apply:
```bash
SYSTEM_DATABASE_URL=postgresql://postgres:postgres@localhost:5433/postgres?schema=public \
  npm run db:rename -- --from prokit --to saaskit --apply
```

After renaming:
- Re-run provisioning (rewrites `.env` / `.env.production`): `npm run db:init`
- Local migrations: `npm run db:migrate:dev`
- Production migrations are applied automatically by the runtime gate on deploy.

## Provisioning flow (summary)
1. Resolve slug from `--slug` or `APP_SLUG`.
2. Create schema `tenant_<slug>` if missing.
3. Create or update user `tenant_<slug>_user` with password.
4. Grant privileges, revoke `public`, and set `search_path` to the tenant schema.
5. Upsert registry row in `public.tenants` (type `prod` or `preview`).
6. Generate a tenant password if one is not provided.
7. Output connection values and write files:
   - `.env` (local development)
   - `.env.production` (production reference)

## Migrations
- Local: `db:migrate:dev` uses `prisma migrate dev --schema=prisma/system.prisma`.
- Production: `prisma migrate deploy --schema=prisma/system.prisma` is executed automatically by the runtime gate on deploy (Dokploy).
- Runtime must not start without successful migrations.

Note: `prisma migrate dev` requires `SHADOW_DATABASE_URL` because tenant users cannot create shadow databases. Do not grant `CREATEDB` to tenant users.

## Automated migration-safe deploy (Dokploy)
SaaSKit includes a deploy script that:
1. Detects pending migrations
2. Creates a schema-scoped backup
3. Runs provisioning + migrations
4. Runs a smoke check
5. Auto-restores on smoke failure
6. Writes a status file for quick verification

Scripts:
- `scripts/db/deploy-prod.sh`
- `scripts/db/verify.sh`
- `scripts/runtime/start-prod.sh` (runs the deploy gate before app start)

Backup rules:
- Backup root is fixed: `/var/backups/pgdump`.
- Backups are stored under `/var/backups/pgdump/$APP_SLUG`.
- Retention: keep last 3 backups and delete any older than 14 days.

## Safety rules
- Do not run raw SQL in production outside the scripts.
- Do not connect to production from a developer laptop.
- Runtime uses only `DATABASE_URL`; scripts use only `SYSTEM_DATABASE_URL`.
- Do not change the schema/user naming contract.
