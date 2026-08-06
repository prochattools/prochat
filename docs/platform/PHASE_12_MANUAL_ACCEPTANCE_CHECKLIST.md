# Phase 12 Manual Acceptance Checklist — Production Craft and Launch Validation

**Created:** 2026-08-06  
**Status:** Automated evidence: COMPLETE. Manual evidence: NOT YET EXECUTED  
**Scope:** Screen reader, zoom, high-contrast, orientation, manual cross-browser review, field RUM/INP

---

## Executive Summary

Phase 12 production craft and launch validation has TWO parts:

1. **Automated evidence (COMPLETE)** — Playwright/Axe tests, responsive layout audit, CI validation
2. **Manual evidence (NOT YET EXECUTED)** — Screen reader, 200% zoom/reflow, high-contrast, orientation, field RUM/INP

This checklist documents the manual evidence that remains deferred.

---

## Automated Evidence (COMPLETE — Do not re-execute)

| Test | Tests | Evidence | Status |
|---|---:|---|---|
| Browser smoke tests (canonical routes) | 20 | All 8 canonical routes at desktop/mobile pass HTTP, pathname, main, h1 checks | ✓ COMPLETE |
| Accessibility (Axe WCAG 2.x) | 19 | 8 routes × 2 viewports; zero critical/serious violations reviewed | ✓ COMPLETE |
| Docs-mobile layout | 6 | 390px, 320px viewport; layout reflow, focus traversal, reduced-motion | ✓ COMPLETE |
| Chrome/shell proof | 26 | First-paint black, navigation/footer presence, no transitions, geometry, client nav | ✓ COMPLETE |
| **Total automated** | **66** | **All passing; all production-required** | ✓ COMPLETE |

---

## Manual Evidence Required (NOT YET EXECUTED)

### 1. Screen Reader Testing

| Item | Routes | Reviewer | Status | Notes |
|---|---|---|---|---|
| NVDA review | /, /memory, /memory-qa, /workbench | Not executed | NOT YET EXECUTED | Windows screen reader; check headings, landmarks, form labels, product visual descriptions, footer structure |
| JAWS review | Same 4 routes | Not executed | NOT YET EXECUTED | Windows premium screen reader; verify navigation, focus management, list markup, link purpose |
| VoiceOver review | Same 4 routes | Not executed | NOT YET EXECUTED | macOS/iOS screen reader; verify navigation, rotor support, gesture handling |

**Checklist for screen reader review:**
- [ ] Heading hierarchy makes sense (H1 → H2 → H3, no skips)
- [ ] All landmarks present and correct (nav, main, contentinfo)
- [ ] Form labels associated and read correctly
- [ ] Product illustrations have semantic alt text or ARIA descriptions
- [ ] Footer links are discoverable and labeled
- [ ] Navigation menu keyboard traversal and menu state announcement
- [ ] Skip link present and reachable (docs: verified suppressed; others: present and functional)
- [ ] No orphaned text or confusing pauses
- [ ] Reduced-motion preference respected

---

### 2. 200% Zoom / Reflow Testing

| Item | Viewports | Reviewer | Status | Notes |
|---|---|---|---|---|
| 200% zoom | 1440w→700w, 768w→384w, 390w→195w | Not executed | NOT YET EXECUTED | Browser zoom level 200%; no horizontal scroll; text readable |
| 200% zoom mobile | 390w, 320w at 200% | Not executed | NOT YET EXECUTED | Mobile-device 200% zoom; responsive behavior; touch targets ≥44×44 CSS px |
| Reflow (responsive text zoom) | All canonical routes | Not executed | NOT YET EXECUTED | OS/browser text scaling; no layout breakage below 150% |

**Checklist for zoom/reflow review:**
- [ ] No horizontal scroll at 200% zoom on any route
- [ ] Text remains readable at 200% (no cut-off, illegible size, or overlap)
- [ ] Layout reflows gracefully (single column where appropriate)
- [ ] Touch targets remain ≥44×44 CSS px at 200%
- [ ] Forms remain usable (inputs visible, labels readable, buttons clickable)
- [ ] Images/illustrations scale or remain visible
- [ ] Navigation remains accessible and usable
- [ ] No critical content hidden by zoom

---

### 3. High Contrast / Forced Colors Testing

| Item | Browsers | Reviewer | Status | Notes |
|---|---|---|---|---|
| Windows High Contrast mode | Chrome, Edge, Firefox | Not executed | NOT YET EXECUTED | Black-on-white or user-selected scheme; check borders, focus states |
| Forced colors (CSS) | Chrome, Edge (Chromium) | Not executed | NOT YET EXECUTED | `:forced-color-adjust` behavior; focus/active states visible |
| Dark mode system setting | macOS, Windows | Not executed | NOT YET EXECUTED | OS dark-mode toggle; CSS media query `prefers-color-scheme` behavior |

**Checklist for high-contrast review:**
- [ ] Focus indicators remain visible in high-contrast mode
- [ ] All text remains readable (sufficient contrast persists)
- [ ] Icons and visual indicators are visible (not eliminated by forced colors)
- [ ] Product illustrations remain distinguishable
- [ ] Links are visibly different from surrounding text
- [ ] Form inputs and states are visible
- [ ] Buttons and CTAs remain clickable and identifiable
- [ ] Footer and navigation remain accessible

---

### 4. Orientation / Responsive Breakpoint Testing

