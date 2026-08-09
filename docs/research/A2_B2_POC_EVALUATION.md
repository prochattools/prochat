# A2/B2 Visual + Motion POC Evaluation

**Branch:** `design/cloudflare-motion-poc`  
**Validated at:** `91a4664` (source), final closure pass  
**Status:** technical POC complete; owner visual review required  
**Production homepage:** unchanged

## Artifacts

### Seven deterministic styleframes

Preview surface: `tools/motion-lab/styleframes/index.html`

1. `#a2-raw-evidence` — A2 Raw Evidence
2. `#a2-review-gate` — A2 Review Gate
3. `#a2-structured-memory` — A2 Structured Memory
4. `#b2-task-intent` — B2 Task Intent
5. `#b2-relevance-filtering` — B2 Relevance Filtering
6. `#b2-context-assembly` — B2 Context Assembly
7. `#b2-applied-context` — B2 Applied Context

### B2 live scroll POC

- Surface: `tools/motion-lab/b2/index.html`
- Runtime: GSAP + ScrollTrigger via pinned `3.14.2` CDN scripts
- Layout strategy: CSS `position: sticky` (replaces ScrollTrigger pin; eliminates CLS)
- Scroll: native browser scrolling
- States: Task Intent → Relevance Filtering → Context Assembly → Applied Context
- Reversible: one scrubbed timeline; reverse scroll follows the same timeline backward
- Reduced motion: resolves directly to the applied-context state without scroll choreography
- Cleanup: timeline/trigger killed on `pagehide`; all ScrollTriggers killed
- Diagnostics HUD: rolling FPS, CLS, observed LCP, progress/state, reduced-motion mode

### A2 HyperFrames composition

- Composition: `tools/motion-lab/hyperframes/index.html`
- Visual identity: `tools/motion-lab/hyperframes/DESIGN.md`
- Duration: 5.2 seconds
- Canvas: 1920x1080
- Contract: standalone `data-composition-id="a2-review-gate"`; paused synchronous GSAP timeline registered at `window.__timelines['a2-review-gate']`
- Narrative: raw evidence enters → review boundary activates → approved evidence resolves into durable memory while rejected evidence stays inspectable but demoted
- Determinism: no `Math.random()`, `Date.now()`, async timeline construction, or timeline callbacks that mutate content

## Dependency decision

### Installed in production application

None.

### Isolated POC dependencies

- GSAP / ScrollTrigger: pinned browser CDN `3.14.2` for the isolated lab only.
- HyperFrames: invoked through `npx hyperframes@0.7.102` in an isolated Node >=22 shell.
- FFmpeg: external authoring/render requirement only.

No root `package.json`, lockfile, Next.js route, production bundle, or homepage component was modified.

## Three.js/R3F decision

**Not necessary for A2/B2 POC.**

Both approved concepts can be represented with DOM/CSS/SVG, GSAP, deterministic video rendering, and scroll choreography. Introducing live Three.js at this stage would increase runtime complexity without solving an identified visual requirement.

Revisit only if owner review identifies a specific depth/camera effect that cannot be achieved convincingly with the current approach.

## HyperFrames validation (executed, hardened)

- Tool: `npx hyperframes@0.7.102`
- Environment: Node 25.9.0, FFmpeg 8.1.1, macOS arm64
- **Layout suppression markers:** ZERO (all removed; geometry redesigned to eliminate collisions)

| Command | Result |
| --- | --- |
| `doctor` | PASS (Whisper/Kokoro/MusicGen optional) |
| `lint` | 0 errors, 0 warnings |
| `check` | 0 errors, 0 warnings, 115/115 WCAG AA text checks pass |
| `preview` | Server running, composition playable |
| `render` | 1010 KB master, 5.2s @ 1920x1080 @ 30fps, 156 frames, 6.1s render time |

### Layout redesign

Previous source used 10 `data-layout-allow-overlap` / `data-layout-allow-occlusion` markers to suppress 8 genuine layout collisions. The collision root cause: evidence cards were positioned at `left: 140-210px`, overlapping the editorial copy zone at `left: 105px, width: 420px`. During animation, evidence moved further upward into the hero title.

