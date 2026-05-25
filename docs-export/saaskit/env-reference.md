# Legacy boilerplate reference only. It does not describe active ProChat runtime authentication. ProChat runtime authentication direction is Ory.

# Environment Variables

## Overview

This guide matches `.env.example`. Use it to decide what you must set now, what can wait, and what only matters if you enable an optional service. Local development uses `.env`; production uses Vercel environment variables.

## Setup

1. Copy the template: `cp .env.example .env`.
2. Set `DATABASE_URL` to your Supabase Dev project.
3. Run `npm run db:init && npm run db:migrate:dev`.
4. Keep Dev values in `.env` and Prod values in Vercel.

## Required

### `DATABASE_URL`

- What it controls: the main database connection for the app and Prisma.
- When you need it: always.
- Where to get it: Supabase Project Settings -> Database -> Connection string.

**Warning:** use your Dev Supabase connection locally and your Prod connection in Vercel. Do not mix them.

## Recommended before launch

These are not hard requirements, but they make the app feel complete before you go live.

- `NEXT_PUBLIC_APP_URL`: your site URL for links and redirects.
- `NEXT_PUBLIC_APP_NAME`: the product name shown in the UI.
- `NEXT_PUBLIC_COMPANY_NAME`: the company name shown in legal/footer text.
- `NEXT_PUBLIC_SUPPORT_EMAIL`: the email customers use for help.

## Optional runtime settings

- `SAASKIT_VERSION` and `PROCHAT_VERSION`: version labels shown in parts of the UI.
- `APP_ENV` and `NODE_ENV`: environment labels such as development or production.
- `PORT`: the port used by `next start`.
- `SAASKIT_DISABLE_VERCEL_BUILD_MIGRATIONS`: set this to `true` only if you need to skip automatic migrations during a Vercel production build.

## Only needed if you add custom Supabase API usage

These are only needed if your own code talks to Supabase directly, beyond the default database connection.

- `NEXT_PUBLIC_SUPABASE_URL`: the Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: the public client key.
- `SUPABASE_SERVICE_ROLE_KEY`: the private server key.

## Optional integrations

### Clerk

Legacy boilerplate reference only. It does not describe active ProChat runtime authentication. ProChat runtime authentication direction is Ory.

### Stripe

Use Stripe if you want paid plans.

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: the public browser key.
- `STRIPE_SECRET_KEY`: the private server key.
- `STRIPE_WEBHOOK_SECRET`: the secret Stripe uses to prove webhook calls are real.
- `NEXT_PUBLIC_STRIPE_PRODUCTS_JSON`: the list of plans shown in your pricing UI.

**Example**

```json
[
  {
    "title": "Starter",
    "price": 19,
    "priceId": "price_123",
    "type": "subscription",
    "period": "month",
    "features": [
      { "title": "1 workspace" },
      { "title": "Email support" }
    ]
  },
  {
    "title": "Lifetime",
    "price": 199,
    "priceId": "price_456",
    "type": "one-time",
    "features": [
      { "title": "Lifetime access" },
      { "title": "Priority onboarding" }
    ]
  }
]
```

This should be a JSON array of plan objects. Each plan needs a title, price, and Stripe price ID. Subscription plans also need a billing period such as `month` or `year`.

**Important:** do not use the Clerk section above as ProChat runtime guidance. ProChat runtime authentication direction is Ory.

### Resend

Use Resend if you want waitlists or transactional email.

- `RESEND_API_KEY`: enables email sending.
- `NEXT_PUBLIC_EMAIL_FROM`: the sender name and email address.
- `NEXT_PUBLIC_FORWARD_REPLIES_TO`: where replies should go.
- `NEXT_PUBLIC_THANK_YOU_SUBJECT`: the default thank-you email subject.

### WordPress

Use WordPress if you want the blog to pull posts from an existing site.

- `WP_REST_ENDPOINT`: the WordPress REST API URL, for example `https://yourblog.com/wp-json/wp/v2`.

### n8n

Use n8n if you want workflow automation routes.

- `N8N_API_KEY`: the private API key for n8n.
- `N8N_API_URL`: the n8n API URL.
- `N8N_WEBHOOK_URL`: the webhook URL used by workflow routes.

## Visual and SEO settings

These change branding and metadata.

- `NEXT_PUBLIC_APP_DESCRIPTION`
- `NEXT_PUBLIC_APP_DOMAIN`
- `NEXT_PUBLIC_TWITTER_CREATOR`
- `NEXT_PUBLIC_THEME`
- `NEXT_PUBLIC_BRAND_COLOR`

## Platform-managed

Do not set these locally.

- `VERCEL`
- `VERCEL_ENV`
- `CI`

## Examples

- Example 1: Historical boilerplate guidance only. Do not apply it to ProChat runtime authentication.
- Example 2: To enable Stripe, add the public and secret keys, set `NEXT_PUBLIC_STRIPE_PRODUCTS_JSON`, and test checkout plus webhook handling.
