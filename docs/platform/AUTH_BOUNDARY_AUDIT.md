# Authentication Boundary Audit — PXF-017B

**Created:** 2026-08-04  
**Scope:** All protected, admin, commerce, webhook, and internal routes  
**Source:** src/middleware.ts, src/lib/admin.ts, route handlers, server actions, tests  
**Status:** Evidence-based audit, implementation deferred  

## Executive Summary

Current authentication enforcement:

- **Maintenance redirects:** Implemented via src/middleware.ts (PROCHAT_MAINTENANCE_MODE)
- **Admin authorization:** Implemented via src/lib/admin.ts (ADMIN_EMAILS, ADMIN_USER_IDS env vars)
- **Session enforcement:** NOT implemented (Ory integration deferred)
- **Commerce payment verification:** Implemented via STRIPE_WEBHOOK_SECRET_* env vars
- **Integration webhook signatures:** Not uniformly enforced

Gap: `/memory`, `/memory-qa`, `/workbench` are public canonical routes without session guards. All `/api/*` commerce and user routes lack uniform session validation. Chat and dashboard routes lack verified authorization checks.

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
| **Actual Current Guard** | None (form submission routed to /api/contact) |
| **Guard Location** | Form client-side validation only |
| **Identity Source** | Email field provided by user |
| **Authorization Check** | None |
| **Resource Ownership Check** | N/A (anonymous submission) |
| **CSRF/Webhook/Signature Protection** | None observed (form submission to POST /api/contact) |
| **Test Evidence** | 40/40 browser evidence pass; form renders, no auth wall |
| **Gap** | No CSRF token observed; no rate limiting on POST /api/contact |
| **Risk** | Medium — form spam/abuse risk if no backend rate limiting |
| **Recommended Next Packet** | PXF-018A: Rate-limit contact form submissions |

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

## Public Canonical Routes — Currently Without Enforced Session Guard

These routes are listed in CANONICAL_ROUTES and deployed as public marketing pages, but carry product-feature names that suggest protection intent.

### `/memory` (Memory Tool)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Product feature page (canonical public route) |
| **Actual Current Guard** | None enforced by middleware |
| **Guard Location** | src/middleware.ts does not check sessions; route renders without auth |
| **Identity Source** | N/A (no auth enforcement) |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Listed in CANONICAL_ROUTES; HTTP 200 verified; no session requirement observed during CI test run |
| **Gap** | **CRITICAL:** Route is public without session enforcement. Navigation suggests product access, but no auth gate exists. Ory integration deferred. |
| **Risk** | **High** — Feature discovery/preview without session isolation; no per-user data separation if feature logic is added later |
| **Recommended Next Packet** | PXF-018B: Implement Ory session validation or clarify product boundary (public preview vs. protected tool) |

### `/memory-qa` (Memory Q&A)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Product feature page (canonical public route) |
| **Actual Current Guard** | None enforced by middleware |
| **Guard Location** | src/middleware.ts does not check sessions; route renders without auth |
| **Identity Source** | N/A (no auth enforcement) |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Listed in CANONICAL_ROUTES; HTTP 200 verified; no session requirement observed |
| **Gap** | **CRITICAL:** Route is public without session enforcement. Same as /memory. |
| **Risk** | **High** — Feature discovery/preview without session isolation |
| **Recommended Next Packet** | PXF-018B: Implement Ory session validation or clarify product boundary |

### `/workbench` (Workbench)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Product feature page (canonical public route) |
| **Actual Current Guard** | None enforced by middleware |
| **Guard Location** | src/middleware.ts does not check sessions; route renders without auth |
| **Identity Source** | N/A (no auth enforcement) |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | N/A |
| **Test Evidence** | Listed in CANONICAL_ROUTES; HTTP 200 verified; no session requirement observed |
| **Gap** | **CRITICAL:** Route is public without session enforcement. Same as /memory and /memory-qa. |
| **Risk** | **High** — Feature discovery/preview without session isolation |
| **Recommended Next Packet** | PXF-018B: Implement Ory session validation or clarify product boundary |

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
| **Public or Protected Intent** | Protected — user settings (requires authentication) |
| **Actual Current Guard** | **NOT implemented** — route renders without session check |
| **Guard Location** | src/middleware.ts (no session enforcement); route handler does not validate session |
| **Identity Source** | Expected: Ory session |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | None observed |
| **Test Evidence** | HTTP 200 response without authentication |
| **Gap** | **CRITICAL:** Route renders without session validation. Any visitor can access preferences page. |
| **Risk** | **High** — Unauthenticated access; no user data isolation |
| **Recommended Next Packet** | PXF-018B: Implement Ory session enforcement |

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
| **Actual Current Guard** | None |
| **Guard Location** | N/A (public route) |
| **Identity Source** | Email field provided by user |
| **Authorization Check** | None |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | None observed on POST /api/waitlist |
| **Test Evidence** | HTTP 200; form renders without auth |
| **Gap** | No CSRF token; no rate limiting on form submission |
| **Risk** | **Medium** — Form spam/abuse risk |
| **Recommended Next Packet** | PXF-018A: Add CSRF protection and rate limiting |

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

