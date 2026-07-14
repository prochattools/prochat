# ProChat Content Audit

**Status:** operational content register - seeded; completion task READY
**Scope:** public copy, navigation, footer, forms, metadata, social copy, legal language, documentation entry points, and error states

## Purpose

The content audit identifies every active and legacy public statement, determines whether it matches canonical ProChat truth, and assigns a migration action before page implementation.

Copy is not considered safe merely because it is already published or embedded in code.

## Canonical references

```text
Mind company principles
Mind public-platform strategy
Mind product strategy
Mind naming architecture
Mind canonical homepage copy
Mind brand ruleset
PRODUCT.md
DESIGN.md
brand-spec.md
```

## Audit scope

- page headings;
- body copy;
- product descriptions;
- calls to action;
- navigation labels;
- footer labels;
- form labels and help text;
- validation and success messages;
- legal copy;
- privacy language;
- beta descriptions;
- metadata;
- Open Graph and social copy;
- alt text;
- structured data;
- documentation labels;
- 404 and error copy;
- legacy content documents used as sources.

## Claim categories

Every claim receives one category:

```text
APPROVED_CURRENT
APPROVED_QUALIFIED
BETA_ONLY
FUTURE_POSSIBILITY
UNVERIFIED
PROHIBITED
LEGAL_REVIEW_REQUIRED
```

### Approved current

Supported by current product behavior and canonical documentation.

### Approved qualified

True only with explicit scope or boundary language.

Example:

```text
Customer memory remains on the customer’s computer in the current product model.
```

### Beta only

True for selected beta use but not broad commercial availability.

### Future possibility

May appear only in clearly labeled roadmap or future-capability context.

### Unverified

Requires measurement, product evidence, legal review, or technical verification.

### Prohibited

Must not appear publicly.

Examples:

- guaranteed savings;
- zero hallucinations;
- automatic trusted memory;
- universal compatibility;
- undocumented encryption;
- blanket private or no-data-leaves-device claims;
- finalized pricing or support not yet approved;
- future interfaces presented as current products.

## Operational register

The route audit remains the evidence source. This register translates that evidence into planning packets.

