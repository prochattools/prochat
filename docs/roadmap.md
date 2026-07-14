# ProChat Public Platform Roadmap

**Status:** canonical repository-local execution roadmap  
**Owner:** Steve Westhoek  
**Scope:** ProChat public platform, design system, migration, public pages, validation, launch, and maintenance  
**Last updated:** 2026-07-14

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
verified_head: 220e1063b4daae65edbdb62ffea697ed885b4fb2
verified_date: 2026-07-14
current_head: 039d3bf0ae31072be1cd5300c5e1dbb4fd2f3a5b
current_program_state: Phase 1 and Phase 2 are complete, Phase 3 is ready, the implementation queue starts with PPF-001 browser-runner isolation, Wave 1 browser-equivalence evidence remains blocked, the browser-runner artifacts stay isolated, and no canonical visual route is active.
current_phase: Phase 3 — canonical content second pass
current_packet: PPF-001 — browser-runner worktree isolation and stale-run disposition
canonical_visual_routes_active: 0
production_visual_design_started: false
legacy_implementation_archived_count: 0
browser_equivalence: BLOCKED
browser_runner_worktree: ISOLATED_UNCOMMITTED
browser_runner_artifact_disposition: KEEP_ISOLATED_BLOCKED
shell_contract: DECIDED_WITH_FUTURE_REPAIR
```

## Operational phase summary

Supporting detail below remains useful, but this phase summary is canonical for execution status.

| Phase | Status | Purpose | Prerequisites | Completed evidence | Expected outputs | Exit gate | Next dependent phase |
|---|---|---|---|---|---|---|---|
| Phase 1 | DONE | Company truth and product hierarchy | none | Mind commits `1461678`, `7687bb8`; ProChat translation docs | repository authority alignment | canonical company/product docs and product hierarchy are consistent | Phase 2 |
| Phase 2 | DONE | Public platform architecture | Phase 1 | current repo translation docs | page map, navigation, footer, legal paths | public platform responsibilities are defined | Phase 3 |
| Phase 3 | READY | Canonical content second pass | Phases 1–2, canonical homepage copy | current repo docs and seeded register | operational content audit, claims register, metadata matrix | every claim and page has an approved or classified status | Phase 4 |
| Phase 4 | DONE | Design-language foundation | Phases 1–3 | design and platform docs committed; repo translation complete | visual grammar, product visuals, motion language, component contract | design decisions are explicit and reviewable | Phase 5 |
| Phase 5 | DONE | Foundational legacy sweep | Phases 1–4 | route, component, style, motion, asset, dependency, and migration audits | inventory and classification matrix | every legacy item has a provisional disposition and wave | Phase 6 |
| Phase 6 | NOT_READY | Design laboratory and static prototypes | Phases 3–5, Wave 0, Wave 1, Wave 2 | none | isolated lab shell and static specimens | no lab work begins before prerequisite packets are complete | Phase 7 |
| Phase 7 | NOT_READY | Motion and product-story prototypes | Phase 6 and approved static direction | none | motion proofs and browser tooling decisions | static direction and tooling decisions are approved | Phase 8 |
| Phase 8 | NOT_READY | Independent review | Phases 3, 5, 6, 7 | none | review report and findings reconciliation | findings are accepted, rejected, or deferred with evidence | Phase 9 |
| Phase 9 | NOT_READY | Production foundation | Phase 8 and approved migration rows | none | fonts, tokens, shells, primitives, tests, and infrastructure | foundation packets are approved before page implementation | Phase 10 |
| Phase 10 | NOT_READY | Public pages | Phase 9 and approved page copy | none | canonical public pages and shell updates | each page packet passes its acceptance gate | Phase 11 |
| Phase 11 | NOT_READY | Legacy migration and removal | Phase 10 and verified replacements | none | redirects, archives, and bounded removals | legacy retirement is proven safe and reversible | Phase 12 |
| Phase 12 | NOT_READY | Production craft and launch validation | Phase 11 | none | visual, accessibility, performance, and launch acceptance | launch criteria pass without critical defects | Phase 13 |
| Phase 13 | ONGOING | Continuous governance | launch | ongoing Mind and repo governance | review and maintenance cadence | this phase does not end | Phase 13 |

The immediate repository-local next phase remains Phase 3, and the immediate implementation-plan queue still begins with PPF-001 browser-runner isolation and disposition. The 039d3bf reconciliation commit updates the handoff metadata but does not close the browser-proof packet.

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

**Status:** PLANNED after replacements pass.

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

**Status:** PLANNED after Phase 11.

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
Phase 3 — READY
Phase 4 — DONE
Phase 5 — DONE
Wave 1 browser equivalence — BLOCKED
Phases 6–12 — NOT_READY
Phase 13 — ONGOING
```

The immediate next implementation packet after this documentation commit is PPF-001: browser-runner worktree isolation and stale-run disposition.
