# ProChat Completion and Repository-Truth Audit Record

**Source:** `prochat`  
**Branch:** `main`  
**Audit date:** 2026-07-31  
**Reconciliation date:** 2026-08-01  
**Status:** PXF-016B2 CI and browser-evidence hardening complete and validated; ready for push verification

## Purpose

This file preserves the useful evidence from the completed repository, roadmap, implementation, and global-design audit. It is no longer an active resume prompt for the closed audit run.

## Verified completion evidence

- The approved public-platform implementation is complete and deployed.
- The eight canonical visual routes are `/`, `/memory`, `/memory-qa`, `/workbench`, `/docs`, `/contact`, `/privacy`, and `/terms`.
- The canonical screenshot audit passed 40/40 route-and-viewport combinations after the `/docs` mobile overflow repair.
- Focus traversal and reduced-motion evidence were added for the docs mobile experience.
- The public design system is centralized through the root layout, `AppChrome`, the canonical public shell, the docs-specific shell, shared foundation styles, and design-governance linting.
- The canonical design is complete for the approved scope; docs, protected, no-shared-shell, and temporary legacy routes remain deliberate separate classifications.
- GitHub Actions Main workflow #45 completed successfully and deployed `ecc0fdfe8dda0e285c7aea8e3aaded97ef0003ba`.
- Production `/api/version` was directly verified at `ecc0fdfe8dda0e285c7aea8e3aaded97ef0003ba` after that deployment.

## Durable validation anchors

```yaml
validated_program_head: 91436457e4d3aa8a5d9782ff671ce49e10d7ef07
validated_docs_mobile_head: ada06665f5944fc988f4dad4a5fed47cee471d8b
validated_closeout_head: 29854de09b04792c377d0bba7528297acb14c155
validated_production_baseline_head: 91436457e4d3aa8a5d9782ff671ce49e10d7ef07
last_verified_production_head: ecc0fdfe8dda0e285c7aea8e3aaded97ef0003ba
last_verified_production_at: 2026-07-31T16:29:45Z
deployment_observation_source: Main workflow #45 plus direct production /api/version verification
```

The validation anchors are immutable evidence. The production fields are dated operational observations and do not claim to track the live repository HEAD.

## Truthful program status

- Phase 11 remains `PARTIAL`: redirects are active, while legacy component and style removal is deferred.
- Phase 12 remains `PARTIAL`: responsive, focus, reduced-motion, metadata, analytics, and 40/40 viewport evidence pass, while formal WCAG 2.2 AA and measured performance proof remain deferred.
- Phase 13 remains `ONGOING`: continuous governance and bounded maintenance.
- Phases 14 and 15 are complete.
- No release-blocking public-design defect is known.

## PXF-016A reconciliation scope

The reconciliation packet updates repository truth without redesigning the product:

- separate immutable validation anchors from dated deployment observations;
- record the completed closeout push and deployed `ecc0fdf` observation;
- reconcile Phase 12 to one evidence-backed partial status;
- correct `/memory-qa` and distinguish active routes from future `/philosophy` and `/about` candidates;
- align current and future shell-route constants;
- update README roadmap wording from 13 to 15 phases;
- preserve this file as a completed audit record rather than a stale active-run handoff.

## Remaining work after reconciliation

CI and release-gate hardening was completed in PXF-016B and PXF-016B1. Browser-evidence diagnosis and readiness correction were completed in PXF-016B2. The next operation is to push the completed PXF-016A/B/B1/B2 chain, observe GitHub Actions, and verify the production deployment. After that push is confirmed, the next recommended packet is PXF-016C accessibility proof: bounded `@axe-core/playwright` integration and canonical-route WCAG checks, without yet claiming full manual WCAG 2.2 AA certification. Legacy cleanup and design-debt reduction remain separate bounded maintenance waves.

## Validation evidence

