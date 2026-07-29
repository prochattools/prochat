# Design System Linting Enforcement

**Status:** enforcement rules for production design governance  
**Applied:** Phase 14 (PXF-010) and beyond  
**Baseline:** scripts/design/lint-design-system.mjs

## Enforcement goals

1. **Prevent raw hex colors** outside canonical token definitions
2. **Enforce semantic token consumption** where high-level aliases exist
3. **Guard against duplicate systems** (button, navigation, typography)
4. **Prevent legacy selector reintroduction** (removed patterns must not return)
5. **Restrict unauthorized styling** (glows, special animations, unofficial gradients)

All violations are CI-fatal for production branches. Baseline violations are documented and exempted only if actively being migrated.

## Rule 1: No raw hex colors outside foundation

### Violation

Direct hex color codes in component, page, theme, or style files (src/):

```css
/* ✗ VIOLATES */
.card { background: #141a24; }
.text { color: #f5f7fa; }
```

```tsx
// ✗ VIOLATES
const bgColor = '#0B1220';
```

### Exception

Only canonical definitions are permitted hex colors:

- `src/assets/styles/prochat-foundation.css` — allowed
- `brand-spec.md` — reference values (not code)
- `.storybook/` or design-lab specimens — explicitly non-production

### Enforcement

```bash
npm run lint:design
```

Checks:
1. `HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g`
2. Search in: `.ts`, `.tsx`, `.css`, `.scss` files in `src/`
3. Exclude: `prochat-foundation.css`, `prochat-public.css`, `prochat-memory-theme.css`
4. Match exceptions: only allow in files matching `^src/assets/styles/prochat-foundation\.css$`

### Failure: Example

```
Design lint error: Unauthorized hex color found
File: src/app/(marketing)/components/Card.tsx:42
Pattern: #141a24
Guidance: Use rgb(var(--pc-public-surface-rgb)) instead
```

## Rule 2: Semantic alias enforcement

### Violation

Direct use of lower-level tokens when a higher-level semantic alias exists.

**Pattern violations:**

```css
/* ✗ VIOLATES — foundation use in component */
.element { color: rgb(var(--pc-foundation-color-text-primary)); }

/* ✗ VIOLATES — component should use public layer */
.button { background: rgb(var(--pc-foundation-color-page)); }

/* ✓ CORRECT */
.button { background: rgb(var(--pc-public-bg-rgb)); }
```

### Enforcement

```bash
npm run lint:design --check-semantic-aliases
```

Checks:
1. Files in `src/app/(marketing)/` must consume `--pm-*` or `--pc-public-*`, never `--pc-foundation-*`
2. Files in `src/app/docs/` must consume `--pc-public-*`, never `--pm-*` or `--pc-foundation-*`
3. Authenticated routes (future) must consume only their dedicated layer, never public or foundation
4. Baseline exceptions: documented in `scripts/design/design-lint-baseline.json`

### Failure: Example

```
Design lint error: Direct foundation token in component
File: src/components/Button.tsx:15
Pattern: --pc-foundation-color-accent
Replacement: --pc-public-accent-rgb
Context: Button component in marketing surface should consume semantic layer
```

## Rule 3: Duplicate systems prevention

### Violation

New button, navigation, or typography implementations when canonical versions exist.

**Forbidden:**
- Two distinct button component systems in the same codebase
- Multiple navigation patterns with different semantics
- Custom typography scale when foundation scale exists
- Unofficial focus indicators when canonical ring exists

### Enforcement

```bash
npm run lint:design --check-duplication
```

Checks:
1. Button components: verify only `src/components/Button.tsx` and `src/components/ui/Button.tsx` exist and are aliased to one canonical
2. Navigation: verify only one primary navigation component is exported
3. Typography: verify only `--pc-foundation-font-*` and family declarations exist
4. Focus indicators: verify only `--pc-public-ring-rgb` is used for focus

### Failure: Example

```
Design lint error: Duplicate button system detected
File: src/app/(marketing)/components/SecondaryButton.tsx
Guidance: Use the canonical Button component with variant prop instead
```

