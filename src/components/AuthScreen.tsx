import type { ReactNode } from 'react'
import Link from 'next/link'
import Logo from '@/components/logo'

type AuthScreenProps = {
  title: string
  description: string
  children: ReactNode
}

export function AuthScreen({ title, description, children }: AuthScreenProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10 sm:px-8">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_45%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="relative z-10 grid w-full max-w-5xl gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:items-center">
          <div className="hidden lg:block">
            <div className="max-w-md space-y-6">
              <Link href="/" className="inline-flex items-center">
                <Logo scale={0.95} />
              </Link>
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.36em] text-primary/80">ProChat auth</p>
                <h1 className="text-4xl font-bold tracking-[-0.04em] text-foreground">{title}</h1>
                <p className="text-base leading-7 text-muted-foreground">{description}</p>
              </div>
              <div className="rounded-3xl border border-border bg-surface/70 p-5 text-sm leading-6 text-muted-foreground shadow-sm">
                Use the same shared auth account you expect to access ProChat and the connected apps with in production.
              </div>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[460px] flex-col items-center justify-center gap-6">
            <div className="lg:hidden flex flex-col items-center gap-4 text-center">
              <Link href="/" className="inline-flex items-center">
                <Logo scale={0.9} />
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-[-0.03em] text-foreground">{title}</h1>
                <p className="text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            </div>
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </main>
  )
}
