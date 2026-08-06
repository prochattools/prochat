# Legacy Owner Decision Brief — Phase 11 Pending Items

**Created:** 2026-08-06  
**Status:** 17 substantive decisions pending; 5 items verified absent (NOT APPLICABLE)  
**Scope:** Summary of routes, consumers, risks, and options requiring explicit owner classification

This brief condenses the 17 substantive items from `LEGACY_OWNER_DECISIONS.md` for executive review and decision-making.

---

## Historical Marketing Routes (8 substantive items)

### 1. `/blog/[slug]` — Blog hub with indexed external links
- **Path:** Historical blog infrastructure; renders; indexed by search; no nav link in canonical chrome
- **Consumers:** Search crawlers, external backlinks, possibly email campaigns
- **SEO Risk:** HIGH — indexed content and external links; removal would break inbound traffic
- **Recommended default:** Consolidate into `/docs` with 301 redirects
- **Consequence of retain:** Maintain separate blog surface; additional CSS/layout/hosting cost
- **Consequence of retire:** 301-redirect all indexed posts to `/docs` or archive; update search console
- **Owner decision:** PENDING

### 2. `/book` — Unclear book reference
- **Path:** Route exists; unclear purpose; no nav link
- **Consumers:** Possibly external links (unverified)
- **SEO Risk:** LOW — no clear evidence of indexing or external links
- **Recommended default:** Redirect to `/docs`
- **Consequence of retain:** Keep unlinked route with unclear purpose
- **Consequence of retire:** 302 redirect to `/docs`; monitor error logs for inbound traffic
- **Owner decision:** PENDING

### 3. `/brainbridge` — Early product variant (legacy naming)
- **Path:** Historical product-naming variant (Brainbridge = early ProChat?)
- **Consumers:** Possibly external early-marketing links (unverified)
- **SEO Risk:** MEDIUM — historical name may be externally referenced
- **Recommended default:** Redirect to current product interface
- **Consequence of retain:** Keep historical brand variant accessible
- **Consequence of retire:** 301-redirect to `/memory` or `/workbench` depending on context
- **Owner decision:** PENDING

### 5. `/learn/*` — Learning hub with overlapping `/guides`, `/playbooks`, `/prompts`
- **Path:** Learning hub structure exists; overlaps with other learning routes (verified-absent)
- **Consumers:** Possibly email campaigns or onboarding flows (unverified)
- **SEO Risk:** LOW to MEDIUM — unclear if indexed or externally referenced
- **Recommended default:** Consolidate learning routes into `/docs`
- **Consequence of retain:** Maintain separate learning surface; additional nav complexity
- **Consequence of retire:** Move content to `/docs`; maintain `/learn` → `/docs` redirects
- **Owner decision:** PENDING

### 7. `/prompts/[category]/[slug]` — Prompt library with indexed external links
- **Path:** Prompt library; routes render; indexed by search engines; possible API consumers
- **Consumers:** Search crawlers, external prompt-library links, possibly API consumers
- **SEO Risk:** HIGH — indexed content; developer community may reference specific prompts
- **Recommended default:** Keep as independent library or consolidate with 301 redirects
- **Consequence of retain:** Maintain searchable prompt hub; additional CSS/hosting; SEO duplication if also in `/docs`
- **Consequence of retire:** 301-redirect to consolidated `/docs/prompts` or similar; audit external links
- **Owner decision:** PENDING

### 8. `/proof` — Case study/proof hub
- **Path:** Case study hub; renders; not in canonical nav
- **Consumers:** Possibly external case-study links (unverified)
- **SEO Risk:** LOW to MEDIUM — unclear evidence of external links
- **Recommended default:** Redirect to `/docs` or maintain as separate proof page
- **Consequence of retain:** Keep case studies independent; separate nav and SEO
- **Consequence of retire:** Move case content to `/docs`; maintain `/proof` → `/docs` redirects
- **Owner decision:** PENDING

