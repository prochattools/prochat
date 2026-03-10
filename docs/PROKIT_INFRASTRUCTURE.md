# ProChat Infrastructure Guide

The ProChat system uses SaaSKit's scripted, environment-safe approach to provision tenant schemas in existing databases, run migrations, and manage single-tenant deployments. This keeps humans and automation on the same rails: call the documented commands instead of inventing SQL.

## Architecture snapshot
- One already existing Postgres database per environment.  
- Production uses the already existing Supabase Postgres database.  
- The platform scripts never create databases; they provision schema + role only.  
- One app → one schema (`tenant_<slug>`) → one DB user (`tenant_<slug>_user`).  
- Tenant DB users are restricted to their own schema; access to `public` and other `tenant_*` schemas is revoked during provisioning.
- Registry table `public.tenants` is infra-only (provision/cleanup), never read by runtime.  
- Prisma manages schema + migrations (`prisma/system.prisma`).  
- Dev runtime + provisioning hit Docker Postgres on `localhost:5433`.  
- Prod provisioning/cleanup run inside Dokploy to Supabase `10.0.2.4:5433` via `SYSTEM_DATABASE_URL`; migrations use `DATABASE_URL` (tenant user).  
- Prod runtime uses `DATABASE_URL` (tenant user) only.  
- Optional MCP bridge (`https://mcp.prochat.tools`) wraps the same commands.

Environment split:
- **Dev**: scripts → `SYSTEM_DATABASE_URL` @ `localhost:5433`; `migrate dev` → `SHADOW_DATABASE_URL`; runtime → `DATABASE_URL` @ `localhost:5433`; env file `.env`.  
- **Prod**: scripts inside Dokploy → `SYSTEM_DATABASE_URL` @ `10.0.2.4:5433`; runtime → `DATABASE_URL` (tenant user); env via Dokploy or `.env.production`.

For database behavior details, see `docs/PROKIT_DATABASE.md`. Cleanup specifics live in `docs/PROKIT_TENANT_CLEANUP.md`.

## Automation commands
- Provision: `npm run db:init -- --slug <slug> [--preview] [--external-id <id>]`  
  - Creates schema + user inside the existing database, applies least-privilege grants/search_path, and upserts registry row with type (`prod` or `preview`).  
  - Never creates a database.  
- Migrations:  
  - Dev: `npm run db:migrate:dev` → `prisma migrate dev --schema=prisma/system.prisma`  
  - Prod: `npm run db:migrate:prod` → `prisma migrate deploy --schema=prisma/system.prisma` (invoked by Dokploy `prebuild`, not a manual deploy step)  
- Cleanup (preview by default): `npm run db:cleanup -- --slug <slug> [--force]`  
  - Looks up `public.tenants`, refuses non-preview unless `--force`, drops schema/user, deletes registry row.

AI/agents must use these commands (or MCP wrappers), not raw SQL.

## Dokploy production deployment (canonical)
- Build command: `npm run build`
- Start command: `npm run start`
- `npm run build` always executes `prebuild` first.
- `prebuild` runs `NODE_ENV=production npm run provision:auto`, which runs `db:init` and `db:migrate:prod`.
- No manual DB command is required in Dokploy. Do not add manual `db:init` or `db:migrate:prod` hooks for normal production deploys.

## Prerequisites
- Docker Desktop with Postgres exposed on host `5433` (mapped to container `5432`).  
- Dokploy with network access to Supabase Postgres `10.0.2.4:5433`.  
- Optional MCP bridge available for remote-triggered operations.  
- `.env` / `.env.production` include tenant/runtime and system URLs:
  - `DATABASE_URL=postgresql://tenant_<slug>_user:<password>@localhost:5433/postgres?schema=tenant_<slug>`
  - `SYSTEM_DATABASE_URL=postgresql://postgres:<admin>@localhost:5433/postgres?schema=public`
  - `SHADOW_DATABASE_URL=postgresql://postgres:<admin>@localhost:5433/postgres?schema=public`

## Starting the ProChat system locally
1) Clone + install  
```
git clone https://github.com/prochattools/prochat.git prochat
cd prochat
npm install
```
2) Provision  
```
./scripts/provision-saas.sh <slug>
```
   - Wraps `db:init` + migrations and writes `.env.production` defaults.  
   - Dev: hits `localhost:5433` via `SYSTEM_DATABASE_URL`.  
   - Prod: run inside Dokploy against `10.0.2.4:5433`.  
   - Creates schema/user + registry; in dev writes `DATABASE_URL`/`APP_SLUG` (and sets `SYSTEM_DATABASE_URL`/`SHADOW_DATABASE_URL` if missing) into `.env`.

3) Run (dev)  
```
npm run dev
```

4) Access  
```
http://localhost:3000
```
Runtime always uses `DATABASE_URL`; no host-based tenant routing.

## PR preview tenants (optional)
- Provision: `NODE_ENV=production npm run db:init -- --slug pr_42 --preview`  
- Cleanup: `NODE_ENV=production npm run db:cleanup -- --slug pr_42`  
- Registry updated; cleanup refuses prod rows unless `--force`.

## Keep schemas aligned
- Dev: edit `prisma/system.prisma` → `npm run db:migrate:dev` (generates/applies migrations locally).  
- Prod: deploy code with Dokploy build command `npm run build`; npm lifecycle runs `prebuild` and applies provisioning + migrations before the build.  
- MCP (optional) may trigger the same commands; must not bypass scripts.
