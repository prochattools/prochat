'use client';

import { useState } from 'react';
//import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useUser } from '@/libs/safeClerk';
import { handleCheckoutProcess } from '@/helpers/checkout';

interface CheckoutButtonProps {
  priceId: string;
  disabled?: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ priceId, disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isLoaded, isSignedIn, user } = useUser();

  const handleCheckout = async () => {
    const userId = isLoaded && isSignedIn ? user?.id || null : null;
    const email =
      isLoaded && isSignedIn ? user?.primaryEmailAddress?.emailAddress || null : null;

    await handleCheckoutProcess(
      priceId,
      userId,
      email,
      setLoading,
      setError
    );
  };

  return (
    <div>
      <button 
        className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-secondary transition duration-300"
        onClick={handleCheckout}
        disabled={loading || disabled}
      >
        {loading ? 'Processing...' : 'Proceed to Checkout'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CheckoutButton;
