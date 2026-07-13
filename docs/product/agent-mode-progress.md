# ProChat Public Platform Foundation Handoff

**Run:** `agent-fde385fb-b1c7-46c2-8686-71ce737e8b8a`  
**Status:** Wave 1 Packet 4B complete with BLOCKED activation; Packet 4C environment provisioning is next  
**Previous evidence commit:** `ce3df67` — `docs(prochat): verify shell routing equivalence`  
**Source:** `prochat`  
**Live production behavior changed:** no  
**Additive unconsumed foundation source created:** yes  
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

## Phase 5 Task 5.4 completion

Completed asset and dependency inventory:

```yaml
asset_files: 75
svg: 48
png: 12
ttf: 5
pdf: 2
xml: 2
woff2: 1
ico: 1
scss: 2
extensionless_or_system_files: 2
dependencies: 49
dev_dependencies: 22
total_direct_packages: 71
production_files_changed: 0
assets_changed: 0
package_or_lockfile_changes: 0
```

Changed documentation:

```text
docs/migration/ASSET_AUDIT.md
docs/migration/DEPENDENCY_AUDIT.md
docs/migration/MIGRATION_MATRIX.md
docs/product/agent-mode-progress.md
```

Highest-risk asset findings:

- a 14.9 MB infrastructure PDF is publicly stored with zero detected consumers and requires privacy, content, and rights review;
- the Material Symbols font is nearly 1 MB and used only by the legacy waitlist;
- old Memory illustrations, kit/ProChat OS Open Graph images, SaaS social assets, global glow backgrounds, and obsolete fonts belong to archive-first migration waves;
- brand marks, favicons, social assets, PDFs, fonts, AWS logos, and generated images lack complete provenance/licence evidence;
- current social and OG assets mix current and obsolete product direction;
- protected logo, font, sitemap, email, commerce, and purchaser assets cannot be removed until their workflows migrate.

Highest-risk dependency findings:

- 71 direct packages support a much broader legacy application than the new lean public platform;
- Next 14 coexists with a Next 16 bundle analyzer and Next 13-era MDX packages;
- individual Radix packages coexist with an umbrella Radix package;
- Radix Tooltip and React Tooltip overlap;
- several PDF/export packages overlap;
- Framer Motion remains tied to legacy surfaces while GSAP is planned but not installed;
- Nextra/MDX and extensive docs scripts are tied to legacy product documentation;
- Stripe, Prisma, PostgreSQL, Resend, React Email, authentication, admin, and application packages are protected until obligations and internal scope are decided;
- several zero-consumer packages require configuration, script, deployment, and lockfile proof before removal;
- MailerLite, GitHub, n8n, and Make behavior may be raw HTTP/config integrations rather than direct packages.

Validation evidence:

- all 75 files under `public/**` and `src/assets/**` were enumerated and counted by type;
- file sizes and largest assets were independently measured;
- static asset consumers were mapped across source, styles, metadata, email, and configuration;
- package.json independently confirmed 49 dependencies and 22 devDependencies;
- all 71 packages have an exact consumer or explicit framework/build/tooling/deployment purpose recorded;
- ASSET-001 through ASSET-075 and DEP-001 through DEP-071 are mirrored in the migration matrix;
- no asset, import, configuration, source, package, or lockfile was changed;
- no package was installed, updated, or removed;
- GSAP, Playwright, and axe remain uninstalled.

Unresolved decisions include archive location/build exclusion, PDF content and privacy, canonical brand/favicons, asset licences, purchaser obligations, internal application scope, Stripe/licensing retention, Nextra retention, future mailing-list provider, New Relic deployment use, package consolidation, and independently required security upgrades.

## Phase 5 Task 5.5 completion

Completed scope:

```yaml
route_records_classified: 84
component_files_covered: 140
style_records_classified: 12
motion_records_classified: 30
asset_records_classified: 75
dependency_records_classified: 71
archive_root: archive/legacy-public-platform
migration_waves: 10
production_files_changed: 0
destructive_changes: 0
```

Changed documentation:

