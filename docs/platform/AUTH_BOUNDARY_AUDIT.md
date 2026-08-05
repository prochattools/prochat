# Authentication Boundary Audit — PXF-018A Deployment Status

**Created:** 2026-08-04  
**Deployed:** 2026-08-05T14:12:22Z (workflow 31012683840, SHA 38bc212)  
**Scope:** All protected, admin, commerce, webhook, and internal routes  
**Source:** src/middleware.ts, src/lib/admin.ts, route handlers, server actions, tests  
**Status:** Audit corrected and remediation deployed (MailerLite credential removed, project API fail-closed, CI security tests wired)  

## Executive Summary

Current authentication enforcement:

- **Maintenance redirects:** Implemented via src/middleware.ts (PROCHAT_MAINTENANCE_MODE)
- **Admin authorization:** Implemented via src/lib/admin.ts (ADMIN_EMAILS, ADMIN_USER_IDS env vars)
- **Session enforcement:** NOT implemented (Ory integration deferred)
- **Commerce payment verification:** Implemented via STRIPE_WEBHOOK_SECRET_* env vars
- **Integration webhook signatures:** Not uniformly enforced

Gap: `/dashboard` and `/chat` lack session enforcement. Commerce and user `/api/*` routes lack uniform session validation. Admin authorization model needs Ory identity verification before env var checks.

---

## Public Marketing Routes — No Auth Required

### `/` (Homepage)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public marketing page |
| **Actual Current Guard** | None |
| **Guard Location** | N/A (public route) |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | 40/40 browser evidence pass; HTTP 200 verified |
| **Gap** | None |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `/docs` (Documentation Hub)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public documentation pages |
| **Actual Current Guard** | None |
| **Guard Location** | N/A (public route) |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | 40/40 browser evidence pass; HTTP 200 verified; no access control observed |
| **Gap** | None |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `/contact` (Contact Form)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public form submission page |
| **Actual Current Guard** | POST /api/contact: Zod validation, honeypot filtering, 6/minute IP rate limiting |
| **Guard Location** | src/app/api/contact/route.ts |
| **Identity Source** | Email field provided by user |
| **Authorization Check** | None (public form) |
| **Resource Ownership Check** | N/A (anonymous submission) |
| **CSRF/Webhook/Signature Protection** | Honeypot filter (line 98); IP-based rate limiting (line 104) |
| **Test Evidence** | 40/40 browser evidence pass; form renders; honeypot and rate limit implemented |
| **Gap** | None (controls implemented) |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `/privacy` (Privacy Policy)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public legal page |
| **Actual Current Guard** | None |
| **Guard Location** | N/A |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | 40/40 browser evidence pass; HTTP 200 verified |
| **Gap** | None |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `/terms` (Terms of Service)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public legal page |
| **Actual Current Guard** | None |
| **Guard Location** | N/A |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | 40/40 browser evidence pass; HTTP 200 verified |
| **Gap** | None |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

---

## Public Canonical Routes — Deployed as Marketing/Discovery Pages

These routes are listed in CANONICAL_ROUTES and intentionally deployed as public pages for discovery and education.

### `/memory` (Memory Tool)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public discovery/education page (canonical public route) |
| **Actual Current Guard** | None (public route; no session enforcement) |
| **Guard Location** | N/A (public route) |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Listed in CANONICAL_ROUTES; HTTP 200 verified; renders without auth |
| **Gap** | None (design is intentional) |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `/memory-qa` (Memory Q&A)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public discovery/education page (canonical public route) |
| **Actual Current Guard** | None (public route; no session enforcement) |
| **Guard Location** | N/A (public route) |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Listed in CANONICAL_ROUTES; HTTP 200 verified; renders without auth |
| **Gap** | None (design is intentional) |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `/workbench` (Workbench)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public discovery/education page (canonical public route) |
| **Actual Current Guard** | None (public route; no session enforcement) |
| **Guard Location** | N/A (public route) |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Listed in CANONICAL_ROUTES; HTTP 200 verified; renders without auth |
| **Gap** | None (design is intentional) |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

---

## Protected User Routes — Session Guard NOT Implemented

These routes are intended for authenticated users, but currently lack session enforcement.

