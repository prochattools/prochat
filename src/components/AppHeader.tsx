import Image from 'next/image'
import Link from 'next/link'

import config from '@/config'
import { safeAuth } from '@/libs/safeClerkServer'

export default function AppHeader() {
  const { userId } = safeAuth()
  const version = (process.env.PROCHAT_VERSION || '').trim()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/logo/prochat_logo_dark.png"
              alt="ProChat"
              width={140}
              height={32}
              className="h-6 w-auto"
              priority
            />
            <span>{config.appName}</span>
          </Link>
          {version ? (
            <span className="text-xs text-muted-foreground">v{version}</span>
          ) : null}
        </div>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/setup" className="hover:underline">
            Setup
          </Link>
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
