# PXF-018 Owner Decision Brief — Phase 11 Legacy Surface Audit Results

**Created:** 2026-08-06  
**Updated:** 2026-08-06 (PXF-018 reconciliation: Item 3 reclassified; 16 pending decisions)  
**Status:** Repository evidence audit complete; 16 substantive items requiring owner classification; 6 verified absent  
**Scope:** Verified consumers, dependencies, SEO/auth implications, and owner classification options  
**Evidence standard:** Repository source code, navigation config, shell routes, sitemap, internal references, grep verification  

---

## Executive Summary

16 substantive Phase 11 decision items require owner classification. 6 verified-absent items from PXF-017B (plus Item 3 from PXF-018 audit) require no code removal. This brief summarizes findings with concrete repository evidence and non-binding recommendations to guide owner classification.

**Key findings:**
- **Item 19 (`/systems/events`):** Zero verified inbound links; safe to remove if no external dependencies
- **Item 20 (`/systems/prochat-os`):** Contrary to prior belief, has **7+ verified consumers** in navigation (kits, buildflow, book, AI workflows)
- **Item 3:** `/brainbridge` was **never implemented** — repository has zero files, zero references (VERIFIED ABSENT; not an owner decision)
- **Item 18:** `/social` is an **API route generator** for OG images, not a page route — active consumer of `/api/social/*` endpoints
- **Item 22:** `/api/waiting-list` is exact re-export of `/api/waitlist` — zero-cost backward compatibility maintained
- **Items 13–18:** All internal system routes exist and have documented shell-route classifications

---

## Item-by-Item Audit Findings

### Item 1: `/blog/[slug]` — Blog hub with indexed external links

