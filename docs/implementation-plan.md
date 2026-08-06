# ProChat Public Platform Implementation Plan

**Status:** canonical executable plan  
**Owner:** Steve Westhoek  
**Scope:** documentation, audits, prototypes, production foundation, public pages, migration, validation, launch, and maintenance  
**Last updated:** 2026-08-05T14:12:22Z

## Authority and reading order

Before any task, read the smallest relevant subset in this order:

```text
Mind company and product truth
→ PRODUCT.md
→ DESIGN.md
→ brand-spec.md
→ docs/roadmap.md
→ relevant design/platform/migration documents
→ exact current source files
```

Canonical Mind references:

```text
mind/wiki/organisations/prochat/brand/company-principles.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/public-platform-strategy.md
mind/wiki/organisations/prochat/brand/brand-governance.md
mind/wiki/organisations/prochat/brand/public-platform-roadmap.md
mind/wiki/organisations/prochat/brand/canonical-homepage-copy.md
mind/wiki/organisations/prochat/brand/global-design-foundation.md
mind/wiki/organisations/prochat/brand/website-visual-motion-system.md
mind/wiki/organisations/prochat/brand/website-build-contract.md
```

## Verified current state

```yaml
validated_program_head: 91436457e4d3aa8a5d9782ff671ce49e10d7ef07
validated_docs_mobile_head: ada06665f5944fc988f4dad4a5fed47cee471d8b
validated_closeout_head: 29854de09b04792c377d0bba7528297acb14c155
validated_production_baseline_head: 91436457e4d3aa8a5d9782ff671ce49e10d7ef07
last_verified_production_head: b7f564a1883309758be55be097ae3616fdfa0fc8
last_verified_production_at: 2026-08-06T10:41:32Z
deployment_observation_source: Main workflow run 31093765830 (PXF-017 public professionalism) deployed; direct production /api/version, /api/health, /docs, and eight-route verification; all routes HTTP 200; built 2026-08-06T10:28:19Z
validated_date: 2026-08-06
documentation_sync_status: Immutable validation anchors describe completed program evidence; deployment observation fields describe the last verified production state without claiming to track the live repository HEAD.
current_program_state: PXF-017 public professionalism deployed to production (SHA b7f564a1883309758be55be097ae3616fdfa0fc8). All eight canonical routes serve (/, /memory, /memory-qa, /workbench, /docs, /contact, /privacy, /terms all HTTP 200). Docs routed through canonical shell. First-paint black background, no transitions. Nextra skip control suppressed. Browser evidence: 66 tests (6+18+16+26). All CI checks pass (TypeScript ✓, ESLint ✓, build ✓ 109 pages, browser evidence 66/66 ✓, security-api 33/33 ✓, accessibility 16/16 ✓). Phase 11 PARTIAL (16 pending owner decisions; 6 verified-absent items require no action). Phase 12 PARTIAL (browser/accessibility evidence passed, manual screen-reader/zoom/high-contrast/field-RUM deferred). Phase 13 continuous governance. MailerLite external rotation PENDING owner verification.
current_phase: Phase 13 — continuous governance
current_packet: PXF-017 — public professionalism deployment
canonical_visual_routes_active: 8
canonical_route_implementation: COMPLETE
public_docs_alignment: COMPLETE
contact_beta_flow_alignment: COMPLETE
repository_validation: RESTORED
production_visual_design_started: true
production_visual_implementation: COMPLETE
analytics_tracking: COMPLETE
runner_disposition: COMMITTED_STATICALLY_VALIDATED
static_validation: PASSED
full_typescript: PASSED
production_build: PASSED
static_pages_generated: 109
live_execution: DEPLOYED
wave1_execution: DEPLOYED
protected_session_strategy: PUBLIC_AND_UNAUTHENTICATED_ONLY
authenticated_protected_proof: SEPARATE_FUTURE_RUNNER
browser_runner_worktree: COMMITTED
browser_runner_artifact_disposition: GUARDED_WORKFLOW_SEPARATE
shell_contract: DEPLOYED
closeout_push_status: COMPLETE — ada06665f5944fc988f4dad4a5fed47cee471d8b, 29854de09b04792c377d0bba7528297acb14c155, and ecc0fdfe8dda0e285c7aea8e3aaded97ef0003ba reached origin/main on 2026-07-31; PXF-016A/B/B1/B2 chain (7260f87e0c449cfb3441c42dbdd1c8a0ab57e5e9) pushed and deployed 2026-08-01; PXF-016C/C1/C2 chain pushed 2026-08-02 and deployed as 853207b49f338c4832e1f8a84e237ca6bf0c400b
deployment_status: VERIFIED — production /api/version matched b7f564a1883309758be55be097ae3616fdfa0fc8 after successful Main workflow run 31093765830 (all 5 jobs passed including PXF-017 public professionalism); all 8 canonical routes HTTP 200; image ghcr.io/prochattools/prochat:b7f564a1883309758be55be097ae3616fdfa0fc8 built 2026-08-06T10:28:19Z; CI checks: TypeScript ✓, ESLint ✓, build ✓ 109 pages, browser evidence ✓ (66 tests: 6+18+16+26), security-api ✓ (33/33), accessibility ✓ (16/16); this is an operational observation, not a mutable repository-HEAD field
```

## Historical executor queue

The PPF task definitions below are retained as historical execution context. They are no longer the current queue.

The completed PXF-003 through PXF-006F implementation sequence is:

```text
a590bcb docs(prochat): define public experience and conversion system
6a6fe07 feat(prochat): add memory illustration and hero motion system
f979890 feat(prochat): build memory-first public homepage
c1cbe73 feat(prochat): add canonical memory and workbench product pages
504d27e feat(prochat): align beta contact and participation flows
8b2bfba docs(prochat): align public documentation surface
36bb061 fix(prochat): restore repository validation for evidence runner
6b37d60 fix(prochat): add contact suspense boundary
7726d21 docs(prochat): close public platform program state
9f7bc63 fix(sitemap): generate canonical sitemaps before build
dc0764a feat(contact): server-render contact page
c0c07fb fix(sitemap): exclude legacy documentation routes
bb105c9 docs(privacy): align policy with current data flows
ef9470c docs(terms): align terms with current product licenses
1e09b99 fix(a11y): remove duplicate marketing main landmark
73395c4 fix(a11y): remove duplicate homepage main landmark
aed7478 fix(a11y): remove duplicate contact main landmark
a13bb6c feat(metadata): add public manifest and product schemas
64e7fdd fix(metadata): align social previews with current products
a0b28ad feat(brand): use public wordmark in site chrome
ac8ec5c feat(home): clarify product conversion paths
89b69e3 feat(design): unify public chrome and wordmark
7eea132 feat(contact): align contact page with public design
9f941c3 feat(docs): align documentation with public design
e202e2d fix(responsive): harden mobile navigation and docs overflow
c15c90d feat(onboarding): clarify first-success product paths
4b423fb feat(analytics): track product-page onboarding actions
```

The platform is deployed and live. All canonical routes pass CI. Phase 11 inventory and auth-boundary audit are the current work packets (PXF-017B).
  status: READY
  purpose: Browser-runner worktree isolation, stale-run disposition, and shell-contract decision.
  depends_on: []
  exact_inputs:
    - docs/product/agent-mode-progress.md
    - docs/migration/ROUTE_AUDIT.md
    - docs/migration/MIGRATION_MATRIX.md
    - docs/migration/WAVE1_SHELL_RESPONSIBILITIES.json
    - src/helpers/shell-routes.ts
    - src/components/AppChrome.tsx
    - tests/evidence/wave1-shell-equivalence.spec.ts
    - tests/evidence/validate-wave1-browser-runner.mjs
    - .github/workflows/wave1-browser-equivalence.yml
  allowed_changed_paths:
    - docs/product/agent-mode-progress.md
    - tests/evidence/wave1-shell-equivalence.spec.ts
    - tests/evidence/validate-wave1-browser-runner.mjs
    - .github/workflows/wave1-browser-equivalence.yml
  expected_output: Closed stale browser-runner run or recorded why it remains open, isolated browser artifacts, and a recorded shell-contract decision scope.
  acceptance_criteria:
    - The stale run is checkpointed or closed.
    - Browser-runner artifacts remain isolated from reconciliation docs.
    - The no_shared_shell decision scope is documented without changing AppChrome in this packet.
    - The browser-runner artifact disposition is explicitly KEEP_ISOLATED_BLOCKED.
  validation:
    - git status --short
    - Workbench active-run query
    - docs diff review
  rollback: Restore the previous handoff text and reopen the prior run if needed.
  approval: none for docs; workflow or artifact edits remain separate
  commit_boundary: documentation and handoff only
  evidence: closed run agent-4305c4bd-7c9b-46df-bc91-9d82648626c9; new reconciliation run agent-c41afa81-19f4-415c-bbc6-66731c135a78
  next_task: PPF-002

- task_id: PPF-002
  status: NOT_READY
  purpose: Complete the operational content audit and classify current copy, claims, metadata, and protected content.
  depends_on:
    - PPF-001
  exact_inputs:
    - docs/migration/CONTENT_AUDIT.md
    - docs/migration/ROUTE_AUDIT.md
    - docs/migration/MIGRATION_MATRIX.md
    - docs/product/agent-mode-progress.md
  allowed_changed_paths:
    - docs/migration/CONTENT_AUDIT.md
    - docs/migration/MIGRATION_MATRIX.md
    - docs/product/agent-mode-progress.md
  expected_output: Seeded content register with stable IDs, claim status, approval state, archive destination, and replacement dependency.
  acceptance_criteria:
    - The register distinguishes seeded records from incomplete coverage.
    - Exact evidence and approval state are recorded per row.
    - The completeness gate against ROUTE_AUDIT and MIGRATION_MATRIX is explicit.
  validation:
    - markdown link check
    - route evidence cross-check
    - diff review
  rollback: Revert the content-audit block and restore the prior seed-only state.
  approval: documentation-only
  commit_boundary: docs only
  evidence: seeded rows for homepage, Memory, Memory for QA, Workbench/BuildFlow, and protected content
  next_task: PPF-003

- task_id: PPF-003
  status: NOT_READY
  purpose: Reconcile homepage and page copy against the operational content register.
  depends_on:
    - PPF-002
  exact_inputs:
    - docs/migration/CONTENT_AUDIT.md
    - docs/homepage-design-spec.md
    - docs/homepage-technical-design.md
    - docs/homepage-design-orchestration.md
  allowed_changed_paths:
    - docs/migration/CONTENT_AUDIT.md
    - docs/roadmap.md
    - docs/implementation-plan.md
  expected_output: Homepage and page-copy decisions aligned to the seeded content register.
  acceptance_criteria:
    - Page copy decisions match the canonical product hierarchy.
    - No stale CTA or legacy product claim remains unclassified.
  validation:
    - copy comparison
    - route/claim review
  rollback: Restore the prior copy classification notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: homepage, Memory, Memory for QA, and Workbench copy classifications
  next_task: PPF-004

