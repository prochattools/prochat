import Link from 'next/link'

type AdminAccessNoticeProps = {
  title: string
  message: string
  tone?: 'warning' | 'danger'
}

const toneClasses: Record<NonNullable<AdminAccessNoticeProps['tone']>, string> = {
  warning: 'border-amber-500/30 bg-amber-500/10',
  danger: 'border-red-500/30 bg-red-500/10',
}

export function AdminAccessNotice({
  title,
  message,
  tone = 'warning',
}: AdminAccessNoticeProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-mono uppercase tracking-[0.4em] text-muted-foreground/70">Admin</p>
        <h1 className="text-4xl font-bold tracking-[-0.02em] text-foreground">{title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">{message}</p>
      </div>

      <div className={`rounded-3xl border p-8 shadow-sm ${toneClasses[tone]}`}>
        <p className="text-sm text-muted-foreground">
          If this environment should have admin access, verify Clerk production keys and confirm
          the signed-in user matches `ADMIN_EMAILS` or `ADMIN_CLERK_IDS`.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:border-foreground/50"
          >
            Return home
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition hover:border-foreground/50 hover:text-foreground"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  )
}
