'use client';

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "react-tooltip";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        storageKey="theme"
        themes={['light', 'dark']}
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
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
