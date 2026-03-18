import type { Metadata } from 'next'
import { SignIn } from '@clerk/nextjs'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function Page({ searchParams }: { searchParams?: { redirect_url?: string } }) {
  const clerkDisabled =
    process.env.CLERK_DISABLED === 'true' ||
    process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'

  if (clerkDisabled) {
    return (
      <div className="mx-auto max-w-md px-page py-20 text-center text-sm text-slate-600 dark:text-slate-300">
        Authentication is currently disabled.
      </div>
    )
  }

  const redirectUrl = searchParams?.redirect_url?.startsWith('/') ? searchParams.redirect_url : '/dashboard'

  return <SignIn forceRedirectUrl={redirectUrl} fallbackRedirectUrl={redirectUrl} />
}
