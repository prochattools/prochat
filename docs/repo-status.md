# Repository status

Status: current source has a locally validated cinematic implementation; production revision and route health are verified through the normal `main` workflow and `/api/version`.

Last reviewed: 2026-09-29.

## Canonical public surface

Routes: `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, `/contact`, `/privacy`, and `/terms`.

Evermind and Nevermind are the connected Infinite Brain product system; Mastermind is the separate free planning/orchestration product. ProChat Memory for QA is paused/historical. Mind is canonical for product naming, hierarchy, claims, and company strategy.

## Runtime and visual architecture

- `/`, `/evermind`, `/nevermind`, `/mastermind`: shared cinematic template, scroll-driven media, two chapters, 80vh intentional spacer, one navigation, and no footer.
- `/contact`, `/docs`, `/privacy`, `/terms`: existing route-specific presentation, outside this visual redesign and checked for regressions only.
- Production integration: GitHub Actions `.github/workflows/main.yml` on `main`; production revision is checked through `/api/version`.

## Historical or deferred systems

Generated Docs/Nextra, retired checkout/licensing, Stripe runtime, MailerLite, GitHub purchaser provisioning, and legacy product identities are not current public-site capabilities. Ory runtime authorization for internal/admin surfaces remains separately deferred and fail-closed. Historical references live under archives/migration docs and Git history.

## Validated release scope

Renderer reverse-scroll/cache-handoff, responsive/reduced-motion and interaction evidence, measured LiquidGlass evaluation, current copy/documentation reconciliation, production build, browser/security checks, and manual desktop/mobile review are recorded for the cinematic release. Integrate through the normal GitHub `main` workflow and verify the deployed revision/routes before describing a publication as live. The protected dirty checkout `/Users/Office/Repos/prochattools/web/prochat` is preservation-only and must remain byte-for-byte unchanged in its branch, HEAD, status, and tracked diff.

## Tracked performance/security notes

- Canonical mobile LCP target: ≤2.5s; capture actual route measurements before setting the next goal.
- Docker builder still declares placeholder `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` values via `ENV`; these are not credentials, but trigger container-build security warnings. Remove the obsolete build-time dependency in a separately validated change, without passing real secrets to the builder.
