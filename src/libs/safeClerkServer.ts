import { NextRequest } from 'next/server'

/**
 * Checks whether Clerk keys are configured.
 * Used by middleware and server utilities.
 */
const isClerkDisabled =
  process.env.CLERK_DISABLED === 'true' ||
  process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'

export const isClerkEnabled = (): boolean => {
  if (isClerkDisabled) {
    return false
  }

  return (
    !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
    !!process.env.CLERK_SECRET_KEY
  )
}

/**
 * Safe wrapper for Clerk's server-side authentication.
 * Works even when Clerk keys are missing (local, CI, or first-time setup).
 */
export async function authenticateRequest(req: NextRequest) {
  if (!isClerkEnabled()) {
    console.warn('⚠️ Clerk keys missing — skipping authentication.')
    return { userId: null }
  }

  try {
    // Dynamically import to avoid hard failure in environments without Clerk.
    const { auth } = await import('@clerk/nextjs/server')

    // New Clerk API: `auth()` instead of `authenticateRequest(req)`
    const { userId } = auth()
    return { userId: userId ?? null }
  } catch (err) {
    console.error('❌ Clerk server auth failed:', err)
    return { userId: null }
  }
}
