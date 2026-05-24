# Agent Intelligence Guide

## Repository Overview

This repository hosts **ProChat**, the Next.js marketing, learning, documentation, and conversion platform for **ProChat OS**.

The current business strategy is ProChat OS-first. ProChat OS is an installable Agentic Workflow OS that sits between messy business inputs and the tools a business already uses. The public website must stay business-agnostic. Law firms and MikeOSS are direct-outreach/demo wedges, not the whole brand.

ProChat still uses SaaSKit infrastructure patterns where they match the implementation, but SaaSKit, ProKit, UXKit, and WaaSKit are legacy/supporting products rather than the flagship strategy.

ProChat’s architecture is composed of three domains:

- **App/runtime platform** – tenant provisioning, production deployment, auth, billing, and automation routes.
- **Content/SEO platform** – MDX-driven clusters (blog, docs, guides, glossary, snippets, prompts), Open Graph rendering, sitemap/RSS output, and analytics hooks.
- **Documentation automation pipeline** – TypeScript/OpenAPI extraction, AI enrichment, ingest/validation, and publishing into `src/content/docs`.

## Source of Truth Documentation

The authoritative internal docs for product strategy are:

- `docs/strategy.md`
- `docs/product-operating-map.md`
- `docs/roadmap.md`
- `docs/implementation-plan.md`
- `docs/product-hierarchy-plan.md`

The authoritative internal docs for architecture are:

- `docs/overview.md`
- `docs/deployment.md`
- `docs/database.md`
- `docs-public/environment.md`
- `docs/development.md`
- `docs/integrations.md`
- `docs/production-lifecycle.md`
- `docs/content-platform.md`
- `docs/docs-automation.md`

Refer to the strategy docs before website/product copy changes and to the architecture docs before implementation changes. Mind remains the business source of truth when conflicts appear.

## Environment Contract

The environment variable contract lives in `docs-public/environment.md` and `.env.example`. Runtime enforcement is supported by `scripts/check-env.js`, while `scripts/check-env-docs.js` ensures every code-facing `process.env.*` variable is documented.

## Documentation System

- **Internal documentation** lives under `/docs` and is not published directly.
- **Public generated docs** land under `src/content/docs` via the docs automation pipeline.
- **Docs ingestion pipeline** assets live inside `docs-ingest` and `scripts/docs`; these scripts orchestrate extraction, AI generation, validation, and publishing.
- **Validation command:** `npm run docs:validate` exercises the current pipeline.

## Editing Rules for AI Agents

1. Do not invent infrastructure that is not described in the canonical docs listed above.
2. Never adjust environment contracts without updating `docs-public/environment.md` (and `.env.example` if needed).
3. Do not reintroduce legacy systems that were removed (WordPress, MCP bridge, Dokploy branch previews).
4. Node 20 is the supported runtime for Docker, CI, and local tooling.
5. Stripe uses mode-based env keys (`STRIPE_MODE`, `STRIPE_SECRET_KEY_{TEST|LIVE}`, etc.).
6. Documentation integrity checks (`scripts/check-env-docs.js`, `scripts/check-doc-links.js`, `npm run docs:validate`) run automatically in CI.

## Project Principles

- Documentation must match the code and never drift.
- Every environment variable referenced by code must be documented.
- Avoid reintroducing legacy infrastructure patterns; prefer modern ProChat flows.
- When possible, update internal docs instead of duplicating explanations in multiple places.
