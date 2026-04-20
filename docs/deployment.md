# Deployment

This document describes the deployment flow that currently exists in the ProChat repo.

ProChat does **not** use the SaaSKit runtime deploy gate. There is no runtime backup, smoke-check, restore wrapper, or automatic search-engine submission step around `next start`.

## Production target

Production is built for Dokploy.

Current expectations:

- Dokploy runs `npm run build`
- Dokploy starts the app with `npm run start`

## Actual build flow

The relevant scripts are defined in [package.json](/Users/Office/Repos/Organisation/ProChat/Web/prochat/package.json), [scripts/provision-auto.js](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/provision-auto.js), and [scripts/start-production.sh](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/start-production.sh).

Production build sequence:

1. `npm run build`
2. `next build`

The hot build path does **not** automatically run:

- tenant provisioning
- Prisma production migrations
- social image generation
- sitemap generation

## Provisioning flow

`scripts/provision-auto.js` is the orchestration layer used by the explicit deploy-prep helper.

Behavior:

- resolves `APP_SLUG` from env or `.env.production`
- requires `APP_SLUG` in production
- runs `db:init`
- runs `db:migrate:prod` in production
- runs `db:migrate:dev` outside production

The lower-level tenant provisioning logic lives in [database.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/database.md).

## Migration flow

Production migrations use Prisma deploy mode:

- command: `npm run db:migrate:prod`
- implementation: `prisma migrate deploy --schema=prisma/system.prisma`

Development migrations use:

- command: `npm run db:migrate:dev`
- implementation: `prisma migrate dev --schema=prisma/system.prisma`

The production contract is repo-enforced at startup. [prepare-production.sh](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/deploy/prepare-production.sh) now runs from `npm run start` before Next starts, so the tenant schema is provisioned and `prisma migrate deploy` creates new tables such as `License` and `LicenseEvent`. Dokploy can still run the same helper as an optional pre-deploy check to fail earlier, but the primary guarantee now lives in the repo-owned start path.

## Startup behavior

`npm run start` calls `scripts/start-production.sh`.

That script:

- runs `sh scripts/deploy/prepare-production.sh`
- starts `next start -p ${PORT:-3056}`
- syncs standalone static assets when needed for the current runtime layout

It does not:

- perform deploy gating
- create backups
- run smoke tests
- roll back a failed deploy
- auto-submit sitemaps to Google or Bing

## Manual search follow-up

After a production deploy, operators should handle search-console follow-up manually:

1. resubmit `${NEXT_PUBLIC_SITE_URL}/sitemap.xml` in Google Search Console
2. request indexing manually for the retained priority surfaces if they need to be refreshed:
   - `/`
   - `/learn`
   - `/learn/saas-starting-point`
   - `/learn/production-guide`
   - `/starting-point`
   - `/docs`
   - `/kits/saaskit`
   - `/kits/prokit`
   - `/proof`
   - `/contact`

ProChat does not perform those submissions automatically at runtime.

## CI behavior

GitHub Actions currently builds with Node 20 in [ci.yml](/Users/Office/Repos/Organisation/ProChat/Web/prochat/.github/workflows/ci.yml).

CI flow:

- starts Postgres 16 as a service
- sets tenant and Stripe test env vars
- provisions the tenant schema
- generates Prisma client
- runs dev migrations
- runs `npm run build`

CI therefore validates the application build on Node 20 while keeping provisioning and migration steps explicit in the workflow.

## Node version constraint

The runtime contract is Node 20.

- Docker uses Node 20 in [Dockerfile](/Users/Office/Repos/Organisation/ProChat/Web/prochat/Dockerfile)
- GitHub Actions CI uses Node 20 in [ci.yml](/Users/Office/Repos/Organisation/ProChat/Web/prochat/.github/workflows/ci.yml)
- `package.json` enforces `node >=20`

Production containers and local tooling should therefore target Node 20 as the single supported version.

## Docker compose

`docker-compose.yml` is currently used only to provision Postgres for local development. WordPress/MySQL services were removed because they are not part of the production runtime.

File reference: [docker-compose.yml](docker-compose.yml)

## Known non-features

These behaviors should not be documented as active ProChat deployment features:

- SaaSKit runtime deploy gate

## Related references

- [overview.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/overview.md)
- [production-lifecycle.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/production-lifecycle.md)
- [database.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/database.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md)
- [development.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/development.md)
