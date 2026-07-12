# ProChat Style Audit

**Status:** Phase 5 Task 5.3 inventory complete  
**Inventory date:** 2026-07-11  
**Scope:** global CSS, SCSS, CSS Modules, page-local styles, Tailwind and PostCSS configuration, root fonts and themes, inline style systems, email-safe styles, responsive rules, and legacy product themes

## Summary

```yaml
stylesheet_files: 7
configuration_and_root_style_sources: 5
style_records: 12
production_files_changed: 0
fonts_changed: 0
tokens_changed: 0
themes_changed: 0
```

Audited stylesheet files:

```text
src/app/(marketing)/contact/contact-page.css
src/app/(marketing)/landing.module.css
src/app/(marketing)/prochat-memory-theme.css
src/app/waiting-list/waitlist-page.css
src/assets/styles/backgrounds.scss
src/assets/styles/globals.scss
styles/docs.css
```

Audited configuration and root style sources:

```text
tailwind.config.ts
postcss.config.js
src/app/layout.tsx
src/components/theme-provider.tsx
src/components/providers.tsx
```

Inline styles inside components are recorded in the component and motion audits. Transactional email inline styles are protected until the email and legal migration packet.

## Approved clean-slate policy

The user explicitly approved an archive-first clean-slate migration:

- legacy styling, themes, products, scaffolding, old global values, old pages, old functionality, and old integrations should not become the foundation of the new website;
- anything contradicting current canonical documentation should be archived by default;
- useful prior work may remain accessible in an archive for later reference;
- ProChat OS and BuildFlow are not current products and must be removed from the future public platform after replacement, archival, redirect, and compatibility checks;
- waiting-list, newsletter, MailerLite, GitHub, kit, proof, pricing, and historical integration styling is legacy unless re-approved for a new implementation;
- the new public platform starts from canonical documents, canonical tokens, approved product visuals, and a lean component system.

This authorization does not permit destructive file changes inside this inventory task. Archive and removal execution remains dependency-gated and separately committed.

## Canonical destination

```text
src/assets/styles/prochat-tokens.css
canonical global base styles
small scoped CSS/SCSS Modules for components and product visuals
Tailwind utilities mapped to semantic tokens
email-safe token subset for transactional email
```

Canonical visual foundation:

```yaml
primary_font: "Golos Text"
technical_font: "JetBrains Mono"
secondary_font: null
color_strategy: "grayscale plus ProChat Cobalt #3158C7"
default_mode: "light"
product_specific_palettes: false
colored_glow_shadows: false
smooth_scroll_engine: null
```

## Font systems discovered

### Current root fonts

- Host Grotesk local WOFF2 as `--font-sans`.
- Golos Text through `next/font/google` as `--font-brand`.
- JetBrains Mono through both `next/font/google` and `@fontsource/jetbrains-mono` as `--font-mono`.
- Host Grotesk also loaded through a Google Fonts `@import` in `globals.scss`, duplicating the local font.

### Legacy or route-specific fonts

- Inter in `prochat-memory-theme.css`.
- Inter Tight, Inter, Playfair Display, and JetBrains Mono loaded through a page-level Google Fonts import in `src/app/prochat-memory/page.tsx`.
- Material Symbols Outlined local TTF in `waitlist-page.css`.
- System, Segoe UI, Roboto, SF Mono, Menlo, Monaco, and Consolas fallbacks throughout Tailwind and page-local styles.

### Decision

- Golos Text becomes the only public primary font.
- JetBrains Mono remains the technical font.
- Host Grotesk, Inter, Inter Tight, Playfair Display, duplicate JetBrains loading, Material Symbols, and legacy route font imports are archive/removal candidates after their consumers are migrated.
- Transactional email uses an email-safe fallback stack and must not depend on web-font loading.

## Token systems discovered

### Global `--pc-*` system

`globals.scss` defines a large legacy token family covering:

- typography;
- blue and gray scales;
- RGB aliases;
- backgrounds and surfaces;
- borders;
- shadows;
- radii;
- hero scales;
- page gutters;
- reading widths;
- button dimensions;
- light and dark modes.

The system contains useful structural ideas but conflicts with canonical values and includes glow-oriented blue tokens.

