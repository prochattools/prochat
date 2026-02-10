import Link from 'next/link'

import AppHeader from '@/components/AppHeader'

export default function SetupPage() {
  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-slate-50">
        <section className="container mx-auto max-w-4xl px-4 py-14">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Setup</h1>
            <p className="mt-2 text-slate-600">
              ProChat (built on ProKit) runs against a shared Supabase/Postgres database. Each app uses its own
              tenant schema and role.
            </p>

            <div className="mt-6 rounded-lg border bg-slate-900 p-4 text-sm text-slate-100">
              <pre className="overflow-x-auto">
                <code>{`npm run db:init -- --slug prokitcore
npm run db:migrate:dev
npm run dev`}</code>
              </pre>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Back Home
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
