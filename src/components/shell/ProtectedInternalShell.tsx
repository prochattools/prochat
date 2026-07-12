'use client'

import type { ReactNode } from 'react'

import { LegacyCompatibilityShell } from '@/components/shell/LegacyCompatibilityShell'

export function ProtectedInternalShell({
  children,
}: {
  children: ReactNode
}) {
  return <LegacyCompatibilityShell>{children}</LegacyCompatibilityShell>
}
