# ProChat website

This repository owns the ProChat website and marketing implementation.

It is responsible for:

- public marketing pages;
- product and niche landing pages;
- public docs and learn surfaces;
- conversion flows;
- contact and waitlist surfaces;
- SEO metadata, Open Graph output, and sitemap behavior;
- website runtime and deployment implementation.

It is not the source of truth for ProChat company philosophy or product strategy.

## Canonical ProChat authority

Mind is canonical for ProChat philosophy, product hierarchy, naming, positioning, business stage, growth policy, legal-policy direction, and cross-product roadmap.

Before changing website positioning, product navigation, roadmap language, legal copy, growth claims, or marketing page structure, read:

```text
mind/wiki/organisations/prochat/README.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/growth/README.md
mind/wiki/organisations/prochat/legal/README.md
```

This repository must not independently redefine ProChat philosophy, product hierarchy, naming, positioning, business stage, legal-policy direction, growth policy, or cross-product roadmap.

If local website implementation facts appear to conflict with Mind, report and reconcile the conflict in Mind before changing public positioning.

## Current product boundary

Mind currently defines exactly two ProChat products:

```text
ProChat
├── ProChat Memory
│   └── ProChat Memory for QA
└── ProChat Workbench
```

Current website implications:

- ProChat Memory is the flagship product.
- ProChat Memory for QA is the first launch niche and first discipline-specific edition.
- ProChat Workbench is the second product and should be presented separately from Memory.
- ProChat Answers, ProChat Automations, API access, and MCP integrations are capabilities or future interfaces, not current products.
- ProChat OS, SaaSKit, ProKit, UXKit, WaaSKit, and MikeOSS are legacy, historical, external, or archived references where relevant; they are not current ProChat products.
- BuildFlow may appear only as a technical/internal compatibility identifier for Workbench where required.

## Repository-local reading order

Use these docs for website implementation only:

1. `docs/overview.md` — repo-local website architecture and operating map.
2. `docs/strategy.md` — how this repo translates Mind into website implementation without redefining strategy.
3. `docs/roadmap.md` — website implementation roadmap only.
4. `docs/implementation-plan.md` — bounded implementation batches for aligning docs and marketing pages.
5. `docs/auth-status.md`, `docs/deployment.md`, `docs/content-platform.md`, and related implementation docs — runtime and deployment facts.

## Architecture overview

The site is built on Next.js App Router and deployed as the root-domain ProChat website.

Core implementation areas:

```text
src/app/                 route tree, pages, metadata, API routes
src/components/          shared UI and website components
src/assets/styles/       global styling and tokens
src/lib/                 content, metadata, taxonomy, runtime helpers
docs/                    repository-local implementation documentation
```

The website includes several implementation domains:

- marketing and product pages;
- public learning/docs content;
- contact, waitlist, and conversion routes;
- SEO metadata and structured data;
- Open Graph and sitemap generation;
- runtime integrations used by the website.

Technical website/runtime docs may describe this repository's implementation. They must not become independent product strategy documents.

## Legacy and archive handling

Older docs and routes may mention ProChat OS, kits, BuildFlow, MikeOSS, law-firm outreach, or other historical directions.

Do not delete historical material during alignment. Archive stale pages or docs when needed, and keep active navigation focused on the current Mind-defined product boundary.

## Rule

Keep this repository lean:

- document website implementation here;
- link to Mind for ProChat philosophy and strategy;
- avoid duplicating canonical strategy;
- archive older material instead of deleting it;
- do not stage or commit unrelated website/design work with documentation alignment batches.
