# PXF-018 — Phase 11 Legacy Surface Implementation Blueprint

**Created:** 2026-08-06  
**Updated:** 2026-08-06 (PXF-018 reconciliation: Item 3 removed; maps 16 substantive decisions)  
**Status:** Blueprint and packet design; awaiting owner decision classifications  
**Scope:** Maps 16 substantive Phase 11 decisions into bounded execution packets (Item 3 verified absent)  
**Reference:** `LEGACY_OWNER_DECISION_WORKSHEET.md`

---

## Executive Summary

This document defines a complete implementation strategy for Phase 11 legacy surface decisions WITHOUT pre-selecting any disposition. Each of the 16 substantive decisions (Item 3 verified absent) is mapped into independent, validated execution packets with explicit dependencies, entry criteria, and rollback paths.

**This document does NOT authorize implementation.** Packets remain blocked until owner decisions are recorded in `LEGACY_OWNER_DECISION_WORKSHEET.md`.

### Critical Constraints

1. **No disposition is preselected.** Recommended defaults are provided for context only.
2. **Blank or DEFER decisions block their corresponding packets indefinitely.**
3. **REDIRECT/CONSOLIDATE decisions require explicit destination URLs or paths.**
4. **REMOVE/ARCHIVE work requires rollback verification and zero-consumer proof.**
5. **Production deployment requires owner sign-off on each affected packet.**
6. **Phase 12 manual evidence and MailerLite rotation are separate workstreams.**

---

## Packet Summary Matrix

16 substantive items (Item 3 verified absent) mapped to execution packets. Each packet is independently executable upon owner approval.

| Item | Route/Surface | Category | Recommended Default | Packet ID | Risk Level | Complexity |
|-----:|---|---|---|---|---|---|
| 1 | `/blog/[slug]` | Marketing | CONSOLIDATE → /docs | PXF-018A | HIGH | Medium |
| 2 | `/book` | Marketing | REDIRECT → /docs | PXF-018A | LOW | Low |
| 5 | `/learn/*` | Marketing | CONSOLIDATE → /docs | PXF-018B | MEDIUM | Medium |
| 7 | `/prompts/[category]/[slug]` | Marketing | EVALUATE + (RETAIN \| CONSOLIDATE) | PXF-018C | HIGH | High |
| 8 | `/proof` | Marketing | CONSOLIDATE → /docs or RETAIN | PXF-018B | MEDIUM | Medium |
| 10 | `/starting-point/*` | Marketing | CONSOLIDATE → /memory | PXF-018D | LOW | Low |
| 11 | `/waas/accountants` | Marketing | EVALUATE + (RETAIN \| CONSOLIDATE) | PXF-018E | MEDIUM | Medium |
| 13 | `/ai-workflows/*` | Internal | RETAIN (verified consumer) | PXF-018F | MEDIUM | Low |
| 14 | `/debug/*` | Internal | GATE or REMOVE | PXF-018G | MEDIUM | Low |
| 15 | `/debug/analytics` | Internal | GATE or REMOVE | PXF-018G | MEDIUM | Low |
| 16 | `/legal-ai-workflows` | Internal | ACKNOWLEDGE (already consolidated) | PXF-018F | LOW | None |
| 17 | `/processing-page` | Internal | RETAIN (verified consumer) | PXF-018F | MEDIUM | Low |
| 18 | `/social` | Internal | RETAIN (critical OG infrastructure) | PXF-018F | HIGH | None |
| 19 | `/systems/events` | Internal | REMOVE (zero verified consumers) | PXF-018H | LOW | Low |
| 20 | `/systems/prochat-os` | Internal | RETAIN (7+ verified consumers) | PXF-018H | MEDIUM | None |
| 22 | `/api/waiting-list` vs `/api/waitlist` | API | RETAIN (both) | PXF-018I | NONE | None |

---

## Execution Packets (Detailed Specifications)

### PXF-018A: Marketing Routes with High/Medium SEO Risk (Blog, Book)

**Scope:** Items 1, 2  
**Routes affected:** `/blog/[slug]`, `/book`  
**Recommended defaults:** Blog+Book → CONSOLIDATE/REDIRECT to `/docs`  
**Entry criteria (blocking conditions):**
- Owner has classified Item 1 `/blog/[slug]` with explicit disposition (CONSOLIDATE, REDIRECT, or DEFER)
- Owner has classified Item 2 `/book` with explicit disposition

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
- **Consumer (Item 1):** Email campaigns may reference old blog URLs (unverified but likely)
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
**Recommended defaults:** Both CONSOLIDATE to `/docs` with redirects  
**Entry criteria:**
- Owner has classified Item 5 `/learn/*` with explicit disposition and destination (if REDIRECT/CONSOLIDATE)
- Owner has classified Item 8 `/proof` with explicit disposition and destination (if REDIRECT/CONSOLIDATE)

