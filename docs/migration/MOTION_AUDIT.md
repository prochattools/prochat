# ProChat Motion Audit

**Status:** Phase 5 Task 5.3 inventory complete  
**Inventory date:** 2026-07-11  
**Scope:** Framer Motion, CSS keyframes and transitions, observers, scroll and resize listeners, requestAnimationFrame, timers, theme transitions, reduced-motion behavior, smooth scrolling, and legacy visual effects

## Summary

```yaml
candidate_source_files_scanned: 59
actual_motion_or_visibility_sources: 24
operational_timer_or_static_style_sources: 35
framer_motion_direct_sources: 6
css_stylesheet_files_with_motion_signals: 5
intersection_observer_sources: 5
scroll_listener_sources: 3
resize_listener_sources: 2
request_animation_frame_sources: 3
reduced_motion_sources: 4
production_files_changed: 0
motion_behavior_changed: 0
framer_motion_removed: false
gsap_added: false
```

The static scan intentionally over-collected inline style objects, static SVG transforms, email styles, social-image styles, and operational timers. These are classified separately from actual motion so later migration does not confuse all timing or `transform` text with animation.

## Approved clean-slate direction

Legacy motion is not the foundation of the new public platform.

Default migration direction:

- archive legacy reveal, blob, rotating-text, theme-transition, scroll-hint, proof, kit, ProChat OS, BuildFlow, and old Memory motion with their owning legacy surfaces;
- keep only functional motion that is explicitly re-approved;
- use CSS for restrained micro-interactions;
- use GSAP + ScrollTrigger only after static prototype approval for the four approved cinematic stories;
- retain native browser scrolling;
- design complete mobile and reduced-motion compositions;
- do not carry old visual effects forward merely because they already exist.

No production motion was changed in this task.

## Motion architecture discovered

### Framer Motion

Direct source files:

```text
src/app/(marketing)/components/sections/Newsletter.tsx
src/app/(marketing)/components/sections/ProofOperational.tsx
src/app/(marketing)/components/ui/Reveal.tsx
src/app/maintenance/page.tsx
src/app/not-found.tsx
package.json
```

`Reveal` is the main reusable animation wrapper and produces one-time opacity/translate reveals. ProofOperational composes it with additional motion. Maintenance and 404 use page-level motion. Newsletter imports Framer Motion but requires exact source review before deciding whether the import is active or stale.

### CSS keyframes and transitions

- `backgrounds.scss`: several infinite blob and halo keyframes.
- legacy Memory page: embedded keyframes, transitions, observer reveals, and scroll behavior.
- `globals.scss`: universal theme transitions and smooth scrolling.
- Contact CSS: field/button transitions and active scaling.
- docs CSS: broad UI transitions.
- Tailwind config: animation definitions and utility mappings.

### Observer-driven behavior

- ProKit page.
- SaaSKit page.
- legacy Memory page.
- lazy iframe.
- ScrollHintWrapper.

### Scroll and viewport behavior

- legacy Memory page scroll listeners.
- ScrollHintWrapper target scroll dismissal.
- `useScrollDirection` global scroll/resize/RAF loop for mobile Header behavior.
- contact and waitlist pages use requestAnimationFrame for post-hydration or focus/scroll coordination.

### Timer-driven behavior

- RotatingText interval and cleanup timeout.
- theme toggle timeout.
- navigation timeout.
- prompt-copy feedback timeout.
- processing page polling/transition timing.
- admin/debug/analytics timers that are operational rather than visual.

## Framer Motion findings

### `Reveal`

Purpose:

- generic entrance reveal for marketing content.

Behavior:

- `useInView({ once: true })`;
- opacity 0→1;
- translate Y 20→0;
- 0.5-second duration;
- default 0.25-second delay.

Risks:

- no explicit reduced-motion branch;
- broad use across legacy sections;
- every reveal creates client and observer work;
- generic reveal does not explain product state;
- hidden initial content can complicate no-JS or hydration perception.