- Repository-truth assertions: passed.
- Route-array assertions: passed.
- Documentation coverage check: completed with the existing non-blocking recency warning.
- Public docs runtime check: passed for 30 public routes and 30 static parameters.
- Docs validation: passed.
- Design-system governance: passed 5 rules with 39 controlled exemptions.
- TypeScript `--noEmit`: passed.
- Security scan over all changed paths: no findings.
- Exact six-file diff review: passed.
- Generated artifacts: none.
- Commit scope: explicit paths only; no push in this packet.



## PXF-016B CI and release-gate hardening

**Started:** 2026-08-01  
**Completed:** 2026-08-01  
**Status:** complete — committed, not pushed

### Discovery

At packet start, required workflow gates were: database provisioning, Prisma generation and migration, design-system governance, production build, documentation integrity, deployment-change classification, image build/push, and Dokploy trigger acceptance.

Gates not enforced in CI before this packet:

- TypeScript `--noEmit` validation;
- repository ESLint configuration;
- committed docs-mobile Playwright evidence;
- representative canonical-route smoke checks;
- post-deployment `/api/health`, `/api/version`, expected-revision, and `/docs` attestation.

ESLint baseline at packet start: 12 errors, 7 warnings. All 12 errors were resolved by narrow source repairs (entity escaping, one reserved variable rename, indentation alignment). 7 warnings were in `postcss.config.js` and six Nextra `_meta.js` files; all were resolved in PXF-016B1 by assigning each object to a named constant before export. Final ESLint result: 0 errors, 0 warnings.

### Changes made

**`package.json`** — three new scripts:
- `"typecheck": "tsc --noEmit"` — TypeScript validation gate
- `"lint": "eslint . --max-warnings=0"` — ESLint gate (zero warnings enforced)
- `"test:evidence:ci"` — combined browser evidence gate running docs-mobile and canonical-route-smoke specs

**`tests/evidence/canonical-route-smoke.spec.ts`** — new Playwright spec covering `/`, `/memory`, `/workbench`, `/docs` at desktop (1440px) and mobile (390px); verifies HTTP < 400, final URL pathname equals expected path (rejects `/maintenance` and other blocked redirects), visible `main`, non-empty h1 (length > 5 chars), and no horizontal document overflow.

**`tests/evidence/playwright.wave1.config.ts`** — CI-aware updates: `retries: isCI ? 1 : 0`, line reporter in CI vs HTML locally, `trace: retain-on-failure` in CI.

**`.gitignore`** — adds `/tests/evidence/playwright-report/`.

**Source ESLint repairs (seven files, behavior-preserving):**
- `src/app/(marketing)/privacy/page.tsx` — two apostrophe entity escapes
- `src/app/(marketing)/terms/page.tsx` — two apostrophe entity escapes
- `src/app/waiting-list/WaitlistPageMarkup.tsx` — one apostrophe entity escape
- `src/components/email-templates/WaitlistConfirmationEmail.tsx` — one apostrophe entity escape
- `src/components/login-payment.tsx` — one apostrophe entity escape
- `src/components/content/MDXRenderer.tsx` — reserved variable `module` renamed to `evaluatedModule`
- `src/lib/store/github.ts` — indentation alignment (mixed spaces→tabs)

**`.github/workflows/main.yml`** — extended with:

New required steps in `ci` job (after migrations, before existing design lint):
- `Typecheck` — `npm run typecheck`
- `Lint` — `npm run lint`

Existing step renamed from `Lint design-system governance` (unchanged).

New steps in `ci` job after build:
- `Install Playwright browser` — `npx playwright install chromium --with-deps`
- `Start production server` — `sh scripts/start-production.sh &` with all required env vars including `PROCHAT_MAINTENANCE_MODE=0`; stdout/stderr captured to `${RUNNER_TEMP}/prochat-server.log`; wrapper PID and log path captured to step outputs
- `Wait for server readiness` — 30 × 2s poll of `http://localhost:3000/api/health` with `--connect-timeout 2 --max-time 5`; requires exactly HTTP 200; prints attempt/status; on failure, tails `${RUNNER_TEMP}/prochat-server.log` (no journalctl)
- `Run browser evidence` — `npm run test:evidence:ci` with `WAVE1_BASE_URL=http://localhost:3000` and `CI=true`
- `Stop production server` — `if: always()`; `pkill -TERM -P $WRAPPER_PID` to terminate child processes first, then `kill -TERM $WRAPPER_PID`; `sleep 3`; escalates to `SIGKILL` if still running; does not kill all Node processes
- `Upload browser failure artifacts` — `if: failure()`, uploads `tests/evidence/test-results/` and `${steps.server.outputs.server_log}`, `retention-days: 7`

