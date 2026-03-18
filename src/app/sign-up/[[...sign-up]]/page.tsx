import type { Metadata } from 'next'
import { SignUp } from '@clerk/nextjs'
import { AuthScreen } from '@/components/AuthScreen'
import { isClerkEnabled as isServerClerkEnabled } from '@/libs/safeClerkServer'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page({ searchParams }: { searchParams?: { redirect_url?: string } }) {
  let clerkEnabled = false

  try {
    clerkEnabled = isServerClerkEnabled()
  } catch {
    clerkEnabled = false
  }

  if (!clerkEnabled) {
    return (
      <AuthScreen
        title="Authentication unavailable"
        description="Clerk is disabled or not configured correctly for this environment, so account sign-up is not available here."
      >
        <div className="rounded-[28px] border border-border bg-surface p-8 text-center text-sm text-muted-foreground shadow-sm">
          Authentication is currently disabled.
        </div>
      </AuthScreen>
    )
  }

  const redirectUrl = searchParams?.redirect_url?.startsWith('/') ? searchParams.redirect_url : '/dashboard'

  return (
    <AuthScreen
      title="Create your ProChat account"
      description="Set up your ProChat account to access checkout flows, product setup, and protected admin tools when your account is allowed."
    >
      <SignUp forceRedirectUrl={redirectUrl} fallbackRedirectUrl={redirectUrl} />
    </AuthScreen>
  )
}
