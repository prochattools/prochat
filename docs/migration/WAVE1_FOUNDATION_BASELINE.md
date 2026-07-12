# Wave 1 Canonical Foundation Baseline

**Status:** Wave 1 Packet 1 additive baseline  
**Scope:** current root shell, fonts, global styles, providers, protected runtime dependencies, canonical token and font additions  
**Live shell switched:** no  
**Rollback boundary:** additive Packet 1 commit only

## Purpose

This document records the exact live foundation before ProChat introduces its canonical light-first shell. Packet 1 adds isolated canonical tokens and font definitions without importing them into the running application.

The current website remains visually and functionally unchanged during this packet.

## Canonical destination

```yaml
primary_font: Golos Text
technical_font: JetBrains Mono
secondary_font: null
accent: "#3158C7"
default_public_mode: light
color_strategy: grayscale plus one global cobalt accent
micro_interactions: local CSS
scroll: native browser scrolling
```

Canonical additive files:

```text
src/assets/styles/prochat-foundation.css
src/lib/prochat-fonts.ts
```

The originally requested `prochat-tokens.css` filename was rejected by repository path policy as credential-like. `prochat-foundation.css` is the equivalent canonical token layer and carries the same approved scope.

Neither file is a live consumer until a later approved Wave 1 packet.

## Current root layout

Source:

```text
src/app/layout.tsx
```

### Root HTML classes

The current `<html>` class value is assembled as:

```text
dark
fontSans.variable
fontBrand.variable
fontMono.variable
```

Consequences:

- dark mode is forced at the document root;
- Host Grotesk, Golos Text, and JetBrains Mono variables are all attached globally;
- the public default conflicts with the approved light-first direction;
- the live root cannot switch until protected consumers and provider behavior are isolated.

### Body classes

```text
font-body
bg-background
text-foreground
selection:bg-primary/20
dark:selection:bg-primary/40
```

The classes resolve through the current Tailwind-to-legacy-token mapping rather than the new canonical token layer.

### Root shell composition

```text
RootLayout
├── StructuredData
├── UmamiAnalytics
└── Providers
    └── AppChrome
        └── route content
```

Every public and protected route currently inherits the same root providers, theme behavior, AppChrome, metadata, analytics, fonts, and global styles.

## Current global stylesheet imports

Direct root import:

```text
src/app/layout.tsx
└── @/assets/styles/globals.scss
```

Nested global import:

```text
src/assets/styles/globals.scss
└── ./backgrounds
    └── src/assets/styles/backgrounds.scss
```

Tailwind layers are declared inside `globals.scss`:

```text
@tailwind base
@tailwind components
@tailwind utilities
```

Additional route or subsystem style entry points identified by the completed style audit:

```text
src/app/(marketing)/landing.module.css
src/app/(marketing)/prochat-memory-theme.css
src/app/(marketing)/contact/contact-page.css
src/app/waiting-list/waitlist-page.css
styles/docs.css
```

These remain untouched in Packet 1.

## Current font-loading paths

### Root `next/font` and local font loading

`src/app/layout.tsx` currently loads:

```text
Host Grotesk
- next/font/local
- src/assets/fonts/HostGrotesk-latin.woff2
- CSS variable: --font-sans
- declared weight range: 400 700

Golos Text
- next/font/google
- Latin subset
- weights: 400, 600, 700
- CSS variable: --font-brand

JetBrains Mono
- next/font/google
- Latin subset
- weights: 400, 700
- CSS variable: --font-mono
```

### Duplicate package and stylesheet loading

The root also imports:

```text
@fontsource/jetbrains-mono
```

`globals.scss` additionally loads Host Grotesk from Google Fonts through an `@import` URL.

### Route-specific historical fonts

The style audit also found:

- Inter in the old Memory theme;
- Inter Tight and Playfair Display in the old Memory page;
- Material Symbols in the legacy waitlist;
- public TTF files for Golos Text, JetBrains Mono, Host Grotesk, and Material Symbols used by OG, legacy, or uncertain consumers.

