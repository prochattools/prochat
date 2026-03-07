# Blog System

## Blog Architecture

The canonical blog content root is:

- `src/lib/content/blog`

The shared blog loader is:

- `src/libs/blog.ts`

The generic MDX/content loader is:

- `src/lib/content/index.ts`

The blog index and learning-path rendering are driven by:

- `src/app/blog/page.tsx`
- `src/app/blog/BlogIndexClient.tsx`
- `src/lib/blogStructure.ts`

### Required Frontmatter Shape

Publishable blog entries are expected to carry this shape:

- `title`
- `excerpt`
- `category`
- `pillarCategory`
- `pillarOrder`
- `publishedAt`
- `updated`
- `tags`
- `author`
- `primaryKeyword`
- `seo.title`
- `seo.description`

Additional supported fields include:

- `pillar`
- `order`
- `cluster`
- `keywords`
- `ogImage`
- `takeaways`
- `readingTime`
- `draft`

Notes:

- the route slug is derived from the MDX filename/path
- `draft: true` excludes an entry from the loader
- empty files are ignored by the generic content loader

### Controlled Taxonomy

Pillars are defined in:

- `src/lib/blogStructure.ts`

Current pillar order:

1. `start-here`
2. `foundation`
3. `structure`
4. `build`
5. `production`
6. `execution`

Controlled tag vocabulary:

- `ai`
- `nextjs`
- `saas`
- `mvp`
- `validation`
- `infrastructure`
- `production`
- `deployment`
- `stripe`
- `authentication`
- `non-technical-founders`
- `micro-saas`
- `architecture`
- `execution`
- `system-design`

### Validation Logic

`src/libs/blog.ts` is the source of truth for:

- mapping content entries into blog posts
- validating categories and `pillarCategory`
- validating tags against the controlled vocabulary
- filtering future-dated posts
- sorting posts into the learning-path order

Invalid blog taxonomy throws during the build. This is intentional.

## Publish Scheduling

Scheduled publishing is build-time only.

Mechanics:

- `publishedAt` controls visibility
- `src/libs/blog.ts` filters out posts whose date is in the future
- future-dated posts remain invisible until the next build after that date

Automation path:

- `.github/workflows/scheduled-publish.yml` runs every Monday at `08:00 UTC`
- that workflow calls the Dokploy deploy webhook
- Dokploy rebuilds the app
- the blog loader reevaluates `publishedAt`

There is:

- no runtime cron
- no ISR toggle
- no background worker
- no manual publish switch

## Internal Linking Rules

Internal linking is an editorial constraint used to maintain cluster clarity.

Rules:

- each article should have 3 to 5 internal links
- one upward link to the flagship or canonical context
- one or two cluster-reinforcing links
- one structural or production link
- one SaaSKit conversion link where appropriate

Anchor phrases should remain controlled and consistent. Avoid generic anchors such as `read more`.

Avoid:

- linking the same target twice in one article
- placing two links in the same sentence
- using random anchor variations for the same target

These rules are standardized across the corpus even though the current hard-fail validation focuses on taxonomy rather than prose.
