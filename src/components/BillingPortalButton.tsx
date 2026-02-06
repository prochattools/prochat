'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

export default function BillingPortalButton() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openPortal = async () => {
    setLoading(true)
    setError(null)

    try {
      const resp = await fetch('/api/stripe/create-portal', { method: 'POST' })
      const data = (await resp.json().catch(() => ({} as any))) as {
        url?: string
        error?: string
      }

      if (!resp.ok) {
        throw new Error(data?.error || `Failed to open portal (status ${resp.status})`)
      }

      if (!data?.url) {
        throw new Error('No portal URL returned')
      }

      window.location.href = data.url
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to open portal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={openPortal} disabled={loading}>
        {loading ? 'Opening…' : 'Manage billing'}
      </Button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

