# Integrations

This document summarizes the external services that ProChat actively integrates with in the current codebase.

Use [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/environment.md) for the env contract. This document focuses on behavior and system role.

## Clerk

Clerk is the primary auth layer for production.

Current behavior:

- middleware enables Clerk when keys are present
- production throws if Clerk is required but missing
- local and CI flows can run with Clerk disabled or in mock mode

Key implementation points:

- auth gating lives in [middleware.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/middleware.ts)
- helper wrappers exist for safe Clerk usage on client and server

## Stripe

Stripe powers checkout, subscription updates, and billing portal flows.

Current behavior:

- checkout session creation through `/api/stripe/create-checkout`
- webhook verification through `/api/webhook/stripe`
- customer portal creation through `/api/stripe/create-portal`
- mode-based configuration through `STRIPE_MODE` and `NEXT_PUBLIC_STRIPE_MODE`

Implementation notes:

- Stripe env resolution lives in [stripe-env.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/libs/stripe-env.ts)
- subscription state is stored in Prisma

## Resend

Resend powers outbound email for:

- contact flow
- waitlist and admin notifications
- thank-you and invoice email flows

Implementation points:

- route handlers under `src/app/api/contact` and `src/app/api/waitlist`
- shared service in `src/libs/resend.ts`

## GitHub App entitlements

ProChat includes a GitHub App-based entitlement flow for private repository access.

Current behavior:

- creates GitHub App JWTs
- exchanges installation tokens
- discovers repo installations when needed
- invites collaborators to product repositories

Implementation point:

- [github.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/lib/store/github.ts)

This is a real integration and should be documented as such.

See [github-entitlements.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/github-entitlements.md) for the purchase-to-repository access flow.

## MailerLite

MailerLite powers the funnel and lead-magnet subscription endpoint.

Current behavior:

- validates email input
- subscribes contacts to a MailerLite group
- handles already-subscribed responses gracefully

Implementation point:

- [route.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/api/mailerlite/subscribe/route.ts)

See [mailerlite-funnel.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/mailerlite-funnel.md) for the route behavior and operator notes.

## Make

Make is used for scenario provisioning and activation.

Current behavior in API routes:

- list scenarios
- clone scenario templates
- create hooks and wire credentials
- activate and deactivate scenarios
- persist resulting project metadata

Relevant route group:

- `src/app/api/(make)/...`

See [automation-routes.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/automation-routes.md) for the route inventory.

## n8n

n8n is used as an alternative automation backend.

Current behavior:

- clone workflows
- create or reuse credentials
- activate workflows
- return webhook URLs for project execution

Relevant route group:

- `src/app/api/(n8n)/...`

See [automation-routes.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/automation-routes.md) for the route inventory.

## Umami

Umami is the current public analytics integration.

Current behavior:

- loads a client-side analytics script when env values are present
- uses public script URL and website ID configuration

Implementation point:

- [UmamiAnalytics.tsx](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/components/UmamiAnalytics.tsx)

## Docs automation

The docs pipeline also depends on external AI services when enabled.

Key behavior:

- OpenAI-backed AI doc generation is used when `OPENAI_API_KEY` is available
- otherwise the docs pipeline falls back to structured templates

Low-level reference:

- [scripts/docs/README.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/docs/README.md)

## Related references

- [overview.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/overview.md)
- [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/environment.md)
