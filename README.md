# ProChat

ProChat builds **ProChat OS**: an installable Agentic Workflow OS that sits between messy business inputs and the tools a business already uses.

This repository runs the root-domain marketing, learning, documentation, and conversion experience for ProChat. The public website strategy is now ProChat OS-first and business-agnostic. Law firms are the first direct outreach wedge, but the main website should not become law-firm-specific.

## Strategy and product map

The canonical product and strategy references are:

- `docs/strategy.md` — ProChat OS-first business strategy, audience, positioning, and messaging rules
- `docs/product-operating-map.md` — ProChat OS, managed offer, legacy products, MikeOSS wedge, and product boundaries
- `docs/roadmap.md` — phased website, implementation, demo, outreach, and ProChat OS roadmap
- `docs/implementation-plan.md` — executable, agent-ready task plan for safe documentation and website updates
- `docs/product-hierarchy-plan.md` — homepage, product hierarchy, navigation, and CTA rules

Important current product boundaries:

- The `mind` repo ProChat strategy is leading over this repo.
- ProChat OS is the flagship product.
- ProChat OS is an Agentic Workflow OS, not a chatbot, dashboard, SaaS kit, or MikeOSS.
- The public website should be business-agnostic.
- Law firms are the first direct outreach wedge.
- MikeOSS is a law-firm demo/install block, not ProChat OS and not ProChat-owned software.
- BuildFlow is supporting/internal or adjacent tooling, not the current public flagship.
- SaaSKit, ProKit, UXKit, and WaaSKit are legacy/supporting products.
- ProChat runtime uses Ory as its active authentication platform.
- Clerk may remain part of sold boilerplate products where the product code uses it, but it is not ProChat runtime auth.

## Architecture Overview

The site is built on Next.js App Router and deployed on Dokploy. The system is dark-mode-first, tokenized, and build-driven: content is loaded from MDX, validated, rendered into static routes, then enriched with deterministic Open Graph images and sitemap output during deployment.

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
  -> Dokploy deploy
```

Core layers:

- `src/app` — route tree, page templates, OG routes, section sitemap routes
- `src/components/content` — shared content layout, MDX renderer, CTA, related content
- `src/lib/content` — MDX content roots and shared content loader
- `src/lib/brand.ts` — centralized brand, spacing, type, depth, and motion tokens
- `src/lib/seo` — metadata and schema helpers
- `src/lib/taxonomy.ts` — categories, tags, and mapping helpers
- `src/content/learn/production-guide.mdx` — retained curated source for the public Production Guide and legacy share compatibility

## Folder Structure

```text
src/
  app/
    blog/[slug]/page.tsx
    blog/[slug]/og/route.ts
    docs/[category]/[slug]/page.tsx
    learn/page.tsx
    learn/production-guide/page.tsx
    learn/saas-starting-point/page.tsx
    prompts/[category]/[slug]/page.tsx
    starting-point/page.tsx
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
      docs/
      prompts/
    learning/
    seo/
      metadata.ts
      schema.ts
    taxonomy.ts
scripts/
  generate-sitemap.ts
  start-production.sh
