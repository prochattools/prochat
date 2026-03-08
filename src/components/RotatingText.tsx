'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

type RotatingTextProps = {
  words: string[]
  interval?: number
  className?: string
  wrapperClassName?: string
}

export default function RotatingText({
  words,
  interval = 4000,
  className = '',
  wrapperClassName = '',
}: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [wordWidths, setWordWidths] = useState<number[]>([])
  const clearPreviousTimeoutRef = useRef<number | null>(null)
  const measureRefs = useRef<Array<HTMLSpanElement | null>>([])

  const measureWordWidths = useCallback(() => {
    setWordWidths(
      words.map((_, index) => {
        const node = measureRefs.current[index]
        return node ? Math.ceil(node.getBoundingClientRect().width) + 8 : 0
      }),
    )
  }, [words])

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
    if (words.length === 0) return

    measureWordWidths()
    window.addEventListener('resize', measureWordWidths)

    if (typeof document !== 'undefined' && 'fonts' in document) {
      void document.fonts.ready.then(measureWordWidths)
    }

    return () => {
      window.removeEventListener('resize', measureWordWidths)
    }
  }, [measureWordWidths, words.length])

  useEffect(() => {
    return () => {
      if (clearPreviousTimeoutRef.current !== null) {
        window.clearTimeout(clearPreviousTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || words.length <= 1) return

    const timer = window.setInterval(() => {
      setCurrentIndex(activeIndex => {
        setPreviousIndex(activeIndex)

        if (clearPreviousTimeoutRef.current !== null) {
          window.clearTimeout(clearPreviousTimeoutRef.current)
        }

        clearPreviousTimeoutRef.current = window.setTimeout(() => {
          setPreviousIndex(null)
        }, 400)

        return (activeIndex + 1) % words.length
      })
    }, interval)

    return () => {
      window.clearInterval(timer)
    }
  }, [interval, prefersReducedMotion, words.length])

  if (words.length === 0) return null

  if (prefersReducedMotion) {
    return <span className={className}>{words[0]}</span>
  }

  const currentWordWidth = wordWidths[currentIndex]

  return (
    <span
      className={`relative inline-block align-top leading-[inherit] ${wrapperClassName}`}
      aria-live="off"
      style={
        currentWordWidth
          ? {
              width: `${currentWordWidth}px`,
              transition: 'width 400ms ease',
            }
          : undefined
      }
    >
      <span aria-hidden="true" className="pointer-events-none absolute -z-10 h-0 overflow-hidden opacity-0">
        {words.map((word, index) => (
          <span
            key={`${word}-measure`}
            ref={node => {
              measureRefs.current[index] = node
            }}
            className={`block w-fit whitespace-nowrap ${className}`}
          >
            {word}
          </span>
        ))}
      </span>
      <span className="relative block overflow-hidden leading-[inherit]">
        <span aria-hidden="true" className={`pointer-events-none invisible block select-none whitespace-nowrap ${className}`}>
          {words[currentIndex]}
        </span>
      </span>
      <span className="pointer-events-none absolute inset-0 overflow-hidden">
        {words.map((word, index) => {
          const isActive = index === currentIndex
          const isPrevious = index === previousIndex

          return (
            <span
              key={word}
              aria-hidden={!isActive}
              className={`absolute inset-0 block whitespace-nowrap will-change-[transform,opacity,filter] ${className} ${
                isActive
                  ? 'translate-y-0 scale-100 opacity-100 blur-0'
                  : isPrevious
                    ? '-translate-y-3 scale-[0.98] opacity-0 blur-[6px]'
                    : 'translate-y-3 scale-[1.02] opacity-0 blur-[6px]'
              }`}
              style={{
                transition: 'opacity 400ms ease, transform 400ms ease, filter 400ms ease',
              }}
            >
              {word}
            </span>
          )
        })}
      </span>
    </span>
  )
}
