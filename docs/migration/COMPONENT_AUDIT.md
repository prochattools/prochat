# ProChat Component Audit

**Status:** Phase 5 Task 5.2 inventory complete  
**Scope:** shared UI, marketing components, page-local components, product visuals, forms, navigation, layout, email, analytics, admin, authentication, commerce, and compatibility wrappers  
**Inventory date:** 2026-07-11

## Summary

```yaml
component_files: 140
shared_components: 83
page_local_components: 57
production_files_changed: 0
components_moved_or_deleted: 0
component_apis_changed: 0
packages_changed: 0
```

The inventory was built from every `.tsx` and `.jsx` file under `src/components/**` and `src/app/**`, excluding App Router `page`, `layout`, `loading`, `error`, and `not-found` files. Consumer counts are static evidence from imports, aliases, and JSX references and must be rechecked before any removal.

## Canonical component direction

Canonical sources:

```text
docs/design/COMPONENT_LIBRARY.md
docs/design/PRODUCT_VISUAL_LIBRARY.md
DESIGN.md
brand-spec.md
```

Every production component ultimately belongs to one of these classes:

- foundation;
- shell/navigation;
- form;
- content/editorial;
- product visual;
- analytics/metadata;
- protected operational UI;
- legacy compatibility pending migration.

## Duplicate-responsibility groups

### Buttons

Three active layers overlap:

1. `src/components/ui/button.tsx` — Radix Slot + CVA primitive, 51 detected consumers.
2. `src/components/Button.tsx` — thin loading/text wrapper over the UI primitive, 46 detected references.
3. `src/app/(marketing)/components/ui/Button.tsx` — marketing-specific button, 42 detected references.

Additional variants include `ButtonGradient`, `ButtonSignin`, `CheckoutButton`, `StripePortalButton`, and `icon-button`.

**Decision:** retain `src/components/ui/button.tsx` as the likely canonical base, audit wrapper-specific behavior, and do not merge until consumer APIs, loading semantics, analytics, link behavior, and commerce flows are mapped.

### Header, navigation, and shell

- `Header.tsx`
- `AppChrome.tsx`
- `AppShell.tsx`
- `nav-links.tsx`
- `navigation-menu.tsx`
- `sheet.tsx`
- marketing `ThemeToggle`

The current Header embeds legacy route paths and combines navigation, mobile sheet, theme switching, analytics, social links, CTA behavior, and scroll-direction behavior in one client component.

**Decision:** REFACTOR/REPLACE in the shell migration wave, preserving accessibility and analytics until the canonical navigation is implemented.

### Footer

One active footer exists, but it embeds legacy routes, unqualified privacy language, and a mixed company/personal social model.

**Decision:** REWRITE/REFACTOR after canonical footer copy and route decisions.

### Hero abstractions

- `src/components/marketing/HeroSection.tsx`
- `src/components/HeroStandard.tsx`
- marketing `Hero.tsx`
- route-local page-content heroes
- hero badges and check rows

`HeroSection` has 15 consumers and is suitable for ordinary marketing pages, but the cinematic homepage must not be forced into it.

**Decision:** retain as a candidate general page hero; create a dedicated homepage story component later.

### Forms and fields

- `ui/input.tsx`
- Contact page markup
- StartSignupForm
- waiting-list components
- admin OG and licence controls
- checkout and portal buttons

There is no canonical complete form system yet. Data-handling forms are protected until privacy, API, success/error, and validation behavior are verified.

### Cards and surfaces

- `ui/surface.tsx` — 59 consumers
- `ui/card.tsx` — 13 consumers
- `ui/Scaffolding.tsx` — 10 consumers
- route-local marketing cards

**Decision:** REFACTOR rather than replace blindly. Determine semantic responsibility: structural surface, content card, product record, or decorative scaffold.

### Marketing sections

The marketing directory contains a large reusable section set, but many sections embed historical offers, kits, pricing, proof, and visual assumptions.

**Decision:** treat structure as reference only. Page-level sections are primarily REWRITE/REPLACE candidates after content and page-story approval.

### Feature icons

Five nearly identical route-local `FeatureIcon` components exist across ProKit, SaaSKit, UXKit, WaaSKit, and ProChat OS.

