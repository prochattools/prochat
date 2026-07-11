# ProChat Foundational Legacy Sweep Plan

**Status:** canonical repository-local migration program  
**Scope:** public pages, copy, routes, components, styles, motion, assets, dependencies, metadata, analytics, and documentation  
**Authority:** Mind public-platform roadmap and brand governance

## Purpose

The ProChat repository contains multiple historical product directions, themes, page systems, components, animations, and copy experiments. The new public platform must not be layered indefinitely on top of that history.

This plan defines a controlled foundational sweep that inventories, classifies, replaces, migrates, validates, and only then removes legacy material.

## Governing rules

1. Do not delete by intuition.
2. Inventory before classification.
3. Classify before migration.
4. Build and validate replacements before removal.
5. Deprecate or redirect before deleting public or shared surfaces.
6. Keep commits small enough to review and revert.
7. Do not combine legacy removal with unrelated feature work.
8. Preserve product truth, accessibility, performance, analytics, and route behavior.
9. Production code is not design authority; canonical documents are.
10. Historical value may justify archival even when active guidance must disappear.

## Scope

### Documentation

- active strategy and design files;
- old product hierarchies;
- archived kit, OS, wedge, and BuildFlow material;
- stale implementation notes;
- duplicate copy sources;
- obsolete roadmaps and plans.

### Routes and pages

- current public routes;
- duplicate or competing product pages;
- legacy product and kit routes;
- legal, contact, waitlist, and documentation routes;
- redirects;
- 404 and error behavior;
- sitemap and robots exposure.

### Content

- headings and body copy;
- calls to action;
- product names;
- claims;
- metadata;
- social copy;
- form labels;
- legal language;
- footer and navigation text.

### Components

- shared marketing components;
- duplicate button and layout systems;
- hero components;
- product cards;
- navigation and footer implementations;
- forms;
- diagrams and product visuals;
- page-local copies of shared primitives.

### Styling

- fonts;
- tokens;
- colors;
- gradients;
- themes;
- Tailwind configuration;
- global CSS and SCSS;
- CSS Modules;
- page-local styles;
- shadows, radii, spacing, and responsive rules.

### Motion

- Framer Motion usage;
- CSS animations;
- intersection observers;
- parallax;
- scroll effects;
- page transitions;
- reduced-motion behavior;
- abandoned animation experiments.

### Assets

- logos;
- icons;
- screenshots;
- illustrations;
- social images;
- fonts;
- video;
- SVG;
- unused public assets.

### Dependencies and tooling

- runtime packages;
- animation libraries;
- UI libraries;
- icon packages;
- style tooling;
- visual testing;
- analytics;
- content platforms;
- unused build tools.

## Classification

Every audited item receives exactly one primary disposition:

```text
KEEP
REFACTOR
REWRITE
REPLACE
ARCHIVE
REDIRECT
DELETE
```

### KEEP

The item already matches canonical product, design, accessibility, performance, and technical direction.

### REFACTOR

The item has a sound responsibility and consumers but needs a bounded internal change.

### REWRITE

The page or content responsibility remains valid, but its copy or information structure must be recreated.

### REPLACE

A new canonical implementation must be built before the old item is retired.

### ARCHIVE

The item has historical, research, or compatibility value but must not guide active work or remain publicly discoverable as current.

### REDIRECT

A public route is no longer canonical but requires a durable destination and tested redirect behavior.

### DELETE

The item has no active consumer, historical value, contractual requirement, or rollback need, and its removal is approved.

## Required audit record

```yaml
item:
  id: ""
  category: "route | content | component | style | motion | asset | dependency | document"
  path: ""
  current_purpose: ""
  current_consumers: []
  canonical_replacement: ""
  disposition: "KEEP | REFACTOR | REWRITE | REPLACE | ARCHIVE | REDIRECT | DELETE"
  rationale: ""
  dependencies: []
  migration_wave: ""
  redirect: null
  accessibility_risk: ""
  performance_risk: ""
  seo_or_analytics_risk: ""
  rollback: ""
  validation: []
  deletion_approved: false
  owner: ""
  status: "inventoried | decided | replacement-ready | migrated | verified | retired"
```

## Migration sequence

### Stage 1 — Freeze authority

- Confirm Mind and repository-local canonical documents.
- Mark legacy sources as non-authoritative.
- Prevent new work from extending deprecated themes or product structures.

### Stage 2 — Inventory

Complete all audit documents without deleting or broadly editing production code.

### Stage 3 — Decide

Assign disposition, canonical replacement, dependency order, and validation.

### Stage 4 — Build replacements

Use the design lab and production-foundation phases. Maintain explicit coexistence boundaries between old and new systems.

### Stage 5 — Migrate consumers

Move page and component consumers in bounded waves. Do not migrate unrelated surfaces merely because a shared file is open.

### Stage 6 — Verify

Validate routes, content, accessibility, visual baselines, performance, analytics, metadata, forms, and browser behavior.

### Stage 7 — Retire

Apply redirects, archive historical material, remove obsolete code and assets, remove unused dependencies, and update documentation.

### Stage 8 — Prove absence

Search for old names, imports, tokens, routes, assets, and copy. Run build and tests. Confirm no public discovery remains unless intentionally archived.

## Migration waves

```text
Wave 0 — documentation and authority
Wave 1 — tokens, fonts, and shared shell
Wave 2 — shared primitives and design lab
Wave 3 — homepage
Wave 4 — Memory and Memory for QA
Wave 5 — Workbench
Wave 6 — philosophy, About, Contact, legal, docs, and errors
Wave 7 — redirects and legacy route retirement
Wave 8 — obsolete styles, components, assets, and dependencies
Wave 9 — final absence checks and repository simplification
```

## Safety and rollback

- Record the last known working commit before each migration wave.
- Keep old and new implementations separate until the replacement passes its gate.
- Avoid destructive rewrites of shared files before consumer mapping.
- Use route redirects before page deletion.
- Remove dependencies only after import and runtime checks.
- Keep archival decisions separate from production deletion.
- Commit exact paths only.
- Never mix unrelated worktree changes.

## Validation gates

Each migration wave requires the relevant subset of:

- type check;
- production build;
- route crawl;
- link check;
- visual regression;
- keyboard and axe checks;
- reduced-motion review;
- performance trace;
- metadata and structured-data review;
- analytics verification;
- import and dead-code search;
- exact Git diff review.

## Completion criteria

The sweep is complete when:

- every active public route maps to one canonical page responsibility;
- every active page uses the approved company and product hierarchy;
- production surfaces use the global design system;
- obsolete themes, fonts, copy, components, routes, assets, and dependencies are removed or archived;
- redirects and metadata are verified;
- no legacy direction appears as a current ProChat product;
- accessibility and performance gates pass;
- the repository is materially simpler;
- the migration matrix contains no unresolved high-risk item.

## Research basis

- USWDS maturity guidance: principles, then guidance, then code.
- USWDS component lifecycle: proposed, mature, deprecated, retired.
- Carbon migration and deprecation guidance: provide migration paths and deprecate before removal.
- WCAG 2.2: accessibility is a conformance requirement across content and interaction.
- web.dev performance budgets: budgets guide design and technology decisions and should be enforced in delivery tooling.
