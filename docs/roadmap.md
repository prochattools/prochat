# ProChat website roadmap

**Status:** repository-local website implementation roadmap  
**Owner:** Steve Westhoek  
**Scope:** ProChat website and marketing implementation only

## Source of truth

Mind is canonical for the ProChat cross-product roadmap and product strategy:

```text
mind/wiki/organisations/prochat/brand/README.md
mind/wiki/organisations/prochat/brand/product-strategy.md
mind/wiki/organisations/prochat/brand/product-naming-architecture.md
mind/wiki/organisations/prochat/brand/product-roadmap.md
mind/wiki/organisations/prochat/brand/canonical-homepage-copy.md
mind/wiki/organisations/prochat/brand/global-design-foundation.md
mind/wiki/organisations/prochat/brand/website-visual-motion-system.md
mind/wiki/organisations/prochat/brand/website-build-contract.md
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

## Phase C — Canonical copy and claim system

Status: complete.

Goal:

Establish the canonical homepage narrative and public claim boundaries before visual design.

Completed outcomes:

- canonical homepage copy lives in Mind;
- the homepage presents ProChat as a memory-first software company;
- ProChat Memory is the flagship;
- ProChat Memory for QA is the current edition and first launch niche;
- ProChat Workbench is the second product;
- unsupported security, privacy, integration, savings, and availability claims are excluded.

## Phase D — Global design foundation

Status: complete.

Goal:

Create one deliberate design system for the company and both products.

Completed decisions:

- Golos Text is the primary font;
- JetBrains Mono is the technical font;
- there is no secondary font;
- the palette is grayscale plus ProChat Cobalt `#3158C7`;
- product differentiation comes through structure, density, content, and behavior rather than separate themes;
- native scrolling remains the default;
- GSAP ScrollTrigger owns approved cinematic sequences;
- semantic HTML, CSS, and SVG own product visualization;
- mobile and reduced-motion variants are mandatory.

Repository outputs:

```text
PRODUCT.md
DESIGN.md
brand-spec.md
docs/homepage-design-spec.md
docs/homepage-visual-storyboard.md
docs/homepage-technical-design.md
docs/homepage-design-orchestration.md
docs/homepage-validation-plan.md
```

## Phase E — Foundation specimens and static directions

Status: next.

Goal:

Prove typography, color, spacing, component anatomy, and the hero composition before production code.

Tasks:

1. build a typography and token specimen;
2. create realistic Memory and Workbench visual primitives;
3. create three distinct static hero compositions using the same canonical design system;
4. create a static mobile hero for each viable direction;
5. select one hero direction;
6. document the selected composition and rejected alternatives.

Exit criteria:

- Gate 1 Foundation passes;
- Gate 2 Hero Direction passes;
- the selected direction works without animation;
- no foundational typography, palette, or product-visual question remains open.

## Phase F — Cinematic prototype system

Status: planned after Phase E.

Goal:

Prove the visual language and scroll architecture in an isolated design-lab environment.

Prototype order:

1. animated hero;
2. Memory lifecycle;
3. relevant-context selection;
4. QA investigation;
5. Workbench control plane;
6. mobile scene variants;
7. reduced-motion variants;
8. full-page low-fidelity assembly.

Implementation constraints:

- use native scrolling;
- use GSAP ScrollTrigger only for approved cinematic chapters;
- use semantic DOM and SVG;
- keep named product states separate from animation code;
- no smooth-scroll engine;
- no WebGL, Three.js, Rive, Lottie, or image sequences unless a later approved decision changes scope.

Exit criteria:

- all four cinematic sequences pass motion review;
- initial, middle, and final screenshot states exist;
- mobile and reduced-motion experiences are coherent;
- performance proof is within the prototype budget;
- Gate 3 Motion and Gate 4 Product Explanation pass.

## Phase G — Independent design-plan review

Status: planned after Phase F.

Goal:

Challenge the complete design before production integration.

Review sequence:

1. `/plan-design-review` scores the full plan and fixes weaknesses;
2. `/design-motion-principles` reviews each cinematic prototype;
3. `/taste-skill` audits anti-template quality;
4. canonical product and claim review verifies every visual implication;
5. the approved plan is reconciled into repository documentation.

Exit criteria:

- full-page prototype is approved;
- review findings are resolved or explicitly rejected with rationale;
- Gate 5 Full-page Prototype passes;
- production implementation packets are ready.

## Phase H — Production implementation

Status: planned after Phase G.

Goal:

Integrate the approved design into the existing Next.js website without broad framework migration.

Implementation order:

1. global fonts and semantic design tokens;
2. shared product-visual primitives;
3. development-only design-lab route;
4. hero;
5. Memory lifecycle;
6. relevant context;
7. QA investigation;
8. Workbench;
9. supporting chapters;
10. navigation, footer, metadata, and conversion routes;
11. production homepage assembly.

Primary surfaces must be confirmed before editing:

```text
src/app/(marketing)/
src/app/prochat-memory/
src/app/qa-memory/
src/app/buildflow/
src/components/Header.tsx
src/app/(marketing)/components/layout/Footer.tsx
src/helpers/chrome-routes.ts
src/assets/styles/
```

Archive or de-emphasize stale pages rather than deleting them unless a separate deletion decision is approved.

## Phase I — Production craft and hardening

Status: planned after Phase H.

Goal:

Raise the assembled site from correct implementation to premium production quality.

Review and refinement:

- `/impeccable shape` confirms the approved production brief;
- `/impeccable craft`, `typeset`, `layout`, and `animate` refine implementation;
- `/design-review` performs live visual QA;
- `/impeccable polish` and `harden` resolve edge cases;
- Playwright visual baselines prevent regressions.

Exit criteria:

- desktop, tablet, mobile, and reduced-motion states are complete;
- no generic AI or template patterns remain;
- all interaction, loading, error, focus, and expanded states are designed;
- production build and visual regression tests pass.

## Phase J — Release validation and launch

Status: planned after Phase I.

Goal:

Validate product truth, comprehension, accessibility, performance, browser behavior, conversion, metadata, and production safety.

Checks:

- only ProChat Memory and ProChat Workbench are treated as current products;
- ProChat Memory for QA is the current edition and first launch niche;
- ProChat Memory is the flagship;
- future interfaces are not product cards;
- legacy names do not drive active navigation;
- public claims match canonical boundaries;
- five-second hero comprehension passes;
- WCAG 2.2 AA checks pass;
- LCP, INP, and CLS meet the defined budgets;
- Playwright functional and visual tests pass;
- design-lab and debug tooling are excluded from public discovery;
- unrelated worktree changes are not staged with homepage work.

## Rule

This roadmap governs website implementation work only. Product roadmap decisions belong in Mind.
