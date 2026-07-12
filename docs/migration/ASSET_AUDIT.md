# ProChat Asset Audit

**Status:** Phase 5 Task 5.4 inventory complete  
**Inventory date:** 2026-07-12  
**Scope:** `public/**`, `src/assets/**`, logos, social and Open Graph images, fonts, screenshots, PDFs, favicons, SVG illustrations, email assets, background assets, and static files

## Summary

```yaml
asset_files: 75
svg: 48
png: 12
ttf: 5
pdf: 2
xml: 2
woff2: 1
ico: 1
scss: 2
extensionless_or_system_files: 2
production_assets_changed: 0
assets_archived_or_deleted: 0
```

## Governing direction

The clean-slate archive-first policy applies:

- legacy product imagery, historical social assets, old Memory illustrations, kit/ProChat OS imagery, glow backgrounds, obsolete fonts, stale PDFs, and unreferenced icons are archive candidates;
- canonical company logos, favicons, current social assets, approved Golos Text and JetBrains Mono files, and protected transactional assets may remain only after provenance, rights, consumer, and performance review;
- assets tied to protected authentication, commerce, admin, email, documentation, or prior-purchaser obligations are not removed until those workflows are migrated;
- no asset was modified, moved, optimized, archived, or deleted in this task.

## Largest assets

| Asset | Size | Finding | Provisional disposition |
|---|---:|---|---|
| `public/assets/ProChat-AI-Infrastructure-Overview.pdf` | 14,882,690 B | zero detected consumers; historical infrastructure document; very large public payload | ARCHIVE after content/rights review |
| `public/fonts/material-symbols-outlined.ttf` | 945,360 B | used only by legacy waitlist styling | ARCHIVE with waitlist |
| `public/fonts/JetBrainsMono-Regular.ttf` | 273,900 B | used by OG generation; approved family but duplicate loading paths exist | KEEP/OPTIMIZE |
| `public/social/how-to-build-saas-with-ai-non-developer.png` | 171,751 B | legacy SaaS article/social asset; zero detected consumers | ARCHIVE |
| `public/og/prochat-home.png` | 136,458 B | zero detected consumers; current-looking name but provenance/content must be reviewed | REPLACE/VERIFY |
| `public/og/saaskit-product.png` | 136,458 B | used by legacy kit and ProChat OS pages | ARCHIVE after route migration |
| `public/og/uxkit-waitlist.png` | 136,458 B | used by legacy waitlist | ARCHIVE |
| `public/logo/prochat_favicon.ico` | 105,462 B | unusually large favicon candidate; zero detected consumers | REPLACE/OPTIMIZE |
| `public/assets/ssp.pdf` | 96,783 B | zero detected consumers; purpose and rights unclear | ARCHIVE/VERIFY |

## Brand and logo assets

Current files include:

```text
public/logo/logo-mark.svg
public/logo/logo-wordmark.svg
public/logo/logo-wordmark-email-dark.svg
public/logo/prochat_favicon.ico
public/favicon.svg
public/favicon-16.png
public/favicon-32.png
public/apple-touch-icon.png
public/mask-icon.svg
public/email/logo-mark.png
```

Findings:

- `logo-wordmark.svg` is consumed by docs, OG, payment, and social-image code and is protected until replacement consumers exist.
- `logo-wordmark-email-dark.svg` is used by legacy waitlist email code and is protected until the new mailing-list architecture is implemented.
- multiple favicon variants exist with no explicit source reference because browsers/metadata may discover them conventionally.
- brand asset provenance and final alignment with the canonical Golos/cobalt system require confirmation.
- AWS Activate logos are third-party assets with unclear current public purpose and rights-display requirements.

## Font assets

