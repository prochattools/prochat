import { clerkMiddleware } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const isProduction = process.env.NODE_ENV === 'production'
const isCiBuild =
  process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true'
const isClerkDisabled =
  process.env.CLERK_DISABLED === 'true' ||
  process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true' ||
  process.env.DISABLE_CLERK_IN_DEV === 'true' ||
  process.env.NEXT_PUBLIC_DISABLE_CLERK_IN_DEV === 'true'
const hasClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY

if (isProduction && !isCiBuild && !isClerkDisabled && !hasClerkKeys) {
  throw new Error(
    'Clerk is required in production but Clerk environment variables are missing.'
  )
}

const clerkMiddlewareHandler = clerkMiddleware(() => {
  return NextResponse.next()
})

const mockMiddleware = (_req: NextRequest) => {
  if (!isProduction) {
    console.warn('⚠️ Clerk middleware disabled — running in mock mode.')
  }
  return NextResponse.next()
}

export const middleware = hasClerkKeys && !isClerkDisabled
  ? clerkMiddlewareHandler
  : mockMiddleware

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
