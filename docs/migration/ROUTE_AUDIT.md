# ProChat Route Audit

**Status:** Phase 5 Task 5.1 inventory complete  
**Scope:** App Router pages, route handlers, layouts, redirects, navigation, footer, sitemap, robots, metadata, forms, documentation, and error handling  
**Audit date:** 2026-07-11  
**Production changes:** none

## Canonical public responsibilities

```text
/
/memory
/memory/qa
/workbench
/philosophy
/about
/contact
/privacy
/terms
/docs or documentation entry
404 and error states
```

Existing paths may remain temporarily for compatibility, but every active route must map to one canonical responsibility.

## Audit method

Read-only inspection covered:

- every `page.*`, `layout.*`, `loading.*`, `error.*`, `not-found.*`, `route.*`, `sitemap.*`, and `robots.*` file below `src/app/**`;
- `next.config.js` redirects;
- `src/components/Header.tsx`;
- `src/app/(marketing)/components/layout/Footer.tsx`;
- `src/helpers/chrome-routes.ts`;
- root and nested sitemap ownership;
- public form and waitlist handlers;
- current product, legal, documentation, auth, administration, utility, and legacy routes.

No source route, metadata, redirect, navigation, copy, or package file was changed.

# Executive findings

## Route counts

```yaml
page_routes_discovered: 50
route_handlers_discovered: 26
layout_files_discovered: 8
error_or_not_found_files_discovered: 3
sitemap_files_discovered: 2
robots_files_discovered: 1
next_config_redirects_discovered: 14
canonical_responsibilities_present_at_final_path: 6
canonical_responsibilities_present_at_legacy_path: 3
canonical_responsibilities_missing: 5
```

The route-handler count includes API, OG, redirect, social, and webhook handlers.

## Canonical responsibilities currently present

| Responsibility | Current route | Evidence | Status | Preliminary disposition |
|---|---|---|---|---|
| Homepage | `/` | `src/app/page.tsx` | current responsibility | REWRITE in place |
| Contact | `/contact` | `src/app/(marketing)/contact/page.tsx` | current responsibility | REWRITE in place |
| Privacy | `/privacy` | `src/app/(marketing)/privacy/page.tsx` | current responsibility, stale legal scope | REWRITE after legal review |
| Terms | `/terms` | `src/app/(marketing)/terms/page.tsx` | current responsibility, stale product scope | REWRITE after legal review |
| Documentation entry | `/docs` | `src/app/docs/page.tsx` | current route, legacy SaaSKit/ProKit content | REWRITE and re-scope |
| 404 and route error | global | `src/app/not-found.tsx`, `src/app/error.tsx` | current responsibility, legacy visual treatment | REPLACE or REFACTOR |

## Canonical responsibilities present only at legacy paths

| Canonical responsibility | Current route | Evidence | Status | Likely canonical destination |
|---|---|---|---|---|
| ProChat Memory | `/prochat-memory` | `src/app/prochat-memory/page.tsx` | current product at legacy path and legacy design | `/memory` |
| ProChat Memory for QA | `/qa-memory` | `src/app/qa-memory/page.tsx` | current edition at legacy path | `/memory/qa` |
| ProChat Workbench | `/buildflow` and contact topic | `src/app/buildflow/page.tsx`, `src/components/Header.tsx` | stale product identity; header has no Workbench page | `/workbench` |

## Missing canonical responsibilities

| Missing route | Responsibility | Required action | Risk |
|---|---|---|---|
| `/memory` | ProChat Memory | create after approved page copy/design; later redirect `/prochat-memory` | HIGH |
| `/memory/qa` | Memory for QA | create after approved page copy/design; later redirect `/qa-memory` | HIGH |
| `/workbench` | ProChat Workbench | create after approved copy/design; later resolve `/buildflow` | HIGH |
| `/philosophy` | company philosophy | create editorial page | MEDIUM |
| `/about` | company/founder context | create company page | MEDIUM |

## Highest-risk findings