| Asset | Consumer | Direction |
|---|---|---|
| `public/fonts/GolosText-Regular.ttf` | `src/lib/ogFonts.ts` | KEEP/VERIFY licence and subset |
| `public/fonts/GolosText-Bold.ttf` | `src/lib/ogFonts.ts` | KEEP/VERIFY licence and subset |
| `public/fonts/JetBrainsMono-Regular.ttf` | `src/lib/ogFonts.ts` | KEEP/OPTIMIZE |
| `public/fonts/HostGrotesk-Regular.ttf` | zero detected | ARCHIVE after exact proof |
| `public/fonts/material-symbols-outlined.ttf` | legacy waitlist CSS | ARCHIVE with waitlist |
| `src/assets/fonts/HostGrotesk-latin.woff2` | root layout | REPLACE then ARCHIVE after canonical root-font migration |

Font files must not be shared externally. Licence evidence should be stored as documentation, not inferred from filenames.

## Legacy-brand and old-product assets

### Old Memory illustration set

```text
public/prochat-memory/assets/about.svg
public/prochat-memory/assets/capabilities.svg
public/prochat-memory/assets/cta.svg
public/prochat-memory/assets/hero.svg
public/prochat-memory/assets/lab-1.svg
public/prochat-memory/assets/lab-2.svg
public/prochat-memory/assets/lab-3.svg
public/prochat-memory/assets/lab-4.svg
public/prochat-memory/assets/method-1.svg
public/prochat-memory/assets/method-2.svg
public/prochat-memory/assets/method-3.svg
public/prochat-memory/assets/method-4.svg
public/prochat-memory/assets/testimonial.svg
public/prochat-memory/assets/work-1.svg
public/prochat-memory/assets/work-2.svg
```

These belong to the old warm editorial Memory page. They are archive candidates once the canonical `/memory` replacement exists. They must not become the basis of the new Memory visual language.

### Legacy Open Graph assets

- `public/og/saaskit-product.png`
- `public/og/uxkit-waitlist.png`

Both embed obsolete public-product direction and should leave the public platform with their routes.

### Historical social asset

- `public/social/how-to-build-saas-with-ai-non-developer.png`

This is tied to legacy SaaS content and has zero detected consumers.

### Global background assets

Six hero-line SVG variants support the old dark/light glow system. Only the plain light and dark variants currently have detected consumers. All six are archive candidates after the shell migration.

## Social and Open Graph assets

Current social raster assets:

```text
public/social/fb.png
public/social/insta.png
public/social/linkedin.png
public/social/x.png
public/social/how-to-build-saas-with-ai-non-developer.png
public/og/prochat-home.png
public/og/saaskit-product.png
public/og/uxkit-waitlist.png
```

Findings:

- four generic social-platform images have zero detected consumers and may be obsolete exports rather than runtime assets;
- current social previews are partly generated dynamically through OG/social-image code, so static asset retention must be validated against metadata behavior;
- the new platform requires a canonical company image plus product-specific Memory, QA, Workbench, and Philosophy variants only if approved;
- every final social asset must use current product names, typography, claims, and cobalt/grayscale styling.

## Icons

Twenty system SVG icons exist under `public/icons/system/`, and static search found zero direct consumers for all of them.

They include arrows, auth, automation, bug, checks, close, database, payments, psychology, runtime, schedule, SEO, shield, verified, and warning icons.

These are archive candidates but require proof against CSS URLs, MDX, email, runtime composition, and generated content before removal. Generic Lucide icons already cover many responsibilities.

## Potential personal, customer, or sensitive-data risks

No obvious customer screenshot or named personal-data file was identified by filename.

Files requiring manual inspection before retention or publication:

- both PDFs;
- all social and OG raster assets;
- old testimonial illustration;
- generated or embedded SVG text;
- any asset produced from repository or infrastructure screenshots;
- email brand assets that may encode private URLs or claims.

The 14.9 MB infrastructure PDF is the highest privacy and information-disclosure risk because its content was not parsed during this bounded inventory.

## Rights and provenance risks

Provenance or licence evidence is unclear for:

- AWS Activate logos;
- Material Symbols font;
- Host Grotesk files;
- Golos and JetBrains font files unless their source/licence is documented elsewhere;
- social-platform logos or screenshots;
- historical PDF documents;
- generated testimonial and old Memory illustrations;
- any third-party product marks embedded in SVG or PDF content.