**Decision:** duplicate legacy system. Archive with its owning pages or replace with one approved icon pattern; no deletion before route decisions.

### Error and loading components

No reusable canonical `ErrorState`, `EmptyState`, `LoadingState`, or `UnavailableState` component was discovered in the audited component roots.

**Decision:** MISSING canonical component family; define during production foundation.

### Analytics wrappers

- `UmamiAnalytics`
- `TrackedOutboundLink`
- event tracking embedded directly in Header and route-local sections
- StructuredData
- SaaSKit source trackers

**Decision:** retain protected analytics behavior until event, privacy, and route audits establish a canonical wrapper strategy.

## Protected component groups

These must not be removed or broadly rewritten during public-platform visual migration:

### Authentication

- `AuthScreen`
- `ButtonSignin`
- `login-payment`
- providers and theme-provider boundaries where auth depends on them

### Administration

- `AdminAccessNotice`
- `AdminNav`
- `RevokeLicenseAction`
- `AdminOgGenerator`

### Commerce and licensing

- `CheckoutButton`
- `StripePortalButton`
- `StripeClient`
- `PriceItem`
- `PricingSection`
- `login-payment`
- Invoice and licence email templates
- Kit access/finish components

### Contact and personal data

- Contact page markup
- Contact confirmation and notification emails
- waiting-list forms and emails
- signup forms

### Runtime application shell

- `AppChrome`
- `AppShell`
- Header
- providers
- analytics

The public redesign must not break authenticated, admin, licence, payment, form, email, or analytics behavior.

## High-risk findings

1. **No direct component tests were detected** for the 140 audited files by static filename-reference search. This does not prove no indirect tests exist, but test coverage is not discoverable at component level.
2. **Broad client boundaries:** many marketing sections are client components despite mostly static responsibilities.
3. **Framer Motion coupling:** marketing `Reveal`, Newsletter, and ProofOperational use Framer Motion; later motion audit must determine retention or replacement.
4. **Legacy copy is embedded in components**, not only pages. Kits, BuildFlow, ProChat OS, proof, pricing, FAQ, testimonials, invoices, and waitlists contain historical direction.
5. **Hard-coded visual rules** appear in many components through raw colors, gradients, and page-local styling assumptions.
6. **The shell is coupled to legacy routes and analytics.** Header and Footer cannot be replaced safely without route, event, and mobile-navigation validation.
7. **FeatureIcon duplication** spans five legacy product areas.
8. **Product visual primitives are missing.** The canonical Memory and Workbench visual library is documented but not implemented.
9. **Error-state primitives are missing.** Error, empty, blocked, and unavailable states are page-specific or absent.
10. **Static consumer detection has false-positive risk** for generic names such as Button, App, Card, and Review. Zero-consumer status is a candidate only, never deletion evidence.

## Zero-consumer candidates requiring proof

Static analysis found no direct consumer for these files:

```text
AudienceFilter
Banner
Expansions
Newsletter
Principle
ProblemSolution
RoutingTiles
ShipFast
SystemApply
Trust
AboutMe
BetterIcon
ButtonGradient
ButtonSignin
HeroStandard
HowToUse
SaveMoney
StripePortalButton
Testimonial1Small
TestimonialRating
Testimonials1
TestimonialsAvatars
ZeroRisk
ContentLayout
SectionIndex
theme-provider
ScrollHintWrapper
accordion
built-with-badge
navigation-menu
tooltip
StartingPointFaq
```

Some may be reached through barrel exports, dynamic content, MDX registration, or generic-name references. Every candidate requires exact import, barrel, dynamic, build, and runtime proof before any archive or removal decision.

## Lifecycle and migration rules

```text
EXPERIMENTAL → CANDIDATE → APPROVED → PRODUCTION → DEPRECATED → RETIRED
```

No component in this audit is authorized for deletion. Provisional `REPLACE/ARCHIVE` means its current responsibility belongs to a legacy page or visual system and requires a replacement or archival decision first.

## Complete component register

Legend:

- `client`: explicit client component;
- `framer`: Framer Motion dependency;
- `legacy`: embedded historical product/copy signal;
- `visual`: raw color/gradient or hard-coded visual signal;
- `external`: API, commerce, email, analytics, or external-service behavior;
- `a11y`: explicit accessibility behavior detected;
- consumer counts are static evidence, not deletion proof.

| ID | Path | Class | Consumers | Signals | Provisional disposition | Wave | Risk |
|---|---|---|---:|---|---|---:|---|
| COMP-001 | `src/app/(marketing)/App.tsx` | page assembly | 11 | a11y | REWRITE | 3 | HIGH |
| COMP-002 | `src/app/(marketing)/components/layout/Footer.tsx` | shell | 1 | a11y, legacy routes/copy | REFACTOR | 1/6 | HIGH |
| COMP-003 | `src/app/(marketing)/components/sections/AudienceFilter.tsx` | marketing | 0 | legacy | REPLACE/ARCHIVE | 3/8 | MEDIUM |
| COMP-004 | `src/app/(marketing)/components/sections/Banner.tsx` | marketing | 0 | — | DECISION_REQUIRED | 3/8 | LOW |
| COMP-005 | `src/app/(marketing)/components/sections/Expansions.tsx` | marketing | 0 | client | DECISION_REQUIRED | 3/8 | MEDIUM |
| COMP-006 | `src/app/(marketing)/components/sections/FAQ.tsx` | marketing | 1 | client, legacy | REWRITE | 3/6 | MEDIUM |
| COMP-007 | `src/app/(marketing)/components/sections/Features.tsx` | marketing | 6 | client, legacy, visual, external | REPLACE | 3/8 | HIGH |
| COMP-008 | `src/app/(marketing)/components/sections/FinalCTA.tsx` | marketing | 1 | legacy | REWRITE | 3/6 | MEDIUM |
| COMP-009 | `src/app/(marketing)/components/sections/Hero.tsx` | marketing | 4 | external asset | REFACTOR | 3 | HIGH |
| COMP-010 | `src/app/(marketing)/components/sections/License.tsx` | commerce/legal | 7 | transactional context | KEEP/REFACTOR | 6 | CRITICAL |
| COMP-011 | `src/app/(marketing)/components/sections/Newsletter.tsx` | form/marketing | 0 | framer, visual | DECISION_REQUIRED | 6/8 | MEDIUM |
| COMP-012 | `src/app/(marketing)/components/sections/Pricing.tsx` | commerce | 6 | client, legacy, visual, external | PROTECT/REWRITE | 6 | CRITICAL |
| COMP-013 | `src/app/(marketing)/components/sections/Principle.tsx` | marketing | 0 | client | DECISION_REQUIRED | 3/8 | LOW |
| COMP-014 | `src/app/(marketing)/components/sections/ProblemSolution.tsx` | marketing | 0 | client, visual, external | DECISION_REQUIRED | 3/8 | MEDIUM |
| COMP-015 | `src/app/(marketing)/components/sections/ProofLive.tsx` | legacy proof | 1 | client, legacy, visual | REPLACE/ARCHIVE | 3/8 | HIGH |
| COMP-016 | `src/app/(marketing)/components/sections/ProofOperational.tsx` | legacy proof | 1 | client, framer, legacy, visual, external | REPLACE/ARCHIVE | 3/8 | HIGH |
| COMP-017 | `src/app/(marketing)/components/sections/ProofTimeline.tsx` | legacy proof | 1 | client, legacy, visual | REPLACE/ARCHIVE | 3/8 | HIGH |
| COMP-018 | `src/app/(marketing)/components/sections/RoutingTiles.tsx` | marketing | 0 | client, legacy | REPLACE/ARCHIVE | 3/8 | MEDIUM |
| COMP-019 | `src/app/(marketing)/components/sections/ShipFast.tsx` | marketing | 0 | client, visual | DECISION_REQUIRED | 3/8 | MEDIUM |
| COMP-020 | `src/app/(marketing)/components/sections/SystemApply.tsx` | legacy system | 0 | client, legacy, visual | REPLACE/ARCHIVE | 3/8 | HIGH |
| COMP-021 | `src/app/(marketing)/components/sections/Trust.tsx` | marketing | 0 | client | DECISION_REQUIRED | 3/8 | MEDIUM |
| COMP-022 | `src/app/(marketing)/components/ui/Button.tsx` | duplicate button | 42 | — | REPLACE/MIGRATE | 1/8 | HIGH |
| COMP-023 | `src/app/(marketing)/components/ui/Reveal.tsx` | motion utility | 15 | client, framer | KEEP UNTIL MOTION AUDIT | 3/8 | HIGH |
| COMP-024 | `src/app/(marketing)/components/ui/ThemeToggle.tsx` | theme control | 1 | client, a11y | REFACTOR | 1 | MEDIUM |
| COMP-025 | `src/app/(marketing)/components/ui/Visuals.tsx` | visual utility | 2 | visual | REPLACE/REVIEW | 2/8 | MEDIUM |
| COMP-026 | `src/app/(marketing)/contact/ContactPageMarkup.tsx` | form/page | 1 | a11y, personal data | PROTECT/REWRITE | 6 | CRITICAL |
| COMP-027 | `src/app/(marketing)/studio/StudioPageContent.tsx` | legacy page | 1 | client | ARCHIVE/REPLACE | 6/8 | MEDIUM |
| COMP-028 | `src/app/admin/AdminAccessNotice.tsx` | admin | 3 | protected | KEEP | protected | CRITICAL |
| COMP-029 | `src/app/admin/AdminNav.tsx` | admin shell | 1 | client, a11y | KEEP | protected | CRITICAL |
| COMP-030 | `src/app/admin/licenses/RevokeLicenseAction.tsx` | admin action | 1 | client, external | KEEP | protected | CRITICAL |
| COMP-031 | `src/app/admin/og/AdminOgGenerator.tsx` | admin tool | 1 | client, legacy | KEEP/REFACTOR | protected | HIGH |
| COMP-032 | `src/app/ai-workflows/AIWorkflowsPageContent.tsx` | legacy page | 1 | legacy responsibility | ARCHIVE/REPLACE | 6/8 | HIGH |
| COMP-033 | `src/app/book/BookPageContent.tsx` | legacy page | 1 | legacy | ARCHIVE/REPLACE | 6/8 | MEDIUM |
| COMP-034 | `src/app/buildflow/BuildFlowPageContent.tsx` | legacy product page | 1 | legacy | REPLACE | 5/8 | CRITICAL |
| COMP-035 | `src/app/docs/DocsThemeLayout.tsx` | docs layout | 2 | docs runtime | REFACTOR | 6 | HIGH |
| COMP-036 | `src/app/kits/KitsPageContent.tsx` | legacy product | 1 | legacy | ARCHIVE | 6/8 | HIGH |
| COMP-037 | `src/app/kits/_components/KitAccessFinishClient.tsx` | transactional legacy | 2 | client, legacy, external | PROTECT | protected | CRITICAL |
| COMP-038 | `src/app/kits/_components/KitsShell.tsx` | legacy shell | 2 | client | ARCHIVE AFTER OBLIGATIONS | 6/8 | HIGH |
| COMP-039 | `src/app/kits/prokit/ProKitPageContent.tsx` | legacy product | 1 | client, legacy, external, a11y | PROTECT/ARCHIVE | 6/8 | CRITICAL |
| COMP-040 | `src/app/kits/prokit/_components/FeatureIcon.tsx` | duplicate icon | 7 | a11y | REPLACE/ARCHIVE | 2/8 | MEDIUM |
| COMP-041 | `src/app/kits/saaskit/SaaSkitPageContent.tsx` | legacy product | 1 | client, legacy, visual, external, a11y | PROTECT/ARCHIVE | 6/8 | CRITICAL |
| COMP-042 | `src/app/kits/saaskit/SaaSkitSourceTracker.tsx` | analytics | 1 | client | PROTECT/REVIEW | protected | HIGH |
| COMP-043 | `src/app/kits/saaskit/_components/FeatureIcon.tsx` | duplicate icon | 7 | a11y | REPLACE/ARCHIVE | 2/8 | MEDIUM |
| COMP-044 | `src/app/kits/uxkit/UXKitPageContent.tsx` | legacy product | 1 | legacy | ARCHIVE | 6/8 | HIGH |
| COMP-045 | `src/app/kits/uxkit/_components/FeatureIcon.tsx` | duplicate icon | 7 | a11y | REPLACE/ARCHIVE | 2/8 | MEDIUM |
| COMP-046 | `src/app/kits/waaskit/WaaSKitPageContent.tsx` | legacy product | 1 | legacy | ARCHIVE | 6/8 | HIGH |
| COMP-047 | `src/app/kits/waaskit/_components/FeatureIcon.tsx` | duplicate icon | 7 | a11y | REPLACE/ARCHIVE | 2/8 | MEDIUM |
| COMP-048 | `src/app/proof/ProofPageContent.tsx` | legacy proof | 1 | client, legacy | ARCHIVE/REPLACE | 6/8 | HIGH |
| COMP-049 | `src/app/starting-point/QuickFaqAccordion.tsx` | disclosure | 1 | client, a11y | KEEP/REFACTOR | 6 | MEDIUM |
| COMP-050 | `src/app/starting-point/SourceTracker.tsx` | analytics | 1 | client | PROTECT/REVIEW | protected | HIGH |
| COMP-051 | `src/app/starting-point/_components/StartSignupForm.tsx` | form | 1 | client, external | PROTECT/REWRITE | 6 | CRITICAL |
| COMP-052 | `src/app/starting-point/_components/StartingPointFaq.tsx` | disclosure | 0 | client, a11y | DECISION_REQUIRED | 6/8 | LOW |
| COMP-053 | `src/app/systems/events/EventTaxonomyContent.tsx` | legacy product | 1 | client, legacy, external | ARCHIVE/REPLACE | 6/8 | HIGH |
| COMP-054 | `src/app/systems/prochat-os/ProChatOSPageContent.tsx` | legacy product | 1 | client, legacy | REPLACE/ARCHIVE | 5/8 | CRITICAL |
| COMP-055 | `src/app/systems/prochat-os/_components/FeatureIcon.tsx` | duplicate icon | 7 | a11y | REPLACE/ARCHIVE | 2/8 | MEDIUM |
| COMP-056 | `src/app/waiting-list/WaitingListBody.tsx` | form | 2 | client, external, a11y | PROTECT/REWRITE | 6 | CRITICAL |
| COMP-057 | `src/app/waiting-list/WaitlistPageMarkup.tsx` | form/page | 1 | legacy, a11y | REWRITE | 6 | HIGH |
| COMP-058 | `src/components/AboutMe.tsx` | legacy founder/personal | 0 | client, legacy, external | ARCHIVE/REPLACE | 6/8 | HIGH |
| COMP-059 | `src/components/Access.tsx` | access/licence | 9 | protected | KEEP | protected | CRITICAL |
| COMP-060 | `src/components/AppChrome.tsx` | app shell | 1 | client, a11y | REFACTOR | 1 | CRITICAL |
| COMP-061 | `src/components/AppShell.tsx` | app shell | 1 | client | REFACTOR | 1 | CRITICAL |
| COMP-062 | `src/components/AuthScreen.tsx` | auth | 2 | visual, a11y | KEEP/REFACTOR | protected | CRITICAL |
| COMP-063 | `src/components/BetterIcon.tsx` | icon wrapper | 0 | — | DECISION_REQUIRED | 2/8 | LOW |
| COMP-064 | `src/components/Button.tsx` | duplicate button wrapper | 46 | loading wrapper | MIGRATE/REFACTOR | 1/8 | HIGH |
| COMP-065 | `src/components/ButtonGradient.tsx` | legacy button | 0 | client, visual | REPLACE/ARCHIVE | 1/8 | MEDIUM |
| COMP-066 | `src/components/ButtonSignin.tsx` | auth action | 0 | protected role | KEEP/VERIFY | protected | HIGH |
| COMP-067 | `src/components/CheckoutButton.tsx` | commerce | 2 | client, external | KEEP | protected | CRITICAL |
| COMP-068 | `src/components/ContextualLinkCta.tsx` | content CTA | 2 | client, a11y | KEEP/REFACTOR | 6 | MEDIUM |
| COMP-069 | `src/components/Dashboard.tsx` | app/dashboard | 3 | client, visual | PROTECT/REVIEW | protected | HIGH |
| COMP-070 | `src/components/FAQSection.tsx` | legacy FAQ | 2 | client, legacy, a11y | REPLACE | 6/8 | HIGH |
| COMP-071 | `src/components/Header.tsx` | global navigation | 5 | client, a11y, legacy routes | REPLACE/REFACTOR | 1/6 | CRITICAL |
| COMP-072 | `src/components/HeroStandard.tsx` | generic hero | 0 | a11y | DECISION_REQUIRED | 3/8 | LOW |
| COMP-073 | `src/components/HowToUse.tsx` | legacy section | 0 | — | DECISION_REQUIRED | 6/8 | LOW |
| COMP-074 | `src/components/PriceItem.tsx` | commerce | 1 | client, external | KEEP | protected | CRITICAL |
| COMP-075 | `src/components/PricingSection.tsx` | commerce | 1 | client, external | KEEP/REFACTOR | protected | CRITICAL |
| COMP-076 | `src/components/Review.tsx` | testimonial/review | 5 | legacy | REWRITE/ARCHIVE | 6/8 | HIGH |
| COMP-077 | `src/components/RotatingText.tsx` | motion text | 1 | client, a11y | REPLACE/REVIEW | 6/8 | MEDIUM |
| COMP-078 | `src/components/SaveMoney.tsx` | legacy claim | 0 | legacy | ARCHIVE | 8 | HIGH |
| COMP-079 | `src/components/Scenarios.tsx` | dashboard/commerce | 1 | client, external | PROTECT/REVIEW | protected | HIGH |
| COMP-080 | `src/components/StripePortalButton.tsx` | commerce | 0 | client, external | KEEP/VERIFY | protected | CRITICAL |
| COMP-081 | `src/components/StructuredData.tsx` | metadata | 10 | structured data | KEEP/REFACTOR | 6 | HIGH |
| COMP-082 | `src/components/Testimonial1Small.tsx` | testimonial | 0 | external asset | DECISION_REQUIRED | 6/8 | LOW |
| COMP-083 | `src/components/TestimonialRating.tsx` | testimonial | 0 | — | DECISION_REQUIRED | 6/8 | LOW |
| COMP-084 | `src/components/Testimonials.jsx` | testimonial | 1 | client, visual | REWRITE/ARCHIVE | 6/8 | MEDIUM |
| COMP-085 | `src/components/Testimonials1.tsx` | testimonial | 0 | legacy, external | ARCHIVE | 8 | HIGH |
| COMP-086 | `src/components/TestimonialsAvatars.tsx` | testimonial | 0 | legacy | ARCHIVE | 8 | HIGH |
| COMP-087 | `src/components/ThankyouPopUp.tsx` | transactional UI | 1 | client | PROTECT/REVIEW | protected | HIGH |
| COMP-088 | `src/components/ThemeRadialTransition.tsx` | theme motion | 1 | client, a11y | REPLACE/REVIEW | 1/8 | MEDIUM |
| COMP-089 | `src/components/TrackedOutboundLink.tsx` | analytics link | 1 | client | KEEP/REFACTOR | protected | HIGH |
| COMP-090 | `src/components/UmamiAnalytics.tsx` | analytics | 1 | external script | KEEP/REVIEW | protected | CRITICAL |
| COMP-091 | `src/components/ZeroRisk.tsx` | legacy claim | 0 | legacy | ARCHIVE | 8 | HIGH |
| COMP-092 | `src/components/category.tsx` | content taxonomy | 6 | content | KEEP/REFACTOR | 6 | MEDIUM |
| COMP-093 | `src/components/content/CTASection.tsx` | content CTA | 4 | content | REWRITE/REFACTOR | 6 | MEDIUM |
| COMP-094 | `src/components/content/Callout.tsx` | content | 1 | a11y | KEEP | 6 | LOW |
| COMP-095 | `src/components/content/ContentLayout.tsx` | content layout | 0 | a11y | KEEP/VERIFY | 6 | MEDIUM |
| COMP-096 | `src/components/content/MDXRenderer.tsx` | content runtime | 2 | MDX | KEEP/REFACTOR | 6 | HIGH |
| COMP-097 | `src/components/content/PullQuote.tsx` | content | 1 | a11y | KEEP | 6 | LOW |
| COMP-098 | `src/components/content/RelatedContent.tsx` | content navigation | 2 | a11y | REFACTOR | 6 | MEDIUM |
| COMP-099 | `src/components/content/SectionIndex.tsx` | content navigation | 0 | — | KEEP/VERIFY | 6 | LOW |
| COMP-100 | `src/components/content/mdx-components.tsx` | MDX registry | 1 | content runtime | KEEP | 6 | HIGH |
| COMP-101 | `src/components/email-templates/ContactConfirmationEmail.tsx` | email | 1 | visual, personal data | PROTECT/REBRAND | protected | CRITICAL |
| COMP-102 | `src/components/email-templates/ContactNotificationEmail.tsx` | email | 1 | visual, personal data | PROTECT/REBRAND | protected | CRITICAL |
| COMP-103 | `src/components/email-templates/Invoice.tsx` | transactional email | 3 | legacy | PROTECT/LEGAL REVIEW | protected | CRITICAL |
| COMP-104 | `src/components/email-templates/LicenseRevokedEmail.tsx` | transactional email | 1 | visual | PROTECT/REBRAND | protected | CRITICAL |
| COMP-105 | `src/components/email-templates/ProChatEmailBrand.tsx` | email foundation | 2 | — | KEEP/REFACTOR | protected | HIGH |
| COMP-106 | `src/components/email-templates/ThanksYouTemplate.tsx` | transactional email | 1 | visual | PROTECT/REWRITE | protected | CRITICAL |
| COMP-107 | `src/components/email-templates/WaitlistAdminNotificationEmail.tsx` | email | 1 | visual, personal data | PROTECT/REWRITE | protected | CRITICAL |
| COMP-108 | `src/components/email-templates/WaitlistConfirmationEmail.tsx` | email | 1 | visual, personal data | PROTECT/REWRITE | protected | CRITICAL |
| COMP-109 | `src/components/heading.tsx` | typography | 4 | — | REFACTOR | 1 | MEDIUM |
| COMP-110 | `src/components/icon-button.tsx` | button/icon | 1 | — | MIGRATE/REFACTOR | 1 | MEDIUM |
| COMP-111 | `src/components/lazy-load-iframe.tsx` | media utility | 1 | client | KEEP | 6 | MEDIUM |
| COMP-112 | `src/components/login-payment.tsx` | auth/commerce | 1 | client, legacy, visual, external | PROTECT/REFACTOR | protected | CRITICAL |
| COMP-113 | `src/components/logo.tsx` | brand | 7 | visual, a11y | REFACTOR | 1 | HIGH |
| COMP-114 | `src/components/marketing/HeroSection.tsx` | general hero | 15 | a11y | KEEP/REFACTOR | 3/6 | HIGH |
| COMP-115 | `src/components/nav-links.tsx` | local navigation | 1 | legacy route | REPLACE/REVIEW | 6/8 | MEDIUM |
| COMP-116 | `src/components/prompts/PromptCopyButton.tsx` | content action | 1 | client | KEEP/REFACTOR | 6 | MEDIUM |
| COMP-117 | `src/components/prompts/PromptPageLayout.tsx` | legacy content | 1 | content | ARCHIVE/REFACTOR | 6/8 | HIGH |
| COMP-118 | `src/components/providers.tsx` | provider boundary | 2 | client | PROTECT/REVIEW | protected | CRITICAL |
| COMP-119 | `src/components/stripe/StripeClient.tsx` | commerce provider | 1 | client, external | KEEP | protected | CRITICAL |
| COMP-120 | `src/components/theme-provider.tsx` | theme provider | 0 | client | VERIFY/REFACTOR | 1/8 | HIGH |
| COMP-121 | `src/components/ui/Scaffolding.tsx` | visual scaffold | 10 | visual | REPLACE/REFACTOR | 2/8 | HIGH |
| COMP-122 | `src/components/ui/ScrollHintWrapper.tsx` | motion utility | 0 | client, visual, a11y | DECISION_REQUIRED | 7/8 | MEDIUM |
| COMP-123 | `src/components/ui/accordion.tsx` | disclosure primitive | 0 | client, Radix | KEEP/VERIFY | 1/6 | MEDIUM |
| COMP-124 | `src/components/ui/avatar.tsx` | UI primitive | 4 | client, Radix | KEEP | 1 | LOW |
| COMP-125 | `src/components/ui/badge.tsx` | UI primitive | 2 | — | REFACTOR | 1 | LOW |
| COMP-126 | `src/components/ui/built-with-badge.tsx` | legacy badge | 0 | legacy, visual, a11y | ARCHIVE | 8 | MEDIUM |
| COMP-127 | `src/components/ui/button.tsx` | canonical button candidate | 51 | Radix Slot/CVA | KEEP/REFACTOR | 1 | HIGH |
| COMP-128 | `src/components/ui/card.tsx` | card primitive | 13 | — | REFACTOR | 1 | MEDIUM |
| COMP-129 | `src/components/ui/dialog.tsx` | dialog primitive | 2 | client, Radix, a11y | KEEP | 1 | HIGH |
| COMP-130 | `src/components/ui/hero-badge.tsx` | hero primitive | 14 | — | REFACTOR | 2/6 | MEDIUM |
| COMP-131 | `src/components/ui/hero-check-row.tsx` | hero primitive | 12 | — | REWRITE/REFACTOR | 2/6 | MEDIUM |
| COMP-132 | `src/components/ui/icons.tsx` | icon registry | 4 | — | KEEP/REFACTOR | 1/2 | MEDIUM |
| COMP-133 | `src/components/ui/input.tsx` | form primitive | 19 | — | KEEP/REFACTOR | 1 | HIGH |
| COMP-134 | `src/components/ui/navigation-menu.tsx` | navigation primitive | 0 | Radix, a11y | VERIFY/KEEP | 1/8 | MEDIUM |
| COMP-135 | `src/components/ui/sheet.tsx` | mobile overlay | 1 | client, Radix, a11y | KEEP/REFACTOR | 1 | HIGH |
| COMP-136 | `src/components/ui/slider.tsx` | input primitive | 1 | client, Radix | KEEP | 1 | MEDIUM |
| COMP-137 | `src/components/ui/social-icons.tsx` | icon/social | 2 | a11y | REFACTOR | 1 | MEDIUM |
| COMP-138 | `src/components/ui/surface.tsx` | structural surface | 59 | — | KEEP/REFACTOR | 1 | HIGH |
| COMP-139 | `src/components/ui/switch.tsx` | input primitive | 1 | client, Radix | KEEP | 1 | MEDIUM |
| COMP-140 | `src/components/ui/tooltip.tsx` | tooltip primitive | 0 | client, Radix | VERIFY/KEEP | 1/8 | MEDIUM |

## Required validation before any migration

For every component selected for production migration:

- exact direct and indirect consumer search;
- barrel and dynamic import search;
- public API and variant review;
- server/client boundary review;
- accessibility and responsive review;
- motion and reduced-motion review;
- screenshot or visual baseline;
- type check and production build;
- route-specific smoke tests;
- zero-consumer proof before deprecation or removal.

## Unresolved decisions

1. Which of the three button layers becomes the sole public primitive, and which wrapper behaviors remain separate?
2. Should the current Header be refactored in place or replaced behind a compatibility boundary?
3. Which authenticated/admin/commerce surfaces are outside the public-platform visual migration scope?
4. Which legacy kit components must remain accessible for previous purchasers?
5. Which content/MDX primitives support future documentation versus legacy SaaS content only?
6. Whether dark-theme controls remain public after the light-first design implementation.
7. Whether Framer Motion remains for micro-interactions after the motion audit.
8. Which zero-consumer candidates are actually reached through barrels, MDX, dynamic imports, or runtime configuration.
9. Whether email templates share the public design system or a separate email-safe token subset.
10. Which product visual and error-state primitives must be created before page migration begins.
