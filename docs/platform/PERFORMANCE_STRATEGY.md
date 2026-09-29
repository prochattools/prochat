# ProChat Performance Strategy

**Status:** canonical repository-local performance program

> Current-site note (2026-09-29): the homepage and three product routes now use a scroll-driven video-to-canvas renderer with a stable static bootstrap and reduced-motion fallback. This approved exception to the old static-frame-only plan must be judged against scroll smoothness, reverse-scroll continuity, cache handoff, mobile LCP, and reduced motion. PXF-016D/016D2 measurements below describe the earlier route/theme architecture; rerun them for the current eight public routes before treating their results as current.

## Principle

Performance is a product and design requirement. Budgets constrain fonts, media, JavaScript, animation, and component architecture before implementation.

## Experience targets

```yaml
LCP_seconds: 2.5
INP_ms: 200
CLS: 0.1
hero_media_initial_kb: 250
above_fold_transfer_kb: 700
pinned_chapters_max: 4
total_scroll_triggers_target_max: 24
```

Targets apply to realistic mobile conditions, not only local desktop development.

## Laboratory proof (PXF-016D)

The following metrics are measured in CI using Lighthouse against a locally started production build.
Configuration: mobile simulation (Moto G Power 2022), slow-4G throttling, 3 cold runs per route, median selected.

| Metric | Laboratory source | CI gate |
|---|---|---|
| FCP | Lighthouse | provisional target 1.8s |
| LCP | Lighthouse | enforced 2.5s (canonical strategy target) |
| CLS | Lighthouse | enforced 0.1 (canonical strategy target) |
| TBT | Lighthouse | provisional target 200ms (lab diagnostic only — NOT field INP) |
| Speed Index | Lighthouse | informational |
| Performance score | Lighthouse | informational |
| Total transfer bytes | Lighthouse network-requests audit | informational |
| JavaScript transfer bytes | Lighthouse bootup-time audit | informational |
| Request count | Lighthouse network-requests audit | informational |

**TBT semantics:** Total Blocking Time is a Lighthouse laboratory proxy for main-thread responsiveness. It correlates with INP but is not the same metric. Do not label TBT as INP in any report, document, or CI output.

## Still requiring field or manual evidence

The following items cannot be verified by Lighthouse and require field data or manual review:

| Item | Reason |
|---|---|
| INP (Interaction to Next Paint) | Requires real-user measurement or an approved RUM tool. The 200ms strategy target is a future field-data requirement. |
| Real-user device distribution | Laboratory simulation uses one representative profile; actual users differ. |
| Long-session route-transition memory leaks | Requires repeated navigation in a live session; Lighthouse measures single cold loads. |
| Real mobile-network behavior | Simulated throttling does not replicate operator latency, congestion, or DNS. |
| Production cache variability | CDN and browser caching differs between lab (cold) and production (warm). |
| Hero-media-specific transfer bytes | Lighthouse total-byte-weight covers the full initial navigation, not above-fold-only transfer. Targeted measurement requires separate instrumentation. |

## Architecture

- Server Components by default.
- Isolated client leaves for cinematic or interactive regions.
- Static first hero state renders before animation code.
- Lazy-load below-the-fold cinematic modules.
- Native scrolling only.
- Semantic HTML, CSS, and SVG for essential visuals.
- No autoplay hero video. A user-scroll-driven frame sequence is permitted only with continuous fallback, no blank cache handoff, mobile performance evidence, and a stable reduced-motion mode.
- No smooth-scroll dependency by default.

## Fonts

- Host Grotesk is the body/system sans, Golos Text is the public brand/display face, and JetBrains Mono is reserved for code and technical labels.
- Load only necessary subsets and weights.
- Use `font-display: swap` unless a measured, approved exception proves a better result.
- Reserve metrics to reduce layout shift.
- Verify production font output, preload behavior, and caching.

## Motion

- Animate transform and opacity first.
- Avoid scroll animation of layout properties.
- Prefer one chapter timeline over many element triggers.
- Destroy or pause observers and timelines when off-screen or unmounted.
- Keep reduced-motion mode free of unnecessary animation code.
- Test backwards scroll and route transitions for leaks.

## Media and SVG

