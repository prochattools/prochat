# ProKit - Stripe Integration

Stripe powers billing in this repo.

Notes:

- Stripe is optional. If Stripe env vars are unset, billing endpoints return `501` with a clear message.

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
- Product config: `src/config.ts` (`config.stripe.products`)

## Checkout URLs

- Success URL points to: `/dashboard?session_id=...`
- Cancel URL points to: `/cancel?session_id=...`

