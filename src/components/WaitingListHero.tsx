'use client'

import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'

import { Button } from '@/saaskit/marketing/landing/components/ui/Button'

export default function WaitingListHero({
  prochatVersion,
}: {
  prochatVersion?: string
}) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(value).toLowerCase())
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setError('Email is required.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')

    try {
      const response = await fetch('/api/waiting-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({} as any))
        const msg =
          data?.error ||
          (response.status === 501
            ? 'Waiting list is disabled. Set RESEND_API_KEY to enable it.'
            : response.statusText)

        toast.error(msg)
        return
      }

      await response.json().catch(() => ({} as any))
      toast.success('You are on the waiting list!')
      setEmail('')
    } catch (err) {
      console.error('Error:', err)
      toast.error('Something went wrong. Please try again.')
    }
  }

  const versionLabel = (prochatVersion || 'unknown').trim()

  return (
    <section className="relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />


      <div className="relative mx-auto max-w-3xl px-6 py-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur dark:border-[#373C53] dark:bg-[#0B111B]/60 dark:text-[#B2B5BA]">
          <span className="rounded-full bg-emerald-500 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            New
          </span>
          SaaSKit v{versionLabel}
        </div>

        <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-6xl">
          Join the waiting list
        </h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-[#B2B5BA]">
          Get notified when we open access. No spam.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <div className="flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="h-12 w-full rounded-full border border-slate-200 bg-white/80 px-5 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none backdrop-blur transition-colors focus:border-[#5b49f5] focus:ring-2 focus:ring-[#5b49f5]/20 dark:border-[#373C53] dark:bg-[#0B111B]/60 dark:text-white dark:placeholder:text-[#808389]"
            />
            {error ? (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            ) : null}
          </div>

          <Button type="submit" size="lg" className="h-12 px-10">
            Get started
          </Button>
        </form>

        <p className="mt-4 text-sm text-slate-400 dark:text-[#808389]">
          By joining you agree to our{' '}
          <a
            href="/tos"
            className="text-slate-600 underline underline-offset-4 hover:text-slate-900 dark:text-[#B2B5BA] dark:hover:text-white"
          >
            Terms
          </a>{' '}
          and{' '}
          <a
            href="/privacy-policy"
            className="text-slate-600 underline underline-offset-4 hover:text-slate-900 dark:text-[#B2B5BA] dark:hover:text-white"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  )
}
