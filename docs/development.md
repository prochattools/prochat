# Development

Local development workflow for SaaSKit (ProKit engine).

## Prerequisites
- Node.js + npm
- Docker Desktop
- Local Postgres container mapped to `localhost:5433` (default; configurable via `POSTGRES_PORT`)

## Quick start
```bash
npm install
npm run dev
```

`npm run dev` triggers the `predev` script which:
1. Ensures `.env` exists
2. Provisions a tenant (`npm run db:init`)
3. Runs migrations (`npm run db:migrate:dev`)
4. Starts Next.js

If you want to run steps manually:
```bash
npm run db:init -- --slug <project-name>
npm run db:migrate:dev
npm run dev
```

## Local environment variables
```bash
APP_SLUG=saaskit  # should match the repo/project name
PROCHAT_VERSION=<release-version>  # optional: used for UI display
POSTGRES_PORT=5433  # optional: used by docker-compose (change if 5433 is already in use)
DATABASE_URL=postgresql://tenant_saaskit_user:<password>@localhost:5433/postgres?schema=tenant_saaskit
SYSTEM_DATABASE_URL=postgresql://postgres:<admin-password>@localhost:5433/postgres?schema=public
SHADOW_DATABASE_URL=postgresql://postgres:<admin-password>@localhost:5433/postgres?schema=public
```

## Common commands
```bash
npm run db:init -- --slug <slug>
npm run db:migrate:dev
npm run db:cleanup -- --slug <slug>
```

## Quick troubleshooting
- Connection refused: confirm Docker is running and port `5433` is mapped (or update `POSTGRES_PORT`).
- Auth errors: verify `.env` is loaded and `DATABASE_URL` is correct.
- Prisma drift: run `npm run db:migrate:dev` or `npx prisma migrate reset --schema=prisma/system.prisma`.
- Shadow DB error: set `SHADOW_DATABASE_URL` to the admin connection (tenant users cannot create shadow DBs).

## Optional features

See `docs/optional-features.md` for enabling the optional blog, waiting list, and checkout funnel routes.
