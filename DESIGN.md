# ProChat Global Design System

**Status:** canonical repository-local design truth  
**Canonical authority:** Mind  
**Applies to:** ProChat, ProChat Memory, ProChat Memory for QA, ProChat Workbench, documentation, and shared product interfaces

Existing themes, page-specific styles, gradients, fonts, and design experiments in this repository are historical implementation material. They are not design authority.

## Public homepage template override — 2026-07-18

The owner-approved public homepage direction is defined in:

```text
docs/product/HOMEPAGE_NEXUS_TEMPLATE_ADOPTION.md
```

For the company landing page, that document takes precedence over conflicting public-homepage guidance in this file. The homepage must use the supplied Nexus-derived dark template system, Golos Text, its page structure, card/grid language, diagrams, arrows, and motion character.

This is a scoped public-homepage override. It does not automatically restyle authenticated product interfaces or documentation surfaces.

The prior generated-video and frame-scrub homepage direction is frozen optional research.

> ProChat should feel like a calm, trustworthy working system for structured knowledge—not like an AI spectacle.

Operational rule:

> Structure first. Evidence visible. Actions explicit. Decoration restrained.

The website should feel premium through precision, composition, typography, explanatory product visuals, motion choreography, accessibility, and implementation quality.

---

## 1. Visual Theme and Atmosphere

### Core character

The system must consistently express:

- reliable;
- trustworthy;
- stable;
- clean;
- minimal;
- logical;
- structural;
- simple;
- premium;
- technically credible.

### Visual strategy

Use one global theme across the company and both products.

Product differentiation comes from information density, product-specific visual objects, component behavior, and motion—not unrelated color themes.

**ProChat company**  
Spacious, conceptual, calm, and precise.

**ProChat Memory**  
Evidence, records, sources, scope, review gates, approved memory, retrieval, correction, and retirement.

**ProChat Memory for QA**  
The Memory language applied to failed tests, logs, selectors, screenshots, environments, test data, root-cause investigation, and approved QA lessons.

**ProChat Workbench**  
Denser operational surfaces: repository trees, exact context, guarded operations, validation, run state, diffs, confirmation, and Git actions.

### Premium direction

Every major homepage chapter must visualize its proposition.

Do not build a page made primarily from headings, body copy, equal feature cards, and decorative screenshots.

Use:

- large confident typography;
- controlled asymmetry;
- strong grid alignment;
- stable pinned compositions;
- realistic product records;
- semantic diagrams;
- progressive visual explanation;
- clear initial and final states;
- refined micro-detail.

Avoid:

- generic AI imagery;
- robots, brains, magic wands, or sparkles;
- neon gradients;
- purple AI glow;
- glass-heavy layouts;
- arbitrary 3D objects;
- continuous decorative motion;
- template-like three-card feature rows.

---

## 2. Color

### Strategy

Use grayscale as the visual foundation and one global cobalt accent.

**Global accent:** `#3158C7`

The accent communicates interaction, selected relationships, and focused emphasis. It does not belong to one product.

Semantic status colors are permitted only when the represented state requires them.

### Light tokens

```css
--color-canvas: #f7f8fa;
--color-surface: #ffffff;
--color-surface-subtle: #f1f3f6;
--color-surface-strong: #e8ebf0;
--color-border-subtle: #e2e6ec;
--color-border: #d4dae3;
--color-border-strong: #b8c1cd;
--color-text-primary: #111827;
--color-text-secondary: #465363;
--color-text-muted: #697586;
--color-text-inverse: #ffffff;
--color-accent: #3158c7;
--color-accent-hover: #274ab0;
--color-accent-pressed: #1e3d95;
--color-accent-soft: #eaf0ff;
--color-accent-line: #bfcdf5;
```

### Dark tokens

Dark mode is optional for the public website and appropriate for Workbench, code, technical demonstrations, and explicit user preference.

```css
--color-canvas-dark: #0d1118;
--color-surface-dark: #141a24;
--color-surface-subtle-dark: #1a2230;
--color-surface-strong-dark: #222c3c;
--color-border-subtle-dark: #293446;
--color-border-dark: #354156;
--color-border-strong-dark: #4a5870;
--color-text-primary-dark: #f5f7fa;
--color-text-secondary-dark: #b6c0cd;
--color-text-muted-dark: #8995a6;
--color-accent-dark: #7d9af2;
--color-accent-soft-dark: #1c2b52;
```

### Semantic tokens

```css
--color-success: #176b4a;
--color-success-soft: #e9f6f0;
--color-warning: #8a5200;
--color-warning-soft: #fff3dd;
--color-error: #a82a22;
--color-error-soft: #fdedec;
--color-information: #3158c7;
--color-information-soft: #eaf0ff;
```

Never communicate state through color alone. Add a label, icon, shape, pattern, or explicit text state.

### Color rules

- Cobalt should occupy less than approximately 10% of most compositions.
- Large text areas remain neutral.
- Do not introduce product-specific accent palettes.
- Do not use green as Memory branding; reserve it for semantic success.
- Do not use low-contrast gray for ordinary body copy.
- Shadows must remain neutral and subtle, never colored glows.

