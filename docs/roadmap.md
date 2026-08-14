# ProChat roadmap

Status: lean public-site roadmap complete; only explicitly deferred internal hardening remains.

Last consolidated: 2026-08-13.

## Completed public roadmap

The public ProChat site has been consolidated to exactly eight canonical routes:

- `/`
- `/memory`
- `/memory-qa`
- `/workbench`
- `/docs`
- `/contact`
- `/privacy`
- `/terms`

The production release is deployed from `main` and was verified at the exact deployed Git SHA after the lean cleanup.

Completed outcomes include:

- Memory, Memory for QA, and Workbench as the active product surface;
- lean Docs hub for Memory for QA and Workbench repositories;
- Contact and beta-interest flow;
- current Privacy and Terms pages;
- canonical sitemap/robots/SEO cleanup;
- one graphite/cobalt design-token system;
- retired Kits, ProChat OS, AI Workflows, Studio, Proof, Prompts, generated Docs/Nextra, dynamic Blog content, checkout, Stripe runtime, application licensing, MailerLite, and GitHub entitlement provisioning;
- compatibility redirects into current canonical routes;
- production desktop/mobile route verification, security tests, accessibility/browser evidence, build/type/lint/design checks, and deployment SHA verification.

## Repository hygiene roadmap

The final post-release hygiene pass is intentionally bounded to repository cleanup and documentation alignment. It must not change canonical public behavior without a concrete defect.

Current hygiene work:

1. remove verified zero-consumer helpers and stale environment guidance;
2. archive retired-system documentation that could be mistaken for active guidance;
3. align active environment, onboarding, development, analytics, deployment, roadmap, and implementation docs with current code;
4. preserve archive/migration history as historical evidence;
5. remove ignored local browser-test artifacts where tooling permits;
6. verify and clean obsolete branches only after merge evidence;
7. rerun full validation before committing/pushing the hygiene batch.

## Explicitly deferred internal hardening

Runtime Ory session validation for internal `/admin`, project, Make, and n8n routes is not part of the lean public release.

Those routes remain fail-closed with HTTP 501 or equivalent misconfigured behavior. A future roadmap item may implement authenticated Ory session retrieval and authorization, but only with a dedicated security design and tests.

This deferred work does **not** block the canonical public website.

## Closed / not on roadmap

The following are not active roadmap items unless explicitly re-approved:

- public Kits or paid-kit commerce;
- Stripe checkout/webhook/subscription runtime;
- application licence management or entitlement provisioning;
- MailerLite funnel integration;
- GitHub App purchaser provisioning;
- generated public Docs/Nextra pipeline;
- public ProChat OS, AI Workflows, Studio, Proof, or Prompt products;
- BuildFlow as a public product identity;
- WordPress/FluentCRM inside this Next.js runtime.

Historical plans remain in `docs/archive/**` and `docs/migration/**` for evidence only.

## Release gate for future roadmap work

Any new roadmap item that changes public behavior must define:

- current-source evidence;
- exact route/API/data scope;
- security/privacy impact;
- migration/rollback behavior where needed;
- TypeScript, ESLint, design-lint, build, and relevant security/browser evidence;
- production SHA and route verification after deployment.
