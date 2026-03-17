'use client'

import { useEffect } from 'react'
import {
  normalizeSource,
  resolveStartingPointSource,
  sourceFromReferrerString,
} from '@/app/go/source'
import { trackEventOncePerSession } from '@/utils/analytics'

const COOKIE_SOURCE = 'pc_source'
const COOKIE_ENTRY = 'pc_entry'
const COOKIE_CAMPAIGN = 'pc_campaign'

function readCookie(name: string) {
  if (typeof document === 'undefined') return null
  const match = document.cookie.split('; ').find(cookie => cookie.startsWith(`${name}=`))
  if (!match) return null
  return decodeURIComponent(match.split('=')[1] || '')
}

export default function SaaSkitSourceTracker() {
  useEffect(() => {
    const cookieSource = readCookie(COOKIE_SOURCE)
    const cookieEntry = readCookie(COOKIE_ENTRY)
    const cookieCampaign = readCookie(COOKIE_CAMPAIGN)
    const referrer = typeof document !== 'undefined' ? document.referrer : ''
    const queryParamSource =
      typeof window !== 'undefined' ? new URL(window.location.href).searchParams.get('src') : null
    const normalizedQuerySource = normalizeSource(queryParamSource)
    const normalizedCookieSource = normalizeSource(cookieSource)
    const referrerSource = sourceFromReferrerString(referrer)
    const resolvedSource = resolveStartingPointSource({
      queryParamSource,
      cookieSource,
      referrer,
    })
    const hasAttributionContext = Boolean(
      normalizedQuerySource ||
        normalizedCookieSource ||
        referrerSource !== 'direct' ||
        cookieEntry ||
        cookieCampaign,
    )

    if (!hasAttributionContext && resolvedSource === 'direct') {
      return
    }

    trackEventOncePerSession(
      'visit_source',
      `visit_source:/kits/saaskit:${resolvedSource}:${cookieEntry || cookieCampaign || 'none'}`,
      {
        source: resolvedSource,
        entry: cookieEntry || undefined,
        campaign: cookieCampaign || undefined,
        source_page: '/kits/saaskit',
      },
    )
  }, [])

  return null
}
