# ProChat Migration Waves

**Status:** canonical execution order  
**Scope:** public-platform replacement, protected-system isolation, archival, redirects, removal, and final proof  
**Authority:** `MIGRATION_MATRIX.md` and `ARCHIVE_ARCHITECTURE.md`

## Execution rules

1. One wave may contain several packets, but each packet has one coherent rollback boundary.
2. Later waves cannot bypass earlier acceptance gates.
3. Protected auth, admin, commerce, licence, database, email, and purchaser functionality is excluded unless explicitly named.
4. Archive movement follows `ARCHIVE_ARCHITECTURE.md` and requires manifest entries.
5. No destructive action occurs while an item is merely `INVENTORIED`.
6. Redirects, noindex, sitemap, metadata, analytics, and legal effects are validated with every public-route retirement.
7. Package removal occurs only after zero-consumer proof and successful build/runtime validation.
8. Every packet stages exact paths only.

## Wave 0 — Archive structure and governance

### Purpose

Create the non-runtime archive boundary and enforcement before any historical implementation moves.

### Prerequisites

- Task 5.5 documentation committed;
- clean worktree;
- archive root and manifest contract approved;
- no production migration in the same packet.

### Included IDs and groups

```text
DOC-001
all ROUTE, COMP, STYLE, MOTION, ASSET, and DEP rows as governance references only
```

### Expected paths

```text
archive/legacy-public-platform/README.md
archive/legacy-public-platform/manifest.yaml
archive/legacy-public-platform/.gitkeep only where necessary
docs/migration/ARCHIVE_ARCHITECTURE.md
repository validation for forbidden archive imports
```

### Protected exclusions

All production, protected runtime, route, asset, package, and configuration files.

### Acceptance criteria

- archive is outside application and public roots;
- archive README and empty manifest validate;
- build tooling does not scan archive content;
- no production import can target archive paths;
- no archived route is publicly exposed;
- no legacy file has moved yet.

### Validation

- type/build configuration review;
- Tailwind content-path review;
- TypeScript include-path review;
- archive-import security scan;
- documentation structure validation;
- Git diff review.

### Rollback

Revert the archive-governance commit. No runtime rollback should be required.

### Commit boundary

Archive governance files and validation only.

### Approval

No additional destructive approval required because no active file moves.

### Blocking questions

None. This is the first executable migration packet.

## Wave 1 — Canonical root shell, fonts, tokens, and build boundary

### Purpose

Create the new light-first visual and technical foundation without inheriting legacy global styling.

### Prerequisites

- Wave 0 complete;
- canonical tokens and typography approved;
- protected routes and provider boundary enumerated;
- static baseline captured.

### Included IDs and groups

```text
STYLE-001, STYLE-002, STYLE-003, STYLE-008, STYLE-010, STYLE-011, STYLE-012
ASSET-003–ASSET-008
ASSET-011–ASSET-019
ASSET-040–ASSET-046
ASSET-072–ASSET-075
DEP-001
DEP-018–DEP-019
DEP-028–DEP-030
DEP-035–DEP-037
DEP-045
DEP-047
DEP-060
DEP-064
DEP-066–DEP-067
COMP-060–COMP-065
COMP-071
COMP-088–COMP-090
COMP-109–COMP-115
COMP-118–COMP-120
COMP-127–COMP-140
MOTION-006–MOTION-007
MOTION-013–MOTION-015
```

### Expected paths

```text
src/assets/styles/prochat-tokens.css
canonical global base stylesheet
root layout font setup
new public-shell boundary
new Header/Footer foundations or compatibility wrappers
design-system validation
```

### Protected exclusions

- auth/admin/commerce/application provider behavior;
- transactional email;
- protected legacy routes still relying on old styles;
- route removal;
- package removal except explicitly approved font/theme packages after consumers migrate.

### Acceptance criteria

- Golos Text and JetBrains Mono are canonical and load once;
- light mode is the public default;
- cobalt/grayscale semantic tokens are active;
- no universal transitions or animated global blob layer affects the new shell;
- protected routes remain functional through isolation or compatibility styling;
- archive remains unimportable.

### Validation

- type check and production build;
- font/network inspection;
- CSS bundle baseline;
- contrast and focus checks;
- protected-route smoke tests;
- mobile screenshots;
- no archive imports;
- exact visual diff.

### Rollback

