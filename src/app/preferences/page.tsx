import Link from 'next/link'

import { WAITLIST_PRODUCT_OPTIONS } from '@/lib/waitlist/products'
import { getWaitlistSignupByToken } from '@/lib/waitlist/server'

export const dynamic = 'force-dynamic'

type PreferencesPageProps = {
  searchParams?: {
    token?: string
    updated?: string
    error?: string
  }
}

export default async function PreferencesPage({ searchParams }: PreferencesPageProps) {
  const token = searchParams?.token?.trim() || ''
  const signup = token ? await getWaitlistSignupByToken(token) : null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-page py-24">
        <section className="w-full rounded-3xl border border-border bg-background/95 p-8 shadow-surface md:p-10">
          {signup ? (
            <>
              <div className="mb-8 space-y-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                  Waitlist Preferences
                </p>
                <h1 className="font-brand text-3xl font-bold tracking-[-0.04em] text-foreground md:text-4xl">
                  Manage your ProChat waitlist preferences
                </h1>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                  Update the products you want to hear about or unsubscribe from all future
                  waitlist emails.
                </p>
              </div>

              {searchParams?.updated === '1' ? (
                <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-foreground">
                  Preferences updated.
                </div>
              ) : null}

              {searchParams?.error && searchParams.error !== 'invalid' ? (
                <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-foreground">
                  {searchParams.error}
                </div>
              ) : null}

              <form action="/api/preferences" method="post" className="space-y-6">
                <input type="hidden" name="token" value={token} />

                <fieldset className="space-y-3">
                  <legend className="text-sm font-medium text-foreground">
                    Select products you&apos;re interested in
                  </legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {WAITLIST_PRODUCT_OPTIONS.map(option => {
                      const checked = signup.products.includes(option.value)

                      return (
                        <label
                          key={option.value}
                          className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 transition-colors hover:border-primary/35 hover:bg-primary/5"
                        >
                          <input
                            type="checkbox"
                            name="products"
                            value={option.value}
                            defaultChecked={checked}
                            className="peer sr-only"
                          />
                          <span className="flex h-5 w-5 items-center justify-center rounded-md border border-border bg-background text-transparent transition-all peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white">
                            ✓
                          </span>
                          <span className="text-sm font-medium text-foreground">{option.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <label className="flex items-start gap-3 rounded-2xl border border-border bg-surface px-4 py-4">
                  <input
                    type="checkbox"
                    name="unsubscribe"
                    defaultChecked={Boolean(signup.unsubscribed_at)}
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="space-y-1">
                    <span className="block text-sm font-medium text-foreground">
                      Unsubscribe from all waitlist emails
                    </span>
                    <span className="block text-sm text-muted-foreground">
                      You can still keep your product selections saved without receiving updates.
                    </span>
                  </span>
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Save preferences
                  </button>
                  <Link
                    href="/"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Back to ProChat
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                Waitlist Preferences
              </p>
              <h1 className="font-brand text-3xl font-bold tracking-[-0.04em] text-foreground md:text-4xl">
                This preferences link is invalid or expired.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Request a new waitlist confirmation email from the form if you still want to manage
                your preferences.
              </p>
              <Link
                href="/waitlist"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Open waitlist
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