### Duplicate blue and gray aliases

The repository contains both:

```text
--blue-*
--gray-*
```

and:

```text
--pc-blue-*
--pc-gray-*
```

plus semantic aliases such as background, surface, text, muted, border, primary, ring, and card.

### Background-motion tokens

`backgrounds.scss` defines blob opacity, blur, blend mode, image assets, glow levels, durations, drift, and animation easing.

These are legacy visual-effect tokens and should not survive as global foundation tokens.

### Warm editorial route tokens

`prochat-memory-theme.css` and the legacy Memory page define:

```text
paper
paper-warm
paper-dark
ink
coral
mustard
olive
bone
line
shadow
serif
sans
body
mono
```

This is a separate brand system and directly conflicts with the approved grayscale/cobalt system.

### Nextra documentation tokens

`styles/docs.css` maps the legacy `--pc-*` variables into Nextra-oriented hue, surface, border, shadow, and glass effects.

### Decision

- Create one new semantic token layer from `brand-spec.md`.
- Do not extend or rename the legacy systems in place as the new foundation.
- Archive legacy token sources after current consumers migrate.
- Retain compatibility aliases only temporarily and only when an exact migration packet proves they reduce risk.

## Theme systems discovered

1. Root class-based dark mode forced by `className="dark"` in `src/app/layout.tsx`.
2. Light/dark `--pc-*` global variables.
3. `ThemeToggle` and radial theme-transition overlay.
4. Animated blob backgrounds with light/dark assets.
5. Warm editorial Memory theme using paper, coral, mustard, and olive.
6. Glassy blue documentation theme.
7. Waitlist-specific Material Symbols and status styling.
8. Contact-specific form theme.
9. Tailwind `dark:` variants across components.
10. Transactional email inline themes.

### Decision

- The new website is light-first.
- A dark technical panel treatment may exist inside approved sections; a broad competing dark-site system is not foundational.
- The current global forced-dark class, theme toggle, radial theme overlay, blob backgrounds, warm Memory theme, and glassy docs theme are archive/replace candidates.
- Protected application and transactional surfaces remain unchanged until their separate scope is approved.

## Raw colors, gradients, and glow systems

### Confirmed global conflicts

- Indigo radial theme overlay using `rgba(99, 102, 241, ...)`.
- Legacy blue scale around `rgb(91 124 255)` rather than canonical cobalt.
- Purple and cyan blob colors in `backgrounds.scss`.
- Animated blur, mix-blend-mode, noise, radial gradients, and glow variables.
- Warm paper, coral, mustard, olive, and bone theme.
- Green and red status colors hard-coded in Contact and waitlist styles.
- Dark glass surfaces and backdrop filters in docs.
- Raw code-block and focus colors in documentation styling.

### Decision

- Archive effect-oriented global backgrounds and route palettes.
- Reintroduce status colors through canonical semantic tokens only.
- Keep raw values only where required for standards, email rendering, or third-party integration and document the exception.
- Do not carry gradients or glow forward by default.

## Layout, spacing, radius, and breakpoint conflicts

### Containers

- Tailwind container: `1320px` at `2xl` with global page gutter.
- Legacy Memory `.container`: `1360px`, wide `1480px`, fixed `64px` padding.
- Memory-theme `.pm-container`: `min(100% - 48px, 1360px)`.
- Marketing sections use `1120px`, `5xl`, and page-local arbitrary widths.
- Docs and legal pages use their own article widths and padding.

### Breakpoints

- Tailwind default breakpoints.
- Explicit CSS `768px` and other local media queries.
- JavaScript mobile breakpoint `768` in `useScrollDirection`.
- Page-level custom breakpoint behavior in the legacy Memory page.

### Radius systems

- Legacy global button radius `0.75rem`.
- Contact radius `0.875rem`.
- Memory-theme forced radius `14px`.
- Docs radii from `0.5rem` to `1.5rem`.
- Tailwind rounded utilities and arbitrary values.
- Canonical radii from 4px through 24px.

### Spacing

- Legacy `--pc-page-gutter` and page-specific clamp values.
- Fixed 48px and 64px container gutters.
- Tailwind spacing utilities.
- Page-local arbitrary pixel and rem spacing.

### Decision

