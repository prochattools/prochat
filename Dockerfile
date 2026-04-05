FROM node:20-bullseye AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN --mount=type=cache,target=/root/.npm npm ci

FROM deps AS builder
ENV NEXT_TELEMETRY_DISABLED=1
ENV STRIPE_MODE=live
ENV NEXT_PUBLIC_STRIPE_MODE=live

# Stripe env vars needed at build time — stripe-env validates at module eval during page collection
# Dokploy passes app env as --build-arg; ARG declarations receive them here (not in deps/npm ci)
ARG STRIPE_SECRET_KEY_LIVE
ARG STRIPE_WEBHOOK_SECRET_LIVE
ARG STRIPE_PRODUCT_PROKIT_LIVE
ARG STRIPE_PRODUCT_SAASKIT_LIVE
ARG STRIPE_PRICE_PROKIT_LIVE
ARG STRIPE_PRICE_SAASKIT_LIVE
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE
ENV STRIPE_SECRET_KEY_LIVE=$STRIPE_SECRET_KEY_LIVE
ENV STRIPE_WEBHOOK_SECRET_LIVE=$STRIPE_WEBHOOK_SECRET_LIVE
ENV STRIPE_PRODUCT_PROKIT_LIVE=$STRIPE_PRODUCT_PROKIT_LIVE
ENV STRIPE_PRODUCT_SAASKIT_LIVE=$STRIPE_PRODUCT_SAASKIT_LIVE
ENV STRIPE_PRICE_PROKIT_LIVE=$STRIPE_PRICE_PROKIT_LIVE
ENV STRIPE_PRICE_SAASKIT_LIVE=$STRIPE_PRICE_SAASKIT_LIVE
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE

COPY . .
RUN --mount=type=cache,target=/app/.next/cache npm run build

FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*
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
