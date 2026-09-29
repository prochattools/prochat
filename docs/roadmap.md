# ProChat website roadmap

Status: implementation and local release gates pass; current source is based on `main` at `c6731140191791e407a2fb6eb27ac96711883e32`. Production publication of this quality pass is pending the normal `main` release workflow and `/api/version` verification.

Last reviewed: 2026-09-29.

## Current public surface

The active public routes are `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, `/contact`, `/privacy`, and `/terms`. Evermind and Nevermind are the connected Infinite Brain product system; Mastermind is the separate free planning/orchestration product. ProChat Memory for QA is paused/historical. Mind remains canonical for product and company strategy.

The first four routes share a two-section cinematic page, one full-width navigation, one scroll-driven background renderer, one 80vh spacer, and no footer. Contact and Docs now use the same visual language through a static, reading-friendly utility shell; Privacy and Terms use that same shell while their legal body text remains unchanged. All four utility pages have one navigation and no footer.

## Current release goal — ProChat cinematic/site quality pass

The release source of truth is `feature/prochat-cinematic-finalization-2026-09`; local validation was performed in the managed `prochat-quality-final` worktree. Do not modify the protected dirty checkout at `/Users/Office/Repos/prochattools/web/prochat`.

In scope:

1. Fix and verify reverse/forward continuity and smooth frame presentation, chapter pacing, and CTA wrapping on the four cinematic product routes.
2. Keep those four routes visually consistent, including Golos display headings, one navigation, translucent capability glass, correct 100svh / 80vh / 100svh geometry, and zero footers.
3. Bring Contact and Docs into the shared ProChat visual system with restrained/static backgrounds; migrate only shared chrome on Privacy and Terms, preserving legal meaning.
4. Verify prefers-reduced-motion, 1440/1280/1024/768/430/390/360 layouts, route content, menu and Contact interactions, browser errors, and manually inspected screenshots.
5. LiquidGlass was tested in a local 1440×900 Chrome prototype on the hero context card and capability panel. It was not adopted: dynamic-canvas performance was about 11–15fps (50–66.6ms median RAF interval) versus 16.7ms baseline cadence, and the overlay clipped/reflowed the composition. Retain the CSS glass fallback; do not add the dependency to the scroll path.
6. Current local Chrome 153 renderer check reached the 120-frame cache and presented 89/90 tiny-scroll paints at 59.99fps, with a longest observed gap of 17.8ms; three full down/up reversals left the canvas painted and produced no console errors. This is a local desktop diagnostic, not a cross-device field guarantee.
7. Update active implementation docs, validate, review, commit, push, merge through the normal `main` workflow, then verify the live revision and routes. Publication is not complete until that verification passes.
8. Preserve the protected checkout and unrelated repositories/worktrees. After confirmed production success only, reconcile Mastermind source continuity, indexes, and safely removable branches/worktrees; do not delete unique or unverified work.

## Performance follow-up

The canonical mobile LCP target is at most 2.5 seconds. A single-run local production-artifact diagnostic on 2026-09-29 (Lighthouse 12.4, Moto G Power 2022 simulation, 4× CPU, slow 4G; diagnostic mode) measured: `/` 2.91s, `/evermind` 2.86s, `/nevermind` 2.86s, `/mastermind` 2.86s, `/docs` 4.05s, `/contact` 4.21s. All six exceeded target; CLS was 0 and TBT was 0ms. Utility-page LCP needs follow-up investigation. These are local lab measurements, not production field data; one run per route is directional rather than a stable baseline. The next website goal is: **Bring canonical public-route LCP under 2.5 seconds without reducing cinematic fidelity.** Do not trade away the requested scroll-driven visuals to satisfy the metric.

## Tracked build hardening

The current `Dockerfile` builder stage declares placeholder values for `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` with `ENV` so build-time module evaluation succeeds. They are placeholders, not credentials, but the names trigger container-build security annotations and imply an obsolete Stripe build contract. Remove that build-time configuration dependency in a separate verified code change; never pass real Stripe secrets through Docker build arguments or layers. Keep this warning visible until the warning is eliminated and a clean production build is verified.

The 2026-09-29 `npm audit --omit=dev` scan also reported 68 findings (4 critical, 32 high, 30 moderate, 2 low). Next.js 14.2.31 is within the advisory range for AVIF-optimizer RCE, while the current `next.config.js` does not opt into AVIF output; the separately reported Windows-filesystem RCE does not match the Debian-based container runtime. This visual release does not upgrade dependencies; track a scoped dependency-security review and upgrade to supported patched versions before enabling AVIF or changing the runtime platform.

## Deferred, separate work

- Runtime Ory authorization for internal/admin APIs remains explicitly fail-closed and requires its own security design.
- Nevermind product planning, billing/commercialization, and Mind/Brain changes are outside this website release.
- Do not redesign unrelated product or legal content while performing the cinematic shell migration.

## Release gate

Completion requires current-source evidence, clean TypeScript/ESLint/design/asset checks, the production build, relevant security and browser suites, manual desktop/tablet/mobile/reduced-motion review, exact reviewed-file staging, normal GitHub integration and deployment, production `/api/version` equality, route checks, and a clean authoritative implementation worktree. A successful local build or push alone is not release completion.