### `POST /api/stripe/*` (Stripe Webhooks)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — Stripe webhook receiver (public endpoint, but webhook-signature-protected) |
| **Actual Current Guard** | STRIPE_WEBHOOK_SECRET_* env vars for signature validation |
| **Guard Location** | API route handler (route signature validation expected) |
| **Identity Source** | Stripe webhook signature (cryptographic) |
| **Authorization Check** | HMAC signature verification |
| **Resource Ownership Check** | N/A (webhook event processing) |
| **CSRF/Webhook/Signature Protection** | ✓ Stripe webhook signature required |
| **Test Evidence** | Env vars configured in CI; handler implementation not verified |
| **Gap** | Route handler signature validation not code-verified |
| **Risk** | **High** — If signature validation is missing, any attacker can trigger payment events |
| **Recommended Next Packet** | PXF-018D: Verify HMAC signature validation in route handler |

### `POST /api/subscription/*` (Subscription Management)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user subscription operations |
| **Actual Current Guard** | **NOT fully implemented** — session validation expected but not enforced |
| **Guard Location** | Route handler (no session check observed) |
| **Identity Source** | Expected: Ory session |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | No CSRF token validation observed |
| **Test Evidence** | API route exists; enforcement not verified |
| **Gap** | **CRITICAL:** No session validation. No per-user authorization (any caller can mutate any subscription). No CSRF protection. |
| **Risk** | **Critical** — Unauthenticated users can cancel any subscription; CSRF attack risk |
| **Recommended Next Packet** | PXF-018B: Implement Ory session enforcement; add per-user authorization; add CSRF token validation |