```

## Content Clustering Strategy

ProChat now keeps the public content surface intentionally small:

- `learn` — the curated onboarding and sequencing layer
- `starting-point` — the standalone conversion surface for the framework
- `production-guide` — the retained implementation walkthrough under `/learn/production-guide`
- `docs` — implementation detail and architecture explanation
- `prompts` — live execution assets that remain `noindex` until the library is stronger

The blog corpus, glossary, snippets, playbooks, guides, and `/saas-glossary` are not part of the live indexed surface.

## Internal Linking Rules

Every content page should link in three directions:

1. Upward to its section hub or canonical parent context
2. Sideways to closely related assets in the same cluster
3. Forward to the next decision asset or conversion step

Practical rules:

- Learn should move users in order: Starting Point -> Production Guide -> Prompts -> Docs
- Starting Point should route users toward the framework signup and then back into Learn
- Production Guide and Docs should route toward prompts, kits, or contact when execution starts
- Prompts should point back to the Production Guide or Docs instead of acting like an index target
- CTA blocks should move readers toward `/kits`, `/contact`, or the next retained learning asset

## Sitemap Structure

The root sitemap lives at `/sitemap.xml` and covers static/site-critical routes.

Section sitemaps live at:

- `/docs/sitemap.xml`
- `/learn/sitemap.xml`

The root sitemap index intentionally exposes only:

- the root marketing sitemap (`/sitemap-pages.xml`)
- `/docs/sitemap.xml`
- `/learn/sitemap.xml`

The removed surfaces (`/blog`, `/guides`, `/playbooks`, `/snippets`, `/glossary`, `/saas-glossary`) are not emitted. `/prompts` stays live but remains out of sitemap output and returns `noindex` until the library is production-ready.

This keeps section-level discovery explicit while preserving one root-domain authority graph.

## SEO Philosophy

The SEO system is centralized and route-safe:

- one metadata helper: `src/lib/seo/metadata.ts`
- one structured-data helper layer: `src/lib/seo/schema.ts`
- route-level metadata extends the same defaults instead of creating one-off SEO logic
- content routes are statically generated via `generateStaticParams`
- canonical URLs are always built from the same site-url source

The positioning is consistent across metadata and content:

> ProChat — Build SaaS with Structure, not Guesswork.

## Learning Architecture

The public learning layer is sequence-driven rather than archive-driven.

- `Learn` is the curated entry point
- `Starting Point` clarifies the idea and scope before build work starts
- `Production Guide` carries the retained implementation walkthrough
- `Prompts` stay accessible by direct URL but are withheld from indexing while thin
- `Docs` remain the implementation reference surface

## Conversion Flow Logic

The content system is not isolated from conversion. It is designed to move users through a clear ladder:

1. Discover via the core marketing pages, Learn, Starting Point, Production Guide, Docs, or direct prompt links
2. Understand the system through related content and structured layouts
3. Move into a CTA that routes to kits, contact, or the next execution asset
4. Convert into SaaSKit, ProChat, or a conversation with the team

Each content layout injects a CTA section automatically so discovery traffic does not dead-end.

## System domains

- **App/runtime** — tenant provisioning, database wiring, infrastructure deploy flow, and production runtime. See `docs/overview.md`, `docs/database.md`, `docs-public/environment.md`, `docs/deployment.md`, `docs/production-lifecycle.md`, `docs/development.md`, `docs/integrations.md`, `docs/github-entitlements.md`, `docs/automation-routes.md`, `docs/getting-started.md`, `docs/tenant-cleanup.md`, `docs/builder-reference.md`, and `docs/ai-guidelines.md` for the operator-facing contracts.
- **Content + SEO platform** — the retained learning surfaces, generated docs, OG generation, sitemap output, analytics, and design system. The canonical entries are `docs/content-platform.md`, `docs/open-graph-system.md`, `docs/design-system.md`, `docs/design-rules.md`, `docs/allowed-section-types.md`, `docs/page-blueprint-template.md`, and `docs/analytics-audit.md`.
- **Docs automation** — generated docs are defined in `docs/docs-automation.md` and `scripts/docs/README.md`; use the internal doc for the operator overview and the script guide for implementation details.

## Internal documentation map

- `/docs` is strictly internal. These markdown files describe the environment, deployment, content plane, and docs automation that the ProChat team operates directly.
- `scripts/docs/README.md` is the low-level reference for the docs pipeline; it is not part of the generated public docs map but links to `docs-ingest`, `docs-export`, and `src/content/docs`.
- Use the generated public docs inside `src/content/docs/*` when you need the public-facing output; they are produced from the upstream development repositories (`prochattools/prokit-dev` and `prochattools/saaskit-dev`) plus the AI pipeline. ProChat repo-root `/docs` remains internal operator documentation and is not the product-doc source of truth.
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
- The SaaSKit runtime deploy gate (runtime scripts performing backups/smoke checks before `next start`) is not part of the current ProChat build. Production starts with `npm run start`, and that start path now runs the repo-owned schema-readiness step before Next launches.
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
- `npm run build` is a compile step. Production schema provisioning and migrations are enforced by `npm run start`, which runs `sh scripts/deploy/prepare-production.sh` before Next starts.

## Build-Time Automation

Production build order:

1. `next build`
2. `npm run sitemap`
The root build script is deterministic. There is no runtime cron, no ISR publishing toggle, and no background worker that mutates content visibility after deploy.

## Deployment Model

- Dokploy is the deployment target
- OG routes run on the Node runtime, not Edge
- Publishing visibility is decided at build time using `publishedAt`
- Google Search Console follow-up is manual after deploy; the runtime does not auto-submit sitemaps
- Weekly scheduled publishing is handled by GitHub Actions triggering a Dokploy redeploy

## Zero Manual Content Workflow

The publishing system is designed to remove repetitive operational work:

- No manual OG image creation
- No manual sitemap updates
- No manual publish toggles for retained curated assets
- The Production Guide and prompt/docs surfaces are rendered from controlled sources
- Internal linking follows the retained learning-path structure

## Next Step for Content Expansion

To add a new authority asset:

1. Add or update MDX content in the appropriate section root
2. Use shared taxonomy values where possible
3. Ensure tags and category align with adjacent cluster content
4. Link to a next-step asset and a conversion target
5. Verify route metadata, structured data, and sitemap coverage
