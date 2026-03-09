'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import React from 'react'

const LazyClerkProvider = dynamic(
	() => import('@clerk/nextjs').then(module => module.ClerkProvider),
	{ ssr: false, loading: () => null },
)

const isProduction = process.env.NODE_ENV === 'production'
const isCiBuild =
	process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true'
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''
const hasValidPublishableKey = publishableKey.startsWith('pk_')
const isClerkExplicitlyDisabled =
	process.env.CLERK_DISABLED === 'true' ||
	process.env.NEXT_PUBLIC_CLERK_DISABLED === 'true'

const CLERK_ROUTE_PREFIXES = ['/dashboard', '/processing-page', '/kits/prokit', '/kits/saaskit'] as const

export const isClerkDisabled = isClerkExplicitlyDisabled

export const isClerkEnabled = (() => {
	if (isClerkDisabled) {
		return false
	}

	if (!hasValidPublishableKey) {
		if (isProduction && !isCiBuild) {
			throw new Error(
				'Clerk is required in production but NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing or invalid.'
			)
		}
		return false
	}

	return true
})()

function routeNeedsClerk(pathname: string) {
	return CLERK_ROUTE_PREFIXES.some(
		route => pathname === route || pathname.startsWith(`${route}/`)
	)
}

export const SafeClerkProvider = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname() || ''

	if (!isClerkEnabled || !routeNeedsClerk(pathname)) {
		if (!isClerkEnabled && process.env.NODE_ENV !== 'production') {
			console.warn('⚠️ Clerk keys missing or invalid — skipping ClerkProvider and using mock mode.')
		}
		return <>{children}</>
	}

	return <LazyClerkProvider>{children}</LazyClerkProvider>
}
