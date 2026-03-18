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
import { useTheme } from 'next-themes'

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

const signInUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in'
const signUpUrl = process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up'
const afterSignInUrl = process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard'
const afterSignUpUrl = process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard'

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

function useClerkAppearance() {
  const { resolvedTheme } = useTheme()
  const dark = resolvedTheme !== 'light'

  return {
    variables: {
      colorPrimary: '#3B82F6',
      colorBackground: dark ? '#111827' : '#FFFFFF',
      colorInputBackground: dark ? '#0F172A' : '#F8FAFC',
      colorInputText: dark ? '#FFFFFF' : '#0F172A',
      colorText: dark ? '#FFFFFF' : '#0F172A',
      colorTextSecondary: dark ? '#94A3B8' : '#475569',
      colorNeutral: dark ? '#1E293B' : '#E2E8F0',
      colorDanger: '#EF4444',
      borderRadius: '18px',
      fontFamily: 'var(--font-sans)',
    },
    elements: {
      rootBox: 'w-full',
      cardBox: 'w-full',
      card: dark
        ? 'w-full rounded-[28px] border border-white/10 bg-[#111827]/95 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)]'
        : 'w-full rounded-[28px] border border-slate-200 bg-white text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.12)]',
      headerTitle: dark ? 'text-white tracking-[-0.02em]' : 'text-slate-950 tracking-[-0.02em]',
      headerSubtitle: dark ? 'text-slate-300' : 'text-slate-600',
      socialButtonsBlockButton: dark
        ? 'border border-white/10 bg-slate-900 text-white hover:bg-slate-800'
        : 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
      formButtonPrimary: 'bg-blue-500 text-white hover:bg-blue-400 shadow-none',
      formFieldInput: dark
        ? 'border border-white/10 bg-slate-950 text-white placeholder:text-slate-500'
        : 'border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400',
      footerActionLink: 'text-blue-500 hover:text-blue-400',
      identityPreviewText: dark ? 'text-slate-300' : 'text-slate-600',
      formFieldLabel: dark ? 'text-slate-200' : 'text-slate-700',
      dividerText: dark ? 'text-slate-500' : 'text-slate-400',
      dividerLine: dark ? 'bg-white/10' : 'bg-slate-200',
      alertText: dark ? 'text-slate-200' : 'text-slate-700',
    },
  }
}

export const SafeClerkProvider = ({ children }: { children: React.ReactNode }) => {
  const appearance = useClerkAppearance()

  if (isClerkEnabled) {
    return (
      <ClerkProvider
        signInUrl={signInUrl}
        signUpUrl={signUpUrl}
        afterSignInUrl={afterSignInUrl}
        afterSignUpUrl={afterSignUpUrl}
        appearance={appearance}
      >
        {children}
      </ClerkProvider>
    )
  }

  if (!isProduction) {
    console.warn('⚠️ Clerk keys missing or invalid — using mock Clerk provider.')
  }

  return <MockClerkProvider>{children}</MockClerkProvider>
}
