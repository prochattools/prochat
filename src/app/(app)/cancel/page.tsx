import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Checkout cancelled</h1>
      <p className="mb-8">
        Your payment was not completed. You can try again any time from the dashboard.
      </p>
      <Link
        href="/dashboard"
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition"
      >
        Back to dashboard
      </Link>
    </div>
  )
}
