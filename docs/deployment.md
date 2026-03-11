# Deployment

This document describes the deployment flow that currently exists in the ProChat repo.

ProChat does **not** use the SaaSKit runtime deploy gate. There is no runtime backup, smoke-check, or restore wrapper around `next start`. Provisioning and migrations happen during the build lifecycle instead.

## Production target

Production is built for Dokploy.

Current expectations:

- Dokploy runs `npm run build`
- `npm run build` triggers `prebuild`
- `prebuild` runs `NODE_ENV=production npm run provision:auto`
- `provision:auto` runs tenant provisioning and production migrations
- Dokploy starts the app with `npm run start`

## Actual build flow

The relevant scripts are defined in [package.json](/Users/Office/Repos/Organisation/ProChat/Web/prochat/package.json), [scripts/provision-auto.js](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/provision-auto.js), and [scripts/start-production.sh](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/start-production.sh).

Production build sequence:

1. `npm run build`
2. npm runs `prebuild`
3. `prebuild` runs `NODE_ENV=production npm run provision:auto`
4. `provision:auto` runs:
   - `npm run db:init -- --slug <APP_SLUG>`
   - `npm run db:migrate:prod`
5. the build continues with:
   - `npm run generate:social`
   - `next build`
   - `npm run sitemap`
   - `npm run rss`

This means provisioning and `prisma migrate deploy` happen before the production Next.js build finishes.

## Provisioning flow

`scripts/provision-auto.js` is the orchestration layer.

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

The production contract is build-driven. ProChat does not expect operators to run manual migration commands during a normal Dokploy deploy.

## Startup behavior

`npm run start` calls `scripts/start-production.sh`.

That script:

- starts `next start -p ${PORT:-3000}`
- waits briefly
- pings Google and Bing with `${NEXT_PUBLIC_SITE_URL}/sitemap.xml`

It does not:

- run migrations
- perform deploy gating
- create backups
- run smoke tests
- roll back a failed deploy

## CI behavior

GitHub Actions currently builds with Node 20 in [ci.yml](/Users/Office/Repos/Organisation/ProChat/Web/prochat/.github/workflows/ci.yml).

CI flow:

- starts Postgres 16 as a service
- sets tenant and Stripe test env vars
- provisions the tenant schema
- generates Prisma client
- runs dev migrations
- runs `npm run build`

CI therefore validates the same build-driven provisioning pattern, but it does so on Node 20.

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
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/environment.md)
- [development.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/development.md)
