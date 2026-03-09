'use client'

import { useEffect, useRef, useState } from 'react'

type ScrollDirection = 'up' | 'down'

interface UseScrollDirectionOptions {
	threshold?: number
	mobileBreakpoint?: number
}

export function useScrollDirection({
	threshold = 12,
	mobileBreakpoint = 768,
}: UseScrollDirectionOptions = {}): ScrollDirection {
	const [direction, setDirection] = useState<ScrollDirection>('up')
	const lastScrollYRef = useRef(0)
	const tickingRef = useRef(false)
	const isMobileRef = useRef(false)

	useEffect(() => {
		if (typeof window === 'undefined') {
			return
		}

		const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint - 1}px)`)
		const updateViewportMode = () => {
			isMobileRef.current = mediaQuery.matches
			lastScrollYRef.current = window.scrollY

			if (!mediaQuery.matches) {
				setDirection('up')
			}
		}

		updateViewportMode()

		const handleScroll = () => {
			if (!isMobileRef.current || tickingRef.current) {
				return
			}

			tickingRef.current = true

			window.requestAnimationFrame(() => {
				const currentScrollY = window.scrollY
				const delta = currentScrollY - lastScrollYRef.current

				if (Math.abs(delta) > threshold) {
					setDirection(delta > 0 ? 'down' : 'up')
					lastScrollYRef.current = currentScrollY
				} else if (currentScrollY <= threshold) {
					setDirection('up')
					lastScrollYRef.current = currentScrollY
				}

				tickingRef.current = false
			})
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		mediaQuery.addEventListener('change', updateViewportMode)
		window.addEventListener('resize', updateViewportMode, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleScroll)
			mediaQuery.removeEventListener('change', updateViewportMode)
			window.removeEventListener('resize', updateViewportMode)
		}
	}, [mobileBreakpoint, threshold])

	return direction
}
