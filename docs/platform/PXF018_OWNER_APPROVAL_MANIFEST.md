# PXF-018 Owner Approval Manifest — Phase 11 Legacy Surface Decisions

**Created:** 2026-08-06  
**Updated:** 2026-08-07 (Bulk approval signed; Item 5 implementation complete)  
**Status:** Partially approved and executing; 9 items remain pending  
**Scope:** 7 approved + 1 implemented; 9 pending; 6 verified absent  
**Verified absent:** 6 items (no owner decision needed; excluded from this manifest)  
**Total catalogued:** 22 items  

---

## Purpose

This manifest converts the reconciled PXF-018 audit into a single review surface for owner approval. Each of the 16 pending items includes:
- Exact route/surface identity
- **PROPOSED** disposition (never APPROVED until owner signs)
- Repository evidence (one sentence)
- Implementation packet mapping
- Approval scope (code, docs, or no implementation)
- **Blank fields for owner override, final disposition, approver name, and approval date**

**Critical boundary:** Only signed final dispositions authorize mapped implementation packets.

---

## Summary: Proposed Dispositions by Category

### RETAIN (No-Code Acknowledgements) — 5 items

Routes with verified active consumers or critical infrastructure. RETAIN proposed; approval requires only documentation or no code changes.

| Item | Route | Evidence | Packet | Owner action |
|-----:|---|---|---|---|
| 13 | `/ai-workflows/*` | Active via `/go` shortener + product CTA | PXF-018F | Acknowledge or override |
| 17 | `/processing-page` | Active consumer in PriceItem.tsx | PXF-018F | Acknowledge or override |
| 18 | `/social` | Critical OG image pipeline (generateSocialImageUrl, seo/metadata) | PXF-018F | Acknowledge or override |
| 20 | `/systems/prochat-os` | 7+ verified internal links (kits, buildflow, books, AI workflows) | PXF-018H | Acknowledge or override |
| 22 | `/api/waiting-list` vs `/api/waitlist` | Zero-cost re-export (backward compatibility) | PXF-018I | Acknowledge or override |

### Conditional Restriction / Removal — 2 items

Routes with clear owner decision required (restrict to development or remove from production).

| Item | Route | Evidence | Packet | Implementation condition | Owner action |
|-----:|---|---|---|---|---|
| 19 | `/systems/events` | Zero repository inbound links; safe if external use confirmed | PXF-018H | Remove only if external dependencies confirmed absent | Confirm no external dependency; approve REMOVE or DEFER |
| 14–15 | `/debug/*`, `/debug/analytics` | Development utilities in production | PXF-018G | If RETAIN: restrict to NODE_ENV=development; if REMOVE: exclude from production build | Choose RETAIN (with NODE_ENV=development restriction) or REMOVE |

### REDIRECT / CONSOLIDATE (Destination Required) — 6 items

Routes requiring explicit destination path before approval.

| Item | Route | Proposal | Packet | Owner action |
|-----:|---|---|---|---|
| 1 | `/blog/[slug]` | RETAIN or CONSOLIDATE (owner selects; destination required if consolidate) | PXF-018A | Choose RETAIN or CONSOLIDATE; if consolidate, provide destination |
| 2 | `/book` | REDIRECT → `/contact` or RETAIN | PXF-018A | Confirm purpose + destination |
| 5 | `/learn/*` | CONSOLIDATE → `/docs/learn` | PXF-018B | Confirm destination (✓ completed, signed) |
| 8 | `/proof` | CONSOLIDATE → `/docs` or RETAIN | PXF-018B | Evaluate + choose destination |
| 10 | `/starting-point/*` | CONSOLIDATE → one of: `/memory`, `/memory-qa`, or `/workbench` | PXF-018D | Confirm destination based on onboarding audience (select exactly one) |
| 16 | `/legal-ai-workflows` | CONSOLIDATE → `/ai-workflows` (✓ already redirects; consolidation complete) | PXF-018F | Acknowledge (already consolidated via redirect) |

### Strategy / External Evidence Required — 2 items

Routes dependent on owner knowledge or external audit.

