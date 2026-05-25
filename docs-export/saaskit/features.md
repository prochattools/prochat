# Features

## Overview

This page helps you decide what matters before launch, what can wait, and what depends on outside services. It is not a full product catalog.

## Required before launch

- Next.js app structure for both the public site and the signed-in app.
- Database setup with Prisma and one `DATABASE_URL`.
- Separate Supabase Dev and Prod projects.
- Basic branding and legal pages.

These are the parts you usually need to touch first if you want the product to feel like your own.

## Optional later

> Legacy boilerplate reference only. It does not describe active ProChat runtime authentication. ProChat runtime authentication direction is Ory.

# Legacy boilerplate reference only. It does not describe active ProChat runtime authentication. ProChat runtime authentication direction is Ory.

- Clerk for sign-in and sign-up.
- Stripe for paid plans.
- Resend for email and waitlists.
- WordPress for a blog.
- n8n for workflow automation.

You can launch without these if you are still validating the business.

## Depends on external service

- Stripe checkout, billing portal, and webhooks only work when Stripe keys and products are configured.
- Clerk routes only enforce login when Clerk is enabled and keys are present.
- Resend powers the waitlist and transactional email flow.
- WordPress powers the blog pages.
- n8n powers the workflow automation routes.

If the service is not configured, the related feature should show setup guidance instead of breaking the app.

## Safe to ignore for now

- The marketing app structure details.
- The migration script names.
- The internal route layout under `src/app`.
- The optional automation endpoints.

These matter later if you are customizing the product, but they are not launch blockers.

## What ships in the base product

- Public marketing pages and protected app pages in one repo.
- A health endpoint at `/api/health`.
- Pricing and checkout hooks.
- Waitlist, blog, and workflow routes that stay optional until enabled.
- Shared UI and theming utilities.

## What to read next

- [docs/public/env-reference.md](./env-reference.md)
- [docs/public/database.md](./database.md)
- [docs/public/deployment.md](./deployment.md)
- [docs/public/integrations.md](./integrations.md)
