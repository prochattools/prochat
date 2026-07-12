# ProChat Migration Matrix

**Status:** canonical migration control document  
**Authority:** `docs/migration/LEGACY_SWEEP_PLAN.md`

## Purpose

This matrix is the single operational view of what stays, changes, moves, redirects, or disappears during the public-platform foundation sweep.

It prevents hidden deletions, duplicated replacements, and migration waves that mix unrelated risk.

## Required status values

```text
INVENTORIED
DECISION_REQUIRED
DECIDED
REPLACEMENT_PLANNED
REPLACEMENT_READY
MIGRATING
VERIFIED
DEPRECATED
ARCHIVED
REDIRECTED
REMOVED
BLOCKED
```

## Disposition values

```text
KEEP
REFACTOR
REWRITE
REPLACE
ARCHIVE
REDIRECT
DELETE
```

## Risk levels

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Use `CRITICAL` for changes that can break primary navigation, legal access, production deployment, customer data handling, authentication, or broad shared styling.

## Master matrix

The route rows below were populated during Phase 5 Task 5.1. Detailed evidence, risks, consumers, and unresolved questions live in `ROUTE_AUDIT.md`.

### Canonical and required public responsibilities

| ID | Current path | Canonical destination | Disposition | Wave | Risk | Status | Redirect |
|---|---|---|---|---:|---|---|---|
| ROUTE-001 | `/` | `/` | REWRITE | 3 | HIGH | DECIDED | no |
| ROUTE-002 | `/prochat-memory` | `/memory` | REPLACE then REDIRECT | 4/7 | HIGH | DECISION_REQUIRED | probable |
| ROUTE-003 | `/qa-memory` | `/memory/qa` | REPLACE then REDIRECT | 4/7 | HIGH | DECISION_REQUIRED | probable |
| ROUTE-004 | `/contact` | `/contact` | REWRITE/REFACTOR | 6 | HIGH | DECIDED | no |
| ROUTE-005 | `/privacy` | `/privacy` | REWRITE | 6 | CRITICAL | DECIDED | no |
| ROUTE-006 | `/terms` | `/terms` | REWRITE | 6 | CRITICAL | DECIDED | no |
| ROUTE-007 | `/docs` | `/docs` | REWRITE | 6 | HIGH | DECIDED | no |
| ROUTE-008 | `/docs/[category]/[[...slug]]` | current docs taxonomy TBD | ARCHIVE/REWRITE/NOINDEX by entry | 6/7 | HIGH | DECISION_REQUIRED | possible |
| ROUTE-009 | global 404 | global 404 | REPLACE | 6 | MEDIUM | DECIDED | no |
| ROUTE-010 | global error | global error | REPLACE | 6 | HIGH | DECIDED | no |
| ROUTE-011 | docs 404 | docs error | REFACTOR | 6 | MEDIUM | DECIDED | no |
| ROUTE-012 | missing `/memory` | `/memory` | CREATE | 4 | HIGH | REPLACEMENT_PLANNED | n/a |
| ROUTE-013 | missing `/memory/qa` | `/memory/qa` | CREATE | 4 | HIGH | REPLACEMENT_PLANNED | n/a |
| ROUTE-014 | missing `/workbench` | `/workbench` | CREATE | 5 | HIGH | REPLACEMENT_PLANNED | n/a |
| ROUTE-015 | missing `/philosophy` | `/philosophy` | CREATE | 6 | MEDIUM | REPLACEMENT_PLANNED | n/a |
| ROUTE-016 | missing `/about` | `/about` | CREATE | 6 | MEDIUM | REPLACEMENT_PLANNED | n/a |

### Legacy, duplicate, and experimental public pages