- Use responsive images with explicit dimensions.
- Compress social and editorial images.
- Keep SVG path and filter complexity modest.
- Inline only small critical SVG.
- Lazy-load below-the-fold diagrams when useful.
- Do not embed essential text as raster images.

## JavaScript and dependencies

Before adding a dependency, document:

- purpose;
- existing alternative;
- bundle cost;
- browser behavior;
- accessibility implications;
- maintenance and licence;
- removal plan.

Do not add a production dependency for a static prototype. Playwright is already used for browser evidence; any new renderer/glass dependency requires the cost, accessibility, maintenance, and removal review above.

## Measurement

Use:

- production build analysis;
- browser Performance panel;
- Lighthouse;
- Web Vitals telemetry where approved;
- Playwright traces;
- CPU and network throttling;
- mid-range mobile testing;
- repeated navigation leak checks.

## Budget exceptions

A budget may change only when:

1. the product value is explicit;
2. the cost is measured;
3. alternatives were tested;
4. accessibility remains intact;
5. the exception is documented and approved.

## Release gate

Do not launch with unexplained budget regression, animation-driven layout shift, long main-thread tasks during scroll, delayed hero readability, or mobile interaction latency above target.

## Tooling versions (PXF-016D)

```yaml
lighthouse: 12.4.0
chrome-launcher: 1.1.2
node_requirement: ">=20"
selection_reason: >
  lighthouse 12.4.0 is the latest stable release compatible with Node 20 (LTS).
  chrome-launcher 1.1.2 is the recommended companion version.
  Both are pinned in package.json via normal devDependencies.
  No npx transient install. No third-party Lighthouse CI upload service.
  Chrome/Chromium is resolved by chrome-launcher from the CI runner environment.
```

## Deferred security observation (PXF-016D)

CI run 30758962840 reported Dockerfile annotations concerning Stripe live-secret names in Docker build directives. Current source still declares placeholder `STRIPE_SECRET_KEY_LIVE` and `STRIPE_WEBHOOK_SECRET_LIVE` values using builder-stage `ENV` so retired Stripe module evaluation succeeds at build time. These are placeholders, not real credentials, but their presence implies an obsolete build contract. Track removal of this build-time configuration dependency; never pass actual secrets into Docker build args or layers.


## LCP attribution semantics (PXF-016D2)

Lighthouse's simulated LCP value and the browser's raw observed LCP candidate timing are related but not interchangeable.

The canonical runner therefore records both:

- the simulated Lighthouse FCP/LCP values used by the release threshold;
- the outermost main-frame navigation and LCP candidate trace events;
- final candidate identity and replacement count;
- raw navigation-to-FCP, navigation-to-LCP, and FCP-to-LCP timing;
- main-thread, script, network, and route-chunk attribution.

Do not claim a hydration delay merely because simulated LCP is later than simulated FCP. PXF-016D2 measured the failing public text candidates at or within approximately 17ms of raw FCP, rejecting the earlier 1.7–2.0 second hydration-floor hypothesis.

The historical blocking result was six then-canonical routes above the unchanged 2.5-second simulated LCP threshold. It is not a measurement of the current cinematic routes. Rerun the diagnostic and report each currently canonical route separately before selecting an optimization.

### LiquidGlass evaluation (2026-09-29)

A local system-Chrome prototype placed one LiquidGlass element over a scroll-driven background canvas and marked that canvas changed on each animation frame, as required for live canvas pixel updates. At 1440×900, two repeated scroll runs measured the effect at roughly 11–15fps with 50–66.6ms median RAF intervals; the existing renderer's median remained 16.7ms. The prototype also failed to preserve the context panel's original text composition. It is not approved for the cinematic scroll path. Existing CSS glass remains the current direction unless a future measured test demonstrates a faster and faithful integration.

The next approved repair boundary is architectural critical-path reduction:

1. separate canonical public CSS from legacy and protected-route CSS now carried by the shared render-blocking bundle;
2. preserve only measured above-the-fold canonical styles in the initial route path;
3. evaluate `/docs` transfer and LCP from current route-source evidence; generated Docs/Nextra is no longer the public Docs route;
4. avoid root provider or shell rewrites unless later trace evidence proves they delay observed paint.

Historical Phase 12 status does not establish current cinematic release readiness. Field INP and manual accessibility remain separate evidence requirements.
