import type { ReactNode } from 'react'

import AppHeader from '@/components/AppHeader'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <main className="min-h-screen bg-background">{children}</main>
    </>
  )
}
