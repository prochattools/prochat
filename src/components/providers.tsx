'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'

import { isCurrentCanonicalVisualShellPath } from '@/helpers/shell-routes'

const Toaster = dynamic(
  () => import('react-hot-toast').then(module => module.Toaster),
  { ssr: false, loading: () => null },
)

const Tooltip = dynamic(
  () => import('react-tooltip').then(module => module.Tooltip),
  { ssr: false, loading: () => null },
)

function CanonicalPublicProviders({ children }: { children: ReactNode }) {
  return <div className="min-h-screen">{children}</div>
}

function LegacyCompatibilityProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        storageKey="theme"
        themes={['light', 'dark']}
        defaultTheme="dark"
        enableSystem={true}
      >
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </ThemeProvider>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          className:
            'border border-border-subtle bg-surface-elevated text-sm text-foreground shadow-elevated',
        }}
      />

      <Tooltip
        id="tooltip"
        className="z-[60] !opacity-100 max-w-sm shadow-lg"
      />
    </>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ''

  if (isCurrentCanonicalVisualShellPath(pathname)) {
    return <CanonicalPublicProviders>{children}</CanonicalPublicProviders>
  }

  return <LegacyCompatibilityProviders>{children}</LegacyCompatibilityProviders>
}
