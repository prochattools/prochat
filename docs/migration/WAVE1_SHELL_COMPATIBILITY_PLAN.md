# Wave 1 Public-Shell Compatibility Plan

**Status:** Wave 1 Packet 2 decisions complete  
**Scope:** root shell, route ownership, providers, compatibility aliases, activation sequencing, validation, rollback  
**Live source changed:** no  
**Machine-readable authority:** `docs/migration/WAVE1_SHELL_RESPONSIBILITIES.json`

## Purpose

This plan defines how ProChat introduces a canonical public shell without forcing protected internal, transactional, purchaser, legacy, documentation, API, or error routes through an unsafe visual and provider migration.

The plan creates four mutually exclusive shell classes:

```text
canonical public shell
protected internal shell
temporary legacy compatibility
no shared shell
```

Every `ROUTE-*` record appears exactly once in the machine-readable manifest.

## Current coupling evidence

The current root layout applies one global boundary to almost everything:

```text
src/app/layout.tsx
├── forced dark class
├── Host Grotesk, Golos Text, and JetBrains Mono variables
├── globals.scss
│   └── backgrounds.scss
├── StructuredData
├── UmamiAnalytics
└── Providers
    ├── next-themes
    ├── React Hot Toast
    ├── React Tooltip
    └── AppChrome
        ├── global blob and line backdrop
        ├── Header
        └── AppShell
            ├── main
            └── Footer
```

`AppChrome` bypasses only documentation routes. Every other route receives the decorative global surface, Header, and AppShell unless AppShell applies a chromeless or footerless exception.

`AppShell` contains hard-coded historical route knowledge for ProChat OS, AI Workflows, Legal AI Workflows, Starting Point, Proof, Studio, Events, waitlists, Waas accountants, prompts, and kits.

No active skip link was found in source. The canonical public shell must add one before visual activation.

## Current Header findings

`src/components/Header.tsx` currently owns:

- old `/prochat-memory` and `/qa-memory` links;
- Workbench represented as a Contact query rather than `/workbench`;
- Contact navigation;
- QA tester analytics events;
- theme switching;
- global blue/button-radius aliases;
- Lucide and local logo primitives;
- mobile sheet navigation;
- company LinkedIn and GitHub links;
- scroll-direction behavior;
- client pathname and state dependencies.

The current Header cannot become the canonical public Header through restyling alone. It requires replacement after canonical routes and navigation copy exist.

## Current Footer findings

`src/app/(marketing)/components/layout/Footer.tsx` currently owns:

- old Memory and QA URLs;
- Workbench as a Contact query;
- current docs, Privacy, and Terms links;
- GitHub and LinkedIn company links;
- a personal X account;
- legacy Tailwind semantic aliases;
- backdrop blur and transparent-background effects.

The Footer is public-only responsibility. It must not appear on protected internal, purchaser, auth, API, redirect, error, or documentation-service routes unless explicitly designed for that route.

## Shell-class summary

```yaml
canonical_public_shell: 9
protected_internal_shell: 16
temporary_legacy_compatibility: 24
no_shared_shell: 35
total_route_records: 84
```

### Canonical public shell

```text
ROUTE-001  /
ROUTE-004  /contact
ROUTE-005  /privacy
ROUTE-006  /terms
ROUTE-012  planned /memory
ROUTE-013  planned /memory/qa
ROUTE-014  planned /workbench
ROUTE-015  planned /philosophy
ROUTE-016  planned /about
```

These routes belong to the final public information architecture. Existing retained routes are not visually switched by Packet 3. Planned routes adopt the canonical shell when implemented in their named waves.

### Protected internal shell

```text
ROUTE-025  /kits/prokit/finish
ROUTE-027  /kits/saaskit/finish
ROUTE-045  /admin
ROUTE-046  /admin/licenses
ROUTE-047  /admin/og
ROUTE-048  /admin/waitlist
ROUTE-049  /dashboard
ROUTE-050  /chat/[projectID]
ROUTE-051  /preferences
ROUTE-052  /sign-in/[[...sign-in]]
ROUTE-053  /sign-up/[[...sign-up]]
ROUTE-054  /processing-page/[[...processing-page]]
ROUTE-055  /success
ROUTE-057  /debug/analytics
ROUTE-080  /social
ROUTE-084  /admin/licenses/revoke
```

This shell is operational, access-controlled, non-public, and compatibility-first. It retains only providers and legacy aliases required by exact protected consumers.

### Temporary legacy compatibility

