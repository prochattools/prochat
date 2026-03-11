# ProChat Content Platform

This document describes the current root-domain content and SEO system in ProChat.

## Content surfaces

The content platform is MDX-driven and currently serves these sections:

- `/blog`
- `/docs`
- `/guides`
- `/glossary/[term]`
- `/saas-glossary` as the glossary hub
- `/snippets`
- `/prompts`
- `/playbooks`

The section configuration is defined in [config.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/lib/content/config.ts).

## Content roots

Current source roots include:

- blog: `src/lib/content/blog`
- docs: `src/content/docs`
- glossary: `content/glossary` and `src/lib/content/glossary`
- guides: `src/lib/content/guides`
- snippets: `src/lib/content/snippets`
- prompts: `src/lib/content/prompts`
- playbooks: `src/lib/content/playbooks`

The public `/docs` section is generated content. It is not the same as the internal `/docs` folder in the repo root.

## Route model

The route tree is owned inside the Next.js app:

- blog detail pages live under `src/app/blog/[slug]`
- docs detail pages live under `src/app/docs/[category]/[[...slug]]`
- glossary terms live under `src/app/glossary/[term]`
- guides, prompts, snippets, and playbooks each have their own nested route trees

This keeps the content graph on the root domain while sharing the same build and deployment pipeline as the rest of the app.

## Generated assets

The content platform also generates site assets at build time:

- Open Graph images
- `sitemap.xml`
- section sitemaps
- `rss.xml`

Relevant scripts:

- `npm run generate:social`
- `npm run sitemap`
- `npm run rss`

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
- RSS generation

## Relationship to the docs pipeline

The content platform consumes generated docs from `src/content/docs`.

Those files are produced by the docs automation system described in [scripts/docs/README.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/docs/README.md).

## Related references

- [overview.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/overview.md)
- [open-graph-system.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/open-graph-system.md)
- [blog-system.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/blog-system.md)
