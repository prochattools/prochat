import { ReactNode } from 'react'

export default function DocsContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 rounded-3xl border border-border/80 bg-surface/90 p-8 shadow-surface">
      {children}
    </div>
  )
}
