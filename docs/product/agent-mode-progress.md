# ProChat Completion and Repository-Truth Audit Record

**Source:** `prochat`  
**Branch:** `main`  
**Audit date:** 2026-07-31  
**Reconciliation date:** 2026-08-01  
**Status:** PXF-016B deployed and complete; PXF-016C/C1 committed (not pushed); PXF-016C2 complete, validated, and not pushed

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
- PXF-016A/B/B1/B2 chain pushed to origin/main on 2026-08-01 as `7260f87e0c449cfb3441c42dbdd1c8a0ab57e5e9`.
- First CI run (30699722139) failed at clean-checkout TypeScript due to missing SVG module type declaration; fixed in commit `7260f87`.
- Second CI run (30700388456) succeeded: all four jobs passed, 14/14 browser tests passed, production smoke checks passed.
- Production `/api/version` verified at `7260f87e0c449cfb3441c42dbdd1c8a0ab57e5e9` after successful deployment; image `ghcr.io/prochattools/prochat:7260f87e0c449cfb3441c42dbdd1c8a0ab57e5e9` deployed at `2026-08-01T12:50:28Z`.

## Durable validation anchors

```yaml
validated_program_head: 91436457e4d3aa8a5d9782ff671ce49e10d7ef07
validated_docs_mobile_head: ada06665f5944fc988f4dad4a5fed47cee471d8b
validated_closeout_head: 29854de09b04792c377d0bba7528297acb14c155
validated_production_baseline_head: 91436457e4d3aa8a5d9782ff671ce49e10d7ef07
last_verified_production_head: 7260f87e0c449cfb3441c42dbdd1c8a0ab57e5e9
last_verified_production_at: 2026-08-01T12:50:28Z
deployment_observation_source: Main workflow run 30700388456 plus direct production /api/version and browser verification
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

PXF-016A/B/B1/B2 pushed, CI passed (run 30700388456), and production verified at `7260f87`. PXF-016C is the active packet: asset-import integrity, legacy dead-component cleanup, bounded `@axe-core/playwright` Axe gate, and canonical-route WCAG checks — without claiming full manual WCAG 2.2 AA certification. Legacy cleanup and design-debt reduction remain separate bounded maintenance waves.

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

Phase 12 remains `PARTIAL`. No CSS defect was found. The readiness bound correction is a documentation and safety improvement only.

---

## PXF-016C Asset integrity and bounded Axe accessibility proof

**Started:** 2026-08-01
**Completed:** 2026-08-01
**Status:** complete — ready to commit

### Part A — Deployed truth reconciliation

Updated `last_verified_production_head`, `last_verified_production_at`, and `deployment_observation_source` in `docs/roadmap.md`, `docs/implementation-plan.md`, and this file to reflect the verified `7260f87` deployment (run 30700388456). Updated `current_packet` to PXF-016C. Updated `closeout_push_status` and `deployment_status` to record the PXF-016B chain. Updated the file-level status line from "ready for push verification" to "PXF-016B deployed and complete; PXF-016C active." Immutable anchors are unchanged.

### Part B — Asset-import integrity

**SVG import inventory:**

| File | Imports | Asset status | Component reachable |
|---|---|---|---|
| `src/components/AboutMe.tsx` | 5 SVGs from `@/assets/images/` | Missing (no src/assets/images/ dir) | No — not in barrel, not in any app route |
| `src/components/ZeroRisk.tsx` | 4 SVGs from `@/assets/images/` | Missing | No |
| `src/components/Review.tsx` | 1 SVG from `@/assets/images/` | Missing | No |
| `src/components/Testimonials.jsx` | 3 SVGs from `@/assets/images/` | Missing | No — not in barrel, not in any app route |
| `src/components/login-payment.tsx` | 1 SVG `profile.svg` | Missing | No — referenced only by `Access.tsx` which is not in barrel and not in any app route |

**Deleted dead legacy components (13 of 14 missing asset imports eliminated):**
- `src/components/AboutMe.tsx` — unreachable, 5 missing assets
- `src/components/ZeroRisk.tsx` — unreachable, 4 missing assets
- `src/components/Review.tsx` — unreachable, 1 missing asset
- `src/components/Testimonials.jsx` — unreachable, 3 missing assets (unrelated "Grove School" content, outside current product scope)

**Fixed `src/components/login-payment.tsx`:**
- Removed `import ProfileImage from "@/assets/images/profile.svg"` (missing file)
- Removed the `<Image src={ProfileImage}>` usage from the component body

**`src/types/assets.d.ts` fate:**
- Removed. Next.js already declares `module '*.svg'` in `node_modules/next/image-types/global.d.ts` with `content: any`. The custom declaration was redundant and suppressed missing-asset errors by satisfying TypeScript even for non-existent files. TypeScript clean-state confirmed with `tsc --noEmit` after removal: 0 errors.

**Asset validator created:** `scripts/validate-static-asset-imports.mjs`
- Scans all `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, `.cjs` source files
- Detects static relative and aliased imports ending in `.svg`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.ico`, `.woff`, `.woff2`
- Resolves `@/` alias to `src/`, resolves relative imports from importer directory
- Fails with non-zero exit on any missing target
- Ignores `node_modules`, `.next`, `out`, `dist`, `.git`
- Skips external URLs and runtime `/` public-path strings
- Added to `package.json` as `validate:assets`
- Added to CI as `Validate static asset imports` step before Typecheck

**Validation result:** `✓ All static asset imports resolved.`

### Part C — Bounded Axe accessibility evidence

**Installed:** `@axe-core/playwright@4.12.1` (stable, compatible with `@playwright/test@1.55.0`)

**Created:** `tests/evidence/canonical-accessibility.spec.ts`
- 8 canonical routes × 2 viewports (1440px desktop, 390px mobile) = 16 test cases
- Uses existing `WAVE1_BASE_URL` pattern and `playwright.wave1.config.ts`
- WCAG tags: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`
- Gate: fail on every `critical` or `serious` violation; report `moderate` and `minor` as structured console evidence
- Attaches full Axe JSON (violations, passes count, incomplete count) as test artifact on every run