| Item | Source / route | Owner / scope | Status | Current claims / terminology | Stale names / CTAs / URLs / legal language | Proposed disposition | Canonical destination / archive | Replacement dependency | Wave | Validation / rollback / approval |
|---|---|---|---|---|---|---|---|---|---:|---|
| Homepage | `src/app/page.tsx` | ProChat public-platform | CURRENT | company-first, Memory flagship, QA conversion, Workbench intro | final copy/CTA polish only | REWRITE | `/` | canonical homepage copy and visual pass | 3 | claims, metadata, CTA, performance; rollback to prior homepage commit |
| ProChat Memory | `src/app/prochat-memory/page.tsx` | flagship product | CURRENT at legacy path | Memory flagship, trust lifecycle, local ownership, QA path | legacy path and legacy theme coupling | REPLACE, REDIRECT | `/memory`; archive legacy page | `/memory` page, metadata, redirect | 4/7 | product-truth, claims, metadata, performance; preserve old route until replacement passes |
| Memory for QA | `src/app/qa-memory/page.tsx` | primary conversion path | CURRENT at legacy path | QA investigation, current evidence, beta qualification | legacy path and legacy CTA wording | REPLACE, REDIRECT | `/memory/qa`; archive legacy page | `/memory/qa` page, form, metadata | 4/7 | conversion, claims, form, metadata; preserve old route until verified |
| Workbench / BuildFlow | `src/app/buildflow/page.tsx`; missing `/workbench` | second product / compatibility | LEGACY + MISSING | Workbench guarded execution; BuildFlow compatibility only | BuildFlow product framing, ProChat OS flagship claims | CREATE, REDIRECT, ARCHIVE | `/workbench`; archive BuildFlow page | Workbench page copy, design, redirect | 5/7 | product-truth, compatibility, metadata; do not treat BuildFlow as current product |
| ProChat OS | `src/app/systems/prochat-os/page.tsx` | legacy product history | LEGACY | historical product identity | current-product phrasing, schema, and OG copy | ARCHIVE or REDIRECT | archive destination only | legacy product archive decision | 7 | route, claims, SEO, structured data; preserve evidence before removal |
| Kits | `src/app/kits/**` | purchaser compatibility / legacy catalogue | LEGACY | kit catalogue, purchaser compatibility, protected finish flows | SaaSKit, ProKit, UXKit, WaaSKit public-product wording | ARCHIVE public pages; keep protected compatibility if obligations remain | archive public kit pages; preserve protected finish flows only where required | purchaser-obligation closure and archive mapping | 7/8 | route, commerce, claims, redirect, protected-flow proof |
| Waitlist / newsletter | `src/app/waitlist/page.tsx`; `src/app/waiting-list/page.tsx`; `src/app/api/waitlist/route.ts`; `src/app/api/waiting-list/route.ts`; `src/app/api/mailerlite/subscribe/route.ts` | beta / mailing-list path | LEGACY | legacy waitlist, email capture, beta or QA interest | UXKit/WaaSKit/ProChat OS promotion, stale provider wording | REPLACE, REDIRECT, ARCHIVE | future beta/contact destination or archive only | beta destination decision and consent/provider choice | 6/7 | data-flow, consent, privacy, analytics; preserve existing flow until replacement succeeds |
| Contact | `src/app/(marketing)/contact/page.tsx`; `src/app/api/contact/route.ts` | canonical public contact | CURRENT but needs rewrite | company contact, beta enquiry, product-topic routing | stale form copy and topic labels | REWRITE/REFACTOR | `/contact` | approved form, privacy, analytics, and email contracts | 6 | form E2E, privacy, keyboard, error states; keep working endpoint until replacement passes |
| Privacy | `src/app/(marketing)/privacy/page.tsx` | legal | CURRENT but stale | website and digital-product privacy | kit commerce scope, stale dates/links | REWRITE | `/privacy` | legal/data-flow review and approved copy | 6 | legal review, links, dates; keep current legal page until approved replacement |
| Terms | `src/app/(marketing)/terms/page.tsx` | legal | CURRENT but stale | digital-product terms | kit-specific product scope and stale dates/links | REWRITE | `/terms` | legal/licensing review and approved copy | 6 | legal review, links, dates; keep current page until approved replacement |
| Docs | `src/app/docs/page.tsx`; `src/app/docs/[category]/[[...slug]]/page.tsx` | current docs shell | CURRENT route, stale content | documentation index and legacy docs taxonomy | SaaSKit/ProKit language, legacy docs hierarchy | REWRITE and re-scope | `/docs`; archive or noindex legacy entries by row | docs taxonomy decision and archive mapping | 6/7 | source audit, canonical links, sitemap; retain until new entry works |
| Philosophy | missing `/philosophy` | company philosophy | MISSING | company belief and operating principles | none yet; route missing | CREATE | `/philosophy` | approved editorial page copy and metadata | 6 | content, reading order, metadata |
| About | missing `/about` | company and founder | MISSING | ProChat as company, Steve as QA Engineer and Founder | none yet; route missing | CREATE | `/about` | approved founder page copy and imagery decision | 6 | founder positioning, metadata, asset rights |
| Learn | `src/app/learn/**` | legacy resources | LEGACY | onboarding and historical build guidance | SaaS language, outdated resource framing | ARCHIVE or REPLACE | archive legacy resources or replace with current docs taxonomy | current docs/resources decision | 6/7 | route, indexing, link crawl; do not treat as current platform guide |
| Blog | `src/app/blog/**` | historical content | LEGACY / REDIRECTED | articles and blog slug handling | stale resource redirects and legacy content | ARCHIVE or REDIRECT | archive entries or remove misleading redirect | editorial/archive decision | 7 | route, SEO, indexing, redirects |
| Prompts | `src/app/prompts/**` | historical content | LEGACY | prompt catalogue | legacy content framing | ARCHIVE or REWRITE | archive or current docs resources | docs/resource decision | 6/7 | route, indexing, link crawl |
| Book | `src/app/book/page.tsx` | historical offer | LEGACY | book/content offer | stale offer framing | ARCHIVE or REDIRECT | archive destination only | archive decision | 7 | route, SEO, redirect |
| Proof | `src/app/proof/page.tsx` | historical offer | LEGACY | proof/marketing page | stale proof framing | ARCHIVE or REDIRECT | archive destination only | archive decision | 7 | route, SEO, redirect |
| Starting Point | `src/app/starting-point/page.tsx` | historical content | LEGACY / DUPLICATE | starting-point guidance | duplicate/legacy wording | REDIRECT or ARCHIVE | archive or canonical current guide | redirect decision | 7 | route, SEO, link crawl |
| AI Workflows | `src/app/ai-workflows/page.tsx` | historical content | LEGACY | AI workflow offering | current-capability framing, legacy product language | ARCHIVE or REDIRECT | archive destination only | archive decision | 7 | route, SEO, redirect |
| Legal AI Workflows | `src/app/legal-ai-workflows/page.tsx` | historical content | LEGACY | legal-industry AI workflow page | stale product framing | ARCHIVE or REDIRECT | archive destination only | archive decision | 7 | route, SEO, redirect |
| Studio | `src/app/(marketing)/studio/page.tsx` | historical service page | LEGACY | client-work/service page | freelancer/service positioning | ARCHIVE or REDIRECT | archive destination only | archive or redesign decision | 7 | route, SEO, redirect |
| Events | `src/app/systems/events/page.tsx` | historical surface | LEGACY | event/system surface | legacy system framing | ARCHIVE or REDIRECT | archive destination only | archive decision | 7 | route, SEO, redirect |
| Waas accountants | `src/app/waas/accountants/page.tsx` | vertical marketing page | LEGACY | WaaS vertical marketing | legacy vertical/product language | ARCHIVE or REDIRECT | archive destination only | archive decision | 7 | route, SEO, redirect |
| Header | `src/components/Header.tsx` | global shell | CURRENT shell | navigation and CTA hierarchy | missing Philosophy/About/Docs, Workbench to contact topic | REWRITE/REFACTOR | global shell update | page hierarchy and route decisions | 3/6 | navigation, CTA, analytics, mobile; rollback with shell commit |
| Footer | `src/app/(marketing)/components/layout/Footer.tsx` | global shell | CURRENT shell | company/product footer and support links | unqualified privacy language, personal/company mix | REWRITE/REFACTOR | global shell update | footer copy and route decisions | 3/6 | footer completeness, claims, links; rollback with shell commit |
| Metadata / sitemap / robots / social and OG copy | `src/app/robots.ts`; `src/app/docs/sitemap.ts`; `src/app/learn/sitemap.ts`; `src/app/og/route.ts` and page metadata | discovery layer | CURRENT + mixed legacy | titles, canonical URLs, indexing, social previews | stale product names, duplicate routes, legacy previews | REWRITE | current canonical metadata and discovery routes | page hierarchy and archive decisions | 6/7 | metadata crawl, sitemap parse, social preview review |
| Protected purchaser and transactional content | `src/app/kits/prokit/finish/page.tsx`; `src/app/kits/saaskit/finish/page.tsx`; `src/app/processing-page/[[...processing-page]]/page.tsx`; `src/app/success/page.tsx`; `src/app/api/subscription/route.ts`; `src/app/api/stripe/create-checkout/route.ts`; `src/app/api/stripe/create-portal/route.ts`; `src/app/api/webhook/stripe/route.ts`; `src/app/api/store/prokit/claim/route.ts`; `src/app/api/store/saaskit/claim/route.ts`; `src/app/unsubscribe/page.tsx` | protected purchaser / legal / email | PROTECTED or BLOCKED_BY_OBLIGATION | checkout, portal, webhook, claim, unsubscribe, finish-flow responsibilities | keep until obligations close; do not expose publicly | KEEP until obligations close; then ARCHIVE/REMOVE-LATER where the matrix says so | protected compatibility only | purchaser, commerce, and legal obligation closure | protected | exact diff, protected-flow proof, rollback to pre-change commit, owner approval |

