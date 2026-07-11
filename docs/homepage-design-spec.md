# ProChat Homepage Design Specification

**Status:** approved pre-build design brief  
**Canonical copy:** Mind `canonical-homepage-copy.md`  
**Design system:** `DESIGN.md` and `brand-spec.md`  
**Visual specification:** `docs/homepage-visual-storyboard.md`  
**Technical architecture:** `docs/homepage-technical-design.md`  
**Skill workflow:** `docs/homepage-design-orchestration.md`

This is the central repository-local brief for the ProChat homepage. It explains what must be designed, why it matters, and which decisions are already closed.

## Objective

Create a premium, high-trust homepage that explains ProChat as a memory-first software company, establishes ProChat Memory as the flagship, makes the product mechanics visually understandable, presents Memory for QA as the current edition, and introduces Workbench as the second product.

The page must communicate through coordinated copy, product visualization, and scroll-driven transformation rather than text blocks with decorative images.

## Primary visitor understanding

After the hero, a new visitor should understand:

1. ProChat keeps useful project knowledge reusable.
2. ProChat Memory is the flagship product.
3. Memory is local, readable, and reviewed by people before it becomes trusted.
4. Relevant memory can help a later task without loading the entire archive.
5. The currently available edition is for QA.

After the complete page, a visitor should also understand:

6. Current evidence can override stored memory.
7. Memory can be corrected or retired.
8. ProChat does not currently host the customer memory workspace.
9. Workbench connects ChatGPT reasoning to guarded local project operations.
10. ProChat makes explicit product and claim boundaries.

## Primary audience

Current conversion audience:

- individual QA testers;
- QA engineers dealing with recurring failures;
- testers using AI during investigation or documentation;
- technically capable early adopters willing to test a local beta.

Broader visitors may include developers, technical founders, builders, product teams, researchers, and consultants, but the homepage must not imply that all broad Memory editions are currently available.

## Primary conversion

```text
Explore ProChat Memory for QA
```

Secondary conversions:

```text
Join the selected QA beta
See how Memory works
Explore ProChat Workbench
```

Do not use a vague primary CTA such as “Get started.”

## Design thesis

> A calm, trustworthy working system for structured knowledge.

The premium quality comes from:

- precise typography;
- disciplined grayscale and cobalt;
- clear product-state visualization;
- large-scale composition;
- carefully staged scroll sequences;
- visual continuity;
- strong mobile design;
- complete reduced-motion design;
- realistic details;
- excellent performance and accessibility.

It does not come from excessive effects, luxury clichés, or generic AI imagery.

## Closed decisions

```yaml
decisions:
  global_theme: "one theme across company and products"
  primary_font: "Golos Text"
  technical_font: "JetBrains Mono"
  secondary_font: null
  palette: "grayscale plus one global cobalt accent"
  accent: "#3158C7"
  website_default_mode: "light"
  product_specific_palettes: false
  cinematic_motion: "GSAP ScrollTrigger"
  micro_interactions: "CSS"
  product_visuals: "semantic HTML + CSS + SVG"
  scrolling: "native browser scrolling"
  smooth_scroll_engine: null
  foundational_3d: false
  storybook_initially: false
  prototype_environment: "repository-local design-lab route"
  major_pinned_sequences_max: 4
```

These decisions must not be reopened during implementation without an explicit canonical design revision.

## Deferred decisions

The following are intentionally deferred until prototypes prove a need:

- a secondary font;
- full-site dark mode;
- WebGL or Three.js;
- Rive or Lottie;
- Storybook;
- smooth scrolling;
- generated atmospheric imagery;
- route-level View Transitions;
- replacement or removal of existing Framer Motion usage.

Deferred does not mean planned. The default is not to add them.

## Page chapters

### Chapter 1 — Premise

Sections:

- Hero
- Core philosophy
- Repeated-work problem
- Before and after

Dominant visual idea:

```text
scattered evidence
→ reviewed memory
→ focused task context
```

### Chapter 2 — Memory model

Sections:

- Company and product architecture
- Memory product definition
- Memory workflow
- Example record

Dominant visual idea:

```text
one record moving through the complete trust lifecycle
```

### Chapter 3 — Trust and architecture

Sections:

- Trust model
- Evidence hierarchy
- Local ownership
- Markdown-first memory
- Git-compatible history
- Relevant context

Dominant visual idea:

```text
reviewed knowledge remains readable, scoped, local, and selectively reusable
```

### Chapter 4 — Value

Sections:

- Reusable record types
- Transparent context-cost model

Dominant visual idea:

```text
consistent record anatomy and visible measurement assumptions
```

### Chapter 5 — Current product

Sections:

