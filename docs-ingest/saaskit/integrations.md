# Optional features (integrations)

Use this guide when you want to enable optional services on top of the default SaaSKit setup.

All integrations in SaaSKit are optional.

Important:
- SaaSKit runs with only `DATABASE_URL`
- Use Supabase Dev locally and Supabase Prod in Vercel
- Enable integrations only when you are ready
- If an integration is not configured, related routes should fail gracefully with setup guidance

## Clerk (authentication)

Use this when you want user sign-up/sign-in.

If not configured:
- app can still run in mock-safe mode
- protected routes are not enforced until valid Clerk keys exist

Environment:
```bash
# Set both flags to false when enabling Clerk.
CLERK_DISABLED=false
NEXT_PUBLIC_CLERK_DISABLED=false
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Quick check:
1. sign-in and sign-up pages load
2. protected app routes require login when Clerk is enabled

## Stripe (billing)

Use this when you want paid plans.

If not configured:
- billing endpoints return `501` with setup guidance

Environment:
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PRODUCTS_JSON=[...]
```

Quick check:
1. checkout session can be created
2. customer portal opens for subscribed users
3. webhook signature verification passes
4. subscription endpoint reflects webhook updates

## Resend (email + waitlist)

Use this for waitlist capture and transactional emails.

If not configured:
- waitlist API returns `501`

Environment:
```bash
RESEND_API_KEY=
NEXT_PUBLIC_EMAIL_FROM=
NEXT_PUBLIC_FORWARD_REPLIES_TO=
NEXT_PUBLIC_THANK_YOU_SUBJECT=
```

Quick check:
1. waitlist form submits
2. contact is created in Resend audience

## WordPress (blog)

Use this if you want a blog connected to WordPress.

If not configured:
- blog pages show setup guidance, no crash

Environment:
```bash
WP_REST_ENDPOINT=https://example.com/wp-json/wp/v2
```

Quick check:
1. `/blog` shows posts
2. `/blog/[articleId]` opens post details

## n8n (workflow automation)

Use this if you need workflow automation endpoints.

If not configured:
- n8n routes return `501` where required keys are missing

Environment:
```bash
N8N_API_KEY=
N8N_API_URL=http://localhost:5678
N8N_WEBHOOK_URL=http://localhost:5678/webhook
```

Quick check:
1. workflow clone endpoint works
2. project activation toggle works
3. webhook link endpoint returns expected link

## Routes that depend on integrations

- `/processing-page/*` needs Clerk + Stripe + Stripe products
- `/waiting-list` needs Resend
- `/blog*` needs WordPress endpoint

## Quick troubleshooting

Reset Next build output:
```bash
rm -rf .next
npm run dev
```

Reset dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

Reset development database state (Dev Supabase only):
```bash
npm run db:migrate:reset
```

Run production migrations manually:
```bash
npm run db:migrate:prod
```
