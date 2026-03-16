import { currentUser } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'
import { listAdminLicenses } from '@/lib/licenses'
import { isAdminUser } from '@/lib/admin'
import { RevokeLicenseAction } from './RevokeLicenseAction'

type SearchParams = {
  search?: string
  product?: 'saaskit' | 'prokit' | 'uxkit'
  accessStatus?: 'pending' | 'invited' | 'active' | 'revoked'
}

export const metadata = {
  title: 'Licenses',
}

export default async function AdminLicensesPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await currentUser()

  if (!user) {
    redirect(`/sign-in?redirect_url=/admin/licenses`)
  }

  if (!isAdminUser(user)) {
    notFound()
  }

  const licenses = await listAdminLicenses()
  const normalizedSearch = searchParams.search?.trim().toLowerCase() || ''
  const filtered = licenses.filter(license => {
    if (searchParams.product && license.product !== searchParams.product) {
      return false
    }
    if (searchParams.accessStatus && license.accessStatus !== searchParams.accessStatus) {
      return false
    }
    if (!normalizedSearch) {
      return true
    }
    return (
      license.purchaserEmail.toLowerCase().includes(normalizedSearch) ||
      (license.githubUsername?.toLowerCase().includes(normalizedSearch) ?? false)
    )
  })

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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">License records</p>
              <p className="text-sm text-muted-foreground">
                Filter and search across licenses. No destructive actions yet — this table is read-only for now.
              </p>
            </div>
            <button
              type="button"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-foreground/50 hover:text-foreground"
            >
              Refresh
            </button>
          </div>

          <form className="mt-6 grid gap-3 md:grid-cols-3" method="get">
            <label className="flex flex-col text-sm text-muted-foreground">
              Search
              <input
                defaultValue={searchParams.search}
                name="search"
                placeholder="email or GitHub"
                className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              />
            </label>
            <label className="flex flex-col text-sm text-muted-foreground">
              Product
              <select
                defaultValue={searchParams.product ?? ''}
                name="product"
                className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Any</option>
                <option value="saaskit">SaaSKit</option>
                <option value="prokit">ProKit</option>
                <option value="uxkit">UXKit</option>
              </select>
            </label>
            <label className="flex flex-col text-sm text-muted-foreground">
              Access status
              <select
                defaultValue={searchParams.accessStatus ?? ''}
                name="accessStatus"
                className="mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="">Any</option>
                <option value="pending">Pending</option>
                <option value="invited">Invited</option>
                <option value="active">Active</option>
                <option value="revoked">Revoked</option>
              </select>
            </label>
          </form>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Product</th>
                  <th className="px-3 py-2">GitHub</th>
                  <th className="px-3 py-2">Payment</th>
                  <th className="px-3 py-2">Provisioning</th>
                  <th className="px-3 py-2">Access</th>
                  <th className="px-3 py-2">Updated</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(license => (
                  <tr
                    key={license.id}
                    className="divide-y divide-border border-t border-border text-muted-foreground"
                  >
                    <td className="px-3 py-3 text-foreground font-medium">{license.purchaserEmail}</td>
                    <td className="px-3 py-3 uppercase tracking-[0.2em]">{license.product}</td>
                    <td className="px-3 py-3">{license.githubUsername ?? '—'}</td>
                    <td className="px-3 py-3">{license.paymentStatus}</td>
                    <td className="px-3 py-3">{license.provisioningStatus}</td>
                    <td className="px-3 py-3">{license.accessStatus}</td>
                    <td className="px-3 py-3">{new Date(license.updatedAt).toLocaleString()}</td>
                    <td className="px-3 py-3">
                      <RevokeLicenseAction
                        licenseId={license.id}
                        disabled={license.accessStatus === 'revoked' || !license.githubUsername}
                      />
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-6 text-center text-sm text-muted-foreground">
                      No license records match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
