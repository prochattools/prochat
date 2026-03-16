import { currentUser } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

export const metadata = {
  title: 'Licenses',
}

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(email => email.trim().toLowerCase())
  .filter(Boolean)

const ADMIN_CLERK_IDS = (process.env.ADMIN_CLERK_IDS || '')
  .split(',')
  .map(id => id.trim())
  .filter(Boolean)

type ClerkUser = Awaited<ReturnType<typeof currentUser>>

function isAdmin(user: ClerkUser) {
  if (!user) return false
  if (ADMIN_EMAILS.length && user.primaryEmailAddress?.emailAddress) {
    const email = user.primaryEmailAddress.emailAddress.toLowerCase()
    if (ADMIN_EMAILS.includes(email)) {
      return true
    }
  }
  if (ADMIN_CLERK_IDS.length && ADMIN_CLERK_IDS.includes(user.id)) {
    return true
  }
  return ADMIN_EMAILS.length === 0 && ADMIN_CLERK_IDS.length === 0
}

export default async function AdminLicensesPage() {
  const user = await currentUser()

  if (!user) {
    redirect(`/sign-in?redirect_url=/admin/licenses`)
  }

  if (!isAdmin(user)) {
    notFound()
  }

  return (
    <div className="px-page py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-mono uppercase tracking-[0.4em] text-muted-foreground/70">Admin</p>
          <h1 className="text-4xl font-bold tracking-[-0.02em] text-foreground">Licenses</h1>
          <p className="text-lg text-muted-foreground">
            Manage license records, invitations, and activations once the system is wired up.
            This view is intentionally lean so we can extend it with tables and controls later.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">License records</p>
              <p className="text-sm text-muted-foreground">
                No data is shown yet — this placeholder reserves the space for the future table.
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-foreground/50 hover:text-foreground"
            >
              Refresh
            </button>
          </div>

          <div className="mt-8 min-h-[240px] rounded-2xl border-2 border-dashed border-border-subtle bg-background/30 p-6 text-center text-sm text-muted-foreground">
            No license data yet. This area will become a sortable table once the integration is in place.
          </div>
        </div>
      </div>
    </div>
  )
}