Packet 1 removes none of these paths. The new font module remains unconsumed and introduces no additional runtime request.

## Current providers and protected runtime dependencies

Source:

```text
src/components/providers.tsx
```

Current root providers and client dependencies:

```text
next-themes ThemeProvider
- class-based theme attribute
- storage key: theme
- themes: light, dark
- default theme: dark
- system preference enabled

react-hot-toast Toaster
- dynamically imported
- client only
- global transactional/application feedback

react-tooltip Tooltip
- dynamically imported
- client only
- global tooltip registry
```

The provider wraps children in:

```text
min-h-screen bg-background text-foreground
```

A separate `src/components/theme-provider.tsx` also wraps `next-themes`, but current direct-consumer evidence is uncertain.

Protected dependencies that block a blind root-shell replacement include:

- authentication and account routes;
- admin and licence controls;
- dashboard, chat, projects, and preferences;
- Stripe checkout, portal, subscription, webhook, and success flows;
- purchaser claim and finish flows;
- Contact, unsubscribe, and transactional email;
- Prisma/PostgreSQL-backed behavior;
- analytics, toast, tooltip, health, and operational feedback.

## Public versus protected shell dependency

### Public platform

Public routes currently depend on the same root layout, providers, AppChrome, Header/Footer behavior, metadata, analytics, dark theme, global font variables, and legacy CSS as protected routes.

### Protected internal or transactional application

Protected routes also inherit the public shell. They may depend on:

- current `bg-background`, `text-foreground`, border, surface, and shadow aliases;
- dark mode as the default;
- global toaster and tooltip providers;
- theme storage and hydration behavior;
- AppChrome navigation and layout;
- legacy form, payment, licence, and dashboard styling.

The later shell switch must either preserve compatibility aliases temporarily or introduce a separate protected shell before legacy globals are disabled.

## Current theme and motion behavior

### Forced dark mode

Both the root `<html>` class and `Providers` default theme select dark mode.

### Theme switching

The current system uses:

- `next-themes`;
- a class-based theme attribute;
- a persisted `theme` storage key;
- system-theme detection;
- a radial overlay transition;
- a separate theme toggle and theme provider.

### Global transitions

`globals.scss` applies 650ms background and color transitions to `html` and `body`, and applies background, color, and border transitions to every element and pseudo-element.

Reduced-motion CSS disables these transitions, but the broad default still affects the entire application.

### Background effects

`backgrounds.scss` provides:

- fixed full-page decorative layers;
- light and dark hero-line assets;
- blurred mixed-blend-mode shapes;
- multiple infinite keyframes;
- `will-change` hints;
- purple, cyan, and old blue visual values;
- reduced-motion handling.

The root layout preloads both current hero-line assets.

### Selection and inline root CSS

`src/app/layout.tsx` injects inline body smoothing, horizontal overflow control, and selection colors through `BASE_STYLE_OVERRIDES`.

Packet 1 changes none of this behavior.

## Current CSS entry points and authority conflicts

| Source | Current responsibility | Canonical status |
|---|---|---|
| `src/assets/styles/globals.scss` | Tailwind layers, global tokens, themes, transitions, root rules | legacy foundation; later replacement |
| `src/assets/styles/backgrounds.scss` | decorative background effects and keyframes | later archive/removal candidate |
| `tailwind.config.ts` | maps utilities to legacy CSS variables and container rules | later canonical remapping |
| `src/app/(marketing)/landing.module.css` | marketing root styles | legacy route styling |
| `src/app/(marketing)/prochat-memory-theme.css` | old editorial Memory palette and overrides | archive after `/memory` replacement |
| `src/app/(marketing)/contact/contact-page.css` | Contact form styling | rewrite with canonical form system |
| `src/app/waiting-list/waitlist-page.css` | legacy waitlist and Material Symbols | archive after new mailing list |
| `styles/docs.css` | Nextra glass-oriented documentation adapter | rewrite or archive after docs decision |

## Current Tailwind mappings

Current Tailwind configuration uses class-based dark mode and scans active route, component, view, and `src` roots.

