# ProChat Public Platform Roadmap

**Status:** canonical repository-local execution roadmap
**Owner:** Steve Westhoek
**Scope:** ProChat public platform, design system, migration, public pages, validation, launch, and maintenance
**Last updated:** 2026-08-05

## Authority

Mind is canonical for company, product, brand, public-platform, and cross-product truth.

Read before changing public strategy, page hierarchy, claims, design direction, product naming, founder positioning, or roadmap scope:

```text
mind/wiki/organisations/prochat/brand/README.md
mind/wiki/organisations/prochat/brand/company-principles.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/brand/public-platform-strategy.md
mind/wiki/organisations/prochat/brand/brand-governance.md
mind/wiki/organisations/prochat/brand/public-platform-roadmap.md
mind/wiki/organisations/prochat/brand/canonical-homepage-copy.md
mind/wiki/organisations/prochat/brand/global-design-foundation.md
mind/wiki/organisations/prochat/brand/website-visual-motion-system.md
mind/wiki/organisations/prochat/brand/website-build-contract.md
```

This repository translates that truth into design, migration, implementation, testing, and production behavior. It must not redefine the company or product family independently.

## Verified current state

```yaml
validated_program_head: 91436457e4d3aa8a5d9782ff671ce49e10d7ef07
validated_docs_mobile_head: ada06665f5944fc988f4dad4a5fed47cee471d8b
validated_closeout_head: 29854de09b04792c377d0bba7528297acb14c155
validated_production_baseline_head: 91436457e4d3aa8a5d9782ff671ce49e10d7ef07
last_verified_production_head: 7cfa1261de651dbb1ba602e3f7df4f8d8d5f9343
last_verified_production_at: 2026-08-04T19:15:00Z
deployment_observation_source: Main workflow run 30939864855 (canonical chrome closeout) + cleanup commit 7cfa126 deployed; direct production /api/version, /api/health, /docs, and eight-route verification (all 8 routes HTTP 200)
validated_date: 2026-08-04
documentation_sync_status: Immutable validation anchors describe completed program evidence; deployment observation fields describe the last verified production state without claiming to track the live repository HEAD.
current_program_state: The canonical public chrome closeout is deployed to production (SHA 7cfa126). All eight canonical routes serve with unified navigation and footer. Contact page centered in neutral dark viewport. 12 verified-unused legacy components removed (ButtonGradient, BetterIcon, ButtonSignin, HeroStandard, HowToUse, SaveMoney, StripePortalButton, Testimonial1Small, TestimonialRating, Testimonials1, TestimonialsAvatars, theme-provider). All checks passed (TypeScript, ESLint, design governance, 40/40 browser/accessibility). Owner-directed benchmark tuning remains closed. Phase 11 PARTIAL (legacy inventory created, first cleanup deployed); Phase 11 protected-route hardening not yet started. PXF-018A is locally validated: environment-only MailerLite configuration, deterministic secret-source policy, shared fixed-window limiting, strict API security evidence, TypeScript, lint, and a 109-page production build pass. Push, CI, deployment observation, and external credential revocation/rotation remain pending.
current_phase: Phase 13 — continuous governance
current_packet: PXF-018A — real security remediation (MailerLite credential exposure, project API fail-closed, test coverage, CI secret scanning)
canonical_visual_routes_active: 8
canonical_routes: /, /memory, /memory-qa, /workbench, /docs, /contact, /privacy, /terms
legacy_redirects_active: /prochat-memory -> /memory; /qa-memory -> /memory-qa
production_visual_design_started: true
production_visual_implementation: COMPLETE
public_platform_code_status: DEPLOYED_PRODUCTION
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
development_labs: EXCLUDED_UNLINKED
closeout_push_status: COMPLETE — ada06665f5944fc988f4dad4a5fed47cee471d8b, 29854de09b04792c377d0bba7528297acb14c155, and ecc0fdfe8dda0e285c7aea8e3aaded97ef0003ba reached origin/main on 2026-07-31; PXF-016A/B/B1/B2 chain (7260f87e0c449cfb3441c42dbdd1c8a0ab57e5e9) pushed and deployed 2026-08-01; PXF-016C/C1/C2 chain pushed 2026-08-02 and deployed as 853207b49f338c4832e1f8a84e237ca6bf0c400b; PXF-016E final push and deploy 2026-08-04
pxf_017a_legacy_cleanup: 7cfa126 (HEAD, origin/main) — 12 verified-unused components removed from src/components/: ButtonGradient, BetterIcon, ButtonSignin, HeroStandard, HowToUse, SaveMoney, StripePortalButton, Testimonial1Small, TestimonialRating, Testimonials1, TestimonialsAvatars, theme-provider. All have zero verified consumers (grep search). Validation: TypeScript ✓, ESLint ✓, design governance ✓, build ✓ (109 pages), accessibility ✓. Deployed 2026-08-04T19:15Z after Main workflow 30939864855 success.
deployment_status: VERIFIED — production /api/version matched 7cfa1261de651dbb1ba602e3f7df4f8d8d5f9343 after PXF-017A deployment (canonical chrome closeout + 12-component cleanup); all 8 canonical routes HTTP 200; Contact page: neutral dark background, centered form; footer visible on all pages; CI: TypeScript ✓, ESLint ✓, design governance ✓, 40/40 browser tests ✓, accessibility ✓, production build ✓, 109 static pages (no change from cleanup); performance evidence collected (informational, non-blocking per owner direction)
```

