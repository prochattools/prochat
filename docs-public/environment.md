# Environment

This is the single operator contract for all environment variables that ProChat actually uses.

Other docs should link here instead of duplicating the contract. The list below reflects the env values referenced in runtime code, automation routes, docs scripts, and content helpers.

## Core runtime and database

- `APP_SLUG`
- `DATABASE_URL`
- `SYSTEM_DATABASE_URL`
- `SHADOW_DATABASE_URL`
- `TENANT_DB_PASSWORD`
- `EXTERNAL_ID`
- `PORT`

These values are used by the tenant provisioning scripts, CLI helpers, and runtime startup. `APP_SLUG` determines the tenant schema (`tenant_<slug>`); the three database URLs keep runtime, provisioning, and Prisma shadow workloads separate. `TENANT_DB_PASSWORD` is required in production.
`PORT` is reserved for the local app server and should be set to `3056` in this workspace to avoid collisions with other applications.

## Site URLs and public hosts

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_STRAPI_BASE_URL`
- `NEXT_PUBLIC_STRAPI_API_TOKEN`
- `NEXT_PUBLIC_YOUTUBE_URL`
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`

`NEXT_PUBLIC_SITE_URL` is the canonical URL used for sitemap generation and canonical metadata (`scripts/generate-sitemap.ts`, `src/lib/seo/metadata.ts`). `NEXT_PUBLIC_APP_URL` is consumed by metadata and social image helpers (`src/lib/generateSocialImageUrl.ts` and other UI helpers). The Strapi helper (`src/utils/fetch.ts`) references the Strapi host and token. The YouTube URL is only used in marketing sections that expose an external video host.
For local development, `NEXT_PUBLIC_APP_URL` should point at `http://localhost:3056`.

## Auth (Ory)

ProChat runtime does not use Clerk for its own website/runtime auth. Ory is the intended direction, but runtime session validation is still TODO.

See [auth-status.md](../docs/auth-status.md) for the canonical auth state, warnings, and TODO list.

Current ProChat auth values:

- `NEXT_PUBLIC_AUTH_UI_URL`
- `NEXT_PUBLIC_ORY_PUBLIC_URL`
- `ORY_ADMIN_URL`
- `ORY_ADMIN_API_KEY`
- `ORY_PROJECT_ID`
- `ADMIN_EMAILS`
- `ADMIN_USER_IDS`

The shared ProChat auth UI should be documented against the Ory-backed auth model once that UI and validation are implemented. Middleware remains pass-through for now, and protected app flows must not assume auth enforcement until Ory session validation exists.

`ADMIN_EMAILS` and `ADMIN_USER_IDS` are comma-separated lists used to identify admin users for accessing restricted routes (`src/lib/admin.ts`). At least one must be configured for admin access to be available.

## Payments (Stripe)

