'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from '@/app/marketing-ai-studio/components/layout/Navbar'
import { Footer } from '@/app/marketing-ai-studio/components/layout/Footer'

const CHROMELESS_ROUTES = ['/starting-point']

export default function AppShell({ children }: { children: ReactNode }) {
	const pathname = usePathname() || ''
	const isChromeless = CHROMELESS_ROUTES.some(
		route => pathname === route || pathname.startsWith(`${route}/`)
	)

	if (isChromeless) {
		return (
			<main className="min-h-screen bg-gray-50 text-slate-900 dark:bg-[#010814] dark:text-slate-100">
				{children}
			</main>
		)
	}

	return (
		<>
			<Navbar />
			<main className="min-h-screen bg-gray-50 text-slate-900 dark:bg-[#010814] dark:text-slate-100">
				{children}
			</main>
			<Footer />
		</>
	)
}
