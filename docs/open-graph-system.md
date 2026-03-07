# Open Graph System

## Global OG

Global Open Graph image generation lives at:

- `src/app/og/route.ts`

Implementation:

- uses `next/og` `ImageResponse`
- runs on the Node runtime
- uses centralized tokens from `src/lib/brand.ts`
- uses centralized font loading from `src/lib/ogFonts.ts`
- uses shared SVG helpers from `src/lib/og-utils.ts`

Properties:

- dark-mode-first visual language
- deterministic token-driven layout
- no manual image export workflow
- no per-page design duplication

The route produces the default root-domain social image used by marketing and site-wide metadata.

## Blog OG

Dynamic blog OG generation lives at:

- `src/app/blog/[slug]/og/route.ts`

It loads the blog entry through the existing blog loader and renders:

- category or pillar badge
- article title
- description
- footer metadata

This means every valid blog post receives a generated OG image automatically. No separate design file, screenshot, or PNG asset is required per post.

## Metadata Wiring

Global metadata is normalized through:

- `src/app/layout.tsx`
- `src/lib/seo/metadata.ts`

Blog metadata overrides the image route per slug through:

- `src/app/blog/[slug]/page.tsx`

The pattern is:

- site default uses `/og`
- blog post pages use `/blog/[slug]/og`

No manual absolute OG URL management is required beyond setting `NEXT_PUBLIC_SITE_URL`.

## Font + Token Sources

Central token source:

- `src/lib/brand.ts`

Central OG font loader:

- `src/lib/ogFonts.ts`

Loaded fonts:

- `public/fonts/GolosText-Regular.ttf`
- `public/fonts/GolosText-Bold.ttf`
- `public/fonts/JetBrainsMono-Regular.ttf`

These are loaded directly at generation time so OG rendering stays visually aligned with the rest of the system.

## Philosophy

The OG system is intentionally:

- token-driven
- deterministic
- centralized
- cache-friendly
- build-safe for Dokploy

It avoids:

- manual image creation
- runtime API handlers for image assets outside the App Router OG routes
- duplicated colors or layout constants
- route-specific styling drift
