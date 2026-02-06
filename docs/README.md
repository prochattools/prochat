# SaaSKit Docs

SaaSKit is ProChat’s commercial boilerplate built on the ProKit engine, plus a full marketing site. The package name and some internal scripts still use ProKit because it is the engine.

## Contents

- `docs/architecture.md` — repo structure, route groups, and ProKit vs SaaSKit boundary
- `docs/development.md` — local setup and workflow
- `docs/database.md` — tenant model, env contracts, and migrations
- `docs/deployment.md` — Dokploy + Nixpacks production flow
- `docs/git-workflow.md` — tag-gated releases and rollback
- `docs/optional-features.md` — what’s optional (blog/waitlist/funnel) and how to enable it
- `instructions/clerk.md` — authentication setup
- `instructions/stripe.md` — billing setup
- `instructions/troubleshooting.md` — common fixes and diagnostics

## Operating assumptions

- Primary production target is Dokploy Super Base VMs using Nixpacks.
- Dockerfile exists as an optional fallback only.
- Production deploys are tag-gated.
- Production is hands-off: provisioning and migrations run automatically via the runtime gate on deploy. Do not run manual commands in production.
