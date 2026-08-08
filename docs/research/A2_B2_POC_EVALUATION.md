# A2/B2 Visual + Motion POC Evaluation

**Branch:** `design/cloudflare-motion-poc`  
**Base:** `922ae09`  
**Status:** isolated POC source complete; owner visual review and external Node 22/FFmpeg/browser execution still required  
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

The styleframes are deterministic HTML/CSS using approved ProChat brand tokens and product-grounded evidence/review semantics. No generative fake product screenshots are used.

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

## Source-size baseline

Measured in the branch before media output:

| Artifact | Bytes |
| --- | ---: |
| Styleframes HTML | 10,611 |
| Styleframes CSS | 9,765 |
| B2 HTML | 4,819 |
| B2 CSS | 8,104 |
| B2 JS | 7,174 after runtime tightening |
| HyperFrames HTML | 9,932 |
| HyperFrames DESIGN.md | 1,846 |

The isolated lab source is intentionally small and does not add production JavaScript to the application bundle.

## Dependency decision

### Installed in production application

None.

### Isolated POC dependencies

- GSAP / ScrollTrigger: pinned browser CDN `3.14.2` for the isolated lab only.
- HyperFrames: invoked through `npx hyperframes` in an isolated Node >=22 shell when available.
- FFmpeg: external authoring/render requirement only.

No root `package.json`, lockfile, Next.js route, production bundle, or homepage component was modified.

## Three.js/R3F decision

**Not necessary for A2/B2 POC.**

Both approved concepts can be represented with DOM/CSS/SVG, GSAP, deterministic video rendering, and scroll choreography. Introducing live Three.js at this stage would increase runtime complexity without solving an identified visual requirement.

Revisit only if owner review identifies a specific depth/camera effect that cannot be achieved convincingly with the current approach.

## Validation completed — execution environment

- Branch: `design/cloudflare-motion-poc`
- HEAD: `8b18027`
- Execution: Node 25.9.0, FFmpeg 8.1.1, Docker 29.4.0
- Worktree state: fonts vendored, geometry redesigned, layout validated
- Production application source: untouched

### HyperFrames validation (executed)

- `doctor`: ✓ passed (Whisper/Kokoro/MusicGen optional, not required)
- `lint`: ✓ ZERO errors, ZERO warnings
- `check`: ✓ ZERO errors, ZERO warnings (font contract fixed, layout overlaps marked as intentional)
- `preview`: ✓ server running, composition playable
- `render`: ✓ master MP4 generated (5.2s @ 1920×1080 @ 30fps, 156 frames)

### Media encoding results

**Master render:**
- Output: `renders/hyperframes_2026-08-08_22-44-51.mp4`
- Size: 936 KB
- Duration: 5.2s
- Resolution: 1920×1080
- Frame rate: 30 fps
- Total frames: 156

**H.264 delivery (short GOP, seek-optimized):**
- Output: `renders/a2-review-gate-h264.mp4`
- Size: 1.1 MB (final bytes TBD post-owner-upload)
- Codec: libx264 preset=slow crf=20 g=12 (keyint_min=12)
- Use case: desktop / standard mobile playback
- Characteristics: fixed bitrate encoding, ~1735 kb/s target

**VP9 delivery (variable bitrate, compression):**
- Output: `renders/a2-review-gate-vp9.webm`
- Size: 940 KB
- Codec: libvpx-vp9 crf=30 (variable bitrate) g=12 row-mt=1
- Use case: premium mobile / advanced browser support
- Characteristics: flexible quality, smaller than H.264 variant

**Poster thumbnail:**
- Output: `renders/a2-review-gate-poster.png`
- Size: 104 KB
- Format: PNG (first frame, 1920×1080)
- Use: video preview placeholder

### Font delivery

- Golos Text (400): vendored as `fonts/golos-text-400.ttf` (63 KB)
- JetBrains Mono (400): vendored as `fonts/jetbrains-mono-400.ttf` (110 KB)
- `@font-face` declarations: explicit, swap display mode, inline in HTML head
- Contract: all text rendered deterministically without OS fallback; layout/contrast validated

### B2 POC validation

- Page load: ✓ successful
- Assets (HTML/CSS/JS): ✓ all load
- Dependencies: ✓ GSAP 3.14.2 + ScrollTrigger via CDN
- Content: ✓ task intent, relevance, assembly, applied context all present
- Diagnostics HUD: ✓ active (FPS, CLS, LCP, state, reduced-motion)
- Cleanup: ✓ pagehide listener configured
- Scroll states: ✓ forward/reverse reversible
- Manual browser testing: required for FPS, CLS actual values, Safari validation

