# Database

This document describes the current database boundary for the lean ProChat repository.

## Connections

- `DATABASE_URL` — runtime tenant-scoped Prisma connection.
- `SYSTEM_DATABASE_URL` — provisioning, migration, and cleanup connection.
- `SHADOW_DATABASE_URL` — Prisma migrate-dev shadow connection.
- `TENANT_DB_PASSWORD` — provisioning credential for tenant-role setup.
- `APP_SLUG` — tenant/application slug used by provisioning scripts.

See `.env.example` and `docs-public/environment.md` for the active environment contract.

## Current runtime usage

The public website primarily uses database-backed behavior for retained tenant/project infrastructure and beta-interest/waitlist data where applicable.

Database commands remain operational infrastructure and can be destructive. Follow `REPO_OPERATIONS.md`; do not run production cleanup or migration commands casually.

## Prisma schema and historical residue

`prisma/system.prisma` still contains several historical/compatibility models, including legacy `License`, `LicenseEvent`, and `Subscription` tables.

Current source audits show no active application runtime consumers for those legacy licence/subscription models after the lean commerce/licensing retirement.

Their continued schema presence must **not** be interpreted as an active public commerce capability. They are database compatibility/history residue until a separately approved schema/data-retention migration removes them safely.

## Retired application behavior

The lean application no longer implements:

- Stripe checkout/webhook/subscription runtime;
- application licence administration;
- licence claim/finish/recovery flows;
- purchaser GitHub entitlement provisioning.

No licences were sold according to the owner-confirmed lean cleanup decision. Application code for those flows was removed.

## Migration discipline

Before changing Prisma/database structure:

1. identify current code consumers;
2. distinguish live data obligations from historical residue;
3. define migration and rollback behavior;
4. validate against the intended tenant/system database context;
5. avoid destructive production cleanup without explicit approval;
6. update this document and the environment contract if runtime requirements change.

## Local development

Local Docker/Postgres mappings may differ from production. Use the URLs in your local env file rather than assuming a port/schema.

The repository does not implicitly create a production database. Provisioning/migration scripts expect the target database/service to exist.
