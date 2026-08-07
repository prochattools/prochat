# PXF-018 — Phase 11 Legacy Surface Implementation Blueprint

**Created:** 2026-08-06  
**Updated:** 2026-08-07 (Reconciliation: 7 signed/complete + 9 unresolved + 6 absent = 22 total)  
**Status:** Ready for owner signature; packages reconciled with manifest  
**Scope:** Maps 9 unresolved Phase 11 decisions into bounded execution packets (7 signed excluded; 6 verified absent excluded)  
**Reference:** `PHASE_11_READY_TO_SIGN_OWNER_DECISION_PACKAGE.md`

---

## Executive Summary

This document defines a complete implementation strategy for Phase 11 unresolved decisions WITHOUT pre-selecting any disposition. The 9 unresolved items are mapped into independent, validated execution packets with explicit dependencies, entry criteria, and rollback paths.

**This document does NOT authorize implementation.** Packets remain blocked until owner signs the decision package and provides required external evidence/strategy inputs.

### Critical Constraints

1. **No disposition is preselected.** Recommended defaults are provided for context only.
2. **Blank or DEFER decisions block their corresponding packets indefinitely.**
3. **REDIRECT/CONSOLIDATE decisions require explicit destination URLs or paths.**
4. **REMOVE/ARCHIVE work requires rollback verification and zero-consumer proof.**
5. **Production deployment requires owner sign-off on each affected packet.**
6. **Phase 12 manual evidence and MailerLite rotation are separate workstreams.**

---

## Packet Summary Matrix

9 unresolved items (7 signed excluded) mapped to execution packets. 4 items are repository-ready; 5 require external evidence or strategy input. Each packet is independently executable upon owner approval.

| Item | Route/Surface | Category | Approval Status | Packet ID | Risk Level | Complexity |
|-----:|---|---|---|---|---|---|
| 1 | `/blog/[slug]` | Marketing | Owner selection: RETAIN or CONSOLIDATE; destination required | PXF-018A | HIGH | Medium |
| 2 | `/book` | Marketing | Owner selection: RETAIN or REDIRECT; destination required | PXF-018A | LOW | Low |
| 5 | `/learn/*` | Marketing | Bulk-eligible: CONSOLIDATE → `/docs/learn` | PXF-018B | MEDIUM | Medium |
| 7 | `/prompts/[category]/[slug]` | Marketing | Owner selection: RETAIN or CONSOLIDATE (after backlink audit); destination required | PXF-018C | HIGH | High |
| 8 | `/proof` | Marketing | Owner selection: RETAIN or CONSOLIDATE; destination required | PXF-018B | MEDIUM | Medium |
| 10 | `/starting-point/*` | Marketing | External input / owner destination required: CONSOLIDATE; select ONE destination | PXF-018D | LOW | Low |
| 11 | `/waas/accountants` | Marketing | Owner selection: RETAIN, CONSOLIDATE, or REDIRECT (depends on product strategy) | PXF-018E | MEDIUM | Medium |
| 13 | `/ai-workflows/*` | Internal | Bulk-eligible: RETAIN | PXF-018F | MEDIUM | Low |
| 14 | `/debug/*` | Internal | Owner selection: RETAIN (NODE_ENV gate) or REMOVE | PXF-018G | MEDIUM | Low |
| 15 | `/debug/analytics` | Internal | Owner selection: RETAIN (NODE_ENV gate) or REMOVE | PXF-018G | MEDIUM | Low |
| 16 | `/legal-ai-workflows` | Internal | Bulk-eligible: CONSOLIDATE → `/ai-workflows` | PXF-018F | LOW | None |
| 17 | `/processing-page` | Internal | Bulk-eligible: RETAIN | PXF-018F | MEDIUM | Low |
| 18 | `/social` | Internal | Bulk-eligible: RETAIN (critical OG infrastructure) | PXF-018F | HIGH | None |
| 19 | `/systems/events` | Internal | Owner selection: REMOVE or DEFER (pending external dependency confirmation) | PXF-018H | LOW | Low |
| 20 | `/systems/prochat-os` | Internal | Bulk-eligible: RETAIN (7+ verified consumers) | PXF-018H | MEDIUM | None |
| 22 | `/api/waiting-list` vs `/api/waitlist` | API | Bulk-eligible: RETAIN (both endpoints preserved) | PXF-018I | NONE | None |

---

## Execution Packets (Detailed Specifications)

### PXF-018A: Marketing Routes with High/Medium SEO Risk (Blog, Book)

**Scope:** Items 1, 2  
**Routes affected:** `/blog/[slug]`, `/book`  
**Status:** Both items require owner selection; no defaults are preselected  
**Entry criteria (blocking conditions):**
- Item 1: Owner has selected one canonical disposition (RETAIN or CONSOLIDATE) and, if CONSOLIDATE/REDIRECT, supplied explicit destination
- Item 2: Owner has selected one canonical disposition (RETAIN or REDIRECT) and, if REDIRECT, supplied exact destination

