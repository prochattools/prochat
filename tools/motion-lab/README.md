# ProChat A2/B2 Motion Lab

**Branch:** `design/cloudflare-motion-poc`  
**Purpose:** isolated visual and motion proof-of-concept only  
**Production homepage:** unchanged

This lab turns the approved A2 Review Gate + B2 Context Assembly direction into reviewable deterministic UI frames and an isolated motion prototype without touching `src/app/(marketing)`.

## Surfaces

- `styleframes/index.html` — seven owner-review frames:
  1. A2 Raw Evidence
  2. A2 Review Gate
  3. A2 Structured Memory
  4. B2 Task Intent
  5. B2 Relevance Filtering
  6. B2 Context Assembly
  7. B2 Applied Context
- `b2/index.html` — four-state pinned Context Assembly scroll POC using GSAP + ScrollTrigger from pinned CDN URLs.
- `hyperframes/index.html` — deterministic 5.2s A2 Review Gate composition following the cached HyperFrames composition/timeline contract.
- `hyperframes/DESIGN.md` — isolated composition visual identity. It does not replace repository `DESIGN.md`.

## Design constraints

- Cloudflare is the reference for pacing, density, section choreography, spatial weight, and motion quality.
- ProChat keeps its own brand, copy, product truth, cobalt accent, Golos Text / JetBrains Mono hierarchy, and original visuals.
- No laser fields, particle clouds, glowing AI blobs, neon cyberpunk, cartoon illustrations, fake product screenshots, or decorative motion without narrative purpose.
- The old `MemoryLaserField` remains historical/source material only.

## Preview

Serve this directory with any local static server and open:

- `/styleframes/`
- `/b2/`

The B2 POC intentionally uses native browser scrolling. No Lenis/Rive/Lottie/Remotion is required.

## HyperFrames / A2 render

The cached Brain HyperFrames skill requires Node.js >=22 and FFmpeg on `PATH`. The production ProChat application remains on Node 20; do not upgrade the application runtime for this lab.

From `tools/motion-lab/hyperframes` in a Node 22 shell:

```bash
npx hyperframes doctor
npx hyperframes lint
npx hyperframes inspect --samples 15
npx hyperframes preview --port 4567
npx hyperframes render
```

The composition is authored as standalone HTML with:

- `data-composition-id="a2-review-gate"`
- `data-start="0"`
- `data-duration="5.2"`
- `data-width="1920"`
- `data-height="1080"`
- synchronous paused GSAP timeline registered as `window.__timelines["a2-review-gate"]`

After HyperFrames renders a master video, use FFmpeg to compare web delivery encodes. Recommended first benchmark set:

```bash
ffmpeg -i output.mp4 -an -c:v libx264 -preset slow -crf 20 -g 12 -keyint_min 12 -movflags +faststart a2-review-gate-h264.mp4
ffmpeg -i output.mp4 -an -c:v libvpx-vp9 -crf 30 -b:v 0 -g 12 -row-mt 1 a2-review-gate-vp9.webm
ffmpeg -i output.mp4 -vf "select=eq(n\,0)" -frames:v 1 a2-review-gate-poster.png
```

The short GOP is deliberate for scroll-seek testing; compare size versus seek smoothness before choosing a production encoding.

## Measurement contract

The B2 POC includes a small on-page diagnostics HUD for:

- rolling requestAnimationFrame FPS;
- CLS accumulation;
- observed LCP value when available;
- current ScrollTrigger progress/state;
- reduced-motion mode.

Manual review still must record:

- desktop scroll feel;
- reverse-scroll correctness;
- mid-tier mobile feel;
- Safari behavior;
- media seek latency once the A2 video exists;
- memory/resource cleanup after leaving the POC.

## Acceptance questions

1. Does A2 look product-grounded and premium rather than decorative?
2. Does B2 feel deliberate and reversible rather than like stacked reveal animations?
3. Can the A2 media be scrubbed without obvious seek stalls?
4. Can both concepts meet the defined performance budget without live Three.js?

Three.js/R3F remains conditional and is not part of this POC.