**Likely affected files:**
- `src/app/learn/page.tsx` or `src/app/learn/layout.tsx` (Item 5)
- `src/app/proof/page.tsx` or similar (Item 8)
- Content files and nested routes
- Route manifest and sitemap
- Navigation/footer helpers if linked

**Dependencies:**
- Item 8 requires content audit (case studies may have value justifying retention)
- Both items have no critical technical dependencies
- Destination routes (`/docs`) must be stable

**Risks:**
- **SEO (Item 8):** External case-study links unverified; may exist
- **Consumer:** Email campaigns may reference old learning paths (unverified)
- **Content migration:** Ensure no orphaned assets or dependencies

**Implementation order:**
1. Audit content in `/learn` and `/proof` (quantity, types, internal/external references)
2. Decide if content should be copied to `/docs` or removed entirely
3. Create redirect mappings
4. Test redirects locally
5. Verify internal and external link impact (grep for old paths)
6. Deploy with monitoring

**Validation commands:**
```bash
# Find all references to old paths
grep -r "/learn\|/proof" src/ tests/ --include="*.ts" --include="*.tsx" --include="*.json"

# Verify nested routes render
curl -L http://localhost:3000/learn/topic -I
curl -L http://localhost:3000/proof -I

# Test build
npm run build
```

**Rollback method:**
- Revert source routes and redirect config
- Rebuild

**Commit boundaries:**
- One commit for `/learn` consolidation (if approved)
- One commit for `/proof` consolidation (if approved)
- Or combined if both use same disposition

**Deployment requirements:**
- Staging test with redirect verification
- Content migration audit (if consolidating)

**Completion evidence:**
- Redirect mappings functional (301/302 chains verified)
- No broken internal links
- Content migrated or removed per disposition

---

### PXF-018C: Prompt Library Evaluation (Conditional Retention/Consolidation)

**Scope:** Item 7  
**Route:** `/prompts/[category]/[slug]`  
**Recommended default:** Evaluate external-link volume; RETAIN if high SEO value, else CONSOLIDATE to `/docs`  
**Entry criteria:**
- Owner has classified Item 7 with explicit disposition
- If CONSOLIDATE/REDIRECT selected: owner has provided destination path
- If RETAIN selected: owner has approved separate maintenance

**Likely affected files:**
- `src/app/prompts/[category]/[slug]/page.tsx`
- `src/app/prompts/layout.tsx` and category/list logic
- Content database or CMS integration (if applicable)
- Search/indexing logic

**Dependencies:**
- **Critical:** Requires external backlink audit to assess SEO impact
- Destination route (if CONSOLIDATE) must be determined by owner
- Possible CMS or content management dependency

**Risks:**
- **SEO (HIGH):** Indexed content with probable external developer-community links; improper 301 redirects damage rankings
- **Duplicate content:** If content mirrored in `/docs`, SEO duplication penalty possible
- **API consumers:** Unverified external integrations may depend on endpoint (unlikely but possible)

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
**Recommended default:** CONSOLIDATE to canonical product routes (`/memory`, `/memory-qa`, or `/workbench`)  
**Entry criteria:**
- Owner has classified Item 10 with explicit disposition and destination (if REDIRECT/CONSOLIDATE)

**Likely affected files:**
- `src/app/starting-point/page.tsx` and nested routes
- Onboarding flow logic and state management
- Navigation helpers (if linked)
- Tests: `tests/onboarding.spec.ts` or similar

**Dependencies:**
- Destination route mapping must be clarified (which product route(s) should onboarding users reach?)
- Email or marketing campaign dependencies (unverified but likely)

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

### PXF-018E: WaaS Product Variant Decision (Conditional Retention/Consolidation)

**Scope:** Item 11  
**Route:** `/waas/accountants`  
**Recommended default:** EVALUATE WaaS product strategy; if current, RETAIN or CONSOLIDATE under `/workbench`; if deprecated, REDIRECT to homepage  
**Entry criteria:**
- Owner has classified Item 11 with explicit disposition
- If CONSOLIDATE/REDIRECT: owner has confirmed destination