**Likely affected files/symbols:**
- `src/app/blog/[slug]/page.tsx` (Item 1 route)
- `src/app/book/page.tsx` (Item 2 route)
- `src/helpers/shell-routes.ts` or route manifest
- `next.config.js` or `next-config.mjs` (redirects config if applicable)
- `public/sitemap.xml` (sitemap generation)
- `public/robots.txt` (indexing directives if applicable)
- Tests: `tests/routes/marketing.spec.ts` or similar

**Dependencies:**
- Item 1 requires external backlink audit or owner acceptance of SEO risk
- Item 1 requires destination path clarity if REDIRECT/CONSOLIDATE
- Item 2 has no blocking technical dependencies

**Risks:**
- **SEO (Item 1):** Indexed content with external links; improper redirects cause 404s and damage search rankings
- **Consumer (Item 1):** Email campaign dependencies not verified in repository; external backlink audit required to assess
- **Rollback:** Keep source routes and source files until redirect verification completes

**Implementation order:**
1. (If CONSOLIDATE/REDIRECT Item 1) Audit external backlinks and document destination
2. (If CONSOLIDATE/REDIRECT Item 2) Confirm destination routes are stable
3. Create redirect mappings in Next.js config or route handlers
4. Test 301/302 redirects locally and in staging
5. Verify sitemap and robots.txt behavior post-redirect
6. Deploy with monitoring for 404/410 errors
7. Verify search console for indexing changes

**Validation commands:**
```bash
# Verify routes still render (before redirect)
curl -L http://localhost:3000/blog/test-post -I | grep "HTTP\|Location"
curl -L http://localhost:3000/book -I | grep "HTTP"

# After redirect: verify 301/302
curl -L -H "User-Agent: GoogleBot" http://localhost:3000/blog/old-post | grep "Location"

# Type check + build
npm run type-check
npm run build
```

**Rollback method:**
- Revert route files and redirect config to prior commit
- Verify routes render without 404s
- Clear build cache and rebuild

**Commit boundaries:**
- One commit per disposition choice (PXF-018A-blog, PXF-018A-book, PXF-018A-brainbridge) OR
- One combined commit if all three use same disposition (e.g., all CONSOLIDATE to /docs)
- Do NOT combine with unrelated Phase 11 cleanup

**Deployment requirements:**
- Deploy to staging first; test redirects with external link checker
- Monitor error logs for 404/410 after production deployment
- Search console monitoring enabled

**Completion evidence:**
- Redirect mappings defined in config or route handlers
- Tests verify 301/302 status codes and destination routes
- Sitemap reflects new routing
- Robots.txt maintained/updated

---

### PXF-018B: Learning Hub Consolidation (Learn, Proof)

**Scope:** Items 5, 8  
**Routes affected:** `/learn/*`, `/proof`  
**Status:** Item 5 completed and signed (CONSOLIDATE → `/docs/learn`). Item 8 requires owner selection between RETAIN and CONSOLIDATE; destination required if consolidating.  
**Entry criteria:**
- Item 5: Already consolidated via redirect to `/docs/learn`; Item 5 execution complete
- Item 8: Owner has selected one canonical disposition (RETAIN or CONSOLIDATE); if CONSOLIDATE, owner has supplied explicit destination

**Likely affected files (Item 8 only):**
- `src/app/proof/page.tsx` or similar
- Content files and dependencies
- Route manifest and sitemap (if consolidating)
- Navigation/footer helpers if linked

**Dependencies (Item 8 only):**
- Content value assessment (owner decision)
- If consolidating: destination route must be stable and owner-specified

**Risks (Item 8 only):**
- **SEO:** External case-study link volume unknown; improper redirects may impact search rankings
- **Consumer:** Email campaign dependencies not verified in repository
- **Content migration:** Ensure no orphaned assets or dependencies

**Implementation order (Item 8 only):**
1. Owner selects final disposition: RETAIN or CONSOLIDATE → [owner-specified destination]
2. If CONSOLIDATE: audit content in `/proof` (quantity, types, internal references)
3. Create redirect mappings or remove content per disposition
4. Test redirects locally
5. Verify no broken internal links (grep for `/proof` references)
6. Deploy with monitoring

**Validation commands (Item 8 only):**
```bash
# Find all references to old paths
grep -r "/proof" src/ tests/ --include="*.ts" --include="*.tsx" --include="*.json"

# Verify route renders
curl -L http://localhost:3000/proof -I

# Test build
npm run build
```

**Rollback method (Item 8 only):**
- Revert route files and redirect config
- Rebuild

**Commit boundaries:**
- Item 5: ✓ Already committed (separate transaction, completed)
- Item 8: One commit for `/proof` consolidation (if approved) OR no-op if RETAIN

**Deployment requirements (Item 8 only):**
- Staging test with redirect verification (if consolidating)
- Content migration audit (if consolidating)

**Completion evidence (Item 8 only):**
- Owner disposition recorded (RETAIN or CONSOLIDATE)
- If consolidating: redirect mappings functional (301/302 verified)
- If consolidating: no broken internal links
- If consolidating: content migrated or removed per disposition
- If retaining: no changes needed