## Operational phase summary

Supporting detail below remains useful, but this phase summary is canonical for execution status.

| Phase | Status | Purpose | Prerequisites | Completed evidence | Expected outputs | Exit gate | Next dependent phase |
|---|---|---|---|---|---|---|---|
| Phase 1 | DONE | Company truth and product hierarchy | none | Mind commits `1461678`, `7687bb8`; ProChat translation docs | repository authority alignment | canonical company/product docs and product hierarchy are consistent | Phase 2 |
| Phase 2 | DONE | Public platform architecture | Phase 1 | current repo translation docs | page map, navigation, footer, legal paths | public platform responsibilities are defined | Phase 3 |
| Phase 3 | DONE | Canonical content second pass | Phases 1–2, canonical homepage copy | all public copy, metadata, legal, and contact implemented and deployed | operational content audit, claims register, metadata matrix | every claim and page has an approved or classified status | Phase 4 |
| Phase 4 | DONE | Design-language foundation | Phases 1–3 | design and platform docs committed; Nexus-derived design system deployed | visual grammar, product visuals, motion language, component contract | design decisions are explicit and reviewable | Phase 5 |
| Phase 5 | DONE | Foundational legacy sweep | Phases 1–4 | route, component, style, motion, asset, dependency, and migration audits | inventory and classification matrix | every legacy item has a provisional disposition and wave | Phase 6 |
| Phase 6 | SUPERSEDED | Design laboratory and static prototypes | Phases 3–5, Wave 0, Wave 1, Wave 2 | PXF-003A through PXF-003E implemented production pages directly from approved template adoption | isolated lab shell and static specimens | superseded by direct template-adoption implementation path; production pages implemented and deployed | Phase 7 |
| Phase 7 | SUPERSEDED | Motion and product-story prototypes | Phase 6 and approved static direction | hero motion, memory illustrations, and background animation implemented and deployed | motion proofs and browser tooling decisions | superseded; production motion system deployed | Phase 8 |
| Phase 8 | SUPERSEDED | Independent review | Phases 3, 5, 6, 7 | iterative production review via PXF-003 through PXF-006 packets | review report and findings reconciliation | superseded; accessibility, responsive, and design reviews completed in production packets | Phase 9 |
| Phase 9 | DONE | Production foundation | Phase 8 and approved migration rows | Nexus-derived dark tokens, Golos Text, shared marketing layout, canonical routes | fonts, tokens, shells, primitives, tests, and infrastructure | production foundation deployed | Phase 10 |
| Phase 10 | DONE | Public pages | Phase 9 and approved page copy | all 8 canonical routes deployed: /, /memory, /memory-qa, /workbench, /docs, /contact, /privacy, /terms | canonical public pages and shell updates | all required public responsibilities implemented and production-verified | Phase 11 |
| Phase 11 | PARTIAL | Legacy migration and removal | Phase 10 and verified replacements | legacy redirects active; legacy code and styles deferred to future cleanup wave | redirects, archives, and bounded removals | legacy redirects implemented; full style/component removal deferred to future wave | Phase 12 |
| Phase 12 | PARTIAL | Production craft and launch validation | Phase 11 | accessibility repairs, responsive fixes, metadata, social previews, analytics tracking, docs mobile TOC overlap fix deployed, and 40/40 canonical viewport audit completed | visual and launch acceptance verified; formal accessibility and performance evidence remains | site is live and passing CI; responsive, focus, reduced-motion, metadata, analytics, and docs-mobile evidence pass, while formal WCAG 2.2 AA audit and measured performance baseline remain deferred | Phase 13 |
| Phase 13 | ONGOING | Continuous governance | launch | platform live and deployed | review and maintenance cadence | — | Phase 13 |
| Phase 14 | COMPLETE | Design-system governance and launch hardening | Phase 12 | token architecture documentation, enforcement linting, docs migration, repository classification, accessibility hardening | canonical design authority established, token drift prevented, artifact classification complete; commit `54b6de4`, successful CI workflow `30555031503`, matching immutable/latest GHCR digest, and production route checks | governance implementation and release gates complete; Dokploy terminal identity remained unavailable | Phase 15 |
| Phase 15 | COMPLETE | Externally verifiable release identity | Phase 14 | `/api/version`, revision response header, immutable image reference, build timestamp, OCI revision labels, CI build arguments | implementation commit `20295c5`; validated production baseline `91436457` matched `/api/version`; later deployment observation `ecc0fdf` retained the release metadata contract | deployed endpoint returned the full production release commit, immutable image reference, and UTC build timestamp | Phase 13 continuous governance |

