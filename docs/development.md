# Development

This document describes the actual local development workflow for the ProChat repo.

## Prerequisites

- Node and npm installed locally
- Postgres available for development
- project env values present in `.env` or `.env.example` copied into local config

The repo expects local database access for provisioning and migrations. The common local setup uses Postgres exposed on `localhost:5433`.

## Install

```bash
npm install
```

`postinstall` runs Prisma client generation:

```bash
prisma generate --schema=prisma/system.prisma
```

## Environment setup

Use [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md) as the canonical env reference.

In development, bootstrap scripts can fill some defaults automatically, but local development still depends on a valid database connection and app slug.

Important local values:

- `APP_SLUG`
- `DATABASE_URL`
- `SYSTEM_DATABASE_URL`
- `SHADOW_DATABASE_URL`
- Stripe test values when checkout flows are exercised
- Clerk disabled or Clerk keys set, depending on the workflow

## Local provisioning flow

The repo provisions a tenant schema before the dev server starts.

Primary commands:

- `npm run db:init -- --slug <slug>`
- `npm run db:migrate:dev`

During normal local startup, `npm run dev` handles this automatically through the npm lifecycle.

## Dev server flow

`npm run dev` runs:

1. `predev`
2. environment bootstrap
3. tenant provisioning
4. Prisma development migrations
5. `next dev`

The exact predev chain is defined in [package.json](/Users/Office/Repos/Organisation/ProChat/Web/prochat/package.json).

## Useful commands

### Runtime and build

- `npm run dev`
- `npm run build`
- `npm run start`

### Database

- `npm run db:init -- --slug <slug>`
- `npm run db:migrate:dev`
- `npm run db:migrate:prod`
- `npm run db:cleanup -- --slug <slug>`
- `npm run db:provision:local`

### Docs pipeline

- `npm run docs:ingest`
- `npm run docs:ai-generate`
- `npm run docs:generate`
- `npm run docs:validate`
- `npm run docs:ai-build`
- `npm run docs:extract:typescript`
- `npm run docs:extract:openapi`

### Content and publishing assets

- `npm run generate:social`
- `npm run sitemap`

## Local auth behavior

Auth behavior depends on env configuration.

- if Clerk keys are present, Clerk middleware is used
- if Clerk is disabled or keys are absent outside production, the repo can run in mock mode

Relevant toggles are documented in [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md).

## Local docs workflow

There are two docs surfaces in the repo:

- internal docs in `/docs`
- generated public docs under `src/content/docs`

When working on the generated public docs pipeline, use [scripts/docs/README.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/docs/README.md) as the implementation reference.

## Production-style build caveat

`npm run build` is not a lightweight static build. It triggers `prebuild`, which runs provisioning and production migrations. That means production-like env values may be required when you run a full production build locally.

## Related references

- [overview.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/overview.md)
- [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md)
- [database.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/database.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md)
- [scripts/docs/README.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/docs/README.md)
