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

ESLint baseline at packet start: 12 errors, 7 warnings. All 12 errors were resolved by narrow source repairs (entity escaping, one reserved variable rename, indentation alignment). 7 warnings remain as visible non-fatal output; all are `import/no-anonymous-default-export` in `postcss.config.js` and Nextra `_meta.js` config files that cannot be named exports.

### Changes made

**`package.json`** — three new scripts:
- `"typecheck": "tsc --noEmit"` — TypeScript validation gate
- `"lint": "eslint ."` — ESLint gate
- `"test:evidence:ci"` — combined browser evidence gate running docs-mobile and canonical-route-smoke specs

**`tests/evidence/canonical-route-smoke.spec.ts`** — new Playwright spec covering `/`, `/memory`, `/workbench`, `/docs` at desktop (1440px) and mobile (390px); verifies HTTP < 400, visible `main`, and no horizontal document overflow.

**`tests/evidence/playwright.wave1.config.ts`** — CI-aware updates: `retries: isCI ? 1 : 0`, line reporter in CI vs HTML locally, `trace: retain-on-failure` in CI.

**`.gitignore`** — adds `/tests/evidence/playwright-report/`.

**Source ESLint repairs (six files, behavior-preserving):**
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
- `Start production server` — `sh scripts/start-production.sh &` with all required env vars; captures PID to step output
- `Wait for server readiness` — 30 × 2s poll of `http://localhost:3000/`; accepts 200/301/302/307; prints attempt/status; fails with log tail on timeout
- `Run browser evidence` — `npm run test:evidence:ci` with `WAVE1_BASE_URL=http://localhost:3000` and `CI=true`
- `Stop production server` — `if: always()`, kills captured PID
- `Upload browser failure artifacts` — `if: failure()`, uploads `tests/evidence/test-results/`, `retention-days: 7`

New steps in `build-and-deploy` job:
- `Verify production deployment` — polls `https://prochat.tools/api/health`, `https://prochat.tools/api/version`, `https://prochat.tools/docs`; requires HTTP 200 on health and docs, and revision field equal to `github.sha`; bounded to 20 × 15s = 300s; prints only safe operational fields

Workflow permission model:
- Global: `permissions: contents: read`
- `ci` job: inherits global (no secrets, no package write)
- `docs-integrity` job: inherits global
- `detect-deployment-changes` job: inherits global
- `build-and-deploy` job: overrides to `contents: read, packages: write` (scoped to image push)
- GHCR login and Dokploy secrets used only in `build-and-deploy`; never in `ci` or `docs` jobs

### CI boundaries not reproducible locally

The browser evidence suite (`npm run test:evidence:ci`) targets a locally started production build and requires a live provisioned database. On a developer machine without a local PostgreSQL instance, the server starts but redirects all routes to `/maintenance`. The browser gate must be verified in CI where the full database stack is provisioned. YAML syntax, control flow, step logic, permission model, and all static quality gates are fully verified locally.

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

- TypeScript: clean (0 errors)
- ESLint: 0 errors, 7 warnings (all `import/no-anonymous-default-export` in config files; non-fatal)
- Design governance: passed 5 rules with 39 explicit debt exemptions (unchanged from PXF-010 baseline)
- Production build: pass
- Docs validation: pass
- YAML syntax: valid (python3 yaml.safe_load)
- Browser evidence: CI-only boundary; local run blocked by absent database (documented above)

### Remaining Phase 12 work

Phase 12 accessibility and performance proof is outside PXF-016B scope:

- Automated WCAG AA contrast verification in CI (Axe/WAVE integration)
- Lighthouse performance budget enforcement in CI
- Reduced-motion coverage audit beyond docs-mobile focus-traversal evidence
- Font CLS metrics baseline

Recommended next packet: PXF-016C or Phase 12 — add Axe-core integration to the Playwright browser evidence suite to enforce WCAG AA programmatically in CI, without broadening the scope of this hardening work.