### `/dashboard` (User Dashboard)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user dashboard (requires authentication) |
| **Actual Current Guard** | **NOT implemented** — route renders without session check |
| **Guard Location** | src/middleware.ts (no session enforcement); route handler does not validate session |
| **Identity Source** | Expected: Ory session (not enforced) |
| **Authorization Check** | None |
| **Resource Ownership Check** | None — route renders same content for all visitors |
| **CSRF/Webhook/Signature Protection** | N/A (no protected state mutations observed) |
| **Test Evidence** | HTTP 200 response without authentication; no redirect to /sign-in observed |
| **Gap** | **CRITICAL:** Route renders without session validation. Any visitor can access dashboard page without login. |
| **Risk** | **High** — Unauthenticated access to user-facing surface; no data isolation; no per-user resource control |
| **Recommended Next Packet** | PXF-018B: Implement Ory session enforcement; add session check in middleware and route handler |

### `/chat/[projectID]` (Chat Interface)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user chat interface (requires authentication + project ownership) |
| **Actual Current Guard** | **NOT implemented** — route renders without session check |
| **Guard Location** | src/middleware.ts (no session enforcement); route handler does not validate session or project ownership |
| **Identity Source** | Expected: Ory session + project authorization |
| **Authorization Check** | None |
| **Resource Ownership Check** | None — route accepts any [projectID] parameter |
| **CSRF/Webhook/Signature Protection** | N/A (no state mutations directly in route) |
| **Test Evidence** | HTTP 200 response without authentication; dynamic route parameter accepted without validation |
| **Gap** | **CRITICAL:** Route accepts [projectID] parameter without validation. No session or ownership check. Any visitor can attempt any project ID. |
| **Risk** | **Critical** — Unauthenticated access to per-project data surface; no authorization enforcement; potential data leakage if backend API is gated but UI is not |
| **Recommended Next Packet** | PXF-018B: Implement Ory session enforcement + project ownership validation |

### `/preferences` (User Preferences)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user settings (email preference mutations) |
| **Actual Current Guard** | POST /api/preferences: stored waitlist token validation required |
| **Guard Location** | src/app/api/preferences/route.ts (validates token from query/body) |
| **Identity Source** | Waitlist unsubscribe token (email-scoped) |
| **Authorization Check** | Token validation before mutation |
| **Resource Ownership Check** | Token scopes mutations to email address |
| **CSRF/Webhook/Signature Protection** | Token-based (replaces CSRF on mutations) |
| **Test Evidence** | Route validates token before processing preferences changes |
| **Gap** | None (token-gated) |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `/success` (Post-Purchase Confirmation)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Semi-protected — post-purchase redirect (may be public-facing via email link) |
| **Actual Current Guard** | None — route renders without session check |
| **Guard Location** | N/A |
| **Identity Source** | Email token verification expected (not observed) |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | None |
| **Test Evidence** | HTTP 200 response; no token validation observed |
| **Gap** | Route may leak purchase data if no token verification enforced |
| **Risk** | **Medium** — Email link may be shared or leaked |
| **Recommended Next Packet** | PXF-018C: Implement token-based access control for post-purchase pages |

### `/unsubscribe` (Email Unsubscribe)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Semi-protected — email unsubscribe (public link in emails) |
| **Actual Current Guard** | Token-based (expected) |
| **Guard Location** | Route handler (not verified) |
| **Identity Source** | Email token from unsubscribe link |
| **Authorization Check** | Token validation expected |
| **Resource Ownership Check** | Token scope validation |
| **CSRF/Webhook/Signature Protection** | Token replay risk unknown |
| **Test Evidence** | No token validation code observed in route |
| **Gap** | Token validation not verified; CSRF/replay protection unknown |
| **Risk** | **Medium** — Token replay or forgery risk |
| **Recommended Next Packet** | PXF-018C: Verify token validation and add rate limiting |

### `/waitlist` (Waitlist Signup)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public form (no auth required) |
| **Actual Current Guard** | POST /api/waitlist: Zod validation, honeypot filtering, 6/minute IP rate limiting |
| **Guard Location** | src/app/api/waitlist/route.ts |
| **Identity Source** | Email field provided by user |
| **Authorization Check** | None (public form) |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | Honeypot filter (line 147); IP-based rate limiting (line 154) |
| **Test Evidence** | HTTP 200; form renders; honeypot and rate limit implemented |
| **Gap** | None (controls implemented) |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

---

## Admin Routes — Authorization Enforced Via Environment Variables

