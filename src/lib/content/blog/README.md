<!--
Controlled blog taxonomy

Allowed category values:
- start-here
- foundation
- structure
- build
- production
- execution

Normalization rules:
- SaaS Architecture / Infrastructure & Production / Architecture / Database -> structure
- Deployment / Production / Reliability -> production
- Execution / Growth / Pricing / Distribution -> execution
- Validation / Idea / Strategy -> foundation
- Start / Guide -> start-here

category and pillarCategory must use the controlled vocabulary above.
Freeform values will fail the build in src/libs/blog.ts.
-->

# Blog Taxonomy

The blog content root is `src/lib/content/blog`.

## Allowed categories

Every blog post frontmatter must use one of these values for both `category` and `pillarCategory`:

- `start-here`
- `foundation`
- `structure`
- `build`
- `production`
- `execution`

## Mapping rules

When normalizing older or imported content, use these deterministic mappings:

- `SaaS Architecture`, `Infrastructure & Production`, `Architecture`, `Database` → `structure`
- `Deployment`, `Production`, `Reliability` → `production`
- `Execution`, `Growth`, `Pricing`, `Distribution` → `execution`
- `Validation`, `Idea`, `Strategy` → `foundation`
- `Start`, `Guide` → `start-here`

If an article blends multiple themes, infer the closest pillar from the article title and opening content, then set `pillarCategory` to match `category` unless there is a deliberate grouping reason.

## Build behavior

`src/libs/blog.ts` validates `category` and `pillarCategory` against the controlled vocabulary above.

- Freeform category values break the build.
- The validator is intentionally strict.
- Do not expand the allowed set to fit a post. Normalize the post instead.

## Scope of this file

This README documents taxonomy rules only. It does not change slug derivation, SEO metadata, or body content requirements.