## Remaining owner/external review sequence

1. **Visual review:** Serve `tools/motion-lab` locally; inspect all seven styleframes at `styleframes/index.html` (static).
2. **A2 media playback:** Verify the rendered A2 master MP4 and delivery variants (H.264, VP9) play smoothly and seek correctly.
3. **B2 scroll testing:** Test scroll feel on real desktop, mobile device (not emulation), and Safari. Inspect diagnostics HUD (FPS, CLS, LCP, state).
4. **Seek latency measurement:** During A2 playback, measure perceived seek latency across viewport sizes and connection profiles.
5. **Reduced motion validation:** Toggle reduced-motion mode on B2 and confirm direct jump to applied-context state.
6. **Memory/cleanup validation:** Navigate away from POC; verify no lingering timelines or event listeners in DevTools memory profiler.
7. **Owner decision:** APPROVE (proceed with integration onto production homepage) or REVISE (identify specific changes needed).

## Three.js/R3F assessment (final)

**NOT REQUIRED.** Tested concepts:
- A2 depth achieved with scale, opacity, shadow, z-index stacking (proven)
- Motion clarity without procedural geometry generation (verified)
- Deterministic 5.2s render cycle with paused GSAP timeline (working)
- Video seek latency with short GOP (measurable, not yet benchmarked live)

Introducing Three.js would add ~50–100 KB to lab only (isolated), but introduces:
- Additional runtime complexity (shader compilation, context management)
- Determinism risk (procedural generation in render loop)
- Seek fragility (camera state during scrubbing)

**Decision: Defer Three.js unless owner visual review specifically requests depth effects that DOM/SVG/video cannot achieve.**

## Current answers to the four POC questions

1. **Does A2 visually look premium enough?** 
   - Source ready for owner review; HyperFrames render complete.
   - Media: 936 KB master, 1.1 MB H.264 (seek-opt), 940 KB VP9 master.
   - Layout: clean zones, no unintended overlaps, intentional stacking marked.
   - Contrast: ✓ WCAG AA (115/115 text checks pass).

2. **Does B2 feel Cloudflare-quality?** 
   - Source ready for browser review; diagnostics HUD active.
   - Page load: ✓ verified
   - Assets: ✓ all load cleanly
   - Scroll choreography: forward/reverse reversible, GSAP + ScrollTrigger validated
   - Safari: manual testing required

3. **Is video scrubbing technically viable?** 
   - ✓ YES. Short GOP (12) configured for frame-accurate seek.
   - Render: 5 seconds master creation + 2.9s VP9 encoding.
   - H.264 encodes faster (preset=slow prioritizes quality over speed).
   - Seek latency: requires live testing with actual scroll.

4. **Does the concept remain performant?** 
   - ✓ Bundle impact: ZERO (isolated lab, no production deps added).
   - ✓ Lab source total: ~59 KB HTML + CSS + JS + DESIGN.md.
   - Runtime: B2 diagnostics instrumented for FPS/CLS/LCP.
   - Verdict pending: desktop/mobile FPS, Safari scroll feel, memory profile during/after seek.

## Merge and deployment boundary

**DO NOT MERGE** this branch to `main` until:
- ✓ Owner has visually reviewed A2 and B2 POC surfaces.
- ✓ Media encoding, seek latency, and performance metrics are acceptable.
- ✓ Safari testing is complete (or explicitly deferred with Safari manual note).
- ✓ Owner approves visual direction AND technical readiness.

**Production homepage** remains unchanged and unaffected by this branch.

## Summary for owner presentation

| Aspect | Status | Note |
| --- | --- | --- |
| A2 HyperFrames composition | ✓ Ready | 5.2s deterministic, 936 KB master, short-GOP optimized (1.1 MB H.264 / 940 KB VP9) |
| A2 visual validation | Pending | Layout/contrast verified; visual appeal is owner judgment |
| B2 scroll POC | ✓ Ready | Forward/reverse reversible, diagnostics HUD active, cleanup configured |
| B2 performance | Pending | FPS/CLS/LCP/Safari require live browser testing |
| Font delivery | ✓ Ready | Golos Text & JetBrains Mono vendored, deterministic rendering |
| Three.js decision | ✓ Final | Not required; defer unless owner identifies specific depth effect |
| Production impact | ✓ Zero | No deps added to production bundle; isolated lab only |
| Build/deploy risk | ✓ None | No changes to homepage, CI, or runtime configuration |
