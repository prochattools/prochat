#!/bin/sh

set -eu

CI=false next start -p "${PORT:-3000}" &
APP_PID=$!

(
  sleep 5

  SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://prochat.tools}"
  SITE_URL="${SITE_URL%/}"
  SITEMAP_URL="${SITE_URL}/sitemap.xml"

  curl -fsS "https://www.google.com/ping?sitemap=${SITEMAP_URL}" >/dev/null 2>&1 || true
  curl -fsS "https://www.bing.com/ping?sitemap=${SITEMAP_URL}" >/dev/null 2>&1 || true
) &

wait "$APP_PID"
