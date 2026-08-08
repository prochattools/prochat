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

## Validation completed in Workbench

- Branch verified as `design/cloudflare-motion-poc` at base `922ae09`.
- Worktree started clean.
- B2 `main.js` passes `node --check` under Node 20.
- HyperFrames composition contains required `data-composition-id`, duration, dimensions, and timeline registration.
- HyperFrames source contains no `Math.random()`.
- Timeline callbacks that would mutate text during arbitrary seek were removed.
- Production application source remains untouched.

## Measurements not executable in this Workbench runtime

The current Workbench execution envelope exposes Node 20 only and cannot invoke `pnpm`, `npx`, FFmpeg, or a local browser session. Therefore the following results must NOT be invented:

- HyperFrames `doctor`, `lint`, `inspect`, `preview`, or `render` result
- H.264 MP4 file size
- VP9 WebM file size
- poster output
- seek latency
- desktop/mobile FPS from a real browser
- Safari behavior
- real LCP/CLS values
- memory profile after navigation

The source is instrumented to collect browser FPS/LCP/CLS when previewed, and `tools/motion-lab/README.md` contains the exact Node 22 HyperFrames/FFmpeg command sequence.

## Required owner/external review sequence

1. Serve `tools/motion-lab` locally and inspect all seven styleframes.
2. Review B2 scroll feel on desktop, mobile emulation/device, and Safari.
3. Run HyperFrames under Node >=22 with FFmpeg using the documented commands.
4. Render the A2 master and compare H.264/VP9 short-GOP outputs.
5. Record actual media sizes, seek behavior, FPS, LCP, CLS, and Safari results here.
6. Owner decides APPROVE or REVISE before any production homepage implementation.

## Current answers to the four POC questions

1. **Does A2 visually look premium enough?** Owner visual review required; source composition is ready for review but Workbench cannot render a screenshot/video.
2. **Does B2 feel Cloudflare-quality?** Browser review required; choreography source is ready and instrumented.
3. **Is video scrubbing technically viable?** Architecture is viable, but the short-GOP HyperFrames/FFmpeg benchmark must still be executed.
4. **Does the concept remain performant?** Production bundle impact is currently zero; runtime browser metrics still require preview execution.

## Hard boundary

Do not merge this branch and do not modify the live homepage until the owner has visually reviewed the styleframes and the technical benchmark results have been recorded.
