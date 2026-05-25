# SaaSKit Start Here

## What SaaSKit is

SaaSKit is a SaaS boilerplate you can rebrand and launch as your own product.

## What to do first

1. Install the app and create your local `.env`.
2. Create two Supabase projects, one for Dev and one for Prod.
3. Set `DATABASE_URL` to the Dev database.
4. Run the local baseline: `npm run db:init`, `npm run db:migrate:dev`, `npm run dev`.

## What is required

- `DATABASE_URL`
- Separate Supabase Dev and Prod projects

## What is optional later

# Legacy boilerplate reference only. It does not describe active ProChat runtime authentication. ProChat runtime authentication direction is Ory.

- Clerk for sign-in
- Stripe for billing
- Resend for email and waitlists
- WordPress for the blog
- n8n for workflow automation

## What to read next

1. [docs/public/env-reference.md](./env-reference.md)
2. [docs/public/database.md](./database.md)
3. [docs/public/deployment.md](./deployment.md)
4. [docs/public/integrations.md](./integrations.md) after the base app works

## What done enough to launch means

You are close enough to launch when:

- the app runs locally
- `/api/health` returns `{"status":"ok"}`
- Dev and Prod are separated
- branding is in place
- optional integrations are either configured or clearly disabled

## Other public docs

- [docs/public/features.md](./features.md)
- [docs/public/development.md](./development.md)
- [docs/public/architecture.md](./architecture.md)
- [docs/public/stack.md](./stack.md)

## Private docs

- `docs/private/scripts.md`
- `docs/private/ai-prompts.md`
