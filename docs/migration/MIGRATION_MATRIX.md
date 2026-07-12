# ProChat Migration Matrix

**Status:** canonical migration control document  
**Authority:** `docs/migration/LEGACY_SWEEP_PLAN.md`

## Purpose

This matrix is the single operational view of what stays, changes, moves, redirects, or disappears during the public-platform foundation sweep.

It prevents hidden deletions, duplicated replacements, and migration waves that mix unrelated risk.

## Final classification authority

```yaml
archive_root: archive/legacy-public-platform
archive_runtime: false
archive_indexable: false
archive_importable: false
first_execution_packet: W0-P1 archive-governance-foundation
wave_specification: docs/migration/MIGRATION_WAVES.md
archive_specification: docs/migration/ARCHIVE_ARCHITECTURE.md
```

Every row and grouped range in this matrix is a final provisional decision. Execution remains dependency-gated. `BLOCKED_BY_OBLIGATION` means the outcome is decided but cannot execute until its named legal, purchaser, data, or operational obligation closes.

### Inherited execution contract

Unless a row states a stricter rule, every migration item inherits:

```yaml
prerequisite:
  - exact consumer and dependency verification
  - canonical replacement or protected compatibility boundary
  - clean pre-change commit
validation:
  - exact diff
  - type check and production build when source changes
  - route, accessibility, performance, and protected-flow tests as applicable
  - archive import/build/indexing exclusion
rollback:
  - revert the bounded migration commit
  - restore the prior route or compatibility surface from the recorded pre-change commit
approval:
  archive_move: explicit packet approval
  route_retirement: explicit packet approval
  package_removal: explicit packet approval
  protected_function_change: obligation-owner approval
owner: Steve Westhoek
```

### Protected application boundary

| Capability | Classification | Public-platform relationship | Final provisional outcome |
|---|---|---|---|
| Authentication | protected internal application | not a public product | KEEP while any protected consumer remains; isolate from public shell |
| Admin | protected internal application | no public navigation or indexing | PROTECT; refactor only in separate internal packets |
| Chat and project functionality | protected historical application | not part of the new landing platform | isolate, PROTECT pending data/API closure, then ARCHIVE if unused |
| Stripe and commerce | protected previous-purchaser obligation | not a new public-platform dependency by default | KEEP until products, subscriptions, webhooks, invoices, and portal obligations close |
| Licences | protected previous-purchaser obligation | compatibility only | KEEP and test until revocation, access, and claim obligations close |
| Previous kit purchasers | protected previous-purchaser obligation | minimal access-only compatibility | retain only necessary claim/finish/access surfaces; archive marketing pages |
| Contact | canonical public platform | current company contact | REBUILD on approved form, privacy, validation, and email contracts |
| Future mailing list | canonical public platform | new functionality | REBUILD cleanly; the future mailing list must not extend the legacy waitlist/newsletter/MailerLite code |
| Email | protected and canonical shared service | Contact, mailing list, legal and transactional obligations | retain Resend/React Email until provider decision; create email-safe design subset |
| Analytics | protected operational capability | minimal approved public events only | retain verified analytics; archive debug and legacy event wrappers after migration |
| Prisma/PostgreSQL | protected operational data layer | no direct public presentation | KEEP while protected data obligations remain; never archive data or migrations blindly |
| Documentation | canonical public platform plus historical archive | current products only | rebuild `/docs`; archive legacy product entries and tooling not retained |
| OG/social generation | canonical public platform plus protected admin tool | current metadata only | refactor canonical generator; protect admin tool until replacement passes |
| Debug routes | protected internal diagnostics | noindex and no navigation | protect temporarily, then archive/remove-later after observability review |
| Waitlists/newsletters | historical archive | replaced by new mailing-list or QA beta flow | migrate approved data, then archive routes, handlers, styles, emails, and admin UI |
| MailerLite | historical integration | no assumed future use | archive after the new provider succeeds and unsubscribe obligations are preserved |
| GitHub integrations | historical integration unless explicitly retained | no public-platform dependency | archive after credential, webhook, and consumer review |
| Make integrations | historical integration | no public-platform dependency | archive after zero-consumer and data-flow proof |
| n8n integrations | historical integration | no public-platform dependency | archive after zero-consumer and data-flow proof |
| Social publishing | historical internal tool | no public-platform dependency | archive after credential and consumer review |
| BuildFlow identifiers | temporary compatibility layer | must never appear as a current public product | retain only required operation IDs, source IDs, package names, APIs, environment variables, and persisted records |

