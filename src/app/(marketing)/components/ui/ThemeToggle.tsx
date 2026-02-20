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
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="h-4 w-4 dark:hidden" />
    </button>
  )
}