---

## 3. Typography

### Primary font

**Golos Text** is the global primary typeface.

Use it for:

- display headings;
- body text;
- navigation;
- buttons;
- labels;
- forms;
- documentation;
- product UI.

Golos Text should account for at least 90% of visible text.

### Technical font

**JetBrains Mono** is the technical typeface.

Use it for:

- code;
- commands;
- paths;
- memory IDs;
- timestamps;
- source references;
- status metadata;
- numerical inputs and outputs;
- diffs;
- compact annotations.

Do not use JetBrains Mono for general body copy or the entire navigation system.

### Secondary font

No secondary display or serif font is canonical.

Use Golos Text weight, width, size, case, italics, and composition for editorial contrast. Add another font only after prototypes demonstrate a clear unresolved need.

### Scale

```css
--font-display-xl: clamp(4.5rem, 7vw, 7.5rem);
--font-display-lg: clamp(3.5rem, 5.5vw, 6rem);
--font-heading-1: clamp(2.75rem, 4vw, 4.75rem);
--font-heading-2: clamp(2.1rem, 3vw, 3.5rem);
--font-heading-3: clamp(1.5rem, 2vw, 2.25rem);
--font-body-lg: clamp(1.125rem, 1.4vw, 1.375rem);
--font-body-md: 1.0625rem;
--font-body-sm: 0.9375rem;
--font-label: 0.8125rem;
```

### Type rules

- Display line height: `0.96–1.05`.
- Heading line height: `1.02–1.18`.
- Body line height: `1.55–1.65`.
- Large headings use negative tracking from `-0.025em` to `-0.045em`.
- Standard paragraph width: approximately `66ch`.
- Hero support copy: approximately `50ch`.
- Use `text-wrap: balance` for headings and `text-wrap: pretty` for body copy.
- Avoid centered long-form body copy.
- Use tabular figures for calculators, timestamps, and measured values.

---

## 4. Spacing and Grid

