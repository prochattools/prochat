# ProChat Homepage — Nexus Template Adoption

**Status:** ACTIVE IMPLEMENTATION DIRECTION  
**Decision date:** 2026-07-18  
**Owner decision:** adopt the supplied Nexus automation landing-page template as the visual and structural implementation source  
**Strategic authority:** Mind repository  
**Design and execution authority:** ProChat repository  
**Supersedes:** active homepage memory-film and scroll-scrub video direction

## Decision

The ProChat public homepage will reproduce the supplied Nexus template's visual system, section rhythm, layout structure, card language, diagrams, icon treatment, arrows, navigation behavior, and motion character.

Do not redesign the template from first principles.

Do not continue the generated-video or frame-by-frame scroll implementation as the active homepage plan.

Adapt only what is required to express ProChat's approved product hierarchy, claims, memory concepts, accessibility requirements, and Golos Text typography.

## Source package

The design reference package supplied by the owner includes:

- a full-page PNG/JPEG capture of the Nexus automation template;
- a six-page PDF capture of the complete desktop page;
- an extracted `DESIGN.md`;
- an extracted `SKILL.md`;
- the original reference URL: `https://nexus-automation-react.aura.build/`.

The screenshot and PDF are the primary visual references. The extracted design files provide initial token evidence but explicitly state that radius, shadow, motion, and broader typography values were not reliably extracted. Those missing values must be measured or reconstructed from the visual reference rather than invented as a new style.

## Hard implementation rules

1. The template is the active visual source of truth for the homepage.
2. The page must remain recognizably the same design family as the supplied template.
3. Golos Text replaces Inter as the main family.
4. JetBrains Mono may remain for technical metadata, labels, paths, IDs, and source/provenance details.
5. The dark theme, grayscale hierarchy, thin borders, rounded cards, subtle grid, low-contrast diagrams, pill controls, and restrained glow must be preserved.
6. The template's motion behavior must be recreated where it is meaningful and accessible.
7. Template elements must be semantically adapted to memory rather than retained as irrelevant automation content.
8. The existing ProChat product strategy and claim boundaries remain authoritative.
9. The page must meet WCAG 2.2 AA and provide reduced-motion alternatives.
10. The homepage must not include generated video or a frame-sequence scroll effect in the initial implementation.

## Active visual thesis

> A dark, precise, systems-oriented landing page in which memory is shown as structured records, relationships, provenance, review, retrieval, and compounding context.

The page should feel:

- minimal;
- premium;
- technical;
- calm;
- trustworthy;
- structured;
- quietly animated;
- implementation-real rather than speculative.

## Template structure to preserve

### 1. Floating navigation shell

Preserve:

- dark rounded navigation container;
- small brand mark and wordmark at left;
- concise navigation links;
- secondary text action;
- pill-shaped primary action with arrow;
- subtle border and soft interior highlight;
- compact mobile navigation.

Adapt to:

- ProChat;
- ProChat Memory;
- Memory for QA;
- Workbench;
- Philosophy or Documentation;
- primary beta/access action.

### 2. Hero with animated background system

Preserve:

- centered oversized headline;
- short muted supporting copy;
- compact status pill above headline;
- primary conversion row;
- trust/proof line below CTA;
- dark animated background with narrow luminous vertical structure;
- lower hero card composition partially entering the viewport;
- subtle grid and edge glow.

Adapt the background animation to memory:

- faint vertical memory streams;
- small evidence points or record fragments;
- relationships moving toward a reviewed memory core;
- slow organized flow rather than particle spectacle;
- no literal brain, robot, or generated video.

### 3. Hero memory-card cluster

Preserve the asymmetrical set of rounded product cards, mixed card sizes, subtle inset borders, and partial off-screen cropping.

Map template cards to:

- recent reviewed memory;
- source/evidence record;
- recurring pattern detected;
- correction or superseded decision;
- relevant context retrieved;
- QA lesson or Workbench run evidence.

