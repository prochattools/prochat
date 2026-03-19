# Optional Features (ProKit Studio)

The core runtime stays lean, but you can enable additional integrations as needed.

## Integrations

### Clerk (authentication)
- Optional auth provider wiring is ready to plug in Clerk when you have credentials.
- In dev, mock mode keeps the app usable without live keys.

### Stripe (billing)
- Billing endpoints can power checkouts, customer portals, and webhook-based lifecycle handling.
- Enable it only when you want paid plans backed by Stripe pricing.

### Resend (transactional email)
- Optional helper for thank-you and notification emails tied to subscription events.
- Activating it requires the `RESEND_API_KEY`.

Detailed configuration steps and environment variable guidance live in the private `docs/private/instructions` folder.