---

### PXF-018C: Prompt Library Evaluation (Conditional Retention/Consolidation)

**Scope:** Item 7  
**Route:** `/prompts/[category]/[slug]`  
**Recommended default:** Final disposition remains unresolved between RETAIN and CONSOLIDATE. External backlink evidence is an entry criterion, not a disposition; any CONSOLIDATE decision requires an owner-supplied destination.  
**Entry criteria:**
- External backlink evidence has been reviewed by the owner
- Owner has recorded a signed final disposition of RETAIN or CONSOLIDATE
- If CONSOLIDATE is selected, the owner has provided the exact destination path

**Likely affected files:**
- `src/app/prompts/[category]/[slug]/page.tsx`
- `src/app/prompts/layout.tsx` and category/list logic
- Content database or CMS integration (if applicable)
- Search/indexing logic

**Dependencies:**
- **Critical:** Requires external backlink audit to assess SEO impact
- Destination route (if CONSOLIDATE) must be determined by owner
- CMS or content management dependencies: unknown

**Risks:**
- **SEO (HIGH):** Indexed content; external backlink volume unknown; improper 301 redirects damage rankings
- **Duplicate content:** If content mirrored in `/docs`, SEO duplication penalty possible
- **API consumers:** External integrations not verified in repository; unknown dependencies possible

**Implementation order:**
1. (Owner task) Audit external backlinks via search console or third-party tools
2. Decide RETAIN vs. CONSOLIDATE based on backlink volume and strategic value
3. If CONSOLIDATE: design redirect strategy (301 to consolidated `/docs/prompts` or equivalent)
4. If RETAIN: document maintenance plan and monitoring strategy
5. Test locally before deployment

**Validation commands:**
```bash
# Verify prompt routes render
curl -L http://localhost:3000/prompts/category/slug-example -I

# Verify content structure
find src/app/prompts -name "*.tsx" | head -5

# Search for API consumers
grep -r "/api/prompts\|/prompts" src/ --include="*.ts" --include="*.tsx" | grep -v "test"
```

**Rollback method:**
- If CONSOLIDATE chosen: revert redirect config and restore original routes
- If RETAIN chosen: no rollback needed (no changes)

**Commit boundaries:**
- Single commit for consolidation logic (if approved) OR no-op commit (if RETAIN)

**Deployment requirements:**
- Staging test with external link checker (if CONSOLIDATE)
- Search console monitoring (if CONSOLIDATE)
- Content preservation audit (if CONSOLIDATE)

**Completion evidence:**
- Disposition recorded with rationale
- Redirect mappings (if applicable) tested
- No duplicate-content penalties (if consolidating)
- Maintenance plan (if retaining) documented

---

### PXF-018D: Onboarding Flow Consolidation (Starting Point)

**Scope:** Item 10  
**Route:** `/starting-point/*`  
**Status:** Planning-ready but authorization-blocked: disposition type is CONSOLIDATE; owner must select exactly ONE destination (not combined)  
**Entry criteria:**
- Owner has recorded a signed final disposition of CONSOLIDATE
- Owner has selected exactly ONE destination: `/memory`, `/memory-qa`, OR `/workbench` (not multiple; not combined)

**Likely affected files:**
- `src/app/starting-point/page.tsx` and nested routes
- Onboarding flow logic and state management
- Navigation helpers (if linked)
- Tests: `tests/onboarding.spec.ts` or similar

**Dependencies:**
- **BLOCKING:** Destination route must be chosen by owner (which product route should onboarding users reach: /memory, /memory-qa, or /workbench?)
- Email or marketing campaign dependencies not verified in repository

**Risks:**
- **Consumer:** Email onboarding sequences may reference old paths
- **User experience:** Broken onboarding flow loses users mid-conversion

**Implementation order:**
1. Trace current onboarding flow logic (where does it route users?)
2. Identify destination routes per onboarding audience (QA users → `/memory-qa`? General users → `/memory`?)
3. Create redirect or route-mapping logic
4. Test locally with typical onboarding sequences
5. Verify form submission and state transitions

**Validation commands:**
```bash
# Verify onboarding routes render
curl -L http://localhost:3000/starting-point -I
curl -L http://localhost:3000/starting-point/step-1 -I

# Find onboarding flow logic
grep -r "starting-point\|onboarding" src/ --include="*.ts" --include="*.tsx" | head -10

# Test build
npm run build
```

**Rollback method:**
- Revert route files and consolidation logic
- Verify onboarding still routes correctly

**Commit boundaries:**
- Single commit for onboarding consolidation

**Deployment requirements:**
- Staging test with typical onboarding user journey
- Conversion tracking verification (if analytics in use)

**Completion evidence:**
- Old onboarding paths redirect or are removed
- New product route receives onboarding traffic
- Conversion funnel unbroken

---

### PXF-018E: WaaS Product Variant Decision (Strategy-Dependent)

