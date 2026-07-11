# ProChat Homepage Technical Design

**Status:** approved pre-build architecture  
**Scope:** homepage design system, prototypes, implementation, motion, validation, and production hardening  
**Does not authorize:** production homepage implementation before prototype and plan-review gates pass

## Current repository stack

Verified current stack:

```yaml
framework: "Next.js 14 App Router"
react: "18"
language: "TypeScript 5"
styling:
  - "Tailwind CSS 3"
  - "Sass / SCSS"
  - "global CSS variables"
existing_motion: "Framer Motion 12"
icons: "Lucide React"
components:
  - "Radix UI"
  - "class-variance-authority"
current_visual_testing: null
current_gsap: null
```

The homepage must work within the existing stack. Do not migrate Next.js, React, Tailwind, or the full component system as part of the homepage design project.

## Architectural decision summary

```yaml
homepage_architecture:
  page_rendering: "Server Component by default"
  cinematic_components: "isolated client leaf components"
  product_visuals: "semantic HTML + CSS + SVG"
  cinematic_motion: "GSAP + ScrollTrigger + @gsap/react"
  micro_interactions: "CSS"
  scroll_engine: "native browser scrolling"
  state_model: "named finite visual states"
  responsive_strategy: "separate desktop, tablet, mobile, and reduced-motion compositions"
  visual_test_tool: "Playwright screenshot assertions"
  accessibility_test_tool: "Playwright + axe"
  prototype_surface: "local design-lab route"
  storybook: "not required for initial homepage"
```

## Planned dependency changes

Do not install dependencies until the motion proof-of-concept phase begins.

Planned runtime dependencies:

```text
gsap
@gsap/react
```

Planned development dependencies:

```text
@playwright/test
@axe-core/playwright
```

The repository already includes Framer Motion. Keep it for existing surfaces. Do not use Framer Motion and GSAP to orchestrate the same component.

### Why no smooth-scroll dependency

Do not add Lenis, ScrollSmoother, Locomotive Scroll, or wheel interception.

Native scrolling provides:

- predictable browser behavior;
- keyboard and touch compatibility;
- fewer accessibility risks;
- fewer pinning edge cases;
- simpler reduced-motion behavior;
- lower maintenance cost.

### Why no Storybook initially

The homepage visual system requires full-page scroll context, pinning, and chapter transitions. A repository-local design-lab route gives more accurate behavior than isolated stories.

Storybook may be added later if shared product primitives need long-term component documentation beyond the homepage.

## Font implementation

Canonical fonts:

- Golos Text
- JetBrains Mono

Preferred implementation:

```ts
import { Golos_Text, JetBrains_Mono } from "next/font/google";
```

Use Next font variables and apply them through semantic CSS custom properties.

```ts
const golos = Golos_Text({
  subsets: ["latin"],
  variable: "--font-golos",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
```

Validation gate:

- confirm both exports exist in the installed Next.js version;
- run a production build;
- inspect font loading and layout stability;
- if Golos Text is unavailable in the installed Next version, use `@fontsource-variable/golos-text` rather than introducing a different font.

Do not add a secondary font.

## Token architecture

Create one semantic token layer, mapped from `brand-spec.md`.

Planned source:

```text
src/assets/styles/prochat-tokens.css
```

Import once through the global stylesheet or root marketing layout.

Components must consume semantic variables:

```css
color: var(--color-text-primary);
background: var(--color-surface);
border-color: var(--color-border);
```

Do not hard-code canonical colors, motion durations, radii, or shadows inside components.

### Tailwind relationship

Tailwind remains available for layout, responsive behavior, and simple utilities.

Use CSS variables or mapped Tailwind theme values for canonical tokens.

Use CSS Modules or SCSS Modules for:

- cinematic layering;
- complex grid composition;
- SVG and connector states;
- masks and clipping;
- responsive product canvases;
- component-specific animation preparation.

Avoid large unreadable strings of arbitrary Tailwind values for cinematic components.

