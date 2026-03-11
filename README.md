# ProChat

ProChat is the operating system for SaaS builders.

This repository runs the root-domain marketing, content, glossary, and conversion experience for ProChat. It uses a deterministic build-time content pipeline so articles, docs, guides, prompts, snippets, playbooks, glossary entries, Open Graph assets, sitemap output, and RSS output are generated under one production-safe architecture.

## Architecture Overview

The site is built on Next.js App Router and deployed on Dokploy. The system is dark-mode-first, tokenized, and build-driven: content is loaded from MDX, validated, rendered into static routes, then enriched with deterministic Open Graph images, sitemap output, and RSS output during deployment.

Core architectural properties:

- Next.js App Router for route ownership and static generation
- Dokploy deployment with Node runtime
- Deterministic build-time behavior for content visibility and publishing
- Dark-mode-first design system driven by shared brand tokens
- Tokenized brand architecture across UI, metadata, and OG rendering

## System Flow

The production content flow is:

```text
Content (MDX)
  -> Build (Next.js App Router)
  -> Open Graph generation
  -> Sitemap generation
  -> RSS generation
  -> Dokploy deploy
```

Core layers:

- `src/app` — route tree, page templates, OG routes, section sitemap routes
- `src/components/content` — shared content layout, MDX renderer, CTA, related content
- `src/lib/content` — placeholder MDX content roots and shared content loader
- `src/lib/brand.ts` — centralized brand, spacing, type, depth, and motion tokens
- `src/lib/seo` — metadata and schema helpers
- `src/lib/taxonomy.ts` — categories, tags, and mapping helpers
- `src/lib/content/blog` — canonical blog content root
- `content/glossary` — glossary content retained in place

## Folder Structure

