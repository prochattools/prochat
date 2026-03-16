'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function RevokeLicenseAction({ licenseId, disabled }: { licenseId: string; disabled: boolean }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  async function handleRevoke() {
    if (disabled || loading || success) return
    const confirmed = window.confirm('Revoke access for this license?')
    if (!confirmed) return
    const reason = window.prompt('Reason (optional)', 'Admin revocation') || ''
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/admin/licenses/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseId, reason: reason.trim() || undefined }),
      })
      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setError(data?.error || 'Unable to revoke access. See logs for details.')
        return
      }
      setSuccess(true)
      router.refresh()
    } catch (err) {
      console.error('Revoke access request failed', err)
      setError('Network error while revoking access.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleRevoke}
        disabled={disabled || loading || success}
        className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground transition hover:border-foreground/60 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-60"
      >
        {success ? 'Revoked' : 'Revoke access'}
      </button>
      {error && <p className="mt-1 text-[0.65rem] text-destructive">{error}</p>}
    </div>
  )
}
