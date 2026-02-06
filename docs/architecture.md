# Architecture

This repo is **SaaSKit**: a commercial boilerplate built on the **ProKit engine**.

- **ProKit (engine)** = SaaS primitives (auth, billing, database lifecycle, runtime deploy gate, dashboard shell).
- **SaaSKit (product layer)** = ProKit + a marketing site + launch/funnel routes + optional blog/waitlist.

Important: the npm package name and some internal script naming still say **ProKit** because that is the engine.

## Boundaries (what belongs where)

### ProKit (engine)

This is the “SaaS engine” that can be extracted into a ProKit-only repo later.

Includes:
- Multi-tenant Postgres + Prisma schema-per-tenant model (`prisma/system.prisma`, `prisma/migrations/**`).
- Automated DB lifecycle scripts (provision/migrate/backup/smoke/restore) (`scripts/**`).
- Runtime deploy gate (Dokploy): `npm start` -> `scripts/runtime/start-prod.sh` -> `scripts/db/deploy-prod.sh`.
- Auth + protected routes (Clerk optional; mock mode supported) (`src/middleware.ts`, `src/libs/safeClerk.tsx`).
- Billing wiring (Stripe optional).
- App routes (dashboard/chat/etc).

### SaaSKit (marketing + launch layer)

This is the user-facing layer that makes the repo “sellable” as a launch kit.

Includes:
- Marketing home page system (`src/saaskit/marketing/**`).
- Marketing pages and optional blog/waitlist routes (`src/app/(marketing)/**`).
- Product/launch copy inputs (`src/saaskit/marketing/landing/metadata.json`).

## Route Groups (the “one way”)

This repo uses Next.js App Router **route groups** so it’s unambiguous which pages are marketing vs app.

### Marketing routes (SaaSKit layer)

Location:
- `src/app/(marketing)/**`

Layout:
- `src/app/(marketing)/layout.tsx`
  - Uses the shared marketing chrome:
    - `src/components/Header.tsx` (wraps marketing `Navbar`)
    - `src/components/Footer.tsx` (wraps marketing `Footer`)
  - Uses shared marketing background:
    - `src/saaskit/marketing/MarketingBackground.tsx`

Required marketing routes:
- `/` -> `src/app/(marketing)/page.tsx`
- `/privacy-policy` -> `src/app/(marketing)/privacy-policy/page.tsx`
- `/tos` -> `src/app/(marketing)/tos/page.tsx`

Optional marketing routes:
- `/blog` + `/blog/[articleId]` -> `src/app/(marketing)/blog/**`
- `/waiting-list` -> `src/app/(marketing)/waiting-list/page.tsx`

### App routes (ProKit engine)

Location:
- `src/app/(app)/**`

Layout:
- `src/app/(app)/layout.tsx`
  - Adds the header and applies consistent top offset for the fixed navbar.

Examples:
- `/dashboard` -> `src/app/(app)/dashboard/page.tsx`
- `/chat/[projectID]` -> `src/app/(app)/chat/[projectID]/page.tsx`

## Optional features (enablement)

SaaSKit is designed to run with *only the database configured*.

Everything else is optional and should either:
- work when configured, or
- fail with a clear message.

See:
- `docs/optional-features.md`
- `instructions/clerk.md`
- `instructions/stripe.md`

## Deriving a ProKit-only repo (future)

To derive ProKit from SaaSKit:
- Delete the SaaSKit layer:
  - `src/app/(marketing)/**`
  - `src/saaskit/**`
  - marketing-only components under `src/components/**`
- Keep the ProKit engine:
  - `src/app/(app)/**`
  - `scripts/**`
  - `prisma/**`
  - `src/libs/**`, `src/middleware.ts`