| ID | Current path | Canonical destination | Disposition | Wave | Risk | Status | Redirect |
|---|---|---|---|---:|---|---|---|
| ROUTE-017 | `/buildflow` | `/workbench` | REMOVE after Workbench replacement; preserve technical compatibility only where required | 5/7/8 | CRITICAL | DECIDED | required |
| ROUTE-018 | `/systems/prochat-os` | archive record only; no current product destination | REMOVE from public platform after archival and obligation checks | 7/8 | CRITICAL | DECIDED | possible explanatory redirect |
| ROUTE-019 | `/systems/events` | TBD | ARCHIVE or REDIRECT | 7 | HIGH | DECISION_REQUIRED | possible |
| ROUTE-020 | `/ai-workflows` | TBD | ARCHIVE or REDIRECT | 7 | HIGH | DECISION_REQUIRED | possible |
| ROUTE-021 | `/legal-ai-workflows` | TBD | ARCHIVE or REDIRECT | 7 | HIGH | DECISION_REQUIRED | possible |
| ROUTE-022 | `/studio` | none currently | ARCHIVE/REWRITE/REMOVE after decision | 7 | HIGH | DECISION_REQUIRED | possible |
| ROUTE-023 | `/kits` | none | ARCHIVE or REDIRECT | 7 | HIGH | DECISION_REQUIRED | probable |
| ROUTE-024 | `/kits/prokit` | none | ARCHIVE or REDIRECT | 7 | HIGH | DECISION_REQUIRED | probable |
| ROUTE-025 | `/kits/prokit/finish` | purchaser obligation TBD | KEEP temporarily | 7/8 | CRITICAL | BLOCKED | no immediate redirect |
| ROUTE-026 | `/kits/saaskit` | none | ARCHIVE or REDIRECT | 7 | HIGH | DECISION_REQUIRED | probable |
| ROUTE-027 | `/kits/saaskit/finish` | purchaser obligation TBD | KEEP temporarily | 7/8 | CRITICAL | BLOCKED | no immediate redirect |
| ROUTE-028 | `/kits/uxkit` | none | ARCHIVE or REDIRECT | 7 | HIGH | DECISION_REQUIRED | probable |
| ROUTE-029 | `/kits/waaskit` | none | ARCHIVE or REDIRECT | 7 | HIGH | DECISION_REQUIRED | probable |
| ROUTE-030 | `/waitlist` | contact/beta destination TBD | REPLACE or REDIRECT | 6/7 | CRITICAL | DECISION_REQUIRED | probable |
| ROUTE-031 | `/waiting-list` | `/waitlist` currently | retain redirect until replacement | 7 | HIGH | REDIRECTED | existing |
| ROUTE-032 | `/book` | TBD | ARCHIVE or REDIRECT | 7 | MEDIUM | DECISION_REQUIRED | possible |
| ROUTE-033 | `/proof` | TBD | ARCHIVE or REDIRECT | 7 | MEDIUM | DECISION_REQUIRED | possible |
| ROUTE-034 | `/starting-point` | resources destination TBD | REDIRECT or ARCHIVE | 7 | MEDIUM | DECISION_REQUIRED | probable |
| ROUTE-035 | `/learn` | resources/docs decision TBD | ARCHIVE/NOINDEX/REPLACE | 6/7 | HIGH | DECISION_REQUIRED | possible |
| ROUTE-036 | `/learn/production-guide` | resources archive | ARCHIVE/NOINDEX | 7 | MEDIUM | DECISION_REQUIRED | possible |
| ROUTE-037 | `/learn/saas-starting-point` | resources archive | ARCHIVE/NOINDEX | 7 | MEDIUM | DECISION_REQUIRED | possible |
| ROUTE-038 | `/blog` | `/learn` currently | review redirect after resource decision | 7 | MEDIUM | REDIRECTED | existing runtime |
| ROUTE-039 | `/blog/[slug]` | entry-level TBD | ARCHIVE/KEEP selectively/REDIRECT | 7 | HIGH | DECISION_REQUIRED | possible |
| ROUTE-040 | `/prompts` | current docs/resources TBD | ARCHIVE/REWRITE | 6/7 | MEDIUM | DECISION_REQUIRED | possible |
| ROUTE-041 | `/prompts/[category]/[slug]` | entry-level TBD | ARCHIVE/KEEP selectively | 7 | MEDIUM | DECISION_REQUIRED | possible |
| ROUTE-042 | `/waas/accountants` | none | ARCHIVE or REDIRECT | 7 | HIGH | DECISION_REQUIRED | probable |
| ROUTE-043 | `/privacy-policy` | `/privacy` | retain redirect | 7 | MEDIUM | REDIRECTED | existing permanent |
| ROUTE-044 | `/tos` | `/terms` | retain redirect | 7 | MEDIUM | REDIRECTED | existing permanent |

