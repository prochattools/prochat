import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

import config from '@/config'
import AppHeader from '@/components/AppHeader'

export default function HomePage() {
  const { userId } = auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <>
      <AppHeader />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight">{config.appName}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          {config.appDescription}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/sign-up"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
          >
            Create account
          </Link>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-md border px-4 py-2 font-semibold hover:bg-accent transition"
          >
            Sign in
          </Link>
        </div>
      </main>
    </>
  )
}

