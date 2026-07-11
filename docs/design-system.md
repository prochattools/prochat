# ProChat Design-System Implementation Bridge

**Status:** repository-local implementation guidance  
**Canonical design truth:** `DESIGN.md` and `brand-spec.md`  
**Canonical strategy and company design:** Mind

This file explains how the approved ProChat design system should be introduced into the existing website repository.

Existing tokens, themes, gradients, fonts, hero components, and page-specific styles remain implementation inventory. They are not canonical design authority and must not be extended by default.

## Required reading order

```text
PRODUCT.md
DESIGN.md
brand-spec.md
docs/homepage-design-spec.md
docs/homepage-visual-storyboard.md
docs/homepage-example-data.md
docs/homepage-technical-design.md
docs/homepage-design-orchestration.md
docs/homepage-validation-plan.md
```

## Canonical foundation

```yaml
fonts:
  primary: "Golos Text"
  technical: "JetBrains Mono"
  secondary: null
color:
  strategy: "grayscale plus one global cobalt accent"
  accent: "#3158C7"
motion:
  cinematic: "GSAP ScrollTrigger"
  micro_interactions: "CSS"
  scroll: "native browser scrolling"
visuals: "semantic HTML + CSS + SVG"
```

## Current implementation inventory

The repository currently contains design implementation across:

```text
src/lib/brand.ts
src/assets/styles/globals.scss
src/components/marketing/HeroSection.tsx
src/components/ui/Button.tsx
src/app/(marketing)/components/ui/Button.tsx
page-specific CSS and SCSS
Framer Motion components
legacy theme files
```

These sources must be audited before migration.

Do not assume that existing colors, fonts, radii, shadows, gradients, hero backgrounds, or motion rules remain approved.

## Planned token source

Create:

```text
src/assets/styles/prochat-tokens.css
```

Map the factual values from `brand-spec.md` to semantic CSS custom properties.

Components should consume semantic tokens rather than raw values.

## Typography migration

Planned implementation:

- Golos Text through `next/font` when supported by the installed Next.js version;
- JetBrains Mono through `next/font` or the existing Fontsource dependency;
- CSS variables applied at the relevant root layout;
- production-build verification for font loading and layout shift.

Do not add another font during implementation.

## Component migration principle

Use existing components where their structure and behavior remain useful.

Replace or refactor only when the existing abstraction prevents the approved design.

For every component:

1. identify current consumers;
2. identify legacy visual assumptions;
3. map approved tokens;
4. preserve accessible behavior;
5. add missing states;
6. verify in browser;
7. commit the smallest coherent change.

## Hero rule

The existing shared hero component is not automatically suitable for the new homepage.

The homepage hero requires a product-story composition with named visual states and may need a dedicated component.

Do not force the cinematic homepage hero into a legacy generic hero abstraction.

Other marketing pages may continue using an updated shared hero where appropriate.

## Button rule

Buttons should continue using shared accessible primitives where possible.

Canonical button behavior:

- one clear primary action per decision area;
- Golos Text;
- cobalt primary state;
- visible focus;
- no colored glow;
- restrained radius;
- predictable hover, pressed, disabled, loading, and focus states.

No page-local duplicated button systems.

## Motion rule

The previous CSS-only motion policy is superseded for the approved homepage cinematic chapters.

Use:

- GSAP ScrollTrigger for the approved cinematic sequences;
- CSS for simple transitions and micro-interactions;
- native scrolling;
- semantic HTML and SVG visuals;
- complete reduced-motion alternatives.

Framer Motion may remain in existing components, but do not mix it with GSAP orchestration inside one component.

## Migration order

```text
1. design-lab token and typography specimen
2. shared product-visual primitives
3. static hero directions
4. hero motion proof
5. product-mechanism prototypes
6. approved global token implementation
7. production homepage chapters
8. shared marketing-component migration where justified
9. remove or archive obsolete theme code only through separate reviewed tasks
```

## Design linting

The existing commands remain useful:

```text
npm run lint:design
npm run lint:design:baseline
```

Before implementation, audit the design linter so it recognizes:

- Golos Text;
- JetBrains Mono;
- approved semantic token names;
- allowed GSAP client components;
- prohibited raw colors and obsolete theme patterns.

Do not rewrite the baseline merely to silence new violations. Review each exception.

## Validation

Every design-system migration packet must include:

- exact changed paths;
- desktop and mobile screenshots;
- reduced-motion evidence where relevant;
- design-lint result;
- type check or production build where appropriate;
- accessibility review;
- visual regression result after Playwright is introduced;
- confirmation that unrelated legacy styles remain untouched.

## Rule

`DESIGN.md` and `brand-spec.md` define what ProChat should look and feel like.

This file defines how the current repository moves toward that truth without uncontrolled redesign or broad migration.
