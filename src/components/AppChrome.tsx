'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { CanonicalPublicShell } from '@/components/shell/CanonicalPublicShell'
import { DocsPublicShell } from '@/components/shell/DocsPublicShell'
import { LegacyCompatibilityShell } from '@/components/shell/LegacyCompatibilityShell'
import { NoSharedShell } from '@/components/shell/NoSharedShell'
import { ProtectedInternalShell } from '@/components/shell/ProtectedInternalShell'
import {
  getShellRouteClass,
  isCurrentDocsShellPath,
} from '@/helpers/shell-routes'

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ''
  const shellClass = getShellRouteClass(pathname)

  if (shellClass === 'canonical_public_shell' && isCurrentDocsShellPath(pathname)) {
    return <DocsPublicShell>{children}</DocsPublicShell>
  }

  if (shellClass === 'canonical_public_shell') {
    return <CanonicalPublicShell>{children}</CanonicalPublicShell>
  }

  if (shellClass === 'protected_internal_shell') {
    return <ProtectedInternalShell>{children}</ProtectedInternalShell>
  }

  if (shellClass === 'no_shared_shell') {
    return <NoSharedShell>{children}</NoSharedShell>
  }

  return <LegacyCompatibilityShell>{children}</LegacyCompatibilityShell>
}
