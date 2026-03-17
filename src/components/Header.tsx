'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { ThemeToggle } from '@/app/(marketing)/components/ui/ThemeToggle'
import { isChromelessPath, isMinimalHeaderPath } from '@/helpers/chrome-routes'
import { cn } from '@/helpers/utils'
import { trackEvent } from '@/utils/analytics'
import { buttonVariants } from '@/components/ui/button'
import { SocialIcon, type SocialIconName } from '@/components/ui/social-icons'
import { useScrollDirection } from '@/hooks/useScrollDirection'

const NAV_ITEMS = [
  { label: 'System', href: '/' },
  { label: 'Kits', href: '/kits' },
] as const

const MOBILE_SECONDARY_ITEMS = [
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/prochattools', icon: 'linkedin' },
	{ label: 'GitHub', href: 'https://github.com/prochattools', icon: 'github' },
	{ label: 'Discord', href: 'https://discord.gg/U75p2BQuAH', icon: 'discord' },
] as const

function isActivePath(pathname: string, href: string) {
	if (href === '/') {
		return pathname === '/'
	}

	return pathname === href || pathname.startsWith(`${href}/`)
}

function HeaderThemeToggle({
	shellClassName,
	toggleClassName,
}: {
	shellClassName?: string
	toggleClassName?: string
} = {}) {
	return (
		<div className={cn('pc-toggle-shell shrink-0', shellClassName)}>
			<ThemeToggle
				className={cn(
					'h-full w-full rounded-full border-0 bg-transparent text-foreground shadow-none hover:bg-transparent focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-0 [&>svg]:h-4 [&>svg]:w-4',
					toggleClassName,
				)}
			/>
		</div>
	)
}

