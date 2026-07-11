# ProChat Homepage Design Orchestration

**Status:** approved pre-build workflow  
**Source skills:** Brain `ai/skills`  
**Scope:** design research, specification, prototyping, implementation, review, and polish

This document defines which Brain design skills and AI models own each stage. It prevents duplicated design authority, conflicting edits, and unstructured multi-model work.

## Operating principle

Use one canonical design truth and multiple specialized reviewers.

```text
Mind canonical strategy and design
        ↓
ProChat PRODUCT.md + DESIGN.md + brand-spec.md
        ↓
implementation-ready specification
        ↓
visual prototypes
        ↓
independent plan review
        ↓
production implementation
        ↓
visual, motion, accessibility, and performance QA
```

No model or skill may silently create a competing palette, font system, product claim, or page structure.

## Design profile

When working through Claude Code, activate the Brain design profile:

```text
docs/skills/profiles/design.txt
```

It exposes:

- `design`
- `design-system`
- `web-design`
- `awesome-design-md`
- `design-review`
- `design-motion-principles`
- `taste-skill`
- `redesign-skill`
- `huashu-design`
- `impeccable`
- `ui-ux-pro-max`
- `dembrandt`
- `graphify`
- `media-acquisition`

Use the profile for design sessions. Do not promote the full design stack into the default always-on profile.

## Model ownership

### GPT-5.6 Sol — primary architect and implementer

Use for:

- canonical synthesis;
- repository analysis;
- technical architecture;
- implementation planning;
- bounded code changes;
- validation strategy;
- accessibility and performance integration;
- Git discipline;
- reconciliation of external critique with canonical documents.

Primary environment:

```text
ProChat Workbench
```

GPT-5.6 Sol owns the final implementation decisions because Workbench supplies exact local context, guarded changes, validation, persistent state, and explicit Git operations.

### Claude Opus — primary visual explorer and independent critic

Use through Claude Code with the Brain design profile for:

- design orchestration;
- static visual directions;
- typography and layout exploration;
- HTML-native prototypes;
- motion storyboards;
- design-plan critique;
- motion critique;
- premium-polish critique;
- independent visual QA.

Claude Opus does not own canonical strategy or final repository truth.

### Role rule

```yaml
ai_roles:
  canonical_authority: "Mind + approved ProChat docs"
  architecture_and_implementation: "GPT-5.6 Sol"
  visual_exploration_and_critique: "Claude Opus"
  final_reconciliation: "GPT-5.6 Sol"
```

Do not let both models edit the same implementation files concurrently.

Use sequential handoffs with explicit changed paths, screenshots, unresolved issues, and validation evidence.

## Skill sequence

## Phase 0 — Persistent design truth

### Primary skill: `/design-system`

Status: complete for the first pass.

Outputs:

- `PRODUCT.md`
- `DESIGN.md`
- `brand-spec.md`

Responsibilities:

- persistent design truth;
- typography;
- color;
- spacing;
- shape;
- product expression;
- accessibility principles;
- cross-product consistency.

Do not use a public-brand `DESIGN.md` as canonical ProChat truth.

### Supporting skill: `/ui-ux-pro-max`

Use only for targeted validation, such as:

- typography legibility research;
- landing-page UX patterns;
- accessibility conventions;
- Next.js-specific UI guidance;
- diagram and information-architecture references.

Its output is supplementary research and may not overwrite approved brand truth.

### Supporting reference: `/awesome-design-md`

Use only for principle extraction.

Recommended references:

- Apple for staged product explanation and visual restraint;
- Linear or Vercel as a contrast reference for technical precision.

Do not copy their palette, font, layout, devices, or full design system.

### Conditional tool: `/dembrandt`

Use only when a specific live URL is approved as a reference and exact computed tokens or component measurements would materially help.

Do not run it merely because Apple-like quality was requested.

## Phase 1 — Implementation-ready design specification

### Primary skill: `/web-design`

Inputs:

- `PRODUCT.md`
- `DESIGN.md`
- `brand-spec.md`
- canonical homepage copy
- `docs/homepage-visual-storyboard.md`
- `docs/homepage-technical-design.md`

Outputs:

- layout map;
- chapter composition;
- component plan;
- responsive behavior;
- motion intent;
- accessibility rules;
- stack-specific implementation notes.

The output should refine these documents, not create a second design system.

### Always-on guardrail: `/taste-skill`

Apply throughout specification and prototyping.

Project-specific tuning:

```yaml
taste_profile:
  design_variance: 7
  motion_intensity: 7
  visual_density:
    company_homepage: 3
    memory_visuals: 5
    workbench_visuals: 6
```

Use its anti-slop, composition, typography, responsive, and performance rules.

Override any generic font suggestion with the canonical Golos Text and JetBrains Mono decision.

## Phase 2 — Visual prototype production

### Primary skill: `/huashu-design`

Use for tangible artifacts before production code:

- typography and token specimen;
- hero composition variants;
- Memory lifecycle prototype;
- context-selection prototype;
- QA-investigation prototype;
- Workbench control-plane prototype;
- desktop/mobile comparisons;
- reduced-motion variants;
- animation storyboards.

Artifacts should be HTML-native and browser-verifiable.

Prototype output is not production implementation.

### Prototype sequence