### Internal, authenticated, operational, and utility pages

| ID | Current path | Canonical destination | Disposition | Wave | Risk | Status | Redirect |
|---|---|---|---|---:|---|---|---|
| ROUTE-045 | `/admin` | `/admin/licenses` | KEEP | protected | HIGH | DECIDED | existing runtime |
| ROUTE-046 | `/admin/licenses` | same | KEEP/REFACTOR if used | protected | CRITICAL | DECISION_REQUIRED | no |
| ROUTE-047 | `/admin/og` | same or remove | KEEP/REMOVE after audit | protected | HIGH | DECISION_REQUIRED | no |
| ROUTE-048 | `/admin/waitlist` | beta admin TBD | REFACTOR/REPLACE | protected | HIGH | DECISION_REQUIRED | no |
| ROUTE-049 | `/dashboard` | application decision TBD | DECISION REQUIRED | protected | HIGH | DECISION_REQUIRED | no |
| ROUTE-050 | `/chat/[projectID]` | application decision TBD | KEEP/DECISION REQUIRED | protected | CRITICAL | DECISION_REQUIRED | no |
| ROUTE-051 | `/preferences` | same | KEEP/REFACTOR | protected | HIGH | DECISION_REQUIRED | no |
| ROUTE-052 | `/sign-in/[[...sign-in]]` | same | KEEP | protected | CRITICAL | DECIDED | no |
| ROUTE-053 | `/sign-up/[[...sign-up]]` | same | KEEP | protected | CRITICAL | DECIDED | no |
| ROUTE-054 | `/processing-page/[[...processing-page]]` | transactional decision TBD | KEEP temporarily | protected | CRITICAL | BLOCKED | no |
| ROUTE-055 | `/success` | transactional decision TBD | KEEP temporarily | protected | CRITICAL | BLOCKED | no |
| ROUTE-056 | `/maintenance` | same | KEEP/REFACTOR | 6 | HIGH | DECIDED | no |
| ROUTE-057 | `/debug/analytics` | internal only | PROTECT/NOINDEX/REMOVE after audit | protected | HIGH | DECISION_REQUIRED | no |
| ROUTE-058 | `/unsubscribe` | same | KEEP/REFACTOR | 6 | HIGH | DECIDED | no |

### Current, legacy, and internal route handlers