New steps in `build-and-deploy` job:
- `Verify production deployment` — `timeout-minutes: 6` hard outer limit; polls `https://prochat.tools/api/health`, `https://prochat.tools/api/version`, `https://prochat.tools/docs` with `--connect-timeout 2 --max-time 5` on each request; captures `/api/version` HTTP status separately from body; requires health=200, version=200, docs=200, and revision field equal to `github.sha`; bounded to 12 × 10s interval; truthful maximum: (12-1)×10 + 12×3×5 = 110+180 = 290s; no sleep after final attempt; prints only safe operational fields (attempt, statuses, observed/expected revision)

Workflow permission model:
- Global: `permissions: contents: read`
- `ci` job: inherits global (no secrets, no package write)
- `docs-integrity` job: inherits global
- `detect-deployment-changes` job: inherits global
- `build-and-deploy` job: overrides to `contents: read, packages: write` (scoped to image push)
- GHCR login and Dokploy secrets used only in `build-and-deploy`; never in `ci` or `docs` jobs

### CI boundaries and local browser evidence

The browser evidence suite (`npm run test:evidence:ci`) targets a locally started production build and requires both a live provisioned database and `PROCHAT_MAINTENANCE_MODE=0` (the middleware defaults maintenance mode to `1`). PXF-016B1 verified the full browser suite locally using a disposable Docker PostgreSQL 16 container (`postgres:16` on port 5433) with the same CI tenant provisioning and migration commands.

Results (PXF-016B1, server misconfigured — static assets not served):
- All 8 canonical route smoke tests passed: `/`, `/memory`, `/workbench`, `/docs` at desktop and mobile. Each test confirmed: HTTP < 400, final pathname matches expected path (not `/maintenance`), visible `main`, and non-empty h1.
- Docs layout tests at 1440px, 1024px, 768px: passed.
- Focus traversal and reduced-motion test: passed.
- Docs layout at 390px and 320px: failed with `tocVisible=true` (expected `false`).

The 390px/320px failures were a **test false positive** caused by starting the standalone server directly (`node .next/standalone/server.js`) without first copying static assets. When started this way, `_next/static/css/*` returns HTTP 404 and no CSS is applied; the TOC element had `display: block` by browser default only. The failures did not reflect a real layout regression.

### Security-gate classification

Implemented:
- Least-privilege workflow permissions (global `contents: read`, `packages: write` scoped to deploy job)
- Safe secret handling (secrets referenced only in `build-and-deploy`, never printed)
- Bounded post-deployment attestation (300s max, revision equality required)
- Existing changed-path security scan preserved

Deferred with reasons:
- Dependency vulnerability enforcement: deferred until current dependency baseline is reviewed and an acceptable severity policy is defined
- CodeQL: deferred to a dedicated repository security packet or organization-level setup
- Secret scanning: deferred to repository or organization security policy
- Container image scanning and SBOM/provenance: deferred to a supply-chain hardening packet
- No broad `continue-on-error` security steps added

### Validation results

PXF-016B as committed:
- TypeScript: clean (0 errors)
- ESLint: 0 errors, 7 warnings (all `import/no-anonymous-default-export`; non-fatal at time of commit)
- Design governance: passed 5 rules with 39 explicit debt exemptions (unchanged from PXF-010 baseline)
- Production build: pass
- Docs validation: pass
- YAML syntax: valid (python3 yaml.safe_load)
- Browser evidence: CI-only boundary at time of commit (documented as limitation)

