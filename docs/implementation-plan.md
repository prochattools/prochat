# ProChat website implementation plan

Status: cinematic renderer, utility shell, validation, merge, deployment, and live route checks complete. Feature commit `f09f92aab3327b3672df0d593e50040171cc1295` was merged to `main` as `f63dd3374c2acd4ecfbc837bfe899569eb4a3a23`; workflow [36573913919](https://github.com/prochattools/prochat/actions/runs/36573913919) succeeded. Post-deploy source/index continuity and safe repository cleanup remain pending.

Last reviewed: 2026-09-29.

## Current source contract

Canonical public routes: `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, `/contact`, `/privacy`, and `/terms`. Product truth is governed by Mind at `mind/organizations/prochat/brand/`; the current identities are Evermind, Nevermind, and Mastermind. ProChat Memory for QA is paused/historical.

The first four routes use a shared cinematic implementation: `HomeV2` or `CinematicProductFunnel` supplies page data to `CinematicMarketingPage`; the shared page uses `CinematicMarketingShell`, one final cinematic reference stylesheet, and `ScrollVideoBackground`. The renderer samples a 24fps source into at most 120 cached frames (12fps) at up to 540px width, blends adjacent available frames, draws candidates to an offscreen staging canvas, retains the last good visible frame on failure, and stops its RAF loop when settled. Route content must not reintroduce extra headers, a footer, opaque SaaS cards, or competing route-level overrides.

Contact, Docs, Privacy, and Terms use the shared static utility shell: one transparent full-width nav, atmospheric poster treatment, Golos display headings, selective translucent glass, and no footer. Contact form handling and legal body copy are preserved. Docs uses current Evermind/Nevermind/Mastermind terminology and avoids animated video/canvas content behind reading material.

## Active work gates

### A. Renderer and motion

- Root cause reproduced against deployed `c6731140191791e407a2fb6eb27ac96711883e32`: the previous renderer cleared/resized the visible canvas before drawing a candidate and then swallowed draw errors, so a failed candidate could leave that visible canvas transparent. In a production-page browser session, three controlled draw failures took the visible sample alpha sum from 85,680 to 0 while CSS opacity remained 1. This was an injected browser-only failure (not a server mutation); ordinary scroll alone did not reproduce it deterministically. The candidate stages frames offscreen and presents only successful draws; its regression test confirms the last-good pixel checksum is unchanged when a candidate draw fails.
- The old cache capped sampling at 72 frames with `duration * 10` (about 7.2 frames/second for the 10.04-second asset). The current renderer samples up to 120 frames at 12 frames/second while reducing per-frame width from 720px to 540px, keeping the raw cached-pixel budget approximately constant and improving temporal density. It blends neighboring available frames rather than rounding progress to one frame index.
- Reproduce slow/fast forward and reverse scroll in a real H.264-capable browser.
- Prove cache and bootstrap handoffs do not expose blank frames; stage candidate frames offscreen, retain the last good frame after draw failures, blend neighboring frames, and stop painting when settled.
- Keep temporal sampling at 12fps (120 frames for the current 10.04-second media) within a roughly constant raw bitmap pixel budget by limiting each frame to 540px width.
- Confirm the requested background demonstrably changes with scroll and chapter activation follows reading order.
- Under reduced motion, freeze to one stable media/poster layer, disable scrubbing, preserve all content/links, and retain geometry.

### B. Visual and content QA

- Check all four cinematic routes at desktop, laptop, tablet, and mobile widths; verify one H1, one main, no footer, no horizontal overflow, CTA wrapping, and consistent 100svh / 80vh / 100svh structure.
- Check Contact, Docs, Privacy, and Terms in the shared static utility shell; preserve contact submission behavior and all legal body meaning.
- Review current copy against canonical Mind source and prevent stale product identities/claims in active pages and docs.
- Capture and manually inspect viewport screenshots after motion settles, including top, transition, Section Two, page end, and reduced-motion desktop.
- Prototype LiquidGlass locally and compare quality, CPU/frame cadence, media scrubbing, reduced motion, and initialization cost. Do not add a dependency or ship the effect without measured benefit.

LiquidGlass evaluation (2026-09-29, local Chrome 153, 1440×900): the prototype used the real page's scroll-rendered canvas, copied/invalidation only when that canvas repainted, and tested the hero context card and Section Two capability panel independently. Baseline page RAF cadence was 16.62ms average / 16.8ms p95; context-panel prototype was 16.48ms / 16.8ms and capability-panel prototype 16.50ms / 16.8ms. LiquidGlass reported 61fps and 60fps respectively; initialization took 66.0ms and 65.8ms, with 96 changed source frames during each measured scroll sequence and no console errors. This does not reproduce the earlier claimed 11–15fps; that earlier figure is superseded by this instrumented run. Visual inspection rejected adoption: the package added an inset second glass surface/seam to both existing CSS panels and did not improve the composition enough to justify another WebGL context and frame-copy/invalidation path. Keep the existing CSS fallback and add no package dependency. Screenshots: `/tmp/prochat-liquidglass-real-context-measured.png` and `/tmp/prochat-liquidglass-real-capability-measured.png`.

Local Chrome 153 recorded 89 visible canvas paints in 1.47s (59.99fps), with 87 distinct sampled outputs and a 17.6ms longest paint gap. A four-route run exercised slow and rapid down/up movement plus three additional reversal cycles per route; each route produced over 500 distinct sampled outputs, remained in the 120-frame cache state, had no transparent visible-canvas samples, and logged no browser errors. The strengthened focused Playwright suite passed 10/10 in system Chrome with H.264 enabled. Bundled CI Chromium skips only the H.264-specific fine-scroll case because that binary has no decoder; bootstrap, continuity, and reduced-motion coverage remain active there.

### C. Validation and release

**Release complete (2026-09-29):** feature commit `f09f92aab3327b3672df0d593e50040171cc1295` was reviewed and merged through PR #3 to `main` at `f63dd3374c2acd4ecfbc837bfe899569eb4a3a23`. Push workflow [36573913919](https://github.com/prochattools/prochat/actions/runs/36573913919) succeeded: CI and docs-integrity passed; browser evidence and API security passed; `build-and-deploy` and `Verify production deployment` passed. Production `/api/version` reports revision/image SHA `f63dd3374c2acd4ecfbc837bfe899569eb4a3a23`; `/`, `/evermind`, `/nevermind`, `/mastermind`, `/contact`, `/docs`, `/privacy`, and `/terms` returned HTTP 200. The authoritative feature worktree was clean after merge, and the protected dirty checkout was verified unchanged. Mastermind source/index continuity and final worktree/branch cleanup remain unverified and must use only an authorized, supported mechanism.

## Known implementation/build debt

`Dockerfile` currently sets placeholder `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` values as builder-stage environment variables so retired Stripe module evaluation can pass. They are not real secrets, but they trigger build security warnings. Track a separate narrowly tested refactor to remove this build-time configuration dependency. Never place live credentials in Docker build args or image layers.

## Next performance gate

In the release workflow's mobile-simulated canonical performance evidence (2026-09-29, run [36573913919](https://github.com/prochattools/prochat/actions/runs/36573913919)), all 8 routes completed and 0/8 met the ≤2.5s LCP threshold. Median LCP: `/` 3.78s, `/evermind` 3.77s, `/nevermind` 3.77s, `/mastermind` 3.77s, `/docs` 4.90s, `/contact` 5.12s, `/privacy` 4.82s, `/terms` 3.85s. CLS was 0 and FCP 1.21–1.22s. Trace attribution marked text as LCP and reported FCP-to-LCP of 0ms (navigation-to-FCP/LCP 107–155ms), so investigate the simulation/metric discrepancy before changing rendering. This evidence step is advisory and did not block CI/deployment; it is not production field data. Next roadmap item: investigate and bring canonical public-route LCP under 2.5s without reducing the cinematic experience.

## Completion evidence

Record test commands/results, screenshot review, measured LiquidGlass comparison, measured LCP, feature and production commits, workflow/deployment result, live version and route checks, final branch/worktree state, preserved-checkout fingerprint, and any remaining warnings. Release evidence is now recorded above; source/index continuity and repository cleanup are still open. Do not call the entire closeout complete until those items are safely resolved or explicitly reported as blocked.