| ID | Current path | Canonical destination | Disposition | Wave | Risk | Status |
|---|---|---|---|---:|---|---|
| ROUTE-059 | `/api/contact` | same | KEEP then REFACTOR | 6 | CRITICAL | DECIDED |
| ROUTE-060 | `/api/health` | same | KEEP | protected | HIGH | DECIDED |
| ROUTE-084 | `/admin/licenses/revoke` | same | KEEP until licensing audit | protected | CRITICAL | DECISION_REQUIRED |
| ROUTE-061 | `/api/preferences` | same | KEEP | protected | HIGH | DECIDED |
| ROUTE-062 | `/api/projects` | product decision TBD | DECISION REQUIRED | protected | CRITICAL | DECISION_REQUIRED |
| ROUTE-063 | `/api/tenants/projects` | product decision TBD | DECISION REQUIRED | protected | CRITICAL | DECISION_REQUIRED |
| ROUTE-064 | `/api/subscription` | commerce decision TBD | KEEP temporarily | protected | CRITICAL | BLOCKED |
| ROUTE-065 | `/api/stripe/create-checkout` | commerce decision TBD | KEEP temporarily | protected | CRITICAL | BLOCKED |
| ROUTE-066 | `/api/stripe/create-portal` | commerce decision TBD | KEEP temporarily | protected | CRITICAL | BLOCKED |
| ROUTE-067 | `/api/webhook/stripe` | commerce decision TBD | KEEP until zero-consumer proof | protected | CRITICAL | BLOCKED |
| ROUTE-068 | `/api/store/prokit/claim` | purchaser obligation TBD | DEPRECATE after obligations audit | 8 | CRITICAL | BLOCKED |
| ROUTE-069 | `/api/store/saaskit/claim` | purchaser obligation TBD | DEPRECATE after obligations audit | 8 | CRITICAL | BLOCKED |
| ROUTE-070 | `/api/waitlist` | beta/contact handler TBD | REPLACE or RETIRE | 6/8 | CRITICAL | DECISION_REQUIRED |
| ROUTE-071 | `/api/waiting-list` | beta/contact handler TBD | DEPRECATE after consumer audit | 8 | CRITICAL | DECISION_REQUIRED |
| ROUTE-072 | `/api/mailerlite/subscribe` | communications decision TBD | KEEP/REFACTOR or retire | 6/8 | CRITICAL | DECISION_REQUIRED |
| ROUTE-073 | `/api/(make)/active` | integration decision TBD | DECISION REQUIRED | protected | CRITICAL | DECISION_REQUIRED |
| ROUTE-074 | `/api/(make)/link` | integration decision TBD | DECISION REQUIRED | protected | CRITICAL | DECISION_REQUIRED |
| ROUTE-075 | `/api/(make)/scenarios` | integration decision TBD | KEEP/ARCHIVE by evidence | protected | CRITICAL | DECISION_REQUIRED |
| ROUTE-076 | `/api/(make)/scenarios/openAIAssistant` | integration decision TBD | DECISION REQUIRED | protected | CRITICAL | DECISION_REQUIRED |
| ROUTE-077 | `/api/(n8n)/workflows/openAIAssistant` | integration decision TBD | DECISION REQUIRED | protected | CRITICAL | DECISION_REQUIRED |
| ROUTE-078 | `/api/social/next` | same or retire | KEEP/DECISION REQUIRED | protected | HIGH | DECISION_REQUIRED |
| ROUTE-079 | `/api/social/mark-posted` | same or retire | KEEP/DECISION REQUIRED | protected | HIGH | DECISION_REQUIRED |
| ROUTE-080 | `/social` | same or retire | KEEP/DECISION REQUIRED | protected | HIGH | DECISION_REQUIRED |
| ROUTE-081 | `/go` | destination/consumer TBD | DECISION REQUIRED | protected | HIGH | DECISION_REQUIRED |
| ROUTE-082 | `/og` | current OG service | KEEP/REFACTOR | 6 | MEDIUM | DECIDED |
| ROUTE-083 | `/blog/[slug]/og` | retained article entries only | KEEP conditionally | 7 | MEDIUM | DECISION_REQUIRED |

### Component systems — Phase 5 Task 5.2

Detailed evidence and per-file dispositions for all 140 component IDs live in `COMPONENT_AUDIT.md`. The grouped rows below mirror the complete component register and define migration control boundaries. No component is approved for deletion.

