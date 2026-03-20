# Optional features (integrations)

## Overview

Enable these services only when you need the feature. SaaSKit runs with just `DATABASE_URL`, and each integration gracefully reports setup guidance when keys are missing so the rest of the app still works.

## Setup

- Keep Supabase Dev for local work and Supabase Prod for production deployments.
- Switch on optional services by providing the required environment variables (see each section below).
- Confirm each integration with the quick checks listed so builds and deployments remain stable.

## Clerk (authentication)

### Environment

```bash
CLERK_DISABLED=false
NEXT_PUBLIC_CLERK_DISABLED=false
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Quick check

1. Sign-in and sign-up pages load with Clerk active.
2. Protected routes require login.

## Stripe (billing)

### Environment

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRODUCTS_JSON=[...]
```

### Quick check

1. Checkout sessions can be created.
2. Billing portal opens for subscribed users.
3. Webhook signatures verify against `STRIPE_WEBHOOK_SECRET`.
4. Subscription endpoint reflects webhook updates.

## Resend (email + waitlist)

### Environment

```bash
RESEND_API_KEY=
NEXT_PUBLIC_EMAIL_FROM=
NEXT_PUBLIC_FORWARD_REPLIES_TO=
NEXT_PUBLIC_THANK_YOU_SUBJECT=
```

### Quick check

1. Waitlist form submits successfully.
2. Contacts appear in the Resend audience.

## WordPress (blog)

### Environment

```bash
WP_REST_ENDPOINT=https://example.com/wp-json/wp/v2
```

### Quick check

1. `/blog` shows posts fetched from WordPress.
2. `/blog/[articleId]` renders individual posts.

## n8n (workflow automation)

### Environment

```bash
N8N_API_KEY=
N8N_API_URL=http://localhost:5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
```

### Quick check

1. Workflow clone endpoint returns the expected data.
2. Project activation toggles work.
3. Webhook link endpoint responds with the correct link.

## Routes that depend on integrations

- `/processing-page/*` needs Clerk + Stripe + `NEXT_PUBLIC_STRIPE_PRODUCTS_JSON`.
- `/waiting-list` relies on Resend.
- `/blog*` requires a configured WordPress endpoint.

## Troubleshooting & maintenance

- Reset Next build output:
  ```bash
  rm -rf .next
  npm run dev
  ```
- Reinstall dependencies if needed:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Reset the Dev Supabase database state only (never Prod):
  ```bash
  npm run db:migrate:reset
  ```
- Run production migrations manually when automatic builds fail:
  ```bash
  npm run db:migrate:prod
  ```

## Examples

- Example 1: Enable Clerk + Stripe to offer paid sign-ups, then verify `/processing-page` sessions and webhook signatures.
- Example 2: Activate Resend for a waitlist and confirm `/waiting-list` submissions create contacts in Resend.
