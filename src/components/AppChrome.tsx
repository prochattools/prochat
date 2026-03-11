'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import AppShell from '@/components/AppShell'
import Header from '@/components/Header'
import { Scaffolding } from '@/components/ui/Scaffolding'

function isDocsPath(pathname: string) {
  return pathname === '/docs' || pathname.startsWith('/docs/')
}

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ''
  const docsRoute = isDocsPath(pathname)

  return (
    <>
      {!docsRoute && (
        <div className="fixed inset-0 z-0 hidden pointer-events-none md:block" aria-hidden="true">
          <Scaffolding opacity={0.6} />
        </div>
      )}

      <div className="relative z-10">
        {docsRoute ? (
          children
        ) : (
          <>
            <Header />
            <AppShell>{children}</AppShell>
          </>
        )}
      </div>
    </>
  )
}
