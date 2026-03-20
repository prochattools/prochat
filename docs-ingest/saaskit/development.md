# Development

## Overview

This page is for operators or developers who are working locally. It helps you bootstrap the workspace, run the expected commands, and troubleshoot setup issues. Skip it if you only want the founder launch path.

## Why this page exists

- It explains the local workflow.
- It lists the commands you use before pushing changes.
- It shows the safe reset and verification steps for Dev only.

## Read this when

- You are setting up your local copy of SaaSKit.
- You need to change schema, routes, or scripts.
- You want to verify migrations before deployment.

## Skip this when

- You only need the launch overview.
- You are not working in the codebase.
- You do not need to touch Dev database workflows.

## Setup

- Runtime requirements: Node 18+, npm, Supabase Dev + Prod projects (see `docs/public/database.md`).
- Run:
  ```bash
  npm install
  cp .env.example .env
  ```
- Fill `.env` with Dev values (see `docs/public/env-reference.md`).
- Run `npm run setup:first-run` or `npm run saaskit:bootstrap` to ensure env files and scaffold hooks are ready.

## Usage

- `npm run predev` runs `scripts/dev/bootstrap-env.js`, then `db:init` and `db:migrate:dev`; use it before starting the app.
- `npm run dev` reads the prepared `.env`, applies migrations (via `predev` steps), and launches Next.js in development mode.
- After schema edits, run `npm run db:migrate:dev` so Prisma and Supabase stay aligned before pushing.
- Use `npm run db:migrate:reset` only against the Dev database to start clean; production should never be reset this way.
- `npm run db:migrate:prod` is available as a manual fallback when Vercel migrations need to be rerun.

### Development checks

- `npm run lint` catches client/server issues in the repo.
- `npm run build` triggers `npm run db:migrate:vercel-build` via `prebuild`, so it serves as a smoke test before pushing.
- `npm run verify:deploy` shows current migration status for quick health verification.

## Examples

- Example 1: Schema change workflow—edit `prisma/system.prisma`, run `npm run db:migrate:dev`, then use `npm run dev` to preview the protected routes.
- Example 2: When onboarding a new teammate, have them copy `.env.example`, install deps, run `npm run predev`, and confirm `npm run lint` passes before they commit.

## Related docs

- Runtime variables: `docs/public/env-reference.md`
- Database setup: `docs/public/database.md`
- Deployment path: `docs/public/deployment.md`
- Optional integrations: `docs/public/integrations.md`
- Scripts reference: `docs/private/scripts.md`