### 10. `/starting-point/*` — Onboarding flow
- **Path:** Onboarding flow; renders; purpose unclear; not in canonical nav
- **Consumers:** Possibly email onboarding links (unverified); unclear if active
- **SEO Risk:** LOW — unclear if indexed or externally referenced
- **Recommended default:** Consolidate into canonical product routes
- **Consequence of retain:** Maintain separate onboarding entry point; additional route handling
- **Consequence of retire:** Map onboarding flows to `/memory`, `/memory-qa`, or `/workbench`; maintain redirects
- **Owner decision:** PENDING

### 11. `/waas/accountants` — WaaS product variant (specific audience landing page)
- **Path:** WaaS product variant; specific audience; not in canonical nav
- **Consumers:** Possibly external WaaS marketing links (unverified)
- **SEO Risk:** LOW to MEDIUM — product-specific landing page
- **Recommended default:** Keep or consolidate under unified product strategy
- **Consequence of retain:** Maintain separate WaaS landing; audience-specific variant
- **Consequence of retire:** Consolidate under main product routing or product page; maintain redirects
- **Owner decision:** PENDING

---

## Internal System Routes (6 substantive items)

### 13. `/ai-workflows/*` — AI flow orchestration
- **Path:** Internal AI system; routes exist; scope and consumer unknown
- **Consumers:** Unknown internal systems
- **SEO Risk:** NONE (internal-only)
- **Recommended default:** Clarify purpose and consumer before deciding
- **Consequence of retain:** Keep orchestration routes accessible to internal systems
- **Consequence of retire:** Migrate internal consumers to different API; remove routes
- **Owner decision:** PENDING (clarification needed first)

### 14. `/debug/*` — Development/debugging utilities
- **Path:** Development utilities; routes render in production; dangerous if exposed
- **Consumers:** Development only (should not be in production)
- **SEO Risk:** NONE (should not be indexed)
- **Recommended default:** Gate behind development environment flag or remove from production
- **Consequence of retain:** Debug routes remain accessible in production; security/info disclosure risk
- **Consequence of retire:** Gate behind `NODE_ENV=development` or build-time exclusion
- **Owner decision:** PENDING

### 15. `/debug/analytics` — Analytics debugging tool
- **Path:** Analytics debug tool; separate from `/debug`; potentially exposes tracking data
- **Consumers:** Development only
- **SEO Risk:** NONE (internal)
- **Recommended default:** Gate behind development environment or remove from production
- **Consequence of retain:** Analytics debug tool accessible in production; info disclosure risk
- **Consequence of retire:** Gate behind development flag; update CI to exclude from production build
- **Owner decision:** PENDING

### 16. `/legal-ai-workflows` — Legal document generation for AI workflows
- **Path:** Legal doc generation; scope unclear; purpose unknown
- **Consumers:** Unknown internal systems
- **SEO Risk:** NONE (internal)
- **Recommended default:** Clarify before deciding
- **Consequence of retain:** Keep legal-doc-generation route available to internal systems
- **Consequence of retire:** Migrate internal consumers; remove routes
- **Owner decision:** PENDING (clarification needed first)

### 17. `/processing-page` — Async processing status display
- **Path:** Processing display; renders; used by workflows (unclear which workflows)
- **Consumers:** Unknown workflows (not documented)
- **SEO Risk:** NONE (internal)
- **Recommended default:** Clarify consumer workflows and auth model
- **Consequence of retain:** Keep processing status page accessible to workflows
- **Consequence of retire:** Map workflows to alternative status display mechanism; remove routes
- **Owner decision:** PENDING (clarification needed first)

### 18. `/social` — Social media integration handler
- **Path:** Social integration; routes exist; consumer and scope unknown
- **Consumers:** Unknown internal systems
- **SEO Risk:** NONE (internal)
- **Recommended default:** Clarify before deciding
- **Consequence of retain:** Keep social-integration routes available to internal systems
- **Consequence of retire:** Migrate internal consumers; remove routes
- **Owner decision:** PENDING (clarification needed first)