| ID range | Component system | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| COMP-001–COMP-027 | marketing assembly, sections, UI, Contact, Studio | 27 | approved page architecture and shared foundations | REWRITE/REPLACE/REFACTOR | 3/6/8 | CRITICAL | INVENTORIED |
| COMP-028–COMP-031 | admin access, navigation, licence revoke, OG tool | 4 | protected admin system | KEEP/REFACTOR | protected | CRITICAL | INVENTORIED |
| COMP-032–COMP-035 | AI workflows, Book, BuildFlow, docs layout | 4 | archive/replacement pages and canonical docs shell | ARCHIVE/REPLACE/REFACTOR | 5/6/8 | CRITICAL | INVENTORIED |
| COMP-036–COMP-047 | Kits pages, shells, finish flow, trackers, duplicate icons | 12 | purchaser-safe archive and compatibility flow | PROTECT/ARCHIVE/REPLACE | 6/8 | CRITICAL | INVENTORIED |
| COMP-048–COMP-057 | Proof, starting point, events, ProChat OS, waitlist | 10 | approved resources, product pages, and Contact/beta flow | REPLACE/ARCHIVE/PROTECT | 5/6/8 | CRITICAL | INVENTORIED |
| COMP-058–COMP-068 | personal, access, shell, auth, buttons, checkout, CTA | 11 | company About, canonical shell/button, protected auth/commerce | REFACTOR/REPLACE/KEEP | 1/6/8 | CRITICAL | INVENTORIED |
| COMP-069–COMP-080 | dashboard, FAQ, Header, hero, pricing, reviews, portal | 12 | protected app/commerce plus canonical public components | KEEP/REFACTOR/REWRITE | 1/3/6/8 | CRITICAL | INVENTORIED |
| COMP-081–COMP-091 | structured data, testimonials, theme motion, analytics, claims | 11 | canonical metadata, analytics, content, and theme behavior | KEEP/REFACTOR/ARCHIVE | 1/6/8 | CRITICAL | INVENTORIED |
| COMP-092–COMP-100 | content taxonomy, layouts, MDX, related content | 9 | current-product documentation system | KEEP/REFACTOR | 6 | HIGH | INVENTORIED |
| COMP-101–COMP-108 | contact, licence, purchase, and waitlist emails | 8 | protected email-safe design and current copy | PROTECT/REBRAND/REWRITE | protected | CRITICAL | INVENTORIED |
| COMP-109–COMP-120 | typography, icon buttons, media, payment, logo, hero, providers | 12 | canonical foundations plus protected provider/commerce boundaries | KEEP/REFACTOR/ARCHIVE | 1/3/6/8 | CRITICAL | INVENTORIED |
| COMP-121–COMP-140 | shared UI primitives and visual scaffolding | 20 | canonical token-based component library | KEEP/REFACTOR/VERIFY | 1/2/8 | HIGH | INVENTORIED |

Component-level migration cannot move from `INVENTORIED` to `DECIDED` until exact consumers, public APIs, accessibility, responsive behavior, runtime dependencies, and rollback are verified for the selected packet.

### Style systems — Phase 5 Task 5.3

Detailed evidence for STYLE-001 through STYLE-012 lives in `STYLE_AUDIT.md`.

| ID range | System | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| STYLE-001–STYLE-004 | global SCSS, blob backgrounds, marketing shell, warm Memory theme | 4 | canonical token/base layer and approved page compositions | REPLACE then ARCHIVE | 1/3/8 | CRITICAL | INVENTORIED |
| STYLE-005–STYLE-007 | Contact, waitlist, and docs route themes | 3 | canonical forms, mailing-list system, and current-product docs adapter | REWRITE/ARCHIVE | 6/8 | HIGH | INVENTORIED |
| STYLE-008–STYLE-012 | Tailwind, PostCSS, root layout, theme provider, provider boundary | 5 | lean canonical configuration and protected runtime boundary | KEEP/REWRITE/ARCHIVE | 1/8/protected | CRITICAL | INVENTORIED |

### Motion systems — Phase 5 Task 5.3

Detailed evidence for MOTION-001 through MOTION-030 lives in `MOTION_AUDIT.md`.

