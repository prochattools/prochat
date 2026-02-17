'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/app/marketing-ai-studio/components/layout/Navbar'
import { Footer } from '@/app/marketing-ai-studio/components/layout/Footer'

const HOME_ROUTE = '/'
const CHROMELESS_ROUTES = ['/starting-point', '/store/prokit', '/store/saaskit']

export default function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname() || ''
	const isHome = pathname === HOME_ROUTE
	const isChromeless = CHROMELESS_ROUTES.some(
		route => pathname === route || pathname.startsWith(`${route}/`)
	)

	if (isChromeless) {
		return <main className="min-h-screen bg-background">{children}</main>
	}

	return (
		<>
			<Navbar />
			<main
				className={`min-h-screen bg-background ${isHome ? '' : 'pt-24'}`}
			>
				{children}
			</main>
			<Footer />
		</>
	)
}
