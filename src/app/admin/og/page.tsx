import { notFound, redirect } from 'next/navigation'
import { getCurrentAdminUser, isAdminUser } from '@/lib/admin'
import { isClerkEnabled } from '@/libs/safeClerkServer'
import { AdminOgGenerator } from './AdminOgGenerator'

export const metadata = {
  title: 'OG image generator',
}

export default async function AdminOgPage() {
  const user = await getCurrentAdminUser()

  if (!user) {
    if (!isClerkEnabled()) {
      notFound()
    }
    redirect('/sign-in?redirect_url=/admin/og')
  }

  if (!isAdminUser(user)) {
    notFound()
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
