import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const isProduction = process.env.NODE_ENV === 'production'
const isCiBuild =
  process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true'
const isClerkDisabled =
  process.env.CLERK_DISABLED === 'true' ||
  process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true' ||
  (!isProduction && process.env.CLERK_ENABLE_DEV !== 'true')
const hasClerkKeys =
  !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !!process.env.CLERK_SECRET_KEY

if (isProduction && !isCiBuild && !isClerkDisabled && !hasClerkKeys) {
  throw new Error(
    'Clerk is required in production but Clerk environment variables are missing.'
  )
}

const mockMiddleware = (_req: NextRequest) => {
  if (!isProduction) {
    console.warn('⚠️ Clerk middleware disabled — running in mock mode.')
  }
  return NextResponse.next()
}

const getClerkMiddleware = () => {
  if (isClerkDisabled || !hasClerkKeys) {
    return null
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const clerk = require('@clerk/nextjs/server')
    const middlewareFactory =
      clerk.clerkMiddleware || clerk.authMiddleware || clerk.default
    if (!middlewareFactory) {
      if (!isProduction) {
        console.warn('⚠️ Clerk middleware factory not found — running in mock mode.')
      }
      return null
    }
    return middlewareFactory()
  } catch (err) {
    if (isProduction) {
      throw err
    }
    console.warn('⚠️ Clerk middleware not available, falling back to mock.', err)
    return null
  }
}

const clerkMiddlewareHandler = getClerkMiddleware()

export const middleware = (req: NextRequest) => {
  if (clerkMiddlewareHandler) {
    return clerkMiddlewareHandler(req)
  }
  return mockMiddleware(req)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
