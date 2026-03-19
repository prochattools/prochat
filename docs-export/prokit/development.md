# ProKit Studio Development

ProKit Studio development follows a lean Postgres contract with Prisma migrations and a few helper scripts.

Use `docs/public/README.md` as the public docs entrypoint if you are starting from scratch.

## Prerequisites

- Node.js 18+ (20+ recommended)
- A reachable Postgres database

## Required environment variables

- `DATABASE_URL`

## Quick start

```bash
cp .env.example .env
# set DATABASE_URL in .env

npm run db:init
npm run db:migrate:dev
npm run dev
```

`db:init` only validates that the configured `DATABASE_URL` is reachable, while `db:migrate:dev` runs Prisma migrations against the same connection string.

`npm run dev` automatically triggers the `predev` hook first, which runs env bootstrap, `db:init`, and `db:migrate:dev`.

## Recommended starter stack

- Supabase for managed Postgres (default reference)
- Vercel for deploy-on-push hosting

These are recommended starters, not lock-in requirements: any Postgres provider and any host that can run Node 18+ can power this boilerplate.
