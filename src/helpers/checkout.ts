import { loadStripe } from '@stripe/stripe-js'

let stripePromise: ReturnType<typeof loadStripe> | null = null

function getStripe() {
  const pk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  if (!pk || !pk.startsWith('pk_')) {
    throw new Error(
      'Stripe is not configured. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable checkout.'
    )
  }

  if (!stripePromise) {
    stripePromise = loadStripe(pk)
  }

  return stripePromise
}

export const handleCheckoutProcess = async (
  priceId: string,
  userId: string,
  email: string | null,
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void
) => {
  if (!email) {
    throw new Error('User email not available')
  }

  setLoading(true)
  setError(null)

  try {
    const response = await fetch('/api/stripe/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        userId,
        email,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({} as any))
      const msg =
        errorData?.error || `Checkout failed (status ${response.status})`
      throw new Error(msg)
    }

    const data = await response.json().catch(() => ({} as any))

    if (!data.sessionId) {
      throw new Error('No sessionId received from the server')
    }

    const stripe = await getStripe()
    if (!stripe) {
      throw new Error('Failed to load Stripe')
    }

    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId: data.sessionId,
    })
    if (stripeError) {
      throw stripeError
    }
  } catch (error) {
    setError(error instanceof Error ? error.message : 'An unexpected error occurred')
  } finally {
    setLoading(false)
  }
}