**Scope:** Item 11  
**Route:** `/waas/accountants`  
**Allowed dispositions:** RETAIN (if WaaS current), CONSOLIDATE → explicit owner-specified destination (if consolidating), REDIRECT → explicit owner-specified destination (if deprecated)  
**Entry criteria:**
- Owner has confirmed WaaS product strategy (current vs. deprecated)
- Owner has recorded one signed canonical final disposition
- If CONSOLIDATE or REDIRECT is selected, the owner has confirmed the exact destination

**Likely affected files:**
- `src/app/waas/accountants/page.tsx`
- Navigation/footer links (if linked from kits pages)

**Dependencies:**
- **Blocking:** Product strategy decision (is WaaS current or deprecated?)

**Risks:**
- **Product positioning:** Niche audience page; retention signals product diversity; removal eliminates variant
- **Partner links:** External references not verified in repository; unknown dependencies possible

**Implementation order:**
1. Owner clarifies: Is WaaS product path current or deprecated?
2. If current: decide RETAIN (independent page) or CONSOLIDATE (under `/workbench`)
3. If deprecated: redirect to `/workbench` or homepage with monitoring
4. Test locally; verify no broken partner links

**Validation commands:**
```bash
# Verify route renders
curl -L http://localhost:3000/waas/accountants -I

# Search for internal references
grep -r "waas\|accountants" src/ --include="*.ts" --include="*.tsx"
```

**Rollback method:**
- Revert route files or consolidation logic
- Verify WaaS routes accessible

**Commit boundaries:**
- Single commit for WaaS disposition

**Deployment requirements:**
- Staging test
- Partner link audit (if applicable)

**Completion evidence:**
- Disposition recorded
- Route behavior aligned with product strategy

---

### PXF-018F: Internal System Routes (AI Workflows, Legal, Processing, Social)

**Scope:** Items 13, 16, 17, 18  
**Routes affected:** `/ai-workflows/*` (verified consumer), `/legal-ai-workflows` (already consolidated), `/processing-page` (verified consumer), `/social` (critical OG infrastructure)  
**Status:** All four items are fully specified in manifest as RETAIN (bulk-eligible for approval)  
**Entry criteria:**
- Items 13, 16, 17, 18 have signed final dispositions in the approval manifest (individually or via bulk signature)
- Unapproved sibling items remain blocked; partial execution of approved items is supported

**Why separate packet?**
These are internal system routes with verified consumers. Repository audit found:
- Item 13: Active consumer in `/go` route shortener; link in `/systems/prochat-os` CTA
- Item 16: Already consolidated as redirect to `/ai-workflows`
- Item 17: Active consumer in `src/components/PriceItem.tsx`
- Item 18: Critical OG image generation pipeline (used in all `/social?*` and `/social/*.png` requests)

No removal is recommended without replacing functionality.

**Likely affected files:**
- `src/app/ai-workflows/` and nested routes
- `src/app/legal-ai-workflows/page.tsx`
- `src/app/processing-page/page.tsx`
- `src/app/social/page.tsx`
- Any dependent workflow, automation, or integration logic (unidentified)

**Dependencies:**
- **BLOCKING:** Owner clarification required before any implementation
- Consumer audit (grep/code search) after clarification
- Internal API or database dependencies (unknown)

**Risks:**
- **Unknown:** Deleting undocumented infrastructure could break active systems
- **Security:** Some routes may require authorization; unclear what gates exist

**Implementation order:**
1. Owner acknowledges audit findings (repository evidence shows all four routes have verified consumers or already consolidated)
2. Owner selects disposition: RETAIN (document purpose) or DEFER (if external clarification needed)
3. If RETAIN: Add code comments documenting purpose, consumers, and any authorization gates:
   - Item 13: Document that `/ai-workflows` is active product entry point via `/go` shortener and product marketing CTAs
   - Item 16: Document that `/legal-ai-workflows` is already consolidated (redirects to `/ai-workflows`)
   - Item 17: Document that `/processing-page` is async processing status display used by PriceItem and other workflows
   - Item 18: Document that `/social` is critical OG image generation pipeline; removal would break social sharing previews
4. If DEFER: no implementation; revisit after owner clarification obtained
5. No removal recommended without replacing functionality

**Validation commands (verification that routes exist and have documented consumers):**
```bash
# Verify Item 13 consumers
grep -r "ai-workflows" src/ --include="*.ts" --include="*.tsx" | grep -v "legal-ai"
# Expected: WORKFLOW_OFFER_PATH, ProChatOSPageContent link, AppShell check

# Verify Item 16 consolidation
grep -r "legal-ai-workflows" src/ --include="*.ts" --include="*.tsx"
# Expected: Only redirect in page.tsx; AppShell navigation check

# Verify Item 17 consumer
grep -r "processing-page" src/ --include="*.ts" --include="*.tsx"
# Expected: PriceItem.tsx href and shell routing

# Verify Item 18 consumers
grep -r "/social\?" src/ --include="*.ts" --include="*.tsx"
grep -r "generateSocialImageUrl\|seo/metadata" src/ --include="*.ts" --include="*.tsx"
# Expected: generateSocialImageUrl and metadata.ts return /social URLs

# Check route files exist
find src/app -type d \( -name "ai-workflows" -o -name "legal-ai-workflows" -o -name "processing-page" -o -name "social" \)

# Type check
npm run type-check
npm run build
```

