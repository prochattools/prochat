'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Footer } from '@/app/(marketing)/components/layout/Footer'
import { isChromelessPath, isFullscreenPath } from '@/helpers/chrome-routes'

export default function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname() || ''
	const isChromeless = isChromelessPath(pathname)
	const isFullscreenRoute = isFullscreenPath(pathname)

	if (isChromeless) {
		return (
			<main className="font-marketing min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
				{children}
			</main>
		)
	}

	return (
		<>
			<main
				className={`font-marketing bg-background text-foreground selection:bg-primary selection:text-primary-foreground ${
					isFullscreenRoute
						? 'box-border h-dvh overflow-hidden pt-[var(--pc-header-height)]'
						: 'min-h-screen'
				}`}
			>
				{children}
			</main>
			{!isFullscreenRoute && <Footer />}
		</>
	)
}
