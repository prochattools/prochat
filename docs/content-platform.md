# ProChat Content Platform

This document describes the current root-domain content and SEO system in ProChat.

## Content surfaces

The content platform is MDX-driven and currently serves these public surfaces:

- `/learn`
- `/learn/saas-starting-point`
- `/learn/production-guide`
- `/docs`
- `/prompts`

The root sitemap also exposes the main marketing and product pages (`/`, `/contact`, `/proof`, `/kits`, `/kits/prokit`, `/kits/saaskit`, `/starting-point`).

The section configuration is defined in [config.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/lib/content/config.ts).

## Content roots

Current source roots include:

- docs: `src/content/docs`
- prompts: `src/lib/content/prompts`
- production-guide source: `src/content/learn/production-guide.mdx`

The public `/docs` section is generated content. It is not the same as the internal `/docs` folder in the repo root.

## Route model

The route tree is owned inside the Next.js app:

- learn routes live under `src/app/learn/*`
- the standalone Starting Point landing page lives under `src/app/starting-point/page.tsx`
- docs detail pages live under `src/app/docs/[category]/[[...slug]]`
- prompt detail pages live under `src/app/prompts/[category]/[slug]`
- the legacy blog route remains only as a compatibility layer for the retained production guide and OG/share support

This keeps the content graph on the root domain while sharing the same build and deployment pipeline as the rest of the app.

## Generated assets

The content platform also generates site assets at build time:

- Open Graph images
- `sitemap.xml`
- section sitemaps for `/docs` and `/learn`

The public docs router does not pre-render every doc page during `next build`. It prebuilds the core docs entry points and serves the rest of the retained public docs on demand so deploy builds stay leaner while `/docs` remains fully available.

Current indexing posture:

- `/docs` and `/learn` remain in sitemap output and are indexable
- `/prompts` stays live but is intentionally `noindex` while the prompt library remains thin
- removed surfaces such as blog corpus, glossary, snippets, playbooks, guides, and `/saas-glossary` are not emitted by sitemap generation

Relevant scripts:

- `npm run generate:social`
- `npm run sitemap`

## Publishing model

Publishing is build-driven.

The repo does not use:

- runtime cron publishing
- live post publication toggles outside deploy/build flow

Instead, content visibility is determined by the build output and the MDX content state that exists at build time.

## SEO helpers

SEO behavior is centralized through shared helpers and content loaders rather than route-specific ad hoc logic.

This includes:

- metadata helpers
- taxonomy helpers
- content loaders
- OG generation
- sitemap generation

## Relationship to the docs pipeline

The content platform consumes generated docs from `src/content/docs`.

Those files are produced by the docs automation system described in [scripts/docs/README.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/docs/README.md).

## Manual search follow-up

After a production deploy:

1. resubmit `/sitemap.xml` in Google Search Console
2. request indexing manually for the retained priority surfaces when a refresh is needed

ProChat does not auto-submit those URLs during runtime startup.

## Related references

- [overview.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/overview.md)
- [open-graph-system.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/open-graph-system.md)
