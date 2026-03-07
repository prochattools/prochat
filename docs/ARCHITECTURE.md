# ProChat Content + SEO Architecture

## URL Strategy

ProChat consolidates authority on the root domain instead of splitting educational assets across disconnected hosts.

Primary patterns:

- `/blog/[slug]`
- `/docs/[category]/[slug]`
- `/glossary/[term]`
- `/playbooks/[segment]/[slug]`
- `/prompts/[category]/[slug]`
- `/snippets/[stack]/[slug]`
- `/guides/[topic]/[slug]`

Supporting hubs remain at `/blog` and `/saas-glossary`. Additional section hubs can be introduced later without changing the route model.

## Cluster Model

Each cluster has a distinct job:

- **Blog** — earns discovery and narrative trust
- **Docs** — explains system architecture and implementation detail
- **Glossary** — captures definitions and founder-language searches
- **Playbooks** — turns knowledge into operating sequences
- **Prompts** — packages reusable AI execution assets
- **Snippets** — captures tactical pattern searches
- **Guides** — bridges strategic understanding to execution

The clusters are designed to interlink, not compete.

## Authority Stacking Model

Authority stacking means every new asset should improve the strength of nearby assets.

Example:

- A blog article introduces a concept
- A glossary entry captures the definition query
- A guide shows the practical workflow
- A prompt or playbook gives the operator a reusable next step
- A CTA moves the reader into product or contact intent

This produces more topical depth than isolated blog-only publishing.

## Taxonomy Rules

Taxonomy is intentionally narrow.

Rules:

- Every content asset gets one primary category
- Tags should be sparse and strategic, not exhaustive
- Use shared taxonomy helpers in `src/lib/taxonomy.ts`
- Prefer stable slugs over synonyms for route segments
- Related content should favor shared category or overlapping tags

For blog content specifically:

- The canonical blog root is `src/lib/content/blog`
- Pillars are defined in `src/lib/blogStructure.ts`
- Tags must come from the controlled blog vocabulary in `src/lib/blogStructure.ts`
- Invalid blog taxonomy fails the build through `src/libs/blog.ts`

## Metadata System

Source of truth:

- `src/lib/seo/metadata.ts`
- `src/lib/seo/schema.ts`

Rules:

- No route should invent a parallel SEO helper
- Titles extend the same brand suffix
- Canonicals come from the same site URL builder
- Structured data should match the asset type: article, glossary, or how-to

## Sitemap Model

Sitemap design is section-based:

- Root sitemap is generated at build time into `public/sitemap.xml`
- Section sitemaps handle content URLs for each cluster

This keeps sitemap ownership aligned to content ownership.

## Build + Deploy Model

The repository is designed for deterministic production builds:

1. `next build` generates the App Router output
2. `scripts/generate-sitemap.ts` writes `public/sitemap.xml`
3. `scripts/generate-rss.ts` writes `public/rss.xml`
4. Dokploy deploys the resulting build

Publishing behavior is build-driven, not runtime-driven:

- blog visibility is filtered by `publishedAt` in `src/libs/blog.ts`
- future-dated posts are excluded until a later deploy
- weekly scheduled publishing is handled by `.github/workflows/scheduled-publish.yml`
- the scheduled workflow triggers a Dokploy redeploy webhook
- there is no runtime cron, polling loop, or background worker

Deployment assumptions:

- Dokploy is the production deploy target
- OG generation uses the Node runtime
- no Edge runtime is required for OG routes
- deterministic builds are required for consistent content visibility

## Zero Manual Workflow

The intended operating model is zero repetitive publishing work:

- no manual OG image creation
- no manual sitemap editing
- no manual RSS editing
- no manual publish toggle for scheduled posts
- no manual social card export pipeline

The only authoring step is committing valid content with correct frontmatter and links.

## Conversion Model

Content exists to reduce uncertainty and move users forward.

Default path:

1. Search entry point
2. Content asset with strong context
3. Related content for depth
4. Automatic CTA block
5. Product/contact conversion path

## Future `app.prochat.tools` Separation

The root domain should continue to own marketing, education, and discovery intent.

Future separation rule:

- `prochat.tools` owns authority, acquisition, education, and conversion
- `app.prochat.tools` should own authenticated product workflows only

That boundary preserves SEO focus on the root domain while keeping the product app operationally isolated.
