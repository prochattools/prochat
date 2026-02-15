'use client'

import { FormEvent, useId, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { Button } from '@/app/marketing-ai-studio/components/ui/Button'

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
    <form onSubmit={handleSubmit} className="space-y-5 text-left">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold uppercase tracking-[0.16em] text-slate-600"
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
          className="h-14 w-full rounded-full border border-slate-300 bg-white px-6 text-base text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-[#5b49f5] focus:ring-2 focus:ring-[#5b49f5]/30 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="h-14 w-full sm:w-auto sm:min-w-[220px] px-10 text-base sm:text-lg bg-[#5b49f5] hover:bg-[#4a3bd1] shadow-[0_0_26px_-12px_rgba(91,73,245,0.45)] hover:shadow-[0_0_34px_-10px_rgba(91,73,245,0.55)]"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Submitting...' : buttonLabel}
        </Button>
      </div>

      {error && <p className="text-base font-medium text-red-500">{error}</p>}
      {success && <p className="text-base font-medium text-emerald-600">{success}</p>}
    </form>
  )
}
