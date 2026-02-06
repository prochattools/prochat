# Deployment (Dokploy + Nixpacks)

SaaSKit is optimized for Dokploy Super Base virtual machines. Use Nixpacks as the primary build system; the Dockerfile is optional only.

## Required environment variables
```bash
NODE_ENV=production
PROCHAT_VERSION=<release-version>  # should match the git tag version (e.g. 1.0.0)
APP_SLUG=<repo-name>
TENANT_DB_PASSWORD=<strong-password>
DATABASE_URL=postgresql://tenant_<slug>_user:<TENANT_DB_PASSWORD>@<db-host>:5433/postgres?schema=tenant_<slug>
SYSTEM_DATABASE_URL=postgresql://<admin-user>:<admin-password>@<db-host>:5433/postgres?schema=public
NEXT_PUBLIC_APP_URL=https://prochat.tools
PORT=3000
```

Tip: use the values written to `.env.production` by the provisioning script as the source for Dokploy env vars.

## Hands-Off Production (Required)
Production is hands-off by design:
- Do not exec into the container to run provisioning/migrations.
- Do not run database commands manually in production.
- If something is wrong, fix code/env and deploy a new tag (or redeploy a previous tag).

## Production flow (runtime gate)
No custom Dokploy commands are required. `npm start` routes through a runtime gate:

1. `scripts/runtime/start-prod.sh` runs on container start.
2. It calls `scripts/db/deploy-prod.sh` (migration detect -> backup -> migrate -> smoke -> auto-restore).
3. If the gate succeeds, it `exec`s the real app start command.
4. If the gate fails, the container exits non-zero and Dokploy marks the deploy as failed.

The actual app start command should live in `scripts.start:app` inside `package.json` (default: `next start -p $PORT`).

## Deploy triggers (tag-gated)
- Deploys are triggered only by tags (for example `v1.0.0`).
- Push to `main` as usual, then create a release tag to deploy.
- This keeps `main` fast while production remains controlled and rollbackable.

## APP_SLUG renames (legacy tenant)
If you renamed the app slug (for example `prokit` -> `saaskit`) and want to keep the existing tenant schema/user:
- Set `APP_SLUG=<new-slug>` in Dokploy.
- Set `LEGACY_APP_SLUG=<old-slug>` for a single deployment.
- Deploy a new release tag.
- Remove `LEGACY_APP_SLUG` after the deploy succeeds.

## Required mount (backups)
Because Dokploy runs in Swarm, add a service-level bind mount so backups persist:

- Host path: `/var/backups/pgdump`
- Container path: `/var/backups/pgdump`

If this is missing, the deploy script will fail with a writable-path error.

## Postgres client tools (required)
The deploy script uses `psql`, `pg_dump`, and `pg_restore`. The client major version must match the server major version. Nixpacks installs these via `nixpacks.toml` (recommended).

## Verify a deploy
Use the Dokploy logs. A healthy deploy includes:
- `[deploy] smoke check passed`
- `[deploy] done`
- `next start` shows `Ready in ...`

The runtime gate also writes a status file for diagnostics:
- `/var/backups/pgdump/$APP_SLUG/last_run.status`

## Optional features
See `docs/optional-features.md` for enabling the blog, waiting list, and the optional checkout funnel routes.
