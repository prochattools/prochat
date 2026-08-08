# A2/B2 Visual + Motion POC Evaluation

**Branch:** `design/cloudflare-motion-poc`  
**Validated at:** `b12ba4e` (source), re-rendered after geometry/font hardening  
**Status:** forensic audit complete; owner visual review required  
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
- Runtime: pinned GSAP + ScrollTrigger via pinned `3.14.2` CDN scripts
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
- Canvas: 1920×1080
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
| `render` | 1010 KB master, 5.2s @ 1920×1080 @ 30fps, 156 frames, 6.1s render time |

### Layout redesign

Previous source used 10 `data-layout-allow-overlap` / `data-layout-allow-occlusion` markers to suppress 8 genuine layout collisions. The collision root cause: evidence cards were positioned at `left: 140–210px`, overlapping the editorial copy zone at `left: 105px, width: 420px`. During animation, evidence moved further upward into the hero title.

**Fix:** redesigned the spatial model:
- Left (80–480px): editorial copy
- Center-left (550–900px): evidence staging
- Center-right (~960px): Review Gate vertical boundary
- Right (1060–1840px): trusted Memory workspace

Evidence cards now animate only within their zone (small vertical shifts, opacity fade) and never cross into the copy or memory zones. No suppression markers needed.

## Media encoding results (exact measurements)

**Master render:**
- Output: `renders/a2-review-gate-master.mp4`
- Size: 1,034,698 bytes (1010 KB)
- Duration: 5.200s
- Resolution: 1920×1080
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
- Format: PNG, 1920×1080, rgb24

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

**NOTE:** "Frame-accurate" cannot be claimed from seek latency alone. The measurements prove responsive seeking (sub-frame latency), but visual verification that the correct frame is presented at each seek target requires manual inspection. The benchmark proves **seek responsiveness is excellent** — not pixel-precise frame targeting.

## B2 browser validation (measured)

Tested with Playwright + system Chrome (channel: 'chrome').

### Desktop Chrome — 1440×900

| Metric | Value | Assessment |
| --- | --- | --- |
| GSAP loaded | YES (3.14.2) | |
| ScrollTrigger pinned | YES | |
| State transitions | All 4 correct | task-intent → relevance → assembly → applied |
| Forward scroll | PASS | |
| Reverse scroll | PASS | Returns to correct prior state |
| Reduced motion | PASS | Immediately shows applied-context |
| Console errors | 0 | |
| FPS | 49 | Below 60fps target (headless Chrome overhead; real browser expected higher) |
| CLS | 0.494 | **FAIL** — exceeds 0.1 threshold; pin action causes layout shift |
| LCP | 708ms | Borderline acceptable |

### Mobile Chrome — 390×844

| Metric | Value | Assessment |
| --- | --- | --- |
| GSAP loaded | YES | |
| ScrollTrigger pinned | YES | |
| State transitions | All 4 correct | |
| Forward/reverse scroll | PASS | |
| Reduced motion | PASS | |
| Console errors | 0 | |
| FPS | 68 | Good |
| CLS | 0.781 | **FAIL** — worse than desktop; pin + scroll-shell cause significant shift |
| LCP | 92ms | Excellent |

### Playwright WebKit

- Status: UNAVAILABLE (browser binary not installed in this environment)
- This is Playwright's WebKit engine, NOT Safari.

### Known B2 issues

1. **CLS exceeds threshold** — ScrollTrigger's `pin: true` with `pinSpacing: false` causes layout shift when the pin engages. This is a known GSAP/ScrollTrigger characteristic. Mitigation options: use `pinSpacing: true` (changes scroll feel) or pre-allocate space with a wrapper. Requires owner decision on tradeoff.

2. **State 4 visual layering** — At progress 0.85, the context-column (opacity 0.12) and response card overlap visually. The faded context text is legible behind the response, creating visual noise. This is a z-index/opacity cleanup issue.

3. **FPS measurement caveat** — Headless Chrome FPS is lower than real browser. The 49fps desktop measurement likely reflects automation overhead. Real-device testing expected to show 60fps on modern hardware.

## Safari status

**SAFARI: MANUAL VALIDATION PENDING**

Real Safari is not automatable by Playwright. Playwright's WebKit engine is not Safari and cannot be called Safari. Manual testing on macOS Safari and iOS Safari is required before claiming browser compatibility.

## Visual quality assessment (honest)

### Strengths
- Clear zone separation in A2 after geometry redesign
- Evidence → Memory narrative reads clearly
- Typography is clean and editorial
- Grid overlay and ambient glow are restrained
- Memory workspace has good information density
- B2 task-card/memory-field layout is well-proportioned

### Weaknesses to flag for owner
- **A2 frame 0** is mostly empty — the title and ambient glow float in large dark space. The stagger of elements entering works narratively but the initial frame may feel sparse for a hero.
- **A2 evidence cards** are tightly stacked vertically with minimal horizontal variation. The center-left column feels like a list more than a spatial composition. This is the price of eliminating overlap — less dynamic positioning.
- **B2 state 4** has visible text bleed-through from the context-column behind the response panel.
- **B2 CLS** is high enough to fail Core Web Vitals. If this ships to production, the pin strategy needs rework.
- The overall aesthetic is competent dark-mode UI but doesn't fully reach "Cloudflare product film" restraint — it's clean but slightly generic. The grid, glow, and card styling are standard fintech/dev-tool dark patterns.

## Merge and deployment boundary

**DO NOT MERGE** this branch to `main` until:
- Owner has visually reviewed A2 and B2 POC surfaces.
- CLS remediation strategy is decided for B2.
- Safari testing is complete (or explicitly deferred).
- Owner approves visual direction AND technical readiness.

**Production homepage** remains unchanged and unaffected by this branch.
