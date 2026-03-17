# Production Lifecycle

This document describes the real production build and startup sequence for ProChat.

It complements [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md) by focusing on sequence rather than infrastructure summary.

## Lifecycle overview

Production follows a build-first lifecycle:

1. Dokploy runs `npm run build`
2. `next build` compiles the standalone app output
3. Dokploy starts the container with `npm run start`
4. the startup script launches `next start`
5. operators handle any Search Console follow-up manually after deploy

## Optional database prep

Database preparation is explicit. When a deploy needs tenant provisioning or production migrations, operators can run [prepare-production.sh](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/deploy/prepare-production.sh).

Current command:

- `NODE_ENV=production npm run provision:auto`

That hands off to [scripts/provision-auto.js](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/provision-auto.js).

## Provisioning and migration sequence

`scripts/provision-auto.js` currently does this in production:

1. resolve `APP_SLUG`
2. fail if `APP_SLUG` is missing
3. run `npm run db:init -- --slug <slug>`
4. run `npm run db:migrate:prod`

That means tenant provisioning and Prisma production migrations are handled as an explicit operational step rather than hidden inside the build.

## Build continuation

`npm run build` currently does one thing:

1. `next build`

Optional generators remain outside the hot build path:

- `npm run generate:social`
- `npm run sitemap`

Docs also avoid pre-rendering the full public corpus at build time. The docs router prebuilds only the core landing and onboarding pages, and less-frequent public doc pages are generated on demand and cached.

## Startup phase

Runtime startup is handled by [scripts/start-production.sh](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/start-production.sh).

Current behavior:

- start `next start -p ${PORT:-3000}`
- sync `.next/static` and `.next/standalone/.next/static` so both supported runtime layouts can serve assets
- wait on the Next.js process

The script then waits on the Next.js process.

## Manual search-console step

Search-engine follow-up is manual, not automatic.

After deploy:

1. resubmit `${NEXT_PUBLIC_SITE_URL}/sitemap.xml` in Google Search Console
2. request indexing manually for the retained primary surfaces when needed:
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

The runtime does not ping Google or Bing on startup.

## What is not part of the lifecycle

The current ProChat production lifecycle does not include:

- SaaSKit runtime deploy gate behavior
- runtime backup orchestration
- runtime smoke-check and rollback flow

## Dokploy role

Dokploy is the production execution environment for:

- the build command
- the start command
- production env injection
- network access to the production database

In practical terms, Dokploy is where the build-driven provisioning and startup lifecycle is executed.

## Operational implication

`npm run build` is now a pure application compile step. If operators also run the explicit database prep helper, that prep step assumes:

- valid production env values
- reachable production database connections
- correct app slug and tenant credentials

That separation keeps the default build faster and easier to reproduce locally and in CI.

## Related references

- [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md)
- [database.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/database.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md)
- [github-entitlements.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/github-entitlements.md)
