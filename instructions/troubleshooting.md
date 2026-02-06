# SaaSKit - Troubleshooting

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

- Connection refused: ensure Docker is running and port `5433` is mapped (or update `POSTGRES_PORT`).
- Prisma migrate dev fails: confirm `SHADOW_DATABASE_URL` is set to the admin connection.
- Reset dev DB:
  ```bash
  npx prisma migrate reset --schema=prisma/system.prisma
  ```

## Dokploy deploy gate failures

- Missing Postgres tools: ensure Nixpacks installs the correct client version (`nixpacks.toml`).
- Backup mount missing: verify bind mount `/var/backups/pgdump` -> `/var/backups/pgdump`.
- Verify deploy status: check Dokploy logs for `[deploy]` and for `deploy failed`. The gate writes `/var/backups/pgdump/$APP_SLUG/last_run.status` for diagnostics.

## Optional feature setup

- Blog not showing posts:
  - Set `WP_REST_ENDPOINT` (recommended: `https://example.com/wp-json`).
- Waiting list returns 501:
  - Set `RESEND_API_KEY`.
- Checkout says Stripe not configured:
  - Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`.
- Sign-in / dashboard issues:
  - Set `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.

## Release issues

- Deploys are tag-gated. Make sure you pushed a tag (example: `v1.0.0`).
