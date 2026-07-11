# ProChat Motion Audit

**Status:** canonical audit specification  
**Scope:** Framer Motion, CSS animations, observers, scroll effects, page transitions, reduced-motion behavior, and abandoned experiments

## Purpose

The motion audit identifies every current animation mechanism, its product purpose, accessibility behavior, performance cost, and migration path into the approved ProChat motion system.

Motion is retained only when it explains state, hierarchy, cause, continuity, or control.

## Canonical motion architecture

```yaml
cinematic_scroll: "GSAP + ScrollTrigger + @gsap/react"
micro_interactions: "CSS"
scroll_engine: "native browser scrolling"
product_visuals: "semantic HTML + CSS + SVG"
reduced_motion: "mandatory alternative composition"
```

Existing Framer Motion remains valid for existing surfaces until audited. It must not orchestrate the same component as GSAP.

## Required record

```yaml
id: "MOTION-000"
path: ""
component_or_route: ""
mechanism: "framer-motion | css-keyframes | css-transition | intersection-observer | scroll-listener | other"
current_purpose: ""
trigger: "load | hover | focus | click | in-view | scroll | route"
properties_animated: []
duration_or_scroll_range: ""
consumers: []
product_explanation: ""
reduced_motion_behavior: ""
cleanup_behavior: ""
performance_cost: ""
status: "CURRENT | DUPLICATE | DECORATIVE | LEGACY | UNSAFE | MISSING"
disposition: "KEEP | REFACTOR | REWRITE | REPLACE | DELETE"
canonical_replacement: ""
migration_wave: 0
validation: []
rollback: ""
deletion_approved: false
owner: ""
notes: ""
```

## Inventory targets

Search for:

- `framer-motion` imports;
- `motion.*` components;
- `AnimatePresence`;
- CSS `@keyframes`;
- `animation` and `transition` declarations;
- `IntersectionObserver`;
- scroll and resize listeners;
- requestAnimationFrame loops;
- parallax and transform effects;
- page or route transitions;
- hover-follow and pointer effects;
- autoplay media;
- reduced-motion media queries;
- timers used for visual sequences;
- abandoned animation utilities.

## Classification questions

For every motion item, ask:

1. What product or interaction meaning does it communicate?
2. Does the static state work without it?
3. Can it be implemented with CSS instead?
4. Does it preserve text readability?
5. Does it work with keyboard and touch?
6. Does backward scrolling or reverse interaction restore state?
7. Is cleanup deterministic?
8. What happens under reduced motion?
9. Does it animate layout properties?
10. What is its measured main-thread and frame cost?

If there is no clear answer to the first question, classify the motion as decorative or legacy.

## Retention rules

### Keep

Use for purposeful, accessible micro-interactions that already fit the canonical system.

### Refactor

Use when the purpose is valid but timing, easing, cleanup, accessibility, or property choice is weak.

### Rewrite

Use when a useful interaction is coupled to legacy markup or broad client rendering.

### Replace

Use when a cinematic sequence should move to the approved GSAP architecture after prototype approval.

### Delete

Use for loops, parallax, scroll hijacking, duplicate reveals, typewriter effects, character scrambling, glow motion, or effects without explanatory value.

## Property policy

Preferred:

- transform;
- opacity;
- carefully bounded clip-path;
- short SVG stroke transitions.

Restricted:

- filter;
- box-shadow;
- large-surface color interpolation;
- blur;
- mask complexity.

Avoid during scroll:

- width;
- height;
- top;
- left;
- margin;
- padding;
- font size;
- layout-triggering DOM changes.

## Reduced-motion audit

Every motion record must state whether reduced-motion behavior:

- disables the effect;
- replaces travel with crossfade;
- presents static states;
- preserves all content and actions;
- removes pinning;
- stops autoplay;
- prevents focus from entering hidden content.

A missing reduced-motion behavior is a blocking defect for cinematic production use.

## Performance audit

Measure or estimate:

- initial JavaScript cost;
- timeline and trigger count;
- observers and listeners;
- long tasks;
- dropped frames;
- layout and paint work;
- memory after route transitions;
- mobile CPU cost;
- off-screen work;
- bundle duplication.

## Migration order

1. Audit current motion without changing behavior.
2. Remove clearly unused or duplicate utilities only after consumer proof.
3. Build static replacement compositions.
4. Approve named states and storyboards.
5. Add GSAP only in its authorized prototype batch.
6. Migrate approved cinematic sequences one at a time.
7. Keep Framer Motion isolated on remaining legacy surfaces.
8. Remove Framer Motion only if a separate zero-consumer dependency task proves it unnecessary.

## Validation

- browser recording;
- forward and reverse interaction;
- keyboard and touch checks;
- reduced-motion screenshots;
- resize and orientation tests;
- cleanup after navigation;
- Performance panel trace;
- Playwright deterministic states;
- visual regression;
- import and consumer search before deletion.

## Completion criteria

- every active motion has documented purpose;
- decorative and duplicate effects are removed;
- cinematic sequences use named product states;
- no component mixes GSAP and Framer Motion orchestration;
- reduced-motion behavior is complete;
- native scrolling remains predictable;
- timeline, trigger, and performance budgets are met;
- obsolete motion utilities and dependencies have zero consumers.
