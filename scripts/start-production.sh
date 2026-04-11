#!/bin/sh
set -eu

NODE_ENV=production

echo "Preparing production database schema..."
sh scripts/deploy/prepare-production.sh

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

# Override HOSTNAME so Next.js binds to all interfaces (0.0.0.0), not just
# the container's overlay IP. Docker sets HOSTNAME to the container ID which
# DNS-resolves to the overlay IP — Next.js 14 uses HOSTNAME as the bind
# address, causing health checks via localhost:3000 to fail (connection refused).
HOSTNAME=0.0.0.0 node "$SERVER_ENTRY" &
APP_PID=$!

wait "$APP_PID"