The historical Product Experience Foundation program delivered the public-platform implementation at HEAD `0f1a85e`. Phase 14 (PXF-010) completed governance hardening at `54b6de4`. Phase 15 established externally verifiable release identity at `20295c5`; `91436457` remains the immutable validated production baseline, while the latest dated production observation verified `ecc0fdf` through the same public release-identity contract.

## Product and company boundary

```text
Company: ProChat
Flagship product: ProChat Memory
Current edition and primary conversion path: ProChat Memory for QA
Second product: ProChat Workbench
Founder: Steve Westhoek — QA Engineer and Founder of ProChat
```

Exactly two current products exist:

```text
ProChat Memory
ProChat Workbench
```

Memory for QA is an edition of Memory, not a third product.

BuildFlow may remain a technical compatibility identifier where required. It is not a public product.

## Program outcome

Build a durable, fast, accessible, mobile-first, expandable public platform that:

- presents ProChat as a real software company;
- communicates the company philosophy;
- establishes Memory as the flagship;
- converts qualified QA visitors toward the current edition;
- explains Workbench as the second product;
- uses one coherent design and motion language;
- replaces legacy copy, pages, styles, components, motion, assets, and dependencies deliberately;
- supports company, product, legal, contact, documentation, and error experiences;
- remains maintainable after launch.

## Program rules

1. Principles precede guidance; guidance precedes code.
2. Static design quality precedes cinematic motion.
3. Mobile, accessibility, and performance are first-phase constraints.
4. Existing production code is inventory, not design authority.
5. Inventory and classify legacy work before removal.
6. Build and verify replacements before deleting public or shared surfaces.
7. Every page has one primary audience, one primary job, and one primary next step.
8. Every major visual explains a product mechanism or boundary.
9. Every phase ends with documented validation and an explicit commit boundary.
10. Production implementation does not begin until its design and migration gates pass.

## Status legend

```text
DONE — canonical outputs exist and are committed
READY — dependencies are satisfied and the task may begin
BLOCKED — the task is decided but cannot start because of an external or prerequisite blocker
NOT_READY — the task is defined but depends on earlier work
ONGOING — recurring governance after launch
```

# Phase 1 — Company foundation

**Status:** COMPLETE in Mind; repository translation complete.

## Goal

Make the highest-level company identity, philosophy, product structure, founder relationship, and public decision principles explicit.

## Dependencies

None.

## Tasks

- define company belief, vision, and mission;
- define memory, evidence, human-review, and AI-use philosophy;
- define product and trust principles;
- define design and communication philosophy;
- define company/founder positioning;
- define company decision tests;
- reconcile product strategy and narrative.

## Deliverables

Mind:

```text
company-principles.md
product-strategy.md
narrative.md
brand-ruleset.md
```

ProChat:

```text
PRODUCT.md
DESIGN.md
brand-spec.md
```

## Exit criteria

- ProChat is consistently presented as the company;
- Steve is presented as QA Engineer and Founder;
- the website is not a freelance portfolio;
- the two-product hierarchy is exact;
- philosophy and product strategy do not conflict.

# Phase 2 — Public platform architecture

**Status:** COMPLETE in Mind; repository specification complete.

## Goal

Define the complete public platform, page responsibilities, navigation, footer, conversion hierarchy, legal paths, and founder presentation.

## Dependencies

Phase 1.

## Tasks

- define canonical page map;
- define primary audience, job, and CTA per page;
- define navigation and footer architecture;
- define documentation role;
- define Contact and beta paths;
- define Privacy and Terms responsibilities;
- define metadata, sitemap, robots, and social responsibilities;
- define company/founder separation.

## Deliverables

```text
docs/platform/PAGE_ARCHITECTURE.md
Mind public-platform-strategy.md
```

## Required page responsibilities

```text
Homepage
ProChat Memory
ProChat Memory for QA
ProChat Workbench
Philosophy
About
Contact and beta forms
Privacy
Terms
Documentation entry
404 and error states
Navigation
Footer
Metadata, sitemap, robots, and social assets
```

## Exit criteria

- every required page has one primary job;
- company, flagship, current edition, and second product remain distinguishable;
- navigation and footer expose the correct hierarchy;
- no legacy route is treated as current without a decision.

# Phase 3 — Canonical content second pass

**Status:** READY after this documentation commit.

## Goal

Review every existing and planned public page against the completed company philosophy and public-platform architecture.

## Dependencies

Phases 1–2 and canonical homepage copy.

## Tasks

- inventory all public copy and metadata;
- create route-level claims register;
- review the homepage copy a second time;
- review or write ProChat Memory page copy;
- review or write Memory for QA page copy;
- review or write Workbench page copy;
- write Philosophy page copy;
- write About page copy;
- write Contact and beta-form copy;
- review Privacy and Terms;
- write documentation-entry copy;
- write 404, error, loading, success, and blocked-state copy;
- define header, footer, navigation, and form microcopy;
- define metadata and social copy;
- classify legacy terminology and claims.

## Deliverables

