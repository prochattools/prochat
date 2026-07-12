# ProChat Public Platform Foundation Handoff

**Run:** `agent-c2830f11-a2a0-4d49-b000-d5b5398e337a`  
**Status:** public-platform documentation, validation, and commit complete  
**Commit:** `8180a7d` — `docs(prochat): plan public platform foundation sweep`  
**Source:** `prochat`  
**Production code changed:** no  
**Legacy files deleted:** no

## Goal

Translate the canonical Mind public-platform foundation into a complete repository-local design, platform, migration, roadmap, and implementation program before production execution.

The program covers:

- company and product hierarchy;
- public page architecture;
- content second pass;
- design language;
- product visuals;
- motion;
- design-lab prototypes;
- accessibility;
- performance;
- legacy inventory and migration;
- production foundations;
- every required public page;
- legacy removal;
- launch validation;
- continuous governance.

## Canonical Mind state

Completed and committed in Mind:

```text
1461678 — docs(prochat): establish public platform foundation
7687bb8 — docs(prochat): finalize public platform foundation
```

Canonical Mind additions and updates include:

```text
wiki/organisations/prochat/brand/company-principles.md
wiki/organisations/prochat/brand/public-platform-strategy.md
wiki/organisations/prochat/brand/brand-governance.md
wiki/organisations/prochat/brand/public-platform-roadmap.md
wiki/organisations/prochat/brand/README.md
wiki/organisations/prochat/brand/product-strategy.md
wiki/organisations/prochat/brand/narrative.md
wiki/organisations/prochat/brand/brand-ruleset.md
```

Existing unrelated Mind changes remained unstaged and uncommitted.

## Approved company and product hierarchy

```text
Company: ProChat
Flagship: ProChat Memory
Current edition and primary conversion path: ProChat Memory for QA
Second product: ProChat Workbench
Founder: Steve Westhoek — QA Engineer and Founder of ProChat
```

The public website presents ProChat as the software company. It is not a freelancer portfolio and does not market Steve’s freelance QA work as a ProChat product.

## Approved design and technical foundation

```yaml
fonts:
  primary: "Golos Text"
  technical: "JetBrains Mono"
  secondary: null
color:
  strategy: "grayscale plus one global accent"
  accent: "#3158C7"
motion:
  cinematic: "GSAP + ScrollTrigger + @gsap/react"
  micro_interactions: "CSS"
  scroll: "native browser scrolling"
visuals: "semantic HTML + CSS + SVG"
website_default_mode: "light"
major_pinned_sequences:
  - homepage hero
  - Memory lifecycle
  - relevant context
  - QA investigation
```

GSAP is not yet installed. Playwright and axe are not yet installed. Their addition is authorized only after static hero approval and the dependency-audit decision.

Framer Motion remains for existing surfaces until audited. One component must not mix Framer Motion and GSAP orchestration.

## AI and skill ownership

GPT-5.6 Sol is the single accountable model for:

- research;
- architecture;
- design exploration;
- prototypes;
- critique;
- implementation;
- validation;
- reconciliation;
- Git operations.

Brain design skills provide structured methods and review lenses:

```text
/design
/design-system
/web-design
/taste-skill
/huashu-design
/plan-design-review
/design-motion-principles
/redesign-skill
/code
/impeccable
/design-review
```

Independent challenge comes from multiple prototypes, explicit review criteria, browser evidence, human approval, accessibility review, performance traces, and visual regression rather than a required second model.

## Documentation created in the active ProChat run

### Design language

```text
docs/design/DESIGN_PRINCIPLES.md
docs/design/VISUAL_LANGUAGE.md
docs/design/PRODUCT_VISUAL_LIBRARY.md
docs/design/COPY_VISUAL_MAP.md
docs/design/MOTION_STORYBOARD.md
docs/design/DESIGN_LAB.md
docs/design/COMPONENT_LIBRARY.md
```

### Public platform

```text
docs/platform/PAGE_ARCHITECTURE.md
docs/platform/RESPONSIVE_STRATEGY.md
docs/platform/ACCESSIBILITY_STRATEGY.md
docs/platform/PERFORMANCE_STRATEGY.md
```

