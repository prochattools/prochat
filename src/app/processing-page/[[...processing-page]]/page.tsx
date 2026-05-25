'use client'

import PriceItem from '@/components/PriceItem'
import config from '@/config'
import { handleCheckoutProcess } from '@/helpers/checkout'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

export default function Home() {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const queryString = searchParams?.toString() ?? ''
	const fullPath = queryString ? `${pathname}?${queryString}` : pathname
	const priceId = searchParams?.get('priceId') ?? null

	const priceIdFromLocal = useMemo(() => {
		if (typeof window === 'undefined') return null

		let id = localStorage.getItem('priceId')

		if (!id && !!priceId) {
			localStorage.setItem('priceId', priceId)
			id = priceId
		}
		return id
	}, [priceId])

	const pricesRenderList = useMemo(() => {
		if (!!priceIdFromLocal) {
			return config.stripe.products.filter(
				item => item.priceId === priceIdFromLocal
			)
		}
		return config.stripe.products
	}, [priceIdFromLocal])

	useEffect(() => {
		if (!!priceIdFromLocal) {
			setTimeout(() => {
				handleCheckoutProcess(
					priceIdFromLocal as string,
					null,
					null,
					() => {},
					() => {}
				)
			}, 4000)
		}
	}, [queryString, priceIdFromLocal])

	const checkoutDisable = !!priceIdFromLocal

	return (
		<div className='min-h-screen flex flex-col lg:flex-row'>
			{/* Create Account Section */}
			<div className='lg:w-1/2 w-[100%] flex items-center justify-center p-8 bg-white dark:bg-black1'>
				<div className='w-full max-w-md'>
					<div className='rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-600 dark:border-gray-800 dark:bg-black1 dark:text-gray-300'>
						Authentication is not enforced yet. Ory session validation is still TODO.
					</div>
				</div>
			</div>

			{/* Splitter */}
			<div className='hidden md:block w-px bg-gray-300 dark:bg-gray-50/20'></div>

			{/* Payment Checkout Section */}
			<div className='lg:w-1/2 w-[100%] flex items-center justify-center p-8 bg-gray-50 dark:bg-black1'>
				<div className='w-full'>
					{' '}
					{/*max-w-md*/}
					<h2 className='text-2xl font-semibold mb-14 text-black1 dark:text-white'>
						Payment Checkout
					</h2>
					{/* Placeholder for Payment Component */}
					<div className='bg-gray-50 dark:bg-black1 flex items-center justify-center rounded'>
						{/*h-40*/}
						<div className='flex flex-col 2xl:flex-row gap-8 max-w-4xl mx-auto'>
							{pricesRenderList.map(price => (
								<PriceItem
									disabled={checkoutDisable}
									item={price}
									key={price.priceId}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