PXF-016B1 corrected results (after pre-push correctness pass):
- TypeScript: clean (0 errors)
- ESLint: 0 errors, **0 warnings** (`--max-warnings=0` enforced; all 7 anonymous-export warnings resolved)
- Design governance: passed 5 rules with 39 explicit debt exemptions (unchanged)
- Production build: pass
- Docs validation: pass
- YAML syntax: valid (python3 yaml.safe_load)
- Browser evidence (local with Docker PostgreSQL 16): 12/14 pass; 2 failures are real docs mobile TOC visibility regression (390px, 320px) that is a Phase 12 open item
- Workflow YAML static analysis: all security, permission, and timeout properties verified (see Changes section)

### Remaining Phase 12 work

Phase 12 accessibility and performance proof is outside PXF-016B scope:

- Automated WCAG AA contrast verification in CI (Axe/WAVE integration)
- Lighthouse performance budget enforcement in CI
- Reduced-motion coverage audit beyond docs-mobile focus-traversal evidence
- Font CLS metrics baseline

No CSS regression is outstanding. The docs mobile TOC is correctly hidden at 390px and 320px when the server is started correctly.

---

## PXF-016B2 Browser evidence diagnosis and readiness-bound correction

**Started:** 2026-08-01  
**Completed:** 2026-08-01  
**Status:** complete — committed, not pushed

### Task 1 — TOC diagnosis

**Root cause: test false positive.**

The PXF-016B1 failures at 390px and 320px were not a CSS regression. They were caused by starting the standalone server directly (`node .next/standalone/server.js`) from the repo root without first syncing the static assets directory. In that state `_next/static/css/*` returns HTTP 404; no CSS was applied; the TOC had `display: block` from browser-default only.

**DOM evidence at 390px (correctly started server):**

| Property | Value |
|---|---|
| `.nextra-toc` count | 1 |
| classes | `nextra-toc x:order-last x:max-xl:hidden x:w-64 x:shrink-0 x:print:hidden` |
| `isInsideDocsShell` | true |
| `getComputedStyle.display` | `none` |
| `visibility` | `visible` |
| `checkVisibility()` | `false` |
| `getBoundingClientRect().width` | `0` |
| `getBoundingClientRect().height` | `0` |
| `getClientRects().length` | `0` |
| Playwright `isVisible()` | `false` |
| Playwright `.nextra-toc:visible` count | `0` |
| `documentScrollWidth` | `390` |
| `viewportWidth` | `390` |

Same evidence at 320px: `display: none`, `checkVisibility: false`, `rectWidth: 0`, Playwright `isVisible: false`.

**Ancestor chain at 390px (all visible, no hidden ancestor):**

| Ancestor | Classes | display | width |
|---|---|---|---|
| parent `<div>` | `x:mx-auto x:flex x:max-w-(--nextra-content-width)` | block | 390 |
| `<div>` | `flex-1` | block | 390 |
| `<div>` | `docs-shell-inner flex flex-1 flex-col` | flex | 390 |
| `<div>` | `docs-shell flex min-h-screen flex-col` | flex | 390 |

The `.docs-shell .nextra-toc { display: none !important }` CSS rule inside `@media (max-width: 767px)` wins correctly. No CSS cascade defect exists.

**Desktop evidence:**

| Width | display | rectWidth | inDocsShell | `:visible` count |
|---|---|---|---|---|
| 768px | block | 256 | true | 1 |
| 1024px | block | 256 | true | 1 |
| 1440px | block | 256 | true | 1 |

**CSS cascade evidence:**

- Our `docs.css` compiled into `8c288fcb2f0e3fd9.css` is the 5th and last stylesheet loaded on `/docs`.
- It is unlayered (no `@layer`). The Nextra Tailwind v4 CSS (`d1f4ec54d69f931a.css`) uses `@layer v4-utilities`.
- Unlayered rules have higher cascade priority than layered rules.
- The compiled rule is `@media (max-width:767px){.docs-shell .nextra-sidebar,.docs-shell .nextra-sidebar-container,.docs-shell .nextra-toc{display:none!important}` — verified present in the bundle.
- When CSS is served, the rule wins. The `x:max-xl:hidden` Nextra utility class only sets `::before` content in the compiled bundle; it does not set `display:none` for this element.

