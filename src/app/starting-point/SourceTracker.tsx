'use client'

import { useEffect, useRef } from 'react'
import { resolveStartingPointSource } from '@/app/go/source'

const COOKIE_SOURCE = 'pc_source'

function getTracker() {
  if (typeof window === 'undefined') return null
  return (window as typeof window & { umami?: { track?: (name: string, data?: Record<string, unknown>) => void } }).umami
}

function readCookie(name: string) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split('; ').find(cookie => cookie.startsWith(`${name}=`))
  if (!match) return null
  return decodeURIComponent(match.split('=')[1] || '')
}

export default function SourceTracker() {
  const trackedRef = useRef(false)

  useEffect(() => {
    if (trackedRef.current) return
    const cookieSource = readCookie(COOKIE_SOURCE)
    const referrer = typeof document !== 'undefined' ? document.referrer : ''
    const resolvedSource = resolveStartingPointSource({ cookieSource, referrer })
    const tracker = getTracker()
    tracker?.track?.('visit_source', { source: resolvedSource })
    tracker?.track?.('lead_magnet_view', {
      source: resolvedSource,
      entry: 'go',
      campaign: 'lead-magnet',
    })
    if (process.env.NODE_ENV === 'development') {
      console.debug('[starting-point source]', {
        cookieSource,
        referrer,
        resolvedSource,
      })
    }
    trackedRef.current = true
  }, [])

  return null
}
