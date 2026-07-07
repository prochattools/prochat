# Agent Intelligence Guide

## Repository overview

This repository hosts **ProChat**, the Next.js marketing, front-end, website, learning, documentation, and conversion platform for the ProChat company and products.

It is **not** the canonical source for ProChat company philosophy or product strategy. The `mind` repository is canonical for ProChat company philosophy, product hierarchy, naming, positioning, business stage, legal-policy direction, growth policy, and cross-product roadmap.

Current product hierarchy:

```text
ProChat
├── ProChat Memory
│   └── ProChat Memory for QA
└── ProChat Workbench
```

Current positioning:

- **ProChat Memory** is the flagship product.
- **ProChat Memory for QA** is the first launch niche and first discipline-specific edition of ProChat Memory.
- **ProChat Workbench** is the second product and should be presented separately from Memory.
- ProChat OS, SaaSKit, ProKit, UXKit, WaaSKit, MikeOSS, and similar older names are legacy, historical, archived, external, or internal references unless Mind explicitly reclassifies them.
- ProChat Answers, ProChat Automations, API access, and MCP integrations are capabilities, use cases, or future interfaces, not current products.
- BuildFlow may appear only as a technical/internal compatibility identifier for Workbench where required.

## Canonical strategy authority

Mind controls company and product strategy:

```text
mind/wiki/organisations/prochat/README.md
mind/wiki/organisations/prochat/brand/
mind/wiki/organisations/prochat/legal/
mind/wiki/organisations/prochat/growth/
```

This repository controls website implementation facts: routes, components, content rendering, analytics hooks, environment contracts, docs automation, deployment behavior, and code-facing architecture.

Repository-local docs must not independently redefine ProChat philosophy, product hierarchy, naming, positioning, business stage, legal-policy direction, or cross-product roadmap. If this repo conflicts with Mind, Mind wins and the conflict must be fixed explicitly.

## Repository-local implementation docs

Use these docs for implementation and website execution context only:

- `README.md` — repo role, current website implementation boundaries, and canonical Mind linkage;
- `docs/overview.md` — website/app implementation overview;
- `docs/strategy.md` — repository-local website strategy subordinate to Mind;
- `docs/roadmap.md` — website implementation roadmap subordinate to Mind;
- `docs/implementation-plan.md` — website implementation plan subordinate to Mind;
- `docs/prochat-memory-website-design-strategy.md` — design brief for the Memory-led website;
- `docs/website-copy-blueprint.md` — website copy guidance subordinate to Mind;
- `DESIGN.md` — visual/design-system guidance only.

Architecture and operations docs include:

- `docs/deployment.md`
- `docs/database.md`
- `docs-public/environment.md`
- `docs/development.md`
- `docs/integrations.md`
- `docs/production-lifecycle.md`
- `docs/content-platform.md`
- `docs/docs-automation.md`

Refer to Mind before website/product copy changes, and refer to repository-local architecture docs before implementation changes.

## Environment contract

The environment variable contract lives in `docs-public/environment.md` and `.env.example`. Runtime enforcement is supported by `scripts/check-env.js`, while `scripts/check-env-docs.js` ensures every code-facing `process.env.*` variable is documented.

## Documentation system

- **Internal documentation** lives under `/docs` and is not published directly.
- **Public generated docs** land under `src/content/docs` through the docs automation pipeline.
- **Docs ingestion pipeline** assets live inside `docs-ingest` and `scripts/docs`; these scripts orchestrate extraction, AI generation, validation, and publishing.
- **Validation command:** `npm run docs:validate` exercises the current pipeline.

## Editing rules for AI agents

1. Do not invent infrastructure, products, offers, legal terms, or public claims that are not supported by Mind or verified implementation facts.
2. Do not treat repository-local strategy docs as canonical company strategy.
3. Do not reintroduce stale product-first positioning around legacy, archived, external, or internal names.
4. Never adjust environment contracts without updating `docs-public/environment.md` and `.env.example` where relevant.
5. Do not reintroduce legacy systems that were removed unless the task explicitly asks for a historical archive or redirect.
6. Node 20 is the supported runtime for Docker, CI, and local tooling unless the repo contract changes.
7. Stripe uses mode-based environment keys (`STRIPE_MODE`, `STRIPE_SECRET_KEY_{TEST|LIVE}`, etc.).
8. Documentation integrity checks (`scripts/check-env-docs.js`, `scripts/check-doc-links.js`, `npm run docs:validate`) run automatically in CI.

## Project principles

- Documentation must match Mind and verified implementation facts.
- Every environment variable referenced by code must be documented.
- Avoid reintroducing legacy infrastructure patterns; prefer current ProChat flows.
- When possible, update canonical or repository-local docs instead of duplicating explanations in multiple places.
