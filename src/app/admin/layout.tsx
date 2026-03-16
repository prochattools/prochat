import type { ReactNode } from 'react'
import { AdminNav } from './AdminNav'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="px-page py-16">
      <div className="mx-auto max-w-5xl space-y-8">
        <AdminNav />
        {children}
      </div>
    </div>
  )
}
