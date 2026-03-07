'use client';

import { useState } from 'react';
//import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { renderActionLabel } from '@/helpers/action-label';
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
      <Button
        type="button"
        className="w-full"
        onClick={handleCheckout}
        disabled={loading || disabled}
      >
        {renderActionLabel(loading ? 'Processing...' : 'Proceed to Checkout')}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default CheckoutButton;
