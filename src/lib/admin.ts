import { isClerkEnabled } from '@/libs/safeClerkServer'

export type SimpleClerkUser = {
  id: string
  primaryEmailAddress?: {
    emailAddress?: string | null
  } | null
} | null

const isDevAdminMode =
  process.env.NODE_ENV !== 'production' &&
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

export function isAdminUser(user: SimpleClerkUser) {
  if (!user) return false

  const hasAllowlistConfigured = ADMIN_EMAILS.length > 0 || ADMIN_CLERK_IDS.length > 0
  if (!hasAllowlistConfigured) {
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
    if (process.env.NODE_ENV === 'production') {
      throw error
    }
    return getMockAdminUser()
  }
}