Do not infer rights from repository presence alone.

## Protected assets

Protected until workflow migration:

- `logo-wordmark.svg` used by docs, payment, OG, and social generation;
- `logo-wordmark-email-dark.svg` used by waitlist email code;
- `public/email/logo-mark.png` until transactional email rendering is reviewed;
- Golos and JetBrains font files used by OG rendering;
- public sitemap XML files until route and SEO migration completes;
- favicons and touch icons until root metadata is replaced;
- background assets until the old global shell is isolated;
- legacy kit and ProChat OS OG assets until redirects, archives, and purchaser obligations are resolved.

## Zero-consumer candidates requiring proof

Static source search found no direct consumer for many files, including:

- both `.DS_Store` files;
- both PDFs;
- most hero background variants;
- `public/email/logo-mark.png`;
- favicon variants discovered conventionally;
- Host Grotesk public TTF;
- all 20 system icons;
- AWS logos;
- `logo-mark.svg`;
- `prochat_favicon.ico`;
- `prochat-home.png`;
- most generic social images;
- `prochat-memory/assets/cta.svg`;
- `sitemap-pages.xml`.

Zero direct source consumers do not authorize deletion because browser conventions, generated metadata, external URLs, CSS, MDX, email, or deployment systems may still use them.

## Asset records

Every asset ID is bound to one exact repository path below. Purpose, consumers, rights, privacy, accessibility, status, disposition, replacement, migration wave, validation, and rollback are defined by the relevant group and findings sections above.

