# Project Getting Started

Follow these steps to run the application locally and complete the first sign-in/checkout flow.

## Prerequisites
- Node.js + npm
- Docker running Postgres on host port `5433` (maps to container `5432`)
- Stripe + Clerk test keys

## 1) Clone & install
```bash
git clone <your-app-repo> app
cd app
npm install
```

## 2) Environment variables
Create `.env` (or let `npm run dev` generate it) and set:
- `APP_SLUG` – app slug (becomes `tenant_<slug>` schema/user)
- `DATABASE_URL` – tenant runtime DB URL
- `SYSTEM_DATABASE_URL` – admin DB URL for scripts
- `SHADOW_DATABASE_URL` – Prisma shadow DB for `migrate dev`
- `TENANT_DB_PASSWORD` – tenant DB password (required in prod; defaults to `devpass` locally)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY` – Clerk keys
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE` – client Stripe keys
- `STRIPE_SECRET_KEY_TEST`, `STRIPE_SECRET_KEY_LIVE` – server Stripe keys
- `STRIPE_WEBHOOK_SECRET_TEST`, `STRIPE_WEBHOOK_SECRET_LIVE` – Stripe webhook signing secrets
- `NEXT_PUBLIC_APP_URL` – app base URL (e.g., http://localhost:3000)
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID` – optional public analytics config for Umami
- Optional: `MAKE_*`, `N8N_*`, `RESEND_API_KEY`, `MAILERLITE_*`, and analytics values as needed

Reference: `.env.example`.

## 3) Provision the database
`npm run dev` will auto-bootstrap `.env`, provision `tenant_dev`, and apply migrations. To run manually:
```bash
npm run db:init -- --slug dev       # creates schema/user + registry row
npm run db:migrate:dev              # runs Prisma migrate dev (uses SHADOW_DATABASE_URL)
```
Important: this flow provisions a tenant schema and tenant role inside an existing Postgres database. It never creates a database.

For new projects or when you need `.env.production` updated, run:
```bash
./scripts/provision-saas.sh <project-slug>
```

## 4) Start the app
```bash
npm run dev
# app: http://localhost:3000
```

## 5) First login & subscription
1. Ensure Clerk test keys are set.  
2. Visit `/sign-up` or click “Get started” → complete Clerk sign-up.  
3. After auth you’ll hit `/dashboard`; without an active subscription you’ll be redirected to `/processing-page`.  
4. Choose a plan (Stripe test price IDs in `src/config.ts`) and complete checkout.  
5. Stripe webhook (`/api/webhook/stripe`) marks your subscription `active` and triggers a thank-you email via Resend.  
6. Refresh `/dashboard` to access the Scenarios UI (Make/n8n project cloning).

## 6) Common commands
- Auto provision local: `npm run db:provision:local`
- Provision: `npm run db:init -- --slug <slug> [--preview] [--external-id <id>]`
- Migrate (dev): `npm run db:migrate:dev`
- Migrate (prod): `npm run db:migrate:prod`
- Cleanup preview: `npm run db:cleanup -- --slug <slug> [--force]`

## 7) Dokploy production deployment
- Build command: `npm run build`
- Start command: `npm run start`
- The start command runs `sh scripts/deploy/prepare-production.sh`, which runs `NODE_ENV=production npm run provision:auto` (`db:init` + `db:migrate:prod`) before Next starts.
- Production assumes the existing Supabase Postgres database is already present; only schema/role provisioning is performed.
- Dokploy can still run `sh scripts/deploy/prepare-production.sh` as an optional pre-deploy command if you want earlier failure before the container starts.

If you hit issues, see `docs/deployment.md` and `instructions/troubleshooting.md`.