- Memory for QA
- Selected beta

Dominant visual idea:

```text
one failed test becomes a reviewed lesson used in a later investigation
```

### Chapter 6 — Workbench

Sections:

- Workbench
- Two products, one philosophy

Dominant visual idea:

```text
ChatGPT reasoning
→ Workbench control plane
→ guarded local project action
```

### Chapter 7 — Boundaries and action

Sections:

- What ProChat does not claim
- FAQ
- Final CTA

Dominant visual idea:

```text
clear capability boundaries and one resolved repeated problem
```

## Cinematic sequence allocation

Only these sequences may receive major pinned scroll treatment:

1. Hero
2. Memory lifecycle
3. Relevant context
4. QA investigation

All other sections use lighter motion or remain static.

This limit protects pacing, performance, comprehension, and accessibility.

## Text treatment

- Headings remain large, direct, and left-aligned or asymmetrically placed.
- Body copy remains constrained to readable line lengths.
- One phrase may receive cobalt emphasis when the visual state makes its meaning true.
- Long body copy is never centered.
- Text is not used as a texture or continuously animated object.
- Technical metadata uses JetBrains Mono.
- Product state labels remain explicit.

## Product visualization requirements

Every major product visual must expose real structure.

Memory visuals should include some combination of:

- record type;
- state;
- scope;
- evidence;
- source reference;
- last review;
- available actions;
- relation to the current task.

Workbench visuals should include some combination of:

- requested action;
- exact source context;
- paths;
- guarded operation;
- confirmation state;
- validation result;
- Git state;
- unrelated files remaining untouched.

Do not use lorem ipsum in approved prototypes.

## Responsive strategy

### Desktop

- cinematic pinning permitted;
- large typography;
- layered product canvases;
- carefully controlled overlap;
- generous chapter pacing.

### Tablet

- shorter pinning;
- simplified layering;
- readable product detail;
- clear grid relationships.

### Mobile

- no long pinned sequences;
- one meaningful visual state per scene;
- normal document scrolling;
- purpose-built product compositions;
- no scaled-down unreadable desktop canvases.

### Reduced motion

- no pinning;
- no scrubbed object travel;
- no parallax;
- static or stepwise state panels;
- complete content and conclusions preserved.

## Anti-template requirements

The design fails if it becomes:

- a centered headline above a generic dashboard screenshot;
- repeated equal feature cards;
- a sequence of alternating text and screenshots without a visual argument;
- a generic purple or blue AI gradient site;
- a collection of floating translucent cards;
- an animation reel that does not explain product behavior;
- a dark developer site that obscures the broader company story;
- a static document with occasional fade-ins.

## Prototype approval gates

### Gate 1 — Foundation specimen

Approve:

- Golos Text hierarchy;
- JetBrains Mono metadata treatment;
- grayscale relationships;
- cobalt usage;
- borders, radii, and depth;
- light canvas and dark technical panel relationship.

### Gate 2 — Hero direction

Review three static hero compositions and select one.

Approve:

- five-second comprehension;
- focal point;
- text line breaks;
- evidence-object composition;
- CTA hierarchy;
- static mobile equivalent.

### Gate 3 — Motion proof

Approve one hero scroll prototype.

Check:

- natural native scrolling;
- state continuity;
- reversibility;
- readable text;
- no layout jump;
- reduced-motion form;
- mobile scene form;
- acceptable bundle and frame performance.

### Gate 4 — Product explanation

Approve Memory lifecycle, relevant context, QA investigation, and Workbench prototypes.

### Gate 5 — Full-page prototype

Approve:

- narrative pacing;
- chapter transitions;
- visual consistency;
- information density;
- conversion flow;
- mobile structure;
- reduced-motion structure.

Only after Gate 5 may production page assembly begin.

## Open-question register

All foundational questions are resolved.

Questions that must be answered during prototype review rather than beforehand:

1. Which of three hero compositions creates the strongest five-second comprehension?
2. How long should each pinned chapter remain active after real browser testing?
3. Which details can be removed from mobile visuals without weakening the product explanation?
4. Does the Workbench section need a dark technical panel or can the global light surface carry sufficient contrast?
5. Which realistic QA example produces the clearest complete investigation story?

These are prototype-selection questions, not missing brand decisions.

## Definition of design readiness

The project is ready for production implementation when:

- all canonical and local design documents are committed;
- Gate 1 through Gate 5 are approved;
- the design plan passes independent review;
- the motion prototypes pass specialist review;
- desktop, mobile, and reduced-motion storyboards are complete;
- realistic sanitized example data is approved;
- visual baselines exist;
- implementation packets are ready;
- no foundational design question remains open.
