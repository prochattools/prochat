import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook/:path*',
  '/api/health',
])

const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_') &&
  process.env.CLERK_SECRET_KEY?.startsWith('sk_')

export default hasClerkKeys
  ? clerkMiddleware((auth, request) => {
      if (!isPublicRoute(request)) {
        auth().protect()
      }
    })
  : function mockMiddleware() {
      console.warn('⚠️ Clerk middleware disabled — running in mock mode.')
      return NextResponse.next()
    }

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