```text
docs/migration/CONTENT_AUDIT.md
page-specific canonical copy files or approved copy sections
claims register
terminology replacement map
metadata matrix
legal review list
```

## Exit criteria

- every required page has approved copy before production design;
- every claim is approved, qualified, beta-only, future, unverified, prohibited, or legal-review-required;
- no active page depends on legacy product terminology;
- legal and privacy questions are explicitly identified.

# Phase 4 — Design-language foundation

**Status:** COMPLETE for documentation; prototype validation remains in Phase 6.

## Goal

Translate company and product philosophy into a precise visual grammar, product visual library, motion language, component contract, and technical foundation.

## Dependencies

Phases 1–3 for final copy mapping; existing canonical design decisions.

## Tasks

- define design principles;
- define visual grammar;
- define Memory, QA, Workbench, and shared visual primitives;
- map important copy propositions to visuals;
- define motion storyboards and named states;
- define design-lab rules;
- define production-component lifecycle;
- define page architecture;
- define mobile-first responsive strategy;
- define WCAG 2.2 AA accessibility strategy;
- define performance budgets and measurement;
- maintain Golos Text, JetBrains Mono, grayscale, and ProChat Cobalt as global truth.

## Deliverables

```text
docs/design/DESIGN_PRINCIPLES.md
docs/design/VISUAL_LANGUAGE.md
docs/design/PRODUCT_VISUAL_LIBRARY.md
docs/design/COPY_VISUAL_MAP.md
docs/design/MOTION_STORYBOARD.md
docs/design/DESIGN_LAB.md
docs/design/COMPONENT_LIBRARY.md
docs/platform/PAGE_ARCHITECTURE.md
docs/platform/RESPONSIVE_STRATEGY.md
docs/platform/ACCESSIBILITY_STRATEGY.md
docs/platform/PERFORMANCE_STRATEGY.md
```

## Exit criteria

- each major proposition has an approved visual grammar;
- product visual states are named;
- mobile and reduced-motion expectations are explicit;
- implementation agents do not need to invent foundational design decisions;
- no second font, palette, smooth-scroll engine, or unapproved visual system remains unresolved.

# Phase 5 — Foundational legacy sweep

**Status:** COMPLETE for inventory, classification, archive architecture, and wave planning. Wave 0 is the next executable packet.

## Goal

Inventory and classify all legacy public-platform code, copy, routes, components, styles, motion, assets, dependencies, metadata, analytics, and documentation before removal.

## Dependencies

Phases 1–4.

## Tasks

- complete content audit;
- complete route audit;
- complete component audit;
- complete style and token audit;
- complete motion audit;
- complete asset and font audit;
- complete dependency audit;
- inspect metadata, sitemap, robots, analytics, forms, and content-platform integrations;
- populate the migration matrix;
- assign every item one disposition;
- assign migration wave, risk, validation, rollback, and owner;
- identify deletion approvals required;
- identify protected unrelated application areas.

## Deliverables

```text
docs/migration/LEGACY_SWEEP_PLAN.md
docs/migration/MIGRATION_MATRIX.md
docs/migration/CONTENT_AUDIT.md
docs/migration/ROUTE_AUDIT.md
docs/migration/COMPONENT_AUDIT.md
docs/migration/STYLE_AUDIT.md
docs/migration/MOTION_AUDIT.md
docs/migration/ASSET_AUDIT.md
docs/migration/DEPENDENCY_AUDIT.md
docs/migration/ARCHIVE_ARCHITECTURE.md
docs/migration/MIGRATION_WAVES.md
completed inventory records and final provisional classifications
```

## Dispositions

```text
KEEP
REFACTOR
REWRITE
REPLACE
ARCHIVE
REDIRECT
DELETE
```

## Exit criteria

- all relevant active and legacy items are inventoried;
- no deletion remains ambiguous;
- every item has a canonical destination and migration wave;
- public route and SEO risks are mapped;
- shared consumers and rollback boundaries are known;
- the matrix has no unexplained critical item.

# Phase 6 — Design laboratory and static prototypes

**Status:** PLANNED as Migration Wave 3, after Wave 0 archive governance and the additive Wave 1–2 foundation packets.

## Goal

Prove the visual system and static page compositions in an isolated browser environment before production pages change.

## Dependencies

Phases 3–5, Wave 0 archive governance, Wave 1 canonical root/font/token boundary, and Wave 2 additive component/product-visual foundations.

## Tasks

- create design-lab route and indexing protections;
- build typography, color, spacing, border, radius, shadow, focus, and status specimens;
- build Memory visual primitives;
- build QA visual primitives;
- build Workbench visual primitives;
- build three materially different static homepage hero directions;
- build mobile hero variants;
- select and document one hero direction;
- build static page directions for Memory, QA, Workbench, Philosophy, About, Contact, legal, documentation, and errors;
- build full-page low-fidelity assembly;
- create deterministic prototype states and screenshots;
- run five-second comprehension review.

## Restrictions

