# ProKit Studio Script Surface

This wrapper exposes a simplified script contract.

## Core runtime/deploy scripts

- `npm start` -> `scripts/runtime/start-prod.sh`
- `scripts/runtime/start-prod.sh` -> `scripts/db/deploy-prod.sh`
- `scripts/db/deploy-prod.sh` -> `npm run db:migrate:prod`

## Database commands

- `npm run db:init` -> validate `DATABASE_URL` connection
- `npm run db:migrate:vercel-build` -> run `db:migrate:prod` only on Vercel production builds
- `npm run db:migrate:dev` -> local/dev Prisma migration flow
- `npm run db:migrate:prod` -> production Prisma migration deploy
- `npm run verify:deploy` -> Prisma migration status check

`db:migrate:vercel-build` can be disabled with `PROKIT_STUDIO_DISABLE_VERCEL_BUILD_MIGRATIONS=true`.

## Wrapper helpers

- `npm run prokit-studio:bootstrap`
- `npm run prokit-studio:migrate`