- `STRIPE_MODE`
- `NEXT_PUBLIC_STRIPE_MODE`
- `STRIPE_SECRET_KEY_TEST`
- `STRIPE_SECRET_KEY_LIVE`
- `STRIPE_WEBHOOK_SECRET_TEST`
- `STRIPE_WEBHOOK_SECRET_LIVE`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE`
- `STRIPE_PRICE_PROKIT_TEST`
- `STRIPE_PRICE_PROKIT_LIVE`
- `STRIPE_PRODUCT_PROKIT_TEST`
- `STRIPE_PRODUCT_PROKIT_LIVE`
- `STRIPE_PRICE_SAASKIT_TEST`
- `STRIPE_PRICE_SAASKIT_LIVE`
- `STRIPE_PRODUCT_SAASKIT_TEST`
- `STRIPE_PRODUCT_SAASKIT_LIVE`

Stripe helpers (`src/libs/stripe-env.ts`, `src/lib/store/stripe.ts`) require mode selectors and mode-specific keys. Product/price IDs are required to identify the purchased kit and to resolve GitHub repo provisioning metadata.

## Email and messaging

- `RESEND_API_KEY`
- `RESEND_FROM` (fallback for `CONTACT_FROM_EMAIL`)
- `EMAIL_FROM` (fallback for contact route)
- `CONTACT_FROM_EMAIL`
- `CONTACT_TO_EMAIL`
- `SUPPORT_EMAIL`
- `WAITLIST_FROM_EMAIL`
- `WAITLIST_ADMIN_EMAIL`

Resend notifications, contact, and waitlist routes all rely on these keys. The route logic falls back to the `RESEND_FROM`/`EMAIL_FROM` aliases when the primary values are missing at runtime.

## GitHub App

- `GITHUB_APP_ID`
- `GITHUB_APP_PRIVATE_KEY_BASE64`
- `GITHUB_APP_INSTALLATION_ID`

The entitlement flow (`src/lib/store/github.ts`, `src/app/api/store/_lib/handle-kit-claim.ts`) reads these values to mint GitHub App JWTs and invite collaborators for ProKit/SaaSKit purchases.

## MailerLite funnel

- `MAILERLITE_API_KEY`
- `MAILERLITE_GROUP_ID`
- `MAILERLITE_API_BASE_URL`
- `MAILERLITE` (legacy fallback)

`src/app/api/mailerlite/subscribe/route.ts` requires the API key, group, and base URL to add a subscriber. The legacy `MAILERLITE` variable is only used as a fallback when `MAILERLITE_API_KEY` is missing.

## Automation (Make / n8n)

- `MAKE_API_KEY`
- `MAKE_TEAM_ID`
- `MAKE_API_URL`
- `MAKE_ORGANIZATION_ID` (optional trace)
- `N8N_API_KEY`
- `N8N_API_URL`
- `N8N_WEBHOOK_URL`
 - `SOCIAL_AUTOMATION_SECRET`

`SOCIAL_AUTOMATION_SECRET` is a private token used by internal automation scripts when publishing or managing evergreen social posts.

Make and n8n routes clone workflows, create webhooks, and persist `Project` records. Only the API key, team ID, and base URL are required in code; `MAKE_ORGANIZATION_ID` is present in `.env.example` but unused in the current routes.

## Docs pipeline

- `DOCS_STRICT`
- `DOCS_SKIP_AI`
- `DOCS_SOURCE_COMMIT`
- `DOCS_EXPORT_PRODUCT`
- `DOCS_EXPORT_PATH`
- `DOCS_EXPORT_COMMIT`
- `OPENAI_API_KEY`
- `DOCS_EXPORT_REPO_URL`
- `DOCS_EXPORT_SOURCE_LAYOUT`
- `DOCS_EXPORT_SOURCE_PATH`

The docs automation stack uses these values for strict validation, AI generation, and manifest attribution (`scripts/docs/*`). See [docs-automation.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/docs-automation.md) for the pipeline overview.
`DOCS_EXPORT_REPO_URL`, `DOCS_EXPORT_SOURCE_LAYOUT`, and `DOCS_EXPORT_SOURCE_PATH` describe where the pipeline read its source material. They are supplied by the extraction scripts before `docs:ingest` or `docs:ai-build` runs and remain relevant whenever external docs exports are synchronized.

## Analytics and helpers

- `NEXT_PUBLIC_UMAMI_SCRIPT_URL`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID`
- `NEXT_PUBLIC_YOUTUBE_URL`
- `NEXT_PUBLIC_STRAPI_BASE_URL`
- `NEXT_PUBLIC_STRAPI_API_TOKEN`

The marketing analytics helper (`src/components/UmamiAnalytics.tsx`) uses the Umami script/ID. The content helpers use the Strapi host/token and YouTube reference for embed links.

## Build and tooling flags

- `NODE_ENV`
- `CI`
- `GITHUB_ACTIONS`
- `ANALYZE`
- `NEXT_PUBLIC_STRAPI_BASE_URL`

`NODE_ENV`, `CI`, and `GITHUB_ACTIONS` are used in runtime and scripts to gate behavior (middleware, docs pipeline, bootstrap scripts). `ANALYZE` is only read by `next.config.js` when enabling bundle analysis; it is considered a build-time or debugging toggle.

## Legacy traces

- `MAILERLITE` (legacy fallback mentioned above)
These variables appear in examples or legacy scripts but are no longer actively read in the canonical runtime flows.

## Related references

- [overview.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/overview.md)
- [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md)
- [database.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/database.md)
- [integrations.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/integrations.md)
