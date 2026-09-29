# ProChat public-site validation plan

**Status:** current validation contract for the cinematic public website
**Applies visually to:** `/`, `/evermind`, `/nevermind`, `/mastermind`, `/contact`, and `/docs`. `/privacy` and `/terms` share the static utility shell; their legal body meaning remains outside visual copy changes.

Product truth comes from `mind/organizations/prochat/brand/`; implementation state comes from current source and `docs/implementation-plan.md`. Older homepage/page-architecture plans are historical unless explicitly reconciled.

## Product and content checks

- Evermind is free, open-source, human-owned memory; Nevermind is its paid capability/convenience layer; Mastermind is a separate free planning/orchestration product.
- ProChat Memory for QA is paused/historical, not a current public product.
- Home communicates the product family accurately; each product route explains its own role and CTA destination.
- Product identities on all active routes match Mind. Contact and Docs use Evermind/Nevermind/Mastermind terminology; legal shell changes must not rewrite legal body copy.
- Claims about privacy, security, integrations, pricing, availability, and outcomes match Mind and verified implementation. Privacy/Terms meaning must not be changed by a shell migration.

## Shared cinematic-page checks

For `/`, `/evermind`, `/nevermind`, and `/mastermind` verify:

- one shared template and one full-width transparent navigation; no legacy capsule, extra header/banner, mixed theme band, or footer;
- exactly one homepage/page H1 and one main landmark;
- section one at approximately `100svh`, intentional empty `80vh` spacer, section two at approximately `100svh`, then page end;
- shared route data changes copy without changing geometry or visual system;
- capability display is one translucent glass panel, with background media visibly present through it;
- media visibly scrubs with scroll, forward and reverse; adjacent frames blend and renderer handoffs stay continuously painted;
- the Evermind / Memory, Nevermind / Context, and Mastermind / Execution stages activate in reading order, without text overlap or jarring chapter jumps;
- every CTA is usable and remains on one line without clipping.

## Responsive and motion matrix

Check widths `1440`, `1280`, `1024`, `768`, `430`, `390`, and `360` pixels. Review desktop, laptop, tablet, and mobile screenshots at the top, mid-hero, transition, section two/content, and bottom after CSS transitions settle. Verify text contrast, heading fit, sticky/fixed-nav collisions, CTA/button collisions, capability/readability, section pacing, and layout shifts.

Under `prefers-reduced-motion: reduce`, verify all stages and links remain available, no scroll scrubbing occurs, media freezes to one stable poster/frame, video and canvas are not visibly duplicated, and layout geometry remains understandable. Include a reduced-motion desktop screenshot.

## Static utility shell

For `/contact`, `/docs`, `/privacy`, and `/terms`, verify one transparent full-width navigation, no legacy footer or dark capsule, no video/canvas animation, Golos Text display headings, no horizontal overflow, and readable glass surfaces. Verify Contact submission and mobile navigation; verify Docs content remains readable at desktop, laptop, tablet, and mobile widths. Privacy and Terms body copy must remain semantically unchanged.

## Accessibility, performance, and runtime

- Keyboard, focus-visible, accessible names/landmarks, form labels/errors, and target sizes pass.
- No horizontal overflow, uncaught page errors, hydration warnings, or missing assets on the four cinematic routes; existing CI guards the other canonical routes.
- Capture Lighthouse mobile LCP for `/`, `/evermind`, `/nevermind`, `/mastermind`, `/docs`, and `/contact`; target ≤2.5s. Report lab LCP separately from field INP.
- Evaluate a local LiquidGlass prototype against the current translucent CSS glass for fidelity, initialization cost, continuous frame cost, scroll cadence, accessibility, and reduced motion. Add no dependency unless measured benefit justifies it.
- Verify deployed `/api/version` equals the intended release SHA and smoke-test all eight routes/known redirects.

## Release evidence

Retain reproducible test output and manually reviewed viewport screenshots for all four cinematic routes; include desktop, tablet, mobile, reduced-motion, reverse-scroll, frame-cache handoff, and production revision/route evidence. Existing route tests guard unrelated utility/legal pages. Do not mark release complete based only on a local build or push.
