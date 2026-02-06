# Architecture

This repo is **ProKit**: ProChat’s developer core boilerplate for building SaaS apps.

ProKit is intentionally lean. It ships the SaaS engine only:

- Next.js (App Router) + TypeScript
- Tailwind + shadcn UI foundation
- Clerk auth (with a safe mock mode when keys are missing)
- Stripe billing wiring (optional)
- PostgreSQL + Prisma migrations with schema isolation per app (`tenant_<slug>`)
- Hands-off production deploys on Dokploy via a runtime deploy gate (backup + migrate + smoke check)

ProKit intentionally does **not** ship with:

- A marketing site, funnels, landing pages, or SEO/blog/content systems
- Waiting lists, newsletters, or lead capture flows
- Help center / docs site pages or public changelog pages
- Anything that only exists to “sell” the product (CTA/copy systems)

## Route Groups (the “one way”)

This repo uses Next.js App Router route groups to keep “public entry” vs “app” unambiguous.

### Public entry

- `/` -> `src/app/page.tsx`

This page is intentionally minimal. If the user is signed in, it redirects to `/dashboard`.

### App routes (engine)

Location:
- `src/app/(app)/**`

Layout:
- `src/app/(app)/layout.tsx` (shared app header + app shell)

Examples:
- `/dashboard` -> `src/app/(app)/dashboard/page.tsx`

## Runtime deploy gate (Dokploy)

ProKit wraps production starts with a runtime deploy gate:

- `npm start` -> `scripts/runtime/start-prod.sh` -> `scripts/db/deploy-prod.sh`

The gate runs provisioning + migrations automatically, and only starts the app if the deploy checks pass.