- no GSAP installation before static hero approval;
- no production homepage mutation;
- no new palette, font, or product claim;
- no lorem ipsum or generic rectangles;
- use sanitized product examples.

## Exit criteria

- static quality works without animation;
- one hero direction is approved;
- product primitives feel specific to ProChat;
- mobile foundations are approved;
- legal and utility pages fit the same system without cinematic excess;
- no foundational visual question blocks motion prototyping.

# Phase 7 — Motion and product-story prototypes

**Status:** PLANNED after Phase 6.

## Goal

Prove premium scroll-driven storytelling while preserving native scrolling, accessibility, responsiveness, and speed.

## Dependencies

Approved static compositions and named states.

## Tasks

- review and add GSAP, ScrollTrigger, and `@gsap/react` only now;
- configure Playwright and axe tooling;
- prototype hero sequence;
- prototype Memory lifecycle;
- prototype relevant-context selection;
- prototype QA investigation;
- prototype Workbench control plane;
- create mobile scene versions;
- create reduced-motion versions;
- create deterministic visual-test states;
- test forward, reverse, resize, orientation, navigation cleanup, and restored scroll;
- capture performance traces and bundle cost;
- simplify any sequence exceeding budgets.

## Approved major pinned sequences

```text
Homepage hero
Memory lifecycle
Relevant context
QA investigation
```

Workbench is animated but not pinned by default.

## Exit criteria

- motion explains product behavior;
- static and reduced-motion forms remain complete;
- native scrolling remains predictable;
- no text becomes unreadable during motion;
- cleanup is deterministic;
- performance budgets hold on realistic mobile conditions;
- no motion exists only for spectacle.

# Phase 8 — Independent design and implementation review

**Status:** PLANNED after Phase 7.

## Goal

Challenge product truth, design, motion, accessibility, performance, feasibility, conversion, and legal boundaries before production integration.

## Dependencies

Full design-lab prototype and legacy matrix.

## Tasks

- run product-truth review;
- run design-plan review;
- run motion review;
- run mobile review;
- run accessibility review;
- run performance review;
- run technical feasibility review;
- run conversion review;
- run legal and privacy review;
- reconcile all findings into canonical repository documents;
- accept or reject each finding with rationale;
- finalize production packets.

## Exit criteria

- unresolved findings are explicit;
- approved changes are documented;
- production tasks have exact inputs, files, validation, rollback, and commit boundaries;
- no hidden foundational uncertainty remains.

# Phase 9 — Production foundation

**Status:** PLANNED after Phase 8.

## Goal

Implement global fonts, tokens, shell, components, motion infrastructure, tests, and coexistence boundaries before public page assembly.

## Dependencies

Approved prototypes, review findings, and migration matrix.

## Tasks

- implement Golos Text and JetBrains Mono;
- implement semantic design tokens;
- define legacy/new style containment;
- implement container, surface, type, link, button, form, and status foundations;
- implement header, mobile navigation, footer, breadcrumbs, TOC, legal metadata, and error primitives;
- implement approved product visual primitives;
- implement reduced-motion utilities;
- implement scoped GSAP infrastructure;
- implement deterministic visual states;
- implement Playwright visual and functional tests;
- implement axe checks;
- implement performance measurement and bundle review;
- protect design-lab routes from navigation, sitemap, and indexing.

## Exit criteria

- production build passes;
- foundations are documented and tested;
- desktop, mobile, focus, and reduced-motion states exist;
- legacy and new systems have explicit boundaries;
- shared primitives do not expose arbitrary design escape hatches.

# Phase 10 — Public page implementation

**Status:** PLANNED after Phase 9.

## Goal

Build the complete company public platform in bounded page packets.

## Implementation order

1. Homepage
2. ProChat Memory
3. ProChat Memory for QA
4. ProChat Workbench
5. Philosophy
6. About
7. Contact and beta forms
8. Privacy
9. Terms
10. Documentation entry points
11. 404 and error states
12. Navigation, footer, metadata, sitemap, robots, and social assets reconciliation

## Per-page requirements

- approved copy;
- primary audience, job, and CTA;
- visual story;
- mobile composition;
- reduced-motion behavior;
- accessibility behavior;
- metadata and structured data;
- analytics events where approved;
- visual regression states;
- performance review;
- claim review;
- route and legacy impact;
- explicit commit boundary.

## Exit criteria

- all required public responsibilities are implemented;
- the homepage is company-first and Memory-dominant;
- QA is the strongest conversion path;
- Workbench is clear but secondary;
- founder/company separation is correct;
- legal, contact, documentation, and error paths are complete.

# Phase 11 — Legacy migration and removal

**Status:** PARTIAL (redirects active, inventory created, first cleanup deployed; protected-route hardening design pending).

## Goal

Retire obsolete public-platform implementation safely and simplify the repository.

## Dependencies

Phase 10 replacements and Phase 5 migration decisions.

## Tasks

