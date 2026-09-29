# ProChat website roadmap

Status: cinematic/site quality pass is merged and deployed. Feature implementation commit `f09f92aab3327b3672df0d593e50040171cc1295` was merged to `main` as `f63dd3374c2acd4ecfbc837bfe899569eb4a3a23`; workflow [36573913919](https://github.com/prochattools/prochat/actions/runs/36573913919) completed successfully, and production `/api/version` reports the deployed `f63dd337…` revision. Post-deploy source/index continuity and safe worktree cleanup remain open.

Last reviewed: 2026-09-29.

## Current public surface

The active public routes are `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, `/contact`, `/privacy`, and `/terms`. Evermind and Nevermind are the connected Infinite Brain product system; Mastermind is the separate free planning/orchestration product. ProChat Memory for QA is paused/historical. Mind remains canonical for product and company strategy.

The first four routes share a two-section cinematic page, one full-width navigation, one scroll-driven background renderer, one 80vh spacer, and no footer. Contact and Docs now use the same visual language through a static, reading-friendly utility shell; Privacy and Terms use that same shell while their legal body text remains unchanged. All four utility pages have one navigation and no footer.

## Current release goal — ProChat cinematic/site quality pass

The release source of truth is `feature/prochat-cinematic-finalization-2026-09`; local validation was performed in the managed `prochat-quality-final` worktree. Do not modify the protected dirty checkout at `/Users/Office/Repos/prochattools/web/prochat`.

In scope:

1. Fix and verify reverse/forward continuity and smooth frame presentation, chapter pacing, and CTA wrapping on the four cinematic product routes. The deployed `c673114…` failure mechanism was reproduced with controlled browser-only draw errors: clearing the visible canvas before candidate draw allowed a failed draw to leave a transparent surface. The candidate stages offscreen and preserves the last good frame; see `docs/implementation-plan.md` for measurements and test evidence.
2. Keep those four routes visually consistent, including Golos display headings, one navigation, translucent capability glass, correct 100svh / 80vh / 100svh geometry, and zero footers.
3. Bring Contact and Docs into the shared ProChat visual system with restrained/static backgrounds; migrate only shared chrome on Privacy and Terms, preserving legal meaning.
4. Verify prefers-reduced-motion, 1440/1280/1024/768/430/390/360 layouts, route content, menu and Contact interactions, browser errors, and manually inspected screenshots.
5. LiquidGlass was tested in local Chrome 153 at 1440×900 on both selected surfaces, with the real scroll-rendered page canvas copied and invalidated on each source repaint. Baseline page RAF cadence was 16.62ms average / 16.8ms p95; the context-card and capability-panel prototypes measured 16.48ms / 16.8ms and 16.50ms / 16.8ms respectively. Package-reported rates were 61fps and 60fps; initialization was 66.0ms and 65.8ms; each run handled 96 changed source frames without console errors. The previous 11–15fps estimate was not reproduced and is superseded. Do not adopt the package: screenshots show an inset, doubled-glass seam on both existing CSS panels without a compelling visual gain. Retain the CSS fallback and avoid adding a WebGL context plus frame-copy/invalidation path. Detailed evidence and screenshots are in `docs/implementation-plan.md`.
6. Current local Chrome 153 diagnostics reached the 120-frame cache and presented 89 tiny-scroll canvas paints in 1.47s (59.99fps); 87 sampled outputs were distinct and the longest gap was 17.6ms. Slow and rapid down/up scrolling plus repeated reversals on all four core routes produced over 500 distinct sampled outputs per route, zero transparent visible-canvas samples, and no console errors. The focused browser suite passed 10/10 in system Chrome with H.264 enabled. This is a local desktop diagnostic, not a cross-device field guarantee.
7. **Complete (2026-09-29):** feature commit `f09f92a…` was reviewed and merged to `main` as `f63dd337…`; the release record was corrected after deployment. Workflow [36573913919](https://github.com/prochattools/prochat/actions/runs/36573913919) passed, including `build-and-deploy` and `Verify production deployment`. Production `/api/version` matches `f63dd337…`; the eight canonical routes returned HTTP 200. Release evidence and remaining performance gaps are recorded below and in `docs/implementation-plan.md`.
8. Preserve the protected checkout and unrelated repositories/worktrees. Reconcile Mastermind source continuity/indexes only through a supported, authorized mechanism; the available source connector was unauthorized, so no source mutation was made. Keep branches/worktrees with unique or unverified work; post-deploy cleanup is still pending a safe per-branch audit.

## Performance follow-up

The canonical mobile LCP target is at most 2.5 seconds. The release workflow's mobile-simulated canonical evidence (2026-09-29; run [36573913919](https://github.com/prochattools/prochat/actions/runs/36573913919)) completed all 8/8 routes but met all thresholds on 0/8. Median LCPs were: `/` 3.78s, `/evermind` 3.77s, `/nevermind` 3.77s, `/mastermind` 3.77s, `/docs` 4.90s, `/contact` 5.12s, `/privacy` 4.82s, `/terms` 3.85s. CLS was 0.000 and FCP was 1.21–1.22s. Trace attribution identified text as LCP, with navigation-to-FCP/LCP around 107–155ms and FCP-to-LCP 0ms; the reported LCP values therefore appear dominated by the mobile-simulation timing/measurement context rather than late content rendering and need investigation before optimization. This evidence step is advisory (`continue-on-error`) and did not fail CI or deployment. A prior local Lighthouse run is retained only as historical diagnostic data; these results are not production field data. The next website goal is: **Investigate and bring canonical public-route LCP under 2.5 seconds without reducing cinematic fidelity.** Do not trade away the requested scroll-driven visuals to satisfy the metric.

## Tracked build hardening

The current `Dockerfile` builder stage declares placeholder values for `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` with `ENV` so build-time module evaluation succeeds. They are placeholders, not credentials, but the names trigger container-build security annotations and imply an obsolete Stripe build contract. Remove that build-time configuration dependency in a separate verified code change; never pass real Stripe secrets through Docker build arguments or layers. Keep this warning visible until the warning is eliminated and a clean production build is verified.

The 2026-09-29 `npm audit --omit=dev` scan also reported 68 findings (4 critical, 32 high, 30 moderate, 2 low). Next.js 14.2.31 is within the advisory range for AVIF-optimizer RCE, while the current `next.config.js` does not opt into AVIF output; the separately reported Windows-filesystem RCE does not match the Debian-based container runtime. This visual release does not upgrade dependencies; track a scoped dependency-security review and upgrade to supported patched versions before enabling AVIF or changing the runtime platform.

## Deferred, separate work

- Runtime Ory authorization for internal/admin APIs remains explicitly fail-closed and requires its own security design.
- Nevermind product planning, billing/commercialization, and Mind/Brain changes are outside this website release.
- Do not redesign unrelated product or legal content while performing the cinematic shell migration.

## Release gate

The implementation/release gate is complete: CI, deployment, production revision equality, and route checks passed. Remaining closeout is the post-deploy continuity/branch audit noted above; the separate LCP target remains open. A successful local build or push alone is not release completion.
