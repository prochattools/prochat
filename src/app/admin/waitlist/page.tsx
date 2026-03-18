import { redirect } from 'next/navigation'
import { getAdminAccessState } from '@/lib/admin'
import { listAdminWaitlist } from '@/lib/waitlist-admin'
import { AdminAccessNotice } from '../AdminAccessNotice'

type SearchParams = {
  search?: string
  status?: 'subscribed' | 'unsubscribed'
}

export const metadata = {
  title: 'Waitlist',
}

const statusBadges: Record<'subscribed' | 'unsubscribed', string> = {
  subscribed: 'bg-emerald-500/10 text-emerald-500',
  unsubscribed: 'bg-red-500/10 text-red-500',
}

function formatTimestamp(date: Date | null) {
  if (!date) {
    return '—'
  }

  return new Date(date).toLocaleString()
}

export default async function AdminWaitlistPage({ searchParams }: { searchParams: SearchParams }) {
  const access = await getAdminAccessState()

  if (access.status === 'unauthenticated') {
    redirect('/sign-in?redirect_url=/admin/waitlist')
  }

  if (access.status === 'misconfigured') {
    return (
      <AdminAccessNotice
        title="Admin configuration required"
        message={access.message}
        tone="warning"
      />
    )
  }

  if (access.status === 'unauthorized') {
    return (
      <AdminAccessNotice
        title="Access denied"
        message="Your Clerk account is signed in, but it is not on the admin allowlist for this environment."
        tone="danger"
      />
    )
  }

  const waitlist = await listAdminWaitlist()
  const normalizedSearch = searchParams.search?.trim().toLowerCase() || ''
  const filtered = waitlist.filter(entry => {
    if (searchParams.status && entry.status !== searchParams.status) {
      return false
    }

    if (!normalizedSearch) {
      return true
    }

    return entry.email.toLowerCase().includes(normalizedSearch)
  })

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-mono uppercase tracking-[0.4em] text-muted-foreground/70">Admin</p>
        <h1 className="text-4xl font-bold tracking-[-0.02em] text-foreground">Waitlist</h1>
        <p className="text-lg text-muted-foreground">
          View waitlist signups and whether each subscriber is still active or has unsubscribed.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground">Waitlist subscribers</p>
            <p className="text-sm text-muted-foreground">
              Read-only visibility into waitlist signups and subscription state.
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-foreground/50 hover:text-foreground"
          >
            Refresh
          </button>
        </div>

        <form className="mt-6 grid gap-3 md:grid-cols-2" method="get">
          <label className="flex flex-col text-sm text-muted-foreground">
            Search
            <input
              defaultValue={searchParams.search}
              name="search"
              placeholder="email"
              className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            />
          </label>
          <label className="flex flex-col text-sm text-muted-foreground">
            Status
            <select
              defaultValue={searchParams.status ?? ''}
              name="status"
              className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
            >
              <option value="">Any</option>
              <option value="subscribed">Subscribed</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </label>
        </form>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Selected products</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Created</th>
                <th className="px-3 py-2">Unsubscribed</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-sm text-muted-foreground">
                    {waitlist.length === 0
                      ? 'No waitlist records yet.'
                      : 'No waitlist records match the current filters.'}
                  </td>
                </tr>
              )}

              {filtered.map(entry => (
                <tr key={entry.id} className="border-t border-border text-muted-foreground">
                  <td className="px-3 py-3 font-medium text-foreground">{entry.email}</td>
                  <td className="px-3 py-3">
                    {entry.products.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {entry.products.map(product => (
                          <span
                            key={`${entry.id}-${product}`}
                            className="rounded-full border border-border bg-background px-3 py-1 text-[0.7rem] font-medium tracking-[0.2em] text-foreground"
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">{entry.productsCsv || '—'}</span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <span
                      className={`rounded-full px-3 py-1 text-[0.65rem] font-semibold tracking-[0.3em] ${statusBadges[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-[0.8rem] text-muted-foreground">
                    {formatTimestamp(entry.createdAt)}
                  </td>
                  <td className="px-3 py-3 text-[0.8rem] text-muted-foreground">
                    {formatTimestamp(entry.unsubscribedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
