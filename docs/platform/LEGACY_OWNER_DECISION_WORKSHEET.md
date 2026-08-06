# Phase 11 Owner Decision Worksheet — Legacy Surface Classification

**Created:** 2026-08-06  
**Updated:** 2026-08-06 (PXF-018 reconciliation: Item 3 reclassified as verified absent)  
**Status:** Ready for owner classification  
**Scope:** 16 substantive pending decisions; 6 verified-absent records (NOT APPLICABLE)  
**Total catalogued items:** 22

**For owner approval:** See `docs/platform/PXF018_OWNER_APPROVAL_MANIFEST.md` — condensed review surface with proposed dispositions and sign-off block.

---

## Critical Safety Notes

**This document does NOT authorize implementation.** Each disposition below is empty and awaiting explicit owner selection.

### Binding Constraints

1. **No application implementation is authorized by this document alone.** All implementation must occur after explicit owner approval in a separate bounded packet.

2. **Each applicable item requires an explicit owner-selected disposition** from the predefined set: `RETAIN`, `REDIRECT`, `CONSOLIDATE`, `ARCHIVE`, `REMOVE`, `DEFER`.

3. **Redirect and consolidation decisions require a specific destination.** Blank destination fields block implementation.

4. **Destructive work (REMOVE, CONSOLIDATE with origin deletion, ARCHIVE) must not begin while the disposition is blank or `DEFER`.** No work proceeds without explicit approval.

5. **Implementation must be compiled into separate bounded packets after approval.** Phase 11 owner decisions are separate from Phase 11 implementation packets.

6. **Unrelated Phase 12 manual evidence and MailerLite rotation remain separate workstreams.** This worksheet does not consolidate or defer those.

### Summary Block

```
Substantive decisions awaiting owner classification: 16
Verified-absent records (NOT APPLICABLE): 6
Total catalogued records: 22
Approved decisions (completed): 0
Implementation packets authorized: 0

AUDIT UPDATE (2026-08-06):
Item 3 (/brainbridge) reclassified from pending to verified absent.
Repository audit found zero files, zero references, never implemented.
Remaining 16 items require owner classification.
```

---

## Substantive Owner Decisions (16 items)

### Historical Marketing Routes (7 items)

---

