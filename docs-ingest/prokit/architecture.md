# Architecture

ProKit Studio is a lean SaaS core boilerplate.

## Core Stack

- Next.js App Router + TypeScript
- Prisma + Postgres
> Legacy boilerplate reference only. It does not describe active ProChat runtime authentication. ProChat runtime authentication direction is Ory.

- Clerk integration hooks (optional)
- Stripe integration hooks (optional)
- Resend integration hooks (optional)

## Database Runtime Model

- App runtime uses one connection string: `DATABASE_URL`
- Prisma migrations run against that URL
- No tenant schema/user lifecycle

## Route Groups

- Public entry: `/` and `/setup`
- App routes: `src/app/(app)/**`

## Production Start Path

- `npm start` -> `scripts/runtime/start-prod.sh`
- `start-prod.sh` -> `scripts/db/deploy-prod.sh`
- `deploy-prod.sh` -> `npm run db:migrate:prod`
- App process starts after migration deploy succeeds
