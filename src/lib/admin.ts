export type SimpleAdminUser = {
  id: string
  primaryEmailAddress?: {
    emailAddress?: string | null
  } | null
} | null

export type AdminAccessState =
  | { status: 'authorized'; user: NonNullable<SimpleAdminUser> }
  | { status: 'unauthenticated' }
  | { status: 'unauthorized'; user: NonNullable<SimpleAdminUser> }
  | { status: 'misconfigured'; message: string }

const isProduction = process.env.NODE_ENV === 'production'

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(Boolean)

const ADMIN_USER_IDS = (process.env.ADMIN_USER_IDS || '')
  .split(',')
  .map(id => id.trim())
  .filter(Boolean)

export function hasAdminAllowlistConfig() {
  return ADMIN_EMAILS.length > 0 || ADMIN_USER_IDS.length > 0
}

export function getAdminAllowlistSummary() {
  return {
    emails: ADMIN_EMAILS,
    userIds: ADMIN_USER_IDS,
  }
}

export function getAdminConfigErrorMessage() {
  if (!hasAdminAllowlistConfig()) {
    return 'Admin access is not configured. Set ADMIN_EMAILS and/or ADMIN_USER_IDS for this environment.'
  }

  return null
}

export function isAdminUser(user: SimpleAdminUser) {
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

  if (ADMIN_USER_IDS.length && ADMIN_USER_IDS.includes(user.id)) {
    return true
  }

  return false
}

export async function getCurrentAdminUser(): Promise<SimpleAdminUser> {
  return null
}

export async function getAdminAccessState(): Promise<AdminAccessState> {
  const user = await getCurrentAdminUser()

  if (!user) {
    return {
      status: 'misconfigured',
      message: 'Admin authentication is not implemented yet. Ory session validation is still TODO.',
    }
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