- Adopt canonical 4px-based spacing and documented responsive containers.
- Treat all existing widths and breakpoints as audit evidence, not authority.
- Use purpose-based containers rather than one universal width.
- Remove page-specific emergency breakpoint systems after approved mobile compositions exist.

## Cascade and specificity hazards

### Global universal transitions

`globals.scss` applies 650ms background, color, and border transitions to every element and pseudo-element.

Risks:

- unexpected animation across the whole application;
- expensive style and paint work;
- delayed state feedback;
- reduced-motion complexity;
- hard-to-debug inheritance.

### `!important` overrides

The theme toggle and warm Memory theme use repeated `!important` rules to override Tailwind and global classes.

### Broad selectors

- universal selectors;
- global heading and element selectors;
- `:is(...)` overrides targeting Tailwind classes;
- docs selectors coupled to Nextra internals;
- route themes overriding shared components by class name.

### Import-order dependence

- Tailwind layers;
- globals importing backgrounds;
- route-level CSS imports;
- inline root layout `<style>`;
- page-level CSS strings;
- Tailwind utility order;
- third-party docs styles.

### Decision

- Do not preserve this cascade as the new foundation.
- Establish a small global base and scoped component styles.
- Remove universal transitions.
- Remove `!important`-based route theming after consumer migration.
- Avoid coupling new styles to generated third-party class structures without an explicit adapter layer.

## Accessibility risks

- forced dark mode conflicts with approved light default and user expectations;
- global transitions can affect motion-sensitive users;
- some reduced-motion coverage exists but is incomplete;
- route themes override focus colors and may produce inconsistent contrast;
- hard-coded success and error colors can drift from semantic labels;
- docs glass and muted text require contrast validation;
- theme-toggle focus styling is custom and coupled to the old system;
- animated backgrounds and blend modes may reduce readability;
- page-level font imports can cause layout shifts.

## Performance risks

- Google Fonts CSS import plus local/Next font duplication;
- duplicate JetBrains Mono loading;
- preloaded light and dark hero-line assets;
- global 650ms transitions;
- fixed animated blob layer with blur, blend modes, filters, and infinite keyframes;
- data-URI noise textures;
- backdrop filters in docs;
- 69KB page-embedded CSS in legacy Memory page;
- route-level Google Font import and multiple font families;
- broad Tailwind scan paths and legacy utility generation;
- inline style and page-specific CSS duplication.

## Protected style boundaries

Do not archive or alter these until their owning migration packet is approved:

- authentication screens and provider styling;
- admin screens;
- checkout, billing, licence, and purchaser flows;
- Contact and personal-data form behavior;
- email inline styling;
- current application shell required by protected routes;
- third-party documentation styling while current docs remain accessible.

Protected does not mean canonical. It means replacement requires functional evidence.

## Style records

