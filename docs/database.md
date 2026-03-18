# Database

This is the canonical database model for ProChat.

The repo uses a schema-per-app pattern inside an existing Postgres database. ProChat scripts provision schemas and tenant users, but they do not create databases.

## Core model

For each app slug:

- schema: `tenant_<slug>`
- tenant database user: `tenant_<slug>_user`

Example:

- slug: `prochat`
- schema: `tenant_prochat`
- user: `tenant_prochat_user`

The runtime connects through the tenant user. Infra scripts connect through an admin URL.

## What is provisioned

The provisioning scripts in [scripts/db/init-tenant.js](/Users/Office/Repos/Organisation/ProChat/Web/prochat/scripts/db/init-tenant.js) do the following:

1. validate the slug
2. derive the schema and tenant user names
3. create the schema if it does not exist
4. create or update the tenant role
5. revoke access outside the tenant schema
6. grant privileges inside the tenant schema
7. set the tenant role search path to that schema
8. create or update the infra registry row in `public.tenants`

The script is idempotent and is safe to rerun for the same slug.

## Slug rules

The implementation currently accepts lowercase letters, numbers, and underscores:

- valid pattern: `[a-z0-9_]+`

That matters because the script derives SQL identifiers directly from the slug.

## `public.tenants` registry

`public.tenants` exists for infrastructure bookkeeping only.

It is used by provisioning and cleanup scripts to track:

- `slug`
- `schema_name`
- `db_user`
- `db_password`
- `type`
- `external_id`
- timestamps

The application runtime is not supposed to use `public.tenants` for request handling.

## Tenant types

The scripts currently support two tenant types:

- `prod`
- `preview`

`prod` is the default.

`preview` is only set when `db:init` is run with `--preview`. Cleanup logic is intentionally stricter for non-preview tenants.

## Provisioning entry points

Primary commands:

- `npm run db:init -- --slug <slug>`
- `npm run db:init -- --slug <slug> --preview`
- `npm run db:init -- --slug <slug> --external-id <id>`

Higher-level wrapper:

- `npm run provision:auto`

`provision:auto` resolves the environment, calls `db:init`, and then runs the correct Prisma migration command.

## Cleanup flow

Cleanup is implemented in `scripts/db/cleanup-tenant.js`.

Command:

- `npm run db:cleanup -- --slug <slug>`

Behavior:

- looks up the slug in `public.tenants`
- refuses to remove non-preview tenants unless `--force` is used
- drops the tenant schema
- drops the tenant user
- removes the registry row

## Prisma ownership

The schema is defined in [prisma/system.prisma](/Users/Office/Repos/Organisation/ProChat/Web/prochat/prisma/system.prisma).

Current models include:

- `Subscription`
- `Project`
- `Audiences`
- `WaitlistSignup`
- `License`
- `LicenseEvent`

Prisma commands used by the repo:

- development: `prisma migrate dev --schema=prisma/system.prisma`
- production: `prisma migrate deploy --schema=prisma/system.prisma`

## Environment split

The full env contract lives in [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md).

At a database level, the important split is:

- runtime uses `DATABASE_URL`
- provisioning and cleanup scripts use `SYSTEM_DATABASE_URL`
- Prisma dev migrations use `SHADOW_DATABASE_URL`

This split is intentional and should not be collapsed in documentation.

## Production posture

Production assumes:

- an existing Postgres database
- schema-only provisioning inside that database
- provisioning and migrations happen from the build pipeline
- runtime connects as the tenant-scoped database user

The docs should not describe database creation, multi-database tenancy, or runtime schema discovery because those are not the current implementation.

## Related references

- [deployment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/deployment.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md)
- [development.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/development.md)
- [tenant-cleanup.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/tenant-cleanup.md)