### 4. Trust/logo strip

Preserve the small uppercase label and muted monochrome icon row.

During early-stage implementation, use truthful evidence rather than invented customer logos. Candidate content:

- Local files;
- Markdown-first;
- Git-versioned;
- Human-reviewed;
- Model-agnostic.

### 5. Benefits chapter

Preserve:

- small pill label;
- large centered section title;
- muted centered description;
- three-column feature/benefit visual row;
- each column containing a dark diagram panel, concise heading, and body copy.

Adapt the three benefits to:

1. Stop rebuilding context.
2. Keep decisions connected to evidence.
3. Reuse trusted memory when it matters.

### 6. Large system chapter

Preserve:

- oversized two-tone heading;
- numbered chapter metadata;
- full-width dark dotted/grid field;
- three-phase horizontal system diagram;
- small grouped icons connected by dotted progression.

Adapt the three phases to:

```text
Capture & detect
→ Review & structure
→ Retrieve & apply
```

The diagram must show memory flow, not generic automation.

### 7. Conversion/offer chapter

The source template uses pricing cards. ProChat is pre-revenue and must not invent pricing.

Preserve the three-card composition and visual hierarchy, but adapt it to truthful access paths unless Mind strategy later approves pricing.

Proposed cards:

- ProChat Memory — understand the flagship;
- Memory for QA — selected beta / primary conversion;
- ProChat Workbench — explore the second product.

### 8. Closing CTA

Preserve:

- large centered closing question;
- restrained supporting line;
- prominent light primary button;
- dark secondary action with arrow;
- spacious dark section.

Adapt to a memory-oriented close and approved beta CTA.

### 9. Multi-column footer

Preserve:

- dark grid-aligned footer;
- brand statement column;
- product/resources/company/legal link columns;
- thin top and internal rules;
- muted social icons and copyright row.

## Initial global design tokens

These values combine the supplied extracted files with visual measurement hypotheses. Values labeled `PROVISIONAL` must be confirmed in the browser prototype.

### Typography

```css
:root {
  --font-primary: "Golos Text", system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-technical: "JetBrains Mono", ui-monospace, monospace;

  --font-size-body: 1rem;
  --line-height-body: 1.5;
  --font-weight-body: 400;

  --font-size-label: 0.75rem;       /* PROVISIONAL */
  --font-size-small: 0.875rem;      /* PROVISIONAL */
  --font-size-body-large: 1.125rem; /* PROVISIONAL */
  --font-size-h3: clamp(1.25rem, 2vw, 1.5rem);
  --font-size-h2: clamp(2.5rem, 6vw, 5.25rem);
  --font-size-hero: clamp(3.5rem, 8vw, 7.5rem);

  --tracking-label: 0.12em;
  --tracking-display: -0.045em;
}
```

### Color

```css
:root {
  --color-canvas: #000000;
  --color-surface: #0b0b0b;        /* PROVISIONAL */
  --color-surface-raised: #111111; /* PROVISIONAL */
  --color-surface-hover: #171717;

  --color-text-primary: #fafafa;
  --color-text-secondary: #a3a3a3; /* PROVISIONAL */
  --color-text-muted: #737373;     /* PROVISIONAL */
  --color-text-faint: #525252;     /* PROVISIONAL */

  --color-border-default: #333333;
  --color-border-subtle: #1f1f1f;  /* PROVISIONAL */
  --color-border-faint: #151515;   /* PROVISIONAL */

  --color-control-light: #fafafa;
  --color-control-light-text: #0a0a0a;
  --color-focus: #ffffff;

  --color-memory-glow: #2dd4bf;    /* PROVISIONAL semantic adaptation */
  --color-memory-glow-soft: rgb(45 212 191 / 0.12);
}
```

The template is predominantly achromatic. The memory accent must remain subtle and localized. It must not turn the page into a colorful AI theme.

### Spacing