---

## Internal/System Cleanup Routes (3 substantive items with path implications)

### 19. `/systems/events` — Event system (likely unused)
- **Path:** Event kernel subsystem; grep search found zero current references
- **Consumers:** None found
- **SEO Risk:** NONE (internal)
- **Recommended default:** Delete (zero verified consumers)
- **Consequence of retain:** Keep skeleton for future event handling; zero current cost
- **Consequence of retire:** Delete routes and supporting code; confirm no missing consumers
- **Owner decision:** PENDING

### 20. `/systems/prochat-os` — OS/kernel subsystem (likely unused)
- **Path:** OS subsystem; grep search found zero current references
- **Consumers:** None found
- **SEO Risk:** NONE (internal)
- **Recommended default:** Delete (zero verified consumers)
- **Consequence of retain:** Keep skeleton for future system architecture; zero current cost
- **Consequence of retire:** Delete routes and supporting code; confirm no missing consumers
- **Owner decision:** PENDING

### 22. `/api/waiting-list` vs `/api/waitlist` — API endpoint aliasing
- **Path:** `/api/waiting-list` re-exports `/api/waitlist` POST (exact alias); both return identical response
- **Consumers:** Legacy form endpoints; possibly external API integrations
- **SEO Risk:** N/A (APIs)
- **Recommended default:** Keep both as zero-cost backward-compatibility aliases
- **Consequence of retain:** Both endpoints work; minimal code cost (one re-export)
- **Consequence of retire:** Deprecate `/api/waiting-list`; audit external consumers; implement 301 or sunset
- **Owner decision:** PENDING

---

## Decision Summary

| Item | Route | Category | Status |
|---|---|---|---|
| 1 | `/blog/[slug]` | Marketing | PENDING |
| 2 | `/book` | Marketing | PENDING |
| 3 | `/brainbridge` | Marketing | PENDING |
| 4 | `/guides/[topic]/[slug]` | Marketing | NOT APPLICABLE |
| 5 | `/learn/*` | Marketing | PENDING |
| 6 | `/playbooks/[segment]/[slug]` | Marketing | NOT APPLICABLE |
| 7 | `/prompts/[category]/[slug]` | Marketing | PENDING |
| 8 | `/proof` | Marketing | PENDING |
| 9 | `/snippets/[stack]/[slug]` | Marketing | NOT APPLICABLE |
| 10 | `/starting-point/*` | Marketing | PENDING |
| 11 | `/waas/accountants` | Marketing | PENDING |
| 12 | `/glossary/[term]` | Marketing | NOT APPLICABLE |
| 13 | `/ai-workflows/*` | Internal | PENDING |
| 14 | `/debug/*` | Internal | PENDING |
| 15 | `/debug/analytics` | Internal | PENDING |
| 16 | `/legal-ai-workflows` | Internal | PENDING |
| 17 | `/processing-page` | Internal | PENDING |
| 18 | `/social` | Internal | PENDING |
| 19 | `/systems/events` | Internal | PENDING |
| 20 | `/systems/prochat-os` | Internal | PENDING |
| 21 | `/bb` | Product | NOT APPLICABLE |
| 22 | `/api/waiting-list` | API | PENDING |

---

## Recommended Next Owner Decision

**Single highest-priority decision:** `/blog/[slug]` consolidation or archival  
**Reason:** HIGH external-link risk; search-engine consequences; affects Phase 11 scope  
**Required evidence:** External backlink audit; search console examination; email campaign audit  
**Recommended outcome:** Decide consolidation path and 301 redirect strategy before Phase 11 cleanup

---

**Status:** 17 decisions pending owner review and classification. 5 items verified absent (NO ACTION REQUIRED).
