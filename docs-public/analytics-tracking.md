# Analytics Tracking

ProChat uses Umami for privacy-respecting, cookieless analytics. This document describes the tracked events exposed on the public marketing site.

## Product page actions

Product pages track two categories of user interaction using the `ProductTrackedAction` component.

### product_cta_click

Fires when a visitor activates a primary product call-to-action on a canonical product page (`/memory`, `/memory-qa`, `/workbench`).

Properties:

- `location` — `hero` or `closing` (position on the page)
- `product` — `memory`, `memory-qa`, or `workbench`
- `cta` — label of the activated action (e.g. `"Apply for Beta"`, `"View on GitHub"`)
- `source_page` — canonical route that fired the event

### outbound_funnel_click

Fires when a visitor activates a link that leads to an external destination (e.g. the GitHub repository). Properties are identical to `product_cta_click`.

## Principles

- All events are fired client-side via Umami's `trackEvent` helper.
- No personal data, identifiers, session tokens, or device fingerprints are attached to tracked events.
- Events are only attached to deliberate user interactions (clicks), not page views or passive scroll depth.
- The Umami script and website ID are supplied through environment variables (`NEXT_PUBLIC_UMAMI_SCRIPT_URL`, `NEXT_PUBLIC_UMAMI_WEBSITE_ID`). See [environment.md](environment.md) for the full contract.

## Related sources

- `src/app/(marketing)/components/product-pages/ProductTrackedAction.tsx` — client component wrapping internal links and external anchors with event tracking
- `src/app/(marketing)/components/product-pages/PublicProductPage.tsx` — product page layout that uses `ProductTrackedAction` for hero and closing CTAs
- `src/lib/analytics/umami.ts` — shared analytics helper and event-name type definitions
