# A2 Review Gate — HyperFrames Cinematic Direction V3

**Scope:** isolated HyperFrames authoring for the approved Home V2 hero. This file does not replace repository `DESIGN.md`.

## Reference Standard

Use the uploaded/current Cloudflare homepage as the quality reference for cinematic confidence, full-frame composition, subtle depth, dense technical atmosphere, and motion restraint. Do not copy Cloudflare assets, colors, text, illustrations, or code.

The previous A2 POC proved the technical pipeline, but its visual language is too flat: fixed camera, stacked cards, dark UI-on-dark UI, and obvious software rectangles. V3 must feel like a composed product film rather than an animated dashboard screenshot.

## Physical Scene

A reviewed-memory system is being inspected on a large dark technical display in a dim studio. Evidence exists at different depths, a precise review plane divides provisional from durable state, and a restrained cobalt light source grows as the system resolves. The viewer should feel spatial organization and deliberate state change, not spectacle.

## Style

- cinematic technical editorialism;
- one continuous composition, not a slideshow;
- deep near-black canvas with cool tinted neutrals;
- ProChat cobalt as the only saturated accent;
- product-grounded records and provenance labels;
- strong internal grid/framing lines at very low contrast;
- extreme hierarchy between major title/system state and tiny metadata;
- selective brightness, not global glow;
- crisp 1px geometry, restrained 2–4px radii for genuine UI surfaces;
- no floating-card collage.

## Frame Architecture

Use four simultaneous depth planes:

1. **Atmosphere plane** — low-contrast dot/grid field and a cobalt horizon bloom, moving only 1–2% across the shot.
2. **Evidence plane** — evidence fragments presented as clipped record strips, timelines, and provenance lines rather than identical cards.
3. **Review plane** — one vertical review boundary with state labels and a controlled scan/light transition.
4. **Durable-memory plane** — a large structured workspace that resolves from the evidence geometry instead of appearing as a separate card.

The camera remains deterministic but should *feel* cinematic through synchronized scale/parallax:

- opening: slight 1.025→1.0 settle;
- review phase: evidence plane translates 50–90px while atmosphere moves 8–16px;
- resolution: workspace grows from 0.94→1 with copy receding 12–18px;
- no shake, bounce, elastic, random drift, or looping.

## Narrative Timing — 6.4 seconds target

### 0.0–1.4s — Evidence field
- Begin already visually rich; no empty opening frame.
- Editorial headline resolves first.
- Three evidence fragments occupy different vertical/depth positions.
- Provenance rails and small metadata are visible but secondary.

### 1.4–3.4s — Review decision
- Review boundary brightens from quiet cobalt to clear state.
- Relevant evidence aligns toward the boundary.
- Rejected/superseded evidence remains on the provisional side and visibly recedes.
- No element crosses through another readable text zone.

### 3.4–5.4s — Durable memory resolves
- Evidence geometry morphs/spatially resolves into the durable-memory workspace.
- Approved records inherit the same labels so provenance continuity is obvious.
- Workspace uses large negative space and internal rails, not nested cards.

### 5.4–6.4s — Resting final state
- Motion settles completely.
- Final frame must work as the reduced-motion still and as the hero resting frame.
- The brightest point is the trusted/ready state, not decorative background light.

## Color

- Deep canvas: `#090d13`
- Secondary canvas: `#0d131d`
- Raised technical surface: `#121a26`
- Fine frame line: `rgba(190, 207, 255, 0.15)`
- Text: `#f5f7fa`
- Secondary text: `#b6c0cd`
- Muted metadata: `#78869b`
- ProChat cobalt: `#3158c7`
- Cobalt light: `#7d9af2`
- Cobalt highlight: `#a8bcff`
- Success: `#56b98e`
- Rejected: `#c46d68`

## Typography

- Golos Text for primary copy.
- JetBrains Mono only for provenance, timestamps, state, hashes, and rails.
- Headline: tight tracking and high scale contrast.
- Metadata must remain readable at 1920×1080 and may become texture on mobile when the final video is cropped.

## Motion Rules

- GSAP timeline must remain synchronous, paused, deterministic, and seek-safe.
- Animate only transform/opacity/filter-like deterministic visual properties supported by HyperFrames.
- Prefer `power2.out`, `power3.out`, and linear scrub-safe motion; no bounce/elastic.
- No overlapping GSAP tweens on the same property unless explicitly intentional and lint-clean.
- No `Math.random`, time-based randomness, async state changes, or callbacks that mutate content during seeks.
- All intermediate samples must pass HyperFrames layout checking without broad suppression markers.

## HyperFrames Quality Gate

Required before render:

- `hyperframes@0.7.102 lint`: 0 errors, 0 warnings
- `hyperframes@0.7.102 check`: 0 genuine layout errors
- no `data-layout-allow-*` blanket suppressions
- contact sheet at opening / review / midpoint / resolution / final
- final H.264 + VP9 short-GOP delivery benchmark
- final still generated from the resting state

## What NOT to Do

- no laser fields;
- no particle clouds;
- no generic floating cards;
- no glowing AI orb/blob;
- no purple/blue AI gradient;
- no neon cyberpunk;
- no nested-card dashboard screenshot look;
- no repeated rounded rectangles as the primary composition;
- no random movement;
- no fake product screenshot;
- no motion whose only purpose is “more animation.”

## Success Test

A still frame from any major moment should look like a premium product-film composition even with motion disabled. The animation should add narrative continuity and depth, not rescue a weak still design.
