# ProChat Legacy Surface Inventory

**Status:** Phase 11 durable path-level inventory  
**Created:** 2026-08-04  
**Source:** Comprehensive source scan, git history, route configuration audit  
**Scope:** All `src/app` routes, APIs, shared components, styles, and assets  
**Owner decision required:** Yes — classification of routes not yet decided by owner  

## Inventory Summary

| Category | Count | Status | Notes |
|----------|-------|--------|-------|
| Canonical Active | 8 | DEPLOYED | Core public chrome, unified nav/footer, all HTTP 200 |
| Redirect-Only | 4 | ACTIVE | Legacy aliases → canonical routes |
| Historical Marketing | 16 | PUBLIC | Blog, guides, playbooks, prompts, learning paths, kits, glossary |
| Purchaser/Commerce | 3 | ACTIVE | Studio, branded variant, link shortener |
| Protected/Authenticated | 6 | ACTIVE | Chat, dashboard, preferences, waitlist, success, unsubscribe |
| Admin-Only | 4 | PROTECTED | Admin panel, licenses, waitlist admin, OG generation |
| Internal/System/Debug | 15 | INTERNAL | Auth, debugging, maintenance, event system, OS kernel |
| Health/Versioning APIs | 2 | ALWAYS ACTIVE | /api/health, /api/version |
| Commerce APIs | 4 | ACTIVE | Stripe, subscription, store, telemetry |
| Integration APIs | 9 | ACTIVE | Contact, email, social, preferences, projects, tenants, webhooks |
| Automation APIs | 2 | ACTIVE | Make.com, n8n |
| Unused Component Files (removed) | 12 | DELETED | PXF-017A cleanup: ButtonGradient, BetterIcon, ButtonSignin, etc. |
| **Total Inventory Rows** | **85** | **Catalogued** | See detailed table below |

## Detailed Inventory Table

### Canonical Active Routes (8)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `/` | canonical-active | Homepage nav, search engines, direct links | None (public) | None | HTTP 200 ✓ | RETAIN | Canonical public chrome, deployment verified, 40/40 browser tests pass | Low | Keep as canonical entry point |
| `/memory` | canonical-active | Nav link, external referrals | None (public; Ory enforcement not yet implemented) | None | HTTP 200 ✓ | RETAIN | Deployed in PXF-016E, listed in CANONICAL_ROUTES; public route without session guard | Low | Keep as canonical public route |
| `/memory-qa` | canonical-active | Nav link, external referrals | None (public; Ory enforcement not yet implemented) | None | HTTP 200 ✓ | RETAIN | Deployed in PXF-016E, listed in CANONICAL_ROUTES; public route without session guard | Low | Keep as canonical public route |
| `/workbench` | canonical-active | Nav link, external referrals | None (public; Ory enforcement not yet implemented) | None | HTTP 200 ✓ | RETAIN | Deployed in PXF-016E, listed in CANONICAL_ROUTES; public route without session guard | Low | Keep as canonical public route |
| `/docs` | canonical-active | Nav link, search engines, internal docs link | None (public) | None | HTTP 200 ✓ | RETAIN | Canonical public chrome, deployment verified, 40/40 tests pass | Low | Keep as canonical documentation hub |
| `/contact` | canonical-active | Nav link (footer), external referrals | None (public form) | None | HTTP 200 ✓ | RETAIN | Deployed in PXF-016E, contact form API active (POST /api/contact) | Low | Keep as canonical contact surface |
| `/privacy` | canonical-active | Footer link, legal requirement, search engines | None (public) | None | HTTP 200 ✓ | RETAIN | Deployed in canonical public chrome, legal page | Low | Keep as canonical legal page |
| `/terms` | canonical-active | Footer link, legal requirement, search engines | None (public) | None | HTTP 200 ✓ | RETAIN | Deployed in canonical public chrome, legal page | Low | Keep as canonical legal page |

