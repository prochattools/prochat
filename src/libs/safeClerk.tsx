'use client'

import React from 'react'
import {
  ClerkProvider,
  useUser as useClerkUser,
  useClerk as useClerkClient,
} from '@clerk/nextjs'

/**
 * Minimal safe subset of Clerk’s user fields, compatible with mock mode.
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
  isLoaded: boolean
  isSignedIn: boolean
  user: SafeUser | null
}

/**
 * Detect if Clerk is properly configured.
 */
const isProduction = process.env.NODE_ENV === 'production'
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''
const hasValidPublishableKey = publishableKey.startsWith('pk_')

export const isClerkDisabled =
  !isProduction && process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'

export const isClerkEnabled = (() => {
  if (isClerkDisabled) {
    return false
  }

  if (isProduction) {
    if (!hasValidPublishableKey) {
      throw new Error(
        'Clerk is required in production but NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing or invalid.'
      )
    }
    return true
  }

  return hasValidPublishableKey
})()

/**
 * Mock fallbacks for missing Clerk setup.
 */
function useUserMock(): SafeUserResult {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ useUser() called while Clerk is disabled — returning mock user.')
  }
  return { isLoaded: true, isSignedIn: false, user: null }
}

function useClerkMock() {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ useClerk() called while Clerk is disabled — returning mock client.')
  }
  return {
    openSignIn: () => console.warn('Mock: openSignIn() called'),
    signOut: () => console.warn('Mock: signOut() called'),
  }
}

/**
 * Safe ClerkProvider wrapper — disables Clerk entirely when keys are invalid.
 */
export const SafeClerkProvider = ({ children }: { children: React.ReactNode }) => {
  if (!isClerkEnabled) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('⚠️ Clerk keys missing or invalid — skipping ClerkProvider and using mock mode.')
    }
    return <>{children}</>
  }

  try {
    return <ClerkProvider>{children}</ClerkProvider>
  } catch (err) {
    console.error('❌ ClerkProvider initialization failed:', err)
    if (isProduction) {
      throw err
    }
    return <>{children}</>
  }
}

/**
 * Safe versions of Clerk hooks with automatic mock fallback.
 */
export const useUser = (): SafeUserResult => {
  try {
    if (!isClerkEnabled) return useUserMock()
    return useClerkUser() as unknown as SafeUserResult
  } catch (err) {
    console.warn('⚠️ useUser() failed, falling back to mock mode:', err)
    if (isProduction) {
      throw err
    }
    return useUserMock()
  }
}

export const useClerk = () => {
  try {
    if (!isClerkEnabled) return useClerkMock()
    return useClerkClient()
  } catch (err) {
    console.warn('⚠️ useClerk() failed, falling back to mock mode:', err)
    if (isProduction) {
      throw err
    }
    return useClerkMock()
  }
}
