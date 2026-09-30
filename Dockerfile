FROM node:20-bookworm AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json* ./
COPY prisma ./prisma
RUN --mount=type=cache,target=/root/.npm npm ci

FROM deps AS builder
ARG PROCHAT_GIT_SHA=unknown
ARG PROCHAT_IMAGE_REF=unknown
ARG PROCHAT_BUILD_TIMESTAMP=unknown
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=4096 --max-http-header-size=16384
ENV PROCHAT_GIT_SHA=$PROCHAT_GIT_SHA
ENV PROCHAT_IMAGE_REF=$PROCHAT_IMAGE_REF
ENV PROCHAT_BUILD_TIMESTAMP=$PROCHAT_BUILD_TIMESTAMP
COPY . .
RUN npm run build

FROM node:20-bookworm-slim AS runner
ARG PROCHAT_GIT_SHA=unknown
ARG PROCHAT_IMAGE_REF=unknown
ARG PROCHAT_BUILD_TIMESTAMP=unknown
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PROCHAT_GIT_SHA=$PROCHAT_GIT_SHA
ENV PROCHAT_IMAGE_REF=$PROCHAT_IMAGE_REF
ENV PROCHAT_BUILD_TIMESTAMP=$PROCHAT_BUILD_TIMESTAMP
LABEL org.opencontainers.image.revision=$PROCHAT_GIT_SHA
LABEL org.opencontainers.image.created=$PROCHAT_BUILD_TIMESTAMP
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends curl ca-certificates postgresql-client-15; \
    rm -rf /var/lib/apt/lists/*
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/static ./.next/standalone/.next/static
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts
# newrelic is required at runtime via NODE_OPTIONS=--require newrelic
# but is not traced by the standalone bundler — copy it explicitly
COPY --from=builder /app/node_modules/newrelic ./node_modules/newrelic
COPY --from=builder /app/node_modules/@newrelic ./node_modules/@newrelic
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD node -e "require('http').get('http://' + process.env.HOSTNAME + ':3000/api/health', res => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1)).end()"
CMD ["sh", "scripts/start-production.sh"]
