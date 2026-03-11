# Features

Use this file as a reference list of what ships in SaaSKit. Follow `docs-public/README.md` for the ProKit navigation path before diving into these details.

## Core product foundation

- Next.js App Router + TypeScript app structure
- Public marketing routes + app routes in one repository
- Health endpoint (`/api/health`)
- Global providers, theming, and shared UI utilities

## Database and runtime

- Prisma schema and migration folders
- Single database contract via `DATABASE_URL`
- Supabase Cloud Dev/Prod separation model in documentation
- Scripts for init/dev/prod/reset/verify migration flows
- Production start flow that runs migration deploy before app startup

## Authentication and billing

- Clerk sign-in/sign-up routes
- Safe Clerk wrappers and middleware protection flow
- Stripe checkout API
- Stripe billing portal API
- Stripe webhook handling for subscription lifecycle
- Subscription status API

## Marketing and conversion

- Placeholder-first marketing homepage
- Legal pages (`/tos`, `/privacy-policy`)
- Pricing section driven by config/env
- Optional processing checkout funnel route
- Success/cancel routes

## Content and growth modules

- Optional waitlist flow with Resend
- Optional WordPress blog routes and graceful fallback when unconfigured
- Sitemap generation (`/sitemap.xml`)
- SEO helper + JSON-LD utilities

## Workflow automation modules

- Optional n8n workflow clone endpoint
- Project activation/list/link APIs
- Scenario/project workspace route pieces
- Chat-by-project route

## Design system

- Tokenized color/typography setup
- Marketing layout and section component library
- App UI primitives and helpers

## What is intentionally not included by default

- tenant-schema lifecycle automation
- turnkey analytics warehouse pipelines
- built-in proprietary CMS backend

## Where to find setup instructions

- Main setup flow: `docs-public/README.md`
- Environment variables: `docs-public/env-reference.md`
- Database setup: `docs-public/database.md`
- Integrations / optional features: `docs-public/integrations.md`
- Deployment: `docs-public/deployment.md`
- Commands: `docs-private/scripts.md`
