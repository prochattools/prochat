#!/usr/bin/env sh
set -euo pipefail

: "${APP_SLUG:?APP_SLUG is required for tenant provisioning.}"
: "${SYSTEM_DATABASE_URL:?SYSTEM_DATABASE_URL is required in production.}"

NODE_ENV=production npm run provision:auto