### `DELETE /api/subscription/*` (Subscription Cancellation)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user subscription cancellation |
| **Actual Current Guard** | **NOT implemented** |
| **Guard Location** | Route handler |
| **Identity Source** | Expected: Ory session |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | None |
| **Test Evidence** | API route exists; enforcement not verified |
| **Gap** | **CRITICAL:** Same as POST /api/subscription/* |
| **Risk** | **Critical** |
| **Recommended Next Packet** | PXF-018B |

### `POST /api/store/*` (Store/Cart)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user cart/store operations |
| **Actual Current Guard** | **NOT fully implemented** |
| **Guard Location** | Route handler |
| **Identity Source** | Expected: Ory session |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | None |
| **Test Evidence** | API route exists; enforcement not verified |
| **Gap** | **CRITICAL:** No session validation. No per-user cart isolation. |
| **Risk** | **Critical** — Unauthenticated users can view/modify any cart |
| **Recommended Next Packet** | PXF-018B |

---

## Integration APIs

### `POST /api/contact` (Contact Form)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Public form submission |
| **Actual Current Guard** | None |
| **Guard Location** | N/A |
| **Identity Source** | N/A |
| **Authorization Check** | None |
| **Resource Ownership Check** | N/A |
| **CSRF/Webhook/Signature Protection** | No CSRF token observed |
| **Test Evidence** | Form routes to API without token |
| **Gap** | No CSRF protection; no rate limiting |
| **Risk** | **Medium** — Form spam/abuse |
| **Recommended Next Packet** | PXF-018A: Add CSRF + rate limiting |

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
| **Public or Protected Intent** | Protected — user settings |
| **Actual Current Guard** | **NOT implemented** |
| **Guard Location** | Route handler |
| **Identity Source** | Expected: Ory session |
| **Authorization Check** | None |
| **Resource Ownership Check** | None |
| **CSRF/Webhook/Signature Protection** | None |
| **Test Evidence** | API route exists; no enforcement observed |
| **Gap** | **CRITICAL:** No session; no per-user access control; no CSRF |
| **Risk** | **Critical** — Unauthenticated users can modify any user's preferences |
| **Recommended Next Packet** | PXF-018B |

### `POST /api/projects/*` (Project Management)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — user project CRUD |
| **Actual Current Guard** | **NOT fully implemented** |
| **Guard Location** | Route handler (unclear) |
| **Identity Source** | Expected: Ory session |
| **Authorization Check** | None verified |
| **Resource Ownership Check** | None verified |
| **CSRF/Webhook/Signature Protection** | None |
| **Test Evidence** | API route exists; enforcement not verified |
| **Gap** | **CRITICAL:** No session; no ownership check; no CSRF |
| **Risk** | **Critical** — Unauthenticated users can create/delete any project; CSRF risk |
| **Recommended Next Packet** | PXF-018B |

### `POST /api/webhook/*` (Generic Webhook)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected/public — depends on consumer (unknown) |
| **Actual Current Guard** | Unknown |
| **Guard Location** | Unknown |
| **Identity Source** | Unknown |
| **Authorization Check** | Unknown |
| **Resource Ownership Check** | Unknown |
| **CSRF/Webhook/Signature Protection** | Unknown |
| **Test Evidence** | No code review; consumer not documented |
| **Gap** | **CRITICAL:** No visibility into what this endpoint does or who can call it |
| **Risk** | **Unknown** — Depends on implementation |
| **Recommended Next Packet** | PXF-017C: Clarify webhook purpose, consumer, and auth model |

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

### `POST /api/tenants/*` (Multi-Tenant Operations)
| Property | Value |
|----------|-------|
| **Public or Protected Intent** | Protected — admin/system operations |
| **Actual Current Guard** | Unknown (internal API) |
| **Guard Location** | Unknown |
| **Identity Source** | Unknown |
| **Authorization Check** | Unknown |
| **Resource Ownership Check** | Unknown |
| **CSRF/Webhook/Signature Protection** | Unknown |
| **Test Evidence** | No visibility |
| **Gap** | **CRITICAL:** No documentation or enforcement verification |
| **Risk** | **High** — Could allow unauthorized multi-tenant data mutations |
| **Recommended Next Packet** | PXF-017C: Document purpose, consumer, and auth model |

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

- **Session enforcement missing:** `/memory`, `/memory-qa`, `/workbench`, `/dashboard`, `/chat`, `/preferences` render without session validation
- **Per-user authorization missing:** `/api/subscription/*`, `/api/store/*`, `/api/preferences`, `/api/projects` lack ownership checks
- **CSRF protection missing:** Contact form, waitlist, commerce APIs
- **Unknown webhook consumer:** `/api/webhook` purpose and auth model unknown
- **Webhook signature validation unverified:** `/api/stripe` implementation not verified

### High-Risk Gaps (Near-term Action Needed)

- **Admin identity verification:** `/admin/*` checks env vars without verified identity source (Ory integration needed first)
- **Chat project access control:** `/chat/[projectID]` accepts any project ID without authorization
- **Email token validation:** `/success` and `/unsubscribe` may lack token verification

### Medium-Risk Gaps (Queue for Later)

- **Form spam/abuse:** Contact form and waitlist lack rate limiting
- **Integration secret validation:** `/api/social`, `/api/(make)`, `/api/(n8n)` enforcement not verified
- **Unknown internal APIs:** `/api/tenants` purpose and auth unclear

---

## Recommended Next Packets

**PXF-018A:** Form security hardening
- Add CSRF tokens to contact form and waitlist
- Implement rate limiting on form submissions
- Add honeypot fields

**PXF-018B:** Session and per-user authorization
- Implement Ory session validation in middleware
- Add session checks to protected routes
- Add per-user authorization checks to commerce APIs
- Add CSRF token validation to state-mutating endpoints

**PXF-018C:** Email token security
- Verify token validation on `/success` and `/unsubscribe`
- Add rate limiting and replay protection
- Document token format and lifecycle

**PXF-018D:** Webhook and API secret verification
- Code review `/api/stripe` webhook signature validation
- Code review `/api/social`, `/api/(make)`, `/api/(n8n)` secret validation
- Implement uniform secret validation pattern

**PXF-017C:** Unknown surface clarification (inventory)
- Document `/api/webhook` purpose and consumer
- Document `/api/tenants` purpose and auth model
- Clarify `/admin/og` protection intent

---

**Status:** Audit complete. No implementation performed. All findings documented for PXF-018 series work packets.
