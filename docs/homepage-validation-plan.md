# ProChat Homepage Validation Plan

**Status:** approved pre-build quality plan  
**Applies to:** prototypes, production implementation, and release readiness

The homepage is not complete when it looks impressive on one desktop viewport. It is complete when product comprehension, visual quality, motion, accessibility, performance, responsiveness, and claim safety all pass defined checks.

## Validation layers

```text
1. product truth
2. comprehension
3. visual quality
4. responsive design
5. motion behavior
6. accessibility
7. performance
8. browser compatibility
9. conversion flow
10. production safety
```

## 1. Product-truth validation

Review every section against:

- `PRODUCT.md`
- canonical Mind product strategy
- canonical homepage copy
- claim boundaries

Check that:

- ProChat has exactly two products;
- Memory remains the flagship;
- Memory for QA is an edition, not a third product;
- Workbench remains the second product;
- current evidence remains stronger than stored memory;
- human review precedes trusted memory;
- local storage claims remain precise;
- visuals do not imply unsupported integrations, encryption, customer results, or automation.

Any visual implication counts as a claim.

## 2. Comprehension testing

### Five-second hero test

Show the static first hero state for five seconds.

Ask:

1. What does ProChat do?
2. What is the main product?
3. What happens to project knowledge?
4. Who decides what becomes trusted?
5. What can someone use today?

Passing summary:

> ProChat keeps reviewed project knowledge reusable in local memory. Its flagship is ProChat Memory, and the current edition is for QA.

Target:

- at least 4 of 5 test participants identify the flagship and core problem;
- at least 3 of 5 identify human review and current QA availability;
- no participant describes ProChat as only a chatbot, note-taking app, or autonomous agent.

### Section comprehension

After each cinematic chapter, ask the visitor to explain the state change.

The explanation should match the product mechanism without requiring the accompanying paragraph.

## 3. Visual-quality review

Evaluate each chapter at:

- initial state;
- middle state;
- final state;
- mobile state;
- reduced-motion state.

Review criteria:

- focal point;
- hierarchy;
- typography;
- line wrapping;
- spacing rhythm;
- alignment;
- product realism;
- consistency;
- cobalt restraint;
- border and depth quality;
- absence of generic AI patterns;
- visual continuity;
- CTA clarity.

A chapter fails if it requires animation to hide a weak static composition.

## 4. Responsive matrix

Required screenshot sizes:

```text
360×800
390×844
768×1024
1024×768
1280×800
1440×900
1728×1117
```

Check:

- no horizontal overflow;
- no unreadable scaled product UI;
- no clipped headline or CTA;
- no overlap that conceals content;
- stable transitions around breakpoints;
- readable product metadata;
- sufficient touch targets;
- purpose-built mobile scenes;
- no desktop pinning assumptions on mobile.

## 5. Motion validation

### Functional checks

For every cinematic sequence:

- scroll forward through all named states;
- scroll backward through all named states;
- jump into the middle through direct navigation or restored scroll;
- resize while inside the section;
- rotate a touch device;
- navigate away and back;
- verify all ScrollTriggers clean up;
- verify no pin spacing jump;
- verify no hidden interactive element receives focus.

### Motion-quality checks

Review:

- motion purpose;
- timing;
- easing;
- continuity;
- reversibility;
- perceived weight;
- reading stability;
- over-animation;
- missing transitions;
- consistency between chapters.

### Reduced motion

With `prefers-reduced-motion: reduce`:

- no pinning;
- no scrubbed object travel;
- no parallax;
- no autoplay loop;
- every product conclusion remains visible;
- the page remains visually designed rather than degraded.

## 6. Accessibility validation

Minimum standard:

```text
WCAG 2.2 AA
```

Manual checks:

- keyboard-only navigation;
- visible focus;
- logical heading order;
- logical DOM reading order;
- screen-reader labels for product-state summaries;
- accordions and dialogs announce state;
- no state communicated only by color;
- 200% zoom;
- high text contrast;
- meaningful graphical-object contrast;
- touch targets;
- no content loss with CSS animation disabled.

Automated checks:

- Playwright tests;
- `@axe-core/playwright`;
- HTML validation where available;
- contrast checks;
- accessibility tree snapshots for critical sections.

Automated checks supplement manual review and do not replace it.

## 7. Performance validation

Targets:

```yaml
LCP_seconds: 2.5
INP_ms: 200
CLS: 0.1
hero_media_initial_kb: 250
above_fold_transfer_kb: 700
pinned_chapters_max: 4
total_scroll_triggers_target_max: 24
```