**Rollback method:**
- Revert route files and any documentation changes
- Rebuild

**Commit boundaries:**
- One documentation commit recording clarification (PXF-018F-clarify)
- Separate implementation commit per disposition (PXF-018F-retain-ai-workflows, PXF-018F-remove-social, etc.)
- Never combine implementations with unrelated changes

**Deployment requirements:**
- Clarification documented before deployment
- If REMOVE: staging test confirming zero references
- Monitoring for errors post-deployment

**Completion evidence:**
- Clarification documented in worksheet or commit message
- Disposition selected and recorded
- If REMOVE: zero-consumer verification complete
- If RETAIN: purpose and consumers documented in code comments or README

**Owner action required BEFORE this packet can execute:**
1. Review audit findings for Items 13, 16, 17, 18 (all have verified consumers or already consolidated)
2. Select disposition for each: RETAIN (document purpose) or DEFER (if external clarification needed)
3. Do NOT select REMOVE unless providing alternative implementation:
   - Item 13: Alternative product entry point if removing `/ai-workflows`
   - Item 16: N/A — already consolidated; no removal needed
   - Item 17: Alternative async processing status display if removing `/processing-page`
   - Item 18: External OG image generation service if removing `/social`
4. Record disposition in worksheet with rationale

---

### PXF-018G: Debug Routes Security Gating (Debug, Debug/Analytics)

**Scope:** Items 14, 15  
**Routes affected:** `/debug/*`, `/debug/analytics`  
**Recommended default:** Owner selection required for each item: RETAIN or REMOVE. `NODE_ENV=development` or build-time exclusion is an implementation condition of RETAIN, not a disposition.  
**Entry criteria:**
- Owner has recorded one signed final disposition for each item: RETAIN or REMOVE
- If RETAIN is selected, the owner has approved the development-only implementation condition

**Why separate packet?**
Security-sensitive. Development utilities should not be accessible in production. Gating is low-risk; removal is zero-risk.

**Likely affected files:**
- `src/app/debug/` and `src/app/debug/analytics/`
- `next.config.js` or `next-config.mjs` (route filtering if build-time removal chosen)
- Environment checks in route handlers (if gating chosen)
- Tests verifying debug routes inaccessible in production

**Dependencies:**
- None. These are isolated utility routes.

**Risks:**
- **Security (MODERATE):** Debug routes expose system information; information disclosure if production-accessible
- **Low implementation risk:** RETAIN with development-only conditions and REMOVE are both straightforward

**Implementation order:**
1. Owner decides: RETAIN or REMOVE
2. If RETAIN: add `NODE_ENV=development` conditional checks; verify routes 404 in production
3. If REMOVE: configure Next.js to exclude `/debug` routes from production build
4. Test locally with `NODE_ENV=development` (routes accessible) and `NODE_ENV=production` (routes inaccessible)
5. Deploy to staging; verify debug routes return 404 in production environment

**Validation commands:**
```bash
# If RETAIN with development-only condition is chosen: verify environment handling
NODE_ENV=development npm run dev &
curl -I http://localhost:3000/debug  # Should be accessible
# Kill dev server

NODE_ENV=production npm run start &
curl -I http://localhost:3000/debug  # Should 404
# Kill server

# If REMOVE chosen: verify build excludes routes
npm run build
# Check built `.next` directory for debug routes (should be absent)
ls -la .next/server/app/debug/  # Should not exist or be empty

# Type check
npm run type-check
npm run build
```

**Rollback method:**
- Revert gating logic (remove NODE_ENV checks) or build config
- Rebuild and redeploy

**Commit boundaries:**
- Single commit: "security: gate or remove debug routes from production"

**Deployment requirements:**
- Staging test verifying debug routes inaccessible in production
- Build verification (if REMOVE chosen)

**Completion evidence:**
- Debug routes gated or removed from production
- Verified 404 in production environment
- Tests passing (if added)

---

### PXF-018H: Internal System Routes with Distinct Dispositions (Events, ProChat OS)

**Scope:** Items 19, 20  
**Routes affected:** `/systems/events` (removal candidate), `/systems/prochat-os` (RETAIN)  

**Status:** Distinct dispositions: Item 19 requires owner choice (REMOVE or DEFER); Item 20 is fully specified as RETAIN  

**Audit evidence:**
- **Item 19 (`/systems/events`):** Zero verified inbound links → REMOVE is safe if owner confirms no external dependencies
- **Item 20 (`/systems/prochat-os`):** 7+ verified internal links → MUST RETAIN; removal breaks product landing pages

Handling:

#### Item 19: `/systems/events` — Requires owner choice (REMOVE or DEFER)

**Entry criteria:**
- Owner has selected one canonical disposition: REMOVE or DEFER
- If REMOVE: owner confirms zero verified repository links and acceptable to remove
- If DEFER: pending clarification on external dependencies

