import { auth } from '@clerk/nextjs/server'

export type SafeAuthResult = {
  userId: string | null
}

export const isClerkDisabled =
  process.env.CLERK_DISABLED === 'true' ||
  process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'

export const hasClerkServerKeys =
  !isClerkDisabled &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_') &&
  process.env.CLERK_SECRET_KEY?.startsWith('sk_')

/**
 * Server-safe auth helper.
 * Returns null user when Clerk is not configured or middleware is unavailable.
 */
export function safeAuth(): SafeAuthResult {
  if (!hasClerkServerKeys) {
    return { userId: null }
  }

  try {
    const { userId } = auth()
    return { userId: userId ?? null }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Clerk auth() unavailable; falling back to public mode.', error)
    }
    return { userId: null }
  }
}