```text
docs/migration/MIGRATION_MATRIX.md
docs/migration/LEGACY_SWEEP_PLAN.md
docs/migration/ARCHIVE_ARCHITECTURE.md
docs/migration/MIGRATION_WAVES.md
docs/roadmap.md
docs/implementation-plan.md
docs/product/agent-mode-progress.md
```

Final classification model:

```text
new canonical public platform
protected internal or transactional application
protected previous-purchaser or licence obligation
temporary compatibility layer
historical non-runtime archive
remove-later after proof and approval
```

Archive architecture:

- canonical root is `archive/legacy-public-platform/`;
- archive content is outside application, public, route, package, TypeScript, Tailwind, sitemap, and runtime import boundaries;
- the archive is never routed, deployed, indexed, or used as active guidance;
- every moved path requires a `manifest.yaml` entry, source commit, migration commit, validation, rollback, owner, and approval state;
- production imports from `archive/**` are prohibited;
- restoration creates a new reviewed active implementation rather than importing archived code directly.

Protected boundaries:

- auth, admin, Prisma/PostgreSQL, Stripe, licences, purchaser claims, transactional email, Contact, unsubscribe, health, and required observability remain protected until their obligations close;
- dashboard, chat, projects, preferences, Make, n8n, GitHub, social publishing, and debug functionality are isolated and archive-bound after consumer, credential, data, and API proof;
- future mailing-list functionality is rebuilt cleanly and does not extend the legacy waitlist/newsletter/MailerLite implementation;
- BuildFlow remains only as technical compatibility identifiers where required and is removed as a public product after `/workbench` launches;
- ProChat OS is removed as a current public product and archived after obligation and inbound-link review.

Final migration waves:

```text
Wave 0 — archive structure and governance
Wave 1 — canonical root shell, fonts, tokens, and build boundary
Wave 2 — canonical component and product-visual foundations
Wave 3 — homepage design lab and static hero
Wave 4 — Memory and QA replacements
Wave 5 — Workbench replacement
Wave 6 — company, Contact, mailing list, legal, docs, metadata, and errors
Wave 7 — redirects, noindex, archive exposure, and route retirement
Wave 8 — legacy components, styles, motion, assets, scripts, integrations, and dependencies
Wave 9 — absence proof, performance, security, accessibility, and repository simplification
```

Every wave now defines purpose, prerequisites, included IDs, protected exclusions, expected paths, acceptance criteria, validation, rollback, commit boundaries, approval requirements, and blocking questions.

Highest-risk migration items:

- purchaser and legal obligations around Stripe, licences, kit claims, finish routes, invoices, and stored data;
- root shell and provider separation while protected internal routes still depend on legacy styles;
- BuildFlow technical compatibility versus public product removal;
- ProChat OS route retirement and structured-data cleanup;
- Contact and mailing-list privacy, consent, provider, migration, and unsubscribe behavior;
- Nextra/MDX documentation replacement and legacy content indexing;
- Make, n8n, GitHub, social, analytics, and observability credential/data-flow review;
- package removals with lockfile, build, and protected-runtime impact;
- public PDFs, asset rights, private infrastructure information, and old product claims.

Unresolved execution questions are dependency gates rather than missing classifications:

- which protected internal application functions remain active long-term;
- exact previous-purchaser and legal obligations;
- final mailing-list provider, consent, retention, and migration policy;
- final docs technology;
- New Relic and deployment integration use;
- semantic redirect versus 404/410 for routes without replacements;
- final brand/favicons and asset licence evidence;
- exact package-security upgrades independent of redesign.

## Wave 0 Packet 1 completion

Created archive governance paths:

```text
archive/legacy-public-platform/README.md
archive/legacy-public-platform/manifest.yaml
```

Selected import and build-boundary mechanism:

```text
scripts/design/lint-design-system.mjs
node scripts/design/lint-design-system.mjs --archive-imports-only
```

The existing design validator now:

- rejects literal static imports from `archive/legacy-public-platform`;
- rejects re-exports from the archive;
- rejects literal dynamic imports from the archive;
- rejects literal `require` calls from the archive;
- runs positive and negative fixtures entirely in memory;
- scans active source for current violations;
- rejects executable source extensions inside the archive, requiring historical implementation snapshots to use a non-compilable suffix such as `<original-name>.archive`.

