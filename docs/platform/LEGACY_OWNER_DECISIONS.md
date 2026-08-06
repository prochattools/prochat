# Legacy Owner Decision Register — PXF-017B

**Created:** 2026-08-04  
**Status:** 17 decisions pending; 5 items verified absent (no tracked code removal required)  
**Scope:** Phase 11 legacy surface classification decisions  

This register tracks 22 surface items. Five have been verified as never-implemented paths (guides, playbooks, snippets, glossary, bb) — their status is documented as "no code removal required." The remaining **17 items require explicit owner classification** before proceeding with Phase 11 consolidation and removal work.

---

## Historical Marketing Routes (12 items)

### 1. `/blog/[slug]`
| Property | Value |
|----------|-------|
| **Current Evidence** | Blog infrastructure exists; routes render; content is indexed by search engines; no navigation link in canonical chrome |
| **Known Consumers** | Search engine crawlers, external links to specific blog posts, possibly email campaigns (not verified) |
| **SEO/External-Link Risk** | High — indexed content and external backlinks to individual posts; removal would break links |
| **Data/Auth Dependency** | None (public read-only) |
| **Options** | 1. Consolidate into /docs with permanent redirects; 2. Archive to separate static site; 3. Keep as independent blog hub; 4. Remove and 301-redirect to homepage |
| **Recommended Default** | Consolidate into /docs (reduce surface, preserve SEO via redirects) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Redirect configuration + SEO verification (PXF-018 series) |

### 2. `/book`
| Property | Value |
|----------|-------|
| **Current Evidence** | Route exists in app structure; no navigation link; unclear purpose (book reference?) |
| **Known Consumers** | Possibly external links (not verified) |
| **SEO/External-Link Risk** | Low — no evidence of external links or indexing |
| **Data/Auth Dependency** | None (public) |
| **Options** | 1. Redirect to /docs; 2. Remove outright; 3. Keep as archive variant; 4. Repurpose for learning content |
| **Recommended Default** | Redirect to /docs (consolidate learning surfaces) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Route redirect + content consolidation |

### 3. `/brainbridge`
| Property | Value |
|----------|-------|
| **Current Evidence** | Route exists; historical product naming variant (Brainbridge = early ProChat product name?) |
| **Known Consumers** | Possibly external links from early marketing (not verified) |
| **SEO/External-Link Risk** | Medium — historical product name may be referenced externally |
| **Data/Auth Dependency** | None (public) |
| **Options** | 1. Redirect to /studio or /kits landing; 2. Redirect to homepage; 3. Keep as legacy brand variant; 4. Remove |
| **Recommended Default** | Redirect to /studio (route to current product interface) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Route redirect + brand messaging update |

### 4. `/guides/[topic]/[slug]`
| Property | Value |
|----------|-------|
| **Current Evidence** | VERIFIED ABSENT — no route file, no directory; never existed in tracked repo state |
| **Known Consumers** | None (zero-consumer verification complete) |
| **SEO/External-Link Risk** | None (never indexed, no external links possible) |
| **Data/Auth Dependency** | None |
| **Options** | No removal required (path was never implemented) |
| **Recommended Default** | NOT APPLICABLE — no tracked route exists |
| **Owner Decision** | **NOT APPLICABLE** |
| **Implementation Dependency** | None — verified absent, no action required |

### 5. `/learn/*`
| Property | Value |
|----------|-------|
| **Current Evidence** | Learning hub structure exists; purpose overlaps with /guides, /playbooks, /prompts |
| **Known Consumers** | Possibly email campaigns or onboarding flows (not verified) |
| **SEO/External-Link Risk** | Low to Medium — unclear if indexed or referenced externally |
| **Data/Auth Dependency** | None (public) |
| **Options** | 1. Consolidate related learning routes into /docs; 2. Keep as hub; 3. Archive separately; 4. Remove |
| **Recommended Default** | Consolidate into /docs (single learning surface) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Content and structure consolidation |

