# ProChat website implementation plan

Status: cinematic renderer, utility shell, and local validation complete; commit/push and production release remain pending.

Last reviewed: 2026-09-29.

## Current source contract

Canonical public routes: `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, `/contact`, `/privacy`, and `/terms`. Product truth is governed by Mind at `mind/organizations/prochat/brand/`; the current identities are Evermind, Nevermind, and Mastermind. ProChat Memory for QA is paused/historical.

The first four routes use a shared cinematic implementation: `HomeV2` or `CinematicProductFunnel` supplies page data to `CinematicMarketingPage`; the shared page uses `CinematicMarketingShell`, one final cinematic reference stylesheet, and `ScrollVideoBackground`. The renderer samples a 24fps source into at most 120 cached frames (12fps) at up to 540px width, blends adjacent available frames, draws candidates to an offscreen staging canvas, retains the last good visible frame on failure, and stops its RAF loop when settled. Route content must not reintroduce extra headers, a footer, opaque SaaS cards, or competing route-level overrides.

Contact, Docs, Privacy, and Terms use the shared static utility shell: one transparent full-width nav, atmospheric poster treatment, Golos display headings, selective translucent glass, and no footer. Contact form handling and legal body copy are preserved. Docs uses current Evermind/Nevermind/Mastermind terminology and avoids animated video/canvas content behind reading material.

## Active work gates

### A. Renderer and motion

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

LiquidGlass evaluation: a real Chrome local prototype using one dynamic scroll-canvas background and one cloned context panel ran at approximately 11–15fps (median frame interval 50–66.6ms) compared with the existing renderer's 16.7ms median cadence. The captured overlay also clipped/reflowed the cloned panel. Decision: do not add the dependency to the scroll path; retain the CSS glass fallback. A separate local Chrome 153 check of the revised cache recorded 89 visible canvas paints in 1.48s (59.99fps), longest paint gap 17.8ms, full 120-frame cache, and three down/up reversals without blanking or console errors.

### C. Validation and release

Run the repository-supported env/doc integrity, TypeScript, ESLint, design lint, asset validation, production build, security, and relevant browser evidence. Review a diff-based safety pass; stage exact files only; commit and push the continuation branch without rewriting history. Integrate through the repository's normal `main` workflow. Verify workflow and deployment success, `/api/version` full SHA, all eight public routes, media and browser health. Then verify the authoritative worktree is clean and the protected checkout's branch, HEAD, status, and diff fingerprint are unchanged. Commit/push/deployment gates for this release are still pending.

## Known implementation/build debt

`Dockerfile` currently sets placeholder `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` values as builder-stage environment variables so retired Stripe module evaluation can pass. They are not real secrets, but they trigger build security warnings. Track a separate narrowly tested refactor to remove this build-time configuration dependency. Never place live credentials in Docker build args or image layers.

## Next performance gate

The 2026-09-29 single-run local Lighthouse diagnostic measured LCP at `/` 2.91s, `/evermind` 2.86s, `/nevermind` 2.86s, `/mastermind` 2.86s, `/docs` 4.05s, and `/contact` 4.21s. All exceed the ≤2.5s target; CLS was 0 and TBT 0ms. This is a diagnostic sample, not production field data. Next roadmap item: bring canonical public-route LCP under 2.5 seconds without reducing the cinematic experience; investigate the utility-route LCP increase separately.

## Completion evidence

Record test commands/results, screenshot review, measured LiquidGlass comparison, measured LCP, feature and production commits, workflow/deployment result, live version and route checks, final branch/worktree state, preserved-checkout fingerprint, and any remaining warnings. Do not call the work complete on a green local build or successful push alone.
