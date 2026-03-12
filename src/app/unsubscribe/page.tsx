import Link from 'next/link'

import { unsubscribeWaitlistSignup } from '@/lib/waitlist/server'

export const dynamic = 'force-dynamic'

type UnsubscribePageProps = {
  searchParams?: {
    token?: string
  }
}

export default async function UnsubscribePage({ searchParams }: UnsubscribePageProps) {
  const token = searchParams?.token?.trim() || ''
  const result = token ? await unsubscribeWaitlistSignup(token) : { status: 'invalid' as const }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-xl items-center px-page py-24">
        <section className="w-full rounded-3xl border border-border bg-background/95 p-8 shadow-surface md:p-10">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
            Waitlist Email Preferences
          </p>
          <h1 className="font-brand text-3xl font-bold tracking-[-0.04em] text-foreground md:text-4xl">
            {result.status === 'success'
              ? "You've been unsubscribed."
              : 'This unsubscribe link is invalid or expired.'}
          </h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            {result.status === 'success'
              ? 'You will no longer receive ProChat waitlist emails. You can resubscribe any time from the waitlist page.'
              : 'Request a new waitlist email from the form if you still want to manage your subscription.'}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/waitlist"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open waitlist
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Back to ProChat
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
