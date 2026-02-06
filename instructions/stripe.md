# SaaSKit - Stripe Integration (optional)

Stripe powers billing in this repo.

Notes:
- If you do not want billing, you can leave Stripe env vars unset.
- When Stripe is not configured, billing endpoints return `501` with a clear message.

## Environment variables

```bash
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Key files

- Webhook handler: `src/app/api/webhook/stripe/route.ts`
- Checkout API: `src/app/api/stripe/create-checkout/route.ts`
- Portal API: `src/app/api/stripe/create-portal/route.ts`
- Client helper: `src/helpers/checkout.ts` (`handleCheckoutProcess`)
- Product config: `src/config.ts`

## Checkout URLs

- Success URL points to: `/dashboard?session_id=...`
- Cancel URL points to: `/cancel?session_id=...`

## Local webhook testing (Stripe CLI)

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhook/stripe
stripe trigger checkout.session.completed
```

## Guidance

- Keep webhook signature validation intact.
- Treat `src/config.ts` as the single source of truth for price IDs.
- Do not expose `STRIPE_SECRET_KEY` in client code.