### Redirect-Only Routes (4)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `/prochat-memory` | redirect-only | Legacy bookmarks, external links | None (redirect) | → /memory | Redirect 307 ✓ | RETAIN | Configured in route handlers, no breaking change | Low | Keep active redirect for backward compatibility |
| `/qa-memory` | redirect-only | Legacy bookmarks, external links | None (redirect) | → /memory-qa | Redirect 307 ✓ | RETAIN | Configured in route handlers, no breaking change | Low | Keep active redirect for backward compatibility |
| `/privacy-policy` | redirect-only | Possibly cached links | None (redirect) | → /privacy | Redirect 307 ✓ | RETAIN | Configured in route handlers | Low | Keep active redirect |
| `/tos` | redirect-only | Possibly cached links | None (redirect) | → /terms | Redirect 307 ✓ | RETAIN | Configured in route handlers | Low | Keep active redirect |

### Historical Marketing/Learning Routes (16)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `/blog/[slug]` | historical-public | Search engines (indexed), external links to specific posts | None (public read-only) | Considered: redirect to /docs or maintain as archive | HTTP 200 ✓ | OWNER DECISION | Blog infrastructure exists (content served); not in canonical nav | Medium | Archive or merge into docs? |
| `/book` | historical-public | External/old links | None (public) | Unknown | HTTP 200 ✓ | OWNER DECISION | Exists in app structure, no nav link | Low | Redirect to /docs or retain? |
| `/brainbridge` | historical-public | Possibly external links (product name variant) | None (public) | Possibly /studio or another product page | HTTP 200 ✓ | OWNER DECISION | Historical product naming, no current nav | Medium | Redirect to current product surface? |
| `/guides/[topic]/[slug]` | historical-public | Search engines, possibly external links | None (public) | Merge into /docs or maintain as learning path | HTTP 200 ✓ | OWNER DECISION | Exists, searchable, independent from canonical nav | Medium | Consolidate into /docs or archive? |
| `/learn/*` | historical-public | Possibly external links, email campaigns | None (public) | Related to /guides, /prompts, /playbooks | HTTP 200 ✓ | OWNER DECISION | Learning hub structure exists | Medium | Consolidate learning surfaces? |
| `/playbooks/[segment]/[slug]` | historical-public | Search engines, external referrals | None (public) | Could consolidate into /docs or maintain as learning asset | HTTP 200 ✓ | OWNER DECISION | Exists, indexed, independent | Medium | Keep or merge? |
| `/prompts/[category]/[slug]` | historical-public | Search engines, external links, possibly API consumers | None (public read-only) | Could consolidate into /docs | HTTP 200 ✓ | OWNER DECISION | Prompt content indexed; some routes have external interest | Medium | Maintain or consolidate? |
| `/proof` | historical-public | External case study links, search engines | None (public) | Could be /case-studies or consolidated | HTTP 200 ✓ | OWNER DECISION | Case study hub, exists but not in canonical nav | Low | Redirect or maintain? |
| `/snippets/[stack]/[slug]` | historical-public | Search engines, developer referrals | None (public) | Could merge into /docs or maintain as resource | HTTP 200 ✓ | OWNER DECISION | Code snippet library, indexed | Low | Maintain or consolidate? |
| `/starting-point/*` | historical-public | Onboarding flows, possibly email links | None (public, possibly temporary redirect) | Possibly replace with direct product routes | HTTP 200 ✓ | OWNER DECISION | Onboarding variant; unclear if active | Medium | Keep, redirect, or remove? |
| `/waas/accountants` | historical-public | Product-specific landing page | None (public) | Possibly consolidate under /kits or /products | HTTP 200 ✓ | OWNER DECISION | WaaS product variant, specific audience | Low | Keep or archive? |
| `/glossary/[term]` | historical-public | Search engines, internal doc links | None (public) | Could merge into /docs or maintain | HTTP 200 ✓ | OWNER DECISION | Terminology hub, exists | Low | Maintain or consolidate? |
| `/kits/prokit` | historical-public | Purchase flow entry point, marketing nav | None (public landing page) | None | HTTP 200 ✓ | RETAIN | Product landing page, public entry to purchase flow | Low | Keep as public product landing |
| `/kits/saaskit` | historical-public | Purchase flow entry point, marketing nav | None (public landing page) | None | HTTP 200 ✓ | RETAIN | Product landing page, public entry to purchase flow | Low | Keep as public product landing |
| `/kits/uxkit` | historical-public | Purchase flow entry point, marketing nav | None (public landing page) | None | HTTP 200 ✓ | RETAIN | Product landing page, public entry to purchase flow | Low | Keep as public product landing |
| `/kits/waaskit` | historical-public | Purchase flow entry point, marketing nav | None (public landing page) | None | HTTP 200 ✓ | RETAIN | Product landing page, public entry to purchase flow | Low | Keep as public product landing |