Use a 4px base with the template's dominant 16px rhythm.

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  --space-40: 10rem;

  --page-gutter: clamp(1rem, 4vw, 3rem);
  --content-max: 90rem;             /* PROVISIONAL */
  --reading-max: 44rem;             /* PROVISIONAL */
  --section-y: clamp(6rem, 12vw, 11rem);
}
```

### Radius

```css
:root {
  --radius-control: 999px;
  --radius-card-small: 1.25rem; /* PROVISIONAL */
  --radius-card: 1.75rem;       /* PROVISIONAL */
  --radius-panel: 2.25rem;      /* PROVISIONAL */
}
```

### Borders and shadows

```css
:root {
  --border-hairline: 1px solid var(--color-border-subtle);
  --shadow-card: inset 0 1px 0 rgb(255 255 255 / 0.035), 0 20px 60px rgb(0 0 0 / 0.28);
  --shadow-control: inset 0 1px 0 rgb(255 255 255 / 0.08), 0 8px 30px rgb(0 0 0 / 0.4);
  --shadow-glow: 0 0 80px rgb(45 212 191 / 0.08);
}
```

### Grid and background

```css
:root {
  --grid-size: 64px; /* PROVISIONAL */
  --grid-line: rgb(255 255 255 / 0.035);
  --dot-color: rgb(255 255 255 / 0.055);
}
```

## Motion system

Recreate the template's motion character, not necessarily its exact source code.

### Hero background

- slow vertical light/data streams;
- subtle moving noise or point field;
- central convergence and diffusion;
- no full-screen video;
- CSS, SVG, canvas, or lightweight WebGL only after performance comparison;
- must pause or simplify under `prefers-reduced-motion`.

### Cards

- staggered reveal on initial viewport entry;
- 4–12px vertical travel at most;
- opacity and transform only where possible;
- hover uses border/value emphasis, not floating spectacle;
- no continuous bobbing.

### Arrows and connectors

- use small directional arrows and dotted connectors to show memory flow;
- line-draw or opacity progression may animate once when entering view;
- arrows must have semantic meaning and accessible labels when interactive.

### Diagrams

- animate from fragmented to related to reviewed;
- use data records, source nodes, check/review symbols, search/retrieval symbols, and relationship lines;
- motion must stop in a legible final state;
- static rendering must communicate the same meaning.

### Motion tokens

```css
:root {
  --duration-fast: 160ms;
  --duration-standard: 280ms;
  --duration-reveal: 600ms;
  --duration-diagram: 1200ms;
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-linear-soft: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Memory-specific symbol library

Recreate the template's compact monochrome icon style using memory concepts:

- document/record — captured memory unit;
- source link — provenance;
- check/review mark — human-approved memory;
- branching line — relationship or alternative path;
- search — retrieval;
- clock/history — prior context;
- correction/rotate arrow — revised or superseded memory;
- shield — local ownership or protected data;
- Git branch — versioned history;
- filter — relevance selection;
- stack/layers — structured memory;
- sparkle-like symbol is prohibited unless it clearly means newly detected relationship and remains visually restrained.

## Accessibility requirements

- WCAG 2.2 AA minimum.
- Body text and muted text must pass contrast against their actual surfaces.
- All controls must have visible `:focus-visible` states.
- Hover-only information is prohibited.
- All diagrams require equivalent text.
- Reduced-motion mode must disable continuous background motion and convert reveals to immediate or subtle opacity changes.
- Navigation must be keyboard and screen-reader operable.
- Cards that are not links must not appear interactive.
- Touch targets must be at least 44×44 CSS pixels.

## Explicit cut-off from prior direction

The following are no longer active homepage deliverables:

- Seedance generation;
- first-frame and final-frame prompting;
- 12-second master video;
- FFmpeg frame extraction;
- 144-frame web sequence;
- 600vh scroll-scrub section;
- cinematic film production package.

Those documents remain historical research and may be revisited only through a separately approved future experiment.

## Exact first implementation packet

```yaml
packet_id: PXF-003A
name: Nexus-template homepage foundation
coding: true
scope:
  - replace active homepage visual system with dark Nexus-derived tokens
  - preserve Golos Text and JetBrains Mono roles
  - reproduce navigation shell, hero layout, animated memory background, and hero card cluster
  - create memory-specific icons and diagrams in the template style
  - adapt copy to approved Mind strategy
  - do not implement pricing claims
  - keep ProChat Workbench subordinate to ProChat Memory
exact_initial_paths:
  - src/app/(marketing)/App.tsx
  - src/app/(marketing)/prochat-memory-theme.css
  - src/app/(marketing)/components/layout/Footer.tsx
  - src/components/logo.tsx
  - brand-spec.md
  - DESIGN.md
validation:
  - TypeScript
  - lint
  - accessibility checks
  - responsive screenshots
  - reduced-motion behavior
  - browser visual review
commit_policy: explicit_paths_only
```

## Implementation order

1. Finalize tokens from measured browser prototype.
2. Build the global page shell and navigation.
3. Build the hero background animation as a lightweight memory visualization.
4. Reproduce the hero card cluster with memory content.
5. Build the trust strip.
6. Build the three-benefit chapter and custom memory diagrams.
7. Build the three-phase memory-system chapter.
8. Build truthful product/access cards in place of unapproved pricing.
9. Build closing CTA and footer.
10. Validate responsive behavior, accessibility, motion, and visual fidelity.

## Open measurement tasks

The supplied extracted design files do not reliably define all values. Before broad implementation, measure or visually calibrate:

- exact desktop content width;
- navigation height and radius;
- hero headline maximum size and line-height;
- card radii and internal padding;
- grid interval and opacity;
- section vertical spacing;
- border alpha;
- background-animation speed and density;
- breakpoint behavior;
- mobile card stacking;
- exact footer grid proportions.

These are calibration tasks within the adopted template, not invitations to redesign it.




## Premium execution standard

The homepage must be treated as a high-end flagship marketing surface, not a generic SaaS reskin.

The supplied Nexus template controls the visual grammar, but every adapted visual must communicate a ProChat Memory idea. Fidelity is measured in both appearance and meaning.

### Physical scene

A thoughtful technical professional encounters the site on a high-resolution display in a calm, low-light work environment and should immediately feel precision, trust, depth, and control.

### Color strategy

Use a restrained strategy:

- tinted near-black neutrals;
- one localized memory accent occupying less than ten percent of the visible surface;
- no generic AI blue/purple gradient;
- no decorative color without semantic meaning.

### Hero animation fidelity

The hero must recreate the Nexus template's background behavior at the level of rhythm, depth, restraint, and polish:

- a narrow central field of luminous vertical streams;
- faint evidence points moving through the field;
- subtle convergence toward a structured memory core;
- localized glow rather than a full-screen gradient;
- slow continuous motion that remains calm behind the headline;
- no distraction behind readable text;
- no particle explosion, generic neural network, video, or scroll hijacking.

The exact source implementation does not need to be copied. The perceived quality and behavior must be matched through the smallest performant technique.

### Illustration narrative system

Each illustration must tell a stage of the memory story while preserving the Nexus template's monochrome, diagrammatic, low-contrast visual style.

```text
fragmented evidence
→ captured record
→ linked provenance
→ human review
→ structured memory
→ relevant retrieval
→ applied context
```

#### Illustration 1 — Capture

Show dispersed records, notes, logs, and evidence entering a constrained memory container. The visual must distinguish raw input from trusted memory.

#### Illustration 2 — Review and structure

Show related records connected by thin lines, a visible human-review checkpoint, and one superseded branch receding. The final state must be legible without animation.

#### Illustration 3 — Retrieval

Show a current task or question pulling only a small set of relevant trusted records from a wider memory field. The diagram must communicate selective context rather than context dumping.

#### Illustration 4 — Provenance

Show a conclusion connected backward to source evidence, prior decisions, and revision history. Use arrows and dotted connectors consistently.

#### Illustration 5 — Compounding memory

Show a small number of memory units becoming a durable, versioned structure over time. Avoid growth charts that imply unsupported commercial outcomes.

### Symbol grammar

Every recurring symbol must have one stable meaning:

- document: captured record;
- chain or link: provenance;
- check: human review;
- branch: relationship or alternative path;
- rotated arrow: correction or supersession;
- search: retrieval;
- shield: ownership and protection;
- stack: structured memory;
- Git branch: versioned history;
- filter: relevance selection.

Do not use icons decoratively or change their meaning between sections.

### Motion quality laws

- Motion must clarify state, causality, hierarchy, or relationship.
- Prefer transform and opacity animation.
- Avoid bounce, elastic easing, continuous card floating, or novelty effects.
- Repeated interactions should be fast and restrained.
- One-time narrative diagrams may be slower but must settle into a clear final state.
- Every animation requires a reduced-motion equivalent.
- Mobile motion density must be lower than desktop motion density.

### Responsive design laws

Responsive design is not desktop stacking.

- Mobile must preserve narrative priority and touch ergonomics.
- Decorative density must reduce on narrow screens.
- Hero cards may reorder to preserve the story sequence.
- Diagrams may simplify into stepped states rather than shrink unreadably.
- Navigation, CTAs, diagrams, and cards must remain usable at 320px width.
- Text must not overlap animated backgrounds at any breakpoint.

### Performance quality gates

Initial budgets for the homepage foundation:

```yaml
largest_contentful_paint_mobile: <= 2.5s_target
cumulative_layout_shift: <= 0.1
interaction_to_next_paint: <= 200ms_target
continuous_animation_main_thread: minimal
hero_animation_asset_download: none_or_negligible
javascript_required_for_hero_meaning: false
```

The hero must remain meaningful when CSS animation is unavailable.

### Visual QA gates

Before a section is considered complete:

1. compare desktop and mobile screenshots against the supplied template;
2. verify hierarchy, spacing, radii, border alpha, typography, and negative space;
3. verify the illustration reinforces the adjacent copy;
4. inspect hover, focus, active, reduced-motion, and narrow-screen states;
5. reject generic AI imagery and unexplained decorative elements;
6. document remaining fidelity differences explicitly;
7. run a second polish pass after functional validation.

### Homepage completion rule

The page is not complete merely because all sections exist. It is complete only when the full scroll tells one coherent story, visual transitions feel intentional, mobile composition is independently designed, and the final result passes visual, accessibility, motion, and performance review.




## Conversion authority

Every homepage section, CTA, illustration, navigation item, and responsive priority must follow:

```text
docs/product/PUBLIC_CONVERSION_STRATEGY.md
```

The template supplies visual grammar. The conversion strategy supplies purpose.

Rules:

- GitHub adoption is the primary public growth path once repository, license, and release claims are verified in Mind.
- The homepage must move visitors toward understanding, trust, starring, installing, using, feedback, contribution, and advocacy.
- Managed implementation is a secondary organizational path.
- Pricing-card geometry may be reused, but unapproved pricing and SaaS purchase language are prohibited.
- Every section must answer one visitor question and advance one lifecycle stage.
- A visually faithful section that has no conversion responsibility is incomplete.
- Repository, star, install, contribution, and managed-service claims remain release-gated until Mind reconciliation is complete.




## Memory visual-language authority

All homepage illustrations, diagrams, arrows, symbols, and visual state transitions must follow:

```text
docs/product/MEMORY_VISUAL_LANGUAGE.md
```

The Nexus template controls visual grammar and polish. The Memory Visual Language controls semantic meaning and narrative continuity.

PXF-003B2 must compose the approved primitives into Capture, Review and Structure, and Retrieval illustrations. It must not introduce an independent illustration style or alter primitive meanings.
