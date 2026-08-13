# Integrations

This document summarizes external services that still have active source integration points in the current ProChat repository.

Use `docs-public/environment.md` for the environment-variable contract. This document focuses on runtime role and safety boundaries.

## Shared Auth UI + Ory

ProChat provides the shared authentication UI while Ory remains the identity/session backend.

Current behavior:

- sign-in and sign-up pages create Ory browser-flow URLs
- app-specific auth presentation is selected by the `app` query parameter
- protected/internal routes remain conservative where runtime Ory validation is still incomplete
- admin and automation routes that lack complete runtime session validation fail closed or remain informational

Key implementation points include `src/app/sign-in`, `src/app/sign-up`, `src/lib/auth-ui.ts`, `src/lib/admin.ts`, and the protected automation route groups.

## Resend

Resend is used directly by the active Contact and beta-interest/waitlist route handlers.

Current behavior:

- `/api/contact` sends user/admin contact email when the required Resend configuration is present
- `/api/waitlist` sends beta-interest confirmation/admin notifications when configured
- `/api/waiting-list` is an exact compatibility POST re-export of `/api/waitlist`

The former commerce invoice, purchase-thank-you, and licence-revocation email runtime is retired.

## Make

Make-related internal API routes remain in the repository for automation/project workflows.

The current safety boundary is important: routes that require runtime authentication return fail-closed responses until Ory session validation is implemented. They are not part of the canonical eight-route public website.

See `docs/automation-routes.md` for the current internal route inventory.

## n8n

n8n-related internal API routes remain as an alternative automation backend.

As with Make, current routes must respect the fail-closed authentication boundary and are not canonical public website surfaces.

See `docs/automation-routes.md` for the current internal route inventory.

## Umami

Umami is the active public analytics integration.

Current behavior:

- `src/app/layout.tsx` mounts the analytics component
- `src/lib/analytics/umami.ts` handles custom event tracking
- analytics is enabled only when the configured public values are present
- current privacy disclosure for Umami lives on `/privacy`

## Retired integrations

The lean-site cleanup removed application integrations that no longer have an active product/runtime role:

- Stripe checkout, webhook, billing portal, subscription, and licence provisioning runtime
- MailerLite lead-funnel subscription endpoint
- GitHub App entitlement/private-repository provisioning for retired paid Kits
- AI-backed generated public Docs automation
- WordPress/FluentCRM from this Next.js repository runtime

Do not restore these integrations to satisfy historical documentation or tests. Historical implementation details remain available in Git history.

The live `prochat.tools/wp-admin` / FluentCRM surface, if still reachable, is served outside this repository and must be retired at its separate hosting/routing origin.

## Related references

- `docs/overview.md`
- `docs/deployment.md`
- `docs-public/environment.md`
- `docs/automation-routes.md`
- `docs/product/agent-mode-progress.md`