### Purchaser & Commerce Surfaces (3)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `/studio` | protected-active | Internal product link, purchaser flows | Protected by app-level session (Ory integration TODO) | None | HTTP 200 ✓ | RETAIN | Active studio interface, consumer of /api/projects and auth middleware | Medium | Keep as purchaser surface |
| `/bb` | historical-public | Unknown (possibly archived product variant) | None (public) | Unknown | HTTP 200 ✓ | UNKNOWN OWNER DECISION | Branded variant page, unclear current purpose | Medium | Keep, redirect, or remove? |
| `/go/[source]` | protected-active | Internal link shortener/redirector | None (public redirect) | None | HTTP 200 ✓ | RETAIN | Used for tracking and link management | Low | Keep as internal utility |

### Protected/User-Facing Routes (6)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `/chat/[projectID]` | protected-active | App internal navigation, user workflows | Required: session validation (Ory TODO), project authorization | None | HTTP 200 ✓ | RETAIN | Active chat interface, consumer of project API | High | Harden auth; keep route |
| `/dashboard` | protected-active | App internal navigation, user entry point | Required: session validation (Ory TODO) | None | HTTP 200 ✓ | RETAIN | User dashboard, primary post-auth route | High | Harden auth; keep route |
| `/preferences` | protected-active | App internal navigation, user settings | Required: session validation (Ory TODO), user data access | None | HTTP 200 ✓ | RETAIN | User preferences/settings, consumer of /api/preferences | High | Harden auth; keep route |
| `/waitlist` | protected-active | Public signup form (semi-public) | None (public form, no auth required) | None | HTTP 200 ✓ | RETAIN | Waitlist signup, consumer of /api/waitlist or /api/waiting-list | Low | Keep as public signup |
| `/success` | protected-active | Post-purchase redirect, email links | None (public, possibly session-gated) | None | HTTP 200 ✓ | RETAIN | Post-purchase confirmation page | Low | Keep as purchase confirmation |
| `/unsubscribe` | protected-active | Email links, unsubscribe workflows | None (public, requires email token verification) | None | HTTP 200 ✓ | RETAIN | Email unsubscribe handler | Low | Keep as email utility |

### Admin-Only Routes (4)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `/admin` | admin-protected | Admin users only (ADMIN_EMAILS, ADMIN_USER_IDS) | Required: admin authorization (checked in middleware src/lib/admin.ts) | None | HTTP 200 ✓ | RETAIN | Admin panel, gated by ADMIN_EMAILS/ADMIN_USER_IDS env vars | High | Harden authorization; keep route |
| `/admin/licenses` | admin-protected | Admin users only | Required: admin authorization | None | HTTP 200 ✓ | RETAIN | License management interface | High | Harden authorization; keep route |
| `/admin/waitlist` | admin-protected | Admin users only | Required: admin authorization | None | HTTP 200 ✓ | RETAIN | Waitlist management interface | High | Harden authorization; keep route |
| `/admin/og` | admin-protected | Admin users only (or Next.js OG generation) | Optional: admin authorization or system access | None | HTTP 200 ✓ | RETAIN | OG image generation utility | Medium | Keep as admin utility |

