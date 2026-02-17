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
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-gray-50 text-slate-900 dark:bg-[#010814] dark:text-slate-100">
          {children}
        </div>
      </ThemeProvider>

      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          className: "text-sm dark:bg-black dark:text-white",
        }}
      />
      
      <Tooltip
        id="tooltip"
        className="z-[60] !opacity-100 max-w-sm shadow-lg"
      />
    </>
  );
}
