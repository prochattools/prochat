import { isClerkEnabled } from '@/libs/safeClerkServer'

export type SimpleClerkUser = {
  id: string
  primaryEmailAddress?: {
    emailAddress?: string | null
  } | null
} | null

export type AdminAccessState =
  | { status: 'authorized'; user: NonNullable<SimpleClerkUser> }
  | { status: 'unauthenticated' }
  | { status: 'unauthorized'; user: NonNullable<SimpleClerkUser> }
  | { status: 'misconfigured'; message: string }

const isProduction = process.env.NODE_ENV === 'production'
const isDevAdminMode =
  !isProduction &&
  (
    process.env.CLERK_DISABLED === 'true' ||
    process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true' ||
    process.env.DISABLE_CLERK_IN_DEV === 'true' ||
    process.env.NEXT_PUBLIC_DISABLE_CLERK_IN_DEV === 'true'
  )

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(Boolean)

const ADMIN_CLERK_IDS = (process.env.ADMIN_CLERK_IDS || '')
  .split(',')
  .map(id => id.trim())
  .filter(Boolean)

export function hasAdminAllowlistConfig() {
  return ADMIN_EMAILS.length > 0 || ADMIN_CLERK_IDS.length > 0
}

export function getAdminAllowlistSummary() {
  return {
    emails: ADMIN_EMAILS,
    clerkIds: ADMIN_CLERK_IDS,
  }
}

export function getAdminConfigErrorMessage() {
  if (!hasAdminAllowlistConfig()) {
    return 'Admin access is not configured. Set ADMIN_EMAILS and/or ADMIN_CLERK_IDS for this environment.'
  }

  return null
}

export function isAdminUser(user: SimpleClerkUser) {
  if (!user) return false

  if (!hasAdminAllowlistConfig()) {
    return false
  }

  if (ADMIN_EMAILS.length && user.primaryEmailAddress?.emailAddress) {
    const email = user.primaryEmailAddress.emailAddress.toLowerCase()
    if (ADMIN_EMAILS.includes(email)) {
      return true
    }
  }

  if (ADMIN_CLERK_IDS.length && ADMIN_CLERK_IDS.includes(user.id)) {
    return true
  }

  return false
}

function getMockAdminUser(): SimpleClerkUser {
  if (!isDevAdminMode) {
    return null
  }

  const email = ADMIN_EMAILS[0]
  const clerkId = ADMIN_CLERK_IDS[0] || 'dev-admin'

  if (!email && !ADMIN_CLERK_IDS[0]) {
    return null
  }

  return {
    id: clerkId,
    primaryEmailAddress: {
      emailAddress: email || null,
    },
  }
}

export async function getCurrentAdminUser(): Promise<SimpleClerkUser> {
  if (!isClerkEnabled()) {
    return getMockAdminUser()
  }

  try {
    const { currentUser } = await import('@clerk/nextjs/server')
    return await currentUser()
  } catch (error) {
    if (isProduction) {
      throw error
    }
    return getMockAdminUser()
  }
}

export async function getAdminAccessState(): Promise<AdminAccessState> {
  let clerkEnabled = false

  try {
    clerkEnabled = isClerkEnabled()
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Admin authentication is unavailable.'
    return {
      status: 'misconfigured',
      message,
    }
  }

  const user = await getCurrentAdminUser()

  if (!user) {
    if (!clerkEnabled) {
      return {
        status: 'misconfigured',
        message: 'Admin authentication is unavailable because Clerk is disabled or not configured for this environment.',
      }
    }

    return { status: 'unauthenticated' }
  }

  const configError = getAdminConfigErrorMessage()
  if (configError) {
    return {
      status: 'misconfigured',
      message: configError,
    }
  }

  if (!isAdminUser(user)) {
    return { status: 'unauthorized', user }
  }

  return { status: 'authorized', user }
}
