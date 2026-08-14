# Deployment

This document covers the current lean ProChat deployment path.

## Production source

- release branch: `main`
- CI/CD workflow: `.github/workflows/main.yml`
- container/deployment platform: Dokploy
- production revision endpoint: `/api/version`

The deployed `revision` must match the intended full Git SHA from `main`.

## Required pre-deploy validation

Before a release, run the relevant repository checks:

```bash
node scripts/check-env-docs.js
node scripts/check-doc-links.js
npm run typecheck
npm run lint
npm run lint:design
npm run build
```

For security/public UI changes also run the maintained security and canonical browser evidence suites against a maintenance-off local production server.

## Database preparation

Deployment workflows may initialize/migrate tenant database state using the current `APP_SLUG`, `DATABASE_URL`, `SYSTEM_DATABASE_URL`, `SHADOW_DATABASE_URL`, and provisioning credentials.

There is no active Stripe checkout/licence deployment contract. Do not add retired Stripe/Kits secrets back to CI simply because historical Prisma models or migration docs still exist.

## Environment

Active runtime environment variables are documented in `docs-public/environment.md` and mirrored in `.env.example`.

Production metadata is injected by build/deployment:

- `PROCHAT_GIT_SHA`
- `PROCHAT_IMAGE_REF`
- `PROCHAT_BUILD_TIMESTAMP`

## Maintenance mode

`PROCHAT_MAINTENANCE_MODE` gates production requests. CI/evidence must set or account for it deliberately.

## Post-deploy verification

After rollout:

1. verify `GET /api/version` returns the expected full SHA;
2. verify the eight canonical routes at desktop and mobile widths;
3. verify intentional compatibility redirects;
4. verify retired product routes do not render retired bodies;
5. check production health/console evidence relevant to the change.

Canonical routes:

- `/`
- `/memory`
- `/memory-qa`
- `/workbench`
- `/docs`
- `/contact`
- `/privacy`
- `/terms`

## Rollback

Use normal deployment-platform rollback/redeploy behavior to restore a known-good image/SHA. Never force-push `main` as a deployment rollback mechanism.

## Retired deployment dependencies

The current deploy path does not require:

- Stripe keys/product/price/webhook secrets;
- GitHub App purchaser-entitlement credentials;
- MailerLite credentials;
- generated Docs AI credentials;
- Strapi credentials;
- Make/n8n integration credentials;
- WordPress/FluentCRM containers in this repository.

A separately approved future feature must prove a live runtime consumer before adding any such deployment dependency back.