| ID range | System | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| MOTION-001–MOTION-005 | Framer Motion reveal, proof, newsletter, maintenance, 404 | 5 | canonical static/error states and approved micro-interactions | ARCHIVE/REPLACE | 3/6/8 | HIGH | INVENTORIED |
| MOTION-006–MOTION-010 | blob keyframes, global transitions, Contact/docs transitions, Tailwind animations | 5 | local CSS micro-interactions and no default atmospheric loops | REPLACE/ARCHIVE | 1/6/8 | CRITICAL | INVENTORIED |
| MOTION-011–MOTION-016 | legacy Memory motion, rotating text, theme motion, Header scroll, scroll hints | 6 | approved product stories, lean shell, and explicit affordances | ARCHIVE/REASSESS | 1/2/4/8 | CRITICAL | INVENTORIED |
| MOTION-017–MOTION-024 | lazy loading, legacy observers, form RAF, navigation/copy timers | 8 | protected functional behavior or rebuilt current flows | KEEP/ARCHIVE/REFACTOR | 6/8/protected | HIGH | INVENTORIED |
| MOTION-025–MOTION-030 | processing/admin/analytics timing, scaffolding parallax, static transform false positives | 6 | protected operations or owning component migration | KEEP/ARCHIVE/CLASSIFY | 2/8/protected | CRITICAL | INVENTORIED |

### Asset systems — Phase 5 Task 5.4

Detailed evidence for ASSET-001 through ASSET-075 lives in `ASSET_AUDIT.md`.

| ID range | Asset group | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| ASSET-001–ASSET-002 | repository/system metadata files | 2 | repository hygiene | ARCHIVE/REMOVE after proof | 8 | LOW | INVENTORIED |
| ASSET-003–ASSET-008 | legacy global hero-line backgrounds | 6 | no default atmospheric replacement | ARCHIVE | 1/8 | HIGH | INVENTORIED |
| ASSET-009–ASSET-010 | public PDFs | 2 | repository archive after content/rights review | ARCHIVE/VERIFY | 8 | CRITICAL | INVENTORIED |
| ASSET-011–ASSET-019 | email, favicon, touch, and font assets | 9 | canonical brand/font/email assets | KEEP/REPLACE/ARCHIVE | 1/6/8 | CRITICAL | INVENTORIED |
| ASSET-020–ASSET-039 | system SVG icon library | 20 | Lucide/custom canonical icon system | ARCHIVE after proof | 2/8 | MEDIUM | INVENTORIED |
| ASSET-040–ASSET-046 | company, email, favicon, and third-party logo assets | 7 | canonical company brand set | KEEP/REPLACE/ARCHIVE | 1/6/8 | HIGH | INVENTORIED |
| ASSET-047–ASSET-049 | Open Graph images | 3 | canonical company/product social assets | REPLACE/ARCHIVE | 6/8 | HIGH | INVENTORIED |
| ASSET-050–ASSET-064 | old Memory illustration set | 15 | new semantic HTML/CSS/SVG product visuals | ARCHIVE after `/memory` replacement | 4/8 | HIGH | INVENTORIED |
| ASSET-065–ASSET-066 | sitemap XML files | 2 | generated canonical sitemap | REBUILD/VERIFY | 6/7 | HIGH | INVENTORIED |
| ASSET-067–ASSET-071 | generic and historical social images | 5 | canonical social preview set | REPLACE/ARCHIVE | 6/8 | MEDIUM | INVENTORIED |
| ASSET-072–ASSET-075 | local Host font and SCSS source assets | 4 | canonical fonts and style foundation | REPLACE/ARCHIVE | 1/8 | CRITICAL | INVENTORIED |

### Dependency systems — Phase 5 Task 5.4

Detailed evidence for DEP-001 through DEP-071 lives in `DEPENDENCY_AUDIT.md`.