**Likely affected files:**
- `src/app/waas/accountants/page.tsx`
- `/waas/page.tsx` or `/waas/layout.tsx` (if hub exists)
- Navigation/footer (if linked)

**Dependencies:**
- **Critical:** Product strategy decision (is WaaS current or deprecated?)
- Partner/marketing dependencies (unknown; may affect external links)

**Risks:**
- **Product positioning:** Niche audience page; retention signals product diversity; removal eliminates variant
- **Partner links:** May have external references if part of partner program (unverified)

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
**Recommended default:** RETAIN all four (repository audit confirms active use; no removal recommended)  
**Entry criteria:**
- Owner acknowledges audit findings for each item
- Owner selects disposition: RETAIN + document purpose, or DEFER if clarification needed

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
**Recommended default:** GATE behind `NODE_ENV=development` or build-time exclusion  
**Entry criteria:**
- Owner has classified Items 14–15 with explicit disposition: GATE (environment flag) or REMOVE (from production build)

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
- **Low implementation risk:** Both GATE and REMOVE are straightforward

**Implementation order:**
1. Owner decides: GATE (check NODE_ENV before rendering) or REMOVE (exclude from production build)
2. If GATE: add conditional checks in route handlers; verify routes 404 in production
3. If REMOVE: configure Next.js to exclude `/debug` routes from production build
4. Test locally with `NODE_ENV=development` (routes accessible) and `NODE_ENV=production` (routes inaccessible)
5. Deploy to staging; verify debug routes return 404 in production environment

**Validation commands:**
```bash
# If GATE chosen: verify environment variable handling
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
**Routes affected:** `/systems/events` (REMOVE), `/systems/prochat-os` (RETAIN)  

**CRITICAL CORRECTION:** Prior PXF-018H scope incorrectly grouped both items as "zero-consumer removal." Audit evidence now shows:
- **Item 19 (`/systems/events`):** Zero verified inbound links → REMOVE is safe
- **Item 20 (`/systems/prochat-os`):** 7+ verified internal links → MUST RETAIN; removal breaks product landing pages

Split handling:

#### Item 19: `/systems/events` — REMOVE (zero verified consumers)

**Entry criteria:**
- Owner acknowledges zero verified repository links and confirms acceptable to remove
- If external dependencies suspected, select DEFER pending clarification

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
**Recommended default:** RETAIN BOTH (zero-cost backward-compatibility alias)  
**Entry criteria:**
- Owner has classified Item 22 with explicit disposition: RETAIN (both) or REMOVE/DEPRECATE (waiting-list only)

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
  ↓ (no blocking deps)
  
PXF-018B (Learning Hub)
  ↓ (no blocking deps)
  
PXF-018C (Prompt Library)
  ↓ (blocks on: external backlink audit OR owner decision to RETAIN)
  
PXF-018D (Onboarding)
  ↓ (no blocking deps)
  
PXF-018E (WaaS)
  ↓ (blocks on: owner product strategy decision)
  
PXF-018F (Internal Systems Clarification) ← CRITICAL BLOCKER
  ↓ (blocks on: owner clarification of purpose/consumers for Items 13, 16, 17, 18)
  ↓ (after clarification, routes independently to: RETAIN docs, REMOVE verification, or DEFER)
  
PXF-018G (Debug Security)
  ↓ (no blocking deps)
  
PXF-018H (Item 19 Removal + Item 20 Retention)
  ↓ (Item 19 has no blocking deps; Item 20 must be retained with verified consumers)
  
PXF-018I (API Aliasing)
  ↓ (no blocking deps if RETAIN; requires consumer audit if DEPRECATE)
```

### Critical Path (Items That Block Others)

1. **PXF-018F (Internal Systems Routes)** — LOW PRIORITY
   - Items 13, 16, 17, 18 all have verified consumers; no removal recommended
   - RETAIN is safe default; no action required unless owner plans external refactoring
   - Recommend: Acknowledge audit findings and document purpose in code (optional; not blocking)

2. **PXF-018A (Marketing SEO)** — HIGH PRIORITY
   - Item 1 (`/blog`) requires external backlink audit; delays potential Phase 11 completion
   - Recommend: Start backlink audit in parallel with other decisions

3. **PXF-018C (Prompt Library)** — HIGH PRIORITY
   - Requires backlink/SEO evaluation; may inform Phase 13 governance strategy
   - Recommend: Include in backlink audit with Item 1