| ID | Exact path | Bytes | Type |
|---|---|---:|---|
| ASSET-001 | `public/.DS_Store` | 6148 | system |
| ASSET-002 | `public/apple-touch-icon.png` | 2594 | PNG |
| ASSET-003 | `public/assets/ProChat-AI-Infrastructure-Overview.pdf` | 14882690 | PDF |
| ASSET-004 | `public/assets/backgrounds/hero-main-lines-dark-alternating.svg` | 11788 | SVG |
| ASSET-005 | `public/assets/backgrounds/hero-main-lines-dark-spaced.svg` | 11677 | SVG |
| ASSET-006 | `public/assets/backgrounds/hero-main-lines-dark.svg` | 11677 | SVG |
| ASSET-007 | `public/assets/backgrounds/hero-main-lines-light-alternating.svg` | 11803 | SVG |
| ASSET-008 | `public/assets/backgrounds/hero-main-lines-light-spaced.svg` | 11692 | SVG |
| ASSET-009 | `public/assets/backgrounds/hero-main-lines-light.svg` | 11692 | SVG |
| ASSET-010 | `public/assets/ssp.pdf` | 96783 | PDF |
| ASSET-011 | `public/email/logo-mark.png` | 9324 | PNG |
| ASSET-012 | `public/favicon-16.png` | 2069 | PNG |
| ASSET-013 | `public/favicon-32.png` | 2320 | PNG |
| ASSET-014 | `public/favicon.svg` | 1087 | SVG |
| ASSET-015 | `public/fonts/GolosText-Bold.ttf` | 67908 | TTF |
| ASSET-016 | `public/fonts/GolosText-Regular.ttf` | 67988 | TTF |
| ASSET-017 | `public/fonts/HostGrotesk-Regular.ttf` | 59532 | TTF |
| ASSET-018 | `public/fonts/JetBrainsMono-Regular.ttf` | 273900 | TTF |
| ASSET-019 | `public/fonts/material-symbols-outlined.ttf` | 945360 | TTF |
| ASSET-020 | `public/icons/system/arrow-downward.svg` | 173 | SVG |
| ASSET-021 | `public/icons/system/arrow-forward.svg` | 171 | SVG |
| ASSET-022 | `public/icons/system/auth.svg` | 335 | SVG |
| ASSET-023 | `public/icons/system/automation.svg` | 704 | SVG |
| ASSET-024 | `public/icons/system/bug-report.svg` | 445 | SVG |
| ASSET-025 | `public/icons/system/check-blue.svg` | 348 | SVG |
| ASSET-026 | `public/icons/system/check-green.svg` | 348 | SVG |
| ASSET-027 | `public/icons/system/check.svg` | 159 | SVG |
| ASSET-028 | `public/icons/system/close.svg` | 203 | SVG |
| ASSET-029 | `public/icons/system/db.svg` | 634 | SVG |
| ASSET-030 | `public/icons/system/frustrated-face.svg` | 508 | SVG |
| ASSET-031 | `public/icons/system/lock-filled.svg` | 456 | SVG |
| ASSET-032 | `public/icons/system/payments.svg` | 248 | SVG |
| ASSET-033 | `public/icons/system/psychology.svg` | 597 | SVG |
| ASSET-034 | `public/icons/system/runtime.svg` | 543 | SVG |
| ASSET-035 | `public/icons/system/schedule.svg` | 339 | SVG |
| ASSET-036 | `public/icons/system/seo.svg` | 194 | SVG |
| ASSET-037 | `public/icons/system/shield-tester.svg` | 259 | SVG |
| ASSET-038 | `public/icons/system/verified.svg` | 304 | SVG |
| ASSET-039 | `public/icons/system/warning-triangle-filled.svg` | 277 | SVG |
| ASSET-040 | `public/logo/aws-activate-logo-dark.svg` | 7107 | SVG |
| ASSET-041 | `public/logo/aws-activate-logo-light.svg` | 7133 | SVG |
| ASSET-042 | `public/logo/logo-mark.svg` | 1077 | SVG |
| ASSET-043 | `public/logo/logo-wordmark-email-dark.svg` | 6356 | SVG |
| ASSET-044 | `public/logo/logo-wordmark.svg` | 6604 | SVG |
| ASSET-045 | `public/logo/prochat_favicon.ico` | 105462 | ICO |
| ASSET-046 | `public/mask-icon.svg` | 1057 | SVG |
| ASSET-047 | `public/og/prochat-home.png` | 136458 | PNG |
| ASSET-048 | `public/og/saaskit-product.png` | 136458 | PNG |
| ASSET-049 | `public/og/uxkit-waitlist.png` | 136458 | PNG |
| ASSET-050 | `public/prochat-memory/assets/about.svg` | 2612 | SVG |
| ASSET-051 | `public/prochat-memory/assets/capabilities.svg` | 2896 | SVG |
| ASSET-052 | `public/prochat-memory/assets/cta.svg` | 2461 | SVG |
| ASSET-053 | `public/prochat-memory/assets/hero.svg` | 7995 | SVG |
| ASSET-054 | `public/prochat-memory/assets/lab-1.svg` | 2921 | SVG |
| ASSET-055 | `public/prochat-memory/assets/lab-2.svg` | 2912 | SVG |
| ASSET-056 | `public/prochat-memory/assets/lab-3.svg` | 2894 | SVG |
| ASSET-057 | `public/prochat-memory/assets/lab-4.svg` | 2884 | SVG |
| ASSET-058 | `public/prochat-memory/assets/method-1.svg` | 2849 | SVG |
| ASSET-059 | `public/prochat-memory/assets/method-2.svg` | 3296 | SVG |
| ASSET-060 | `public/prochat-memory/assets/method-3.svg` | 2543 | SVG |
| ASSET-061 | `public/prochat-memory/assets/method-4.svg` | 2889 | SVG |
| ASSET-062 | `public/prochat-memory/assets/testimonial.svg` | 3626 | SVG |
| ASSET-063 | `public/prochat-memory/assets/work-1.svg` | 2887 | SVG |
| ASSET-064 | `public/prochat-memory/assets/work-2.svg` | 2861 | SVG |
| ASSET-065 | `public/sitemap-pages.xml` | 1688 | XML |
| ASSET-066 | `public/sitemap.xml` | 505 | XML |
| ASSET-067 | `public/social/fb.png` | 13090 | PNG |
| ASSET-068 | `public/social/how-to-build-saas-with-ai-non-developer.png` | 171751 | PNG |
| ASSET-069 | `public/social/insta.png` | 26759 | PNG |
| ASSET-070 | `public/social/linkedin.png` | 17447 | PNG |
| ASSET-071 | `public/social/x.png` | 21354 | PNG |
| ASSET-072 | `src/assets/.DS_Store` | 6148 | system |
| ASSET-073 | `src/assets/fonts/HostGrotesk-latin.woff2` | 20196 | WOFF2 |
| ASSET-074 | `src/assets/styles/backgrounds.scss` | 11677 | SCSS |
| ASSET-075 | `src/assets/styles/globals.scss` | 28652 | SCSS |

