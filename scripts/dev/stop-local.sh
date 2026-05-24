#!/usr/bin/env bash
set -euo pipefail

APP_PORT="${PORT:-3056}"

PIDS="$(lsof -ti tcp:"${APP_PORT}" 2>/dev/null || true)"
if [[ -n "${PIDS}" ]]; then
  kill ${PIDS} >/dev/null 2>&1 || true
  sleep 2
fi

PIDS="$(lsof -ti tcp:"${APP_PORT}" 2>/dev/null || true)"
if [[ -n "${PIDS}" ]]; then
  kill -9 ${PIDS} >/dev/null 2>&1 || true
fi

echo "ProChat stopped on port ${APP_PORT}"
