# ProChat Asset Audit

**Status:** canonical audit specification  
**Scope:** logos, icons, illustrations, screenshots, social images, photos, video, SVG, fonts, favicons, and public static files

## Purpose

The asset audit identifies every public and build-time asset, its owner, consumer, rights, visual role, performance cost, and migration disposition.

Assets must not preserve obsolete product identities, unsupported claims, or unnecessary page weight.

## Required record

```yaml
id: "ASSET-000"
path: ""
type: "logo | icon | illustration | screenshot | social-image | photo | video | svg | font | favicon | other"
current_purpose: ""
consumers: []
public_url: ""
owner_or_source: ""
licence_or_rights: ""
contains_text: false
contains_product_claim: false
contains_personal_or_customer_data: false
dimensions: ""
file_size_bytes: 0
format: ""
responsive_variants: []
alt_text_or_accessibility: ""
status: "CURRENT | DUPLICATE | LEGACY | UNVERIFIED | UNSAFE | UNUSED"
disposition: "KEEP | OPTIMIZE | REPLACE | ARCHIVE | DELETE"
canonical_replacement: ""
migration_wave: 0
validation: []
rollback: ""
deletion_approved: false
owner: ""
notes: ""
```

## Inventory targets

Audit:

- `public/**`;
- imported images;
- inline and external SVG;
- favicons and manifests;
- Open Graph and social images;
- logos and wordmarks;
- product screenshots;
- generated diagrams;
- stock or generated imagery;
- video and animation files;
- font files and font packages;
- icon packages and custom icon folders;
- files referenced only from archived routes or documentation.

## Brand audit

Flag assets containing:

- legacy product names;
- old logos;
- obsolete palettes;
- old fonts;
- unapproved gradients;
- BuildFlow presented as a public product;
- ProChat OS or kit branding;
- unsupported pricing or product claims;
- obsolete URLs;
- outdated UI screenshots.

An asset that embeds stale copy must be treated as content and design debt, not only a file-format issue.

## Product-visual strategy

Preferred public product explanation:

```text
semantic HTML + CSS + SVG
```

Use raster screenshots only when a stable real interface is the evidence being shown.

Do not use generated imagery as the primary explanation of Memory or Workbench.

Atmospheric imagery may be considered later only when it supports the company narrative and does not replace product understanding.

## SVG audit

Check:

- accessible title or hidden decorative status;
- embedded text;
- path complexity;
- filters and masks;
- hard-coded legacy colors;
- IDs that collide when inlined;
- unnecessary metadata;
- responsiveness;
- sanitization;
- animation coupling.

Prefer currentColor or semantic tokens where appropriate.

## Image audit

Check:

- source dimensions;
- actual rendered dimensions;
- responsive `sizes`;
- explicit width and height;
- compression;
- format suitability;
- lazy loading;
- priority usage;
- crop behavior;
- dark/light compatibility;
- alt text;
- claim and privacy safety.

## Font audit

Canonical fonts:

```text
Golos Text
JetBrains Mono
```

For every font file or package, record:

- licence;
- source;
- subsets;
- weights;
- variable/static format;
- preload behavior;
- consumer;
- layout-shift risk;
- removal dependency.

Do not share font files outside the repository or artifact workflow.

## Icon audit

Prefer one consistent icon system per surface.

Audit:

- Lucide usage;
- custom SVG icons;
- duplicate icon packages;
- filled versus outlined inconsistency;
- accessibility labels;
- icons used as the only state indicator;
- unnecessary bundle cost.

Custom icons are justified when they represent ProChat-specific product concepts that generic icons cannot explain.

## Social and metadata assets

For each indexable page, define whether it requires:

- default company Open Graph image;
- product-specific image;
- QA edition image;
- Workbench image;
- philosophy or article image.

Social assets must use current typography, palette, product naming, and canonical claims.

## Privacy and rights

Do not retain or publish assets containing:

- real customer data without explicit authorization;
- private repositories or paths;
- credentials or tokens;
- identifiable logs or screenshots;
- unlicensed photography or illustration;
- third-party trademarks used misleadingly.

## Migration method

1. Inventory files and consumers.
2. Verify source and rights.
3. Classify brand and product relevance.
4. Optimize retained assets.
5. Build approved replacements.
6. Update consumers and metadata.
7. Verify visual and performance output.
8. Archive or delete only after zero-consumer search.

## Validation

- static asset reference search;
- broken asset crawl;
- bundle and transfer-size review;
- image-dimension and layout-shift checks;
- SVG sanitization and accessibility review;
- metadata preview review;
- licence and provenance review;
- visual regression;
- zero-consumer search before deletion.

## Completion criteria

- every active asset has a consumer and purpose;
- no current public asset contains legacy branding or unsupported claims;
- retained assets have verified rights and accessibility behavior;
- image and font loading meet performance budgets;
- duplicate icon and font systems are removed when safe;
- obsolete assets are archived or deleted after consumer verification.