**Why removal is safe:**
Grep search verified zero explicit inbound links. Skeleton route; no active consumers identified.

**Likely affected files:**
- `src/app/systems/events/page.tsx`
- Shell route ROUTE-019 definition
- Tests (if any)

**Dependencies:**
- None. Zero verified consumers.

**Risks:**
- **LOW:** Removal is safe; route has no inbound navigation

#### Item 20: `/systems/prochat-os` — RETAIN (7+ verified consumers)

**Entry criteria:**
- Route is active product landing with multiple verified internal links
- Removal would break product marketing pages

**Why retention is mandatory:**
Repository audit found 7+ verified internal links:
- `src/app/kits/KitsPageContent.tsx` (2 links)
- `src/app/kits/waaskit/WaaSKitPageContent.tsx` (2 links)
- `src/app/kits/prokit/ProKitPageContent.tsx` (2 links)
- `src/app/kits/uxkit/UXKitPageContent.tsx` (2 links)
- `src/app/buildflow/BuildFlowPageContent.tsx` (2 links)
- `src/app/book/BookPageContent.tsx` (1 link)
- `src/app/ai-workflows/AIWorkflowsPageContent.tsx` (1 link)
- `src/components/AppShell.tsx` (navigation classification)

**Likely affected files:**
- `src/app/systems/prochat-os/` (entire directory)
- Shell route ROUTE-018 definition
- 7+ internal navigation links (would break if removed)

**Dependencies:**
- None. Route is independently functional.

**Risks:**
- **HIGH if removed:** Breaks product landing pages; breaks existing CTAs
- **LOW if retained:** Route is actively used in product marketing; no risk

**Implementation order (Item 19 ONLY — Item 20 must NOT be removed):**
1. Final grep verification confirming `/systems/events` has zero references
2. Delete `/systems/events` route files and tests
3. Verify no broken imports
4. Build and type-check
5. Commit and deploy

**Validation commands (Item 19 only):**
```bash
# Final consumer verification for Item 19
grep -r "systems/events" src/ tests/ --include="*.ts" --include="*.tsx" --include="*.json"
# Should return zero results

# Verify route files
find src/app -path "*systems/events*" -type f

# Verify Item 20 links are NOT broken
grep -r "/systems/prochat-os" src/ --include="*.ts" --include="*.tsx" | wc -l
# Should return 7+ results (all retained)

# After deletion: type check
npm run type-check
npm run build
```

**Rollback method (Item 19):**
- Revert file deletion from prior commit
- Rebuild

**Commit boundaries:**
- Single commit for Item 19 removal only: "chore: remove unused /systems/events route"
- Item 20 must be retained in separate no-op or documented decision commit

**Deployment requirements:**
- Staging test confirming Item 19 is gone; Item 20 still renders
- Build verification
- No deployment risk (Item 19 has zero consumers; Item 20 retained)

**Completion evidence (Item 19):**
- `/systems/events` route deleted
- No broken imports
- Build passing
- Tests updated or deleted
- Item 20 retained and verified working

---

### PXF-018I: API Endpoint Aliasing (Backward-Compatibility Retention)

**Scope:** Item 22  
**Route:** `/api/waiting-list` vs `/api/waitlist`  
**Recommended default:** RETAIN. Preserving both endpoint spellings is an implementation detail of RETAIN, not a separate disposition.  
**Entry criteria:**
- Item 22 has a signed final disposition of RETAIN in the approval manifest
- Both endpoint spellings remain available under that RETAIN disposition

**Why separate decision?**
API deprecation requires consumer audit and sunset communication. Retention (the safe default) requires no action.

**Likely affected files:**
- `src/app/api/waiting-list/route.ts` (re-export)
- `src/app/api/waitlist/route.ts` (canonical)
- Tests: `tests/api/waitlist.spec.ts` or similar

**Dependencies:**
- None (if RETAIN chosen)
- External consumer audit required (if REMOVE/DEPRECATE chosen)

**Risks:**
- **Consumer impact (if REMOVE):** External API integrations may depend on `/api/waiting-list`; deprecation without warning breaks clients
- **No risk (if RETAIN):** Both endpoints cost negligible resources

**Implementation order:**
1. Owner decides: RETAIN both endpoints or deprecate `/api/waiting-list`
2. If RETAIN: no action needed; document decision in code comment
3. If DEPRECATE: audit external consumers (log analysis, customer inquiry), define deprecation window, communicate sunset date, add deprecation header, eventually remove
4. No code changes if RETAIN

**Validation commands:**
```bash
# Verify both endpoints return identical response
curl -X POST http://localhost:3000/api/waiting-list -H "Content-Type: application/json" -d '{}' | jq .
curl -X POST http://localhost:3000/api/waitlist -H "Content-Type: application/json" -d '{}' | jq .

# Verify re-export structure
grep "export.*POST" src/app/api/waiting-list/route.ts
grep "export.*POST" src/app/api/waitlist/route.ts

# Tests
npm run test -- api
```

**Rollback method:**
- If DEPRECATE chosen and then reversed: remove deprecation header and documentation; restore to active status

