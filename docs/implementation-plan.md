# ProChat website implementation plan

Status: cinematic/site quality implementation and release validation in progress.

Last reviewed: 2026-09-29.

## Current source contract

Canonical public routes: `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, `/contact`, `/privacy`, and `/terms`. Product truth is governed by Mind at `mind/organizations/prochat/brand/`; the current identities are Evermind, Nevermind, and Mastermind. ProChat Memory for QA is paused/historical.

The first four routes use a shared cinematic implementation: `HomeV2` or `CinematicProductFunnel` supplies page data to `CinematicMarketingPage`; the shared page uses `CinematicMarketingShell`, one final cinematic reference stylesheet, and `ScrollVideoBackground`. Route content must not reintroduce the former public-site shell, extra headers, a footer, opaque SaaS cards, or competing route-level overrides.

Contact, Docs, Privacy, and Terms retain their existing route-specific presentation and are outside this cinematic redesign. Keep their established implementation and legal meaning unchanged; use the repository's existing route checks to guard against regressions.

## Active work gates

### A. Renderer and motion

- Reproduce slow/fast forward and reverse scroll in a real H.264-capable browser.
- Prove cache and bootstrap handoffs do not expose blank frames; compare frames through blending and stop painting when settled.
- Confirm the requested background demonstrably changes with scroll and chapter activation follows reading order.
- Under reduced motion, freeze to one stable media/poster layer, disable scrubbing, preserve all content/links, and retain geometry.

### B. Visual and content QA

- Check all four cinematic routes at desktop, laptop, tablet, and mobile widths; verify one H1, one main, no footer, no horizontal overflow, CTA wrapping, and consistent 100svh / 80vh / 100svh structure.
- Do not redesign Contact, Docs, Privacy, or Terms in this release. Preserve their current route and legal behavior through existing regression tests.
- Review current copy against canonical Mind source and prevent stale product identities/claims in active pages and docs.
- Capture and manually inspect viewport screenshots after motion settles, including top, transition, Section Two, page end, and reduced-motion desktop.
- Prototype LiquidGlass locally and compare quality, CPU/frame cadence, media scrubbing, reduced motion, and initialization cost. Do not add a dependency or ship the effect without measured benefit.

Initial LiquidGlass evaluation: a real Chrome local prototype using one dynamic scroll-canvas background and one cloned context panel ran at approximately 11–15fps (median frame interval 50–66.6ms) compared with the existing renderer's 16.7ms median cadence. The captured overlay also clipped/reflowed the cloned panel. Decision: do not add the dependency to the production scroll path; current CSS glass uses an 11% translucent white surface with 18px backdrop blur and preserves media throughput. This is a measured rejection for the current implementation, not a claim that the library cannot be used on static pages.

### C. Validation and release

Run the repository-supported env/doc integrity, TypeScript, ESLint, design lint, asset validation, production build, security, and relevant browser evidence. Review a diff-based safety pass; stage exact files only; commit and push the continuation branch without rewriting history. Integrate through the repository's normal `main` workflow. Verify workflow and deployment success, `/api/version` full SHA, all eight public routes, media and browser health. Then verify the authoritative worktree is clean and the protected checkout's branch, HEAD, status, and diff fingerprint are unchanged.

## Known implementation/build debt

`Dockerfile` currently sets placeholder `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` values as builder-stage environment variables so retired Stripe module evaluation can pass. They are not real secrets, but they trigger build security warnings. Track a separate narrowly tested refactor to remove this build-time configuration dependency. Never place live credentials in Docker build args or image layers.

## Next performance gate

Measure Lighthouse mobile LCP on `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, and `/contact`. The target remains ≤2.5 seconds. If missed, the next roadmap item is to bring canonical public-route LCP under 2.5 seconds without reducing the cinematic experience.

## Completion evidence

Record test commands/results, screenshot review, measured LiquidGlass comparison, measured LCP, feature and production commits, workflow/deployment result, live version and route checks, final branch/worktree state, preserved-checkout fingerprint, and any remaining warnings. Do not call the work complete on a green local build or successful push alone.
