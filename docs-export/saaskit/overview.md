# SaaSKit Overview

## What SaaSKit is

SaaSKit is a turnkey SaaS boilerplate that pairs marketing/public routes with a guarded product app inside one Next.js 14 monorepo. It keeps the runtime contract focused on Node 18, Prisma, and Supabase so you can rebrand, integrate optional services, and deploy on Supabase + Vercel without rebuilding the stack.

## What you get

- A combined marketing layer (`src/app/(marketing)`) and authenticated app layer (`src/app/(app)`), complete with UI primitives, SEO helpers, and legal pages.
- Database tooling (Prisma schema, migrations, Supabase Dev/Prod split) and runtime scripts that handle init, verification, and Vercel build migrations.
- Optional integrations for Clerk (auth), Stripe (billing), Resend (email/waitlist), WordPress (blog), and n8n (automation), all designed to fall back cleanly when left disabled.
- Release tooling and scripts that mirror ProKit’s workflow, including build hooks, migration commands, and the public release script.

## Architecture

The repo separates public marketing routes from the product app while sharing the same runtime environment. Runtime contracts rely on `DATABASE_URL`, optional labels (`APP_ENV`, `NODE_ENV`), and version flags. Supabase hosts Dev + Prod Postgres projects, Prisma migrations run locally (`db:migrate:dev`), automatically on Vercel (`db:migrate:vercel-build`), and manually when needed (`db:migrate:prod`). `docs/public/architecture.md` and `docs/public/stack.md` explain how the layers map to code.

## Typical launch flow

1. Bootstrap locally (`npm install`, `npm run setup:first-run`, `cp .env.example .env`) and set Supabase Dev values for `DATABASE_URL`.  
2. Run migrations (`npm run db:init`, `npm run db:migrate:dev`, `npm run predev`) and `npm run dev` to verify marketing and app routes.  
3. Configure prod Supabase + Vercel env vars, add optional integration keys if needed, then depend on `npm run prepare:vercel`/`npm run build` to run migrations before deploy.  
4. Use `docs/public/deployment.md`, `docs/public/database.md`, and `docs/public/env-reference.md` to validate production config and safety rules.

## Documentation map

- `docs/public/development.md` – onboarding steps, bootstraps, and dev/smoke-check commands.  
- `docs/public/architecture.md` – marketing vs. app layer layout and runtime boundaries.  
- `docs/public/stack.md` – runtime contract, deployment model, and multi-tenant/migrations story.  
- `docs/public/database.md` – Supabase Dev/Prod projects, migration rules, and safety reminders.  
- `docs/public/deployment.md` – Supabase + Vercel launch path, migration execution, and verification checklist.  
- `docs/public/features.md` – feature inventory and intentional exclusions.  
- `docs/public/integrations.md` – optional features/integrations with graceful fallbacks.  
