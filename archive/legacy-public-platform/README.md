# ProChat Legacy Public Platform Archive

**Owner:** Steve Westhoek  
**Status:** historical, non-authoritative, and non-runtime  
**Canonical migration authority:** [`docs/migration/MIGRATION_MATRIX.md`](../../docs/migration/MIGRATION_MATRIX.md)

## Purpose

This directory preserves approved historical ProChat public-platform implementation for inspection and rollback evidence. It is not an active application root, product source, compatibility runtime, package workspace, or source of current company truth.

Current authority lives in:

- [`PRODUCT.md`](../../PRODUCT.md)
- [`DESIGN.md`](../../DESIGN.md)
- [`brand-spec.md`](../../brand-spec.md)
- [`docs/migration/MIGRATION_MATRIX.md`](../../docs/migration/MIGRATION_MATRIX.md)
- [`docs/migration/ARCHIVE_ARCHITECTURE.md`](../../docs/migration/ARCHIVE_ARCHITECTURE.md)

Archived copy, product names, claims, screenshots, styles, components, integrations, dependencies, and implementation patterns require current product, design, legal, privacy, security, accessibility, and performance review before any reuse.

## Prohibited runtime use

Production code must never import, re-export, dynamically import, or require content from:

```text
archive/legacy-public-platform/**
```

The archive must not:

- contain executable source extensions such as `.ts`, `.tsx`, `.js`, `.jsx`, `.css`, `.scss`, or `.mdx`;
- register Next.js routes, layouts, handlers, middleware, cron jobs, or webhooks;
- be included in TypeScript application compilation;
- be included in Tailwind content scanning;
- be copied into public build output;
- be linked from active navigation;
- be included in metadata, robots, sitemap, search, or structured-data generation;
- be deployed as a hidden or historical website;
- execute scripts, integrations, or package entry points;
- supply fallback content to the active platform.

The scoped repository guard runs through:

```text
node scripts/design/lint-design-system.mjs --archive-imports-only
```

The default `npm run lint:design` command also includes the same guard, but it additionally evaluates the existing design-token baseline. The scoped command scans active source files and rejects literal static imports, re-exports, dynamic imports, and `require` calls containing `archive/legacy-public-platform`. It also runs in-memory positive and negative fixture tests, so no temporary validation file is left behind.

## Protected obligations

Archiving public presentation does not cancel protected obligations. The migration matrix remains authoritative for:

- previous purchasers and licence holders;
- Stripe checkout, billing, portal, subscriptions, webhooks, and invoices;
- purchaser claim, access, finish, and revocation flows;
- legal and contractual retention requirements;
- customer, subscriber, contact, and project data;
- authentication and administration;
- Prisma/PostgreSQL records and migrations;
- Contact, unsubscribe, transactional email, and required communications;
- analytics, monitoring, and operational health;
- compatibility-only BuildFlow identifiers and persisted records.

Protected functionality stays active outside this archive until its own approved migration packet proves replacement or retirement.

## Manifest requirement

Every moved path must be recorded in [`manifest.yaml`](./manifest.yaml) before the move is committed. The manifest records the migration ID, original path, archive destination, canonical replacement, redirect, obligations, source commit, migration commit, validation, rollback, approval, and owner.

No existing implementation has been moved into the archive during Wave 0 Packet 1.

## Restoration

Restoration is a new migration, not direct reuse.

A restoration packet must:

1. read the archived source as historical evidence;
2. create or restore a reviewed active implementation outside `archive/**`;
3. reconcile current product truth, copy, design, security, privacy, accessibility, performance, licences, and dependencies;
4. add or update a migration-matrix decision;
5. validate the active implementation independently;
6. commit the restoration with an explicit rollback boundary.

Production code must never import directly from the archive as a restoration shortcut.

## Repository hygiene

Do not place secrets, `.env` files, credentials, private keys, database dumps, customer exports, generated build output, dependency folders, or caches in this archive.

The archive is inspectable through Git history and repository reads only. Presence here does not mean that content remains supported, licensed, secure, accurate, or suitable for public use.
