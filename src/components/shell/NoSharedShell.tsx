'use client'

import type { ReactNode } from 'react'

export function NoSharedShell({ children }: { children: ReactNode }) {
  return <div className="relative z-10">{children}</div>
}
