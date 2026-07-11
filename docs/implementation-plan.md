# ProChat website implementation plan

**Status:** repository-local implementation plan  
**Owner:** Steve Westhoek  
**Scope:** aligning the ProChat website repository with Mind

## Source of truth

Mind is canonical for ProChat philosophy, product hierarchy, naming, positioning, business stage, growth policy, legal-policy direction, and cross-product roadmap.

Read before changing website strategy, product pages, roadmap language, legal copy, growth claims, or marketing structure:

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

## Batch C — canonical local design context

Status: complete in the current documentation batch.

Goal:

Translate approved Mind strategy, copy, and design truth into the files required by design and implementation agents.

Files:

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

Acceptance criteria:

- `PRODUCT.md` accurately defines the product family, current audience, conversion, and claim boundaries;
- `DESIGN.md` contains the approved nine-section global design system;
- `brand-spec.md` contains factual tokens and no speculative alternatives;
- all product visuals have named state models;
- the stack, tools, skills, models, prototype gates, and quality gates are documented;
- no production homepage component is changed in this batch.

Validation:

- Markdown and link review;
- design-system security scan;
- repository diff review;
- explicit-path commit only.

## Batch D — foundation specimen

Status: next.

Primary skills:

```text
/design
/design-system
/web-design
/taste-skill
/huashu-design
```

Primary model:

```text
Claude Opus for visual production
GPT-5.6 Sol for canonical reconciliation
```

Tasks:

### D1 — Token implementation prototype

Create a design-lab specimen for:

- Golos Text;
- JetBrains Mono;
- grayscale hierarchy;
- ProChat Cobalt;
- buttons;
- links;
- borders;
- radii;
- shadows;
- status states;
- light surfaces;
- approved dark technical panels.

### D2 — Product primitive prototype

Create realistic static prototypes for:

- EvidenceCard;
- MemoryRecord;
- ScopeBadge;
- SourceConnector;
- ReviewGate;
- ContextWindow;
- RepositoryTree;
- GuardedOperation;
- ValidationResult;
- GitAction.

### D3 — Foundation review

Validate:

- typography hierarchy;
- color contrast;
- product realism;
- desktop and mobile behavior;
- absence of template and AI-slop patterns.

Exit:

- Gate 1 Foundation approved.

## Batch E — static hero directions

Status: after Batch D.

Tasks:

### E1 — Three desktop directions

Create three materially different hero compositions using the same approved tokens and content.

They must differ through composition and storytelling, not through new palettes or fonts.

### E2 — Mobile equivalents

Create a purpose-built mobile first state for every viable direction.

### E3 — Five-second test

Run the comprehension protocol from `docs/homepage-validation-plan.md`.

### E4 — Direction decision

Record:

- selected direction;
- selection rationale;
- rejected directions;
- reusable ideas from rejected directions;
- final static acceptance screenshot.

Exit:

- Gate 2 Hero Direction approved.

## Batch F — hero motion proof

Status: after Batch E.

Planned dependency changes:

```text
gsap
@gsap/react
@playwright/test
@axe-core/playwright
```

Tasks:

### F1 — Install and verify tooling

- verify current package versions and licenses;
- add exact dependencies;
- configure scoped GSAP usage;
- configure Playwright;
- add no public route or production behavior yet.

### F2 — Build hero state model

Implement named states:

```text
scattered-evidence
structured-candidates
review-gate
approved-memory
new-task
focused-context
```

### F3 — Build desktop scroll proof

- native scrolling;
- one scoped timeline;
- deterministic cleanup;
- transform and opacity first;
- debug markers development-only.

### F4 — Mobile and reduced motion

Build separate mobile scenes and a complete reduced-motion composition.

### F5 — Motion and performance review

Use:

```text
/design-motion-principles
Playwright screenshots
browser performance trace
```

Exit:

- Gate 3 Motion approved;
- no scroll jump, cleanup defect, accessibility failure, or unacceptable frame cost.

