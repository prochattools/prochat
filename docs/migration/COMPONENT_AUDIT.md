# ProChat Component Audit

**Status:** canonical audit specification  
**Scope:** shared UI, marketing components, page-local components, product visuals, forms, navigation, layout, and compatibility wrappers

## Purpose

The component audit identifies every reusable or duplicated component, its consumers, its design authority, and its migration path into the approved ProChat component system.

A component is not retained merely because it is shared. Shared legacy assumptions can spread inconsistency faster than page-local code.

## Canonical component sources

```text
docs/design/COMPONENT_LIBRARY.md
docs/design/PRODUCT_VISUAL_LIBRARY.md
DESIGN.md
brand-spec.md
```

## Required record

```yaml
id: "COMP-000"
name: ""
path: ""
category: "foundation | navigation | layout | form | marketing | product-visual | utility | compatibility"
current_purpose: ""
consumers: []
public_api: []
visual_dependencies: []
runtime_dependencies: []
accessibility_behavior: ""
responsive_behavior: ""
motion_behavior: ""
test_coverage: []
status: "CURRENT | DUPLICATE | LEGACY | EXPERIMENTAL | UNSAFE | MISSING"
disposition: "KEEP | REFACTOR | REWRITE | REPLACE | ARCHIVE | DELETE"
canonical_replacement: ""
api_migration: ""
migration_wave: 0
risk: "LOW | MEDIUM | HIGH | CRITICAL"
validation: []
rollback: ""
deletion_approved: false
owner: ""
notes: ""
```

## Inventory targets

Audit:

- `src/components/**`;
- `src/app/**/_components/**`;
- marketing page component directories;
- duplicated UI folders;
- Radix wrappers;
- buttons and links;
- headers, navigation, and footers;
- hero components;
- page sections;
- forms and fields;
- accordions and disclosures;
- cards and surfaces;
- product visual prototypes;
- icons and illustration wrappers;
- analytics wrappers;
- compatibility components using old names.

## Component classes

### Foundations

- Button
- Link
- Input
- Textarea
- Select
- Checkbox
- StatusLabel
- Divider
- Surface
- Container
- SectionShell

### Platform shell

- Header
- MobileNavigation
- Footer
- Breadcrumb
- TableOfContents
- PageHero
- CTAGroup
- ContactForm
- LegalMetadata
- ErrorState

### Product visuals

Use the canonical primitives in `PRODUCT_VISUAL_LIBRARY.md`, including Memory, QA, and Workbench visual objects.

## Duplicate detection

Treat components as potential duplicates when they share responsibility but differ only through:

- page-specific colors;
- historical fonts;
- spacing;
- radius;
- icon placement;
- Tailwind versus SCSS implementation;
- marketing versus app directory;
- legacy product naming.

Do not merge components whose responsibilities are genuinely different merely to reduce file count.

## API review

For every retained or replacement component, check:

- semantic element choice;
- product-meaningful props;
- variant count;
- arbitrary style escape hatches;
- content ownership;
- state completeness;
- responsive API;
- accessibility API;
- animation coupling;
- testability;
- server/client boundary;
- dependency cost.

Avoid APIs such as arbitrary `color`, `shadow`, or `radius` props that let pages bypass canonical tokens.

## Lifecycle

```text
EXPERIMENTAL
→ CANDIDATE
→ APPROVED
→ PRODUCTION
→ DEPRECATED
→ RETIRED
```

### Experimental

Design-lab only. No production consumers.

### Candidate

Product truth, states, and accessibility are defined; implementation is still under review.

### Approved

Visual direction and API are approved. Tests and production integration remain.

### Production

Documented, tested, and used by approved pages.

### Deprecated

Replacement exists, consumers are listed, and migration instructions are published.

### Retired

No consumers remain; removal is verified and committed.

## Migration method

1. Identify consumers.
2. Define canonical responsibility.
3. Decide keep/refactor/rewrite/replace.
4. Build replacement in isolation.
5. Add tests and visual baselines.
6. Migrate one bounded consumer group.
7. Verify behavior and design.
8. Mark old component deprecated.
9. Remove only after zero-consumer proof.

## Special risks

### Shared hero abstractions

Do not force the cinematic homepage hero into a generic legacy hero component. Retain a shared hero only for pages whose responsibility and composition genuinely match.

### Button duplication

The repository contains multiple button implementations. Audit consumers and converge on one accessible production primitive without breaking form or navigation behavior.

### Server and client boundaries

Do not convert server-rendered page structures into broad client components merely to reuse an animated abstraction.

### Animation coupling

A component must remain statically representable. GSAP or Framer Motion orchestration belongs in scoped wrappers or stories, not in every primitive.

## Validation

- import and consumer search;
- component API review;
- design-token review;
- keyboard and screen-reader checks;
- responsive screenshots;
- reduced-motion behavior;
- visual regression;
- type check;
- package tests;
- production build;
- zero-consumer search before deletion.

## Completion criteria

- every shared and page-local component has a responsibility and disposition;
- duplicate component systems have a migration decision;
- canonical production components have documented APIs and states;
- deprecated components have replacements and consumer lists;
- no removed component retains imports or runtime consumers;
- page code does not bypass the global design system through arbitrary variants.