### Foundational sweep and migration

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
```

## Documentation updated in the active ProChat run

```text
README.md
docs/roadmap.md
docs/implementation-plan.md
docs/homepage-technical-design.md
docs/homepage-design-orchestration.md
docs/product/agent-mode-progress.md
```

## Roadmap state

`docs/roadmap.md` now defines the canonical 13-phase program:

```text
1. Company foundation
2. Public platform architecture
3. Canonical content second pass
4. Design-language foundation
5. Foundational legacy sweep
6. Design laboratory and static prototypes
7. Motion and product-story prototypes
8. Independent review
9. Production foundation
10. Public page implementation
11. Legacy migration and removal
12. Production craft and launch validation
13. Continuous governance
```

Current position:

```text
Phases 1–2: complete
Phase 3: ready
Phase 4: documentation complete
Phase 5: exact next execution phase
Phases 6–13: planned and dependency-gated
```

## Implementation-plan coverage

`docs/implementation-plan.md` now contains explicit tasks for:

- company and repository authority reconciliation;
- public page responsibilities;
- public content inventory;
- claims and terminology classification;
- homepage second pass;
- Memory page copy;
- Memory for QA page copy;
- Workbench page copy;
- Philosophy, About, Contact, documentation, and error copy;
- Privacy and Terms review;
- navigation, footer, metadata, and social copy;
- design-document reconciliation;
- route, component, style, motion, asset, and dependency inventories;
- migration classification;
- design-lab shell and specimens;
- three static hero directions;
- product-mechanism prototypes;
- motion tooling and proofs;
- independent review;
- fonts, tokens, shell, product visuals, tests, and performance infrastructure;
- homepage;
- ProChat Memory;
- ProChat Memory for QA;
- ProChat Workbench;
- Philosophy;
- About;
- Contact and beta forms;
- Privacy;
- Terms;
- documentation entry points;
- 404 and error states;
- navigation, footer, metadata, sitemap, robots, and social assets;
- redirects, archival, and legacy removal;
- accessibility, performance, browser, visual, legal, analytics, and launch acceptance;
- quarterly governance.

Every task defines:

- purpose;
- dependencies;
- exact inputs;
- expected files;
- acceptance criteria;
- validation;
- rollback or migration concerns;
- commit boundary.

## Legacy-sweep policy

Every legacy item must become one of:

```text
KEEP
REFACTOR
REWRITE
REPLACE
ARCHIVE
REDIRECT
DELETE
```

No production deletion is authorized until:

- consumers are known;
- a canonical replacement or archival decision exists;
- dependency order and redirects are defined;
- validation and rollback are documented;
- deletion is explicitly approved where required.

## Current validation evidence

Completed:

- all 20 required design, platform, and migration files exist;
- no production source or package file is currently changed;
- Claude-specific primary ownership was removed from active design and technical documentation;
- README discoverability was updated;
- roadmap and implementation plan were replaced with the complete program.

Still required before commit:

1. validate required headings and key invariants;
2. validate canonical Mind references;
3. check cross-document product hierarchy and design decisions;
4. confirm no stale Claude ownership remains;
5. run documentation security scan;
6. inspect exact changed paths and diff size;
7. commit only intended documentation paths;
8. close the active run with commit hash and exact next task.

## Phase 5 Task 5.1 completion

Completed inventory scope:

```yaml
page_routes: 50
route_handlers: 26
layouts: 8
error_or_not_found_files: 3
sitemaps: 2
robots_files: 1
next_config_redirects: 14
route_records: 84
```

Changed documentation:

```text
docs/migration/ROUTE_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
docs/product/agent-mode-progress.md
```

Key findings:

- six canonical responsibilities exist at their final paths;
- three product responsibilities exist only at legacy paths;
- five required canonical routes are missing;
- BuildFlow and ProChat OS publicly contradict current product strategy;
- Privacy and Terms remain tied to legacy kit commerce;
- public docs remain SaaSKit/ProKit-oriented;
- the current waitlist promotes legacy products;
- header, footer, chrome routing, sitemap, robots, metadata, and analytics require later migration;
- commerce, auth, admin, project, subscription, waitlist, and integration handlers contain critical migration risk;
- no DELETE decision was finalized.

Validation evidence:

- bounded source inventory independently confirmed 50 pages, 26 handlers, 8 layouts, 3 error/not-found files, 2 sitemaps, and 1 robots file;
- direct reads confirmed all highest-risk public claims and shell findings;
- all 84 route IDs appear in both the route audit and migration matrix;
- no production source, route, metadata, navigation, redirect, package, or copy file changed;
- no dependency was installed;
- no route was moved, deleted, or redirected.

Unresolved route decisions are recorded in `docs/migration/ROUTE_AUDIT.md`, including canonical product URL migration, legacy product/resource archives, waitlist destination, purchaser obligations, internal application scope, root sitemap behavior, company versus founder social channels, and temporary noindex needs.

## Phase 5 Task 5.2 completion

Completed component inventory:

```yaml
component_files: 140
shared_components: 83
page_local_components: 57
component_ids: COMP-001 through COMP-140
production_files_changed: 0
component_apis_changed: 0
components_moved_or_deleted: 0
packages_changed: 0
```

Changed documentation:

```text
docs/migration/COMPONENT_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
docs/product/agent-mode-progress.md
```

Duplicate-responsibility groups identified:

- three button layers plus action-specific wrappers;
- global shell, Header, AppChrome, AppShell, local navigation, and mobile sheet overlap;
- one active Footer with legacy route and copy coupling;
- multiple hero abstractions and route-local hero implementations;
- incomplete form foundation across Contact, signup, waitlist, admin, and commerce flows;
- Card, Surface, Scaffolding, and route-local card systems;
- broad reusable marketing sections containing historical offers and visual assumptions;
- five duplicated legacy FeatureIcon components;
- fragmented analytics wrappers and embedded event calls;
- no canonical reusable error, empty, blocked, or unavailable-state family.

Protected component groups:

- authentication and provider boundaries;
- admin access, navigation, licence revocation, and OG generation;
- checkout, portal, pricing, Stripe, licence, and purchase flows;
- Contact, signup, waitlist, and personal-data email flows;
- purchaser access and finish components;
- application shell, analytics, and transactional email templates.

Highest-risk findings:

- component-level tests were not directly discoverable by static reference search;
- many mostly static marketing sections are broad client components;
- Framer Motion is embedded in Reveal, Newsletter, and ProofOperational;
- legacy product names and claims are embedded inside components and emails;
- raw colors, gradients, and historical visual rules are widespread;
- Header and Footer combine legacy routing, analytics, social, theme, and mobile behavior;
- canonical Memory/Workbench product visual primitives are not implemented;
- canonical error and system-state primitives are missing.

Zero-consumer candidates are recorded in `COMPONENT_AUDIT.md`. They are candidates for exact proof only; no deletion or archival action is authorized.

Validation evidence:

- recursive bounded source inventory independently confirmed 140 files;
- static consumer and risk mapping covered all 83 shared and 57 page-local files;
- direct source reads verified the shell, Footer, three button layers, protected flows, and legacy coupling;
- all component IDs are represented in the audit and mirrored by grouped ranges in the migration matrix;
- no production source, import, API, style, copy, route, metadata, redirect, or package file changed;
- no component was moved, renamed, merged, or deleted.

Unresolved component decisions include canonical button consolidation, shell replacement strategy, purchaser obligations, protected application scope, MDX/content retention, public theme behavior, Framer Motion retention, zero-consumer proof, email-safe design tokens, and the required product/error primitives.

## Phase 5 Task 5.3 completion

Completed style and motion inventory:

```yaml
stylesheet_files: 7
configuration_and_root_style_sources: 5
style_records: 12
candidate_motion_source_files: 59
actual_motion_or_visibility_sources: 24
operational_timer_or_static_style_sources: 35
motion_records: 30
framer_motion_direct_sources: 6
production_files_changed: 0
```

Changed documentation:

```text
docs/migration/STYLE_AUDIT.md
docs/migration/MOTION_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
docs/product/agent-mode-progress.md
```

Approved clean-slate direction recorded:

- legacy styling, themes, scaffolding, integrations, pages, and functionality are archive-first by default;
- the new platform must not be built on old visual or product systems;
- useful historical implementation may remain in an archive for reference;
- ProChat OS must be removed from the future public platform after archival and obligation checks;
- BuildFlow must be removed from the public platform after `/workbench` is ready, while technical compatibility identifiers may remain only where required;
- current waitlist, newsletter, MailerLite, GitHub, kit, proof, pricing, and historical integration implementations are legacy unless explicitly re-approved;
- future mailing-list functionality will be rebuilt against the new form, privacy, and email architecture.

Highest-risk style findings:

- Host Grotesk, Golos Text, JetBrains Mono, Inter, Inter Tight, Playfair Display, Material Symbols, and duplicate font-loading paths coexist;
- multiple token systems conflict with `brand-spec.md`;
- the root forces dark mode despite the approved light-first platform;
- global universal 650ms transitions affect every element and pseudo-element;
- animated blur/blob/glow backgrounds run continuously;
- the warm Memory theme is a separate paper/coral/olive brand system with broad `!important` overrides;
- docs use a separate glassy blue theme coupled to third-party selectors;
- containers, breakpoints, spacing, radii, shadows, and page gutters compete across systems;
- the legacy Memory page contains approximately 69KB of embedded page CSS and additional font loading.

Highest-risk motion findings:

- Framer Motion powers generic reveal, proof, newsletter, maintenance, and 404 behavior;
- global blob keyframes, global transitions, and smooth scrolling create default motion cost;
- the old Memory page combines keyframes, observers, scroll listeners, transforms, and CSS/JS reduced-motion handling;
- RotatingText animates width and maintains interval, resize, font-measurement, and timeout state;
- the Header uses a global scroll/resize/requestAnimationFrame mechanism;
- generic Reveal has no explicit reduced-motion branch;
- several protected timers are operational and must not be removed as decorative motion;
- old motion must be archived before GSAP is added so a clean static performance baseline exists.

Validation evidence:

- seven stylesheet files were independently enumerated;
- five root/configuration style sources were inspected;
- 59 motion-related candidate files were scanned and separated into actual motion versus static/operational false positives;
- direct source reads verified the global styles, blob system, warm Memory theme, Contact, waitlist, docs, Tailwind, root fonts, old Memory page, Reveal, proof motion, rotating text, scroll hints, and Header scroll hook;
- STYLE-001 through STYLE-012 and MOTION-001 through MOTION-030 are mirrored in the migration matrix;
- no CSS, SCSS, Tailwind, PostCSS, font, token, theme, animation, component, route, copy, metadata, redirect, or package file changed;
- Framer Motion remains installed and unchanged;
- GSAP was not added;
- no production file was moved, renamed, merged, archived, or deleted.

Unresolved decisions include protected internal-shell styling, public dark-mode removal, docs launch scope, email-safe tokens, purchaser styling obligations, exact archive/build-exclusion structure, retained Framer Motion use, Header scroll behavior, and protected timer ownership.

## Restrictions for the next execution phase

During Phase 5 inventory:

- do not modify production code;
- do not delete, archive, or move files yet;
- do not install or remove dependencies;
- do not start design-lab implementation;
- do not change live routes, metadata, forms, redirects, APIs, styles, motion, or assets;
- record audit evidence and migration decisions only;
- keep each audit category in a separate reviewable commit where practical.

## Exact next task after style-and-motion audit commit

```text
Execute Phase 5, Task 5.4 only: asset and dependency inventory.

