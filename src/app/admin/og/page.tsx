import { redirect } from 'next/navigation'
import { getAdminAccessState } from '@/lib/admin'
import { AdminAccessNotice } from '../AdminAccessNotice'
import { AdminOgGenerator } from './AdminOgGenerator'

export const metadata = {
  title: 'OG image generator',
}

export default async function AdminOgPage() {
  const access = await getAdminAccessState()

  if (access.status === 'unauthenticated') {
    redirect('/sign-in?redirect_url=/admin/og')
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

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-mono uppercase tracking-[0.4em] text-muted-foreground/70">Admin</p>
        <h1 className="text-4xl font-bold tracking-[-0.02em] text-foreground">OG image generator</h1>
        <p className="text-lg text-muted-foreground">
          Reuses the existing social image route and shared renderer. This helper only builds the
          URL for internal use.
        </p>
      </div>

      <AdminOgGenerator />
    </div>
  )
}