1. **`/buildflow` publicly contradicts canonical strategy.** Its metadata calls BuildFlow a product and states that ProChat OS is the flagship. Evidence: `src/app/buildflow/page.tsx`.
2. **`/systems/prochat-os` is a fully indexable legacy product page** with structured data and current-product language. Evidence: `src/app/systems/prochat-os/page.tsx`.
3. **The legal pages still define ProChat around SaaSKit and ProKit purchases.** Evidence: `src/app/(marketing)/privacy/page.tsx` and `src/app/(marketing)/terms/page.tsx`.
4. **The public docs are explicitly SaaSKit/ProKit implementation docs.** Evidence: `src/app/docs/page.tsx` and `src/app/docs/[category]/[[...slug]]/page.tsx`.
5. **The current waitlist promotes UXKit, WaaSKit, and ProChat OS** and is indexable. Evidence: `src/app/waitlist/page.tsx`.
6. **The header has no Philosophy or Documentation item and routes Workbench to a contact topic instead of a product page.** Evidence: `src/components/Header.tsx`.
7. **The footer lacks Philosophy and About and contains unqualified “Private, persistent” copy.** Evidence: `src/app/(marketing)/components/layout/Footer.tsx`.
8. **`robots.ts` advertises `/sitemap.xml`, but no root `src/app/sitemap.ts` was found.** Only nested docs and learn sitemaps exist. Evidence: `src/app/robots.ts`, `src/app/docs/sitemap.ts`, `src/app/learn/sitemap.ts`.
9. **The root layout forces `className="dark"`, retains Host Grotesk, and preloads legacy hero backgrounds.** This is a shell migration dependency, not a route deletion task. Evidence: `src/app/layout.tsx`.
10. **The Memory page is a 69 KB client page with embedded CSS, external Google Fonts, and a fully separate theme.** Evidence: `src/app/prochat-memory/page.tsx`.

# Page-route inventory

## Canonical, current, or required public responsibilities

| ID | Route | Source evidence | Public/indexable | Current purpose | Canonical responsibility | Status | Preliminary disposition | Destination | Wave | Risk | Validation and rollback |
|---|---|---|---|---|---|---|---|---|---:|---|---|
| ROUTE-001 | `/` | `src/app/page.tsx` | yes / yes | ProChat marketing homepage | Homepage | CURRENT | REWRITE | `/` | 3 | HIGH | visual, claims, metadata, CTA, performance; restore prior page commit |
| ROUTE-002 | `/prochat-memory` | `src/app/prochat-memory/page.tsx` | yes / presumed yes | general Memory landing page | Memory | CURRENT at legacy path | REPLACE then REDIRECT | `/memory` | 4/7 | HIGH | route crawl, canonical, visual, performance; preserve old route until replacement passes |
| ROUTE-003 | `/qa-memory` | `src/app/qa-memory/page.tsx` | yes / yes | QA edition landing page | Memory for QA | CURRENT at legacy path | REPLACE then REDIRECT | `/memory/qa` | 4/7 | HIGH | conversion, claims, form destination, metadata; preserve old route until verified |
| ROUTE-004 | `/contact` | `src/app/(marketing)/contact/page.tsx`, `src/app/api/contact/route.ts` | yes / presumed yes | general and product-topic contact form | Contact and beta enquiries | CURRENT | REWRITE/REFACTOR | `/contact` | 6 | HIGH | form E2E, privacy, analytics, keyboard, error states; retain working endpoint until replacement passes |
| ROUTE-005 | `/privacy` | `src/app/(marketing)/privacy/page.tsx` | yes / yes | website and digital-product privacy | Privacy | CURRENT but stale | REWRITE | `/privacy` | 6 | CRITICAL | legal/data-flow review, links, dates; keep current legal page until approved replacement |
| ROUTE-006 | `/terms` | `src/app/(marketing)/terms/page.tsx` | yes / yes | digital-product terms for kits | Terms | CURRENT but stale | REWRITE | `/terms` | 6 | CRITICAL | legal/licensing review, links, dates; keep current page until approved replacement |
| ROUTE-007 | `/docs` | `src/app/docs/page.tsx`, `src/app/docs/layout.tsx` | yes / yes | SaaSKit/ProKit documentation index | Documentation entry | CURRENT route, stale content | REWRITE | `/docs` | 6 | HIGH | public-doc source audit, sitemap, canonical, link crawl; retain until new entry works |
| ROUTE-008 | `/docs/[category]/[[...slug]]` | `src/app/docs/[category]/[[...slug]]/page.tsx` | yes / generated | dynamic legacy product docs | Product documentation | LEGACY/DECISION REQUIRED | ARCHIVE, REWRITE, or NOINDEX by entry | current docs taxonomy TBD | 6/7 | HIGH | entry-level inventory, link crawl, indexing; no bulk deletion |
| ROUTE-009 | global 404 | `src/app/not-found.tsx` | public / noindex by status | missing-route recovery | 404 | CURRENT | REPLACE | global | 6 | MEDIUM | forced 404, keyboard, reduced motion, current links; restore old file |
| ROUTE-010 | global error | `src/app/error.tsx` | public operational | route error recovery | Error state | CURRENT | REPLACE | global | 6 | HIGH | forced errors, reset, no internal leakage, accessibility; restore old file |
| ROUTE-011 | docs 404 | `src/app/docs/not-found.tsx` | public / noindex by status | missing documentation recovery | Documentation error | CURRENT | REFACTOR | docs | 6 | MEDIUM | forced docs 404, links, current product language |