**Fix:** redesigned the spatial model:
- Left (80-480px): editorial copy
- Center-left (550-900px): evidence staging
- Center-right (~960px): Review Gate vertical boundary
- Right (1060-1840px): trusted Memory workspace

Evidence cards now animate only within their zone (small vertical shifts, opacity fade) and never cross into the copy or memory zones. No suppression markers needed.

## Media encoding results (exact measurements)

**Master render:**
- Output: `renders/a2-review-gate-master.mp4`
- Size: 1,034,698 bytes (1010 KB)
- Duration: 5.200s
- Resolution: 1920x1080
- Frame rate: 30 fps (30/1)
- Codec: H.264 (libx264)
- Bitrate: 1,592 kb/s (variable, quality-driven)
- Pixel format: yuv420p
- Total frames: 156

**H.264 delivery (short GOP, seek-optimized):**
- Output: `renders/a2-review-gate-h264.mp4`
- Size: 999,090 bytes (976 KB)
- Codec: libx264 preset=slow crf=20 g=12 keyint_min=12
- Bitrate: 1,533 kb/s (CRF = quality-based variable bitrate, NOT fixed bitrate)
- Keyframes: 13 (exactly GOP 12: 156 frames / 12 = 13 keyframes)
- Use case: desktop / standard mobile playback with fast seeking

**VP9 delivery (variable bitrate, compression):**
- Output: `renders/a2-review-gate-vp9.webm`
- Size: 796,915 bytes (778 KB)
- Codec: libvpx-vp9 crf=30 b:v=0 g=12 row-mt=1
- Bitrate: 1,226 kb/s (quality-based variable bitrate)
- Use case: modern browser, smaller file size at comparable quality

**Poster thumbnail:**
- Output: `renders/a2-review-gate-poster.png`
- Size: 105,379 bytes (103 KB)
- Format: PNG, 1920x1080, rgb24

## Font delivery

- Golos Text 400: `fonts/golos-text-400.woff2` (23 KB)
- JetBrains Mono 400: `fonts/jetbrains-mono-400.woff2` (37 KB)
- Format: WOFF2 (converted from official upstream TTF via fonttools)
- Source: Google Fonts (Golos Text), JetBrains (JetBrains Mono)
- License: SIL Open Font License 1.1 for both
- Provenance documented in `fonts/PROVENANCE.md`

## Seek benchmark (measured)

Tested with system Chrome (H.264 codec support), `requestVideoFrameCallback` API.

**Forward seeks (from t=0 to target):**

| Target | Median | Worst |
| --- | --- | --- |
| 0.5s | 16.2ms | 18.5ms |
| 1.0s | 17.2ms | 19.2ms |
| 1.8s | 14.9ms | 17.2ms |
| 2.5s | 21.4ms | 22.9ms |
| 3.2s | 8.5ms | 17.4ms |
| 4.0s | 13.2ms | 17.7ms |
| 4.8s | 8.5ms | 23.1ms |

**Reverse seeks (from end to target):**

| Target | Median | Worst |
| --- | --- | --- |
| 4.8s | 4.3ms | 15.5ms |
| 4.0s | 13.5ms | 20.5ms |
| 3.2s | 7.5ms | 11.0ms |
| 2.5s | 10.1ms | 15.5ms |
| 1.8s | 14.6ms | 17.1ms |
| 1.0s | 9.8ms | 18.2ms |
| 0.5s | 11.8ms | 14.5ms |

**Summary:**
- Overall median seek latency: ~12ms
- Worst-case seek latency: 23.1ms
- All seeks complete within a single frame (< 33ms at 30fps)
- Both forward and reverse seeks are responsive
- Short GOP=12 provides excellent random-access performance

## B2 browser validation (final — CLS fixed)

Tested with Playwright + system Chrome (channel: 'chrome').

### CLS fix applied

**Root cause:** ScrollTrigger's `pin: true` with `pinSpacing: false` caused layout shift when the pin engaged. The pinned element was removed from flow, shifting all subsequent content.

**Fix:** Replaced ScrollTrigger pinning with native CSS `position: sticky` on `#stage`. The `.scroll-shell` already provides the scroll distance (460vh). The sticky element stays in flow — no layout shift occurs when scroll reaches the trigger zone. ScrollTrigger still drives the scrub animation, but no longer manages pin layout.