| ID | Source | Technology | Scope and consumers | Main findings | Status | Disposition | Destination | Wave | Risk |
|---|---|---|---|---|---|---|---|---:|---|
| STYLE-001 | `src/assets/styles/globals.scss` | global SCSS + Tailwind layers | entire app | Host Grotesk import, duplicate token systems, forced global transitions, light/dark variables, theme overlay, smooth scroll, broad selectors | LEGACY/UNSAFE | REPLACE then ARCHIVE | canonical global base + `prochat-tokens.css` | 1/8 | CRITICAL |
| STYLE-002 | `src/assets/styles/backgrounds.scss` | global SCSS | global shell and marketing backgrounds | animated blobs, blur, blend modes, purple/cyan gradients, noise, light/dark hero assets, infinite keyframes | LEGACY | ARCHIVE | no default replacement; approved product visuals only | 1/8 | HIGH |
| STYLE-003 | `src/app/(marketing)/landing.module.css` | CSS Module | marketing root | Host/legacy `--font-sans`, selection color tied to old blue token | LEGACY | REWRITE/ARCHIVE | page shell using canonical fonts/tokens | 3/8 | MEDIUM |
| STYLE-004 | `src/app/(marketing)/prochat-memory-theme.css` | scoped global CSS | marketing pages using `.pm-marketing-page` | warm paper/coral/olive system, Inter, noise, broad `:is`, `!important`, forced radii/shadows | CONTRADICTING | ARCHIVE | canonical light grayscale/cobalt page system | 3/8 | CRITICAL |
| STYLE-005 | `src/app/(marketing)/contact/contact-page.css` | route CSS | Contact forms | useful form states but legacy tokens, local radii, raw success colors, duplicated transitions | LEGACY FUNCTIONAL | REWRITE after form audit | canonical form components and semantic status tokens | 6/8 | HIGH |
| STYLE-006 | `src/app/waiting-list/waitlist-page.css` | route CSS + font face | waitlist | Material Symbols font, legacy token usage, raw status colors; owning functionality is legacy | LEGACY | ARCHIVE | future mailing-list form system | 6/8 | HIGH |
| STYLE-007 | `styles/docs.css` | third-party adapter CSS | Nextra docs | glass surfaces, backdrop filters, old blue tokens, third-party selector coupling | LEGACY ADAPTER | ARCHIVE/REWRITE | current-product docs adapter | 6/8 | HIGH |
| STYLE-008 | `tailwind.config.ts` | Tailwind config | entire app | old tokens, duplicate brand/sans/heading/body mappings, old colors/shadows, broad content paths | LEGACY CONFIG | REWRITE | canonical semantic Tailwind mapping | 1/8 | CRITICAL |
| STYLE-009 | `postcss.config.js` | build config | CSS build | functional build configuration; no design authority | CURRENT FUNCTIONAL | KEEP/VERIFY | minimal PostCSS setup | 1 | HIGH |
| STYLE-010 | `src/app/layout.tsx` | root layout + inline CSS | entire app | forced dark class, Host local font, Golos + JetBrains, duplicate JetBrains package, preloaded legacy hero assets, inline style overrides | LEGACY SHELL | REWRITE behind protected boundary | canonical light-first root shell | 1 | CRITICAL |
| STYLE-011 | `src/components/theme-provider.tsx` | client theme provider | potential theme consumers | currently static-consumer uncertainty; tied to old class theme system | LEGACY/UNVERIFIED | ARCHIVE or protected compatibility | approved theme boundary only if required | 1/8 | HIGH |
| STYLE-012 | `src/components/providers.tsx` | provider boundary | full application | protected runtime boundary; may carry theme or app providers | FUNCTIONAL/PROTECTED | KEEP then REFACTOR | minimal provider composition | protected/1 | CRITICAL |

## Zero-consumer candidates requiring proof

Potential style/config candidates with unclear or legacy-only consumers:

- `theme-provider.tsx`;
- Material Symbols font and waitlist stylesheet;
- warm Memory theme after legacy pages archive;
- blob background system after current shell replacement;
- landing CSS Module after homepage replacement;
- docs adapter after docs strategy is rebuilt.

No file is authorized for immediate deletion. Archive/removal requires exact import, route, build, protected-functionality, and rollback proof.

## Migration sequence

1. Freeze legacy styles from further extension.
2. Build canonical tokens and base styles in isolation.
3. Build new shell and design lab against the new layer.
4. Keep old styles scoped only to old routes during coexistence.
5. Rebuild public pages from canonical documentation.
6. Archive old pages and their route-local themes.
7. Remove legacy global imports only after protected routes are mapped or isolated.
8. Prove absence of old fonts, variables, themes, assets, and imports.

## Validation required before execution

- exact style import graph;
- font request and layout-shift inspection;
- CSS bundle report;
- raw color and token search;
- cascade/specificity review;
- visual regression;
- contrast and focus validation;
- 320px–1728px responsive screenshots;
- protected route smoke tests;
- type check and production build;
- zero-consumer proof before archive/removal.

## Unresolved decisions

1. Whether protected authenticated/admin routes temporarily retain the old shell or move to a separate internal shell.
2. Whether public dark mode is removed entirely or deferred after the light-first launch.
3. Whether current docs remain accessible during the new public-platform launch or move immediately to an archive.
4. Which email-safe colors and layout tokens form the transactional email subset.
5. Which legacy purchasers still require kit and commerce page styling.
6. Whether Tailwind remains the primary layout utility after the lean foundation is built; current plan says yes, with canonical mappings.
7. Exact archive location and build exclusion strategy for old styles and pages.