Decision:

- archive with legacy marketing unless a specific retained page proves need;
- do not use as the new cinematic foundation.

### ProofOperational

Purpose:

- animate legacy SaaS operational proof.

Risks:

- legacy product content;
- Framer Motion plus Reveal composition;
- animated logs and decorative proof behavior;
- no relevance to the current two-product platform.

Decision:

- archive with legacy proof content.

### Maintenance and 404

Purpose:

- animated page-state presentation.

Decision:

- replace with canonical error/unavailable states; retain only if the new state design explicitly approves motion.

### Newsletter

Purpose:

- legacy mailing-list section.

Decision:

- archive current implementation. Future mailing-list functionality must be rebuilt against the new form, privacy, and email architecture.

## CSS animation systems

### Animated blob background system

Mechanisms:

- infinite keyframes;
- blur and mix-blend-mode;
- transform and border-radius animation;
- purple, cyan, and blue gradients;
- `will-change`;
- fixed full-page backdrop;
- separate light/dark assets.

Purpose:

- atmospheric visual movement.

Decision:

- archive. It is decorative, costly, and contradicts the restrained grayscale/cobalt direction.

### Global theme transition system

Mechanisms:

- 650ms background, text, and border transitions on all elements and pseudo-elements;
- radial overlay scale and opacity;
- smooth scrolling;
- ThemeToggle timeout and media-query handling.

Risks:

- whole-application transition cost;
- unexpected animation of state changes;
- delayed feedback;
- broad reduced-motion burden;
- dependency on the legacy dark/theme system.

Decision:

- replace and archive. New micro-interactions must be local and purposeful.

### Legacy Memory page system

Mechanisms:

- embedded 69KB CSS string;
- page-level Google Fonts;
- keyframes and transitions;
- IntersectionObserver reveals;
- scroll listener;
- JavaScript reduced-motion matchMedia;
- CSS reduced-motion media queries;
- inline styles and layout transforms.

Decision:

- archive the entire old page implementation after canonical `/memory` replacement. Do not extract its motion as the new foundation.

### RotatingText

Mechanisms:

- interval every 4 seconds by default;
- width measurement and animated width;
- resize listener;
- font-ready measurement;
- timeout cleanup;
- reduced-motion branch.

Risks:

- animates width, a layout property;
- repeated text motion without essential product meaning;
- resize and interval work;
- complex hidden measurement DOM.

Decision:

- archive unless a future evidence-backed use is approved. It should not appear in the new lean landing page.

## Observer, listener, and cleanup findings

### Good cleanup found

- `useScrollDirection` removes scroll, resize, and media-query listeners.
- RotatingText removes resize/media listeners and clears interval/timeout.
- ScrollHintWrapper disconnects ResizeObserver and IntersectionObserver and removes input listeners.
- Reveal uses Framer Motion lifecycle rather than manual listener management.

### Cleanup or behavior requiring deeper proof

- legacy Memory page observer and scroll cleanup must be verified in the full file before archival.
- ProKit and SaaSKit observer cleanup must be verified, though both owning pages are archival candidates.
- requestAnimationFrame callbacks are not explicitly cancelable in `useScrollDirection`; state safety depends on component lifetime and callback completion.
- contact/waitlist RAF usage requires route-level review.
- global CSS animation loops run continuously while mounted.

### Unbounded work

- infinite blob keyframes;
- RotatingText interval;
- global transitions on all elements;
- global mobile Header scroll listener;
- any continuously mounted theme/background layers.

These are not suitable default behavior for the new lean platform.

## Reduced-motion coverage

### Coverage found

- `globals.scss` disables global transitions and radial overlay transforms.
- `backgrounds.scss` includes reduced-motion handling.
- legacy Memory page includes CSS and JS reduced-motion branches.
- RotatingText renders only the first word under reduced motion.
- ThemeToggle checks reduced-motion preference.

