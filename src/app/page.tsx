import Image from 'next/image'
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
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${
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
    <div className="font-marketing relative min-h-screen overflow-hidden bg-white text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:28px_28px]" />
        <div className="absolute left-1/2 top-0 h-[36rem] w-[70rem] -translate-x-1/2 bg-gradient-to-b from-indigo-100/80 via-indigo-50/20 to-transparent" />
      </div>

      <div className="relative z-10">
        <AppHeader />

        <main>
          <section className="container mx-auto px-4 pb-16 pt-14 sm:pt-20">
            <div className="mx-auto max-w-5xl text-center">
              <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5b49f5]" />
                ProChat Boilerplate
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
                Build your SaaS faster
                <span className="block text-slate-400">powered by the ProKit engine</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                {config.appDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <StatusBadge label="Database" ok={hasDatabase} />
                <StatusBadge label="Clerk" ok={Boolean(hasClerkServerKeys)} />
                <StatusBadge label="Stripe" ok={hasStripe} />
              </div>
            </div>

            <div className="mx-auto mt-10 grid max-w-5xl gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_20px_60px_-40px_rgba(17,24,39,0.45)] backdrop-blur md:grid-cols-3 md:p-6">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-[#5b49f5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a3bd1] hover:shadow-[0_10px_30px_-15px_rgba(91,73,245,0.8)]"
              >
                Go to Dashboard
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#5b49f5] hover:text-[#5b49f5]"
              >
                Sign in
              </Link>
              <Link
                href="/setup"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#5b49f5] hover:text-[#5b49f5]"
              >
                Setup Docs
              </Link>
            </div>

            <div className="mx-auto mt-6 grid max-w-5xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Core</p>
                <p className="mt-2 text-sm text-slate-700">Auth, billing, tenant schema, and deploy-safe migrations.</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Lean</p>
                <p className="mt-2 text-sm text-slate-700">No blog, no funnel, no launch pages in the ProChat base.</p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/90 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Branded</p>
                <div className="mt-3 flex items-center gap-3">
                  <Image
                    src="/logo/prochat_logo_dark.png"
                    alt="ProChat"
                    width={136}
                    height={32}
                    className="h-6 w-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
