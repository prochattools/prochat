# Repository status

Status: the cinematic and utility-page implementation is published and live-verified. Current `origin/main` is `e5d750f471875ad392afe68c4380b42967a0d3fd` (a docs-only release-record follow-up); the currently deployed runtime revision is `f63dd3374c2acd4ecfbc837bfe899569eb4a3a23`, confirmed by `/api/version`. The cinematic implementation commit `f09f92aab3327b3672df0d593e50040171cc1295` was merged through PR #3, and the docs correction through PR #4. Mastermind source/index continuity and safe branch/worktree cleanup remain open.

Last reviewed: 2026-09-29.

## Canonical public surface

Routes: `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, `/contact`, `/privacy`, and `/terms`.

Evermind and Nevermind are the connected Infinite Brain product system; Mastermind is the separate free planning/orchestration product. ProChat Memory for QA is paused/historical. Mind is canonical for product naming, hierarchy, claims, and company strategy.

## Runtime and visual architecture

- `/`, `/evermind`, `/nevermind`, `/mastermind`: shared cinematic template, scroll-driven media, two chapters, 80vh intentional spacer, one navigation, and no footer. The cache is sampled at 12fps (120 frames for the current 10.04s video) with each frame limited to 540px width; candidate rendering uses an offscreen staging canvas to preserve the last good visible frame.
- `/contact`, `/docs`, `/privacy`, `/terms`: shared static utility shell with one transparent navigation and no footer. Contact submission remains functional; legal page body text is unchanged; Docs uses current product names and avoids animated background media.
- Production integration: GitHub Actions `.github/workflows/main.yml` on `main`; production revision is checked through `/api/version`.

## Historical or deferred systems

Generated Docs/Nextra, retired checkout/licensing, Stripe runtime, MailerLite, GitHub purchaser provisioning, and legacy product identities are not current public-site capabilities. Ory runtime authorization for internal/admin surfaces remains separately deferred and fail-closed. Historical references live under archives/migration docs and Git history.

## Validated release scope

Renderer continuity tests, responsive/reduced-motion and interaction evidence, measured LiquidGlass rejection, production build, 108 repository browser tests, and manual desktop/mobile review are recorded for this release. The strengthened 10-test focused quality suite passes in system Chrome with H.264 enabled. Chrome 153 locally presented 89 tiny-scroll canvas paints in 1.47s (59.99fps), with 87 distinct sampled outputs and a 17.6ms maximum gap; repeated slow/rapid reverse scrolling across all four routes produced no transparent visible-canvas samples or browser errors. The real-page LiquidGlass prototype measured 60–61 package FPS and no page RAF cadence regression, but was rejected on visual grounds because it introduced a visible inset/double-glass seam on both candidate panels without enough benefit; evidence is recorded in `docs/implementation-plan.md`. Release-workflow mobile-simulated LCP medians exceeded 2.5s on all eight routes: `/` 3.78s, `/evermind` 3.77s, `/nevermind` 3.77s, `/mastermind` 3.77s, `/docs` 4.90s, `/contact` 5.12s, `/privacy` 4.82s, and `/terms` 3.85s. The trace reported text LCP with FCP-to-LCP of 0ms, so the metric/simulation discrepancy should be investigated before optimization. This advisory evidence did not block CI or deployment; see `docs/roadmap.md` and `docs/implementation-plan.md`. The protected dirty checkout `/Users/Office/Repos/prochattools/web/prochat` is preservation-only and must remain byte-for-byte unchanged in its branch, HEAD, status, and tracked diff.

## Tracked performance/security notes

- Canonical mobile LCP target: ≤2.5s; capture actual route measurements before setting the next goal.
- Docker builder still declares placeholder `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` values via `ENV`; these are not credentials, but trigger container-build security warnings. Remove the obsolete build-time dependency in a separately validated change, without passing real secrets to the builder.