### Gaps

- generic `Reveal` has no explicit reduced-motion branch.
- ProofOperational inherits Reveal behavior without independent handling.
- maintenance and 404 Framer Motion behavior requires exact reduced-motion verification.
- ProKit and SaaSKit observers do not prove reduced-motion behavior.
- Contact and docs transitions do not include local reduced-motion rules.
- ScrollHintWrapper is visibility behavior rather than animation, but its prompt movement/styling needs review.
- Tailwind animation utilities can be used without enforced reduced-motion variants.
- global smooth scrolling can still affect users outside explicit transitions depending on browser interpretation and override order.

## Layout-property animation and paint risk

High-risk properties or effects found:

- RotatingText width animation;
- animated blob border-radius;
- blur and backdrop-filter;
- mix-blend-mode;
- box-shadow transitions;
- large fixed overlays;
- global color transitions;
- page-level layout transforms;
- potentially broad height/position changes in legacy page CSS.

The new motion system must prioritize transform and opacity and avoid animated width, height, margin, padding, font size, top, and left during scroll.

## Protected motion boundaries

Do not remove or alter timing tied to:

- authentication redirects or state;
- checkout, billing, licence, and processing flows;
- admin feedback;
- copy-to-clipboard feedback;
- form focus, submission, and success/error behavior;
- lazy loading;
- analytics retry or script timing;
- email rendering, which uses static inline styles rather than browser motion.

Operational timers must be reviewed by their functional owner and must not be classified as decorative animation solely because they use `setTimeout`.

## Motion records