**State-4 fix:** Changed context-column transition from `opacity: 0.12` to `autoAlpha: 0` (visibility:hidden + opacity:0). Tightened animation choreography so context exits fully at timeline progress 0.62-0.70 before response enters at 0.70-0.88. Task card also uses `autoAlpha: 0`. Eliminates text bleed-through on both desktop and mobile.

### Desktop Chrome — 1440x900

| Metric | Value | Assessment |
| --- | --- | --- |
| GSAP loaded | YES (3.14.2) | |
| ScrollTrigger active | YES (scrub only, no pin) | |
| State transitions | All 4 correct | task-intent → relevance → assembly → applied |
| Forward scroll | PASS | |
| Reverse scroll | PASS | Returns to correct prior state |
| Reduced motion | PASS | Immediately shows applied-context |
| Console errors | 0 | |
| FPS | 71 | Above 60fps target |
| CLS | 0.007 | **PASS** — well below 0.05 threshold |
| LCP | 140ms | Excellent |

### Mobile Chrome — 390x844

| Metric | Value | Assessment |
| --- | --- | --- |
| GSAP loaded | YES | |
| ScrollTrigger active | YES (scrub only, no pin) | |
| State transitions | All 4 correct | |
| Forward/reverse scroll | PASS | |
| Reduced motion | PASS | |
| Console errors | 0 | |
| FPS | 71 | Above 60fps target |
| CLS | 0.036 | **PASS** — below 0.05 threshold |
| LCP | 88ms | Excellent |

### Playwright WebKit

- Status: UNAVAILABLE (browser binary not installed in this environment)
- This is Playwright's WebKit engine, NOT Safari.

## Safari status

**SAFARI: MANUAL VALIDATION PENDING**

Real Safari is not automatable by Playwright. Playwright's WebKit engine is not Safari and cannot be called Safari. Manual testing on macOS Safari and iOS Safari is required before claiming browser compatibility.

## Visual quality assessment (critical)

### Strengths
- Clear zone separation in A2 after geometry redesign
- Evidence → Memory narrative reads clearly in both video and scroll
- Typography is clean and editorial with appropriate weight hierarchy
- Grid overlay and ambient glow are restrained — not distracting
- Memory workspace has good information density
- B2 task-card/memory-field layout is well-proportioned
- State transitions are smooth with appropriate pacing
- Provenance citations are legible and well-styled
- Response card composition at final state is clean

### Weaknesses flagged for owner

1. **A2 initial frame sparsity** — The title and ambient glow float in large dark space at t=0. The stagger works narratively but the opening frame feels sparse compared to Cloudflare's dense hero compositions.

2. **A2 evidence staging is too vertical** — Cards are tightly stacked in a single column (center-left zone). Lacks the spatial dynamism of Cloudflare's multi-axis compositions. This is the geometric price of eliminating overlap — but it reads as a list more than a visual field.

3. **B2 desktop state-4 has excessive empty space** — The left half of the stage (below the copy) is entirely empty after task card disappears. Cloudflare fills this type of space with ambient detail or secondary hierarchy.

4. **Card aesthetic is competent but not premium** — The cards use standard dark-mode UI patterns (linear gradient backgrounds, 1px borders, small border-radius). They read as developer tooling rather than product film. Cloudflare achieves richer material quality with subtle noise textures, variable blur, and more aggressive depth layers.