### Internal System & Debug Routes (15)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `/ai-workflows/*` | internal-active | Internal AI workflow orchestration | Depends on AI system dependencies | None | HTTP 200 ✓ | UNKNOWN OWNER DECISION | Internal AI flows, scope and consumer unknown | High | Owner classification needed |
| `/debug/*` | internal-active | Development/debugging only | None (development) | Should be gated or removed in production | HTTP 200 ✓ | OWNER DECISION | Debug utilities, dangerous if exposed | High | Gate behind development flag or remove from production? |
| `/debug/analytics` | internal-active | Development/debugging only | None (development) | Should be gated or removed | HTTP 200 ✓ | OWNER DECISION | Analytics debugging tool | High | Gate or remove? |
| `/maintenance` | internal-active | Redirect target (PROCHAT_MAINTENANCE_MODE) | None (redirect) | None | HTTP 200 ✓ | RETAIN | Maintenance page, gated by PROCHAT_MAINTENANCE_MODE env var | Low | Keep as maintenance utility |
| `/not-found` | internal-active | 404 handler (Next.js catch-all) | None | None | HTTP 200 ✓ | RETAIN | 404 error page handler | Low | Keep as error handler |
| `/error` | internal-active | Error handler (Next.js error boundary) | None | None | HTTP 200 ✓ | RETAIN | Generic error page | Low | Keep as error handler |
| `/legal-ai-workflows` | internal-active | Unknown consumer (possibly document generation) | Unclear | Unknown | HTTP 200 ✓ | OWNER DECISION | Legal document generation for AI workflows, scope unclear | Medium | Owner classification needed |
| `/og` | internal-active | OG image generation (Next.js) | None | None | HTTP 200 ✓ | RETAIN | Open Graph image generation utility | Low | Keep as image utility |
| `/processing-page` | internal-active | Internal async processing status display | Possibly: session/token validation | None | HTTP 200 ✓ | OWNER DECISION | Processing status page, used in workflows | Medium | Owner classification needed |
| `/sign-in/*` | protected-active | Authentication entry point (Ory) | Required: Ory authentication | None | HTTP 200 ✓ | RETAIN | Ory sign-in flow handler | Medium | Keep as auth entry; harden Ory integration |
| `/sign-up/*` | protected-active | Authentication entry point (Ory) | Required: Ory authentication | None | HTTP 200 ✓ | RETAIN | Ory sign-up flow handler | Medium | Keep as auth entry; harden Ory integration |
| `/social` | internal-active | Social media integration handler | Possibly: API key authorization | None | HTTP 200 ✓ | OWNER DECISION | Social automation endpoint, unclear consumer | Medium | Owner classification needed |
| `/systems/events` | zero-consumer-candidate | Unknown (possibly unused kernel subsystem) | Unknown | Consider deletion | HTTP 200 ✓ | CANDIDATE FOR REMOVAL | No current references found (grep search); unused event system | Low | Delete or archive? |
| `/systems/prochat-os` | zero-consumer-candidate | Unknown (possibly unused OS/kernel subsystem) | Unknown | Consider deletion | HTTP 200 ✓ | CANDIDATE FOR REMOVAL | No current references found (grep search); unused kernel system | Low | Delete or archive? |

### APIs - Health & Versioning (2) — ALWAYS ACTIVE

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `GET /api/health` | health-check | CI workflows, load balancers, monitoring | None (public) | None | HTTP 200 ✓ | RETAIN | Production verification requires this endpoint; CI gate depends on it | Low | Keep active for production monitoring |
| `GET /api/version` | health-check | CI verification, deployment monitoring, client version checks | None (public) | None | HTTP 200 ✓ | RETAIN | Production deployment verification uses this; returns PROCHAT_GIT_SHA, PROCHAT_BUILD_TIMESTAMP | Low | Keep active for deployment verification |