| ID range | Dependency group | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| DEP-001–DEP-005 | font, MDX, and Next helper packages | 5 | canonical font and simplified docs stack | VERIFY/REMOVE/REPLACE | 1/6/8 | HIGH | INVENTORIED |
| DEP-006–DEP-016 | Prisma, Radix primitives, email, Stripe.js | 11 | protected operations and canonical UI primitives | KEEP/REVIEW | protected/1 | CRITICAL | INVENTORIED |
| DEP-017–DEP-027 | API/forms/motion/PDF/icons/observability | 11 | protected app flows plus lean public runtime | KEEP/REMOVE/CONSOLIDATE | protected/8 | CRITICAL | INVENTORIED |
| DEP-028–DEP-038 | framework, themes, docs, DB, Radix umbrella, email tooling | 11 | core framework plus simplified theme/docs/package boundaries | KEEP/REMOVE/CONSOLIDATE | protected/1/6/8 | CRITICAL | INVENTORIED |
| DEP-039–DEP-049 | toast, masonry, syntax, print, tooltip, email, Sass, Stripe, validation | 11 | protected flows and lean public form/UI stack | KEEP/ARCHIVE/CONSOLIDATE | protected/6/8 | CRITICAL | INVENTORIED |
| DEP-050–DEP-060 | analyzer, types, ESLint, Autoprefixer | 11 | aligned build and validation tooling | KEEP/ALIGN/REMOVE | 9 | HIGH | INVENTORIED |
| DEP-061–DEP-071 | lint, Git hooks, PostCSS, Prisma, Tailwind, TS tooling | 11 | lean supported build/tooling stack | KEEP/VERIFY/REMOVE | 1/8/9/protected | CRITICAL | INVENTORIED |

### Explicit Task 5.4 ID coverage

Asset IDs represented in this matrix:

```text
ASSET-001, ASSET-002, ASSET-003, ASSET-004, ASSET-005, ASSET-006, ASSET-007, ASSET-008, ASSET-009, ASSET-010, ASSET-011, ASSET-012, ASSET-013, ASSET-014, ASSET-015, ASSET-016, ASSET-017, ASSET-018, ASSET-019, ASSET-020, ASSET-021, ASSET-022, ASSET-023, ASSET-024, ASSET-025, ASSET-026, ASSET-027, ASSET-028, ASSET-029, ASSET-030, ASSET-031, ASSET-032, ASSET-033, ASSET-034, ASSET-035, ASSET-036, ASSET-037, ASSET-038, ASSET-039, ASSET-040, ASSET-041, ASSET-042, ASSET-043, ASSET-044, ASSET-045, ASSET-046, ASSET-047, ASSET-048, ASSET-049, ASSET-050, ASSET-051, ASSET-052, ASSET-053, ASSET-054, ASSET-055, ASSET-056, ASSET-057, ASSET-058, ASSET-059, ASSET-060, ASSET-061, ASSET-062, ASSET-063, ASSET-064, ASSET-065, ASSET-066, ASSET-067, ASSET-068, ASSET-069, ASSET-070, ASSET-071, ASSET-072, ASSET-073, ASSET-074, ASSET-075
```

Dependency IDs represented in this matrix:

```text
DEP-001, DEP-002, DEP-003, DEP-004, DEP-005, DEP-006, DEP-007, DEP-008, DEP-009, DEP-010, DEP-011, DEP-012, DEP-013, DEP-014, DEP-015, DEP-016, DEP-017, DEP-018, DEP-019, DEP-020, DEP-021, DEP-022, DEP-023, DEP-024, DEP-025, DEP-026, DEP-027, DEP-028, DEP-029, DEP-030, DEP-031, DEP-032, DEP-033, DEP-034, DEP-035, DEP-036, DEP-037, DEP-038, DEP-039, DEP-040, DEP-041, DEP-042, DEP-043, DEP-044, DEP-045, DEP-046, DEP-047, DEP-048, DEP-049, DEP-050, DEP-051, DEP-052, DEP-053, DEP-054, DEP-055, DEP-056, DEP-057, DEP-058, DEP-059, DEP-060, DEP-061, DEP-062, DEP-063, DEP-064, DEP-065, DEP-066, DEP-067, DEP-068, DEP-069, DEP-070, DEP-071
```

### Non-route migration rows retained for later audits