#### Item 1: `/blog/[slug]` — Blog hub with indexed external links

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/blog/[slug]` (dynamic blog post routes) |
| **Category** | Historical marketing; indexed content hub |
| **Current Verified Evidence** | Blog infrastructure exists in app router; individual blog posts render; search engines have indexed pages; no navigation link in canonical marketing chrome; external backlinks likely exist (not quantified) |
| **Known Consumers** | Search engine crawlers; external websites linking to specific blog posts; possibly email campaigns or onboarding sequences (unverified) |
| **SEO/External-Link Risk** | **HIGH** — indexed content with likely external backlinks; removal without proper redirects would break inbound traffic and damage SEO metrics |
| **Data/Authentication Dependency** | None (public read-only content) |
| **Recommended Default** | Consolidate into `/docs` with permanent 301 redirects to preserve SEO value |
| **Implementation Dependency** | Redirect routing configuration, search console update, external backlink audit (post-decision) |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* |
| **Redirect/Consolidation Destination** | *[ BLANK — required if REDIRECT or CONSOLIDATE selected ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to provide if different from recommended default ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 2: `/book` — Unclear book reference route

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/book` (single route) |
| **Category** | Historical marketing; purpose unclear |
| **Current Verified Evidence** | Route exists in app router; renders successfully; not linked from canonical navigation or footer; purpose ambiguous (book reference, resource hub, or legacy path unclear) |
| **Known Consumers** | Possibly external links or documentation references (unverified); no navigation or internal links found |
| **SEO/External-Link Risk** | **LOW** — no clear evidence of indexing or external reference; low impact if removed or redirected |
| **Data/Authentication Dependency** | None (public) |
| **Recommended Default** | Redirect to `/docs` (consolidate learning/reference surfaces) |
| **Implementation Dependency** | Route redirect configuration; monitor error logs for inbound traffic |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* |
| **Redirect/Consolidation Destination** | *[ BLANK — required if REDIRECT or CONSOLIDATE selected ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to provide ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 5: `/learn/*` — Learning hub with overlapping routes

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/learn/*` (learning hub structure and nested routes) |
| **Category** | Historical marketing; learning/education hub |
| **Current Verified Evidence** | Learning hub route structure exists; renders; purpose overlaps with `/docs`, verified-absent `/guides`, verified-absent `/playbooks`, and `/prompts` routes; no canonical navigation link; possibly referenced in email campaigns or onboarding sequences (unverified) |
| **Known Consumers** | Possibly email onboarding flows, internal documentation links, or user-generated external references (unverified) |
| **SEO/External-Link Risk** | **LOW to MEDIUM** — unclear if search engines have indexed; external reference likelihood is low but unverified |
| **Data/Authentication Dependency** | None (public) |
| **Recommended Default** | Consolidate learning content into `/docs`; retire independent `/learn` hub; maintain `/learn/*` → `/docs/*` redirects |
| **Implementation Dependency** | Content inventory and relocation; redirect strategy; navigation update |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* |
| **Redirect/Consolidation Destination** | *[ BLANK — required if REDIRECT or CONSOLIDATE selected; recommend: `/docs` ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to provide if content has distinct identity or should remain separate ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 7: `/prompts/[category]/[slug]` — Prompt library with indexed external links

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/prompts/[category]/[slug]` (dynamic prompt library routes) |
| **Category** | Historical marketing; searchable asset and indexed content hub |
| **Current Verified Evidence** | Prompt library infrastructure exists; individual prompt pages render; search engines have indexed pages; external websites and developer communities likely reference specific prompts (unverified but likely given nature of prompt libraries); not in canonical navigation; high-value content for organic search |
| **Known Consumers** | Search engine crawlers; external developer/prompt-community links; possibly API consumers querying prompt metadata (unverified) |
| **SEO/External-Link Risk** | **HIGH** — indexed content with probable external backlinks from developer community; SEO duplication if also mirrored in `/docs` without proper consolidation strategy |
| **Data/Authentication Dependency** | None (public read-only) |
| **Recommended Default** | Evaluate external-link volume first; if substantial, keep as independent library with SEO optimization; if minimal, consolidate into `/docs` with 301 redirects |
| **Implementation Dependency** | External backlink audit; SEO analysis; possibly content duplication strategy if both routes retained |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* |
| **Redirect/Consolidation Destination** | *[ BLANK — required if REDIRECT or CONSOLIDATE selected; options: `/docs/prompts`, `/prompts` (retain), or other ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to provide: backlink volume, strategic importance, or consolidation rationale ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 8: `/proof` — Case study/proof hub

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/proof` (proof/case-study hub route) |
| **Category** | Historical marketing; case study/social-proof content |
| **Current Verified Evidence** | Case study/proof hub exists in app router; renders successfully; not linked in canonical navigation; possibly indexed by search engines and externally referenced (unverified); provides social-proof content |
| **Known Consumers** | Possibly external case-study links, internal marketing references, or customer-shared pages (unverified) |
| **SEO/External-Link Risk** | **LOW to MEDIUM** — evidence of indexing and external reference is unclear; moderate impact if content is widely shared |
| **Data/Authentication Dependency** | None (public) |
| **Recommended Default** | Evaluate content value; if high-value proof content, maintain as independent page or consolidate into `/docs` with redirects; if low-value, retire with redirects |
| **Implementation Dependency** | Content audit; redirect strategy; possibly new `/case-studies` or `/proof` dedicated page |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* |
| **Redirect/Consolidation Destination** | *[ BLANK — required if REDIRECT or CONSOLIDATE selected; options: `/docs`, `/case-studies`, `/proof` (retain), or other ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to provide: content value assessment and strategic intent ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 10: `/starting-point/*` — Onboarding flow

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/starting-point/*` (onboarding flow and nested routes) |
| **Category** | Historical marketing; onboarding/user-entry flow |
| **Current Verified Evidence** | Onboarding flow structure exists in app router; renders successfully; purpose appears to be a SaaS-style starting point for new users; not linked in canonical navigation; possibly referenced in email onboarding sequences (unverified) |
| **Known Consumers** | Possibly email onboarding campaigns, internal documentation, or onboarding bot logic (unverified); unclear if active |
| **SEO/External-Link Risk** | **LOW** — appears to be internal onboarding flow; low likelihood of external indexing or reference |
| **Data/Authentication Dependency** | Possibly session or user-context dependent (unverified) |
| **Recommended Default** | Consolidate into canonical product routes (`/memory`, `/memory-qa`, `/workbench`) with appropriate routing logic; retire independent `/starting-point` surface |
| **Implementation Dependency** | Onboarding-flow mapping; redirect strategy; integration with product route entry points |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* |
| **Redirect/Consolidation Destination** | *[ BLANK — required if REDIRECT or CONSOLIDATE selected; recommend: `/memory` or `/memory-qa` depending on onboarding audience ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to provide: active-use status and intended audience routing ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 11: `/waas/accountants` — WaaS product variant landing page

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/waas/accountants` (audience-specific product variant landing) |
| **Category** | Historical marketing; product variant/niche audience page |
| **Current Verified Evidence** | WaaS (Workflows-as-a-Service) product variant landing exists; renders; specific audience targeting (accountants); not in canonical navigation; possibly referenced in niche marketing campaigns (unverified) |
| **Known Consumers** | Possibly external niche marketing links, accountant community references, or partner integrations (unverified) |
| **SEO/External-Link Risk** | **LOW to MEDIUM** — niche audience landing page; limited external-link risk unless part of partner program |
| **Data/Authentication Dependency** | None (public landing page) |
| **Recommended Default** | Evaluate WaaS strategy; if WaaS is current product path, keep or consolidate under unified `/workbench` product landing; if WaaS is deprecated, retire with redirects to main product pages |
| **Implementation Dependency** | Product strategy alignment; consolidation routing if applicable; partner link audit if applicable |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* |
| **Redirect/Consolidation Destination** | *[ BLANK — required if REDIRECT or CONSOLIDATE selected; options: `/workbench`, `/`, or dedicated `/waas` landing if strategy retained ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to provide: WaaS product-strategy status and niche-audience value ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

### Internal System Routes (6 items)

---

#### Item 13: `/ai-workflows/*` — AI flow orchestration (internal system)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/ai-workflows/*` (AI orchestration system routes) |
| **Category** | Internal system; AI workflow infrastructure |
| **Current Verified Evidence** | Routes exist in app router; purpose indicates AI workflow orchestration infrastructure; scope and exact consumer workflows not documented; appears to be internal-only system routing |
| **Known Consumers** | Unknown internal systems (not documented); internal AI pipeline implied but not verified |
| **SEO/External-Link Risk** | **NONE** (internal system; should not be indexed or externally referenced) |
| **Data/Authentication Dependency** | Depends on undocumented AI system dependencies and authorization model (unverified) |
| **Recommended Default** | **REQUIRES CLARIFICATION FIRST** — Decide disposition only after documenting: (1) exact purpose and scope, (2) current/planned consumers, (3) authorization model, (4) internal-system rationale |
| **Implementation Dependency** | PXF-017C clarification packet required before disposition can be applied |
| **Owner-Selected Disposition** | *[ BLANK — CLARIFICATION REQUIRED; tentative options: RETAIN if active, DEFER if undecided, REMOVE if unused ]* |
| **Redirect/Consolidation Destination** | *[ N/A — internal system; not applicable unless moving to alternate API ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner MUST provide clarification: current use, planned future, and authorization model BEFORE disposition can be finalized ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 14: `/debug/*` — Development debugging utilities (in production)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/debug/*` (development debugging utility routes) |
| **Category** | Internal system; development infrastructure exposed in production |
| **Current Verified Evidence** | Development debugging routes exist and render in production environment; dangerous if exposed to public; potential security and information-disclosure risk; should not be publicly discoverable |
| **Known Consumers** | Development-only; should have no production consumers |
| **SEO/External-Link Risk** | **NONE** (should not be indexed; internal development tools) |
| **Data/Authentication Dependency** | None explicit; but debug output could expose system information |
| **Recommended Default** | **SECURITY GATE REQUIRED** — Gate behind development-environment flag (`NODE_ENV=development`) or move to build-time exclusion so routes do not exist in production |
| **Implementation Dependency** | Environment variable gating in route definition or Next.js build-time exclusion; CI/production-build verification |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* Must choose: **GATE** (behind NODE_ENV) or **REMOVE** (from production build) |
| **Redirect/Consolidation Destination** | *[ N/A — internal utility; not applicable ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to confirm: gate preference (environment flag vs. build exclusion) and any production-monitoring scenarios that justify exposure ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 15: `/debug/analytics` — Analytics debugging tool (in production)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/debug/analytics` (analytics debugging route) |
| **Category** | Internal system; analytics tool exposed in production |
| **Current Verified Evidence** | Analytics debugging route exists separate from `/debug`; renders in production; potentially exposes analytics tracking data; information-disclosure risk if exposed |
| **Known Consumers** | Development-only; should have no production consumers |
| **SEO/External-Link Risk** | **NONE** (internal; should not be indexed) |
| **Data/Authentication Dependency** | None explicit; but analytics debug output could expose tracking information |
| **Recommended Default** | **SECURITY GATE REQUIRED** — Gate behind development-environment flag or move to build-time exclusion |
| **Implementation Dependency** | Environment variable gating or Next.js build-time exclusion; CI verification |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* Must choose: **GATE** (environment flag) or **REMOVE** (production build) |
| **Redirect/Consolidation Destination** | *[ N/A — internal utility ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to confirm: gate preference and any production-monitoring justification ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 16: `/legal-ai-workflows` — Legal document generation (internal system)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/legal-ai-workflows` (legal document generation route) |
| **Category** | Internal system; legal/compliance infrastructure |
| **Current Verified Evidence** | Route exists; appears to handle legal document generation for AI workflows; scope, purpose, and consumer workflows not documented |
| **Known Consumers** | Unknown internal systems (not documented) |
| **SEO/External-Link Risk** | **NONE** (internal system) |
| **Data/Authentication Dependency** | Unknown; legal document handling may require authorization or compliance gates (unverified) |
| **Recommended Default** | **REQUIRES CLARIFICATION FIRST** — Decide disposition only after documenting: (1) exact purpose (legal-template generation, compliance reporting, etc.), (2) current/planned consumers, (3) authorization/compliance requirements |
| **Implementation Dependency** | PXF-017C clarification packet required before disposition |
| **Owner-Selected Disposition** | *[ BLANK — CLARIFICATION REQUIRED; tentative options: RETAIN if active, DEFER if undecided, REMOVE if unused ]* |
| **Redirect/Consolidation Destination** | *[ N/A — internal system ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner MUST provide: purpose, consumer workflows, compliance gates, and legal implications BEFORE disposition finalized ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 17: `/processing-page` — Async processing status display (internal system)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/processing-page` (async processing status display) |
| **Category** | Internal system; workflow status infrastructure |
| **Current Verified Evidence** | Route exists; renders; appears to display status for async processing workflows; consumer workflows are not documented; used by unknown workflow systems |
| **Known Consumers** | Unknown workflows (not documented); unclear which internal systems depend on this route |
| **SEO/External-Link Risk** | **NONE** (internal; should not be indexed) |
| **Data/Authentication Dependency** | Possibly requires session or workflow-token validation (unverified); authorization model not documented |
| **Recommended Default** | **REQUIRES CLARIFICATION FIRST** — Decide disposition only after documenting: (1) exact consumer workflows, (2) authorization/session requirements, (3) whether alternative status-display mechanisms exist |
| **Implementation Dependency** | PXF-017C clarification packet + consumer-workflow audit required |
| **Owner-Selected Disposition** | *[ BLANK — CLARIFICATION REQUIRED; tentative options: RETAIN if active, DEFER if undecided, REMOVE if unused ]* |
| **Redirect/Consolidation Destination** | *[ N/A — internal system ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner MUST provide: consumer workflows, session/auth model, and alternative status-display rationale BEFORE disposition finalized ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 18: `/social` — Social media integration handler (CRITICAL INFRASTRUCTURE)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/social` and `/api/social/*` (OG image generation system) |
| **Category** | Internal system; critical infrastructure for social sharing |
| **Current Verified Evidence** | **REPOSITORY AUDIT FINDING:** `/social` is primary OG image generator. Active consumers: `src/lib/generateSocialImageUrl.ts` (calls `/social?${params}` and `/social/${slug}.png`), `src/lib/seo/metadata.ts` (returns `/social` URLs for all OG image tags). Also serves API endpoints `/api/social/next` and `/api/social/mark-posted`. **CRITICAL INFRASTRUCTURE — DO NOT REMOVE.** |
| **Known Consumers** | VERIFIED PRESENT: (1) OG image query endpoint for all social sharing previews; (2) `/api/social/next` and `/api/social/mark-posted` API endpoints; (3) Site-wide social preview generation in metadata |
| **SEO/External-Link Risk** | **NONE** (API route; not indexed) |
| **Data/Authentication Dependency** | Public API (no auth documented) |
| **Recommended Default** | **RETAIN — CRITICAL** — Route is essential OG image generation pipeline. Removal would break social sharing previews site-wide. |
| **Implementation Dependency** | None if retained; external OG generation service required if removal considered |
| **Owner-Selected Disposition** | **RETAIN** (recommended; do NOT remove) |
| **Redirect/Consolidation Destination** | N/A — retain as-is |
| **Owner Rationale/Notes** | **Repository audit clarified:** `/social` is critical infrastructure for OG image generation. Confirmed consumers in metadata and URL generation. No removal authorized without external OG replacement service. |
| **Approval Date** | *[ Recommended RETAIN; no approval needed if accepting recommendation ]* |
| **Approved By** | *[ Repository audit; PXF-018 evidence trail ]* |

---

### Internal/System Cleanup Routes (2 items with zero consumers)

---

#### Item 19: `/systems/events` — Event system kernel (zero inbound links verified)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/systems/events` (event-system kernel route) |
| **Category** | Internal system; event infrastructure |
| **Current Verified Evidence** | **REPOSITORY AUDIT FINDING:** Route directory exists; shell route ROUTE-019 defined; classified as `temporary_legacy_compatibility`. No explicit inbound navigation links found (grep verified). Appears to be skeleton/placeholder for future event handling. Safe to remove if no external consumers confirmed. |
| **Known Consumers** | None found (zero explicit inbound links verified by grep) |
| **SEO/External-Link Risk** | **NONE** (internal; skeleton route) |
| **Data/Authentication Dependency** | None |
| **Recommended Default** | **REMOVE** — Zero verified inbound links; safe to delete after confirming no external dependencies |
| **Implementation Dependency** | Final grep verification; external consumer audit (if any); code removal only |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* Recommended: **REMOVE** (or DEFER if external dependencies suspected) |
| **Redirect/Consolidation Destination** | *[ N/A — removal only ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to confirm deletion is acceptable, or provide use case if route should be retained ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

#### Item 20: `/systems/prochat-os` — OS/kernel subsystem (ACTIVE PRODUCT LANDING — PRIOR AUDIT ERROR)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/systems/prochat-os` (product landing/OS architecture page) |
| **Category** | Product surface; secondary landing page |
| **Current Verified Evidence** | **REPOSITORY AUDIT FINDING (CORRECTION):** PRIOR AUDIT CLAIMED ZERO CONSUMERS — INCORRECT. Route exists; shell route ROUTE-018 defined; classified as `temporary_legacy_compatibility`. **VERIFIED PRESENT: 7+ internal navigation links:** (1) `src/app/kits/KitsPageContent.tsx` (×2); (2) `src/app/kits/waaskit/WaaSKitPageContent.tsx` (×2); (3) `src/app/kits/prokit/ProKitPageContent.tsx` (×2); (4) `src/app/kits/uxkit/UXKitPageContent.tsx` (×2); (5) `src/app/buildflow/BuildFlowPageContent.tsx` (×2); (6) `src/app/book/BookPageContent.tsx` (×1); (7) `src/app/ai-workflows/AIWorkflowsPageContent.tsx` (×1); (8) `src/components/AppShell.tsx` navigation check. **Active product landing page with extensive verified consumers.** |
| **Known Consumers** | VERIFIED PRESENT: 7+ internal product landing links; used as primary CTA across kits marketing pages, book page, and AI workflows page |
| **SEO/External-Link Risk** | **MEDIUM** — Likely indexed; possible external backlinks (product page) |
| **Data/Authentication Dependency** | None (public page) |
| **Recommended Default** | **RETAIN** — Multiple verified consumers; active product landing. Do NOT remove without providing alternative landing page for existing links. |
| **Implementation Dependency** | None if retained; replacement landing page required if removal considered |
| **Owner-Selected Disposition** | **RETAIN** (strongly recommended; do NOT remove) |
| **Redirect/Consolidation Destination** | N/A — retain as-is |
| **Owner Rationale/Notes** | **PRIOR AUDIT CORRECTION:** Prior audit claimed zero consumers; repository audit found 7+ verified internal links spanning kits, buildflow, books, and AI workflows product pages. `/systems/prochat-os` is active product landing page. No removal authorized without alternative landing page. |
| **Approval Date** | *[ Recommended RETAIN; no approval needed if accepting recommendation ]* |
| **Approved By** | *[ Repository audit; PXF-018 evidence trail ]* |

---

### API Endpoint Consolidation (1 item)

---

#### Item 22: `/api/waiting-list` vs `/api/waitlist` — API endpoint aliasing

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/api/waiting-list` and `/api/waitlist` (dual POST endpoints) |
| **Category** | API consolidation; backward-compatibility aliasing |
| **Current Verified Evidence** | `/api/waiting-list/route.ts` is exact re-export: `export { POST } from '../waitlist/route'`; both endpoints return identical response; verified by source inspection (legacy-compatibility.test.ts line 18–31); both POST handlers are functionally equivalent; rate limiting and honeypot behavior inherited across both endpoints |
| **Known Consumers** | Legacy form endpoints and possibly external API integrations that reference the older `/api/waiting-list` path |
| **SEO/External-Link Risk** | **N/A** (API endpoints; not indexed) |
| **Data/Authentication Dependency** | None (public form submission endpoint) |
| **Recommended Default** | **RETAIN BOTH** — `/api/waiting-list` is zero-cost re-export maintaining backward compatibility; minimal code maintenance burden; no compelling reason to break external integrations or legacy forms |
| **Implementation Dependency** | None if retention chosen (no changes required); if deprecation chosen, external consumer audit required before sunset |
| **Owner-Selected Disposition** | *[ BLANK — awaiting owner decision ]* Recommended: **RETAIN** (both endpoints as zero-cost aliases) |
| **Redirect/Consolidation Destination** | *[ N/A unless deprecation chosen; if REMOVE selected, redirect strategy required ]* |
| **Owner Rationale/Notes** | *[ BLANK — owner to provide: preference for backward-compatibility retention vs. deprecation/consolidation ]* |
| **Approval Date** | *[ BLANK ]* |
| **Approved By** | *[ BLANK ]* |

---

## Already Resolved — NOT APPLICABLE / VERIFIED ABSENT

The following six items have been verified as never-implemented routes or empty stubs with zero consumers. **No code removal is required for these items.** They are catalogued for completeness and clarity, but do not require owner disposition.

### Verified-Absent Routes (6 items)

| Item # | Route | Evidence | Status |
|--------|-------|----------|--------|
| 3 | `/brainbridge` | No route file, no directory; no shell route definition; zero references in entire codebase; never implemented (verified by PXF-018 audit) | NOT APPLICABLE |
| 4 | `/guides/[topic]/[slug]` | No route file, no directory; empty stub, zero consumers (verified by grep and code audit) | NOT APPLICABLE |
| 6 | `/playbooks/[segment]/[slug]` | No route file, no directory; empty stub, zero consumers (verified) | NOT APPLICABLE |
| 9 | `/snippets/[stack]/[slug]` | No route file, no directory; empty stub, zero consumers (verified) | NOT APPLICABLE |
| 12 | `/glossary/[term]` | Content removed; scaffolding dead code; zero consumers (verified) | NOT APPLICABLE |
| 21 | `/bb` | Never implemented; zero consumers; no tracked route exists (verified) | NOT APPLICABLE |

**No action required for these items.** They do not block Phase 11 progression.

---

## Decision Safeguard Checklist

Before marking an item **APPROVED**, verify:

- [ ] Disposition is one of: `RETAIN`, `REDIRECT`, `CONSOLIDATE`, `ARCHIVE`, `REMOVE`, `DEFER`
- [ ] If `REDIRECT` or `CONSOLIDATE`, destination is explicitly specified
- [ ] If `REMOVE` or destructive operation, owner has confirmed understanding of consequences
- [ ] Rationale or notes explain any deviation from recommended default
- [ ] Approval date and approver are recorded
- [ ] Implementation packet dependencies are documented (if applicable)

---

## Next Owner Actions

### Phase 11 Owner Classification Task

1. **Review all 16 substantive entries** in this worksheet. Item 3 (`/brainbridge`) is NOT APPLICABLE — verified absent; no classification needed.

2. **For each of the 16 remaining items, select an explicit disposition** from: `RETAIN`, `REDIRECT`, `CONSOLIDATE`, `ARCHIVE`, `REMOVE`, `DEFER`.

3. **For REDIRECT or CONSOLIDATE decisions, specify the destination** explicitly (e.g., `/docs`, `/memory`, `/`).

4. **For items marked CLARIFICATION REQUIRED** (items 13, 16, 17, 18), provide the required information or select `DEFER` pending clarification.

5. **Record approval date and approver name** for each disposition.

6. **Do not approve implementation** until all 16 dispositions are complete and explicitly recorded.

### Subsequent Implementation Packets

After owner classification is complete:

1. Compile separate, bounded implementation packets for each distinct decision category.
2. Each packet includes only the specific routes/surfaces approved for that disposition (REMOVE, REDIRECT, etc.).
3. Each packet includes validation and rollback strategy.
4. No implementation packet may proceed while any item disposition is blank or `DEFER`.

---

**Status:** Worksheet ready for owner review and classification. No decisions pre-approved.

**Worksheet created by:** PXF-017 closeout handoff  
**Worksheet reviewed by:** (awaiting owner input)  
**All 16 substantive pending items awaiting explicit owner decision. 6 verified-absent items are NOT APPLICABLE.**
