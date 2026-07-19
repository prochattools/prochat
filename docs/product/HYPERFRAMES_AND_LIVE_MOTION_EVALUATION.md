# HyperFrames and Live Motion Evaluation

**Status:** DECISION RECORDED  
**Decision date:** 2026-07-19  
**Strategic authority:** Mind repository  
**Execution authority:** ProChat repository

## Decision summary

HyperFrames is valuable for ProChat, but it should **not** become the runtime engine for the public website's live section backgrounds or the Nexus-style hero animation.

Use HyperFrames for:

- deterministic marketing-video production;
- product-launch clips;
- social assets;
- motion studies and storyboards;
- rendered demonstrations of the Memory Visual Language;
- repeatable CI-rendered video assets where a video is genuinely required.

Do not use HyperFrames as the default runtime mechanism for:

- the homepage hero background;
- live section illustration animation;
- scroll-linked website diagrams;
- interactive web motion;
- semantic SVG state transitions.

The live website should use browser-native techniques directly:

- CSS animation;
- SVG animation;
- Web Animations API;
- Framer Motion where already installed and appropriate;
- custom Canvas/WebGL where the visual cannot be achieved efficiently otherwise.

## Why HyperFrames is not the hero-animation runtime

HyperFrames is designed to turn HTML, CSS, media, and seekable animation timelines into deterministic video frames and MP4 output. Its main value is production and rendering, not replacing a website's normal live rendering stack.

Although an embeddable player exists, using a rendered-composition player for the primary hero would add a separate playback/runtime abstraction where direct browser animation is simpler, more accessible, easier to integrate, and more responsive.

The hero must remain:

- real-time;
- responsive to viewport size;
- lightweight;
- accessible;
- compatible with reduced motion;
- independent of pre-rendered video;
- visually meaningful when animation is disabled.

## Nexus reference finding

The supplied Nexus reference is not merely a static SVG.

Its hero visual language uses:

- a custom WebGL shader background;
- GSAP-animated floating or skeuomorphic nodes;
- orbital SVG paths;
- a narrow central luminous field;
- restrained depth and glow.

Therefore, matching the Nexus hero requires a dedicated live-motion implementation and visual calibration. The current CSS stream implementation is a useful foundation, but it is not yet a one-to-one motion-fidelity match.

## Copyright and reuse boundary

Do not copy or extract proprietary source code, shaders, assets, or animation logic from the reference unless the license and reuse permission are verified.

The approved approach is to recreate the perceived behavior using original code and the ProChat Memory Visual Language.

Visual behavior may be studied:

- motion rhythm;
- density;
- direction;
- composition;
- glow;
- depth;
- node behavior;
- responsiveness.

Implementation must remain original.

## Current ProChat motion state

The current homepage hero uses CSS-driven:

- vertical memory streams;
- evidence nodes;
- central glow;
- grid and dotted edge texture;
- reduced-motion suppression.

This implementation is:

- lightweight;
- accessible;
- stable;
- compatible with the current design system.

It is not yet sufficient for the owner's desired Nexus-level moving laser/shader effect.

## Recommended live hero architecture

Create an isolated motion component:

```text
src/app/(marketing)/components/motion/MemoryLaserField.tsx
```

Preferred architecture:

```text
semantic static fallback
+ live WebGL/canvas layer
+ optional SVG node/orbit layer
+ HTML hero content above
```

The component should:

- render behind the hero copy;
- preserve the existing static background and card cluster;
- use one narrow vertical luminous field;
- animate evidence particles or memory fragments toward a structured core;
- use original shader or canvas code;
- pause or simplify when off-screen;
- disable live animation under `prefers-reduced-motion`;
- reduce density and GPU load on mobile;
- survive WebGL initialization failure;
- avoid blocking first contentful paint;
- avoid adding semantic meaning unavailable in HTML.

## Technique decision spike

Before selecting a permanent implementation, compare three original prototypes:

### Prototype A — Enhanced CSS/SVG

Use existing CSS, SVG paths, filters, and Framer Motion.

Advantages:

- no new dependency;
- simplest accessibility and responsive behavior;
- easiest reduced-motion handling;
- lowest operational risk.

Risk:

- may not reach the desired shader depth or laser fidelity.

### Prototype B — Raw Canvas/WebGL shader

Use a small custom WebGL canvas with an original fragment shader.

Advantages:

- closest match to the narrow laser/light-field effect;
- precise control;
- no large framework required.

Risk:

- shader expertise;
- browser/GPU testing;
- more complex fallback and cleanup.

### Prototype C — Small WebGL helper

Use a small purpose-built WebGL layer only if the raw implementation becomes unnecessarily complex.

Advantages:

- better authoring ergonomics.

Risk:

- new dependency and bundle cost.

Do not add `three`, GSAP, OGL, HyperFrames, or another runtime dependency until the spike measures the value and cost.

## Acceptance criteria for live hero motion

The selected approach must:

1. visually approach the Nexus reference's narrow luminous WebGL field;
2. remain clearly ProChat Memory-specific;
3. preserve readable hero content;
4. add no layout shift;
5. produce no console or WebGL errors;
6. degrade to the existing static background;
7. support reduced motion;
8. support 320px width;
9. remain smooth on representative mobile and desktop hardware;
10. keep the hero meaningful without animation;
11. avoid continuous main-thread layout work;
12. meet agreed performance budgets.

## Performance budgets

Initial targets:

```yaml
additional_initial_js_gzip: <= 35KB_target
hero_animation_lcp_regression: <= 150ms_target
mobile_frame_rate: >= 45fps_target
desktop_frame_rate: >= 55fps_target
layout_shift: 0
webgl_contexts: 1_max
continuous_cpu_when_offscreen: approximately_zero
```

If the WebGL implementation cannot meet the budgets, retain or improve the CSS/SVG solution.

## Section-motion policy

Do not place independent animated backgrounds behind every section.

Use a motion hierarchy:

1. Hero: persistent ambient motion.
2. Major system chapter: one-time connected narrative reveal.
3. Benefit illustrations: restrained one-time reveals.
4. Product introductions: limited localized movement.
5. Supporting sections: mostly static.

This preserves hierarchy, performance, and visual restraint.

## HyperFrames roadmap role

HyperFrames should be added as a future optional production capability:

```text
PXF-MOTION-VIDEO-001 — ProChat Motion Asset Pipeline
```

Possible deliverables:

- install HyperFrames skills for Codex or another coding agent;
- translate `DESIGN.md` and the Memory Visual Language into `frame.md`;
- create a reusable ProChat video composition kit;
- render product introduction clips;
- create repository launch videos;
- create social media motion assets;
- create deterministic visual-regression samples for motion direction.

This packet is not required for the live website launch.

## Execution order

```text
PXF-003C complete
→ PXF-003C1 live hero motion fidelity spike
→ owner selects live technique
→ implement and validate selected hero motion
→ PXF-003D product introduction
→ later optional HyperFrames motion-video pipeline
```

## Final recommendation

Adopt HyperFrames later as the **motion-content production system**.

Do not adopt it as the **live homepage animation runtime**.

Insert a bounded live hero motion spike now because the owner explicitly requires the Nexus-style animated laser field and the current CSS implementation does not yet provide equivalent fidelity.
