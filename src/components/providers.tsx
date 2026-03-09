'use client';

import dynamic from 'next/dynamic'
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

const Toaster = dynamic(
  () => import('react-hot-toast').then(module => module.Toaster),
  { ssr: false, loading: () => null }
)

const Tooltip = dynamic(
  () => import('react-tooltip').then(module => module.Tooltip),
  { ssr: false, loading: () => null }
)

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        storageKey="theme"
        themes={['light', 'dark']}
        defaultTheme="dark"
        enableSystem={false}
      >
        <div className="min-h-screen bg-background text-foreground">
          {children}
        </div>
      </ThemeProvider>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          className: "border border-border-subtle bg-surface-elevated text-sm text-foreground shadow-elevated",
        }}
      />
      
      <Tooltip
        id="tooltip"
        className="z-[60] !opacity-100 max-w-sm shadow-lg"
      />
    </>
  );
}