### `/admin` (Admin Panel)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — admin access only |
| **Actual Current Guard** | ADMIN_EMAILS and ADMIN_USER_IDS env vars checked |
| **Guard Location** | src/lib/admin.ts (imported in middleware or route handler) |
| **Identity Source** | User email/ID (source not verified) |
| **Authorization Check** | String matching against ADMIN_EMAILS or ADMIN_USER_IDS |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A (data display only, presumably) |
| **Test Evidence** | Middleware check implemented; exact enforcement location unclear |
| **Gap** | Identity source not verified (who provides the user email/ID?). Env var check is not session-based. |
| **Risk** | **High** — If identity source is not verified (e.g., taken from user cookie or header without validation), authorization can be spoofed. Ory integration needed to verify identity before env var check. |
| **Recommended Next Packet** | PXF-018B: Verify identity source; ensure Ory session is validated before env var check |

### `/admin/licenses` (License Management)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — admin access only |
| **Actual Current Guard** | ADMIN_EMAILS and ADMIN_USER_IDS env vars (same as /admin) |
| **Guard Location** | src/lib/admin.ts |
| **Identity Source** | User email/ID (source not verified) |
| **Authorization Check** | String matching |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Same enforcement as /admin |
| **Gap** | Same as /admin |
| **Risk** | **High** |
| **Recommended Next Packet** | PXF-018B: Verify Ory integration |

### `/admin/waitlist` (Waitlist Admin)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — admin access only |
| **Actual Current Guard** | ADMIN_EMAILS and ADMIN_USER_IDS env vars |
| **Guard Location** | src/lib/admin.ts |
| **Identity Source** | User email/ID (source not verified) |
| **Authorization Check** | String matching |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Same enforcement as /admin |
| **Gap** | Same as /admin |
| **Risk** | **High** |
| **Recommended Next Packet** | PXF-018B: Verify Ory integration |

### `/admin/og` (OG Image Generation)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Admin utility (could be public or protected) |
| **Actual Current Guard** | Possibly optional; enforcement unknown |
| **Guard Location** | src/lib/admin.ts (unclear) |
| **Identity Source** | Unknown |
| **Authorization Check** | Unknown |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | No code review evidence |
| **Gap** | Enforcement not verified |
| **Risk** | **Medium** — If public, no risk; if admin-only, unknown if enforced |
| **Recommended Next Packet** | PXF-017C: Clarify intent and verify enforcement |

---

## Commerce APIs — Webhook + Session Guard

### `POST /api/webhook/stripe` (Stripe Webhooks)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — Stripe webhook receiver (webhook-signature-protected) |
| **Actual Current Guard** | STRIPE_WEBHOOK_SECRET_* env vars for HMAC signature validation |
| **Guard Location** | src/app/api/webhook/stripe/route.ts |
| **Identity Source** | Stripe webhook signature (cryptographic) |
| **Authorization Check** | HMAC signature verification via stripe.webhooks.constructEvent |
| **Resource Ownership Check** | N/A (webhook event processing) |
| **CSRF/Webhook/Signature Protection** | ✓ Stripe webhook signature required and verified |
| **Test Evidence** | stripe-signature header validated (line 14); invalid signatures rejected (line 32); stripe.webhooks.constructEvent verifies signature (line 28) |
| **Gap** | None |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `POST /api/subscription/*` (Subscription Management)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user subscription operations |
| **Actual Current Guard** | HTTP 501 Not Implemented (fail-closed) |
| **Guard Location** | src/app/api/subscription/route.ts |
| **Identity Source** | N/A (endpoint not implemented) |
| **Authorization Check** | N/A |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Route returns 501; no Prisma queries executed |
| **Gap** | None (fail-closed) |
| **Risk** | None |
| **Recommended Next Packet** | PXF-018B: Implement with Ory session validation + per-user authorization |

### `DELETE /api/subscription/*` (Subscription Cancellation)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user subscription cancellation |
| **Actual Current Guard** | HTTP 501 Not Implemented (fail-closed) |
| **Guard Location** | src/app/api/subscription/route.ts |
| **Identity Source** | N/A (endpoint not implemented) |
| **Authorization Check** | N/A |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Route returns 501 |
| **Gap** | None (fail-closed) |
| **Risk** | None |
| **Recommended Next Packet** | PXF-018B: Implement with Ory session validation + per-user authorization |

