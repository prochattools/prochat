import Link from 'next/link'
import { redirect } from 'next/navigation'

import AppHeader from '@/components/AppHeader'
import config from '@/config'
import { hasClerkServerKeys, safeAuth } from '@/libs/safeClerkServer'

type StatusBadgeProps = {
  label: string
  ok: boolean
}

function StatusBadge({ label, ok }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
        ok
          ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
          : 'border-amber-300 bg-amber-50 text-amber-700'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      {label}: {ok ? 'configured' : 'missing'}
    </span>
  )
}

export default function HomePage() {
  const { userId } = safeAuth()

  if (userId) {
    redirect('/dashboard')
  }

  const hasDatabase = Boolean(
    process.env.APP_SLUG && process.env.SYSTEM_DATABASE_URL && process.env.DATABASE_URL
  )
  const hasStripe = Boolean(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.startsWith('pk_') &&
      process.env.STRIPE_SECRET_KEY?.startsWith('sk_')
  )

  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-slate-50">
        <section className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
            <div className="mb-6 inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
              ProKit Developer Core
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {config.appName}
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">{config.appDescription}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <StatusBadge label="Database" ok={hasDatabase} />
              <StatusBadge label="Clerk" ok={Boolean(hasClerkServerKeys)} />
              <StatusBadge label="Stripe" ok={hasStripe} />
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Sign in
              </Link>
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Setup Docs
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
