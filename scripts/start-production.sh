#!/bin/sh
set -eux

NODE_ENV=production

# Disable New Relic if license key is not properly set
# The module may be trying to initialize and failing silently
if [ -z "$NEW_RELIC_LICENSE_KEY" ] || [ "$NEW_RELIC_LICENSE_KEY" = "skip" ]; then
  export NEW_RELIC_ENABLED=false
fi

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

echo "Starting server: $SERVER_ENTRY"
node "$SERVER_ENTRY" 2>&1 &
APP_PID=$!
echo "Server PID: $APP_PID"

trap "echo 'Server process exited'" EXIT

wait "$APP_PID"
EXIT_CODE=$?
echo "Server exited with code: $EXIT_CODE"
exit $EXIT_CODE