The grouped migration records below assign each path its provisional lifecycle and safety boundary.

| ID range | Asset group | Count | Primary status | Provisional disposition | Wave | Highest risk |
|---|---|---:|---|---|---:|---|
| ASSET-001–ASSET-002 | repository/system metadata files (`.DS_Store`) | 2 | UNUSED CANDIDATE | ARCHIVE/REMOVE after proof | 8 | LOW |
| ASSET-003–ASSET-008 | global hero-line background SVG variants | 6 | LEGACY VISUAL | ARCHIVE | 1/8 | HIGH |
| ASSET-009–ASSET-010 | public PDFs | 2 | UNVERIFIED/HISTORICAL | ARCHIVE after content/rights review | 8 | CRITICAL |
| ASSET-011–ASSET-019 | email, favicon, touch, and font assets | 9 | MIXED PROTECTED/LEGACY | KEEP/REPLACE/ARCHIVE | 1/6/8 | CRITICAL |
| ASSET-020–ASSET-039 | system SVG icon library | 20 | ZERO-CONSUMER CANDIDATE | ARCHIVE after proof | 2/8 | MEDIUM |
| ASSET-040–ASSET-046 | company, email, favicon, and AWS logo assets | 7 | MIXED BRAND/THIRD-PARTY | KEEP/REPLACE/ARCHIVE | 1/6/8 | HIGH |
| ASSET-047–ASSET-049 | Open Graph images | 3 | CURRENT/LEGACY MIX | REPLACE/ARCHIVE | 6/8 | HIGH |
| ASSET-050–ASSET-064 | old Memory illustration set | 15 | LEGACY PRODUCT VISUAL | ARCHIVE after `/memory` replacement | 4/8 | HIGH |
| ASSET-065–ASSET-066 | sitemap XML files | 2 | CURRENT/LEGACY MIX | REBUILD/VERIFY | 6/7 | HIGH |
| ASSET-067–ASSET-071 | generic and historical social images | 5 | LEGACY/UNUSED CANDIDATE | REPLACE/ARCHIVE | 6/8 | MEDIUM |
| ASSET-072–ASSET-075 | local Host font and SCSS source assets | 4 | LEGACY ROOT STYLE | REPLACE/ARCHIVE | 1/8 | CRITICAL |

## Validation before migration

- exact import, URL, CSS, MDX, email, generated-content, and deployment reference search;
- manual PDF and image content inspection;
- file provenance and licence verification;
- image dimensions, compression, and responsive behavior review;
- SVG sanitization and embedded-text inspection;
- metadata and social preview review;
- font request and layout-shift measurement;
- broken-asset crawl;
- protected route and email rendering tests;
- zero-consumer proof before archive/removal.

## Unresolved decisions

1. Final archive location and whether archived public assets remain deployable or repository-only.
2. Whether the infrastructure PDFs contain useful current material, private implementation details, or obsolete claims.
3. Which brand mark and favicon variants become canonical.
4. Whether AWS logos have an approved ongoing public use.
5. Whether static social-platform images are needed after dynamic social generation.
6. Whether old Memory illustrations have historical value beyond repository archive.
7. Whether the system icon set is used by generated documentation or external consumers.
8. Whether current sitemap XML files remain authoritative during the route migration.