```text
ROUTE-002–ROUTE-003
ROUTE-017–ROUTE-024
ROUTE-026
ROUTE-028–ROUTE-030
ROUTE-032–ROUTE-037
ROUTE-039–ROUTE-042
```

These routes retain current AppChrome/AppShell behavior only until their replacement, redirect, archive, or retirement packet passes.

This class includes old Memory and QA, BuildFlow, ProChat OS, Events, AI Workflows, Legal AI Workflows, Studio, kit marketing, waitlist, Book, Proof, Starting Point, Learn, legacy Blog entries, Prompts, and Waas accountants.

BuildFlow remains public only as a temporary route awaiting `/workbench`. Technical BuildFlow operation IDs, source IDs, package names, environment variables, API contracts, and persisted records remain compatibility-only and must not be surfaced as current product language.

### No shared shell

This class contains:

- `/docs` and documentation entries;
- global and docs errors;
- redirects;
- maintenance and unsubscribe states;
- all API, webhook, health, integration, purchaser-claim, and social handlers;
- `/go` compatibility routing;
- OG generation routes.

These routes must not mount public Header, Footer, public analytics, decorative backgrounds, or public navigation by default.

## Canonical public-shell responsibility map

| Responsibility | Canonical owner | Decision |
|---|---|---|
| HTML language and document frame | root layout | keep minimal and server-owned |
| Public font variables | canonical public-shell boundary | `--font-prochat-sans` and `--font-prochat-mono` only |
| Public background and text | `prochat-foundation.css` applied at public boundary | light-first page and surface tokens |
| Skip link | canonical public shell | create first focusable control linking to stable `#main-content` |
| Header | canonical public Header | company navigation only; no auth, purchaser, old-product, or theme controls |
| Main landmark | canonical public shell | one main landmark with stable ID and route-owned content |
| Footer | canonical public Footer | company/product/legal/docs links and approved company social links only |
| Public analytics | public analytics boundary | approved minimal events only; exclude protected routes by default |
| Structured data | route metadata/public shell | current company and product truth only |
| Selection | public foundation scope | canonical cobalt-soft selection, no root inline override |
| Theme color | route metadata | approved light background; route-specific only when documented |
| Preloads | route ownership | no global legacy hero background preloads; only measured route-critical assets |
| Tooltips | component-local canonical primitive | no global public tooltip registry |
| Status feedback | component or form-local accessible region | no global toast dependency for normal public forms |
| Theme | none | canonical public shell is light-first and has no public theme toggle initially |

## Protected internal-shell responsibility map

| Responsibility | Protected owner | Decision |
|---|---|---|
| Auth and account access | protected route boundary | retain only while protected consumers remain |
| Admin navigation and licence tools | protected internal shell | no public navigation or indexing |
| Dashboard, chat, projects, preferences | protected historical application shell | retain legacy compatibility pending closure decision |
| Purchaser finish and processing | protected transactional shell | preserve obligations and exact status behavior |
| Stripe, portal, webhook, licences | protected transactional/API boundaries | never mount in canonical public shell |
| Theme | protected legacy provider | retain `next-themes` only where exact consumers require it |
| Toast | protected provider or local legacy consumer | retain React Hot Toast for identified application and transactional consumers |
| Tooltip | protected compatibility or local component | remove global provider after exact consumers migrate |
| Database and operational state | server/API ownership | no dependency on public Header/Footer or decoration |
| Analytics and diagnostics | protected operational ownership | explicit, minimal, no public-marketing event assumptions |

## Provider ownership decisions

### Structured data

Current owner: root layout.

Destination: canonical public route metadata boundary. Protected routes receive only operational metadata required for correctness and must not emit public company/product schema by inheritance.

### Analytics

Current owner: root layout through `UmamiAnalytics`.

Destination: canonical public analytics boundary. Protected routes are excluded unless an explicit operational requirement is approved. `TrackedOutboundLink` remains route/component-owned until legacy pages archive.

### Theme

Current owner: `src/components/providers.tsx` using `next-themes`.

Destination: protected and temporary legacy compatibility shells only. The canonical public shell is light-first with no root theme provider or theme toggle.

`src/components/theme-provider.tsx` has uncertain active consumers and is a later zero-consumer/archive candidate.

### Toast

Current owner: global Providers plus direct legacy consumers.

Exact direct legacy consumers include:

```text
src/components/login-payment.tsx
src/components/Dashboard.tsx
src/utils/validate_github.ts
src/utils/sign_up_api.ts
```