This storage convention prevents the root TypeScript glob from compiling future archived implementation without requiring a second configuration change. Tailwind and Next.js already scan only active application roots.

Validation evidence:

- Wave 0 started from a clean worktree after `854d03e`;
- the archive root is outside `src`, `public`, `app`, `pages`, and package roots;
- the archive currently contains only `README.md` and `manifest.yaml`;
- `tsconfig.json` has no archive alias or explicit archive path;
- Tailwind does not scan the archive;
- Next.js configuration does not expose or discover archive routes;
- the archive guard passed active-source scanning, in-memory forbidden fixtures, allowed fixtures, and non-compilable-storage checks;
- the validator passed `node --check`;
- `manifest.yaml` is YAML 1.2-compatible JSON and passed deterministic parsing and required-field checks;
- the manifest contains zero movement entries;
- the security scan returned zero findings across all four changed paths;
- no temporary fixture file was created;
- no existing file was moved, renamed, archived, deleted, or modified except the approved existing validation script;
- no route, component, style, asset, product copy, metadata, redirect, package, lockfile, or dependency changed.

Changed paths:

```text
archive/legacy-public-platform/README.md
archive/legacy-public-platform/manifest.yaml
scripts/design/lint-design-system.mjs
docs/product/agent-mode-progress.md
```

## Wave 1 Packet 1 completion

Created paths:

```text
docs/migration/WAVE1_FOUNDATION_BASELINE.md
src/assets/styles/prochat-foundation.css
src/lib/prochat-fonts.ts
```

Updated validation and handoff paths:

```text
scripts/design/lint-design-system.mjs
docs/product/agent-mode-progress.md
```

The requested `prochat-tokens.css` filename was rejected by repository path policy as credential-like. `prochat-foundation.css` is the policy-safe equivalent and contains the same approved canonical token scope.

Canonical token categories:

- page, raised, inset, and strong surfaces;
- primary, secondary, muted, and inverse text;
- subtle, standard, and strong borders;
- canonical ProChat Cobalt `#3158C7`, hover, pressed, soft, line, focus, and selection roles;
- success, warning, error, and information semantic states;
- 4px-based spacing;
- page, content, and reading containers;
- body and hero reading measures;
- desktop, tablet, and mobile gutters and grid columns;
- canonical radii;
- restrained neutral shadows;
- Golos Text and JetBrains Mono typography roles;
- approved display, heading, body, label, weight, line-height, and tracking values;
- CSS micro-interaction durations and easing curves.

The new token file includes no old product palette, Host Grotesk, Inter, Playfair Display, Material Symbols, warm editorial theme, gradient, decorative glow, blob, glass treatment, smooth scrolling, universal transition, animation, or keyframe.

Font-module decisions:

- `Golos_Text` is the only primary public font;
- `JetBrains_Mono` is the only technical font;
- stable future variables are `--font-prochat-sans` and `--font-prochat-mono`;
- the module uses `next/font/google` only;
- no local Host font or Fontsource import was added;
- each approved font is configured exactly once;
- deterministic system and monospace fallbacks are documented;
- the module has zero live consumers and creates no current runtime request.

Current-shell baseline findings:

- the live root forces the `dark` class;
- current root font variables include Host Grotesk, Golos Text, and JetBrains Mono simultaneously;
- JetBrains Mono and Host Grotesk have duplicate loading paths;
- `globals.scss` imports `backgrounds.scss` and owns Tailwind layers, legacy tokens, themes, universal transitions, and root rules;
- the global background layer includes fixed blurred shapes, old blue/purple/cyan values, blend modes, hero-line assets, and infinite keyframes;
- `Providers` globally mounts `next-themes`, React Hot Toast, and React Tooltip;
- public and protected routes share AppChrome, global providers, theme behavior, fonts, metadata, analytics, and legacy CSS;
- Tailwind maps public utilities to the legacy `--pc-*`, blue, gray, surface, border, ring, and shadow systems;
- protected auth, admin, application, commerce, licence, purchaser, Contact, database, email, analytics, toast, and tooltip behavior blocks a blind root-shell replacement.