## Proposed source structure

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   └── _components/
│   │       ├── homepage/
│   │       │   ├── Homepage.tsx
│   │       │   ├── HomepageHeroStory.tsx
│   │       │   ├── MemoryLifecycleStory.tsx
│   │       │   ├── ContextSelectionStory.tsx
│   │       │   ├── QaInvestigationStory.tsx
│   │       │   ├── WorkbenchControlPlane.tsx
│   │       │   └── ...
│   └── design-lab/
│       └── homepage/
│           ├── page.tsx
│           └── _components/
├── components/
│   └── prochat-visuals/
│       ├── EvidenceCard.tsx
│       ├── MemoryRecord.tsx
│       ├── ReviewGate.tsx
│       ├── ContextWindow.tsx
│       ├── RepositoryTree.tsx
│       ├── GuardedOperation.tsx
│       ├── ValidationResult.tsx
│       └── ...
├── lib/
│   ├── homepage/
│   │   ├── visual-states.ts
│   │   ├── examples.ts
│   │   └── motion.ts
│   └── accessibility/
│       └── reduced-motion.ts
└── assets/
    └── styles/
        ├── prochat-tokens.css
        └── homepage/
```

The exact paths may adapt to the existing marketing structure, but responsibilities must remain separated.

## Rendering boundaries

The homepage page and static copy sections remain Server Components.

Client Components are limited to interactive or animated leaves.

```text
Server homepage
├── semantic section copy
├── static diagrams
└── client cinematic leaf
    ├── scoped visual state
    ├── GSAP timeline
    └── reduced-motion branch
```

Do not convert the full homepage into one large client component.

## Content architecture

Canonical copy must remain outside animation timeline code.

Recommended content model:

```ts
interface HomepageSectionContent {
  id: string;
  eyebrow?: string;
  title: string;
  body?: string[];
  primaryAction?: Action;
  secondaryAction?: Action;
}
```

Visual examples live separately from canonical copy.

```ts
interface MemoryRecordExample {
  id: string;
  type: "decision" | "evidence" | "failure-fix" | "correction" | "procedure" | "example" | "context" | "review-note" | "lesson";
  state: "draft" | "review" | "approved" | "rejected" | "retired";
  scope: "personal" | "project" | "client" | "team" | "organization" | "cross-project";
  title: string;
  summary: string;
  evidence: EvidenceReference[];
  lastReviewed?: string;
}
```

Use sanitized fictional examples. Do not imply real customer data or measured results.

## Named visual states

Every cinematic sequence must use named product states.

Example:

```ts
export type MemoryLifecycleState =
  | "current-evidence"
  | "draft-lesson"
  | "sanitized-and-scoped"
  | "human-review"
  | "approved-memory"
  | "relevant-retrieval"
  | "corrected-or-retired";
