# ProChat Token Architecture

**Status:** canonical repository-local token governance  
**Canonical design source:** `brand-spec.md`, `DESIGN.md`  
**Date:** 2026-07-29  
**Phase:** PXF-010 — Design-system governance and launch hardening

## Token layers

The system uses three hierarchical token layers:

### Layer 1: `--pc-foundation-*` (Foundation)

Lowest-level design system primitives. These are **immutable implementation primitives**, not meant for direct consumption in components.

**Defined in:** `src/assets/styles/prochat-foundation.css`

**Required tokens:**
```
--pc-foundation-color-page
--pc-foundation-color-surface-raised
--pc-foundation-color-surface-inset
--pc-foundation-color-text-primary
--pc-foundation-color-text-muted
--pc-foundation-color-border-subtle
--pc-foundation-color-border-strong
--pc-foundation-color-accent
--pc-foundation-color-focus-ring
--pc-foundation-color-selection-background
--pc-foundation-color-success
--pc-foundation-color-warning
--pc-foundation-color-error
--pc-foundation-space-4
--pc-foundation-container-page
--pc-foundation-container-content
--pc-foundation-container-reading
--pc-foundation-radius-md
--pc-foundation-shadow-sm
--pc-foundation-font-primary
--pc-foundation-font-technical
--pc-foundation-duration-fast
--pc-foundation-ease-standard
```

**Rules:**
- Immutable by design; breaking changes must include migration plan
- May be referenced only by higher layers, never directly by components
- Prefixed with `--pc-foundation-` to signal internal use
- Low-level values (hex colors, raw opacity, raw units)

### Layer 2: `--pc-public-*` (Semantic Public UI)

**Primary consumption layer for public-facing UI** (homepage, docs, marketing routes).

**Defined in:** `src/assets/styles/prochat-public.css` (generated/synthesized from foundation)

**Semantic naming:**
```
--pc-public-bg-rgb        → page background (foundation canvas)
--pc-public-surface-rgb   → card/panel surfaces (foundation surface)
--pc-public-surface-elevated-rgb → raised interactive surfaces
--pc-public-text-rgb      → primary text
--pc-public-muted-rgb     → secondary/disabled text
--pc-public-border-rgb    → borders at various opacities
--pc-public-accent-rgb    → global cobalt accent (#3158C7)
--pc-public-accent-strong-rgb  → accent on hover/pressed
--pc-public-ring-rgb      → focus ring color
--pc-public-shadow        → elevation shadows
--pc-public-container    → max-width for readable content
```

**Rules:**
- Always consumed as `rgb(var(--pc-public-*-rgb))` or `rgb(var(--pc-public-*-rgb) / opacity)`
- Intended for public UI (marketing, docs, legal pages)
- Scoped to `.docs-shell`, `.pm-marketing-page`, public layout shells
- No direct hex values; all use RGB custom properties for opacity control
- Applied to semantic UI roles (buttons, links, surfaces, text)

### Layer 3: `--pm-*` (Marketing Page Aliases)

**High-level marketing-page convenience aliases** that consume `pc-public-*`.

**Defined in:** `src/app/(marketing)/prochat-memory-theme.css`

**Pattern:**
```css
.pm-marketing-page {
  --pm-canvas: rgb(var(--pc-public-bg-rgb));
  --pm-surface: rgb(var(--pc-public-surface-rgb));
  --pm-text: rgb(var(--pc-public-text-rgb));
  --pm-accent: rgb(var(--pc-public-accent-rgb));
  /* etc */
}
```

**Rules:**
- Consume only `pc-public-*` tokens, never foundation directly
- Scoped to `.pm-marketing-page` to avoid affecting authenticated product surfaces
- Optional convenience layer; components may reference `pc-public-*` directly
- Used by hero sections, cards, navigation, memory-system illustrations
- Not intended for documentation or Workbench (authenticated) surfaces

## Consumption rules by surface

### Public marketing pages (/ /memory /memory-qa /workbench)

- **Primary:** `--pm-*` (convenience) or `--pc-public-*` (direct semantic)
- **Never:** `--pc-foundation-*` (internal) or design-lab experimental tokens
- **Example:** `.pm-navbar` uses `--pm-border`, `--pm-text`, `--pm-accent`

### Documentation (/docs)