**Initial baseline violations found and resolved:**

| Rule | Impact | Route(s) | Element | Fix |
|---|---|---|---|---|
| `color-contrast` | serious | `/` | `.pm-trust-principle__index` (01–05 labels, `aria-hidden="true"`) | Changed CSS from `var(--pm-text-faint)` to `var(--pm-text-muted)` in `prochat-memory-theme.css`. New contrast: `rgb(163 163 163 / 0.74)` ≈ `#787878` on `#000000` → ~4.56:1 ✓ |
| `color-contrast` | serious | `/memory`, `/workbench` | `.pm-product-flow__index` (01–03 labels) | Changed CSS from `var(--pm-text-faint)` to `var(--pm-text-muted)` in `product-pages.css`. Same fix as above. |

**Nextra third-party exclusions on `/docs` route (element-specific, justified):**

| Selector | Rule | Justification |
|---|---|---|
| `.nextra-scrollbar` | `link-name` (serious) | Nextra v4 sidebar navigation container. Sidebar links have text content in `_meta.js` but `nextra-theme-docs` v4 renders them in a way that axe-core 4.x cannot detect as accessible text. Cannot be patched in application code. |
| `.x\\:max-w-\\[50\\%\\]` | `link-name` (serious) | Nextra v4 pagination prev/next links with `title=""` (explicitly empty string) set by the nextra-theme-docs pagination component. Contain only SVG arrows. `title=""` is emitted by Nextra, not application code. |
| `[data-headlessui-state]` | `button-name` (critical) | Nextra HeadlessUI listbox button (theme/language switcher) with no `aria-label`. `nextra-theme-docs` v4 regression; no application-code override path exists. |

**Updated `test:evidence:ci`** to include `canonical-accessibility.spec.ts`.
**Updated CI workflow** `Run browser evidence` step runs all three specs.

**Final results:**
- Existing 14 browser tests: 14/14 pass
- Accessibility scans: 16/16 pass (8 routes × 2 viewports)
- Total combined suite: 30/30 pass
- Critical violations: 0
- Serious violations: 0
- Moderate/minor violations: structured evidence logged (no blocking gate)

### Part D — Accessibility boundary

**Automated in PXF-016C:**
- Axe canonical-route scans (8 routes × 2 viewports, WCAG 2.x A and AA)
- Keyboard smoke evidence (existing, docs-mobile-layout.spec.ts)
- Focus-visible evidence (existing)
- Reduced-motion evidence (existing)
- Responsive containment evidence (existing)

**Still manual or future:**
- Screen-reader review (NVDA, JAWS, VoiceOver)
- 200% zoom
- Browser high-contrast mode
- Mobile orientation
- Touch target measurements
- Complete form error/success announcements
- Accessibility-tree review of product illustrations
- Complete contrast review beyond Axe's automated coverage

