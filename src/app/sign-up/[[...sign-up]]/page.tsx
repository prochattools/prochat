import { SignUp } from '@clerk/nextjs'

export default function Page() {
  const clerkDisabled =
    process.env.CLERK_DISABLED === 'true' ||
    process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'

  if (clerkDisabled) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center text-sm text-slate-600 dark:text-slate-300">
        Authentication is currently disabled.
      </div>
    )
  }

  return <SignUp forceRedirectUrl="/dashboard" />
}
