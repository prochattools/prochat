# ProChat Public Platform Foundation Handoff

**Run:** `agent-c2830f11-a2a0-4d49-b000-d5b5398e337a`  
**Status:** public-platform documentation and validation complete; commit pending  
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

## Restrictions for the next execution phase

During Phase 5 inventory:

- do not modify production code;
- do not delete or move legacy files;
- do not install dependencies;
- do not start design-lab implementation;
- do not change live routes, metadata, forms, or redirects;
- record audit evidence and migration decisions only;
- keep each audit category in a separate reviewable commit where practical.

## Exact next task after documentation commit

```text
Execute Phase 5, Task 5.1 only: inventory all ProChat routes and page responsibilities.

Read first:
- docs/product/agent-mode-progress.md
- docs/roadmap.md
- docs/implementation-plan.md
- docs/platform/PAGE_ARCHITECTURE.md
- docs/migration/LEGACY_SWEEP_PLAN.md
- docs/migration/MIGRATION_MATRIX.md
- docs/migration/ROUTE_AUDIT.md
- PRODUCT.md

Inspect:
- src/app/** route tree
- layouts, loading, error, and not-found files
- redirects and rewrites
- navigation and footer route helpers
- sitemap and robots sources
- metadata exports
- public form/API routes

Output:
- completed route inventory records in docs/migration/ROUTE_AUDIT.md
- corresponding rows in docs/migration/MIGRATION_MATRIX.md
- every route mapped to a canonical responsibility or DECISION_REQUIRED
- initial route risk and redirect notes
- validation evidence and exact changed paths

Restrictions:
- do not edit production code
- do not delete or move routes
- do not implement redirects
- do not modify copy
- do not install dependencies
- do not commit unrelated changes
```
