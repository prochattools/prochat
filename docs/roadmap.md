# ProChat website roadmap

Status: cinematic implementation locally validated; use the normal `main` workflow and `/api/version` to determine the published revision. Performance and dependency hardening remain separate follow-up goals.

Last reviewed: 2026-09-29.

## Current public surface

The active public routes are `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, `/contact`, `/privacy`, and `/terms`. Evermind and Nevermind are the connected Infinite Brain product system; Mastermind is the separate free planning/orchestration product. ProChat Memory for QA is paused/historical. Mind remains canonical for product and company strategy.

The first four routes share a two-section cinematic page, one full-width navigation, one scroll-driven background renderer, one 80vh spacer, and no footer. Contact, Docs, Privacy, and Terms are regression-checked but not redesigned in this release; preserve their current route presentation and legal meaning.

## Current release goal — ProChat cinematic/site quality pass

The release source of truth is `feature/prochat-cinematic-finalization-2026-09`; local validation was performed in the managed `prochat-quality-final` worktree. Do not modify the protected dirty checkout at `/Users/Office/Repos/prochattools/web/prochat`.

In scope:

1. Fix and verify smooth reverse/forward scroll, cache/bootstrap frame blending, chapter pacing, and CTA wrapping on the four cinematic product routes.
2. Keep those four routes visually consistent, including Golos display headings, one navigation, translucent capability glass, correct 100svh / 80vh / 100svh geometry, and zero footers.
3. Keep Contact, Docs, Privacy, and Terms outside the visual redesign; retain existing routes and verify their established CI contracts.
4. Verify prefers-reduced-motion, 1440/1280/tablet/mobile layouts, route content, menu interactions, browser errors, and manually inspected cinematic screenshots.
5. Evaluate LiquidGlass with a measured local prototype; do not ship it unless it materially improves the glass treatment without harming media scroll performance, accessibility, or initial rendering. Initial 1440×900 Chrome prototype result: not accepted for this scroll-driven page—the one-panel dynamic-canvas run measured about 11–15fps (50–66.6ms median RAF interval) versus 16.7ms baseline cadence, and the prototype overlay did not preserve the card composition. Keep the current 11% CSS liquid-glass treatment.
6. Audit current public copy against Mind, correct active website guidance, validate, review, commit, push, merge through the normal `main` workflow, then verify the live revision and routes.
7. Preserve the protected checkout and unrelated repositories/worktrees. After confirmed production success only, reconcile Mastermind source continuity, indexes, and safely removable branches/worktrees; do not delete unique or unverified work.

## Performance follow-up

The canonical mobile LCP target is at most 2.5 seconds. A single-run local production-artifact diagnostic on 2026-09-29 (Lighthouse 12.4, Moto G Power 2022 simulation, 4× CPU, slow 4G; diagnostic mode) measured LCP as follows: `/` 2.83s, `/evermind` 3.19s, `/nevermind` 2.79s, `/mastermind` 2.80s, `/docs` 2.72s, `/contact` 2.99s. All six exceeded target; CLS was 0 and TBT was 0ms. These are local lab measurements, not production field data, and one run per route is directional rather than a stable baseline. The next website goal is: **Bring canonical public-route LCP under 2.5 seconds without reducing cinematic fidelity.** Do not trade away the requested scroll-driven visuals to satisfy the metric.

## Tracked build hardening

The current `Dockerfile` builder stage declares placeholder values for `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` with `ENV` so build-time module evaluation succeeds. They are placeholders, not credentials, but the names trigger container-build security annotations and imply an obsolete Stripe build contract. Remove that build-time configuration dependency in a separate verified code change; never pass real Stripe secrets through Docker build arguments or layers. Keep this warning visible until the warning is eliminated and a clean production build is verified.

The 2026-09-29 `npm audit --omit=dev` scan also reported 68 findings (4 critical, 32 high, 30 moderate, 2 low). Next.js 14.2.31 is within the advisory range for AVIF-optimizer RCE, while the current `next.config.js` does not opt into AVIF output; the separately reported Windows-filesystem RCE does not match the Debian-based container runtime. This visual release does not upgrade dependencies; track a scoped dependency-security review and upgrade to supported patched versions before enabling AVIF or changing the runtime platform.

## Deferred, separate work

- Runtime Ory authorization for internal/admin APIs remains explicitly fail-closed and requires its own security design.
- Nevermind product planning, billing/commercialization, and Mind/Brain changes are outside this website release.
- Do not redesign unrelated product or legal content while performing the cinematic shell migration.

## Release gate

Completion requires current-source evidence, clean TypeScript/ESLint/design/asset checks, the production build, relevant security and browser suites, manual desktop/tablet/mobile/reduced-motion review, exact reviewed-file staging, normal GitHub integration and deployment, production `/api/version` equality, route checks, and a clean authoritative implementation worktree. A successful local build or push alone is not release completion.