Validation evidence:

- validator syntax passed with `node --check`;
- scoped canonical-foundation validation passed;
- required semantic token categories and canonical cobalt were verified;
- forbidden legacy terms and visual effects were absent from the new foundation;
- both font constructors and CSS variables were verified;
- exact source search found no live consumer for either new file;
- archive-boundary validation still passed;
- the security scan returned zero findings across all five changed paths;
- repository TypeScript validation passed with `pnpm exec tsc --noEmit --pretty false`;
- the generic Workbench `type_check_web` command was inapplicable because it targets a nonexistent `apps/` directory;
- the live root layout, globals, backgrounds, Tailwind configuration, providers, theme provider, routes, pages, Header, Footer, metadata, redirects, assets, package file, and lockfile remain unchanged;
- no existing file was moved into the archive;
- live production appearance and runtime behavior remain unchanged.

Rollback remains limited to the five additive or validation/handoff paths listed above.

Unresolved Wave 1 decisions:

1. Whether protected routes keep a temporary legacy shell or receive a distinct internal shell.
2. Which legacy token aliases must survive temporarily for protected consumers.
3. Whether public theme switching is removed at the live switch or retained temporarily.
4. Final Header, Footer, AppChrome, skip-link, analytics, toast, tooltip, and provider composition.
5. When legacy font paths and global background assets can stop loading.
6. How root metadata, selection, theme color, and hero preloads migrate.
7. The screenshot and protected-flow baseline required before activating the new shell.

## Wave 1 Packet 2 completion

Created:

```text
docs/migration/WAVE1_SHELL_COMPATIBILITY_PLAN.md
docs/migration/WAVE1_SHELL_RESPONSIBILITIES.json
```

Updated:

```text
docs/product/agent-mode-progress.md
```

Route shell classification:

```yaml
canonical_public_shell: 9
protected_internal_shell: 16
temporary_legacy_compatibility: 24
no_shared_shell: 35
total: 84
```

Provider ownership decisions:

- structured data and public analytics move to the canonical public route boundary;
- canonical public pages are light-first and do not mount `next-themes`;
- theme switching remains temporary protected or legacy compatibility only;
- React Hot Toast moves to protected application and transactional ownership;
- public forms use local accessible status regions;
- React Tooltip stops being a global public provider and is replaced by local canonical tooltip ownership;
- authentication, Stripe, licences, purchaser flows, and processing remain route-local or protected-shell responsibilities;
- documentation, errors, maintenance, unsubscribe, APIs, webhooks, redirects, health, and OG routes use no shared public shell.

Compatibility aliases and expiry:

```text
ALIAS-001  root font variables                    Wave 8
ALIAS-002  page gutter, button radius, header     Wave 8
ALIAS-003  semantic RGB bridge                    Wave 8
ALIAS-004  old blue and gray scales               Wave 8
ALIAS-005  old surface/elevated shadows           Wave 8
```

Every alias group has exact direct consumers and a concrete expiry condition in `WAVE1_SHELL_RESPONSIBILITIES.json`.

Current shell findings:

- AppChrome applies the blob/line backdrop and shared Header/AppShell to every non-doc route;
- AppShell contains hard-coded knowledge of legacy products, waitlists, kits, proof, studio, events, prompts, and Waas routes;
- no active skip link was found;
- Header owns legacy product URLs, theme switching, analytics, social links, mobile sheet state, and scroll-direction behavior;
- Footer owns legacy product URLs, current legal/docs links, company GitHub/LinkedIn, a personal X account, and glass/backdrop styling;
- Contact metadata still references SaaSKit and ProKit;
- Admin, Chat, Processing, Docs, Contact, and Waiting List layouts provide limited or no isolation from the root shell.

Packet 3 decision:

- Packet 3 is a structural output-equivalence activation;
- it creates explicit route-aware shell and provider boundaries;
- no current production route adopts the canonical visual shell;
- the current canonical route allowlist remains empty;
- future `/memory`, `/memory/qa`, `/workbench`, `/philosophy`, and `/about` routes use the canonical shell when created;
- `/`, Contact, Privacy, and Terms activate only in their approved page or design wave;
- protected and legacy routes retain exact current output and providers;
- BuildFlow remains non-public compatibility only.