Use a 4px base grid with an 8px dominant rhythm.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
--space-40: 160px;
```

### Grid

- Maximum page width: `1440px`.
- Maximum content width: `1280px`.
- Maximum reading width: `800px`.
- Desktop: 12 columns, 32px gutters.
- Tablet: 8 columns, 24px gutters.
- Mobile: 4 columns, 20px gutters.
- Major desktop section padding: `clamp(7rem, 11vw, 11rem)`.
- Major mobile section padding: `5rem`.

### Spacing rules

- Use large whitespace to isolate ideas, not to conceal weak hierarchy.
- Related controls and metadata remain compact.
- Avoid uniform vertical spacing across every section.
- Cinematic chapters may use viewport-scale pacing.
- Product visuals should retain enough internal density to feel real.

---

## 5. Layout and Composition

### Homepage rhythm

The homepage is organized into seven visual chapters:

1. Premise
2. Memory model
3. Trust and architecture
4. Value
5. Current QA product
6. Workbench
7. Boundaries and action

At most four chapters use major pinned scroll sequences:

- Hero
- Memory lifecycle
- Relevant context
- QA investigation

Other sections use sticky diagrams, product records, SVG relationships, controlled reveals, or static high-fidelity compositions.

### Composition rules

- Prefer left-aligned or asymmetric hero structures.
- Use one dominant visual concept per section.
- Maintain continuity when the same product object moves through different states.
- Use full-width visuals when they clarify complex relationships.
- Cards are permitted only when the information is truly a separate object.
- Avoid nested cards.
- Avoid repetitive equal three-column feature rows.
- Use borders, alignment, and grouping before elevation.
- Desktop and mobile compositions must be designed separately.

### Product visual hierarchy

A product visualization should expose real structure:

- state;
- scope;
- source;
- evidence;
- review status;
- last review;
- available actions;
- relationship to the current task.

Do not use abstract rectangles or lorem ipsum as final product visuals.

---

## 6. Components and Visual Language

Use reusable semantic visual primitives.

### Memory primitives

- `EvidenceCard`: raw, selected, attached, superseded
- `MemoryRecord`: draft, review, approved, rejected, retired
- `ScopeBadge`: personal, project, client, team, organization, cross-project
- `SourceConnector`: inactive, active, conflicting, current
- `ContextWindow`: empty, assembling, focused, overloaded
- `ReviewGate`: approve, edit, reject, retain draft

### Workbench primitives

- `RepositoryTree`: idle, context selected, changed, validated
- `GuardedOperation`: requested, scoped, confirmed, executed, blocked
- `ValidationResult`: pending, passed, failed, repaired
- `GitAction`: unstaged, explicitly staged, committed
- `RunTimeline`: planning, context, change, validation, checkpoint

### Shapes

```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-pill: 999px;
```

Buttons and inputs use `6px–10px`. Product canvases may use `16px`. Pills are limited to statuses, tags, and compact filters.

### Borders and depth

Use borders more often than shadows.

```css
--shadow-sm: 0 1px 2px rgb(17 24 39 / 0.05);
--shadow-md: 0 12px 32px rgb(17 24 39 / 0.08);
--shadow-lg: 0 24px 80px rgb(17 24 39 / 0.12);
```

Use the large shadow only for a major floating product demonstration.

### Iconography

Use outlined, geometrically consistent icons with familiar meaning.

Preferred sources may include Lucide or carefully designed custom SVG, but one system must be used consistently per surface.

Avoid cartoon icons and decorative AI symbols.

---

## 7. Motion and Interaction

### Motion stack

- **Cinematic scroll:** GSAP + ScrollTrigger + `@gsap/react`
- **Simple interaction:** CSS transitions and keyframes
- **Product visuals:** semantic HTML, CSS, and SVG
- **Scrolling:** native browser scrolling
- **Reduced motion:** mandatory alternative composition

Do not add a smooth-scroll engine by default.

Do not use Three.js, WebGL, Rive, Lottie, or image sequences as foundational dependencies.

Framer Motion may remain for existing components, but a single component must not mix Framer Motion and GSAP orchestration.

### Motion rules

- Motion must explain state, cause, hierarchy, or relationship.
- Animate `transform` and `opacity` whenever possible.
- Do not animate layout properties during scroll.
- Use stable pinned compositions with clear start and end points.
- Scrolling backward must restore states predictably.
- Text may reveal or emphasize but must remain stable while being read.
- Avoid bounce, elastic, overshoot, typewriter, scrambling, or decorative looping.
- Do not trap or hijack scrolling.

### Timing

```css
--duration-instant: 120ms;
--duration-fast: 180ms;
--duration-standard: 280ms;
--duration-deliberate: 450ms;
--duration-chapter: 700ms;
--ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
--ease-chapter: cubic-bezier(0.65, 0, 0.35, 1);
```

### Reduced motion

When `prefers-reduced-motion: reduce`:

- remove pinning;
- remove scrubbed object travel;
- disable parallax and autoplay loops;
- show static or stepwise product states;
- preserve all copy and conclusions;
- maintain normal document flow.

Reduced motion is an alternative design, not a broken fallback.

---

## 8. Voice and Brand

### Copy character

- direct;
- calm;
- precise;
- evidence-aware;
- honest about boundaries;
- technically credible;
- understandable without specialist jargon.

### Visual emphasis

Use typography, spacing, and nearby product-state changes to emphasize important text.

Accent one key phrase, not entire paragraphs.

Do not animate every word.

### Product language

Prefer:

- reusable project knowledge;
- durable memory;
- current evidence;
- reviewed memory;
- local memory workspace;
- relevant context;
- inspectable records;
- correction and retirement;
- guarded operations;
- targeted validation.

Avoid unsupported or misleading language such as:

- infinite memory;
- never forgets;
- zero hallucinations;
- private by default without qualification;
- fully autonomous;
- guaranteed savings;
- universal integration.

---

## 9. Accessibility, Performance, and Production Rules

### Accessibility

WCAG 2.2 AA is the minimum standard.

Requirements:

- normal text contrast at least 4.5:1;
- large text contrast at least 3:1;
- meaningful UI and graphical objects at least 3:1;
- complete keyboard navigation;
- visible focus states;
- logical semantic DOM order;
- support for 200% zoom;
- state meaning available without color;
- complete reduced-motion experience;
- essential content never locked inside canvas or inaccessible SVG text.

### Performance budgets

```yaml
largest_contentful_paint_seconds: 2.5
interaction_to_next_paint_ms: 200
cumulative_layout_shift: 0.1
pinned_cinematic_sections_max: 4
total_scroll_triggers_target_max: 24
hero_media_initial_kb_target: 250
total_above_fold_transfer_kb_target: 700
```

### Production rules

- Reserve dimensions before visual assets load.
- The first hero state must look complete before animation code loads.
- Lazy-load below-the-fold cinematic modules.
- Use scoped animation contexts and deterministic cleanup.
- Test current Chrome, Safari, Firefox, and Edge.
- Test touch, keyboard, mouse, trackpad, reduced motion, and throttled mobile.
- Validate screenshot baselines at 360, 390, 768, 1024, 1280, 1440, and 1728 widths.
- Do not merge a cinematic section without desktop, mobile, and reduced-motion variants.
- Do not introduce claims through visuals that are absent from canonical product truth.

## Canonical references

```text
mind/wiki/organisations/prochat/brand/global-design-foundation.md
mind/wiki/organisations/prochat/brand/website-visual-motion-system.md
mind/wiki/organisations/prochat/brand/website-build-contract.md
PRODUCT.md
brand-spec.md
docs/homepage-design-spec.md
docs/homepage-technical-design.md
docs/homepage-validation-plan.md
```




## Conversion-purpose rule

Public-page design must follow:

```text
docs/product/PUBLIC_CONVERSION_STRATEGY.md
```

Visual fidelity to the Nexus template is necessary but not sufficient. Every page and section must have one explicit visitor question, one primary conversion responsibility, and a measurable intended outcome.

The design must support the lifecycle:

```text
Discover → Understand → Trust → Star → Install → Use → Learn → Feedback → Contribute → Advocate
```

Managed implementation remains a secondary organizational path. Open-source, free, repository, licensing, download, and service claims must not be published until the controlling Mind authority and repository facts are reconciled and verified.