Restore prior root layout and style imports from the pre-wave commit. Keep canonical token files if unused only when separately approved; otherwise revert entire packet.

### Commit boundaries

1. canonical tokens and fonts;
2. root/public shell boundary;
3. protected compatibility containment;
4. old global-effect deactivation only after new shell passes.

### Approval

Human visual approval required before replacing the live root shell.

### Blocking questions

- protected internal shell scope;
- public dark-mode removal versus temporary compatibility;
- final brand/favicons.

## Wave 2 — Canonical components and product-visual foundations

### Purpose

Create the lean component system, form primitives, product visuals, and system states before page assembly.

### Prerequisites

- Wave 1 complete;
- component API decisions approved;
- design-lab boundary specified;
- accessibility and responsive contracts approved.

### Included IDs and groups

```text
COMP-022
COMP-024–COMP-025
COMP-040, COMP-043, COMP-045, COMP-047, COMP-055
COMP-063–COMP-064
COMP-068
COMP-072
COMP-081
COMP-092–COMP-100
COMP-109–COMP-117
COMP-121–COMP-140
ASSET-020–ASSET-039
MOTION-016–MOTION-017
MOTION-029–MOTION-030
DEP-007–DEP-014
DEP-018–DEP-019
DEP-026
DEP-035
DEP-043
DEP-047
DEP-049
```

### Expected paths

```text
canonical Button, Link, Surface, Card, Input, Textarea, Select, Checkbox
Header/Footer primitives
StatusLabel and lifecycle primitives
ErrorState, EmptyState, BlockedState, UnavailableState
Memory visual primitives
QA investigation primitives
Workbench control-plane primitives
email-safe token subset specification
component tests and deterministic states
```

### Protected exclusions

- live public pages;
- auth/admin/commerce components;
- transactional form handlers;
- cinematic GSAP motion;
- archive movement of legacy components.

### Acceptance criteria

- one canonical button base with documented wrappers;
- one surface/card responsibility model;
- form primitives meet keyboard and error requirements;
- product visuals work statically, on mobile, and with reduced motion;
- new system states exist;
- no component imports archived code;
- legacy components remain untouched until replacement consumers exist.

### Validation

- type check;
- component tests;
- design-system lint;
- keyboard and axe checks;
- responsive screenshots;
- deterministic visual states;
- bundle review.

### Rollback

New foundations are additive. Revert component packet without changing legacy consumers.

### Commit boundaries

One primitive family or product-visual family per commit.

### Approval

Design and API approval required before production promotion.

### Blocking questions

- Radix package consolidation;
- tooltip consolidation;
- exact email-safe component subset.

## Wave 3 — Homepage design lab and static hero

### Purpose

Prove the lean company-first homepage and static hero before production or cinematic tooling changes.

### Prerequisites

- Waves 0–2 complete;
- canonical homepage copy approved;
- product primitives available;
- design-lab route protected from indexing.

### Included IDs and groups

```text
ROUTE-001
COMP-001–COMP-009
COMP-013–COMP-021
COMP-072
COMP-114
STYLE-003
MOTION-001
MOTION-012
homepage design documents
```

### Expected paths

```text
development-only design-lab route
foundation specimen
three static hero directions
mobile hero variants
selected hero decision record
static full-homepage assembly
```

### Protected exclusions

- production homepage;
- GSAP and ScrollTrigger installation;
- route redirects;
- legacy page archival;
- protected systems.

### Acceptance criteria

- three materially different compositions exist;
- selected direction passes five-second comprehension;
- text is visually emphasized and every section has a meaningful visual;
- static quality works without animation;
- mobile composition is approved;
- no new font, palette, product, or unsupported claim appears.

### Validation

- browser screenshots;
- mobile/desktop comparison;
- five-second test;
- keyboard and contrast review;
- noindex/sitemap verification;
- production files unchanged.

### Rollback

Remove the design-lab packet; production remains unchanged.

### Commit boundaries

1. lab shell;
2. foundation specimen;
3. static product visuals;
4. three hero directions;
5. selected full-page assembly.

### Approval

Explicit human approval of the selected hero and page direction.

### Blocking questions

None after static review; motion tooling remains blocked until approval.

## Wave 4 — Memory and Memory for QA replacements

### Purpose

Build canonical product pages and retire the old Memory/QA public implementations safely.

### Prerequisites

