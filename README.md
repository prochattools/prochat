# SaaSKit Boilerplate

SaaSKit is ProChat’s commercial SaaS boilerplate. It combines the ProKit engine (auth, billing, database lifecycle, runtime gate) with a full marketing site and SaaS-ready plumbing. The package name and internal scripts still use ProKit because it is the engine.

This repo is optimized for Dokploy Super Base virtual machines using Nixpacks. The Dockerfile is optional and not the primary path.

## Docs
- `docs/README.md`
- `docs/architecture.md`
- `docs/development.md`
- `docs/database.md`
- `docs/deployment.md`
- `docs/git-workflow.md`
- `docs/optional-features.md`
- `instructions/clerk.md`
- `instructions/stripe.md`
- `instructions/troubleshooting.md`

## Versioning
The canonical release version is the git tag (for example `v1.0.0`). `PROCHAT_VERSION` in `.env.example` (and your production env) should match the tag version (`1.0.0`) for UI display.

## Deploy policy
Production deploys are tag-gated. Push to `main`, then create a release tag (for example `v1.0.0`) to trigger a production deploy. The runtime deploy gate runs provisioning + migrations automatically; do not run manual database commands in production. 