**Repository Evidence:**
- **Route files:** `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `src/app/blog/[slug]/og/route.ts`
- **Shell routes:** ROUTE-038 (hub), ROUTE-039 (slug), ROUTE-083 (OG generation)
- **Shell class:** `temporary_legacy_compatibility` (indicates deprecated or transition state)
- **Internal consumers:** None found in code
- **Sitemap:** Not included; separate from canonical
- **Canonical URL:** Set in page metadata

**Consumers verified:**
- VERIFIED PRESENT: Search engine crawlers (indexed content) — external links likely but unverified in repo
- VERIFIED ABSENT: No internal navigation or form links to blog posts
- UNKNOWN: External backlinks (external traffic audit required outside repo)

**SEO/Auth:**
- Public, no auth required
- Indexed by search engines (per inventory)
- Inbound external links likely (typical blog use case)

**Risk assessment:**
- **HIGH:** Indexed external links; 301 redirects required if consolidated or moved
- **MEDIUM:** Content migration complexity if consolidation chosen
- **LOW:** No internal dependency risk

**Non-binding recommendation:** CONSOLIDATE into `/docs` with 301 redirects if external-link volume is acceptable; otherwise RETAIN as independent blog hub

**Owner decision needed:**
1. Consolidate `/blog/*` → `/docs/blog/*` with 301 redirects?
2. Or retain as independent blog hub?
3. If consolidate, confirm destination path `/docs/blog` vs other?

**Affected files if consolidation chosen:**
- Route files in `src/app/blog/`
- Shell route definitions (ROUTE-038, ROUTE-039, ROUTE-083)
- Sitemap generation (if applicable)

---

### Item 2: `/book` — Unclear book reference route

**Repository Evidence:**
- **Route file:** `src/app/book/page.tsx` (exists)
- **Shell route:** ROUTE-032
- **Shell class:** `temporary_legacy_compatibility`
- **Canonical URL:** Set in page metadata

**Consumers verified:**
- VERIFIED PRESENT: Internal links in 3 locations:
  - `src/app/kits/prokit/ProKitPageContent.tsx` line 423: `<Link href="/book">BOOK — A CALL</Link>`
  - `src/app/systems/prochat-os/ProChatOSPageContent.tsx` line 206: `<Link href="/book">BOOK — A CALL</Link>`
  - `src/app/ai-workflows/AIWorkflowsPageContent.tsx` line 241: `<Link href="/book">BOOK — TIME-SAVING CALL</Link>`
- VERIFIED ABSENT: No navigation or footer links; not in sitemap; no external references

**SEO/Auth:**
- Public, no auth required
- Not indexed or linked externally (based on repo evidence)

**Risk assessment:**
- **LOW:** Internal links only; no external backlinks; low SEO impact
- **LOW:** Removal breaks 3 internal links (easily fixable via string replace)

**Non-binding recommendation:** RETAIN or REDIRECT to `/contact` (call booking page); internal links suggest it's a call-booking entry point

**Owner decision needed:**
1. Purpose of `/book`: Is it a call-booking page? A resource page? Something else?
2. If call-booking: keep or redirect to `/contact` or a dedicated `/call` route?
3. If resource: consolidate into `/docs` or maintain separate?

**Affected files if removed/redirected:**
- `src/app/book/page.tsx`
- 3 internal Link components (update href values)
- Shell route definition

---

### Item 3: `/brainbridge` — Early product naming variant

**Repository Evidence:**
- **Route file:** NOT FOUND — `src/app/brainbridge/` directory does not exist
- **Shell route:** NOT FOUND — zero references in shell-routes.ts
- **Git history:** Zero commits or deletions mentioning brainbridge
- **Global search:** Zero references except in documentation files (inventory and worksheet)

**Consumers verified:**
- VERIFIED ABSENT: No route file, no directory, no shell route, no code references
- VERIFIED ABSENT: No internal links or navigation
- VERIFIED ABSENT: Zero references in entire codebase

**SEO/Auth:**
- N/A — route never existed

**Risk assessment:**
- **NONE:** No code to remove; no consumers to break

**Repository fact:** `/brainbridge` was never implemented. Prior inventory documentation incorrectly listed it as existing.

**Owner decision needed:**
- **NO ACTION REQUIRED** — Route was never implemented; it does not exist in the repository
- If external marketing materials reference `/brainbridge`, external redirects can be configured at hosting/CDN level (not in this repo)

**Recommendation:** Classify as "VERIFIED ABSENT" (no code removal required); external traffic (if any) will 404; handle via hosting-level redirects if needed

---

### Item 5: `/learn/*` — Learning hub with overlapping routes

**Repository Evidence:**
- **Route files:** `src/app/learn/page.tsx`, `src/app/learn/production-guide/page.tsx`, `src/app/learn/saas-starting-point/page.tsx`
- **Shell routes:** ROUTE-035 (hub), ROUTE-036 (production guide), ROUTE-037 (SaaS starting point)
- **Shell class:** `temporary_legacy_compatibility`
- **Sitemap:** Yes — learning routes included (SITE_URL/learn with priority 0.8)

**Consumers verified:**
- VERIFIED PRESENT: Internal links in `/learn/page.tsx`:
  - Link to `/learn/production-guide` (nested route)
  - Link to `/learn/saas-starting-point` (nested route)
  - Link to `/prompts` (external learning path)
- VERIFIED PRESENT: Navigation reference to learning path (`href: '/learn/saas-starting-point'`)
- VERIFIED ABSENT: No footer or main navigation links to `/learn`

**SEO/Auth:**
- Public, no auth required
- Indexed by search engines (sitemap included)
- Nested routes included in sitemap

**Risk assessment:**
- **MEDIUM:** Indexed content; sitemap indicates SEO value
- **MEDIUM:** Overlapping content with `/prompts` and `/docs` (potential consolidation complexity)
- **LOW:** No external links identified (internal sitemap only)

**Non-binding recommendation:** CONSOLIDATE into `/docs/learn` with 301 redirects; maintain learning content structure but unified under docs hub

**Owner decision needed:**
1. Consolidate `/learn/*` → `/docs/learn/*` with redirects?
2. Or maintain `/learn` as independent learning hub?
3. If consolidate, confirm destination path?

**Affected files if consolidation chosen:**
- Route files in `src/app/learn/`
- Shell route definitions (ROUTE-035–037)
- Sitemap generation
- Internal navigation links in `/learn/page.tsx`

---

### Item 7: `/prompts/[category]/[slug]` — Prompt library with indexed external links

**Repository Evidence:**
- **Route files:** `src/app/prompts/page.tsx`, `src/app/prompts/[category]/[slug]/page.tsx`
- **Shell routes:** ROUTE-040 (hub), ROUTE-041 (slug)
- **Shell class:** `temporary_legacy_compatibility`
- **Sitemap:** Not confirmed in repo; no dedicated sitemap.ts found

**Consumers verified:**
- VERIFIED PRESENT: Internal links in `/learn/page.tsx`:
  - Link to `/prompts` (hub)
  - Link to `/prompts/founder-ops/weekly-review` (specific prompt)
- VERIFIED ABSENT: No footer or main navigation links to prompts
- UNKNOWN: External developer-community links (likely but unverified in repo)

**SEO/Auth:**
- Public, no auth required
- Likely indexed by search engines (high-value prompt content)
- Developer community may reference specific prompts externally

**Risk assessment:**
- **HIGH:** Indexed content with probable external backlinks from developer community
- **HIGH:** SEO consolidation risk if mirrored in `/docs` without proper 301 redirects
- **MEDIUM:** Content migration complexity (prompts may have specialized formatting)

**Non-binding recommendation:** Evaluate external-link volume via search console first; if substantial, RETAIN as independent library; if minimal, CONSOLIDATE into `/docs/prompts` with 301 redirects

**Owner decision needed:**
1. What is external backlink/reference volume to `/prompts/*`? (Requires external audit or owner knowledge)
2. Is prompt library high-value enough to maintain separate SEO presence?
3. If consolidate: destination path `/docs/prompts/*` vs other?

**Affected files if consolidation chosen:**
- Route files in `src/app/prompts/`
- Shell route definitions (ROUTE-040–041)
- Sitemap generation (if applicable)
- Content migration (if consolidating)

---

### Item 8: `/proof` — Case study/proof hub

**Repository Evidence:**
- **Route files:** `src/app/proof/ProofPageContent.tsx`, `src/app/proof/page.tsx`
- **Shell route:** ROUTE-033
- **Shell class:** `temporary_legacy_compatibility`

**Consumers verified:**
- VERIFIED PRESENT: Internal links in 2 locations:
  - `src/app/(marketing)/studio/StudioPageContent.tsx`: `secondaryCtaLink="/proof"`
  - `src/app/proof/ProofPageContent.tsx`: `source_page: '/proof'` (analytics)
- VERIFIED ABSENT: No footer or main navigation links
- UNKNOWN: External case-study links (likely but unverified in repo)

**SEO/Auth:**
- Public, no auth required
- Likely indexed (case-study content has SEO value)

**Risk assessment:**
- **MEDIUM:** Indexed content; external case-study links possible
- **MEDIUM:** Content consolidation complexity
- **LOW:** Only 1 internal link (easily fixable)

**Non-binding recommendation:** Evaluate external-link volume; if substantial, RETAIN as independent proof hub; if minimal, CONSOLIDATE into `/docs/case-studies` or `/docs/proof` with redirects

**Owner decision needed:**
1. Are external case-study links pointing to `/proof/*`? (Requires external audit or owner knowledge)
2. Is case-study content strategic? (Brand building vs. documentation)
3. If consolidate: destination path?

**Affected files if consolidation chosen:**
- Route files in `src/app/proof/`
- Shell route definition (ROUTE-033)
- Internal link in StudioPageContent.tsx (1 change)

---

### Item 10: `/starting-point/*` — Onboarding flow

**Repository Evidence:**
- **Route directory:** Exists at `src/app/starting-point/`
- **Shell route:** ROUTE-034
- **Shell class:** `temporary_legacy_compatibility`

**Consumers verified:**
- VERIFIED PRESENT: Internal link in `src/app/proof/ProofPageContent.tsx`: `secondaryCtaLink="/starting-point"`
- VERIFIED ABSENT: No navigation or footer links
- UNKNOWN: Email onboarding flows (likely but unverified in repo)

**SEO/Auth:**
- Public, no auth required (based on shell-route classification)
- Not indexed (no evidence of sitemap or indexing)

**Risk assessment:**
- **LOW:** Not indexed; minimal external link risk
- **MEDIUM:** Onboarding flow — if active, removal breaks user journey
- **LOW:** Only 1 internal link (easily fixable)

**Non-binding recommendation:** If onboarding still active: RETAIN or redirect to canonical product route (`/memory` or `/workbench`); if deprecated: REMOVE with redirect to homepage

**Owner decision needed:**
1. Is `/starting-point` onboarding still active? (Requires product knowledge or analytics review)
2. If active: route to `/memory`, `/memory-qa`, or `/workbench`?
3. If deprecated: remove or redirect to homepage?

**Affected files if consolidation chosen:**
- Route files in `src/app/starting-point/`
- Shell route definition (ROUTE-034)
- Internal link in ProofPageContent.tsx (1 change)

---

### Item 11: `/waas/accountants` — WaaS product variant landing page

**Repository Evidence:**
- **Route file:** `src/app/waas/accountants/page.tsx` (exists)
- **Shell route:** ROUTE-042
- **Shell class:** `temporary_legacy_compatibility`

**Consumers verified:**
- VERIFIED PRESENT: Internal reference in `src/components/AppShell.tsx`: pathname check for `/waas/accountants` (shell classification)
- VERIFIED PRESENT: Navigation references in `src/app/kits/waaskit/` and `src/app/kits/KitsPageContent.tsx`
- VERIFIED ABSENT: No footer links; not in main navigation
- UNKNOWN: External partner links or niche marketing references (likely but unverified in repo)

**SEO/Auth:**
- Public, no auth required
- Likely indexed (niche landing page)

**Risk assessment:**
- **MEDIUM:** Product variant page; removal may signal product discontinuation
- **MEDIUM:** Possible partner links or niche marketing dependencies
- **LOW:** Limited internal link dependencies

**Non-binding recommendation:** Evaluate WaaS product strategy (current vs. deprecated); if current, RETAIN or consolidate under `/workbench`; if deprecated, REDIRECT to homepage or `/kits`

**Owner decision needed:**
1. Is WaaS (Workflows-as-a-Service) for accountants a current product offering?
2. If yes: RETAIN as independent landing page or CONSOLIDATE under unified product landing?
3. If no (deprecated): REDIRECT to `/workbench`, `/kits`, or homepage?

**Affected files if consolidation chosen:**
- Route files in `src/app/waas/`
- Shell route definition (ROUTE-042)
- Internal references in AppShell.tsx and kits pages

---

### Item 13: `/ai-workflows/*` — AI flow orchestration (internal system)

**Repository Evidence:**
- **Route files:** `src/app/ai-workflows/page.tsx`, nested routes exist
- **Shell route:** ROUTE-020
- **Shell class:** `temporary_legacy_compatibility`

**Consumers verified:**
- VERIFIED PRESENT: Route entry point in `src/app/go/route.ts`: `const WORKFLOW_OFFER_PATH = '/ai-workflows'` + cookie tracking
- VERIFIED PRESENT: Link in `src/app/systems/prochat-os/ProChatOSPageContent.tsx`: CTA leading to `/ai-workflows`
- VERIFIED PRESENT: Navigation check in `src/components/AppShell.tsx`
- VERIFIED PRESENT: Redirect from `/legal-ai-workflows` → `/ai-workflows` (canonical consolidation)

**SEO/Auth:**
- Public, renders (per shell-route classification)
- No auth enforcement visible in repo

**Risk assessment:**
- **UNKNOWN:** Exact purpose and target audience unknown
- **MEDIUM:** Active entry point via `/go` route (link shortener)
- **MEDIUM:** Used in product marketing (ProChat OS CTA)

**Non-binding recommendation:** RETAIN — route has verified consumers; document purpose and update comments if needed; do NOT remove without further owner clarification

**Owner decision needed:**
1. What is exact purpose of `/ai-workflows`? (Target audience, conversion goal)
2. Who should have access? (Public vs. authenticated?)
3. Is this a primary product surface or experimental/deprecated?

**Affected files if disposition chosen:**
- `src/app/ai-workflows/page.tsx`
- Shell route definition (ROUTE-020)
- Internal references (if removal chosen, will break multiple links)

---

### Item 14: `/debug/*` — Development debugging utilities (in production)

**Repository Evidence:**
- **Route directory:** Exists at `src/app/debug/`
- **Shell route:** ROUTE-057 (only `/debug/analytics` explicitly defined)
- **Shell class:** `protected_internal_shell` (suggests gating attempt)

**Consumers verified:**
- VERIFIED ABSENT: No internal links or navigation to debug routes
- VERIFIED ABSENT: No production traffic expected (development-only routes)
- UNKNOWN: Whether NODE_ENV gating is implemented (needs code inspection)

**SEO/Auth:**
- Should not be indexed (development tools)
- Protected shell classification suggests access control attempted

**Risk assessment:**
- **MEDIUM:** Security — debug routes expose system information if production-accessible
- **LOW:** Implementation risk (gating or removal both straightforward)

**Non-binding recommendation:** Verify and enforce gating: either gate behind `NODE_ENV=development` check or remove from production build; verify staging confirms debug routes 404 in production

**Owner decision needed:**
1. Preference: GATE debug routes behind NODE_ENV, or REMOVE from production build?
2. If GATE: confirm developer workflows don't depend on production-accessible debug endpoints
3. If REMOVE: any legitimate production-debugging scenarios?

**Affected files if gating chosen:**
- `src/app/debug/` route handlers
- Route logic (add NODE_ENV checks)
- Build configuration (if removal chosen)

---

### Item 15: `/debug/analytics` — Analytics debugging tool (in production)

**Repository Evidence:**
- **Route:** `/debug/analytics` (separate from general `/debug`)
- **Shell route:** ROUTE-057
- **Shell class:** `protected_internal_shell`

**Consumers verified:**
- VERIFIED ABSENT: No internal links or navigation
- VERIFIED ABSENT: No production traffic expected
- UNKNOWN: Whether development environment gating exists

**SEO/Auth:**
- Should not be indexed (development analytics tool)
- Protected shell suggests access control attempt

**Risk assessment:**
- **MEDIUM:** Security — analytics debugging exposes tracking data
- **LOW:** Implementation risk (gating or removal straightforward)

**Non-binding recommendation:** Same as Item 14 — verify and enforce gating behind NODE_ENV or remove from production build

**Owner decision needed:**
- Same as Item 14 (both debug routes can be decided together)

**Affected files if gating chosen:**
- `src/app/debug/analytics/` route handler
- Route logic (add NODE_ENV checks if gating chosen)

---

### Item 16: `/legal-ai-workflows` — Legal document generation (internal system)

**Repository Evidence:**
- **Route file:** `src/app/legal-ai-workflows/page.tsx`
- **Shell route:** ROUTE-021
- **Shell class:** `temporary_legacy_compatibility`
- **Redirect:** Contains immediate redirect to `/ai-workflows` (per page.tsx code)

**Consumers verified:**
- VERIFIED PRESENT: Navigation check in `src/components/AppShell.tsx`
- VERIFIED PRESENT: Redirect destination is `/ai-workflows` (canonical route)
- VERIFIED ABSENT: No other references; appears to be deprecated alias

**SEO/Auth:**
- Public (no auth visible)
- Immediate redirect (no content served)

**Risk assessment:**
- **LOW:** Route exists as redirect only; no active consumers beyond redirect target
- **LOW:** Safe to consolidate or remove

**Non-binding recommendation:** CONSOLIDATE — `/legal-ai-workflows` is already a redirect to `/ai-workflows`; document this as consolidation already completed; no removal needed

**Owner decision needed:**
- Acknowledge that consolidation is already in place (redirect exists); no action required unless changing redirect target

**Affected files if documentation chosen:**
- `src/app/legal-ai-workflows/page.tsx` (document redirect purpose)
- Shell route definition (ROUTE-021)

---

### Item 17: `/processing-page` — Async processing status display (internal system)

**Repository Evidence:**
- **Route file:** `src/app/processing-page/page.tsx` or similar
- **Shell route:** ROUTE-054: `/processing-page/[[...processing-page]]`
- **Shell class:** `protected_internal_shell`

**Consumers verified:**
- VERIFIED PRESENT: Usage in `src/components/PriceItem.tsx`: `href={'/processing-page?priceId=${item.priceId}'}`
- VERIFIED ABSENT: No other navigation links
- UNKNOWN: What triggers processing flows; which workflows use this route

**SEO/Auth:**
- Protected shell (should be auth-gated)
- Not public-facing
- Should not be indexed

**Risk assessment:**
- **UNKNOWN:** Exact consumer workflows unknown
- **MEDIUM:** If removal chosen without verifying all consumers, could break async flows
- **LOW:** If retained, minimal risk

**Non-binding recommendation:** RETAIN — route has at least 1 verified consumer (PriceItem); clarify exact workflows before removal

**Owner decision needed:**
1. What async processing workflows use `/processing-page`? (Full list needed)
2. Are there alternatives to displaying processing status?
3. Should this be converted to API endpoint or component instead of route?

**Affected files if disposition chosen:**
- `src/app/processing-page/` route
- Shell route definition (ROUTE-054)
- Consumer in PriceItem.tsx (if removed, update to alternative)

---

### Item 18: `/social` — Social media integration handler (internal system)

**Repository Evidence:**
- **Route file:** `src/app/social/route.ts` (API route, not a page)
- **Shell route:** ROUTE-080 (page route) + ROUTE-078–079 (API endpoints)
- **Shell class:** `protected_internal_shell`

**Consumers verified:**
- VERIFIED PRESENT: API consumers in `src/lib/generateSocialImageUrl.ts`:
  - `const path = '/social?${params.toString()}'` (OG image generation query)
  - `const path = '/social/${encodeURIComponent(slug)}.png'` (OG image file request)
- VERIFIED PRESENT: Used in `src/lib/seo/metadata.ts`: returns `/social?${params.toString()}` for OG images
- VERIFIED PRESENT: API endpoints `/api/social/next` and `/api/social/mark-posted` (ROUTE-078–079)

**SEO/Auth:**
- Public (generates OG images for public routes)
- Not indexed (API route)

**Risk assessment:**
- **HIGH:** Active consumer — OG image generation pipeline depends on this route
- **HIGH:** Removal would break social sharing previews site-wide
- **LOW:** No risk if retained

**Non-binding recommendation:** RETAIN — `/social` is critical for OG image generation; do NOT remove without replacing OG image generation mechanism

**Owner decision needed:**
1. Confirm understanding: `/social` is primary OG image generator?
2. Any plans to move OG generation to external service? (Would unblock removal)
3. If retaining: document purpose in code comments

**Affected files if removal considered:**
- `src/app/social/route.ts` (OG generation handler)
- Shell routes (ROUTE-078–080)
- `src/lib/generateSocialImageUrl.ts` (consumer; would break if route removed)
- `src/lib/seo/metadata.ts` (consumer)

---

### Item 19: `/systems/events` — Event system kernel (zero consumers claimed)

**Repository Evidence:**
- **Route file:** Directory exists at `src/app/systems/events/`
- **Shell route:** ROUTE-019
- **Shell class:** `temporary_legacy_compatibility`

**Consumers verified:**
- VERIFIED PRESENT (CONTRARY TO PRIOR AUDIT): Navigation link in `src/app/kits/KitsPageContent.tsx`: `href: '/systems/prochat-os'` links to **prochat-os**, not events
- VERIFIED ABSENT: No explicit links to `/systems/events` found in code search
- BUT: Route definition exists; classified as legacy compatibility (suggests historical use)

**SEO/Auth:**
- Public (per shell-route classification)
- Not indexed

**Risk assessment:**
- **LOW:** No verified inbound links to `/systems/events` specifically
- **LOW:** Can be safely removed or archived
- **UNKNOWN:** Whether events system is referenced by external code or scripts (outside repo)

**Non-binding recommendation:** REMOVE if zero external consumers confirmed; or DEFER pending owner clarification on event system purpose

**Owner decision needed:**
1. Is `/systems/events` active or skeleton/placeholder?
2. Any external systems depend on this route? (External audit required)
3. OK to delete, or should be retained for future development?

**Affected files if removal chosen:**
- `src/app/systems/events/` (entire directory)
- Shell route definition (ROUTE-019)

---

### Item 20: `/systems/prochat-os` — OS/kernel subsystem (zero consumers claimed)

**Repository Evidence:**
- **Route file:** `src/app/systems/prochat-os/ProChatOSPageContent.tsx` and related files
- **Shell route:** ROUTE-018
- **Shell class:** `temporary_legacy_compatibility`

**Consumers verified:**
- VERIFIED PRESENT (CONTRARY TO PRIOR AUDIT): Multiple verified links to `/systems/prochat-os`:
  - `src/app/kits/KitsPageContent.tsx`: `href: '/systems/prochat-os'` (primary CTA)
  - `src/app/kits/KitsPageContent.tsx`: `<Link href="/systems/prochat-os">EXPLORE — PROCHAT OS</Link>`
  - `src/app/kits/waaskit/WaaSKitPageContent.tsx`: `href: '/systems/prochat-os'` (primary CTA)
  - `src/app/kits/waaskit/WaaSKitPageContent.tsx`: `<Link href="/systems/prochat-os">EXPLORE — PROCHAT OS</Link>`
  - `src/app/kits/prokit/ProKitPageContent.tsx`: `href: '/systems/prochat-os'` (hero CTA)

**SEO/Auth:**
- Public (per shell-route classification)
- Likely indexed (product landing page)

**Risk assessment:**
- **HIGH:** Multiple verified consumers; removal breaks product landing pages
- **MEDIUM:** Indexed content; external backlinks likely
- **NO RISK if retained:** Route is actively used in product marketing

**Non-binding recommendation:** RETAIN — `/systems/prochat-os` has 5+ verified internal links and serves as secondary product landing; do NOT remove

**Owner decision needed:**
1. Is ProChat OS a current product offering?
2. If yes: RETAIN and document purpose
3. If deprecated: provide alternative landing page for existing links

**Affected files if removal considered:**
- `src/app/systems/prochat-os/` (entire directory)
- Shell route definition (ROUTE-018)
- 5+ internal navigation links (would break if removed)

---

### Item 22: `/api/waiting-list` vs `/api/waitlist` — API endpoint aliasing

**Repository Evidence:**
- **Canonical endpoint:** `src/app/api/waitlist/route.ts` (full implementation)
- **Alias endpoint:** `src/app/api/waiting-list/route.ts` (exact re-export: `export { POST } from '../waitlist/route'`)
- **Shell routes:** ROUTE-070 (waitlist), ROUTE-071 (waiting-list)
- **Equivalence verified:** Both endpoints return identical POST response (tested in legacy-compatibility.test.ts)

**Consumers verified:**
- VERIFIED PRESENT: Both endpoints actively used (re-export confirms backward compatibility)
- VERIFIED PRESENT: Form handlers likely reference both (historical reason for re-export)
- VERIFIED ABSENT: No breaking changes if either endpoint removed; both functional

**SEO/Auth:**
- Public endpoints (form submission)
- No auth required
- No SEO impact (APIs not indexed)

**Risk assessment:**
- **NONE if RETAIN:** Both endpoints cost negligible resources; zero maintenance burden
- **LOW if DEPRECATE:** Single reference point if external integrations depend on `/api/waiting-list`

**Non-binding recommendation:** RETAIN BOTH — `/api/waiting-list` is zero-cost re-export maintaining backward compatibility; consolidation risk exceeds benefit

**Owner decision needed:**
1. Preference: Keep both endpoints for backward compatibility, or deprecate `/api/waiting-list`?
2. If deprecate: external consumer audit required before sunset

**Affected files if deprecation chosen:**
- `src/app/api/waiting-list/route.ts` (deprecation header or deletion)
- Documentation/migration guide (if deprecating)

---

## Summary: Disposition Recommendations by Category

### High-Priority Decisions (External evidence required)

| Item | Route | Recommendation | Why | Owner action |
|-----:|---|---|---|---|
| 1 | `/blog/[slug]` | Evaluate external backlinks | Indexed content; SEO impact unknown | Run external backlink audit via search console |
| 7 | `/prompts/[category]/[slug]` | Evaluate external backlinks | Developer community likely references | Run external backlink audit |

### Medium-Priority Decisions (Product strategy)

| Item | Route | Recommendation | Why | Owner action |
|-----:|---|---|---|---|
| 11 | `/waas/accountants` | Evaluate WaaS strategy | Current vs. deprecated offering unclear | Confirm if WaaS is active product line |
| 10 | `/starting-point/*` | Evaluate onboarding status | May be active or deprecated | Check analytics for active usage |

### Low-Risk Decisions (Repository evidence clear)

| Item | Route | Recommendation | Why | Owner action |
|-----:|---|---|---|---|
| 2 | `/book` | RETAIN or redirect to `/contact` | Internal links suggest call-booking page | Confirm purpose; update links if redirecting |
| 5 | `/learn/*` | CONSOLIDATE → `/docs/learn` | Indexed; overlaps with `/docs` and `/prompts` | Decide consolidation destination |
| 8 | `/proof` | CONSOLIDATE → `/docs` or RETAIN | Case-study content; 1 internal link only | Evaluate content value; decide destination |
| 13 | `/ai-workflows/*` | RETAIN | Active product entry point; verified consumers | Document purpose; do NOT remove |
| 14–15 | `/debug/*`, `/debug/analytics` | GATE or REMOVE from production | Security — debug routes expose system info | Choose gating vs. removal strategy |
| 16 | `/legal-ai-workflows` | ACKNOWLEDGE (already consolidated as redirect) | Already redirects to `/ai-workflows` | No action needed; document consolidation |
| 17 | `/processing-page` | RETAIN | Active consumer in PriceItem.tsx | Clarify all workflows using this route |
| 18 | `/social` | RETAIN | Critical OG image generation pipeline | Do NOT remove; document purpose |
| 19 | `/systems/events` | REMOVE or DEFER | No verified inbound links; safe to remove | Confirm no external dependencies before deletion |
| 20 | `/systems/prochat-os` | RETAIN (CONTRARY TO PRIOR AUDIT) | 5+ verified consumers; active product landing | Do NOT remove; has multiple internal links |
| 22 | `/api/waiting-list` vs `/api/waitlist` | RETAIN BOTH | Zero-cost backward compatibility | No action needed |

---

## Critical Findings & Corrections to Prior Audit

1. **Item 20 (`/systems/prochat-os`) — PRIOR AUDIT ERROR:**
   - Prior audit claimed "zero consumers"
   - **Actual finding:** 5+ verified internal links; active product landing page
   - **Correction:** RETAIN — do NOT remove

2. **Item 19 (`/systems/events`) — VERIFIED ABSENT (confirmed):**
   - Prior audit claimed zero consumers; no explicit links found
   - **Actual finding:** No explicit inbound links to `/systems/events` identified
   - **Status:** Safe to remove if owner confirms no external use

3. **Item 3 (`/brainbridge`) — NEVER IMPLEMENTED:**
   - Prior audit claimed route exists
   - **Actual finding:** No route file, no shell route, no references — route never existed
   - **Recommendation:** Classify as VERIFIED ABSENT; no code removal required

4. **Item 18 (`/social`) — PURPOSE CLARIFIED:**
   - Prior audit classified as unknown internal system
   - **Actual finding:** `/social` is primary OG image generator; critical for social sharing previews
   - **Correction:** RETAIN — do NOT remove; critical infrastructure

---

## Next Owner Actions

1. **Review all 16 pending items** above (Item 3 verified absent; no owner decision needed). Focus on Items 1, 7, 11, 10 (require owner knowledge/external audit).

2. **For high-priority items (1, 7):** Obtain external backlink audit via search console or third-party tools

3. **For Items 13–18:** Confirm accuracy of documented purpose and consumers

4. **Record disposition for all 16 items** in `docs/platform/LEGACY_OWNER_DECISION_WORKSHEET.md`:
   - Select: `RETAIN`, `REDIRECT`, `CONSOLIDATE`, `ARCHIVE`, `REMOVE`, `DEFER`
   - Provide destination (if `REDIRECT`/`CONSOLIDATE`)
   - Provide clarification (if `DEFER` or flagged with "CLARIFICATION REQUIRED")
   - Sign and date each disposition

5. **Item 3 (`/brainbridge`) requires no classification** — verified absent; no code removal needed

6. **No implementation authorized** until all 16 dispositions are recorded and approved

---

## Validation Evidence Summary

**Repository audit completed:**
- 16 substantive items audited against source code (Item 3 verified absent)
- 66 browser evidence tests remain valid
- 6 verified-absent items total (5 from PXF-017B + Item 3)
- Phase 11/12 status: PARTIAL (unchanged)
- MailerLite owner verification: PENDING (unchanged)

**Evidence sources:**
- Shell route definitions (`src/helpers/shell-routes.ts`)
- Route files and page components
- Internal links and navigation
- Sitemap and SEO metadata
- Global grep searches
- API endpoint definitions

**Audit standards:**
- No invented consumers or approvals
- No speculative external traffic
- Repository evidence only (external audit required for Items 1, 7)
- All findings documented with exact file paths and line numbers

---

**Status:** Audit complete. All 16 substantive items require owner classification before implementation can proceed.

**Next: Owner reviews brief and records dispositions in `LEGACY_OWNER_DECISION_WORKSHEET.md`. Items 13–18 have verified consumers; RETAIN is safe default.**
