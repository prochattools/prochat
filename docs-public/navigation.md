# Navigation

## Canonical marketing navigation

All public marketing routes use a single shared component: `MarketingNav` at `src/app/(marketing)/components/layout/MarketingNav.tsx`.

This component is used in three entry points:

- **Homepage** (`App.tsx`) — with a custom CTA pointing to `#current-products`
- **Product pages** (`PublicProductPage.tsx`) — with the default "Explore Memory" CTA
- **Contact, Privacy, Terms** (`Header.tsx`) — via `LegacyCompatibilityShell`

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
