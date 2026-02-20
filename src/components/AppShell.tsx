'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/app/(marketing)/components/layout/Navbar'
import { Footer } from '@/app/(marketing)/components/layout/Footer'

const CHROMELESS_ROUTES = ['/starting-point']

export default function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname() || ''
	const isChromeless = CHROMELESS_ROUTES.some(
		route => pathname === route || pathname.startsWith(`${route}/`)
	)

	if (isChromeless) {
		return (
			<main className="font-marketing min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
				{children}
			</main>
		)
	}

	return (
		<>
			<Navbar />
			<main className="font-marketing min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
				{children}
			</main>
			<Footer />
		</>
	)
}
