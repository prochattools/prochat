# Navigation

## Canonical marketing navigation

All public marketing routes use a single shared component: `MarketingNav` at `src/app/(marketing)/components/layout/MarketingNav.tsx`.

This component is used in three entry points:

- **Homepage** (`App.tsx`) — with a custom CTA pointing to `#current-products`
- **Product pages** (`PublicProductPage.tsx`) — with the default "Explore Memory" CTA
- **Contact, Privacy, Terms** (`Header.tsx`) — via `LegacyCompatibilityShell`
- **Docs** (`DocsThemeLayout.tsx`) — via `<Header forceVisible />`

The CSS required by `MarketingNav` (`pm-navbar`, `pm-site-header`, `pm-pill-button`, etc.) is loaded via three entry points:
- `src/app/(marketing)/layout.tsx` — covers all `(marketing)` route group pages (homepage, product pages, contact, privacy, terms)
- `src/app/docs/layout.tsx` — ensures Next.js attaches the CSS to the docs route module graph (required for correct CSS chunk splitting)
- `src/app/docs/DocsThemeLayout.tsx` — secondary import for the docs shell; redundant with the layout import but kept for explicitness

### Component API

```tsx
<MarketingNav />
<MarketingNav cta={{ label: 'Choose a product', href: '#current-products', trackingCta: 'choose_product_path' }} />
<MarketingNav cta={null} /> // CTA suppressed
```

The `cta` prop is optional. When omitted, defaults to `{ label: 'Explore Memory', href: '/memory', trackingCta: 'explore_memory' }`. Pass `null` to suppress the CTA entirely.

### Analytics

CTA clicks fire `nav_cta_click` via `trackEvent` (Umami). Payload:

```json
{
  "location": "header | mobile_header",
  "product": "prochat_memory",
  "cta": "<trackingCta string>",
  "source_page": "<current pathname>"
}
```

### Nav items

```
/memory          Memory
/memory-qa       Memory for QA
/workbench       Workbench
/docs            Documentation
```

`aria-current="page"` is set on the active link via `usePathname`. The component is a client component (`'use client'`) for this reason.

### Logo

Uses the shared `Logo` component at `scale={0.62}`. The logo mark and wordmark inherit `currentColor`. Both the canonical navbar and shared footer apply the global `--pm-accent` token, keeping the ProChat brand color aligned with the navigation links from one centrally defined source.

## Contact page

The contact form is the sole content of `/contact` — no supplementary sections. The submit button uses `pm-pill-button pm-pill-button--light` class.

## Design system token layer

All marketing pages are scoped under `.pm-marketing-page`. The canonical token set is defined inside that scope in `prochat-memory-theme.css`:

| Token | Purpose |
|-------|---------|
| `--pm-canvas` | Page background |
| `--pm-surface` | Card/surface background |
| `--pm-surface-raised` | Elevated surface (form panels) |
| `--pm-text` | Primary text |
| `--pm-text-secondary` | Secondary/muted text |
| `--pm-text-muted` | Further-muted text |
| `--pm-text-faint` | Faintest text (index numbers, decorative) |
| `--pm-border` | Standard border |
| `--pm-border-subtle` | Slightly softer border |
| `--pm-border-faint` | Faintest border |
| `--pm-accent` | Brand accent (teal) |
| `--pm-accent-soft` | Semi-transparent accent for glows |
| `--pm-radius-card` | Card border-radius |
| `--pm-radius-panel` | Panel border-radius |
| `--pm-page-gutter` | Horizontal page padding |
| `--pm-content-max` | Maximum content width |
| `--pm-ease` | Standard easing curve |

All these tokens resolve from the canonical `--pc-public-*` raw color values defined in `:root` in `globals.scss`. Component-local CSS that targets marketing surfaces must use `pm-*` aliases, not raw `pc-public-*` tokens directly (except for alpha-variant expressions like `rgb(var(--pc-public-accent-rgb) / 0.75)` where no `pm-*` alias provides the correct alpha).
