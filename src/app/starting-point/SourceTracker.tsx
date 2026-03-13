'use client'

import { useEffect, useRef } from 'react'
import { resolveStartingPointSource } from '@/app/go/source'

const COOKIE_SOURCE = 'pc_source'

type UmamiTracker =
  | ((event: string, payload?: Record<string, unknown>) => void)
  | {
      track?: (event: string, payload?: Record<string, unknown>) => void
    }

function getTracker() {
  if (typeof window === 'undefined') return null
  return (window as typeof window & { umami?: UmamiTracker }).umami ?? null
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
    const queryParamSource = typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('src') : null
    const resolvedSource = resolveStartingPointSource({
      queryParamSource,
      cookieSource,
      referrer,
    })
    const tracker = getTracker()
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    const windowUmami = typeof window !== 'undefined' ? (window as typeof window & { umami?: unknown }).umami : undefined
    const trackerAvailable = typeof tracker === 'function' || typeof tracker?.track === 'function'

    console.debug('[source-tracker] mounted', {
      currentUrl,
      queryParamSource,
      cookieSource,
      referrer,
      resolvedSource,
      trackerAvailable,
      windowUmamiExists: typeof windowUmami !== 'undefined' && windowUmami !== null,
    })

    try {
      if (typeof tracker === 'function') {
        console.debug('[source-tracker] about to fire visit_source via function', resolvedSource)
        tracker('visit_source', { source: resolvedSource })
        console.debug('[source-tracker] about to fire lead_magnet_view via function', resolvedSource)
        tracker('lead_magnet_view', {
          source: resolvedSource,
          entry: 'go',
          campaign: 'lead-magnet',
        })
      } else if (typeof tracker?.track === 'function') {
        console.debug('[source-tracker] about to fire visit_source via track()', resolvedSource)
        tracker.track('visit_source', { source: resolvedSource })
        console.debug('[source-tracker] about to fire lead_magnet_view via track()', resolvedSource)
        tracker.track('lead_magnet_view', {
          source: resolvedSource,
          entry: 'go',
          campaign: 'lead-magnet',
        })
      } else {
        console.debug('[source-tracker] umami tracker not ready yet', { resolvedSource })
      }
    } catch (error) {
      console.error('[source-tracker] umami event failed', error)
    }

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