| ID | Source | Mechanism | Trigger/purpose | Reduced motion | Cleanup | Status | Disposition | Wave | Risk |
|---|---|---|---|---|---|---|---|---:|---|
| MOTION-001 | `src/app/(marketing)/components/ui/Reveal.tsx` | Framer Motion + in-view | generic opacity/Y entrance | missing explicit branch | framework lifecycle | LEGACY GENERIC | ARCHIVE | 3/8 | HIGH |
| MOTION-002 | `src/app/(marketing)/components/sections/ProofOperational.tsx` | Framer Motion + Reveal | legacy proof/log presentation | not explicit | component lifecycle | LEGACY | ARCHIVE | 3/8 | HIGH |
| MOTION-003 | `src/app/(marketing)/components/sections/Newsletter.tsx` | Framer Motion import/use | legacy newsletter | unverified | unverified | LEGACY | ARCHIVE | 6/8 | MEDIUM |
| MOTION-004 | `src/app/maintenance/page.tsx` | Framer Motion | unavailable state | unverified | framework lifecycle | LEGACY STATE | REPLACE | 6/8 | MEDIUM |
| MOTION-005 | `src/app/not-found.tsx` | Framer Motion | 404 presentation | unverified | framework lifecycle | LEGACY STATE | REPLACE | 6/8 | MEDIUM |
| MOTION-006 | `src/assets/styles/backgrounds.scss` | infinite CSS keyframes | decorative blob atmosphere | partial CSS coverage | CSS lifecycle only | LEGACY DECORATIVE | ARCHIVE | 1/8 | HIGH |
| MOTION-007 | `src/assets/styles/globals.scss` | universal transitions + smooth scroll | theme/global appearance | explicit partial rule | CSS lifecycle only | UNSAFE GLOBAL | REPLACE/ARCHIVE | 1/8 | CRITICAL |
| MOTION-008 | `src/app/(marketing)/contact/contact-page.css` | CSS transitions + active scale | field/button feedback | missing local rule | CSS lifecycle | FUNCTIONAL LEGACY | REWRITE | 6/8 | MEDIUM |
| MOTION-009 | `styles/docs.css` | CSS transitions | docs hover/focus UI | missing local rule | CSS lifecycle | LEGACY ADAPTER | ARCHIVE/REWRITE | 6/8 | MEDIUM |
| MOTION-010 | `tailwind.config.ts` | animation utilities | reusable utility animations | usage-dependent | usage-dependent | LEGACY CONFIG | REWRITE | 1/8 | HIGH |
| MOTION-011 | `src/app/prochat-memory/page.tsx` | keyframes, observer, scroll, CSS/JS reduced motion | old Memory page storytelling | present but page-specific | requires full verification | CONTRADICTING LEGACY | ARCHIVE | 4/8 | CRITICAL |
| MOTION-012 | `src/components/RotatingText.tsx` | interval, timeout, width transition, resize | rotating marketing words | explicit static first word | listeners/timers cleaned | DECORATIVE LEGACY | ARCHIVE | 3/8 | HIGH |
| MOTION-013 | `src/app/(marketing)/components/ui/ThemeToggle.tsx` | timeout + radial transition coordination | theme switch | explicit preference check | timeout behavior requires review | LEGACY THEME | ARCHIVE/REPLACE | 1/8 | HIGH |
| MOTION-014 | `src/components/ThemeRadialTransition.tsx` and global overlay classes | CSS transform/opacity | decorative theme reveal | global CSS branch | component/global coupling | LEGACY THEME | ARCHIVE | 1/8 | HIGH |
| MOTION-015 | `src/hooks/useScrollDirection.ts` | scroll + resize + RAF | hide/show mobile Header | no reduced-motion branch | listeners removed | FUNCTIONAL LEGACY | REASSESS | 1/8 | HIGH |
| MOTION-016 | `src/components/ui/ScrollHintWrapper.tsx` | ResizeObserver, IntersectionObserver, scroll/touch/wheel, timeout | one-time overflow affordance | not motion-specific | observers/listeners cleaned | FUNCTIONAL | KEEP/REVIEW | 2/6 | MEDIUM |
| MOTION-017 | `src/components/lazy-load-iframe.tsx` | IntersectionObserver | defer iframe loading | not applicable | verify disconnect | FUNCTIONAL | KEEP | protected/6 | MEDIUM |
| MOTION-018 | `src/app/kits/prokit/ProKitPageContent.tsx` | IntersectionObserver | legacy kit reveals/tracking | missing evidence | verify | LEGACY | ARCHIVE | 6/8 | HIGH |
| MOTION-019 | `src/app/kits/saaskit/SaaSkitPageContent.tsx` | IntersectionObserver | legacy kit reveals/tracking | missing evidence | verify | LEGACY | ARCHIVE | 6/8 | HIGH |
| MOTION-020 | `src/app/(marketing)/contact/page.tsx` | requestAnimationFrame | post-render focus/scroll coordination | not applicable | one-shot | FUNCTIONAL PROTECTED | KEEP/REWRITE WITH FORM | 6 | HIGH |
| MOTION-021 | `src/app/waiting-list/WaitingListBody.tsx` | requestAnimationFrame | form focus/scroll coordination | not applicable | one-shot | LEGACY FUNCTIONAL | ARCHIVE; rebuild future mailing list | 6/8 | HIGH |
| MOTION-022 | `src/components/nav-links.tsx` | timeout | navigation state coordination | not applicable | verify | LEGACY NAV | REPLACE | 1/8 | MEDIUM |
| MOTION-023 | `src/components/prompts/PromptCopyButton.tsx` | timeout | copy-success feedback | not applicable | verify timer cleanup | FUNCTIONAL CONTENT | KEEP/REFACTOR | 6 | LOW |
| MOTION-024 | `src/utils/scroll-to-section.ts` | timeout + scroll coordination | legacy section navigation | unverified | one-shot | LEGACY NAV | ARCHIVE/REPLACE | 3/8 | MEDIUM |
| MOTION-025 | `src/app/processing-page/[[...processing-page]]/page.tsx` | timeout/polling | transactional processing | not applicable | functional review required | PROTECTED | KEEP | protected | CRITICAL |
| MOTION-026 | `src/app/admin/og/AdminOgGenerator.tsx` | timeout | admin feedback | not applicable | verify | PROTECTED | KEEP | protected | HIGH |
| MOTION-027 | `src/app/debug/analytics/page.tsx` | timeout | debug feedback | not applicable | verify | INTERNAL | KEEP/ARCHIVE WITH DEBUG | protected/8 | LOW |
| MOTION-028 | `src/lib/analytics/umami.ts` | timeout/retry | analytics readiness | not applicable | functional review required | PROTECTED | KEEP/REVIEW | protected | CRITICAL |
| MOTION-029 | `src/components/ui/Scaffolding.tsx` | parallax/visual classes | legacy blueprint visual treatment | unverified | CSS/component lifecycle | LEGACY VISUAL | ARCHIVE/REPLACE | 2/8 | HIGH |
| MOTION-030 | page and component inline transforms | static transform/inline style | layout/icon/SVG rendering | not motion | not applicable | STATIC FALSE POSITIVE | classify with owning component | owning wave | LOW |