**Investigation finding:** the previous session's diagnosis incorrectly attributed the failure to CSS specificity conflict between `x:max-xl:hidden` and the `.docs-shell` scoped rule. That was not established by rendered evidence. The actual root cause was static assets not being served.

### Task 2 — Test correction (Case A)

The `tocVisible: !!toc && getComputedStyle(toc).display !== 'none'` assertion was replaced with Playwright visibility semantics:

```ts
// Mobile: no TOC visibly rendered
await expect(page.locator('.nextra-toc:visible')).toHaveCount(0)

// Desktop: intended TOC visible and within viewport
await expect(page.locator('.nextra-toc').first()).toBeVisible()
expect(layout.tocRight).toBeLessThanOrEqual(viewport.width)
```

Playwright `:visible` checks non-zero geometry and the full ancestor chain — it cannot be fooled by a server that fails to deliver stylesheets.

No CSS changes were made.

### Task 3 — Readiness loop correction

Updated `Wait for server readiness` step in `.github/workflows/main.yml`:

| Property | Before | After |
|---|---|---|
| `MAX_ATTEMPTS` | 30 | 20 |
| `INTERVAL` | 2 | 2 |
| `CONNECT_TIMEOUT` | 2 | 2 |
| `REQUEST_TIMEOUT` | 5 | 5 |
| Sleep after final attempt | yes | no |
| `timeout-minutes` on step | absent | 3 |
| Failure message | reports sleep budget only (60s) | reports attempt count and strict max (~138s) |
| curl failure handling | `\|\| echo "000"` | `2>/dev/null) \|\| STATUS="000"` |

Strict calculated maximum: `20 × 5s requests + 19 × 2s sleeps = 138s`. The step `timeout-minutes: 3` (180s) is the hard outer boundary.

Previous incorrect documentation stated "60-second bound" (`MAX_ATTEMPTS × INTERVAL = 30 × 2`), which omitted the request time. The strict worst case was `30 × 5 + 30 × 2 = 210s`. The corrected loop has a strict maximum of 138s.

### Task 4 — Server cleanup wording

The `Stop production server` step uses `pkill -TERM -P $WRAPPER_PID` to terminate direct children of the wrapper shell, then `kill -TERM $WRAPPER_PID` for the wrapper itself. The existing comment "Terminate direct children of the wrapper shell first" is accurate. No change was needed — this is not process-group cleanup.

### Validation results

PXF-016B2:
- TypeScript: clean (0 errors)
- ESLint: 0 errors, 0 warnings
- Design governance: passed 5 rules with 39 explicit debt exemptions (unchanged)
- Production build: pass
- Docs validation: pass
- YAML syntax: valid (python3 yaml.safe_load)
- Browser evidence (local with Docker PostgreSQL 16, correctly started server):
  - 1440px: pass
  - 1024px: pass
  - 768px: pass
  - 390px: pass (TOC hidden, `display: none`, `checkVisibility: false`, Playwright `:visible` = 0)
  - 320px: pass (same as 390px)
  - Focus traversal: pass
  - Reduced-motion: pass
  - All 8 canonical route smoke tests: pass
  - Total: 14/14 pass
- Security scan: no findings on changed paths
- No generated artifacts remain

### Files changed

- `tests/evidence/docs-mobile-layout.spec.ts` — replaced `tocVisible` computed-display check with Playwright visibility assertion; added desktop `isVisible()` assertion
- `.github/workflows/main.yml` — readiness step: `MAX_ATTEMPTS` 30→20, no sleep after final attempt, `timeout-minutes: 3`, corrected failure message, explicit curl failure handling

Phase 12 remains `PARTIAL`. No CSS defect was found. The readiness bound correction is a documentation and safety improvement only.
