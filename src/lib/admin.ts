import { currentUser } from '@clerk/nextjs/server'

type SimpleClerkUser = Awaited<ReturnType<typeof currentUser>> | null

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
  if (ADMIN_EMAILS.length && user.primaryEmailAddress?.emailAddress) {
    const email = user.primaryEmailAddress.emailAddress.toLowerCase()
    if (ADMIN_EMAILS.includes(email)) {
      return true
    }
  }
  if (ADMIN_CLERK_IDS.length && ADMIN_CLERK_IDS.includes(user.id)) {
    return true
  }
  return ADMIN_EMAILS.length === 0 && ADMIN_CLERK_IDS.length === 0
}