## Missing canonical routes

| ID | Route | Evidence | Status | Required responsibility | Disposition | Wave | Risk | Validation |
|---|---|---|---|---|---|---:|---|---|
| ROUTE-012 | `/memory` | no route file found | MISSING | flagship product page | CREATE | 4 | HIGH | page tests, metadata, redirect readiness |
| ROUTE-013 | `/memory/qa` | no route file found | MISSING | current QA edition page | CREATE | 4 | HIGH | conversion, claims, form flow, metadata |
| ROUTE-014 | `/workbench` | no route file found | MISSING | second product page | CREATE | 5 | HIGH | product truth, compatibility, metadata |
| ROUTE-015 | `/philosophy` | no route file found | MISSING | company philosophy | CREATE | 6 | MEDIUM | content, reading order, metadata |
| ROUTE-016 | `/about` | no route file found | MISSING | company and founder | CREATE | 6 | MEDIUM | founder positioning, metadata, asset rights |

# Legacy, duplicate, and experimental public pages

| ID | Route | Source evidence | Current purpose | Status | Preliminary disposition | Canonical destination or question | Wave | Risk |
|---|---|---|---|---|---|---|---:|---|
| ROUTE-017 | `/buildflow` | `src/app/buildflow/page.tsx` | BuildFlow product page; metadata says ProChat OS is flagship | LEGACY | REDIRECT after Workbench exists | `/workbench`; preserve BuildFlow as technical identifier only | 5/7 | CRITICAL |
| ROUTE-018 | `/systems/prochat-os` | `src/app/systems/prochat-os/page.tsx` | legacy AI workflow product with SoftwareApplication/FAQ schema | LEGACY | ARCHIVE or REDIRECT | destination requires content/SEO decision | 7 | CRITICAL |
| ROUTE-019 | `/systems/events` | `src/app/systems/events/page.tsx` | legacy event/system surface | LEGACY/EXPERIMENTAL | ARCHIVE or REDIRECT | decision required | 7 | HIGH |
| ROUTE-020 | `/ai-workflows` | `src/app/ai-workflows/page.tsx` | AI workflow offering | LEGACY | ARCHIVE or REDIRECT | decision required | 7 | HIGH |
| ROUTE-021 | `/legal-ai-workflows` | `src/app/legal-ai-workflows/page.tsx` | legal-industry AI workflow page | LEGACY | ARCHIVE or REDIRECT | decision required | 7 | HIGH |
| ROUTE-022 | `/studio` | `src/app/(marketing)/studio/page.tsx` | client-work/service page | LEGACY relative to company platform | ARCHIVE, REWRITE, or REMOVE after decision | no canonical service page currently | 7 | HIGH |
| ROUTE-023 | `/kits` | `src/app/kits/page.tsx` | legacy kit product catalogue | LEGACY | ARCHIVE or REDIRECT | no canonical kit responsibility | 7 | HIGH |
| ROUTE-024 | `/kits/prokit` | `src/app/kits/prokit/page.tsx` | ProKit product page | LEGACY | ARCHIVE or REDIRECT | decision required | 7 | HIGH |
| ROUTE-025 | `/kits/prokit/finish` | `src/app/kits/prokit/finish/page.tsx` | post-purchase/claim flow | LEGACY transactional | KEEP temporarily, then retire after commerce audit | no canonical public product | 7/8 | CRITICAL |
| ROUTE-026 | `/kits/saaskit` | `src/app/kits/saaskit/page.tsx` | SaaSKit product page | LEGACY | ARCHIVE or REDIRECT | decision required | 7 | HIGH |
| ROUTE-027 | `/kits/saaskit/finish` | `src/app/kits/saaskit/finish/page.tsx` | post-purchase/claim flow | LEGACY transactional | KEEP temporarily, then retire after commerce audit | no canonical public product | 7/8 | CRITICAL |
| ROUTE-028 | `/kits/uxkit` | `src/app/kits/uxkit/page.tsx` | UXKit product/waitlist | LEGACY | ARCHIVE or REDIRECT | decision required | 7 | HIGH |
| ROUTE-029 | `/kits/waaskit` | `src/app/kits/waaskit/page.tsx` | WaaSKit product/waitlist | LEGACY | ARCHIVE or REDIRECT | decision required | 7 | HIGH |
| ROUTE-030 | `/waitlist` | `src/app/waitlist/page.tsx` | indexable UXKit/WaaSKit/ProChat OS waitlist | LEGACY | REPLACE or REDIRECT | `/contact?topic=memory-qa` or future dedicated beta route; decision required | 6/7 | CRITICAL |
| ROUTE-031 | `/waiting-list` | `src/app/waiting-list/page.tsx`, `next.config.js` | noindex legacy UXKit waiting list | DUPLICATE/REDIRECTED | retain redirect until destination replaced | `/waitlist` currently | 7 | HIGH |
| ROUTE-032 | `/book` | `src/app/book/page.tsx` | historical book/content offer | LEGACY | ARCHIVE or REDIRECT | decision required | 7 | MEDIUM |
| ROUTE-033 | `/proof` | `src/app/proof/page.tsx` | historical proof/marketing page | LEGACY | ARCHIVE or REDIRECT | decision required | 7 | MEDIUM |
| ROUTE-034 | `/starting-point` | `src/app/starting-point/page.tsx` | historical starting-point content | LEGACY/DUPLICATE | REDIRECT or ARCHIVE | likely `/learn/saas-starting-point` while legacy content remains | 7 | MEDIUM |
| ROUTE-035 | `/learn` | `src/app/learn/page.tsx` | SaaS build onboarding hub | LEGACY | ARCHIVE, NOINDEX, or replace with current resources | documentation/resources decision required | 6/7 | HIGH |
| ROUTE-036 | `/learn/production-guide` | `src/app/learn/production-guide/page.tsx` | SaaS production guide | LEGACY CONTENT | ARCHIVE/NOINDEX | resources archive | 7 | MEDIUM |
| ROUTE-037 | `/learn/saas-starting-point` | `src/app/learn/saas-starting-point/page.tsx` | SaaS founder starting point | LEGACY CONTENT | ARCHIVE/NOINDEX | resources archive | 7 | MEDIUM |
| ROUTE-038 | `/blog` | `src/app/blog/page.tsx` | redirects to `/learn` | DUPLICATE/REDIRECT | review redirect after resources decision | TBD | 7 | MEDIUM |
| ROUTE-039 | `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | dynamic historical articles | LEGACY CONTENT | ARCHIVE/KEEP selectively/REDIRECT | entry-level decision required | 7 | HIGH |
| ROUTE-040 | `/prompts` | `src/app/prompts/page.tsx` | prompt catalogue | LEGACY CONTENT | ARCHIVE/REWRITE | current documentation/resources decision | 6/7 | MEDIUM |
| ROUTE-041 | `/prompts/[category]/[slug]` | `src/app/prompts/[category]/[slug]/page.tsx` | dynamic prompt pages | LEGACY CONTENT | ARCHIVE/KEEP selectively | entry-level decision required | 7 | MEDIUM |
| ROUTE-042 | `/waas/accountants` | `src/app/waas/accountants/page.tsx` | vertical WaaS marketing page | LEGACY | ARCHIVE or REDIRECT | no canonical responsibility | 7 | HIGH |
| ROUTE-043 | `/privacy-policy` | `src/app/privacy-policy/page.tsx`, `next.config.js` | duplicate privacy route | DUPLICATE/REDIRECTED | retain permanent redirect | `/privacy` | 7 | MEDIUM |
| ROUTE-044 | `/tos` | `src/app/tos/page.tsx`, `next.config.js` | duplicate Terms route | DUPLICATE/REDIRECTED | retain permanent redirect | `/terms` | 7 | MEDIUM |

# Internal, authenticated, operational, and utility pages

| ID | Route | Source evidence | Classification | Preliminary disposition | Risk and notes |
|---|---|---|---|---|---|
| ROUTE-045 | `/admin` | `src/app/admin/page.tsx` | INTERNAL redirect | KEEP | redirects to `/admin/licenses`; protected-shell verification required |
| ROUTE-046 | `/admin/licenses` | `src/app/admin/licenses/page.tsx` | INTERNAL admin | KEEP/REFACTOR only if operationally used | CRITICAL: licensing/admin functionality |
| ROUTE-047 | `/admin/og` | `src/app/admin/og/page.tsx` | INTERNAL admin | KEEP or REMOVE after consumer audit | HIGH |
| ROUTE-048 | `/admin/waitlist` | `src/app/admin/waitlist/page.tsx` | INTERNAL admin | REFACTOR/REPLACE after waitlist decision | HIGH: personal data |
| ROUTE-049 | `/dashboard` | `src/app/dashboard/page.tsx` | INTERNAL/authenticated application | DECISION REQUIRED | HIGH: currently renders legacy pricing when inactive |
| ROUTE-050 | `/chat/[projectID]` | `src/app/chat/[projectID]/page.tsx`, layout | INTERNAL application | KEEP/DECISION REQUIRED | CRITICAL: product/app compatibility |
| ROUTE-051 | `/preferences` | `src/app/preferences/page.tsx` | INTERNAL user settings | KEEP/REFACTOR | HIGH: user data/preferences |
| ROUTE-052 | `/sign-in/[[...sign-in]]` | `src/app/sign-in/[[...sign-in]]/page.tsx` | INTERNAL auth | KEEP | CRITICAL: Ory auth redirects and app themes |
| ROUTE-053 | `/sign-up/[[...sign-up]]` | `src/app/sign-up/[[...sign-up]]/page.tsx` | INTERNAL auth | KEEP | CRITICAL |
| ROUTE-054 | `/processing-page/[[...processing-page]]` | `src/app/processing-page/[[...processing-page]]/page.tsx`, layout | INTERNAL transactional | KEEP until commerce audit | CRITICAL |
| ROUTE-055 | `/success` | `src/app/success/page.tsx` | INTERNAL transactional | KEEP until commerce audit | CRITICAL |
| ROUTE-056 | `/maintenance` | `src/app/maintenance/page.tsx` | OPERATIONAL public utility | KEEP/REFACTOR | HIGH: must remain reachable during incidents |
| ROUTE-057 | `/debug/analytics` | `src/app/debug/analytics/page.tsx` | INTERNAL debug | NOINDEX/PROTECT/REMOVE after audit | HIGH: public discoverability risk |
| ROUTE-058 | `/unsubscribe` | `src/app/unsubscribe/page.tsx` | PUBLIC legal/communications utility | KEEP/REFACTOR | HIGH: consent and email compliance |

# Route-handler inventory

## Current public-platform or operational handlers

| ID | Handler route | Source evidence | Purpose | Status | Preliminary disposition | Risk |
|---|---|---|---|---|---|---|
| ROUTE-059 | `/api/contact` | `src/app/api/contact/route.ts` | public contact submission | CURRENT | KEEP then REFACTOR with Contact | CRITICAL: personal data, rate limiting, delivery |
| ROUTE-060 | `/api/health` | `src/app/api/health/route.ts` | operational health | INTERNAL/OPERATIONAL | KEEP | HIGH |
| ROUTE-084 | `/admin/licenses/revoke` | `src/app/admin/licenses/revoke/route.ts` | administrative licence revocation | INTERNAL ADMIN | KEEP until licensing audit; protect and verify auth | CRITICAL: destructive administrative action |
| ROUTE-061 | `/api/preferences` | `src/app/api/preferences/route.ts` | user preferences | INTERNAL | KEEP | HIGH: user data |
| ROUTE-062 | `/api/projects` | `src/app/api/projects/route.ts` | project data | INTERNAL/PRODUCT | DECISION REQUIRED | CRITICAL |
| ROUTE-063 | `/api/tenants/projects` | `src/app/api/tenants/projects/route.ts` | tenant project data | INTERNAL/PRODUCT | DECISION REQUIRED | CRITICAL |
| ROUTE-064 | `/api/subscription` | `src/app/api/subscription/route.ts` | subscription state | INTERNAL/COMMERCE | KEEP until commerce audit | CRITICAL |
| ROUTE-065 | `/api/stripe/create-checkout` | `src/app/api/stripe/create-checkout/route.ts` | checkout | LEGACY/COMMERCE | KEEP until product/legal audit | CRITICAL |
| ROUTE-066 | `/api/stripe/create-portal` | `src/app/api/stripe/create-portal/route.ts` | billing portal | LEGACY/COMMERCE | KEEP until product/legal audit | CRITICAL |
| ROUTE-067 | `/api/webhook/stripe` | `src/app/api/webhook/stripe/route.ts` | Stripe webhook | LEGACY/COMMERCE | KEEP until zero-consumer proof | CRITICAL |
| ROUTE-068 | `/api/store/prokit/claim` | `src/app/api/store/prokit/claim/route.ts` | ProKit claim | LEGACY TRANSACTIONAL | DEPRECATE after obligations audit | CRITICAL |
| ROUTE-069 | `/api/store/saaskit/claim` | `src/app/api/store/saaskit/claim/route.ts` | SaaSKit claim | LEGACY TRANSACTIONAL | DEPRECATE after obligations audit | CRITICAL |

## Waitlist and marketing handlers

| ID | Handler route | Source evidence | Purpose | Status | Preliminary disposition | Risk |
|---|---|---|---|---|---|---|
| ROUTE-070 | `/api/waitlist` | `src/app/api/waitlist/route.ts` | waitlist submission | LEGACY/DECISION REQUIRED | REPLACE or RETIRE after data-flow audit | CRITICAL: personal data |
| ROUTE-071 | `/api/waiting-list` | `src/app/api/waiting-list/route.ts` | duplicate waiting-list submission | DUPLICATE/LEGACY | DEPRECATE after consumer audit | CRITICAL |
| ROUTE-072 | `/api/mailerlite/subscribe` | `src/app/api/mailerlite/subscribe/route.ts` | mailing-list subscription | DECISION REQUIRED | KEEP/REFACTOR or retire after consent audit | CRITICAL |

## Automation, workflow, and social handlers

| ID | Handler route | Source evidence | Classification | Preliminary disposition | Risk |
|---|---|---|---|---|---|
| ROUTE-073 | `/api/(make)/active` | `src/app/api/(make)/active/route.ts` | LEGACY/INTERNAL integration | DECISION REQUIRED | CRITICAL: external integration |
| ROUTE-074 | `/api/(make)/link` | `src/app/api/(make)/link/route.ts` | LEGACY/INTERNAL integration | DECISION REQUIRED | CRITICAL |
| ROUTE-075 | `/api/(make)/scenarios` | `src/app/api/(make)/scenarios/route.ts` | LEGACY workflow integration | ARCHIVE/KEEP by consumer evidence | CRITICAL |
| ROUTE-076 | `/api/(make)/scenarios/openAIAssistant` | `src/app/api/(make)/scenarios/openAIAssistant/route.ts` | LEGACY OpenAI workflow integration | DECISION REQUIRED | CRITICAL |
| ROUTE-077 | `/api/(n8n)/workflows/openAIAssistant` | `src/app/api/(n8n)/workflows/openAIAssistant/route.ts` | LEGACY n8n workflow integration | DECISION REQUIRED | CRITICAL |
| ROUTE-078 | `/api/social/next` | `src/app/api/social/next/route.ts` | INTERNAL social queue | KEEP/DECISION REQUIRED | HIGH |
| ROUTE-079 | `/api/social/mark-posted` | `src/app/api/social/mark-posted/route.ts` | INTERNAL social state | KEEP/DECISION REQUIRED | HIGH |
| ROUTE-080 | `/social` | `src/app/social/route.ts` | social redirect/utility | INTERNAL/DECISION REQUIRED | KEEP or retire by consumer evidence | HIGH |
| ROUTE-081 | `/go` | `src/app/go/route.ts` | redirect/short-link utility | DECISION REQUIRED | inspect destination and consumers before action | HIGH |

## Image and social-preview handlers

| ID | Handler route | Source evidence | Classification | Preliminary disposition | Risk |
|---|---|---|---|---|---|
| ROUTE-082 | `/og` | `src/app/og/route.ts` | CURRENT metadata image service | KEEP/REFACTOR | MEDIUM: must migrate visual identity |
| ROUTE-083 | `/blog/[slug]/og` | `src/app/blog/[slug]/og/route.ts` | LEGACY article OG service | KEEP only while retained articles exist | MEDIUM |

# Layout and shell inventory

| ID | Scope | Source evidence | Current behavior | Finding | Migration concern |
|---|---|---|---|---|---|
| SHELL-001 | root layout | `src/app/layout.tsx` | global dark class, Host Grotesk + Golos + JetBrains, structured data, Umami, AppChrome | mixed canonical and legacy foundation | Wave 1 style/font/shell migration; no route change now |
| SHELL-002 | marketing layout | `src/app/(marketing)/layout.tsx` | simple `<main>` wrapper | reusable responsibility | KEEP/REFACTOR after page composition review |
| SHELL-003 | contact layout | `src/app/(marketing)/contact/layout.tsx` | route-specific metadata/layout | inspect during Contact packet | contact/privacy dependency |
| SHELL-004 | docs layout | `src/app/docs/layout.tsx` | transparent passthrough | docs-specific shell delegated elsewhere | audit `DocsThemeLayout` and public docs provider |
| SHELL-005 | admin layout | `src/app/admin/layout.tsx` | admin boundary | protected operational shell | preserve until auth/admin audit |
| SHELL-006 | chat layout | `src/app/chat/[projectID]/layout.tsx` | project chat boundary | internal product shell | protect from public-platform migration |
| SHELL-007 | processing layout | `src/app/processing-page/layout.tsx` | transactional shell | commerce dependency | preserve until commerce audit |
| SHELL-008 | waiting-list layout | `src/app/waiting-list/layout.tsx` | legacy waitlist shell | obsolete public direction | retire only after destination/data-flow decision |

# Redirect inventory

Existing redirects in `next.config.js`:

| Source | Destination | Permanent | Classification | Audit decision |
|---|---|---:|---|---|
| `/store` | `/kits` | yes | legacy commerce compatibility | retain until kit retirement plan |
| `/store/saaskit` | `/kits/saaskit` | yes | legacy commerce | retain temporarily |
| `/store/prokit` | `/kits/prokit` | yes | legacy commerce | retain temporarily |
| `/store/prokit/finish` | `/kits/prokit/finish` | yes | transactional | retain until obligations end |
| `/store/saaskit/finish` | `/kits/saaskit/finish` | yes | transactional | retain until obligations end |
| `/tos` | `/terms` | yes | canonical legal alias | keep |
| `/privacy-policy` | `/privacy` | yes | canonical legal alias | keep |
| `/system/prochat-os` | `/systems/prochat-os` | yes | legacy product alias | revisit with OS retirement decision |
| `/system/events` | `/systems/events` | yes | legacy system alias | revisit with route retirement |
| `/waiting-list` | `/waitlist` | yes | legacy waitlist alias | revisit when QA beta destination is decided |
| `/bf` | external BuildFlow GitHub | yes | technical compatibility shortcut | decision required after Workbench page exists |
| `/brainbridge` | external Brain Bridge GitHub | yes | technical/project shortcut | keep only if current and intentional |
| two historical blog slugs | current legacy article slug | yes | content SEO compatibility | retain while article remains public |

No new redirects were implemented in this audit.

# Navigation and footer exposure

## Current header

Evidence: `src/components/Header.tsx`.

```text
Memory → /prochat-memory
Memory for QA → /qa-memory
Workbench → /contact?topic=workbench
Contact → /contact
Primary CTA → /contact?topic=memory-qa
```

Findings:

- no `/workbench` product page;
- no Philosophy item;
- no Documentation item;
- legacy Memory paths are hard-coded;
- desktop and mobile CTA destinations differ slightly (`/contact?topic=memory-qa` versus `/contact`);
- analytics events exist and must be migrated deliberately.

## Current footer

Evidence: `src/app/(marketing)/components/layout/Footer.tsx`.

Findings:

- product links use legacy Memory and QA paths;
- Workbench links to contact topic rather than product page;
- Documentation, Privacy, and Terms are present;
- Philosophy and About are missing;
- footer copy uses unqualified `Private, persistent memory` and `Under your control` language requiring claims review;
- company LinkedIn and GitHub are present; X points to Steve’s account and requires company/founder channel decision.

## Chrome route helper

Evidence: `src/helpers/chrome-routes.ts`.

Findings:

- `/prochat-memory` is chromeless;
- `/docs`, auth, and starting-point paths are chromeless;
- kit finish routes suppress standard shell;
- marketing-route recognition excludes BuildFlow, Philosophy, About, Studio, waitlist, and several legacy pages;
- helper requires migration only after route decisions are approved.

# Sitemap, robots, metadata, and analytics

## Robots

`src/app/robots.ts` allows the site broadly and disallows API, admin, dashboard, account, settings, checkout, success, cancel, and private paths.

Risks:

- debug, auth, processing, preferences, chat, maintenance, and legacy routes are not all explicitly represented;
- robots directives on individual pages vary;
- robots points to `/sitemap.xml`.

## Sitemaps

Found:

- `src/app/docs/sitemap.ts` — publishes docs entries;
- `src/app/learn/sitemap.ts` — publishes legacy Learn and SaaS pages.

Not found:

- root `src/app/sitemap.ts`.

This creates a probable discovery gap because robots references a root sitemap while only nested sitemap handlers were found. Verify generated build routes before deciding implementation.

## Metadata ownership

Metadata is distributed among:

- root `src/app/layout.tsx`;
- page-level `getSEOTags` calls;
- dynamic docs/blog metadata;
- hard-coded structured data in legacy product pages;
- OG route handlers.

Several high-risk stale metadata examples are documented above: BuildFlow, ProChat OS, waitlist, docs, privacy, and terms.

## Analytics

- global Umami integration exists in `src/app/layout.tsx`;
- header navigation and CTA events exist in `src/components/Header.tsx`;
- Contact imports `trackEvent`;
- route-specific event coverage requires a later analytics audit.

# Unresolved route decisions

The following require explicit later decisions; this audit does not authorize deletion:

1. Whether canonical public URLs should be `/memory`, `/memory/qa`, and `/workbench` or whether legacy paths should be retained for SEO/compatibility. Canonical architecture currently prefers the new paths.
2. Whether ProChat OS, Studio, AI Workflows, legal-industry workflows, kits, and WaaS pages are archived, redirected, or removed.
3. Which legacy blog, Learn, prompt, and documentation entries retain durable resource value.
4. Whether `/waitlist` becomes the QA beta route, redirects to Contact, or is retired.
5. Whether old commerce and claim flows must remain available for previous purchasers and for how long.
6. Whether `/dashboard`, `/chat`, project APIs, subscription APIs, and auth remain part of a current application product or are legacy infrastructure.
7. Whether `/bf` and `/brainbridge` shortcuts remain intentional public compatibility routes.
8. Whether a root sitemap is generated elsewhere at build time or is genuinely missing.
9. Which company social channels belong in the footer versus founder channels.
10. Which routes require explicit `noindex` during the migration period.

# Validation plan for later route decisions

Before any redirect, archive, or removal:

- inspect current consumers and inbound links;
- verify production route manifest;
- verify sitemap and robots output;
- review analytics and search-console evidence where available;
- confirm legal, transactional, account, and purchaser obligations;
- create the replacement route first;
- test status code, destination, canonical URL, query handling, and redirect chains;
- test navigation, footer, internal links, forms, auth, and metadata;
- retain a rollback commit.

# Task 5.1 completion criteria

- [x] Every discovered page and route handler is classified.
- [x] Every canonical responsibility is mapped as present, legacy-path, or missing.
- [x] Navigation, footer, redirects, sitemap, robots, metadata, forms, and errors are inventoried.
- [x] Probable redirect and archive requirements are recorded without implementation.
- [x] High-risk legal, commerce, auth, product, SEO, and data routes are identified.
- [x] No production code, copy, metadata, redirect, navigation, route, or package file changed.
- [x] No DELETE decision was finalized.
