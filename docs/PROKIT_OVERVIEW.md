# ProChat Platform Overview

ProChat is the active SaaS system in this repository. It is built on SaaSKit conventions, and SaaSKit itself inherits the smaller shared ProKit base. This overview captures the platform contracts, infra expectations, and working rules that keep the ProChat system stable while standardizing workflows.

## Quick links
- Invariants: `docs/PROKIT_INVARIANTS.md`
- Database: `docs/PROKIT_DATABASE.md`
- Dev guide: `docs/PROKIT_DEV_GUIDE.md`
- Infrastructure: `docs/PROKIT_INFRASTRUCTURE.md`
- Tenant cleanup: `docs/PROKIT_TENANT_CLEANUP.md`
- AI rules: `docs/PROKIT_AI_GUIDELINES.md`
- Templates/Reference: `docs/PROKIT_README_TEMPLATE.md`, `docs/PROKIT_README_TRUSTLESS.md`, `docs/PROKIT_REFERENCE.md`
- Getting started: `docs/PROKIT_GETTING_STARTED.md`

## Tenant model (what never changes)
- Single-tenant runtime: one schema per app (`tenant_<APP_SLUG>`) and one DB role (`tenant_<APP_SLUG>_user`).  
- The database already exists in both dev and prod; scripts provision schema + role only (no database provisioning).  
- Runtime uses only `DATABASE_URL`; scripts use `SYSTEM_DATABASE_URL`; `migrate dev` uses `SHADOW_DATABASE_URL`.  
- Registry `public.tenants` is infra-only (provision/cleanup).
- Tenant DB users are scoped to their own schema; access to `public` and other tenant schemas is revoked.
- Provision with `npm run db:init -- --slug <slug> [--preview]`; cleanup with `npm run db:cleanup -- --slug <slug> [--force]`; migrations via `npm run db:migrate:dev|prod`.

## Infra expectations
- Dev: Docker Postgres on `localhost:5433`; `npm run dev` bootstraps `.env`, provisions default tenant, runs migrations, and starts Next.js dev server.  
- Prod: Dokploy containers inside a VNet with Supabase Postgres at `10.0.2.4:5433`; Dokploy build command is `npm run build` and start command is `npm run start`. Build automatically runs `prebuild` (`provision:auto` => `db:init` + `db:migrate:prod`). No manual DB commands are required for normal production deploys. Optional MCP bridge can trigger the same scripts remotely.

## Day-to-day dev workflow
1. `npm install`  
2. `npm run dev` (auto-writes `.env`, provisions `tenant_dev`, applies migrations, starts Next.js on 3000)  
3. Build: `npm run build`; Prod start: `npm start`  
4. Database tasks: `npm run db:init`, `npm run db:migrate:dev`, `npm run db:migrate:prod`, `npm run db:cleanup`  
5. New apps: `./scripts/provision-saas.sh <project-slug>` (writes `.env.production` and runs migrations)

## AI usage notes
- Follow `docs/PROKIT_AI_GUIDELINES.md` and `docs/PROKIT_INVARIANTS.md`.  
- Do not change the tenant model, env contracts, or provisioning semantics without explicit approval.  
- Keep diffs minimal and reflect infra changes in the docs above.