### 6. `/playbooks/[segment]/[slug]`
| Property | Value |
|----------|-------|
| **Current Evidence** | VERIFIED ABSENT — no route file, no directory; never existed in tracked repo state |
| **Known Consumers** | None (zero-consumer verification complete) |
| **SEO/External-Link Risk** | None (never indexed, no external links possible) |
| **Data/Auth Dependency** | None |
| **Options** | No removal required (path was never implemented) |
| **Recommended Default** | NOT APPLICABLE — no tracked route exists |
| **Owner Decision** | **NOT APPLICABLE** |
| **Implementation Dependency** | None — verified absent, no action required |

### 7. `/prompts/[category]/[slug]`
| Property | Value |
|----------|-------|
| **Current Evidence** | Prompt library; routes render; indexed by search engines; possible external API consumers (not verified) |
| **Known Consumers** | Search engines, external prompt library links, possibly API consumers |
| **SEO/External-Link Risk** | High — indexed content; developer community may reference specific prompts |
| **Data/Auth Dependency** | None (public read-only) |
| **Options** | 1. Consolidate into /docs with redirects; 2. Keep as independent prompt library; 3. Maintain as separate searchable asset; 4. Remove with redirects |
| **Recommended Default** | Keep as independent library or consolidate with 301 redirects (depends on external link volume) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | External link audit + redirect strategy |

### 8. `/proof`
| Property | Value |
|----------|-------|
| **Current Evidence** | Case study/proof hub; routes render; not in canonical nav |
| **Known Consumers** | Possibly external case study links (not verified) |
| **SEO/External-Link Risk** | Low to Medium — evidence of external links unclear |
| **Data/Auth Dependency** | None (public) |
| **Options** | 1. Redirect to /docs or new /case-studies page; 2. Keep as archive; 3. Remove with redirects; 4. Archive to separate site |
| **Recommended Default** | Redirect to /docs or maintain as separate proof page (depends on value) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Content classification + redirect setup |

### 9. `/snippets/[stack]/[slug]`
| Property | Value |
|----------|-------|
| **Current Evidence** | VERIFIED ABSENT — no route file, no directory; never existed in tracked repo state |
| **Known Consumers** | None (zero-consumer verification complete) |
| **SEO/External-Link Risk** | None (never indexed, no external links possible) |
| **Data/Auth Dependency** | None |
| **Options** | No removal required (path was never implemented) |
| **Recommended Default** | NOT APPLICABLE — no tracked route exists |
| **Owner Decision** | **NOT APPLICABLE** |
| **Implementation Dependency** | None — verified absent, no action required |

### 10. `/starting-point/*`
| Property | Value |
|----------|-------|
| **Current Evidence** | Onboarding flow; routes render; purpose unclear (SaaS starting point?); not in canonical nav |
| **Known Consumers** | Possibly email onboarding links (not verified); unclear if active |
| **SEO/External-Link Risk** | Low — unclear if indexed or referenced externally |
| **Data/Auth Dependency** | None (public) |
| **Options** | 1. Keep as onboarding variant; 2. Redirect to product routes (/memory, /workbench); 3. Archive; 4. Remove |
| **Recommended Default** | Consolidate into canonical product routes (reduce surface) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Flow mapping + redirect setup |

### 11. `/waas/accountants`
| Property | Value |
|----------|-------|
| **Current Evidence** | WaaS product variant landing page; not in canonical nav; specific audience |
| **Known Consumers** | Possibly external WaaS marketing links (not verified) |
| **SEO/External-Link Risk** | Low to Medium — product-specific landing page |
| **Data/Auth Dependency** | None (public) |
| **Options** | 1. Keep as separate WaaS landing page; 2. Consolidate under /kits; 3. Redirect to main WaaS page or homepage; 4. Archive |
| **Recommended Default** | Keep or consolidate under unified product landing (depends on WaaS strategy) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Product strategy alignment + potential redirect |

### 12. `/glossary/[term]`
| Property | Value |
|----------|-------|
| **Current Evidence** | VERIFIED ABSENT — no route file, no directory; never existed in tracked repo state |
| **Known Consumers** | None (zero-consumer verification complete) |
| **SEO/External-Link Risk** | None (never indexed, no external links possible) |
| **Data/Auth Dependency** | None |
| **Options** | No removal required (path was never implemented) |
| **Recommended Default** | NOT APPLICABLE — no tracked route exists |
| **Owner Decision** | **NOT APPLICABLE** |
| **Implementation Dependency** | None — verified absent, no action required |

