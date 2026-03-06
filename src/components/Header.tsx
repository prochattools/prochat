'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/app/(marketing)/components/ui/ThemeToggle'
import { isChromelessPath } from '@/helpers/chrome-routes'
import { cn } from '@/helpers/utils'
import { trackEvent } from '@/utils/analytics'

const NAV_ITEMS = [
	{ label: 'System', href: '/' },
	{ label: 'Kits', href: '/kits' },
	{ label: 'Blog', href: '/blog' },
	{ label: 'Contact', href: '/contact' },
] as const

function isActivePath(pathname: string, href: string) {
	if (href === '/') {
		return pathname === '/'
	}

	return pathname === href || pathname.startsWith(`${href}/`)
}

function HeaderThemeToggle() {
	return (
		<div className="pc-toggle-shell shrink-0">
			<ThemeToggle className="h-full w-full rounded-full border-0 bg-transparent text-foreground shadow-none hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-0" />
		</div>
	)
}

function DesktopNavigation({ pathname }: { pathname: string }) {
	return (
		<nav className="pc-nav-capsule min-w-[58rem] justify-between xl:min-w-[64rem]" aria-label="Primary">
			<ul className="flex items-center gap-14 whitespace-nowrap xl:gap-16">
				{NAV_ITEMS.map(item => (
					<li key={item.href}>
						<Link
							href={item.href}
							aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
							className="pc-header-link focus-visible:outline-none"
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
			<Button
				asChild
				size="sm"
				className="h-10 rounded-[var(--pc-button-radius)] px-5 text-lg shadow-none hover:brightness-[1.03]"
			>
				<Link
					href="/kits"
					onClick={() => trackEvent('explore_kits_click', { location: 'header_capsule' })}
				>
					Explore kits
				</Link>
			</Button>
		</nav>
	)
}

function MobileNavigation({ pathname }: { pathname: string }) {
	const [open, setOpen] = useState(false)

	return (
		<div className="ml-auto flex items-center gap-3 lg:hidden">
			<div className="pc-nav-capsule gap-2 px-2 py-2">
				<Button
					asChild
					size="sm"
					className="h-9 rounded-[var(--pc-button-radius)] px-4 shadow-none hover:brightness-[1.03]"
				>
					<Link
						href="/kits"
						onClick={() => trackEvent('explore_kits_click', { location: 'mobile_header_capsule' })}
					>
						Explore
					</Link>
				</Button>
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger asChild>
						<button
							type="button"
							aria-label="Open navigation menu"
							className="pc-mobile-nav-trigger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-0"
						>
							<Menu className="h-4 w-4" />
						</button>
					</SheetTrigger>
					<SheetContent
						side="right"
						className="pc-mobile-sheet w-[min(22rem,calc(100vw-1rem))] border-l px-5 py-6 sm:max-w-[22rem]"
					>
						<SheetHeader className="space-y-1">
							<SheetTitle className="font-brand text-xl tracking-[-0.05em]">
								Navigation
							</SheetTitle>
							<SheetDescription>
								Structured navigation for builders working inside ProChat.
							</SheetDescription>
						</SheetHeader>
						<div className="mt-8 flex flex-col gap-2">
							{NAV_ITEMS.map(item => (
								<Link
									key={item.href}
									href={item.href}
									aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
									onClick={() => setOpen(false)}
									className={cn(
										'rounded-[var(--pc-button-radius)] border px-4 py-3 font-mono text-[0.86rem] font-medium uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-0',
										isActivePath(pathname, item.href)
											? 'border-transparent bg-transparent font-bold text-foreground'
											: 'border-transparent bg-transparent text-muted-foreground hover:border-transparent hover:bg-transparent hover:font-bold hover:text-foreground',
									)}
									>
										{item.label}
									</Link>
								))}
							</div>
							<div className="mt-6 rounded-[var(--pc-button-radius)] border border-white/10 bg-white/5 p-4">
								<p className="text-sm leading-relaxed text-muted-foreground">
									Get the production-ready kit system without leaving the current flow.
								</p>
							<Button
								asChild
								className="mt-4 h-10 w-full rounded-[var(--pc-button-radius)] shadow-none hover:brightness-[1.03]"
							>
								<Link
									href="/kits"
									onClick={() => {
										trackEvent('explore_kits_click', { location: 'mobile_header_drawer' })
										setOpen(false)
									}}
								>
									Explore kits
								</Link>
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
			<HeaderThemeToggle />
		</div>
	)
}

export default function Header() {
	const pathname = usePathname() || ''

	if (isChromelessPath(pathname)) {
		return null
	}

	return (
		<header className="fixed inset-x-0 top-6 z-50 pointer-events-none">
			<div className="w-full px-4 sm:px-6 lg:px-[40px] pointer-events-auto">
				<div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6">
					<Link href="/" className="justify-self-start">
						<Logo scale={0.76} />
					</Link>
					<div className="origin-center justify-self-center scale-[0.7]">
						<DesktopNavigation pathname={pathname} />
					</div>
					<div className="justify-self-end">
						<HeaderThemeToggle />
					</div>
				</div>

				<div className="flex items-center gap-3 lg:hidden">
					<Link href="/" className="shrink-0">
						<Logo scale={0.88} />
					</Link>
					<MobileNavigation pathname={pathname} />
				</div>
			</div>
		</header>
	)
}