Validation and rollback requirements:

- executable route classification must match all 84 manifest records;
- current route output must remain equivalent;
- protected auth, admin, application, purchaser, commerce, licence, Contact, email, analytics, toast, tooltip, and health flows must pass;
- docs, redirects, errors, maintenance, unsubscribe, APIs, webhooks, health, and OG routes must bypass public chrome;
- visual baselines cover 320, 768, 1024, 1440, and 1728 pixels;
- accessibility covers skip link, landmarks, focus, keyboard, touch targets, reduced motion, and status messaging;
- performance covers providers, fonts, AppChrome/Header client cost, background paint, bundles, and Core Web Vitals;
- rollback reverts the single Packet 3 commit while leaving Packet 1 foundation files inert.

Packet 2 validation evidence:

- all 84 route records appear exactly once across four shell classes;
- seven providers have one current owner, destination, and protected behavior;
- five compatibility alias groups have exact direct consumers, expiry waves, and expiry conditions;
- Packet 3 has 13 exact expected changed paths and an empty current canonical route allowlist;
- BuildFlow remains public only as temporary legacy compatibility and technical identifiers remain non-public;
- JSON parsing and documentation structure checks passed;
- the security scan returned zero findings across all three changed paths;
- no live source file changed.

Unresolved decisions:

1. Long-term protected internal application scope.
2. First current route approved for canonical visual activation.
3. Privacy and Terms activation timing.
4. Contact activation timing relative to the canonical form system.
5. Final public analytics and consent requirements.
6. Remaining consumers of standalone `theme-provider.tsx` and global React Tooltip.
7. Long-term theme switching for protected routes.
8. Future docs shell technology and company chrome.

## Wave 1 Packet 3 completion

Implemented:

```text
src/helpers/shell-routes.ts
src/components/shell/CanonicalPublicShell.tsx
src/components/shell/ProtectedInternalShell.tsx
src/components/shell/LegacyCompatibilityShell.tsx
src/components/shell/NoSharedShell.tsx
src/components/AppChrome.tsx
src/components/providers.tsx
src/assets/styles/prochat-foundation.css
scripts/design/lint-design-system.mjs
```

Executable route-class counts:

```yaml
canonical_public_shell: 9
protected_internal_shell: 16
temporary_legacy_compatibility: 24
no_shared_shell: 35
total: 84
```

Shell responsibilities:

- `CanonicalPublicShell` defines the future foundation scope, stable `#main-content` landmark, skip-link contract, and canonical font-variable contract;
- `ProtectedInternalShell` explicitly owns protected routes while delegating to the exact legacy compatibility markup for output equivalence;
- `LegacyCompatibilityShell` contains the previous AppChrome backdrop, Header, AppShell, Footer, and class structure unchanged;
- `NoSharedShell` preserves the existing docs wrapper and contains no Header or AppShell;
- AppChrome dispatches from one deterministic route classifier;
- the current canonical visual allowlist remains empty;
- future `/memory`, `/memory/qa`, `/workbench`, `/philosophy`, and `/about` patterns are prepared but not activated.

Provider split:

- `CanonicalPublicProviders` is defined without theme, toast, or tooltip dependencies;
- `LegacyCompatibilityProviders` preserves `next-themes`, React Hot Toast, React Tooltip, classes, options, and output for every current route;
- no current route enters the canonical provider boundary;
- authentication, commerce, purchaser, licence, and transactional ownership remain protected or route-local.

Output-equivalence evidence:

- static shell validation confirms the legacy compatibility shell contains every previous backdrop, Header, AppShell, and wrapper marker;
- protected routes delegate to the exact legacy compatibility shell;
- docs retain the previous `relative z-10` wrapper without public chrome;
- current canonical visual allowlist is empty;
- canonical foundation validation confirms no live consumer imports the canonical font or foundation modules;
- root layout, Header, Footer, AppShell, globals, Tailwind, page content, metadata, redirects, APIs, forms, assets, packages, lockfile, and archive content remain unchanged.