- task_id: PPF-004
  status: NOT_READY
  purpose: Finalize conversion architecture and CTA hierarchy.
  depends_on:
    - PPF-003
  exact_inputs:
    - docs/migration/CONTENT_AUDIT.md
    - docs/roadmap.md
    - docs/implementation-plan.md
  allowed_changed_paths:
    - docs/roadmap.md
    - docs/implementation-plan.md
    - docs/migration/CONTENT_AUDIT.md
  expected_output: Deterministic conversion model with primary and secondary goals, visitor and buyer states, CTA hierarchy, and evidence mapping.
  acceptance_criteria:
    - Conversion tasks are separated from visual tasks.
    - Unsupported-number claims are prohibited.
    - Consent and data-minimization boundaries are explicit.
  validation:
    - conversion-logic review
    - claim-to-evidence cross-check
  rollback: Restore the prior conversion notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: conversion architecture notes and CTA hierarchy
  next_task: PPF-005

- task_id: PPF-005
  status: NOT_READY
  purpose: Complete archive destinations for legacy public content.
  depends_on:
    - PPF-004
  exact_inputs:
    - docs/migration/ARCHIVE_ARCHITECTURE.md
    - docs/migration/MIGRATION_MATRIX.md
    - docs/migration/ROUTE_AUDIT.md
  allowed_changed_paths:
    - docs/migration/ARCHIVE_ARCHITECTURE.md
    - docs/migration/MIGRATION_MATRIX.md
  expected_output: Archive destinations and restoration rules for routes, components, styles, motion, assets, docs, scripts, and legacy systems.
  acceptance_criteria:
    - No archive destination is missing.
    - Protected purchaser and transactional boundaries remain explicit.
  validation:
    - archive-path review
    - matrix cross-check
  rollback: Restore the previous archive mapping notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: archive-root, manifest, and destination mapping notes
  next_task: PPF-006

- task_id: PPF-006
  status: NOT_READY
  purpose: Create the protected-obligation closure register.
  depends_on:
    - PPF-005
  exact_inputs:
    - docs/migration/MIGRATION_MATRIX.md
    - docs/migration/ARCHIVE_ARCHITECTURE.md
  allowed_changed_paths:
    - docs/migration/MIGRATION_MATRIX.md
  expected_output: Closure register for kits, claims, processing, success, subscriptions, portal, licences, transactional email, and prior-purchaser access.
  acceptance_criteria:
    - Each protected obligation has an owner, evidence, and exit condition.
    - No destructive retirement is scheduled without closure.
  validation:
    - obligation-row review
    - protected-flow review
  rollback: Restore prior obligation status notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: blocked-by-obligation rows in the matrix
  next_task: PPF-007

- task_id: PPF-007
  status: NOT_READY
  purpose: Establish repository simplicity baselines.
  depends_on:
    - PPF-006
  exact_inputs:
    - docs/roadmap.md
    - docs/implementation-plan.md
    - docs/migration/ASSET_AUDIT.md
    - docs/migration/DEPENDENCY_AUDIT.md
  allowed_changed_paths:
    - docs/roadmap.md
    - docs/implementation-plan.md
  expected_output: Baseline-and-target decision tasks for route count, component count, CSS size, font requests, bundle size, dependencies, and unowned analytics events.
  acceptance_criteria:
    - No invented target numbers are introduced.
    - Every metric either has a baseline or an explicit decision task.
  validation:
    - metric inventory review
    - path review
  rollback: Restore the prior simplicity notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: simplicity metrics listed as decision tasks
  next_task: PPF-008

- task_id: PPF-008
  status: NOT_READY
  purpose: Run the design-lab readiness gate.
  depends_on:
    - PPF-007
  exact_inputs:
    - docs/design/DESIGN_LAB.md
    - docs/design/DESIGN_PRINCIPLES.md
    - docs/platform/ACCESSIBILITY_STRATEGY.md
    - docs/platform/PERFORMANCE_STRATEGY.md
  allowed_changed_paths:
    - docs/design/DESIGN_LAB.md
    - docs/implementation-plan.md
  expected_output: Readiness gate stating whether the design lab can start safely.
  acceptance_criteria:
    - Content, conversion, archive, and simplicity prerequisites are checked.
    - The gate is explicit and not implied.
  validation:
    - prerequisite checklist
    - doc consistency review
  rollback: Restore the prior gate notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: readiness gate result
  next_task: PPF-009

- task_id: PPF-009
  status: NOT_READY
  purpose: Build canonical component primitives.
  depends_on:
    - PPF-008
  exact_inputs:
    - docs/design/COMPONENT_LIBRARY.md
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
  allowed_changed_paths:
    - docs/design/COMPONENT_LIBRARY.md
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
  expected_output: Canonical primitives for buttons, surfaces, forms, and system states.
  acceptance_criteria:
    - Components are described as bounded primitives.
    - No production shell activation is implied.
  validation:
    - component map review
  rollback: Restore the prior primitive notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: primitive definitions
  next_task: PPF-010

- task_id: PPF-010
  status: NOT_READY
  purpose: Build Memory visual primitives.
  depends_on:
    - PPF-009
  exact_inputs:
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
    - docs/design/COPY_VISUAL_MAP.md
  allowed_changed_paths:
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
  expected_output: Memory-specific visual primitives with static, responsive, and reduced-motion-safe states.
  acceptance_criteria:
    - Memory remains specific to ProChat.
    - No motion activation is introduced.
  validation:
    - visual-state review
  rollback: Restore the prior Memory visual notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: Memory primitive notes
  next_task: PPF-011

- task_id: PPF-011
  status: NOT_READY
  purpose: Build Workbench visual primitives.
  depends_on:
    - PPF-010
  exact_inputs:
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
    - docs/design/COPY_VISUAL_MAP.md
  allowed_changed_paths:
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
  expected_output: Workbench-specific visual primitives and guardrails for local execution.
  acceptance_criteria:
    - Guarded operations remain explicit.
    - BuildFlow is not reintroduced as a current public product.
  validation:
    - product-truth review
  rollback: Restore the prior Workbench visual notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: Workbench primitive notes
  next_task: PPF-012

- task_id: PPF-012
  status: NOT_READY
  purpose: Build the static desktop design-lab specimen.
  depends_on:
    - PPF-011
  exact_inputs:
    - docs/design/DESIGN_LAB.md
    - docs/platform/RESPONSIVE_STRATEGY.md
  allowed_changed_paths:
    - docs/design/DESIGN_LAB.md
  expected_output: Desktop specimen for the approved static direction.
  acceptance_criteria:
    - The specimen is static and non-production.
    - It can be reviewed without motion dependencies.
  validation:
    - desktop composition review
  rollback: Restore the prior desktop specimen notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: desktop specimen notes
  next_task: PPF-013

- task_id: PPF-013
  status: NOT_READY
  purpose: Build the static mobile design-lab specimen.
  depends_on:
    - PPF-012
  exact_inputs:
    - docs/design/DESIGN_LAB.md
    - docs/platform/RESPONSIVE_STRATEGY.md
  allowed_changed_paths:
    - docs/design/DESIGN_LAB.md
  expected_output: Mobile specimen that matches the approved static direction.
  acceptance_criteria:
    - Mobile composition is explicit.
    - Reduced-motion and no-animation comprehension remain intact.
  validation:
    - mobile composition review
  rollback: Restore the prior mobile specimen notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: mobile specimen notes
  next_task: PPF-014

- task_id: PPF-014
  status: NOT_READY
  purpose: Produce hero directions.
  depends_on:
    - PPF-013
  exact_inputs:
    - docs/homepage-design-spec.md
    - docs/homepage-technical-design.md
  allowed_changed_paths:
    - docs/homepage-design-spec.md
    - docs/homepage-technical-design.md
  expected_output: Multiple static homepage hero directions with selection rationale.
  acceptance_criteria:
    - Directions differ materially.
    - One direction is explicitly selected or rejected.
  validation:
    - hero-direction review
  rollback: Restore the prior hero-direction notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: hero direction notes
  next_task: PPF-015

- task_id: PPF-015
  status: NOT_READY
  purpose: Produce Memory mechanism prototypes.
  depends_on:
    - PPF-014
  exact_inputs:
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
    - docs/homepage-design-spec.md
  allowed_changed_paths:
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
  expected_output: Memory mechanism prototypes and reviewer notes.
  acceptance_criteria:
    - Mechanisms are specific and evidence-led.
    - No production activation is implied.
  validation:
    - mechanism review
  rollback: Restore the prior Memory mechanism notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: Memory mechanism notes
  next_task: PPF-016

- task_id: PPF-016
  status: NOT_READY
  purpose: Produce Workbench mechanism prototypes.
  depends_on:
    - PPF-015
  exact_inputs:
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
    - docs/homepage-design-spec.md
  allowed_changed_paths:
    - docs/design/PRODUCT_VISUAL_LIBRARY.md
  expected_output: Workbench mechanism prototypes and reviewer notes.
  acceptance_criteria:
    - Guarded local execution is clear.
    - No autonomy claim is introduced.
  validation:
    - mechanism review
  rollback: Restore the prior Workbench mechanism notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: Workbench mechanism notes
  next_task: PPF-017

- task_id: PPF-017
  status: NOT_READY
  purpose: Run strategy, conversion, accessibility, performance, asset-rights, and taste reviews.
  depends_on:
    - PPF-016
  exact_inputs:
    - docs/roadmap.md
    - docs/migration/CONTENT_AUDIT.md
    - docs/platform/ACCESSIBILITY_STRATEGY.md
    - docs/platform/PERFORMANCE_STRATEGY.md
    - docs/migration/ASSET_AUDIT.md
  allowed_changed_paths:
    - docs/roadmap.md
    - docs/implementation-plan.md
  expected_output: Review findings with explicit severity and disposition.
  acceptance_criteria:
    - Every finding has evidence and a next step.
    - No finding is left as vague taste feedback.
  validation:
    - review synthesis
  rollback: Restore the prior review notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: review findings summary
  next_task: PPF-018

- task_id: PPF-018
  status: NOT_READY
  purpose: Approve one static direction.
  depends_on:
    - PPF-017
  exact_inputs:
    - docs/design/DESIGN_LAB.md
    - docs/homepage-design-spec.md
  allowed_changed_paths:
    - docs/design/DESIGN_LAB.md
  expected_output: One approved static direction and a rejected-or-deferred set of alternatives.
  acceptance_criteria:
    - Approval is explicit and traceable.
    - The approved direction is the only canonical static direction.
  validation:
    - approval review
  rollback: Restore the prior selection notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: approved static direction note
  next_task: PPF-019

- task_id: PPF-019
  status: NOT_READY
  purpose: Finalize motion storyboard and motion budget.
  depends_on:
    - PPF-018
  exact_inputs:
    - docs/design/MOTION_STORYBOARD.md
    - docs/platform/PERFORMANCE_STRATEGY.md
  allowed_changed_paths:
    - docs/design/MOTION_STORYBOARD.md
    - docs/platform/PERFORMANCE_STRATEGY.md
  expected_output: Motion storyboard, allowed motion properties, and budget guardrails.
  acceptance_criteria:
    - Motion implementation remains blocked until static composition is approved.
    - Budgets are described without inventing numbers.
  validation:
    - motion-budget review
  rollback: Restore the prior motion notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: motion storyboard and budget notes
  next_task: PPF-020

- task_id: PPF-020
  status: NOT_READY
  purpose: Prototype motion without production activation.
  depends_on:
    - PPF-019
  exact_inputs:
    - docs/design/MOTION_STORYBOARD.md
    - docs/design/DESIGN_LAB.md
  allowed_changed_paths:
    - docs/design/MOTION_STORYBOARD.md
  expected_output: Motion prototype notes that remain isolated from production routes.
  acceptance_criteria:
    - No canonical route activation occurs.
    - Motion remains compatible with reduced-motion behavior.
  validation:
    - motion prototype review
  rollback: Restore the prior motion prototype notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: prototype motion notes
  next_task: PPF-021