- activate approved redirects;
- migrate remaining consumers;
- archive historical documentation;
- retire duplicate public routes;
- remove obsolete copy sources;
- remove legacy components;
- remove old fonts, tokens, themes, gradients, and style files;
- remove obsolete motion utilities;
- remove unused assets;
- remove unused dependencies and update lockfile;
- update tests and docs;
- search for old imports, names, routes, tokens, and claims;
- verify route, SEO, analytics, accessibility, and performance behavior;
- commit removal waves separately.

## Exit criteria

- no current page depends on obsolete design systems;
- no legacy product appears publicly as current;
- redirect and sitemap behavior is verified;
- zero-consumer proof exists for removed code and packages;
- repository complexity is materially reduced;
- rollback commits remain clear.

# Phase 12 — Production craft and launch validation

**Status:** PARTIAL (40/40 browser/accessibility evidence passed; formal WCAG 2.2 AA audit and measured performance baseline remain deferred).

## Goal

Reach premium production quality and launch with complete evidence.

## Tasks

- typography and line-break polish;
- spacing, hierarchy, and composition polish;
- motion timing and continuity polish;
- focus, hover, pressed, loading, success, error, empty, blocked, and unavailable states;
- current Chrome, Safari, Firefox, and Edge testing;
- mobile, tablet, desktop, touch, mouse, keyboard, and trackpad testing;
- screen-reader and 200% zoom review;
- reduced-motion review;
- WCAG 2.2 AA audit;
- Core Web Vitals and performance-budget review;
- visual-regression review;
- five-second comprehension testing;
- CTA and form validation;
- privacy and legal approval;
- metadata and social preview review;
- analytics verification;
- security and production-safety review;
- final claim review;
- release and monitoring plan.

## Exit criteria

- accessibility, performance, browser, product-truth, and design gates pass;
- no critical or serious open defect remains;
- launch evidence is stored;
- debug and prototype tooling is not publicly discoverable;
- final production commits are isolated and reviewable.

# Phase 13 — Continuous governance

**Status:** ONGOING after launch.

## Goal

Keep the platform coherent, current, accessible, fast, and aligned with product reality.

## Tasks

- monitor field performance and errors;
- review accessibility regularly;
- review comprehension and conversion evidence;
- review design-system adoption and exceptions;
- review stale pages and content freshness;
- review dependency, licence, and security status;
- review analytics and privacy behavior;
- reconcile product-stage changes with Mind;
- review canonical documents quarterly while pre-revenue;
- deprecate before removal;
- maintain migration and component lifecycle records.

## Exit criteria

This phase does not end. Each review cycle ends with recorded findings, decisions, validation, commits, and the next review date.

# Current position

```text
Phase 1 — DONE
Phase 2 — DONE
Phase 3 — DONE
Phase 4 — DONE
Phase 5 — DONE
Phase 6 — SUPERSEDED (production pages implemented via template-adoption path)
Phase 7 — SUPERSEDED (motion system deployed in production)
Phase 8 — SUPERSEDED (iterative review completed in production packets)
Phase 9 — DONE
Phase 10 — DONE
Phase 11 — PARTIAL (redirects live; full legacy removal deferred)
Phase 12 — PARTIAL (site live; formal WCAG/performance audit deferred)
Phase 13 — ONGOING
```

The historical Product Experience Foundation implementation and PXF-010 governance repair are complete. The platform remains in continuous governance (Phase 13), while Phase 15 adds externally verifiable release identity so future production attestation does not depend on privileged Dokploy access.

## Final design-hardening closeout

- Screenshot-based audit: 40/40 canonical route/viewport combinations pass for the immutable local closeout chain: docs-mobile implementation commit `ada06665f5944fc988f4dad4a5fed47cee471d8b` and evidence/metadata closeout commit `29854de09b04792c377d0bba7528297acb14c155`. Production remains separately verified at `91436457e4d3aa8a5d9782ff671ce49e10d7ef07`. The tested widths are 1440, 1024, 768, 390, and 320 pixels; the seven non-docs canonical routes retained contained document widths in the representative regression sample.
- `/docs` root cause and fix: the imported prefixed Nextra responsive utilities left the desktop sidebar and table of contents in the mobile flex row, producing a 544px intrinsic document width and collapsing the article heading. `styles/docs.css` now establishes a single mobile content column, constrains grid/flex children and article content with `min-width: 0`/`max-width: 100%`, and removes the desktop sidebar and TOC below 768px while preserving internal code/table scrolling.
- Focus validation: separate from the screenshot count. A fresh 390px Playwright page traversed the skip link, shared mobile Menu summary, docs links, and footer links with visible outline/box-shadow evidence. Nextra exposes no mobile docs drawer trigger in this integration; the desktop sidebar/TOC are intentionally hidden below 768px, so drawer Escape/focus restoration is not applicable. The available Menu path was opened by keyboard and Escape left focus non-body.
- Reduced motion: explicitly emulated with `page.emulateMedia({ reducedMotion: 'reduce' })`; `matchMedia('(prefers-reduced-motion: reduce)')` returned true and the global document transition duration was `0s`.
- Design governance debt: all 39 exemption entries remain controlled continuous-governance debt; none were removed by this packet.
- Shell boundary: the canonical marketing, docs, protected, and legacy shells remain intentionally distinct.

