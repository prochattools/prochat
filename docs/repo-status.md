# Repository status

Status: the cinematic and utility-page implementation passes local validation. Starting production and `origin/main` revision is `c6731140191791e407a2fb6eb27ac96711883e32`; this release is not yet published or live-verified.

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

Renderer continuity tests, responsive/reduced-motion and interaction evidence, measured LiquidGlass rejection, production build, 108 repository browser tests, nine focused quality tests (one intentionally skipped), and manual desktop/mobile review are recorded for this release. Chrome 153 locally presented 89/90 tiny-scroll paints at 59.99fps (maximum observed gap 17.8ms), reached all 120 cache frames, and survived three full scroll reversals without blanking or console errors. The real-page LiquidGlass prototype measured 60–61 package FPS and no page RAF cadence regression, but was rejected on visual grounds because it introduced a visible inset/double-glass seam on both candidate panels without enough benefit; evidence is recorded in `docs/implementation-plan.md`. Local single-run mobile LCP diagnostics: `/` 2.91s, `/evermind` 2.86s, `/nevermind` 2.86s, `/mastermind` 2.86s, `/docs` 4.05s, `/contact` 4.21s; all exceed the 2.5s target. Production merge/deployment and remote source housekeeping remain pending. The protected dirty checkout `/Users/Office/Repos/prochattools/web/prochat` is preservation-only and must remain byte-for-byte unchanged in its branch, HEAD, status, and tracked diff.

## Tracked performance/security notes

- Canonical mobile LCP target: ≤2.5s; capture actual route measurements before setting the next goal.
- Docker builder still declares placeholder `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` values via `ENV`; these are not credentials, but trigger container-build security warnings. Remove the obsolete build-time dependency in a separately validated change, without passing real secrets to the builder.
