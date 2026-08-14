# ProChat agent-mode progress

**Current status:** lean public release deployed and production-verified; repository-scoped post-release hygiene/hardening is complete and validated.

**Current public surface:** `/`, `/memory`, `/memory-qa`, `/workbench`, `/docs`, `/contact`, `/privacy`, `/terms`.

**Last consolidated:** 2026-08-14.

## Deployed lean release

The lean public-site migration is complete and deployed from `main`.

Primary release commits:

- `ac400118c65557b22f481eea688e27f42118d8d9` — `refactor: consolidate ProChat to lean public surface`
- `171700cf50b6d1d948456c419f3d49b726265972` — `fix: remove obsolete CI secret-source step`

Production verification for that release confirmed:

- GitHub `main` and production `/api/version` matched the full deployed SHA;
- canonical desktop routes: 8/8 pass;
- canonical mobile routes: 8/8 pass;
- intentional compatibility redirects pass;
- retired Kits / AI Workflows / Studio / Proof / Prompts routes remain unavailable;
- production worktree/release state was clean after verification.

## Completed lean cleanup

The deployed migration removed or retired:

- public BuildFlow product presentation while preserving required technical compatibility identifiers for Workbench;
- ProChat OS and AI Workflows public presentation;
- Kits catalogue plus ProKit/SaaSKit/UXKit/WaaSKit product/shopping surfaces;
- Studio, Proof, Prompts, Learn, Production Guide, Starting Point bodies;
- generated public Docs/Nextra and dynamic legacy Blog article runtime;
- Stripe checkout/webhook/subscription/portal application runtime;
- application licence administration, claim, finish/recovery, and entitlement provisioning;
- MailerLite subscription runtime;
- GitHub purchaser-entitlement provisioning;
- competing public design palettes and retired route motifs.

The owner confirmed no licences were ever sold. Active repository licence language for Memory for QA and Workbench remains intentionally preserved.

## Current final hygiene pass

Goal: remove repository/documentation residue without changing canonical public behavior unless a concrete defect is found.

Completed in this pass so far:

- verified and deleted zero-consumer `src/libs/gpt.ts`;
- verified and deleted a zero-consumer legacy Strapi request helper from `src/utils/`;
- deleted zero-consumer legacy `scripts/check-env.js` Stripe checker;
- archived retired active-position docs under `docs/archive/retired-systems/`:
  - `mailerlite-funnel.md`
  - `github-entitlements.md`
  - `builder-reference.md`
  - `analytics-implementation-summary.md`
- removed the ignored Playwright HTML report file; remaining test-result directories are empty ignored directories;
- rewrote active environment, onboarding, development, deployment, database, analytics, roadmap, implementation, repository-status, docs-index, AI, and auth guidance to match current source;
- replaced source Ory `TODO` wording with explicit deferred fail-closed messages while preserving HTTP 501/misconfigured behavior;
- current source TODO/FIXME/HACK/XXX scan: no matches.

## Authentication hardening decision

Runtime Ory session validation for internal `/admin`, project, Make, and n8n APIs is explicitly **deferred internal functionality**.

Current behavior remains fail-closed. The hygiene pass does not enable those routes.

A future implementation must add authenticated Ory session retrieval, authorization, security tests, and documentation before changing the 501/misconfigured boundary.

## Environment contract

Current active environment truth is:

- `.env.example`
- `docs-public/environment.md`

Retired Stripe, GitHub entitlement, MailerLite, Strapi, generated-Docs AI, Make/n8n integration, and Ory-admin credentials are not active runtime requirements.

## Historical documentation boundary

- `docs/archive/**` — archived product/system history
- `docs/migration/**` — migration evidence and decision history
- `docs/platform/**` — completed historical PXF implementation material unless a file explicitly says otherwise

Historical documents may contain obsolete route, product, commerce, provider, or SHA state. They are not current operational guidance.

## Branch cleanup status

- remote `design/cloudflare-motion-poc` was verified through GitHub as fully merged into `main`;
- `archive/content-heavy-site` appears local-only in Workbench source inventory and still requires local ancestry verification before safe deletion;
- this Workbench toolset does not expose a supported branch-delete operation, so branch deletion must not be guessed or force-performed.

## Final hygiene validation evidence

The final hygiene worktree passed:

1. environment documentation synchronization — PASS;
2. documentation link validation — PASS;
3. TypeScript — PASS;
4. ESLint — PASS with zero warnings;
5. design lint — PASS with the existing baseline unchanged;
6. production build — PASS, static generation 44/44;
7. security API suite — PASS 41/41 against a maintenance-off local production server;
8. focused canonical route/accessibility browser evidence — PASS 34/34;
9. source TODO/FIXME/HACK/XXX scan — no matches;
10. authoritative active legacy/reference scan — remaining matches are explicit retirement/history statements, not live runtime consumers;
11. `forbidden_all_high_risk` scan on changed active files — zero findings;
12. `forbidden_secret_material` scan on all existing changed files — zero findings.

No temporary validation runner remains.

## Definition of closeout

Repository-scoped hygiene is complete once this validated batch is committed/pushed and the worktree is confirmed clean.

The only known non-repository-cleanup limitation is branch deletion: `design/cloudflare-motion-poc` is verified merged into `main`, while `archive/content-heavy-site` still lacks safe local ancestry proof. The available guarded Workbench Git operations do not expose branch deletion, so neither branch is deleted by this run.
