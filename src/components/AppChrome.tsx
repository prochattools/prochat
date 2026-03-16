'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import AppShell from '@/components/AppShell'
import Header from '@/components/Header'
import { isMarketingSurfacePath } from '@/helpers/chrome-routes'

function isDocsPath(pathname: string) {
  return pathname === '/docs' || pathname.startsWith('/docs/')
}

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ''
  const docsRoute = isDocsPath(pathname)
  const hasMarketingSurface = !docsRoute && isMarketingSurfacePath(pathname)

  return (
    <>
      <div className={`relative z-10 ${hasMarketingSurface ? 'pc-site-surface' : ''}`}>
        {hasMarketingSurface ? (
          <div aria-hidden className="pc-site-surface__backdrop">
            <div className="pc-site-surface__base" />
            <div className="pc-site-surface__blob pc-site-surface__blob--hero" />
            <div className="pc-site-surface__blob pc-site-surface__blob--mid" />
            <div className="pc-site-surface__blob pc-site-surface__blob--lower" />
          </div>
        ) : null}
        {docsRoute ? (
          children
        ) : (
          <div className="relative z-10">
            <Header />
            <AppShell>{children}</AppShell>
          </div>
        )}
      </div>
    </>
  )
}