**Commit boundaries:**
- If RETAIN: one comment-only commit (or no-op)
- If DEPRECATE: one commit adding deprecation header and documentation

**Deployment requirements:**
- If RETAIN: no deployment changes
- If DEPRECATE: staging test verifying endpoint behavior and header; monitoring for client errors

**Completion evidence:**
- Disposition recorded
- Both endpoints functional (if RETAIN) or deprecated with sunset communication (if DEPRECATE)

---

## Dependency Graph and Critical Path

### Execution Dependencies

```
PXF-018A (Marketing SEO)
  ↓ (blocks on: Items 1–2 owner selections; Item 1 requires external backlink audit)
  
PXF-018B (Learning Hub)
  ↓ (Item 5 complete; Item 8 blocks on: owner disposition selection)
  
PXF-018C (Prompt Library)
  ↓ (blocks on: Item 7 external backlink audit OR owner decision to RETAIN)
  
PXF-018D (Onboarding)
  ↓ (blocks on: Item 10 owner selection of exactly ONE destination: /memory, /memory-qa, or /workbench)
  
PXF-018E (WaaS)
  ↓ (blocks on: Item 11 owner product strategy decision)
  
PXF-018F (Internal System Routes — Complete)
  ↓ (all items signed/verified complete; documentation optional)
  
PXF-018G (Debug Security)
  ↓ (blocks on: owner choice for Items 14–15 — RETAIN or REMOVE)
  
PXF-018H (Item 19 Removal + Item 20 Retention)
  ↓ Item 19: (blocks on: external dependency confirmation or DEFER)
  ↓ Item 20: (complete; already RETAIN-signed)
  
PXF-018I (API Aliasing — Complete)
  ↓ (Item 22 already RETAIN-signed; no changes needed)
```

### Critical Path (Items That Block Others)

1. **PXF-018D (Onboarding Flow)** — HIGH PRIORITY (BLOCKING)
   - Item 10 requires owner to select ONE destination (/memory, /memory-qa, /workbench)
   - Cannot execute until destination is chosen
   - Recommend: Include in Step 2 owner decisions

2. **PXF-018G (Debug Security)** — MEDIUM PRIORITY (BLOCKING)
   - Items 14–15 require owner choice (RETAIN with NODE_ENV or REMOVE)
   - Cannot execute until security posture is approved
   - Recommend: Include in Step 1 owner decisions

3. **PXF-018H Item 19 (Events Removal)** — MEDIUM PRIORITY (BLOCKING)
   - Item 19 is externally blocked (external dependencies unknown)
   - Owner must confirm zero external deps (REMOVE) or select DEFER
   - Recommend: Include in Step 2 owner decisions

4. **PXF-018A (Marketing SEO)** — HIGH PRIORITY (OPTIONAL BLOCKER)
   - Items 1, 7 require external backlink audit
   - Recommend: Include in parallel backlink audit (if pursuing CONSOLIDATE)

5. **PXF-018E (WaaS Strategy)** — MEDIUM PRIORITY (OPTIONAL BLOCKER)
   - Item 11 requires owner product strategy confirmation
   - Recommend: Include in Step 2 owner decisions

### Execution Order (Recommended Sequence)

**Phase 1: Owner Decisions (Step 1 — Repository-Ready; 4 items)**
1. Items 2, 8, 14, 15: Owner signatures alone complete these
2. No external input required

**Phase 2: Owner Decisions (Step 2 — External/Strategy-Blocked; 5 items)**
1. Items 1, 7: Provide external backlink audit OR confirm SEO risk acceptance
2. Item 10: Select ONE destination (/memory, /memory-qa, /workbench)
3. Item 11: Confirm WaaS product status (current vs. deprecated)
4. Item 19: Confirm zero external dependencies OR select DEFER

**Phase 3: Parallel Execution (Immediately upon owner signatures)**
- PXF-018A (Marketing SEO) — Items 1–2 (awaits external audit if consolidating)
- PXF-018B (Learning Hub) — Item 5 (already completed); Item 8 pending
- PXF-018D (Onboarding) — Item 10 (awaits destination selection)
- PXF-018G (Debug Security) — Items 14–15 (awaits owner choice)
- PXF-018H Item 19 — (awaits external dependency confirmation)
- PXF-018C (Prompt Library) — Item 7 (awaits external audit if consolidating)
- PXF-018E (WaaS) — Item 11 (awaits product strategy confirmation)

**Phase 4: Post-Execution Validation (Staging/Production)**
- Run approved packets in staging; verify redirects, 404s, and build success
- Deploy to production in dependency order
- Monitor for errors; verify Item 19 deletion (if approved) does not affect Item 20

---

## Packet Grouping Strategy: Why Boundaries Matter

Each packet is **independently reviewable and rollbackable**. DO NOT combine packets unless explicitly approved.

