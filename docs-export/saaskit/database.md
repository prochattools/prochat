# Database

SaaSKit uses Supabase Cloud for both development and production.

## Core model in this repo

- The app connects through one variable: `DATABASE_URL`
- Prisma migrations run against the database in that `DATABASE_URL`
- There is no tenant-schema setup in this boilerplate

## Required setup: two Supabase projects

Create two separate projects at `https://supabase.com`:
1. `SaaSKit - Dev`
2. `SaaSKit - Prod`

Use them for different purposes:
- Dev project: testing and safe experimentation
- Prod project: real users and real data

Do not use one database for both.

## Values to copy from each Supabase project

In each project go to:
- `Settings -> Database` (for `DATABASE_URL`)
- `Settings -> API` (for project URL and keys, only if needed)

You may copy:
- `DATABASE_URL` (required)
- `NEXT_PUBLIC_SUPABASE_URL` (optional)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (optional)
- `SUPABASE_SERVICE_ROLE_KEY` (optional)

Important:
- SaaSKit core runtime requires only `DATABASE_URL`
- Supabase API keys are only needed if you add Supabase API usage in custom code

## Local development setup

In local `.env`, use your Dev Supabase values:

```bash
DATABASE_URL=your_dev_database_url
APP_ENV=development

# optional for custom Supabase API usage
NEXT_PUBLIC_SUPABASE_URL=your_dev_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_dev_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_dev_service_role_key
```

Now when you run `npm run dev`, local work uses your Dev database.

## Production setup (Vercel)

In Vercel Project Settings -> Environment Variables, use your Prod Supabase values:

```bash
DATABASE_URL=your_prod_database_url
APP_ENV=production

# optional for custom Supabase API usage
NEXT_PUBLIC_SUPABASE_URL=your_prod_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_prod_service_role_key
```

Now production deployment uses your Prod database.

## Safety rules

1. Never reuse production keys locally.
2. Never deploy with Dev database values in Vercel production env.
3. Treat Prisma migrations as source of truth:
   - change schema locally
   - run migrations on Dev
   - test
   - then deploy and migrate Prod
4. Do not manually edit production tables in Supabase unless absolutely necessary.

## If Dev gets messy

Reset only the Dev Supabase project from Supabase dashboard, or recreate the Dev project.

Production stays untouched when your environments are separated correctly.

## Vercel build migration behavior

On Vercel production builds:
- `db:migrate:vercel-build` runs migration deploy automatically

Emergency bypass:
- `SAASKIT_DISABLE_VERCEL_BUILD_MIGRATIONS=true`

## Mental model

- Dev = playground
- Prod = real world

Never mix them.