### Container

```yaml
center: true
padding: var(--pc-page-gutter)
2xl_max: 1320px
```

### Typography

```text
font-sans → --font-sans
font-brand → --font-brand
font-heading → --font-brand then --font-sans
font-body → --font-sans
font-mono → --font-mono
```

### Colors and surfaces

Tailwind maps its public aliases to legacy variables including:

```text
--blue-*
--pc-blue-*
--pc-gray-*
--pc-bg-rgb
--pc-surface-rgb
--pc-text-rgb
--pc-muted-rgb
--pc-border-rgb
--pc-ring-rgb
```

### Layout and effects

Tailwind also maps:

- page gutter and reading width;
- legacy surface, elevated, and inset shadows;
- old primary and secondary blue aliases;
- card, ring, and border aliases;
- current animation utilities and dark variants.

Packet 1 does not change Tailwind configuration.

## Canonical additive decisions

### Token namespace

The new token file uses a distinct `--pc-foundation-*` namespace. It does not overwrite current `--pc-*`, `--brand-*`, or Tailwind-facing aliases while unconsumed.

### Font variables

The new module exposes:

```text
--font-prochat-sans
--font-prochat-mono
```

These do not replace the current root variables until the later shell packet.

### Token categories

The additive token file contains only documented values for:

- page and surface colors;
- text and border colors;
- cobalt interaction colors;
- focus and selection;
- semantic status states;
- 4px-based spacing;
- canonical page, content, and reading widths;
- responsive gutters and grid columns;
- radii;
- restrained neutral shadows;
- Golos Text and JetBrains Mono roles;
- canonical type scale, line height, tracking, and reading measures;
- CSS micro-interaction durations and easing values.

It contains no style rule that changes live rendering.

## Files intentionally untouched

```text
src/app/layout.tsx
src/assets/styles/globals.scss
src/assets/styles/backgrounds.scss
tailwind.config.ts
src/components/providers.tsx
src/components/theme-provider.tsx
src/components/AppChrome.tsx
src/components/Header.tsx
src/app/**
public/**
package.json
lockfiles
```

No route, page, Header, Footer, provider, metadata, redirect, form, API, asset, package, or archive entry changes in Packet 1.

## Rollback boundary

Packet 1 is additive and rollback-safe.

Rollback removes or reverts only:

```text
docs/migration/WAVE1_FOUNDATION_BASELINE.md
src/assets/styles/prochat-foundation.css
src/lib/prochat-fonts.ts
scoped canonical-foundation validation in scripts/design/lint-design-system.mjs
docs/product/agent-mode-progress.md
```

Because the new source files have no live consumers, reverting Packet 1 cannot change the current application appearance or protected runtime behavior.

## Blockers for the live root-shell switch

1. Decide whether protected routes keep a temporary legacy shell or receive a separate internal shell.
2. Map every `--pc-*` and Tailwind utility consumer that requires compatibility aliases.
3. Decide public dark-mode removal versus temporary user-theme compatibility.
4. Define the canonical Header, Footer, AppChrome, skip link, and provider composition.
5. Verify toast, tooltip, analytics, auth, commerce, licence, Contact, and application behavior outside the legacy shell.
6. Decide when Host Grotesk, Fontsource JetBrains Mono, Material Symbols, old Google Font imports, and route-specific fonts can stop loading.
7. Replace root selection, theme color, metadata, and hero preloads in a separately reviewed packet.
8. Capture mobile and protected-route screenshot baselines before the live switch.
9. Establish temporary compatibility aliases or complete consumer migration before disabling legacy global variables.
10. Obtain visual, accessibility, performance, and protected-flow approval for the actual shell change.

## Packet 1 completion gate

Packet 1 is complete only when:

- the canonical token and font files exist but have zero live consumers;
- scoped foundation validation passes;
- archive-boundary validation still passes;
- the font module type-checks;
- forbidden legacy terminology and effects are absent from the new files;
- package and lockfiles remain unchanged;
- the live root shell and all protected dependencies remain unchanged;
- the exact additive paths are committed together.
