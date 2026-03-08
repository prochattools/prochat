'use client'

import { useEffect, useRef, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import ThemeTransitionOverlay from '@/components/ThemeTransitionOverlay'

export const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [overlayFadeOut, setOverlayFadeOut] = useState(false)
  const [overlayBackground, setOverlayBackground] = useState('')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const switchThemeTimeoutRef = useRef<number | null>(null)
  const clearTransitionTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)

    return () => {
      mediaQuery.removeEventListener('change', updatePreference)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (switchThemeTimeoutRef.current !== null) {
        window.clearTimeout(switchThemeTimeoutRef.current)
      }

      if (clearTransitionTimeoutRef.current !== null) {
        window.clearTimeout(clearTransitionTimeoutRef.current)
      }
    }
  }, [])

  const toggleTheme = () => {
    if (isTransitioning) return

    const isDarkTheme =
      resolvedTheme === 'dark' ||
      (typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark'))

    if (prefersReducedMotion || typeof window === 'undefined') {
      setTheme(isDarkTheme ? 'light' : 'dark')
      return
    }

    const currentBackgroundColor =
      window.getComputedStyle(document.documentElement).backgroundColor ||
      window.getComputedStyle(document.body).backgroundColor

    setOverlayBackground(currentBackgroundColor)
    setOverlayFadeOut(false)
    setIsTransitioning(true)

    switchThemeTimeoutRef.current = window.setTimeout(() => {
      setTheme(isDarkTheme ? 'light' : 'dark')
      window.requestAnimationFrame(() => {
        setOverlayFadeOut(true)
      })
    }, 50)

    clearTransitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false)
      setOverlayFadeOut(false)
    }, 550)
  }

  return (
    <>
      {isTransitioning ? (
        <ThemeTransitionOverlay
          backgroundColor={overlayBackground}
          fadeOut={overlayFadeOut}
        />
      ) : null}
      <button
        type="button"
        aria-label="Toggle theme"
        title="Toggle theme"
        onClick={toggleTheme}
        disabled={isTransitioning}
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none ${className}`}
      >
        <Sun className="hidden h-4 w-4 dark:block" />
        <Moon className="h-4 w-4 dark:hidden" />
      </button>
    </>
  )
}
