# Deployment

## Overview

SaaSKit ships with a proven launch path: Supabase Cloud hosts the Dev and Prod Postgres projects, while Vercel builds and serves the marketing/app runtime. The pipeline runs migrations automatically before production starts so your runtime, database, and build stay aligned.

## Installation & setup

### Minimum requirements

- Node 18+
- Two Supabase projects (Dev and Prod)
- `DATABASE_URL` for each environment

### Steps

1. Create `SaaSKit - Dev` and `SaaSKit - Prod` projects at https://supabase.com and copy their connection strings.
2. For local work, install dependencies, copy `.env.example`, and fill Dev values:
   ```bash
   npm install
   cp .env.example .env
   ```
   Set at least `DATABASE_URL`, `APP_ENV=development`, and `NEXT_PUBLIC_APP_URL=http://localhost:3056`.
3. Run bootstrapping commands:
   ```bash
   npm run db:init
   npm run db:migrate:dev
   npm run dev
   ```
4. In Vercel Project Settings, add Prod `DATABASE_URL`, `APP_ENV=production`, `NEXT_PUBLIC_APP_URL` (production domain), and any optional integration keys.
5. Deploy by pushing to your main branch or preview branch; Vercel will build and run migrations before launch.

## Usage

### Preflight

- Run `npm run prepare:production-db` once when your `DATABASE_URL` already points at the intended production database; it verifies the connection and applies migrations safely.
- `npm run db:migrate:prod` is the manual fallback if automatic migrations fail or you need to re-run them.

### Post-launch checks

- Hit `/api/health` to confirm `{"status":"ok"}`.
- Inspect marketing and legal pages to ensure branding is applied.
- Confirm enabled integrations (Clerk, Stripe, Resend, etc.) are performing as expected.
- Stripe webhooks should show `verify` status before moving to live traffic.

### Migration behavior

- Vercel production builds run `db:migrate:vercel-build` automatically.
- Set `SAASKIT_DISABLE_VERCEL_BUILD_MIGRATIONS=true` if you need to skip that step temporarily (only for emergencies).

### Safety rules

1. Never use production keys in local `.env`.
2. Never load Dev values into Vercel production variables.
3. Test and apply migrations in Dev before deploying Prod.

## Examples

- Example 1: After committing schema changes, run `npm run db:migrate:dev` locally, push to `main`, let Vercel execute `db:migrate:vercel-build`, and verify `/api/health` when the build succeeds.
- Example 2: Before your first production deploy, run `npm run prepare:production-db` with Prod `DATABASE_URL`, then deploy once the command succeeds.
