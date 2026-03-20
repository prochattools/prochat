# Architecture

## Overview

This page is for founders or operators who want a quick picture of how the public site and app fit together. Read it after the main onboarding docs if you want to understand what lives where. Skip it for launch day if you only need setup steps.

## Why this page exists

- It shows the split between the public site and the signed-in app.
- It explains where the main routes and database code live.
- It helps you avoid mixing Dev and Prod when you deploy.

## Read this when

- You want to understand how the marketing site and app are separated.
- You are checking where a route, script, or database change belongs.
- You are reviewing deployment behavior before launch.

## Skip this when

- You only need the setup steps.
- You are still wiring `DATABASE_URL`, Supabase, or Vercel.
- You do not need to change app structure.

## Runtime basics & usage

- Public routes live under `src/app/(marketing)` and `src/marketing`.
- App routes and APIs live under `src/app/(app)`, `src/app/api`, `src/libs`, `prisma`, and `scripts`.
- `DATABASE_URL` is the required runtime connection. The other labels are for environment context and version display.
- Local development points at Supabase Dev. Production points at Supabase Prod and runs migrations before start.

## Examples

- Visitor flow: someone lands on the marketing site, signs in, and then reaches the protected app area.
- Deployment flow: you configure Dev and Prod separately, deploy to Vercel, and let the migration step run before the app starts.

## Related docs

- `docs/public/database.md`
- `docs/public/env-reference.md`
- `docs/public/integrations.md`
- `docs/public/deployment.md`
- `docs/public/stack.md`
