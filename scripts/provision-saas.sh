#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: ./scripts/provision-saas.sh <project-slug>"
  exit 1
fi

slug="$1"
if [[ ! "$slug" =~ ^[a-z0-9_]+$ ]]; then
  echo "Invalid slug \"$slug\". Use lowercase letters, numbers, and underscores only."
  exit 1
fi

env="${NODE_ENV:-development}"

if [ "$env" != "production" ]; then
  node scripts/dev/bootstrap-env.js
fi

npm run db:init -- --slug "$slug"

if [ "$env" = "production" ]; then
  npm run db:migrate:prod
else
  npm run db:migrate:dev
fi

upsert_env() {
  local file="$1"
  local key="$2"
  local value="$3"
  local tmp="${file}.tmp"

  if [ -f "$file" ]; then
    if grep -q "^${key}=" "$file"; then
      awk -v k="$key" -v v="$value" 'BEGIN{FS=OFS="="} $1==k {$0=k"="v} {print}' "$file" > "$tmp"
      mv "$tmp" "$file"
    else
      printf '%s=%s\n' "$key" "$value" >> "$file"
    fi
  else
    printf '%s=%s\n' "$key" "$value" > "$file"
  fi
}

read_env_value() {
  local file="$1"
  local key="$2"
  if [ -f "$file" ]; then
    local line
    line=$(grep -E "^${key}=" "$file" | tail -n 1 || true)
    if [ -n "$line" ]; then
      echo "${line#*=}"
      return 0
    fi
  fi
  return 1
}

prod_system_url="${PROD_SYSTEM_DATABASE_URL:-${SYSTEM_DATABASE_URL:-}}"
if [ -z "$prod_system_url" ]; then
  prod_system_url="$(read_env_value ".env.production" "SYSTEM_DATABASE_URL" || true)"
fi
if [ -z "$prod_system_url" ]; then
  echo "⚠️  PROD_SYSTEM_DATABASE_URL or SYSTEM_DATABASE_URL not set; skipping .env.production update."
  exit 0
fi

tenant_password="${TENANT_DB_PASSWORD:-}"
if [ -z "$tenant_password" ]; then
  tenant_password="$(read_env_value ".env.production" "TENANT_DB_PASSWORD" || true)"
fi
if [ -z "$tenant_password" ]; then
  if [ "$env" = "production" ]; then
    echo "TENANT_DB_PASSWORD is required in production."
    exit 1
  fi
  tenant_password="devpass"
  echo "⚠️  TENANT_DB_PASSWORD not set; using devpass for .env.production."
fi

read -r host port < <(
  node -e 'const u=new URL(process.argv[1]); console.log(`${u.hostname} ${u.port || "5433"}`)' "$prod_system_url"
)
runtime_db_url="postgresql://tenant_${slug}_user:${tenant_password}@${host}:${port}/postgres?schema=tenant_${slug}"

if [ "$host" = "localhost" ] || [ "$host" = "127.0.0.1" ]; then
  echo "⚠️  Production host resolves to $host; verify .env.production before deploying."
fi

upsert_env ".env.production" "APP_SLUG" "$slug"
upsert_env ".env.production" "NODE_ENV" "production"
upsert_env ".env.production" "TENANT_DB_PASSWORD" "$tenant_password"
upsert_env ".env.production" "SYSTEM_DATABASE_URL" "$prod_system_url"
upsert_env ".env.production" "SHADOW_DATABASE_URL" "$prod_system_url"
upsert_env ".env.production" "DATABASE_URL" "$runtime_db_url"

echo "✅ Updated .env.production with tenant connection details."
