FROM node:20-bullseye AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN --mount=type=cache,target=/root/.npm npm ci

FROM deps AS builder
ENV NEXT_TELEMETRY_DISABLED=1
# Build-time Stripe vars: stripe-env.ts and config.ts call getters at module eval during page
# collection. These are server-only (not baked into client bundle) — placeholder values are safe.
# Dokploy injects real values at container runtime via env; these only exist to satisfy validation.
ENV STRIPE_MODE=live
ENV NEXT_PUBLIC_STRIPE_MODE=live
ENV STRIPE_SECRET_KEY_LIVE=sk_live_build_placeholder_00000000000000000000
ENV STRIPE_WEBHOOK_SECRET_LIVE=whsec_build_placeholder
ENV STRIPE_PRODUCT_PROKIT_LIVE=prod_build_placeholder
ENV STRIPE_PRICE_PROKIT_LIVE=price_build_placeholder
ENV STRIPE_PRODUCT_SAASKIT_LIVE=prod_build_placeholder
ENV STRIPE_PRICE_SAASKIT_LIVE=price_build_placeholder

COPY . .
RUN --mount=type=cache,target=/app/.next/cache npm run build

FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates gnupg2 && \
    curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
    echo "deb http://apt.postgresql.org/pub/repos/apt bullseye-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
    apt-get update && apt-get install -y --no-install-recommends postgresql-client-15 && \
    rm -rf /var/lib/apt/lists/* /etc/apt/sources.list.d/pgdg.list
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/static ./.next/standalone/.next/static
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', res => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1)).end()"
CMD ["sh", "scripts/start-production.sh"]
