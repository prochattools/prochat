# ProKit - Troubleshooting

Short, repo-specific checks for common failures.

## Build/runtime issues

- Clear Next.js cache:

```bash
rm -rf .next
npm run dev
```

- Reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Database issues

- Connection refused:
  - Ensure Docker is running and port `5433` is mapped (or set `POSTGRES_PORT`).
- Prisma migrate dev fails:
  - Confirm `SHADOW_DATABASE_URL` is set to the admin connection (same as `SYSTEM_DATABASE_URL`).
- Reset dev tenant (drops `tenant_<slug>`; last resort; destructive):

```bash
npm run db:cleanup -- --slug <slug> --force
npm run db:init
npm run db:migrate:dev
```

## Dokploy deploy gate failures

- Missing Postgres tools:
  - Ensure Nixpacks installs the correct client version (`nixpacks.toml`).
- Backup mount missing:
  - Verify bind mount `/var/backups/pgdump` -> `/var/backups/pgdump` (RW).