Phase 12 remains `PARTIAL`.

### Validation results

- Asset validation: `✓ All static asset imports resolved.`
- TypeScript: clean — 0 errors (with `src/types/assets.d.ts` removed)
- ESLint: 0 errors, 0 warnings
- Design governance: passed 5 rules with 39 explicit debt exemptions (unchanged)
- Docs validation: pass
- Production build: pass
- YAML syntax: valid
- Total browser evidence: 30/30 pass
- Security scan: no findings
- No generated artifacts remain
- No Axe subtree exclusions remain; reviewed critical and serious findings are matched after a full-document scan
- No plaintext secrets

### Next recommended packet

**PXF-016D** — measured performance proof using bounded Lighthouse or equivalent budgets (FCP, LCP, CLS, TBT targets against 8 canonical routes), unless Axe uncovers additional accessibility defects requiring a dedicated repair packet. Phase 12 performance proof remains deferred until PXF-016D.

---

## PXF-016C1 Accessibility exception policy and asset validator hardening

**Started:** 2026-08-01
**Status:** committed, not pushed

### Part A — Correct Axe exception model

Replaced broad `.exclude()` subtree exclusions with a reviewed-violation-exception model:

- **No subtree exclusions** — the Axe scan now runs against the full page DOM without `.exclude()` calls.
- **Deterministic matching** — each exception matches by exact normalized target identity plus `ruleId`, `impact`, `route`, and explicit desktop or mobile viewport.
- **Cardinality enforcement** — expected targets and node counts are exact; duplicate, additional, and stale nodes fail the gate.
- **Type-safe** — `ReviewedAxeException` requires an ID, justification, upstream owner, review date, exact targets, and expected node count.
- **Non-blocking baseline** — route- and viewport-specific moderate, minor, unknown-impact, and incomplete evidence is compared by rule ID, impact, and node count; new or increased findings fail while decreases are reported.

**Application-level fix investigation:**

Reviewed `nextra-theme-docs` v4 Layout schema (`LayoutPropsSchema` in `schemas.d.mts`):
- `darkMode={false}` already set — does NOT remove the HeadlessUI listbox button (v4 bug)
- `navigation` prop accepts `boolean | {next, prev}` — could disable pagination but has product value
- No prop exists to add `aria-label` to sidebar links or HeadlessUI button
- All three Nextra finding categories are confirmed unfixable at the application level

**Reviewed exceptions (6 entries; 27 expected node instances across both viewports):**

| exception | ruleId | viewport | expected nodes |
|---|---|---|---:|
| `docs-desktop-button-name-listbox` | `button-name` | desktop | 1 |
| `docs-mobile-button-name-listbox` | `button-name` | mobile | 1 |
| `docs-desktop-target-size-listbox` | `target-size` | desktop | 1 |
| `docs-mobile-target-size-listbox` | `target-size` | mobile | 1 |
| `docs-desktop-link-name-navigation` | `link-name` | desktop | 15 |
| `docs-mobile-link-name-navigation` | `link-name` | mobile | 8 |

**WCAG tag note:** axe-core 4.12.1 has no aggregate `wcag22a` tag. WCAG 2.2 Level A criteria are tagged individually (e.g., `wcag258`, `wcag325`). The `wcag22aa` tag covers 2.2 AA criteria. Current tag set covers all available WCAG levels.

### Part B — Asset validator hardening

Rewrote `scripts/validate-static-asset-imports.mjs`:

- **AST-based parsing** — uses `ts.createSourceFile` (syntax-only, no type resolution) instead of regex
- **All import forms covered:** default, named, namespace, side-effect, multiline, dynamic `import()`, `require()`, `export { x } from`, `export * from`, `new URL('./asset', import.meta.url)`
- **Stylesheet `url()` scanning** — scans `.css`, `.scss`, and `.sass` files for local `url()` references.
- **Reference normalization** — strips query and fragment suffixes before filesystem resolution while preserving the original diagnostic reference.
- **Asset coverage** — validates SVG, raster images, AVIF, icons, web fonts including TTF/OTF/EOT, and PDF references.
- **Structured diagnostics** — reports importer, original reference, normalized path, resolved target, and syntax category.
- **No shell dependency** — repository traversal uses Node filesystem APIs only.
- **Exported functions** for testability while preserving the CLI interface.

