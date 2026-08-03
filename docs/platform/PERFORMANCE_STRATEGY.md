# ProChat Performance Strategy

**Status:** canonical repository-local performance program

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
- No autoplay hero video or frame sequence.
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

Planned additions such as GSAP, Playwright, and axe occur in their approved implementation batch, not during documentation or static prototype work.

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

CI run 30758962840 reported two Dockerfile build annotations concerning Stripe live-secret names in Docker `ARG`/`ENV` directives. These are classified as deferred container and secret-handling hardening work. They do not represent plaintext secrets committed to the repository. No action is required in PXF-016D.


## LCP attribution semantics (PXF-016D2)

Lighthouse's simulated LCP value and the browser's raw observed LCP candidate timing are related but not interchangeable.

The canonical runner therefore records both:

- the simulated Lighthouse FCP/LCP values used by the release threshold;
- the outermost main-frame navigation and LCP candidate trace events;
- final candidate identity and replacement count;
- raw navigation-to-FCP, navigation-to-LCP, and FCP-to-LCP timing;
- main-thread, script, network, and route-chunk attribution.

Do not claim a hydration delay merely because simulated LCP is later than simulated FCP. PXF-016D2 measured the failing public text candidates at or within approximately 17ms of raw FCP, rejecting the earlier 1.7–2.0 second hydration-floor hypothesis.

The current blocking result is six canonical routes above the unchanged 2.5-second simulated LCP threshold. Two bounded font-loading experiments were completed and reverted because they produced no consistent material improvement.

The next approved repair boundary is architectural critical-path reduction:

1. separate canonical public CSS from legacy and protected-route CSS now carried by the shared render-blocking bundle;
2. preserve only measured above-the-fold canonical styles in the initial route path;
3. address the `/docs` Nextra/HeadlessUI transfer and two-candidate LCP separately;
4. avoid root provider or shell rewrites unless later trace evidence proves they delay observed paint.

Phase 12 remains partial until all eight canonical routes pass the unchanged Linux CI laboratory thresholds. Field INP and manual accessibility remain separate evidence requirements.

