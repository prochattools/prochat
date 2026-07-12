'use client'

import type { ReactNode } from 'react'

import AppShell from '@/components/AppShell'
import Header from '@/components/Header'

export function LegacyCompatibilityShell({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="relative z-10 pc-site-surface">
      <div aria-hidden className="pc-site-surface__backdrop">
        <div className="pc-site-surface__lines" />
        <div className="pc-site-surface__blob pc-site-surface__blob--hero" />
        <div className="pc-site-surface__blob pc-site-surface__blob--mid" />
        <div className="pc-site-surface__blob pc-site-surface__blob--lower" />
        <div className="pc-site-surface__blob pc-site-surface__blob--accent" />
        <div className="pc-site-surface__noise" />
      </div>
      <div className="relative z-10">
        <Header />
        <AppShell>{children}</AppShell>
      </div>
    </div>
  )
}
