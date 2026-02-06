import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'

import config from '@/config'

export default function AppHeader() {
  const { userId } = auth()
  const version = (process.env.PROCHAT_VERSION || '').trim()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold">
            {config.appName}
          </Link>
          {version ? (
            <span className="text-xs text-muted-foreground">v{version}</span>
          ) : null}
        </div>

        <nav className="flex items-center gap-4 text-sm">
          {userId ? (
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/sign-in" className="hover:underline">
                Sign in
              </Link>
              <Link href="/sign-up" className="hover:underline">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

