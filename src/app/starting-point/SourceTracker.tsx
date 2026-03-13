'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

function getTracker() {
  if (typeof window === 'undefined') return null
  return (window as typeof window & { umami?: { track?: (name: string, data?: Record<string, unknown>) => void } }).umami
}

export default function SourceTracker() {
  const searchParams = useSearchParams()
  const src = searchParams?.get('src') || 'direct'

  useEffect(() => {
    const tracker = getTracker()
    tracker?.track?.('visit_source', { source: src })
  }, [src])

  return null
}
