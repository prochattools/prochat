'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Footer } from '@/app/(marketing)/components/layout/Footer'
import { isChromelessPath, isFooterlessPath, isFullscreenPath, isMarketingSurfacePath } from '@/helpers/chrome-routes'

function hasIntrinsicHeaderSpacing(pathname: string) {
	return (
		pathname === '/' ||
		pathname === '/contact' ||
		pathname === '/learn' ||
		pathname.startsWith('/learn/') ||
		pathname === '/systems/prochat-os' ||
		pathname === '/starting-point' ||
		pathname === '/proof' ||
		pathname === '/studio' ||
		pathname === '/systems/events' ||
		pathname === '/waitlist' ||
		pathname === '/waiting-list' ||
		pathname === '/waas/accountants' ||
		pathname === '/docs' ||
		pathname === '/prompts' ||
		pathname.startsWith('/kits')
	)
}

export default function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname() || ''
	const isChromeless = isChromelessPath(pathname)
	const isFullscreenRoute = isFullscreenPath(pathname)
	const isFooterlessRoute = isFooterlessPath(pathname)
	const hasMarketingSurface = !isChromeless && isMarketingSurfacePath(pathname)
	const needsGlobalHeaderOffset = !isFullscreenRoute && !hasIntrinsicHeaderSpacing(pathname)

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
				className={`font-marketing ${hasMarketingSurface ? 'bg-transparent' : 'bg-background'} text-foreground selection:bg-primary selection:text-primary-foreground ${
					isFullscreenRoute
						? 'box-border h-dvh overflow-hidden pt-[var(--pc-header-height)]'
						: `min-h-screen ${needsGlobalHeaderOffset ? 'pt-14 md:pt-16 lg:pt-[72px]' : ''}`
				}`}
			>
				{children}
			</main>
			{!isFullscreenRoute && !isFooterlessRoute && <Footer />}
		</>
	)
}
