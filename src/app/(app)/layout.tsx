import type { ReactNode } from 'react'

import Header from '@/components/Header'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-background">{children}</main>
    </>
  )
}