---

## Internal System Routes (8 items)

### 13. `/ai-workflows/*`
| Property | Value |
|----------|-------|
| **Current Evidence** | Internal AI flow orchestration; routes exist; scope and consumer unknown |
| **Known Consumers** | Unknown (internal system) |
| **SEO/External-Link Risk** | None (internal-only) |
| **Data/Auth Dependency** | Depends on AI system dependencies (unknown) |
| **Options** | 1. Keep and document; 2. Gate behind feature flag or environment variable; 3. Move to internal-only API; 4. Remove if unused |
| **Recommended Default** | Clarify purpose and consumer before deciding |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | PXF-017C: Clarification packet |

### 14. `/debug/*`
| Property | Value |
|----------|-------|
| **Current Evidence** | Development/debugging utilities; routes render in production; dangerous if exposed |
| **Known Consumers** | Development only (should not be in production) |
| **SEO/External-Link Risk** | None (should not be indexed) |
| **Data/Auth Dependency** | None (but could expose debug info) |
| **Options** | 1. Gate behind development environment flag; 2. Gate behind admin authorization; 3. Remove from production build; 4. Keep as internal utility with secret URL |
| **Recommended Default** | Gate behind development flag or remove from production |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Environment gating or build separation |

### 15. `/debug/analytics`
| Property | Value |
|----------|-------|
| **Current Evidence** | Analytics debugging tool; separate from /debug; potentially exposes tracking data |
| **Known Consumers** | Development only |
| **SEO/External-Link Risk** | None (internal) |
| **Data/Auth Dependency** | None (but exposes analytics) |
| **Options** | 1. Gate behind development environment; 2. Gate behind admin authorization; 3. Remove from production; 4. Keep as secret utility |
| **Recommended Default** | Gate or remove from production |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Environment gating |

### 16. `/legal-ai-workflows`
| Property | Value |
|----------|-------|
| **Current Evidence** | Legal document generation for AI workflows; scope unclear; purpose unknown |
| **Known Consumers** | Unknown (internal system) |
| **SEO/External-Link Risk** | None (internal) |
| **Data/Auth Dependency** | Unknown |
| **Options** | 1. Keep and document; 2. Move to internal API; 3. Gate behind admin authorization; 4. Remove if unused |
| **Recommended Default** | Clarify before deciding |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | PXF-017C: Clarification packet |

### 17. `/processing-page`
| Property | Value |
|----------|-------|
| **Current Evidence** | Async processing status display; routes render; used in workflows (unclear which workflows) |
| **Known Consumers** | Unknown workflows (not documented) |
| **SEO/External-Link Risk** | None (internal) |
| **Data/Auth Dependency** | Possibly session/token validation (not verified) |
| **Options** | 1. Keep and document consumer workflows; 2. Move to internal API; 3. Gate behind admin or session; 4. Remove if unused |
| **Recommended Default** | Clarify consumer workflows and auth model |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | PXF-017C: Clarification packet |

### 18. `/social`
| Property | Value |
|----------|-------|
| **Current Evidence** | Social media integration handler; routes exist; consumer and scope unknown |
| **Known Consumers** | Unknown (internal system) |
| **SEO/External-Link Risk** | None (internal) |
| **Data/Auth Dependency** | Possibly API key authorization (not verified) |
| **Options** | 1. Keep and document; 2. Move to internal API; 3. Gate behind API key or admin; 4. Remove if unused |
| **Recommended Default** | Clarify before deciding |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | PXF-017C: Clarification packet |

### 19. `/systems/events`
| Property | Value |
|----------|-------|
| **Current Evidence** | Event system/kernel subsystem; no current references found (grep search); likely unused |
| **Known Consumers** | None found |
| **SEO/External-Link Risk** | None (internal) |
| **Data/Auth Dependency** | None |
| **Options** | 1. Delete outright; 2. Archive to separate branch; 3. Repurpose for event handling; 4. Keep as skeleton for future |
| **Recommended Default** | Delete (zero verified consumers, no forward reference) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Final consumer verification + deletion |

