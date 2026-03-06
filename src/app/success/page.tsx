import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function SuccessPage() {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="mb-4 text-3xl font-bold tracking-[-0.05em]">Payment Successful!</h1>
        <p>Thank you for your subscription. You will receive a confirmation email shortly.</p>
      </div>
    );
  }
