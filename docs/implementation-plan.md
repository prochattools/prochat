# ProChat implementation plan

Status: lean public implementation complete and deployed; final repository hygiene/hardening pass in progress.

Last consolidated: 2026-08-13.

## Completed implementation

The deployed public implementation consists of exactly eight canonical routes:

- `/`
- `/memory`
- `/memory-qa`
- `/workbench`
- `/docs`
- `/contact`
- `/privacy`
- `/terms`

The completed lean migration removed retired product/catalog/commerce/content systems and consolidated the active design/runtime boundaries.

Major completed implementation areas:

- canonical route shell and route-specific body evidence;
- Memory, Memory for QA, and Workbench product pages;
- lean Docs repository hub;
- Contact and beta-interest handling;
- current legal pages;
- root sitemap and robots policy;
- centralized graphite/cobalt design tokens across public and active admin surfaces;
- removal of generated Docs/Nextra, dynamic legacy Blog content, Prompts/Learn/Production Guide, Kits, ProChat OS, AI Workflows, Studio, Proof, checkout, Stripe runtime, application licensing, MailerLite, GitHub entitlement provisioning, and other verified zero-consumer legacy code;
- compatibility redirects from historical URLs into current canonical routes;
- security/browser/accessibility evidence for current public routes and retired-route behavior;
- CI/Dokploy deployment and exact production SHA verification.

## Current final hygiene implementation

The post-release hygiene pass is deliberately non-product-changing. It may update repository code/docs only where current-source evidence proves cleanup or documentation drift.

### H1 — orphan code and local artifacts

- delete zero-consumer legacy helpers;
- keep dependencies that still have active consumers;
- remove ignored Playwright reports/test-result artifacts where available tooling permits;
- do not alter canonical public behavior.

### H2 — documentation alignment

Active documentation must match current source and must not instruct contributors to use retired Stripe, MailerLite, GitHub entitlement, Kits, generated Docs, Strapi, Make/n8n integration credentials, or old product flows.

Historical implementation documents may remain under `docs/archive/**` and `docs/migration/**`, clearly treated as history rather than current guidance.

### H3 — auth boundary

Decision: **defer runtime Ory session authorization for internal routes**.

The following remain fail-closed pending a separate security implementation:

- `/admin/**`
- project APIs
- Make APIs
- n8n APIs
- related internal scenario/active/link routes covered by security tests

No hygiene change may replace 501/misconfigured behavior with unauthenticated access.

### H4 — branches

Non-main branches may be deleted only when merge evidence is available and the branch is not intentionally retained. Do not guess branch ancestry or force-delete.

## Validation gate

Before this hygiene pass may be committed/pushed:

```bash
node scripts/check-env-docs.js
node scripts/check-doc-links.js
npm run typecheck
npm run lint
npm run lint:design
npm run build
```

Also run:

- security API tests;
- focused canonical browser smoke/evidence sufficient to prove public behavior did not regress;
- final source/reference scan for stale active integrations/products;
- high-risk and secret-material scans on changed active files;
- final diff/status review.

## Commit/push gate

Commit only after all required validation passes. Stage exact paths only. Do not include ignored browser artifacts or unrelated work.

After push/deployment where applicable:

- verify production `/api/version` equals the intended full commit SHA;
- verify the eight canonical routes;
- verify key compatibility redirects and retired-route behavior;
- require a clean local worktree.

## Definition of done

This repository can be called fully closed out when:

1. active code/docs contain no known stale retired-runtime guidance;
2. zero-consumer cleanup is complete for the audited scope;
3. current status/roadmap/implementation docs agree;
4. deferred Ory functionality is explicitly documented and remains fail-closed;
5. branch cleanup is either completed with evidence or reported as the only external/manual limitation;
6. validation passes;
7. the hygiene commit is pushed and the worktree is clean.