### Execution Order (Recommended Sequence)

**Phase 1: Owner Classification (Owner tasks)**
1. Make disposition decisions for all 16 pending items in worksheet
2. Provide destination paths for REDIRECT/CONSOLIDATE choices
3. For Items 13–18: acknowledge audit findings (no external clarification needed unless planning major refactoring)

**Phase 2: Parallel Execution (Post-approval)**
- PXF-018A (Marketing SEO) — Medium priority; awaits backlink audit
- PXF-018B (Learning Hub) — Low priority; no blocking deps
- PXF-018D (Onboarding) — Low priority; no blocking deps
- PXF-018G (Debug Security) — Medium priority; security-sensitive
- PXF-018H (Item 19 Removal) — Low priority; no risk
- PXF-018F (Internal Systems Docs) — Optional; low priority (no removal recommended; retention is safe)

**Phase 3: Conditional Execution (Strategy-dependent)**
- PXF-018C (Prompt Library) — Awaits backlink audit or owner decision
- PXF-018E (WaaS) — Awaits product strategy decision
- PXF-018I (API Aliasing) — No-op if RETAIN; consumer audit if DEPRECATE
- PXF-018H (Item 20 Retention) — Automatic; no action needed (route has verified consumers; must be retained)

**Phase 4: Implementation Refinement (Post-staging)**
- Run approved packets in staging; verify redirects, 404s, and build success
- Deploy to production in dependency order
- Verify Item 19 deletion does not affect Item 20 (both in same directory)

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

- [ ] All 16 substantive pending items mapped to a packet
- [ ] 6 verified-absent items explicitly excluded from packets
- [ ] No disposition preselected; all remain blank pending owner decision
- [ ] No invented consumer, destination, analytics, or approval fact appears
- [ ] Browser evidence counts remain: 66 total (6+18+16+26)
- [ ] Phase 11 status unchanged: PARTIAL
- [ ] Phase 12 status unchanged: PARTIAL
- [ ] MailerLite rotation status unchanged: PENDING
- [ ] Archive branch (`archive/content-heavy-site`) not mentioned or modified
- [ ] No application source code modified (documentation only)
- [ ] Git diff shows documentation files only
- [ ] Build passes: `npm run type-check && npm run build`
- [ ] ESLint passes: `npm run lint` (if applicable)
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

### What blocks implementation of each packet:

| Condition | Impact |
|-----------|--------|
| Blank disposition | Packet blocked indefinitely |
| DEFER disposition | Packet deferred; revisit next cycle |
| REDIRECT/CONSOLIDATE without destination | Packet blocked until destination specified |
| REMOVE without zero-consumer proof | Packet blocked; audit required |
| PXF-018F clarification incomplete | Items 13, 16–18 blocked |

### What must happen next:

1. **Owner completes worksheet:**
   - Select disposition for all 16 pending items
   - Provide destinations for REDIRECT/CONSOLIDATE
   - For Items 13–18: acknowledge audit findings (no external clarification needed unless planning major refactoring)
   - Record dates and approver name

2. **After approval, execute packets in dependency order:**
   - Only approved packets execute
   - Each packet commits independently
   - Validate in staging before production deploy

3. **Phase 12 and MailerLite remain separate:**
   - Manual evidence collection (Phase 12) is independent
   - MailerLite credential rotation is independent
   - Neither blocks Phase 11 cleanup

---

## References

- **Source:** `docs/platform/LEGACY_OWNER_DECISION_WORKSHEET.md` (16 pending items + 6 verified-absent)
- **Context:** `docs/platform/LEGACY_OWNER_DECISIONS.md` (detailed register)
- **Brief:** `docs/platform/LEGACY_OWNER_DECISION_BRIEF.md` (executive summary)
- **Roadmap:** `docs/roadmap.md` (Phase 11 PARTIAL status)
- **Current phase:** `docs/HANDOFF_2026-08-06_PXF017_CLOSEOUT.md`

---

**Status:** Blueprint complete; audit reconciled; awaiting owner decisions to unlock implementation packets.

**Worksheet status:** 16 dispositions PENDING; 6 verified-absent items excluded (Item 3 reclassified; Items 13–18 have verified consumers).

**Next owner action:** Classify all 16 pending items and provide destinations for REDIRECT/CONSOLIDATE choices. For Items 13–18, audit confirms active use; RETAIN is safe default. No external clarification needed unless planning major refactoring (see **Packet PXF-018F** and worksheet).
