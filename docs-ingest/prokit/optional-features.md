# Optional Features (ProKit Studio)

The core runtime stays lean, but you can enable additional integrations as needed.

This page explains what is optional in the public product contract. Detailed maintainer setup steps live separately in private docs.

## Integrations

> Legacy boilerplate reference only. It does not describe active ProChat runtime authentication. ProChat runtime authentication direction is Ory.

### Clerk (authentication)
- Optional auth provider wiring is ready to plug in Clerk when you have credentials.
- In dev, mock mode keeps the app usable without live keys.

### Stripe (billing)
- Billing endpoints can power checkouts, customer portals, and webhook-based lifecycle handling.
- Enable it only when you want paid plans backed by Stripe pricing.

### Resend (transactional email)
- Optional helper for thank-you and notification emails tied to subscription events.
- Activating it requires the `RESEND_API_KEY`.
