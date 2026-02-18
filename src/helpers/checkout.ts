import { loadStripe } from '@stripe/stripe-js';

const stripeMode = (process.env.NEXT_PUBLIC_STRIPE_MODE || 'test').toLowerCase();
const stripePublishableKey =
  stripeMode === 'live'
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ||
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST ||
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : Promise.resolve(null);

export const handleCheckoutProcess = async (
    priceId: string,
    userId: string | null,
    email: string | null,
    setLoading: (loading: boolean) => void,
    setError: (error: string | null) => void,
  ) => {
    setLoading(true);
    setError(null);
  
    try {
      console.log('Initiating checkout for priceId:', priceId);
      console.log('User data:', { id: userId, email });
  
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
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server responded with an error:', response.status, errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Received data from server:', data);
  
      if (data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
        return;
      }

      if (!data.sessionId) {
        console.error('Server response:', data);
        throw new Error('No checkoutUrl or sessionId received from the server');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Failed to load Stripe. Configure NEXT_PUBLIC Stripe publishable key.');
      }
  
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (stripeError) {
        console.error('Stripe redirectToCheckout error:', stripeError);
        throw stripeError;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };
