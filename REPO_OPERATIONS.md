# Repository Operations Guide

## Purpose

This guide lists the safe commands, validation flows, and operational constraints that AI coding agents and contributors should follow before modifying ProChat.

## Safe Commands

- `node scripts/check-env-docs.js`
- `node scripts/check-doc-links.js`
- `npm run docs:validate`
- `npm run docs:extract:typescript`
- `npm run docs:ingest`
- `npm run docs:ai-build`
- `npx tsc --noEmit --pretty false`

These commands only analyze code/docs or run the docs pipeline; they are safe without external provisioning.

## Commands Requiring Caution

- `npm run docs:generate`
- `npm run docs:preview`
- `npm run db:init` (requires database and tenant context)
- `npm run db:cleanup` (dangerous for production tenants without `--force`)
- `npm run build` (runs provisioning/migrations; run only with proper env setup)
- Any `scripts/provision-*` commands

These depend on real infrastructure or mutate persisted data.

## Dangerous / Do Not Run Blindly

- `npm run start` in production mode without proper environment
- `npm run db:cleanup` without `--force` when targeting production tenants
- Running `scripts/provision-auto.js` manually in production
- Any command that touches Dokploy, MCP, or live provisioning APIs

## Canonical Validation Paths

- **Docs-only changes:** `node scripts/check-env-docs.js` → `node scripts/check-doc-links.js` → `npm run docs:validate`
- **Docs pipeline changes:** run the above plus `npm run docs:extract:typescript`, `npm run docs:ingest`, and `npm run docs:ai-build`
- **Environment contract changes:** ensure `.env.example` + `docs-public/environment.md` stay in sync and rerun `node scripts/check-env-docs.js`

## Important Source-of-Truth Files

- `README.md`
- `AGENTS.md`
- `architecture.json`
- `docs-public/environment.md`
- `docs/deployment.md`
- `docs/overview.md`
- `scripts/docs/README.md`

These files capture the canonical architecture, docs pipeline, and operational rules.

## Operational Constraints

- Node 20 is the supported runtime for Docker, CI, and local tooling.
- Internal docs reside in `/docs`; public docs live under `src/content/docs` via the automation pipeline.
- WordPress, MCP bridge, and Dokploy branch previews are legacy and must not be reintroduced.
- The `/docs/api/`, `/docs/cli/`, and `/docs/sdk/` directories are managed by the automation pipeline and should only contain generated content.
- Any environment change must be reflected in `docs-public/environment.md` (and `.env.example` if applicable).