Validation evidence:

- validator syntax passed;
- shell-routing validation passed for all 84 records;
- TypeScript passed;
- production build passed with all 106 static pages generated;
- canonical-foundation validation passed;
- archive-boundary validation passed;
- BuildFlow remains temporary legacy compatibility;
- temporary smoke scripts were deleted before commit;
- browser screenshots were unavailable because no browser runtime is installed and adding one is prohibited;
- cross-command HTTP smoke tests were unavailable because persisted validation jobs use isolated network namespaces;
- both production and maintenance-disabled development servers started successfully in persisted jobs;
- protected-flow evidence is therefore limited to successful compilation, static generation, shell parity, and unchanged protected source boundaries.

Rollback:

- revert the single Packet 3 commit;
- Packet 1 foundation files remain inert;
- no page content, route metadata, package, data migration, redirect, or archive movement requires separate rollback.

## Wave 1 Packet 4 completion

Created:

```text
docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
```

Browser environment inspection:

```yaml
@playwright/test: not installed
playwright: not installed
playwright-core: not installed
puppeteer: not installed
puppeteer-core: not installed
cypress: not installed
selenium-webdriver: not installed
@axe-core/playwright: not installed
browser_test_script: absent
package_changes: prohibited
```

Connected-environment limitation:

- persisted server jobs run in isolated network namespaces;
- production and maintenance-disabled development servers started successfully during Packet 3;
- separate commands could not connect to those local ports;
- no screenshot, viewport, DOM, accessibility-tree, keyboard, hydration, console, network-trace, or Web Vitals tooling is available without adding a browser dependency or using an external browser-capable runner.

Retained Packet 3 evidence:

```yaml
route_records: 84
canonical_public_shell: 9
protected_internal_shell: 16
temporary_legacy_compatibility: 24
no_shared_shell: 35
current_canonical_visual_allowlist: 0
static_pages_generated: 106
typescript: passed
production_build: passed
shell_parity: passed
canonical_foundation: passed
archive_boundary: passed
security_findings: 0
```

Activation decision:

```yaml
result: BLOCKED
current_route_activation: none
first_route: null
allowlist_change: none
```

No current route is approved for canonical visual activation. Static source and build evidence reduce risk but do not prove visual equivalence, accessibility, protected browser flows, hydration behavior, or runtime performance.

Pending browser evidence is explicitly inventoried for:

- 320, 768, 1024, 1440, and 1728 pixel viewports;
- `/`, `/contact`, `/privacy`, `/docs`, `/prochat-memory`, `/buildflow`, `/admin/licenses`, `/dashboard`, `/chat/[projectID]`, `/sign-in`, `/processing-page`, `/maintenance`, `/unsubscribe`, `/api/health`, and `/og`;
- visual drift, landmarks, keyboard, focus, mobile navigation, reduced motion, protected flows, provider hydration, console errors, network behavior, bundles, and Core Web Vitals.

No live source, shell, route, page, provider, style, metadata, redirect, form, API, asset, package, lockfile, or archive content changed in Packet 4.

## Wave 1 Packet 4B completion

Packet 4B remained evidence-only and made no live source change.

Created evidence:

```text
docs/migration/evidence/wave1/packet4b-environment-audit.json
```

Updated:

```text
docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
docs/product/agent-mode-progress.md
```

Final decision:

```yaml
equivalence_gate: BLOCKED
canonical_visual_activation: NOT_APPROVED
current_canonical_visual_allowlist: []
first_current_route_eligible_for_activation: null
shell_defect_identified: false
defect_class: verification_environment_unavailable
```

Packet 4B environment findings:

- no installed Playwright, Puppeteer, Cypress, Selenium, or axe browser runtime;
- no browser, E2E, accessibility, Lighthouse, screenshot, or trace package script;
- GitHub `main.yml` builds, publishes a container, and triggers Dokploy but captures no browser evidence;
- `docs-preview.yml` creates only a `.next` artifact and emits no browser-capable preview URL;
- deployment documentation exposes no target/baseline commit-specific preview mechanism;
- `https://prochat.tools` is reachable but currently serves a maintenance surface and exposes no attributable commit provenance;
- no maintenance-disabled URLs pinned to baseline `b3739ba` and target `4d12c05` were available;
- no approved protected auth, admin, commerce, purchaser, or licence credentials and test data were supplied.

