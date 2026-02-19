'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    const isDarkTheme =
      resolvedTheme === 'dark' ||
      (typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark'))
    setTheme(isDarkTheme ? 'light' : 'dark')
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={toggleTheme}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-slate-600 shadow-sm transition-colors hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-[#373C53] dark:bg-[#0B111B] dark:text-[#B2B5BA] dark:shadow-none dark:hover:bg-[#1E242D] dark:hover:text-white dark:focus-visible:ring-offset-[#0B111B] ${className}`}
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="h-4 w-4 dark:hidden" />
    </button>
  )
}
