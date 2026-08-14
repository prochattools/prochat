# Getting started

This guide covers the current lean ProChat repository. Retired Stripe/Kits checkout, MailerLite, generated Docs, and GitHub entitlement flows are not part of setup.

## Prerequisites

- Node.js 20
- npm
- PostgreSQL when exercising tenant/database workflows
- Chromium/Playwright only when running browser evidence

## Install

```bash
npm install
cp .env.example .env.local
```

Populate only the environment values needed for the workflow you are exercising. The authoritative contract is `docs-public/environment.md`.

## Development server

```bash
npm run dev
```

The default local port is `3056` unless overridden by `PORT`.

Canonical public routes:

- `/`
- `/memory`
- `/memory-qa`
- `/workbench`
- `/docs`
- `/contact`
- `/privacy`
- `/terms`

## Database workflows

The public website can be developed without exercising every tenant/database command. When database work is required:

1. configure `DATABASE_URL` and the script-specific system/shadow credentials;
2. use the repository scripts deliberately (`db:init`, migration, cleanup);
3. never run production cleanup/migration commands casually.

See `docs/database.md` and `REPO_OPERATIONS.md`.

## Auth and internal routes

Sign-in/sign-up pages use Ory browser flows through `NEXT_PUBLIC_ORY_PUBLIC_URL`.

Runtime Ory session validation for `/admin`, projects, Make, and n8n APIs is intentionally deferred. Those internal capabilities remain fail-closed with HTTP 501. Do not treat the allowlist env values as working authentication.

## Email and beta interest

Active Contact and beta-interest handlers use Resend when configured. Development mode can exercise the handlers without sending real email when `RESEND_API_KEY` is absent.

## Analytics

Umami mounts only when both `NEXT_PUBLIC_UMAMI_SCRIPT_URL` and `NEXT_PUBLIC_UMAMI_WEBSITE_ID` are configured.

## Validation

For code/config changes:

```bash
npm run typecheck
npm run lint
npm run lint:design
npm run build
```

For documentation changes:

```bash
node scripts/check-env-docs.js
node scripts/check-doc-links.js
```

Security/browser evidence requires a deliberately started maintenance-off local production server. Follow `REPO_OPERATIONS.md` rather than inventing ad-hoc production commands.