Retained non-browser evidence remains valid:

```yaml
route_records: 84
canonical_public_shell: 9
protected_internal_shell: 16
temporary_legacy_compatibility: 24
no_shared_shell: 35
current_canonical_visual_allowlist: 0
static_pages_generated: 106
typescript: passed
production_build: passed
shell_manifest_parity: passed
canonical_foundation_validation: passed
archive_boundary_validation: passed
security_scan: zero findings
```

Missing evidence remains:

- baseline-versus-target screenshots at 320, 768, 1024, 1440, and 1728 pixels;
- DOM, main-landmark, skip-link, computed-font, keyboard, focus, reduced-motion, touch-target, and mobile-navigation verification;
- console, network, provider-hydration, trace, bundle, and Core Web Vitals evidence;
- protected auth, admin, application, commerce, purchaser, licence, Contact, unsubscribe, analytics, health, and OG browser checks.

No shell repair packet is authorized because no attributable shell defect was identified. The smallest next packet provisions the missing verification environment and evidence inputs.

## Exact next task

```text
Execute Wave 1 Packet 4C only: browser-verification-environment-provisioning.

Goal:
- provide an attributable baseline/target browser environment and approved protected-flow inputs;
- execute the existing Packet 4B route and viewport evidence matrix;
- keep the current canonical visual allowlist empty;
- make no shell source change unless later browser evidence identifies an exact defect.

Required inputs:
- maintenance-disabled URL pinned to baseline commit b3739ba;
- maintenance-disabled URL pinned to target commit 4d12c05;
- or one existing browser-capable runner able to check out and serve both commits under identical conditions;
- browser runtime and tooling for screenshots, DOM, accessibility tree, keyboard/focus, reduced motion, console, network, traces, bundle inspection, and Core Web Vitals;
- approved protected auth, admin, commerce, purchaser, licence, Contact, unsubscribe, analytics, health, and OG credentials or test data through secure mechanisms.

Read first:
- docs/product/agent-mode-progress.md
- docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
- docs/migration/evidence/wave1/packet4b-environment-audit.json
- docs/migration/WAVE1_SHELL_COMPATIBILITY_PLAN.md
- docs/migration/WAVE1_SHELL_RESPONSIBILITIES.json
- src/helpers/shell-routes.ts
- src/components/AppChrome.tsx
- src/components/providers.tsx
- src/components/shell/**

Capture:
- screenshots at 320, 768, 1024, 1440, and 1728 pixels;
- all 15 representative routes in WAVE1_BROWSER_EQUIVALENCE_REPORT.md;
- attributable comparison of b3739ba and 4d12c05 under identical conditions;
- absence of pc-foundation-scope, canonical skip link, and canonical font activation on every current route;
- one main landmark and no duplicate landmarks;
- keyboard, focus, reduced-motion, touch-target, and mobile-navigation behavior;
- protected auth, admin, application, commerce, purchaser, and licence flows;
- Contact, unsubscribe, analytics, health, and OG behavior;
- provider hydration, console errors, network behavior, bundles, traces, and Core Web Vitals.

Allowed repository changes:
- docs/migration/WAVE1_BROWSER_EQUIVALENCE_REPORT.md
- docs/migration/evidence/wave1/**
- docs/product/agent-mode-progress.md

Restrictions:
- evidence and environment only;
- do not change shell code;
- do not activate any current route;
- do not change the canonical visual allowlist;
- do not edit routes, pages, providers, styles, metadata, redirects, APIs, assets, packages, lockfiles, or archive content;
- do not begin Wave 2 or the design lab;
- do not add browser packages without separate explicit approval.

Decision:
- PASS: define the first exact activation candidate and a separate Packet 5;
- BLOCKED: record exact attributable environment or source defects and the smallest follow-up packet.

Commit:
docs(prochat): provision browser shell verification
```
