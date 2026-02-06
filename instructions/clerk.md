# SaaSKit - Clerk Authentication (optional)

Clerk powers authentication in this repo.

Notes:
- Marketing pages (landing + blog + legal) can work without Clerk.
- App routes like `/dashboard` require Clerk.
- The optional checkout funnel (`/processing-page/*`) also requires Clerk.

## Environment variables

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Key files

- Root provider wrapper: `src/app/layout.tsx`
- Safe wrapper (dev-friendly): `src/libs/safeClerk.tsx`
- Middleware protection: `src/middleware.ts`
- Sign-in / sign-up pages:
  - `src/app/(app)/sign-in/[[...sign-in]]/page.tsx`
  - `src/app/(app)/sign-up/[[...sign-up]]/page.tsx`

## Middleware

`src/middleware.ts` protects non-public routes when Clerk keys are present.

If you add new public pages or webhooks, add them to the public route matcher.

## Server-side auth

Use `auth()` or `currentUser()` from `@clerk/nextjs/server` in server components and API routes.

Store Clerk user IDs in your database (for example `user_clerk_id`).
