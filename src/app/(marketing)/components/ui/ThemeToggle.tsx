'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import ThemeRadialTransition from '@/components/ThemeRadialTransition'

export const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [overlayActive, setOverlayActive] = useState(false)
  const [overlayFadeOut, setOverlayFadeOut] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const activateOverlayTimeoutRef = useRef<number | null>(null)
  const switchThemeTimeoutRef = useRef<number | null>(null)
  const fadeOverlayTimeoutRef = useRef<number | null>(null)
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
      if (activateOverlayTimeoutRef.current !== null) {
        window.clearTimeout(activateOverlayTimeoutRef.current)
      }

      if (switchThemeTimeoutRef.current !== null) {
        window.clearTimeout(switchThemeTimeoutRef.current)
      }

      if (fadeOverlayTimeoutRef.current !== null) {
        window.clearTimeout(fadeOverlayTimeoutRef.current)
      }

      if (clearTransitionTimeoutRef.current !== null) {
        window.clearTimeout(clearTransitionTimeoutRef.current)
      }
    }
  }, [])

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning) return

    const isDarkTheme =
      resolvedTheme === 'dark' ||
      (typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark'))

    if (prefersReducedMotion || typeof window === 'undefined') {
      setTheme(isDarkTheme ? 'light' : 'dark')
      return
    }

    document.documentElement.style.setProperty('--x', `${event.clientX}px`)
    document.documentElement.style.setProperty('--y', `${event.clientY}px`)

    setOverlayActive(false)
    setOverlayFadeOut(false)
    setIsTransitioning(true)

    activateOverlayTimeoutRef.current = window.setTimeout(() => {
      setOverlayActive(true)
    }, 16)

    switchThemeTimeoutRef.current = window.setTimeout(() => {
      setTheme(isDarkTheme ? 'light' : 'dark')
    }, 120)

    fadeOverlayTimeoutRef.current = window.setTimeout(() => {
      setOverlayFadeOut(true)
    }, 720)

    clearTransitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false)
      setOverlayActive(false)
      setOverlayFadeOut(false)
    }, 1020)
  }

  return (
    <>
      {isTransitioning ? (
        <ThemeRadialTransition
          active={overlayActive}
          fadeOut={overlayFadeOut}
        />
      ) : null}
      <button
        type="button"
        aria-label="Toggle theme"
        title="Toggle theme"
        onClick={toggleTheme}
        disabled={isTransitioning}
        className={`theme-toggle-button inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground disabled:pointer-events-none ${className}`}
      >
        <Sun className="hidden h-4 w-4 dark:block" />
        <Moon className="h-4 w-4 dark:hidden" />
      </button>
    </>
  )
}