### `POST /api/store/*` (Store/Cart)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user cart/store operations (claims verified) |
| **Actual Current Guard** | `/api/store/*/claim` verifies paid Stripe checkout sessions before granting access |
| **Guard Location** | src/app/api/store/*/route.ts (Stripe entitlement verification) |
| **Identity Source** | Stripe checkout session (cryptographically verified) |
| **Authorization Check** | Checkout session must be marked paid |
| **Resource Ownership Check** | Customer email from verified checkout session |
| **CSRF/Webhook/Signature Protection** | Stripe session validation (equivalent to signature verification) |
| **Test Evidence** | Endpoints verify Stripe checkout state before granting claims |
| **Gap** | None (Stripe-gated) |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

---

## Integration APIs

### `POST /api/contact` (Contact Form)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public form submission |
| **Actual Current Guard** | Zod validation, honeypot filtering, 6/minute IP rate limiting |
| **Guard Location** | src/app/api/contact/route.ts |
| **Identity Source** | Email field from user |
| **Authorization Check** | None (public) |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | Honeypot (line 98); rate limit (line 104) |
| **Test Evidence** | Honeypot and rate limiting implemented |
| **Gap** | None |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `POST /api/mailerlite/*` (Email List)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public form (waitlist) or protected (admin) — unclear |
| **Actual Current Guard** | MAILERLITE_API_KEY env var for server-side calls |
| **Guard Location** | Route handler (server-side API call) |
| **Identity Source** | Email field from form |
| **Authorization Check** | None on client side |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | No CSRF token on form submission |
| **Test Evidence** | Env var configured; form enforcement unclear |
| **Gap** | No CSRF protection; no rate limiting on form |
| **Risk** | **Medium** — Form spam/abuse |
| **Recommended Next Packet** | PXF-018A |

### `POST /api/preferences/*` (User Preferences)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — email preferences (mutations require token) |
| **Actual Current Guard** | Stored waitlist token validation before mutation |
| **Guard Location** | src/app/api/preferences/route.ts |
| **Identity Source** | Unsubscribe token from waitlist signup |
| **Authorization Check** | Token must match stored token |
| **Resource Ownership Check** | Token scopes to email address |
| **CSRF/Webhook/Signature Protection** | Token-based (replaces CSRF) |
| **Test Evidence** | Route validates token before processing |
| **Gap** | None |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `POST /api/projects/*` (Project Management)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user project CRUD |
| **Actual Current Guard** | HTTP 501 Not Implemented (fail-closed) |
| **Guard Location** | src/app/api/projects/route.ts |
| **Identity Source** | N/A (endpoint not implemented) |
| **Authorization Check** | N/A |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Route returns 501 |
| **Gap** | None (fail-closed) |
| **Risk** | None |
| **Recommended Next Packet** | PXF-018B: Implement with Ory session validation + per-user authorization |

### `POST /api/webhook/stripe` (Stripe Webhook)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — Stripe webhook receiver (webhook-signature-protected) |
| **Actual Current Guard** | STRIPE_WEBHOOK_SECRET_* env vars for HMAC signature validation |
| **Guard Location** | src/app/api/webhook/stripe/route.ts (stripe.webhooks.constructEvent, line 28) |
| **Identity Source** | Stripe webhook signature (cryptographic) |
| **Authorization Check** | HMAC signature verification via stripe.webhooks.constructEvent |
| **Resource Ownership Check** | N/A (webhook event processing) |
| **CSRF/Webhook/Signature Protection** | ✓ Stripe webhook signature required and verified |
| **Test Evidence** | stripe-signature header validated (line 14); invalid signatures rejected (line 32) |
| **Gap** | None (signature verification implemented) |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `POST /api/social/*` (Social Automation)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — admin/internal automation |
| **Actual Current Guard** | SOCIAL_AUTOMATION_SECRET env var (expected) |
| **Guard Location** | Route handler (enforcement not verified) |
| **Identity Source** | Authorization header (assumed) |
| **Authorization Check** | String matching against SOCIAL_AUTOMATION_SECRET |
| **Resource Ownership Check** | N/A (automation endpoint) |
| **CSRF/Webhook/Signature Protection** | N/A (API only) |
| **Test Evidence** | Env var configured; enforcement not verified |
| **Gap** | Authorization enforcement not code-verified |
| **Risk** | **Medium** — If header validation missing, any caller can post to social media |
| **Recommended Next Packet** | PXF-018D: Verify secret validation in route handler |

### `GET /api/tenants/projects` (Project Enumeration)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — internal admin operations (authentication + tenant authorization required) |
| **Actual Current Guard** | HTTP 501 Not Implemented (fail-closed) |
| **Guard Location** | src/app/api/tenants/projects/route.ts |
| **Identity Source** | N/A (endpoint not implemented) |
| **Authorization Check** | N/A |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Route returns 501; Prisma not queried; no project data exposed |
| **Gap** | None (fail-closed; remediated in PXF-018A) |
| **Risk** | None |
| **Recommended Next Packet** | PXF-018B: Implement with Ory session validation + tenant authorization |

---

## Automation APIs

### `POST /api/(make)/*` (Make.com Integration)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — automation webhook |
| **Actual Current Guard** | MAKE_API_KEY env var (expected) |
| **Guard Location** | Route handler |
| **Identity Source** | API key (assumed) |
| **Authorization Check** | String matching |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A (API only) |
| **Test Evidence** | Env var configured; enforcement not verified |
| **Gap** | Enforcement not verified |
| **Risk** | **Medium** |
| **Recommended Next Packet** | PXF-018D |

### `POST /api/(n8n)/*` (n8n Integration)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — automation webhook |
| **Actual Current Guard** | N8N_API_KEY env var (expected) |
| **Guard Location** | Route handler |
| **Identity Source** | API key |
| **Authorization Check** | String matching |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Env var configured; enforcement not verified |
| **Gap** | Enforcement not verified |
| **Risk** | **Medium** |
| **Recommended Next Packet** | PXF-018D |

---

## Health & Versioning APIs (Always Active)

### `GET /api/health`
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public — health check |
| **Actual Current Guard** | None |
| **Guard Location** | N/A |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Returns HTTP 200; CI depends on this endpoint |
| **Gap** | None |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

### `GET /api/version`
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public — version metadata |
| **Actual Current Guard** | None |
| **Guard Location** | N/A |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Returns SHA, timestamp; CI deployment verification depends on this |
| **Gap** | None |
| **Risk** | None |
| **Recommended Next Packet** | No action required |

---

## Summary by Risk Level

### Critical Gaps (Immediate Action Needed)

- **Session enforcement missing:** `/dashboard`, `/chat` render without session validation (deferred Ory integration; noted as public feature pages for /memory, /memory-qa, /workbench)

### High-Risk Gaps (Near-term Action Needed)

- **Admin identity verification:** `/admin/*` checks env vars without verified identity source (Ory integration needed first)
- **Chat project access control:** `/chat/[projectID]` accepts any project ID without authorization

### Medium-Risk Gaps (Queue for Later)

- **Integration secret validation:** `/api/social`, `/api/(make)`, `/api/(n8n)` enforcement not verified
- **Email token security:** `/success` and `/unsubscribe` token validation not code-verified

### Resolved (No Further Action)

- ✓ Contact form and waitlist: Honeypot + 6/minute rate limiting implemented
- ✓ Preferences mutations: Token-gated validation implemented
- ✓ Store claims: Stripe checkout session verification implemented
- ✓ Stripe webhook signature: Implemented via stripe.webhooks.constructEvent
- ✓ Project enumeration: Fail-closed 501 response (PXF-018A)
- ✓ MailerLite credential exposure: Hardcoded fallback removed; now requires environment variables only (PXF-018A, external rotation pending)

---

## Recommended Next Packets

**PXF-018A — corrective security remediation (locally validated; release pending):**
- MailerLite now uses environment-only configuration and fails closed when required values are missing.
- Repository-owned secret-source policy and seven focused tests pass locally and are wired into Main CI before build.
- `/api/tenants/projects` remains fail closed with HTTP 501 and contains no Prisma import or query.
- Contact and Waitlist share one deterministic fixed-window limiter; four limiter tests pass.
- Twelve strict API security checks pass against the built standalone server.
- External MailerLite credential revocation and rotation remain pending owner verification.

**Next packet selection after PXF-018A release:**
- Do not begin broad Ory middleware work without an approved protected-product contract.
- Resolve the 22 owner decisions for historical, internal, product-variant, and API-consolidation surfaces.
- Select one bounded authorization or integration-secret packet only from exact runtime evidence and an explicit product decision.
- Clarify `/admin/og` protection intent and any genuinely active integration consumers; do not reintroduce the nonexistent generic `/api/webhook` item.

Contact and Waitlist already implement schema validation, honeypot filtering, and six-request fixed-window limiting. Stripe webhook signature verification and Preferences token validation are also implemented and now have strict regression evidence.

---

**Status:** Audit corrected through PXF-018A local implementation and deterministic evidence. Push, CI, deployment observation, and external credential rotation verification remain pending.
