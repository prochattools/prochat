# Stack

## Overview

This page is for readers who want the technical picture after the basics are set up. It is useful for understanding the stack, but it is not part of the main founder onboarding path.

## Why this page exists

- It explains the main runtime and database choices.
- It shows which optional services plug into the app later.
- It helps you understand why deployment and migrations behave the way they do.

## Read this when

- The setup docs are already working and you want more context.
- You are comparing optional services or deployment choices.
- You need to debug where a feature lives in the stack.

## Skip this when

- You are still setting up `DATABASE_URL`, Supabase, or Vercel.
- You only need the launch path.
- You do not need to reason about route boundaries or runtime details.

## Application runtime

- Next.js runs both the public site and the app.
- Node 18 hosts the runtime, and `npm start` launches production.
- `DATABASE_URL` is required. The other runtime labels are optional.
- Dev uses Supabase Dev. Production uses Supabase Prod and Vercel builds.

## Data layer & multi-tenant model

- Prisma manages the database schema.
- Supabase hosts separate Dev and Prod projects.
- Migrations run locally, on Vercel production builds, or manually if needed.
- Keep Dev and Prod separated.

## Setup implications

- The base app only needs `DATABASE_URL`.
- Optional services come later.
- Vercel is the production host because the build flow already includes migration handling.

## Optional integration layer

- Clerk, Stripe, Resend, WordPress, and n8n are optional.
- They only work when their keys and endpoints are set.
- If they are disabled, the rest of the app should still work and show setup guidance.

## Supporting tech

- Design system: shared color, typography, and UI primitives.
- Scripts: helpers for bootstrapping, migrations, and production startup.

## Examples

- Example 1: A production build runs the migration step before the app starts.
- Example 2: Optional integrations add behavior only when they are configured.

## Related docs

- `docs/public/development.md`
- `docs/public/deployment.md`
- `docs/public/features.md`
