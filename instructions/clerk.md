# ProChat - Clerk Authentication (ProKit engine)

Clerk powers authentication in this repo.

Goal: keep auth predictable and avoid hard failures when keys are missing in development.

## What ProChat does by default (via ProKit engine)

- Uses Clerk for authentication (App Router).
- Protects routes via `src/middleware.ts` when keys are present.
- Uses a safe wrapper (`src/libs/safeClerk.tsx`) that enables a **mock mode** when Clerk keys are missing.

Mock mode is a convenience for local development only. Production must configure real Clerk keys.

## Environment variables

Required:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Optional (recommended defaults):

```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Key files

- Root provider wrapper: `src/app/layout.tsx` (`SafeClerkProvider`)
- Safe wrapper (dev-friendly): `src/libs/safeClerk.tsx`
- Middleware protection: `src/middleware.ts`
- Sign-in / sign-up pages:
  - `src/app/(app)/sign-in/[[...sign-in]]/page.tsx`
  - `src/app/(app)/sign-up/[[...sign-up]]/page.tsx`
