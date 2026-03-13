'use client'

import { useEffect, useRef, useState } from 'react'

const COOKIE_SOURCE = 'pc_source'


function getTracker() {
  if (typeof window === 'undefined') return null
  return (window as typeof window & { umami?: { track?: (name: string, data?: Record<string, unknown>) => void } }).umami
}

// Source data is persisted in a short-lived cookie so the landing page can use it without query params.
function readCookie(name: string) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split('; ').find(cookie => cookie.startsWith(`${name}=`))
  if (!match) return null
  return decodeURIComponent(match.split('=')[1] || '')
}

export default function SourceTracker() {
  const trackedRef = useRef(false)

  useEffect(() => {
    const cookieSource = readCookie(COOKIE_SOURCE) || 'direct'
    if (trackedRef.current) return
    const tracker = getTracker()
    tracker?.track?.('visit_source', { source: cookieSource })
    tracker?.track?.('lead_magnet_view', { source: cookieSource, entry: 'go', campaign: 'lead-magnet' })
    if (process.env.NODE_ENV === 'development') {
      console.debug('[pc_source] %s', cookieSource)
    }
    trackedRef.current = true
  }, [])

  return null
}
