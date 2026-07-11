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

- Golos Text and JetBrains Mono only.
- Load necessary subsets and weights.
- Use `font-display: swap`.
- Reserve metrics to reduce layout shift.
- Verify production font output and caching.

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
