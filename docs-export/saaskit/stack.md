# Stack

The **stack** page shows the technology layers that power SaaSKit, using the same naming conventions as ProKit: runtime, database contract, deployment model, optional integrations, and how the multi-tenant model fits into the Prisma schema.

## Application runtime
- **Next.js 14 App Router** brings server components and edge-ready routing for both marketing and app areas (`src/app/(marketing)` + `src/app/(app)`).
- **Node 18+** hosts the Next runtime, and `npm start` launches the production entrypoint via `./scripts/runtime/start-prod.sh`.
- **Runtime contracts**: `DATABASE_URL` (required) and `APP_ENV`/`NODE_ENV` (optional) keep the app connected to the right environment; `SAASKIT_VERSION` and `PROCHAT_VERSION` supply UI version flags.
- **Deployment model**: local development relies on Supabase Dev + Vercel preview branches, while production is Supabase Prod + Vercel builds (see `docs/public/deployment.md` for the full path).

## Data layer & multi-tenant model
- **Prisma** is configured via `prisma/system.prisma`; migrations run through `npm run db:migrate:*` scripts.
- **Supabase Cloud** hosts both Dev and Prod Postgres projects—there is **no tenant schema** automation, so SaaSKit operates with a single schema and relies on row-level tenant checks in the application logic. Keep the two projects separate (Dev for experimentation, Prod for live users).
- Database migrations run locally (`db:migrate:dev`), automatically on Vercel builds (`db:migrate:vercel-build`), and manually via `db:migrate:prod` when needed. `docs/public/database.md` explains the exact workflow.

## Optional integration layer
- Clerk (authentication), Stripe (billing), Resend (email), WordPress (blog), and n8n (automation) are all optional features that plug into the stack when you opt in. Each integration keeps SaaSKit’s router and API handlers running safely when keys are missing. See `docs/public/integrations.md` for the configuration checks and graceful fallbacks.
- When integrations are disabled, the stack preserves the runtime contract: marketing routes stay public, app routes keep their guards, and middleware continues to enforce the multi-tenant behavior described in `docs/public/architecture.md`.

## Supporting tech
- **Design system**: tokenized colors/typography, marketing layout utilities, and app UI primitives.
- **Scripts**: the `scripts` directory contains bootstraps, migrations, and runtime helpers referenced by `package.json` (`predev`, `saaskit:bootstrap`, `prepare:vercel`, etc.). The command reference is stored in `docs/private/scripts.md`.
- **Deployment automation**: `scripts/release.sh` (the release script) wraps the Git workflow, ensures license coverage, bumps versions, and tags releases (see `docs/public/git-workflow.md`).

## Related docs
- Development checklist: `docs/public/development.md`  
- Deployment path: `docs/public/deployment.md`  
- Features inventory: `docs/public/features.md`
