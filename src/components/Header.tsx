/*
 * CUSTOM EDITS MADE:
 * 1. Added ButtonSignin to mobile navigation for dashboard access
 * 2. Fixed responsive layout spacing to prevent overlap
 * 3. Improved alignment with items-center classes
 */
'use client'
import { IconButton, Logo } from '@/components'
import ButtonSignin from '@/components/ButtonSignin'
import NavLinks from '@/components/nav-links'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Blog, Demo, Landing, Moon, OpenNav, Pricing, RightArrow, Sun } from '@/icons'
import { useThemeMode } from '@/utils/themeMode'
import { ScrollToSection } from '@/utils/scroll-to-section'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const nav_links = [
	{
		icon: <Demo />,
		title: 'Demo',
		link: '/',
	},
	{
		icon: <Pricing />,
		title: 'Pricing',
		link: '/',
	},
	{
		icon: <Blog width={18} height={18} />,
		title: 'Blog',
		link: '/blog',
	},
	{
		icon: (
			<span className='inline-flex scale-[0.6]'>
				<Landing />
			</span>
		),
		title: 'Kits',
		link: '/kits',
	},
]

const ThemeSwitch = () => {
	const { mounted, isDark, toggleTheme } = useThemeMode()

	return (
		<label className='flex items-center relative w-max cursor-pointer select-none'>
			<input
				type='checkbox'
				id='theme-toggle'
				checked={mounted ? isDark : false}
				onChange={toggleTheme}
				disabled={!mounted}
				className='appearance-none transition-colors cursor-pointer w-14 h-[30px] rounded-full focus:outline-none border border-[#B7B8BB] dark:border-[#373C53] bg-white'
			/>
			<span className='absolute font-medium text-xs uppercase right-1 text-white'>
				<Sun />
			</span>
			<span className='absolute font-medium text-xs uppercase right-8 text-white'>
				<Moon />
			</span>
			<span className='w-6 h-6 right-[29px] dark:right-[31px] absolute rounded-full transform transition-transform bg-[#0B111B] dark:bg-white' />
		</label>
	)
}

const MobileNav = () => {
	return (
		<Sheet>
			<SheetTrigger>
				<div className='text-black1 dark:text-white'>
					<OpenNav />
				</div>
			</SheetTrigger>
			<SheetContent className='bg-white dark:bg-black1 px-0 pt-4 border-l-0 min-w-[320px]'>
				<SheetHeader>
					<SheetTitle className='text-black1 dark:text-white text-xl font-bold border-b border-[#b3b3b3] text-left pb-4 pl-4'>
						Menu
					</SheetTitle>
				</SheetHeader>
				<Link href='/' className='flex items-center gap-2 mt-8 mx-auto w-fit'>
					<Logo scale={1.3} />
				</Link>
				<div className='my-8 mx-auto w-fit'>
					<NavLinks nav_links={nav_links} />
				</div>
				{/* CUSTOM EDIT: Added ButtonSignin to mobile navigation for dashboard access */}
				<div className='mb-8 mx-auto w-fit'>
					<ButtonSignin />
				</div>
				<div
					onClick={() => {
						ScrollToSection('1')
					}}
					className='mb-8 mx-auto w-fit block'
				>
					<IconButton text='Get ProKit' icon={<RightArrow />} />
				</div>
			</SheetContent>
		</Sheet>
	)
}

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 20)
		handleScroll()
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	return (
		<div
			className={`flex justify-center items-center w-full fixed top-0 z-50 border-b transition-all duration-500 ${
				isScrolled
					? 'bg-white/70 backdrop-blur-xl border-slate-200/60 py-3 shadow-[0_2px_20px_-12px_rgba(0,0,0,0.05)] dark:bg-[#0B111B]/70 dark:border-[#1E242D] dark:shadow-none'
					: 'bg-transparent border-transparent py-6 dark:bg-transparent dark:border-transparent'
			}`}
		>
			<div className='max-w-[1440px] w-full flex justify-between items-center gap-4 px-4 sm:px-12'>
				<Link href='/'>
					<Logo scale={1.3} />
				</Link>
				<div className='hidden lg:block'>
					<NavLinks nav_links={nav_links} />
				</div>

				{/* CUSTOM EDIT: Fixed responsive layout to prevent overlap */}
				<div className='hidden lg:flex items-center gap-4'>
					<ThemeSwitch />
					<ButtonSignin />
				</div>

				<div className='lg:hidden flex items-center gap-3'>
					<ThemeSwitch />
					<MobileNav />
				</div>
			</div>
		</div>
	)
}

export default Header
