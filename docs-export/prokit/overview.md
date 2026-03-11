# ProKit Studio Overview

ProKit Studio is ProChat's commercial SaaS core boilerplate.

- ProKit Studio provides the runtime foundation.
- ProKit Studio includes setup docs, branding defaults, and buyer-facing packaging.

## Included (high level)

- Next.js + TypeScript app skeleton
- Auth wiring (Clerk)
- Billing wiring (Stripe)
- Postgres + Prisma migrations
- Production runtime migration step on process/container hosts

## Database/deploy posture

- Required DB contract: `DATABASE_URL`
- Reference stack in docs: Supabase + Vercel
- Not required: any Postgres + any host that can run this app
