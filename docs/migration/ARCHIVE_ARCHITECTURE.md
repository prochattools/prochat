# ProChat Archive Architecture

**Status:** canonical migration architecture  
**Scope:** historical public-platform code, content, assets, integrations, documentation, and product systems  
**Owner:** Steve Westhoek  
**Authority:** `LEGACY_SWEEP_PLAN.md` and `MIGRATION_MATRIX.md`

## Purpose

The archive creates a hard boundary between the new canonical ProChat public platform and historical implementation that must remain inspectable without remaining active, importable, indexable, or deployable.

The archive is not a compatibility runtime, package workspace, source alias, hidden route tree, or staging area for unfinished production code.

## Canonical repository root

```text
archive/legacy-public-platform/
```

This path sits outside:

```text
src/
public/
app/
pages/
styles/
packages/
```

Therefore archived implementation is excluded from normal Next.js route discovery, TypeScript application compilation, Tailwind content scanning, public static serving, sitemap generation, and runtime imports.

## Required structure

```text
archive/legacy-public-platform/
├── README.md
├── manifest.yaml
├── routes-and-pages/
│   ├── public/
│   ├── internal-snapshots/
│   └── route-metadata/
├── components/
│   ├── marketing/
│   ├── product-specific/
│   ├── content/
│   └── compatibility/
├── styles-and-themes/
│   ├── global/
│   ├── memory-editorial/
│   ├── documentation-glass/
│   ├── waitlist/
│   └── fonts/
├── motion/
│   ├── framer-motion/
│   ├── css-keyframes/
│   ├── observers-and-scroll/
│   └── experiments/
├── assets/
│   ├── brand-history/
│   ├── product-images/
│   ├── social-and-og/
│   ├── documents/
│   ├── fonts/
│   └── third-party/
├── documentation/
│   ├── product-history/
│   ├── public-copy/
│   ├── guides-and-prompts/
│   └── implementation-notes/
├── scripts-and-integrations/
│   ├── waitlists-and-newsletters/
│   ├── mailerlite/
│   ├── github/
│   ├── make/
│   ├── n8n/
│   ├── social-publishing/
│   └── documentation-generation/
└── legacy-product-systems/
    ├── buildflow/
    ├── prochat-os/
    ├── kits/
    │   ├── prokit/
    │   ├── saaskit/
    │   ├── uxkit/
    │   └── waaskit/
    ├── ai-workflows/
    ├── legal-ai-workflows/
    ├── studio/
    ├── events/
    ├── proof/
    ├── starting-point/
    └── legacy-resources/
```

Directories are created only when the first approved packet needs them. Empty scaffolding is not required.

## Archive README contract

`archive/legacy-public-platform/README.md` must state:

- the archive is historical and non-authoritative;
- canonical company and product truth lives in Mind and active ProChat documentation;
- archived code must not be imported by production code;
- archived copy and claims must not be reused without current review;
- archived dependencies are not automatically supported;
- protected purchaser, legal, data, auth, and commerce obligations remain governed by the migration matrix;
- restoration requires a new approved migration task, exact source review, validation, and a separate commit.

## Manifest contract

`manifest.yaml` is the source-level movement ledger.

```yaml
archive:
  version: 1
  root: archive/legacy-public-platform
  canonical_authority:
    - PRODUCT.md
    - DESIGN.md
    - brand-spec.md
    - docs/migration/MIGRATION_MATRIX.md
  entries:
    - id: ROUTE-017
      original_path: src/app/buildflow
      archive_path: archive/legacy-public-platform/legacy-product-systems/buildflow/routes
      disposition: ARCHIVE
      replacement: src/app/workbench
      moved_at: null
      source_commit: null
      migration_commit: null
      public_redirect: /workbench
      noindex_before_retirement: true
      protected_obligations: []
      validation: []
      rollback_commit: null
      owner: Steve Westhoek
      approval: pending_execution
```

Every moved path must have one entry. One manifest entry may cover a directory only when all children share the same disposition and rollback boundary.

## Build and runtime exclusion

Archived code must not:

- appear in TypeScript `include` paths;
- appear in Tailwind `content` paths;
- be referenced by import aliases;
- be copied into `.next` or public build output;
- be imported dynamically;
- be linked from active navigation;
- be included in sitemap generation;
- be indexed by search engines;
- register API routes, middleware, cron jobs, webhooks, or background tasks;
- execute package scripts;
- supply active metadata or structured data;
- become a fallback content source.