Destination: protected internal or transactional ownership. Canonical public forms use local accessible status regions rather than global toast by default.

### Tooltip

Current owner: global Providers using `react-tooltip`.

Destination: component-local Radix tooltip or native accessible description. The global React Tooltip registry expires after protected and legacy consumers are proven migrated.

### Authentication

Destination: protected route-local or internal-shell boundary. The public shell has no auth provider, sign-in button, or account state dependency.

### Commerce and licensing

Destination: protected route-local, server, webhook, and transactional boundaries. The public shell does not mount Stripe, purchaser, licence, processing, or portal providers.

## Temporary compatibility aliases

Exact machine-readable consumers and expiry conditions live in `WAVE1_SHELL_RESPONSIBILITIES.json`.

### ALIAS-001 — root font variables

```text
--font-sans
--font-brand
--font-mono
```

Direct consumers include root layout, Tailwind, globals, landing, Contact, and waiting-list styles.

Expiry: Wave 8, after protected and legacy consumers use canonical font variables or archive, and Tailwind stops mapping font utilities to legacy variables.

### ALIAS-002 — shell dimensions

```text
--pc-page-gutter
--pc-button-radius
--pc-header-height
```

Direct consumers include Tailwind, global/background styles, Header, AppShell, HeroStandard, SectionIndex, button, Starting Point, and old Memory theme.

Expiry: Wave 8, after canonical Header/layout/button consumers replace them and all legacy route consumers archive.

### ALIAS-003 — semantic RGB bridge

```text
--pc-bg-rgb
--pc-surface-rgb
--pc-surface-elevated-rgb
--pc-text-rgb
--pc-muted-rgb
--pc-border-rgb
--pc-ring-rgb
```

Direct consumers include Tailwind, global/background styles, Contact, and ScrollHintWrapper.

Expiry: Wave 8, after Tailwind and protected or route-local CSS consume canonical foundation roles or archive.

### ALIAS-004 — old blue and gray scales

```text
--blue-*
--pc-blue-*
--pc-gray-*
```

Direct consumers include Tailwind, root inline style, global/background styles, landing/Contact CSS, icons, and legacy proof/marketing sections.

Expiry: Wave 8, after legacy visual, marketing, icon, and Tailwind consumers are absent from active source.

### ALIAS-005 — old shadows

```text
--pc-shadow-surface
--pc-shadow-elevated
```

Direct consumers include Tailwind, globals, Contact, and the global toaster.

Expiry: Wave 8, after canonical neutral shadows replace all active consumers or remaining protected exceptions have explicit ownership and review dates.

## Header, Footer, AppChrome, and skip-link replacement order

1. **Route classification helper.** Introduce an executable source helper mirroring the documentation manifest and test exact route classification.
2. **Shell router.** Refactor AppChrome into an explicit four-class dispatcher while preserving current route output.
3. **Provider split.** Separate public analytics/metadata ownership from protected theme/toast/tooltip compatibility.
4. **Skip link.** Add a canonical skip link and stable `#main-content` contract to the canonical public shell.
5. **Canonical public boundary.** Apply canonical font variables and foundation scope only inside the canonical shell.
6. **Protected internal boundary.** Preserve exact compatibility providers and legacy classes only for protected routes.
7. **Legacy compatibility boundary.** Keep current Header/AppShell/Footer/blob behavior for archive-bound routes until their migration wave.
8. **No-shared-shell boundary.** Ensure docs, errors, maintenance, unsubscribe, redirects, APIs, webhooks, health, and OG routes bypass public chrome.
9. **Header replacement.** Build and activate canonical navigation only after canonical route destinations exist.
10. **Footer replacement.** Activate canonical company/legal/docs footer after route and company-link review.
11. **Legacy AppChrome retirement.** Remove hard-coded route lists, blob backdrops, legacy Header/Footer, and compatibility aliases only after zero-consumer proof.

## Metadata, selection, theme color, and preload migration

### Metadata

- Move company/product structured data from unconditional root inheritance to canonical public route ownership.
- Replace stale Contact metadata that references SaaSKit and ProKit in Wave 6.
- Preserve noindex on Chat, processing, diagnostics, legacy retirement, and protected tooling.
- Do not expose BuildFlow or ProChat OS as current product metadata.

### Selection

- Remove root inline blue selection override during canonical activation.
- Scope canonical selection tokens to the public foundation.
- Preserve protected compatibility selection until its shell migrates.

### Theme color

- Canonical public theme color uses the approved light page background.
- Protected and legacy routes retain current behavior until independently reviewed.
- Public theme switching is not part of Packet 3.