Measure:

- production build output;
- JavaScript bundles;
- GSAP chunk size;
- font transfer;
- hero render timing;
- layout shift during font and animation initialization;
- long tasks during scroll;
- dropped frames on a mid-range mobile profile;
- memory growth after repeated route transitions;
- interaction latency for navigation, accordions, and CTAs.

Tools:

- Next bundle analyzer;
- browser Performance panel;
- Lighthouse;
- Web Vitals instrumentation;
- Playwright traces;
- mobile CPU and network throttling.

## 8. Browser and input matrix

Browsers:

- current Chrome;
- current Safari;
- current Firefox;
- current Edge.

Inputs:

- mouse wheel;
- trackpad;
- keyboard;
- touch;
- screen reader where available.

Preferences:

- standard motion;
- reduced motion;
- light mode;
- approved dark technical panels.

## 9. Visual regression testing

Use Playwright screenshot assertions.

Create deterministic visual states rather than screenshotting arbitrary points during an active animation.

Each cinematic component should support a development/test state parameter:

```text
?visualState=current-evidence
?visualState=human-review
?visualState=approved-memory
```

Alternatively, expose internal test helpers only in development and test builds.

Required baselines:

- hero initial, review, and focused-context states;
- Memory lifecycle evidence, review, approved, and retired states;
- context-selection workspace and focused states;
- QA failed-test, investigation, approved-lesson, and later-use states;
- Workbench request, validation, and committed states;
- mobile scenes;
- reduced-motion scenes;
- FAQ expanded state;
- focus-visible state;
- error or blocked status where shown.

## 10. Conversion validation

Validate actions and destinations:

- Explore ProChat Memory for QA
- Join the selected QA beta
- See how Memory works
- Explore ProChat Workbench

Check:

- CTA label predicts the destination;
- no dead or legacy routes;
- navigation and footer use current product names;
- beta form asks only necessary questions;
- form validation is understandable;
- success and failure states exist;
- analytics events are named consistently;
- no conversion flow implies immediate paid availability.

## 11. Content and metadata validation

Review:

- title;
- meta description;
- canonical URL;
- Open Graph title and image;
- social description;
- heading hierarchy;
- link text;
- alt text;
- structured data where relevant;
- sitemap routes;
- robots behavior for design-lab routes.

The design-lab route must not appear in public navigation, sitemap, or search indexing.

## 12. Production-safety validation

Before merge:

- no debug ScrollTrigger markers;
- no design-lab links in production navigation;
- no prototype query controls exposed publicly;
- no real customer or client data in examples;
- no unsupported claims;
- no accidental public Git references to sensitive memory;
- no console errors;
- no hydration warnings;
- no unbounded animation listeners;
- no unrelated changes staged;
- all dependencies have reviewed licenses and versions;
- production build passes.

## Skill-based review sequence

```text
/plan-design-review
→ before production implementation

/design-motion-principles
→ after each cinematic prototype

/redesign-skill + /code
→ during integration

/design-review
→ against the assembled running site

/impeccable audit + polish + harden
→ final production-quality pass
```

## Release gates

### Gate A — Foundation

Pass when:

- tokens and typography are approved;
- color contrast passes;
- desktop and mobile specimens exist.

### Gate B — Hero

Pass when:

- five-second comprehension passes;
- static and animated states are approved;
- reduced motion and mobile are complete;
- performance proof is acceptable.

### Gate C — Product mechanics

Pass when:

- Memory lifecycle;
- relevant context;
- QA investigation;
- Workbench control plane

all pass product-truth and motion review.

### Gate D — Full-page prototype

Pass when:

- narrative pacing is approved;
- visual consistency is approved;
- all routes and CTAs are correct;
- mobile and reduced motion are coherent.

### Gate E — Production candidate

Pass when:

- build, accessibility, browser, performance, and visual regression tests pass;
- independent design review findings are resolved;
- canonical claim review passes.

## Evidence required at completion

```yaml
release_evidence:
  screenshots:
    - desktop
    - tablet
    - mobile
    - reduced_motion
  tests:
    - type_check
    - production_build
    - playwright_functional
    - playwright_visual
    - axe_accessibility
  performance:
    - lighthouse
    - bundle_report
    - browser_trace
  reviews:
    - product_truth
    - design_review
    - motion_review
    - final_polish
  git:
    - explicit_changed_paths
    - isolated_commits
```