- task_id: PPF-021
  status: BLOCKED
  purpose: Run browser, accessibility, and performance proof.
  depends_on:
    - PPF-020
  exact_inputs:
    - docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
    - docs/platform/ACCESSIBILITY_STRATEGY.md
    - docs/platform/PERFORMANCE_STRATEGY.md
  allowed_changed_paths:
    - docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
    - docs/product/agent-mode-progress.md
  expected_output: Browser, accessibility, and performance proof or an attributable blocker.
  acceptance_criteria:
    - Attributable browser environment exists.
    - Protected credentials and approved test data are available.
  validation:
    - browser matrix
    - accessibility checks
    - performance traces
  rollback: Restore the prior evidence report if browser proof fails.
  approval: blocked until browser environment and protected test data exist
  commit_boundary: evidence only
  evidence: browser-equivalence report with current blocked state
  next_task: PPF-022

- task_id: PPF-022
  status: BLOCKED
  purpose: Activate the canonical public visual shell through a separate approval packet.
  depends_on:
    - PPF-021
  exact_inputs:
    - docs/migration/WAVE1_SHELL_COMPATIBILITY_PLAN.md
    - docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
  allowed_changed_paths:
    - docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
  expected_output: Explicit approval or rejection of the first canonical visual activation packet.
  acceptance_criteria:
    - Activation is separated from evidence gathering.
    - No route activates without proof.
  validation:
    - activation review
  rollback: Restore the prior allowlist state.
  approval: blocked until browser proof and approval exist
  commit_boundary: evidence only
  evidence: activation decision record
  next_task: PPF-023

- task_id: PPF-023
  status: NOT_READY
  purpose: Implement public pages and archive replaced legacy systems in bounded page/migration packets.
  depends_on:
    - PPF-022
  exact_inputs:
    - docs/roadmap.md
    - docs/migration/MIGRATION_MATRIX.md
    - docs/migration/ARCHIVE_ARCHITECTURE.md
  allowed_changed_paths:
    - docs/roadmap.md
    - docs/implementation-plan.md
  expected_output: Page-task sequence and legacy-system archive packets with exact rollback boundaries.
  acceptance_criteria:
    - Page tasks remain bounded.
    - Archive movement is separate from deletion.
  validation:
    - packet boundary review
  rollback: Restore the prior page-task breakdown.
  approval: documentation-only until a source packet is approved
  commit_boundary: docs only
  evidence: page and archive packet outline
  next_task: PPF-024

- task_id: PPF-024
  status: NOT_READY
  purpose: Run absence proof, dependency cleanup, launch validation, and governance handoff.
  depends_on:
    - PPF-023
  exact_inputs:
    - docs/migration/MIGRATION_MATRIX.md
    - docs/migration/DEPENDENCY_AUDIT.md
    - docs/migration/ASSET_AUDIT.md
  allowed_changed_paths:
    - docs/migration/MIGRATION_MATRIX.md
    - docs/product/agent-mode-progress.md
  expected_output: Absence-proof, dependency-cleanup, launch-validation, and governance-handoff notes.
  acceptance_criteria:
    - No unresolved migration row remains.
    - Launch validation and governance handoff are explicit.
  validation:
    - absence proof review
    - dependency review
    - launch checklist review
  rollback: Restore the prior governance notes.
  approval: documentation-only
  commit_boundary: docs only
  evidence: absence-proof and governance handoff summary
  next_task: none
