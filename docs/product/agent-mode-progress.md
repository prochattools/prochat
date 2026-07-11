# ProChat Homepage Design Preparation Handoff

**Run:** `agent-47cee477-6778-4241-b587-ca478901d8f5`  
**Status:** documentation preparation, validation, and commit complete  
**Commit:** `c375f1a` — `docs(prochat): prepare canonical homepage design workflow`  
**Source:** `prochat`

## Goal

Prepare all product, design, technical, orchestration, example-data, roadmap, implementation, and validation documentation required before building the premium ProChat homepage.

Do not build the production homepage in this run.

## Completed

### Canonical context

- Created `PRODUCT.md`.
- Replaced the obsolete Memory-only `DESIGN.md` with the approved global nine-section system.
- Created `brand-spec.md` with factual typography, color, spacing, radius, shadow, motion, layout, and product-expression tokens.

### Design specification

- Created `docs/homepage-design-spec.md`.
- Created `docs/homepage-visual-storyboard.md`.
- Created `docs/homepage-example-data.md`.

### Technical architecture

- Created `docs/homepage-technical-design.md`.
- Defined the Next.js 14, React 18, TypeScript, Tailwind 3, SCSS, GSAP, native-scroll, DOM/SVG, Playwright, and accessibility architecture.
- Deferred dependency installation until the hero-motion proof batch.

### Skill and AI orchestration

- Created `docs/homepage-design-orchestration.md`.
- Defined GPT-5.6 Sol as primary architect and implementer.
- Defined Claude Opus with the Brain design profile as primary visual explorer and independent critic.
- Defined the skill order from `/design-system` through prototypes, plan review, motion review, existing-code integration, Impeccable craft, and live design review.

### Quality system

- Created `docs/homepage-validation-plan.md`.
- Defined product-truth, comprehension, visual, responsive, motion, accessibility, performance, browser, conversion, metadata, and production-safety gates.

### Repository planning

- Expanded `docs/roadmap.md` through Phase J.
- Expanded `docs/implementation-plan.md` through Batch K.
- Replaced `docs/design-system.md` with an implementation bridge to the approved design truth.

## Approved foundational decisions

```yaml
fonts:
  primary: "Golos Text"
  technical: "JetBrains Mono"
  secondary: null
color:
  strategy: "grayscale plus one global accent"
  accent: "#3158C7"
motion:
  cinematic: "GSAP ScrollTrigger"
  micro_interactions: "CSS"
  scroll: "native browser scrolling"
visuals: "semantic HTML + CSS + SVG"
major_pinned_sequences:
  - hero
  - memory lifecycle
  - relevant context
  - QA investigation
```

## Current repository facts

```yaml
next: "14.2"
react: "18.3"
typescript: "5"
tailwind: "3.4"
scss: true
framer_motion: "12.23"
gsap_installed: false
playwright_installed: false
axe_playwright_installed: false
```

Framer Motion remains for existing surfaces. It must not orchestrate the same component as GSAP.

## Existing unrelated constraints

- The website contains multiple legacy themes and page-specific systems.
- Existing styles are implementation inventory, not design authority.
- Do not delete or broadly migrate legacy surfaces during prototype batches.
- Do not upgrade Next.js, React, Tailwind, or the whole component system as part of the homepage work.

## Validation still required in this run

1. Review the exact diff for all documentation paths.
2. Run a security scan on the changed documentation.
3. Check headings and canonical references.
4. Confirm no production source or package file changed.
5. Commit only the intended documentation paths.
6. Close the run with the commit hash and exact next task.

## Remaining roadmap

### Next: Batch D — foundation specimen

Use:

```text
Claude Opus + Brain design profile
/design
/web-design
/taste-skill
/huashu-design
```

Build:

1. typography and token specimen;
2. Memory visual primitives;
3. Workbench visual primitives;
4. desktop and mobile foundation states.

Do not install GSAP yet.

### Then: Batch E — static hero directions

Create three materially different static hero compositions using the same approved fonts, palette, copy, and product states.

Run the five-second comprehension test and select one.

### Then: Batch F — hero-motion proof

Only after static hero approval:

- add GSAP and `@gsap/react`;
- add Playwright and axe tooling;
- build the named hero states;
- build mobile and reduced-motion variants;
- run motion and performance review.

## Validation expectations for the next task

- visible browser artifact;
- no production homepage mutation;
- canonical tokens only;
- realistic example data from `docs/homepage-example-data.md`;
- desktop and mobile screenshots;
- contrast and typography review;
- no new palette, font, or product claim;
- no commit unless the specimen and changed paths are explicitly reviewed.

## Exact next task

```text
Execute Batch D1 and D2 only: create a repository-local design-lab foundation specimen using the approved Golos Text, JetBrains Mono, grayscale, ProChat Cobalt, spacing, borders, radii, shadows, semantic states, and the approved Memory and Workbench visual primitives. Do not install GSAP, modify the production homepage, or introduce new design decisions. Use the Brain design orchestrator, web-design, taste-skill, and huashu-design workflow. Verify desktop and mobile in browser and return screenshots, findings, changed paths, and the exact next prototype task.
```