| Packet | Can combine with | Cannot combine with | Reason |
|--------|---|---|---|
| PXF-018A | None | B–I | High-impact SEO changes |
| PXF-018B | None | A, C–I | Content consolidation |
| PXF-018C | None | A–B, D–I | SEO evaluation required |
| PXF-018D | None | A–C, E–I | Onboarding is separate concern |
| PXF-018E | None | A–D, F–I | Product strategy decision |
| PXF-018F | None | A–E, G–I | Optional documentation only; no removal recommended |
| PXF-018G | None | A–F, H–I | Security gate must be isolated |
| PXF-018H (Item 19 ONLY) | None | A–G, I | Item 19 removal must be atomic; Item 20 must be retained |
| PXF-018I | None | A–H | API change must be isolated |

---

## Validation Checklist (Before Deployment)

- [ ] 7 signed/completion-verified items (5, 13, 16, 17, 18, 20, 22) excluded from packets
- [ ] 9 unresolved items mapped to packets: 4 repository-ready + 5 external/strategy-blocked
- [ ] 6 verified-absent items explicitly excluded
- [ ] No disposition preselected; all 9 FINAL fields remain blank
- [ ] No invented consumer, destination, analytics, or approval fact appears
- [ ] Browser evidence counts remain: 66 total (6+18+16+26)
- [ ] Phase 11 inventory: 7 signed + 9 unresolved + 6 absent = 22 total
- [ ] Phase 11 status unchanged: PARTIAL
- [ ] Phase 12 status unchanged: PARTIAL (66 automated tests + manual evidence incomplete)
- [ ] Phase 13: ONGOING (governance decisions ongoing)
- [ ] MailerLite rotation status unchanged: PENDING
- [ ] Archive branch (`archive/content-heavy-site`) not mentioned or modified
- [ ] No application source code modified (documentation only)
- [ ] Git diff shows documentation files only
- [ ] No unrelated changes in working tree

---

## Goal Completion Boundary

**This document is a BLUEPRINT, not an execution contract.**

### What this document does NOT do:

1. ❌ Authorize any implementation
2. ❌ Preselect any disposition
3. ❌ Approve any route removal
4. ❌ Create any redirects
5. ❌ Change production behavior
6. ❌ Consolidate Phase 12 manual evidence
7. ❌ Consolidate MailerLite verification

### Approval mechanics and execution gates

The owner approval manifest controls authorization:

- **Bulk-eligible (7):** Items 5, 13, 16, 17, 18, 20, and 22.
- **Owner selection required (4):** Items 2, 8, 14, and 15.
- **External input or owner selection required (5):** Items 1 (backlink audit), 7 (backlink audit), 10 (destination), 11 (product strategy), and 19 (external dependency confirmation).
- A valid bulk signature writes only the explicitly listed PROPOSED dispositions to FINAL by reference.
- Omitted, unsigned, blank, or DEFER items authorize no implementation.
- REDIRECT or CONSOLIDATE without an exact destination remains blocked.
- REMOVE without required consumer or external-dependency confirmation remains blocked.
- Packet execution may be partial: approved items may execute while unapproved sibling items remain blocked.

### What must happen next:

1. **Owner completes Phase 11 owner decision package:**
   - Step 1 (4 items): Signature alone completes Items 2, 8, 14, 15
   - Step 2 (5 items): Provide external evidence/strategy input for Items 1, 7, 10, 11, 19
   - Provide exact destinations and record approver/date fields
   - Leave all FINAL dispositions blank until signed

2. **After approval, execute authorized packets in dependency order:**
   - Only signed final dispositions unlock implementation packets
   - Items 2, 8, 14, 15 may execute immediately upon Step 1 signature
   - Items 1, 7, 10, 11, 19 execute only after Step 2 external inputs received
   - Each packet commits independently
   - Validate in staging before production deploy

3. **Separate workstreams (independent):**
   - Phase 12 manual evidence collection (ongoing)
   - MailerLite credential rotation (pending owner action)
   - Phase 13 governance decisions (ongoing)

---

## References

- **Package:** `docs/platform/PHASE_11_READY_TO_SIGN_OWNER_DECISION_PACKAGE.md` (9 unresolved items)
- **Manifest:** `docs/platform/PXF018_OWNER_APPROVAL_MANIFEST.md` (approval structure)
- **Brief:** `docs/platform/PXF018_OWNER_DECISION_BRIEF.md` (audit findings)
- **Worksheet:** `docs/platform/LEGACY_OWNER_DECISION_WORKSHEET.md` (status record)
- **Register:** `docs/platform/LEGACY_OWNER_DECISIONS.md` (complete inventory)
- **Roadmap:** `docs/roadmap.md` (Phase 11 PARTIAL status)

---

**Status:** Blueprint complete; audit reconciled; awaiting owner decisions to unlock implementation packets.

**Current status:** 7 signed/completion-verified + 9 unresolved + 6 verified-absent = 22 total items

**Next owner action:** 
1. Complete Step 1 (Items 2, 8, 14, 15): Signature alone sufficient
2. Complete Step 2 (Items 1, 7, 10, 11, 19): Provide external evidence/strategy input
3. Provide exact destinations for Items 1–2, 7–8, 10–11, 19 where applicable
4. Return signed package to implementation team
