# Optional Features

Rule of thumb:

- The repo should run locally with only the database configured.
- Optional features should either work when configured, or fail with a clear message.

## Clerk (Authentication)

Required env vars:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Notes:

- ProKit supports a safe mock mode in local dev when Clerk keys are missing.
- Production should always configure real Clerk keys.

## Stripe (Billing)

Required env vars:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

Where to configure plans:

- `src/config.ts` (`config.stripe.products`)

Routes:

- Checkout: `POST /api/stripe/create-checkout`
- Portal: `POST /api/stripe/create-portal`
- Webhook: `POST /api/webhook/stripe`

## Resend (Email)

Required env var:

```bash
RESEND_API_KEY=
```

Notes:

- Email is optional. If `RESEND_API_KEY` is missing, email features should fail with a clear message.
- Sender config lives in `src/config.ts` (`config.resend.*`).

