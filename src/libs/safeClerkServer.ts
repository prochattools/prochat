/**
 * Checks whether Clerk keys are configured.
 * Used by middleware and server utilities.
 */
const isProduction = process.env.NODE_ENV === 'production'
const isCiBuild =
  process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true'
const isClerkDisabled =
  process.env.CLERK_DISABLED === 'true' ||
  process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true' ||
  process.env.DISABLE_CLERK_IN_DEV === 'true' ||
  process.env.NEXT_PUBLIC_DISABLE_CLERK_IN_DEV === 'true'
const hasServerKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY

export const isClerkEnabled = (): boolean => {
  if (isClerkDisabled) {
    return false
  }

  if (isProduction && !isCiBuild && !hasServerKeys) {
    throw new Error(
      'Clerk is required in production but Clerk environment variables are missing.'
    )
  }

  return hasServerKeys
}

/**
 * Safe wrapper for Clerk's server-side authentication.
 * Works even when Clerk keys are missing (local, CI, or first-time setup).
 */
export async function authenticateRequest() {
  if (!isClerkEnabled()) {
    if (!isProduction) {
      console.warn('⚠️ Clerk keys missing — skipping authentication.')
    }
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
    if (process.env.NODE_ENV === 'production') {
      throw err
    }
    return { userId: null }
  }
}