## Batch G — product-mechanism prototypes

Status: after Batch F.

Build in order:

### G1 — Memory lifecycle

```text
current evidence
→ draft lesson
→ sanitization and scope
→ human review
→ approved memory
→ relevant retrieval
→ correction or retirement
```

### G2 — Relevant context

```text
full workspace
→ task signals
→ selection
→ focused context
→ selection explanation
```

### G3 — QA investigation

```text
failed test
→ evidence
→ investigation
→ root cause
→ reviewed lesson
→ later reuse
```

### G4 — Workbench control plane

```text
request
→ exact local context
→ guarded change
→ targeted validation
→ explicit Git action
```

For every prototype:

- create desktop, mobile, and reduced-motion variants;
- use realistic sanitized content;
- create deterministic screenshot states;
- run product-truth review;
- run motion review where animated.

Exit:

- Gate 4 Product Explanation approved.

## Batch H — full-page prototype and independent review

Status: after Batch G.

Tasks:

### H1 — Low-fidelity full-page assembly

Combine all seven chapters in the design-lab route.

### H2 — Narrative pacing review

Check:

- chapter length;
- visual fatigue;
- text density;
- CTA timing;
- product-family balance;
- mobile pacing;
- reduced-motion pacing.

### H3 — Independent reviews

Run:

```text
/plan-design-review
/design-motion-principles
/taste-skill
```

### H4 — Reconciliation

GPT-5.6 Sol reviews findings against canonical documents, accepts or rejects each finding, and updates the approved design plan.

Exit:

- Gate 5 Full-page Prototype approved;
- production implementation packets finalized.

## Batch I — production foundation

Status: after Batch H.

Primary implementation:

```text
GPT-5.6 Sol + ProChat Workbench
/redesign-skill
/code
```

Tasks:

### I1 — Fonts and tokens

- implement Golos Text and JetBrains Mono;
- implement semantic token CSS;
- map existing marketing surfaces without broad visual migration;
- verify production font loading and CLS.

### I2 — Shared visual primitives

Move approved primitives from prototype to production components with typed props and accessibility states.

### I3 — Animation infrastructure

- isolated client leaves;
- shared reduced-motion utility;
- scoped GSAP registration and cleanup;
- dynamic loading strategy;
- deterministic visual-test hooks.

### I4 — Design-lab lifecycle

Retain the design-lab for development and testing while excluding it from navigation, sitemap, and indexing.

Exit:

- production foundation builds and passes targeted tests.

## Batch J — production homepage chapters

Status: after Batch I.

Implement and commit in bounded chapter packets:

1. Hero and premise
2. Company and Memory definition
3. Memory lifecycle and example record
4. Trust, evidence, local ownership, Markdown, and Git
5. Relevant context
6. Value and measurement
7. Memory for QA and beta
8. Workbench and shared philosophy
9. Boundaries, FAQ, final CTA
10. Navigation, footer, metadata, and conversion destinations

Each packet requires:

- exact source read;
- desktop, mobile, and reduced-motion implementation;
- screenshot evidence;
- targeted functional and visual tests;
- design and product-truth review;
- explicit-path commit.

## Batch K — craft, QA, and release

Status: after Batch J.

Review sequence:

```text
/impeccable shape
/impeccable craft
/impeccable typeset
/impeccable layout
/impeccable animate
/design-review
/impeccable polish
/impeccable harden
```

Final validation:

- Mind remains canonical;
- this repo remains subordinate;
- only current products are represented as products;
- public claims match canonical boundaries;
- five-second hero comprehension passes;
- WCAG 2.2 AA passes;
- Playwright functional and visual tests pass;
- current Chrome, Safari, Firefox, and Edge pass;
- LCP, INP, and CLS meet budgets;
- design-lab and debug tools are excluded from public discovery;
- no unrelated changes are staged or committed.

Required release evidence is defined in `docs/homepage-validation-plan.md`.

## Rule

This implementation plan governs website-repo execution only. Product strategy lives in Mind.
