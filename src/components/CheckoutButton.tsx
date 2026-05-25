'use client';

import { useState } from 'react';
//import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { renderActionLabel } from '@/helpers/action-label';
import { handleCheckoutProcess } from '@/helpers/checkout';

interface CheckoutButtonProps {
  priceId: string;
  disabled?: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ priceId, disabled = false }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    await handleCheckoutProcess(priceId, null, null, setLoading, setError);
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