- selected homepage direction;
- approved Memory and QA copy;
- product visual primitives;
- form/privacy boundary for QA beta;
- route and SEO migration packet approved.

### Included IDs and groups

```text
ROUTE-002, ROUTE-003, ROUTE-012, ROUTE-013
COMP-039–COMP-047 only where old product overlap exists
COMP-054–COMP-055
STYLE-004
ASSET-050–ASSET-064
MOTION-011
MOTION-018–MOTION-019
DEP-022 only after all retained consumers are known
```

### Expected paths

```text
src/app/memory/**
src/app/memory/qa/**
canonical product sections and metadata
QA beta conversion UI
redirect tests for /prochat-memory and /qa-memory
archive manifest entries for old Memory/QA pages and assets
```

### Protected exclusions

- old purchaser kit flows;
- BuildFlow/Workbench;
- global dependency removal;
- mailing-list backend changes beyond the approved QA form.

### Acceptance criteria

- `/memory` and `/memory/qa` are complete and indexable;
- old routes redirect without chains;
- old Memory page, warm theme, motion, and illustrations are archived and absent from build output;
- QA claims remain evidence-first and beta-qualified;
- forms and privacy behavior pass.

### Validation

- product-truth review;
- route crawl and redirect tests;
- metadata and structured-data review;
- Playwright/axe when authorized;
- mobile/reduced-motion checks;
- performance trace;
- archive-import and build-exclusion checks.

### Rollback

Restore old routes and remove redirects using the recorded pre-wave commit; keep new routes disabled until repaired.

### Commit boundaries

1. `/memory` page;
2. `/memory/qa` page and beta form;
3. redirects and metadata;
4. old Memory archive movement;
5. zero-consumer cleanup.

### Approval

Product and legal/privacy approval required before redirecting old routes.

### Blocking questions

Final QA beta backend and retention policy.

## Wave 5 — Workbench replacement

### Purpose

Launch the canonical Workbench page and remove BuildFlow and ProChat OS from current public presentation.

### Prerequisites

- approved Workbench copy and visual proof;
- compatibility identifier inventory;
- public route and redirect plan;
- protected application/API scope decided.

### Included IDs and groups

```text
ROUTE-014, ROUTE-017, ROUTE-018
COMP-031–COMP-034
COMP-053–COMP-055
ASSET-047–ASSET-049 where product-specific
BuildFlow compatibility records
```

### Expected paths

```text
src/app/workbench/**
Workbench product visual components
/buildflow redirect
ProChat OS explanatory redirect or verified retirement
archive/legacy-public-platform/legacy-product-systems/buildflow/**
archive/legacy-public-platform/legacy-product-systems/prochat-os/**
manifest entries and compatibility notes
```

### Protected exclusions

- BuildFlow technical IDs, source IDs, API contracts, environment variables, package names, and persisted data required by Workbench;
- internal project/chat APIs until separately decided;
- admin/licence functionality.

### Acceptance criteria

- `/workbench` accurately explains guarded local execution;
- BuildFlow is absent as a public product;
- ProChat OS is absent as a current product;
- required technical compatibility identifiers remain functional and non-public;
- redirects and archival outcomes are tested;
- no old product schema or metadata remains indexable.

### Validation

- product-name and claim search;
- route/redirect tests;
- structured-data and sitemap review;
- compatibility contract tests;
- archive exclusion;
- protected application smoke tests.

### Rollback

Restore legacy public routes only as temporary noindex compatibility pages, never as current product pages.

### Commit boundaries

1. Workbench page;
2. compatibility boundary;
3. redirects and metadata;
4. BuildFlow archive;
5. ProChat OS archive/retirement.

### Approval

Explicit approval required before moving BuildFlow compatibility code or retiring ProChat OS URLs.

### Blocking questions

Exact internal project/chat scope and whether ProChat OS receives explanatory redirect or 410 after inbound-link review.

## Wave 6 — Company, Contact, legal, docs, mailing list, and errors

### Purpose

Complete the supporting public platform and rebuild necessary communication functionality cleanly.

### Prerequisites

- canonical shell and components;
- approved page copy;
- privacy/data-flow decisions;
- legal review;
- documentation strategy;
- email provider decision.

### Included IDs and groups

