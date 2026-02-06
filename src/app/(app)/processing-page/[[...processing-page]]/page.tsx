'use client'

import PriceItem from '@/components/PriceItem'
import config from '@/config'
import { handleCheckoutProcess } from '@/helpers/checkout'
import { isClerkEnabled, useUser } from '@/libs/safeClerk'
import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const isStripeEnabled = (() => {
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  return pk.startsWith('pk_')
})()

export default function ProcessingPage() {
  const { isSignedIn, user } = useUser()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryString = searchParams.toString()
  const fullPath = queryString ? `${pathname}?${queryString}` : pathname
  const priceId = searchParams.get('priceId')

  const priceIdFromLocal = useMemo(() => {
    if (typeof window === 'undefined') return null

    let id = localStorage.getItem('priceId')

    if (!id && priceId) {
      localStorage.setItem('priceId', priceId)
      id = priceId
    }

    return id
  }, [priceId])

  const pricesRenderList = useMemo(() => {
    if (priceIdFromLocal) {
      return config.stripe.products.filter((item) => item.priceId === priceIdFromLocal)
    }
    return config.stripe.products
  }, [priceIdFromLocal])

  useEffect(() => {
    if (!priceIdFromLocal || !user || !isSignedIn) return

    setTimeout(() => {
      handleCheckoutProcess(
        priceIdFromLocal,
        user.id || 'anonymous',
        user.primaryEmailAddress?.emailAddress || null,
        () => {},
        () => {}
      )
    }, 1000)
  }, [queryString, isSignedIn, user, priceIdFromLocal])

  const checkoutDisable = !isSignedIn || !!priceIdFromLocal

  if (!isClerkEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Checkout is not configured</h1>
          <p className="opacity-80">
            This route is optional. To use the signup + checkout flow, configure Clerk
            first.
          </p>
          <p className="mt-4 text-sm opacity-80">
            See <code>instructions/clerk.md</code>.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!isStripeEnabled) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Stripe is not configured</h1>
          <p className="opacity-80">
            This route is optional. To use checkout, set Stripe keys in your environment.
          </p>
          <p className="mt-4 text-sm opacity-80">
            See <code>instructions/stripe.md</code>.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
            >
              Go to dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Create Account Section */}
      <div className="lg:w-1/2 w-[100%] flex items-center justify-center p-8 bg-white dark:bg-black1">
        <div className="w-full max-w-md">
          {!isSignedIn ? (
            <div>
              <SignUp forceRedirectUrl={fullPath} />
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Account ready</h2>
              <p className="mb-6">You can now proceed with payment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Splitter */}
      <div className="hidden md:block w-px bg-gray-300 dark:bg-gray-50/20"></div>

      {/* Payment Checkout Section */}
      <div className="lg:w-1/2 w-[100%] flex items-center justify-center p-8 bg-gray-50 dark:bg-black1">
        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-14 text-black1 dark:text-white">
            Payment Checkout
          </h2>
          <div className="bg-gray-50 dark:bg-black1 flex items-center justify-center rounded">
            <div className="flex flex-col 2xl:flex-row gap-8 max-w-4xl mx-auto">
              {pricesRenderList.map((price) => (
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
