'use client'

import { useCallback, useEffect, useState } from 'react'

const THEME_STORAGE_KEY = 'theme'
const THEME_CHANGE_EVENT = 'prochat-theme-change'

type ThemeMode = 'light' | 'dark'

function isThemeMode(value: string | null): value is ThemeMode {
	return value === 'light' || value === 'dark'
}

function resolvePreferredTheme(): ThemeMode {
	if (typeof window === 'undefined') {
		return 'light'
	}

	const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
	if (isThemeMode(storedTheme)) {
		return storedTheme
	}

	return window.matchMedia('(prefers-color-scheme: dark)').matches
		? 'dark'
		: 'light'
}

function syncRootTheme(theme: ThemeMode) {
	const root = window.document.documentElement
	root.classList.remove('light', 'dark')
	root.classList.add(theme)
	root.style.colorScheme = theme
}

function broadcastTheme(theme: ThemeMode) {
	window.dispatchEvent(
		new CustomEvent<ThemeMode>(THEME_CHANGE_EVENT, { detail: theme })
	)
}

export function useThemeMode() {
	const [mounted, setMounted] = useState(false)
	const [isDark, setIsDark] = useState(false)

	useEffect(() => {
		const initialTheme = resolvePreferredTheme()
		setIsDark(initialTheme === 'dark')
		syncRootTheme(initialTheme)
		setMounted(true)

		const handleThemeChange = (event: Event) => {
			const customEvent = event as CustomEvent<ThemeMode>
			setIsDark(customEvent.detail === 'dark')
			syncRootTheme(customEvent.detail)
		}

		const handleStorage = (event: StorageEvent) => {
			if (event.key !== THEME_STORAGE_KEY || !isThemeMode(event.newValue)) {
				return
			}
			setIsDark(event.newValue === 'dark')
			syncRootTheme(event.newValue)
			broadcastTheme(event.newValue)
		}

		window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange as EventListener)
		window.addEventListener('storage', handleStorage)

		return () => {
			window.removeEventListener(
				THEME_CHANGE_EVENT,
				handleThemeChange as EventListener
			)
			window.removeEventListener('storage', handleStorage)
		}
	}, [])

	const setThemeMode = useCallback((theme: ThemeMode) => {
		setIsDark(theme === 'dark')
		syncRootTheme(theme)
		window.localStorage.setItem(THEME_STORAGE_KEY, theme)
		broadcastTheme(theme)
	}, [])

	const toggleTheme = useCallback(() => {
		setThemeMode(isDark ? 'light' : 'dark')
	}, [isDark, setThemeMode])

	return { mounted, isDark, setThemeMode, toggleTheme }
}