Validation must prove these exclusions after every archive packet.

## Public access and indexing

The repository archive is not publicly routed.

```yaml
public_route: null
indexable: false
sitemap: false
robots_entry_required: false
navigation_link: false
runtime_access: false
```

Historical public URLs receive one of:

- a canonical redirect;
- an explanatory redirect;
- a temporary `noindex` page while obligations are resolved;
- a verified 404 or 410 only after redirect, legal, purchaser, and inbound-link review.

The archive itself is never the redirect destination.

## Import restrictions

Production source must never import from:

```text
archive/**
```

Required enforcement:

- an ESLint restricted-import rule or equivalent repository validation;
- a build-time search for `archive/legacy-public-platform` imports;
- no TypeScript path alias for archive content;
- no package export from the archive root;
- no barrel file that exposes archived modules.

Archived code may be read manually by maintainers and AI tools as historical evidence only.

## Protected functionality boundary

Protected runtime functionality is not moved into the historical archive merely because its UI or public product framing is legacy.

Protected functionality stays active and isolated until its own packet proves retirement or replacement:

- authentication and account access;
- admin access and licence revocation;
- Stripe checkout, portal, webhook, subscriptions, and purchaser access;
- Prisma/PostgreSQL data and migrations;
- Contact submission and transactional email;
- previous-purchaser kit claim and finish flows;
- unsubscribe and legally required communication controls;
- health checks and operational monitoring;
- required analytics and observability;
- project/chat functionality until internal-product scope is explicitly closed.

Where a protected function is visually coupled to a legacy page, archive the public shell only after creating a minimal compatibility route or protected internal shell.

## Compatibility-only boundary

Compatibility material remains active only when external identifiers, stored data, API contracts, or historical links require it.

Examples:

- BuildFlow operation IDs, package names, environment variables, persisted run records, and source identifiers;
- old route aliases while canonical redirects are required;
- legacy purchaser product identifiers used by Stripe, licences, invoices, or database rows;
- webhook event handling for existing obligations.

Compatibility identifiers must not appear as current public products.

## Archive movement procedure

1. Verify the migration-matrix row is `DECIDED` or `BLOCKED_BY_OBLIGATION`, never merely inventoried.
2. Identify exact consumers, imports, routes, assets, metadata, scripts, and packages.
3. Build and validate the canonical replacement or compatibility boundary.
4. Capture source commit and rollback point.
5. Add the manifest entry.
6. Move only the approved paths.
7. Update imports, redirects, metadata, navigation, sitemap, scripts, and package references in the same bounded packet when required.
8. Run type check, build, browser tests, route crawl, security scan, archive-import check, and protected-flow tests.
9. Commit exact paths.
10. Mark the matrix row `ARCHIVED`, `REDIRECTED`, or `REMOVED` only after validation evidence exists.

## Rollback and restoration

Rollback uses Git history first, not manual copying.

Every archive packet records:

- pre-migration commit;
- migration commit;
- exact moved paths;
- replacement paths;
- redirects;
- package and lockfile changes;
- validation evidence;
- rollback command or commit reference.

Restoration rules:

- restore to a new reviewed active path, never import directly from the archive;
- re-evaluate product truth, security, accessibility, performance, licences, and dependencies;
- update claims and copy before public exposure;
- create a new migration-matrix row when responsibility materially changes;
- require explicit approval for any restored public route or integration.

## Archive ownership metadata

Each top-level archived system must include either a README or manifest metadata with:

```yaml
owner: Steve Westhoek
historical_product: ""
original_public_routes: []
canonical_replacement: null
reason_archived: ""
known_obligations: []
security_notes: []
licence_notes: []
last_verified_commit: ""
restoration_allowed: false
```

## Prohibited archive behavior

Never:

- deploy the archive as a hidden website;
- expose archived APIs;
- use archived copy as current documentation;
- retain secrets, `.env` files, private keys, customer exports, or database dumps;
- archive generated build output or vendor directories;
- move protected transactional code without validation;
- duplicate active code indefinitely in both source and archive;
- treat archive presence as licence or security approval.

## Completion criteria

The architecture is working when:

- active source contains only canonical public platform and explicitly protected runtime systems;
- archive content cannot compile, route, import, index, or deploy;
- every archived path has a manifest entry and source commit;
- all public legacy URLs have an approved outcome;
- protected obligations remain reachable and tested;
- BuildFlow and ProChat OS no longer appear as current public products;
- future maintainers can inspect history without mistaking it for active design or product truth.