Read first:
- docs/product/agent-mode-progress.md
- docs/implementation-plan.md
- docs/migration/LEGACY_SWEEP_PLAN.md
- docs/migration/MIGRATION_MATRIX.md
- docs/migration/ASSET_AUDIT.md
- docs/migration/DEPENDENCY_AUDIT.md
- docs/migration/ROUTE_AUDIT.md
- docs/migration/COMPONENT_AUDIT.md
- docs/migration/STYLE_AUDIT.md
- docs/migration/MOTION_AUDIT.md
- brand-spec.md
- docs/platform/PERFORMANCE_STRATEGY.md

Inspect read-only:
- public/**
- src/assets/**
- image, SVG, video, font, favicon, manifest, OG, and social assets
- imported asset references
- package.json
- lockfile
- package scripts
- framework, UI, motion, styling, icons, forms, analytics, content, testing, email, commerce, and integration dependencies
- build and deployment configuration referencing packages or assets

Outputs:
- complete asset records in docs/migration/ASSET_AUDIT.md
- complete dependency records in docs/migration/DEPENDENCY_AUDIT.md
- matching ASSET-* and DEP-* rows in docs/migration/MIGRATION_MATRIX.md
- provenance, licensing, privacy, legacy-brand, consumer, bundle, runtime, maintenance, and security findings
- archive-first candidates and protected operational dependencies
- exact evidence and unresolved decisions

Restrictions:
- do not modify, optimize, move, archive, or delete assets
- do not add, update, or remove packages
- do not edit package.json or lockfiles
- do not change imports, build config, routes, styles, copy, or production code
- do not install GSAP, Playwright, axe, or any other dependency
```
