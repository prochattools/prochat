# Dokploy Deployment Steps

Dokploy should use:

- build command: `npm run build`
- start command: `npm run start`

`npm run start` now enforces schema readiness by running `sh scripts/deploy/prepare-production.sh` before Next starts. That provisions the tenant schema and applies `prisma migrate deploy`, so schema changes such as the licensing tables are created before the app begins serving traffic.

If operators want earlier failure, Dokploy can still run the same helper as an optional pre-deploy command:

```sh
sh scripts/deploy/prepare-production.sh
```
