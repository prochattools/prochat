# Repository Operations Guide

## Purpose

This guide lists the safe commands, validation flows, and operational constraints contributors should follow before modifying ProChat.

## Safe Commands

- `node scripts/check-env-docs.js`
- `node scripts/check-doc-links.js`
- `npm run typecheck`
- `npm run lint`
- `npm run lint:design`
- `npm run build`

These are repository-local validation and compile commands. `npm run build` also runs the current sitemap prebuild hook.

## Commands Requiring Caution

- `npm run db:init` (requires database and tenant context)
- `npm run db:cleanup` (dangerous for production tenants without `--force`)
- `npm run db:migrate:prod`
- `npm run db:migrate:dev`
- Any `scripts/provision-*` commands
- `npm run test:security-api` (requires a deliberately started local server and `TEST_BASE_URL`)
- `npm run test:evidence:ci` (requires a deliberately started local server, `WAVE1_BASE_URL`, Chromium, and maintenance mode disabled)

## Dangerous / Do Not Run Blindly

- `npm run start` against production infrastructure without the correct environment and migration context
- `npm run db:cleanup` against production data without explicit owner approval
- Running `scripts/provision-auto.js` manually in production
- Any command that touches Dokploy, MCP, or live provisioning APIs

## Canonical Validation Paths

- **Documentation-only changes:** `node scripts/check-env-docs.js` → `node scripts/check-doc-links.js` when those documents are in scope.
- **Code/config changes:** `npm run typecheck` → `npm run lint` → `npm run lint:design` → `npm run build`.
- **Security/API changes:** run the code/config chain, then `npm run test:security-api` against a maintenance-off local production build.
- **Canonical public UI changes:** run the code/config chain, then `npm run test:evidence:ci` against a maintenance-off local production build.

## Important Source-of-Truth Files

- `README.md`
- `AGENTS.md`
- `architecture.json`
- `docs-public/environment.md`
- `docs/deployment.md`
- `docs/overview.md`
- `docs/product/agent-mode-progress.md`

## Operational Constraints

- Node 20 is the supported runtime for Docker, CI, and local tooling.
- The active public documentation surface is the lean `/docs` repository hub for Memory for QA and Workbench. The retired generated `src/content/docs` / `scripts/docs` pipeline must not be reintroduced.
- WordPress, the MCP bridge, and Dokploy branch previews are legacy and must not be reintroduced.
- Any environment change must be reflected in `docs-public/environment.md` and `.env.example` when applicable.
- The live `prochat.tools/wp-admin` / FluentCRM surface is not implemented by this repository and must be retired at its separate hosting or routing origin.