```text
ROUTE-004–ROUTE-011
ROUTE-015–ROUTE-016
ROUTE-030
ROUTE-035
ROUTE-040
ROUTE-056
ROUTE-058–ROUTE-059
ROUTE-070–ROUTE-072
ROUTE-082–ROUTE-083
COMP-026–COMP-027
COMP-035
COMP-049–COMP-052
COMP-056–COMP-057
COMP-068
COMP-070
COMP-081
COMP-092–COMP-108
STYLE-005–STYLE-007
MOTION-003–MOTION-005
MOTION-008–MOTION-009
MOTION-020–MOTION-024
ASSET-011–ASSET-019
ASSET-040–ASSET-049
ASSET-065–ASSET-071
DEP-002–DEP-005
DEP-015
DEP-031–DEP-032
DEP-038
DEP-044
DEP-049
DEP-052
```

### Expected paths

```text
/philosophy
/about
/contact
/privacy
/terms
/docs
canonical 404/error/loading states
new mailing-list form and handler
email-safe templates
canonical OG/social generation
canonical sitemap and robots
```

### Protected exclusions

- legacy purchaser and licence flows;
- unrelated internal application;
- legacy waitlist/newsletter archive until the new mailing list passes;
- package removals before zero-consumer proof.

### Acceptance criteria

- all required company and support routes exist;
- Privacy and Terms reflect actual data flows and obligations;
- Contact and mailing list collect minimal approved data;
- MailerLite, old waitlist, and newsletter implementations are no longer public dependencies unless re-approved;
- docs expose current products only;
- errors and metadata are canonical;
- unsubscribe remains functional where legally required.

### Validation

- legal/privacy review;
- form end-to-end tests;
- email rendering;
- data-flow verification;
- docs link crawl;
- sitemap/robots validation;
- accessibility and mobile tests;
- analytics verification.

### Rollback

Keep current Contact/legal/docs routes restorable until replacements pass. Preserve unsubscribe and legally required communication controls.

### Commit boundaries

One page or functional flow per commit; legal pages separate; mailing list separate; docs shell separate; metadata/sitemap separate.

### Approval

Legal/privacy approval required for public launch and mailing-list activation.

### Blocking questions

Future mailing-list provider, retention period, consent language, docs technology, and legacy purchaser legal copy.

## Wave 7 — Redirects, noindex, archive exposure, and route retirement

### Purpose

Remove legacy public discoverability while preserving required compatibility and inbound-link value.

### Prerequisites

- replacement routes complete;
- archive manifest entries ready;
- inbound-link/SEO review;
- purchaser and legal obligations resolved;
- route-specific rollback points captured.

### Included IDs and groups

```text
ROUTE-019–ROUTE-044
ROUTE-057
ROUTE-080–ROUTE-083
ASSET-065–ASSET-066
legacy metadata and structured data
```

### Public route outcomes

- `/systems/events`, `/ai-workflows`, `/legal-ai-workflows`, `/studio`, `/book`, `/proof`, `/starting-point`, `/learn`, legacy blog/prompts, and `/waas/accountants`: archive and noindex immediately before redirect/retirement; redirect only when a semantically valid destination exists.
- `/kits/**`: purchaser-safe compatibility pages only where obligations exist; otherwise archive and retire.
- `/waitlist` and `/waiting-list`: redirect to the new mailing-list or QA beta destination after it exists.
- `/privacy-policy` and `/tos`: retain permanent redirects.
- debug/social/go routes: noindex and protect or archive according to internal-use evidence.

### Protected exclusions

- API handlers and purchaser routes still needed by obligations;
- auth/admin/commerce/database systems;
- archive root itself.

### Acceptance criteria

- no legacy product remains indexable as current;
- no redirect chain or loop;
- canonical URLs, sitemap, robots, navigation, and metadata agree;
- archive is not publicly routed;
- required purchaser and legal paths remain reachable;
- analytics reflect canonical destinations.

### Validation

- full route crawl;
- redirect status tests;
- sitemap/robots parse;
- Search Console-ready canonical review;
- structured-data search;
- external-link and navigation review;
- protected-route smoke tests.

### Rollback

Re-enable temporary noindex compatibility pages using the pre-wave commit if redirects or obligations fail.

### Commit boundaries

Group redirects by destination and obligation class, never all legacy URLs in one unreviewable commit.

### Approval

Explicit approval for 410/404 outcomes and every purchaser-sensitive route.

### Blocking questions