```text
src/
  app/
    blog/[slug]/page.tsx
    blog/[slug]/og/route.ts
    docs/[category]/[slug]/page.tsx
    glossary/[term]/page.tsx
    playbooks/[segment]/[slug]/page.tsx
    prompts/[category]/[slug]/page.tsx
    snippets/[stack]/[slug]/page.tsx
    guides/[topic]/[slug]/page.tsx
    og/route.ts
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
scripts/
  generate-sitemap.ts
  generate-rss.ts
  start-production.sh
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

## Blog Architecture

The blog is organized as a guided learning system rather than a flat reverse-chronological archive.

- `Start Here` features the flagship pillar post for first-time readers.
- `Core Resources` sits directly below the hero to surface glossary and validation assets before the learning path.
- The learning path is grouped into ordered pillars: `Start Here`, `Foundation`, `Structure`, `Build`, `Production`, and `Execution`.
- Posts support `pillarCategory` and `pillarOrder` frontmatter so ordering remains stable as the library grows.
- Tag filtering is client-side and derived from the current post set, with the default state showing every post.
- The flagship guide always renders first when a post is marked `pillar: true`.

The detailed mechanics live in `docs/blog-system.md`.

## Conversion Flow Logic

The content system is not isolated from conversion. It is designed to move users through a clear ladder:

1. Discover via blog, glossary, guides, docs, prompts, or snippets
2. Understand the system through related content and structured layouts
3. Move into a CTA that routes to kits, contact, or the next execution asset
4. Convert into SaaSKit, ProChat, or a conversation with the team

Each content layout injects a CTA section automatically so discovery traffic does not dead-end.

## System domains

- **App/runtime** — tenant provisioning, database wiring, infrastructure deploy flow, and production runtime. See `docs/overview.md`, `docs/database.md`, `docs-public/environment.md`, `docs/deployment.md`, `docs/production-lifecycle.md`, `docs/development.md`, `docs/integrations.md`, `docs/github-entitlements.md`, `docs/automation-routes.md`, `docs/getting-started.md`, `docs/tenant-cleanup.md`, `docs/builder-reference.md`, and `docs/ai-guidelines.md` for the operator-facing contracts.
- **Content + SEO platform** — the MDX-driven clusters, OG generation, sitemap/RSS output, analytics, and design system. The canonical entries are `docs/content-platform.md`, `docs/blog-system.md`, `docs/open-graph-system.md`, `docs/design-system.md`, `docs/design-rules.md`, `docs/allowed-section-types.md`, `docs/page-blueprint-template.md`, and `docs/analytics-audit.md`.
- **Docs automation** — generated docs are defined in `docs/docs-automation.md` and `scripts/docs/README.md`; use the internal doc for the operator overview and the script guide for implementation details.

## Internal documentation map

- `/docs` is strictly internal. These markdown files describe the environment, deployment, content plane, and docs automation that the ProChat team operates directly.
- `scripts/docs/README.md` is the low-level reference for the docs pipeline; it is not part of the generated public docs map but links to `docs-ingest`, `docs-export`, and `src/content/docs`.
- Use the content docs (blog, docs, prompts, etc.) inside `src/content/docs/*` when you need the public-facing output; they are produced from the internal `/docs` plus the AI pipeline, so editing `/docs` (or adding new templates here) flows into the generated site via `npm run docs:ai-build`.
AI coding agents should consult `AGENTS.md` for repository context before editing the docs or code.
Operational commands and validation paths are documented in `REPO_OPERATIONS.md`.

## Documentation Integrity

CI enforces that the internal docs stay aligned with the codebase. Every push runs the environment-variable documentation check, verifies `/docs/*.md` links, and executes `npm run docs:validate`, so drift is caught before a merge.

## Public docs vs internal docs

- Internal: `/docs` contains team-facing references, policies, and templates. Link here only from internal guides and keep sensitive deployment details inside the repo.
- Public: the generated docs live under `src/content/docs/{prokit,saaskit,waaskit,future}` and follow the manifest in `.generated-manifest.json`. The AI/regeneration pipeline runs `npm run docs:ingest`, `npm run docs:ai-generate`, `npm run docs:generate`, and `npm run docs:validate`, so you never edit the published tree directly.

## Notes on current infra truth

- This is the ProChat repo; it inherits SaaSKit conventions but is not the same as the older ProKit brand. Keep the naming aligned with ProChat going forward.
- The marketing/content site is MDX-first and no longer relies on WordPress, so do not document the WordPress stack as the active content system.
- Dokploy is reserved for the main branch; there is no active branch-level preview deployment pipeline.
- The SaaSKit runtime deploy gate (runtime scripts performing backups/smoke checks before `next start`) is not part of the current ProChat build. Production starts with `npm run start` after the `prebuild` run in `npm run build`.
- Both Docker and GitHub workflows now target Node 20 (`Dockerfile` uses `node:20-bullseye`; CI installs Node 20), and `package.json` enforces `node >=20`.

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

## Build-Time Automation

Production build order:

1. `next build`
2. `npm run sitemap`
3. `npm run rss`

The root build script is deterministic. There is no runtime cron, no ISR publishing toggle, and no background worker that mutates content visibility after deploy.

## Deployment Model

- Dokploy is the deployment target
- OG routes run on the Node runtime, not Edge
- Publishing visibility is decided at build time using `publishedAt`
- Search engine pinging happens once on production startup
- Weekly scheduled publishing is handled by GitHub Actions triggering a Dokploy redeploy

## Zero Manual Content Workflow

The publishing system is designed to remove repetitive operational work:

- No manual OG image creation
- No manual sitemap updates
- No manual RSS updates
- No manual publish toggles for future-dated posts
- Future-dated posts become visible on the next redeploy after `publishedAt`
- Taxonomy validation is enforced in the blog loader
- Internal linking follows a controlled editorial rule set for semantic consistency

## Next Step for Content Expansion

To add a new authority asset:

1. Add or update MDX content in the appropriate section root
2. Use shared taxonomy values where possible
3. Ensure tags and category align with adjacent cluster content
4. Link to a next-step asset and a conversion target
5. Verify route metadata, structured data, and sitemap coverage
