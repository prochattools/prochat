'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '@/layout'

const HOME_ROUTE = '/'

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  if (pathname === HOME_ROUTE) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-background">{children}</main>
    </>
  )
}