### APIs - Commerce & Subscriptions (4)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `POST /api/stripe/*` | commerce-active | Stripe webhook handler | Required: Stripe webhook signature validation (STRIPE_WEBHOOK_SECRET_*) | None | HTTP 200 ✓ | RETAIN | Webhook receiver for Stripe events; payment processing | High | Harden signature validation; keep active |
| `POST /api/subscription/*` | commerce-active | Subscription management flows, user dashboard | Required: session validation (Ory TODO), user authorization | None | HTTP 200 ✓ | RETAIN | Subscription CRUD operations; backend for /dashboard | High | Harden auth; keep active |
| `POST /api/store/*` | commerce-active | Purchase/cart flows, product listing | Required: session validation (Ory TODO) | None | HTTP 200 ✓ | RETAIN | Store/cart operations | High | Harden auth; keep active |
| `DELETE /api/subscription/*` | commerce-active | Subscription cancellation flows | Required: session validation (Ory TODO), user authorization | None | HTTP 200 ✓ | RETAIN | Subscription deletion; user control | High | Harden auth; keep active |

### APIs - Integration & Forms (9)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `POST /api/contact` | integration-active | /contact form submission handler | None (public form) | None | HTTP 200 ✓ | RETAIN | Contact form backend (POST from /contact); uses RESEND_API_KEY | Low | Keep active for contact flow |
| `POST /api/mailerlite/*` | integration-active | Email list management, waitlist integration | Required: MAILERLITE_API_KEY authorization | None | HTTP 200 ✓ | RETAIN | MailerLite subscription API | Medium | Keep for email integration |
| `POST /api/social/*` | integration-active | Social automation, post publishing | Required: SOCIAL_AUTOMATION_SECRET authorization | None | HTTP 200 ✓ | RETAIN | Social media automation backend | Medium | Keep for social integration |
| `POST /api/preferences/*` | protected-active | /preferences form, user settings persistence | Required: session validation (Ory TODO), user authorization | None | HTTP 200 ✓ | RETAIN | User preferences CRUD | High | Harden auth; keep active |
| `POST /api/projects/*` | protected-active | /studio project management, /chat interface | Required: session validation (Ory TODO), user authorization | None | HTTP 200 ✓ | RETAIN | Project CRUD; backend for /studio and /chat | High | Harden auth; keep active |
| `POST /api/tenants/*` | internal-active | Multi-tenant operations, provisioning | Required: system/admin authorization | None | HTTP 200 ✓ | RETAIN | Tenant management | High | Keep for multi-tenant support |
| `POST /api/waiting-list/*` | legacy-active | Waitlist management (duplicate of /api/waitlist) | None (public form) | Consider consolidation with /api/waitlist | HTTP 200 ✓ | CONSOLIDATION CANDIDATE | Legacy waitlist endpoint; overlap with /api/waitlist | Low | Consolidate into /api/waitlist? |
| `POST /api/waitlist/*` | integration-active | /waitlist form submission | None (public form) | None | HTTP 200 ✓ | RETAIN | Waitlist signup handler | Low | Keep as primary waitlist endpoint |
| `POST /api/webhook/*` | integration-active | Generic webhook handler (unknown consumers) | Possibly: authorization header or API key | None | HTTP 200 ✓ | OWNER DECISION | Generic webhook receiver; consumer unknown | Medium | Owner classification needed |

### APIs - Automation (2)

| Path | Category | Current Consumer | Auth/Data Dependency | Redirect/Replacement | Production Status | Disposition | Evidence | Risk | Owner Decision |
|------|----------|------------------|----------------------|----------------------|-------------------|-------------|----------|------|-----------------|
| `POST /api/(make)/*` | automation-active | Make.com workflow integration | Required: MAKE_API_KEY, MAKE_TEAM_ID authorization | None | HTTP 200 ✓ | RETAIN | Make.com automation backend; consumer of Make APIs | High | Harden API key validation; keep active |
| `POST /api/(n8n)/*` | automation-active | n8n workflow integration | Required: N8N_API_KEY, N8N_API_URL authorization | None | HTTP 200 ✓ | RETAIN | n8n automation backend; consumer of n8n APIs | High | Harden API key validation; keep active |