## Candidate-source classification register

The initial scanner found 59 source files. The following were classified as static inline style, static SVG/image transform, email style, or operational timing rather than independent motion systems:

```text
ProblemSolution.tsx
Visuals.tsx
DocsThemeLayout.tsx
all five legacy FeatureIcon.tsx files
src/app/og/route.ts
privacy-policy/page.tsx
sign-in page
sign-up page
tos page
AboutMe.tsx
Header.tsx
ZeroRisk.tsx
seven email-template sources
heading.tsx
login-payment.tsx
logo.tsx
marketing/HeroSection.tsx
renderSocialImage.ts
prochat-memory-theme.css
waitlist-page.css
```

Their style and component risks remain recorded in the style/component audits. They do not receive separate animation retention decisions unless later source review proves active motion.

## Motion budget implications

The current repository already contains broad client animation and continuously running effects before GSAP is added.

Before introducing cinematic motion:

1. archive or isolate global blob and universal-transition systems;
2. archive legacy Memory and proof motion with their pages;
3. decide whether Framer Motion remains for any protected or micro-interaction use;
4. verify the root client and listener footprint;
5. establish deterministic reduced-motion and screenshot states;
6. measure a clean static baseline;
7. add GSAP only for the approved prototype task.

## Zero-consumer or archive candidates requiring proof

- generic Reveal after legacy marketing archive;
- Newsletter motion;
- RotatingText;
- ThemeRadialTransition and ThemeToggle if public theme switching is removed;
- ScrollHintWrapper if no approved content surface needs it;
- `scroll-to-section.ts`;
- legacy blob keyframes;
- Tailwind legacy animation utilities;
- old Memory page motion;
- ProKit and SaaSKit observer behavior;
- Scaffolding parallax treatment.

No immediate deletion occurred. Archive/removal requires exact consumers, build proof, and protected-flow review.

## Validation required before motion migration

- exact import and consumer search;
- browser behavior capture;
- forward and reverse interaction;
- keyboard and touch review;
- reduced-motion screenshots;
- resize/orientation tests;
- listener and observer cleanup verification;
- Performance panel traces;
- long-task and frame analysis;
- bundle comparison;
- no-JS/static comprehension;
- protected transactional-flow tests;
- zero-consumer proof before archive/removal.

## Unresolved decisions

1. Whether Framer Motion remains installed for any retained protected or micro-interaction component.
2. Whether mobile Header hide/show behavior survives the new lean shell.
3. Whether future mailing-list forms need any motion beyond local CSS feedback.
4. Whether ScrollHintWrapper belongs in current-product documentation.
5. Which protected timers are functional requirements versus historical implementation details.
6. Exact archive boundary for the old Memory page and global background systems.
7. Whether page transitions are excluded entirely from the first launch; current recommendation is yes.
8. Whether public theme switching is removed at launch; current clean-slate direction favors removal.
