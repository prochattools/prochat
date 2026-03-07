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

## Internal Linking Requirements

Every new post should satisfy the internal-linking baseline:

- link upward to the flagship or other start-here layer when the article is not itself a start-here post
- include one lateral link into the same pillar or cluster
- include one forward link into the next maturity layer where it is contextually relevant
- include a contextual link to [Production-Ready SaaS Foundation](/kits/saaskit) when the article naturally touches execution or infrastructure
- stay at five internal links or fewer

Guardrails:

- do not link the same target twice in the same article
- use controlled anchor phrases where defined by the linking architecture
- run `scripts/audit-internal-links.ts` when adding multiple posts so low-inbound articles are visible before publish