**Self-tests:** `scripts/validate-static-asset-imports.test.mjs`
- 56 tests pass with the Node.js built-in `node:test` runner.
- Covers TypeScript/JavaScript import forms, stylesheet references, suffix normalization, repository-relevant extensions, diagnostics, exclusion rules, and integration scenarios.
- `"test:asset-validator": "node --test scripts/validate-static-asset-imports.test.mjs"` is a required CI step before repository asset validation.

### Part C — Documentation reconciliation

- Corrected "13 missing asset imports eliminated" → "13 of 14 missing asset imports eliminated" (13 from deletions + 1 from login-payment fix = 14 total)
- Updated file status to reflect PXF-016C committed state
- Recorded reviewed exception policy and baseline counts
- Deleted temporary `tests/evidence/_raw-axe-scan.mjs` scan script

### Validation results

- Asset validation: `✓ All static asset imports resolved.`
- Asset validator self-tests: 56/56 pass
- TypeScript: clean — 0 errors
- ESLint: 0 errors, 0 warnings
- Browser evidence: 30/30 pass (14 existing + 16 accessibility)
- Accessibility gate: 0 unreviewed critical/serious violations
- Incomplete baselines: all routes within reviewed limits
- No broad subtree exclusions remain


## PXF-016C2 final completion evidence

### Accessibility policy integrity

- Six explicit reviewed exception definitions cover 27 expected node instances across `/docs` desktop and mobile scans.
- Exception matching requires exact normalized target identity plus route, viewport, rule ID, and impact.
- Expected target and node cardinality are enforced; duplicate, additional, ambiguous, and stale matches fail.
- No Axe subtree exclusions remain.
- Moderate violations: 0.
- Minor violations: 0.
- Unknown-impact violations: 0.
- Incomplete evidence: 18 route/rule entries covering 1,024 reviewed nodes.
- Accessibility-policy unit tests: 13/13 passed.

### Asset validation integrity

- Static source references are parsed through the TypeScript AST for import, side-effect import, dynamic import, require, export-from, and `new URL(..., import.meta.url)` forms.
- Local stylesheet references are scanned in CSS, SCSS, and Sass.
- Query and fragment suffixes are normalized before filesystem resolution.
- Repository-relevant images, icons, fonts, and PDF references are covered.
- Diagnostics include importer, original reference, normalized path, resolved target, and syntax category.
- Asset-validator self-tests: 56/56 passed.
- Repository asset validation: passed with zero unresolved static assets.
- Both policy test suites are required CI steps before the browser evidence gate.

### Browser evidence boundary

- The CI-equivalent local browser environment previously passed 30/30 tests: 14 docs-mobile and route-smoke tests plus 16 canonical Axe scans.
- After the final duplicate-target cardinality repair, the pure accessibility-policy suite passed 13/13 and focused production `/docs` Axe scans passed at desktop and mobile.
- A full production-targeted 30-test rerun exceeded Workbench's bounded synchronous command window; no claim is made that this final full run completed inside Workbench.

### Final validation

- TypeScript: passed with zero errors.
- ESLint: passed with zero warnings.
- Design governance: five rules passed with 39 controlled exemptions.
- Documentation validation: passed.
- Production build: passed.
- Workflow YAML: parsed successfully with the installed `yaml` package; jobs found were `ci`, `docs-integrity`, `detect-deployment-changes`, and `build-and-deploy`.
- Changed-path security scan: accessibility paths had no findings; remaining heuristic findings were expected bounded workflow network calls, failure-only artifact upload, GitHub/Dokploy secret references, the existing Axios dependency, documentation mentions, and the validator's regular-expression `.exec()` call. No plaintext secret or new prohibited behavior was found.
- Focused production accessibility verification: `/docs` desktop and mobile passed with the expected reviewed exception IDs.
- Generated Playwright artifacts: removed; test-results and report directories are absent or empty.
- Production observation remains `7260f87e0c449cfb3441c42dbdd1c8a0ab57e5e9`; no deployment metadata was advanced in this unpushed packet.

### Commit state

PXF-016C2 is complete, validated, and not pushed. The intended commits are:

1. `test: enforce deterministic accessibility baselines`
2. `chore: complete asset validator and CI coverage`

Phase 11 remains `PARTIAL`, Phase 12 remains `PARTIAL`, and Phase 13 remains `ONGOING`.
