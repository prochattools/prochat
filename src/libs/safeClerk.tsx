'use client'

import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import {
  ClerkInstanceContext,
  ClientContext,
  OptionsContext,
  SessionContext,
  UserContext,
} from '@clerk/shared/react'

const isProduction = process.env.NODE_ENV === 'production'
const isCiBuild =
  process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true'
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''
const hasValidPublishableKey = publishableKey.startsWith('pk_')
const disableClerkInDev =
  process.env.DISABLE_CLERK_IN_DEV === 'true' ||
  process.env.NEXT_PUBLIC_DISABLE_CLERK_IN_DEV === 'true'

const isClerkExplicitlyDisabled =
  process.env.CLERK_DISABLED === 'true' ||
  process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'

const mockClientContext = {
  sessions: [],
  signOut: async () => {},
  openSignIn: async () => {},
  openSignUp: async () => {},
}

const mockClerkInstance = {
  client: mockClientContext,
  setActive: async () => {},
  signOut: mockClientContext.signOut,
  openSignIn: mockClientContext.openSignIn,
  openSignUp: mockClientContext.openSignUp,
  addListener: () => () => {},
  removeListener: () => () => {},
  emit: () => {},
  isLoaded: true,
  session: null,
  user: null,
}

const CLERK_DISABLED_REASON = isClerkExplicitlyDisabled || disableClerkInDev

export const isClerkDisabled = CLERK_DISABLED_REASON

export const isClerkEnabled = (() => {
  if (isClerkDisabled) {
    return false
  }

  if (!hasValidPublishableKey) {
    if (isProduction && !isCiBuild) {
      throw new Error(
        'Clerk is required in production but NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing or invalid.'
      )
    }
    return false
  }

  return true
})()

const MockClerkProvider = ({ children }: { children: React.ReactNode }) => (
  <ClerkInstanceContext.Provider value={mockClerkInstance as unknown as any}>
    <SessionContext.Provider value={{ value: null }}>
      <UserContext.Provider value={{ value: null }}>
        <ClientContext.Provider value={{ value: mockClientContext } as unknown as any}>
          <OptionsContext.Provider value={{}}>
            {children}
          </OptionsContext.Provider>
        </ClientContext.Provider>
      </UserContext.Provider>
    </SessionContext.Provider>
  </ClerkInstanceContext.Provider>
)

export const SafeClerkProvider = ({ children }: { children: React.ReactNode }) => {
  if (isClerkEnabled) {
    return <ClerkProvider>{children}</ClerkProvider>
  }

  if (!isProduction) {
    console.warn('⚠️ Clerk keys missing or invalid — using mock Clerk provider.')
  }

  return <MockClerkProvider>{children}</MockClerkProvider>
}
