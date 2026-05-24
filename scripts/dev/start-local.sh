#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
LOG_FILE="${PROCHAT_LOG_FILE:-/tmp/prochat.log}"

cd "$REPO_ROOT"
npm run dev > "$LOG_FILE" 2>&1 &
echo $! > /tmp/prochat.pid
