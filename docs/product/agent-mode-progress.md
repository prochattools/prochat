# ProChat Completion and Repository-Truth Audit Record

**Source:** `prochat`  
**Branch:** `main`  
**Audit date:** 2026-07-31  
**Reconciliation date:** 2026-08-01  
**Status:** PXF-016A reconciliation complete and validated

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

The next recommended packet is CI and release-gate hardening: explicit lint and type gates, browser evidence in CI, post-deployment health/version attestation, accessibility and performance proof, and security/runtime hardening. Legacy cleanup and design-debt reduction remain separate bounded maintenance waves.

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

Results:
- All 8 canonical route smoke tests passed: `/`, `/memory`, `/workbench`, `/docs` at desktop and mobile. Each test confirmed: HTTP < 400, final pathname matches expected path (not `/maintenance`), visible `main`, and non-empty h1.
- Docs layout tests at 1440px, 1024px, 768px: passed.
- Focus traversal and reduced-motion test: passed.
- Docs layout at 390px and 320px: failed with `tocVisible=true` (expected `false`).

The 390px/320px failures are real: the `.nextra-toc` element has a Nextra utility class `x:max-xl:hidden` that should hide it, but `getComputedStyle` returns `display: block` despite the `.docs-shell .nextra-toc { display: none !important }` media query being present in the compiled CSS. This is a genuine docs mobile layout regression where the CSS specificity/ordering is not applying the hide rule in the standalone build. The gate is correctly surfacing a real defect. This is not a PXF-016B1 scope item; it is an outstanding Phase 12 issue.

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

Outstanding Phase 12 open items surfaced by browser evidence:
- Docs mobile TOC visibility at 390px/320px: `.nextra-toc { display: none !important }` CSS rule is present in the compiled bundle but not applied by `getComputedStyle` in the standalone build. Root cause is Nextra utility class specificity (`x:max-xl:hidden`) overriding the `.docs-shell` scoped media query. Needs CSS load-order investigation or specificity increase.

Recommended next packet: fix the docs mobile TOC CSS regression (Phase 12 open item), then push the full PXF-016A + PXF-016B + PXF-016B1 commit range. After push, verify CI passes (the docs-mobile 390/320 tests will fail until the CSS regression is fixed).
