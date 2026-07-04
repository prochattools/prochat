# ProChat website implementation plan

**Status:** repository-local implementation plan  
**Owner:** Steve Westhoek  
**Scope:** aligning the ProChat website repository with Mind

## Source of truth

Mind is canonical for ProChat philosophy, product hierarchy, naming, positioning, business stage, growth policy, legal-policy direction, and cross-product roadmap.

Read before changing website strategy, product pages, roadmap language, legal copy, growth claims, or marketing structure:

```text
mind/wiki/organisations/prochat/README.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/growth/README.md
mind/wiki/organisations/prochat/legal/README.md
```

This plan is executable website-repo guidance only. It does not define ProChat product strategy.

## Current product boundary

Mind currently defines exactly two current products:

```text
ProChat Memory
ProChat Workbench
```

Current launch focus:

```text
ProChat Memory for QA
```

Implementation rules:

- ProChat Memory is the flagship product.
- ProChat Memory for QA is the first launch niche and first discipline-specific edition.
- ProChat Workbench is the second product.
- ProChat Answers, ProChat Automations, API access, and MCP integrations are capabilities or future interfaces, not current products.
- ProChat OS, SaaSKit, ProKit, UXKit, WaaSKit, and MikeOSS are legacy, historical, external, or archive-only references where relevant.
- BuildFlow is a technical/internal compatibility identifier for Workbench where required, not a current ProChat product.

## Safety rules

- Work only in the `prochat` repository unless a task explicitly says otherwise.
- Do not modify Mind from this repo's implementation batches.
- Do not duplicate Mind strategy in local docs.
- Do not delete historical docs or pages during cleanup; archive them when approved.
- Do not stage unrelated website, design, Graphify, or component changes with documentation-alignment batches.
- Do not change environment files, secrets, credentials, private keys, or production account data.
- Do not promote future capabilities as current products.
- Do not make unsupported claims about savings, accuracy, legal rights, automation, or commercial licensing.

## Batch A — authority and lean documentation alignment

Status: current batch.

Allowed files:

```text
README.md
docs/overview.md
docs/strategy.md
docs/roadmap.md
docs/implementation-plan.md
```

Goal:

Make active repo-local docs subordinate to Mind and remove stale active product-strategy duplication.

Acceptance criteria:

- this repo is described as the website and marketing implementation repo;
- active Batch A docs link to Mind canonical docs;
- active Batch A docs state the repo must not redefine ProChat philosophy, product hierarchy, naming, positioning, business stage, legal-policy direction, growth policy, or cross-product roadmap;
- active Batch A docs declare exactly two current products: ProChat Memory and ProChat Workbench;
- active Batch A docs declare ProChat Memory as flagship;
- active Batch A docs declare ProChat Memory for QA as the first launch niche;
- active Batch A docs treat future interfaces and capabilities as non-products;
- active Batch A docs treat older names and kit directions as legacy, historical, external, archived, or technical/internal references;
- unrelated worktree changes remain unstaged.

## Batch B — archive stale docs

Status: planned after Batch A review.

Goal:

Archive historical docs that should not remain active website guidance.

Do not delete. Move reviewed files into explicit archive folders.

Candidate archive groups:

```text
docs/archive/prochat-os/
docs/archive/legacy-kits/
docs/archive/law-firm-wedge/
docs/archive/buildflow/
docs/archive/old-modules/
```

Candidate documents must be reviewed before moving.

## Batch C — copy and design guidance rewrite

Status: after archive plan.

Goal:

Rewrite active website guidance for the current product boundary:

- ProChat homepage;
- ProChat Memory page;
- ProChat Memory for QA page;
- ProChat Workbench page;
- contact/waitlist pages;
- navigation and footer language;
- metadata and social images.

Expected files include copy/design docs only until the guidance is reviewed.

## Batch D — production marketing page alignment

Status: after Batch C.

Goal:

Update production pages and navigation to match the approved website guidance.

Likely surfaces must be reviewed before editing:

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

Keep edits scoped and do not stage unrelated pre-existing changes.

## Batch E — validation

Status: final validation after docs and website updates.

Validate:

- Mind remains canonical;
- this repo remains lean and subordinate;
- only ProChat Memory and ProChat Workbench are current products;
- ProChat Memory for QA is the first launch niche;
- capabilities and future interfaces are not presented as products;
- legacy names are not active product navigation;
- public claims match Mind legal and growth boundaries;
- unrelated worktree changes are not staged or committed.

## Rule

This implementation plan governs website-repo execution only. Product strategy lives in Mind.
