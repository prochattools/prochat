'use client'

import { useState } from 'react'
import { handleCheckoutProcess } from '@/helpers/checkout'
import { useUser } from '@/libs/safeClerk'

interface CheckoutButtonProps {
  priceId: string
  disabled?: boolean
}

const isStripeEnabled = (() => {
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
  return pk.startsWith('pk_')
})()

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  priceId,
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isSignedIn, user } = useUser()

  const handleCheckout = async () => {
    if (!isStripeEnabled) {
      setError(
        'Stripe is not configured. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY.'
      )
      return
    }

    if (!isSignedIn) {
      setError('Please sign in to proceed with checkout')
      return
    }

    if (user) {
      await handleCheckoutProcess(
        priceId,
        user.id || 'anonymous',
        user.primaryEmailAddress?.emailAddress || null,
        setLoading,
        setError
      )
    }
  }

  return (
    <div>
      <button
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        onClick={handleCheckout}
        disabled={loading || disabled || !isStripeEnabled}
      >
        {loading
          ? 'Processing...'
          : isStripeEnabled
            ? isSignedIn
              ? 'Proceed to Checkout'
              : 'Sign in to Checkout'
            : 'Stripe not configured'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

export default CheckoutButton