## Completion checklist

- stable content IDs exist for every row that has been audited;
- every row has exact source evidence;
- every claim has a claim-status classification;
- every row has an approval state or an explicit missing-approval marker;
- exact archive destination and replacement dependency are recorded where applicable;
- protected and legal boundaries are explicitly marked;
- Header, Footer, sitemap, robots, social, OG, error, and transactional coverage is complete or explicitly pending;
- ROUTE_AUDIT and MIGRATION_MATRIX cross-checks are complete.

## Next content-audit task

PPF-002 - complete the remaining operational content audit fields and complete the cross-check against ROUTE_AUDIT and MIGRATION_MATRIX.

## Metadata audit

For each public route, record:

```yaml
metadata:
  title: ""
  description: ""
  canonical_url: ""
  open_graph_title: ""
  open_graph_description: ""
  open_graph_image: ""
  robots: "index | noindex"
  sitemap: true
  structured_data: []
```

Validate title uniqueness, description truth, route status, image consistency, and social preview quality.

## Terminology audit

Search for and classify:

- ProChat OS;
- ProChat Answers;
- ProChat Automations;
- BuildFlow as a public product;
- SaaSKit;
- ProKit;
- UXKit;
- WaaSKit;
- MikeOSS;
- law-firm wedge language;
- old pricing or licensing language;
- old font, color, and theme descriptions;
- old security and privacy claims.

Not every occurrence must be removed. Historical or technical references may remain when clearly scoped.

## Audit output

The completed audit must produce:

- route-by-route content inventory;
- page copy decision status;
- claims register;
- terminology replacement map;
- navigation and footer copy;
- form microcopy;
- metadata matrix;
- legal review list;
- archive list;
- exact rewrite tasks in the implementation plan.

## Validation

- canonical-source comparison;
- unsupported-claim search;
- product-name search;
- route and metadata review;
- legal and privacy review;
- accessibility review for labels and instructions;
- five-second comprehension testing;
- CTA destination testing.
