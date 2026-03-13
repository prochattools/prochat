#!/bin/sh
set -eu

NODE_ENV=production

sync_static_dir() {
  src="$1"
  dest="$2"

  if [ ! -d "$src" ]; then
    return
  fi

  mkdir -p "$dest"
  cp -R "$src"/. "$dest"/
}

# Support both runtime layouts:
# 1. repo root start: .next/standalone/server.js + .next/static
# 2. Docker standalone root: server.js + .next/static
sync_static_dir ".next/static" ".next/standalone/.next/static"
sync_static_dir ".next/standalone/.next/static" ".next/static"

if [ -f "server.js" ]; then
  SERVER_ENTRY="server.js"
elif [ -f ".next/standalone/server.js" ]; then
  SERVER_ENTRY=".next/standalone/server.js"
else
  echo "Could not find standalone server entrypoint." >&2
  exit 1
fi

node "$SERVER_ENTRY" &
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
