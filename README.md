# ProKit Boilerplate

ProKit is ProChat’s **developer core boilerplate** for building SaaS apps.

It is intentionally lean: ProKit is the engine only (no marketing layer, no funnels, no SEO/blog/content system).

This repo is optimized for Dokploy + Nixpacks. The `Dockerfile` exists as an optional fallback only.

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

## Deploy Policy

Production deploys are tag-gated. Push to `main`, then create a release tag (for example `v1.0.0`) to trigger a production deploy. The runtime deploy gate runs provisioning + migrations automatically; do not run manual database commands in production.