```text
1. token and typography specimen
2. three static hero compositions
3. selected static hero
4. animated hero proof of concept
5. Memory lifecycle proof of concept
6. context-selection proof of concept
7. QA-investigation proof of concept
8. Workbench proof of concept
9. mobile and reduced-motion variants
10. full-page low-fidelity assembly
```

The user approves major visual direction after steps 2, 4, and 10.

## Phase 3 — Pre-build review gates

### Primary skill: `/plan-design-review`

Run after the full prototype plan exists and before production implementation.

Review dimensions:

- product comprehension;
- visual distinctiveness;
- hierarchy;
- consistency;
- responsiveness;
- accessibility;
- motion purpose;
- feasibility;
- performance risk;
- conversion clarity.

The review must score each dimension, describe what would make it a 10, and update the plan before code begins.

### Motion specialist: `/design-motion-principles`

Run on each approved cinematic prototype.

Recommended perspective weighting:

```yaml
motion_review:
  primary: "Emil Kowalski — restraint, speed, purposeful productivity motion"
  secondary: "Jakub Krehel — subtle production polish"
  experimental: "Jhey Tompkins — use only for isolated creative exploration"
```

Audit:

- timing;
- easing;
- state continuity;
- motion gaps;
- unnecessary movement;
- reversibility;
- reduced motion;
- mobile behavior;
- main-thread risk.

## Phase 4 — Existing-code integration

### Primary skill: `/redesign-skill`

Use because the ProChat website is an existing codebase.

Responsibilities:

- inspect current components and styles;
- preserve working behavior;
- replace the visual foundation surgically;
- build one approved section before rolling out;
- keep changes focused and reviewable;
- verify browser behavior after each major change.

Implementation order:

```text
1. global tokens and fonts
2. shared product-visual primitives
3. design-lab route
4. hero section
5. Memory lifecycle
6. context selection
7. QA investigation
8. Workbench section
9. supporting chapters
10. production page assembly
```

### Engineering orchestrator: `/code`

Use for:

- component architecture;
- dependency installation;
- TypeScript types;
- tests;
- performance work;
- accessibility integration;
- targeted validation;
- safe refactoring.

Design skills define visual intent. `/code` owns engineering execution quality.

## Phase 5 — Production craft

### Primary skill: `/impeccable`

Required preconditions:

- valid `PRODUCT.md`;
- valid `DESIGN.md`;
- user-approved shape brief;
- resolved image/visual gate;
- matching command reference loaded.

Recommended command sequence:

```text
/impeccable shape homepage
/impeccable craft homepage
/impeccable typeset homepage
/impeccable layout homepage
/impeccable animate homepage
/impeccable polish homepage
/impeccable harden homepage
```

Do not use Impeccable before prototype direction is approved. It is a production craft and refinement layer, not the source of product truth.

## Phase 6 — Live visual QA

### Primary skill: `/design-review`

Use against the running site after production assembly.

Review and fix:

- visual inconsistency;
- spacing;
- hierarchy;
- generic AI patterns;
- responsive defects;
- interaction states;
- motion timing;
- accessibility;
- slow interactions.

Use before/after screenshots and atomic fixes.

### Final tactical layer: `/impeccable audit`, `polish`, and `harden`

Run after design review to catch:

- edge cases;
- weak states;
- awkward line wraps;
- density problems;
- over-animation;
- under-animation;
- incomplete mobile behavior;
- production robustness issues.

## Skill exclusions and boundaries

### Do not use `/design-consultation` as primary authority

The global design foundation is already approved. Running another full design consultation risks creating a competing system.

It may be used only as an independent critique or preview generator with explicit instructions not to change canonical tokens.

### Do not use `/awesome-design-md` after implementation begins

Once `DESIGN.md` and `brand-spec.md` are approved, live code and project truth are more relevant than external-brand inspiration.

### Do not use `/huashu-design` to modify production code

It owns prototypes and visual artifacts, not existing-code integration.

### Do not use `/redesign-skill` to redefine product truth

It improves implementation within approved product and design documents.

### Do not use `/impeccable` without its preflight gates

Its shape brief and context loader are mandatory before mutation.

## Handoff contract

Every model handoff must include:

```yaml
handoff:
  canonical_docs_read: []
  task_completed: ""
  changed_paths: []
  prototype_urls: []
  screenshots: []
  validation_run: []
  unresolved_questions: []
  prohibited_changes: []
  exact_next_task: ""
```

Screenshots should include desktop, mobile, and reduced-motion states when motion is involved.

## Recommended session pattern

```text
Claude Opus + /design
→ visual exploration or independent critique

GPT-5.6 Sol + Workbench
→ reconcile against canonical truth
→ update plan
→ implement bounded packet
→ validate and commit

Claude Opus + /design-review or /design-motion-principles
→ independent audit

GPT-5.6 Sol + Workbench
→ accept or reject findings
→ implement verified fixes
```

This sequence produces productive disagreement without split authority.

## Definition of orchestration readiness

The design phase is ready to begin when:

- canonical files are committed;
- the Brain design profile is available;
- prototype tasks are listed in the implementation plan;
- each phase has one primary skill owner;
- model handoff rules are accepted;
- no unresolved foundational palette or typography decision remains;
- the first prototype task is limited to tokens and static hero directions.
