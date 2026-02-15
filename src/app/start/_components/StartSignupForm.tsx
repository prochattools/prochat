'use client'

import { FormEvent, useId, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface StartSignupFormProps {
  buttonLabel?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function StartSignupForm({
  buttonLabel = 'Send me the PDF',
}: StartSignupFormProps) {
  const inputId = useId()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail) {
      setError('Email is required.')
      return
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/mailerlite/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email: normalizedEmail }),
      })

      const payload = (await response.json().catch(() => ({}))) as {
        error?: string
        message?: string
      }

      if (!response.ok) {
        setError(payload.error || 'Something went wrong. Please try again.')
        return
      }

      setSuccess(
        payload.message || 'You are in. Check your inbox for the first email.'
      )
      setEmail('')
    } catch (submitError) {
      console.error('MailerLite subscription error:', submitError)
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-left">
      <label
        htmlFor={inputId}
        className="block text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        Email Address
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isSubmitting}
          className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 outline-none transition focus:border-[#5b49f5] focus:ring-2 focus:ring-[#885efe]/20 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#885efe] to-[#5b49f5] px-5 font-semibold text-white shadow-[0_10px_24px_-12px_rgba(91,73,245,0.8)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Submitting...' : buttonLabel}
        </button>
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      {success && <p className="text-sm font-medium text-emerald-600">{success}</p>}
    </form>
  )
}