5. **Color palette is monochrome-blue** — The only color accents are cobalt (#7d9af2), orange (pending states), and green (verified). Cloudflare uses a broader warm/cool palette to create visual rhythm. The ProChat POC is technically restrained but risks appearing one-note.

6. **Grid overlay is visible but adds no information** — It functions as ambient texture only. Cloudflare-level execution either makes the grid contribute to spatial hierarchy or removes it.

### Does NOT look

- Childish: No. The typography and spacing are mature.
- Generic AI: Borderline. The card-and-glow treatment is common in AI product marketing. The semantic content (provenance, review gate) differentiates it, but the visual vocabulary is shared with dozens of AI tool landing pages.
- Too card-heavy: B2 states 2-3 are card-heavy. A2 final state is card-heavy. Acceptable for this information type but worth noting.
- Too sparse: A2 t=0 is sparse. B2 state-4 left half is sparse. Other states are well-balanced.
- Overly glowy: No. Ambient glow is restrained.
- Visually noisy: No. Compositions are clean.
- Technically impressive but aesthetically cheap: No. The execution is solid but doesn't fully reach "premium product film" level.

### Summary verdict

The POC is **technically sound and visually competent** but sits one tier below the Cloudflare reference in spatial composition richness and material quality. It would pass as a professional product page but would not be mistaken for Cloudflare-level production design without additional polish passes on:
- Card material/depth treatment
- Spatial variety (breaking the strict column layout in A2)
- Ambient density (filling dead space with purposeful secondary elements)
- Color temperature variation

## Owner review artifacts

Located at `tools/motion-lab/reviews/` (gitignored):

### A2 snapshots (`a2-snapshots/`)
- `a2-t0-initial.png` — t=0 opening frame
- `a2-raw-evidence.png` — t=0.8s evidence entering
- `a2-gate-activation.png` — t=1.6s gate state change
- `a2-midpoint.png` — t=2.6s evidence crossing gate
- `a2-memory-entrance.png` — t=3.2s memory workspace appears
- `a2-final-state.png` — t=5.0s final resolved state

### A2 video
- `a2-review-gate-h264.mp4` — validated H.264 output (976 KB, 5.2s)

### B2 desktop (`b2-chrome-1440x900/`)
- `state-1-intent.png`
- `state-2-relevance.png`
- `state-3-assembly.png`
- `state-4-applied.png`
- `reduced-motion.png`

### B2 mobile (`b2-chrome-mobile-390x844/`)
- `state-1-intent.png`
- `state-2-relevance.png`
- `state-3-assembly.png`
- `state-4-applied.png`
- `reduced-motion.png`

### Styleframes (`styleframes/`)
- All seven styleframes captured at 1440x900

## Merge and deployment boundary

**DO NOT MERGE** this branch to `main` until:
- Owner has visually reviewed A2 and B2 POC surfaces.
- Safari testing is complete (or explicitly deferred).
- Owner approves visual direction AND technical readiness.

**Production homepage** remains unchanged and unaffected by this branch.

---

## CLOUDFLARE HOMEPAGE RECONSTRUCTION — Proposed Next Phase

If owner approves the POC direction, the following maps Cloudflare's section structure to ProChat's product semantics:

### Section mapping (Cloudflare → ProChat)

| Cloudflare section | ProChat equivalent | Content |
| --- | --- | --- |
| Hero (animated product demo) | A2 Review Gate (video/scroll) | "Work arrives before it becomes memory" — evidence/review/provenance narrative |
| Product value props (3-4 columns) | Memory capabilities grid | Intent-driven retrieval, provenance tracking, review gating, context assembly |
| Interactive demo / product tour | B2 Context Assembly (scroll POC) | Four-state scrub showing task → relevance → assembly → applied context |
| Customer logos / social proof | Owner testimonials / use cases | Context-aware tools users, verified memory in production |
| Technical architecture | ProChat Memory architecture | How evidence flows through the review gate to become trusted context |
| Developer experience | Integration surface | API, SDK, and owner-facing tools for memory inspection |
| Pricing / CTA | Access / waitlist | Single clear CTA with product confidence |
| Footer | Standard footer | Links, legal, product family |

### Implementation order (proposed)

1. **Hero section** — Integrate A2 video as scroll-driven hero with sticky viewport
2. **Value props** — Static editorial grid below hero
3. **Interactive demo** — B2 scroll section integrated as full-width product tour
4. **Architecture** — Simplified diagram section
5. **CTA** — Final conversion section

### Technical requirements

- Next.js page route (not modifying existing homepage until approved)
- GSAP + ScrollTrigger loaded conditionally for demo section
- Video element with poster for A2
- Intersection Observer for section entry animations
- No Three.js (unless owner review identifies a gap)

### Not yet decided

- Whether to use a new route (`/product`) or replace existing homepage
- Motion density (Cloudflare uses more micro-interactions; ProChat may stay restrained)
- Whether card material treatment gets a polish pass first
- Whether additional styleframes are needed for new sections
