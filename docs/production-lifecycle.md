# Production Lifecycle

This document describes the real production build and startup sequence for ProChat.

It complements [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md) by focusing on sequence rather than infrastructure summary.

## Lifecycle overview

Production follows a build-first lifecycle:

1. Dokploy runs `npm run build`
2. npm triggers `prebuild`
3. `prebuild` runs provisioning and production migrations
4. the Next.js build completes
5. Dokploy starts the container with `npm run start`
6. the startup script launches `next start`
7. the startup script pings sitemap endpoints for search engines

## Prebuild phase

The prebuild hook is defined in [package.json](/Users/Office/Repos/Organisation/ProChat/Web/prochat/package.json).

Current command:

- `NODE_ENV=production npm run provision:auto`

That hands off to [scripts/provision-auto.js](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/provision-auto.js).

## Provisioning and migration sequence

`scripts/provision-auto.js` currently does this in production:

1. resolve `APP_SLUG`
2. fail if `APP_SLUG` is missing
3. run `npm run db:init -- --slug <slug>`
4. run `npm run db:migrate:prod`

That means tenant provisioning and Prisma production migrations are part of the build lifecycle rather than a separate runtime lifecycle.

## Build continuation

After the prebuild sequence finishes, `npm run build` continues with:

1. `npm run generate:social`
2. `next build`
3. `npm run sitemap`
4. `npm run rss`

This makes build output responsible for:

- compiled app output
- generated Open Graph assets
- sitemap output
- RSS output

## Startup phase

Runtime startup is handled by [scripts/start-production.sh](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/start-production.sh).

Current behavior:

- start `next start -p ${PORT:-3000}`
- wait briefly in the background
- derive `SITE_URL` from `NEXT_PUBLIC_SITE_URL`, falling back to `https://prochat.tools`
- ping Google and Bing with `${SITE_URL}/sitemap.xml`

The script then waits on the Next.js process.

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

Because provisioning and migrations happen during `npm run build`, a production build is not just a static compile step. It assumes:

- valid production env values
- reachable production database connections
- correct app slug and tenant credentials

That distinction matters when reproducing production behavior locally or in CI.

## Related references

- [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md)
- [database.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/database.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md)
- [github-entitlements.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/github-entitlements.md)
