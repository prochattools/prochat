# MailerLite Funnel

This document describes the MailerLite-powered lead capture flow implemented in ProChat.

## Purpose

The MailerLite route provides a lightweight subscription endpoint for lead magnets and funnel capture.

It is separate from:

- contact email handling
- waitlist email handling
- the GitHub entitlement flow

## Implementation

The route is implemented in:

- [route.ts](/Users/Office/Repos/Organisation/ProChat/Web/prochat/src/app/api/mailerlite/subscribe/route.ts)

Current behavior:

- accepts a POST body with `email`
- normalizes and validates the email address
- posts the subscriber to MailerLite
- assigns the subscriber to a configured group
- treats “already subscribed” style responses as success

## Environment variables

Canonical env documentation lives in [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md).

Current values used by the route (required):

- `MAILERLITE_API_KEY` — MailerLite API key (required; no fallback)
- `MAILERLITE_GROUP_ID` — Subscriber group ID (required; no fallback)
- `MAILERLITE_API_BASE_URL` — (optional; defaults to `https://connect.mailerlite.com/api`)

Security note: PXF-018A removed literal and legacy MailerLite credential sources. The route reads `MAILERLITE_API_KEY` directly at use sites and reads `MAILERLITE_GROUP_ID` from its required environment variable. `npm run test:secret-sources` validates this source policy in CI. **External action required: revoke and rotate the exposed MailerLite API credential** (status: pending owner verification).

## Request and response behavior

Successful path:

- returns HTTP 200
- returns a success message indicating the user should check their inbox

Error handling:

- invalid or missing email returns HTTP 400
- missing `MAILERLITE_API_KEY` or `MAILERLITE_GROUP_ID` returns HTTP 500 with generic configuration error
- upstream MailerLite failures return HTTP 502 when the API responds with an error payload
- uncaught runtime failures return HTTP 500

## Role inside the ProChat system

This route fits the content and lead-generation side of ProChat:

- content surfaces capture interest
- the MailerLite route stores or updates subscriber state in MailerLite
- follow-up delivery is delegated to the MailerLite platform

The route does not currently store subscriber records in Prisma.

## Operator notes

- the configured group ID should match the funnel or lead magnet that the page is promoting
- the route assumes the MailerLite API is the system of record for this capture flow
- if configuration is missing, the route fails fast instead of silently accepting leads

## Related references

- [integrations.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/integrations.md)
- [environment.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs-public/environment.md)
- [content-platform.md](/Users/Office/Repos/Organisation/ProChat/Web/prochat/docs/content-platform.md)
