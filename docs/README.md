# ProChat Docs (built on the ProKit engine)

ProKit is the core engine owned by ProChat (Steve Westhoek, info@prochat.tools). ProChat sells three kits powered by this engine: ProKit (bare engine), SaaSKit (ProKit + marketing layer), and WaaSKit (service/agency flavor). This repo documents the bare ProKit engine.

It is intentionally lean: ProKit ships only the engine primitives (auth, billing, database, deploy gate). No marketing layer, no funnels, no SEO/blog/content system.

## Contents

- `docs/architecture.md` — repo structure and boundaries (what ProKit is / is not)
- `docs/development.md` — local setup and workflow
- `docs/database.md` — tenant model, env contracts, and migrations
- `docs/deployment.md` — Dokploy + Nixpacks production flow
- `docs/git-workflow.md` — tag-gated releases and rollback
- `docs/optional-features.md` — what’s optional and how to enable it
- `instructions/clerk.md` — authentication setup
- `instructions/stripe.md` — billing setup
- `instructions/troubleshooting.md` — common fixes and diagnostics

## Operating Assumptions

- Primary production target is Dokploy using Nixpacks.
- Dockerfile exists as an optional fallback only.
- Production deploys are tag-gated.
- Production is hands-off: provisioning and migrations run automatically via the runtime deploy gate on deploy. Do not run manual commands in production.
- Database model is fixed: one shared Supabase/Postgres database per environment, schema-per-app isolation only (no per-app databases).