## Product Experience Foundation Program

The six-deliverable discovery-to-design sequence is canonical repository-local execution work and is defined in:

```text
docs/product/PRODUCT_EXPERIENCE_FOUNDATION_PROGRAM.md
```

### Cross-repository authority

The Mind repository is the sole authority for ProChat company philosophy, product strategy, naming, hierarchy, positioning, audience, offer, business stage, legal-policy direction, growth policy, and cross-product roadmap.

Canonical Mind entry point:

```text
mind/organizations/prochat/README.md
```

This ProChat repository executes the marketing experience. It must link to Mind, must not duplicate or reinvent high-level business strategy, and must escalate new strategic conclusions to Mind before using them as website direction.

This program delivered the full production public platform through an approved template-adoption path. All deliverables are complete.

| Order | Deliverable | Final status | Evidence |
|---:|---|---|---|
| 0 / 1 | Mind-grounded founder discovery | COMPLETE | founder synthesis confirmed and promoted to canonical Mind philosophy |
| 2 | Homepage information architecture | COMPLETE | Nexus section sequence adapted to ProChat responsibilities |
| 3 | Applied design language | COMPLETE | Nexus-derived dark system with Golos Text deployed |
| 4 | Wireframe/template mapping | COMPLETE | supplied full-page template adopted as layout reference |
| 5 | High-fidelity visual direction | COMPLETE | template adoption approved and implemented |
| 6 | Implementation plan | COMPLETE | PXF-003A through PXF-006F executed and deployed |

### Completed implementation sequence

```text
PXF-003A — Nexus-template homepage foundation
PXF-003B0 — Public conversion strategy foundation
PXF-003B1A — Memory illustration architecture
PXF-003B2A — Product hierarchy and canonical routes
PXF-003C1 — Live hero motion fidelity
PXF-003E — Combined adoption chapter
PXF-004 — (production refinements)
PXF-005 — (responsive, docs, contact, design alignment)
PXF-006A–F — (metadata, a11y, sitemap, privacy, terms, onboarding, analytics tracking)
PXF-006G — Roadmap reconciliation and program closure
```




## Homepage template cutover — 2026-07-18

The active public-homepage direction is now:

```text
docs/product/HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md
```

Decision:

- adopt the supplied Nexus automation landing-page template as the direct structural and visual implementation reference;
- use Golos Text as the primary font;
- recreate the template's dark theme, navigation, hero, background animation, cards, diagrams, arrows, offer block, CTA, footer, and motion character;
- adapt symbols and diagrams to ProChat Memory concepts;
- preserve Mind-controlled product hierarchy and claims;
- replace pricing with truthful product/access paths while ProChat remains pre-revenue;
- freeze the Seedance/video-scroll/frame-sequence direction as optional future research.

### Current homepage execution status

| Task | Status | Gate |
|---|---|---|
| Reference template adoption | COMPLETE | owner decision documented |
| Template token extraction | INITIAL COMPLETE | provisional values calibrated in browser |
| Homepage shell/navigation | NOT_STARTED | visual comparison to supplied template |
| Hero animation and memory cards | NOT_STARTED | accessible reduced-motion prototype |
| Benefits and memory diagrams | NOT_STARTED | semantic mapping approved |
| System chapter | NOT_STARTED | capture/review/retrieve story implemented |
| Product/access cards | NOT_STARTED | no unapproved pricing claims |
| Closing CTA and footer | NOT_STARTED | responsive and accessible |
| Full-page validation | NOT_STARTED | browser evidence and owner review |

### Immediate implementation task

```yaml
task_id: PXF-003A
name: Nexus-template homepage foundation
first_scope:
  - dark homepage tokens
  - floating navigation shell
  - hero layout and copy
  - lightweight memory background animation
  - asymmetrical memory-card cluster
  - reduced-motion fallback
implementation_paths:
  - src/app/(marketing)/App.tsx
  - src/app/(marketing)/prochat-memory-theme.css
  - src/app/(marketing)/components/layout/Footer.tsx
  - src/components/logo.tsx
validation:
  - type_check
  - lint
  - responsive_browser_review
  - WCAG_2_2_AA_checks
  - reduced_motion_check
```




## Public conversion strategy foundation — PXF-003B0

Canonical execution guide:

```text
docs/product/PUBLIC_CONVERSION_STRATEGY.md
```

The public platform is now planned as a GitHub-first adoption engine, subject to reconciliation with Mind's canonical business, licensing, repository, and public-platform strategy.

Primary lifecycle:

```text
Discover → Understand → Trust → Star → Install → Use → Learn → Feedback → Contribute → Advocate
```

Roadmap rules:

- every page has one primary conversion;
- every homepage section answers one visitor question;
- product adoption remains primary;
- managed implementation remains a secondary organizational path;
- open-source, free, repository, license, download, and managed-service claims are release-gated until Mind authority is updated and verified;
- PXF-003B may implement the trust strip, benefits chapter, and illustration system using this conversion model, but final CTA labels must respect the release gate.