Inbound links, prior customer access, historical article value, and legal retention.

## Wave 8 — Legacy components, styles, motion, assets, scripts, integrations, and dependencies

### Purpose

Archive or remove obsolete implementation after all consumers have migrated.

### Prerequisites

- Waves 1–7 complete for affected systems;
- zero-consumer proof;
- package and lockfile plan;
- archive manifest entries;
- protected exclusions verified.

### Included IDs and groups

```text
all ARCHIVE and REMOVE-LATER COMP groups
all replaced STYLE groups
all archived MOTION groups
all archived ASSET groups
all REMOVE-LATER/CONSOLIDATE DEP groups
legacy scripts and integrations
ROUTE-068–ROUTE-079 where obligations/consumers are closed
```

### Explicit legacy integration outcomes

- MailerLite: archive old handler after new mailing-list provider succeeds.
- GitHub automation: archive unless a current protected workflow is explicitly retained.
- Make and n8n OpenAI assistant workflows: archive after zero-consumer and data-flow proof.
- legacy social publishing: archive unless current company operations approve it.
- legacy docs generation: retain only scripts needed by current-product documentation.
- Framer Motion: remove only after every retained consumer is migrated or intentionally kept.
- old PDF/export and form libraries: remove with their owning legacy flows.

### Protected exclusions

- active Stripe/licence/purchaser obligations;
- Prisma/PostgreSQL data required by active systems;
- Resend/current Contact and mailing-list email;
- auth/admin/application systems still explicitly retained;
- observability still used in deployment.

### Acceptance criteria

- archived code cannot build or import;
- removed packages have zero consumers;
- lockfile is clean;
- old fonts, themes, effects, assets, and product names are absent from active source;
- protected flows pass;
- repository complexity and browser bundle are materially reduced.

### Validation

- import and consumer searches;
- type check, tests, and build;
- route crawl;
- protected end-to-end tests;
- package and lockfile diff;
- bundle analysis;
- security/licence review;
- archive exclusion and manifest validation.

### Rollback

Each removal packet has a pre-removal commit. Restore the packet, not the entire migration program.

### Commit boundaries

Separate commits for routes/components, styles/motion, assets, integrations/scripts, and package removals.

### Approval

Destructive move/removal approval required for each packet containing active source or packages.

### Blocking questions

Protected internal application scope, licence obligations, deployment integrations, and package-security upgrades.

## Wave 9 — Absence proof, performance, security, and repository simplification

### Purpose

Prove the clean separation and launch readiness after migration.

### Prerequisites

All earlier wave packets complete or explicitly deferred with protected status.

### Included IDs and groups

```text
all migration rows
all archive manifest entries
all retained compatibility exceptions
```

### Acceptance criteria

- no unresolved `DECISION_REQUIRED` item;
- no active source import from archive;
- no legacy current-product name, route, token, theme, asset, or metadata remains;
- all protected exceptions have owners and review dates;
- Core Web Vitals, accessibility, browser, security, and visual gates pass;
- repository and client bundle are measurably smaller;
- final route and package manifests match production.

### Validation

- comprehensive old-name and old-path search;
- route and API manifest review;
- package/dependency review;
- production build and browser suite;
- WCAG 2.2 AA audit;
- Lighthouse and Web Vitals;
- visual regression;
- security scan;
- archive manifest completeness;
- legal and product-truth review.

### Rollback

Issue-specific rollback to the latest verified packet. Do not restore archived systems globally.

### Commit boundaries

Validation evidence, bounded fixes, and final documentation closure are separate commits.

### Approval

Launch approval requires product, design, accessibility, performance, legal/privacy, and production-safety sign-off.

### Blocking questions

Only explicitly documented protected exceptions may remain.

## First executable packet

```yaml
packet: W0-P1
name: archive-governance-foundation
purpose: create the non-runtime archive boundary without moving production files
paths:
  create:
    - archive/legacy-public-platform/README.md
    - archive/legacy-public-platform/manifest.yaml
  update:
    - docs/product/agent-mode-progress.md
validation:
  - archive root outside build/public paths
  - no archive import alias
  - no Tailwind or TypeScript scan of archive
  - security scan
  - exact diff
commit: "chore(prochat): establish legacy archive boundary"
production_changes: false
destructive_changes: false
```

This packet is the only authorized next execution after Task 5.5 documentation is committed.
