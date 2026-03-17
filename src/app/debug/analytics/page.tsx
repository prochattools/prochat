'use client'

import { useCallback } from 'react'
import { trackEvent } from '@/utils/analytics'

const basePayload = {
  source: 'debug',
  entry: 'debug',
  campaign: 'debug-test',
  location: 'analytics-debug',
}

const helperEvents = [
  'visit_source',
  'lead_magnet_view',
  'lead_magnet_submit',
  'lead_magnet_success',
  'nav_cta_click',
  'product_cta_click',
  'pricing_view',
  'checkout_start',
  'waitlist_view',
  'waitlist_submit',
  'waitlist_success',
] as const

const eventPayloadExtras: Record<string, Record<string, unknown>> = {
  nav_cta_click: { cta: 'debug-nav', product: 'debug' },
  product_cta_click: { cta: 'debug-product', product: 'debug' },
  pricing_view: { product: 'debug-pricing', detail: 'debug' },
  checkout_start: { product: 'debug', flow: 'debug-checkout' },
  waitlist_view: { waitlist: 'debug' },
  waitlist_submit: { waitlist: 'debug' },
  waitlist_success: { waitlist: 'debug' },
}

function fireHelper(eventName: (typeof helperEvents)[number]) {
  trackEvent(eventName, { ...basePayload, ...eventPayloadExtras[eventName] })
}

const allEventNames = [...helperEvents]

export default function AnalyticsDebugPage() {
  const fireAll = useCallback(async () => {
    for (const eventName of allEventNames) {
      console.log('[analytics-debug] firing', eventName)
      fireHelper(eventName as typeof helperEvents[number])
      await new Promise(resolve => setTimeout(resolve, 150))
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-3xl font-bold mb-4">Analytics Debug</h1>
      <p className="mb-6 text-sm text-muted-foreground">Use this page to verify Umami custom events.</p>
      <div className="grid gap-3 md:grid-cols-2">
        {allEventNames.map(eventName => (
          <button
            key={eventName}
            className="rounded-md border border-border bg-white/70 px-4 py-3 text-left text-base font-mono text-sm uppercase tracking-wide text-foreground shadow-sm hover:bg-primary/10"
            type="button"
            onClick={() => fireHelper(eventName as typeof helperEvents[number])}
          >
            Fire {eventName}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <button
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40"
          type="button"
          onClick={fireAll}
        >
          Fire ALL events
        </button>
      </div>
    </div>
  )
}