| Item | Devices | Reviewer | Status | Notes |
|---|---|---|---|---|
| Portrait orientation | iPhone (390w), iPad (768w) | Not executed | NOT YET EXECUTED | Portrait swap; layout reflow; form usability |
| Landscape orientation | iPhone (844w), iPad (1024w) | Not executed | NOT YET EXECUTED | Landscape swap; hero visibility; navigation menu collapsing |
| Tablet/laptop responsive | All breakpoints (320, 390, 768, 1024, 1440w) | Not executed | NOT YET EXECUTED | Smooth transitions between viewport widths |

**Checklist for orientation/responsive review:**
- [ ] Portrait mode: all content accessible without horizontal scroll
- [ ] Landscape mode: layout usable (hero visible, nav accessible, forms functional)
- [ ] Orientation change (rotate device): layout reflows without page reload
- [ ] Touch targets remain ≥44×44 CSS px across all orientations
- [ ] Images/hero background adapt gracefully
- [ ] Navigation collapse/expand works smoothly
- [ ] Form inputs remain usable in all orientations

---

### 5. Manual Cross-Browser Review

| Browser | Desktop | Mobile | Reviewer | Status |
|---|---|---|---|---|
| Chrome/Chromium | 1440w | 390w | Not executed | NOT YET EXECUTED |
| Safari (macOS) | 1440w | 390w | Not executed | NOT YET EXECUTED |
| Firefox | 1440w | 390w | Not executed | NOT YET EXECUTED |
| Edge (Chromium) | 1440w | 390w | Not executed | NOT YET EXECUTED |
| Safari (iOS) | — | 390w | Not executed | NOT YET EXECUTED |

**Checklist for cross-browser review:**
- [ ] Page loads without errors (console clean)
- [ ] Fonts render correctly (Golos Text, JetBrains Mono weight/style)
- [ ] Colors match brand (ProChat Cobalt, grayscale tokens)
- [ ] Motion smooth and not jittery
- [ ] Forms submit without errors
- [ ] Navigation functions correctly
- [ ] No layout shifts during load
- [ ] Images load and display correctly
- [ ] Links navigate correctly
- [ ] Reduced-motion respected

---

### 6. Field RUM / INP Evidence (Real User Monitoring)

| Metric | Target | Evidence | Status | Notes |
|---|---|---|---|---|
| INP (Interaction to Next Paint) | ≤200ms | Field RUM instrumentation | NOT YET EXECUTED | Requires production analytics setup; not available from Lighthouse lab testing |
| FID (First Input Delay) | ≤100ms | Field RUM instrumentation | NOT YET EXECUTED | Chrome User Experience Report or custom analytics |
| LCP (Largest Contentful Paint) | ≤2.5s | Lighthouse lab + field | ✓ PARTIAL | Lab: 2.4–3.5s across routes; field evidence deferred |
| CLS (Cumulative Layout Shift) | ≤0.1 | Lighthouse lab + field | ✓ PARTIAL | Lab: 0.000; field evidence deferred |

**Checklist for field RUM/INP preparation:**
- [ ] RUM library selected and configured (e.g., web-vitals npm package, Datadog, New Relic, custom analytics)
- [ ] INP instrumentation deployed to production
- [ ] Field data collection consent and privacy policy updated
- [ ] Baseline FID/LCP/CLS collected over 1–2 weeks
- [ ] INP regression threshold defined (≤200ms or team threshold)
- [ ] Field data dashboard created (visible to team)
- [ ] Alert/notification set for INP degradation

**Note:** Lighthouse provides lab TBT (Total Blocking Time) as a diagnostic proxy for INP, not a direct measurement. True INP requires field data.

---

## Deferred/Out of Scope

The following items were explicitly identified as out of Phase 12 scope but remain valid continuous-governance work:

- [ ] WCAG 2.2 AA audit (formal third-party review)
- [ ] Performance optimization beyond current Lighthouse baseline
- [ ] Long-session memory leak testing (sustained multi-route navigation)
- [ ] Accessibility tree deep-review with screen reader vendors
- [ ] Compliance with ATAG 2.0 or WAI-ARIA authoring practices
- [ ] A11y superpower review (complete accessible description of all imagery)

---

## Completion Criteria

Phase 12 manual evidence is COMPLETE when:

1. **Screen reader review** — All three screen readers (NVDA, JAWS, VoiceOver) pass the manual checklist on all four canonical product routes
2. **200% zoom/reflow** — No horizontal scroll; all text readable; touch targets ≥44px; forms usable at 200% and 150% text scale
3. **High-contrast** — Focus states visible; sufficient contrast; product illustrations distinguishable in forced-colors mode
4. **Orientation** — Portrait and landscape render correctly; touch targets ≥44px; no horizontal scroll; nav/forms functional
5. **Cross-browser** — All five target browsers (Chrome, Safari desktop, Firefox, Edge, Safari iOS) render correctly; no console errors; navigation/forms work
6. **Field RUM/INP** — One week of production field data collected; baseline INP ≤200ms (or team decision); regression alerts active

---

## Sign-Off

**Reviewer:** [To be filled in when manual evidence is complete]  
**Date completed:** [To be filled in when manual evidence is complete]  
**Status:** NOT YET EXECUTED (awaiting owner decision to prioritize manual testing)  
**Next review:** Quarterly Phase 13 governance cycle

---

**Note:** This checklist captures the manual evidence that remains deferred after PXF-017 deployment. Phase 12 remains PARTIAL until this manual evidence is collected and reviewed.