function DesktopNavigation({ pathname }: { pathname: string }) {
  return (
    <nav
      className="pc-nav-capsule grid min-w-[48rem] grid-cols-[repeat(3,minmax(0,1fr))_auto] items-center justify-center xl:min-w-[52rem]"
      aria-label="Primary"
    >
			<ul className="contents">
				{NAV_ITEMS.map(item => (
					<li key={item.href} className="justify-self-center">
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
			<div className="justify-self-end">
				<Link
					href="/kits/saaskit"
					onClick={() =>
						trackEvent('nav_cta_click', {
							location: 'header_capsule',
							product: 'saaskit',
							source_page: pathname,
						})
					}
					className={cn(
						buttonVariants({ variant: 'nav', size: 'sm' }),
						'h-10 origin-center scale-[1.15] rounded-[var(--pc-button-radius)] px-5 font-mono text-[0.95rem] font-bold tracking-[0.04em] text-white [font-variant-ligatures:none]',
					)}
				>
					<span>Start with SaaSKit</span>
				</Link>
			</div>
		</nav>
	)
}

function MobileNavigation({ pathname }: { pathname: string }) {
	const [open, setOpen] = useState(false)

	return (
		<div className="ml-auto flex min-w-0 items-center gap-3 lg:hidden">
			<div className="pc-nav-capsule gap-2 px-2 py-2">
				<Button
					asChild
					variant="nav"
					size="sm"
					className="h-9 rounded-[var(--pc-button-radius)] px-2.5 text-[0.72rem] font-bold tracking-[0.05em] sm:px-3 sm:text-[0.7rem] sm:tracking-[0.08em]"
				>
					<Link
						href="/kits/saaskit"
						onClick={() =>
							trackEvent('nav_cta_click', {
								location: 'mobile_header_capsule',
								product: 'saaskit',
								source_page: pathname,
							})
						}
					>
						<span className="whitespace-nowrap">Start with SaaSKit</span>
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
						className="pc-mobile-sheet inset-0 w-full max-w-none border-l-0 px-0 py-0 [&>button.absolute]:hidden lg:hidden"
					>
						<div className="fixed inset-0 z-50 flex flex-col bg-background px-6 pt-6 pb-8 lg:hidden">
							<SheetTitle className="sr-only">Navigation</SheetTitle>
							<div className="flex items-center justify-between">
								<Link
									href="/"
									onClick={() => setOpen(false)}
									className="inline-flex shrink-0 translate-y-[1px] items-center"
								>
									<Logo scale={0.78} />
								</Link>
								<div className="flex items-center gap-3">
									<HeaderThemeToggle
										shellClassName="h-11 w-11"
										toggleClassName="!h-11 !w-11 [&>svg]:h-5 [&>svg]:w-5"
									/>
									<SheetClose asChild>
										<button
											type="button"
											aria-label="Close navigation menu"
											className="pc-toggle-shell h-11 w-11 rounded-full border-0 bg-transparent p-0 text-foreground shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-0"
										>
											<X className="h-5 w-5" />
										</button>
									</SheetClose>
								</div>
							</div>
							<nav aria-label="Mobile" className="mt-10 flex flex-col space-y-2">
								{NAV_ITEMS.map(item => (
									<Link
										key={item.href}
										href={item.href}
										aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
										onClick={() => setOpen(false)}
										className={cn(
											'py-3 font-mono text-[1.375rem] font-medium uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-0 sm:text-[1.5rem] md:text-[1.625rem]',
											isActivePath(pathname, item.href)
												? 'font-semibold text-foreground'
												: 'text-foreground/72 hover:text-primary',
										)}
									>
										{item.label}
									</Link>
								))}
							</nav>
							<div className="mt-10 flex flex-col">
								{MOBILE_SECONDARY_ITEMS.map(item => {
									return (
										<Link
											key={item.label}
											href={item.href}
											target="_blank"
											rel="noreferrer"
											onClick={() => setOpen(false)}
											className="flex items-center gap-3 py-2 text-base text-foreground/70 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/55 focus-visible:ring-offset-0"
										>
											<SocialIcon
												icon={item.icon as SocialIconName}
												className="h-4 w-4 shrink-0 fill-current"
											/>
											<span>{item.label}</span>
										</Link>
									)
								})}
							</div>
							<div className="mt-auto pt-10">
								<Button
									asChild
									variant="nav"
									className="h-auto w-full rounded-[var(--pc-button-radius)] py-4 shadow-none hover:brightness-[1.03] [&_.pc-action-label]:text-base [&_.pc-action-label]:tracking-[0.14em]"
								>
									<Link
										href="/kits/saaskit"
										onClick={() => {
											trackEvent('nav_cta_click', {
												location: 'mobile_header_drawer',
												product: 'saaskit',
												source_page: pathname,
											})
											setOpen(false)
										}}
									>
										Start with SaaSKit
									</Link>
								</Button>
							</div>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}

export default function Header() {
	const pathname = usePathname() || ''
	const scrollDirection = useScrollDirection()

	if (isChromelessPath(pathname)) {
		return null
	}

	const isMinimalHeader = isMinimalHeaderPath(pathname)

	return (
		<header
			className={cn(
				'fixed inset-x-0 top-0 z-50 pointer-events-none transition-transform transition-opacity duration-300 will-change-transform motion-reduce:transition-none md:top-6 md:translate-y-0 md:opacity-100 md:transition-none',
				scrollDirection === 'down'
					? '-translate-y-full opacity-95 md:translate-y-0 md:opacity-100'
					: 'translate-y-0 opacity-100',
			)}
			style={{ transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)' }}
		>
			<div className="w-full px-4 pt-6 pointer-events-auto sm:px-6 md:pt-0 lg:px-[40px]">
				{isMinimalHeader ? (
					<div className="flex items-center justify-between">
						<Link href="/" className="shrink-0 translate-y-[4px] md:translate-y-[2px]">
							<Logo scale={0.82} />
						</Link>
						<div className="shrink-0">
							<HeaderThemeToggle />
						</div>
					</div>
				) : (
					<>
				<div className="relative hidden lg:flex lg:items-center lg:justify-between">
					<Link href="/" className="relative z-10 shrink-0 translate-y-[4px]">
						<Logo scale={0.76} />
					</Link>
					<div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<div className="pointer-events-auto origin-center scale-[0.6]">
							<DesktopNavigation pathname={pathname} />
						</div>
					</div>
					<div className="relative z-10 shrink-0">
						<HeaderThemeToggle />
					</div>
				</div>

				<div className="flex items-center gap-3 lg:hidden">
					<Link href="/" className="shrink-0 translate-y-[6px]">
						<Logo scale={0.88} />
					</Link>
					<MobileNavigation pathname={pathname} />
				</div>
					</>
				)}
			</div>
		</header>
	)
}
