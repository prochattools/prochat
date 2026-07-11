# ProChat Brand Specification

**Status:** canonical repository-local brand tokens  
**Canonical authority:** Mind  
**Consumers:** `DESIGN.md`, website components, product visuals, design skills, implementation agents

This file contains factual brand values. It is not a mood board and must not contain speculative alternatives.

## Brand statement

ProChat is a memory-first software company.

Visual thesis:

> A calm, trustworthy working system for structured knowledge.

Operational principle:

> Structure first. Evidence visible. Actions explicit. Decoration restrained.

## Typography

```yaml
typography:
  primary:
    family: "Golos Text"
    role: "all display, body, navigation, controls, forms, and product UI"
    variable: true
    preferred_weights: [400, 450, 500, 600, 650, 700, 750]
  technical:
    family: "JetBrains Mono"
    role: "code, paths, IDs, timestamps, source references, status metadata, numbers, and diffs"
    preferred_weights: [400, 500, 600]
  secondary: null
```

Implementation preference:

- self-host variable fonts where licensing permits;
- use `font-display: swap`;
- preload only the required primary subsets and weights;
- avoid adding another type family unless approved in Mind.

## Color strategy

```yaml
strategy: "grayscale plus one global accent"
accent_name: "ProChat Cobalt"
accent_hex: "#3158C7"
product_specific_accents: false
website_default_mode: light
```

## Light color tokens

```css
:root {
  --brand-canvas: #f7f8fa;
  --brand-surface: #ffffff;
  --brand-surface-subtle: #f1f3f6;
  --brand-surface-strong: #e8ebf0;

  --brand-border-subtle: #e2e6ec;
  --brand-border: #d4dae3;
  --brand-border-strong: #b8c1cd;

  --brand-text: #111827;
  --brand-text-secondary: #465363;
  --brand-text-muted: #697586;
  --brand-text-inverse: #ffffff;

  --brand-primary: #3158c7;
  --brand-primary-hover: #274ab0;
  --brand-primary-pressed: #1e3d95;
  --brand-primary-soft: #eaf0ff;
  --brand-primary-line: #bfcdf5;
}
```

## Dark color tokens

```css
[data-theme="dark"] {
  --brand-canvas: #0d1118;
  --brand-surface: #141a24;
  --brand-surface-subtle: #1a2230;
  --brand-surface-strong: #222c3c;

  --brand-border-subtle: #293446;
  --brand-border: #354156;
  --brand-border-strong: #4a5870;

  --brand-text: #f5f7fa;
  --brand-text-secondary: #b6c0cd;
  --brand-text-muted: #8995a6;
  --brand-text-inverse: #111827;

  --brand-primary: #7d9af2;
  --brand-primary-hover: #91aaf4;
  --brand-primary-pressed: #a6baf6;
  --brand-primary-soft: #1c2b52;
  --brand-primary-line: #3b579b;
}
```

## Semantic colors

These are state colors, not product colors.

```css
:root {
  --status-success: #176b4a;
  --status-success-soft: #e9f6f0;
  --status-warning: #8a5200;
  --status-warning-soft: #fff3dd;
  --status-error: #a82a22;
  --status-error-soft: #fdedec;
  --status-information: #3158c7;
  --status-information-soft: #eaf0ff;
  --status-neutral: #5d6878;
  --status-neutral-soft: #f1f3f6;
}
```

Never rely on these colors without an accompanying text label or other non-color state indicator.

## Spacing

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
  --space-40: 10rem;
}
```

## Radius

```css
:root {
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;
}
```

## Shadows

```css
:root {
  --shadow-sm: 0 1px 2px rgb(17 24 39 / 0.05);
  --shadow-md: 0 12px 32px rgb(17 24 39 / 0.08);
  --shadow-lg: 0 24px 80px rgb(17 24 39 / 0.12);
}
```

Colored glow shadows are not permitted.

## Motion

```css
:root {
  --duration-instant: 120ms;
  --duration-fast: 180ms;
  --duration-standard: 280ms;
  --duration-deliberate: 450ms;
  --duration-chapter: 700ms;

  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-chapter: cubic-bezier(0.65, 0, 0.35, 1);
}
```

Canonical motion stack:

```yaml
cinematic_scroll: "GSAP + ScrollTrigger + @gsap/react"
micro_interactions: "CSS"
product_visuals: "semantic HTML + CSS + SVG"
scroll_engine: "native browser scrolling"
smooth_scroll_library: null
```

## Layout

```yaml
layout:
  max_page_width: "1440px"
  max_content_width: "1280px"
  max_reading_width: "800px"
  desktop_columns: 12
  tablet_columns: 8
  mobile_columns: 4
  desktop_gutter: "32px"
  tablet_gutter: "24px"
  mobile_gutter: "20px"
```

## Product differentiation

```yaml
products:
  prochat:
    expression: "spacious, conceptual, calm, precise"
  memory:
    expression: "evidence, records, sources, scope, review, retrieval, correction"
  memory_for_qa:
    expression: "failures, logs, selectors, environment, test evidence, approved lessons"
  workbench:
    expression: "repository trees, bounded context, guarded changes, validation, Git state"
```

All products use the same font and color system.

## Prohibited visual patterns

```yaml
prohibited:
  - "neon AI gradients"
  - "purple glow branding"
  - "generic robot, brain, wand, or sparkle imagery"
  - "product-specific unrelated palettes"
  - "excessive glassmorphism"
  - "continuous decorative loops"
  - "scroll hijacking"
  - "typewriter and character-scramble effects"
  - "generic equal three-card feature rows"
  - "essential information inside inaccessible canvas"
```

## Canonical references

```text
mind/wiki/organisations/prochat/brand/global-design-foundation.md
mind/wiki/organisations/prochat/brand/website-visual-motion-system.md
mind/wiki/organisations/prochat/brand/website-build-contract.md
DESIGN.md
PRODUCT.md
```