```

A timeline transitions between valid states. It must not be the only place where the product meaning exists.

Each state must expose an accessible summary:

```ts
interface VisualStateDefinition {
  id: string;
  ariaSummary: string;
  visibleObjects: string[];
  activeConnectors?: string[];
  emphasizedCopyId?: string;
  statusLabels?: string[];
}
```

## GSAP architecture

Register GSAP only in client modules.

Use `useGSAP()` or a scoped `gsap.context()`.

Each cinematic chapter gets:

- one root element ref;
- one primary timeline;
- named labels matching product states;
- deterministic start and end points;
- cleanup on unmount and route change;
- layout refresh after fonts and dimensions stabilize;
- desktop, tablet, mobile, and reduced-motion branches.

Example shape:

```ts
useGSAP(
  () => {
    if (prefersReducedMotion) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.current,
        start: "top top",
        end: "+=180%",
        scrub: true,
        pin: visual.current,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .addLabel("current-evidence")
      .to(/* transform and opacity only */)
      .addLabel("human-review")
      .to(/* transform and opacity only */)
      .addLabel("approved-memory")
      .to(/* transform and opacity only */);
  },
  { scope: root, dependencies: [prefersReducedMotion] },
);
```

### ScrollTrigger budget

```yaml
pinned_chapters_max: 4
active_triggers_per_chapter_target: 3
total_page_triggers_target_max: 24
scrubbed_timelines_max: 6
continuous_pointer_effects: 0
```

Prefer one chapter timeline over many independent child triggers.

### Animation property policy

Preferred:

- transform;
- opacity;
- carefully measured clip-path;
- short SVG stroke animation.

Restricted:

- filter;
- box-shadow;
- large-surface color interpolation.

Do not animate during scroll:

- width;
- height;
- top;
- left;
- margin;
- padding;
- font size.

## SVG and product visuals

Use SVG for:

- connectors;
- relationship lines;
- scope boundaries;
- task-selection paths;
- simple diagrams;
- Git history branches.

Use semantic HTML for records, labels, code, metadata, controls, and readable content.

Do not put essential text in canvas.

Do not use SVG text for primary copy.

## Design-lab route

Create a development-only design laboratory before production implementation.

Suggested route:

```text
/design-lab/homepage
```

The route contains isolated prototypes for:

1. Global typography and tokens
2. Hero sequence
3. Memory lifecycle
4. Context selection
5. QA investigation
6. Workbench control plane
7. Mobile scenes
8. Reduced-motion scenes

Requirements:

- excluded from public navigation;
- clearly labeled as a prototype;
- uses canonical tokens and realistic sanitized data;
- may use temporary debug controls and ScrollTrigger markers in development only;
- removed, protected, or excluded from production output before launch.

## Prototype gates

Do not implement the full homepage immediately.

Build and approve in this order:

1. Static global token and typography specimen
2. Static hero composition
3. Animated hero proof of concept
4. Memory lifecycle proof of concept
5. Context selection proof of concept
6. QA investigation proof of concept
7. Workbench static and animated composition
8. Mobile and reduced-motion variants
9. Full low-fidelity page assembly
10. Production implementation

Each prototype must be reviewed in browser before the next stage begins.

## Visual testing

Add Playwright screenshot assertions during the prototype phase.

Planned viewports:

```text
360×800
390×844
768×1024
1024×768
1280×800
1440×900
1728×1117
```

Capture:

- initial, middle, and final states for each cinematic chapter;
- mobile step scenes;
- reduced-motion states;
- light mode;
- approved dark technical panels;
- focus and expanded FAQ states.

Animations must be placed in deterministic test states before screenshots.

## Accessibility testing

Use:

- semantic review;
- keyboard walkthrough;
- Playwright accessibility assertions;
- `@axe-core/playwright`;
- reduced-motion screenshots;
- 200% zoom checks;
- touch target checks;
- contrast checks for text, controls, and meaningful diagrams.

Motion-specific requirements:

- no essential content depends on completing an animation;
- pinned visual order must not change DOM reading order;
- backward scrolling restores state predictably;
- focus must not enter hidden or transformed-away controls;
- reduced motion removes large object travel and pinning.

## Performance strategy

Targets:

```yaml
LCP_seconds: 2.5
INP_ms: 200
CLS: 0.1
hero_media_initial_kb: 250
above_fold_transfer_kb: 700
```

Implementation rules:

- static hero state renders before GSAP loads;
- dynamically import below-the-fold cinematic components;
- reserve visual dimensions before hydration;
- avoid autoplay video and image sequences;
- minimize SVG path complexity;
- pause or destroy off-screen work;
- do not create per-element scroll listeners;
- inspect the production bundle after adding GSAP;
- run Lighthouse and browser performance traces on a mid-range mobile profile.

## Build and review tools

### Primary implementation environment

- GPT-5.6 Sol through ProChat Workbench for architecture, bounded implementation, validation, and Git discipline.

### Design exploration and critique

- Claude Opus through Claude Code with the Brain design profile.
- Use it for design orchestration, visual variants, prototypes, plan critique, motion critique, and independent review.

### Browser and visual QA

- Playwright for deterministic screenshots and browser tests.
- Agent browser tooling for live exploratory verification.
- Browser DevTools for performance and accessibility inspection.

### Image generation

Do not use generated imagery as the main product explanation.

Image generation may be used only for optional atmospheric or campaign assets after product visuals are complete and approved.

## Explicit non-decisions

The following remain out of scope until prototypes prove a need:

- a secondary font;
- smooth-scroll libraries;
- WebGL or Three.js;
- Rive or Lottie;
- Storybook;
- a full-site dark mode redesign;
- a Next.js or React upgrade;
- removal of Framer Motion;
- production pricing or customer-outcome visuals.

## Definition of technical readiness

The homepage is ready to build only when:

- `PRODUCT.md`, `DESIGN.md`, and `brand-spec.md` are approved;
- the visual storyboard is approved;
- the design-lab architecture is agreed;
- realistic example data is approved;
- the four cinematic sequences have state diagrams;
- one GSAP prototype passes browser and reduced-motion testing;
- the plan receives independent design review;
- all open decisions are resolved or explicitly deferred;
- implementation tasks are packetized in `docs/implementation-plan.md`.