| ID | Category | Current path | Canonical destination | Disposition | Wave | Risk | Status |
|---|---|---|---|---|---:|---|---|
| DOC-001 | document | `docs/strategy.md` | subordinate strategy bridge | KEEP | 0 | LOW | DECIDED |
| STYLE-001 | style | legacy global theme systems | ProChat semantic tokens | REPLACE | 1–8 | HIGH | INVENTORIED |

## Detailed record template

```yaml
id: "ROUTE-000"
category: "route"
path: ""
current_purpose: ""
current_consumers: []
publicly_discoverable: false
canonical_destination: ""
disposition: "DECISION_REQUIRED"
rationale: ""
wave: 0
risk: "LOW"
status: "INVENTORIED"
dependencies: []
blocks: []
redirect:
  required: false
  status_code: null
  destination: null
seo:
  canonical_change: false
  sitemap_change: false
  metadata_change: false
analytics:
  event_change: false
accessibility_risk: ""
performance_risk: ""
legal_or_privacy_risk: ""
replacement_paths: []
validation: []
rollback: ""
deletion_approved: false
owner: ""
notes: ""
```

## Migration wave board

### Wave 0 — Authority and documentation

Expected items:

- active repository documentation;
- archived strategy directions;
- canonical source links;
- migration documents;
- design and page specifications.

Commit boundary:

```text
docs-only changes
```

### Wave 1 — Fonts, tokens, and shared shell

Expected items:

- global font implementation;
- semantic color and spacing tokens;
- base document styles;
- header and footer foundations;
- coexistence boundary with legacy styles.

Commit boundary:

```text
foundation code and directly related tests/docs only
```

### Wave 2 — Shared primitives and design lab

Expected items:

- buttons, links, surfaces, form primitives;
- Memory and Workbench visual primitives;
- development-only design-lab routes;
- deterministic visual states.

### Wave 3 — Homepage

Expected items:

- company-first homepage;
- flagship Memory emphasis;
- QA and Workbench routes;
- canonical navigation and footer integration.

### Wave 4 — Memory and QA

Expected items:

- general Memory page;
- Memory for QA page;
- beta conversion path;
- legacy Memory/QA route redirects where approved.

### Wave 5 — Workbench

Expected items:

- canonical Workbench page;
- compatibility language where BuildFlow identifiers remain technical;
- removal or archival of competing public product names.

### Wave 6 — Company, legal, contact, docs, and errors

Expected items:

- philosophy;
- About;
- Contact and beta forms;
- Privacy;
- Terms;
- documentation entry;
- 404 and error states.

### Wave 7 — Redirects and route retirement

Expected items:

- redirect map;
- sitemap changes;
- canonical URL changes;
- route removal after verification.

### Wave 8 — Obsolete implementation removal

Expected items:

- styles;
- components;
- assets;
- motion code;
- dependencies;
- dead copy sources.

### Wave 9 — Absence and simplification proof

Expected items:

- old-name searches;
- dead import checks;
- route crawl;
- build and tests;
- documentation cleanup;
- repository-complexity review.

## Decision protocol

For every row marked `DECISION_REQUIRED`:

1. Identify current consumers.
2. Identify canonical responsibility.
3. Decide whether history, compatibility, SEO, analytics, or legal obligations require retention.
4. Choose one disposition.
5. Name the replacement or archive destination.
6. Assign migration wave and risk.
7. Define validation and rollback.
8. Obtain deletion approval when applicable.

## Commit protocol

- One coherent migration concern per commit.
- Explicit paths only.
- Do not stage the whole repository.
- Do not mix route removal with unrelated visual polish.
- Do not remove a shared dependency in the same commit that first introduces its replacement unless the migration is fully bounded and verified.
- Preserve a clean rollback point before destructive waves.

## Completion query

The migration program is not complete while any row remains:

```text
DECISION_REQUIRED
REPLACEMENT_PLANNED
MIGRATING
BLOCKED
```

High-risk rows require explicit validation evidence and final owner sign-off before `REMOVED`.
