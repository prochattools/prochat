# Production lifecycle

This document describes the current production path for the lean ProChat repository.

## Source of truth

- release branch: `main`
- CI/CD entrypoint: `.github/workflows/main.yml`
- production deployment target: Dokploy/container deployment
- production revision evidence: `/api/version`

The public release must correspond to the exact full Git commit SHA deployed from `main`.

## Pre-push validation

Before committing/pushing code or config changes:

```bash
npm run typecheck
npm run lint
npm run lint:design
npm run build
```

When relevant also run:

```bash
node scripts/check-env-docs.js
node scripts/check-doc-links.js
npm run test:security-api
npm run test:evidence:ci
```

Security/browser suites require a deliberately started maintenance-off local production server and the documented base-URL environment variables.

## CI and deployment

A push to `main` runs the maintained GitHub Actions workflow. The workflow validates the codebase, builds the production container/image, and triggers the Dokploy rollout when deployment conditions are met.

Do not reintroduce retired generated-Docs, Stripe checkout, MailerLite, GitHub entitlement, or legacy product gates into the deployment path.

## Deployment metadata

The container/build pipeline supplies:

- `PROCHAT_GIT_SHA`
- `PROCHAT_IMAGE_REF`
- `PROCHAT_BUILD_TIMESTAMP`

`GET /api/version` exposes those values for release verification.

A successful production closeout requires the `revision` returned by `/api/version` to equal the full SHA of `main` that was intentionally released.

## Production route verification

After deployment verify the eight canonical routes at desktop and mobile widths:

- `/`
- `/memory`
- `/memory-qa`
- `/workbench`
- `/docs`
- `/contact`
- `/privacy`
- `/terms`

Also verify intentional compatibility redirects and that retired product bodies remain unavailable.

## Maintenance mode

`PROCHAT_MAINTENANCE_MODE` controls the maintenance gate. Evidence/production checks must account for the value deliberately; do not infer route failures from a maintenance-mode response.

## Rollback

If deployment verification fails:

1. stop additional releases;
2. identify the last known-good production SHA/image;
3. use the deployment platform's normal rollback/redeploy mechanism;
4. reverify `/api/version` and canonical routes;
5. keep Git history linear—do not force-push `main` to simulate rollback.

## External services

WordPress/FluentCRM is not owned by this Next.js runtime. A legacy external service must be retired at its separate hosting/routing origin, not by adding proxy/deletion behavior to this repository.