| Item | Route | External input needed | Packet | Owner action |
|-----:|---|---|---|---|
| 7 | `/prompts/[category]/[slug]` | External backlink audit via search console | PXF-018C | Decide RETAIN (high SEO) or CONSOLIDATE (low backlinks) |
| 11 | `/waas/accountants` | WaaS product strategy (current vs. deprecated) | PXF-018E | Confirm product status; choose RETAIN, CONSOLIDATE, or REDIRECT |

---

## Item-by-Item Approval Entries

### Item 1: `/blog/[slug]` — Blog hub with indexed external links

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/blog/[slug]` (dynamic blog post routes) |
| **Category** | Historical marketing |
| **Repository Evidence** | Blog infrastructure exists (route files: `src/app/blog/[slug]/page.tsx`); indexed content; shell routes ROUTE-038/039/083 classified as `temporary_legacy_compatibility` |
| **External unknowns** | External backlinks unknown; volume not quantified in repository (external audit required) |
| **Implementation packet** | PXF-018A (Marketing Routes with High/Medium SEO Risk) |
| **Implementation scope** | Code: route files, redirect config, shell routes. Docs: sitemap, robots.txt |
| **PROPOSED disposition** | **CONSOLIDATE** → `/docs/blog/*` with 301 redirects |
| **PROPOSED destination** | `/docs/blog/*` (or owner-specified alternative) |
| **Owner override** | *[ BLANK — provide if proposing different disposition ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 2: `/book` — Unclear book reference route

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/book` (single route) |
| **Category** | Historical marketing; purpose may be call-booking entry point |
| **Repository Evidence** | Route exists (`src/app/book/page.tsx`); verified internal links in 3 locations (ProKit, ProChat OS, AI Workflows); likely serves call-booking or resource purpose |
| **External unknowns** | Purpose ambiguous from code; no external links identified |
| **Implementation packet** | PXF-018A |
| **Implementation scope** | Code: route file, 3 internal Link hrefs. Docs: shell routes |
| **PROPOSED disposition** | **REDIRECT** to `/contact` (if call-booking) OR **RETAIN** (if strategic resource) |
| **PROPOSED destination** | `/contact` (conditional; owner to confirm purpose) |
| **Owner override** | *[ BLANK — confirm purpose and destination ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 5: `/learn/*` — Learning hub with overlapping routes

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/learn/*` (learning hub structure) |
| **Category** | Historical marketing; learning/education hub |
| **Repository Evidence** | Learning hub exists with nested routes (`src/app/learn/production-guide`, `src/app/learn/saas-starting-point`); included in sitemap (priority 0.8); internal cross-links to `/prompts` |
| **External unknowns** | Likely indexed; external backlink volume unverified |
| **Implementation packet** | PXF-018B (Learning Hub Consolidation) |
| **Implementation scope** | Code: route files, redirect config, internal navigation. Docs: sitemap, content migration audit |
| **PROPOSED disposition** | **CONSOLIDATE** → `/docs/learn/*` with 301 redirects |
| **PROPOSED destination** | `/docs/learn/*` (or owner-specified alternative) |
| **Owner override** | *[ BLANK — provide if proposing retention or different destination ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 7: `/prompts/[category]/[slug]` — Prompt library with indexed external links

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/prompts/[category]/[slug]` (dynamic prompt library routes) |
| **Category** | Historical marketing; searchable asset hub |
| **Repository Evidence** | Prompt library exists; individual prompts render; likely indexed by search engines; high-value developer community content |
| **External unknowns** | **EXTERNAL AUDIT REQUIRED** — External backlink volume unknown; developer community references likely but unquantified |
| **Implementation packet** | PXF-018C (Prompt Library Evaluation — Conditional Retention/Consolidation) |
| **Implementation scope** | Code: route files, redirect config (if consolidating). Docs: external backlink audit |
| **PROPOSED disposition** | **RETAIN** if high external backlink volume (SEO value); **CONSOLIDATE** → `/docs/prompts` if low backlinks |
| **PROPOSED destination** | Conditional on external audit; `/docs/prompts` if consolidating |
| **Owner override** | *[ BLANK — provide external audit results or strategic decision ]* |
| **Final disposition** | *[ BLANK — filled by owner after external audit ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 8: `/proof` — Case study/proof hub

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/proof` (proof/case-study hub route) |
| **Category** | Historical marketing; social proof content |
| **Repository Evidence** | Proof hub exists (`src/app/proof/ProofPageContent.tsx`); verified internal link in StudioPageContent.tsx; likely indexed; external case-study links volume unknown |
| **External unknowns** | Content value unclear; external case-study link volume not verified in repository |
| **Implementation packet** | PXF-018B |
| **Implementation scope** | Code: route files, 1 internal Link href. Docs: content audit (if consolidating), redirect config |
| **PROPOSED disposition** | **RETAIN** or **CONSOLIDATE** → owner-specified destination (owner selection required) |
| **PROPOSED destination** | *OWNER REQUIRED* (specify destination if consolidating) |
| **Owner override** | *[ BLANK — select RETAIN or CONSOLIDATE; if consolidating, specify destination ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 10: `/starting-point/*` — Onboarding flow

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/starting-point/*` (onboarding flow and nested routes) |
| **Category** | Historical marketing; onboarding/user-entry flow |
| **Repository Evidence** | Onboarding flow exists; verified internal link in ProofPageContent.tsx; likely referenced in email campaigns (unverified); shell route ROUTE-034 classified as `temporary_legacy_compatibility` |
| **External unknowns** | Onboarding activity status unknown (active vs. deprecated); email campaign dependency unverified |
| **Implementation packet** | PXF-018D (Onboarding Flow Consolidation) |
| **Implementation scope** | Code: route files, consolidation logic, 1 internal Link href. Docs: onboarding flow mapping |
| **PROPOSED disposition** | **CONSOLIDATE** to canonical product route with owner-selected destination (not pre-selected) |
| **PROPOSED destination** | **OWNER REQUIRED (select one):** `/memory`, `/memory-qa`, or `/workbench` — destination must be chosen by owner based on target onboarding audience |
| **Implementation condition** | Owner must select exactly one destination; combined routing to multiple destinations not permitted |
| **Owner override** | *[ BLANK — select destination: `/memory` OR `/memory-qa` OR `/workbench`; or provide alternative ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 11: `/waas/accountants` — WaaS product variant landing page

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/waas/accountants` (audience-specific product variant landing) |
| **Category** | Historical marketing; product variant/niche audience |
| **Repository Evidence** | WaaS variant landing exists (`src/app/waas/accountants/page.tsx`); verified internal references in kits pages; shell route ROUTE-042 classified as `temporary_legacy_compatibility` |
| **External unknowns** | **PRODUCT STRATEGY REQUIRED** — WaaS product status (current vs. deprecated) determines disposition |
| **Implementation packet** | PXF-018E (WaaS Product Variant Decision — Conditional) |
| **Implementation scope** | Code: route files, internal navigation links. Docs: strategy alignment documentation |
| **PROPOSED disposition** | **RETAIN** if WaaS is current product path; **CONSOLIDATE** under `/workbench` or **REDIRECT** to homepage if deprecated |
| **PROPOSED destination** | Conditional on product strategy: `/workbench` (if consolidating), `/` (if deprecated) |
| **Owner override** | *[ BLANK — provide WaaS product strategy decision ]* |
| **Final disposition** | *[ BLANK — filled by owner after strategy confirmation ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 13: `/ai-workflows/*` — AI flow orchestration (internal system)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/ai-workflows/*` (AI orchestration system routes) |
| **Category** | Internal system; AI workflow infrastructure |
| **Repository Evidence** | Routes exist; active consumer in `/go` route shortener (`WORKFLOW_OFFER_PATH = '/ai-workflows'`); product CTA in `/systems/prochat-os`; navigation check in AppShell.tsx |
| **External unknowns** | None identified; repository evidence confirms active use |
| **Implementation packet** | PXF-018F (Internal System Routes) |
| **Implementation scope** | No implementation required if RETAIN approved; optional: add code comments documenting purpose |
| **PROPOSED disposition** | **RETAIN** — Active product entry point with verified consumers |
| **PROPOSED destination** | N/A (retention; no movement) |
| **Owner override** | *[ BLANK — provide if proposing removal or alternative ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 14: `/debug/*` — Development debugging utilities (in production)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/debug/*` (development debugging utility routes) |
| **Category** | Internal system; development infrastructure exposed in production |
| **Repository Evidence** | Routes exist; shell route ROUTE-057 classified as `protected_internal_shell`; exposes system information; no legitimate production consumers identified |
| **External unknowns** | None; security decision is owner's |
| **Implementation packet** | PXF-018G (Debug Routes Security Restriction) |
| **Implementation scope** | Code: NODE_ENV environment checks (restrict to development) OR build-time exclusion config (remove from production) |
| **PROPOSED disposition** | **RETAIN** (with development-environment restriction: NODE_ENV=development only) OR **REMOVE** (from production build entirely) — Owner choice |
| **PROPOSED destination** | N/A (restriction/removal; no movement) |
| **Implementation condition** | If RETAIN: restrict access to NODE_ENV=development; if REMOVE: exclude from production build |
| **Owner override** | *[ BLANK — choose RETAIN (with NODE_ENV=development restriction) or REMOVE; confirm no production-monitoring scenarios justify exposure ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 15: `/debug/analytics` — Analytics debugging tool (in production)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/debug/analytics` (analytics debugging route) |
| **Category** | Internal system; analytics tool exposed in production |
| **Repository Evidence** | Route exists; shell route ROUTE-057 classified as `protected_internal_shell`; exposes analytics tracking data; no legitimate production consumers identified |
| **External unknowns** | None; security decision is owner's |
| **Implementation packet** | PXF-018G |
| **Implementation scope** | Code: NODE_ENV environment checks (restrict to development) OR build-time exclusion config (remove from production) |
| **PROPOSED disposition** | **RETAIN** (with development-environment restriction: NODE_ENV=development only) OR **REMOVE** (from production build entirely) — Owner choice (same as Item 14) |
| **PROPOSED destination** | N/A (restriction/removal; no movement) |
| **Implementation condition** | If RETAIN: restrict access to NODE_ENV=development; if REMOVE: exclude from production build |
| **Owner override** | *[ BLANK — choose RETAIN (with NODE_ENV=development restriction) or REMOVE; confirm no production-monitoring scenarios justify exposure ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 16: `/legal-ai-workflows` — Legal document generation (already consolidated)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/legal-ai-workflows` (legal document generation route) |
| **Category** | Internal system; legal/compliance infrastructure |
| **Repository Evidence** | Route exists as **immediate redirect** to `/ai-workflows` (`src/app/legal-ai-workflows/page.tsx` contains redirect); shell route ROUTE-021; consolidation already implemented |
| **External unknowns** | None; consolidation is already complete |
| **Implementation packet** | PXF-018F |
| **Implementation scope** | No implementation required if CONSOLIDATE approved; documentation only (owner confirmation of existing consolidation) |
| **PROPOSED disposition** | **CONSOLIDATE** → `/ai-workflows` (consolidation already implemented via redirect; owner approval confirms classification) |
| **PROPOSED destination** | `/ai-workflows` (already in place; no change needed) |
| **Owner override** | *[ BLANK — provide if proposing alternative destination or removal ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 17: `/processing-page` — Async processing status display (internal system)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/processing-page/[[...processing-page]]` (async processing status display) |
| **Category** | Internal system; workflow status infrastructure |
| **Repository Evidence** | Route exists (`src/app/processing-page/`); verified active consumer in `src/components/PriceItem.tsx` (href with priceId parameter); shell route ROUTE-054 classified as `protected_internal_shell` |
| **External unknowns** | None identified; repository evidence confirms active use in pricing workflows |
| **Implementation packet** | PXF-018F |
| **Implementation scope** | No implementation required if RETAIN approved; optional: document consumer workflows in code comments |
| **PROPOSED disposition** | **RETAIN** — Active consumer in PriceItem; async processing workflows depend on this route |
| **PROPOSED destination** | N/A (retention; no movement) |
| **Owner override** | *[ BLANK — provide if proposing removal or alternative status-display mechanism ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 18: `/social` — Social media integration handler (CRITICAL INFRASTRUCTURE)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/social` and `/api/social/*` (OG image generation system) |
| **Category** | Internal system; critical infrastructure for social sharing |
| **Repository Evidence** | **CRITICAL:** `/social` is primary OG image generator. Active verified consumers: (1) `src/lib/generateSocialImageUrl.ts` calls `/social?${params}` and `/social/${slug}.png`; (2) `src/lib/seo/metadata.ts` returns `/social` URLs for all OG image tags (site-wide); (3) API endpoints `/api/social/next` (ROUTE-078) and `/api/social/mark-posted` (ROUTE-079) |
| **External unknowns** | None; repository evidence is conclusive |
| **Implementation packet** | PXF-018F |
| **Implementation scope** | No implementation required if RETAIN approved; if removal considered: external OG generation service required before removal authorized |
| **PROPOSED disposition** | **RETAIN — CRITICAL** — Route is essential OG image generation pipeline; removal breaks social sharing previews site-wide |
| **PROPOSED destination** | N/A (retention; no movement) |
| **Owner override** | *[ BLANK — provide if proposing removal and confirming replacement OG service ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 19: `/systems/events` — Event system kernel (pending confirmation)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/systems/events` (event-system kernel route) |
| **Category** | Internal system; event infrastructure |
| **Repository Evidence** | Route directory exists (`src/app/systems/events/`); shell route ROUTE-019 classified as `temporary_legacy_compatibility`; **zero explicit inbound repository links** verified by grep |
| **External unknowns** | **EXTERNAL DEPENDENCY UNKNOWN** — No repository inbound links found; external systems may depend on this route (verification required) |
| **Implementation packet** | PXF-018H (Item 19 Removal + Item 20 Retention — Distinct Dispositions) |
| **Implementation scope** | Code: route directory deletion, shell route removal. Docs: zero-consumer verification confirmation |
| **PROPOSED disposition** | **REMOVE** — Zero repository inbound links; safe to delete after owner confirms no external dependencies |
| **PROPOSED destination** | N/A (removal; no movement) |
| **Owner override** | *[ BLANK — confirm no external dependencies before REMOVE approval; or select DEFER pending clarification ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 20: `/systems/prochat-os` — OS/kernel subsystem (ACTIVE PRODUCT LANDING)

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/systems/prochat-os` (product landing/OS architecture page) |
| **Category** | Product surface; secondary landing page |
| **Repository Evidence** | Route exists; shell route ROUTE-018 classified as `temporary_legacy_compatibility`; **7+ verified internal navigation links:** KitsPageContent (×2), WaaSKitPageContent (×2), ProKitPageContent (×2), UXKitPageContent (×2), BuildFlowPageContent (×2), BookPageContent (×1), AIWorkflowsPageContent (×1), AppShell navigation check. Active product landing with multiple CTAs. |
| **External unknowns** | Likely indexed; possible external backlinks (unquantified); product page status may drive external marketing |
| **Implementation packet** | PXF-018H |
| **Implementation scope** | No implementation required if RETAIN approved; if removal considered: alternative landing page required for 7+ existing internal links |
| **PROPOSED disposition** | **RETAIN** — Multiple verified consumers; active product landing page |
| **PROPOSED destination** | N/A (retention; no movement) |
| **Owner override** | *[ BLANK — provide if proposing removal and confirming alternative landing page for existing links ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

### Item 22: `/api/waiting-list` vs `/api/waitlist` — API endpoint aliasing

| Property | Value |
|----------|-------|
| **Route/Surface Identity** | `/api/waiting-list` and `/api/waitlist` (dual POST endpoints) |
| **Category** | API consolidation; backward-compatibility aliasing |
| **Repository Evidence** | `/api/waiting-list/route.ts` is exact re-export: `export { POST } from '../waitlist/route'`; both endpoints return identical response; zero-cost backward compatibility maintained |
| **External unknowns** | Legacy form endpoints and possibly external integrations may depend on `/api/waiting-list` (unquantified) |
| **Implementation packet** | PXF-018I (API Endpoint Aliasing — Backward-Compatibility Retention) |
| **Implementation scope** | No implementation required if RETAIN approved; if DEPRECATE chosen: external consumer audit required before sunset |
| **PROPOSED disposition** | **RETAIN** — Both `/api/waiting-list` and `/api/waitlist` remain active; `/api/waiting-list` is a zero-cost re-export maintaining backward compatibility |
| **PROPOSED destination** | N/A (retention; both endpoints preserved as-is) |
| **Implementation detail** | No code changes required; both endpoints continue to function identically via re-export pattern |
| **Owner override** | *[ BLANK — provide if proposing deprecation and confirming external consumer audit and sunset window ]* |
| **Final disposition** | *[ BLANK — filled by owner ]* |
| **Owner approval signature** | *[ BLANK — name/date ]* |

---

## Owner Approval Block

### Approval Options

**Bulk approval eligibility:** Bulk approval applies ONLY to items with:
- Exactly ONE canonical disposition value (RETAIN, REDIRECT, CONSOLIDATE, ARCHIVE, REMOVE, or DEFER)
- Explicit destination (if REDIRECT/CONSOLIDATE)
- No alternative dispositions or conditional branches
- No owner-choice implementation branches
- No unresolved external evidence
- No OWNER REQUIRED selections

**Items ineligible for bulk approval (require owner selection or external input):**
- Item 1: External backlink audit required
- Item 2: Multiple disposition options (REDIRECT or RETAIN); requires purpose confirmation
- Item 5: No blocking issues; FULLY SPECIFIED — **eligible**
- Item 7: External backlink audit required
- Item 8: Multiple disposition options (CONSOLIDATE or RETAIN); requires content-value assessment
- Item 10: Requires owner to select single destination from three options
- Item 11: Requires product strategy decision
- Item 13: No blocking issues; FULLY SPECIFIED — **eligible**
- Item 14: Multiple disposition options (RETAIN or REMOVE); requires security choice
- Item 15: Multiple disposition options (RETAIN or REMOVE); requires security choice (same as 14)
- Item 16: No blocking issues; FULLY SPECIFIED — **eligible**
- Item 17: No blocking issues; FULLY SPECIFIED — **eligible**
- Item 18: No blocking issues; FULLY SPECIFIED — **eligible**
- Item 19: External dependency confirmation required
- Item 20: No blocking issues; FULLY SPECIFIED — **eligible**
- Item 22: No blocking issues; FULLY SPECIFIED — **eligible**

**Items eligible for bulk approval (fully specified, single disposition):** 5, 13, 16, 17, 18, 20, 22 (7 items)

**Items requiring owner selection before approval:** 2, 8, 14–15 (require binary or ternary choice)

**Items requiring external input before approval:** 1, 7, 10, 11, 19 (require audit/strategy/confirmation)

**Option 1: Bulk approval (fully specified items only)**

Approve the 7 fully-specified items with single, unconditional dispositions:

```
I, _________________ (name), approve all proposed dispositions for the following items
without modification, and authorize these dispositions to be written to each item's
final-disposition field:

Items: 5, 13, 16, 17, 18, 20, 22

These items are fully specified and require no owner selection, external input, or
clarification. Upon signature, each proposed disposition becomes the final disposition.

[Items 1, 2, 7, 8, 10, 11, 14–15, 19 remain pending and are NOT approved by this signature.]

Signature: _________________ Date: _________________
```

**Option 2: Selective approval (fully specified subset + owner selections)**

Approve the 7 fully-specified items, then provide disposition choices for items requiring owner selection:

First, bulk-approve the fully specified items:

```
I, _________________ (name), approve all proposed dispositions for the following items:
Items: 5, 13, 16, 17, 18, 20, 22

Signature: _________________ Date: _________________
```

Then, complete one final-disposition entry for each item requiring your selection:

- **Item 2** (/book): Select ONE — REDIRECT to `/contact` OR RETAIN. Fill its "Final disposition" field, sign, and date.
- **Item 8** (/proof): Select ONE — CONSOLIDATE to `/docs` OR RETAIN. Fill its "Final disposition" field, sign, and date.
- **Item 14** (/debug/*): Select ONE — RETAIN (NODE_ENV=development) OR REMOVE. Fill its "Final disposition" field, sign, and date.
- **Item 15** (/debug/analytics): Select ONE — RETAIN (NODE_ENV=development) OR REMOVE. Fill its "Final disposition" field, sign, and date.

Then resolve items requiring external input (1, 7, 10, 11, 19) after audits/clarifications are complete.

**Option 3: All items deferred pending clarification**

If you prefer to defer all final decisions and collect owner selections separately:

```
I, _________________ (name), mark all 16 items as DEFER pending the following:

Items requiring external input:
- Item 1: External backlink audit via search console
- Item 7: External backlink audit via search console
- Item 19: Confirmation of zero external dependencies

Items requiring owner selection:
- Item 2: Confirm purpose: call-booking (REDIRECT) or strategic resource (RETAIN)?
- Item 8: Evaluate content value: strategic (RETAIN) or consolidate (CONSOLIDATE)?
- Item 10: Select onboarding destination: /memory, /memory-qa, or /workbench?
- Item 11: Confirm WaaS product status: current (RETAIN), deprecated (REDIRECT), or consolidate (CONSOLIDATE)?
- Item 14–15: Choose security posture: restrict to development (RETAIN) or remove from production (REMOVE)?

Fully specified items (5, 13, 16, 17, 18, 20, 22) may be approved in a separate tranche
once clarifications are ready.

Signature: _________________ Date: _________________
```

### Sign-Off

**APPROVED — Comprehensive Phase 11 Signature Complete**

| Category | Items | Status |
|----------|-------|--------|
| **Bulk approval** | 5, 13, 16, 17, 18, 20, 22 | ✓ SIGNED 2026-08-07 |
| **Final individual approvals** | 1, 2, 7, 8, 10, 11, 14, 15, 19 | ✓ SIGNED 2026-08-07 |

| Field | Value |
|-------|-------|
| **Owner name** | Repository Owner — explicit approval via CLI prompt |
| **Approval date** | 2026-08-07 |
| **Option selected** | **Complete Phase 11 approval** — all 16 pending items (7 bulk + 9 individual) |
| **Signature evidence** | OWNER APPROVED — explicit individual dispositions recorded in CLI prompt 2026-08-07 |

---

## Authorization Model

**How bulk approval populates final dispositions:**

When you approve the 7 fully-specified items (5, 13, 16, 17, 18, 20, 22) via bulk signature:

1. You sign a statement that authorizes the proposed dispositions to become final dispositions
2. Each signed item's "Final disposition" field is understood to be populated by reference to the PROPOSED disposition you approved
3. Only the items explicitly listed in your signed bulk approval are authorized
4. All other items remain with blank final-disposition fields pending further approval

**Mechanical guarantee:**

```
SIGNED BULK APPROVAL (7 items): 5, 13, 16, 17, 18, 20, 22
  → Final disposition for Item 5 = CONSOLIDATE → /docs/learn
  → Final disposition for Item 13 = RETAIN
  → Final disposition for Item 16 = CONSOLIDATE → /ai-workflows
  → Final disposition for Item 17 = RETAIN
  → Final disposition for Item 18 = RETAIN
  → Final disposition for Item 20 = RETAIN
  → Final disposition for Item 22 = RETAIN both endpoints

SIGNED INDIVIDUAL APPROVALS (9 items): 1, 2, 7, 8, 10, 11, 14, 15, 19
  → Final disposition for Item 1 = RETAIN
  → Final disposition for Item 2 = REDIRECT → /contact
  → Final disposition for Item 7 = RETAIN
  → Final disposition for Item 8 = RETAIN
  → Final disposition for Item 10 = CONSOLIDATE → /workbench
  → Final disposition for Item 11 = CONSOLIDATE → /workbench
  → Final disposition for Item 14 = RETAIN (NODE_ENV=development gate)
  → Final disposition for Item 15 = RETAIN (NODE_ENV=development gate)
  → Final disposition for Item 19 = REMOVE (zero repository consumers verified)

TOTAL: 16 items signed and authorized for implementation
VERIFIED ABSENT (6 items): 3, 4, 6, 9, 12, 21 (no owner action required)
```

**CRITICAL:** Only signed items authorize mapped implementation packets.

| Condition | Impact |
|-----------|--------|
| **Item in signed approval list** | Proposed disposition becomes final; packet is authorized |
| **Item NOT in signed approval list** | Final disposition remains blank; packet remains blocked |
| **Blank final disposition** | Item is NOT authorized for implementation |
| **DEFER final disposition** | Packet blocked indefinitely pending clarification |
| **Owner override provided for signed item** | Override replaces proposed disposition (must be added to item's entry before signature) |

---

## Post-Approval Execution Order

Implementation packets execute only after final dispositions are signed and non-blank. Execution order is:

**Fully Specified (can execute immediately upon bulk approval)**

**Phase 1A: Parallel Execution (fully specified items)**
- **PXF-018B** (Item 5): Learning hub consolidation — CONSOLIDATE → `/docs/learn`
- **PXF-018F** (Items 13, 16, 17, 18): Internal system routes (RETAIN; optional documentation only)
- **PXF-018H** (Item 20): ProChat OS route (RETAIN; no removal)
- **PXF-018I** (Item 22): API aliasing (RETAIN both endpoints as-is)

**Conditional on Owner Selection (blocked until Item N receives final disposition)**

**Phase 1B: Parallel Execution (after owner selections complete)**
- **PXF-018A** (Items 1–2): Marketing routes — Item 1 after backlink audit; Item 2 after purpose confirmation
- **PXF-018B** (Item 8): Proof hub — after content-value assessment
- **PXF-018G** (Items 14–15): Debug security — RETAIN (NODE_ENV=development) or REMOVE (after owner chooses)

**Phase 2: Conditional Execution (external input required)**
- **PXF-018C** (Item 7): Prompt library — after external backlink audit
- **PXF-018D** (Item 10): Onboarding flow — after destination selection
- **PXF-018E** (Item 11): WaaS variant — after product strategy confirmation
- **PXF-018H** (Item 19): Events removal — after external dependency confirmation (REMOVE or DEFER)

**Blocked indefinitely (unless DEFER resolved):**
Any item marked DEFER without clarification cannot proceed.

---

## Scope Boundaries

**This manifest authorizes:**
- Only dispositions signed by owner in the approval block above
- Only mapped implementation packets for approved items
- Only documentation changes and route configuration (no feature development)

**This manifest does NOT authorize:**
- Implementation of items with blank, DEFER, or unsigned dispositions
- Feature development or business logic changes
- Phase 12 manual evidence collection (separate workstream)
- MailerLite credential rotation (separate workstream)
- Phase 13 continuous governance decisions

---

## Validated Evidence Summary

**16 pending items** with repository-verified evidence:
- Items 13, 17, 18, 20, 22: Verified active consumers (RETAIN proposed)
- Item 16: Already consolidated as redirect (CONSOLIDATE → `/ai-workflows` proposed)
- Items 14–15: Development utilities exposed in production (RETAIN with NODE_ENV restriction or REMOVE proposed)
- Item 19: Zero repository inbound links (REMOVE proposed after external confirmation)
- Items 1, 5, 8, 10: Consolidation candidates (REDIRECT/CONSOLIDATE proposed; destinations required)
- Item 2: Purpose unclear / multiple options (REDIRECT or RETAIN proposed; owner decision required)
- Items 7, 11: Strategy-dependent (conditional proposals; external audit or product decision required)

**6 verified-absent items** (excluded from this manifest; no owner decision):
- Item 3 `/brainbridge`: Never implemented
- Items 4, 6, 9, 12, 21: Empty stubs / zero consumers (already verified in Phase 11 audit)

**Totals:**
- 16 pending decisions (in this manifest)
- 6 verified absent (excluded; no action needed)
- 22 total catalogued items

---

## References

- **Audit evidence:** `docs/platform/PXF018_OWNER_DECISION_BRIEF.md` (complete findings with file paths)
- **Implementation strategy:** `docs/platform/PXF018_IMPLEMENTATION_PLAN.md` (packet specifications, validation, rollback)
- **Owner worksheet:** `docs/platform/LEGACY_OWNER_DECISION_WORKSHEET.md` (detailed evidence tables)
- **Roadmap:** `docs/roadmap.md` (Phase 11 PARTIAL status, verified evidence counts)
- **Repo audit register:** `docs/platform/LEGACY_OWNER_DECISIONS.md` (complete inventory)

---

**Status:** Ready for owner review and approval.

**Next: Owner completes approval block, signs off, and routes to implementation team.**
