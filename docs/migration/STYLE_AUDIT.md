# ProChat Style Audit

**Status:** canonical audit specification  
**Scope:** global CSS, SCSS, CSS Modules, Tailwind configuration, design tokens, fonts, themes, page-local styles, and responsive rules

## Purpose

The style audit identifies every active and legacy visual rule and determines how it migrates into the canonical ProChat design system.

The goal is not to convert every file to one styling technology. The goal is one coherent visual authority, semantic tokens, predictable ownership, and materially less duplication.

## Canonical references

```text
DESIGN.md
brand-spec.md
docs/design/DESIGN_PRINCIPLES.md
docs/platform/RESPONSIVE_STRATEGY.md
docs/platform/ACCESSIBILITY_STRATEGY.md
docs/platform/PERFORMANCE_STRATEGY.md
```

## Required record

```yaml
id: "STYLE-000"
path: ""
technology: "global-css | scss | css-module | tailwind | inline | css-in-js | config"
current_scope: ""
consumers: []
contains:
  tokens: false
  typography: false
  layout: false
  color: false
  motion: false
  responsive: false
status: "CURRENT | DUPLICATE | LEGACY | EXPERIMENTAL | UNSAFE"
disposition: "KEEP | REFACTOR | REWRITE | REPLACE | ARCHIVE | DELETE"
canonical_destination: ""
raw_values: []
legacy_fonts: []
legacy_colors: []
legacy_themes: []
specificity_risk: ""
accessibility_risk: ""
performance_risk: ""
migration_wave: 0
validation: []
rollback: ""
deletion_approved: false
owner: ""
notes: ""
```

## Inventory targets

Audit:

- global stylesheets;
- Sass entry points and partials;
- CSS Modules;
- Tailwind theme and plugins;
- root CSS variables;
- page-local `<style>` blocks;
- inline style objects;
- theme providers;
- legacy dark/light systems;
- marketing-specific tokens;
- product-specific palettes;
- font imports and preload rules;
- media queries;
- keyframes;
- z-index scales;
- shadows and filters;
- focus styles;
- print styles;
- third-party style imports.

## Token migration

All retained production styles must consume semantic tokens where a canonical token exists.

Primary destination:

```text
src/assets/styles/prochat-tokens.css
```

Token layers:

```text
factual brand values
→ semantic global tokens
→ component-role tokens only where necessary
```

Do not create page-specific copies of canonical colors, fonts, radii, shadows, or motion values.

## Typography audit

Search for:

- font-family declarations;
- font imports;
- `next/font` usage;
- Fontsource packages;
- custom font files;
- weight assumptions;
- letter-spacing rules;
- page-specific type scales;
- monospace usage;
- text rendering and smoothing rules.

Canonical result:

```text
Primary: Golos Text
Technical: JetBrains Mono
Secondary: none
```

Legacy fonts require consumer mapping before removal to avoid layout shift and unexpected fallback.

## Color and theme audit

Search for:

- raw hex, RGB, HSL, and named colors;
- gradients;
- glow effects;
- product-specific accents;
- theme variables;
- dark surfaces;
- status colors;
- low-contrast muted text;
- CSS filters used as color systems.

Canonical result:

```text
grayscale foundation
+ ProChat Cobalt #3158C7
+ semantic status colors only when meaning requires them
```

Dark technical panels may remain where approved. A competing full product palette may not.

## Layout and responsive audit

Identify:

- competing container widths;
- page-specific gutters;
- arbitrary breakpoints;
- fixed desktop widths;
- horizontal overflow;
- emergency mobile overrides;
- duplicated section spacing;
- inconsistent grid definitions;
- viewport-height assumptions;
- sticky and fixed positioning;
- z-index conflicts.

Responsive rules must follow `RESPONSIVE_STRATEGY.md` and component-level behavior rather than large collections of page-specific patches.

## Specificity and cascade audit

Flag:

- `!important`;
- deeply nested Sass selectors;
- broad element selectors;
- global class collisions;
- duplicate utility definitions;
- overrides that depend on import order;
- selector coupling to generated markup;
- page-specific overrides of shared components.

Each high-risk cascade must receive a refactor or containment plan before migration.

## Tailwind relationship

Tailwind remains a supported implementation tool for layout and utilities.

Audit:

- arbitrary values that duplicate canonical tokens;
- custom theme values;
- duplicated utility patterns;
- plugins;
- safelist usage;
- generated CSS size;
- class strings that obscure cinematic composition.

Use CSS or SCSS Modules for complex product canvases and animation preparation when that produces clearer ownership.

## Migration method

1. Implement canonical token layer.
2. Apply fonts at the approved root boundary.
3. Build new shared primitives against semantic tokens.
4. Migrate page waves into the new scope.
5. Keep legacy styles isolated while old pages remain.
6. Remove old imports only after all consumers migrate.
7. Search for raw legacy values and deleted classes.
8. verify visual baselines, accessibility, and build output.

## Validation

- design lint;
- raw color and font search;
- stylesheet import graph;
- CSS bundle review;
- visual regression;
- contrast checks;
- focus-state review;
- responsive screenshots;
- production build;
- absence search before deletion.

## Completion criteria

- canonical fonts and semantic tokens control all current public pages;
- no active page uses an unrelated theme;
- legacy style consumers are migrated or explicitly isolated;
- duplicate token and utility systems are removed;
- cascade and specificity risks are reduced;
- mobile and accessibility behavior no longer depends on emergency overrides;
- obsolete style files and imports are removed only after zero-consumer verification.
