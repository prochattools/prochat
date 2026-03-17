# ProChat Overview

ProChat is a Next.js monolith that combines three systems in one repository:

1. The app/runtime platform
2. The content and SEO platform
3. The documentation automation system

The repo follows SaaSKit infrastructure patterns where they still match the implementation, but this is the ProChat codebase and the operational surface is broader than the SaaSKit baseline.

## System domains

### 1. App/runtime platform

The app/runtime side owns tenant provisioning, authenticated product flows, billing, automation provisioning, and production startup.

Core characteristics:

- One app slug maps to one tenant schema: `tenant_<slug>`
- One tenant database user maps to that schema: `tenant_<slug>_user`
- Provisioning is script-driven through `scripts/provision-auto.js` and `scripts/db/init-tenant.js`
- Prisma migrations run from `prisma/system.prisma`
- Production deployment is build-driven: `prebuild` provisions the tenant and applies `prisma migrate deploy`

Reference docs:

- [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md)
- [production-lifecycle.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/production-lifecycle.md)
- [database.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/database.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md)
- [development.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/development.md)
- [integrations.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/integrations.md)
- [github-entitlements.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/github-entitlements.md)
- [automation-routes.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/automation-routes.md)
- [tenant-cleanup.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/tenant-cleanup.md)

### 2. Content and SEO platform

The root domain is an MDX-driven authority system, not a separate marketing site bolted onto the app.

Implemented content surfaces:

- `/learn`
- `/learn/saas-starting-point`
- `/learn/production-guide`
- `/docs`
- `/prompts`
- main marketing and product pages exposed through the root sitemap

The prompt library remains live but `noindex` while it is still thin. The removed blog corpus, glossary, snippets, playbooks, guides, and `/saas-glossary` are not exposed through sitemap generation.

The content platform also owns:

- generated Open Graph assets
- build-time sitemap generation
- taxonomy and metadata helpers

Reference docs:

- [content-platform.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/content-platform.md)
- [open-graph-system.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/open-graph-system.md)
- [design-system.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/design-system.md)
- [mailerlite-funnel.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/mailerlite-funnel.md)

### 3. Documentation automation system

ProChat also runs a generated documentation pipeline for public docs. That pipeline is separate from the internal `/docs` folder.

Implemented flow:

- raw source docs land in `docs-export/` or external sources
- `docs:ingest` normalizes them into `docs-ingest/`
- AI and template stages generate normalized output
- generated public docs are emitted into `src/content/docs`

This is an internal build/publishing system inside the same repo, not a separate service.

Reference docs:

- [docs-automation.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/docs-automation.md)
- [scripts/docs/README.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/docs/README.md)

## How the domains interact

- The app/runtime platform serves the product routes, API routes, auth flows, billing flows, and automation endpoints.
- The content/SEO platform serves the public authority graph from MDX content and generated metadata assets.
- The docs automation system feeds public `/docs` content into the same Next.js app by generating files under `src/content/docs`.

That means the monolith has one deployment target, one build pipeline, and one runtime, but multiple operational domains.

## Shared infrastructure patterns

These patterns are central across the repo:

- schema-per-app Postgres tenancy
- scripted tenant provisioning
- Prisma-based schema management
- build-time generation for SEO and docs artifacts
- integration-heavy API routes for Stripe, Clerk, Resend, GitHub App, Make, n8n, and MailerLite

## Canonical references

- [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md) for build, provisioning, migration, and startup behavior
- [database.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/database.md) for the tenant schema model
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md) for the full env contract
- [development.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/development.md) for local workflow
- [integrations.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/integrations.md) for external service behavior
- [docs-automation.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/docs-automation.md) for the generated public docs system