- **Primary:** `--pc-public-*` (semantic public UI layer)
- **Never:** `--pc-foundation-*` or `--pm-*` (documentation is not marketing)
- **Example:** `.docs-shell` uses `var(--pc-public-accent-rgb)` for links, `var(--pc-public-text-rgb)` for text

### Authenticated/Product routes (future)

- **To be defined:** separate `--pc-product-*` or `--pc-internal-*` layer
- Protected surfaces must not consume `--pc-public-*` to prevent visual confusion with public site
- **Current status:** Authenticated surfaces are out of scope for PXF-010

## Enforced constraints

### Hex color use

- **Allowed:** Only in `prochat-foundation.css` or `brand-spec.md` (approved canonical values)
- **Forbidden:** Direct hex colors in components, pages, or theme files
- **Enforcement:** `npm run lint:design` will fail on hex in SRC files
- **Exception:** `rgb()` function is acceptable; hex is not

### Semantic alias enforcement

When a higher-level semantic token exists for a need, direct use of lower-level tokens is not permitted.

**Example violations:**
- ✗ Using `rgb(var(--pc-foundation-color-page))` in a component (should use `rgb(var(--pc-public-bg-rgb))`)
- ✗ Using raw `#3158C7` for accent (should use `rgb(var(--pc-public-accent-rgb))`)
- ✗ Marketing page using `--pc-foundation-*` directly (should use `--pm-*` or `--pc-public-*`)

**Enforcement:** Linting rules check for direct foundation use outside `prochat-foundation.css`

## Migration rules

### Adding a new token

1. Add the value to `prochat-foundation.css` with a semantic name
2. Create a `--pc-public-*` semantic alias in `prochat-public.css`
3. If marketing-specific, optionally create a `--pm-*` convenience alias in `prochat-memory-theme.css`
4. Document the semantic role (background, text, border, etc.)
5. Update this file with the new token
6. Verify no direct hex values remain in component code

### Deprecating a token

1. Identify all consumers (grep across src/)
2. Create a migration plan document in this file
3. Replace consumers with the canonical replacement token
4. Remove the token definition only after all consumers are migrated
5. Document the deprecation and replacement in this file under "Historical migrations"

### Removing duplicate aliases

Safe removals occur when:
- Duplicate token has zero consumers (verified by linting report)
- Replacement token is documented and tested
- No product surface is currently using the old token

Only then: remove from CSS, update this file, commit with evidence.

## Current state (2026-07-29, HEAD 0f1a85e)

### Canonical tokens (in use)

- `--pc-foundation-*` — complete and immutable
- `--pc-public-*` — complete and canonical for public surfaces
- `--pm-*` — complete and stable

### Out-of-date (to be deprecated)

- `brand.ts` — has outdated colors (blue `#3B82F6` instead of cobalt `#3158C7`)
  - Status: Replace with proper token reference or remove
  - Timeline: PXF-010 cleanup
  - Migration: Components should consume tokens, not hardcoded brand object

### Experimental (not canonical)

- `design-lab/` — specimen components and lab work
  - Status: Preserved for historical reference, not production
- `motion-lab/` — motion experiments
  - Status: Preserved for research, not canonical motion rules

## Design authority

**Canonical source of truth for token values:**

1. `brand-spec.md` — brand color, typography, spacing definitions
2. `DESIGN.md` — operational rules and constraints
3. `prochat-foundation.css` — actual implemented values
4. `prochat-public.css` — semantic layer definitions
5. `prochat-memory-theme.css` — convenience layer definitions

**Modifications to tokens require:**

- Evidence from brand-spec.md or DESIGN.md
- Review against canonical color/typography rules
- Documentation in this file (token-architecture.md)
- Migration plan for all consumers
- Linting verification (no new hex colors in src/)
- CI passing

## Accessibility guarantees

All `--pc-public-*` tokens meet WCAG AA contrast requirements:

- Text on background: 4.5:1 (AA standard)
- UI components: 3:1 minimum
- Focus indicators: high-contrast ring with no reliance on color alone
- Reduced motion: all animations are `:prefers-reduced-motion` safe

Enforcement: Axe/WAVE testing at CI before deploy.

## Historical migrations

(To be populated as tokens are added, deprecated, or removed)

- *None yet recorded (Phase 14 baseline)*
