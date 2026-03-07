# ProChat

ProChat is the operating system for SaaS builders.

This repository runs the root-domain marketing, content, glossary, and conversion experience for ProChat. It now uses a unified SEO authority architecture so articles, docs, guides, prompts, snippets, playbooks, and glossary entries reinforce one another under the same domain.

## Architecture Overview

The site is built on Next.js App Router with one shared metadata system, one shared structured-data system, and one shared MDX content pipeline for authority content.

Core layers:

- `src/app` — route tree, page templates, sitemap routes
- `src/components/content` — shared content layout, MDX renderer, CTA, related content
- `src/lib/content` — placeholder MDX content roots and shared content loader
- `src/lib/seo` — metadata and schema helpers
- `src/lib/taxonomy.ts` — categories, tags, and mapping helpers
- `content/blog`, `content/glossary` — existing blog and glossary content retained in place

## Folder Structure

```text
src/
  app/
    blog/[slug]/page.tsx
    docs/[category]/[slug]/page.tsx
    glossary/[term]/page.tsx
    playbooks/[segment]/[slug]/page.tsx
    prompts/[category]/[slug]/page.tsx
    snippets/[stack]/[slug]/page.tsx
    guides/[topic]/[slug]/page.tsx
    sitemap.ts
    */sitemap.ts
  components/
    content/
      ContentLayout.tsx
      MDXRenderer.tsx
      CTASection.tsx
      RelatedContent.tsx
  lib/
    content/
      blog/
      docs/
      glossary/
      playbooks/
      prompts/
      snippets/
      guides/
    seo/
      metadata.ts
      schema.ts
    taxonomy.ts
content/
  blog/
  glossary/
```

## Content Clustering Strategy

ProChat now stacks authority through seven connected clusters:

- `blog` — narrative, positioning, long-form search capture
- `docs` — implementation detail and architecture explanation
- `glossary` — definition capture for SaaS founder terminology
- `playbooks` — repeatable execution workflows
- `prompts` — reusable AI operating assets
- `snippets` — tactical implementation patterns
- `guides` — structured walkthroughs that connect strategy to execution

The root domain carries all of these because they support one buyer journey and one topical graph.

## Internal Linking Rules

Every content page should link in three directions:

1. Upward to its section hub or canonical parent context
2. Sideways to closely related assets in the same cluster
3. Forward to the next decision asset or conversion step

Practical rules:

- Blog posts link to kits, glossary, and deeper implementation assets
- Glossary entries link back to `/saas-glossary` plus relevant blog articles
- Playbooks and prompts link to each other where execution sequence matters
- Snippets and docs link into guides when users need context, not just code
- CTA blocks should move readers toward either `/kits`, `/contact`, or the next authority asset

## Sitemap Structure

The root sitemap lives at `/sitemap.xml` and covers static/site-critical routes.

Section sitemaps live at:

- `/blog/sitemap.xml`
- `/docs/sitemap.xml`
- `/glossary/sitemap.xml`
- `/playbooks/sitemap.xml`
- `/prompts/sitemap.xml`
- `/snippets/sitemap.xml`
- `/guides/sitemap.xml`

This keeps section-level discovery explicit while preserving one root-domain authority graph.

## SEO Philosophy

The SEO system is centralized and route-safe:

- one metadata helper: `src/lib/seo/metadata.ts`
- one structured-data helper layer: `src/lib/seo/schema.ts`
- route-level metadata extends the same defaults instead of creating one-off SEO logic
- content routes are statically generated via `generateStaticParams`
- canonical URLs are always built from the same site-url source

The positioning is consistent across metadata and content:

> ProChat — The Operating System for SaaS Builders

## Conversion Flow Logic

The content system is not isolated from conversion. It is designed to move users through a clear ladder:

1. Discover via blog, glossary, guides, docs, prompts, or snippets
2. Understand the system through related content and structured layouts
3. Move into a CTA that routes to kits, contact, or the next execution asset
4. Convert into SaaSKit, ProKit, or a conversation with ProChat

Each content layout injects a CTA section automatically so discovery traffic does not dead-end.

## Development Notes

Useful commands:

```bash
npm install
npm run dev
npm run lint:design
npx tsc --noEmit
npx next build
```

Notes:

- `npm run lint` is not defined in this repository.
- `npm run build` requires production database env such as `SYSTEM_DATABASE_URL` because of the existing prebuild flow.

## Existing ProKit / Infra Docs

Operational and infrastructure details remain in the existing docs set:

- `docs/PROKIT_AI_GUIDELINES.md`
- `docs/PROKIT_DEV_GUIDE.md`
- `docs/PROKIT_INFRASTRUCTURE.md`
- `docs/PROKIT_DATABASE.md`
- `docs/PROKIT_TENANT_CLEANUP.md`

## Next Step for Content Expansion

To add a new authority asset:

1. Add or update MDX content in the appropriate section root
2. Use shared taxonomy values where possible
3. Ensure tags and category align with adjacent cluster content
4. Link to a next-step asset and a conversion target
5. Verify route metadata, structured data, and sitemap coverage
