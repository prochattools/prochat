# Database

## Overview

SaaSKit relies on Supabase Cloud for both development and production, and the runtime connects through one variable: `DATABASE_URL`. The repo ships as a single schema (no tenant-schema automation), so keeping Dev and Prod separated is critical for avoiding accidental data overlap.

## Setup

1. Create two projects at https://supabase.com: `SaaSKit - Dev` (for testing) and `SaaSKit - Prod` (for live users).
2. In each project, copy values from:
   - `Settings -> Database` (for `DATABASE_URL`)
   - `Settings -> API` (optional `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
3. Only assign Dev values to your local `.env` file and Prod values to Vercel environment variables.

## Usage

### Local development

- In `.env`, set `DATABASE_URL` to the Dev connection string and `APP_ENV=development`.
- Optional Supabase API keys go in `.env` only if you add custom Supabase API calls.
- Run `npm run db:init && npm run db:migrate:dev` before `npm run dev` to ensure Prisma schema matches the Dev database.

### Production deployment

- In Vercel Project Settings, set `DATABASE_URL` to the Prod connection string and `APP_ENV=production`.
- Deploying triggers `npm run db:migrate:vercel-build`, which applies migrations before the Next.js runtime launches.
- Optional keys belong in Vercel only when the corresponding feature (e.g., Supabase API) is actually used.

### Vercel migration controls

- Automatic Vercel builds run `db:migrate:vercel-build` before `npm start`.
- If you need to skip that step, use `SAASKIT_DISABLE_VERCEL_BUILD_MIGRATIONS=true`.
- For manual control, run `npm run db:migrate:prod` from a shell that points `DATABASE_URL` at the production database.

## Safety rules

1. Never reuse production keys locally.
2. Never drop production migrations into Dev or vice versa.
3. Treat Prisma migrations as the source of truth: edit `prisma/system.prisma`, `npm run db:migrate:dev`, test, then deploy.
4. Only reset or recreate Supabase Dev; leave Prod untouched unless absolutely necessary.

## Examples

- Example 1: Local prep for a schema change—set Dev `DATABASE_URL`, run `npm run db:init`, edit `prisma/system.prisma`, then `npm run db:migrate:dev`.
- Example 2: If `npm run dev` fails with a migration error, rerun `npm run db:migrate:dev` locally and verify the connection string matches your Dev project.
- Example 3: When Dev gets messy, run `npm run db:migrate:reset` (Dev project only) to start clean without touching Prod.
