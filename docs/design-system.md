# Design System

## Brand Tokens

The centralized token source is:

- `src/lib/brand.ts`

The token model covers:

- color tokens
- surface tokens
- gradient tokens
- radius tokens
- spacing tokens
- typography tokens
- depth tokens
- motion tokens
- effect tokens

Global CSS variables and shared utility classes are mapped in:

- `src/assets/styles/globals.scss`

## Hero System

The reusable marketing hero component is:

- `src/components/marketing/HeroSection.tsx`

Hero rules:

- use the shared hero component instead of custom hero markup
- line backgrounds must use:
  - `public/assets/backgrounds/hero-main-lines-dark.svg`
  - `public/assets/backgrounds/hero-main-lines-light.svg`
- grid overlays are not allowed inside hero sections
- hero background layers stay absolute, non-interactive, and behind content
- dark-mode depth overlays are allowed only in dark mode

The hero system is standardized for:

- headline scale
- max width
- line-height
- CTA spacing
- background layering

## Button System

The shared button implementation is:

- `src/components/ui/Button.tsx`

Marketing-facing wrapper:

- `src/app/(marketing)/components/ui/Button.tsx`

Primary button variants:

- `primary`
- `secondary`
- `tertiary`
- `ghost`
- `nav`

Rules:

- no inline button styles
- no per-page duplicated button class definitions
- border radius, height, padding, label treatment, and transitions come from the shared system

## Typography Scale

Shared typography tokens are defined in:

- `src/lib/brand.ts`
- `src/assets/styles/globals.scss`

Usage rules:

- `H1` = hero only
- `H2` = section title
- `H3` = card title
- `H4` = micro header / supporting header

Arbitrary one-off text scaling should be removed in favor of shared hero and section heading classes.

## Motion System

Motion is intentionally restrained.

Rules:

- dark-mode only ambient halo/glow motion
- CSS-only implementation
- no JS animation hooks required
- reduced-motion compliant
- animate `transform` and `opacity` only

The motion system is defined across:

- `src/lib/brand.ts`
- `src/assets/styles/globals.scss`
- `src/components/marketing/HeroSection.tsx`

It is meant to create depth, not call attention to itself.