### Preloads

- Remove unconditional light and dark hero-line preloads only after current shell output equivalence is proven.
- New public pages preload only measured critical assets.
- Fonts remain route/shell owned; no duplicate Host, Fontsource, local, and Google loading may be introduced.

## Baseline requirements before live visual activation

### Visual baseline

Capture every shell class at:

```text
320px
768px
1024px
1440px
1728px
```

Required representative routes:

```text
/
/contact
/privacy
/docs
/prochat-memory
/kits/prokit/finish
/admin/licenses
/dashboard
/chat/[projectID]
/sign-in
/processing-page
/maintenance
/unsubscribe
```

### Accessibility baseline

- one main landmark;
- visible skip link;
- complete keyboard navigation;
- visible focus;
- no duplicate landmarks;
- correct noindex boundaries;
- dialog/sheet focus behavior;
- 44px minimum touch targets where applicable;
- reduced-motion behavior;
- local accessible status messaging.

### Performance baseline

- client bundle by shell class;
- font requests and preload behavior;
- global provider hydration cost;
- AppChrome and Header client cost;
- background animation and paint cost;
- route-specific CSS size;
- protected route load behavior;
- no regression in Core Web Vitals.

### Protected-flow baseline

Required smoke tests before provider or shell movement:

- sign in and sign up;
- admin licence access and revocation;
- purchaser finish and claim flows;
- checkout, portal, webhook, processing, and success;
- dashboard, project, chat, and preferences;
- Contact submission;
- unsubscribe;
- email status feedback;
- analytics diagnostics;
- health endpoint.

## Packet 3 activation boundary

Packet 3 is a **structural output-equivalence activation**, not a visual public-site switch.

### Current canonical allowlist

```text
empty
```

No current production page adopts the new visual shell in Packet 3.

### Future canonical allowlist

```text
/memory
/memory/qa
/workbench
/philosophy
/about
```

These routes adopt the canonical shell when created. `/` and retained company routes activate only in their approved page/design wave.

### Exact expected changed paths

```text
src/app/layout.tsx
src/components/AppChrome.tsx
src/components/providers.tsx
src/helpers/chrome-routes.ts
src/helpers/shell-routes.ts
src/components/shell/CanonicalPublicShell.tsx
src/components/shell/ProtectedInternalShell.tsx
src/components/shell/LegacyCompatibilityShell.tsx
src/components/shell/NoSharedShell.tsx
src/assets/styles/prochat-foundation.css
src/lib/prochat-fonts.ts
scripts/design/lint-design-system.mjs
docs/product/agent-mode-progress.md
```

Packet 3 must not edit pages, route content, Header, Footer, global SCSS, Tailwind, assets, metadata copy, package files, lockfiles, redirects, or archive entries.

### Packet 3 acceptance criteria

- executable shell classification matches all 84 documentation route records;
- every existing route renders equivalent shell output;
- no current route applies canonical visual variables or fonts;
- protected routes retain exact providers and compatibility aliases;
- docs, APIs, redirects, errors, maintenance, unsubscribe, health, and OG routes bypass public chrome;
- no BuildFlow public-product language is added;
- archive guard passes;
- TypeScript, lint, build, route tests, protected-flow smoke tests, accessibility checks, and screenshot comparisons pass.

### Rollback

Revert the single Packet 3 commit. The current AppChrome, Providers, and route helpers remain the known rollback implementation. The additive foundation files from Packet 1 remain inert and may stay committed.

### Approval gate

Packet 3 requires explicit review of:

- exact route-class parity;
- provider ownership;
- protected-flow smoke evidence;
- zero visual output drift for current routes;
- accessibility and performance baselines;
- rollback verification.

## Unresolved decisions

1. Whether protected routes eventually receive a maintained internal shell or are archived wholesale.
2. Whether `/privacy` and `/terms` activate with the first visual public-shell wave or remain compatibility pages until Wave 6 rewrites.
3. Whether Contact activates with the homepage or waits for the canonical form system.
4. Final public analytics events and consent requirements.
5. Exact active consumers of the standalone `theme-provider.tsx` wrapper.
6. Whether any protected route genuinely requires theme switching long-term.
7. Which React Tooltip consumers require temporary compatibility.
8. Whether the current Header scroll-direction behavior survives in any protected shell.
9. The future docs shell technology and whether it receives company Header/Footer.
10. The first current route approved for canonical visual activation after Wave 2 foundations and Wave 3 static design approval.
