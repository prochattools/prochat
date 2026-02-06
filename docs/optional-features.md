# Optional Features

SaaSKit ships with a set of optional marketing + launch features.

Rule of thumb:
- The repo should run locally with only the database configured.
- Optional features should either work when configured, or fail with a clear message.

## Required (SaaSKit baseline)

- Marketing home page: `/` (landing)
- Legal pages:
  - `/tos`
  - `/privacy-policy`

## Optional: Blog (WordPress)

What you get:
- `/blog` listing
- `/blog/[articleId]` article pages

How to enable:
1. Set `WP_REST_ENDPOINT` in `.env` (local) and production env.
   - Recommended format: `https://example.com/wp-json`
   - (If you provide `.../wp-json/wp/v2`, the app will normalize it.)
2. Ensure your WordPress REST API is reachable from the deployment environment.

Notes:
- If `WP_REST_ENDPOINT` is missing, the blog routes show a setup message instead of breaking.

## Optional: Waiting List (Resend)

What you get:
- `/waiting-list` page
- `/api/waiting-list` API endpoint

How to enable:
1. Set `RESEND_API_KEY` in `.env` and production env.
2. Configure the sender identity in `src/config.ts` (Resend `fromAdmin`, support email, etc).

Notes:
- If `RESEND_API_KEY` is missing, the waiting list API returns `501` with a clear message.


## Optional: n8n (automation workflows)

What you get:
- A simple dashboard UI to clone an n8n workflow template.
- A per-project webhook URL that the in-app chat can call.

Routes:
- Clone template workflow: `POST /api/workflows/openAIAssistant`
- Toggle workflow active/inactive: `POST /api/active`
- Get a project's webhook URL: `GET /api/link?projectID=...`

Required env vars:

```bash
N8N_API_KEY=
N8N_API_URL=http://localhost:5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
```

How to enable:
1. Run n8n (self-hosted or managed) and generate an API key.
2. Set the env vars above in `.env` (local) and production.
3. In the dashboard, enter the **Template workflow ID** you want to clone.

Notes:
- If n8n env vars are missing, `/api/active` returns `501` with a clear message.

## Optional: Checkout Funnel (`/processing-page/*`)

What you get:
- A combined signup + checkout flow.
- Useful for launch-style funnels.

Dependencies:
- Clerk (auth)
- Stripe (billing)

How to enable:
1. Configure Clerk (see `instructions/clerk.md`).
2. Configure Stripe (see `instructions/stripe.md`).
3. Link to `/processing-page` from your marketing CTAs if you want to use the funnel.

Notes:
- The default app flow keeps billing inside `/dashboard`. The funnel route is optional.

## Optional: Stripe (Billing)

Required env vars:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Where to edit plans:
- `src/config.ts` (`config.stripe.products`)

Routes:
- Checkout: `POST /api/stripe/create-checkout`
- Portal: `POST /api/stripe/create-portal`
- Webhook: `POST /api/webhook/stripe`

## Optional: Clerk (Auth)

Required env vars:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Notes:
- Marketing pages work without Clerk.
- App routes like `/dashboard` require Clerk.