## Rule 4: Legacy selector guarding

### Violation

Reintroduction of removed or deprecated selector patterns.

**Forbidden selectors (explicitly removed, must not return):**

```
.hero--old
.card-v1
.button--glass
.text-gradient-purple
.neon-glow
.material-icon
```

### Enforcement

```bash
npm run lint:design --check-legacy
```

Checks:
1. Maintain list in `scripts/design/forbidden-selectors.json`
2. Scan src/ for any matching patterns
3. Fail if any forbidden selector is introduced
4. Log: file, line, guidance to migrate

### Failure: Example

```
Design lint error: Forbidden legacy selector reintroduced
File: src/components/OldButton.tsx:8
Pattern: .button--glass
Status: This pattern was removed in PXF-009
Replacement: Use --pc-public-accent-rgb with semantic styling
```

## Rule 5: Unauthorized styling restrictions

### Violation

New animations, glows, gradients, or decorative effects outside canonical motion and effect systems.

**Forbidden:**
- Custom gradient definitions (not in prochat-memory-theme.css)
- Colored glows (only neutral shadows permitted)
- Unauthorized animations (not via Framer Motion / GSAP / CSS standard)
- Purple, neon, or product-specific accents

### Enforcement

```bash
npm run lint:design --check-styling
```

Patterns:
1. `gradient\s*\(` — fail on new gradients outside `prochat-memory-theme.css`
2. `glow|bloom|halo` — fail on new glows (existing in baseline only)
3. `@keyframes\s+(?!fade|pulse|bounce)` — fail on custom animations without justification
4. `#[0-9a-f]{6}.*(?:ff00ff|00ffff|ffff00)` — fail on neon-like colors

### Baseline exceptions

Existing styles in `prochat-memory-theme.css` are approved and grandfathered.

## Rule implementation

### Baseline file

```
scripts/design/design-lint-baseline.json
```

Structure:
```json
{
  "version": "1.0",
  "date": "2026-07-29",
  "phase": "PXF-010",
  "exceptions": [
    {
      "rule": "hex-color",
      "file": "src/assets/styles/prochat-public.css",
      "reason": "Canonical token definition layer",
      "status": "permanent_exception"
    },
    {
      "rule": "custom-gradient",
      "file": "src/app/(marketing)/prochat-memory-theme.css",
      "line": 38,
      "pattern": "pm-laser-field",
      "reason": "Approved marketing visual system (DESIGN.md memo section)",
      "status": "approved_baseline",
      "migration_target": "future token system",
      "reviewed_by": "Steve Westhoek",
      "date": "2026-07-18"
    }
  ],
  "forbidden_selectors": [
    ".hero--old",
    ".card-v1",
    ".button--glass",
    ".text-gradient-purple"
  ]
}
```

### CI integration

In `.github/workflows/ci.yml`:

```yaml
- name: Design system lint
  run: npm run lint:design
  # Fails CI if:
  # - New hex colors in src/ (outside foundation)
  # - Foundation token use in component code
  # - Duplicate systems detected
  # - Legacy selectors reintroduced
  # - Unauthorized styling added
  # Unless explicitly in baseline with status: approved_baseline
```

### Local development

Before committing:

```bash
npm run lint:design
npm run lint:design:baseline  # Show exemptions
npm run lint:design --fix    # Attempt automatic fixes (token replacement)
```

## Current violations (baseline, 2026-07-29)

None. The production site has been actively refactored and aligns with canonical tokens.

### Previous violations (historical record)

- `brand.ts` — outdated hex colors; migrated to token references by PXF-010
- Duplicate button systems — consolidated by PXF-005
- Custom hero gradients — approved by DESIGN.md memo; preserved in `prochat-memory-theme.css`

## Roadmap: Future hardening

- **Phase 15:** Performance-critical font metrics (CLS checks for Golos loading)
- **Phase 16:** Animation performance auditing (reduced-motion coverage)
- **Phase 17:** Full Lighthouse and WCAG automation in CI

