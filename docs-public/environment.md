# Environment variables

This document is the active environment contract for the lean ProChat runtime. It mirrors `.env.example` and intentionally excludes retired Stripe, GitHub entitlement, MailerLite, generated-Docs, Strapi, Make/n8n, and Ory-admin variables.

## Application and tenant

- `APP_SLUG` — tenant/application slug used by database provisioning scripts.
- `EXTERNAL_ID` — optional external tenant identifier consumed by tenant initialization.
- `PORT` — local server port; defaults to `3056` in development helpers.
- `NODE_ENV` — standard Node environment selector.

## Database

- `DATABASE_URL` — runtime tenant-scoped Prisma connection.
- `SYSTEM_DATABASE_URL` — provisioning, migration, and cleanup connection.
- `SHADOW_DATABASE_URL` — Prisma migrate-dev shadow database connection.
- `TENANT_DB_PASSWORD` — password used when provisioning/updating a tenant role.

The runtime does not create a production database implicitly. Provisioning/migration commands must use the documented database workflow and production credentials deliberately.

## Shared auth UI and Ory browser flows

- `NEXT_PUBLIC_AUTH_UI_URL` — public URL for the shared ProChat auth UI.
- `NEXT_PUBLIC_ORY_PUBLIC_URL` — public Ory endpoint used to create browser sign-in/sign-up flows.

Runtime Ory session validation for internal `/admin`, project, Make, and n8n APIs is intentionally deferred. Those internal capabilities remain fail-closed with HTTP 501 and do not currently consume Ory admin credentials.

## Admin allowlist metadata

- `ADMIN_EMAILS` — comma-separated admin email allowlist.
- `ADMIN_USER_IDS` — comma-separated admin user-ID allowlist.

These values do not bypass the deferred runtime session boundary. `/admin` remains fail-closed until authenticated Ory session retrieval is implemented.

## Public site and maintenance mode

- `NEXT_PUBLIC_APP_URL` — application base URL used by URL/image helpers.
- `NEXT_PUBLIC_SITE_URL` — canonical site URL; preferred by sitemap/site URL helpers when present.
- `PROCHAT_MAINTENANCE_MODE` — maintenance gate. Production deployment must set this deliberately; local validation commonly uses `0`.

## Analytics

- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` — Umami script URL.
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` — Umami website identifier.

If either Umami value is missing, the analytics component does not mount the tracking script.

## Contact and beta-interest email

- `RESEND_API_KEY` — Resend API key used by active Contact and beta-interest handlers.
- `RESEND_FROM` — preferred sender fallback.
- `EMAIL_FROM` — secondary sender fallback.
- `CONTACT_FROM_EMAIL` — Contact-specific sender override.
- `SUPPORT_EMAIL` — preferred support/admin destination fallback.
- `CONTACT_TO_EMAIL` — Contact-specific destination override.
- `WAITLIST_FROM_EMAIL` — beta-interest sender override.
- `WAITLIST_ADMIN_EMAIL` — beta-interest admin destination override.

In development, Contact/beta-interest handlers can return preview behavior when Resend is not configured. Production email delivery requires the appropriate Resend/sender configuration.

## Internal social automation

- `SOCIAL_AUTOMATION_SECRET` — shared secret required by the internal `/api/social/next` and `/api/social/mark-posted` endpoints.

These endpoints are internal automation surfaces, not canonical public website routes.

## Deployment metadata

The following values are normally injected by CI/container build rather than hand-configured:

- `PROCHAT_GIT_SHA`
- `PROCHAT_IMAGE_REF`
- `PROCHAT_BUILD_TIMESTAMP`

`/api/version` exposes this deployment metadata for release verification.

## Test and evidence helpers

- `WAVE1_BASE_URL` — base URL used by canonical browser evidence/performance tooling.
- `PERF_DIAGNOSTIC_MODE` — enables focused performance diagnostics when set to `1`.
- `PERF_DIAGNOSTIC_ROUTES` — optional comma-separated diagnostic route subset.

## Retired variables

Do not add Stripe checkout/webhook/product variables, GitHub entitlement/provisioning credentials, MailerLite credentials, Strapi credentials, Make/n8n integration credentials, generated-Docs AI keys, or Ory admin credentials back to the active environment contract unless a separately approved feature reintroduces a verified runtime consumer.