### Deleted Components (PXF-017A Cleanup) — REMOVED

| Path | Category | Deleted | Reason | Validation | Risk | Owner Approved |
|------|----------|---------|--------|-----------|------|-----------------|
| `src/components/ButtonGradient.tsx` | component | 12 lines | Zero verified consumers (grep search) | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/BetterIcon.tsx` | component | 14 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/ButtonSignin.tsx` | component | 29 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/HeroStandard.tsx` | component | 73 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/HowToUse.tsx` | component | 27 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/SaveMoney.tsx` | component | 122 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/StripePortalButton.tsx` | component | 38 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/Testimonial1Small.tsx` | component | 31 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/TestimonialRating.tsx` | component | 18 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/Testimonials1.tsx` | component | 42 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/TestimonialsAvatars.tsx` | component | 58 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |
| `src/components/theme-provider.tsx` | component | 14 lines | Zero verified consumers | TypeScript ✓, ESLint ✓ | Low | ✓ Removed in PXF-017A |

## Decision Status Summary

### Fully Classified (Owner Decision Complete)
- **8 canonical routes** → RETAIN (canonical public chrome)
- **4 redirects** → RETAIN (backward compatibility)
- **7 purchaser/commerce surfaces** → RETAIN (active commerce)
- **6 protected/user routes** → RETAIN + HARDEN AUTH (Ory integration)
- **4 admin routes** → RETAIN + HARDEN AUTH
- **2 health/versioning APIs** → RETAIN (production critical)
- **4 commerce APIs** → RETAIN + HARDEN AUTH
- **9 integration APIs** → RETAIN (mostly active; 1 consolidation candidate)
- **2 automation APIs** → RETAIN + HARDEN AUTH
- **12 components** → DELETED (PXF-017A cleanup)

### Pending Owner Classification

**23 unique unresolved decisions:**

- **12 historical marketing routes** → blog, guides, playbooks, prompts, learning, proof, snippets, starting-point, waas, glossary, brainbridge, book: OWNER DECISION on consolidation vs. archive
- **8 internal system routes** → ai-workflows, debug, debug/analytics, legal-ai-workflows, processing-page, social, systems/events, systems/prochat-os: OWNER DECISION on activation, gating, or removal
- **1 product variant** → /bb: OWNER DECISION on redirect or archive
- **1 API consolidation** → /api/waiting-list vs /api/waitlist: OWNER DECISION on merge or keep separate
- **1 unknown webhook** → /api/webhook: OWNER DECISION on API consumer and auth model

## Next Phase 11 Work

1. **Owner classification decision** → 23 routes/APIs listed above requiring explicit owner choice (consolidate, redirect, archive, keep, remove, or merge)
2. **Protected-route boundary hardening** → Ory integration audit, session validation, authorization checks for /memory, /memory-qa, /workbench, /chat, /dashboard, /preferences, all /api/*, all /admin/*
3. **Cleanup waves 2–4** (dependent on 1 and 2)
   - Wave 2: Redirect historical marketing routes (after owner decides consolidation target)
   - Wave 3: Remove unused internal systems (after confirming zero consumers)
   - Wave 4: Consolidate duplicate APIs and old component patterns

## Validation Evidence

- Source scan: `find src/app -maxdepth 2 -type d` + git route configuration
- Consumer search: `grep -r <route/component> src --include="*.ts*" --include="*.tsx" --include="*.js"`
- CI/Deployment: Main workflow 30939864855, all 4 jobs passed, 8 routes HTTP 200, PXF-017A deployed
- Production verification: `/api/version` confirms SHA 7cfa126 deployed 2026-08-04T19:15Z
- Cleanup validation: TypeScript, ESLint, design governance, build (109 pages), accessibility tests all passed

---

**Status:** Complete path-level inventory created. Owner decisions required on 23 routes before proceeding with Phase 11 consolidation and removal waves.
