import { SignIn } from '@clerk/nextjs'

export default function Page() {
  const clerkDisabled =
    process.env.CLERK_DISABLED === 'true' ||
    process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'
  const hasClerkKeys =
    (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '').startsWith('pk_') &&
    (process.env.CLERK_SECRET_KEY || '').startsWith('sk_')

  if (clerkDisabled) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-2">Authentication is currently disabled</h1>
      </div>
    )
  }

  if (!hasClerkKeys) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold mb-2">Clerk not configured</h1>
        <p className="text-muted-foreground">
          Set <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{' '}
          <code>CLERK_SECRET_KEY</code> in <code>.env</code> (local) or your
          production environment, then restart the server.
        </p>
      </div>
    )
  }

  return <SignIn forceRedirectUrl="/dashboard" />
}
