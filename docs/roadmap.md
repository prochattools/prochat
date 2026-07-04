# ProChat website roadmap

**Status:** repository-local website implementation roadmap  
**Owner:** Steve Westhoek  
**Scope:** ProChat website and marketing implementation only

## Source of truth

Mind is canonical for the ProChat cross-product roadmap and product strategy:

```text
mind/wiki/organisations/prochat/README.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/growth/README.md
mind/wiki/organisations/prochat/legal/README.md
```

This document is a website implementation roadmap only. It must not redefine ProChat product strategy, naming, business stage, legal-policy direction, growth policy, or cross-product roadmap.

## Current product boundary

Mind currently defines exactly two products:

```text
ProChat Memory
ProChat Workbench
```

Current website launch emphasis:

```text
Flagship product: ProChat Memory
First launch niche: ProChat Memory for QA
Second product: ProChat Workbench
```

ProChat Answers, ProChat Automations, API access, and MCP integrations are capabilities or future interfaces, not current products.

ProChat OS, SaaSKit, ProKit, UXKit, WaaSKit, MikeOSS, and BuildFlow must not be presented as current ProChat products. Where relevant, treat them as legacy, historical, external, archived, or technical/internal references.

## Roadmap principle

Build the website from the Mind-defined product boundary outward:

1. align repository-local docs to Mind;
2. simplify active website guidance;
3. archive older strategy docs without deleting them;
4. rewrite marketing pages around ProChat Memory, ProChat Memory for QA, and ProChat Workbench;
5. validate navigation, metadata, sitemap, and conversion flows against Mind.

## Phase A — Authority and lean docs

Status: current batch.

Goal:

- make this repo explicitly subordinate to Mind;
- remove active local product-strategy duplication;
- keep technical website/runtime facts intact;
- establish the website as a marketing and implementation repo only.

Files:

```text
README.md
docs/overview.md
docs/strategy.md
docs/roadmap.md
docs/implementation-plan.md
```

Exit criteria:

- active Batch A docs link to Mind canonical docs;
- active Batch A docs declare only ProChat Memory and ProChat Workbench as current products;
- active Batch A docs identify ProChat Memory as flagship;
- active Batch A docs identify ProChat Memory for QA as the first launch niche;
- active Batch A docs do not present legacy names or future interfaces as current products.

## Phase B — Archive stale strategy docs

Goal:

Archive older strategy, hierarchy, modules, ProChat OS, kit, BuildFlow, MikeOSS, and law-firm wedge documents that should remain historically available but should not guide current website work.

Do not delete historical material.

Candidate archive groups:

```text
docs/archive/prochat-os/
docs/archive/legacy-kits/
docs/archive/law-firm-wedge/
docs/archive/buildflow/
docs/archive/old-modules/
```

Candidate files will be reviewed before moving.

## Phase C — Website copy blueprint rewrite

Goal:

Rewrite active copy guidance for:

- homepage;
- ProChat Memory page;
- ProChat Memory for QA page;
- ProChat Workbench page;
- contact/waitlist pages;
- navigation and footer language;
- metadata and social copy.

Constraints:

- do not duplicate Mind strategy;
- do not invent product names;
- do not overpromise beta status, legal rights, savings, or automation capabilities;
- distinguish current products from capabilities and future interfaces.

## Phase D — Marketing page rewrite

Goal:

Bring production marketing pages into line with the cleaned docs.

Likely surfaces:

```text
src/app/(marketing)/
src/app/prochat-memory/
src/app/qa-memory/
src/app/buildflow/
src/app/systems/prochat-os/
src/app/kits/
src/components/Header.tsx
src/app/(marketing)/components/layout/Footer.tsx
src/helpers/chrome-routes.ts
```

Each route should be reviewed before edit. Archive or de-emphasize stale pages rather than deleting them unless a separate deletion decision is approved.

## Phase E — Validation

Goal:

Validate that the website, docs, navigation, and metadata match Mind.

Checks:

- only ProChat Memory and ProChat Workbench are treated as current products;
- ProChat Memory for QA is the first launch niche;
- ProChat Memory is the flagship product;
- future interfaces are not product cards;
- legacy/historical names do not drive active navigation;
- public claims match Mind legal and growth boundaries;
- unrelated worktree changes are not staged with docs alignment work.

## Rule

This roadmap governs website implementation work only. Product roadmap decisions belong in Mind.