```

## Current position

```text
Product Experience Foundation: COMPLETE
All canonical public routes: DEPLOYED
Program phase: continuous governance (Phase 13)
Legacy deletion: deferred to future cleanup wave
Phase 11 owner decisions: 17 items awaiting classification (see LEGACY_OWNER_DECISION_WORKSHEET.md)
Phase 11 implementation blueprint: 9 bounded packets mapped (see PXF018_IMPLEMENTATION_PLAN.md)
Next execution: Phase 13 quarterly review cadence
PPF historical queue: retained as implementation history only
```

## Global safety rules

- Use sourceId `prochat` for all repository work.
- Read exact current source before editing.
- Do not edit `.env`, secrets, keys, `.git/**`, generated output, or vendor code.
- Do not stage or commit unrelated changes.
- Do not delete legacy files until an approved migration row has a verified replacement or explicit archive/redirect decision.
- Do not invent product names, claims, palettes, fonts, routes, or availability.
- Do not install GSAP, Playwright, axe, or other planned dependencies before the authorized task.
- Do not upgrade Next.js, React, Tailwind, or the full component system as part of this program without a separate migration decision.
- Use native scrolling.
- Preserve mobile, keyboard, reduced-motion, and no-animation comprehension.
- Stage explicit paths only.
- Run the smallest meaningful validation after every change.

## Task execution contract

Every task must record:

```yaml
task:
  purpose: ""
  dependencies: []
  exact_inputs: []
  expected_files: []
  acceptance_criteria: []
  validation: []
  rollback_or_migration: ""
  commit_boundary: ""
```

A task may not begin when a dependency or exact source path is unresolved.

# Phase 1 — Company foundation

## Task 1.1 — Repository authority reconciliation

**Status:** COMPLETE.

**Purpose**  
Ensure repository-local product and design context is subordinate to canonical Mind truth.

**Dependencies**  
Mind company, product, brand, and public-platform foundation.

**Exact inputs**

```text
PRODUCT.md
DESIGN.md
brand-spec.md
README.md
docs/overview.md
docs/strategy.md
```

**Expected files**  
The same documentation paths only.

**Acceptance criteria**

- ProChat is the company.
- Memory is flagship.
- Memory for QA is the current edition.
- Workbench is the second product.
- Steve is QA Engineer and Founder, not the public product.
- Repository docs link to real canonical Mind files.

**Validation**  
Canonical-link check, product-name search, security scan, exact diff.

**Rollback or migration concerns**  
Documentation-only; revert explicit commit if authority links are wrong.

**Commit boundary**  
Docs only.

# Phase 2 — Public platform architecture

## Task 2.1 — Page responsibility and platform-shell specification

**Status:** COMPLETE FOR DOCUMENTATION.

**Purpose**  
Define the complete page map, audience, job, CTA, navigation, footer, and company/founder presentation.

**Dependencies**  
Task 1.1.

**Exact inputs**

```text
Mind public-platform-strategy.md
docs/platform/PAGE_ARCHITECTURE.md
PRODUCT.md
```

**Expected files**

```text
docs/platform/PAGE_ARCHITECTURE.md
docs/roadmap.md
docs/implementation-plan.md
```

**Acceptance criteria**  
Every required page has one primary job and no legacy product becomes a current top-level destination.

**Validation**  
Page-list comparison, product hierarchy check, navigation/footer review.

**Rollback or migration concerns**  
No route changes yet.

**Commit boundary**  
Docs only.

# Phase 3 — Canonical content second pass

## Task 3.1 — Complete public content inventory

**Purpose**  
Locate all public copy, metadata, navigation, footer, form, legal, documentation, and error text.

**Dependencies**  
Tasks 1.1–2.1.

**Exact inputs**

```text
docs/migration/CONTENT_AUDIT.md
docs/migration/ROUTE_AUDIT.md
src/app/**
src/components/**
src/helpers/chrome-routes.ts
metadata, sitemap, robots, form, and content-platform files discovered by exact search
```

**Expected files**

```text
docs/migration/CONTENT_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
```

No production files change.

**Acceptance criteria**

- Every indexable route and shared shell copy source is inventoried.
- Every item has location, content type, product scope, and current status.
- Embedded asset text and metadata are included.

**Validation**  
Route-to-copy cross-check, search for headings/metadata/navigation/form labels, exact diff.

**Rollback or migration concerns**  
Inventory only; do not rewrite or delete.

**Commit boundary**  
Content-audit records only.

## Task 3.2 — Claims and terminology classification

**Purpose**  
Classify every public claim and legacy term against canonical truth.

**Dependencies**  
Task 3.1.

**Exact inputs**

```text
completed CONTENT_AUDIT.md
Mind brand-ruleset.md
Mind canonical-homepage-copy.md
Mind product-strategy.md
PRODUCT.md
```

**Expected files**

```text
docs/migration/CONTENT_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
optional docs/content/claims-register.md if volume requires separation
```

**Acceptance criteria**

- Every claim is approved-current, approved-qualified, beta-only, future, unverified, prohibited, or legal-review-required.
- Legacy terms have keep/replace/archive decisions.
- No current product claim remains unclassified.

**Validation**  
Search for prohibited claims and legacy product names; canonical comparison; legal-risk list review.

**Rollback or migration concerns**  
No public copy changes yet.

**Commit boundary**  
Claims and terminology records only.

## Task 3.3 — Homepage copy second pass

**Purpose**  
Re-evaluate the canonical homepage after company philosophy, page architecture, visual language, and footer strategy were finalized.

**Dependencies**  
Tasks 3.1–3.2.

**Exact inputs**

```text
Mind canonical-homepage-copy.md
Mind company-principles.md
Mind public-platform-strategy.md
docs/homepage-design-spec.md
docs/design/COPY_VISUAL_MAP.md
completed claims register
```

**Expected files**

```text
Mind canonical homepage copy only if canonical revision is required
repository-local page copy mapping or audit records
```

Production page files remain unchanged.

**Acceptance criteria**

- ProChat leads as company.
- Memory dominates as flagship.
- QA is the primary conversion.
- Workbench is clear but secondary.
- Philosophy, founder, navigation, footer, and boundaries are represented appropriately.
- Every major section has a visual mapping.

**Validation**  
Five-second comprehension review, claims review, page-job review, copy-to-visual completeness check.

**Rollback or migration concerns**  
Canonical Mind changes require a separate Mind commit before repository copy work.

**Commit boundary**  
Canonical copy and audit mapping only.

## Task 3.4 — ProChat Memory page copy

**Purpose**  
Approve the general flagship product page without overstating broad availability.

**Dependencies**  
Tasks 3.1–3.2 and homepage second-pass outcomes.

**Exact inputs**

```text
Mind product strategy
Memory technical definition
customer profiles
canonical glossary and claims
PAGE_ARCHITECTURE.md
COPY_VISUAL_MAP.md
```

**Expected files**

```text
approved Memory page copy document
CONTENT_AUDIT.md
MIGRATION_MATRIX.md
```

**Acceptance criteria**

- Trust lifecycle, local ownership, readable storage, relevant retrieval, correction, retirement, and QA availability are accurate.
- The page has one primary CTA to Memory for QA.
- Broad commercial availability is not implied.

**Validation**  
Product-truth review, claims review, visual-map review, CTA review.

**Rollback or migration concerns**  
Do not edit the production Memory route until Phase 10.

**Commit boundary**  
Copy and audit docs only.

## Task 3.5 — Memory for QA page copy

**Purpose**  
Approve the niche-specific conversion page using credible QA investigation language.

**Dependencies**  
Tasks 3.1–3.2.

**Exact inputs**

```text
Mind customer profiles
Memory for QA strategy
homepage-example-data.md
COPY_VISUAL_MAP.md
claims register
beta status
```

**Expected files**

```text
approved QA page copy document
CONTENT_AUDIT.md
MIGRATION_MATRIX.md
```

**Acceptance criteria**

- The page explains repeated investigation, evidence, review, later reuse, and beta qualification.
- Current evidence remains stronger than memory.
- No automatic diagnosis or measured result is implied.
- Primary CTA is the selected QA beta.

**Validation**  
QA credibility review, claims review, form-purpose review, visual-map review.

**Rollback or migration concerns**  
Production QA routes remain unchanged until Phase 10.

**Commit boundary**  
Copy and audit docs only.

## Task 3.6 — Workbench page copy

**Purpose**  
Approve the second-product page and remove public confusion with BuildFlow or autonomous-agent claims.

**Dependencies**  
Tasks 3.1–3.2.

**Exact inputs**

```text
Mind Workbench strategy
PRODUCT.md
existing Workbench/BuildFlow copy sources
COPY_VISUAL_MAP.md
claims register
```

**Expected files**

```text
approved Workbench page copy document
CONTENT_AUDIT.md
MIGRATION_MATRIX.md
```

**Acceptance criteria**

- Request, exact context, guarded change, validation, run state, and explicit Git are clear.
- Workbench is not described as autonomous.
- BuildFlow remains technical compatibility language only where needed.
- Availability is accurate.

**Validation**  
Product-truth review, legacy-name search, claims review, CTA review.

**Rollback or migration concerns**  
Preserve required compatibility identifiers in code and technical docs.

**Commit boundary**  
Copy and audit docs only.

## Task 3.7 — Company and support page copy

**Purpose**  
Approve Philosophy, About, Contact, beta forms, documentation entry, and error-state copy.

**Dependencies**  
Tasks 3.1–3.2.

**Exact inputs**

```text
Mind company-principles.md
Mind public-platform-strategy.md
PAGE_ARCHITECTURE.md
CONTENT_AUDIT.md
current forms and documentation routes
```

**Expected files**

```text
approved page copy documents for Philosophy, About, Contact, docs entry, 404, and errors
form microcopy specification
CONTENT_AUDIT.md
```

**Acceptance criteria**

- About presents ProChat as company and Steve transparently as founder.
- Contact routes enquiry types and asks minimal data.
- Documentation exposes current product directions only.
- Error states route visitors to current pages.

**Validation**  
Founder-positioning review, accessibility review of form language, link and CTA review.

**Rollback or migration concerns**  
Do not alter live forms or data handling in this task.

**Commit boundary**  
Copy and audit docs only.

## Task 3.8 — Privacy and Terms second pass

**Purpose**  
Align legal pages with the current local-memory model, website data behavior, beta stage, and external-provider boundaries.

**Dependencies**  
Content inventory and claims classification.

**Exact inputs**

```text
existing Privacy and Terms pages
Mind legal-policy direction
public-platform strategy
current form, analytics, hosting, and provider behavior
```

**Expected files**

```text
legal review notes
approved Privacy copy
approved Terms copy
CONTENT_AUDIT.md
MIGRATION_MATRIX.md
```

**Acceptance criteria**

- Website data and customer-owned local memory are distinct.
- External provider behavior is accurately scoped.
- Effective and updated dates exist.
- Beta and future commercial terms are not conflated.
- Unresolved legal decisions are explicit.

**Validation**  
Legal review, privacy/data-flow verification, claims review, readable-structure review.

**Rollback or migration concerns**  
Do not publish unreviewed legal changes. Preserve current pages until replacements are approved.

**Commit boundary**  
Legal copy and review records only.

## Task 3.9 — Navigation, footer, metadata, and social copy

**Purpose**  
Approve all global shell labels, page metadata, sitemap intent, and social preview language.

**Dependencies**  
Tasks 3.3–3.8.

**Exact inputs**

```text
PAGE_ARCHITECTURE.md
approved page copy
current navigation/footer helpers
metadata and sitemap sources
asset audit
```

**Expected files**

```text
navigation and footer copy specification
metadata matrix
social asset requirements
CONTENT_AUDIT.md
ROUTE_AUDIT.md
```

**Acceptance criteria**  
Labels, destinations, titles, descriptions, canonical URLs, indexing, and social text match the final page hierarchy.

**Validation**  
Duplicate-title review, route comparison, CTA review, footer completeness, social preview review.

**Rollback or migration concerns**  
No live metadata or navigation edit until Phase 10.

**Commit boundary**  
Specifications and audits only.

# Phase 4 — Design-language foundation

## Task 4.1 — Design documentation reconciliation

**Status:** CURRENT DOCUMENTATION BATCH.

**Purpose**  
Verify that the design principles, visual grammar, product library, motion storyboard, component contract, responsive, accessibility, performance, and design-lab documents agree.

**Dependencies**  
Phases 1–3 canonical decisions.

**Exact inputs**

```text
DESIGN.md
brand-spec.md
docs/design/*.md
docs/platform/*.md
docs/homepage-*.md
```

**Expected files**  
Only the listed documentation paths.

**Acceptance criteria**

- Golos Text, JetBrains Mono, grayscale, and `#3158C7` remain consistent.
- Native scrolling and GSAP boundary remain consistent.
- Mobile and reduced motion are mandatory.
- Product primitives and named states match copy and product truth.
- GPT-5.6 Sol is the primary model for architecture, design, implementation, and reconciliation; external models are optional critics only.

**Validation**  
Cross-document term search, required-file check, security scan, exact diff.

**Rollback or migration concerns**  
Docs only.

**Commit boundary**  
Design and platform docs only.

# Phase 5 — Foundational legacy sweep

## Task 5.1 — Route and page inventory

**Purpose**  
Enumerate every route, page, layout, error, loading, metadata, redirect, sitemap, robots, and navigation entry.

**Dependencies**  
Phase 2 and route-audit specification.

**Exact inputs**

```text
src/app/**
next.config.*
route helpers
sitemap and robots files
header/footer/navigation files
```

**Expected files**

```text
docs/migration/ROUTE_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
```

**Acceptance criteria**  
Every route maps to a canonical responsibility or a decision-required row.

**Validation**  
App Router enumeration, navigation cross-check, sitemap comparison, no source edits.

**Rollback or migration concerns**  
Inventory only.

**Commit boundary**  
Route audit records only.

## Task 5.2 — Component inventory

**Purpose**  
Map shared and page-local components, consumers, APIs, design assumptions, and lifecycle.

**Dependencies**  
Task 5.1 and component-audit specification.

**Exact inputs**

```text
src/components/**
src/app/**/_components/**
marketing component directories
UI wrappers and form components
```

**Expected files**

```text
docs/migration/COMPONENT_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
```

**Acceptance criteria**  
Every component has purpose, consumers, status, disposition, canonical replacement, and risk.

**Validation**  
Import/consumer searches, duplicate-responsibility review, no production edits.

**Rollback or migration concerns**  
Inventory only; no component moves or deletions.

**Commit boundary**  
Component audit records only.

## Task 5.3 — Style and motion inventory

**Purpose**  
Map all fonts, tokens, colors, themes, CSS technologies, responsive rules, animations, observers, and reduced-motion behavior.

**Dependencies**  
Tasks 5.1–5.2.

**Exact inputs**

```text
src/assets/styles/**
Tailwind and Sass configuration
CSS Modules and page styles
motion imports, keyframes, observers, and listeners
```

**Expected files**

```text
docs/migration/STYLE_AUDIT.md
docs/migration/MOTION_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
```

**Acceptance criteria**  
All visual and motion systems have consumers, status, disposition, risk, and migration destination.

**Validation**  
Raw color/font search, import graph, motion mechanism search, no production edits.

**Rollback or migration concerns**  
Inventory only.

**Commit boundary**  
Style and motion audit records only.

## Task 5.4 — Asset and dependency inventory

**Purpose**  
Map assets, fonts, icons, packages, scripts, licences, consumers, costs, and risks.

**Dependencies**  
Tasks 5.1–5.3.

**Exact inputs**

```text
public/**
imported asset directories
package.json
lockfile
configuration and scripts
```

**Expected files**

```text
docs/migration/ASSET_AUDIT.md
docs/migration/DEPENDENCY_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
```

**Acceptance criteria**  
Every active asset and direct dependency has purpose, consumer, status, disposition, validation, and removal boundary.

**Validation**  
Asset reference search, import search, package-script review, licence/security notes, no package changes.

**Rollback or migration concerns**  
Inventory only.

**Commit boundary**  
Asset and dependency audit records only.

## Task 5.5 — Migration classification and wave plan

**Status:** COMPLETE FOR DOCUMENTATION AND PROVISIONAL DECISIONS.

**Purpose**  
Turn inventories into an executable keep/refactor/rewrite/replace/archive/redirect/protect/remove-later program with a non-runtime archive and ten dependency-gated waves.

**Dependencies**  
Tasks 5.1–5.4 and completed content audit.

**Exact inputs**

```text
all docs/migration audits
LEGACY_SWEEP_PLAN.md
canonical page and design documents
```

**Expected files**

```text
docs/migration/MIGRATION_MATRIX.md
docs/migration/LEGACY_SWEEP_PLAN.md
docs/migration/ARCHIVE_ARCHITECTURE.md
docs/migration/MIGRATION_WAVES.md
docs/roadmap.md
docs/implementation-plan.md
docs/product/agent-mode-progress.md
```

**Acceptance criteria**

- Every row has disposition, canonical replacement, wave, risk, validation, rollback, and owner.
- Deletion rows require explicit approval.
- Critical rows have no ambiguous dependency.
- Production implementation packets can be sequenced.

**Validation**  
Cross-audit completeness script, unresolved-status report, exact diff, security scan.

**Rollback or migration concerns**  
No production removals in classification task.

**Commit boundary**  
Migration decisions only.

## Task 5.6 — Wave 0 archive-governance foundation

**Purpose**  
Create the repository archive boundary and enforcement without moving any production file.

**Dependencies**  
Task 5.5 committed and a clean worktree.

**Exact inputs**

```text
docs/migration/ARCHIVE_ARCHITECTURE.md
docs/migration/MIGRATION_WAVES.md
docs/migration/MIGRATION_MATRIX.md
TypeScript, Tailwind, ESLint, and build configuration read-only evidence
```

**Expected files**

```text
archive/legacy-public-platform/README.md
archive/legacy-public-platform/manifest.yaml
repository validation that rejects imports from archive/**
docs/product/agent-mode-progress.md
```

**Acceptance criteria**

- Archive root is outside application, public, route, and package roots.
- Archive content cannot be imported, compiled, indexed, routed, or deployed.
- README states that archive material is historical and non-authoritative.
- Manifest validates and contains no moved production entries yet.
- No existing production file moves, changes responsibility, or disappears.

**Validation**  
TypeScript and Tailwind scope review, restricted-import validation, security scan, exact diff, and clean build when the validation implementation requires it.

**Rollback or migration concerns**  
Additive and non-destructive. Revert the packet if build tooling unexpectedly scans the archive.

**Commit boundary**  
Archive README, empty manifest, archive-import validation, and handoff only.

**Commit message**

```text
chore(prochat): establish legacy archive boundary
```

## Wave execution task map

The detailed contract for every wave is canonical in `docs/migration/MIGRATION_WAVES.md`.

| Task | Wave | Purpose | Destructive approval |
|---|---:|---|---|
| 5.6 | 0 | archive root, manifest, governance, and import exclusion | no |
| 9.1A | 1 | canonical fonts, tokens, light-first root shell, and legacy-style containment | only for removing old imports |
| 9.2A | 2 | canonical primitives, forms, system states, and product visuals | no while additive |
| 6.1–6.5 | 3 | design lab, foundation specimen, static heroes, and page assembly | no |
| 10.2–10.3 + migration packets | 4 | Memory and QA replacements, redirects, and old Memory archive | yes for moves/retirement |
| 10.4 + migration packets | 5 | Workbench replacement and BuildFlow/ProChat OS public retirement | yes |
| 10.5–10.12 + migration packets | 6 | company, Contact, mailing list, legal, docs, errors, metadata | yes for legacy retirement |
| 11.1 | 7 | redirects, noindex, sitemap, and route retirement | yes for 404/410 or purchaser-sensitive changes |
| 11.2–11.3 | 8 | archive/remove legacy code, styles, motion, assets, scripts, integrations, packages | yes per packet |
| 11.4 + Phase 12 | 9 | absence proof, performance, security, accessibility, and simplification | finding-specific |

No later task may bypass the prerequisites, protected exclusions, validation, rollback, or approval requirements in `MIGRATION_WAVES.md`.

# Phase 6 — Design laboratory and static prototypes

## Task 6.1 — Design-lab shell

**Purpose**  
Create an isolated, non-indexed browser environment for approved experiments.

**Dependencies**  
Task 5.6 and the approved additive Wave 1–2 font, token, shell-boundary, component, and product-visual foundation packets.

**Exact inputs**

```text
docs/design/DESIGN_LAB.md
current App Router structure
robots and sitemap implementation
canonical tokens and example data
```

**Expected files**  
Exact route, layout, and local prototype files approved by the route audit; no production page files.

**Acceptance criteria**  
The lab is excluded from navigation, sitemap, and indexing and supports deterministic states.

**Validation**  
Route load, robots/sitemap check, mobile smoke test, no production navigation change.

**Rollback or migration concerns**  
Keep the lab isolated; revert its route packet without affecting production.

**Commit boundary**  
Design-lab shell only.

## Task 6.2 — Foundation specimen

**Purpose**  
Prove typography, surfaces, cobalt usage, states, focus, spacing, radius, borders, shadows, and technical panels.

**Dependencies**  
Task 6.1.

**Exact inputs**

```text
DESIGN.md
brand-spec.md
DESIGN_PRINCIPLES.md
ACCESSIBILITY_STRATEGY.md
homepage-example-data.md
```

**Expected files**  
Design-lab specimen files and local styles only.

**Acceptance criteria**  
Desktop and mobile specimens demonstrate canonical tokens, contrast, hierarchy, and interaction states without new design decisions.

**Validation**  
Browser screenshots, contrast review, keyboard/focus review, 320–1728 width check.

**Rollback or migration concerns**  
Prototype only.

**Commit boundary**  
Foundation specimen only.

## Task 6.3 — Static product visual primitives

**Purpose**  
Build realistic Memory, QA, Workbench, and shared visual objects before page composition.

**Dependencies**  
Task 6.2.

**Exact inputs**

```text
PRODUCT_VISUAL_LIBRARY.md
VISUAL_LANGUAGE.md
homepage-example-data.md
COMPONENT_LIBRARY.md
```

**Expected files**  
Design-lab primitive files, schemas, fixtures, and tests only.

**Acceptance criteria**  
Every required state is visible, semantic, responsive, reduced-motion-safe, and specific to ProChat.

**Validation**  
State screenshots, keyboard and accessible-summary review, mobile review, type check where code exists.

**Rollback or migration concerns**  
No promotion to production until approved.

**Commit boundary**  
Static visual primitives only.

## Task 6.4 — Three static homepage hero directions

**Purpose**  
Explore composition without changing fonts, palette, claims, or product mechanism.

**Dependencies**  
Tasks 6.2–6.3 and approved homepage copy.

**Exact inputs**

```text
homepage-design-spec.md
homepage-visual-storyboard.md
COPY_VISUAL_MAP.md
approved hero copy and fixtures
```

**Expected files**  
Three design-lab hero variants and mobile variants.

**Acceptance criteria**  
Directions differ materially by composition and storytelling; one passes the five-second test and is selected with rationale.

**Validation**  
Desktop/mobile screenshots, comprehension test, accessibility review, static quality review.

**Rollback or migration concerns**  
Rejected directions remain archived in the lab, not production.

**Commit boundary**  
Hero directions and selection record only.

## Task 6.5 — Static page patterns and full-page assembly

**Purpose**  
Prove page rhythm and reusable patterns across company, product, legal, contact, documentation, and error pages.

**Dependencies**  
Task 6.4 and approved page copy.

**Exact inputs**

```text
PAGE_ARCHITECTURE.md
approved page copy
selected hero
product primitives
RESPONSIVE_STRATEGY.md
```

**Expected files**  
Design-lab page patterns and full-page low-fidelity assemblies only.

**Acceptance criteria**  
All page types fit one system; mobile compositions exist; legal and utility pages remain restrained; full homepage pacing is coherent.

**Validation**  
Page screenshots, responsive review, content completeness, CTA flow review.

**Rollback or migration concerns**  
Prototype only.

**Commit boundary**  
Static page prototypes only.

# Phase 7 — Motion and product-story prototypes

## Task 7.1 — Motion and browser-test tooling

**Purpose**  
Add only the approved dependencies and minimal configuration for motion proofs and deterministic browser testing.

**Dependencies**  
Static hero approval and dependency audit decision.

**Exact inputs**

```text
package.json
lockfile
homepage-technical-design.md
PERFORMANCE_STRATEGY.md
DEPENDENCY_AUDIT.md
```

**Expected files**

```text
package.json
lockfile
Playwright configuration
motion registration utility
related docs/tests
```

**Acceptance criteria**  
GSAP, `@gsap/react`, Playwright, and axe are added at approved versions; no smooth-scroll or unapproved visual dependency is added.

**Validation**  
Install integrity, type check, build, licence/security review, bundle baseline.

**Rollback or migration concerns**  
One dependency/config commit; revert restores prior lockfile and package state.

**Commit boundary**  
Dependencies and minimal configuration only.

## Task 7.2 — Hero motion proof

**Purpose**  
Animate the selected hero through named evidence, review, memory, and focused-context states.

**Dependencies**  
Task 7.1.

**Exact inputs**

```text
selected static hero
MOTION_STORYBOARD.md
homepage-example-data.md
ACCESSIBILITY_STRATEGY.md
PERFORMANCE_STRATEGY.md
```

**Expected files**  
Design-lab hero timeline, local styles, state definitions, tests, and screenshots.

**Acceptance criteria**  
Native scrolling, predictable reverse, stable text, clean pinning, mobile scenes, and reduced-motion panels.

**Validation**  
Forward/reverse tests, resize/orientation, cleanup, Playwright states, axe, performance trace.

**Rollback or migration concerns**  
Design-lab only; no production hero replacement.

**Commit boundary**  
Hero motion proof only.

## Task 7.3 — Memory lifecycle and relevant-context proofs

**Purpose**  
Prove the two key Memory mechanisms using one persistent record and explicit task signals.

**Dependencies**  
Task 7.2 lessons.

**Exact inputs**

```text
MOTION_STORYBOARD.md
PRODUCT_VISUAL_LIBRARY.md
homepage-example-data.md
approved Memory copy
```

**Expected files**  
Design-lab lifecycle and context stories, state models, tests, and evidence.

**Acceptance criteria**  
Trust is earned, current evidence can override memory, selection remains explainable, and mobile/reduced-motion forms are complete.

**Validation**  
Product-truth review, screenshots, reverse scroll, axe, performance trace.

**Rollback or migration concerns**  
Prototype only.

**Commit boundary**  
Memory proofs only.

## Task 7.4 — QA investigation proof

**Purpose**  
Visualize one credible failure becoming a reviewed lesson and later reusable context.

**Dependencies**  
Task 7.3 and approved QA copy.

**Exact inputs**

```text
QA scenario in homepage-example-data.md
MOTION_STORYBOARD.md
approved QA page copy
```

**Expected files**  
Design-lab QA story, state model, fixtures, tests, and screenshots.

**Acceptance criteria**  
Evidence, hypotheses, root cause, review, approval, and later reuse are explicit; no automatic diagnosis is implied.

**Validation**  
QA credibility review, mobile/reduced-motion checks, Playwright, axe, performance trace.

**Rollback or migration concerns**  
Prototype only.

**Commit boundary**  
QA proof only.

## Task 7.5 — Workbench control-plane proof

**Purpose**  
Show ChatGPT reasoning connected to exact local context through guarded operations, validation, and explicit Git.

**Dependencies**  
Task 7.1 and approved Workbench copy.

**Exact inputs**

```text
Workbench scenario in homepage-example-data.md
PRODUCT_VISUAL_LIBRARY.md
approved Workbench copy
```

**Expected files**  
Design-lab Workbench story, state model, fixtures, tests, and screenshots.

**Acceptance criteria**  
Paths, scope, confirmation, validation, and Git state are visible; unrelated files remain visibly untouched; no autonomy claim appears.

**Validation**  
Product-truth review, desktop/mobile screenshots, axe, performance check.

**Rollback or migration concerns**  
Prototype only.

**Commit boundary**  
Workbench proof only.

## Task 7.6 — Motion system acceptance

**Purpose**  
Validate all motion stories as one coherent system.

**Dependencies**  
Tasks 7.2–7.5.

**Exact inputs**  
All prototype stories, motion audit, performance and accessibility strategies.

**Expected files**  
Motion review report, updated storyboard/specs, deterministic baseline images.

**Acceptance criteria**  
At most four pinned sequences; consistent timing; no redundant effects; complete mobile and reduced motion; budgets pass.

**Validation**  
Cross-story review, trigger count, bundle review, browser traces, current major browsers.

**Rollback or migration concerns**  
Reject or simplify individual stories before production promotion.

**Commit boundary**  
Review evidence and approved prototype changes only.

# Phase 8 — Independent review

## Task 8.1 — Full prototype review

**Purpose**  
Challenge product truth, design, motion, accessibility, performance, feasibility, conversion, and legal boundaries.

**Dependencies**  
Phases 3, 5, 6, and 7.

**Exact inputs**  
Full design lab, migration matrix, page copy, validation strategy, canonical documents.

**Expected files**  
Review report and issue list only.

**Acceptance criteria**  
Every dimension is scored; every finding names evidence, severity, recommended fix, and affected task.

**Validation**  
Independent browser review, product review, accessibility review, performance review.

**Rollback or migration concerns**  
No production edits.

**Commit boundary**  
Review report only.

## Task 8.2 — Findings reconciliation and production packetization

**Purpose**  
Accept, reject, or defer each review finding and finalize bounded production tasks.

**Dependencies**  
Task 8.1.

**Exact inputs**  
Review report, canonical docs, prototypes, migration matrix.

**Expected files**

```text
reconciled design/platform docs
MIGRATION_MATRIX.md
implementation-plan task updates
```

**Acceptance criteria**  
No finding remains without disposition; production packets have exact paths, validation, rollback, and commit boundaries.

**Validation**  
Cross-document consistency, unresolved-findings query, security scan.

**Rollback or migration concerns**  
Docs and prototype changes only.

**Commit boundary**  
Reconciliation docs only.

# Phase 9 — Production foundation

## Task 9.1 — Fonts, tokens, and style containment

**Purpose**  
Implement canonical typography and semantic tokens while isolating legacy styles.

**Dependencies**  
Task 8.2 and approved style-migration rows.

**Exact inputs**

```text
brand-spec.md
STYLE_AUDIT.md
MIGRATION_MATRIX.md
current root layout and style entry points
```

**Expected files**  
Exact font, token, root-layout, style-entry, tests, and docs paths listed in the approved matrix.

**Acceptance criteria**  
Golos and JetBrains load correctly; tokens are semantic; no broad legacy breakage; CLS and contrast pass.

**Validation**  
Type check, production build, font/network inspection, visual baselines, contrast, design lint.

**Rollback or migration concerns**  
Keep legacy styles contained until page consumers migrate.

**Commit boundary**  
Fonts/tokens/containment only.

## Task 9.2 — Shared shell and form foundations

**Purpose**  
Implement header, mobile navigation, footer, links, buttons, surfaces, forms, TOC, legal metadata, and errors.

**Dependencies**  
Task 9.1 and component migration rows.

**Exact inputs**  
COMPONENT_LIBRARY.md, approved prototypes, component audit, page architecture.

**Expected files**  
Exact shared component, style, test, and documentation paths in the matrix.

**Acceptance criteria**  
All states, keyboard behavior, responsive behavior, and design tokens are complete; no arbitrary design props.

**Validation**  
Type check, component tests, Playwright, axe, mobile screenshots, build.

**Rollback or migration concerns**  
Migrate no page consumer beyond the approved shell packet.

**Commit boundary**  
Shared shell and forms only.

## Task 9.3 — Product visuals and motion infrastructure

**Purpose**  
Promote approved Memory, QA, Workbench, and motion primitives to production components.

**Dependencies**  
Tasks 9.1–9.2 and Phase 7 acceptance.

**Exact inputs**  
Approved design-lab primitives, component contract, state schemas, motion proofs.

**Expected files**  
Exact production visual components, fixtures, motion utilities, tests, and docs named by the matrix.

**Acceptance criteria**  
Static states work without GSAP; motion is scoped; accessible summaries exist; mobile and reduced-motion variants exist.

**Validation**  
Type check, tests, visual regression, axe, cleanup tests, bundle review.

**Rollback or migration concerns**  
Do not attach to production pages in this task.

**Commit boundary**  
Product visual infrastructure only.

## Task 9.4 — Browser, accessibility, visual, and performance test infrastructure

**Purpose**  
Create repeatable release gates before page implementation scales.

**Dependencies**  
Tasks 9.1–9.3.

**Exact inputs**  
Validation plan, accessibility strategy, performance strategy, current CI/package scripts.

**Expected files**  
Playwright tests/config, axe helpers, screenshot baselines, performance scripts/config, documentation.

**Acceptance criteria**  
Tests run deterministically locally and in approved CI; design-lab states are testable; budgets are reported.

**Validation**  
Run test suite, inspect artifacts, verify failure behavior, build.

**Rollback or migration concerns**  
Do not couple tests to unstable animation timing; use named states.

**Commit boundary**  
Test infrastructure only.

# Phase 10 — Public pages

## Standard page packet contract

Every page task below uses:

- approved copy;
- page architecture;
- approved visual story;
- exact route and legacy rows;
- production foundations;
- mobile and reduced-motion design;
- metadata and analytics specification;
- page-specific tests.

Every page commit contains only that page, directly required shared fixes, tests, metadata, and documentation. Shared changes affecting other pages require a separate foundation packet.

## Task 10.1 — Homepage

**Purpose**  
Build the company-first public homepage with Memory dominance, QA conversion, and Workbench introduction.

**Dependencies**  
Phase 9 and approved homepage prototype.

**Exact inputs**  
Canonical homepage copy, homepage design/technical/storyboard docs, migration rows for the current homepage route.

**Expected files**  
Exact homepage route, sections, local styles, fixtures, tests, metadata, and affected navigation/footer files approved by the matrix.

**Acceptance criteria**  
Five-second understanding; four approved cinematic sequences maximum; mobile/reduced motion complete; CTA destinations correct; claims accurate.

**Validation**  
Type check, build, Playwright functional/visual, axe, browser trace, route and metadata review.

**Rollback or migration concerns**  
Keep prior route restorable until the new homepage passes; do not remove legacy components in this commit.

**Commit boundary**  
Homepage packet only.

## Task 10.2 — ProChat Memory page

**Purpose**  
Build the flagship product page and route visitors to the current QA edition.

**Dependencies**  
Task 10.1 foundations and approved Memory copy/prototype.

**Exact inputs**  
Memory copy, visual map, route row, product visual components.

**Expected files**  
Exact Memory route, sections, tests, metadata, and approved redirect compatibility files.

**Acceptance criteria**  
General model is clear; availability is qualified; trust, local ownership, retrieval, correction, and QA path are accurate.

**Validation**  
Product-truth review, build, Playwright, axe, mobile, metadata, performance.

**Rollback or migration concerns**  
Do not remove old Memory routes until redirect task.

**Commit boundary**  
Memory page only.

## Task 10.3 — ProChat Memory for QA page

**Purpose**  
Build the primary niche conversion page.

**Dependencies**  
Task 10.2 and approved QA copy/prototype.

**Exact inputs**  
QA copy, investigation proof, beta form specification, route and content audit rows.

**Expected files**  
Exact QA route, sections, form integration boundary, tests, metadata, and local assets.

**Acceptance criteria**  
QA credibility, evidence-first investigation, human review, later reuse, beta qualification, and primary CTA are clear.

**Validation**  
QA review, form smoke test, Playwright, axe, mobile, claims, performance.

**Rollback or migration concerns**  
Do not remove legacy QA routes or alter data collection outside approved form task.

**Commit boundary**  
QA page only.

## Task 10.4 — ProChat Workbench page

**Purpose**  
Build the second-product page around guarded local execution.

**Dependencies**  
Phase 9 and approved Workbench copy/prototype.

**Exact inputs**  
Workbench copy, control-plane proof, route and legacy BuildFlow rows.

**Expected files**  
Exact Workbench route, sections, tests, metadata, and compatibility links approved by matrix.

**Acceptance criteria**  
Exact context, guarded changes, validation, run state, Git, and boundaries are visible; no autonomy or public BuildFlow-product confusion.

**Validation**  
Product review, legacy-name search, build, Playwright, axe, mobile, performance.

**Rollback or migration concerns**  
Preserve technical compatibility identifiers until their own migration row completes.

**Commit boundary**  
Workbench page only.

## Task 10.5 — Philosophy page

**Purpose**  
Publish the durable company belief and operating principles.

**Dependencies**  
Approved philosophy copy and shared shell.

**Exact inputs**  
Mind company-principles.md, page architecture, editorial page pattern.

**Expected files**  
Exact Philosophy route, local components/styles, tests, metadata.

**Acceptance criteria**  
Readable, company-level, not a slogan wall, and linked toward Memory without aggressive conversion.

**Validation**  
Content review, heading/reading-order review, mobile, axe, metadata.

**Rollback or migration concerns**  
No product or legal claims beyond canonical philosophy.

**Commit boundary**  
Philosophy page only.

## Task 10.6 — About page

**Purpose**  
Present ProChat as the company and Steve transparently as QA Engineer and Founder.

**Dependencies**  
Approved About copy and company positioning.

**Exact inputs**  
Public-platform strategy, founder copy, approved imagery decision.

**Expected files**  
Exact About route, tests, metadata, approved assets.

**Acceptance criteria**  
The page builds trust without becoming a freelancer portfolio or implying a larger team.

**Validation**  
Founder-positioning review, accessibility, mobile, metadata, asset rights.

**Rollback or migration concerns**  
Do not introduce freelance-service conversion into ProChat navigation.

**Commit boundary**  
About page only.

## Task 10.7 — Contact and beta forms

**Purpose**  
Route QA beta, Workbench, partnership, and general contact intent while collecting minimal data.

**Dependencies**  
Approved form copy, privacy review, current backend/provider audit.

**Exact inputs**  
Contact copy, form/data-flow audit, legal notes, analytics specification.

**Expected files**  
Exact Contact route, form components, server/API actions, validation, tests, privacy notice, metadata.

**Acceptance criteria**  
Labels, required fields, purpose, success, error, privacy, keyboard, and mobile behavior are complete.

**Validation**  
Functional form tests, error/success tests, axe, privacy/data-flow review, no secret exposure.

**Rollback or migration concerns**  
Preserve existing working contact flow until replacement succeeds; avoid changing provider or data retention without approval.

**Commit boundary**  
Contact and beta flow only.

## Task 10.8 — Privacy page

**Purpose**  
Publish accurate, readable, versioned privacy information.

**Dependencies**  
Approved legal copy and verified data flows.

**Exact inputs**  
Privacy copy, analytics/form/provider audit, route row.

**Expected files**  
Exact Privacy route, legal layout, metadata, tests.

**Acceptance criteria**  
Website data, local memory, external providers, contact, dates, and beta boundaries are accurate.

**Validation**  
Legal review, link check, readable structure, mobile, metadata.

**Rollback or migration concerns**  
Keep prior legal page accessible until approved replacement is live.

**Commit boundary**  
Privacy page only.

## Task 10.9 — Terms page

**Purpose**  
Publish accurate, readable, versioned terms for the current stage.

**Dependencies**  
Approved legal copy and current product/licensing status.

**Exact inputs**  
Terms copy, product stage, repository licence facts, route row.

**Expected files**  
Exact Terms route, legal layout, metadata, tests.

**Acceptance criteria**  
Beta, website, repository, future commercial, liability, contact, and dates are correctly scoped.

**Validation**  
Legal review, link check, readable structure, mobile, metadata.

**Rollback or migration concerns**  
Do not imply final commercial terms before approval.

**Commit boundary**  
Terms page only.

## Task 10.10 — Documentation entry points

**Purpose**  
Expose current product documentation and version status without surfacing legacy directions as current.

**Dependencies**  
Documentation content audit and route decisions.

**Exact inputs**  
Current docs routes/sources, approved documentation-entry copy, archive decisions.

**Expected files**  
Exact documentation entry routes, cards/links, metadata, tests, archive/noindex controls.

**Acceptance criteria**  
Current Memory/QA/Workbench docs are clear; beta/version status is visible; legacy docs are archived or labeled.

**Validation**  
Link crawl, route/indexing review, accessibility, metadata.

**Rollback or migration concerns**  
Do not delete historical docs in this page task.

**Commit boundary**  
Documentation entry only.

## Task 10.11 — 404 and error states

**Purpose**  
Provide coherent recovery for missing pages, route errors, form errors, and unavailable states.

**Dependencies**  
Shared error primitive and approved copy.

**Exact inputs**  
Current not-found/error files, error copy, route architecture.

**Expected files**  
Exact global and nested error/not-found/loading files and tests.

**Acceptance criteria**  
States explain the problem, preserve company tone, expose safe recovery, and remain accessible.

**Validation**  
Forced error tests, keyboard, screen reader, mobile, analytics where approved.

**Rollback or migration concerns**  
Avoid exposing internal errors or stack data.

**Commit boundary**  
Error states only.

## Task 10.12 — Navigation, footer, metadata, sitemap, robots, and social assets

**Purpose**  
Reconcile the complete platform shell after all pages exist.

**Dependencies**  
Tasks 10.1–10.11.

**Exact inputs**  
PAGE_ARCHITECTURE.md, route audit, metadata matrix, asset audit, all production routes.

**Expected files**  
Exact header/footer/navigation helpers, metadata sources, sitemap, robots, social assets, tests.

**Acceptance criteria**  
No dead or legacy links; all titles and canonical URLs are correct; indexing is deliberate; footer is complete; social previews are current.

**Validation**  
Route crawl, link check, sitemap/robots parse, metadata snapshot, social preview review, mobile navigation, axe.

**Rollback or migration concerns**  
Avoid redirect chains and accidental noindex/index changes.

**Commit boundary**  
Global shell and discovery files only.

# Phase 11 — Legacy migration and removal

## Task 11.1 — Redirects and archival

**Purpose**  
Preserve public and historical value before deleting legacy routes or guidance.

**Dependencies**  
Approved replacements and migration rows.

**Exact inputs**  
Redirect rows, archive rows, route audit, current inbound/public links.

**Expected files**  
Redirect configuration, archive destinations, route docs, tests.

**Acceptance criteria**  
No chains/loops; historical material is clearly non-current; public destinations are correct.

**Validation**  
Redirect tests, route crawl, sitemap and canonical review.

**Rollback or migration concerns**  
Use temporary redirects when destination stability is not proven.

**Commit boundary**  
Redirect/archive wave only.

## Task 11.2 — Legacy pages, copy, and components

**Purpose**  
Remove superseded public pages, copy sources, and components after zero-consumer proof.

**Dependencies**  
Task 11.1 and replacement verification.

**Exact inputs**  
Approved DELETE/ARCHIVE rows, consumer searches, production tests.

**Expected files**  
Only exact removal paths and directly affected imports/tests/docs.

**Acceptance criteria**  
No consumers, no broken routes, no lost historical/legal value, no current legacy product exposure.

**Validation**  
Import search, route crawl, type check, build, Playwright, exact diff.

**Rollback or migration concerns**  
One removal concern per commit; preserve prior commit as rollback.

**Commit boundary**  
Bounded page/copy/component removal packet.

## Task 11.3 — Legacy styles, motion, assets, and dependencies

**Purpose**  
Remove obsolete visual systems and package cost after all consumers migrate.

**Dependencies**  
Task 11.2 and zero-consumer audit rows.

**Exact inputs**  
STYLE, MOTION, ASSET, and DEPENDENCY audit rows approved for removal.

**Expected files**  
Exact styles, assets, package files, lockfile, imports, tests, and docs.

**Acceptance criteria**  
No active consumer; build and visuals remain correct; bundle or repository complexity improves.

**Validation**  
Search, type check, tests, build, visual regression, bundle report, security/licence check.

**Rollback or migration concerns**  
Separate package removals from unrelated visual polish; retain a clean lockfile rollback.

**Commit boundary**  
One coherent removal category per commit.

## Task 11.4 — Legacy absence proof

**Purpose**  
Prove old names, routes, imports, tokens, themes, assets, and claims no longer drive current production.

**Dependencies**  
Tasks 11.1–11.3.

**Exact inputs**  
All audits, migration matrix, repository source, production route manifest.

**Expected files**  
Final migration report, matrix status updates, residual-exception list.

**Acceptance criteria**  
No unresolved migration row; every retained legacy reference is explicitly historical, technical, or compatibility-scoped.

**Validation**  
Search suite, route crawl, build, tests, visual regression, metadata review, dependency review.

**Rollback or migration concerns**  
No additional deletion in proof task unless a new bounded removal task is created.

**Commit boundary**  
Evidence and matrix closure only.

# Phase 12 — Production craft and launch validation

## Task 12.1 — Visual and interaction craft pass

**Purpose**  
Refine typography, composition, spacing, states, and motion without changing product truth or architecture.

**Dependencies**  
Phases 10–11.

**Exact inputs**  
Running public platform, visual baselines, design review findings.

**Expected files**  
Exact page/component/style/test paths tied to approved findings.

**Acceptance criteria**  
Premium consistency, clear hierarchy, complete states, no generic AI patterns, no unbudgeted effects.

**Validation**  
Before/after screenshots, responsive review, visual regression, exact diff.

**Rollback or migration concerns**  
Atomic finding-based commits; avoid broad reformatting.

**Commit boundary**  
One coherent craft concern per commit.

## Task 12.2 — Accessibility acceptance

**Purpose**  
Verify WCAG 2.2 AA and complete manual accessibility behavior.

**Dependencies**  
Task 12.1.

**Exact inputs**  
All public routes, ACCESSIBILITY_STRATEGY.md, Playwright/axe suite.

**Expected files**  
Accessibility report and exact fixes/tests.

**Acceptance criteria**  
No critical/serious findings; keyboard, focus, screen reader, zoom, reflow, forms, product visuals, and reduced motion pass.

**Validation**  
Automated and manual matrix across target routes and browsers.

**Rollback or migration concerns**  
Accessibility fixes may require design change; canonical docs must be updated when behavior changes.

**Commit boundary**  
Finding-based accessibility packets.

## Task 12.3 — Performance, browser, and visual-regression acceptance

**Purpose**  
Prove speed, smooth motion, browser compatibility, and stable rendering.

**Dependencies**  
Task 12.2.

**Exact inputs**  
All public routes, performance budgets, browser matrix, visual baselines.

**Expected files**  
Performance report, browser report, exact fixes, updated tests/budgets if approved.

**Acceptance criteria**  
LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 under defined conditions; current major browsers and target viewports pass; no unexplained visual diff.

**Validation**  
Production build, Lighthouse, browser traces, field-ready Web Vitals instrumentation, Playwright, bundle report.

**Rollback or migration concerns**  
Simplify features before raising budgets; budget changes require documented evidence.

**Commit boundary**  
Performance/browser fixes grouped by root cause.

## Task 12.4 — Launch, legal, conversion, analytics, and production-safety acceptance

**Purpose**  
Complete final public, legal, conversion, metadata, analytics, and security verification.

**Dependencies**  
Tasks 12.1–12.3.

**Exact inputs**  
All public routes, legal approvals, CTA/form matrix, metadata matrix, analytics plan, release checklist.

**Expected files**  
Launch report, exact fixes, release notes, monitoring plan.

**Acceptance criteria**  
Claims, legal pages, forms, CTAs, analytics, sitemap, social previews, security scans, and debug exclusions pass.

**Validation**  
End-to-end conversion flows, legal sign-off, metadata crawl, analytics event verification, security scan, production smoke test.

**Rollback or migration concerns**  
Define release rollback commit and monitoring triggers before launch.

**Commit boundary**  
Final launch fixes and release evidence only.

# Phase 13 — Continuous governance

## Task 13.1 — Quarterly public-platform review

**Purpose**  
Keep company truth, product stage, design system, content, accessibility, performance, dependencies, and legacy state current.

**Dependencies**  
Launched public platform.

**Exact inputs**  
Mind canonical docs, production telemetry, accessibility findings, content freshness, analytics, dependency/security reports, migration matrix.

**Expected files**  
Review report, canonical/doc updates, new bounded implementation tasks.

**Acceptance criteria**  
Every finding has owner, severity, decision, task, and review date; deprecated work follows lifecycle.

**Validation**  
Cross-repository reconciliation, field performance, accessibility audit, content and route review, security/dependency review.

**Rollback or migration concerns**  
Do not bundle quarterly findings into one broad implementation commit.

**Commit boundary**  
Review evidence and separately packetized fixes.

# Current next task

After this documentation set is validated and committed, execute **PPF-001 — Browser-runner worktree isolation and stale-run disposition**.

Do not modify production code, delete legacy files, install dependencies, or start design-lab implementation in the documentation commit.

## Product Experience Foundation execution

Implementation of the public website is gated by the Product Experience Foundation Program.

Reference:

- docs/product/PRODUCT_EXPERIENCE_FOUNDATION_PROGRAM.md

Authority and execution order:

1. Read canonical ProChat business authority from `mind/organizations/prochat/README.md` and its directed strategy files.
2. PXF-001 — Mind-grounded founder discovery interview (non-coding).
3. Record any new philosophy, strategy, positioning, audience, offer, naming, category, business-stage, or cross-product decision in Mind.
4. Approve a linked ProChat marketing-execution brief derived from Mind.
5. Approve information architecture.
6. Approve applied design language.
7. Approve wireframes.
8. Approve high-fidelity design.
9. Create bounded component and page implementation packets.
10. Implement production UI.
11. Collect browser evidence and complete review.

Rules:

- Mind is the sole authority for high-level ProChat philosophy and business strategy.
- This repository must not duplicate or independently redefine that authority.
- Engineering tasks must consume approved Mind strategy and approved ProChat design artifacts rather than inventing product direction during implementation.



## PXF-003A — Nexus-template homepage foundation

**Status:** READY
**Authority:** `docs/product/HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md`
**Coding:** yes
**Scope discipline:** reproduce and adapt the approved template; do not redesign it

### First implementation batch

1. Establish homepage-scoped dark tokens in `src/app/(marketing)/prochat-memory-theme.css`.
2. Preserve Golos Text and JetBrains Mono roles.
3. Rebuild the marketing shell and floating navigation to match the supplied template.
4. Rebuild the hero hierarchy:
   - status pill;
   - oversized centered headline;
   - short supporting copy;
   - primary action;
   - trust line;
   - lower asymmetrical memory-card cluster.
5. Create a lightweight memory-themed background animation using CSS/SVG/canvas only after choosing the smallest performant method.
6. Add `prefers-reduced-motion` behavior from the start.
7. Adapt card content to reviewed memory, sources, corrections, patterns, retrieval, and QA lessons.
8. Preserve current route and product-truth boundaries.

### Exact initial paths

```text
src/app/(marketing)/App.tsx
src/app/(marketing)/prochat-memory-theme.css
src/app/(marketing)/components/layout/Footer.tsx
src/components/logo.tsx
```

Additional files may be introduced only when the first batch proves a reusable component boundary.

### Acceptance criteria

- The first desktop viewport is recognizably faithful to the supplied Nexus template.
- The page uses Golos Text, not Inter.
- The hero is understandable without motion.
- The background motion communicates memory flow rather than generic AI particles.
- The hero card cluster contains truthful ProChat Memory examples.
- Navigation, CTA, and cards work with keyboard, pointer, and touch.
- Focus-visible indicators are present and pass contrast checks.
- Reduced-motion mode removes continuous background animation.
- No generated video, frame sequence, scroll hijacking, invented pricing, or unsupported capability claim is introduced.
- Mobile layout preserves hierarchy without simply shrinking desktop.

### Validation

```yaml
required:
  - TypeScript check
  - targeted lint
  - security scan on changed paths
  - git diff --check
  - desktop browser screenshot comparison
  - mobile browser screenshot comparison
  - keyboard navigation review
  - focus-visible review
  - contrast review
  - reduced-motion review
not_required_in_first_batch:
  - pricing implementation
  - full page completion
  - video generation
  - frame extraction
  - scroll-scrub prototype
```

### Second batch after approval

After the shell and hero are visually approved:

1. trust strip;
2. three-benefit memory chapter;
3. custom memory diagrams and arrows;
4. capture/review/retrieve system chapter;
5. product/access cards;
6. closing CTA;
7. footer completion;
8. full-page responsive and accessibility evidence.




## PXF-003B0 — Public Conversion Strategy Foundation

**Status:** COMPLETE
**Authority:** `docs/product/PUBLIC_CONVERSION_STRATEGY.md`
**Coding:** no

Implementation consequences:

1. Every page must declare one primary conversion before UI work begins.
2. Every homepage section must answer one explicit visitor question.
3. The homepage lifecycle is GitHub-first: understand, trust, star, install, use, feedback, contribute, advocate.
4. Managed implementation is a secondary path for organizations.
5. Final public copy for “free,” “open source,” repository, license, install, download, contribution, and managed services is blocked until Mind reconciliation and repository verification are complete.
6. PXF-003B may proceed with the trust strip, benefits chapter, and illustration system using release-safe placeholder or verified CTA labels.
7. No later packet may optimize only for visual completeness; conversion purpose and measurable outcome are acceptance criteria.




## PXF-003B2A — Product Hierarchy and Canonical Route Foundation

**Status:** READY
**Authority:** `docs/product/PUBLIC_PAGE_ARCHITECTURE.md`
**Coding:** yes
**Execution tool:** Codex with Playwright visual review

### Purpose

Correct the public route and product hierarchy before adding the next major homepage chapter.

### Scope

1. Keep `/` generic ProChat Memory-first.
2. Remove QA-specific examples from the hero card cluster.
3. Update primary navigation to:
   - `/memory`
   - `/memory-qa`
   - `/workbench`
   - `/docs`
4. Create canonical dedicated product-page routes:
   - `/memory`
   - `/memory-qa`
   - `/workbench`
5. Preserve inbound compatibility:
   - `/prochat-memory` redirects to `/memory` after verification;
   - `/qa-memory` redirects to `/memory-qa` after verification.
6. Do not use a contact-query URL as the Workbench product destination.
7. Keep the homepage hero, trust strip, benefits, and system story niche-agnostic.
8. Introduce QA and Workbench only in lower product-specific sections or dedicated pages.
9. Preserve the Nexus-derived visual system across all canonical product pages.
10. Do not publish unverified repository, licensing, installation, free/open-source, or managed-service claims.

### Canonical page responsibilities

```text
/           company + generic Memory story
/memory     general flagship product page
/memory-qa  QA-specific edition page
/workbench  Workbench-specific product page
```

### Acceptance criteria

- Homepage hero contains no QA-only terminology or browser-run evidence.
- Homepage navigation uses canonical paths.
- `/memory-qa` is fully QA-specific.
- `/workbench` is fully Workbench-specific.
- `/memory` explains the general flagship model without pretending every niche edition exists.
- Legacy routes preserve inbound traffic.
- Canonical metadata and URLs are correct.
- Visual design remains coherent across pages.
- No unrelated page or feature is changed.
- PXF-003C does not begin in this packet.




## PXF-003C1 — Live Hero Motion Fidelity Spike

**Status:** READY
**Authority:** `docs/product/HYPERFRAMES_AND_LIVE_MOTION_EVALUATION.md`
**Coding:** yes
**Execution tool:** Codex with Playwright and browser performance inspection

### Purpose

Determine and validate the best original live implementation for the Nexus-style narrow blue/teal laser field behind the homepage hero.

### Required prototypes

1. Enhanced CSS/SVG using existing project dependencies.
2. Raw Canvas/WebGL shader with no added runtime dependency.
3. Optional helper-library prototype only if the first two reveal a measurable engineering need.

### Scope

- preserve the approved hero content and card hierarchy;
- replace or augment only the hero background animation layer;
- reproduce the reference's perceived narrow luminous field, depth, flow, and restrained node/orbit behavior;
- adapt the effect to ProChat Memory through evidence fragments and convergence toward structured memory;
- maintain a semantic static fallback;
- reduce motion and density on mobile;
- pause work when off-screen;
- preserve zero layout shift;
- keep the implementation original.

### Prohibited

- copying proprietary template source, shaders, or assets without verified permission;
- adding HyperFrames as a website runtime;
- adding a dependency before prototype evidence;
- replacing the hero with video;
- scroll hijacking;
- continuous animation behind every later section;
- beginning PXF-003D.

### Validation

```yaml
visual:
  - 1440x1000
  - 1024x900
  - 390x844
  - 320x800
  - reduced_motion
technical:
  - no_console_errors
  - no_webgl_errors
  - static_fallback
  - offscreen_pause
  - zero_layout_shift
  - no_horizontal_overflow
  - scoped_typescript
  - targeted_eslint
  - security_scan
  - git_diff_check
performance_targets:
  - additional_initial_js_gzip_lte_35kb
  - lcp_regression_lte_150ms
  - mobile_fps_gte_45_target
  - desktop_fps_gte_55_target
```

### Exit gate

- side-by-side evidence for each viable prototype;
- measured bundle and runtime cost;
- owner recommendation and selected approach;
- production-quality implementation of only the selected approach;
- documented fallback and reduced-motion behavior;
- no commit unless explicitly authorized.

### Follow-up

After PXF-003C1 is reviewed, continue with:

```text
PXF-003D — Homepage Product Introduction: Memory for QA and Workbench
```

HyperFrames remains reserved for:

```text
PXF-MOTION-VIDEO-001 — future optional rendered motion-asset pipeline
```




## PXF-003E — Combined Adoption Chapter

**Status:** READY
**Authority:** reconciled Mind legal/public-platform authority and `docs/product/PUBLIC_CONVERSION_STRATEGY.md`
**Coding:** yes
**Execution tool:** Codex with Playwright

### Purpose

Add one homepage chapter after the current product-introduction chapter that converts visitors into the correct product-specific participation path without flattening legal, licensing, or availability differences.

### Memory for QA path — primary

Approved facts and actions:

- public repository: `https://github.com/prochattools/memory-qa`;
- public source-available selected beta;
- free for approved beta participants;
- view and star repository;
- apply for selected beta;
- approved participants may clone and evaluate locally under the beta license;
- report sanitized feedback through GitHub Issues or Discussions.

Prohibited:

- calling Memory for QA open source;
- general installation or unrestricted-use language;
- code-contribution or pull-request invitation;
- production-readiness claims;
- commercial-use claims without a separate written agreement.

### Workbench path — secondary

Approved facts and actions:

- public repository: `https://github.com/prochattools/workbench`;
- free and self-hosted;
- open source under `AGPL-3.0-only`;
- view, star, fork, clone, and self-host;
- open an issue or join a discussion;
- propose a contribution;
- separate commercial or OEM licensing may be requested.

Required qualification:

- external pull-request merge requires the contributor-rights workflow;
- do not promise merge, support response time, or commercial/OEM rights under the public license.

### Chapter requirements

1. Insert after `#current-products`.
2. Keep Memory for QA visually primary.
3. Preserve Workbench as a separate second product.
4. Use direct GitHub-native labels.
5. Do not create a universal “open source” or “install now” message.
6. Do not add managed-service packaging.
7. Do not add analytics claims or counters.
8. Do not display unverified star, install, issue, or contribution counts.
9. Preserve Nexus-derived visual language, accessibility, reduced motion, and 320px responsiveness.
10. Do not implement the closing CTA or footer redesign in this packet.

### Validation

```yaml
static:
  - scoped_typescript
  - targeted_eslint
  - design_lint_with_unrelated_findings_separated
  - changed_path_security_scan
  - git_diff_check
browser:
  - 1440x1000
  - 1024x900
  - 390x844
  - 320x800
  - full_page_desktop
  - full_page_mobile
  - reduced_motion
behavior:
  - repository_links_resolve
  - memory_qa_claims_are_source_available_beta_only
  - workbench_claims_include_AGPL_3_0_only
  - no_horizontal_overflow
  - visible_focus_states
  - no_console_or_request_errors
```

### Stop condition

Stop after the Combined Adoption Chapter and its responsive/browser validation. Do not begin closing CTA, managed implementation, analytics, footer redesign, or later work.

---

## PXF-017 — Public professionalism implementation record

**Status:** COMPLETE  
**Deployed:** 2026-08-06  

### Implemented

1. **Docs routing through canonical shell** — `/docs` and `/docs/[category]/[[...slug]]` changed from `no_shared_shell` to `canonical_public_shell` in `shell-routes.ts`. New `DocsPublicShell` component uses `<div className="pc-canonical-main">` to avoid dual-`<main>` conflict with Nextra's own `<main data-pagefind-body>`.

2. **First-paint flash removed** — `brand.ts` `darkBackground` `#0B1220` → `#000000`; `viewport.themeColor` now pure black. `globals.scss` html/body and `*` background/color/border transition blocks removed.

3. **Dead code removed** — `.pc-skip-link` and `.pc-skip-link:focus-visible` CSS removed from `prochat-foundation.css`.

4. **Nextra skip control suppressed** — Created `src/styles/docs.css` (already imported by `DocsThemeLayout`) with `.nextra-skip-nav { display: none !important }`. Nextra's `Layout` unconditionally renders `SkipNavLink`; our canonical `MarketingNav` provides the equivalent keyboard entry point.

5. **Provider routing corrected** — `providers.tsx` uses `getShellRouteClass() === 'canonical_public_shell'` so docs routes use `CanonicalPublicProviders`.

6. **Accessibility exceptions** — Two `ReviewedAxeException` entries added for docs `link-in-text-block` (Nextra `.x:underline` not parsed by Axe CSS engine).

7. **Browser evidence spec** — `tests/evidence/canonical-chrome-proof.spec.ts` covers 8 routes × 2 viewports + Docs 320px: HTTP success, pathname, skip-control absence (case-insensitive), black backgrounds, black theme-color, no background transitions, geometry consistency (±2px), no horizontal overflow, Contact copy and layout, Docs layout. Client navigation test: homepage → docs → contact → homepage.

8. **CI wired** — `test:evidence:ci` in `package.json` now includes `canonical-chrome-proof.spec.ts`. `/test-results/` added to `.gitignore`.

9. **Test fixes** — contact visual test for current shell architecture; honeypot field `company_website`; redirect test switched to source-file assertion.

### Commits

```text
9143deb fix: replace flaky HTTP redirect test with source-file assertion
5d83fb5 fix: correct legacy-compatibility test assertions for honeypot and redirect
0d32ee3 fix: update contact visual closeout test for canonical shell architecture
b3c726b fix: add reviewed exceptions for docs link-in-text-block violations
51ca17a fix: use div content slot for docs shell to preserve single main landmark
1aca539 test: lock public chrome and contact layout
7cfcc05 fix: remove remaining docs skip control
74630f7 test: run canonical chrome proof in CI
```

### Evidence suite at deployment

- docs-mobile: 6 tests
- canonical-route-smoke: 18 tests + 2 contact visual
- canonical-accessibility: 19 tests (Axe across 8 routes × 2 viewports)
- canonical-chrome-proof: 26 tests (chrome invariants, geometry, docs, contact, client nav)
- Total: 66 browser evidence tests

### Stop condition met

Public professionalism packet complete. No route decisions, auth, or design expansion.

---

## Phase 11 — Legacy migration and removal (PARTIAL)

**Status:** Awaiting owner approval on 16 pending legacy-surface classification decisions.

**For owner approval:** Review `docs/platform/PXF018_OWNER_APPROVAL_MANIFEST.md` — 16 items with evidence-backed proposed dispositions, override options, and sign-off block.

**Implementation blueprint:** `docs/platform/PXF018_IMPLEMENTATION_PLAN.md` (packet specifications PXF-018A through PXF-018I with dependencies, validation, rollback).

**Audit evidence:** `docs/platform/PXF018_OWNER_DECISION_BRIEF.md` (findings) and `docs/platform/LEGACY_OWNER_DECISION_WORKSHEET.md` (detailed evidence tables).

Only signed owner dispositions authorize mapped implementation packets.