## Required status values

```text
INVENTORIED
DECIDED
REPLACEMENT_PLANNED
REPLACEMENT_READY
PROTECTED
BLOCKED_BY_OBLIGATION
MIGRATING
VERIFIED
DEPRECATED
ARCHIVED
REDIRECTED
REMOVED
```

## Disposition values

```text
KEEP
PROTECT
CREATE
REFACTOR
REWRITE
REPLACE
ARCHIVE
REDIRECT
REMOVE-LATER
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
| ROUTE-002 | `/prochat-memory` | `/memory` | REPLACE, REDIRECT, then ARCHIVE old route implementation | 4/7/8 | HIGH | DECIDED | required permanent after replacement |
| ROUTE-003 | `/qa-memory` | `/memory/qa` | REPLACE, REDIRECT, then ARCHIVE old route implementation | 4/7/8 | HIGH | DECIDED | required permanent after replacement |
| ROUTE-004 | `/contact` | `/contact` | REWRITE/REFACTOR | 6 | HIGH | DECIDED | no |
| ROUTE-005 | `/privacy` | `/privacy` | REWRITE | 6 | CRITICAL | DECIDED | no |
| ROUTE-006 | `/terms` | `/terms` | REWRITE | 6 | CRITICAL | DECIDED | no |
| ROUTE-007 | `/docs` | `/docs` | REWRITE | 6 | HIGH | DECIDED | no |
| ROUTE-008 | `/docs/[category]/[[...slug]]` | current-product documentation taxonomy | REWRITE retained entries; NOINDEX and ARCHIVE all legacy product entries | 6/7/8 | HIGH | DECIDED | entry-specific only |
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
| ROUTE-019 | `/systems/events` | historical archive | NOINDEX then ARCHIVE; retire unless a semantic replacement is approved | 7/8 | HIGH | DECIDED | none by default |
| ROUTE-020 | `/ai-workflows` | historical archive | NOINDEX then ARCHIVE; do not imply current Workbench capability | 7/8 | HIGH | DECIDED | none by default |
| ROUTE-021 | `/legal-ai-workflows` | historical archive | NOINDEX then ARCHIVE | 7/8 | HIGH | DECIDED | none by default |
| ROUTE-022 | `/studio` | historical archive | NOINDEX then ARCHIVE and REMOVE-LATER | 7/8 | HIGH | DECIDED | none by default |
| ROUTE-023 | `/kits` | purchaser compatibility hub only if obligations exist | ARCHIVE public product page; retain minimal protected compatibility when required | 7/8 | CRITICAL | DECIDED | obligation-dependent |
| ROUTE-024 | `/kits/prokit` | protected purchaser compatibility or archive | ARCHIVE public product page; retain access-only compatibility if required | 7/8 | CRITICAL | DECIDED | obligation-dependent |
| ROUTE-025 | `/kits/prokit/finish` | protected purchaser flow | PROTECT until obligations close, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION | no |
| ROUTE-026 | `/kits/saaskit` | protected purchaser compatibility or archive | ARCHIVE public product page; retain access-only compatibility if required | 7/8 | CRITICAL | DECIDED | obligation-dependent |
| ROUTE-027 | `/kits/saaskit/finish` | protected purchaser flow | PROTECT until obligations close, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION | no |
| ROUTE-028 | `/kits/uxkit` | historical archive | NOINDEX then ARCHIVE/REMOVE-LATER | 7/8 | HIGH | DECIDED | none by default |
| ROUTE-029 | `/kits/waaskit` | historical archive | NOINDEX then ARCHIVE/REMOVE-LATER | 7/8 | HIGH | DECIDED | none by default |
| ROUTE-030 | `/waitlist` | new mailing-list or QA beta destination | REPLACE, then REDIRECT and ARCHIVE old implementation | 6/7/8 | CRITICAL | DECIDED | required after replacement |
| ROUTE-031 | `/waiting-list` | new mailing-list or QA beta destination | retain current redirect temporarily, then point to canonical replacement | 7 | HIGH | DECIDED | required |
| ROUTE-032 | `/book` | historical archive | NOINDEX then ARCHIVE/REMOVE-LATER | 7/8 | MEDIUM | DECIDED | none by default |
| ROUTE-033 | `/proof` | historical archive | NOINDEX then ARCHIVE/REMOVE-LATER | 7/8 | MEDIUM | DECIDED | none by default |
| ROUTE-034 | `/starting-point` | historical archive | NOINDEX then ARCHIVE; redirect only if a semantically equivalent current guide exists | 7/8 | MEDIUM | DECIDED | conditional |
| ROUTE-035 | `/learn` | `/docs` only after current-product docs exist | NOINDEX legacy content, rebuild canonical docs, then ARCHIVE | 6/7/8 | HIGH | DECIDED | conditional to `/docs` |
| ROUTE-036 | `/learn/production-guide` | historical documentation archive | NOINDEX then ARCHIVE | 7/8 | MEDIUM | DECIDED | none unless equivalent exists |
| ROUTE-037 | `/learn/saas-starting-point` | historical documentation archive | NOINDEX then ARCHIVE | 7/8 | MEDIUM | DECIDED | none unless equivalent exists |
| ROUTE-038 | `/blog` | historical archive until a new editorial strategy exists | replace current `/learn` redirect with an approved archive/404 outcome | 7/8 | MEDIUM | DECIDED | remove misleading redirect |
| ROUTE-039 | `/blog/[slug]` | historical archive by entry | NOINDEX then ARCHIVE; retain no entry as current without content review | 7/8 | HIGH | DECIDED | entry-specific only |
| ROUTE-040 | `/prompts` | historical documentation archive | NOINDEX then ARCHIVE/REMOVE-LATER | 7/8 | MEDIUM | DECIDED | none by default |
| ROUTE-041 | `/prompts/[category]/[slug]` | historical archive by entry | NOINDEX then ARCHIVE | 7/8 | MEDIUM | DECIDED | entry-specific only |
| ROUTE-042 | `/waas/accountants` | historical archive | NOINDEX then ARCHIVE/REMOVE-LATER | 7/8 | HIGH | DECIDED | none by default |
| ROUTE-043 | `/privacy-policy` | `/privacy` | retain redirect | 7 | MEDIUM | REDIRECTED | existing permanent |
| ROUTE-044 | `/tos` | `/terms` | retain redirect | 7 | MEDIUM | REDIRECTED | existing permanent |

### Internal, authenticated, operational, and utility pages

| ID | Current path | Canonical destination | Disposition | Wave | Risk | Status | Redirect |
|---|---|---|---|---:|---|---|---|
| ROUTE-045 | `/admin` | `/admin/licenses` | PROTECT redirect and internal access boundary | protected | HIGH | DECIDED | existing runtime |
| ROUTE-046 | `/admin/licenses` | protected internal administration | PROTECT and REFACTOR only inside a separately approved internal packet | protected | CRITICAL | DECIDED | no |
| ROUTE-047 | `/admin/og` | protected internal OG tooling | PROTECT until canonical OG generation is verified; then REFACTOR or ARCHIVE | protected/8 | HIGH | DECIDED | no |
| ROUTE-048 | `/admin/waitlist` | protected mailing-list administration | PROTECT until new mailing-list data is migrated; then REPLACE and ARCHIVE old admin | protected/6/8 | CRITICAL | DECIDED | no |
| ROUTE-049 | `/dashboard` | protected historical application | isolate from public shell; PROTECT pending internal-scope closure, then ARCHIVE | protected/8 | CRITICAL | DECIDED | no |
| ROUTE-050 | `/chat/[projectID]` | protected historical application | isolate and PROTECT pending data/API scope closure, then ARCHIVE if unused | protected/8 | CRITICAL | DECIDED | no |
| ROUTE-051 | `/preferences` | protected application preferences | PROTECT while any internal application consumer remains; then ARCHIVE | protected/8 | HIGH | DECIDED | no |
| ROUTE-052 | `/sign-in/[[...sign-in]]` | protected authentication | KEEP until all protected consumers are retired or replaced | protected | CRITICAL | DECIDED | no |
| ROUTE-053 | `/sign-up/[[...sign-up]]` | protected authentication | KEEP only for active protected consumers; no public-platform dependency | protected/8 | CRITICAL | DECIDED | no |
| ROUTE-054 | `/processing-page/[[...processing-page]]` | protected transactional compatibility | PROTECT until purchaser/payment obligations close, then ARCHIVE | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION | no |
| ROUTE-055 | `/success` | protected transactional compatibility | PROTECT until purchaser/payment obligations close, then ARCHIVE | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION | no |
| ROUTE-056 | `/maintenance` | canonical unavailable state | REPLACE using canonical system-state components | 6 | HIGH | DECIDED | no |
| ROUTE-057 | `/debug/analytics` | internal diagnostic archive | PROTECT and NOINDEX until observability verification, then ARCHIVE/REMOVE-LATER | protected/8 | HIGH | DECIDED | no |
| ROUTE-058 | `/unsubscribe` | legally required communication control | KEEP and REFACTOR for the selected current email provider | 6 | CRITICAL | DECIDED | no |

### Current, legacy, and internal route handlers

| ID | Current path | Canonical destination | Disposition | Wave | Risk | Status |
|---|---|---|---|---:|---|---|
| ROUTE-059 | `/api/contact` | canonical Contact handler | KEEP then REFACTOR against approved validation, privacy, and email contracts | 6 | CRITICAL | DECIDED |
| ROUTE-060 | `/api/health` | protected operational health | KEEP | protected | HIGH | DECIDED |
| ROUTE-084 | `/admin/licenses/revoke` | protected licence administration | PROTECT until licence obligations close; never expose publicly | protected | CRITICAL | DECIDED |
| ROUTE-061 | `/api/preferences` | protected application API | PROTECT while internal application remains, then ARCHIVE | protected/8 | HIGH | DECIDED |
| ROUTE-062 | `/api/projects` | protected historical application API | isolate and PROTECT pending data-consumer closure, then ARCHIVE | protected/8 | CRITICAL | DECIDED |
| ROUTE-063 | `/api/tenants/projects` | protected historical application API | isolate and PROTECT pending tenant/data closure, then ARCHIVE | protected/8 | CRITICAL | DECIDED |
| ROUTE-064 | `/api/subscription` | protected purchaser/commerce API | PROTECT until subscription obligations close, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION |
| ROUTE-065 | `/api/stripe/create-checkout` | protected commerce API | PROTECT while current purchaser or licence flows remain | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION |
| ROUTE-066 | `/api/stripe/create-portal` | protected commerce API | PROTECT while current customer portal obligations remain | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION |
| ROUTE-067 | `/api/webhook/stripe` | protected webhook compatibility | PROTECT until all Stripe events, products, licences, and data obligations are closed | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION |
| ROUTE-068 | `/api/store/prokit/claim` | protected purchaser compatibility | PROTECT until claim obligations close, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION |
| ROUTE-069 | `/api/store/saaskit/claim` | protected purchaser compatibility | PROTECT until claim obligations close, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | BLOCKED_BY_OBLIGATION |
| ROUTE-070 | `/api/waitlist` | new canonical mailing-list or QA beta handler | REPLACE, migrate approved data, then ARCHIVE old handler | 6/8 | CRITICAL | DECIDED |
| ROUTE-071 | `/api/waiting-list` | historical waitlist archive | PROTECT only until consumer/data migration, then ARCHIVE/REMOVE-LATER | 6/8 | CRITICAL | DECIDED |
| ROUTE-072 | `/api/mailerlite/subscribe` | historical integration archive | PROTECT until new mailing-list provider succeeds, then ARCHIVE/REMOVE-LATER | 6/8 | CRITICAL | DECIDED |
| ROUTE-073 | `/api/(make)/active` | historical integration archive | PROTECT for zero-consumer/data-flow proof, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | DECIDED |
| ROUTE-074 | `/api/(make)/link` | historical integration archive | PROTECT for zero-consumer/data-flow proof, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | DECIDED |
| ROUTE-075 | `/api/(make)/scenarios` | historical integration archive | PROTECT for zero-consumer/data-flow proof, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | DECIDED |
| ROUTE-076 | `/api/(make)/scenarios/openAIAssistant` | historical integration archive | PROTECT for zero-consumer/data-flow proof, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | DECIDED |
| ROUTE-077 | `/api/(n8n)/workflows/openAIAssistant` | historical integration archive | PROTECT for zero-consumer/data-flow proof, then ARCHIVE/REMOVE-LATER | protected/8 | CRITICAL | DECIDED |
| ROUTE-078 | `/api/social/next` | historical social-publishing archive | PROTECT until consumer/credential review, then ARCHIVE/REMOVE-LATER | protected/8 | HIGH | DECIDED |
| ROUTE-079 | `/api/social/mark-posted` | historical social-publishing archive | PROTECT until consumer/credential review, then ARCHIVE/REMOVE-LATER | protected/8 | HIGH | DECIDED |
| ROUTE-080 | `/social` | historical internal social tool | NOINDEX and PROTECT until consumer review, then ARCHIVE | protected/8 | HIGH | DECIDED |
| ROUTE-081 | `/go` | temporary compatibility redirect helper | PROTECT until every destination and external consumer is mapped, then REPLACE or ARCHIVE | protected/7/8 | HIGH | DECIDED |
| ROUTE-082 | `/og` | canonical OG service | KEEP and REFACTOR against canonical assets and metadata | 6 | MEDIUM | DECIDED |
| ROUTE-083 | `/blog/[slug]/og` | historical blog OG archive | ARCHIVE with legacy article entries; keep only if an approved retained entry exists | 7/8 | MEDIUM | DECIDED |

### Component systems — Phase 5 Task 5.2

Detailed evidence and per-file dispositions for all 140 component IDs live in `COMPONENT_AUDIT.md`. The grouped rows below mirror the complete component register and define migration control boundaries. No component is approved for deletion.

| ID range | Component system | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| COMP-001–COMP-027 | marketing assembly, sections, UI, Contact, Studio | 27 | approved page architecture and shared foundations | REWRITE/REPLACE/REFACTOR | 3/6/8 | CRITICAL | DECIDED |
| COMP-028–COMP-031 | admin access, navigation, licence revoke, OG tool | 4 | protected admin system | KEEP/REFACTOR | protected | CRITICAL | DECIDED |
| COMP-032–COMP-035 | AI workflows, Book, BuildFlow, docs layout | 4 | archive/replacement pages and canonical docs shell | ARCHIVE/REPLACE/REFACTOR | 5/6/8 | CRITICAL | DECIDED |
| COMP-036–COMP-047 | Kits pages, shells, finish flow, trackers, duplicate icons | 12 | purchaser-safe archive and compatibility flow | PROTECT/ARCHIVE/REPLACE | 6/8 | CRITICAL | DECIDED |
| COMP-048–COMP-057 | Proof, starting point, events, ProChat OS, waitlist | 10 | approved resources, product pages, and Contact/beta flow | REPLACE/ARCHIVE/PROTECT | 5/6/8 | CRITICAL | DECIDED |
| COMP-058–COMP-068 | personal, access, shell, auth, buttons, checkout, CTA | 11 | company About, canonical shell/button, protected auth/commerce | REFACTOR/REPLACE/KEEP | 1/6/8 | CRITICAL | DECIDED |
| COMP-069–COMP-080 | dashboard, FAQ, Header, hero, pricing, reviews, portal | 12 | protected app/commerce plus canonical public components | KEEP/REFACTOR/REWRITE | 1/3/6/8 | CRITICAL | DECIDED |
| COMP-081–COMP-091 | structured data, testimonials, theme motion, analytics, claims | 11 | canonical metadata, analytics, content, and theme behavior | KEEP/REFACTOR/ARCHIVE | 1/6/8 | CRITICAL | DECIDED |
| COMP-092–COMP-100 | content taxonomy, layouts, MDX, related content | 9 | current-product documentation system | KEEP/REFACTOR | 6 | HIGH | DECIDED |
| COMP-101–COMP-108 | contact, licence, purchase, and waitlist emails | 8 | protected email-safe design and current copy | PROTECT/REBRAND/REWRITE | protected | CRITICAL | DECIDED |
| COMP-109–COMP-120 | typography, icon buttons, media, payment, logo, hero, providers | 12 | canonical foundations plus protected provider/commerce boundaries | KEEP/REFACTOR/ARCHIVE | 1/3/6/8 | CRITICAL | DECIDED |
| COMP-121–COMP-140 | shared UI primitives and visual scaffolding | 20 | canonical token-based component library | KEEP/REFACTOR/VERIFY | 1/2/8 | HIGH | DECIDED |

Component-level migration cannot move from `INVENTORIED` to `DECIDED` until exact consumers, public APIs, accessibility, responsive behavior, runtime dependencies, and rollback are verified for the selected packet.

### Style systems — Phase 5 Task 5.3

Detailed evidence for STYLE-001 through STYLE-012 lives in `STYLE_AUDIT.md`.

| ID range | System | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| STYLE-001–STYLE-004 | global SCSS, blob backgrounds, marketing shell, warm Memory theme | 4 | canonical token/base layer and approved page compositions | REPLACE then ARCHIVE | 1/3/8 | CRITICAL | DECIDED |
| STYLE-005–STYLE-007 | Contact, waitlist, and docs route themes | 3 | canonical forms, mailing-list system, and current-product docs adapter | REWRITE/ARCHIVE | 6/8 | HIGH | DECIDED |
| STYLE-008–STYLE-012 | Tailwind, PostCSS, root layout, theme provider, provider boundary | 5 | lean canonical configuration and protected runtime boundary | KEEP/REWRITE/ARCHIVE | 1/8/protected | CRITICAL | DECIDED |

### Motion systems — Phase 5 Task 5.3

Detailed evidence for MOTION-001 through MOTION-030 lives in `MOTION_AUDIT.md`.

| ID range | System | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| MOTION-001–MOTION-005 | Framer Motion reveal, proof, newsletter, maintenance, 404 | 5 | canonical static/error states and approved micro-interactions | ARCHIVE/REPLACE | 3/6/8 | HIGH | DECIDED |
| MOTION-006–MOTION-010 | blob keyframes, global transitions, Contact/docs transitions, Tailwind animations | 5 | local CSS micro-interactions and no default atmospheric loops | REPLACE/ARCHIVE | 1/6/8 | CRITICAL | DECIDED |
| MOTION-011–MOTION-016 | legacy Memory motion, rotating text, theme motion, Header scroll, scroll hints | 6 | approved product stories, lean shell, and explicit affordances | ARCHIVE/REASSESS | 1/2/4/8 | CRITICAL | DECIDED |
| MOTION-017–MOTION-024 | lazy loading, legacy observers, form RAF, navigation/copy timers | 8 | protected functional behavior or rebuilt current flows | KEEP/ARCHIVE/REFACTOR | 6/8/protected | HIGH | DECIDED |
| MOTION-025–MOTION-030 | processing/admin/analytics timing, scaffolding parallax, static transform false positives | 6 | protected operations or owning component migration | KEEP/ARCHIVE/CLASSIFY | 2/8/protected | CRITICAL | DECIDED |

### Asset systems — Phase 5 Task 5.4

Detailed evidence for ASSET-001 through ASSET-075 lives in `ASSET_AUDIT.md`.

| ID range | Asset group | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| ASSET-001–ASSET-002 | repository/system metadata files | 2 | repository hygiene | ARCHIVE/REMOVE after proof | 8 | LOW | DECIDED |
| ASSET-003–ASSET-008 | legacy global hero-line backgrounds | 6 | no default atmospheric replacement | ARCHIVE | 1/8 | HIGH | DECIDED |
| ASSET-009–ASSET-010 | public PDFs | 2 | repository archive after content/rights review | ARCHIVE/VERIFY | 8 | CRITICAL | DECIDED |
| ASSET-011–ASSET-019 | email, favicon, touch, and font assets | 9 | canonical brand/font/email assets | KEEP/REPLACE/ARCHIVE | 1/6/8 | CRITICAL | DECIDED |
| ASSET-020–ASSET-039 | system SVG icon library | 20 | Lucide/custom canonical icon system | ARCHIVE after proof | 2/8 | MEDIUM | DECIDED |
| ASSET-040–ASSET-046 | company, email, favicon, and third-party logo assets | 7 | canonical company brand set | KEEP/REPLACE/ARCHIVE | 1/6/8 | HIGH | DECIDED |
| ASSET-047–ASSET-049 | Open Graph images | 3 | canonical company/product social assets | REPLACE/ARCHIVE | 6/8 | HIGH | DECIDED |
| ASSET-050–ASSET-064 | old Memory illustration set | 15 | new semantic HTML/CSS/SVG product visuals | ARCHIVE after `/memory` replacement | 4/8 | HIGH | DECIDED |
| ASSET-065–ASSET-066 | sitemap XML files | 2 | generated canonical sitemap | REBUILD/VERIFY | 6/7 | HIGH | DECIDED |
| ASSET-067–ASSET-071 | generic and historical social images | 5 | canonical social preview set | REPLACE/ARCHIVE | 6/8 | MEDIUM | DECIDED |
| ASSET-072–ASSET-075 | local Host font and SCSS source assets | 4 | canonical fonts and style foundation | REPLACE/ARCHIVE | 1/8 | CRITICAL | DECIDED |

### Dependency systems — Phase 5 Task 5.4

Detailed evidence for DEP-001 through DEP-071 lives in `DEPENDENCY_AUDIT.md`.

| ID range | Dependency group | Count | Canonical destination | Primary disposition | Wave | Highest risk | Status |
|---|---|---:|---|---|---:|---|---|
| DEP-001–DEP-005 | font, MDX, and Next helper packages | 5 | canonical font and simplified docs stack | VERIFY/REMOVE/REPLACE | 1/6/8 | HIGH | DECIDED |
| DEP-006–DEP-016 | Prisma, Radix primitives, email, Stripe.js | 11 | protected operations and canonical UI primitives | KEEP/REVIEW | protected/1 | CRITICAL | DECIDED |
| DEP-017–DEP-027 | API/forms/motion/PDF/icons/observability | 11 | protected app flows plus lean public runtime | KEEP/REMOVE/CONSOLIDATE | protected/8 | CRITICAL | DECIDED |
| DEP-028–DEP-038 | framework, themes, docs, DB, Radix umbrella, email tooling | 11 | core framework plus simplified theme/docs/package boundaries | KEEP/REMOVE/CONSOLIDATE | protected/1/6/8 | CRITICAL | DECIDED |
| DEP-039–DEP-049 | toast, masonry, syntax, print, tooltip, email, Sass, Stripe, validation | 11 | protected flows and lean public form/UI stack | KEEP/ARCHIVE/CONSOLIDATE | protected/6/8 | CRITICAL | DECIDED |
| DEP-050–DEP-060 | analyzer, types, ESLint, Autoprefixer | 11 | aligned build and validation tooling | KEEP/ALIGN/REMOVE | 9 | HIGH | DECIDED |
| DEP-061–DEP-071 | lint, Git hooks, PostCSS, Prisma, Tailwind, TS tooling | 11 | lean supported build/tooling stack | KEEP/VERIFY/REMOVE | 1/8/9/protected | CRITICAL | DECIDED |

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
| STYLE-001 | style | legacy global theme systems | ProChat semantic tokens | REPLACE | 1–8 | HIGH | DECIDED |

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
