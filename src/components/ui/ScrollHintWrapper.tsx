'use client'

import { ChevronDown, ChevronRight } from 'lucide-react'
import { type ReactNode, useEffect, useId, useMemo, useRef, useState } from 'react'

import { cn } from '@/helpers/utils'

type ScrollHintDirection = 'horizontal' | 'vertical' | 'auto'
type ScrollHintAxis = Exclude<ScrollHintDirection, 'auto'> | null

type ScrollHintWrapperProps = {
  children: ReactNode
  direction?: ScrollHintDirection
  storageKey?: string
  className?: string
}

function resolveOverflowAxis(target: HTMLElement, direction: ScrollHintDirection): ScrollHintAxis {
  const hasHorizontalOverflow = target.scrollWidth - target.clientWidth > 1
  const hasVerticalOverflow = target.scrollHeight - target.clientHeight > 1

  if (direction === 'horizontal') {
    return hasHorizontalOverflow ? 'horizontal' : null
  }

  if (direction === 'vertical') {
    return hasVerticalOverflow ? 'vertical' : null
  }

  if (hasHorizontalOverflow) return 'horizontal'
  if (hasVerticalOverflow) return 'vertical'
  return null
}

function HandIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.75 11.5V5.8a1.15 1.15 0 0 1 2.3 0v4.2" />
      <path d="M11.05 10.5V4.7a1.15 1.15 0 0 1 2.3 0v5.2" />
      <path d="M13.35 10.9V6.15a1.15 1.15 0 1 1 2.3 0v5.15" />
      <path d="M15.65 11.5v-2.25a1.15 1.15 0 1 1 2.3 0v4.95c0 3.18-1.94 5.3-4.9 5.3h-1.7c-2.5 0-4.24-1.06-5.45-3.36L4.5 13.15a1.3 1.3 0 0 1 2.26-1.28l1.99 3.15V11.5a1.15 1.15 0 0 1 2.3 0v2.85" />
    </svg>
  )
}

export default function ScrollHintWrapper({
  children,
  direction = 'auto',
  storageKey,
  className,
}: ScrollHintWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const generatedId = useId().replace(/[:]/g, '')
  const sessionKey = useMemo(
    () => `scroll-hint:${storageKey ?? `${direction}-${generatedId}`}`,
    [direction, generatedId, storageKey],
  )

  const [axis, setAxis] = useState<ScrollHintAxis>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)

    try {
      if (sessionStorage.getItem(sessionKey) === 'dismissed') {
        setIsDismissed(true)
      }
    } catch {
      // Ignore storage access issues.
    }
  }, [sessionKey])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const target = wrapper?.firstElementChild

    if (!(target instanceof HTMLElement) || !(wrapper instanceof HTMLElement)) {
      return
    }

    const updateAxis = () => {
      setAxis(resolveOverflowAxis(target, direction))
    }

    const dismiss = () => {
      setIsDismissed(true)

      try {
        sessionStorage.setItem(sessionKey, 'dismissed')
      } catch {
        // Ignore storage access issues.
      }
    }

    updateAxis()

    const resizeObserver = new ResizeObserver(() => {
      updateAxis()
    })

    resizeObserver.observe(target)
    resizeObserver.observe(wrapper)

    const intersectionObserver = new IntersectionObserver(
      entries => {
        setIsVisible(entries.some(entry => entry.isIntersecting))
      },
      { threshold: 0.2 },
    )

    intersectionObserver.observe(wrapper)

    target.addEventListener('scroll', dismiss, { passive: true, once: true })
    target.addEventListener('touchstart', dismiss, { passive: true, once: true })
    target.addEventListener('wheel', dismiss, { passive: true, once: true })

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      target.removeEventListener('scroll', dismiss)
      target.removeEventListener('touchstart', dismiss)
      target.removeEventListener('wheel', dismiss)
    }
  }, [direction, sessionKey])

  const shouldShow = isHydrated && !isDismissed && isVisible && axis !== null

  useEffect(() => {
    if (!shouldShow) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }

      return
    }

    timeoutRef.current = setTimeout(() => {
      setIsDismissed(true)

      try {
        sessionStorage.setItem(sessionKey, 'dismissed')
      } catch {
        // Ignore storage access issues.
      }
    }, 4000)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [sessionKey, shouldShow])

  return (
    <div ref={wrapperRef} className={cn('relative', className)}>
      {children}
      {axis ? (
        <div
          aria-hidden="true"
          className={cn(
            'scroll-hint-overlay',
            shouldShow ? 'scroll-hint-overlay--visible' : 'scroll-hint-overlay--hidden',
            axis === 'horizontal' ? 'scroll-hint-overlay--horizontal' : '',
            axis === 'vertical' ? 'scroll-hint-overlay--vertical' : '',
          )}
        >
          <div className="scroll-hint-overlay__gradient" />
          <div className="scroll-hint-overlay__indicator">
            {axis === 'vertical' ? (
              <ChevronDown className="scroll-hint-overlay__arrow" size={18} strokeWidth={2} />
            ) : (
              <ChevronRight className="scroll-hint-overlay__arrow" size={18} strokeWidth={2} />
            )}
            <HandIcon className="scroll-hint-overlay__hand" />
          </div>
        </div>
      ) : null}
    </div>
  )
}
