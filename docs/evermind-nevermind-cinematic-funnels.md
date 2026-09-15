# Evermind and Nevermind cinematic funnels

This document records repository-local implementation details for the public `/evermind` and `/nevermind` funnels. It does not redefine product strategy or positioning; canonical product/brand decisions remain outside this repository.

## Route and shell boundary

- `/evermind` renders the Evermind cinematic funnel.
- `/nevermind` renders the Nevermind cinematic funnel.
- Both routes use the shared `CinematicProductFunnel` client component.
- Both routes are registered as `no_shared_shell` so the normal ProChat application chrome is not rendered over the cinematic funnel navigation.
- The production homepage is independent of these funnels and must not be changed as part of funnel releases.

## Scroll-video architecture

The funnels use a deterministic document-scroll progress value from `0` to `1`, smoothed each animation frame with the existing `0.12` lerp factor.

The visual pipeline has three layers of resilience:

1. **Local bootstrap sprite** — `/public/funnels/cinematic-bootstrap.jpg` contains 24 evenly distributed frames from the production film in a 6 x 4 sprite. It is preloaded and rendered to the viewport canvas as soon as it is available, so first-scroll response does not depend on remote MP4 decoding or random-access seeking.
2. **Progressive remote frame cache** — the supplied CloudFront MP4 is decoded in the background. Frames are extracted coarse-to-fine so useful temporal coverage arrives early. The remote cache replaces the bootstrap sprite only after at least 24 cached frames are available.
3. **Visible-video fallback** — if the bootstrap image or frame cache is not available, the visible video can seek to scroll-derived time once the browser reports usable media data.

The canvas uses device-pixel-ratio scaling capped at 2 and object-cover drawing semantics. Reduced-motion behavior remains respected.

## Bootstrap asset

The bootstrap sprite is generated from the same source movie used by the production funnel:

```text
https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4
```

Current bootstrap parameters:

```text
frames: 24
layout: 6 columns x 4 rows
per-frame width: 480 px
format: JPEG
path: public/funnels/cinematic-bootstrap.jpg
```

A representative regeneration command is:

```sh
ffmpeg -y -v error \
  -i '<source-mp4-url>' \
  -vf "fps=24/10.041667,scale=480:-2,tile=6x4" \
  -frames:v 1 -q:v 5 \
  public/funnels/cinematic-bootstrap.jpg
```

Do not commit generated alternatives that are not referenced by the funnel implementation.

## Release validation

Before publishing changes to the funnels, run the repository-required checks plus targeted browser QA:

- TypeScript/typecheck;
- targeted ESLint for the funnel component and route files;
- design-system lint;
- `git diff --check` for the release paths;
- full production Next.js build;
- desktop and mobile route smoke tests;
- an early-scroll test with the remote MP4 blocked, proving the local bootstrap sprite changes frames independently of remote-video readiness;
- production verification for `/evermind`, `/nevermind`, `/api/version`, and `/`.

The release diff must be inspected before commit so homepage or unrelated redesign work cannot be included accidentally.

## Production deployment

Production deploys from `main` through the repository's existing CI/Dokploy workflow. Funnel releases should be isolated commits and should not include unrelated working-tree changes.
