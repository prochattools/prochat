# Architecture

Think of SaaSKit as two parts in one repository.

## 1) Public website layer

This is what visitors see before signing in.

Main paths:
- `src/app/(marketing)/**`
- `src/marketing/**`

Includes:
- homepage
- legal pages
- optional blog/waitlist pages

## 2) Product app layer

This is what signed-in users use.

Main paths:
- `src/app/(app)/**`
- `src/app/api/**`
- `src/libs/**`
- `prisma/**`
- `scripts/**`

Includes:
- auth and route protection
- billing routes
- database access and migrations
- runtime startup scripts

## Runtime basics

- The runtime contract relies on `DATABASE_URL` (Prisma + server), optional labels (`APP_ENV`, `NODE_ENV`), and optional version flags (`SAASKIT_VERSION`, `PROCHAT_VERSION`).  
- Local development points `DATABASE_URL` at Supabase Dev, while production builds run against Supabase Prod and automatically execute `npm run db:migrate:vercel-build` before `npm start`.  
- Marketing and app layers share the same Node 18 runtime, so the only difference between `npm run dev` and `npm start` is the route protection that kicks in for `src/app/(app)` routes.

## Recommended deployment path

- Supabase Cloud (Dev + Prod) + Vercel (preview + production) as the primary deployment model. This path keeps your database migrations, Supabase credentials, and Vercel builds on the same contract described in `docs/public/deployment.md`.

## Related docs

- `docs/public/database.md`
- `docs/public/env-reference.md`
- `docs/public/integrations.md`
- `docs/public/deployment.md`
- `docs/public/stack.md`