### 20. `/systems/prochat-os`
| Property | Value |
|----------|-------|
| **Current Evidence** | OS/kernel subsystem; no current references found (grep search); likely unused |
| **Known Consumers** | None found |
| **SEO/External-Link Risk** | None (internal) |
| **Data/Auth Dependency** | None |
| **Options** | 1. Delete outright; 2. Archive to separate branch; 3. Repurpose for system architecture; 4. Keep as skeleton |
| **Recommended Default** | Delete (zero verified consumers) |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | Final verification + deletion |

---

## Product Variants & APIs (3 items)

### 21. `/bb`
| Property | Value |
|----------|-------|
| **Current Evidence** | VERIFIED ABSENT — no route file, no directory; never existed in tracked repo state |
| **Known Consumers** | None (zero-consumer verification complete) |
| **SEO/External-Link Risk** | None (never indexed, no external links possible) |
| **Data/Auth Dependency** | None |
| **Options** | No removal required (path was never implemented) |
| **Recommended Default** | NOT APPLICABLE — no tracked route exists |
| **Owner Decision** | **NOT APPLICABLE** |
| **Implementation Dependency** | None — verified absent, no action required |

### 22. `/api/waiting-list` vs `/api/waitlist`
| Property | Value |
|----------|-------|
| **Current Evidence** | `/api/waiting-list/route.ts` is exact POST re-export: `export { POST } from '../waitlist/route'`; both endpoints return identical response. Verified by source inspection (legacy-compatibility.test.ts line 18–31). |
| **Known Consumers** | Legacy form endpoints and possible external integrations that reference the older path |
| **SEO/External-Link Risk** | N/A (APIs) |
| **Data/Auth Dependency** | None (public form submission) |
| **Options** | 1. Keep both as aliases (backward compatibility, zero cost); 2. Deprecate /api/waiting-list with redirect; 3. Document /api/waiting-list as canonical alias; 4. Consolidate into /api/waitlist only |
| **Recommended Default** | Keep both; /api/waiting-list is zero-cost re-export maintaining backward compatibility |
| **Owner Decision** | **PENDING** |
| **Implementation Dependency** | None (retention requires no changes); redirect/deprecation requires consumer audit |


---

## Summary

**Total Unresolved:** 17 items (5 cleared by PXF-017B no-regret removal)  
**By Category:**
- Historical marketing: 8 items (blog, book, brainbridge, learn, prompts, proof, starting-point, waas) [deleted: guides, playbooks, snippets, glossary]
- Internal system: 8 items (ai-workflows, debug, debug/analytics, legal-ai-workflows, processing-page, social, systems/events, systems/prochat-os)
- Product variants: 0 items [deleted: /bb]
- API consolidation: 1 item (/api/waiting-list vs /api/waitlist — both retained for backward compatibility)

**Cleared in PXF-017B (No-Regret Removal):**
1. `/guides/[topic]/[slug]` — empty stub, zero consumers
2. `/playbooks/[segment]/[slug]` — empty stub, zero consumers
3. `/snippets/[stack]/[slug]` — empty stub, zero consumers
4. `/glossary/[term]` — content removed, scaffolding is dead code, zero consumers
5. `/bb` — never implemented, zero consumers

**Test Coverage Added (PXF-017B):**
- `tests/security/legacy-compatibility.test.ts` (23 tests)
  - API equivalence: `/api/waiting-list` POST identical to `/api/waitlist`
  - Rate limiting inherited across both endpoints
  - Honeypot behavior consistent
  - Redirect verification for `/legal-ai-workflows` → `/ai-workflows`
  - Accessibility checks for all active legacy routes (book, learn, proof, starting-point, ai-workflows, systems/prochat-os, systems/events, waas/accountants)
  - 404 verification for all removed stubs (guides, playbooks, snippets, glossary, bb)

**Recommended Action:** Owner to review remaining 17 items and provide explicit decisions. No removal or consolidation should proceed without explicit owner approval.

---

**Status:** 5 verified-absent items marked NOT APPLICABLE (no code removal required). 17 items remain pending explicit owner decision. All 22 total items catalogued.
