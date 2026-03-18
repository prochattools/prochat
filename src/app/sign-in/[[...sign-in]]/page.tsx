import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'
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
        description="Clerk is disabled or not configured correctly for this environment, so account sign-in is not available here."
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
      title="Sign in to ProChat"
      description="Use your ProChat account to continue into the product, account dashboard, or protected admin tools."
    >
      <SignIn forceRedirectUrl={redirectUrl} fallbackRedirectUrl={redirectUrl} />
    </AuthScreen>
  )
}
