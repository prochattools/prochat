'use client'

import React from 'react'
import {
  ClerkProvider,
  useUser as useClerkUser,
  useClerk as useClerkClient,
} from '@clerk/nextjs'

/**
 * Minimal safe subset of Clerk's user fields, compatible with mock mode.
 */
interface SafeUser {
  id?: string
  firstName?: string
  primaryEmailAddress?: {
    emailAddress?: string
  }
  hasImage?: boolean
  imageUrl?: string
}

interface SafeUserResult {
  isSignedIn: boolean
  user: SafeUser | null
}

/**
 * Detect if Clerk is enabled.
 *
 * Client-side we can only rely on NEXT_PUBLIC_* env vars.
 */
export const isClerkDisabled =
  process.env.CLERK_DISABLED === 'true' ||
  process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'

export const isClerkEnabled = (() => {
  if (isClerkDisabled) {
    return false
  }

  const pk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''
  return pk.startsWith('pk_')
})()

/**
 * Mock fallbacks for missing Clerk setup.
 */
function mockUser(): SafeUserResult {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ useUser() called while Clerk is disabled — returning mock user.')
  }
  return { isSignedIn: false, user: null }
}

function mockClerk() {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ useClerk() called while Clerk is disabled — returning mock client.')
  }
  return {
    openSignIn: () => console.warn('Mock: openSignIn() called'),
    signOut: () => console.warn('Mock: signOut() called'),
  }
}

/**
 * Safe ClerkProvider wrapper — disables Clerk entirely when publishable key is missing.
 */
export const SafeClerkProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  if (!isClerkEnabled) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '⚠️ Clerk publishable key missing/invalid — skipping ClerkProvider and using mock mode.'
      )
    }
    return <>{children}</>
  }

  try {
    return <ClerkProvider>{children}</ClerkProvider>
  } catch (err) {
    console.error('❌ ClerkProvider initialization failed:', err)
    return <>{children}</>
  }
}

/**
 * Safe versions of Clerk hooks with automatic mock fallback.
 */
export const useUser = (): SafeUserResult => {
  const hook = useClerkUser as unknown as () => SafeUserResult
  if (!isClerkEnabled) return mockUser()

  try {
    return hook()
  } catch (err) {
    console.warn('⚠️ useUser() failed, falling back to mock mode:', err)
    return mockUser()
  }
}

export const useClerk = () => {
  const hook = useClerkClient
  if (!isClerkEnabled) return mockClerk()

  try {
    return hook()
  } catch (err) {
    console.warn('⚠️ useClerk() failed, falling back to mock mode:', err)
    return mockClerk()
  }
}
