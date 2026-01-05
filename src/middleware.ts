import { NextResponse } from 'next/server'

// Only import Clerk middleware if we have real keys
const isClerkDisabled =
  process.env.CLERK_DISABLED === 'true' ||
  process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'
const hasClerkKeys =
  !isClerkDisabled &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_') &&
  process.env.CLERK_SECRET_KEY?.startsWith('sk_')

// Lazy import Clerk’s middleware only when enabled
let clerkAuth: any = null
if (hasClerkKeys) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    clerkAuth = require('@clerk/nextjs').authMiddleware
  } catch {
    console.warn('⚠️ Clerk middleware not available, falling back to mock.')
  }
}

export default hasClerkKeys
  ? clerkAuth?.() // Normal Clerk middleware
  : function mockMiddleware() {
      console.warn('⚠️ Clerk middleware disabled — running in mock mode.')
      return NextResponse.next()
    }

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