## Memory Illustration Architecture Approval — PXF-003B1A

The owner approved the PXF-003B1 implementation architecture:

```text
primitive → composition → section → page → website
```

Canonical visual philosophy:

```text
docs/product/MEMORY_VISUAL_LANGUAGE.md
```

Approved implementation alphabet:

```text
docs/product/MEMORY_ILLUSTRATION_PRIMITIVES.md
src/app/(marketing)/components/illustrations/
```

PXF-003B2 is ready to compose the existing primitives into:

- Capture;
- Review and Structure;
- Retrieval;
- the homepage trust strip;
- the benefits chapter.

No new illustration primitive may be introduced without semantic and API documentation.




## Product hierarchy and canonical-route correction — PXF-003B2A

Canonical authority:

```text
docs/product/PUBLIC_PAGE_ARCHITECTURE.md
```

Current state is not yet compliant:

- the homepage is broadly Memory-first, but several hero cards are QA-specific;
- navigation uses legacy `/prochat-memory` and `/qa-memory` paths;
- Workbench points to a contact query instead of a product page;
- `/memory-qa` and `/workbench` are not implemented as canonical dedicated pages;
- `/prochat-memory` remains on an unrelated historical visual system.

PXF-003B2A must be completed before PXF-003C.

Required outcome:

```text
/           generic Memory-first homepage
/memory     general flagship product page
/memory-qa  QA-specific product page
/workbench  Workbench-specific product page
```

Legacy inbound routes must remain functional through explicit redirects after canonical pages are verified.

The homepage specificity sequence is:

```text
generic Memory
→ generic trust and benefits
→ generic system model
→ Memory for QA
→ Workbench
```




## Live Motion Fidelity and HyperFrames Decision — 2026-07-19

Canonical evaluation:

```text
docs/product/HYPERFRAMES_AND_LIVE_MOTION_EVALUATION.md
```

Decision:

- HyperFrames is approved as a future motion-content production system for deterministic videos, launch clips, social assets, and rendered motion studies.
- HyperFrames is not approved as the live website animation runtime.
- The Nexus reference hero uses a live WebGL-shader and GSAP/SVG motion language; the current CSS stream effect does not yet match that fidelity.
- Insert `PXF-003C1 — Live Hero Motion Fidelity Spike` before `PXF-003D`.
- Do not animate every section continuously; preserve a clear motion hierarchy.

### PXF-003C1 — Live Hero Motion Fidelity Spike

```yaml
status: READY
coding: true
execution_tool: Codex_with_Playwright
purpose: Compare original browser-native implementations for the Nexus-style narrow laser field and select one production approach.
prototypes:
  - enhanced CSS/SVG using existing dependencies
  - raw Canvas/WebGL shader
  - optional small WebGL helper only if justified by measured complexity
constraints:
  - no copied proprietary source or assets
  - no HyperFrames runtime
  - no new dependency before prototype evidence
  - static fallback preserved
  - reduced motion required
  - mobile density reduction required
  - no semantic meaning exclusively in animation
exit_gate:
  - owner-approved motion technique
  - measured performance
  - screenshots or recordings across target viewports
  - no console or WebGL errors
  - graceful fallback verified
next_task: PXF-003D
```

### Future optional packet

```yaml
task_id: PXF-MOTION-VIDEO-001
name: ProChat Motion Asset Pipeline with HyperFrames
status: FUTURE_OPTIONAL
blocking_launch: false
outputs:
  - frame.md derived from ProChat design authorities
  - reusable ProChat video composition kit
  - launch and social video capability
  - deterministic rendered motion studies
```




## PXF-003E — Combined Adoption Chapter

**Status:** READY
**Authority:** `docs/product/PUBLIC_CONVERSION_STRATEGY.md` and reconciled Mind legal/public-platform authority
**Decision date:** 2026-07-19

The next homepage chapter is a product-specific combined adoption chapter.

It must preserve two distinct public paths:

```text
Memory for QA
→ view and star the public source-available repository
→ apply for the selected beta
→ approved testers evaluate locally
→ report sanitized feedback through Issues or Discussions

Workbench
→ view and star the AGPL public repository
→ clone and self-host locally
→ open Issues or join Discussions
→ propose contributions under the contributor-rights boundary
```

Canonical repositories:

```text
Memory for QA: https://github.com/prochattools/memory-qa
Workbench:     https://github.com/prochattools/workbench
```

Required claim boundaries:

- Memory for QA is source-available, not open source.
- Memory for QA is free only for approved beta participants.
- Memory for QA code contributions are not accepted during the current beta.
- Workbench is free and open source under `AGPL-3.0-only`.
- Workbench may invite contribution proposals, but must not promise merge before the contributor-rights workflow.
- No standardized managed-service offer is approved.
- No analytics implementation is approved.
- Site clicks must not be reported as confirmed stars, installations, contributions, or deployments.

PXF-003E may proceed after PXF-003E0 validation completes.
