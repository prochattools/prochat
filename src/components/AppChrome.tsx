'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { CanonicalPublicShell } from '@/components/shell/CanonicalPublicShell'
import { LegacyCompatibilityShell } from '@/components/shell/LegacyCompatibilityShell'
import { NoSharedShell } from '@/components/shell/NoSharedShell'
import { ProtectedInternalShell } from '@/components/shell/ProtectedInternalShell'
import { getUnifiedPublicRouteConfig } from '@/helpers/public-route-design'
import { getShellRouteClass } from '@/helpers/shell-routes'

export default function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ''
  const publicDesign = getUnifiedPublicRouteConfig(pathname)

  if (publicDesign) {
    return (
      <CanonicalPublicShell
        visualVariant={publicDesign.variant}
        contentOwnsMain={publicDesign.contentOwnsMain}
      >
        {children}
      </CanonicalPublicShell>
    )
  }

  const shellClass = getShellRouteClass(pathname)

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
