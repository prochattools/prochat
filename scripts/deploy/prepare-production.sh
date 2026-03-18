#!/usr/bin/env sh
set -eu

: "${APP_SLUG:?APP_SLUG is required for tenant provisioning.}"
: "${DATABASE_URL:?DATABASE_URL is required for production migrations.}"
: "${SYSTEM_DATABASE_URL:?SYSTEM_DATABASE_URL is required in production.}"
: "${TENANT_DB_PASSWORD:?TENANT_DB_PASSWORD is required for tenant provisioning.}"

NODE_ENV=production npm run provision:auto
