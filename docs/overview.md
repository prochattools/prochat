# Documentation overview

This repository keeps active operating guidance separate from historical migration/archive evidence.

## Current active guidance

Start here for present-day ProChat behavior:

- `docs/repo-status.md` — current repository/product/runtime state
- `docs/roadmap.md` — completed public roadmap plus explicitly deferred internal hardening
- `docs/implementation-plan.md` — current implementation/hygiene acceptance criteria
- `docs/getting-started.md` — local setup and validation
- `docs/development.md` — day-to-day contributor workflow
- `docs/deployment.md` — deployment and production verification
- `docs/production-lifecycle.md` — release lifecycle and rollback boundary
- `docs/database.md` — active database/runtime notes
- `docs/auth-status.md` — Ory browser-flow status and deferred fail-closed internal authorization
- `docs/integrations.md` — current external integrations
- `docs/analytics-audit.md` — current Umami analytics boundary
- `docs/ai-guidelines.md` — current AI/automation repository safety rules
- `docs/content-platform.md` — current public content/SEO contract
- `docs/docs-automation.md` — explicit retirement record for the generated Docs system
- `docs/product/agent-mode-progress.md` — latest operational handoff/current state
- `docs-public/environment.md` — active environment-variable contract

## Canonical public website

The public site is intentionally limited to:

- `/`
- `/memory`
- `/memory-qa`
- `/workbench`
- `/docs`
- `/contact`
- `/privacy`
- `/terms`

Memory, Memory for QA, and Workbench are the current product identities.

## Historical evidence

Historical plans and superseded implementation material belong in:

- `docs/archive/**`
- `docs/migration/**`
- `docs/platform/**` when explicitly tied to completed historical PXF work
- Git history

Documents in those areas may mention retired ProChat OS, Kits, BuildFlow-as-product, Stripe, MailerLite, GitHub entitlement provisioning, older analytics, or older route strategies. They are evidence, not current product/runtime guidance.

The final post-release hygiene pass additionally archives several retired system documents under:

- `docs/archive/retired-systems/mailerlite-funnel.md`
- `docs/archive/retired-systems/github-entitlements.md`
- `docs/archive/retired-systems/builder-reference.md`
- `docs/archive/retired-systems/analytics-implementation-summary.md`

## Compatibility wording

BuildFlow may remain only as a technical/internal compatibility identifier required by Workbench contracts. Historical redirects may still mention retired product names in tests/config so inbound links resolve safely.

## Documentation rule

If an active document disagrees with current source, current source wins and the document should be corrected in the same change. Retired systems must not remain in active setup/environment/deployment guidance merely because history exists elsewhere.
