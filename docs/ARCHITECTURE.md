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

- Root sitemap handles static and brand-critical routes
- Section sitemaps handle content URLs for each cluster

This keeps sitemap ownership aligned to content ownership.

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
